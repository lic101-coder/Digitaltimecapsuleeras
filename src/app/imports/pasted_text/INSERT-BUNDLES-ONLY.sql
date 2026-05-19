-- ============================================
-- INSERT BUNDLES (if table is empty)
-- Run this if diagnostic shows "0 bundles"
-- ============================================

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

-- Verify it worked
SELECT id, name, stripe_product_id, array_length(themes, 1) as theme_count FROM bundles ORDER BY price DESC;

-- Should show 4 rows:
-- complete-library    | Complete Theme Library | prod_UBF7QhqUggiUm0 | 11
-- life-milestones     | Life Milestones       | prod_UBF8ZAfAoNwgZI |  5
-- celebration         | Celebration Pack      | prod_UBF8RA7iFHig8v |  4
-- inner-journey       | Inner Journey         | prod_UBFA1BVhrMDQrh |  2
