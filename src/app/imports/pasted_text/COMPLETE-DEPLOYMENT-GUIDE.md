# 🚀 Complete Bundle Deployment Guide
## SAFEST Approach - With RLS, Constraints & Stripe Webhooks

---

## 🛡️ Safety Confirmation

✅ **Your server uses `SUPABASE_SERVICE_ROLE_KEY`** → Bypasses RLS  
✅ **Triggers use `SECURITY DEFINER`** → Bypasses RLS  
✅ **RLS is SAFE to enable** → Protects against cheating  

**Translation**: Stripe webhooks will work perfectly even with RLS enabled.

---

## 📋 What You're Installing

| Component | Purpose | Safety |
|-----------|---------|--------|
| **Bundles Table** | Store 4 bundles with Stripe IDs | ✅ Public read-only |
| **Constraints** | Prevent duplicate purchases | ✅ Data integrity |
| **Indexes** | Fast lookups | ✅ Performance |
| **RLS Policies** | Block frontend cheating | ✅ Security |
| **Triggers** | Auto-unlock themes + stats | ✅ SECURITY DEFINER |

---

## 🎯 Deployment Steps (Run in Order)

### Step 1: Database Setup
Open **Supabase Dashboard → SQL Editor** and run these **in exact order**:

#### 1.1 Create Bundles Table
```sql
-- File: /imports/pasted_text/bundle-setup.sql
-- What it does:
--   ✅ Creates bundles table with Stripe product/price IDs
--   ✅ Inserts 4 bundles (complete-library, life-milestones, celebration, inner-journey)
--   ✅ Adds purchased_count column
--   ✅ Creates stats auto-increment trigger
--   ✅ Enables RLS with public read policy
```
**Run this file FIRST** ⬆️

#### 1.2 Create Theme Unlock Trigger
```sql
-- File: /imports/pasted_text/bundle-theme-unlock-trigger.sql
-- What it does:
--   ✅ Creates SECURITY DEFINER function (bypasses RLS)
--   ✅ Auto-unlocks all themes when bundle purchased
--   ✅ Prevents duplicate unlocks
--   ✅ Logs detailed info for debugging
```
**Run this file SECOND** ⬆️

#### 1.3 Add Constraints, Indexes & RLS
```sql
-- File: /imports/pasted_text/database-constraints-and-rls.sql
-- What it does:
--   ✅ Adds UNIQUE indexes (prevent duplicate purchases)
--   ✅ Adds foreign keys (data integrity)
--   ✅ Adds performance indexes (fast queries)
--   ✅ Enables RLS on purchase tables
--   ✅ Creates safe SELECT-only policies for frontend
--   ✅ Blocks INSERT/UPDATE/DELETE from frontend
--   ✅ Verifies webhook will work (service role bypasses RLS)
```
**Run this file THIRD** ⬆️

#### 1.4 Verify Setup (Optional but Recommended)
```sql
-- File: /imports/pasted_text/verify-bundle-setup.sql
-- What it does:
--   ✅ Runs 10 automated checks
--   ✅ Shows detailed status of all components
--   ✅ Confirms RLS is safe for webhooks
--   ✅ Lists all constraints, indexes, policies
```
**Run this file to verify** ⬆️

---

### Step 2: Deploy Server Function
```bash
supabase functions deploy make-server-f9be53a7
```

**What this deploys**:
- Updated webhook handler with Stripe ID resolution
- Bundle diagnostics endpoint
- All existing functionality preserved

---

### Step 3: Verify Deployment

#### 3.1 Check Bundle Configuration
```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-f9be53a7/bundle-diagnostics \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Expected output**:
```json
{
  "status": "success",
  "total_bundles": 4,
  "all_stats_in_sync": true,
  "bundles": [
    {
      "id": "complete-library",
      "name": "Complete Theme Library",
      "stripe_product_id": "prod_UBF7QhqUggiUm0",
      "stripe_price_id": "price_1TCsdYHUyotQ1kngEB9gOyr2",
      "price": 9.99,
      "theme_count": 11,
      "purchased_count": 0,
      "actual_purchase_count": 0,
      "stats_in_sync": true
    },
    ...3 more bundles
  ]
}
```

#### 3.2 Verify RLS is Working
In browser console (logged in):
```javascript
// This should work (you can view own purchases):
const { data, error } = await supabase
  .from('theme_purchases')
  .select('*');
console.log('My purchases:', data); // ✅ Should show your purchases

// This should FAIL (you cannot insert):
const { data, error } = await supabase
  .from('theme_purchases')
  .insert({ user_id: 'test', theme_id: 'wedding', purchase_type: 'individual' });
console.log(error); // ❌ Should show "insufficient privilege" error
```

---

### Step 4: Retry Failed Stripe Webhook

1. Go to **Stripe Dashboard → Developers → Webhooks**
2. Find failed event: `evt_1TDbpNHUyotQ1kng3jdcrhJj`
3. Click **"Resend"**
4. Expected result: **200 OK** ✅

**What should happen**:
1. Webhook expands line items → finds `prod_UBF7QhqUggiUm0`
2. Queries database → finds "complete-library" bundle with 11 themes
3. Inserts into `bundle_purchases` table (service role bypasses RLS)
4. Trigger fires → unlocks all 11 themes in `theme_purchases`
5. Stats trigger fires → increments `bundles.purchased_count`
6. Returns 200 OK to Stripe

---

### Step 5: Verify Purchase Worked

Check in Supabase SQL Editor:
```sql
-- Should show 1 bundle purchase
SELECT * FROM bundle_purchases;

-- Should show 11 theme purchases (unlocked by trigger)
SELECT * FROM theme_purchases WHERE purchase_type = 'bundle';

-- Should show purchased_count = 1
SELECT id, name, purchased_count FROM bundles WHERE id = 'complete-library';
```

---

## 🧪 Testing New Purchases

### Test 1: Try to Cheat (Should Fail)
In browser console:
```javascript
// Try to fake a purchase (should be blocked by RLS):
const { error } = await supabase
  .from('bundle_purchases')
  .insert({
    user_id: 'my-user-id',
    bundle_id: 'complete-library',
    price_paid: 0,
    stripe_payment_id: 'fake',
  });

console.log(error.code); // Expected: '42501' (insufficient privilege)
```
✅ **If this fails with permission error, RLS is working!**

### Test 2: Real Purchase (Should Work)
1. In your app, click "Buy Complete Library"
2. Complete Stripe checkout with test card
3. Wait for webhook to process
4. Refresh `/bundle-diagnostics` → `purchased_count` should increment
5. Check app → all 11 themes should be unlocked

---

## 🔍 Troubleshooting

### Issue: "No bundles found" in diagnostics
**Fix**: Run `bundle-setup.sql` in Supabase SQL Editor

### Issue: "Trigger missing" in verification
**Fix**: Run `bundle-theme-unlock-trigger.sql`

### Issue: Webhook returns 400 "Unknown bundle"
**Cause**: Old function deployed (doesn't have Stripe ID resolution)  
**Fix**: `supabase functions deploy make-server-f9be53a7`

### Issue: Webhook returns 500 error
**Check**: View logs in Supabase Dashboard → Edge Functions → make-server-f9be53a7  
**Common causes**:
- Bundles table doesn't exist → run setup scripts
- Trigger doesn't exist → run trigger script
- Wrong Stripe product ID → check `/bundle-diagnostics`

### Issue: Themes not unlocking after bundle purchase
**Check**: Does trigger exist?
```sql
SELECT * FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase';
```
**If empty**: Run `bundle-theme-unlock-trigger.sql`

### Issue: Stats not incrementing
**Check**: Does trigger exist?
```sql
SELECT * FROM pg_trigger WHERE tgname = 'update_bundle_stats';
```
**If empty**: Run `bundle-setup.sql`

### Issue: RLS blocking legitimate operations
**Check**: Is server using service role key?
```typescript
// In /supabase/functions/server/supabase-client.tsx:
const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // ✅ Must be service role
```
**If using anon key**: Change to service role key and redeploy

---

## 📊 What Each Table Does

### `bundles`
- **Purpose**: Master list of all bundles with Stripe IDs
- **Columns**: `id`, `name`, `stripe_product_id`, `stripe_price_id`, `price`, `themes`, `purchased_count`
- **RLS**: Public read-only (anyone can view bundles in store)
- **Updated by**: Stats trigger (auto-increment `purchased_count`)

### `bundle_purchases`
- **Purpose**: Record of each bundle purchase
- **Columns**: `id`, `user_id`, `bundle_id`, `price_paid`, `stripe_payment_id`, `created_at`
- **RLS**: Users can only SELECT their own purchases
- **Written by**: Webhook (service role key bypasses RLS)
- **Triggers**: Unlocks themes + increments stats

### `theme_purchases`
- **Purpose**: Record of each theme purchase (individual or from bundle)
- **Columns**: `id`, `user_id`, `theme_id`, `purchase_type`, `price_paid`, `stripe_payment_id`, `created_at`
- **RLS**: Users can only SELECT their own purchases
- **Written by**: Webhook (individual) + Trigger (bundle unlocks)

### `beneficiary_purchases`
- **Purpose**: Record of beneficiary slot purchases
- **Columns**: `id`, `user_id`, `product_id`, `slots_purchased`, `price_paid`, `stripe_payment_id`, `created_at`
- **RLS**: Users can only SELECT their own purchases
- **Written by**: Webhook (service role key bypasses RLS)

---

## 🎓 Key Concepts

### Service Role Key vs Anon Key
- **Anon Key**: Used by frontend, RLS enforced
- **Service Role Key**: Used by server/webhooks, bypasses ALL RLS

### SECURITY DEFINER
- SQL function runs with creator's permissions (postgres superuser)
- Bypasses RLS even when called by frontend
- Only runs in trusted contexts (triggers)

### Why RLS is Safe Here
1. Frontend uses anon key → RLS blocks writes
2. Server uses service role → RLS bypassed
3. Triggers use SECURITY DEFINER → RLS bypassed
4. All purchases must go through Stripe → no fake purchases possible

---

## ✅ Final Checklist

Before going live:

- [ ] Ran `bundle-setup.sql`
- [ ] Ran `bundle-theme-unlock-trigger.sql`
- [ ] Ran `database-constraints-and-rls.sql`
- [ ] Ran `verify-bundle-setup.sql` (shows "✅ SETUP COMPLETE")
- [ ] Deployed function: `supabase functions deploy make-server-f9be53a7`
- [ ] `/bundle-diagnostics` returns 4 bundles
- [ ] All bundles show `stats_in_sync: true`
- [ ] Retried failed Stripe webhook (200 OK)
- [ ] Purchase recorded in `bundle_purchases` table
- [ ] Themes unlocked in `theme_purchases` table
- [ ] Stats incremented in `bundles` table
- [ ] Frontend cannot INSERT purchases (RLS test passed)
- [ ] Frontend can SELECT own purchases (RLS test passed)
- [ ] Completed test purchase end-to-end

---

## 📚 Reference Files

| File | Purpose |
|------|---------|
| `QUICK-START.md` | 3-step quick reference |
| `bundle-setup.sql` | Creates bundles table + stats trigger |
| `bundle-theme-unlock-trigger.sql` | Creates theme unlock automation |
| `database-constraints-and-rls.sql` | Adds constraints + RLS policies |
| `verify-bundle-setup.sql` | 10 automated verification checks |
| `bundle-deployment-guide.md` | Detailed technical documentation |
| `BUNDLE-FIX-SUMMARY.md` | What was broken + how it's fixed |
| `RLS-SAFETY-GUIDE.md` | Why RLS is safe with Stripe webhooks |
| `COMPLETE-DEPLOYMENT-GUIDE.md` | This file - master guide |

---

## 🎉 Success Indicators

You're done when:
1. ✅ `/bundle-diagnostics` shows all 4 bundles
2. ✅ Verification script shows "✅ SETUP COMPLETE"
3. ✅ Failed webhook retried successfully (200 OK)
4. ✅ Test purchase unlocks themes correctly
5. ✅ Frontend RLS test blocks INSERT (security working)
6. ✅ Stats increment automatically on purchase

**Happy deploying!** 🚀
