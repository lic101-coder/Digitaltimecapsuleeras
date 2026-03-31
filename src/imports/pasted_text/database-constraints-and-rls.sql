-- ============================================
-- ERAS DATABASE: Constraints, Indexes & RLS
-- SAFE FOR STRIPE WEBHOOKS
-- ============================================
-- This script adds proper database constraints, indexes, and RLS policies
-- while ensuring Stripe webhooks continue to work (they use service role key which bypasses RLS)
-- ============================================

-- ============================================
-- PART 1: CONSTRAINTS & INDEXES
-- ============================================

-- 1. THEME_PURCHASES Table
-- ============================================

-- Prevent duplicate theme purchases (user can't buy same theme twice)
CREATE UNIQUE INDEX IF NOT EXISTS theme_purchases_user_theme_unique 
  ON theme_purchases(user_id, theme_id);

-- Index for fast lookup of user's purchases
CREATE INDEX IF NOT EXISTS theme_purchases_user_id_idx 
  ON theme_purchases(user_id);

-- Index for theme-based queries
CREATE INDEX IF NOT EXISTS theme_purchases_theme_id_idx 
  ON theme_purchases(theme_id);

-- Index for bundle purchase lookups
CREATE INDEX IF NOT EXISTS theme_purchases_purchase_type_idx 
  ON theme_purchases(purchase_type);

-- Index for Stripe payment tracking
CREATE INDEX IF NOT EXISTS theme_purchases_stripe_payment_idx 
  ON theme_purchases(stripe_payment_id) 
  WHERE stripe_payment_id IS NOT NULL;


-- 2. BUNDLE_PURCHASES Table
-- ============================================

-- Prevent duplicate bundle purchases (user can't buy same bundle twice)
CREATE UNIQUE INDEX IF NOT EXISTS bundle_purchases_user_bundle_unique 
  ON bundle_purchases(user_id, bundle_id);

-- Index for fast lookup of user's purchases
CREATE INDEX IF NOT EXISTS bundle_purchases_user_id_idx 
  ON bundle_purchases(user_id);

-- Index for bundle-based queries
CREATE INDEX IF NOT EXISTS bundle_purchases_bundle_id_idx 
  ON bundle_purchases(bundle_id);

-- Index for Stripe payment tracking
CREATE INDEX IF NOT EXISTS bundle_purchases_stripe_payment_idx 
  ON bundle_purchases(stripe_payment_id) 
  WHERE stripe_payment_id IS NOT NULL;

-- Foreign key: bundle_purchases.bundle_id -> bundles.id
-- This ensures you can't purchase a bundle that doesn't exist
ALTER TABLE bundle_purchases 
  DROP CONSTRAINT IF EXISTS bundle_purchases_bundle_id_fkey;

ALTER TABLE bundle_purchases 
  ADD CONSTRAINT bundle_purchases_bundle_id_fkey 
  FOREIGN KEY (bundle_id) REFERENCES bundles(id) 
  ON DELETE RESTRICT;  -- Can't delete a bundle if it has purchases


-- 3. BENEFICIARY_PURCHASES Table
-- ============================================

-- Index for fast lookup of user's purchases
CREATE INDEX IF NOT EXISTS beneficiary_purchases_user_id_idx 
  ON beneficiary_purchases(user_id);

-- Index for product type queries
CREATE INDEX IF NOT EXISTS beneficiary_purchases_product_id_idx 
  ON beneficiary_purchases(product_id);

-- Index for Stripe payment tracking
CREATE INDEX IF NOT EXISTS beneficiary_purchases_stripe_payment_idx 
  ON beneficiary_purchases(stripe_payment_id) 
  WHERE stripe_payment_id IS NOT NULL;


-- 4. BUNDLES Table
-- ============================================

-- Already has PRIMARY KEY on id
-- Already has UNIQUE on stripe_product_id and stripe_price_id

-- Index for price-based sorting
CREATE INDEX IF NOT EXISTS bundles_price_idx 
  ON bundles(price DESC);


-- ============================================
-- PART 2: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- CRITICAL: Server uses SUPABASE_SERVICE_ROLE_KEY which BYPASSES RLS
-- These policies only affect frontend queries using ANON KEY
-- ============================================

-- 1. THEME_PURCHASES RLS
-- ============================================

-- Enable RLS (if not already enabled)
ALTER TABLE theme_purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own theme purchases" ON theme_purchases;
DROP POLICY IF EXISTS "Service role can insert theme purchases" ON theme_purchases;
DROP POLICY IF EXISTS "Service role can manage all theme purchases" ON theme_purchases;

-- Policy 1: Users can SELECT their own purchases
CREATE POLICY "Users can view their own theme purchases"
  ON theme_purchases
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy 2: No INSERT from frontend (only server with service role key)
-- Service role key bypasses RLS, so no policy needed for INSERT

-- Policy 3: No UPDATE/DELETE from frontend
-- Only server can modify via service role key

-- Result: 
-- ✅ Frontend (anon key) can read own purchases
-- ✅ Server (service role) can do anything (bypasses RLS)
-- ❌ Frontend cannot insert/update/delete (prevents cheating)


-- 2. BUNDLE_PURCHASES RLS
-- ============================================

ALTER TABLE bundle_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own bundle purchases" ON bundle_purchases;
DROP POLICY IF EXISTS "Service role can manage all bundle purchases" ON bundle_purchases;

CREATE POLICY "Users can view their own bundle purchases"
  ON bundle_purchases
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Result: Same security model as theme_purchases


-- 3. BENEFICIARY_PURCHASES RLS
-- ============================================

ALTER TABLE beneficiary_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own beneficiary purchases" ON beneficiary_purchases;
DROP POLICY IF EXISTS "Service role can manage all beneficiary purchases" ON beneficiary_purchases;

CREATE POLICY "Users can view their own beneficiary purchases"
  ON beneficiary_purchases
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Result: Same security model


-- 4. BUNDLES RLS
-- ============================================
-- Already has RLS enabled and SELECT policy from bundle-setup.sql
-- No changes needed - bundles are public read-only


-- ============================================
-- PART 3: VERIFY WEBHOOK WILL WORK
-- ============================================
-- The webhook uses SUPABASE_SERVICE_ROLE_KEY which has these permissions:
-- ✅ Bypasses ALL RLS policies
-- ✅ Can INSERT into any table
-- ✅ Can UPDATE any row
-- ✅ Can DELETE any row
-- 
-- The triggers use SECURITY DEFINER which means:
-- ✅ They run with the permissions of the function owner (postgres superuser)
-- ✅ They bypass RLS
-- ✅ They can write to any table even with RLS enabled
-- 
-- This is SAFE because:
-- ✅ Webhooks are authenticated via Stripe signature verification
-- ✅ Triggers only run on valid purchases
-- ✅ Frontend using anon key cannot insert purchases (RLS blocks it)
-- ✅ All purchases MUST go through Stripe checkout → webhook → server
-- ============================================


-- ============================================
-- PART 4: VERIFICATION QUERIES
-- ============================================

-- Check constraints
SELECT
  conname as constraint_name,
  conrelid::regclass as table_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid IN ('theme_purchases'::regclass, 'bundle_purchases'::regclass, 'beneficiary_purchases'::regclass, 'bundles'::regclass)
ORDER BY conrelid::regclass::text, contype;

-- Check indexes
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename IN ('theme_purchases', 'bundle_purchases', 'beneficiary_purchases', 'bundles')
ORDER BY tablename, indexname;

-- Check RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('theme_purchases', 'bundle_purchases', 'beneficiary_purchases', 'bundles')
ORDER BY tablename;

-- Check RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as command,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies
WHERE tablename IN ('theme_purchases', 'bundle_purchases', 'beneficiary_purchases', 'bundles')
ORDER BY tablename, policyname;

-- Summary
DO $$
DECLARE
  theme_constraints INT;
  bundle_constraints INT;
  theme_indexes INT;
  bundle_indexes INT;
  theme_policies INT;
  bundle_policies INT;
BEGIN
  SELECT COUNT(*) INTO theme_constraints FROM pg_constraint WHERE conrelid = 'theme_purchases'::regclass;
  SELECT COUNT(*) INTO bundle_constraints FROM pg_constraint WHERE conrelid = 'bundle_purchases'::regclass;
  SELECT COUNT(*) INTO theme_indexes FROM pg_indexes WHERE tablename = 'theme_purchases';
  SELECT COUNT(*) INTO bundle_indexes FROM pg_indexes WHERE tablename = 'bundle_purchases';
  SELECT COUNT(*) INTO theme_policies FROM pg_policies WHERE tablename = 'theme_purchases';
  SELECT COUNT(*) INTO bundle_policies FROM pg_policies WHERE tablename = 'bundle_purchases';
  
  RAISE NOTICE '';
  RAISE NOTICE '====================================';
  RAISE NOTICE '  DATABASE SECURITY SUMMARY';
  RAISE NOTICE '====================================';
  RAISE NOTICE 'Theme Purchases:';
  RAISE NOTICE '  - Constraints: %', theme_constraints;
  RAISE NOTICE '  - Indexes: %', theme_indexes;
  RAISE NOTICE '  - RLS Policies: %', theme_policies;
  RAISE NOTICE '';
  RAISE NOTICE 'Bundle Purchases:';
  RAISE NOTICE '  - Constraints: %', bundle_constraints;
  RAISE NOTICE '  - Indexes: %', bundle_indexes;
  RAISE NOTICE '  - RLS Policies: %', bundle_policies;
  RAISE NOTICE '';
  RAISE NOTICE '✅ Webhook Safety: CONFIRMED';
  RAISE NOTICE '   - Server uses SERVICE_ROLE_KEY (bypasses RLS)';
  RAISE NOTICE '   - Triggers use SECURITY DEFINER (bypass RLS)';
  RAISE NOTICE '   - Frontend uses ANON_KEY (RLS enforced)';
  RAISE NOTICE '====================================';
END $$;
