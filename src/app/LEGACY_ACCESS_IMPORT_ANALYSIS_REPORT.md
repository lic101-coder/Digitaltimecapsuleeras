# LEGACY ACCESS FOLDER IMPORT SYSTEM - COMPREHENSIVE ANALYSIS REPORT

**Date:** April 2, 2026  
**Status:** Analysis Complete - Awaiting Approval  
**Current System:** Token-based external vault access  
**Proposed System:** Automatic folder import into recipient's vault

---

## EXECUTIVE SUMMARY

The current legacy access system requires beneficiaries to visit an external URL with a token to view folders/media. This report analyzes how to **seamlessly import folders directly into the recipient's Eras vault** at the date/time chosen by the original user, **with minimal changes to existing infrastructure**.

**Key Finding:** The system is 95% ready. We can leverage the existing token-based notification system and simply change what happens when the beneficiary "claims" their inheritance.

---

## CURRENT SYSTEM ARCHITECTURE

### 1. **Beneficiary Assignment Flow**
```
User adds beneficiary → 2 notification timing options:
├─ "Notify Now" (immediate) - sends verification email with 30-day token
└─ "Notify Later" (deferred) - waits until unlock trigger fires
```

**Data Flow:**
1. Beneficiary data stored in KV store: `legacy_access_{userId}`
2. Contains: `{ name, email, status, folderPermissions: { folderId: 'view'|'download'|'full' } }`
3. Token generated: `tok_{timestamp}_{random}` 
4. Token stored separately: `unlock_token_{tokenId}`

### 2. **Current Access Flow (External Vault)**
```
Unlock Trigger Fires
  ↓
System generates access token → tok_1766786331086_5ulsu636psv
  ↓
Email sent to beneficiary with link: 
  /legacy-vault/access?token=tok_1766786331086_5ulsu636psv
  ↓
BeneficiaryVaultAccess component renders
  ↓
Validates token via: /api/legacy-access/unlock/validate-full
  ↓
Returns: { folders: [], ownerName, personalMessage, expiresAt }
  ↓
Beneficiary views folders in isolated interface
```

**Key Files:**
- `/components/BeneficiaryVaultAccess.tsx` - External vault viewer
- `/supabase/functions/server/legacy-access-service.tsx` - Token generation & validation
- `/supabase/functions/server/index.tsx` - API routes (lines 12695+)

### 3. **Token Structure**
```typescript
interface UnlockToken {
  tokenId: string;          // "tok_1766786331086_5ulsu636psv"
  userId: string;           // Original owner's ID
  beneficiaryId: string;    // Beneficiary record ID
  unlockType: 'grace_period_expired' | 'manual_date' | 'user_triggered';
  createdAt: number;
  expiresAt: number;        // Current: 1 year from unlock
  usedAt?: number;          // Timestamp when beneficiary claimed
  folderPermissions?: { [folderId: string]: 'view' | 'edit' }
}
```

---

## PROPOSED SYSTEM: AUTO-IMPORT TO RECIPIENT VAULT

### **Core Concept: "Claim & Import" Instead of "External View"**

Instead of viewing folders externally, beneficiaries **claim their inheritance**, which:
1. Creates **read-only copies** of folders in their vault (marked as "Legacy" or "Inherited")
2. Copies media references (signed URLs remain valid)
3. Preserves original owner's folder structure
4. Happens **automatically** at the date/time of original user's choosing

---

## IMPLEMENTATION PLAN (MINIMAL CHANGES)

### **Phase 1: Database Schema (NEW - But Minimal)**

Add a new field to track imported folders in recipient's vault:

```sql
-- Add to existing folder/capsule tables (or KV store equivalent)
{
  folderId: string,
  userId: string,           // Recipient's user ID
  name: string,
  isInherited: boolean,     // NEW: Mark as inherited folder
  inheritedFrom: {          // NEW: Track original owner
    userId: string,
    userName: string,
    inheritedAt: number,
    originalFolderId: string
  },
  legacyAccess: {           // Already exists
    mode: 'global' | 'custom' | 'none',
    ...
  }
}
```

**Storage:** Can use existing KV store pattern - no PostgreSQL changes needed!
- Key: `folder:inherited:{recipientUserId}:{originalUserId}_{folderId}`
- Uses existing folder structure, just adds metadata

### **Phase 2: Modify Token "Redemption" Logic**

**Current Route:** `/api/legacy-access/unlock/validate-full`  
**Location:** `/supabase/functions/server/index.tsx` (line ~12695)

**What Changes:**
```typescript
// CURRENT: Returns vault data for viewing
app.post("/api/legacy-access/unlock/validate-full", async (c) => {
  // Validates token
  // Returns: { ownerName, folders[], personalMessage, expiresAt }
  // Used by: BeneficiaryVaultAccess component (external viewer)
});

// PROPOSED: Add new "claim" endpoint
app.post("/api/legacy-access/unlock/claim", async (c) => {
  const { token, recipientUserId } = await c.req.json();
  
  // 1. Validate token (reuse existing validation logic)
  const validation = await validateUnlockToken(token);
  
  // 2. Get folders and permissions from token
  const folders = await getFoldersForBeneficiary(
    validation.userId, 
    validation.beneficiaryId
  );
  
  // 3. FOR EACH FOLDER: Create inherited copy in recipient's vault
  for (const folder of folders) {
    const inheritedFolder = {
      id: generateId(),
      userId: recipientUserId,          // NEW: Recipient owns this copy
      name: `📦 ${folder.name}`,        // Optional: Add visual indicator
      icon: folder.icon,
      color: folder.color,
      isInherited: true,                // NEW: Mark as inherited
      readOnly: true,                   // NEW: Prevent editing
      inheritedFrom: {
        userId: validation.userId,
        userName: validation.ownerName,
        inheritedAt: Date.now(),
        originalFolderId: folder.id
      },
      capsule_ids: folder.capsule_ids   // Copy capsule references
    };
    
    // Save to recipient's vault (KV or DB)
    await kv.set(
      `folder:${recipientUserId}:${inheritedFolder.id}`, 
      inheritedFolder
    );
    
    // Copy capsule metadata (read-only references)
    for (const capsuleId of folder.capsule_ids) {
      const capsule = await getCapsule(capsuleId);
      await kv.set(
        `capsule:inherited:${recipientUserId}:${capsuleId}`,
        {
          ...capsule,
          isInherited: true,
          inheritedFrom: validation.userId
        }
      );
    }
  }
  
  // 4. Mark token as "used"
  await markTokenAsUsed(token, recipientUserId);
  
  // 5. Send confirmation email to recipient
  await sendEmail({
    to: recipientEmail,
    subject: '✅ Legacy Folders Imported - Eras',
    template: 'legacy-import-confirmation',
    variables: { ownerName, folderCount: folders.length }
  });
  
  return c.json({ 
    success: true, 
    importedFolders: folders.length,
    message: 'Folders imported to your vault'
  });
});
```

### **Phase 3: Frontend Flow**

**Option A: One-Click Import (Recommended)**
```typescript
// Modify: /App.tsx route handler
if (path === "/legacy-vault/access") {
  const token = searchParams.get('token');
  
  // Instead of showing BeneficiaryVaultAccess viewer...
  return <LegacyClaimInterface token={token} />;
}

// NEW: /components/LegacyClaimInterface.tsx
// Shows:
// - Owner's name & personal message
// - List of folders they're inheriting
// - Big button: "Import to My Vault"
// - On click: Calls /api/legacy-access/unlock/claim
// - Redirects to their vault with folders imported
```

**Option B: Automatic Import (More Seamless)**
```typescript
// Auto-import on page load, show success animation
useEffect(() => {
  if (token && session?.user) {
    claimInheritance(token, session.user.id);
    // Show: "Welcome! You've inherited X folders from [Owner]"
    // Redirect to vault after 3 seconds
  }
}, [token, session]);
```

### **Phase 4: Scheduled Unlock Integration**

**Current System:** Unlock triggers send email with token link  
**What Changes:** Email content only!

```typescript
// File: /supabase/functions/server/legacy-access-service.tsx
// Function: triggerLegacyUnlock()

// CURRENT EMAIL:
"Your legacy access has been unlocked. Click here to view:
https://eras.app/legacy-vault/access?token=tok_..."

// NEW EMAIL:
"[Owner Name] has granted you access to their Eras folders.
Click here to import them into your vault:
https://eras.app/legacy-vault/claim?token=tok_..."
```

**Scheduled Unlock Flow (UNCHANGED):**
1. Inactivity trigger fires (3/6/12 months) OR manual unlock date reached
2. 30-day grace period email sent to owner
3. If owner doesn't cancel → unlock triggered
4. Emails sent to all beneficiaries with tokens
5. **NEW:** Tokens now import folders instead of just viewing

---

## KEY BENEFITS OF THIS APPROACH

### ✅ **Minimal Code Changes**
- Reuses 95% of existing token/beneficiary/unlock system
- Only adds ONE new endpoint: `/claim`
- Frontend just swaps viewer component for claim component

### ✅ **No Breaking Changes**
- Existing tokens still work (just change redemption behavior)
- Database schema changes are additive (new fields only)
- Can run in parallel with old system during testing

### ✅ **User Experience Wins**
- Folders appear in recipient's vault automatically
- No need to remember external URLs
- Search, organize, export work normally
- Mobile app support (since it's in their vault)

### ✅ **Security & Permissions Preserved**
- Tokens still expire (1 year default)
- Folder permissions still respected (view/download/full)
- Original owner's content unchanged (read-only copies)
- Access logging still works

### ✅ **Scheduled Unlock Still Works**
- Notification timing (immediate/deferred) unchanged
- Grace period system unchanged
- Email templates just need minor wording changes

---

## TECHNICAL CONSIDERATIONS

### **1. Media Storage References**
**Question:** Do imported folders reference media or copy it?

**Answer: REFERENCE (No Storage Duplication)**
```typescript
// Inherited capsules contain media URLs, not new uploads
{
  media: [
    { 
      url: "signed-url-to-original-owner-storage",
      type: "image",
      isInherited: true // Prevents editing/deleting
    }
  ]
}
```

**Why:** Supabase Storage signed URLs work for 1 year (matches token expiry). No need to duplicate GBs of media.

### **2. Folder Organization**
**Where do inherited folders appear?**

**Option A: Root Level** (Recommended)
```
My Vault
├─ Photos (user's folder)
├─ Videos (user's folder)
└─ 📦 Inherited from Mom
    ├─ Wedding Photos
    └─ Baby Videos
```

**Option B: Dedicated Section**
```
My Vault
├─ My Folders
└─ 📦 Legacy Folders
    └─ From Mom (5 folders)
```

**Recommendation:** Root level with icon prefix (📦 or 🏛️) for visual distinction.

### **3. Recipient Has No Eras Account**
**Current Flow:**
1. Email sent with token
2. They visit link → see external vault
3. Need account to view (or allow anonymous?)

**NEW Flow:**
1. Email sent with token
2. They visit link → prompted to create Eras account
3. After signup → folders auto-imported during onboarding
4. Special "Welcome! You inherited folders" flow

**Implementation:**
```typescript
// /App.tsx
if (path === "/legacy-vault/claim" && !session) {
  // Store token in sessionStorage
  sessionStorage.setItem('pending_inheritance_token', token);
  
  // Redirect to signup with context
  navigate('/signup?source=inheritance');
}

// After signup completes:
const pendingToken = sessionStorage.getItem('pending_inheritance_token');
if (pendingToken) {
  await claimInheritance(pendingToken, newUserId);
  showWelcomeMessage("You've inherited folders from [Owner]!");
}
```

### **4. Multiple Inheritance Sources**
**Scenario:** Recipient inherits from 3 different people

**Solution:** Group by original owner
```typescript
{
  folderId: "parent_inherited_from_mom",
  name: "📦 Inherited from Mom",
  isInheritedParent: true,
  children: [
    { name: "Wedding Photos", inheritedFrom: { userId: "mom_id" } },
    { name: "Baby Videos", inheritedFrom: { userId: "mom_id" } }
  ]
}
```

---

## COMPARISON: OLD VS NEW SYSTEM

| Feature | Current (External Vault) | Proposed (Import to Vault) |
|---------|-------------------------|----------------------------|
| **Access Method** | Visit external URL with token | Folders appear in recipient's vault |
| **Persistence** | Token expires in 1 year | Folders permanent in vault |
| **Organization** | Separate interface | Integrated with user's folders |
| **Search** | Limited to external viewer | Full vault search works |
| **Mobile** | Requires web browser | Native app support |
| **Offline** | Must be online | Can cache like normal folders |
| **Export** | Must download individually | Vault export includes inherited |
| **Code Changes** | N/A | 1 new endpoint + frontend component |

---

## MIGRATION STRATEGY

### **Phase 1: Add Import Feature (Parallel System)**
- Deploy new `/claim` endpoint alongside `/validate-full`
- Update email templates to offer BOTH options:
  - "Import to Your Vault" (new)
  - "View in Browser" (old)
- Test with beta users

### **Phase 2: Make Import Default**
- Change email links to `/claim` instead of `/access`
- Keep old viewer as fallback
- Monitor usage analytics

### **Phase 3: Deprecate External Viewer (Optional)**
- After 3 months, if import is preferred:
  - Remove BeneficiaryVaultAccess component
  - Simplify token validation logic
  - Update documentation

---

## ESTIMATED EFFORT

| Task | Complexity | Time | Priority |
|------|-----------|------|----------|
| Add `isInherited` fields to folder schema | Low | 1 hour | High |
| Create `/api/legacy-access/unlock/claim` endpoint | Medium | 4 hours | High |
| Build `LegacyClaimInterface` component | Medium | 3 hours | High |
| Update email templates | Low | 1 hour | Medium |
| Add "no account" signup flow | Medium | 3 hours | Medium |
| Testing & QA | High | 8 hours | High |
| **TOTAL** | - | **~20 hours** | - |

---

## RISKS & MITIGATION

### **Risk 1: Storage Quota**
**Issue:** Importing 1000s of capsules could exceed recipient's storage

**Mitigation:**
- Inherited capsules are **references only** (no storage used)
- Add banner: "Inherited content doesn't count toward your storage"
- Alternatively: Pro users only, or limit to 100 capsules

### **Risk 2: Token Expiry After Import**
**Issue:** What if media URLs expire after import?

**Mitigation:**
- Signed URLs valid for 1 year (matches token expiry)
- After 1 year, recipient loses access (as intended by design)
- OR: Extend expiry for imported content (configurable)

### **Risk 3: Accidental Deletion**
**Issue:** Recipient might try to delete inherited folders

**Mitigation:**
- Mark as `readOnly: true`
- Show warning: "This is an inherited folder. You cannot edit or delete it."
- Alternatively: Allow deletion (only removes their copy, not original)

---

## RECOMMENDATION

**Proceed with Proposed System: AUTO-IMPORT TO VAULT**

**Why:**
1. ✅ Minimal changes to existing infrastructure
2. ✅ Vastly improved user experience
3. ✅ No breaking changes - can deploy gradually
4. ✅ Leverages all existing vault features (search, export, mobile)
5. ✅ Estimated 20 hours of dev work

**Next Steps:**
1. **Approval:** Review this report and approve direction
2. **Schema Design:** Finalize `isInherited` field structure
3. **Backend:** Implement `/claim` endpoint
4. **Frontend:** Build claim interface
5. **Testing:** QA with test tokens
6. **Rollout:** Beta → Production over 2 weeks

---

## APPENDIX: CODE LOCATIONS

### Files That Need Modification:
```
/supabase/functions/server/index.tsx
  → Add /api/legacy-access/unlock/claim endpoint (after line 12695)

/supabase/functions/server/legacy-access-service.tsx
  → Add claimInheritance() function (after line 400)

/components/LegacyClaimInterface.tsx
  → NEW FILE - Replaces BeneficiaryVaultAccess.tsx for import flow

/App.tsx
  → Update /legacy-vault/access route to use claim interface (line ~370)

/utils/legacyAccessInheritance.ts
  → Add createInheritedFolder() helper function

/email-templates/legacy-import-confirmation.html
  → NEW FILE - "Your folders have been imported" email
```

### Files That Stay Unchanged:
```
✓ /components/BeneficiaryManagement.tsx - Beneficiary assignment UI
✓ /components/FolderLegacyAccessModal.tsx - Folder-level permissions
✓ /components/LegacyAccessBeneficiaries.tsx - Beneficiary list
✓ Token generation logic - Works as-is
✓ Scheduled unlock triggers - Works as-is
✓ Grace period system - Works as-is
```

---

**END OF REPORT**

**Status:** Ready for implementation pending your approval  
**Questions?** Ask me anything about this proposal before we proceed!
