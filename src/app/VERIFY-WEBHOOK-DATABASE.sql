-- ============================================================================
-- WEBHOOK VERIFICATION QUERIES
-- ============================================================================
-- Run these in Supabase SQL Editor to check if the webhook wrote to the DB
-- ============================================================================

-- Your test user ID
-- fff635a5-0246-4562-aa1f-de35635a8f9d

-- ============================================================================
-- 1. CHECK THEME PURCHASES
-- ============================================================================
SELECT 
  user_id,
  theme_id,
  purchase_type,
  stripe_payment_id,
  price_paid,
  purchased_at
FROM public.theme_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY purchased_at DESC;

-- Expected: Should show rows for any themes purchased
-- If empty: Webhook didn't write theme purchases

-- ============================================================================
-- 2. CHECK BUNDLE PURCHASES
-- ============================================================================
SELECT 
  user_id,
  bundle_id,
  stripe_payment_id,
  price_paid,
  purchased_at
FROM public.bundle_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY purchased_at DESC;

-- Expected: Should show rows for any bundles purchased
-- If empty: No bundles purchased OR webhook didn't write

-- ============================================================================
-- 3. CHECK BENEFICIARY PURCHASES
-- ============================================================================
SELECT 
  user_id,
  product_id,
  slots_purchased,
  stripe_payment_id,
  price_paid,
  purchased_at
FROM public.beneficiary_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY purchased_at DESC;

-- Expected: Should show rows for any beneficiary slot purchases
-- If empty: No beneficiary purchases OR webhook didn't write

-- ============================================================================
-- 4. CHECK UNLOCKED THEMES (from triggers)
-- ============================================================================
SELECT 
  user_id,
  theme_id,
  unlocked_via,
  purchase_type,
  unlocked_at
FROM public.user_unlocked_themes
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY unlocked_at DESC;

-- Expected: Should show unlocked themes
-- If empty: Either no purchases OR triggers aren't working

-- ============================================================================
-- 5. SEARCH BY SPECIFIC STRIPE PAYMENT ID
-- ============================================================================
-- Replace 'pi_3TCuidHUyotQ1kng1j6rpTg2' with the actual payment_intent ID from logs

SELECT 
  'theme_purchases' as table_name,
  user_id,
  theme_id as item_id,
  stripe_payment_id,
  price_paid
FROM public.theme_purchases
WHERE stripe_payment_id = 'pi_3TCuidHUyotQ1kng1j6rpTg2'

UNION ALL

SELECT 
  'bundle_purchases' as table_name,
  user_id,
  bundle_id as item_id,
  stripe_payment_id,
  price_paid
FROM public.bundle_purchases
WHERE stripe_payment_id = 'pi_3TCuidHUyotQ1kng1j6rpTg2'

UNION ALL

SELECT 
  'beneficiary_purchases' as table_name,
  user_id,
  product_id as item_id,
  stripe_payment_id,
  price_paid::text
FROM public.beneficiary_purchases
WHERE stripe_payment_id = 'pi_3TCuidHUyotQ1kng1j6rpTg2';

-- Expected: Should show which table received the payment ID
-- If empty: Webhook didn't write OR payment ID is different

-- ============================================================================
-- 6. CHECK FOR ANY TEST PAYMENT IDS
-- ============================================================================
SELECT 
  'theme_purchases' as source,
  count(*) as count
FROM public.theme_purchases
WHERE stripe_payment_id LIKE 'pi_test_%' OR stripe_payment_id LIKE 'test_%'

UNION ALL

SELECT 
  'bundle_purchases' as source,
  count(*) as count
FROM public.bundle_purchases
WHERE stripe_payment_id LIKE 'pi_test_%' OR stripe_payment_id LIKE 'test_%'

UNION ALL

SELECT 
  'beneficiary_purchases' as source,
  count(*) as count
FROM public.beneficiary_purchases
WHERE stripe_payment_id LIKE 'pi_test_%' OR stripe_payment_id LIKE 'test_%';

-- Expected: Shows how many test purchases exist in each table

-- ============================================================================
-- 7. CHECK RECENT PURCHASES (ALL USERS)
-- ============================================================================
SELECT 
  user_id,
  theme_id,
  purchase_type,
  stripe_payment_id,
  price_paid,
  purchased_at
FROM public.theme_purchases
ORDER BY purchased_at DESC
LIMIT 10;

-- This shows the 10 most recent theme purchases from ANY user
-- Helpful to see if webhook is working for other users but not yours

-- ============================================================================
-- 8. DIAGNOSTIC: CHECK TABLE CONSTRAINTS
-- ============================================================================
SELECT
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(c.oid) AS constraint_definition
FROM pg_constraint c
JOIN pg_namespace n ON n.oid = c.connamespace
JOIN pg_class cl ON cl.oid = c.conrelid
WHERE cl.relname = 'theme_purchases'
  AND n.nspname = 'public';

-- Shows constraints on theme_purchases table
-- Look for: PRIMARY KEY, UNIQUE constraints, CHECK constraints

-- ============================================================================
-- INTERPRETATION GUIDE
-- ============================================================================

/*
CASE 1: All queries return EMPTY
→ Webhook is NOT writing to database
→ Check Edge Function logs for errors
→ Verify service_role_key is correct
→ Check metadata is present in Stripe event

CASE 2: Query #1-3 have data, but #4 is EMPTY
→ Purchases are saved, but triggers aren't creating unlocked_themes rows
→ Check trigger code in database
→ Check RLS policies on user_unlocked_themes

CASE 3: Query #5 returns EMPTY (specific payment ID)
→ Payment ID doesn't match
→ Check Stripe logs for actual payment_intent ID
→ Webhook might be using checkout.session.id instead of payment_intent

CASE 4: Query #7 shows OTHER users' purchases but not yours
→ Metadata missing or wrong user_id
→ Check Stripe Checkout metadata configuration

CASE 5: Everything works for TEST events but not REAL events
→ Different webhook secrets for test vs live mode
→ Check STRIPE_WEBHOOK_SECRET in Supabase matches your mode
*/

-- ============================================================================
-- NEXT STEPS BASED ON RESULTS
-- ============================================================================

/*
If queries 1-3 are EMPTY:
1. Check Edge Function logs for this specific event
2. Look for error messages about metadata or database writes
3. Verify STRIPE_WEBHOOK_SECRET is correct
4. Check event type in logs (should be checkout.session.completed or payment_intent.succeeded)

If queries 1-3 have data but #4 is empty:
1. Run this to check if triggers exist:
   SELECT tgname FROM pg_trigger WHERE tgrelid = 'theme_purchases'::regclass;
2. Check trigger code for errors
3. Try manually inserting a test row and see if trigger fires

If query #5 is empty but #7 has data:
1. Your payment ID format might be different
2. Check the actual payment_intent ID from Stripe dashboard
3. Query might need to search for session.id instead
*/
