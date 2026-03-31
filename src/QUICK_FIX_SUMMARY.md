# 🎯 QUICK FIX: Your Account Issues

## The Problem

You deleted your Supabase user and recreated it with the same email. **Orphaned data** from the old user ID is causing:

1. ❌ First Capsule Tutorial not showing
2. ❌ Achievement ceremonies playing but not actually unlocking
3. ❌ Title modals showing but titles staying locked

## The Solution (2 Minutes)

### Step 1: Copy This Entire Code Block

\`\`\`javascript
(async function resetErasData() {
  console.log('🧹 Starting Eras data reset...');
  
  try {
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(
      'https://apdfvpgaznpqlordkipw.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhbnBxbG9yZGtpcHciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzg3MjA1NSwiZXhwIjoyMDQ5NDQ4MDU1fQ.dEKqGRUuSvqFk1KWX0F_zp1J0kAO6qKaTVp9OlrIf9Q'
    );
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      console.error('❌ Not signed in! Please sign in first.');
      return;
    }
    
    console.log('✅ Session found:', session.user.email);
    console.log('🗑️ Calling reset endpoint...');
    
    const response = await fetch(
      'https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/debug/reset-user-data',
      {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${session.access_token}\`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Reset failed:', result);
      return;
    }
    
    console.log('✅ Backend data wiped!');
    console.log('   • KV keys deleted:', result.deleted.kvKeys);
    console.log('   • Postgres tables cleared:', result.deleted.postgresTables.length);
    
    console.log('🧹 Clearing localStorage...');
    const keysToRemove = [
      'eras_onboarding_first_capsule_completed',
      'eras_onboarding_completion',
      'eras_onboarding_exit',
      'eras_onboarding_in_progress',
      'eras_defer_first_capsule_achievements',
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('eras-retroactive-checked-')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('✅ localStorage cleared!');
    console.log('🎉 SUCCESS! Reloading in 3 seconds...');
    
    setTimeout(() => location.reload(), 3000);
    
  } catch (error) {
    console.error('💥 Reset failed:', error);
  }
})();
\`\`\`

### Step 2: Run It

1. Make sure you're **signed in** to Eras
2. Open browser console (Press **F12** or **Cmd+Option+J**)
3. Paste the entire code block
4. Press **Enter**
5. Wait 3 seconds for automatic reload

### Step 3: Verify It Worked

After the page reloads, the correct flow should happen:

1. ✅ **Eras Gate** plays (lunar eclipse)
2. ✅ **First Capsule Tutorial** shows automatically
3. ✅ **A001 "First Step"** achievement unlocks (and saves to database!)
4. ✅ **"Time Novice"** title unlocks (and actually equips!)
5. ✅ Check Achievements page - A001 should be **unlocked** (not grey)
6. ✅ Check Horizon Gallery - Time Novice should be **selectable/equipped**

---

## What This Does

The script:
- ✅ Wipes all KV store data (onboarding, achievements, titles, profile)
- ✅ Clears all Postgres data (purchases, achievements, titles)
- ✅ Removes localStorage flags that track onboarding
- ✅ Reloads the page to start fresh

You'll be treated as a **brand new user** going through first-time onboarding.

---

## Files Created For You

1. **/supabase/functions/server/index.tsx** - Added \`/debug/reset-user-data\` endpoint
2. **/components/debug/UserDataResetButton.tsx** - React component (if you want a UI button)
3. **/DELETED_USER_TROUBLESHOOTING.md** - Full documentation
4. **/scripts/reset-user-data-console.js** - The console script
5. **/QUICK_FIX_SUMMARY.md** - This file

---

## Need Help?

If it still doesn't work after running the script:
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check console for any error messages
4. Let me know and I'll investigate further

**The script should fix everything! Just copy/paste and run it.** 🚀
