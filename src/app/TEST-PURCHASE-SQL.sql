-- ============================================
-- ERAS: Manual Test Purchase SQL Queries
-- ============================================
-- Use these to manually insert test purchases into Postgres
-- Run in Supabase SQL Editor

-- ============================================
-- 1. INSERT TEST THEME PURCHASE
-- ============================================
-- Replace 'YOUR_USER_ID_HERE' with your actual Supabase auth.users ID

INSERT INTO public.theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
VALUES (
  'YOUR_USER_ID_HERE',  -- ⚠️ CHANGE THIS!
  'new_life',           -- Theme ID (genesis/new_life)
  'individual',
  2.99,
  'pi_test_manual_insert'
);

-- Other theme IDs you can test:
-- 'birthday', 'new_life', 'graduation', 'wedding', 'retirement', 
-- 'friendship', 'adventure', 'achievement', 'reflection', 'future', 'memorial'

-- ============================================
-- 2. INSERT TEST BUNDLE PURCHASE
-- ============================================
-- This unlocks ALL themes in the bundle

INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES (
  'YOUR_USER_ID_HERE',  -- ⚠️ CHANGE THIS!
  'complete-library',   -- Bundle ID
  29.99,
  'pi_test_bundle_manual'
);

-- Other bundle IDs:
-- 'complete-library' (all 11 themes)
-- 'life-milestones' (birthday, new_life, graduation, wedding, retirement)
-- 'celebration' (birthday, wedding, achievement, friendship)
-- 'inner-journey' (reflection, memorial, achievement, adventure)

-- ============================================
-- 3. INSERT TEST BENEFICIARY PURCHASE
-- ============================================
-- Add 2 extra beneficiary slots

INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES (
  'YOUR_USER_ID_HERE',  -- ⚠️ CHANGE THIS!
  'slots-2',
  2,                    -- Number of slots
  3.99,
  'pi_test_beneficiary_manual'
);

-- For unlimited:
-- product_id: 'unlimited'
-- slots_purchased: 999999
-- price_paid: 9.99

-- ============================================
-- 4. VERIFY PURCHASES
-- ============================================
-- Check what's in the database for your user

SELECT * FROM public.theme_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

SELECT * FROM public.bundle_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

SELECT * FROM public.beneficiary_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

-- ============================================
-- 5. DELETE TEST PURCHASES (CLEANUP)
-- ============================================
-- Run this to remove all test purchases

DELETE FROM public.theme_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

DELETE FROM public.bundle_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'YOUR_USER_ID_HERE';

-- ============================================
-- 6. GET YOUR USER ID
-- ============================================
-- If you don't know your user ID, run this:

SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 10;
