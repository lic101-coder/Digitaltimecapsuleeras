-- ============================================
-- CHECK TRIGGER FUNCTIONS HAVE SECURITY DEFINER
-- ============================================

SELECT 
  proname as function_name,
  CASE 
    WHEN prosecdef THEN '✅ HAS SECURITY DEFINER'
    ELSE '❌ MISSING SECURITY DEFINER - RLS will block!'
  END as status,
  CASE 
    WHEN NOT prosecdef THEN 'Must recreate function with SECURITY DEFINER'
    ELSE 'OK'
  END as fix
FROM pg_proc 
WHERE proname IN ('unlock_bundle_themes', 'increment_bundle_purchase_count');

-- If any show ❌, the trigger will fail with RLS enabled
-- Fix: Re-run bundle-theme-unlock-trigger.sql and bundle-setup.sql
