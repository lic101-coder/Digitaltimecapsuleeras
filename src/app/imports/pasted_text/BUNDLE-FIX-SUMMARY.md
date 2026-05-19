# 🎯 Bundle Purchase Fix - Complete Summary

## What Was Wrong

Your Stripe webhook was failing with:
```
HTTP 500: "Purchase processing error: Unknown bundle: complete-library"
```

**Root Cause**: The webhook relied on `metadata.bundleId` (a free-text slug like "complete-library") instead of authoritative Stripe product/price IDs. The old deployed function didn't have proper bundle resolution logic.

---

## What I Fixed

### 1. ✅ Created Proper Database Schema
- **File**: `/imports/pasted_text/bundle-setup.sql`
- Creates `bundles` table with Stripe ID mappings
- Populates 4 bundles with correct Stripe product/price IDs
- Adds `purchased_count` column for stats tracking
- Creates auto-increment trigger for purchase stats

### 2. ✅ Updated Webhook Handler
- **File**: `/supabase/functions/server/index.tsx` (lines 14928-15052)
- Expands `line_items` to get actual Stripe product/price IDs
- Queries database using Stripe IDs (not metadata slugs)
- Falls back to metadata only for backward compatibility
- Returns clear 400 error if bundle not found
- Comprehensive logging for troubleshooting

### 3. ✅ Created Theme Unlock Trigger
- **File**: `/imports/pasted_text/bundle-theme-unlock-trigger.sql`
- Automatically unlocks all themes when bundle purchased
- Prevents duplicate unlocks with `ON CONFLICT DO NOTHING`
- Logs detailed info for debugging

### 4. ✅ Added Diagnostics Endpoint
- **Endpoint**: `/make-server-f9be53a7/bundle-diagnostics`
- Shows all bundles with Stripe ID mappings
- Displays purchase counts and stats sync status
- Helps verify setup is correct

### 5. ✅ Created Verification Scripts
- **File**: `/imports/pasted_text/verify-bundle-setup.sql`
- 10 automated checks to verify setup
- Shows exactly what's missing if incomplete

---

## Files You Need to Run (In Order)

### Step 1: Database Setup
Run these in **Supabase SQL Editor**:

1. **`/imports/pasted_text/bundle-setup.sql`**
   - Creates bundles table
   - Inserts 4 bundles with Stripe IDs
   - Creates stats trigger

2. **`/imports/pasted_text/bundle-theme-unlock-trigger.sql`**
   - Creates theme unlock automation
   - Ensures themes unlock when bundle purchased

3. **`/imports/pasted_text/verify-bundle-setup.sql`** (optional)
   - Verifies everything is set up correctly
   - Shows detailed diagnostic info

### Step 2: Deploy Function
Run in terminal:
```bash
supabase functions deploy make-server-f9be53a7
```

### Step 3: Verify Setup
Test the diagnostics endpoint:
```bash
curl https://YOUR_PROJECT.supabase.co/functions/v1/make-server-f9be53a7/bundle-diagnostics \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Expected: 4 bundles with `stats_in_sync: true`

### Step 4: Retry Failed Webhook
- Go to Stripe Dashboard → Webhooks
- Find event `evt_1TDbpNHUyotQ1kng3jdcrhJj`
- Click "Resend"
- Should return 200 OK and unlock all 11 themes

---

## Bundle Configuration

All 4 bundles are properly wired:

| Bundle ID | Name | Stripe Product | Stripe Price | Price | Themes |
|-----------|------|----------------|--------------|-------|--------|
| `complete-library` | Complete Theme Library | `prod_UBF7QhqUggiUm0` | `price_1TCsdYHUyotQ1kngEB9gOyr2` | $9.99 | 11 |
| `life-milestones` | Life Milestones | `prod_UBF8ZAfAoNwgZI` | `price_1TCseDHUyotQ1kng86obk1HT` | $5.99 | 5 |
| `celebration` | Celebration Pack | `prod_UBF8RA7iFHig8v` | `price_1TCsehHUyotQ1kngXZf0Qay2` | $2.49 | 4 |
| `inner-journey` | Inner Journey | `prod_UBFA1BVhrMDQrh` | `price_1TCsfpHUyotQ1kngmT3KKiE0` | $1.99 | 2 |

---

## How Purchases Work Now

### Before (BROKEN):
1. Webhook gets `metadata.bundleId = "complete-library"`
2. Looks up hardcoded `BUNDLE_THEMES["complete-library"]`
3. ❌ Old deployed function doesn't have this mapping
4. ❌ Returns 500 error

### After (FIXED):
1. Webhook expands line items → gets `product_id = "prod_UBF7QhqUggiUm0"`
2. Queries database: `SELECT * FROM bundles WHERE stripe_product_id = 'prod_UBF7...'`
3. ✅ Finds bundle with ID `"complete-library"` and 11 themes
4. ✅ Saves to `bundle_purchases` table
5. ✅ Trigger unlocks all 11 themes
6. ✅ Trigger increments `purchased_count` stat
7. ✅ Returns 200 OK

---

## Stats Tracking

The `bundles` table now has a `purchased_count` column that auto-increments via trigger:

```sql
CREATE TRIGGER update_bundle_stats
  AFTER INSERT ON bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION increment_bundle_purchase_count();
```

Check stats anytime:
```sql
SELECT id, name, purchased_count FROM bundles;
```

---

## Verification Checklist

After running all scripts and deploying:

- [ ] SQL setup script executed successfully (4 bundles inserted)
- [ ] Theme unlock trigger created
- [ ] Stats trigger created
- [ ] Server function deployed
- [ ] `/bundle-diagnostics` returns 4 bundles
- [ ] All bundles show `stats_in_sync: true`
- [ ] Verification script shows "✅ SETUP COMPLETE"
- [ ] Failed webhook event retried successfully
- [ ] Purchase appears in `bundle_purchases` table
- [ ] All themes unlocked in `theme_purchases` table
- [ ] `purchased_count` incremented correctly

---

## Troubleshooting

### "No bundles found" in diagnostics
**Fix**: Run `bundle-setup.sql` in Supabase SQL Editor

### "Trigger missing" in verification
**Fix**: Run `bundle-theme-unlock-trigger.sql`

### Webhook still returns 500
**Fix**: Redeploy function:
```bash
supabase functions deploy make-server-f9be53a7
```

### Themes not unlocking after purchase
**Fix**: Check trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'unlock_themes_on_bundle_purchase';
```

### Stats not incrementing
**Fix**: Check trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'update_bundle_stats';
```

---

## Next Steps

1. ✅ **Run setup scripts** (3 SQL files)
2. ✅ **Deploy function** (`supabase functions deploy make-server-f9be53a7`)
3. ✅ **Verify setup** (run verification script + diagnostics endpoint)
4. ✅ **Retry failed event** (Stripe Dashboard)
5. 🎉 **Test new purchase** (end-to-end flow)

---

## Support

All files are in `/imports/pasted_text/`:
- `bundle-setup.sql` - Main table setup
- `bundle-theme-unlock-trigger.sql` - Theme unlock automation
- `verify-bundle-setup.sql` - Verification checks
- `bundle-deployment-guide.md` - Detailed step-by-step guide
- `BUNDLE-FIX-SUMMARY.md` - This file

Questions? Check the deployment guide for detailed explanations.
