# 🚨 DEPLOY NOW - CRITICAL FIXES CHECKLIST

## ✅ WHAT I JUST FIXED:

1. **Webhook now ONLY handles `checkout.session.completed`** (the event with metadata!)
2. **Removed `payment_intent.succeeded` handler** (metadata is on the session, not payment intent)
3. **Beneficiary quantity bug fixed for ALL 3 types:**
   - ✅ **+1 Slot** (`slot-1`) → quantity: "1"
   - ✅ **+3 Slots** (`slot-3`) → quantity: "3"
   - ✅ **Unlimited** (`unlimited`) → quantity: "-1"
4. **Server now uses `priceInfo.slots`** (single source of truth, no complex conditionals)
5. **Webhook accepts `-1` as valid** (for unlimited beneficiaries)

---

## 🎯 YOU MUST DEPLOY THE WEBHOOK NOW:

### **STEP 1: Deploy Stripe Webhook (UPDATED CODE)**

1. Go to: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw/functions
2. Click **`stripe-webhook`**
3. **Select all code** in editor (`Ctrl+A`)
4. **Delete it** (`Delete` key)
5. Open your local file: `/supabase/functions/stripe-webhook/index.ts`
6. **Copy ALL the code** (`Ctrl+A`, `Ctrl+C`)
7. **Paste** into Supabase editor (`Ctrl+V`)
8. Click **"Deploy"**
9. Wait for "✅ Deployed successfully"

---

### **STEP 2: Configure Stripe Webhook Events**

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click your webhook endpoint (the one pointing to Supabase)
3. Click **"+ Add events"** (or "Configure" or "Edit")
4. **Make sure these events are selected:**
   - ✅ `checkout.session.completed` ← **REQUIRED**
5. **Remove these events if present:**
   - ❌ `payment_intent.succeeded` ← Not needed (metadata is on session)
   - ❌ `payment_intent.payment_failed` ← Not needed
6. Click **"Save"** or **"Update endpoint"**

---

### **STEP 3: Deploy Main Server (REQUIRED FOR BENEFICIARY FIX)**

The main server changes are **REQUIRED** for the beneficiary quantity fix!

**Via Supabase CLI:**
```bash
# Install if needed
brew install supabase/tap/supabase

# Login and link
supabase login
supabase link --project-ref apdfvpgaznpqlordkipw

# Deploy
supabase functions deploy make-server-f9be53a7
```

**What changed:**
- ✅ Uses `priceInfo.slots` to set quantity metadata
- ✅ Handles slot-1 (1), slot-3 (3), unlimited (-1)
- ✅ No more "quantity: 0" errors!

---

## 🧪 TESTING AFTER DEPLOYMENT

### **Test 1: Check Webhook Logs**

1. Make a test purchase in your app
2. Go to Edge Functions → **stripe-webhook** → Logs
3. Look for these NEW log messages:

**✅ GOOD (NEW CODE):**
```
📥 Received event: checkout.session.completed (ID: evt_...)
💰 Payment intent succeeded: { paymentIntentId: 'pi_...', metadata: {...} }
🎨 Processing theme purchase: new_life for user fff635a5-0246-4562-aa1f-de35635a8f9d
✅ [Webhook] Theme 'new_life' purchase saved (individual)
✅ Purchase processed successfully from checkout.session.completed
```

**❌ BAD (OLD CODE - if you see this, redeploy!):**
```
Unhandled event type payment_intent.succeeded
Handled checkout.session.completed evt_...
stripe-webhook function (public) started
```

---

### **Test 2: Check Database**

Run this SQL in Supabase SQL Editor:

```sql
SELECT 
  user_id,
  theme_id,
  purchase_type,
  stripe_payment_id,
  price_paid,
  purchased_at
FROM public.theme_purchases
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY purchased_at DESC
LIMIT 5;
```

**Should show:** Your test purchase with today's timestamp

---

### **Test 3: Check Unlocked Themes**

Run this SQL:

```sql
SELECT 
  theme_id,
  unlocked_via,
  purchase_type,
  unlocked_at
FROM public.user_unlocked_themes
WHERE user_id = 'fff635a5-0246-4562-aa1f-de35635a8f9d'
ORDER BY unlocked_at DESC;
```

**Should show:** Theme unlocked via 'purchase' with 'individual' purchase_type

---

### **Test 4: Check in App**

1. Login to your app
2. Go to Settings → Store
3. The theme you just purchased should show as **"Unlocked"** or **"Owned"**
4. Go to Compose/Create Capsule
5. Theme should be available in the theme picker

---

## 🔍 WHAT CHANGED IN CHECKOUT CODE

### **BEFORE (broken):**
```typescript
metadata: {
  userId,
  purchaseType: 'theme',
  themeId: 'new_life',
}
// ❌ Metadata doesn't transfer to payment_intent!
```

### **AFTER (fixed):**
```typescript
metadata: {
  userId,
  purchaseType: 'theme',
  themeId: 'new_life',
},
payment_intent_data: {
  metadata: {
    userId,              // ✅ Now transfers!
    purchaseType: 'theme',
    themeId: 'new_life',
  },
},
```

---

## 🔍 WHAT CHANGED IN BENEFICIARY CHECKOUT

### **BEFORE (broken):**
```typescript
quantity: quantity?.toString() || '0'  // ❌ Sends "0" for slot-1!
```

### **AFTER (fixed):**
```typescript
quantity: purchaseType === 'slot-1' ? '1' : 
          purchaseType === 'slot-3' ? '3' : 
          (quantity?.toString() || '1')
// ✅ Correctly maps slot-1 → "1", slot-3 → "3"
```

---

## ⚠️ CRITICAL: WEBHOOK DEPLOYMENT

**The webhook MUST be deployed via Dashboard.** Here's why:

| Deployment Method | Works? | Notes |
|------------------|--------|-------|
| Supabase Dashboard | ✅ YES | Easiest - just copy/paste code |
| Supabase CLI | ✅ YES | Requires CLI setup |
| Leave old code | ❌ NO | Will keep returning "Unhandled event type" |

**Your logs showed old code was running**, which means you haven't deployed my new webhook code yet.

---

## 📋 DEPLOYMENT VERIFICATION CHECKLIST

After deploying BOTH functions, verify:

- [ ] Webhook logs show `📥 Received event:` (not just `Received event`)
- [ ] Webhook logs show `💰 Payment intent succeeded:` for payment_intent events
- [ ] Webhook logs show `✅ [Webhook] Theme '...' purchase saved`
- [ ] Database `theme_purchases` table has new row
- [ ] Database `user_unlocked_themes` table has new row
- [ ] App shows theme as unlocked
- [ ] No errors in logs about "Invalid beneficiary quantity: 0"

---

## 🚨 IF STILL FAILING AFTER DEPLOYMENT

### **Issue: Still seeing "Unhandled event type"**

**Cause:** Old webhook code still deployed

**Fix:** Re-deploy webhook function (Step 1 above), make sure you pasted the ENTIRE file

---

### **Issue: Metadata is empty in logs**

**Cause:** Main server not deployed

**Fix:** Deploy `/supabase/functions/server/index.tsx` (Step 2 above)

---

### **Issue: "Invalid beneficiary quantity: 0"**

**Cause:** Old main server code still running

**Fix:** Deploy main server with updated metadata logic

---

### **Issue: Database writes fail with RLS error**

**Cause:** RLS policy blocking service_role (shouldn't happen, but possible)

**Fix:** Run this SQL to check:
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'theme_purchases';

-- If rowsecurity = true, check policies
SELECT * FROM pg_policies 
WHERE tablename = 'theme_purchases';
```

---

## ✅ SUCCESS LOOKS LIKE:

**Logs:**
```
📥 Received event: checkout.session.completed (ID: evt_abc123)
💰 Payment intent succeeded: {
  paymentIntentId: 'pi_abc123',
  metadata: { userId: 'fff635a5-...', purchaseType: 'theme', themeId: 'new_life' }
}
🎨 Processing theme purchase: new_life for user fff635a5-0246-4562-aa1f-de35635a8f9d
✅ [Webhook] Theme 'new_life' purchase saved (individual)
✅ Purchase processed successfully from checkout.session.completed
```

**Database:**
- `theme_purchases` has 1 new row
- `user_unlocked_themes` has 1 new row (created by trigger)

**App:**
- Theme shows as unlocked in Store
- Theme is available in Create Capsule

---

## 🎯 DO THIS NOW:

1. ✅ Deploy webhook function (Step 1)
2. ✅ Configure webhook events (Step 2)
3. 🧪 Make test purchase
4. 📊 Check logs (Test 1)
5. 🗃️ Check database (Test 2-3)
6. 📱 Check app (Test 4)

**Then report back with results!** 🚀