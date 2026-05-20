// Achievement Recalculation System
// Recalculates all achievements from scratch based on current user stats
// Used for migrating users to new achievement system

import * as kv from './kv_store.tsx';
import { ACHIEVEMENT_DEFINITIONS, Achievement } from './achievement-service.tsx';

console.log('🔄 Achievement Recalculation Service initialized');

// ============================================
// HELPER FUNCTIONS
// ============================================

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function checkUnlockCriteria(achievement: Achievement, stats: any): boolean {
  const { unlockCriteria } = achievement;
  
  switch (unlockCriteria.type) {
    case 'count':
      const value = getNestedValue(stats, unlockCriteria.stat!);
      const numValue = typeof value === 'number' ? value : 0;
      const threshold = unlockCriteria.threshold || 0;
      
      switch (unlockCriteria.operator) {
        case '>=': return numValue >= threshold;
        case '>': return numValue > threshold;
        case '==': return numValue === threshold;
        case '<=': return numValue <= threshold;
        case '<': return numValue < threshold;
        default: return numValue >= threshold;
      }
    
    case 'streak':
      const streakValue = stats[unlockCriteria.stat!] || 0;
      return streakValue >= (unlockCriteria.threshold || 0);
    
    case 'time_wait':
      const waitValue = stats[unlockCriteria.stat!] || 0;
      return waitValue >= (unlockCriteria.threshold || 0);
    
    case 'specific_action':
      // These require live event tracking — only remaining ones are:
      // multimedia_capsule_created (A008), multi_recipient_capsule_sent_3 (MR001), multi_recipient_capsule_sent_10 (MR002)
      // Time-based achievements (A026/A027/A031/A042) were converted to count-type in v2.8.0
      return false;
    
    case 'combo':
      // Check multiple requirements
      if (unlockCriteria.requirements) {
        return unlockCriteria.requirements.every(req => {
          const val = getNestedValue(stats, req.stat);
          const numVal = typeof val === 'number' ? val : 0;
          const op = req.operator || '>=';
          
          switch (op) {
            case '>=': return numVal >= req.threshold;
            case '>': return numVal > req.threshold;
            case '==': return numVal === req.threshold;
            case '<=': return numVal <= req.threshold;
            case '<': return numVal < req.threshold;
            default: return numVal >= req.threshold;
          }
        });
      }
      return false;
    
    case 'custom':
      // Custom validators - need special handling
      return validateCustomAchievement(unlockCriteria.validator!, stats);
    
    default:
      return false;
  }
}

function validateCustomAchievement(validator: string, stats: any): boolean {
  switch (validator) {
    case 'validateTimeLord':
      // Check if user has capsules scheduled across 5+ different years
      return (stats.capsule_years?.length || 0) >= 5;
    
    case 'validateCinematic':
      // Check if user has created a capsule with 10+ media files
      return (stats.max_media_in_capsule || 0) >= 10;
    
    case 'validateGoldenHour':
      // v2.8.0: Now tracked via golden_hour_capsules stat
      return (stats.golden_hour_capsules || 0) >= 1;
    
    case 'validateGoldenRatio':
      // Check if user has exactly 89 capsules
      return stats.capsules_created === 89;
    
    case 'validateMemoryWeaver':
      // Check if user has used all 4 media types
      const hasPhoto = (stats.media_by_type?.photo || 0) > 0;
      const hasVideo = (stats.media_by_type?.video || 0) > 0;
      const hasAudio = (stats.media_by_type?.audio || 0) > 0;
      const hasText = (stats.capsules_created || 0) > 0; // If they created capsules, they have text
      return hasPhoto && hasVideo && hasAudio && hasText;
    
    default:
      return false;
  }
}

// ============================================
// MAIN RECALCULATION FUNCTION
// ============================================

export async function recalculateUserAchievements(userId: string): Promise<{
  success: boolean;
  achievementsCount: number;
  titlesCount: number;
  legacyTitlesPreserved: number;
  error?: string;
}> {
  try {
    console.log(`🔄 Recalculating achievements for user: ${userId}`);
    
    // 1. Get user stats (ensure v2.8.0 fields have defaults for older stat records)
    const rawStats = await kv.get(`user_stats:${userId}`);
    const stats = rawStats ? {
      midnight_capsules: 0,
      golden_hour_capsules: 0,
      early_bird_capsules: 0,
      new_year_capsules: 0,
      folders_created: 0,
      capsules_created_today: 0,
      capsules_created_today_date: '',
      capsules_created_today_max: 0,
      ...rawStats
    } : null;
    
    if (!stats) {
      console.log(`❌ No stats found for user: ${userId}`);
      return {
        success: false,
        achievementsCount: 0,
        titlesCount: 0,
        legacyTitlesPreserved: 0,
        error: 'User stats not found'
      };
    }
    
    // 2. Get current user profile
    const profile = await kv.get(`user_profile:${userId}`);
    
    if (!profile) {
      console.log(`❌ No profile found for user: ${userId}`);
      return {
        success: false,
        achievementsCount: 0,
        titlesCount: 0,
        legacyTitlesPreserved: 0,
        error: 'User profile not found'
      };
    }
    
    // 3. Identify legacy titles to preserve (deleted achievements)
    const legacyTitleNames = [
      'Sevenfold Sage', // Now mapped to A048 (was old A044 Lucky Number)
      'Master Curator', // Now mapped to A050 (was old E007 Master Curator)
      // Add any other legacy titles here if needed
    ];
    
    const currentTitles = profile.titles || [];
    const preservedLegacy = currentTitles.filter((t: string) => legacyTitleNames.includes(t));
    
    console.log(`📋 Current titles: ${currentTitles.length}, Legacy to preserve: ${preservedLegacy.length}`);
    
    // 4. Recalculate achievements from scratch
    const newAchievements: string[] = [];
    const newTitles: string[] = [...preservedLegacy]; // Start with legacy titles
    
    for (const [id, achievement] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
      const unlocked = checkUnlockCriteria(achievement, stats);
      
      console.log(`🔍 [Recalc] ${id} (${achievement.title}): ${unlocked ? '✅ UNLOCKED' : '❌ locked'}`);
      if (id === 'A036') {
        console.log(`🔍 [Recalc] Time Lord check - capsule_years:`, stats.capsule_years);
      }
      
      if (unlocked) {
        newAchievements.push(id);
        
        // Add title if achievement awards one
        if (achievement.rewards.title) {
          newTitles.push(achievement.rewards.title);
        }
      }
    }
    
    // 5. Deduplicate titles
    const uniqueTitles = [...new Set(newTitles)];
    
    console.log(`✅ Recalculated: ${newAchievements.length} achievements, ${uniqueTitles.length} titles`);
    
    // 6. Save updated profile
    const updatedProfile = {
      ...profile,
      achievements: newAchievements,
      titles: uniqueTitles,
      legacy_titles: preservedLegacy,
      last_recalculation: new Date().toISOString()
    };
    
    await kv.set(`user_profile:${userId}`, updatedProfile);
    
    // 7. ✅ ALSO UPDATE achievement_progress TO KEEP IN SYNC
    const achievementProgress = await kv.get(`achievement_progress:${userId}`) || {
      userId,
      unlockedAchievements: [],
      progress: {},
      lastChecked: new Date().toISOString(),
      shownNotifications: []
    };
    
    achievementProgress.unlockedAchievements = newAchievements;
    achievementProgress.lastChecked = new Date().toISOString();
    
    await kv.set(`achievement_progress:${userId}`, achievementProgress);
    
    console.log(`💾 Saved updated profile AND achievement_progress for user: ${userId}`);
    
    return {
      success: true,
      achievementsCount: newAchievements.length,
      titlesCount: uniqueTitles.length,
      legacyTitlesPreserved: preservedLegacy.length
    };
    
  } catch (error) {
    console.error(`❌ Error recalculating achievements for ${userId}:`, error);
    return {
      success: false,
      achievementsCount: 0,
      titlesCount: 0,
      legacyTitlesPreserved: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================
// BATCH RECALCULATION FOR ALL USERS
// ============================================

export async function recalculateAllUsers(): Promise<{
  success: boolean;
  totalProcessed: number;
  totalSuccess: number;
  totalErrors: number;
  errors: Array<{ userId: string; error: string }>;
}> {
  console.log('🔄 Starting global achievement recalculation for all users...');
  
  try {
    // Get all user profiles
    const allProfiles = await kv.getByPrefix('user_profile:');
    
    console.log(`📊 Found ${allProfiles.length} user profiles to process`);
    
    let totalSuccess = 0;
    let totalErrors = 0;
    const errors: Array<{ userId: string; error: string }> = [];
    
    // Process each user
    for (const profileData of allProfiles) {
      const userId = profileData.key.replace('user_profile:', '');
      
      try {
        const result = await recalculateUserAchievements(userId);
        
        if (result.success) {
          totalSuccess++;
          console.log(`✅ [${totalSuccess}/${allProfiles.length}] Recalculated ${userId}: ${result.achievementsCount} achievements, ${result.titlesCount} titles`);
        } else {
          totalErrors++;
          errors.push({ userId, error: result.error || 'Unknown error' });
          console.log(`❌ [${totalErrors}] Failed ${userId}: ${result.error}`);
        }
      } catch (err) {
        totalErrors++;
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        errors.push({ userId, error: errorMsg });
        console.error(`❌ [${totalErrors}] Exception for ${userId}:`, err);
      }
    }
    
    console.log(`✅ Global recalculation complete: ${totalSuccess} success, ${totalErrors} errors`);
    
    return {
      success: true,
      totalProcessed: allProfiles.length,
      totalSuccess,
      totalErrors,
      errors
    };
    
  } catch (error) {
    console.error('❌ Fatal error in global recalculation:', error);
    return {
      success: false,
      totalProcessed: 0,
      totalSuccess: 0,
      totalErrors: 0,
      errors: [{
        userId: 'SYSTEM',
        error: error instanceof Error ? error.message : 'Unknown error'
      }]
    };
  }
}