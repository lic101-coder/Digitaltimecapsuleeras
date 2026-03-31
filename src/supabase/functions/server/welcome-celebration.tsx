// Welcome Celebration Service
// Handles one-time celebration for existing users to see the First Step achievement

import * as kv from './kv_store.tsx';
import { supabase } from './supabase-client.tsx';

export const checkWelcomeCelebration = async (c: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) return c.json({ error: "Unauthorized" }, 401);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return c.json({ error: "Invalid token" }, 401);
    
    console.log(`🎉 [Welcome] Checking welcome celebration for user: ${user.id}`);
    
    const seenFlag = await kv.get(`user_seen_welcome_celebration:${user.id}`);
    if (seenFlag) {
      console.log(`🎉 [Welcome] Already seen`);
      return c.json({ shouldShowCelebration: false });
    }
    
    const userAchievements = await kv.get(`user_achievements:${user.id}`) || [];
    const hasFirstStep = userAchievements.some((a: any) => a.achievementId === 'A001');
    
    const { ACHIEVEMENT_DEFINITIONS } = await import("./achievement-service.tsx");
    const firstStepAchievement = ACHIEVEMENT_DEFINITIONS['A001'];
    
    if (!firstStepAchievement) {
      return c.json({ error: "First Step achievement not found" }, 500);
    }
    
    if (!hasFirstStep) {
      console.log(`🎉 [Welcome] Granting First Step achievement to existing user`);
      const unlockRecord = {
        achievementId: 'A001',
        unlockedAt: new Date().toISOString(),
        notificationShown: false,
        shared: false,
        sourceAction: 'welcome_grant',
        metadata: { retroactive: true, existingUser: true }
      };
      userAchievements.push(unlockRecord);
      await kv.set(`user_achievements:${user.id}`, userAchievements);
      
      // Add title to user's title profile if the achievement has a title reward
      if (firstStepAchievement.rewards.title) {
        console.log(`🎉 [Welcome] Adding title "${firstStepAchievement.rewards.title}" to user profile`);
        
        // Get or create title profile
        let titleProfile = await kv.get(`user_title_profile:${user.id}`);
        if (!titleProfile) {
          titleProfile = {
            userId: user.id,
            equipped_title: null,
            equipped_achievement_id: null,
            unlocked_titles: []
          };
        }
        
        // Add title if not already present
        const titleExists = titleProfile.unlocked_titles?.some(
          (t: any) => t.achievementId === 'A001'
        );
        
        if (!titleExists) {
          if (!titleProfile.unlocked_titles) {
            titleProfile.unlocked_titles = [];
          }
          
          titleProfile.unlocked_titles.push({
            title: firstStepAchievement.rewards.title,
            achievementId: 'A001',
            rarity: firstStepAchievement.rarity,
            unlockedAt: new Date().toISOString()
          });
          
          await kv.set(`user_title_profile:${user.id}`, titleProfile);
          console.log(`✅ [Welcome] Title added to profile`);
        }
      }
      
      console.log(`🎉 [Welcome] ✅ First Step granted`);
    }
    
    return c.json({
      shouldShowCelebration: true,
      achievement: firstStepAchievement,
      justGranted: !hasFirstStep
    });
  } catch (error) {
    console.error("🎉 [Welcome] Error:", error);
    return c.json({ error: error.message }, 500);
  }
};

export const markWelcomeSeen = async (c: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) return c.json({ error: "Unauthorized" }, 401);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return c.json({ error: "Invalid token" }, 401);
    
    console.log(`🎉 [Welcome] Marking as seen for user: ${user.id}`);
    await kv.set(`user_seen_welcome_celebration:${user.id}`, {
      seen: true,
      timestamp: new Date().toISOString()
    });
    console.log(`🎉 [Welcome] ✅ Marked as seen`);
    return c.json({ success: true });
  } catch (error) {
    console.error("🎉 [Welcome] Error:", error);
    return c.json({ error: error.message }, 500);
  }
};