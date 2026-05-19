# 🎯 DEPLOY STRIPE WEBHOOK (NO CLI NEEDED!)

## ✅ DASHBOARD-ONLY DEPLOYMENT

You can deploy everything through the Supabase Dashboard. Here's how:

---

## 📋 STEP-BY-STEP GUIDE

### **STEP 1: Open Supabase Dashboard**

1. Go to: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw
2. Click **Edge Functions** in left sidebar

---

### **STEP 2: Create New Function**

1. Click **"Create a new function"** button
2. Enter function name: `stripe-webhook`
3. Click **"Create function"**

---

### **STEP 3: Upload Function Code**

You'll see a code editor. **Replace ALL the code** with this:

```typescript
// Copy the ENTIRE contents of /supabase/functions/stripe-webhook/index.ts
// (I already created this file for you)
```

**Or use the file upload method:**
1. Click the **"Upload"** icon/button
2. Select `/supabase/functions/stripe-webhook/index.ts` from your project
3. Click confirm

---

### **STEP 4: Configure as PUBLIC Function**

This is **CRITICAL** - without this, Stripe gets 401 errors!

**In the function settings:**
1. Look for **"Function Settings"** or **"Configuration"** tab
2. Find **"Authentication"** or **"Security"** section
3. Toggle **"Require JWT verification"** to **OFF** (or set to "Public")
4. Save changes

**Alternative method (if UI doesn't have toggle):**
1. In the function editor, look for **"Advanced Settings"** or **".config.json"**
2. Upload the `.config.json` file:
   ```json
   {
     "security": {
       "auth": {
         "public": true
       }
     }
   }
   ```

---

### **STEP 5: Deploy the Function**

1. Click **"Deploy"** button (usually top-right)
2. Wait for deployment to complete (takes 10-30 seconds)
3. You'll see: ✅ **"Function deployed successfully"**

**Copy the function URL:**
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

---

### **STEP 6: Set Environment Variables**

The function needs `STRIPE_WEBHOOK_SECRET`. Set it via Dashboard:

1. Go to **Project Settings** (gear icon in bottom-left)
2. Click **Edge Functions** section
3. Scroll to **"Secrets"** or **"Environment Variables"**
4. Click **"Add new secret"**
5. Enter:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_...` (get this from Stripe - see below)
6. Click **"Save"** or **"Add"**

**Note:** The following secrets should already exist (don't touch them):
- `STRIPE_SECRET_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

### **STEP 7: Get Webhook Secret from Stripe**

You need the `whsec_...` value for Step 6.

#### **Option A: Get from Existing Webhook (if you already created one)**
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click on your webhook endpoint
3. Scroll to **"Signing secret"**
4. Click **"Reveal"** or **"Show"**
5. Copy the `whsec_...` value
6. Paste into Supabase (Step 6 above)

#### **Option B: Create New Webhook in Stripe**
1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Enter endpoint URL:
   ```
   https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
   ```
4. Click **"Select events"**
5. Check: ✅ **`checkout.session.completed`**
6. Click **"Add endpoint"**
7. **Copy the signing secret** (starts with `whsec_...`)
8. Paste into Supabase (Step 6 above)

---

### **STEP 8: Verify It's Public (CRITICAL TEST)**

Open a new browser tab and visit:
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

**Expected result:**
```
Method Not Allowed
```

**✅ GOOD!** This means:
- Function is PUBLIC (no auth required)
- Function only accepts POST (rejects GET)

**❌ BAD results:**
- `Unauthorized` = Function is NOT public (go back to Step 4)
- `404 Not Found` = Function didn't deploy (go back to Step 5)
- `Function not found` = Wrong URL (check project ID)

---

### **STEP 9: Test with Your Test HTML**

1. Open `/TEST-WEBHOOK-CALLS.html` in a browser
2. Update the webhook URL to:
   ```
   https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
   ```
3. Click **"Test Theme Purchase"**
4. Check browser console for response
5. Check Supabase logs:
   - Go to **Edge Functions** → **stripe-webhook**
   - Click **"Logs"** tab
   - Look for: ✅ `[Webhook] Theme '...' purchase saved`

---

### **STEP 10: Test with Real Stripe Checkout**

1. Open your Eras app
2. Go to **Settings → Store**
3. Click **"Buy Now"** on any theme
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. Check Supabase logs (should see purchase confirmation)
7. Refresh app - theme should be unlocked!

---

## 🔍 TROUBLESHOOTING DASHBOARD DEPLOYMENT

### **Issue: "Function returns 401 Unauthorized"**

**Cause:** Function is not marked as public

**Fix:**
1. Go to Edge Functions → stripe-webhook
2. Click **"Settings"** or **"Configuration"**
3. Look for **"Authentication"** or **"JWT verification"**
4. Toggle to **OFF** or **"Public"**
5. Re-deploy function

**Alternative fix (if no toggle):**
1. Create a file `.config.json` in the function
2. Upload it alongside `index.ts`:
   ```json
   {
     "security": {
       "auth": {
         "public": true
       }
     }
   }
   ```

---

### **Issue: "Missing STRIPE_WEBHOOK_SECRET"**

**Cause:** Secret not set in Supabase

**Fix:**
1. Go to **Project Settings** → **Edge Functions**
2. Find **"Secrets"** section
3. Check if `STRIPE_WEBHOOK_SECRET` exists
4. If missing, click **"Add new secret"** and add it
5. Re-deploy function (click Deploy again)

---

### **Issue: "No signatures found matching the expected signature"**

**Cause:** Wrong webhook secret

**Fix:**
1. Get the CORRECT secret from Stripe:
   - Go to: https://dashboard.stripe.com/test/webhooks
   - Click your webhook endpoint
   - Click **"Reveal"** next to signing secret
   - Copy the `whsec_...` value
2. Update in Supabase:
   - Project Settings → Edge Functions → Secrets
   - Edit `STRIPE_WEBHOOK_SECRET`
   - Paste new value
   - Save
3. Re-deploy function

---

### **Issue: "Function not found"**

**Cause:** Function didn't deploy or wrong URL

**Fix:**
1. Check deployment status:
   - Edge Functions → stripe-webhook
   - Look for green checkmark or "Active" status
2. Verify URL:
   - Should be: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook`
   - NOT: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook`

---

## 📊 MONITORING (DASHBOARD)

### **View Logs**
1. Go to **Edge Functions** → **stripe-webhook**
2. Click **"Logs"** tab
3. Set to **"Real-time"** mode
4. Trigger a test purchase
5. Watch logs appear live

### **Check for Errors**
1. In Logs tab, use filter: **"Error"** or search for `❌`
2. Look for red/orange log lines
3. Click to expand and see full error details

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify these:

- [ ] Function deployed: Shows "Active" in Edge Functions list
- [ ] Function is public: Browser shows "Method Not Allowed" (not "Unauthorized")
- [ ] Webhook secret set: Visible in Project Settings → Secrets
- [ ] Stripe webhook configured: Shows in https://dashboard.stripe.com/test/webhooks
- [ ] Test purchase works: Logs show "✅ Theme purchase saved"
- [ ] Database updated: Check `theme_purchases` table in Table Editor
- [ ] Theme unlocks: Check `user_unlocked_themes` table

---

## 🎯 QUICK REFERENCE

**Supabase Dashboard URLs:**
- Project: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw
- Edge Functions: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw/functions
- Settings (Secrets): https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw/settings/functions

**Stripe Dashboard URLs:**
- Webhooks: https://dashboard.stripe.com/test/webhooks
- Logs: https://dashboard.stripe.com/test/logs

**Function URL:**
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

---

## 🚀 DONE!

Once you complete all 10 steps, your webhook will be:
- ✅ Deployed and active
- ✅ Public (no JWT required)
- ✅ Configured in Stripe
- ✅ Ready to process payments

**Next:** Test a purchase and watch it work! 🎉
