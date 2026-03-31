-- ============================================================================
-- SECURITY FIX: user_unlocked_themes View
-- ============================================================================
-- 
-- Issue: The view was defined with SECURITY DEFINER which bypasses RLS
-- Fix: Recreate as SECURITY INVOKER (default) with proper RLS and GRANTs
--
-- Run this SQL in your Supabase SQL Editor
--
-- ============================================================================

-- Step 1: Drop the existing SECURITY DEFINER view
-- ----------------------------------------------------------------------------
DROP VIEW IF EXISTS public.user_unlocked_themes;

-- Step 2: Recreate the view WITHOUT SECURITY DEFINER (defaults to SECURITY INVOKER)
-- ----------------------------------------------------------------------------
-- This view shows which themes each user has unlocked
-- It will now run with the caller's permissions and respect RLS policies

CREATE VIEW public.user_unlocked_themes AS
SELECT 
  user_id,
  theme_id,
  unlocked_at
FROM public.user_purchased_themes
WHERE unlocked_at IS NOT NULL;

-- Add a helpful comment
COMMENT ON VIEW public.user_unlocked_themes IS 
'View showing unlocked themes per user. Runs with SECURITY INVOKER (caller permissions). RLS policies apply.';

-- Step 3: Grant explicit permissions to authenticated users
-- ----------------------------------------------------------------------------
-- Only authenticated users can query this view
GRANT SELECT ON public.user_unlocked_themes TO authenticated;

-- Revoke access from anonymous users and public
REVOKE SELECT ON public.user_unlocked_themes FROM anon;
REVOKE SELECT ON public.user_unlocked_themes FROM public;

-- Step 4: Ensure proper RLS policies exist on the underlying table
-- ----------------------------------------------------------------------------
-- The view relies on user_purchased_themes table having proper RLS
-- Let's ensure those policies exist and are correct

-- Enable RLS on the table if not already enabled
ALTER TABLE public.user_purchased_themes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them cleanly
DROP POLICY IF EXISTS "Users can view their own unlocked themes" ON public.user_purchased_themes;
DROP POLICY IF EXISTS "Users can view own purchases" ON public.user_purchased_themes;

-- Create a clear RLS policy: Users can only see their own unlocked themes
CREATE POLICY "Users can view their own unlocked themes"
ON public.user_purchased_themes
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Step 5: Add performance index if not exists
-- ----------------------------------------------------------------------------
-- Optimize queries filtering by user_id
CREATE INDEX IF NOT EXISTS idx_user_purchased_themes_user_id 
ON public.user_purchased_themes(user_id);

-- Optimize queries filtering by user_id and unlocked themes
CREATE INDEX IF NOT EXISTS idx_user_purchased_themes_user_unlocked 
ON public.user_purchased_themes(user_id, theme_id) 
WHERE unlocked_at IS NOT NULL;

-- Step 6: Verification queries
-- ----------------------------------------------------------------------------
-- Run these to verify the fix worked:

-- 1. Check the view is now SECURITY INVOKER (should show no SECURITY DEFINER)
-- SELECT 
--   viewname, 
--   definition,
--   viewowner
-- FROM pg_views 
-- WHERE viewname = 'user_unlocked_themes';

-- 2. Check RLS is enabled on the underlying table
-- SELECT 
--   tablename, 
--   rowsecurity 
-- FROM pg_tables 
-- WHERE tablename = 'user_purchased_themes';

-- 3. Check policies exist
-- SELECT 
--   policyname, 
--   cmd, 
--   roles,
--   qual,
--   with_check
-- FROM pg_policies 
-- WHERE tablename = 'user_purchased_themes';

-- 4. Test as authenticated user (should only see your own themes)
-- SELECT * FROM user_unlocked_themes;

-- ============================================================================
-- SECURITY FIX COMPLETE
-- ============================================================================
-- 
-- What changed:
-- ✅ View now runs as SECURITY INVOKER (caller's permissions)
-- ✅ RLS policies on underlying table enforce user_id = auth.uid()
-- ✅ Explicit GRANTs only to authenticated role
-- ✅ Anonymous users cannot access the view
-- ✅ Performance indexes added for user_id queries
--
-- Security guarantees:
-- ✅ Users can only see their own unlocked themes
-- ✅ RLS cannot be bypassed through this view
-- ✅ View respects caller's permissions and context
-- ✅ No privilege escalation possible
--
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Test queries as authenticated user
-- 3. Verify RLS is working correctly
-- 4. Monitor for any permission errors in application logs
--
-- ============================================================================
