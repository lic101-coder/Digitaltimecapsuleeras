-- ============================================
-- 🚀 RUN THIS IN SUPABASE SQL EDITOR NOW!
-- ============================================
-- This will fix your test data and sync everything

-- YOUR USER ID
-- ============================================
\set my_user_id 'fff635a5-0246-4562-aa1f-de35635a8f9d'

-- STEP 1: Delete invalid test data
-- ============================================
DELETE FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND bundle_id = 'starter_pack';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND product_id = 'beneficiary_slots';

-- STEP 2: Insert CORRECT test data
-- ============================================
INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'life-milestones', 5.99, 'test_bundle_correct')
ON CONFLICT (stripe_payment_id) DO NOTHING;

INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'slot-3', 3, 1.99, 'test_beneficiary_correct')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- STEP 3: Unlock themes in user_unlocked_themes
-- ============================================
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
VALUES 
  -- From individual theme purchase
  ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'new_life'),
  
  -- From life-milestones bundle
  ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'wedding'),
  ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'career'),
  ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'graduation'),
  ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'new_home')
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- STEP 4: Verify everything
-- ============================================
SELECT 'UNLOCKED THEMES' AS check_type, theme_id AS value, created_at::text AS details
FROM public.user_unlocked_themes 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'BUNDLE PURCHASE', bundle_id, price_paid::text
FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'BENEFICIARY PURCHASE', product_id, slots_purchased::text || ' slots'
FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY check_type, value;

-- Expected output:
-- BENEFICIARY PURCHASE | slot-3 | 3 slots
-- BUNDLE PURCHASE | life-milestones | 5.99
-- UNLOCKED THEMES | career | [timestamp]
-- UNLOCKED THEMES | graduation | [timestamp]
-- UNLOCKED THEMES | new_home | [timestamp]
-- UNLOCKED THEMES | new_life | [timestamp]
-- UNLOCKED THEMES | wedding | [timestamp]
