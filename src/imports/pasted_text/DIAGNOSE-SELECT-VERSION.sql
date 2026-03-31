-- ============================================
-- DIAGNOSE BUNDLE ISSUE - SELECT VERSION
-- All results shown as tables (no DO blocks)
-- ============================================

-- CHECK 1: Does bundles table exist?
SELECT 
  'CHECK 1' as check_num,
  'Bundles table exists?' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '✅ YES'
    ELSE '❌ NO - Run bundle-setup.sql!'
  END as result;

-- CHECK 2: How many bundles in table?
SELECT 
  'CHECK 2' as check_num,
  'Bundle count' as check_name,
  COALESCE((SELECT COUNT(*)::text FROM bundles), '0') || ' bundles (expected: 4)' as result;

-- CHECK 3: Show ALL bundles with Stripe IDs
SELECT 
  'CHECK 3' as check_num,
  'Bundles in database' as check_name,
  '↓ See table below ↓' as result;

SELECT 
  id,
  name,
  stripe_product_id,
  stripe_price_id,
  price,
  array_length(themes, 1) as theme_count,
  COALESCE(purchased_count, 0) as purchased_count
FROM bundles
ORDER BY price DESC;

-- CHECK 4: Critical - Can we find complete-library by Stripe product ID?
SELECT 
  'CHECK 4' as check_num,
  'Find complete-library by Stripe product ID' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0')
    THEN '✅ FOUND - Webhook should work!'
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '❌ Bundles table missing'
    WHEN (SELECT COUNT(*) FROM bundles) = 0
    THEN '❌ Bundles table is EMPTY'
    ELSE '❌ NOT FOUND - Wrong Stripe product ID in database'
  END as result;

-- CHECK 5: Show what Stripe product IDs are actually in the database
SELECT 
  'CHECK 5' as check_num,
  'Stripe product IDs in database' as check_name,
  '↓ See table below ↓' as result;

SELECT 
  id as bundle_id,
  stripe_product_id,
  CASE 
    WHEN stripe_product_id = 'prod_UBF7QhqUggiUm0' THEN '✅ CORRECT (complete-library)'
    WHEN stripe_product_id = 'prod_UBF8ZAfAoNwgZI' THEN '✅ CORRECT (life-milestones)'
    WHEN stripe_product_id = 'prod_UBF8RA7iFHig8v' THEN '✅ CORRECT (celebration)'
    WHEN stripe_product_id = 'prod_UBFA1BVhrMDQrh' THEN '✅ CORRECT (inner-journey)'
    ELSE '⚠️ UNKNOWN - May not match Stripe'
  END as status
FROM bundles
ORDER BY id;

-- CHECK 6: Does bundle_purchases table exist?
SELECT 
  'CHECK 6' as check_num,
  'bundle_purchases table' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundle_purchases')
    THEN '✅ EXISTS'
    ELSE '❌ MISSING - Create it!'
  END as result;

-- CHECK 7: Does theme_purchases table exist?
SELECT 
  'CHECK 7' as check_num,
  'theme_purchases table' as check_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'theme_purchases')
    THEN '✅ EXISTS'
    ELSE '❌ MISSING - Create it!'
  END as result;

-- CHECK 8: Do triggers exist?
SELECT 
  'CHECK 8' as check_num,
  'Triggers' as check_name,
  '↓ See table below ↓' as result;

SELECT 
  tgname as trigger_name,
  '✅ EXISTS' as status
FROM pg_trigger 
WHERE tgname IN ('unlock_themes_on_bundle_purchase', 'update_bundle_stats')
UNION ALL
SELECT 
  'unlock_themes_on_bundle_purchase' as trigger_name,
  '❌ MISSING - Run bundle-theme-unlock-trigger.sql' as status
WHERE NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase')
UNION ALL
SELECT 
  'update_bundle_stats' as trigger_name,
  '❌ MISSING - Run bundle-setup.sql' as status
WHERE NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bundle_stats');

-- CHECK 9: Do functions have SECURITY DEFINER?
SELECT 
  'CHECK 9' as check_num,
  'Functions with SECURITY DEFINER' as check_name,
  '↓ See table below ↓' as result;

SELECT 
  proname as function_name,
  CASE 
    WHEN prosecdef THEN '✅ HAS SECURITY DEFINER'
    ELSE '❌ MISSING SECURITY DEFINER - Will fail with RLS!'
  END as status
FROM pg_proc 
WHERE proname IN ('unlock_bundle_themes', 'increment_bundle_purchase_count');

-- CHECK 10: Is RLS enabled?
SELECT 
  'CHECK 10' as check_num,
  'RLS Status' as check_name,
  '↓ See table below ↓' as result;

SELECT 
  tablename,
  CASE 
    WHEN relrowsecurity THEN '✅ Enabled'
    ELSE '⚠️ Disabled'
  END as rls_status
FROM pg_tables 
JOIN pg_class ON pg_tables.tablename = pg_class.relname
WHERE tablename IN ('bundles', 'bundle_purchases', 'theme_purchases')
ORDER BY tablename;

-- CHECK 11: Foreign key exists?
SELECT 
  'CHECK 11' as check_num,
  'Foreign key bundle_purchases -> bundles' as check_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_name = 'bundle_purchases' 
      AND constraint_type = 'FOREIGN KEY'
      AND constraint_name LIKE '%bundle_id%'
    )
    THEN '✅ EXISTS'
    ELSE '⚠️ MISSING (not critical but recommended)'
  END as result;

-- CHECK 12: CRITICAL - Test actual webhook lookup
SELECT 
  'CHECK 12' as check_num,
  'Test webhook lookup (prod_UBF7QhqUggiUm0)' as check_name,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '❌ Bundles table missing'
    WHEN (SELECT COUNT(*) FROM bundles) = 0
    THEN '❌ Bundles table is EMPTY - Run bundle-setup.sql'
    WHEN EXISTS (SELECT 1 FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0')
    THEN '✅ FOUND complete-library - Webhook SHOULD work!'
    ELSE '❌ NOT FOUND - Stripe product ID mismatch'
  END as result;

-- FINAL SUMMARY TABLE
SELECT 
  '=== SUMMARY ===' as summary,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '❌ BUNDLES TABLE MISSING'
    WHEN (SELECT COUNT(*) FROM bundles) = 0
    THEN '❌ BUNDLES TABLE IS EMPTY'
    WHEN (SELECT COUNT(*) FROM bundles) < 4
    THEN '⚠️ ONLY ' || (SELECT COUNT(*)::text FROM bundles) || ' BUNDLES (expected 4)'
    WHEN NOT EXISTS (SELECT 1 FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0')
    THEN '❌ STRIPE PRODUCT ID MISMATCH'
    WHEN NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase')
    THEN '❌ UNLOCK TRIGGER MISSING'
    WHEN NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'unlock_bundle_themes' AND prosecdef = true)
    THEN '❌ FUNCTION MISSING SECURITY DEFINER'
    ELSE '✅ DATABASE CONFIGURED CORRECTLY'
  END as status,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN 'RUN: bundle-setup.sql'
    WHEN (SELECT COUNT(*) FROM bundles) = 0
    THEN 'RUN: INSERT statement from bundle-setup.sql (lines 26-64)'
    WHEN NOT EXISTS (SELECT 1 FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0')
    THEN 'FIX: Update Stripe product IDs in bundles table'
    WHEN NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase')
    THEN 'RUN: bundle-theme-unlock-trigger.sql'
    WHEN NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'unlock_bundle_themes' AND prosecdef = true)
    THEN 'RUN: bundle-theme-unlock-trigger.sql again'
    ELSE 'NEXT: Deploy function → supabase functions deploy make-server-f9be53a7'
  END as action_needed;
