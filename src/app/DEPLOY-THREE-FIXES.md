# 🚀 DEPLOY: THREE FIXES

## ⚡ QUICK DEPLOY (2 minutes)

### **Step 1: Deploy Server Function**
```bash
supabase functions deploy make-server-f9be53a7
```

That's it! All fixes are in the server function. Frontend changes are already live (no backend deployment needed).

---

## ✅ VERIFICATION TESTS

### **Test 1: Beneficiary Slot Count (2 min)**

**Scenario A: Buy +1 Slot**
1. Go to Store → Beneficiaries
2. Click "+1 Slot" → Complete purchase
3. Go to Settings → Legacy Access
4. **Expected:** "👥 0 of **2** slots used" ✅

**Scenario B: Buy +3 Slots**
1. Go to Store → Beneficiaries
2. Click "+3 Slots" → Complete purchase
3. Go to Settings → Legacy Access
4. **Expected:** "👥 0 of **4** slots used" (if you had 1 before) ✅

**Scenario C: Buy Unlimited**
1. Go to Store → Beneficiaries
2. Click "Unlimited" → Complete purchase
3. Go to Settings → Legacy Access
4. **Expected:** "♾️ Unlimited slots — add as many as you need" ✅

---

### **Test 2: Complete Library Wording (30 sec)**

1. Go to Store
2. Scroll to "Complete Theme Library" card
3. **Expected to see:**
   ```
   Complete Theme Library
   All 11 themes, unlimited ceremonies
   
   ✅ All 11 premium themes
   ✅ 33 VFX ceremonies
   ✅ Lifetime theme access
   ℹ️ Does not include beneficiary slots  ← NEW!
   ```
4. **Verify:**
   - Last bullet has blue Info icon (not green checkmark)
   - Last bullet is italicized and gray
   - Tagline says "All 11 themes, unlimited ceremonies" (not "Unlock everything, forever")

---

### **Test 3: No Theme Flicker (1 min)**

**Setup:**
1. Buy any theme (or use test account with purchased themes)

**Test:**
1. Go to Home
2. Click "Compose" button
3. **Watch the theme grid carefully**
4. **Expected:** Purchased themes appear immediately with NO lock icon ✅
5. **No flicker:** Lock icons should NEVER appear on purchased themes

**Before Fix:** 
```
🔒 Theme appears locked → ✨ Suddenly unlocks (flicker!)
```

**After Fix:**
```
✅ Theme appears unlocked immediately (no flicker)
```

---

## 📊 CHECK SERVER LOGS

After deploying, check logs for better debugging:

```bash
supabase functions logs make-server-f9be53a7
```

**Look for these new log lines:**

### **Beneficiary Limit Calculation:**
```
👥 [Purchases] User has UNLIMITED beneficiaries
```
or
```
👥 [Purchases] Beneficiary limit calculated: 1 (free) + 3 (purchased) = 4
✅ [Purchases] Final beneficiary limit: 4
```

### **Checkout Creation:**
```
💳 [Beneficiary] Creating checkout for user ... (type: slot-1, slots: 1)
💳 [Beneficiary] Creating checkout for user ... (type: slot-3, slots: 3)
💳 [Beneficiary] Creating checkout for user ... (type: unlimited, slots: -1)
```

### **Webhook Processing:**
```
👥 Processing beneficiary purchase: slot-1 for user ...
📊 Slots: 1
✅ Beneficiary purchase complete: 1 slots
```
or
```
📊 Slots: UNLIMITED
✅ Beneficiary purchase complete: UNLIMITED slots
```

---

## 🐛 TROUBLESHOOTING

### **Issue: Still seeing "0 of 1 slot used"**

**Check:**
1. Did you deploy the server? `supabase functions deploy make-server-f9be53a7`
2. Is the purchase in the database?
   ```sql
   SELECT * FROM beneficiary_purchases WHERE user_id = 'your-user-id';
   ```
3. Check server logs for beneficiary limit calculation

**Fix:** Redeploy server function

---

### **Issue: Complete Library still says "Unlock everything, forever"**

**Check:**
1. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Check `/components/Store.tsx` line 539

**Fix:** The frontend changes are already in the code, just refresh!

---

### **Issue: Themes still flicker**

**Check:**
1. Hard refresh the page
2. Open DevTools → Network tab
3. Watch for `/api/store/purchases` API call
4. Check if `purchasedThemesLoading` state is working

**Fix:** The frontend changes are already in the code, just refresh!

---

## 📝 FILES CHANGED

All changes are FRONTEND ONLY (no backend deployment needed except server function):

1. ✅ `/supabase/functions/server/index.tsx` (lines 15343-15355)
   - Fixed beneficiary limit calculation
   - Better logging

2. ✅ `/components/Store.tsx` (lines 538-547)
   - Updated Complete Library wording
   - Added "Does not include beneficiary slots" with Info icon

3. ✅ `/components/CreateCapsule.tsx` (lines 1439, 204-233, 4386)
   - Added `purchasedThemesLoading` state
   - Track loading in useEffect

4. ✅ `/components/capsule-themes/ThemeSelector.tsx` (lines 9-11, 19, 71-74)
   - Accept `purchasedThemesLoading` prop
   - Don't show locks while loading

---

## 🎯 SUCCESS CRITERIA

After deployment, ALL of these should be TRUE:

- [ ] Deploying server function succeeds
- [ ] Buy +1 slot → Shows "0 of 2 slots used"
- [ ] Buy +3 slots → Shows "0 of 4 slots used"
- [ ] Buy unlimited → Shows "♾️ Unlimited slots"
- [ ] Complete Library says "Does not include beneficiary slots"
- [ ] Complete Library tagline is "All 11 themes, unlimited ceremonies"
- [ ] Purchased themes appear immediately (no flicker)
- [ ] Server logs show new beneficiary calculation logs
- [ ] No errors in browser console
- [ ] No errors in server logs

---

## 🎉 DONE!

Once all tests pass, you're good to go! 

**Total deployment time: ~2 minutes**
- 1 minute: Deploy server function
- 1 minute: Run all tests

**Want to add the Ultimate Bundle?** See `/THREE-FIXES-COMPLETE.md` for full implementation guide! 💎
