-- ============================================
-- FIX TEST DATA FOR USER fff635a5-0246-4562-aa1f-de35635a8f9d
-- ============================================

-- 1. DELETE INVALID TEST DATA
DELETE FROM public.bundle_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' AND bundle_id = 'starter_pack';
DELETE FROM public.beneficiary_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' AND product_id = 'beneficiary_slots';

-- 2. INSERT VALID TEST DATA

-- Theme purchase (already correct!)
INSERT INTO public.theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'new_life', 'individual', 2.99, 'test_theme_1')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- Bundle purchase (FIXED - use valid bundle ID)
INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'life-milestones', 5.99, 'test_bundle_1')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- Beneficiary purchase (FIXED - use valid product_id)
INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'slot-3', 3, 1.99, 'test_beneficiary_1')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- 3. VERIFY
SELECT 'THEME PURCHASES' AS type, * FROM public.theme_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'BUNDLE PURCHASES' AS type, * FROM public.bundle_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'BENEFICIARY PURCHASES' AS type, * FROM public.beneficiary_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
