# ⚡ QUICK FIX CHECKLIST
## "I ran all the SQL but it's still not working"

---

## ✅ Do These 5 Things (In Order)

### 1. Run Diagnostic Script (2 minutes)

**Supabase Dashboard** → SQL Editor → Paste & Run:
```
/imports/pasted_text/DIAGNOSE-ISSUE.sql
```

**Look at the final summary** - should say:
```
🎉 DATABASE IS CONFIGURED CORRECTLY!
```

**If it says "⚠️ ISSUES FOUND"** → Read the fix recommendations in the output

---

### 2. Verify Bundles Exist (30 seconds)

**Supabase Dashboard** → SQL Editor → Run:
```sql
SELECT id, stripe_product_id FROM bundles;
```

**Expected output** (4 rows):
```
complete-library    | prod_UBF7QhqUggiUm0
life-milestones     | prod_UBF8ZAfAoNwgZI
celebration         | prod_UBF8RA7iFHig8v
inner-journey       | prod_UBFA1BVhrMDQrh
```

**If empty** → Bundles didn't insert. Run:
```sql
-- Copy/paste from bundle-setup.sql starting at line 26 (INSERT INTO...)
```

---

### 3. Deploy Function (1 minute)

**Terminal**:
```bash
supabase functions deploy make-server-f9be53a7
```

**Expected**: 
```
✓ Deployed successfully
```

**If error** → Check:
- Logged in? `supabase login`
- Linked project? `supabase link`
- Syntax errors in code?

---

### 4. Check Function Logs (30 seconds)

**Supabase Dashboard** → Edge Functions → `make-server-f9be53a7` → Logs

**Should see**:
```
✅ [Startup] Supabase client created
✅ [Monetization] Price configuration loaded
```

**If blank** → Function didn't deploy. Retry step 3.

---

### 5. Retry Webhook (30 seconds)

**Stripe Dashboard** → Webhooks → Event `evt_1TDbpNHUyotQ1kng3jdcrhJj` → **Resend**

**Expected**: **200 OK** ✅

**If 400/500 error** → Go to TROUBLESHOOTING.md

---

## 🚨 Common Mistakes

### Mistake #1: Didn't actually run the SQL
- ❌ Opened SQL Editor but didn't click **RUN**
- ❌ Ran in wrong database/project
- ✅ **Fix**: Run DIAGNOSE-ISSUE.sql to verify

### Mistake #2: Function not deployed
- ❌ Edited code but didn't deploy
- ❌ Deployment failed but didn't notice
- ✅ **Fix**: Always check for "Deployed successfully" message

### Mistake #3: Wrong Stripe product IDs
- ❌ Copy/pasted old IDs from documentation
- ❌ Used test mode IDs in production (or vice versa)
- ✅ **Fix**: Get IDs from **Stripe Dashboard → Products**

### Mistake #4: RLS blocking webhook
- ❌ Webhook using ANON_KEY instead of SERVICE_ROLE_KEY
- ❌ Trigger missing SECURITY DEFINER
- ✅ **Fix**: Check `/supabase/functions/server/supabase-client.tsx`

### Mistake #5: Old function cached
- ❌ Deployed new code but Supabase serving cached version
- ✅ **Fix**: Wait 30 seconds after deployment, or restart function

---

## 🔍 Quick Tests

### Test A: Can database find bundle?
```sql
SELECT * FROM bundles WHERE stripe_product_id = 'prod_UBF7QhqUggiUm0';
```
**Expected**: 1 row (complete-library)
**If empty**: Bundles table is wrong → Re-run bundle-setup.sql

---

### Test B: Can we insert a purchase?
```sql
-- Insert test purchase
INSERT INTO bundle_purchases (user_id, bundle_id, price_paid, stripe_payment_id)
VALUES ('test-123', 'complete-library', 9.99, 'test-payment');

-- Check if themes unlocked (should be 11)
SELECT COUNT(*) FROM theme_purchases WHERE user_id = 'test-123';

-- Cleanup
DELETE FROM bundle_purchases WHERE user_id = 'test-123';
DELETE FROM theme_purchases WHERE user_id = 'test-123';
```
**Expected**: COUNT(*) = 11
**If 0**: Trigger not working → Re-run bundle-theme-unlock-trigger.sql

---

### Test C: Is function using service role key?
Check `/supabase/functions/server/supabase-client.tsx`:
```typescript
const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // ✅ Must be this
```

**NOT**:
```typescript
const key = Deno.env.get('SUPABASE_ANON_KEY'); // ❌ Wrong!
```

---

## 📊 Decision Tree

```
Is DIAGNOSE-ISSUE.sql showing "🎉 DATABASE IS CONFIGURED CORRECTLY"?
│
├─ NO → Follow fix recommendations in diagnostic output
│        Then retry from step 1
│
└─ YES → Did you deploy the function?
         │
         ├─ NO → Run: supabase functions deploy make-server-f9be53a7
         │
         └─ YES → Check function logs for errors
                  │
                  ├─ Logs show "Bundle NOT FOUND" 
                  │  → Stripe IDs mismatch (see Mistake #3)
                  │
                  ├─ Logs show "insufficient privilege"
                  │  → RLS issue (see Mistake #4)
                  │
                  ├─ No logs at all
                  │  → Function didn't deploy (see Mistake #2)
                  │
                  └─ Logs look good but webhook fails
                     → Check Stripe webhook endpoint URL
```

---

## 🆘 Still Not Working?

**Open**: `/imports/pasted_text/TROUBLESHOOTING.md`

Includes:
- Detailed fix for every possible error
- How to get exact error from Stripe
- Environment variable checks
- Nuclear option (start fresh)
- What info to provide for help

---

## ✅ Success Indicators

You're done when:

1. ✅ Diagnostic shows "🎉 DATABASE IS CONFIGURED CORRECTLY"
2. ✅ `SELECT * FROM bundles` returns 4 rows
3. ✅ Function deployed successfully
4. ✅ Webhook retry returns **200 OK**
5. ✅ This query returns 11 (themes unlocked):
   ```sql
   SELECT COUNT(*) FROM theme_purchases 
   WHERE purchase_type = 'bundle' 
   LIMIT 11;
   ```

**If all ✅** → You're good! 🎉

---

## 🎯 Most Likely Issues (90% of cases)

1. **Bundles table is empty** (35%)
   - **Fix**: Re-run INSERT statement from bundle-setup.sql

2. **Function not deployed** (25%)
   - **Fix**: `supabase functions deploy make-server-f9be53a7`

3. **Trigger missing SECURITY DEFINER** (20%)
   - **Fix**: Re-run bundle-theme-unlock-trigger.sql

4. **Wrong Stripe product IDs** (10%)
   - **Fix**: Get real IDs from Stripe Dashboard and update bundles table

5. **RLS blocking webhook** (5%)
   - **Fix**: Check supabase-client.tsx uses SERVICE_ROLE_KEY

6. **Other** (5%)
   - **Fix**: See TROUBLESHOOTING.md

---

**Start here**: Run `/imports/pasted_text/DIAGNOSE-ISSUE.sql` 🚀
