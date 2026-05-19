# 🚀 Bundle Fix - Quick Start (3 Steps)

## The Problem
```
Stripe webhook failing: "Unknown bundle: complete-library"
Event: evt_1TDbpNHUyotQ1kng3jdcrhJj
Status: HTTP 500
```

## The Fix (3 Steps)

### 1️⃣ Run SQL Scripts in Supabase
Open **Supabase Dashboard → SQL Editor** and run these 2 files IN ORDER:

```sql
-- File 1: bundle-setup.sql
-- Creates bundles table + stats trigger
-- ✅ MUST RUN FIRST
```

```sql
-- File 2: bundle-theme-unlock-trigger.sql
-- Creates theme unlock automation
-- ✅ RUN AFTER bundle-setup.sql
```

### 2️⃣ Deploy Function
```bash
supabase functions deploy make-server-f9be53a7
```

### 3️⃣ Retry Failed Webhook
1. Go to **Stripe Dashboard → Webhooks**
2. Find event `evt_1TDbpNHUyotQ1kng3jdcrhJj`
3. Click **Resend**
4. Should return **200 OK** ✅

---

## Verify It Worked

### Check Diagnostics:
```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-f9be53a7/bundle-diagnostics \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Expected output:
```json
{
  "total_bundles": 4,
  "all_stats_in_sync": true,
  "bundles": [...]
}
```

### Check Database:
```sql
-- In Supabase SQL Editor:
SELECT * FROM bundles;  -- Should show 4 bundles
SELECT * FROM bundle_purchases;  -- Should show your purchase
SELECT COUNT(*) FROM theme_purchases WHERE purchase_type = 'bundle';  -- Should show 11 (for complete-library)
```

---

## What Changed?

**Before**: Webhook relied on metadata slug → Failed  
**After**: Webhook uses Stripe product/price IDs → Works ✅

**New Flow**:
1. Webhook expands line_items → gets Stripe product ID
2. Queries `bundles` table by product ID
3. Finds bundle + all themes to unlock
4. Saves to `bundle_purchases`
5. Triggers auto-unlock themes + increment stats
6. Returns 200 OK

---

## Need Help?

- **Detailed guide**: `/imports/pasted_text/bundle-deployment-guide.md`
- **Full summary**: `/imports/pasted_text/BUNDLE-FIX-SUMMARY.md`
- **Verification script**: `/imports/pasted_text/verify-bundle-setup.sql`

---

## Checklist

- [ ] Ran `bundle-setup.sql`
- [ ] Ran `bundle-theme-unlock-trigger.sql`
- [ ] Deployed function
- [ ] Retried failed webhook (200 OK)
- [ ] Verified with diagnostics endpoint
- [ ] Checked database (4 bundles, purchase recorded)

**Done!** 🎉
