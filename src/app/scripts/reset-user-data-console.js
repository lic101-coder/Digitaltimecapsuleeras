/*
 * 🧹 QUICK DATA RESET - Copy/Paste into Browser Console
 * 
 * This script will:
 * 1. Get your access token from the current session
 * 2. Call the reset endpoint to wipe all your data
 * 3. Clear localStorage
 * 4. Reload the page
 * 
 * After running this, you'll go through the new user flow again:
 * Sign In → Eras Gate → First Capsule Tutorial → A001 Achievement → Time Novice Title
 */

(async function resetErasData() {
  console.log('🧹 Starting Eras data reset...');
  
  try {
    // Get session from Supabase
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
    
    // Call reset endpoint
    const response = await fetch(
      'https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/debug/reset-user-data',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
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
    
    // Clear localStorage
    console.log('🧹 Clearing localStorage...');
    const keysToRemove = [
      'eras_onboarding_first_capsule_completed',
      'eras_onboarding_completion',
      'eras_onboarding_exit',
      'eras_onboarding_in_progress',
      'eras_defer_first_capsule_achievements',
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`   ✓ Removed: ${key}`);
    });
    
    // Remove retroactive check flags
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('eras-retroactive-checked-')) {
        localStorage.removeItem(key);
        console.log(`   ✓ Removed: ${key}`);
      }
    });
    
    console.log('✅ localStorage cleared!');
    console.log('');
    console.log('🎉 SUCCESS! Data reset complete.');
    console.log('🔄 Reloading page in 3 seconds...');
    console.log('');
    console.log('📚 Expected flow after reload:');
    console.log('   1. Eras Gate animation');
    console.log('   2. First Capsule Tutorial (automatic)');
    console.log('   3. A001 "First Step" achievement modal');
    console.log('   4. "Time Novice" title modal');
    console.log('   5. Home screen with unlocked achievement & title');
    
    setTimeout(() => {
      location.reload();
    }, 3000);
    
  } catch (error) {
    console.error('💥 Reset failed with error:', error);
    console.error('Please try again or contact support.');
  }
})();
