# 🎯 Complete Stripe Configuration Guide for Eras

**Last Updated:** March 19, 2026  
**Status:** Ready for Production Setup

---

## 📋 Executive Summary

Eras offers **18 distinct products** across three categories:
- **11 Individual Premium Themes** ($0.99–$2.99)
- **4 Bundles** (including Complete Library at $9.99)
- **3 Beneficiary Slot Tiers** ($0.99–$4.99)

**Total Revenue Potential:** All products fully integrated with Stripe Checkout, webhook handlers, and database tracking with Row Level Security policies.

---

## 🎨 PART 1: PREMIUM THEMES (11 Products)

### Flagship Theme ($2.99)
1. **Golden Moments** (Wedding Theme)
   - **Product Name in Stripe:** `Eras Theme: Golden Moments (Wedding)`
   - **Price:** $2.99 USD
   - **Description:** Capture wedding memories with cinema-quality VFX featuring 3 unique ceremonies: Photo Finish Victory, Graduation Cap Toss, and Wedding First Dance
   - **Theme ID:** `wedding`
   - **Ceremonies:** 3 VFX-quality opening/closing animations

### Premium Themes ($1.99 each)
2. **Career Summit** (Career Theme)
   - **Product Name in Stripe:** `Eras Theme: Career Summit`
   - **Price:** $1.99 USD
   - **Description:** Mark professional achievements with epic celebrations including Victory Podium, Hall of Excellence, and The Curtain Call
   - **Theme ID:** `career`
   - **Ceremonies:** 3 VFX-quality animations

3. **Time Traveler** (Future Theme)
   - **Product Name in Stripe:** `Eras Theme: Time Traveler`
   - **Price:** $1.99 USD
   - **Description:** Messages to your future self with cosmic animations including Time's Passage, Digital Archive, and Stargate Portal
   - **Theme ID:** `future`
   - **Ceremonies:** 3 VFX-quality animations

4. **New Life** (Baby Theme)
   - **Product Name in Stripe:** `Eras Theme: New Life`
   - **Price:** $1.99 USD
   - **Description:** Welcoming a new arrival with gentle beauty featuring Sunrise Symphony, Storm & Calm, and Genesis ceremonies
   - **Theme ID:** `new_life`
   - **Ceremonies:** 3 VFX-quality animations

### Standard Themes ($0.99 each)
5. **Voyage** (Travel Theme)
   - **Product Name in Stripe:** `Eras Theme: Voyage (Travel)`
   - **Price:** $0.99 USD
   - **Description:** Adventures and journeys with travel-themed ceremonies including Compass Rose Bloom, Around the World, and Aurora Navigation Pathways
   - **Theme ID:** `travel`
   - **Ceremonies:** 3 VFX-quality animations

6. **New Year's Eve**
   - **Product Name in Stripe:** `Eras Theme: New Year's Eve`
   - **Price:** $0.99 USD
   - **Description:** Ring in the new year with epic resolutions featuring Neon Countdown Pulse, Champagne Supernova, and Firework Symphony
   - **Theme ID:** `new_year`
   - **Ceremonies:** 3 VFX-quality animations

7. **Mixtape** (Friendship Theme)
   - **Product Name in Stripe:** `Eras Theme: Mixtape (Friendship)`
   - **Price:** $0.99 USD
   - **Description:** Retro vibes for friends with cassette animations including Vinyl Spin, Neon Nights, and Arcade Insert Coin
   - **Theme ID:** `friendship`
   - **Ceremonies:** 3 VFX-quality animations

8. **Furry Friends** (Pet Theme)
   - **Product Name in Stripe:** `Eras Theme: Furry Friends (Pet)`
   - **Price:** $0.99 USD
   - **Description:** Celebrate beloved pet companions with warmth featuring First Paws Home, Starlit Companions, and Rainbow Bridge
   - **Theme ID:** `pet`
   - **Ceremonies:** 3 VFX-quality animations

9. **Grateful Heart** (Gratitude Theme)
   - **Product Name in Stripe:** `Eras Theme: Grateful Heart`
   - **Price:** $0.99 USD
   - **Description:** Express heartfelt thanks and appreciation with Lantern of Thanks, Garden of Gratitude, and Infinite Gratitude
   - **Theme ID:** `gratitude`
   - **Ceremonies:** 3 VFX-quality animations

10. **Launchpad** (Graduation Theme)
    - **Product Name in Stripe:** `Eras Theme: Launchpad (Graduation)`
    - **Price:** $0.99 USD
    - **Description:** Big achievements and next steps with epic launches including Metamorphosis, Storm's Fury, and To the Stars
    - **Theme ID:** `graduation`
    - **Ceremonies:** 3 VFX-quality animations

11. **New Nest** (New Home Theme)
    - **Product Name in Stripe:** `Eras Theme: New Nest (New Home)`
    - **Price:** $0.99 USD
    - **Description:** Celebrate your new home sweet home with First Light Switch, Snowglobe Escape, and Time Lapse Legacy
    - **Theme ID:** `new_home`
    - **Ceremonies:** 3 VFX-quality animations

---

## 🎁 PART 2: BUNDLES (4 Products)

### Complete Library (Best Value)
1. **Complete Theme Library**
   - **Product Name in Stripe:** `Eras: Complete Theme Library`
   - **Price:** $9.99 USD
   - **Description:** Unlock all 11 premium themes with 33 VFX ceremonies. Lifetime access to current and future themes. Regular value: $13.95 – Save $3.96!
   - **Bundle ID:** `complete-library`
   - **Includes:** All 11 premium themes listed above
   - **Total Ceremonies:** 33
   - **Special Feature:** Includes future themes automatically

### Theme Bundles
2. **Life Milestones Bundle**
   - **Product Name in Stripe:** `Eras Bundle: Life Milestones`
   - **Price:** $5.99 USD
   - **Description:** Capture all major life chapters in one bundle. Regular value: $8.95 – Save $2.96!
   - **Bundle ID:** `life-milestones`
   - **Includes:** Golden Moments (Wedding), Career Summit, New Life, Launchpad (Graduation), New Nest (New Home)
   - **Total Ceremonies:** 15

3. **Celebration Pack Bundle**
   - **Product Name in Stripe:** `Eras Bundle: Celebration Pack`
   - **Price:** $2.49 USD
   - **Description:** Fun, recurring moments with friends and adventures. Regular value: $3.96 – Save $1.47!
   - **Bundle ID:** `celebration`
   - **Includes:** Mixtape (Friendship), Voyage (Travel), New Year's Eve, Furry Friends (Pet)
   - **Total Ceremonies:** 12

4. **Inner Journey Bundle**
   - **Product Name in Stripe:** `Eras Bundle: Inner Journey`
   - **Price:** $1.99 USD
   - **Description:** Personal growth and reflection themes. Regular value: $2.98 – Save $0.99!
   - **Bundle ID:** `inner-journey`
   - **Includes:** Time Traveler (Future), Grateful Heart (Gratitude)
   - **Total Ceremonies:** 6

---

## 👥 PART 3: BENEFICIARY SLOTS (3 Products)

**Context:** Beneficiaries can access your memories when you're gone. Default: 1 slot.

1. **+1 Beneficiary Slot**
   - **Product Name in Stripe:** `Eras: +1 Beneficiary Slot`
   - **Price:** $0.99 USD
   - **Description:** Add one additional beneficiary to protect your memories for one extra person who matters most
   - **Slot Type:** `slot-1`
   - **Adds:** 1 additional slot

2. **+3 Beneficiary Slots (Best Value)**
   - **Product Name in Stripe:** `Eras: +3 Beneficiary Slots`
   - **Price:** $1.99 USD
   - **Description:** Small family pack – add three beneficiary slots. Best value at $0.66 per slot!
   - **Slot Type:** `slot-3`
   - **Adds:** 3 additional slots
   - **Badge:** "⭐ Best Value"

3. **Unlimited Beneficiary Slots**
   - **Product Name in Stripe:** `Eras: Unlimited Beneficiary Slots`
   - **Price:** $4.99 USD
   - **Description:** Share with everyone who matters – unlimited beneficiary slots for your legacy
   - **Slot Type:** `unlimited`
   - **Adds:** Unlimited slots (no cap)

---

## 🔧 PART 4: STRIPE DASHBOARD SETUP

### Step 1: Create Products in Stripe

1. **Log in to Stripe Dashboard:** https://dashboard.stripe.com/
2. **Navigate to:** Products → Create Product
3. **For EACH product above (18 total):**
   - Click "Add Product"
   - Enter the **Product Name** exactly as specified
   - Enter the **Description**
   - Set **Pricing Model:** One-time payment
   - Enter the **Price** in USD
   - Click "Add pricing"
   - Set **Payment type:** One-time
   - **IMPORTANT:** Copy the `price_xxxxx` ID (not the product ID!)

### Step 2: Organize Your Products

**Recommended Stripe Product Organization:**
```
📁 Eras Themes
  ├── Golden Moments (Wedding) - $2.99
  ├── Career Summit - $1.99
  ├── Time Traveler - $1.99
  ├── New Life - $1.99
  ├── Voyage (Travel) - $0.99
  ├── New Year's Eve - $0.99
  ├── Mixtape (Friendship) - $0.99
  ├── Furry Friends (Pet) - $0.99
  ├── Grateful Heart - $0.99
  ├── Launchpad (Graduation) - $0.99
  └── New Nest (New Home) - $0.99

📁 Eras Bundles
  ├── Complete Theme Library - $9.99
  ├── Life Milestones - $5.99
  ├── Celebration Pack - $2.49
  └── Inner Journey - $1.99

📁 Eras Beneficiary Slots
  ├── +1 Slot - $0.99
  ├── +3 Slots - $1.99
  └── Unlimited Slots - $4.99
```

### Step 3: Record Your Price IDs

Create a spreadsheet or document with this format:

| Product Name | Theme/Bundle ID | Price | Stripe Price ID |
|--------------|-----------------|-------|-----------------|
| Golden Moments | wedding | $2.99 | price_xxxxx |
| Career Summit | career | $1.99 | price_xxxxx |
| Time Traveler | future | $1.99 | price_xxxxx |
| ... | ... | ... | ... |

---

## 💻 PART 5: CODE INTEGRATION

### Current Code Location
File: `/supabase/functions/server/index.tsx`  
Lines: **14740-14772**

### Theme Prices Configuration

Replace the current `THEME_PRICES` object (lines 14742-14763) with your actual Stripe Price IDs:

```typescript
const THEME_PRICES: Record<string, { priceId: string; price: number }> = {
  // FLAGSHIP THEME
  'wedding': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 2.99 },
  
  // PREMIUM THEMES ($1.99)
  'career': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 1.99 },
  'future': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 1.99 },
  'new_life': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 1.99 },
  
  // STANDARD THEMES ($0.99)
  'travel': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'new_year': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'friendship': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'pet': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'gratitude': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'graduation': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  'new_home': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99 },
  
  // BUNDLES
  'complete-library': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 9.99 },
  'life-milestones': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 5.99 },
  'celebration': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 2.49 },
  'inner-journey': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 1.99 },
};
```

### Beneficiary Prices Configuration

Replace the current `BENEFICIARY_PRICES` object (lines 14765-14772) with your actual Stripe Price IDs:

```typescript
const BENEFICIARY_PRICES: Record<string, { priceId: string; price: number; slots: number }> = {
  'slot-1':    { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 0.99,  slots: 1  },
  'slot-3':    { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 1.99,  slots: 3  },
  'unlimited': { priceId: 'price_YOUR_ACTUAL_ID_HERE', price: 4.99,  slots: -1 },
};
```

### Bundle Theme Mappings (Already Configured)

The bundle theme mappings at lines 14775-14778 are already correct:

```typescript
const BUNDLE_THEMES: Record<string, string[]> = {
  'complete-library': ['wedding', 'career', 'future', 'new_life', 'travel', 'new_year', 'friendship', 'pet', 'gratitude', 'graduation', 'new_home'],
  'life-milestones': ['wedding', 'career', 'new_life', 'graduation', 'new_home'],
  'celebration': ['friendship', 'travel', 'new_year', 'pet'],
  'inner-journey': ['future', 'gratitude'],
};
```

---

## 🔐 PART 6: STRIPE WEBHOOK SETUP

### Step 1: Configure Webhook Endpoint

1. **In Stripe Dashboard:** Developers → Webhooks → Add endpoint
2. **Endpoint URL:** 
   ```
   https://[YOUR-PROJECT-ID].supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook
   ```
3. **Events to listen for:**
   - `checkout.session.completed` ✅ (Already configured)
   - `payment_intent.succeeded` (Optional, for additional tracking)

### Step 2: Get Webhook Signing Secret

1. After creating the webhook, click on it
2. Copy the **Signing Secret** (starts with `whsec_`)
3. Add to your Supabase environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### Webhook Handler (Already Implemented)

The webhook handler is already implemented at **lines 14790-14929**. It automatically:
- ✅ Verifies webhook signatures
- ✅ Processes theme purchases
- ✅ Processes bundle purchases (with automatic theme unlocking)
- ✅ Processes beneficiary slot purchases
- ✅ Updates database with Row Level Security
- ✅ Redirects users to success page

---

## 🗄️ PART 7: DATABASE TABLES (Already Configured)

### Theme Purchases Table
```sql
table: theme_purchases
columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - theme_id (text)
  - purchase_type (text) // 'individual' or 'bundle'
  - price_paid (numeric)
  - stripe_payment_id (text)
  - purchase_date (timestamp)
```

### Bundle Purchases Table
```sql
table: bundle_purchases
columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - bundle_id (text)
  - themes_included (text[])
  - includes_future_themes (boolean)
  - price_paid (numeric)
  - stripe_payment_id (text)
  - purchase_date (timestamp)
```

### Beneficiary Purchases Table
```sql
table: beneficiary_purchases
columns:
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - purchase_type (text) // 'slot-1', 'slot-3', 'unlimited'
  - quantity (integer, nullable) // null for unlimited
  - price_paid (numeric)
  - stripe_payment_id (text)
  - purchase_date (timestamp)
```

**All tables have Row Level Security (RLS) policies configured.**

---

## 🎯 PART 8: TESTING YOUR SETUP

### Step 1: Use Stripe Test Mode

1. **Toggle to Test Mode** in Stripe Dashboard (top right)
2. Create test versions of all 18 products
3. Use test Price IDs (start with `price_test_`)
4. Use test Stripe Secret Key and Webhook Secret

### Step 2: Test Card Numbers

```
Successful Payment:
  Card: 4242 4242 4242 4242
  Expiry: Any future date
  CVC: Any 3 digits
  ZIP: Any 5 digits

Declined Payment:
  Card: 4000 0000 0000 0002
```

### Step 3: Test Each Product Type

1. **Test an individual theme purchase:**
   - Click "View Details" on any premium theme
   - Click "Unlock Theme"
   - Complete test checkout
   - Verify theme appears in "Your Collection"

2. **Test a bundle purchase:**
   - Click "View Details" on a bundle
   - Click "Unlock Bundle"
   - Verify all themes in bundle unlock

3. **Test Complete Library:**
   - Click "Unlock Everything"
   - Verify all 11 themes unlock

4. **Test beneficiary slots:**
   - Scroll to "Beneficiary Access"
   - Purchase a slot tier
   - Verify slot count increases

### Step 4: Verify Database Entries

Check Supabase Tables after each test:
- `theme_purchases` should have new row
- `bundle_purchases` should have new row (for bundles)
- `beneficiary_purchases` should have new row (for slots)

---

## 🚀 PART 9: GO LIVE CHECKLIST

### Before Production:

- [ ] All 18 products created in **LIVE** Stripe mode
- [ ] All 18 Price IDs recorded in spreadsheet
- [ ] All Price IDs updated in `/supabase/functions/server/index.tsx`
- [ ] Code deployed to Supabase Edge Functions
- [ ] Webhook endpoint created in LIVE mode
- [ ] Webhook secret added to Supabase environment variables
- [ ] Test purchase completed in LIVE mode with real card
- [ ] Database entry verified
- [ ] Theme unlocked in app
- [ ] Success redirect working
- [ ] Terms of Service and Privacy Policy reviewed (Version 7.0 ✅)

### Production Environment Variables:

```bash
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here
```

---

## 📊 PART 10: PRICE ID TEMPLATE

Copy this template and fill in your actual Stripe Price IDs:

```typescript
// ============================================
// ERAS STRIPE PRICE IDs - PRODUCTION
// Last Updated: [DATE]
// ============================================

const THEME_PRICES: Record<string, { priceId: string; price: number }> = {
  // FLAGSHIP ($2.99)
  'wedding': { priceId: 'price_________________', price: 2.99 },
  
  // PREMIUM ($1.99)
  'career': { priceId: 'price_________________', price: 1.99 },
  'future': { priceId: 'price_________________', price: 1.99 },
  'new_life': { priceId: 'price_________________', price: 1.99 },
  
  // STANDARD ($0.99)
  'travel': { priceId: 'price_________________', price: 0.99 },
  'new_year': { priceId: 'price_________________', price: 0.99 },
  'friendship': { priceId: 'price_________________', price: 0.99 },
  'pet': { priceId: 'price_________________', price: 0.99 },
  'gratitude': { priceId: 'price_________________', price: 0.99 },
  'graduation': { priceId: 'price_________________', price: 0.99 },
  'new_home': { priceId: 'price_________________', price: 0.99 },
  
  // BUNDLES
  'complete-library': { priceId: 'price_________________', price: 9.99 },
  'life-milestones': { priceId: 'price_________________', price: 5.99 },
  'celebration': { priceId: 'price_________________', price: 2.49 },
  'inner-journey': { priceId: 'price_________________', price: 1.99 },
};

const BENEFICIARY_PRICES: Record<string, { priceId: string; price: number; slots: number }> = {
  'slot-1': { priceId: 'price_________________', price: 0.99, slots: 1 },
  'slot-3': { priceId: 'price_________________', price: 1.99, slots: 3 },
  'unlimited': { priceId: 'price_________________', price: 4.99, slots: -1 },
};
```

---

## 🎨 PART 11: STORE UI (Already Implemented)

The store is fully implemented with:
- ✅ Epic gradient styling
- ✅ Complete Library showcase with shimmer effect
- ✅ Bundle displays with savings badges
- ✅ Individual theme cards with ceremony previews
- ✅ Beneficiary slot tiers
- ✅ Purchase progress tracking
- ✅ Owned themes display
- ✅ Loading states and error handling

**Access:** Settings (gear icon) → Store

---

## 💰 REVENUE MODEL SUMMARY

### Price Tiers:
- **Impulse Buy ($0.99):** 7 themes
- **Mid-Tier ($1.99):** 3 themes + 1 slot tier
- **Flagship ($2.99):** 1 premium theme
- **Bundles ($1.99–$9.99):** 4 bundles
- **Beneficiary Slots ($0.99–$4.99):** 3 tiers

### Best Value Propositions:
1. **Complete Library:** $9.99 (saves $3.96 vs individual)
2. **Life Milestones Bundle:** $5.99 (saves $2.96)
3. **+3 Beneficiary Slots:** $1.99 (best per-slot value)

### Upsell Opportunities:
- Individual themes → Bundle
- Bundle → Complete Library
- 1 slot → 3 slots → Unlimited

---

## ❓ TROUBLESHOOTING

### Issue: "Product not yet configured" error
**Solution:** Verify Price ID is not `price_REPLACE_ME` in code

### Issue: Webhook not receiving events
**Solution:** 
1. Check endpoint URL matches exactly
2. Verify `STRIPE_WEBHOOK_SECRET` environment variable is set
3. Check webhook event types include `checkout.session.completed`

### Issue: Payment succeeds but theme doesn't unlock
**Solution:** 
1. Check Supabase logs for webhook errors
2. Verify database tables exist
3. Check RLS policies allow inserts
4. Verify bundle theme mappings are correct

### Issue: Price mismatch
**Solution:** Ensure `price` values in code match Stripe product prices

---

## 📞 SUPPORT RESOURCES

- **Stripe Documentation:** https://stripe.com/docs
- **Stripe Dashboard:** https://dashboard.stripe.com/
- **Webhook Testing:** https://stripe.com/docs/webhooks/test
- **Checkout Sessions:** https://stripe.com/docs/payments/checkout

---

## ✅ FINAL NOTES

1. **All code is production-ready** – just needs Price IDs
2. **Database structure is complete** with RLS policies
3. **Webhook handlers are robust** with error handling
4. **Store UI is polished** with epic styling
5. **Legal docs updated** (Terms v7.0, Privacy v6.0)

**You're ready to launch! 🚀**

Just create the 18 products in Stripe, copy the Price IDs, paste them into the code template above, and deploy!
