# 🎯 WEBHOOK TESTING GUIDE - Use Webhook Route

## ✅ WHY THIS APPROACH?

Your database has **complex bidirectional triggers** that:
- Auto-populate `user_unlocked_themes` when inserting into `theme_purchases`
- Auto-expand bundles into individual theme purchases
- But those derived rows are missing `purchase_type`, causing errors

**SOLUTION:** Use the webhook endpoint directly - it handles everything correctly!

---

## 🚀 STEP-BY-STEP INSTRUCTIONS

### **STEP 1: Clean Up Test Data**

Run in Supabase SQL Editor: **`/CLEANUP-TEST-DATA.sql`**

This deletes all existing test purchases so we can start fresh.

---

### **STEP 2: Test Webhook Calls**

Open file: **`/TEST-WEBHOOK-CALLS.html`** in your browser

**How to use:**
1. Click **"Purchase All (1 click)"** button
2. Wait for all 3 purchases to complete
3. Click **"Check Unlocked Themes"** to verify

**Expected Results:**
- ✅ 5 themes unlocked: `["new_life", "wedding", "career", "graduation", "new_home"]`
- ✅ Beneficiary limit: `4` (1 default + 3 purchased)

---

### **STEP 3: Hard Refresh App**

Press: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)

Open Store → You should see:
- ✅ Genesis (New Life) - "Unlocked ✓"
- ✅ Golden Moments (wedding) - "Unlocked ✓"
- ✅ Career Summit (career) - "Unlocked ✓"
- ✅ Summit Ascent (graduation) - "Unlocked ✓"
- ✅ New Nest (new_home) - "Unlocked ✓"
- ✅ Beneficiary slots: 4

---

## 🔧 MANUAL WEBHOOK CALLS (Alternative)

If you prefer curl/Postman instead of the HTML file:

### **Purchase Theme:**
```bash
curl -X POST https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE" \
  -d '{
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_theme_001",
        "customer_email": "test@example.com",
        "metadata": {
          "userId": "fff635a5-0246-4562-aa1f-de35635a8f9d",
          "purchaseType": "theme",
          "themeId": "new_life"
        },
        "amount_total": 299,
        "payment_intent": "pi_test_theme_correct"
      }
    }
  }'
```

### **Purchase Bundle:**
```bash
curl -X POST https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE" \
  -d '{
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_bundle_001",
        "customer_email": "test@example.com",
        "metadata": {
          "userId": "fff635a5-0246-4562-aa1f-de35635a8f9d",
          "purchaseType": "bundle",
          "bundleId": "life-milestones"
        },
        "amount_total": 599,
        "payment_intent": "pi_test_bundle_correct"
      }
    }
  }'
```

### **Purchase Beneficiary Slots:**
```bash
curl -X POST https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZGZ2cGdhem5wcWxvcmRraXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTcyOTksImV4cCI6MjA1MzU5MzI5OX0.AhqN7Ew_ZO8jd4hjl_-RFI7UShEtJMWQQiPNmj1V-gE" \
  -d '{
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_beneficiary_001",
        "customer_email": "test@example.com",
        "metadata": {
          "userId": "fff635a5-0246-4562-aa1f-de35635a8f9d",
          "purchaseType": "beneficiary",
          "beneficiaryType": "slot-3",
          "quantity": "3"
        },
        "amount_total": 199,
        "payment_intent": "pi_test_beneficiary_correct"
      }
    }
  }'
```

---

## 🐛 TROUBLESHOOTING

### **Webhook returns 200 but themes don't unlock:**

1. **Check Edge Function logs in Supabase:**
   - Look for: `✅ [Webhook] Theme '...' purchase saved`
   - Look for trigger errors

2. **Check database:**
   ```sql
   -- Did purchase save?
   SELECT * FROM theme_purchases WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
   
   -- Did trigger populate unlocks?
   SELECT * FROM user_unlocked_themes WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
   ```

3. **If triggers aren't firing, manually populate:**
   ```sql
   INSERT INTO user_unlocked_themes (user_id, theme_id)
   SELECT user_id, theme_id FROM theme_purchases 
   WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
   ON CONFLICT DO NOTHING;
   ```

### **Beneficiary limit shows wrong number:**

1. **Check purchases:**
   ```sql
   SELECT * FROM beneficiary_purchases 
   WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
   ```

2. **Verify calculation:**
   - Should be: `1 (default) + 3 (purchased) = 4`

3. **Check if view exists:**
   ```sql
   SELECT * FROM v_user_beneficiary_limits 
   WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d';
   ```

---

## ✅ SUCCESS CRITERIA

After webhook calls complete:

- [ ] `/TEST-WEBHOOK-CALLS.html` shows "✅ Match: YES!" for themes
- [ ] `/TEST-WEBHOOK-CALLS.html` shows "✅ Match: YES!" for beneficiary limit
- [ ] Store UI shows 5 themes unlocked
- [ ] Store UI shows 4 beneficiary slots

**IF ALL ✅ → SYSTEM FULLY WORKING! 🎉**

---

## 📊 HOW IT WORKS

```
1. HTML page sends POST to /stripe-webhook
2. Webhook validates & saves to purchase tables
3. Database triggers auto-populate user_unlocked_themes
4. Store reads from user_unlocked_themes
5. Themes show as unlocked! 🎉
```

**No manual SQL needed - triggers handle everything!**

---

**🎯 Just open `/TEST-WEBHOOK-CALLS.html` and click "Purchase All"!**
