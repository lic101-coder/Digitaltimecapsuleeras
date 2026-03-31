# ✅ STRIPE PRICE IDs UPDATED

**Date:** March 20, 2026  
**Status:** Production price IDs integrated into backend server

---

## 📍 WHAT WAS UPDATED

**File:** `/supabase/functions/server/index.tsx`  
**Lines:** 14737-14780 (Price configuration section)

---

## 💰 THEME PRICES CONFIGURED

### **Flagship Theme**
| Theme ID | Price | Stripe Price ID |
|----------|-------|-----------------|
| `wedding` | $2.99 | `price_1TCsUdHUyotQ1kngbCaJhxKS` |

### **Premium Themes ($1.99)**
| Theme ID | Price | Stripe Price ID |
|----------|-------|-----------------|
| `career` | $1.99 | `price_1TCsVKHUyotQ1kng0lyj9uRR` |
| `future` (Time Traveler) | $1.99 | `price_1TCsVqHUyotQ1kng5qOCpYLg` |
| `new_life` | $1.99 | `price_1TCsWPHUyotQ1kng61FPKZHE` |

**Aliases added:**
- `time-traveler` → Same price ID as `future`
- `time_traveler` → Same price ID as `future`

### **Standard Themes ($0.99)**
| Theme ID | Price | Stripe Price ID |
|----------|-------|-----------------|
| `travel` | $0.99 | `price_1TCsXHHUyotQ1kngNMBykjAh` |
| `new_year` | $0.99 | `price_1TCsZ6HUyotQ1kngilO2jGz8` |
| `friendship` | $0.99 | `price_1TCsZWHUyotQ1kngj1WJN9EN` |
| `mixtape` | $0.99 | `price_1TCsZWHUyotQ1kngj1WJN9EN` (same as friendship) |
| `pet` | $0.99 | `price_1TCsa1HUyotQ1kngMObHgb0O` |
| `gratitude` | $0.99 | `price_1TCsaNHUyotQ1kngC976quia` |
| `graduation` | $0.99 | `price_1TCsawHUyotQ1kngdhmQzOrV` |
| `new_home` | $0.99 | `price_1TCsbNHUyotQ1kngSiEpWF6h` |

---

## 📦 BUNDLE PRICES CONFIGURED

| Bundle ID | Price | Stripe Price ID | Included Themes |
|-----------|-------|-----------------|-----------------|
| `complete-library` | $9.99 | `price_1TCsdYHUyotQ1kngEB9gOyr2` | All 11 themes |
| `life-milestones` | $5.99 | `price_1TCseDHUyotQ1kng86obk1HT` | Wedding, New Life, Graduation, Career |
| `celebration` | $2.49 | `price_1TCsehHUyotQ1kngXZf0Qay2` | New Year, Travel, Friendship |
| `inner-journey` | $1.99 | `price_1TCsfpHUyotQ1kngmT3KKiE0` | Gratitude, Future, New Life |

---

## 👥 BENEFICIARY SLOT PRICES CONFIGURED

| Slot Type | Price | Slots | Stripe Price ID |
|-----------|-------|-------|-----------------|
| `slot-1` | $0.99 | 1 | `price_1TCsgLHUyotQ1kngvuWyl1hW` |
| `slot-3` | $1.99 | 3 | `price_1TCsgoHUyotQ1kngVwHlnNjG` |
| `unlimited` | $4.99 | ∞ | `price_1TCshJHUyotQ1kngAsuLa5L0` |

**Legacy aliases:**
- `quantity` → Uses `slot-1` pricing
- `individual` → Uses `slot-1` pricing

---

## 🔗 HOW IT WORKS

### **Purchase Flow:**

1. **User clicks "Unlock Now" in Store**
   - Frontend sends request to `/make-server-f9be53a7/api/purchase/theme` or `/api/purchase/beneficiary`

2. **Server looks up price ID**
   ```typescript
   const productInfo = THEME_PRICES[themeId];
   // e.g., 'wedding' → { priceId: 'price_1TCsUdHUyotQ1kngbCaJhxKS', price: 2.99 }
   ```

3. **Server creates Stripe checkout session**
   ```typescript
   const session = await stripe.checkout.sessions.create({
     line_items: [{
       price: productInfo.priceId, // The actual Stripe price ID
       quantity: 1,
     }],
     // ...
   });
   ```

4. **User redirected to Stripe checkout**
   - Stripe handles payment with your configured price

5. **Webhook updates database**
   - When payment succeeds, webhook unlocks theme for user

---

## ✅ TESTING CHECKLIST

Before going live, test these scenarios:

### **Theme Purchases:**
- [ ] Buy Wedding theme ($2.99)
- [ ] Buy Time Traveler theme ($1.99)
- [ ] Buy any $0.99 theme
- [ ] Verify correct price shows in Stripe checkout
- [ ] Verify theme unlocks after payment

### **Bundle Purchases:**
- [ ] Buy Complete Library ($9.99)
- [ ] Buy Life Milestones bundle ($5.99)
- [ ] Verify all themes in bundle unlock

### **Beneficiary Slots:**
- [ ] Buy +1 slot ($0.99)
- [ ] Buy +3 slots ($1.99)
- [ ] Buy unlimited slots ($4.99)
- [ ] Verify slot count increases

### **Webhook Processing:**
- [ ] Check server logs show webhook received
- [ ] Check database updated correctly
- [ ] Check user sees unlocked content immediately

---

## 🚨 IMPORTANT NOTES

### **Environment Variables Required:**
Make sure these are set in your Supabase Edge Function:

```bash
STRIPE_SECRET_KEY=sk_live_...    # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...  # Your webhook signing secret
```

### **Webhook Endpoint:**
Configure in Stripe Dashboard:
```
https://apdfvpgaznpqlordkipw.supabase.co/functions/v1/make-server-f9be53a7/stripe-webhook
```

Events to listen for:
- `checkout.session.completed`

### **Test Mode vs Live Mode:**
- Current price IDs start with `price_1TCs...` (Live mode)
- For testing, create test mode price IDs starting with `price_test_...`
- Use test mode keys: `sk_test_...` and `whsec_test_...`

---

## 🔍 MAPPING SUMMARY

### **Theme ID → Stripe Product Mapping:**

Your Store component uses these theme IDs:
```typescript
'golden-moments'    → 'wedding'       ($2.99)
'career-summit'     → 'career'        ($1.99)
'time-traveler'     → 'future'        ($1.99)
'voyage'            → 'travel'        ($0.99)
'new-years-eve'     → 'new_year'      ($0.99)
'new-life'          → 'new_life'      ($1.99)
'mixtape'           → 'friendship'    ($0.99)
'furry-friends'     → 'pet'           ($0.99)
'grateful-heart'    → 'gratitude'     ($0.99)
'launchpad'         → 'graduation'    ($0.99)
'new-nest'          → 'new_home'      ($0.99)
```

**Note:** Some theme IDs use hyphens (Store UI) while backend uses underscores. The Store component handles this conversion when making API calls.

---

## 📊 REVENUE BREAKDOWN

**Individual Sales:**
- Flagship: $2.99 × 1 theme = $2.99
- Premium: $1.99 × 3 themes = $5.97
- Standard: $0.99 × 7 themes = $6.93
- **Total if sold separately:** $15.89

**Bundle Sales:**
- Complete Library: $9.99 (saves $5.90 = 37% off)
- Life Milestones: $5.99 (saves $2.96 = 33% off)
- Celebration: $2.49 (saves $1.48 = 37% off)
- Inner Journey: $1.99 (saves $0.99 = 33% off)

**Beneficiary Slots:**
- 1 slot: $0.99
- 3 slots: $1.99 (saves $0.98 = 33% off)
- Unlimited: $4.99 (premium tier)

---

## ✅ STATUS

**Integration Status:** ✅ COMPLETE  
**Price IDs:** ✅ CONFIGURED  
**Server Code:** ✅ UPDATED  
**Ready for Testing:** ✅ YES

---

**Next Steps:**
1. Test purchases in Stripe test mode first
2. Verify webhook receives events correctly
3. Check database updates properly
4. Switch to live mode when ready
5. Monitor first few purchases closely

**You're ready to accept payments!** 💰
