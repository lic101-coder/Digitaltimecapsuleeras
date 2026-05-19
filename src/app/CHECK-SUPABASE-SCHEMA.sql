-- ============================================
-- CHECK WHAT TABLES/VIEWS EXIST IN SUPABASE
-- ============================================
-- Run this in Supabase SQL Editor to see what schema you created

-- 1. List all tables in public schema
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE '%theme%' 
   OR table_name LIKE '%bundle%' 
   OR table_name LIKE '%beneficiary%'
   OR table_name LIKE '%unlock%'
ORDER BY table_name;

-- 2. Check if specific tables exist
SELECT 
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'theme_purchases') AS has_theme_purchases,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bundle_purchases') AS has_bundle_purchases,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'beneficiary_purchases') AS has_beneficiary_purchases,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_unlocked_themes') AS has_user_unlocked_themes,
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'v_user_beneficiary_limits') AS has_beneficiary_view;

-- 3. If user_unlocked_themes exists, show its structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_unlocked_themes'
ORDER BY ordinal_position;

-- 4. If v_user_beneficiary_limits exists, show its structure  
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'v_user_beneficiary_limits'
ORDER BY ordinal_position;

-- 5. Show all RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('theme_purchases', 'bundle_purchases', 'beneficiary_purchases', 'user_unlocked_themes')
ORDER BY tablename, policyname;
