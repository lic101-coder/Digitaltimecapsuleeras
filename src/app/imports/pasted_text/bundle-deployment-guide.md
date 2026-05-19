# Bundle Setup & Deployment Guide

## Problem Fixed
Your webhook was failing with "Unknown bundle: complete-library" because it relied on metadata slugs instead of authoritative Stripe product/price IDs. This guide implements proper Stripe ID-based bundle resolution.

---

## Step 1: Create Bundles Table in Supabase

1. **Open Supabase Dashboard** → SQL Editor
2. **Paste and run** the contents of `/imports/pasted_text/bundle-setup.sql`
3. **Verify** the output shows 4 bundles inserted successfully

This creates:
- ✅ `bundles` table with Stripe product/price ID mappings
- ✅ RLS policies for secure access
- ✅ Auto-increment trigger for `purchased_count` stats
- ✅ All 4 bundles properly configured:
  - Complete Theme Library ($9.99, 11 themes)
  - Life Milestones ($5.99, 5 themes)
  - Celebration Pack ($2.49, 4 themes)
  - Inner Journey ($1.99, 2 themes)

---

## Step 2: Deploy Updated Server Function

```bash
supabase functions deploy make-server-f9be53a7
```

**What Changed:**
- 🔧 Webhook now expands `line_items` to get actual Stripe product/price IDs
- 🔧 Resolves bundles by querying database with Stripe IDs (not metadata)
- 🔧 Falls back to metadata slug only for backward compatibility
- 🔧 Returns clear 400 error if bundle not found in database
- 🔧 Logs detailed diagnostic info for troubleshooting

---

## Step 3: Verify Setup

### A. Check Bundle Configuration
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f9be53a7/bundle-diagnostics \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Expected output:
```json
{
  "status": "success",
  "total_bundles": 4,
  "bundles": [
    {
      "id": "complete-library",
      "name": "Complete Theme Library",
      "stripe_product_id": "prod_UBF7QhqUggiUm0",
      "stripe_price_id": "price_1TCsdYHUyotQ1kngEB9gOyr2",
      "price": 9.99,
      "theme_count": 11,
      "purchased_count": 0,
      "stats_in_sync": true
    },
    ...
  ],
  "all_stats_in_sync": true
}
```

### B. Check Webhook Health
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-f9be53a7/webhook-health \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## Step 4: Retry Failed Webhook

In Stripe Dashboard:
1. Go to **Developers → Webhooks**
2. Find event `evt_1TDbpNHUyotQ1kng3jdcrhJj`
3. Click **Resend**

**Expected Result:**
- ✅ 200 OK response
- ✅ Bundle purchase saved to `bundle_purchases` table
- ✅ All 11 themes unlocked for user
- ✅ `purchased_count` incremented to 1

---

## How It Works Now

### Checkout Flow:
1. **Frontend**: User clicks "Buy Complete Library"
2. **Server**: Creates Stripe checkout with metadata `purchaseType: 'bundle'`
3. **Stripe**: User completes payment
4. **Webhook receives**: `checkout.session.completed` event

### Webhook Processing (NEW):
```typescript
// 1. Expand line items to get Stripe IDs
const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ['line_items.data.price.product']
});

const productId = session.line_items.data[0].price.product.id;
// → "prod_UBF7QhqUggiUm0"

// 2. Query database by Stripe product ID
const bundle = await supabase
  .from('bundles')
  .select('*')
  .eq('stripe_product_id', productId)
  .single();
// → { id: 'complete-library', themes: [...11 themes], ... }

// 3. Save purchase (triggers handle rest)
await supabase
  .from('bundle_purchases')
  .insert({ 
    user_id, 
    bundle_id: bundle.id,
    price_paid: 9.99,
    stripe_payment_id 
  });

// 4. Database triggers automatically:
//    - Unlock all themes in bundle.themes array
//    - Increment bundle.purchased_count
```

---

## Database Triggers Required

You'll need these triggers (if not already created):

### Theme Unlock Trigger:
```sql
CREATE OR REPLACE FUNCTION unlock_bundle_themes()
RETURNS TRIGGER AS $$
DECLARE
  theme_id TEXT;
  bundle_themes TEXT[];
BEGIN
  -- Get themes from bundle
  SELECT themes INTO bundle_themes
  FROM bundles
  WHERE id = NEW.bundle_id;
  
  -- Unlock each theme
  FOREACH theme_id IN ARRAY bundle_themes
  LOOP
    INSERT INTO theme_purchases (user_id, theme_id, purchase_type, price_paid, stripe_payment_id)
    VALUES (NEW.user_id, theme_id, 'bundle', 0, NEW.stripe_payment_id)
    ON CONFLICT (user_id, theme_id) DO NOTHING;
  END LOOP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER unlock_themes_on_bundle_purchase
  AFTER INSERT ON bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION unlock_bundle_themes();
```

### Stats Trigger (Already in bundle-setup.sql):
```sql
CREATE TRIGGER update_bundle_stats
  AFTER INSERT ON bundle_purchases
  FOR EACH ROW
  EXECUTE FUNCTION increment_bundle_purchase_count();
```

---

## Troubleshooting

### "No bundles configured" in diagnostics
**Fix**: Run `/imports/pasted_text/bundle-setup.sql` in Supabase SQL Editor

### "stats_in_sync: false" in diagnostics
**Fix**: Trigger not firing. Check trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'update_bundle_stats';
```

### Webhook still returns "Unknown bundle"
**Fix**: Old function still deployed. Redeploy:
```bash
supabase functions deploy make-server-f9be53a7
```

### Themes not unlocking after bundle purchase
**Fix**: Missing theme unlock trigger. Create the trigger above.

---

## Verification Checklist

- [ ] SQL setup script executed successfully
- [ ] Server function deployed
- [ ] `/bundle-diagnostics` returns 4 bundles
- [ ] `all_stats_in_sync: true` in diagnostics
- [ ] Failed webhook event retried successfully
- [ ] Purchase appears in `bundle_purchases` table
- [ ] All bundle themes appear in `theme_purchases` table
- [ ] `purchased_count` incremented in `bundles` table
- [ ] User can access all themes in the app

---

## Next Steps

1. **Test with test mode purchase**: Create a new test purchase to verify end-to-end flow
2. **Monitor webhook logs**: Check Stripe Dashboard for any new errors
3. **Add bundle stats to admin panel**: Display `purchased_count` for each bundle
4. **Consider theme unlock notifications**: Let users know when bundle themes are unlocked
