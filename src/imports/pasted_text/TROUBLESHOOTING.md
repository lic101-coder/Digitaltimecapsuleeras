# 🔧 TROUBLESHOOTING: "Still Not Working"

## Step 1: Run Diagnostics

**Open Supabase SQL Editor** and run:
```sql
-- File: /imports/pasted_text/DIAGNOSE-ISSUE.sql
```

This will check:
- ✅ Does bundles table exist?
- ✅ Are there 4 bundles?
- ✅ Do Stripe IDs match?
- ✅ Do triggers exist?
- ✅ Do functions have SECURITY DEFINER?
- ✅ Does test lookup work?

**Read the output carefully** - it will tell you exactly what's wrong.

---

## Step 2: Common Issues & Fixes

### Issue A: "❌ bundles table does not exist"

**Problem**: You didn't run `bundle-setup.sql` OR it failed silently

**Fix**:
1. Open Supabase Dashboard → SQL Editor
2. Copy/paste entire `bundle-setup.sql` file
3. Click **RUN**
4. **Check for errors** in the results panel
5. If error says "already exists", that's OK
6. Re-run diagnostic script to verify

---

### Issue B: "Bundle count: 0 (expected: 4)"

**Problem**: The INSERT statement failed

**Fix**:
```sql
-- Check if bundles table is empty
SELECT * FROM bundles;

-- If empty, manually insert:
INSERT INTO public.bundles (id, name, stripe_product_id, stripe_price_id, price, themes) VALUES
  (
    'complete-library',
    'Complete Theme Library',
    'prod_UBF7QhqUggiUm0',
    'price_1TCsdYHUyotQ1kngEB9gOyr2',
    9.99,
    ARRAY['wedding', 'career', 'future', 'new_life', 'travel', 'new_year', 'friendship', 'pet', 'gratitude', 'graduation', 'new_home']
  ),
  (
    'life-milestones',
    'Life Milestones',
    'prod_UBF8ZAfAoNwgZI',
    'price_1TCseDHUyotQ1kng86obk1HT',
    5.99,
    ARRAY['wedding', 'career', 'new_life', 'graduation', 'new_home']
  ),
  (
    'celebration',
    'Celebration Pack',
    'prod_UBF8RA7iFHig8v',
    'price_1TCsehHUyotQ1kngXZf0Qay2',
    2.49,
    ARRAY['friendship', 'travel', 'new_year', 'pet']
  ),
  (
    'inner-journey',
    'Inner Journey',
    'prod_UBFA1BVhrMDQrh',
    'price_1TCsfpHUyotQ1kngmT3KKiE0',
    1.99,
    ARRAY['future', 'gratitude']
  )
ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT id, name, stripe_product_id FROM bundles;
-- Should show 4 rows
```

---

### Issue C: "❌ unlock_themes_on_bundle_purchase trigger" missing

**Problem**: You didn't run `bundle-theme-unlock-trigger.sql`

**Fix**:
1. Open Supabase Dashboard → SQL Editor
2. Copy/paste entire `bundle-theme-unlock-trigger.sql` file
3. Click **RUN**
4. Check for errors
5. Re-run diagnostic script

---

### Issue D: "WITHOUT SECURITY DEFINER ❌ (will fail with RLS!)"

**Problem**: Trigger was created without SECURITY DEFINER

**Fix**:
```sql
-- Drop and recreate with SECURITY DEFINER
DROP FUNCTION IF EXISTS unlock_bundle_themes() CASCADE;

CREATE OR REPLACE FUNCTION unlock_bundle_themes()
RETURNS TRIGGER AS $$
DECLARE
  theme_id_var TEXT;
  bundle_row RECORD;
BEGIN
  RAISE NOTICE '🎁 [Trigger] Bundle purchase detected - user: %, bundle: %', NEW.user_id, NEW.bundle_id;
  
  -- Get bundle details
  SELECT * INTO bundle_row FROM bundles WHERE id = NEW.bundle_id;
  
  IF NOT FOUND THEN
    RAISE WARNING '⚠️ [Trigger] Bundle not found: %', NEW.bundle_id;
    RETURN NEW;
  END IF;
  
  RAISE NOTICE '📦 [Trigger] Unlocking % themes for bundle: %', array_length(bundle_row.themes, 1), bundle_row.name;
  
  -- Unlock each theme
  FOREACH theme_id_var IN ARRAY bundle_row.themes
  LOOP
    INSERT INTO theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
    VALUES (NEW.user_id, theme_id_var, 'bundle', 0, NEW.stripe_payment_id)
    ON CONFLICT (user_id, theme_id) DO NOTHING;
    
    RAISE NOTICE '  ✅ Unlocked theme: %', theme_id_var;
  END LOOP;
  
  RAISE NOTICE '🎉 [Trigger] Successfully unlocked all themes for user %', NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;  -- ← CRITICAL!

-- Recreate trigger
DROP TRIGGER IF EXISTS unlock_themes_on_bundle_purchase ON bundle_purchases;
CREATE TRIGGER unlock_themes_on_bundle_purchase
  AFTER INSERT ON bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION unlock_bundle_themes();

-- Verify
SELECT proname, prosecdef FROM pg_proc WHERE proname = 'unlock_bundle_themes';
-- prosecdef should be 't' (true)
```

---

### Issue E: "❌ Stripe ID lookup" fails

**Problem**: Stripe product IDs in database don't match Stripe

**Fix**:
```sql
-- Check what's in the database
SELECT id, stripe_product_id, stripe_price_id FROM bundles;

-- Check what's in your failed webhook
-- Go to Stripe Dashboard → Webhooks → Find failed event → View event details
-- Look for line_items[0].price.product

-- Update the mismatched bundle:
UPDATE bundles 
SET 
  stripe_product_id = 'prod_YOUR_ACTUAL_PRODUCT_ID',
  stripe_price_id = 'price_YOUR_ACTUAL_PRICE_ID'
WHERE id = 'complete-library';
```

To find your actual Stripe IDs:
1. **Stripe Dashboard** → Products
2. Click "Complete Theme Library"
3. Copy **Product ID** (starts with `prod_`)
4. Under Pricing, copy **Price ID** (starts with `price_`)
5. Update SQL above with real IDs

---

### Issue F: Function not deployed

**Problem**: You ran SQL but didn't deploy the Edge Function

**Fix**:
```bash
# Deploy the function
supabase functions deploy make-server-f9be53a7

# Watch for errors in the output
# Look for "Deployed successfully" message
```

**Common deployment errors**:
- `401 Unauthorized` → Run `supabase login`
- `Project not found` → Run `supabase link`
- `Syntax error` → Check `/supabase/functions/server/index.tsx` for errors

---

### Issue G: Old function still running

**Problem**: Function deployed but still using old code (cache)

**Fix**:
1. **Supabase Dashboard** → Edge Functions → `make-server-f9be53a7`
2. Click **"Restart"** or **"Delete"** then redeploy
3. Wait 30 seconds for cache to clear
4. Retry webhook

---

## Step 3: Check Function Logs

After deploying, check logs:

1. **Supabase Dashboard** → Edge Functions → `make-server-f9be53a7` → **Logs**
2. Retry failed webhook in Stripe
3. Watch logs for errors

**What to look for**:

### ✅ Good logs (working):
```
📦 [Webhook] Expanding line items...
   Product ID: prod_UBF7QhqUggiUm0
   Price ID: price_1TCsdYHUyotQ1kngEB9gOyr2
✅ [Webhook] Bundle resolved by product ID: complete-library
📦 [Webhook] Bundle found: Complete Theme Library
   Themes: 11
💾 [Webhook] Saving bundle purchase to Postgres...
✅ [Webhook] Bundle 'complete-library' purchase saved - triggers unlocking 11 themes
```

### ❌ Bad logs (still broken):
```
❌ [Webhook] Bundle NOT FOUND in database!
   Tried product_id: prod_UBF7QhqUggiUm0
   Tried price_id: price_1TCsdYHUyotQ1kngEB9gOyr2
```

**If you see "NOT FOUND"**:
- Go back to Step 1, run diagnostic
- Bundles table is empty or has wrong IDs

---

## Step 4: Test Database Directly

Run this in **Supabase SQL Editor**:

```sql
-- Test 1: Can we find the bundle?
SELECT * FROM bundles 
WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0';
-- Should return 1 row (complete-library)

-- Test 2: Can we insert a test purchase?
INSERT INTO bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('test-user-123', 'complete-library', 9.99, 'test-payment-123');
-- Should succeed

-- Test 3: Did the trigger unlock themes?
SELECT * FROM theme_purchases 
WHERE user_id = 'test-user-123' AND purchase_type = 'bundle';
-- Should return 11 rows (11 themes)

-- Test 4: Did stats increment?
SELECT id, purchased_count FROM bundles WHERE id = 'complete-library';
-- purchased_count should be 1

-- Cleanup test data
DELETE FROM bundle_purchases WHERE user_id = 'test-user-123';
DELETE FROM theme_purchases WHERE user_id = 'test-user-123';
```

**If Test 1 fails**: Bundles table is empty or wrong IDs (see Issue B)
**If Test 2 fails**: Check error message, probably RLS issue
**If Test 3 fails**: Trigger not created or broken (see Issue C)
**If Test 4 fails**: Stats trigger missing (re-run bundle-setup.sql)

---

## Step 5: RLS Issues

If you get `insufficient_privilege` errors:

### Check: Are you using service role key in webhook?

```typescript
// File: /supabase/functions/server/supabase-client.tsx
// Should use SERVICE_ROLE_KEY, not ANON_KEY

const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // ✅ Correct
// NOT: const key = Deno.env.get('SUPABASE_ANON_KEY'); // ❌ Wrong
```

If using anon key, the webhook will fail with RLS enabled.

### Quick fix: Disable RLS temporarily for testing

```sql
-- Disable RLS (TEMPORARY - for testing only!)
ALTER TABLE bundle_purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE theme_purchases DISABLE ROW LEVEL SECURITY;

-- Retry webhook

-- If it works now, the problem is:
-- 1. Webhook is using anon key instead of service role key
-- 2. Trigger doesn't have SECURITY DEFINER

-- Re-enable RLS after testing
ALTER TABLE bundle_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_purchases ENABLE ROW LEVEL SECURITY;
```

---

## Step 6: Webhook Retry Checklist

Before retrying webhook, confirm:

- [ ] Ran diagnostic script (shows ✅ for all checks)
- [ ] Bundles table has 4 rows
- [ ] Test query finds `prod_UBF7QhqUggiUm0`
- [ ] Triggers exist with SECURITY DEFINER
- [ ] Function deployed successfully
- [ ] Function logs show "Deployed successfully"
- [ ] Waited 30 seconds after deployment

**Now retry webhook**:
1. Stripe Dashboard → Webhooks
2. Find event `evt_1TDbpNHUyotQ1kng3jdcrhJj`
3. Click "Resend"
4. Should return **200 OK**

---

## Step 7: Still Broken? Detailed Debug

### Get exact error from Stripe

1. **Stripe Dashboard** → Webhooks → Failed event
2. Click **"Response"** tab
3. Copy exact error message
4. Share error message

### Check environment variables

```bash
# In your terminal where you deploy:
supabase secrets list

# Should show:
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - SUPABASE_URL
# - SUPABASE_SERVICE_ROLE_KEY
```

If any missing, set them:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_key_here
```

### Check Stripe webhook endpoint

**Stripe Dashboard** → Webhooks → Your endpoint

Should be:
```
https://YOUR_PROJECT.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook
```

Events to send:
- `checkout.session.completed` ✅

---

## Emergency: Nuclear Option

If nothing works, **start fresh**:

```sql
-- 1. Drop everything
DROP TRIGGER IF EXISTS unlock_themes_on_bundle_purchase ON bundle_purchases CASCADE;
DROP TRIGGER IF EXISTS update_bundle_stats ON bundle_purchases CASCADE;
DROP FUNCTION IF EXISTS unlock_bundle_themes() CASCADE;
DROP FUNCTION IF EXISTS increment_bundle_purchase_count() CASCADE;
DROP TABLE IF EXISTS bundle_purchases CASCADE;
DROP TABLE IF EXISTS bundles CASCADE;

-- 2. Re-run all setup scripts IN ORDER:
-- a) bundle-setup.sql
-- b) bundle-theme-unlock-trigger.sql
-- c) database-constraints-and-rls.sql

-- 3. Redeploy function
-- supabase functions deploy make-server-f9be53a7

-- 4. Run diagnostic
-- DIAGNOSE-ISSUE.sql

-- 5. Retry webhook
```

---

## Get Help

If still not working, provide:

1. **Output of diagnostic script** (copy/paste all)
2. **Stripe webhook error** (from Stripe Dashboard → Response tab)
3. **Function logs** (from Supabase Dashboard → Edge Functions → Logs)
4. **Result of this query**:
   ```sql
   SELECT id, stripe_product_id FROM bundles;
   ```

This will help identify the exact issue.
