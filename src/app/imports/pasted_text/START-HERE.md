# 🚨 START HERE - "I ran all SQL but it's still not working"

---

## 🎯 First: Find Out What's Actually Wrong

**Don't guess. Run the diagnostic first.**

### Step 1: Open Supabase SQL Editor
**Supabase Dashboard** → SQL Editor (left sidebar)

### Step 2: Run Diagnostic Script
Copy/paste this entire file and click **RUN**:
```
/imports/pasted_text/DIAGNOSE-ISSUE.sql
```

### Step 3: Read The Output
Scroll to the bottom, look for:

#### ✅ If you see this:
```
🎉 DATABASE IS CONFIGURED CORRECTLY!

Next steps:
1. Deploy function: supabase functions deploy make-server-f9be53a7
2. Check function logs for errors
3. Retry failed Stripe webhook
```

**→ Your database is fine! Skip to "Deploy Function" below**

---

#### ❌ If you see this:
```
⚠️ ISSUES FOUND - Follow fix recommendations above
```

**→ Read the fix recommendations in the output**

The diagnostic will tell you **exactly** what's missing:
- "❌ FIX: Run bundle-setup.sql"
- "❌ FIX: bundle-setup.sql did not insert all bundles"
- "❌ FIX: Run bundle-theme-unlock-trigger.sql"
- "❌ FIX: Stripe product IDs do not match"

**Follow those specific fixes, then re-run diagnostic.**

---

## 🔧 Deploy Function (Only After Diagnostic Passes)

### Step 1: Deploy
```bash
supabase functions deploy make-server-f9be53a7
```

### Step 2: Verify Deployment
**Expected output**:
```
✓ Deployed successfully
```

**If error**, check:
- Logged in? → `supabase login`
- Project linked? → `supabase link --project-ref YOUR_PROJECT_ID`
- Check error message for syntax issues

### Step 3: Check Logs
**Supabase Dashboard** → Edge Functions → `make-server-f9be53a7` → **Logs**

Should see recent startup logs:
```
✅ [Startup] Supabase client created
✅ [Monetization] Price configuration loaded
```

**If no logs** → Function didn't deploy. Check errors from Step 1.

---

## 🔄 Retry Webhook

### Step 1: Open Stripe Dashboard
**Stripe Dashboard** → Developers → Webhooks

### Step 2: Find Failed Event
Look for event ID: `evt_1TDbpNHUyotQ1kng3jdcrhJj`

### Step 3: Resend
Click the event → Click **"Resend"** button

### Step 4: Check Result

#### ✅ Success (200 OK)
```
Response: 200 OK
{"received":true}
```

**→ YOU'RE DONE! 🎉**

Verify in database:
```sql
-- Should show 1 bundle purchase
SELECT * FROM bundle_purchases ORDER BY created_at DESC LIMIT 1;

-- Should show 11 unlocked themes
SELECT COUNT(*) FROM theme_purchases WHERE purchase_type = 'bundle';

-- Should show purchased_count = 1
SELECT id, purchased_count FROM bundles WHERE id = 'complete-library';
```

---

#### ❌ Failure (400/500 error)
Click **"Response"** tab to see error message.

**Common errors**:

**"Bundle NOT FOUND in database"**
```json
{"received":false,"error":"Unknown bundle - product: prod_UBF7Qhq..."}
```
**→ Problem**: Bundles table is empty or has wrong Stripe IDs
**→ Fix**: Re-run diagnostic script, check "Bundles in Database" section

---

**"insufficient_privilege" or RLS error**
```
ERROR: new row violates row-level security policy
```
**→ Problem**: Webhook using wrong key or trigger missing SECURITY DEFINER
**→ Fix**: Check `/supabase/functions/server/supabase-client.tsx` uses `SUPABASE_SERVICE_ROLE_KEY`

---

**No response / timeout**
```
Error: Request timeout
```
**→ Problem**: Function crashed or not deployed
**→ Fix**: Check function logs in Supabase Dashboard for crash details

---

**"Webhook secret not configured"**
```json
{"received":false,"error":"Webhook secret not configured"}
```
**→ Problem**: Missing environment variable
**→ Fix**:
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
```

---

## 📚 Reference Docs (If You Need More Help)

| File | When to Use |
|------|-------------|
| **QUICK-FIX-CHECKLIST.md** | Quick troubleshooting steps |
| **TROUBLESHOOTING.md** | Detailed fixes for every error |
| **DIAGNOSE-ISSUE.sql** | Run this first to identify problem |
| **COMPLETE-DEPLOYMENT-GUIDE.md** | Full setup from scratch |
| **RLS-SAFETY-GUIDE.md** | Understanding RLS + webhooks |

---

## 🎯 Most Common Problems (90% of cases)

### Problem 1: "Bundles table is empty"
**Symptoms**: Diagnostic shows "Bundle count: 0"

**Fix**:
```sql
-- In Supabase SQL Editor, run:
INSERT INTO public.bundles (id, name, stripe_product_id, stripe_price_id, price, themes) VALUES
  ('complete-library', 'Complete Theme Library', 'prod_UBF7QhqUggiUm0', 'price_1TCsdYHUyotQ1kngEB9gOyr2', 9.99, ARRAY['wedding', 'career', 'future', 'new_life', 'travel', 'new_year', 'friendship', 'pet', 'gratitude', 'graduation', 'new_home']),
  ('life-milestones', 'Life Milestones', 'prod_UBF8ZAfAoNwgZI', 'price_1TCseDHUyotQ1kng86obk1HT', 5.99, ARRAY['wedding', 'career', 'new_life', 'graduation', 'new_home']),
  ('celebration', 'Celebration Pack', 'prod_UBF8RA7iFHig8v', 'price_1TCsehHUyotQ1kngXZf0Qay2', 2.49, ARRAY['friendship', 'travel', 'new_year', 'pet']),
  ('inner-journey', 'Inner Journey', 'prod_UBFA1BVhrMDQrh', 'price_1TCsfpHUyotQ1kngmT3KKiE0', 1.99, ARRAY['future', 'gratitude']);

-- Verify
SELECT id, name FROM bundles;
-- Should show 4 rows
```

---

### Problem 2: "Function not deployed"
**Symptoms**: No logs in Supabase, or old behavior

**Fix**:
```bash
# Terminal:
supabase functions deploy make-server-f9be53a7

# Wait for "Deployed successfully"
# Wait 30 seconds for cache to clear
# Retry webhook
```

---

### Problem 3: "Trigger not working"
**Symptoms**: Bundle purchase saves, but themes not unlocked

**Fix**:
```sql
-- Check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase';

-- If empty, re-run bundle-theme-unlock-trigger.sql
-- Make sure it has "SECURITY DEFINER" at the end!
```

---

### Problem 4: "Wrong Stripe IDs"
**Symptoms**: Diagnostic shows "❌ Stripe ID lookup fails"

**Fix**:
1. **Stripe Dashboard** → Products → Click "Complete Theme Library"
2. Copy **Product ID** (e.g., `prod_ABC123xyz`)
3. Click on price → Copy **Price ID** (e.g., `price_ABC123xyz`)
4. Update database:
   ```sql
   UPDATE bundles 
   SET 
     stripe_product_id = 'prod_YOUR_ACTUAL_ID',
     stripe_price_id = 'price_YOUR_ACTUAL_ID'
   WHERE id = 'complete-library';
   ```

---

## ⏱️ Timeline (If Everything Goes Smoothly)

- **Run diagnostic**: 30 seconds
- **Fix any issues**: 1-5 minutes
- **Deploy function**: 1 minute
- **Retry webhook**: 10 seconds
- **Verify in database**: 30 seconds

**Total**: ~3-7 minutes

---

## 🆘 Emergency: Nuclear Reset

If nothing works, **start completely fresh**:

```sql
-- 1. Drop everything (CAUTION: Deletes all purchases!)
DROP TRIGGER IF EXISTS unlock_themes_on_bundle_purchase ON bundle_purchases CASCADE;
DROP TRIGGER IF EXISTS update_bundle_stats ON bundle_purchases CASCADE;
DROP FUNCTION IF EXISTS unlock_bundle_themes() CASCADE;
DROP FUNCTION IF EXISTS increment_bundle_purchase_count() CASCADE;
DROP TABLE IF EXISTS bundle_purchases CASCADE;
DROP TABLE IF EXISTS bundles CASCADE;
```

Then:
1. Re-run `bundle-setup.sql` (creates tables + triggers)
2. Re-run `bundle-theme-unlock-trigger.sql` (creates unlock trigger)
3. Re-run `database-constraints-and-rls.sql` (adds constraints + RLS)
4. Deploy: `supabase functions deploy make-server-f9be53a7`
5. Verify: Run `DIAGNOSE-ISSUE.sql`
6. Retry webhook

---

## ✅ Final Checklist

You're done when all of these are ✅:

- [ ] Diagnostic script shows "🎉 DATABASE IS CONFIGURED CORRECTLY"
- [ ] `SELECT COUNT(*) FROM bundles` returns 4
- [ ] `SELECT * FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0'` returns 1 row
- [ ] Function deployed successfully
- [ ] Function logs show startup messages
- [ ] Webhook retry returns **200 OK**
- [ ] `SELECT COUNT(*) FROM bundle_purchases` shows at least 1
- [ ] `SELECT COUNT(*) FROM theme_purchases WHERE purchase_type = 'bundle'` shows 11

---

## 🎉 Success!

When webhook returns **200 OK**, you'll see in the database:

```sql
-- 1 bundle purchase
SELECT * FROM bundle_purchases;

-- 11 unlocked themes
SELECT * FROM theme_purchases WHERE purchase_type = 'bundle';

-- Stats incremented
SELECT id, purchased_count FROM bundles WHERE id = 'complete-library';
-- purchased_count should be 1
```

**You're all set!** Future bundle purchases will work automatically. 🚀

---

## 📞 Get More Help

If you've:
- ✅ Run the diagnostic script
- ✅ Followed the fix recommendations
- ✅ Deployed the function
- ✅ Checked the logs
- ❌ Still not working

Provide these 4 things:
1. **Full output of diagnostic script** (copy/paste)
2. **Stripe webhook error** (from Response tab)
3. **Function logs** (from Supabase Dashboard)
4. **Result of**: `SELECT id, stripe_product_id FROM bundles;`

This will help identify the exact issue.

---

**🚀 Start now: Run `/imports/pasted_text/DIAGNOSE-ISSUE.sql`**
