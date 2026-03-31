-- ============================================
-- 🧹 CLEANUP ALL TEST DATA
-- ============================================
-- Run this FIRST before testing webhook calls

-- Delete all test purchases for your user
DELETE FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'test_%';

DELETE FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'pi_test_%';

DELETE FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'test_%';

DELETE FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'pi_test_%';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'test_%';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND stripe_payment_id LIKE 'pi_test_%';

-- Clean up unlocked themes (will be repopulated by triggers)
DELETE FROM public.user_unlocked_themes
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';

-- Verify everything is clean
SELECT 'After cleanup:' AS status;

SELECT 'theme_purchases' AS table_name, COUNT(*) AS count
FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'bundle_purchases', COUNT(*)
FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'beneficiary_purchases', COUNT(*)
FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'user_unlocked_themes', COUNT(*)
FROM public.user_unlocked_themes 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';

-- Expected: All counts should be 0
