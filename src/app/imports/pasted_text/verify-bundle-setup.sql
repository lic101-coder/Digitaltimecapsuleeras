-- ============================================
-- BUNDLE SETUP VERIFICATION
-- Run this to verify your bundle configuration is correct
-- ============================================

-- 1. Check bundles table exists and has data
SELECT 
  '1. Bundles Table' as check_name,
  CASE 
    WHEN COUNT(*) = 4 THEN '✅ PASS - 4 bundles configured'
    WHEN COUNT(*) = 0 THEN '❌ FAIL - No bundles found. Run bundle-setup.sql'
    ELSE '⚠️ WARNING - Expected 4 bundles, found ' || COUNT(*)
  END as status,
  COUNT(*) as bundle_count
FROM bundles;

-- 2. Verify Stripe ID mappings
SELECT 
  '2. Stripe Mappings' as check_name,
  CASE 
    WHEN COUNT(*) = 4 THEN '✅ PASS - All bundles have Stripe IDs'
    ELSE '❌ FAIL - Some bundles missing Stripe IDs'
  END as status,
  COUNT(*) as bundles_with_stripe_ids
FROM bundles
WHERE stripe_product_id IS NOT NULL 
  AND stripe_price_id IS NOT NULL;

-- 3. Show all bundles with their configuration
SELECT 
  id,
  name,
  stripe_product_id,
  stripe_price_id,
  price,
  array_length(themes, 1) as theme_count,
  purchased_count
FROM bundles
ORDER BY price DESC;

-- 4. Verify theme unlock trigger exists
SELECT 
  '3. Theme Unlock Trigger' as check_name,
  CASE 
    WHEN COUNT(*) > 0 THEN '✅ PASS - Trigger exists'
    ELSE '❌ FAIL - Trigger missing. Run bundle-theme-unlock-trigger.sql'
  END as status
FROM pg_trigger
WHERE tgname = 'unlock_themes_on_bundle_purchase';

-- 5. Verify stats trigger exists
SELECT 
  '4. Stats Trigger' as check_name,
  CASE 
    WHEN COUNT(*) > 0 THEN '✅ PASS - Trigger exists'
    ELSE '❌ FAIL - Trigger missing. Run bundle-setup.sql'
  END as status
FROM pg_trigger
WHERE tgname = 'update_bundle_stats';

-- 6. Check for any bundle purchases
SELECT 
  '5. Bundle Purchases' as check_name,
  COUNT(*) as total_purchases,
  COUNT(DISTINCT user_id) as unique_buyers,
  COUNT(DISTINCT bundle_id) as bundles_sold
FROM bundle_purchases;

-- 7. Show recent bundle purchases
SELECT 
  bp.id,
  bp.bundle_id,
  b.name as bundle_name,
  bp.user_id,
  bp.price_paid,
  bp.created_at,
  (SELECT COUNT(*) FROM theme_purchases WHERE user_id = bp.user_id AND purchase_type = 'bundle') as themes_unlocked
FROM bundle_purchases bp
JOIN bundles b ON b.id = bp.bundle_id
ORDER BY bp.created_at DESC
LIMIT 10;

-- 8. Verify Stripe product IDs match expected values
WITH expected_products AS (
  SELECT 'complete-library' as bundle_id, 'prod_UBF7QhqUggiUm0' as expected_product_id, 'price_1TCsdYHUyotQ1kngEB9gOyr2' as expected_price_id UNION ALL
  SELECT 'life-milestones', 'prod_UBF8ZAfAoNwgZI', 'price_1TCseDHUyotQ1kng86obk1HT' UNION ALL
  SELECT 'celebration', 'prod_UBF8RA7iFHig8v', 'price_1TCsehHUyotQ1kngXZf0Qay2' UNION ALL
  SELECT 'inner-journey', 'prod_UBFA1BVhrMDQrh', 'price_1TCsfpHUyotQ1kngmT3KKiE0'
)
SELECT 
  '6. Stripe ID Accuracy' as check_name,
  e.bundle_id,
  CASE 
    WHEN b.stripe_product_id = e.expected_product_id 
     AND b.stripe_price_id = e.expected_price_id 
    THEN '✅ CORRECT'
    ELSE '❌ MISMATCH'
  END as status,
  b.stripe_product_id as actual_product,
  e.expected_product_id as expected_product,
  b.stripe_price_id as actual_price,
  e.expected_price_id as expected_price
FROM expected_products e
LEFT JOIN bundles b ON b.id = e.bundle_id;

-- 9. Check RLS policies
SELECT 
  '7. RLS Policies' as check_name,
  CASE 
    WHEN COUNT(*) > 0 THEN '✅ PASS - RLS enabled on bundles table'
    ELSE '⚠️ WARNING - No RLS policies found'
  END as status,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'bundles';

-- 10. Summary
DO $$
DECLARE
  bundle_count INT;
  trigger_count INT;
  purchase_count INT;
BEGIN
  SELECT COUNT(*) INTO bundle_count FROM bundles;
  SELECT COUNT(*) INTO trigger_count FROM pg_trigger WHERE tgname IN ('unlock_themes_on_bundle_purchase', 'update_bundle_stats');
  SELECT COUNT(*) INTO purchase_count FROM bundle_purchases;
  
  RAISE NOTICE '';
  RAISE NOTICE '====================================';
  RAISE NOTICE '     BUNDLE SETUP SUMMARY';
  RAISE NOTICE '====================================';
  RAISE NOTICE 'Bundles configured: %', bundle_count;
  RAISE NOTICE 'Triggers active: %', trigger_count;
  RAISE NOTICE 'Total purchases: %', purchase_count;
  RAISE NOTICE '';
  
  IF bundle_count = 4 AND trigger_count = 2 THEN
    RAISE NOTICE '✅ SETUP COMPLETE - Ready for bundle purchases!';
  ELSIF bundle_count = 0 THEN
    RAISE NOTICE '❌ SETUP INCOMPLETE - Run bundle-setup.sql';
  ELSIF trigger_count < 2 THEN
    RAISE NOTICE '❌ SETUP INCOMPLETE - Run bundle-theme-unlock-trigger.sql';
  ELSE
    RAISE NOTICE '⚠️ CHECK WARNINGS ABOVE';
  END IF;
  
  RAISE NOTICE '====================================';
END $$;
