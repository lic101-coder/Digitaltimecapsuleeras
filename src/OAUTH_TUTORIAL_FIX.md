# Google OAuth Re-Login Tutorial Bug Fix

## Problem
Users who already created an account and completed the "First Capsule" tutorial were seeing it again every time they logged in with Google OAuth.

## Root Cause
The onboarding system had a disconnect between localStorage and backend KV store:

1. **Two different checks:**
   - Title Modal trigger (line 1123 in App.tsx) checked: `localStorage.getItem('eras_onboarding_first_capsule_completed')`
   - OAuth login check (line 1846 in App.tsx) checked: Backend KV store `completionState.first_capsule`

2. **localStorage key was never set:**
   - The localStorage key `eras_onboarding_first_capsule_completed` was checked but **never written to**
   - Only the backend KV store was updated via the `/onboarding/complete` endpoint

3. **OAuth re-login behavior:**
   - Every time a user logs in with Google OAuth, the app calls `checkOnboarding()` (line 1821)
   - This checked the backend, but if localStorage wasn't in sync, the check would fail
   - Result: Tutorial showed again even for existing users

## Solution

### Fix 1: Save to localStorage When Marking Complete
**File:** `/components/onboarding/OnboardingOrchestrator.tsx`

Added localStorage persistence in `markModuleComplete()`:
```typescript
const markModuleComplete = async (moduleId: string) => {
  try {
    // Save to backend KV store
    await fetch(...);
    
    // CRITICAL: Also save to localStorage for OAuth re-login checks
    if (moduleId === 'first_capsule') {
      localStorage.setItem('eras_onboarding_first_capsule_completed', 'true');
      logger.info('Onboarding: Saved first_capsule completion to localStorage');
    }
  } catch (error) {
    logger.error('Failed to mark module complete:', error);
  }
};
```

**Why this works:**
- When user completes First Capsule tutorial, it now saves to **both** backend KV and localStorage
- Future checks (both Title Modal and OAuth) will find the flag

### Fix 2: Check localStorage First on OAuth Login
**File:** `/App.tsx` (line 1821)

Added localStorage check before backend query:
```typescript
const checkOnboarding = async () => {
  try {
    console.log("📚 [ONBOARDING] Checking if user needs onboarding");
    
    // CRITICAL: First check localStorage for faster response
    const localStorageCompleted = localStorage.getItem('eras_onboarding_first_capsule_completed');
    if (localStorageCompleted === 'true') {
      console.log("📚 [ONBOARDING] User has completed onboarding (localStorage check)");
      return; // Skip backend check, user has completed
    }
    
    // Backend check (for cross-device consistency)
    const response = await fetch(...);
    
    if (response.ok) {
      const data = await response.json();
      const completionState = data.completionState || {};

      if (!completionState.first_capsule) {
        // Show onboarding
        setShowOnboarding(true);
      } else {
        console.log("📚 [ONBOARDING] User has completed onboarding (backend check)");
        // Sync to localStorage for future fast checks
        localStorage.setItem('eras_onboarding_first_capsule_completed', 'true');
      }
    }
  } catch (error) {
    console.error("❌ [ONBOARDING] Failed to check onboarding state:", error);
  }
};
```

**Why this works:**
- Checks localStorage FIRST (instant, no network call)
- If found, immediately returns without showing tutorial
- If not found, checks backend and syncs result to localStorage
- This handles:
  - Same device re-login: localStorage hit (fast)
  - Different device login: Backend hit, then localStorage sync
  - OAuth redirects: localStorage persists through redirect

## Benefits

1. **Faster:** localStorage check is instant (no network latency)
2. **Reliable:** Dual persistence (localStorage + backend)
3. **Cross-device aware:** Backend check ensures consistency
4. **OAuth-friendly:** localStorage survives OAuth redirects
5. **Backward compatible:** Syncs backend state to localStorage on first check

## Testing

### Test Case 1: First-Time User
1. New user signs up with Google OAuth
2. Completes First Capsule tutorial
3. ✅ localStorage flag is set
4. ✅ Backend KV store is updated
5. Re-login with Google → ✅ Tutorial does NOT show

### Test Case 2: Existing User (Same Device)
1. User already completed tutorial before this fix
2. localStorage flag doesn't exist yet
3. Logs in with Google OAuth
4. ✅ Backend check finds completion
5. ✅ Syncs to localStorage
6. ✅ Tutorial does NOT show
7. Next login → ✅ localStorage hit (instant, no tutorial)

### Test Case 3: Existing User (Different Device)
1. User completed tutorial on Device A
2. Logs in on Device B with Google OAuth
3. ✅ Backend check finds completion
4. ✅ Syncs to Device B localStorage
5. ✅ Tutorial does NOT show

### Test Case 4: Title Modal Trigger
1. User completes First Capsule
2. Creates actual first capsule
3. Earns "Time Novice" achievement
4. Title modal closes
5. ✅ Checks localStorage flag
6. ✅ Finds flag = 'true'
7. ✅ Does NOT trigger tutorial again

## Summary

The bug was caused by incomplete state persistence. The fix ensures onboarding completion is saved to **both** localStorage (for speed) and backend KV (for cross-device sync), and checks are done in the optimal order (localStorage first, backend fallback).

This solves the Google OAuth re-login issue where returning users saw the First Capsule tutorial repeatedly.
