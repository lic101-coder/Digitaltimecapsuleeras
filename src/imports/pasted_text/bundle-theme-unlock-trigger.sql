-- ============================================
-- BUNDLE THEME UNLOCK TRIGGER
-- Automatically unlocks all themes when a bundle is purchased
-- Run this in Supabase SQL Editor AFTER creating the bundles table
-- ============================================

-- Function to unlock all themes in a bundle
CREATE OR REPLACE FUNCTION unlock_bundle_themes()
RETURNS TRIGGER AS $$
DECLARE
  theme_id TEXT;
  bundle_themes TEXT[];
  bundle_name TEXT;
BEGIN
  -- Get bundle details
  SELECT themes, name INTO bundle_themes, bundle_name
  FROM bundles
  WHERE id = NEW.bundle_id;
  
  IF bundle_themes IS NULL THEN
    RAISE WARNING 'Bundle % not found in bundles table', NEW.bundle_id;
    RETURN NEW;
  END IF;
  
  RAISE NOTICE 'Unlocking % themes from bundle: %', array_length(bundle_themes, 1), bundle_name;
  
  -- Unlock each theme in the bundle
  FOREACH theme_id IN ARRAY bundle_themes
  LOOP
    INSERT INTO theme_purchases (
      user_id, 
      theme_id, 
      purchase_type, 
      price_paid, 
      stripe_payment_id,
      created_at
    )
    VALUES (
      NEW.user_id, 
      theme_id, 
      'bundle', 
      0,  -- Individual theme price is 0 since it's part of bundle
      NEW.stripe_payment_id,
      NOW()
    )
    ON CONFLICT (user_id, theme_id) DO NOTHING;
    
    RAISE NOTICE 'Unlocked theme: % for user: %', theme_id, NEW.user_id;
  END LOOP;
  
  RAISE NOTICE 'Bundle purchase complete: % themes unlocked', array_length(bundle_themes, 1);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after bundle purchase
DROP TRIGGER IF EXISTS unlock_themes_on_bundle_purchase ON bundle_purchases;
CREATE TRIGGER unlock_themes_on_bundle_purchase
  AFTER INSERT ON bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION unlock_bundle_themes();

-- Verify trigger was created
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  tgtype,
  tgenabled
FROM pg_trigger 
WHERE tgname = 'unlock_themes_on_bundle_purchase';

-- Test query: Check if bundles table has the right structure
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'bundles'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Bundle theme unlock trigger created successfully!';
  RAISE NOTICE 'When a bundle is purchased, all themes in that bundle will be automatically unlocked.';
END $$;
