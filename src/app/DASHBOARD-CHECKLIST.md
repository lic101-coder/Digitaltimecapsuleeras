# ✅ SUPABASE DASHBOARD DEPLOYMENT CHECKLIST

**⏱️ Estimated time:** 5-10 minutes  
**🎯 Goal:** Deploy public Stripe webhook without CLI

---

## 📋 PRE-FLIGHT CHECK

Before you start, make sure you have:

- [ ] Supabase account logged in
- [ ] Stripe account logged in
- [ ] `/supabase/functions/stripe-webhook/index.ts` file ready to copy

---

## 🚀 DEPLOYMENT STEPS

### **□ STEP 1: Open Edge Functions**

1. Go to: https://supabase.com/dashboard/project/apdfvpgaznpqlordkipw/functions
2. You should see a list of functions (or empty if none exist)

---

### **□ STEP 2: Create Function**

**Click the "New Edge Function" or "Create function" button**

- **Name:** `stripe-webhook`
- Click "Create"

---

### **□ STEP 3: Upload Code**

**In the code editor that appears:**

1. **Delete all the template code**
2. **Copy the entire contents** of `/supabase/functions/stripe-webhook/index.ts`
3. **Paste it** into the editor
4. Click **"Save"** (or it might auto-save)

**Tip:** Use `Ctrl+A` then `Ctrl+V` to replace all code quickly.

---

### **□ STEP 4: Make Function PUBLIC** ⚠️ **CRITICAL!**

This is the most important step. Without it, Stripe gets 401 errors.

**Find the security/auth setting:**

The UI might look like:
- **"Require JWT verification"** toggle → Turn **OFF**
- **"Authentication required"** toggle → Turn **OFF**
- **"Public endpoint"** toggle → Turn **ON**
- **"Security"** section → Set to **"Public"**

**If you can't find a toggle:**
1. Look for **"Upload .config.json"** or **"Function settings"**
2. Upload this file:
   ```json
   {
     "security": {
       "auth": {
         "public": true
       }
     }
   }
   ```

**VERIFY:** The UI should show some indication like:
- 🌐 "Public"
- 🔓 "No authentication required"
- ✅ "Anyone can call this function"

---

### **□ STEP 5: Deploy Function**

1. Click **"Deploy"** button (usually top-right or bottom)
2. Wait 10-30 seconds
3. Look for: ✅ **"Function deployed successfully"**

**Copy your function URL:**
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

---

### **□ STEP 6: Set Webhook Secret**

Now you need to tell the function your Stripe webhook secret.

**In Supabase:**
1. Click **"Settings"** (gear icon, bottom-left sidebar)
2. Click **"Edge Functions"** in the settings menu
3. Scroll to **"Secrets"** section
4. Click **"Add new secret"**
5. Enter:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** (leave blank for now - we'll get this from Stripe)
6. Click **"Create"** or **"Save"**

**Note:** The secret value should start with `whsec_...` (we'll get it in Step 7)

---

### **□ STEP 7: Configure Stripe Webhook**

**In Stripe Dashboard:**

1. Go to: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"** button

**Fill in the form:**
- **Endpoint URL:**
  ```
  https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
  ```
- **Description:** (optional) `Eras app purchase webhook`
- **Events to send:** Click "Select events"
  - Search for: `checkout.session.completed`
  - ✅ Check it
  - Click "Add events"

3. Click **"Add endpoint"**

**Copy the signing secret:**
- You'll see a **"Signing secret"** section
- Click **"Reveal"** or **"Show signing secret"**
- Copy the value (starts with `whsec_...`)
- **Go back to Supabase** (Step 6) and paste it

---

### **□ STEP 8: Update Secret in Supabase**

**Back in Supabase:**
1. Settings → Edge Functions → Secrets
2. Find `STRIPE_WEBHOOK_SECRET`
3. Click **"Edit"** or the pencil icon
4. Paste the `whsec_...` value from Stripe
5. Click **"Save"**

**Redeploy the function:**
- Go back to Edge Functions → stripe-webhook
- Click **"Deploy"** again (to pick up the new secret)

---

### **□ STEP 9: VERIFY IT'S PUBLIC** 🧪

**Critical test! Open a new browser tab:**

Visit:
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/stripe-webhook
```

**Expected result:**
```
Method Not Allowed
```

✅ **GOOD!** Function is public, just doesn't accept GET requests.

**Bad results:**
- `Unauthorized` or `401` → Function is NOT public (go back to Step 4)
- `404 Not Found` → Function didn't deploy (go back to Step 5)
- Loading forever → Network issue, try again

---

### **□ STEP 10: Test with HTML File**

**Open `/TEST-WEBHOOK-CALLS.html` in your browser**

1. Click **"Purchase Theme: Genesis"**
2. Check the result:
   - ✅ Green success message → Working!
   - ❌ Red error → Check Supabase logs (Step 11)

---

### **□ STEP 11: Check Logs (if needed)**

**If you got errors in Step 10:**

1. Go to: Edge Functions → stripe-webhook
2. Click **"Logs"** tab
3. Set filter to **"Errors only"** or search for `❌`
4. Look for error messages
5. Common issues:
   - "Missing STRIPE_WEBHOOK_SECRET" → Go back to Step 6
   - "No signatures found" → Wrong secret, go back to Step 8
   - "Missing userId" → HTML file issue (should be fixed already)

---

### **□ STEP 12: Test Real Purchase**

**In your Eras app:**

1. Login
2. Go to Settings (gear icon) → Store
3. Click "Buy Now" on any theme
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. **Check Supabase logs:**
   - Edge Functions → stripe-webhook → Logs
   - Look for: ✅ `[Webhook] Theme '...' purchase saved`
7. **Check database:**
   - Table Editor → `theme_purchases` → Should have new row
   - Table Editor → `user_unlocked_themes` → Should have new row
8. **Refresh app** → Theme should be unlocked!

---

## ✅ DONE!

If all steps are checked, your webhook is:

- ✅ Deployed
- ✅ Public (no JWT required)
- ✅ Configured in Stripe
- ✅ Processing purchases

---

## 🔧 TROUBLESHOOTING QUICK FIXES

### **Issue: 401 Unauthorized**
**Fix:** Step 4 didn't work. Try:
1. Delete the function
2. Create a new one
3. Before deploying, look for "Public" or "Authentication" toggle
4. Make sure it's set to public BEFORE first deploy

---

### **Issue: Webhook secret verification fails**
**Fix:**
1. Go to Stripe webhooks
2. Delete the webhook
3. Create a new one
4. Get the NEW signing secret
5. Update in Supabase
6. Redeploy function

---

### **Issue: Can't find "Public" toggle**
**Fix:** Use the `.config.json` method:
1. In function editor, look for "Upload file" or "Add file"
2. Create `.config.json` with:
   ```json
   {
     "security": {
       "auth": {
         "public": true
       }
     }
   }
   ```
3. Redeploy

---

### **Issue: Function deploys but doesn't work**
**Fix:**
1. Check secrets are set (Step 6)
2. Redeploy after setting secrets
3. Check Stripe webhook URL is correct (Step 7)
4. Test with HTML file (Step 10)
5. Check logs for specific error (Step 11)

---

## 📞 NEED HELP?

**Check these in order:**

1. **Logs:** Edge Functions → stripe-webhook → Logs tab
2. **Secrets:** Settings → Edge Functions → Secrets (should have 4 total)
3. **Stripe:** Dashboard → Webhooks → Click endpoint → View events
4. **Database:** Table Editor → `theme_purchases` (check for rows)

**Common log messages:**

| Log | Meaning | Fix |
|-----|---------|-----|
| ✅ "Theme purchase saved" | Working! | Nothing needed |
| ❌ "Missing STRIPE_WEBHOOK_SECRET" | Secret not set | Step 6 |
| ❌ "No signatures found" | Wrong secret | Step 8 |
| ❌ "Missing userId" | Checkout config issue | Check app code |
| ⚠️ "Unhandled event type" | Not an error | Ignore |

---

## 🎯 FINAL VERIFICATION

Run this checklist one more time:

- [ ] Function shows "Active" status
- [ ] Browser returns "Method Not Allowed" (not 401)
- [ ] `STRIPE_WEBHOOK_SECRET` exists in Secrets
- [ ] Stripe webhook shows correct URL
- [ ] Test HTML returns success
- [ ] Database has test purchase
- [ ] App unlocks theme after test purchase

**All checked?** 🎉 **YOU'RE DONE!**
