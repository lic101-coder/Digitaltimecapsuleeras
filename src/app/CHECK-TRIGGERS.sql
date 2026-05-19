-- Check what triggers exist on user_unlocked_themes and theme_purchases
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement,
    action_timing
FROM information_schema.triggers
WHERE event_object_table IN ('user_unlocked_themes', 'theme_purchases', 'bundle_purchases')
ORDER BY event_object_table, trigger_name;

-- Also check if there are any functions related to unlocking
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND (routine_name LIKE '%unlock%' OR routine_name LIKE '%purchase%' OR routine_name LIKE '%theme%')
ORDER BY routine_name;
