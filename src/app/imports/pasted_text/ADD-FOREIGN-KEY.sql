-- ============================================
-- ADD FOREIGN KEY CONSTRAINT
-- Ensures bundle_purchases.bundle_id references valid bundle
-- ============================================

-- Add foreign key (if missing)
ALTER TABLE bundle_purchases 
  DROP CONSTRAINT IF EXISTS bundle_purchases_bundle_id_fkey;

ALTER TABLE bundle_purchases 
  ADD CONSTRAINT bundle_purchases_bundle_id_fkey 
  FOREIGN KEY (bundle_id) REFERENCES bundles(id) 
  ON DELETE RESTRICT;

-- Verify it was added
SELECT 
  conname as constraint_name,
  contype as type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'bundle_purchases'::regclass
  AND conname = 'bundle_purchases_bundle_id_fkey';

-- Should show:
-- constraint_name                   | type | definition
-- bundle_purchases_bundle_id_fkey  | f    | FOREIGN KEY (bundle_id) REFERENCES bundles(id) ON DELETE RESTRICT
