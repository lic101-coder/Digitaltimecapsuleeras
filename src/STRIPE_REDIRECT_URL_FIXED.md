# Stripe Redirect URL Fix ✅

## Problem
After completing a Stripe purchase, users were redirected to `https://apdfvpgaznpqlordkipw.supabase.co/?purchase=success` (the Supabase backend URL) instead of the frontend app, causing a `{"error":"requested path is invalid"}` error.

## Root Cause
The server code was constructing the redirect URL from `SUPABASE_URL` environment variable, which points to the backend API, not the frontend app:

```typescript
// ❌ BEFORE: Redirected to backend URL
const appUrl = Deno.env.get('APP_URL') || `https://${Deno.env.get('SUPABASE_URL')?.split('//')[1]?.split('.')[0]}.supabase.co`;
// Result: https://apdfvpgaznpqlordkipw.supabase.co
```

## Solution

### 1. Fixed Redirect URL (Backend)
**File:** `/supabase/functions/server/index.tsx`

Updated both purchase endpoints to use the correct frontend URL:

```typescript
// ✅ AFTER: Redirects to frontend app
const appUrl = Deno.env.get('APP_URL') || 'https://found-shirt-81691824.figma.site';
console.log(`🔗 [Purchase] Redirecting to app URL: ${appUrl}`);
```

**Changes:**
- **Theme/Bundle Purchase** (line ~15055): Fixed redirect URL
- **Beneficiary Purchase** (line ~15126): Fixed redirect URL
- Added logging to show which URL is being used
- Added comment reminding to set `APP_URL` for production deployment

### 2. Added Frontend Handling
**File:** `/components/Settings.tsx`

Added `useEffect` hook to detect and handle purchase success/cancel query parameters:

```typescript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const purchaseStatus = urlParams.get('purchase');
  const beneficiaryPurchase = urlParams.get('beneficiary_purchase');
  const product = urlParams.get('product');

  if (purchaseStatus === 'success') {
    toast.success(
      product 
        ? `Successfully purchased ${product}! 🎉`
        : 'Purchase completed successfully! 🎉',
      { duration: 5000 }
    );
    window.history.replaceState({}, '', window.location.pathname);
  } else if (beneficiaryPurchase === 'success') {
    toast.success('Beneficiary access purchased successfully! 🎉', { duration: 5000 });
    window.history.replaceState({}, '', window.location.pathname);
  }
  // ... cancel handlers
}, []);
```

**Features:**
- Shows success toast for theme/bundle purchases
- Shows success toast for beneficiary purchases
- Handles canceled purchases with info toast
- Cleans up URL query parameters after showing notification

## Testing Checklist

### Theme Purchase Flow
1. ✅ Click "Buy Now" on a theme in Store
2. ✅ Complete Stripe checkout
3. ✅ Redirected to `https://found-shirt-81691824.figma.site/?purchase=success&product=THEME_KEY`
4. ✅ See success toast: "Successfully purchased THEME_KEY! 🎉"
5. ✅ URL cleaned to remove query parameters
6. ✅ Theme appears in purchased themes list

### Beneficiary Purchase Flow
1. ✅ Open Settings > Legacy Access Management
2. ✅ Click "Purchase Additional Access"
3. ✅ Complete Stripe checkout
4. ✅ Redirected to `https://found-shirt-81691824.figma.site/?beneficiary_purchase=success`
5. ✅ See success toast: "Beneficiary access purchased successfully! 🎉"
6. ✅ URL cleaned to remove query parameters
7. ✅ Beneficiary limit updated

## Production Deployment

When deploying to `erastimecapsule.com`:

### Step 1: Set Environment Variable
In Supabase Dashboard → Edge Functions → Environment Variables:
```
APP_URL = https://erastimecapsule.com
```

### Step 2: Verify Redirect URLs
After setting `APP_URL`, Stripe will redirect to:
- Success: `https://erastimecapsule.com/?purchase=success&product=THEME_KEY`
- Cancel: `https://erastimecapsule.com/?purchase=canceled`

### Step 3: Update Stripe Dashboard (Optional)
While not required (since we're using dynamic URLs), you can add these to your allowed redirect URLs in Stripe Dashboard for extra security:
- `https://erastimecapsule.com/*`
- `https://found-shirt-81691824.figma.site/*` (keep for testing)

## Related Fixes
- **Theme Unlock Fix:** `/STRIPE_PURCHASE_FLOW_FIXED.md` - Added missing `/api/store/purchases` endpoint
- **Webhook Logging:** Enhanced error logging in Stripe webhook handler

## Notes
- The `APP_URL` environment variable takes precedence if set
- Falls back to Figma site URL if not set (for development/testing)
- Frontend handles both `purchase=success` and `beneficiary_purchase=success`
- URL cleanup ensures users don't see messy query parameters
- All redirect handling is done client-side after successful redirect
