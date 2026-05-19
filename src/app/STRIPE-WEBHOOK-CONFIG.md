# 🎯 STRIPE WEBHOOK CONFIGURATION FIX

## 🚨 PROBLEM IDENTIFIED

Your webhook is returning **200 OK** but not writing to the database because:

1. **Event type mismatch** - Stripe is sending events your code doesn't handle
2. **Missing metadata** - Metadata might not be transferring from Checkout to Payment Intent

---

## ✅ SOLUTION: Configure Stripe Webhook Events

### **STEP 1: Update Stripe Webhook Events**

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click your webhook endpoint: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook`
3. Click **"Add events"** or **"Hosted endpoints"** → **"Update details"**
4. In **"Events to send"**, make sure these are BOTH checked:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. Click **"Update endpoint"** or **"Save"**

---

### **STEP 2: Configure Metadata Transfer in Checkout**

When you create a Checkout Session in your app, you need to ensure metadata transfers to the Payment Intent.

**Find your checkout code** (probably in `/supabase/functions/server/index.tsx` or similar) and update it:

#### **BEFORE (broken - metadata doesn't transfer):**
```typescript
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: priceId, quantity: 1 }],
  mode: 'payment',
  success_url: `${origin}/store?success=true`,
  cancel_url: `${origin}/store?canceled=true`,
  metadata: {
    userId: user.id,
    purchaseType: 'theme',
    themeId: 'new_life',
  },
});
```

#### **AFTER (fixed - metadata transfers):**
```typescript
const session = await stripe.checkout.sessions.create({
  line_items: [{ price: priceId, quantity: 1 }],
  mode: 'payment',
  success_url: `${origin}/store?success=true`,
  cancel_url: `${origin}/store?canceled=true`,
  metadata: {
    userId: user.id,
    purchaseType: 'theme',
    themeId: 'new_life',
  },
  payment_intent_data: {
    metadata: {
      userId: user.id,           // ← MUST DUPLICATE HERE
      purchaseType: 'theme',     // ← MUST DUPLICATE HERE
      themeId: 'new_life',       // ← MUST DUPLICATE HERE
    },
  },
});
```

**Key fix:** Add `payment_intent_data.metadata` to duplicate the session metadata.

---

### **STEP 3: Check Current Event Type in Logs**

Go to your Edge Function logs and find the most recent webhook call:

1. Supabase Dashboard → Edge Functions → stripe-webhook → Logs
2. Look for: `📥 Received event: ??? (ID: evt_...)`
3. Note the event type

**What you might see:**

| Event Type | Meaning | Fix |
|------------|---------|-----|
| `checkout.session.completed` | ✅ Good | Already handled |
| `payment_intent.succeeded` | ✅ Good | NOW handled (after deploying updated code) |
| `charge.succeeded` | ❌ Not handled | Add to Stripe webhook events |
| Anything else | ⚠️ Check | Might not need handling |

---

### **STEP 4: Test with Stripe CLI (Optional)**

If you have Stripe CLI installed, you can test locally:

```bash
# Forward webhook events to your Edge Function
stripe listen --forward-to https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook

# In another terminal, trigger a test event
stripe trigger checkout.session.completed

# Check the output for the event type and metadata
```

---

## 🔍 METADATA DEBUGGING

If metadata is still missing after Step 2, check your Stripe Dashboard:

### **A. Check Payment Intent Metadata**

1. Go to: https://dashboard.stripe.com/test/payments
2. Find your most recent payment
3. Click on it
4. Scroll to **"Metadata"** section
5. **Should see:**
   - `userId: fff635a5-0246-4562-aa1f-de35635a8f9d`
   - `purchaseType: theme`
   - `themeId: new_life`

**If metadata is MISSING:**
- You need to add `payment_intent_data.metadata` (see Step 2)

---

### **B. Check Checkout Session Metadata**

1. Go to: https://dashboard.stripe.com/test/checkout/sessions
2. Find your most recent checkout session
3. Click on it
4. Check **"Metadata"** section
5. Should see the same metadata as above

---

## 🎯 QUICK FIX CHECKLIST

After making changes, verify these:

- [ ] Webhook listens for `checkout.session.completed` AND `payment_intent.succeeded`
- [ ] Checkout code includes `payment_intent_data.metadata`
- [ ] Edge Function code handles both event types (just deployed!)
- [ ] Edge Function redeployed (if you made changes)
- [ ] Webhook secret is correct in Supabase

---

## 🧪 TEST AGAIN

After completing Steps 1-2:

1. **Redeploy Edge Function** (if not already deployed)
2. **Make a test purchase** in your app
3. **Check Edge Function logs** for:
   ```
   📥 Received event: payment_intent.succeeded (ID: evt_...)
   💰 Payment intent succeeded: { paymentIntentId: 'pi_...', metadata: {...} }
   🎨 Processing theme purchase: new_life for user fff635a5-0246-4562-aa1f-de35635a8f9d
   ✅ [Webhook] Theme 'new_life' purchase saved (individual)
   ✅ Purchase processed successfully
   ```
4. **Run verification SQL** from `/VERIFY-WEBHOOK-DATABASE.sql`
5. **Check your app** - theme should be unlocked!

---

## 🚨 STILL NOT WORKING?

If after all these steps the webhook still returns 200 but doesn't write to DB:

### **Check RLS Policies**

Even with `service_role_key`, RLS can sometimes block. Run this SQL:

```sql
-- Temporarily disable RLS to test (DON'T leave this in production!)
ALTER TABLE public.theme_purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiary_purchases DISABLE ROW LEVEL SECURITY;

-- Try a purchase now

-- Re-enable RLS after testing
ALTER TABLE public.theme_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiary_purchases ENABLE ROW LEVEL SECURITY;
```

If disabling RLS fixes it, the problem is your RLS policies. You need to add policies that allow `service_role` to insert.

---

### **Check Database Constraints**

Run this to see table constraints:

```sql
SELECT
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(c.oid) AS constraint_definition
FROM pg_constraint c
JOIN pg_namespace n ON n.oid = c.connamespace
JOIN pg_class cl ON cl.oid = c.conrelid
WHERE cl.relname = 'theme_purchases'
  AND n.nspname = 'public';
```

Look for constraints that might be failing (e.g., foreign key to non-existent user).

---

### **Add More Logging**

If still failing, add this to the `saveThemePurchase` function:

```typescript
async function saveThemePurchase(...) {
  console.log('🔍 Attempting DB insert:', {
    user_id: userId,
    theme_id: themeId,
    purchase_type: purchaseType,
    stripe_payment_id: stripePaymentId,
    price_paid: pricePaid,
  });

  const { data, error } = await supabase
    .from('theme_purchases')
    .upsert({...}, {...});

  console.log('🔍 DB response:', { data, error });

  if (error) {
    console.error(`❌ Failed to save theme purchase for ${themeId}:`, error);
    console.error(`❌ Full error details:`, JSON.stringify(error, null, 2));
    throw error;
  }

  console.log(`✅ [Webhook] Theme '${themeId}' purchase saved (${purchaseType})`);
}
```

This will show you EXACTLY what the database error is.

---

## 📋 SUMMARY

**Most likely cause:** Event type mismatch (`payment_intent.succeeded` not handled)

**Fix:**
1. Update Edge Function code (already done!)
2. Redeploy Edge Function
3. Add `payment_intent.succeeded` to Stripe webhook events
4. Add `payment_intent_data.metadata` to checkout code

**Verification:**
- Run SQL from `/VERIFY-WEBHOOK-DATABASE.sql`
- Check Edge Function logs for success messages
- Test purchase should appear in database

---

## 🎯 NEXT: Find Your Checkout Code

Would you like me to help you find and update your checkout session creation code to include the `payment_intent_data.metadata` fix?

Let me know the file where you create Stripe checkout sessions and I'll update it for you!
