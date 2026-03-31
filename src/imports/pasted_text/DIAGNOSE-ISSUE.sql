-- ============================================
-- DIAGNOSE BUNDLE ISSUE
-- Run this in Supabase SQL Editor to find the problem
-- ============================================

-- Check 1: Does bundles table exist?
SELECT 
  'CHECK 1: Bundles table exists?' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '✅ YES'
    ELSE '❌ NO - Run bundle-setup.sql!'
  END as result;

-- Check 2: How many bundles are in the table?
SELECT 
  'CHECK 2: Bundle count' as check,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN '❌ Table does not exist'
    ELSE (SELECT COUNT(*)::text || ' bundles (expected: 4)' FROM bundles)
  END as result;

-- Check 3: Show all bundles with their Stripe IDs
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles') THEN
    RAISE NOTICE '';
    RAISE NOTICE '====================================';
    RAISE NOTICE 'CHECK 3: Bundles in Database';
    RAISE NOTICE '====================================';
    
    FOR r IN (
      SELECT 
        id,
        name,
        stripe_product_id,
        stripe_price_id,
        price,
        array_length(themes, 1) as theme_count,
        purchased_count
      FROM bundles
      ORDER BY price DESC
    ) LOOP
      RAISE NOTICE 'Bundle: % (%)', r.name, r.id;
      RAISE NOTICE '  Product ID: %', r.stripe_product_id;
      RAISE NOTICE '  Price ID: %', r.stripe_price_id;
      RAISE NOTICE '  Price: $%', r.price;
      RAISE NOTICE '  Themes: %', r.theme_count;
      RAISE NOTICE '  Purchased: % times', r.purchased_count;
      RAISE NOTICE '';
    END LOOP;
  ELSE
    RAISE NOTICE '';
    RAISE NOTICE '❌ Bundles table does not exist!';
    RAISE NOTICE '   Run bundle-setup.sql first';
  END IF;
END $$;

-- Check 4: Does bundle_purchases table exist?
SELECT 
  'CHECK 4: bundle_purchases table exists?' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundle_purchases')
    THEN '✅ YES'
    ELSE '❌ NO - Run bundle-setup.sql!'
  END as result;

-- Check 5: Does theme_purchases table exist?
SELECT 
  'CHECK 5: theme_purchases table exists?' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'theme_purchases')
    THEN '✅ YES'
    ELSE '❌ NO - Create it first!'
  END as result;

-- Check 6: Do the triggers exist?
SELECT 
  'CHECK 6a: unlock_themes_on_bundle_purchase trigger' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase')
    THEN '✅ YES'
    ELSE '❌ NO - Run bundle-theme-unlock-trigger.sql!'
  END as result
UNION ALL
SELECT 
  'CHECK 6b: update_bundle_stats trigger' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bundle_stats')
    THEN '✅ YES'
    ELSE '❌ NO - Run bundle-setup.sql!'
  END as result;

-- Check 7: Do the trigger functions exist?
SELECT 
  'CHECK 7a: unlock_bundle_themes() function' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'unlock_bundle_themes')
    THEN '✅ YES - ' || (
      SELECT CASE 
        WHEN prosecdef THEN 'with SECURITY DEFINER ✅'
        ELSE 'WITHOUT SECURITY DEFINER ❌ (will fail with RLS!)'
      END
      FROM pg_proc WHERE proname = 'unlock_bundle_themes'
      LIMIT 1
    )
    ELSE '❌ NO - Run bundle-theme-unlock-trigger.sql!'
  END as result
UNION ALL
SELECT 
  'CHECK 7b: increment_bundle_purchase_count() function' as check,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'increment_bundle_purchase_count')
    THEN '✅ YES - ' || (
      SELECT CASE 
        WHEN prosecdef THEN 'with SECURITY DEFINER ✅'
        ELSE 'WITHOUT SECURITY DEFINER ❌'
      END
      FROM pg_proc WHERE proname = 'increment_bundle_purchase_count'
      LIMIT 1
    )
    ELSE '❌ NO - Run bundle-setup.sql!'
  END as result;

-- Check 8: Is RLS enabled?
SELECT 
  'CHECK 8a: bundles RLS' as check,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles')
    THEN 'N/A - table missing'
    WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'bundles')
    THEN '✅ Enabled'
    ELSE '⚠️ Disabled (should be enabled)'
  END as result
UNION ALL
SELECT 
  'CHECK 8b: bundle_purchases RLS' as check,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundle_purchases')
    THEN 'N/A - table missing'
    WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'bundle_purchases')
    THEN '✅ Enabled'
    ELSE '⚠️ Disabled (okay for now)'
  END as result
UNION ALL
SELECT 
  'CHECK 8c: theme_purchases RLS' as check,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'theme_purchases')
    THEN 'N/A - table missing'
    WHEN (SELECT relrowsecurity FROM pg_class WHERE relname = 'theme_purchases')
    THEN '✅ Enabled'
    ELSE '⚠️ Disabled (okay for now)'
  END as result;

-- Check 9: Foreign key constraint
SELECT 
  'CHECK 9: Foreign key bundle_purchases -> bundles' as check,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_name = 'bundle_purchases' 
      AND constraint_type = 'FOREIGN KEY'
      AND constraint_name LIKE '%bundle_id%'
    )
    THEN '✅ EXISTS'
    ELSE '⚠️ Missing (run database-constraints-and-rls.sql)'
  END as result;

-- Check 10: Test query with actual Stripe product ID from failed webhook
DO $$
DECLARE
  test_product_id TEXT := 'prod_UBF7QhqUggiUm0';
  found_bundle RECORD;
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '====================================';
  RAISE NOTICE 'CHECK 10: Test Stripe ID Lookup';
  RAISE NOTICE '====================================';
  RAISE NOTICE 'Testing with product ID: %', test_product_id;
  RAISE NOTICE '';
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles') THEN
    RAISE NOTICE '❌ bundles table does not exist!';
    RETURN;
  END IF;
  
  SELECT * INTO found_bundle FROM bundles WHERE stripe_product_id = test_product_id;
  
  IF FOUND THEN
    RAISE NOTICE '✅ SUCCESS: Found bundle!';
    RAISE NOTICE '   Bundle ID: %', found_bundle.id;
    RAISE NOTICE '   Bundle Name: %', found_bundle.name;
    RAISE NOTICE '   Theme Count: %', array_length(found_bundle.themes, 1);
    RAISE NOTICE '';
    RAISE NOTICE '👉 Webhook SHOULD work with this configuration';
  ELSE
    RAISE NOTICE '❌ FAILURE: No bundle found with product ID: %', test_product_id;
    RAISE NOTICE '';
    RAISE NOTICE 'Available product IDs in database:';
    FOR found_bundle IN (SELECT id, stripe_product_id FROM bundles) LOOP
      RAISE NOTICE '   %: %', found_bundle.id, found_bundle.stripe_product_id;
    END LOOP;
    RAISE NOTICE '';
    RAISE NOTICE '👉 Fix: Check if bundle-setup.sql has correct Stripe IDs';
  END IF;
END $$;

-- Final Summary
DO $$
DECLARE
  bundles_exist BOOLEAN;
  bundle_count INTEGER := 0;
  triggers_exist BOOLEAN;
  functions_exist BOOLEAN;
  test_works BOOLEAN;
BEGIN
  -- Check table exists
  SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bundles') INTO bundles_exist;
  
  -- Count bundles
  IF bundles_exist THEN
    SELECT COUNT(*) INTO bundle_count FROM bundles;
  END IF;
  
  -- Check triggers
  SELECT (
    EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase')
    AND EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_bundle_stats')
  ) INTO triggers_exist;
  
  -- Check functions
  SELECT (
    EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'unlock_bundle_themes')
    AND EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'increment_bundle_purchase_count')
  ) INTO functions_exist;
  
  -- Check test lookup
  SELECT EXISTS (
    SELECT 1 FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0'
  ) INTO test_works;
  
  RAISE NOTICE '';
  RAISE NOTICE '====================================';
  RAISE NOTICE '  DIAGNOSTIC SUMMARY';
  RAISE NOTICE '====================================';
  RAISE NOTICE 'Bundles table: %', CASE WHEN bundles_exist THEN '✅' ELSE '❌' END;
  RAISE NOTICE 'Bundle count: % (expected: 4)', bundle_count;
  RAISE NOTICE 'Triggers: %', CASE WHEN triggers_exist THEN '✅' ELSE '❌' END;
  RAISE NOTICE 'Functions: %', CASE WHEN functions_exist THEN '✅' ELSE '❌' END;
  RAISE NOTICE 'Stripe ID lookup: %', CASE WHEN test_works THEN '✅' ELSE '❌' END;
  RAISE NOTICE '';
  
  IF bundles_exist AND bundle_count = 4 AND triggers_exist AND functions_exist AND test_works THEN
    RAISE NOTICE '🎉 DATABASE IS CONFIGURED CORRECTLY!';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Deploy function: supabase functions deploy make-server-f9be53a7';
    RAISE NOTICE '2. Check function logs for errors';
    RAISE NOTICE '3. Retry failed Stripe webhook';
  ELSE
    RAISE NOTICE '⚠️  ISSUES FOUND - Follow fix recommendations above';
    RAISE NOTICE '';
    IF NOT bundles_exist THEN
      RAISE NOTICE '❌ FIX: Run bundle-setup.sql in SQL Editor';
    END IF;
    IF bundles_exist AND bundle_count != 4 THEN
      RAISE NOTICE '❌ FIX: bundle-setup.sql did not insert all bundles';
    END IF;
    IF NOT triggers_exist THEN
      RAISE NOTICE '❌ FIX: Run bundle-theme-unlock-trigger.sql';
    END IF;
    IF NOT test_works AND bundles_exist THEN
      RAISE NOTICE '❌ FIX: Stripe product IDs do not match - verify bundle-setup.sql';
    END IF;
  END IF;
  RAISE NOTICE '====================================';
END $$;
