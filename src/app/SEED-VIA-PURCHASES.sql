-- ============================================
-- 🚀 SEED TEST DATA VIA PURCHASE TABLES
-- ============================================
-- This inserts into purchase tables first, then lets triggers populate user_unlocked_themes

-- STEP 1: Clean up invalid test data
-- ============================================
DELETE FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND bundle_id = 'starter_pack';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND product_id = 'beneficiary_slots';

-- Clean up any existing correct test data (so we can re-run this script)
DELETE FROM public.theme_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
AND stripe_payment_id LIKE 'test_%';

DELETE FROM public.bundle_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
AND stripe_payment_id LIKE 'test_%';

DELETE FROM public.beneficiary_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
AND stripe_payment_id LIKE 'test_%';

-- STEP 2: Insert theme purchase with ALL required fields
-- ============================================
INSERT INTO public.theme_purchases (
  user_id, 
  theme_id, 
  purchase_type, 
  price_paid, 
  stripe_payment_id
)
VALUES (
  'fff635a5-0246-4562-aa1f-de35635a8f9d', 
  'new_life', 
  'individual',  -- ✅ REQUIRED by trigger
  2.99, 
  'test_theme_correct'
)
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- STEP 3: Insert bundle purchase with ALL required fields
-- ============================================
INSERT INTO public.bundle_purchases (
  user_id, 
  bundle_id, 
  price_paid, 
  stripe_payment_id
)
VALUES (
  'fff635a5-0246-4562-aa1f-de35635a8f9d', 
  'life-milestones', 
  5.99, 
  'test_bundle_correct'
)
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- STEP 4: Insert beneficiary purchase with ALL required fields
-- ============================================
INSERT INTO public.beneficiary_purchases (
  user_id, 
  product_id, 
  slots_purchased, 
  price_paid, 
  stripe_payment_id
)
VALUES (
  'fff635a5-0246-4562-aa1f-de35635a8f9d', 
  'slot-3', 
  3, 
  1.99, 
  'test_beneficiary_correct'
)
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- STEP 5: If there's NO automatic trigger, manually add to user_unlocked_themes
-- ============================================
-- NOTE: If your database has triggers, comment this out! The triggers will auto-populate.
-- Uncomment ONLY if verification query shows 0 unlocked themes.

-- Theme from individual purchase
-- INSERT INTO public.user_unlocked_themes (user_id, theme_id)
-- SELECT 'fff635a5-0246-4562-aa1f-de35635a8f9d', 'new_life'
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.user_unlocked_themes 
--   WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
--   AND theme_id = 'new_life'
-- );

-- Themes from life-milestones bundle
-- INSERT INTO public.user_unlocked_themes (user_id, theme_id)
-- SELECT 'fff635a5-0246-4562-aa1f-de35635a8f9d', unnest(ARRAY['wedding','career','graduation','new_home'])
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.user_unlocked_themes 
--   WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
--   AND theme_id = ANY(ARRAY['wedding','career','graduation','new_home'])
-- );

-- STEP 6: Verify everything
-- ============================================
SELECT 
  '🎨 THEME_PURCHASES' AS table_name, 
  theme_id AS item, 
  purchase_type AS type,
  price_paid::text AS price
FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'

UNION ALL

SELECT 
  '📦 BUNDLE_PURCHASES', 
  bundle_id, 
  'bundle',
  price_paid::text
FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'

UNION ALL

SELECT 
  '👥 BENEFICIARY_PURCHASES', 
  product_id, 
  slots_purchased::text || ' slots',
  price_paid::text
FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'

UNION ALL

SELECT 
  '✅ USER_UNLOCKED_THEMES', 
  theme_id, 
  'unlocked',
  ''
FROM public.user_unlocked_themes 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'

ORDER BY table_name, item;

-- Expected output:
-- 👥 BENEFICIARY_PURCHASES | slot-3 | 3 slots | 1.99
-- 📦 BUNDLE_PURCHASES | life-milestones | bundle | 5.99
-- 🎨 THEME_PURCHASES | new_life | individual | 2.99
-- ✅ USER_UNLOCKED_THEMES | career | unlocked
-- ✅ USER_UNLOCKED_THEMES | graduation | unlocked
-- ✅ USER_UNLOCKED_THEMES | new_home | unlocked
-- ✅ USER_UNLOCKED_THEMES | new_life | unlocked
-- ✅ USER_UNLOCKED_THEMES | wedding | unlocked
