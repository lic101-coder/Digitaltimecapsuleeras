# 🎯 FINAL INTEGRATION WITH SUPABASE SCHEMA

## ✅ WHAT I JUST UPDATED

I've updated the backend to work with **BOTH** Supabase's recommended schema AND our purchase tracking:

### **Webhook Now Writes To:**
1. **`theme_purchases`** - For audit/tracking
2. **`user_unlocked_themes`** ✅ - For fast unlock checks (Supabase recommended)
3. **`bundle_purchases`** - For audit/tracking  
4. **`beneficiary_purchases`** - For tracking slots

### **Unlock Logic Now Reads From:**
1. **`user_unlocked_themes`** ✅ - Fast unlock status
2. **`v_user_beneficiary_limits`** ✅ - Beneficiary limits (VIEW)
   - Falls back to calculating from `beneficiary_purchases` if view doesn't exist

---

## 🚀 STEP 1: VERIFY YOUR SCHEMA

**Run this SQL in Supabase and paste results:**

```sql
-- Check what tables exist
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND (
    table_name IN (
      'theme_purchases',
      'bundle_purchases', 
      'beneficiary_purchases',
      'user_unlocked_themes',
      'v_user_beneficiary_limits'
    )
  )
ORDER BY table_name;
```

**Expected:** You should see at least `user_unlocked_themes` table.

---

## 🚀 STEP 2: SYNC EXISTING DATA

If you already have data in `theme_purchases` and `bundle_purchases`, we need to SYNC it to `user_unlocked_themes`:

```sql
-- Copy existing theme purchases to user_unlocked_themes
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
SELECT DISTINCT user_id, theme_id 
FROM public.theme_purchases
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Expand bundle purchases into individual themes
-- Life Milestones bundle
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
SELECT user_id, unnest(ARRAY['wedding','career','new_life','graduation','new_home'])
FROM public.bundle_purchases
WHERE bundle_id = 'life-milestones'
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Celebration bundle
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
SELECT user_id, unnest(ARRAY['friendship','travel','new_year','pet'])
FROM public.bundle_purchases
WHERE bundle_id = 'celebration'
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Inner Journey bundle
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
SELECT user_id, unnest(ARRAY['future','gratitude'])
FROM public.bundle_purchases
WHERE bundle_id = 'inner-journey'
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Complete Library bundle (if any)
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
SELECT user_id, unnest(ARRAY['wedding','career','future','new_life','travel','new_year','friendship','pet','gratitude','graduation','new_home'])
FROM public.bundle_purchases
WHERE bundle_id = 'complete-library'
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Verify sync
SELECT user_id, COUNT(*) as unlocked_count
FROM public.user_unlocked_themes
GROUP BY user_id;
```

---

## 🚀 STEP 3: FIX YOUR TEST DATA

```sql
-- Your user ID
SET session vars.my_user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';

-- Delete invalid test data
DELETE FROM public.bundle_purchases WHERE user_id = current_setting('vars.my_user_id')::uuid AND bundle_id = 'starter_pack';
DELETE FROM public.beneficiary_purchases WHERE user_id = current_setting('vars.my_user_id')::uuid AND product_id = 'beneficiary_slots';

-- Insert CORRECT test data with valid IDs
INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES (current_setting('vars.my_user_id')::uuid, 'life-milestones', 5.99, 'test_bundle_fixed')
ON CONFLICT (stripe_payment_id) DO NOTHING;

INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES (current_setting('vars.my_user_id')::uuid, 'slot-3', 3, 1.99, 'test_beneficiary_fixed')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- MANUALLY unlock themes in user_unlocked_themes
INSERT INTO public.user_unlocked_themes (user_id, theme_id)
VALUES 
  (current_setting('vars.my_user_id')::uuid, 'new_life'),    -- From theme purchase
  (current_setting('vars.my_user_id')::uuid, 'wedding'),     -- From life-milestones bundle
  (current_setting('vars.my_user_id')::uuid, 'career'),      -- From life-milestones bundle
  (current_setting('vars.my_user_id')::uuid, 'graduation'),  -- From life-milestones bundle
  (current_setting('vars.my_user_id')::uuid, 'new_home')     -- From life-milestones bundle
ON CONFLICT (user_id, theme_id) DO NOTHING;

-- Verify
SELECT * FROM public.user_unlocked_themes 
WHERE user_id = current_setting('vars.my_user_id')::uuid;
```

---

## 🚀 STEP 4: TEST THE API

Open browser console and run:

```javascript
// Test purchases endpoint
fetch('https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/purchases/fff635a5-0246-4562-aa1f-de35635a8f9d', {
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE' }
}).then(r => r.json()).then(d => {
  console.log('✅ Unlocked Themes:', d.themes.map(t => t.theme_id));
  console.log('👥 Beneficiary Limit:', d.beneficiaryLimit);
});
```

**Expected output:**
```
✅ Unlocked Themes: ["new_life", "wedding", "career", "graduation", "new_home"]
👥 Beneficiary Limit: 4
```

---

## 🚀 STEP 5: HARD REFRESH APP

Press: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

Open Store → Check:
- ✅ Genesis (New Life) - "Unlocked ✓"
- ✅ Golden Moments (wedding) - "Unlocked ✓"
- ✅ Career Summit (career) - "Unlocked ✓"
- ✅ Summit Ascent (graduation) - "Unlocked ✓"
- ✅ New Nest (new_home) - "Unlocked ✓"
- ✅ Beneficiary slots: 4

---

## 📊 HOW IT WORKS NOW

### **When User Buys Theme:**
1. Stripe webhook fires
2. Backend INSERTs into `theme_purchases` (tracking)
3. Backend INSERTs into `user_unlocked_themes` ✅ (unlock status)
4. Store reads from `user_unlocked_themes` ✅
5. Theme shows as unlocked!

### **When User Buys Bundle:**
1. Stripe webhook fires
2. Backend INSERTs into `bundle_purchases` (tracking)
3. Backend UPSERTS all themes in bundle into `user_unlocked_themes` ✅
4. Store reads from `user_unlocked_themes` ✅
5. All bundle themes show as unlocked!

### **Beneficiary Limits:**
1. Backend tries to read from `v_user_beneficiary_limits` view ✅
2. If view doesn't exist, calculates from `beneficiary_purchases`
3. Returns limit to frontend

---

## 🎯 REQUIRED TABLES/VIEWS

### **MUST HAVE:**
- ✅ `user_unlocked_themes` - Tracks which themes user has unlocked
  - Columns: `user_id`, `theme_id`, `created_at`
  - Primary key: `(user_id, theme_id)`

### **RECOMMENDED:**
- ✅ `v_user_beneficiary_limits` - VIEW that calculates beneficiary limits
  - Returns: `user_id`, `max_allowed` (or `limit`)

### **OPTIONAL (for tracking):**
- `theme_purchases` - Audit trail of theme purchases
- `bundle_purchases` - Audit trail of bundle purchases
- `beneficiary_purchases` - Audit trail of beneficiary purchases

---

## 🐛 TROUBLESHOOTING

### **Themes not unlocking:**
1. Check `user_unlocked_themes` has rows for your user
2. Run: `SELECT * FROM user_unlocked_themes WHERE user_id = 'YOUR_ID'`
3. If empty, manually insert test data (see Step 3)

### **Beneficiary limit not working:**
1. Check if `v_user_beneficiary_limits` view exists
2. If not, backend will calculate from `beneficiary_purchases` table
3. Verify `beneficiary_purchases` has rows with correct `product_id` (`slot-1`, `slot-3`, or `unlimited`)

### **Webhook not saving:**
1. Check Supabase Edge Function logs
2. Look for: `✅ [Webhook] Theme added to user_unlocked_themes`
3. If error, check RLS policies allow service role to INSERT

---

## ✅ SUCCESS CRITERIA

After running Steps 2-5:

- [ ] `user_unlocked_themes` table has 5 rows for your user
- [ ] API returns 5 themes in `themes` array
- [ ] API returns `beneficiaryLimit: 4`
- [ ] Store UI shows 5 themes unlocked
- [ ] Store UI shows "4 slots" for beneficiaries

**IF ALL ✅ → SYSTEM FULLY INTEGRATED! 🎉**

---

**Next: Run the SQL in Steps 2-3, then test with Step 4!**
