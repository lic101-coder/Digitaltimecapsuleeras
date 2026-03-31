# 🐛 TROUBLESHOOTING: Deleted & Recreated User Account Issues

## Problem Summary

When you **delete a user from Supabase Auth** and then **recreate the account with the same email**, you get a **NEW user ID**, but **orphaned data** remains in the database (KV store and Postgres tables) associated with the **OLD user ID**.

### The Symptoms You're Experiencing:

1. ❌ **First Capsule Tutorial doesn't show automatically** (it should show after Eras Gate for brand new users)
2. ❌ **Achievement modals show but don't actually unlock** (A001 "First Step" ceremony plays, but achievement stays locked)
3. ❌ **Title modals show but title remains unequipped** ("Time Novice" ceremony plays, but title doesn't unlock in Horizon Gallery)

### Root Cause:

The onboarding system checked the backend for `first_capsule` completion state and found **orphaned data from your previous account** (same email, different user ID), causing it to think you're a returning user.

---

## 🛠️ SOLUTION: Complete Data Reset

I've created a **data reset endpoint** and utility component to completely wipe all user data for testing purposes.

### Step 1: Add the Reset Button to Your UI (Temporary)

The reset button component is already created at `/components/debug/UserDataResetButton.tsx`.

**Option A: Test via Browser Console (Recommended)**

1. Open your browser console (F12)
2. Make sure you're signed in to Eras
3. Copy and paste this code:

\`\`\`javascript
// Get your access token
const getAccessToken = async () => {
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
  const supabase = createClient(
    'https://apdfvpgaznpqlordkipw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhbnBxbG9yZGtpcHciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzg3MjA1NSwiZXhwIjoyMDQ5NDQ4MDU1fQ.dEKqGRUuSvqFk1KWX0F_zp1J0kAO6qKaTVp9OlrIf9Q'
  );
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Reset all user data
const resetUserData = async () => {
  const token = await getAccessToken();
  if (!token) {
    console.error('❌ Not signed in - please sign in first');
    return;
  }
  
  console.log('🧹 Resetting all user data...');
  
  const response = await fetch(
    'https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/debug/reset-user-data',
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json',
      },
    }
  );
  
  const result = await response.json();
  
  if (response.ok) {
    console.log('✅ Data reset successful!', result);
    
    // Clear localStorage
    const keys = [
      'eras_onboarding_first_capsule_completed',
      'eras_onboarding_completion',
      'eras_onboarding_exit',
      'eras_onboarding_in_progress',
      'eras_defer_first_capsule_achievements',
    ];
    
    keys.forEach(key => localStorage.removeItem(key));
    
    // Clear retroactive check for this user
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('eras-retroactive-checked-')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('🧹 localStorage cleared');
    console.log('🔄 Reloading page in 2 seconds...');
    
    setTimeout(() => location.reload(), 2000);
  } else {
    console.error('❌ Reset failed:', result);
  }
};

// Run it!
resetUserData();
\`\`\`

4. Wait for the success message and automatic page reload
5. You should now see the **First Capsule Tutorial** immediately after the **Eras Gate**!

---

**Option B: Add Reset Button to Settings Menu**

If you prefer a UI button, temporarily add this to your Settings dropdown:

1. Open `/App.tsx`
2. Import the component:
   \`\`\`tsx
   import { UserDataResetButton } from './components/debug/UserDataResetButton';
   \`\`\`

3. Add it inside the Settings dropdown (after "Sign Out" button):
   \`\`\`tsx
   {/* Developer: Data Reset Button (REMOVE AFTER TESTING) */}
   {process.env.NODE_ENV === 'development' && (
     <div className="mt-2 pt-2 border-t border-red-500/30">
       <UserDataResetButton 
         accessToken={auth.session?.access_token}
         onClose={() => setShowSettingsDropdown(false)}
       />
     </div>
   )}
   \`\`\`

4. Click the **"Reset All Data"** button
5. Confirm the scary warning
6. Wait for success message and automatic reload

---

### Step 2: Verify the Fix

After running the reset and page reload:

1. ✅ **Eras Gate should play** (lunar eclipse animation)
2. ✅ **First Capsule Tutorial should show automatically** (right after Eras Gate completes)
3. ✅ **Follow the tutorial** (or skip it)
4. ✅ **A001 "First Step" achievement modal should show**
5. ✅ **Achievement should actually unlock** (check Achievements page - should show as unlocked)
6. ✅ **"Time Novice" title modal should show** (after closing A001 modal)
7. ✅ **Title should be equipped** (check Profile - should show "Time Novice" under your name)
8. ✅ **Horizon Gallery should show Time Novice** (and it should be selectable/equipped)

---

## 🔍 What The Reset Endpoint Does

The \`/debug/reset-user-data\` endpoint completely wipes:

### KV Store Keys Deleted:
- \`onboarding:{userId}\` - Onboarding completion state
- \`user_achievements:{userId}\` - Achievement array
- \`achievement_progress:{userId}\` - Progress tracking
- \`achievement_queue_{userId}\` - Notification queue
- \`user_title_profile:{userId}\` - Title profile
- \`profile:{userId}\` - User profile
- \`user_stats:{userId}\` - Capsule stats
- \`legacy_access:{userId}\` - Legacy Access data
- \`referral:{userId}\` - Referral data
- \`referrer_achievements:{userId}\` - Referrer rewards
- \`theme_purchases:{userId}\` - Theme purchases (KV - legacy)
- \`beneficiary_slots:{userId}\` - Beneficiary slots (KV - legacy)

### Postgres Tables Cleared:
- \`theme_purchases\` (WHERE user_id = your_id)
- \`beneficiary_slots\` (WHERE user_id = your_id)
- \`user_achievements\` (WHERE user_id = your_id)
- \`user_titles\` (WHERE user_id = your_id)

### localStorage Keys Cleared:
- \`eras_onboarding_first_capsule_completed\`
- \`eras_onboarding_completion\`
- \`eras_onboarding_exit\`
- \`eras_onboarding_in_progress\`
- \`eras_defer_first_capsule_achievements\`
- \`eras-retroactive-checked-{userId}\`

---

## 🎯 Expected Onboarding Flow (After Reset)

### For FIRST-TIME Users:

1. **Sign In** → User enters credentials
2. **Eras Gate** → Lunar eclipse animation plays (10-15 seconds)
3. **First Capsule Tutorial** → Automatic tutorial overlay appears
   - Shows you how to create your first capsule
   - Can be completed or skipped
4. **A001 "First Step" Modal** → Achievement unlock ceremony plays
   - Achievement is saved to database
   - Modal shows "First Step" achievement unlocked
5. **Time Novice Title Modal** → Title unlock ceremony plays
   - Title is saved to database
   - Title is automatically equipped
   - Shows in Profile and Horizon Gallery
6. **Home Screen** → User can now use the app normally

### For RETURNING Users (subsequent sign-ins):

1. **Sign In** → User enters credentials
2. **Eras Gate** → Lunar eclipse animation plays (10-15 seconds)
3. **Home Screen** → No tutorial, no achievement modals (already completed)

---

## 🚨 Important Notes

1. **DON'T delete users from Supabase Auth for testing** - Use this reset endpoint instead
2. **The reset endpoint only works for your own account** (requires your access token)
3. **Capsules are NOT deleted** - They're stored separately and tied to your user ID
4. **The reset is PERMANENT** - There's no undo button
5. **Remove the debug button from production** - It's for testing only

---

## 🔮 Why This Happened

Supabase Auth stores user accounts in its \`auth.users\` table. When you delete a user:
- ✅ Auth record is deleted (email becomes available again)
- ❌ KV store data is NOT deleted (orphaned)
- ❌ Postgres data is NOT deleted (orphaned)

When you recreate the account:
- ✅ New auth record created with NEW user ID
- ❌ Old KV data still exists (but for old user ID)
- ❌ Your NEW user ID has no data conflicts
- ❌ BUT: The onboarding check might find old data if it's not properly scoped to user ID

The actual bug was that the retroactive migration was running and checking for old data, triggering achievement modals without actually saving them properly.

---

## 📋 Developer Checklist

For future account testing:

- [ ] Use the reset endpoint instead of deleting users
- [ ] Clear localStorage after reset
- [ ] Verify Eras Gate plays
- [ ] Verify First Capsule Tutorial shows
- [ ] Verify achievements actually unlock (check database)
- [ ] Verify titles actually unlock (check Horizon Gallery)
- [ ] Remove debug components before production deploy

---

## 🆘 If Issues Persist

If the tutorial still doesn't show after reset:

1. Check browser console for errors
2. Verify the onboarding state is cleared:
   \`\`\`javascript
   // Run in console
   fetch('https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/onboarding/state', {
     method: 'POST',
     headers: {
       'Authorization': 'Bearer YOUR_PUBLIC_ANON_KEY',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ userId: 'YOUR_USER_ID' })
   }).then(r => r.json()).then(console.log);
   \`\`\`
   Should return: \`{ completionState: {} }\` or \`{ completionState: { first_capsule: false } }\`

3. Check localStorage:
   \`\`\`javascript
   // Should all be null
   console.log(localStorage.getItem('eras_onboarding_first_capsule_completed'));
   \`\`\`

4. Force a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

**Ready to test? Run the console script above and watch the magic happen! ✨**
