# 🚀 QUICK FIX REFERENCE CARD

## 🎯 THE PROBLEM
```
Error: "Purchase processing error: Invalid beneficiary quantity: 0"
Metadata shows: quantity: "0" ← Should be "1", "3", or "-1"
```

---

## ✅ THE SOLUTION (3 Steps)

### **1️⃣ Deploy Webhook** (2 minutes)
```
Dashboard → Functions → stripe-webhook
→ Delete all code
→ Paste /supabase/functions/stripe-webhook/index.ts
→ Deploy
```

### **2️⃣ Deploy Server** (2 minutes)
```bash
supabase functions deploy make-server-f9be53a7
```

### **3️⃣ Configure Stripe** (1 minute)
```
Stripe Dashboard → Webhooks → Your endpoint
→ Enable: checkout.session.completed ✅
→ Remove: payment_intent.succeeded ❌
→ Save
```

---

## 🧪 TEST (1 minute each)

### **Test 1: +1 Beneficiary Slot**
```
Buy → Check logs for: quantity: '1' ✅
Database: slots_purchased = 1 ✅
```

### **Test 2: +3 Beneficiary Slots**
```
Buy → Check logs for: quantity: '3' ✅
Database: slots_purchased = 3 ✅
```

### **Test 3: Unlimited Beneficiaries**
```
Buy → Check logs for: quantity: '-1' ✅
Database: slots_purchased = -1 ✅
```

---

## ✅ VERIFICATION

**Good logs:**
```
📥 Received event: checkout.session.completed
💳 Checkout session completed: { metadata: { quantity: '1' } }
👥 Processing beneficiary purchase: slot-1 for user ...
📊 Slots: 1
✅ Beneficiary purchase complete: 1 slots
```

**Bad logs (old code):**
```
❌ Invalid beneficiary quantity: 0
Unhandled event type payment_intent.succeeded
```

---

## 📋 FILES CHANGED

1. ✅ `/supabase/functions/stripe-webhook/index.ts`
   - Now accepts `-1` (unlimited)
   - Better error messages

2. ✅ `/supabase/functions/server/index.tsx`
   - Uses `priceInfo.slots` for metadata
   - Handles all 3 types (1, 3, -1)

---

## 🆘 IF IT FAILS

**Still seeing "quantity: 0"?**
→ Redeploy main server (Step 2)

**Webhook rejects "-1"?**
→ Redeploy webhook (Step 1)

**No logs at all?**
→ Check Stripe webhook URL and secret

---

## 📊 BENEFICIARY PRODUCTS

| Type | Slots | Metadata |
|------|-------|----------|
| slot-1 | 1 | quantity: "1" |
| slot-3 | 3 | quantity: "3" |
| unlimited | -1 | quantity: "-1" |

---

## 🎯 SUCCESS = ALL GREEN

- [x] Webhook deployed
- [x] Server deployed  
- [x] Stripe configured
- [x] All 3 types tested
- [x] Database has correct values
- [x] No "quantity: 0" errors

**🎉 DONE!**
