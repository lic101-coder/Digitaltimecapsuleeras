# ⚡ QUICK TEST CHECKLIST

## 🎯 Step-by-Step Testing (5 minutes)

### **STEP 1: Get Your User ID**
```sql
-- Run in Supabase SQL Editor:
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;
```
Copy your `id` value.

---

### **STEP 2: Insert Test Purchase**
```sql
-- Replace YOUR_USER_ID with the ID from Step 1:
INSERT INTO public.theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
VALUES ('YOUR_USER_ID', 'new_life', 'individual', 2.99, 'test_manual');
```

---

### **STEP 3: Verify in Postgres**
```sql
-- Should return 1 row:
SELECT * FROM public.theme_purchases WHERE user_id = 'YOUR_USER_ID';
```

---

### **STEP 4: Test API Endpoint**

Open browser console and run:
```javascript
fetch('https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/purchases/YOUR_USER_ID', {
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE' }
}).then(r => r.json()).then(console.log)
```

**Expected output:**
```json
{
  "themes": [
    {
      "theme_id": "new_life",
      "purchase_date": "2025-03-21...",
      "source": "individual"
    }
  ],
  "beneficiaryLimit": 1
}
```

---

### **STEP 5: Check Store UI**

1. Open your Eras app
2. Click **Settings (gear icon) → Store**
3. Look for **Genesis (New Life)** theme
4. Should show **"Unlocked ✓"** badge!

---

## ✅ Success Criteria

- [ ] SQL insert succeeds
- [ ] Row appears in `theme_purchases` table
- [ ] API returns theme in `themes` array
- [ ] Store UI shows "Unlocked ✓"

**If ALL ✅ → UNLOCKING WORKS! 🎉**

---

## 🔥 Quick Cleanup

```sql
-- Remove test purchase:
DELETE FROM public.theme_purchases 
WHERE stripe_payment_id = 'test_manual';
```

---

## 🚨 If It Doesn't Work

### **API returns empty array**
→ Check RLS policies:
```sql
-- Should see 2 policies per table:
SELECT * FROM pg_policies WHERE tablename IN ('theme_purchases', 'bundle_purchases', 'beneficiary_purchases');
```

### **Store doesn't refresh**
→ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### **SQL insert fails**
→ Check user ID is valid:
```sql
SELECT id FROM auth.users WHERE id = 'YOUR_USER_ID';
```

---

## 📞 Full Diagnostic

Run: `/test-webhook.html` page for comprehensive testing!
