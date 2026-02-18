# 🔥 QUICK TEST CARD: Email Deliverability Fixes

## ⚡ **5-MINUTE TEST CHECKLIST**

### **Test 1: Mail-Tester.com (2 min)**
```
✅ Steps:
1. Go to https://www.mail-tester.com/
2. Copy their email address
3. Send referral invite to that email
4. Check score (must be 8/10+)

✅ What to verify:
- Score 8/10 or higher ✓
- List-Unsubscribe header present ✓
- SPF/DKIM/DMARC all passing ✓
- No spam trigger words ✓
```

---

### **Test 2: Unsubscribe Flow (2 min)**
```
✅ Steps:
1. Send yourself a referral invite
2. Click "Unsubscribe" link in email footer
3. Lands on /unsubscribe page (email pre-filled) ✓
4. Click "Confirm Unsubscribe"
5. See green checkmark success message ✓
6. Try sending another invite to same email
7. Should get error: "opted out of referral invitations" ✓
```

---

### **Test 3: Email Headers (1 min)**
```
✅ In Gmail:
1. Open test email
2. Click "..." → "Show original"
3. Search for "List-Unsubscribe"
4. Should see: <https://www.erastimecapsule.com/unsubscribe?email=...>

✅ Look for these headers:
- List-Unsubscribe ✓
- List-Unsubscribe-Post ✓
- X-Entity-Ref-ID ✓
- Precedence: bulk ✓
```

---

## 🎯 **VISUAL CHECKS**

### **Email Appearance:**
```
From: Eras (NOT "via Eras") ✓
Subject: [Name] invited you to Eras ✓
Preview: [Name] invited you to preserve memories... ✓
Footer: Purple "Unsubscribe" link ✓
```

---

## ⚠️ **CRITICAL: DNS VERIFICATION**

**BEFORE TESTING - CHECK THIS FIRST:**

```
1. Go to Resend Dashboard → Domains → erastimecapsule.com
2. ALL must show "Verified":
   - SPF Record ✓
   - DKIM Record ✓
   - DMARC Record ✓

If ANY are missing → Emails WILL go to spam!
```

---

## 🚨 **TROUBLESHOOTING**

### **Score < 8/10 on mail-tester.com**
→ Check DNS records in Resend
→ Wait 24 hours after DNS changes
→ Review error messages from mail-tester

### **Emails still going to spam**
→ Verify DNS records (most common issue)
→ Following warm-up schedule? (max 10/day week 1)
→ Check sender reputation at Google Postmaster

### **Unsubscribe page not loading**
→ Clear browser cache
→ Try: https://www.erastimecapsule.com/unsubscribe?email=test@test.com
→ Check browser console for errors

### **Unsubscribe not blocking emails**
→ Check server logs for "unsubscribe list"
→ Email stored in lowercase?
→ Backend returning correct error?

---

## 📊 **SUCCESS CRITERIA**

| Check | Pass |
|-------|------|
| Mail-tester score > 8/10 | [ ] |
| List-Unsubscribe header present | [ ] |
| Sender shows "Eras" not "via" | [ ] |
| Unsubscribe flow works | [ ] |
| Unsubscribed emails blocked | [ ] |
| DNS records verified | [ ] |

**All checks passed?** → Ready to send! 🚀

---

## 🎯 **QUICK REFERENCE**

**Test Email:** mail-tester.com address
**Unsubscribe URL:** `/unsubscribe?email=test@test.com`
**Backend Endpoint:** `/api/referrals/unsubscribe`
**KV Storage Key:** `referral_unsubscribe_list`
**Rate Limit:** 10 emails/day (week 1)

---

## 💡 **PRO TIPS**

1. **Always test on mail-tester.com first**
2. **Check DNS before troubleshooting anything else**
3. **Follow warm-up schedule religiously**
4. **Monitor Google Postmaster Tools weekly**
5. **Keep unsubscribe rate < 1%**

---

**Implementation Status:** ✅ COMPLETE
**Ready to Test:** ✅ YES
**Deployment Required:** ✅ YES
**DNS Verified:** ⚠️ CHECK THIS FIRST
