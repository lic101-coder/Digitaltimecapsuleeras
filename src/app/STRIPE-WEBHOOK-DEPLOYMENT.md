# 🚀 STRIPE WEBHOOK DEPLOYMENT GUIDE

## ✅ WHAT WE FIXED

**BEFORE (broken):**
- ❌ Webhook was part of main server at `/make-server-f9be53a7/stripe-webhook`
- ❌ Required Supabase JWT authentication
- ❌ Stripe couldn't call it (401 Unauthorized)

**AFTER (working):**
- ✅ Dedicated PUBLIC Edge Function at `/functions/v1/stripe-webhook`
- ✅ No authentication required (Stripe signature verification only)
- ✅ Clean, simple, production-ready

---

## 🎯 KEY FEATURES

1. **Public endpoint** - Stripe can call it without Supabase JWT
2. **Signature verification** - Uses `stripe.webhooks.constructEventAsync`
3. **Raw body parsing** - Uses `req.text()` (required for signature verification)
4. **Proper error handling** - Returns 400 for invalid signatures
5. **Database triggers** - Saves to purchase tables, triggers handle unlocking

---

## 📦 DEPLOYMENT STEPS

### **STEP 1: Install Supabase CLI (if not installed)**

```bash
# macOS
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

---

### **STEP 2: Login to Supabase**

```bash
supabase login
```

This opens your browser to authenticate.

---

### **STEP 3: Link to Your Project**

```bash
supabase link --project-ref apdfvpgaznpqlordkipw
```

When prompted, paste your database password (from Supabase dashboard → Settings → Database).

---

### **STEP 4: Deploy the Webhook Function**

```bash
supabase functions deploy stripe-webhook
```

**Expected output:**
```
Deploying stripe-webhook...
✓ Function deployed successfully
URL: https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

---

### **STEP 5: Set Environment Variables**

You need to set the webhook secret in Supabase:

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to get your webhook secret:**

#### **Option A: From Stripe Dashboard (Production)**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click your webhook endpoint
3. Click "Reveal" next to "Signing secret"
4. Copy the `whsec_...` value

#### **Option B: From Stripe CLI (Testing)**
```bash
stripe listen --forward-to https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

Output will show:
```
> Ready! Your webhook signing secret is whsec_abc123...
```

Copy that value and run:
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

---

### **STEP 6: Update Stripe Webhook URL**

**In Stripe Dashboard:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint" (or edit existing)
3. Set URL to:
   ```
   https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
   ```
4. Select events to listen for:
   - ✅ `checkout.session.completed`
5. Click "Add endpoint"

**Copy the signing secret** and set it in Supabase (see Step 5).

---

## 🧪 TESTING

### **Test 1: Check Function is Public**

```bash
curl https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook \
  -X GET
```

**Expected:** `Method Not Allowed` (405) ← Good! Function is public but only accepts POST.

**NOT Expected:** `Unauthorized` (401) ← Bad! Function is not public.

---

### **Test 2: Test with Stripe CLI**

```bash
stripe listen --forward-to https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

Then trigger a test event:
```bash
stripe trigger checkout.session.completed
```

**Check logs:**
```bash
supabase functions logs stripe-webhook
```

You should see:
```
✅ [Webhook] Theme '...' purchase saved (individual)
```

---

### **Test 3: Test with Real Checkout**

1. Open your app
2. Go to Store → Buy a theme
3. Complete checkout with test card: `4242 4242 4242 4242`
4. Check Supabase logs:
   ```bash
   supabase functions logs stripe-webhook --tail
   ```

---

## 🔍 TROUBLESHOOTING

### **Error: "Missing Stripe-Signature header"**

**Cause:** Stripe is not calling the webhook (or you're calling it directly)

**Fix:** Make sure:
1. Webhook URL in Stripe dashboard is correct
2. You're testing with `stripe trigger` (not curl)

---

### **Error: "Webhook Error: No signatures found"**

**Cause:** `STRIPE_WEBHOOK_SECRET` is wrong or not set

**Fix:**
```bash
# Check current secrets
supabase secrets list

# Update webhook secret
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### **Error: "Missing userId in metadata"**

**Cause:** Checkout session doesn't have `userId` in metadata

**Fix:** Check your checkout creation code:
```typescript
const session = await stripe.checkout.sessions.create({
  metadata: {
    userId: user.id,        // ← Must include this
    purchaseType: 'theme',
    themeId: 'new_life',
  },
  // ...
});
```

---

### **Error: Function returns 401 Unauthorized**

**Cause:** `.config.json` is missing or not deployed

**Fix:**
1. Verify `/supabase/functions/stripe-webhook/.config.json` exists
2. Redeploy:
   ```bash
   supabase functions deploy stripe-webhook
   ```

---

## 📊 MONITORING

### **View Real-Time Logs**

```bash
supabase functions logs stripe-webhook --tail
```

Press `Ctrl+C` to stop.

---

### **View Recent Logs**

```bash
supabase functions logs stripe-webhook
```

---

### **Filter Logs by Error**

```bash
supabase functions logs stripe-webhook | grep "❌"
```

---

## 🎯 VERIFICATION CHECKLIST

After deployment, verify:

- [ ] Function deployed: `supabase functions list` shows `stripe-webhook`
- [ ] Function is public: `curl` returns 405 (not 401)
- [ ] Webhook secret set: `supabase secrets list` shows `STRIPE_WEBHOOK_SECRET`
- [ ] Stripe webhook configured: Dashboard shows correct URL
- [ ] Test purchase works: Logs show "✅ Theme purchase saved"
- [ ] Database updated: `theme_purchases` table has new rows
- [ ] Themes unlocked: `user_unlocked_themes` table has new rows

---

## 🔄 UPDATES & REDEPLOY

If you edit `/supabase/functions/stripe-webhook/index.ts`:

```bash
supabase functions deploy stripe-webhook
```

Changes take effect immediately (no restart needed).

---

## 🚨 PRODUCTION CHECKLIST

Before going live:

1. **Use production webhook secret:**
   ```bash
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_PROD...
   ```

2. **Update Stripe webhook URL:**
   - Remove test mode webhook
   - Add production webhook with live secret

3. **Test with real card:**
   - Use a real (non-test) card
   - Verify purchase appears in database
   - Verify theme unlocks in app

4. **Monitor logs for 24 hours:**
   ```bash
   supabase functions logs stripe-webhook --tail
   ```

5. **Set up alerts:**
   - Stripe dashboard → Webhooks → Enable email alerts
   - Supabase dashboard → Logs → Set up error alerts

---

## ✅ DONE!

Your Stripe webhook is now:
- ✅ Public (no JWT required)
- ✅ Secure (signature verification)
- ✅ Fast (dedicated Edge Function)
- ✅ Reliable (proper error handling)

**Next:** Update your HTML test file to point to the new webhook URL!
