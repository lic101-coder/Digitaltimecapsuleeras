# Referral System Testing Guide

## 🎯 How The Referral System Works

The referral system tracks when users invite friends and rewards them with achievements:

1. **Referrer** (you) sends invite link to friend
2. **Friend** clicks link and signs up
3. **Friend** creates their first capsule  
4. **Referrer** earns achievement + exclusive horizon unlock

## 📊 Achievement Milestones

| Referrals | Achievement | Horizon Unlock | Rarity |
|-----------|-------------|----------------|--------|
| 1 friend | Time Keeper | Stardust Drift Horizon | Common |
| 5 friends | Legacy Builder | Eternal Aurora Horizon | Rare |
| 10 friends | Horizon Architect | Supernova Bloom Horizon | Epic |
| 25 friends | Infinity Architect | Infinity Nexus Horizon | Legendary |

## 🧪 Testing Instructions

### Step 1: Get Your Referral Link

1. Log into your account at https://www.erastimecapsule.com
2. Navigate to **Community → Share & Earn**
3. Copy your personal referral link (should look like: `https://www.erastimecapsule.com/join/lenn14d1`)

### Step 2: Test With New User

**IMPORTANT:** You need to test with a **completely new user** who has never signed up before.

#### Option A: Use Incognito/Private Browsing

1. Open a **new incognito/private browser window**
2. Paste your referral link: `https://www.erastimecapsule.com/join/YOUR_CODE`
3. Open browser console (F12)
4. Look for: `🎯 [Referral] Captured referral code from URL: YOUR_CODE`

#### Option B: Ask a Real Friend

1. Send your referral link to a friend via email/text
2. Ask them to:
   - Click the link
   - Open browser console (F12) 
   - Sign up with Google or email
   - Create their first time capsule

### Step 3: Watch Console Logs

#### When New User Lands on Page:
```
🎯 [Referral] Captured referral code from URL: lenn14d1
💾 [Referral] Stored referral code in sessionStorage
```

#### When New User Signs Up (OAuth):
```
🎯 [Referral] Preserved referral code for OAuth: lenn14d1
🎯 [Referral] OAuth new user signed up via referral code: lenn14d1
🎯 [Referral] Calling track-signup endpoint for new user ID: xxx
✅ [Referral] OAuth signup tracked successfully!
📊 [Referral] Referrer now has X total signups
```

#### When New User Creates First Capsule:
```
🎯 [Referral] handleCapsuleCreated called - checking referral status
🎯 [Referral] Calling check-achievement after capsule creation
🎯 [Referral] check-achievement response status: 200
🎯 [Referral] check-achievement response data: {referred: true, ...}
🎯 [Referral] User was referred but no achievements unlocked yet
```

### Step 4: Check Your Account (Referrer)

1. Log back into YOUR account
2. Go to **Community → Share & Earn**
3. Check "Friends Joined" counter - should be 1
4. After friend creates capsule, you should see achievement unlock notification!

## 🐛 Troubleshooting

### Issue: "No referral code found in console"

**Problem:** URL parameter wasn't captured  
**Fix:** Make sure you're using the EXACT link from Share & Earn page, including `/join/` path

### Issue: "User signed up but no signup tracked"

**Problem:** sessionStorage was cleared or referral code wasn't preserved  
**Check logs for:**
- `💾 [Referral] Stored referral code in sessionStorage`
- `🎯 [Referral] Preserved referral code for OAuth`

### Issue: "Friends Joined shows 0 even after signup"

**Problem:** New user hasn't created their first capsule yet  
**Solution:** The milestone only counts when friend creates their first capsule

### Issue: "Capsule created but no achievement unlocked"

**Possible causes:**
1. You're testing with YOUR account (you can't refer yourself!)
2. New user already existed in the system
3. Check console for error messages starting with `❌ [Referral]`

## 📝 What To Share When Reporting Issues

If the referral system isn't working, please share:

1. **All console logs** that start with `🎯 [Referral]` or `❌ [Referral]`
2. **Which step** is failing (URL capture, signup tracking, or achievement unlock)
3. **User type** (new OAuth user, existing user, etc.)
4. **Expected vs Actual** behavior

## ✅ Success Checklist

- [ ] Referral code captured from URL on page load
- [ ] Referral code preserved in sessionStorage
- [ ] New user signup tracked (see "total signups" in log)
- [ ] New user creates first capsule
- [ ] check-achievement endpoint called successfully
- [ ] Referrer receives achievement notification
- [ ] "Friends Joined" counter increases in dashboard
- [ ] Exclusive horizon unlocked in Horizon Gallery

## 🚀 Next Steps After Testing

Once you confirm the system works:

1. **Share your link** with real friends/colleagues
2. **Monitor progress** in Community → Share & Earn
3. **Unlock exclusive horizons** by reaching milestones
4. **Provide feedback** on any issues or improvements
