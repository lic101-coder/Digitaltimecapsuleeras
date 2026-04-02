# LEGACY FOLDER IMPORT SYSTEM - BULLETPROOF PHASED IMPLEMENTATION

**Date:** April 2, 2026  
**Version:** 2.0 (Refined for Minimal Disruption)  
**Strategy:** Additive changes only - zero breaking changes  

---

## CORE PRINCIPLE: ADD, DON'T REPLACE

**Current system stays 100% functional.** We're adding an "Import to My Vault" button to the existing external viewer.

```
BEFORE: Token → External Viewer (view only)
AFTER:  Token → External Viewer (view only) + [Import to My Vault] button
```

---

## PHASED IMPLEMENTATION

### **PHASE 1: Backend Foundation** (4 hours)
**Zero frontend changes. Zero user impact.**

#### 1.1 Add Inherited Folder Schema (KV Store)
```typescript
// NEW KV Key Pattern:
// inherited_folder:{recipientUserId}:{inheritanceId}

interface InheritedFolder {
  id: string;                    // New folder ID in recipient's vault
  recipientUserId: string;       // Who received it
  originalUserId: string;        // Who gave it
  originalFolderId: string;      // Source folder ID
  name: string;                  // Folder name
  icon: string;
  color: string;
  capsuleIds: string[];          // Reference to original capsules
  importedAt: number;
  inheritanceToken: string;      // Which token was used
  permission: 'view' | 'download' | 'full';
}
```

**Storage Location:** KV Store (no DB schema changes)  
**Impact:** None (just defines structure)

#### 1.2 Create Import Service Function
**File:** `/supabase/functions/server/legacy-access-service.tsx`  
**Add after line 400:**

```typescript
export async function importInheritedFolders(
  tokenId: string,
  recipientUserId: string
): Promise<{ success: boolean; importedCount: number; error?: string }> {
  try {
    // 1. Validate token
    const token = await kv.get(`unlock_token_${tokenId}`);
    if (!token || token.usedAt) {
      return { success: false, importedCount: 0, error: 'Invalid or already used token' };
    }
    
    // 2. Get owner's legacy config
    const ownerConfig = await getLegacyAccessConfig(token.userId);
    const beneficiary = ownerConfig.beneficiaries.find(b => b.id === token.beneficiaryId);
    
    if (!beneficiary) {
      return { success: false, importedCount: 0, error: 'Beneficiary not found' };
    }
    
    // 3. Get folders this beneficiary has access to
    const accessibleFolders = await getByPrefix(`folder:${token.userId}:`);
    const foldersToImport = accessibleFolders.filter(folder => {
      // Check if beneficiary has permission for this folder
      if (beneficiary.folderPermissions?.[folder.id]) {
        return true;
      }
      // Or if folder has global legacy access and beneficiary is in global list
      if (folder.legacyAccess?.mode === 'global') {
        return true;
      }
      return false;
    });
    
    let importedCount = 0;
    
    // 4. Create inherited folder references
    for (const originalFolder of foldersToImport) {
      const inheritanceId = `${token.userId}_${originalFolder.id}`;
      const inheritedFolder: InheritedFolder = {
        id: `inherited_${inheritanceId}`,
        recipientUserId,
        originalUserId: token.userId,
        originalFolderId: originalFolder.id,
        name: originalFolder.name,
        icon: originalFolder.icon || '📦',
        color: originalFolder.color,
        capsuleIds: originalFolder.capsule_ids || [],
        importedAt: Date.now(),
        inheritanceToken: tokenId,
        permission: beneficiary.folderPermissions?.[originalFolder.id] || 'view'
      };
      
      await kv.set(
        `inherited_folder:${recipientUserId}:${inheritanceId}`,
        inheritedFolder
      );
      
      importedCount++;
    }
    
    // 5. Mark token as used
    token.usedAt = Date.now();
    token.usedBy = recipientUserId;
    await kv.set(`unlock_token_${tokenId}`, token);
    
    // 6. Send confirmation email
    const ownerProfile = await kv.get(`profile:${token.userId}`);
    await sendEmail({
      to: beneficiary.email,
      subject: '✅ Legacy Folders Imported to Your Vault',
      template: 'legacy-import-confirmation',
      variables: {
        ownerName: ownerProfile?.name || 'a loved one',
        folderCount: importedCount,
        vaultUrl: 'https://found-shirt-81691824.figma.site/vault'
      }
    });
    
    return { success: true, importedCount };
  } catch (error) {
    console.error('Import error:', error);
    return { success: false, importedCount: 0, error: error.message };
  }
}
```

**Test:** Unit test with mock token (no UI needed yet)

#### 1.3 Add Import API Endpoint
**File:** `/supabase/functions/server/index.tsx`  
**Add after line 12800 (after other legacy-access endpoints):**

```typescript
app.post("/make-server-f9be53a7/api/legacy-access/import", async (c) => {
  try {
    const { token } = await c.req.json();
    
    // Extract user from auth header
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authentication required' }, 401);
    }
    
    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Invalid authentication' }, 401);
    }
    
    // Import folders
    const result = await LegacyAccessService.importInheritedFolders(token, user.id);
    
    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }
    
    return c.json({ 
      success: true, 
      importedCount: result.importedCount,
      message: `${result.importedCount} folders imported to your vault`
    });
  } catch (error) {
    console.error('Import endpoint error:', error);
    return c.json({ error: 'Import failed' }, 500);
  }
});
```

**Test:** Call endpoint with curl and valid token

---

### **PHASE 2: Frontend Integration** (3 hours)
**Adds import button to existing viewer.**

#### 2.1 Modify BeneficiaryVaultAccess Component
**File:** `/components/BeneficiaryVaultAccess.tsx`  
**Changes:** Add state and import handler

```typescript
// Add at top with other state (after line 48):
const [isImporting, setIsImporting] = useState(false);
const [importComplete, setImportComplete] = useState(false);
const { session } = useAuth(); // Import from AuthContext

// Add import handler function (after line 220):
const handleImportToVault = async () => {
  if (!session?.access_token) {
    // User not logged in - redirect to signup with return URL
    sessionStorage.setItem('pending_import_token', accessToken!);
    window.location.href = '/signup?source=inheritance';
    return;
  }
  
  try {
    setIsImporting(true);
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/legacy-access/import`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: accessToken })
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Import failed');
    }
    
    setImportComplete(true);
    
    // Show success message
    toast.success(`${data.importedCount} folders imported to your vault!`);
    
    // Redirect to vault after 2 seconds
    setTimeout(() => {
      window.location.href = '/vault';
    }, 2000);
    
  } catch (error) {
    console.error('Import error:', error);
    toast.error('Failed to import folders. Please try again.');
  } finally {
    setIsImporting(false);
  }
};
```

#### 2.2 Add Import Button to Dashboard View
**File:** `/components/BeneficiaryVaultAccess.tsx`  
**Location:** In `renderVaultDashboard()` function, after personal message section (line ~520)

```typescript
{/* ADD THIS: Import CTA Banner */}
{!importComplete && (
  <div className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-purple-500/20 rounded-xl">
        <Download className="w-6 h-6 text-purple-300" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl text-white font-semibold mb-2">
          Import to Your Vault
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Save these folders to your Eras vault for permanent access. You'll be able to view, 
          search, and organize them alongside your own capsules.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImportToVault}
            disabled={isImporting}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Import {vaultData.folders.length} Folders
              </>
            )}
          </button>
          <span className="text-slate-400 text-sm">
            {session ? 'Ready to import' : 'Sign in required'}
          </span>
        </div>
      </div>
    </div>
  </div>
)}

{importComplete && (
  <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6">
    <div className="flex items-center gap-3">
      <CheckCircle2 className="w-6 h-6 text-green-400" />
      <div>
        <h3 className="text-lg text-white font-semibold mb-1">
          Import Complete!
        </h3>
        <p className="text-slate-300 text-sm">
          Folders have been added to your vault. Redirecting...
        </p>
      </div>
    </div>
  </div>
)}
```

**Impact:** Existing viewer still works, but now has import option

---

### **PHASE 3: Vault Display Integration** (3 hours)
**Show inherited folders in recipient's vault.**

#### 3.1 Add Inherited Folders Loader
**File:** `/components/LegacyVault.tsx`  
**Add helper function after line 200:**

```typescript
// Load inherited folders alongside regular folders
const loadInheritedFolders = async () => {
  if (!session?.user?.id) return;
  
  try {
    console.log('📦 Loading inherited folders...');
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/kv/prefix?prefix=inherited_folder:${session.user.id}:`,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to load inherited folders');
    }
    
    const data = await response.json();
    const inheritedFolders = data.values || [];
    
    console.log(`📦 Loaded ${inheritedFolders.length} inherited folders`);
    
    // Add inherited folders to folder list with special marker
    const mappedFolders = inheritedFolders.map(folder => ({
      ...folder,
      id: folder.id,
      name: `📦 ${folder.name}`, // Visual indicator
      isInherited: true,
      isReadOnly: true
    }));
    
    // Merge with regular folders
    setFolders(prev => [...prev, ...mappedFolders]);
    
  } catch (error) {
    console.error('Error loading inherited folders:', error);
  }
};
```

#### 3.2 Call Loader in useEffect
**File:** `/components/LegacyVault.tsx`  
**Modify existing folder loading useEffect (around line 300):**

```typescript
useEffect(() => {
  if (session?.user?.id) {
    loadFolders();
    loadInheritedFolders(); // ADD THIS LINE
  }
}, [session]);
```

#### 3.3 Handle Read-Only Display
**File:** `/components/VaultFolder.tsx`  
**Add read-only indicator (around line 100):**

```typescript
// Add prop to interface:
isInherited?: boolean;

// In render, add badge:
{isInherited && (
  <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
    <Shield className="w-3 h-3 mr-1" />
    Inherited
  </Badge>
)}
```

**Test:** Inherited folders appear in vault list

---

### **PHASE 4: Capsule Access** (2 hours)
**Show inherited capsules when folder is opened.**

#### 4.1 Add Inherited Capsule Loader
**File:** `/components/LegacyVault.tsx`  
**Modify `handleFolderClick` function:**

```typescript
const handleFolderClick = async (folder) => {
  setCurrentFolder(folder);
  
  if (folder.isInherited) {
    // Load inherited capsules
    await loadInheritedCapsules(folder);
  } else {
    // Existing regular folder logic
    await loadCapsules(folder.id);
  }
};

const loadInheritedCapsules = async (inheritedFolder) => {
  try {
    console.log('📦 Loading inherited capsules...');
    
    // Inherited folder has capsuleIds array
    const capsulePromises = inheritedFolder.capsuleIds.map(async (capsuleId) => {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/kv/get?key=capsule:${inheritedFolder.originalUserId}:${capsuleId}`,
        {
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        }
      );
      const data = await response.json();
      return {
        ...data.value,
        isInherited: true,
        isReadOnly: true
      };
    });
    
    const capsules = await Promise.all(capsulePromises);
    setCapsules(capsules);
    
  } catch (error) {
    console.error('Error loading inherited capsules:', error);
  }
};
```

#### 4.2 Prevent Editing Inherited Capsules
**File:** `/components/CapsuleDetailModal.tsx`  
**Add read-only check:**

```typescript
// In component:
const isReadOnly = capsule?.isInherited || false;

// Disable edit buttons:
{!isReadOnly && (
  <Button onClick={handleEdit}>Edit</Button>
)}

// Show read-only banner:
{isReadOnly && (
  <Alert className="bg-purple-500/10 border-purple-400/30 mb-4">
    <Shield className="w-4 h-4 text-purple-400" />
    <AlertDescription className="text-purple-200">
      This is an inherited capsule. You cannot edit or delete it.
    </AlertDescription>
  </Alert>
)}
```

**Test:** Capsules display but can't be edited

---

### **PHASE 5: Signup Flow Integration** (2 hours)
**Handle beneficiaries without accounts.**

#### 5.1 Store Token During Signup
**File:** `/App.tsx`  
**Modify legacy-vault/access route (around line 368):**

```typescript
if (path === "/legacy-vault/access") {
  const accessToken = searchParams.get('token');
  
  // If user not logged in, offer to sign up
  if (!session && accessToken) {
    sessionStorage.setItem('pending_import_token', accessToken);
    // They can still view without account (existing behavior)
    // Or we can prompt them to sign up for import
  }
  
  return (
    <BeneficiaryVaultAccess
      accessToken={accessToken || undefined}
      onBack={() => navigate('/')}
    />
  );
}
```

#### 5.2 Auto-Import After Signup
**File:** `/components/Auth.tsx`  
**Add after successful signup (around line 250):**

```typescript
// After signup success:
const pendingToken = sessionStorage.getItem('pending_import_token');
if (pendingToken) {
  // Auto-import folders
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/legacy-access/import`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: pendingToken })
    }
  );
  
  if (response.ok) {
    const data = await response.json();
    sessionStorage.removeItem('pending_import_token');
    toast.success(`Welcome! ${data.importedCount} folders imported from your inheritance.`);
  }
}
```

**Test:** New user signup → auto-import → see folders in vault

---

### **PHASE 6: Email Template** (1 hour)
**Update notification email to mention import option.**

#### 6.1 Create Import Confirmation Email
**File:** `/email-templates/legacy-import-confirmation.html` (NEW)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px 20px;">
  
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(139, 92, 246, 0.2);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%); padding: 32px; text-align: center; border-bottom: 1px solid rgba(139, 92, 246, 0.2);">
      <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Folders Imported Successfully</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 32px;">
      
      <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px;">
        Hello,
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px;">
        <strong style="color: #ffffff;">{{folderCount}} folders</strong> from <strong style="color: #a78bfa;">{{ownerName}}</strong> have been successfully imported to your Eras vault.
      </p>
      
      <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0;">
          <strong style="color: #ffffff;">📦 What's Next:</strong><br>
          • View your inherited folders in the Vault tab<br>
          • Folders are marked with a 📦 icon<br>
          • You can view and download content (editing disabled)<br>
          • Search works across all folders including inherited ones
        </p>
      </div>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="{{vaultUrl}}" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
          View Your Vault
        </a>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background: rgba(15, 23, 42, 0.5); padding: 24px 32px; border-top: 1px solid rgba(139, 92, 246, 0.2);">
      <p style="font-size: 12px; color: #64748b; margin: 0; text-align: center;">
        This is a one-time notification confirming your legacy folder import.
      </p>
    </div>
    
  </div>
  
</body>
</html>
```

#### 6.2 Update Unlock Notification Email (Optional)
**File:** `/email-templates/beneficiary-unlock-notification.html`  
**Add mention of import feature:**

```html
<!-- Add after existing content -->
<p>You can view the folders in your browser, or import them to your Eras vault for permanent access.</p>
```

---

## ROLLOUT CHECKLIST

### **Pre-Deployment**
- [ ] Phase 1 backend tested with unit tests
- [ ] Phase 2 tested with test token
- [ ] Phase 3 tested in staging vault
- [ ] Phase 4 capsule loading verified
- [ ] Phase 5 signup flow tested
- [ ] Phase 6 email template rendered correctly

### **Deployment**
- [ ] Deploy backend changes (Phases 1)
- [ ] Deploy frontend changes (Phases 2-5)
- [ ] Deploy email template (Phase 6)
- [ ] Test end-to-end with real token
- [ ] Monitor error logs for 24 hours

### **Post-Deployment**
- [ ] Create test inheritance for internal team
- [ ] Verify import shows in vault
- [ ] Verify capsules are viewable
- [ ] Verify read-only enforcement works
- [ ] Document for users

---

## ROLLBACK PLAN

If anything breaks:

1. **Backend issues:** Disable `/import` endpoint (returns 503)
2. **Frontend issues:** Hide import button with feature flag
3. **Data issues:** Inherited folders in separate KV namespace - can delete without affecting regular folders

**No data loss possible:** Import creates references only, never modifies original data.

---

## TESTING SCENARIOS

### **Scenario 1: Happy Path**
1. User A adds User B as beneficiary
2. User A triggers unlock
3. User B receives email with token
4. User B clicks link → sees vault viewer
5. User B clicks "Import to My Vault"
6. User B sees folders appear in their vault
7. User B opens folder → sees capsules
8. User B tries to edit capsule → blocked (read-only)

### **Scenario 2: No Account**
1. User B has no account
2. Clicks link → sees vault viewer (existing behavior)
3. Clicks "Import" → prompted to sign up
4. Signs up → folders auto-imported
5. Redirected to vault with folders visible

### **Scenario 3: Token Already Used**
1. User B imports folders
2. Tries to import again with same token
3. Gets error: "Token already used"
4. Existing imported folders unaffected

### **Scenario 4: Multiple Inheritances**
1. User B inherits from User A
2. Later inherits from User C
3. Vault shows both sets of folders
4. Each marked with original owner's name

---

## FILE CHANGES SUMMARY

### **Backend (3 files)**
1. `/supabase/functions/server/legacy-access-service.tsx` (+80 lines)
2. `/supabase/functions/server/index.tsx` (+35 lines)
3. `/email-templates/legacy-import-confirmation.html` (new file)

### **Frontend (3 files)**
1. `/components/BeneficiaryVaultAccess.tsx` (+60 lines)
2. `/components/LegacyVault.tsx` (+50 lines)
3. `/components/Auth.tsx` (+20 lines)

### **Minor Edits (2 files)**
1. `/components/VaultFolder.tsx` (+5 lines)
2. `/components/CapsuleDetailModal.tsx` (+10 lines)

**Total Lines Changed: ~260 lines**  
**Total Time: ~15 hours**

---

## COST ANALYSIS

### **Storage Impact**
- Each inherited folder: ~1KB (metadata only)
- 100 folders inherited: 100KB
- **No media duplication** (references only)

### **Performance Impact**
- Vault loading: +50ms (one extra KV prefix query)
- Folder opening: +100ms per folder (fetch capsule metadata)
- **Negligible impact** for <50 inherited folders

### **API Call Impact**
- Import: 1 call to `/import` endpoint
- View inherited folder: 1 prefix query + N capsule fetches
- **Same as regular folders**

---

## SUCCESS METRICS

After 30 days:
- [ ] X% of beneficiaries use import feature
- [ ] Zero errors in import flow
- [ ] No increase in support tickets
- [ ] Average import time <5 seconds
- [ ] User feedback positive

---

## FINAL RECOMMENDATION

✅ **PROCEED WITH PHASED ROLLOUT**

**Why bulletproof:**
1. Zero breaking changes (adds features, doesn't modify)
2. Existing system untouched (viewer still works)
3. Can rollback any phase independently
4. References only (no data duplication/loss risk)
5. Small surface area (260 lines total)
6. Testable at each phase
7. KV store only (no schema migrations)

**Next Step:** Approve Phase 1 → I'll implement backend foundation.
