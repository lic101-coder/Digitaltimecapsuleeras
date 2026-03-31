# 🚨 ACTION PLAN - FIX YOUR TEST DATA NOW!

## THE PROBLEM

Your test data has **INVALID IDs** that don't match the app!

**What you inserted:**
- ❌ `bundle_id: starter_pack` (DOESN'T EXIST!)
- ❌ `product_id: beneficiary_slots` (WRONG!)

**What the app expects:**
- ✅ `bundle_id: life-milestones` (or celebration, inner-journey)
- ✅ `product_id: slot-3` (or slot-1, unlimited)

---

## 🔥 STEP 1: RUN THIS SQL IN SUPABASE (COPY/PASTE)

```sql
-- Delete invalid test data
DELETE FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND bundle_id = 'starter_pack';

DELETE FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d' 
AND product_id = 'beneficiary_slots';

-- Insert CORRECT test data
INSERT INTO public.bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'life-milestones', 5.99, 'test_bundle_correct')
ON CONFLICT (stripe_payment_id) DO NOTHING;

INSERT INTO public.beneficiary_purchases (user_id, product_id, slots_purchased, price_paid, stripe_payment_id)
VALUES ('fff635a5-0246-4562-aa1f-de35635a8f9d', 'slot-3', 3, 1.99, 'test_beneficiary_correct')
ON CONFLICT (stripe_payment_id) DO NOTHING;

-- Verify
SELECT 'Themes' AS type, theme_id AS id FROM public.theme_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'Bundles' AS type, bundle_id FROM public.bundle_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
UNION ALL
SELECT 'Beneficiaries' AS type, product_id FROM public.beneficiary_purchases 
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
```

**Expected output:**
```
Themes        | new_life
Bundles       | life-milestones
Beneficiaries | slot-3
```

---

## 🔥 STEP 2: HARD REFRESH YOUR APP

Press: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

---

## 🔥 STEP 3: CHECK STORE

1. Open Settings (gear icon) → Store
2. You should now see:
   - ✅ **Genesis (New Life)** - "Unlocked ✓"
   - ✅ **Life Milestones Bundle** - Shows 5 themes unlocked
   - ✅ **Beneficiary slots: 4** (1 default + 3 purchased)

---

## 📊 WHAT WILL UNLOCK

### Theme Purchase: `new_life`
- ✅ Genesis (New Life) theme unlocked

### Bundle Purchase: `life-milestones`
- ✅ Golden Moments (wedding)
- ✅ Career Summit (career)
- ✅ Genesis (new_life)
- ✅ Summit Ascent (graduation)
- ✅ New Nest (new_home)

**Total unlocked: 5 themes** (1 individual + bundle with 5 themes, but `new_life` is in both so only counted once)

### Beneficiary Purchase: `slot-3` (3 slots)
- ✅ Total slots: 4 (1 default + 3 purchased)

---

## 🐛 IF IT STILL DOESN'T WORK

### Check 1: API Endpoint
Open browser console, run:
```javascript
fetch('https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/purchases/fff635a5-0246-4562-aa1f-de35635a8f9d', {
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE' }
}).then(r => r.json()).then(d => {
  console.log('📦 Themes:', d.themes);
  console.log('👥 Beneficiary Limit:', d.beneficiaryLimit);
})
```

**Expected:**
```
📦 Themes: [
  { theme_id: "new_life", ... },
  { theme_id: "wedding", source: "bundle", ... },
  { theme_id: "career", source: "bundle", ... },
  { theme_id: "graduation", source: "bundle", ... },
  { theme_id: "new_home", source: "bundle", ... }
]
👥 Beneficiary Limit: 4
```

### Check 2: Supabase Edge Function Logs
1. Supabase Dashboard → Edge Functions
2. Click "make-server-f9be53a7"
3. Click "Logs"
4. Refresh your Store
5. Look for:
   ```
   📦 [Purchases] Found 1 individual theme purchases
   📦 [Purchases] Found 1 bundle purchases
   📦 [Purchases] Processing bundle: life-milestones with themes: [...]
   ```

### Check 3: Database Tables
1. Supabase → Table Editor
2. Check `theme_purchases` - Should have 1 row
3. Check `bundle_purchases` - Should have 1 row
4. Check `beneficiary_purchases` - Should have 1 row

---

## ✅ SUCCESS CRITERIA

After running the SQL above and refreshing:

- [ ] Genesis (New Life) shows "Unlocked ✓"
- [ ] Life Milestones bundle shows 5 unlocked themes
- [ ] Beneficiary limit shows "4 slots"
- [ ] API returns correct themes array
- [ ] No errors in browser console

**If ALL ✅ → SYSTEM WORKING!**

---

## 📘 REFERENCE DOCUMENTS

- `/VALID-PRODUCT-IDS.md` - All valid theme/bundle/product IDs
- `/FIX-TEST-DATA.sql` - SQL script to fix your data
- `/QUICK-TEST-CHECKLIST.md` - 5-minute testing guide

---

## 🎯 WEBHOOK URL

**Your webhook URL is CORRECT:** 
`https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook`

**DO NOT CHANGE IT!** It's the same endpoint, we just changed the internal logic from KV → Postgres.

---

## 🔥 FINAL NOTE

The app is working correctly. Your test data just had invalid IDs. Once you run the SQL above, everything will unlock properly!
