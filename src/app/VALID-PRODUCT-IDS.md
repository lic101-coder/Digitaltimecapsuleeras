# ✅ VALID PRODUCT IDS FOR ERAS

## 🎨 THEME IDs (11 Premium Themes)

```
wedding        → Golden Moments ($2.99)
career         → Career Summit ($1.99)
future         → Crystal Visions ($1.99)
new_life       → Genesis (New Life) ($1.99)
travel         → World Wanderer ($0.99)
new_year       → New Horizon ($0.99)
friendship     → Mixtape Memories ($0.99)
pet            → Paws & Whiskers ($0.99)
gratitude      → Grateful Heart ($0.99)
graduation     → Summit Ascent ($0.99)
new_home       → New Nest ($0.99)
```

**FREE THEMES (Not in database, always unlocked):**
```
standard
birthday
anniversary
first_day
```

---

## 📦 BUNDLE IDs (3 Bundles in Store)

```
life-milestones   → Life Milestones ($5.99)
  └─ Includes: wedding, career, new_life, graduation, new_home

celebration       → Celebration Pack ($2.49)
  └─ Includes: friendship, travel, new_year, pet

inner-journey     → Inner Journey ($1.99)
  └─ Includes: future, gratitude
```

**Backend also has:**
```
complete-library  → Complete Library ($9.99) [not in Store UI yet]
  └─ Includes: wedding, career, future, new_life, travel, new_year, 
               friendship, pet, gratitude, graduation, new_home
```

---

## 👥 BENEFICIARY Product IDs

```
slot-1      → +1 Slot ($0.99)
slot-3      → +3 Slots ($1.99)
unlimited   → Unlimited Slots ($4.99)
```

**Backend also accepts:**
```
quantity    → Same as slot-1 (legacy)
individual  → Same as slot-1 (legacy)
```

---

## 🗂️ DATABASE TABLE STRUCTURE

### `theme_purchases`
```sql
user_id          → UUID (auth.users)
theme_id         → TEXT (must be from THEME IDs above)
purchase_type    → TEXT ('individual' or 'bundle')
price_paid       → NUMERIC
stripe_payment_id → TEXT (unique)
purchase_date    → TIMESTAMPTZ
```

### `bundle_purchases`
```sql
user_id          → UUID (auth.users)
bundle_id        → TEXT (must be from BUNDLE IDs above)
price_paid       → NUMERIC
stripe_payment_id → TEXT (unique)
purchase_date    → TIMESTAMPTZ
```

### `beneficiary_purchases`
```sql
user_id          → UUID (auth.users)
product_id       → TEXT (slot-1, slot-3, unlimited)
slots_purchased  → INTEGER (1, 3, or 999999 for unlimited)
price_paid       → NUMERIC
stripe_payment_id → TEXT (unique)
purchase_date    → TIMESTAMPTZ
```

---

## ❌ COMMON MISTAKES

**WRONG Bundle IDs:**
- ❌ `starter_pack` (doesn't exist!)
- ❌ `premium_bundle` (doesn't exist!)
- ❌ `all_themes` (use `complete-library`)

**WRONG Product IDs:**
- ❌ `beneficiary_slots` (use `slot-1`, `slot-3`, or `unlimited`)
- ❌ `slots` (use `slot-1`, `slot-3`, or `unlimited`)
- ❌ `extra_slots` (use `slot-1`, `slot-3`, or `unlimited`)

**WRONG Theme IDs:**
- ❌ `genesis` (use `new_life` - genesis is an alias handled by normalizer)
- ❌ `mixtape` (use `friendship` - mixtape is an alias)
- ❌ `time-traveler` (use `future` - time-traveler is an alias)

---

## 🎯 QUICK TEST INSERTS (Copy/Paste)

```sql
-- Replace YOUR_USER_ID with your actual UUID

-- Test theme purchase
INSERT INTO public.theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
VALUES ('YOUR_USER_ID', 'new_life', 'individual', 2.99, 'test_theme_1');

-- Test bundle purchase
INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('YOUR_USER_ID', 'life-milestones', 5.99, 'test_bundle_1');

-- Test beneficiary purchase
INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES ('YOUR_USER_ID', 'slot-3', 3, 1.99, 'test_beneficiary_1');
```

---

## 🔍 HOW TO VERIFY

After inserting test data, run:

```sql
-- Check what themes will unlock
SELECT theme_id FROM public.theme_purchases WHERE user_id = 'YOUR_USER_ID'
UNION
SELECT unnest(ARRAY['wedding','career','new_life','graduation','new_home']) AS theme_id
  FROM public.bundle_purchases 
  WHERE user_id = 'YOUR_USER_ID' AND bundle_id = 'life-milestones'
UNION
SELECT unnest(ARRAY['friendship','travel','new_year','pet']) AS theme_id
  FROM public.bundle_purchases 
  WHERE user_id = 'YOUR_USER_ID' AND bundle_id = 'celebration'
UNION
SELECT unnest(ARRAY['future','gratitude']) AS theme_id
  FROM public.bundle_purchases 
  WHERE user_id = 'YOUR_USER_ID' AND bundle_id = 'inner-journey';
```

Expected: List of all unlocked theme IDs
