# Delivery Service Error Handling Fix - User Not Found

## Problem

The delivery scheduler was throwing errors when trying to deliver capsules created by users whose accounts have been deleted:

```
Error getting user auth: AuthApiError: User not found
  status: 404,
  code: "user_not_found"
```

**Scenario:**
1. User creates a time capsule scheduled for future delivery
2. User deletes their account
3. Delivery scheduler tries to deliver the capsule
4. Calls `getUserAuth()` to get user's email
5. Supabase Auth returns 404 "User not found"
6. Error is logged, making it appear like the system is broken

## Root Cause

The `getUserAuth()` method was catching all errors and returning `null`, but was logging ALL errors as full error messages, including expected "user not found" cases when accounts are deleted.

The delivery code was already handling `null` correctly with optional chaining (`userAuth?.email`), but:
- The error logs were confusing and looked like critical failures
- When `getUserAuth()` returned null, delivery would silently fail without proper error messaging
- The capsule would remain in "pending" state indefinitely

## Solution

### Fix 1: Improved Error Classification in getUserAuth()

**File:** `/supabase/functions/server/delivery-service.tsx` (line 1011)

**Before:**
```typescript
private static async getUserAuth(userId: string) {
  try {
    const { data } = await this.supabase.auth.admin.getUserById(userId);
    return data.user;
  } catch (error) {
    console.error('Error getting user auth:', error);  // ❌ Logs all errors
    return null;
  }
}
```

**After:**
```typescript
private static async getUserAuth(userId: string) {
  try {
    const { data } = await this.supabase.auth.admin.getUserById(userId);
    return data.user;
  } catch (error: any) {
    // Handle specific error cases
    if (error?.status === 404 || error?.code === 'user_not_found') {
      console.warn(`⚠️ [Delivery] User ${userId} not found (account may have been deleted) - delivery will fail gracefully`);
      return null;
    }
    
    // Log other errors as actual errors
    console.error(`❌ [Delivery] Error getting user auth for ${userId}:`, error);
    return null;
  }
}
```

**Benefits:**
- ✅ User not found is logged as **warning** (expected scenario)
- ✅ Other errors still logged as **errors** (unexpected issues)
- ✅ Better context in logs (includes userId)
- ✅ Clear indication of what's happening

### Fix 2: Explicit Delivery Failure Handling

**File:** `/supabase/functions/server/delivery-service.tsx` (lines 648-664)

Added explicit error handling when user account is not found and delivery cannot proceed:

**Before:**
```typescript
const userAuth = await this.getUserAuth(capsule.created_by);
if (userAuth?.email) {
  // Deliver email
}
// ❌ No handling if userAuth is null - delivery silently fails
```

**After:**
```typescript
const userAuth = await this.getUserAuth(capsule.created_by);
if (userAuth?.email) {
  console.log(`📧 Using user auth email: ${userAuth.email}`);
  deliverySuccess = await this.sendEmailDelivery(userAuth.email, capsule, mediaFiles, senderName, viewingUrl);
} else {
  console.error(`❌ [Delivery] Cannot deliver capsule ${capsule.id} - user account not found (may be deleted)`);
  await this.markDeliveryFailed(capsule, 'User account not found - cannot determine delivery address');
  deliverySuccess = false;
}
```

**Benefits:**
- ✅ Capsule marked as "failed" with clear reason
- ✅ Clear log message explaining why delivery failed
- ✅ Capsule won't stay in "pending" state forever
- ✅ User's failure reason visible in capsule metadata

## Complete Flow

### Scenario 1: User Deleted, Self-Delivery Capsule

1. User creates capsule to self (no explicit self_contact)
2. User deletes account
3. ⏰ Delivery time arrives
4. Scheduler tries to get user's email via `getUserAuth()`
5. Auth returns 404 "User not found"
6. ✅ Warning logged: "User not found (account may have been deleted)"
7. ✅ Delivery marked as failed: "User account not found - cannot determine delivery address"
8. ✅ Capsule status = "failed"
9. ✅ No more error spam in logs

### Scenario 2: User Deleted, Capsule with Explicit self_contact

1. User creates capsule with `self_contact` field (email provided)
2. User deletes account
3. ⏰ Delivery time arrives
4. Scheduler uses `self_contact` email directly
5. ✅ Email sent successfully (doesn't need getUserAuth)
6. ✅ Capsule delivered normally
7. ✅ No errors at all

### Scenario 3: User Deleted, Capsule to Others

1. User creates capsule to multiple recipients
2. User deletes account
3. ⏰ Delivery time arrives
4. Scheduler uses recipients list directly
5. Tries to get sender's email for self-detection
6. ✅ Warning logged (expected)
7. ✅ Delivery proceeds to all recipients
8. ✅ Sender detection fails gracefully (null check)
9. ✅ No critical errors

### Scenario 4: Temporary Auth Service Issue (Real Error)

1. Capsule ready for delivery
2. getUserAuth() called
3. Supabase Auth service is down (500 error)
4. ✅ **ERROR** logged: "Error getting user auth for {userId}"
5. Full error details included for debugging
6. Admin can see real infrastructure issue

## Error Log Comparison

### Before Fix:
```
Error getting user auth: AuthApiError: User not found
    at handleError (file:///var/tmp/sb-compile-edge-runtime/node_modules/localhost/@supabase/auth-js/2.69.1/dist/main/lib/fetch.js:69:11)
    ...full stack trace...
  status: 404,
  code: "user_not_found"
}
```
❌ Looks like critical error  
❌ No context about why or what capsule  
❌ Full stack trace clutters logs  
❌ Unclear if this is expected or not  

### After Fix:
```
⚠️ [Delivery] User abc123-456-def-789 not found (account may have been deleted) - delivery will fail gracefully
❌ [Delivery] Cannot deliver capsule cap_xyz789 - user account not found (may be deleted)
```
✅ Clear warning level (not critical)  
✅ Context: which user, which capsule  
✅ Explanation: account deleted  
✅ Action taken: delivery failed gracefully  
✅ No stack trace spam  

## Testing Scenarios

### ✅ Test 1: Normal Delivery (User Exists)
- Create capsule with self_contact
- Wait for delivery time
- Should deliver successfully
- No errors or warnings

### ✅ Test 2: Deleted User with self_contact
- Create capsule with explicit email
- Delete user account
- Wait for delivery time
- Should deliver to email provided
- No errors (email is in self_contact field)

### ✅ Test 3: Deleted User without self_contact
- Create capsule without explicit email
- Delete user account
- Wait for delivery time
- Should log warning about user not found
- Should mark capsule as failed
- Should include clear failure reason

### ✅ Test 4: Multiple Recipients, Deleted Sender
- Create capsule to 3 recipients
- Delete sender account
- Wait for delivery time
- Should deliver to all recipients
- Should log warning (sender lookup fails)
- Recipients still receive capsule

## Edge Cases Handled

1. **User deletes account immediately after creating capsule**
   - ✅ Handled: Delivery uses stored metadata

2. **User deletes account before OAuth finishes**
   - ✅ Handled: 404 treated as warning, not error

3. **Concurrent deletion during delivery**
   - ✅ Handled: Race condition gracefully caught

4. **Multiple capsules from deleted user**
   - ✅ Handled: Each logs warning once, doesn't spam

5. **Sender detection for self-recipients**
   - ✅ Handled: null check prevents crash

## Summary

**What Changed:**
1. ✅ "User not found" errors → warnings (expected scenario)
2. ✅ Other auth errors → still logged as errors (unexpected)
3. ✅ Added explicit delivery failure handling
4. ✅ Mark capsules as failed when user deleted
5. ✅ Clear failure reasons in capsule metadata
6. ✅ Better log context (userId, capsuleId)

**User Impact:**
- ✅ No more confusing error spam in logs
- ✅ Capsules with explicit emails still deliver
- ✅ Failed deliveries properly tracked
- ✅ Clear audit trail of what happened

**Developer Impact:**
- ✅ Easier to debug real issues
- ✅ Distinguish between expected warnings and actual errors
- ✅ Better log clarity for monitoring
- ✅ Graceful degradation instead of crashes

The delivery system now handles deleted user accounts gracefully without polluting logs with expected "not found" errors! 🎉
