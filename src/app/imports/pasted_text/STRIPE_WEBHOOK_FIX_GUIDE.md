# 🔧 Stripe Webhook "Bad Signature" Troubleshooting Guide

## Your Configuration
- **Project ID**: `apdfvpgaznpqlordkipw`
- **Webhook URL**: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook`
- **Mode**: LIVE (production)

---

## 🎯 Step-by-Step Fix Instructions

### Step 1: Verify Your Stripe Dashboard Setup

1. **Go to Stripe Dashboard**
   - Navigate to: https://dashboard.stripe.com/webhooks
   - **IMPORTANT**: Make sure you're in **LIVE MODE** (toggle in top-right should show "Viewing live data")

2. **Find Your Webhook Endpoint**
   - Look for an endpoint with this EXACT URL:
     ```
     https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
     ```
   - If you see multiple endpoints, you need the one that matches EXACTLY

3. **Get the Signing Secret**
   - Click on the webhook endpoint
   - Click "Signing secret" → "Reveal"
   - Copy the **ENTIRE** secret (it should start with `whsec_`)
   - Example format: `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### Step 2: Update Supabase Secrets

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw
   - Go to: Edge Functions → Configuration → Secrets

2. **Update STRIPE_WEBHOOK_SECRET**
   - Find `STRIPE_WEBHOOK_SECRET` in the list
   - Click "Edit" or "Update"
   - Paste the EXACT secret you copied from Stripe (starts with `whsec_`)
   - **DO NOT add quotes, spaces, or any other characters**
   - Save

3. **Verify Other Secrets** (optional but recommended)
   - `STRIPE_SECRET_KEY` should start with `sk_live_` (for live mode)
   - `SUPABASE_URL` should be `https://apdfvpgaznpqlordkipw.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` should start with `eyJ...`

---

### Step 3: Deploy the Diagnostic Function

1. **Deploy the debug function** (I just created it for you)
   - File location: `/supabase/functions/stripe-webhook-debug/index.ts`
   - This will be deployed to: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook-debug`

2. **Test the diagnostic endpoint**
   - After deployment, visit in browser:
     ```
     https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook-debug
     ```
   - You should see JSON with `status: "active"` and the secret prefix

---

### Step 4: Test with Stripe

1. **Go back to Stripe Dashboard**
   - Navigate to your webhook endpoint
   - Scroll down to "Recent webhook deliveries"

2. **Send a Test Webhook**
   - Click "Send test webhook" button
   - Select event type: `checkout.session.completed`
   - Click "Send test webhook"

3. **Check the Response**
   - You should see HTTP 200 (success)
   - If you still see 400 "Bad signature", proceed to Step 5

---

### Step 5: Use the Diagnostic Endpoint

1. **Temporarily update your Stripe webhook URL**
   - In Stripe Dashboard → Webhooks → Click your endpoint
   - Click "..." menu → "Update details"
   - Change URL to:
     ```
     https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook-debug
     ```
   - Save

2. **Send a test webhook again**
   - Use "Send test webhook" from that endpoint
   - Check the logs in Supabase Dashboard → Edge Functions → Logs

3. **Review Diagnostic Output**
   The diagnostic function will show:
   - ✅ Whether signature is present
   - ✅ Whether secret format is valid (starts with `whsec_`)
   - ✅ Secret prefix (first 7 characters)
   - ✅ Body hash and length
   - ✅ Signature age
   - ✅ **Success or failure** with detailed error message

4. **After diagnosis, restore original URL**
   - Change webhook URL back to:
     ```
     https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
     ```

---

## 🔍 Common Issues and Solutions

### Issue 1: Wrong Secret
**Symptom**: "Bad signature" error
**Cause**: `STRIPE_WEBHOOK_SECRET` doesn't match the endpoint
**Solution**: 
- Each webhook endpoint has its own unique secret
- You must copy the secret from the EXACT endpoint in Stripe Dashboard
- If you have multiple endpoints, make sure you're copying from the right one

### Issue 2: Test Mode vs Live Mode
**Symptom**: "Bad signature" error
**Cause**: Using test mode secret for live mode endpoint (or vice versa)
**Solution**: 
- Check the toggle in Stripe Dashboard (top-right)
- Make sure you're in LIVE MODE
- Copy the secret from the LIVE mode endpoint

### Issue 3: Extra Characters in Secret
**Symptom**: "Bad signature" error
**Cause**: Accidentally added quotes, spaces, or newlines when pasting
**Solution**: 
- The secret should be: `whsec_xxxxxx...` (nothing else)
- No quotes, no spaces, no newlines
- Copy directly, don't type it manually

### Issue 4: Old Webhook Events
**Symptom**: Signature age > 5 minutes
**Cause**: Replaying old webhook events
**Solution**: 
- Stripe only accepts signatures less than 5 minutes old
- Click "Send test webhook" to create a fresh event
- Don't use "Retry" on old failed events (create new test instead)

### Issue 5: Multiple Endpoints
**Symptom**: Intermittent failures
**Cause**: Multiple webhook endpoints with different secrets
**Solution**: 
- Delete old/unused webhook endpoints in Stripe Dashboard
- Keep only one endpoint for your production app
- Make sure the URL matches exactly

---

## 📊 What the Logs Should Show

### ✅ SUCCESSFUL webhook:
```
🔐 Verifying Stripe signature...
📦 Body length: 2453
🔑 Signature: t=1234567890,v1=ab...
✅ Verification successful!
📥 Received event: checkout.session.completed (ID: evt_xxx)
💳 Checkout session completed
✅ Purchase processed successfully
```

### ❌ FAILED webhook:
```
🔐 Verifying Stripe signature...
📦 Body length: 2453
🔑 Signature: t=1234567890,v1=ab...
❌ Webhook signature verification failed: No signatures found matching the expected signature for payload
```

This error means the secret is wrong!

---

## 🚀 After Fix is Confirmed

Once the diagnostic endpoint shows SUCCESS:

1. **Update Stripe webhook URL** back to production:
   ```
   https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
   ```

2. **Test the main webhook**:
   - Send a test `checkout.session.completed` event
   - Should see HTTP 200 response
   - Check Supabase logs for "✅ Purchase processed successfully"

3. **Test a real purchase**:
   - Make a test purchase in your app
   - Check that theme/bundle is unlocked in database
   - Verify in `theme_purchases` or `bundle_purchases` table

---

## 📞 Still Having Issues?

If you've followed all steps and still see "Bad signature":

1. **Create a COMPLETELY NEW webhook endpoint**:
   - In Stripe Dashboard, create a brand new endpoint
   - Don't edit the old one, make a fresh one
   - Get the new secret and update Supabase

2. **Check for proxy/CDN**:
   - Ensure Stripe can reach Supabase directly
   - No proxies or CDNs in between

3. **Verify Supabase Edge Functions are public**:
   - The webhook function should NOT require authentication
   - Check that it's publicly accessible

---

## ✅ Checklist

Before proceeding, verify:

- [ ] I'm in LIVE MODE in Stripe Dashboard
- [ ] My webhook URL is exactly: `https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook`
- [ ] I've copied the signing secret from THIS specific endpoint
- [ ] The secret starts with `whsec_`
- [ ] I've updated `STRIPE_WEBHOOK_SECRET` in Supabase Edge Functions secrets
- [ ] I've redeployed the Edge Function (or it auto-deployed)
- [ ] I'm testing with a FRESH webhook event (not retrying old ones)
- [ ] The diagnostic function is deployed and accessible

---

**Next Step**: Deploy the diagnostic function and run through the test steps above. The diagnostic output will tell us EXACTLY what's wrong!
