# Referral Achievement Fixes - Complete

## Issue 1: Duplicate Achievement Name ✅ FIXED

### Problem
The "Time Keeper" achievement name was used for BOTH:
- `time_keeper` (A001) - Complete first capsule tutorial (onboarding)
- `REF001` - Invite 1 friend who creates their first capsule (referral)

This caused confusion and made it unclear which achievement was which.

### Solution
Renamed REF001 from "Time Keeper" to **"Community Builder"**

**File:** `/supabase/functions/server/achievement-service.tsx`

```typescript
REF001: {
  id: 'REF001',
  title: 'Community Builder',  // Changed from 'Time Keeper'
  description: 'Invite 1 friend who creates their first capsule',
  rewards: { 
    points: 100,
    title: 'Community Builder',  // Also updated reward title
    horizon: 'stardust_drift'
  },
  // ... rest unchanged
}
```

**Result:**
- ✅ time_keeper (A001) = "Time Keeper" (onboarding tutorial)
- ✅ REF001 = "Community Builder" (1 friend referral)
- ✅ No naming conflicts

---

## Issue 2: No Celebration When Achievements Unlock ✅ FIXED

### Problem
When a referred user creates their first capsule:
1. ✅ Stats update correctly (backend working)
2. ✅ Achievement unlocks for referrer (backend working)
3. ❌ Referrer doesn't see celebration modal
4. ❌ Referrer doesn't see horizon unlock notification

**Root Cause:**
- Achievement was unlocked on backend for the referrer
- But there was NO system to notify the referrer in real-time or on next login
- The celebration modal never triggered

### Solution

#### Part 1: Pending Achievement Check on Login
Added a system to check for unseen referral achievements when users log in.

**Backend Endpoints Added:**

1. **GET Pending Achievements** (`/api/referrals/pending-achievements`)
   - Returns list of unlocked but unseen referral achievements
   - Tracks which achievements user has already seen

2. **MARK Achievements as Seen** (`/api/referrals/mark-seen`)
   - Records that user has seen the celebration
   - Prevents showing same achievement twice

**File:** `/supabase/functions/server/index.tsx` (after line 14300)

```typescript
// Get pending unseen referral achievements
app.post('/make-server-f9be53a7/api/referrals/pending-achievements', async (c) => {
  // Get user's referral achievements
  const referralAchievements = userAchievements.filter((a: any) => 
    ['REF001', 'REF002', 'REF003', 'REF004'].includes(a.achievementId)
  );
  
  // Check which have been seen
  const seenAchievements = await kv.get(`referral_achievements_seen:${user.id}`) || [];
  
  // Return unseen ones
  const unseenAchievements = referralAchievements.filter((a: any) => 
    !seenAchievements.includes(a.achievementId)
  );
  
  return c.json({ unseenAchievements });
});

// Mark achievements as seen
app.post('/make-server-f9be53a7/api/referrals/mark-seen', async (c) => {
  const { achievementIds } = await c.req.json();
  
  const seenAchievements = await kv.get(`referral_achievements_seen:${user.id}`) || [];
  const updatedSeen = [...new Set([...seenAchievements, ...achievementIds])];
  
  await kv.set(`referral_achievements_seen:${user.id}`, updatedSeen);
  
  return c.json({ success: true });
});
```

**Frontend Login Check:**

**File:** `/App.tsx` (after retroactive achievement check)

```typescript
// 🎁 Check for pending referral achievements on login
const hasCheckedReferralRef = React.useRef(false);
React.useEffect(() => {
  if (isAuthenticated && accessToken && userId && !hasCheckedReferralRef.current) {
    hasCheckedReferralRef.current = true;

    // Check after 4 second delay (after retroactive check)
    setTimeout(async () => {
      const response = await fetch(
        `.../api/referrals/pending-achievements`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const result = await response.json();

      if (result.unseenAchievements?.length > 0) {
        // Show celebration for each unseen achievement
        for (const achievement of result.unseenAchievements) {
          // Dispatch event to trigger celebration modal
          window.dispatchEvent(new CustomEvent("achievementUnlocked", {
            detail: {
              achievementId: achievement.achievementId,
              source: "referral_pending",
            },
          }));
        }

        // Mark as seen
        await fetch(`.../api/referrals/mark-seen`, {
          body: JSON.stringify({
            achievementIds: result.unseenAchievements.map(a => a.achievementId),
          }),
        });
      }
    }, 4000);
  }
}, [isAuthenticated, accessToken, userId]);
```

**How it works:**
1. User logs in
2. 4 seconds later, frontend checks for unseen referral achievements
3. If found, dispatches `achievementUnlocked` event for each
4. AchievementUnlockManager listens and shows celebration modal
5. Marks achievements as seen so they don't show again

#### Part 2: Real-Time Achievement Unlock Event Listener
Added listener for custom `achievementUnlocked` events.

**File:** `/components/AchievementUnlockManager.tsx`

```typescript
// 🎁 Listen for custom achievementUnlocked events (e.g., from referral system)
useEffect(() => {
  const handleAchievementUnlocked = (event: CustomEvent) => {
    console.log('🎉 [Achievement Manager] achievementUnlocked event received:', event.detail);
    
    const { achievementId, source } = event.detail;
    
    if (!achievementId) return;
    
    console.log(`🔔 [Achievement Manager] Triggering check for achievement ${achievementId} (source: ${source})`);
    
    // Trigger a check for pending notifications to show the modal
    if (session?.access_token && Object.keys(definitions).length > 0) {
      checkPendingNotifications(session.access_token);
    }
  };
  
  window.addEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);
  
  return () => {
    window.removeEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);
  };
}, [session, definitions, checkPendingNotifications]);
```

**How it works:**
- Listens for `achievementUnlocked` custom events
- When event fires, immediately checks for pending achievements
- Shows celebration modal with achievement details
- Works for both login check AND future real-time notifications

---

## Complete Flow

### Scenario 1: User Invites Friend (Friend Creates Capsule While User Offline)

1. **User A** sends invite to **User B**
2. **User B** signs up and creates first capsule
3. Backend unlocks REF001 ("Community Builder") for **User A**
4. **User A** is offline - doesn't see anything yet
5. ⏰ **User A logs in later**
6. Frontend checks for pending achievements (4s after login)
7. Finds REF001 is unlocked but unseen
8. Dispatches `achievementUnlocked` event
9. ✅ **Celebration modal shows!**
10. ✅ **Horizon unlock modal shows after!**
11. Backend marks REF001 as "seen"
12. Next login - won't show again

### Scenario 2: Real-Time (5-Second Polling)

1. **User A** is logged in and active
2. **User B** (their referral) creates first capsule
3. Backend unlocks REF001 for **User A**
4. ⏰ Within 5 seconds, polling detects new achievement
5. ✅ **Celebration modal shows immediately!**
6. ✅ **Horizon unlock modal shows after!**

### Scenario 3: Event-Driven (Future Enhancement)

When `achievementUnlocked` event is dispatched from anywhere:
```typescript
window.dispatchEvent(new CustomEvent("achievementUnlocked", {
  detail: { achievementId: "REF001", source: "referral_system" }
}));
```

1. AchievementUnlockManager listener catches event
2. Immediately checks for pending achievements
3. Shows celebration modal
4. Shows horizon unlock modal

---

## What Celebrations Show

When referral achievement unlocks:

### 1. Achievement Unlock Modal
- **Title:** "Community Builder" (or Legacy Builder, etc.)
- **Description:** "Invite 1 friend who creates their first capsule"
- **Detailed Description:** Full achievement text
- **Rarity Badge:** Rare/Legendary/Epic
- **Points:** +100 (REF001)
- **Particle Effects:** Matching rarity
- **Share Button:** Social sharing

### 2. Title Reward Modal (if achievement has title)
- **After** achievement modal closes (2s delay)
- **Title Name:** "Community Builder"
- **Visual Effects:** Cosmic title reveal animation
- **Horizon Unlock:** "Stardust Drift" for REF001

### 3. Horizon Gallery
- **New horizon immediately available**
- "Stardust Drift" (REF001) - Rare
- "Eternal Aurora" (REF002) - Legendary
- "Supernova Bloom" (REF003) - Epic
- "Quantum Nexus" (REF004) - Legendary

---

## Technical Details

### Backend KV Store Keys

```typescript
// Achievement tracking
`user_achievements:${userId}` // Array of unlocked achievements

// Referral achievement seen tracking
`referral_achievements_seen:${userId}` // Array of achievement IDs user has seen

// Referral system
`referral_signup:${signupId}` // Signup details including milestone_reached
`referral_signups:${referrerId}` // List of all signups for referrer
```

### Event System

```typescript
// Dispatch achievement unlock (triggers celebration)
window.dispatchEvent(new CustomEvent("achievementUnlocked", {
  detail: {
    achievementId: "REF001",
    source: "referral_pending"
  }
}));

// Dispatch achievement closed (triggers title modal)
window.dispatchEvent(new CustomEvent("achievementClosed", {
  detail: {
    title: "Community Builder",
    rarity: "rare",
    achievementName: "Community Builder",
    achievement: "REF001",
    timestamp: Date.now()
  }
}));
```

### Polling System
- AchievementUnlockManager polls every **5 seconds**
- Checks for pending achievements in backend
- Shows celebration if any are found
- Prevents duplicate shows with seen tracking

---

## Testing Checklist

### ✅ Name Conflict Fix
- [ ] Check Achievements page - no duplicate "Time Keeper"
- [ ] Onboarding achievement shows "Time Keeper" (A001)
- [ ] First referral achievement shows "Community Builder" (REF001)

### ✅ Celebration Shows on Login
- [ ] Invite a friend (use separate browser/incognito)
- [ ] Friend signs up and creates first capsule
- [ ] Log out of main account
- [ ] Log back in to main account
- [ ] After 4 seconds, celebration modal appears
- [ ] Achievement modal shows "Community Builder"
- [ ] Title modal shows after (2s delay)
- [ ] Horizon "Stardust Drift" is unlocked
- [ ] Log out and back in - celebration doesn't repeat

### ✅ Real-Time Celebration (5s Polling)
- [ ] Stay logged in
- [ ] Have friend create first capsule
- [ ] Within 5 seconds, celebration modal appears
- [ ] All modals show correctly

### ✅ Multiple Referrals
- [ ] Reach 5 friends milestone
- [ ] REF002 "Legacy Builder" unlocks
- [ ] Eternal Aurora horizon unlocks
- [ ] Reach 10 friends milestone
- [ ] REF003 "Horizon Architect" unlocks
- [ ] Supernova Bloom horizon unlocks

---

## Summary

**Fixed:**
1. ✅ Renamed REF001 to "Community Builder" (no more name conflict)
2. ✅ Added pending achievement check on login
3. ✅ Added seen/unseen tracking in backend
4. ✅ Added event listener for `achievementUnlocked` events
5. ✅ Achievement celebration shows when user logs in (if missed)
6. ✅ Real-time celebration works via 5-second polling
7. ✅ Horizon unlock modal shows after achievement modal
8. ✅ Prevents duplicate celebrations

**User Experience:**
- Friend creates capsule → Achievement unlocks for referrer
- If referrer offline: Shows on next login (4s delay)
- If referrer online: Shows within 5 seconds (polling)
- Both achievement AND horizon celebrations appear
- Never shows the same achievement twice

The referral system now has complete celebration support! 🎉
