# ⚡ RUN THIS FIRST - Quick Deploy

## 🛡️ Safety: Your Webhook Uses Service Role Key = RLS is SAFE ✅

---

## 4 Steps to Fix Bundles

### 1️⃣ Open Supabase SQL Editor
Go to **Supabase Dashboard → SQL Editor**

### 2️⃣ Run 3 SQL Files (in order)
Copy/paste and run each file:

```sql
-- File 1: /imports/pasted_text/bundle-setup.sql
-- Creates bundles table + 4 bundles + stats trigger
-- ⏱️ Takes ~2 seconds
```

```sql
-- File 2: /imports/pasted_text/bundle-theme-unlock-trigger.sql
-- Creates theme unlock automation
-- ⏱️ Takes ~1 second
```

```sql
-- File 3: /imports/pasted_text/database-constraints-and-rls.sql
-- Adds constraints + indexes + RLS policies
-- ⏱️ Takes ~3 seconds
```

### 3️⃣ Deploy Function
```bash
supabase functions deploy make-server-f9be53a7
```
⏱️ Takes ~30 seconds

### 4️⃣ Retry Failed Webhook
1. **Stripe Dashboard** → Webhooks
2. Find `evt_1TDbpNHUyotQ1kng3jdcrhJj`
3. Click **Resend**
4. Should return **200 OK** ✅

---

## ✅ Verify It Worked

```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-f9be53a7/bundle-diagnostics \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Expected: `"total_bundles": 4, "all_stats_in_sync": true`

---

## 🔒 RLS Safety Explained

**Your setup**:
- ✅ Server uses `SUPABASE_SERVICE_ROLE_KEY` → Bypasses RLS
- ✅ Triggers use `SECURITY DEFINER` → Bypasses RLS
- ✅ Frontend uses `ANON_KEY` → RLS enforced (prevents cheating)

**Result**: Stripe webhooks work perfectly + users can't fake purchases

---

## 📚 Need More Info?

- **Quick guide**: `QUICK-START.md`
- **Full guide**: `COMPLETE-DEPLOYMENT-GUIDE.md`
- **RLS safety**: `RLS-SAFETY-GUIDE.md`
- **Troubleshooting**: `bundle-deployment-guide.md`

---

## ⏱️ Total Time: ~5 minutes

1. Run 3 SQL scripts: **~6 seconds**
2. Deploy function: **~30 seconds**
3. Retry webhook: **~5 seconds**
4. Verify: **~10 seconds**
5. ☕ Coffee break: **~4 minutes**

**Done!** 🎉
