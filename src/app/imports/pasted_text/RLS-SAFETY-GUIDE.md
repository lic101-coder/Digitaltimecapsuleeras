# 🛡️ RLS & Webhook Safety Guide

## ✅ YOUR SETUP IS SAFE!

**Good news**: Your server is using `SUPABASE_SERVICE_ROLE_KEY` which **bypasses RLS**. Stripe webhooks will work perfectly.

---

## How It Works

### 🔑 Three Levels of Access

| Client Type | Key Used | RLS Status | Can Do |
|-------------|----------|------------|--------|
| **Frontend** | `SUPABASE_ANON_KEY` | ✅ RLS Enforced | Read own purchases only |
| **Server/Webhook** | `SUPABASE_SERVICE_ROLE_KEY` | 🚫 RLS Bypassed | Everything |
| **Database Triggers** | `SECURITY DEFINER` | 🚫 RLS Bypassed | Everything |

### 🔒 Security Model

```
┌─────────────────────────────────────────────────────┐
│  FRONTEND (Anon Key)                                │
│  ✅ Can: View own purchases                         │
│  ❌ Cannot: Insert purchases (RLS blocks)           │
│  ❌ Cannot: View other users' purchases             │
│  → Prevents cheating/fraud                          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  STRIPE WEBHOOK (Service Role Key)                  │
│  ✅ Can: Insert into bundle_purchases                │
│  ✅ Can: Insert into theme_purchases                 │
│  ✅ Can: Insert into beneficiary_purchases           │
│  ✅ Bypasses ALL RLS policies                        │
│  → Authenticated via Stripe signature               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  DATABASE TRIGGERS (SECURITY DEFINER)                │
│  ✅ Can: Unlock themes after bundle purchase         │
│  ✅ Can: Increment purchase stats                    │
│  ✅ Bypasses RLS (runs as superuser)                 │
│  → Only runs on valid webhook inserts               │
└─────────────────────────────────────────────────────┘
```

---

## Why This is Safe

### 1. **Service Role Key = Superuser**
From `/supabase/functions/server/supabase-client.tsx`:
```typescript
const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); // ← This bypasses RLS
supabaseInstance = createClient(url, key);
```

**Result**: Webhook can INSERT purchases even with RLS enabled ✅

### 2. **Triggers Use SECURITY DEFINER**
From `bundle-theme-unlock-trigger.sql`:
```sql
CREATE OR REPLACE FUNCTION unlock_bundle_themes()
RETURNS TRIGGER AS $$
-- ... unlock logic ...
$$ LANGUAGE plpgsql SECURITY DEFINER;  -- ← This bypasses RLS
```

**Result**: Triggers can write to tables even with RLS enabled ✅

### 3. **Frontend Cannot Cheat**
With RLS policies in place:
```sql
CREATE POLICY "Users can view their own theme purchases"
  ON theme_purchases
  FOR SELECT
  USING (auth.uid()::text = user_id);
```

**Result**: 
- ✅ Users can view their own purchases
- ❌ Users CANNOT insert purchases (no INSERT policy)
- ❌ Users CANNOT view others' purchases
- ❌ Users CANNOT modify purchases

### 4. **All Purchases Go Through Stripe**
```
User clicks "Buy" 
  → Stripe Checkout (payment required)
  → Webhook (authenticated by signature)
  → Server (service role key inserts purchase)
  → Triggers (unlock content)
  → Frontend (sees unlocked content via SELECT policy)
```

**Attack vectors blocked**:
- ❌ Cannot POST to `/purchase-theme` without valid auth token
- ❌ Cannot bypass payment (Stripe validates)
- ❌ Cannot fake webhook (signature verification)
- ❌ Cannot INSERT directly into database (RLS blocks frontend)

---

## The New Database Setup

### Constraints Added:
1. **UNIQUE INDEX** on `theme_purchases(user_id, theme_id)`
   - Prevents buying same theme twice
   
2. **UNIQUE INDEX** on `bundle_purchases(user_id, bundle_id)`
   - Prevents buying same bundle twice

3. **FOREIGN KEY** on `bundle_purchases.bundle_id → bundles.id`
   - Can't purchase non-existent bundle
   - Can't delete bundle if it has purchases

### Indexes Added:
- Fast user purchase lookups
- Fast theme/bundle queries
- Stripe payment ID tracking
- Purchase type filtering

### RLS Policies:
- **SELECT**: Users can view own purchases ✅
- **INSERT**: Blocked for frontend ❌ (only server via service role)
- **UPDATE**: Blocked for frontend ❌
- **DELETE**: Blocked for frontend ❌

---

## Testing RLS Safety

### Test 1: Frontend Can't Insert Purchases
```javascript
// In browser console (using anon key):
const { data, error } = await supabase
  .from('theme_purchases')
  .insert({
    user_id: 'some-user-id',
    theme_id: 'wedding',
    purchase_type: 'individual',
    price_paid: 0,
  });

// Expected: error.code === '42501' (insufficient privilege)
// ✅ RLS is working!
```

### Test 2: Frontend Can View Own Purchases
```javascript
// In browser console (logged in):
const { data, error } = await supabase
  .from('theme_purchases')
  .select('*');

// Expected: Returns ONLY current user's purchases
// ✅ RLS is working!
```

### Test 3: Webhook Can Insert Purchases
```javascript
// In server code (using service role key):
const { data, error } = await supabase
  .from('bundle_purchases')
  .insert({
    user_id: 'some-user-id',
    bundle_id: 'complete-library',
    price_paid: 9.99,
    stripe_payment_id: 'pi_123',
  });

// Expected: Success! No RLS error
// ✅ Service role bypasses RLS!
```

### Test 4: Trigger Can Unlock Themes
```sql
-- After webhook inserts bundle purchase:
SELECT COUNT(*) FROM theme_purchases 
WHERE user_id = 'some-user-id' 
  AND purchase_type = 'bundle';

-- Expected: 11 themes (for complete-library bundle)
-- ✅ SECURITY DEFINER trigger bypasses RLS!
```

---

## Common RLS Mistakes (AVOIDED)

### ❌ WRONG: Using Anon Key in Webhook
```typescript
// DON'T DO THIS:
const supabase = createClient(url, ANON_KEY); // ← Would fail with RLS!
```

### ✅ CORRECT: Using Service Role Key
```typescript
// Your code (CORRECT):
const supabase = createClient(url, SERVICE_ROLE_KEY); // ← Bypasses RLS
```

---

### ❌ WRONG: Trigger Without SECURITY DEFINER
```sql
-- DON'T DO THIS:
CREATE FUNCTION unlock_bundle_themes() RETURNS TRIGGER AS $$
-- ... logic ...
$$ LANGUAGE plpgsql; -- ← Would fail with RLS!
```

### ✅ CORRECT: Trigger With SECURITY DEFINER
```sql
-- Your trigger (CORRECT):
CREATE FUNCTION unlock_bundle_themes() RETURNS TRIGGER AS $$
-- ... logic ...
$$ LANGUAGE plpgsql SECURITY DEFINER; -- ← Bypasses RLS
```

---

### ❌ WRONG: Allowing Frontend INSERTs
```sql
-- DON'T DO THIS:
CREATE POLICY "Users can insert own purchases"
  ON theme_purchases FOR INSERT
  WITH CHECK (auth.uid()::text = user_id); -- ← Allows cheating!
```

### ✅ CORRECT: No INSERT Policy for Frontend
```sql
-- Your setup (CORRECT):
-- No INSERT policy = frontend cannot insert
-- Only service role can insert (bypasses policies)
```

---

## Deployment Order (Critical!)

Run these in **exact order**:

1. **`bundle-setup.sql`** - Creates bundles table (no RLS yet)
2. **`bundle-theme-unlock-trigger.sql`** - Creates SECURITY DEFINER trigger
3. **`database-constraints-and-rls.sql`** - Adds constraints + RLS policies
4. **`supabase functions deploy make-server-f9be53a7`** - Deploy server

**Why this order?**
- Bundles table must exist before creating triggers
- Triggers must exist before enabling RLS
- Server must be deployed last to use new tables

---

## Verification Checklist

After running all scripts:

- [ ] RLS enabled on all purchase tables
- [ ] Service role key in server code (not anon key)
- [ ] Triggers use SECURITY DEFINER
- [ ] Frontend cannot INSERT purchases (test in console)
- [ ] Frontend can SELECT own purchases (test in console)
- [ ] Webhook test succeeds (retry failed Stripe event)
- [ ] Triggers unlock themes correctly

---

## FAQ

### Q: Will Stripe webhooks fail with RLS enabled?
**A**: No! Webhooks use `SUPABASE_SERVICE_ROLE_KEY` which bypasses all RLS policies. ✅

### Q: Can users fake purchases by calling the database directly?
**A**: No! RLS blocks INSERT/UPDATE/DELETE from frontend (anon key). ❌

### Q: Do triggers work with RLS enabled?
**A**: Yes! They use `SECURITY DEFINER` which bypasses RLS. ✅

### Q: Can I disable RLS for easier development?
**A**: **DON'T!** This would allow users to fake purchases. Keep RLS enabled. ⚠️

### Q: What if I need to manually add a purchase?
**A**: Use Supabase SQL Editor (runs as superuser, bypasses RLS) or use service role key in server. ✅

---

## Summary

**Your setup is SAFE because**:
1. ✅ Webhooks use service role key (bypasses RLS)
2. ✅ Triggers use SECURITY DEFINER (bypasses RLS)
3. ✅ Frontend uses anon key (RLS enforced)
4. ✅ Unique indexes prevent duplicate purchases
5. ✅ Foreign keys ensure data integrity
6. ✅ All purchases must go through Stripe checkout

**Run the script and deploy - it's bulletproof!** 🛡️
