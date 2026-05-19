-- RUN THIS IN SUPABASE SQL EDITOR AND PASTE THE RESULTS
-- This will show me exactly what schema Supabase created

-- 1. Show all purchase/unlock related tables
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND (
    table_name LIKE '%theme%' 
    OR table_name LIKE '%bundle%' 
    OR table_name LIKE '%beneficiary%'
    OR table_name LIKE '%unlock%'
    OR table_name LIKE '%purchase%'
  )
ORDER BY table_name;

-- 2. Show user_unlocked_themes structure (if it exists)
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'user_unlocked_themes'
ORDER BY ordinal_position;

-- 3. Show v_user_beneficiary_limits structure (if it exists)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'v_user_beneficiary_limits'
ORDER BY ordinal_position;

-- 4. Show what's in theme_purchases for your user
SELECT * FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
LIMIT 5;

-- 5. Show what's in user_unlocked_themes for your user (if table exists)
SELECT * FROM public.user_unlocked_themes 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
LIMIT 10;
