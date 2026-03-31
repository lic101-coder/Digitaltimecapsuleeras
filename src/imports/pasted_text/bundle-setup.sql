-- ============================================
-- ERAS BUNDLES TABLE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- Create bundles table with Stripe ID mapping
CREATE TABLE IF NOT EXISTS public.bundles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  stripe_product_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  themes TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read bundles (needed for store display)
CREATE POLICY "Bundles are viewable by everyone"
  ON public.bundles FOR SELECT
  USING (true);

-- Insert the 4 bundles with correct Stripe mappings
INSERT INTO public.bundles (id, name, stripe_product_id, stripe_price_id, price, themes) VALUES
  (
    'complete-library',
    'Complete Theme Library',
    'prod_UBF7QhqUggiUm0',
    'price_1TCsdYHUyotQ1kngEB9gOyr2',
    9.99,
    ARRAY['wedding', 'career', 'future', 'new_life', 'travel', 'new_year', 'friendship', 'pet', 'gratitude', 'graduation', 'new_home']
  ),
  (
    'life-milestones',
    'Life Milestones',
    'prod_UBF8ZAfAoNwgZI',
    'price_1TCseDHUyotQ1kng86obk1HT',
    5.99,
    ARRAY['wedding', 'career', 'new_life', 'graduation', 'new_home']
  ),
  (
    'celebration',
    'Celebration Pack',
    'prod_UBF8RA7iFHig8v',
    'price_1TCsehHUyotQ1kngXZf0Qay2',
    2.49,
    ARRAY['friendship', 'travel', 'new_year', 'pet']
  ),
  (
    'inner-journey',
    'Inner Journey',
    'prod_UBFA1BVhrMDQrh',
    'price_1TCsfpHUyotQ1kngmT3KKiE0',
    1.99,
    ARRAY['future', 'gratitude']
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stripe_product_id = EXCLUDED.stripe_product_id,
  stripe_price_id = EXCLUDED.stripe_price_id,
  price = EXCLUDED.price,
  themes = EXCLUDED.themes;

-- Add purchased_count column to track stats
ALTER TABLE public.bundles ADD COLUMN IF NOT EXISTS purchased_count INTEGER DEFAULT 0;

-- Create function to update bundle purchase count
CREATE OR REPLACE FUNCTION increment_bundle_purchase_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.bundles
  SET purchased_count = purchased_count + 1
  WHERE id = NEW.bundle_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-increment purchase count
DROP TRIGGER IF EXISTS update_bundle_stats ON public.bundle_purchases;
CREATE TRIGGER update_bundle_stats
  AFTER INSERT ON public.bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION increment_bundle_purchase_count();

-- Verify setup
SELECT 
  id,
  name,
  stripe_product_id,
  stripe_price_id,
  price,
  array_length(themes, 1) as theme_count,
  purchased_count
FROM public.bundles
ORDER BY price DESC;
