import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  User, 
  Lock, 
  Shield, 
  Mail, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Key,
  Smartphone,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Database,
  Trash2,
  AlertTriangle,
  FileText,
  ExternalLink,
  Bell,
  ChevronUp,
  Calendar,
  Sparkles,
  Download,
  PackageOpen,
  Upload,
  Image as ImageIcon,
  Camera,
  X
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { DatabaseService } from '../utils/supabase/database';
import { motion, AnimatePresence } from 'motion/react';
import { TitleUnlockAdminPreview } from './TitleUnlockAdminPreview';
import { AchievementUnlockAdminPreview } from './AchievementUnlockAdminPreview';
import { EpicHorizonPreview } from './EpicHorizonPreview';
import { Avatar } from './Avatar';
import { ProfilePictureUploadModal } from './ProfilePictureUploadModal';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';


interface SettingsProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  onProfileUpdate?: (userData: { firstName: string; lastName: string }) => void;
  onDataChange?: () => void; // Callback when capsule data changes (restore, etc.)
  initialSection?: 'profile' | 'password' | 'security' | 'storage' | 'notifications' | 'account';
  onReplayOnboarding?: (moduleId: string) => void; // Trigger onboarding replay
}

export function Settings({ user, onProfileUpdate, onDataChange, initialSection, onReplayOnboarding }: SettingsProps) {
  // Section refs for scrolling
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to top visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Profile picture state
  const { session } = useAuth();
  const { profile, uploading, deleteAvatar, refetchProfile } = useProfile();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // New hybrid modal
  
  // 🔐 Detect authentication provider (OAuth vs email/password)
  const authProvider = React.useMemo(() => {
    // Check cached auth state first for provider information
    try {
      const cached = localStorage.getItem('eras-auth-state');
      if (cached) {
        const authData = JSON.parse(cached);
        return authData.provider || 'email';
      }
    } catch (e) {
      console.warn('Could not read auth provider from cache:', e);
    }
    return 'email';
  }, []);

  const isOAuthOnly = authProvider !== 'email'; // google, facebook, github, etc.
  
  // Profile state
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorPending, setTwoFactorPending] = useState(false); // enrolled but not yet verified
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [totpSecret, setTotpSecret] = useState('');
  const [pendingFactorId, setPendingFactorId] = useState<string | null>(null);
  const [usingExistingFactor, setUsingExistingFactor] = useState(false); // true when reusing pre-existing unverified factor
  const [oldEntryDeleted, setOldEntryDeleted] = useState(false); // user confirmed they deleted old authenticator entry
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [secretCopied, setSecretCopied] = useState(false);

  // Account deletion state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmPassword, setDeleteConfirmPassword] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailDeliveryConfirmations: true,
    emailCapsuleReceived: true,
    emailDeliveryReminders: true,
    emailWeeklySummary: false,
    inAppNotifications: true,
    notificationSound: true,
    allowEchoResponses: true,
  });
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  // Data export state
  const [isExportingData, setIsExportingData] = useState(false);
  
  // Access token for Archive
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Demo dialog states
  const [showUploadDemo, setShowUploadDemo] = useState(false);
  const [showSearchDemo, setShowSearchDemo] = useState(false);
  const [showEchoNotificationTest, setShowEchoNotificationTest] = useState(false);
  
  // Developer Tools
  const [showEpicHorizonPreview, setShowEpicHorizonPreview] = useState(false);

  // Load user metadata on mount
  useEffect(() => {
    // Run initialization functions sequentially to prevent overwhelming the system
    const initializeSettings = async () => {
      try {
        await loadAccessToken(); // Quick auth call
        await loadUserMetadata(); // Load profile data
        await loadNotificationPreferences(); // Load notification settings
        await check2FAStatus(); // Check 2FA last (can be slow)
      } catch (error) {
        console.error('[Settings] Error during initialization:', error);
        // Silently fail - settings will still be usable with defaults
      }
    };
    
    initializeSettings();
  }, []);

  // Check for purchase success/cancel in URL (runs on mount)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseStatus = urlParams.get('purchase');
    const beneficiaryPurchase = urlParams.get('beneficiary_purchase');
    const product = urlParams.get('product');

    if (purchaseStatus === 'success') {
      toast.success(
        product 
          ? `Successfully purchased ${product}! 🎉`
          : 'Purchase completed successfully! 🎉',
        { duration: 5000 }
      );
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (purchaseStatus === 'canceled') {
      toast.info('Purchase was canceled.');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (beneficiaryPurchase === 'success') {
      toast.success('Beneficiary access purchased successfully! 🎉', { duration: 5000 });
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (beneficiaryPurchase === 'canceled') {
      toast.info('Beneficiary purchase was canceled.');
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);
  
  // Load access token for TrashManager
  const loadAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      setAccessToken(session.access_token);
    }
  };

  // Scroll detection for back-to-top button
  useEffect(() => {
    const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null;
      
      let parent = element.parentElement;
      while (parent && parent !== document.body) {
        const overflowY = window.getComputedStyle(parent).overflowY;
        const hasScroll = parent.scrollHeight > parent.clientHeight;
        
        if ((overflowY === 'auto' || overflowY === 'scroll') && hasScroll) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    };

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollY = target === window || target === document ? 
        (window.scrollY || window.pageYOffset) : 
        target.scrollTop;
      
      const shouldShow = scrollY > 400;
      setShowScrollTop(shouldShow);
    };

    let scrollableParent: HTMLElement | null = null;
    const timer = setTimeout(() => {
      scrollableParent = findScrollableParent(containerRef.current);
      
      if (scrollableParent) {
        scrollableParent.addEventListener('scroll', handleScroll, { passive: true });
      } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollableParent) {
        scrollableParent.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
      if (!element) return null;
      
      let parent = element.parentElement;
      while (parent && parent !== document.body) {
        const overflowY = window.getComputedStyle(parent).overflowY;
        const hasScroll = parent.scrollHeight > parent.clientHeight;
        
        if ((overflowY === 'auto' || overflowY === 'scroll') && hasScroll) {
          return parent;
        }
        parent = parent.parentElement;
      }
      return null;
    };
    
    const scrollableParent = findScrollableParent(containerRef.current);
    
    if (scrollableParent) {
      scrollableParent.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };



  const loadUserMetadata = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser?.user_metadata) {
        setFirstName(currentUser.user_metadata.firstName || currentUser.user_metadata.first_name || '');
        setLastName(currentUser.user_metadata.lastName || currentUser.user_metadata.last_name || '');
        setPhoneNumber(currentUser.user_metadata.phone || currentUser.phone || '');
      }
    } catch (error) {
      console.error('Error loading user metadata:', error);
    }
  };

  const loadNotificationPreferences = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser?.user_metadata?.notificationPreferences) {
        setNotificationPrefs({
          ...notificationPrefs,
          ...currentUser.user_metadata.notificationPreferences
        });
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  const check2FAStatus = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        const { data: factors } = await supabase.auth.mfa.listFactors();
        const totpFactors = factors?.totp ?? [];
        const verified = totpFactors.filter(f => f.status === 'verified');
        const unverified = totpFactors.filter(f => f.status === 'unverified');
        setTwoFactorEnabled(verified.length > 0);
        setTwoFactorPending(unverified.length > 0 && verified.length === 0);
        // If there's an unverified factor, store its ID so verification can proceed
        if (unverified.length > 0 && verified.length === 0) {
          setPendingFactorId(unverified[0].id);
        }
      }
    } catch (error) {
      console.error('Error checking 2FA status:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!firstName.trim()) {
      toast.error('First name is required');
      return;
    }

    setIsUpdatingProfile(true);
    setProfileSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phoneNumber.trim()
        }
      });

      if (error) throw error;

      try {
        await DatabaseService.updateUserProfile(user.id, {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          display_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: user.email
        });
        
        const receivedCacheKey = `received_capsules_${user.id}`;
        try {
          localStorage.removeItem(receivedCacheKey);
        } catch (error) {
          console.warn('Could not clear cache:', error);
        }
      } catch (profileError) {
        console.error('⚠️ Failed to update KV profile:', profileError);
      }

      setProfileSuccess(true);
      toast.success('Profile updated successfully!');
      
      if (onProfileUpdate) {
        onProfileUpdate({ firstName: firstName.trim(), lastName: lastName.trim() });
      }

      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    // 🔐 OAuth users don't need current password (they're setting it for the first time)
    if (isOAuthOnly) {
      // For OAuth users: Only validate new password fields
      if (!newPassword || !confirmPassword) {
        toast.error('Please enter and confirm your new password');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }

      if (newPassword.length < 8) {
        toast.error('New password must be at least 8 characters');
        return;
      }
    } else {
      // For email users: Validate all fields including current password
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error('All password fields are required');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }

      if (newPassword.length < 8) {
        toast.error('New password must be at least 8 characters');
        return;
      }

      if (newPassword === currentPassword) {
        toast.error('New password must be different from current password');
        return;
      }
    }

    setIsChangingPassword(true);
    setPasswordSuccess(false);

    try {
      // 🔐 For email users: Verify current password first
      if (!isOAuthOnly) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword
        });

        if (signInError) {
          toast.error('Current password is incorrect');
          setIsChangingPassword(false);
          return;
        }
      }

      // Update password (works for both OAuth and email users)
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      setPasswordSuccess(true);
      
      // Show appropriate success message
      if (isOAuthOnly) {
        toast.success('Password set successfully! You can now sign in with email.');
      } else {
        toast.success('Password changed successfully!');
      }
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    setUsingExistingFactor(false);
    try {
      // Use server-side admin API to delete any pending/unverified TOTP factors.
      // The client SDK listFactors() does NOT return unverified factors, so server cleanup
      // is the only way to clear the "already exists" conflict before enrolling fresh.
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token ?? publicAnonKey;
      let cleanupWorked = false;
      try {
        const cleanupRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/mfa/cleanup-unverified`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const cleanupData = await cleanupRes.json().catch(() => ({}));
        console.log('[2FA] Cleanup result:', cleanupRes.status, cleanupData);
        cleanupWorked = cleanupRes.ok;
      } catch (cleanupErr) {
        console.warn('[2FA] Cleanup endpoint failed:', cleanupErr);
      }

      // Use a unique friendly name so Supabase's "already exists" check never fires,
      // regardless of whether cleanup succeeded. The friendly name is only a Supabase
      // label — it does not affect what the authenticator app displays (that comes from
      // the TOTP URI issuer/account fields in the QR code).
      const friendlyName = `Eras Time Capsule ${Date.now()}`;
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName
      });

      if (error) throw error;

      if (data) {
        setQrCode(data.totp.qr_code);
        setTotpSecret(data.totp.secret);
        setPendingFactorId(data.id);
        setShow2FASetup(true);
      }
    } catch (error: any) {
      console.error('Error enabling 2FA:', error);
      toast.error(error.message || 'Failed to enable two-factor authentication');
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying2FA(true);
    try {
      // Use the factorId saved during enroll (listFactors only returns verified factors)
      let factorId = pendingFactorId;
      if (!factorId) {
        // Fallback: try listFactors in case user is re-verifying an already-enrolled factor
        const factors = await supabase.auth.mfa.listFactors();
        factorId = factors.data?.totp?.[0]?.id ?? null;
      }
      if (!factorId) {
        throw new Error('No TOTP factor found. Please restart the 2FA setup.');
      }

      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verificationCode
      });

      if (error) throw error;

      setTwoFactorEnabled(true);
      setTwoFactorPending(false);
      setShow2FASetup(false);
      setVerificationCode('');
      setPendingFactorId(null);
      setUsingExistingFactor(false);
      setOldEntryDeleted(false);
      toast.success('Two-factor authentication enabled successfully!');
    } catch (error: any) {
      console.error('Error verifying 2FA:', error);
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsVerifying2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      return;
    }

    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors?.totp?.[0]) {
        const { error } = await supabase.auth.mfa.unenroll({
          factorId: factors.totp[0].id
        });

        if (error) throw error;

        setTwoFactorEnabled(false);
        toast.success('Two-factor authentication disabled');
      }
    } catch (error: any) {
      console.error('Error disabling 2FA:', error);
      toast.error(error.message || 'Failed to disable two-factor authentication');
    }
  };

  const copySecretToClipboard = () => {
    navigator.clipboard.writeText(totpSecret);
    setSecretCopied(true);
    toast.success('Secret copied to clipboard');
    setTimeout(() => setSecretCopied(false), 2000);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    if (!deleteConfirmPassword) {
      toast.error('Please enter your password');
      return;
    }

    setIsDeletingAccount(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: deleteConfirmPassword
      });

      if (signInError) {
        toast.error('Incorrect password');
        setIsDeletingAccount(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No access token available');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/delete-account`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || 'Failed to schedule account deletion');
      }

      const result = await response.json();
      const deleteDate = result.deleteAt ? new Date(result.deleteAt).toLocaleDateString() : '30 days from now';

      await supabase.auth.signOut();

      toast.success(`Account scheduled for deletion on ${deleteDate}. Sign in any time before then to reactivate.`, { duration: 8000 });

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error(error.message || 'Failed to delete account');
      setIsDeletingAccount(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          notificationPreferences: notificationPrefs
        }
      });

      if (error) throw error;

      toast.success('Notification preferences saved!');
    } catch (error: any) {
      console.error('Error saving notification preferences:', error);
      toast.error(error.message || 'Failed to save notification preferences');
    } finally {
      setIsSavingNotifications(false);
    }
  };

  const buildExportHtml = (data: any): string => {
    const fmt = (iso: string | null) => iso ? new Date(iso).toLocaleString() : '—';
    const esc = (s: string) => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const mediaIcon = (type: string) => {
      if (!type) return '📎';
      if (type.startsWith('image')) return '🖼️';
      if (type.startsWith('video')) return '🎬';
      if (type.startsWith('audio')) return '🎵';
      return '📎';
    };
    const renderMedia = (files: any[]) => {
      if (!files || files.length === 0) return '';
      return `<div class="media-list">${files.map(f => `
        <a class="media-item" href="${esc(f.download_url)}" target="_blank" rel="noopener">
          <span class="media-icon">${mediaIcon(f.file_type)}</span>
          <span class="media-name">${esc(f.file_name || 'file')}</span>
          <span class="media-meta">${f.file_type || ''} · ${f.file_size ? (f.file_size / 1024).toFixed(0) + ' KB' : ''}</span>
          ${f.url_expires ? `<span class="media-expires">link expires ${fmt(f.url_expires)}</span>` : ''}
        </a>`).join('')}</div>`;
    };
    const renderCapsule = (c: any, dir: string) => `
      <div class="capsule">
        <div class="capsule-header">
          <span class="capsule-dir ${dir}">${dir === 'sent' ? '↑ Sent' : '↓ Received'}</span>
          <span class="capsule-status status-${(c.status||'').toLowerCase()}">${c.status || ''}</span>
          <span class="capsule-date">${fmt(c.delivery_date || c.created_at)}</span>
        </div>
        <div class="capsule-title">${esc(c.title || '(no title)')}</div>
        ${c.text_message ? `<div class="capsule-body">${esc(c.text_message).replace(/\n/g,'<br>')}</div>` : ''}
        ${c.recipients && c.recipients.length ? `<div class="capsule-meta">To: ${c.recipients.map((r:any)=>esc(r.value||r.name||'')).join(', ')}</div>` : ''}
        ${renderMedia(c.media_files)}
      </div>`;

    const sentHtml = (data.capsules?.sent || []).map((c:any) => renderCapsule(c,'sent')).join('');
    const receivedHtml = (data.capsules?.received || []).map((c:any) => renderCapsule(c,'received')).join('');
    const vaultHtml = (data.vault || []).map((v:any) => `
      <div class="vault-item">
        <span class="media-icon">${mediaIcon(v.file_type)}</span>
        <div class="vault-info">
          <div class="vault-name">${esc(v.file_name || 'file')}</div>
          <div class="vault-meta">${v.file_type || ''} · ${v.file_size ? (v.file_size/1024).toFixed(0)+' KB' : ''} · ${fmt(v.created_at)}</div>
          ${v.download_url ? `<a href="${esc(v.download_url)}" target="_blank" rel="noopener" class="dl-link">Download ↗</a>` : '<span class="no-link">No download available</span>'}
        </div>
      </div>`).join('');
    const recordHtml = (data.recordLibrary || []).map((r:any) => `
      <div class="vault-item">
        <span class="media-icon">${mediaIcon(r.file_type)}</span>
        <div class="vault-info">
          <div class="vault-name">${esc(r.file_name || 'recording')}</div>
          <div class="vault-meta">${r.file_type || ''} · ${r.file_size ? (r.file_size/1024).toFixed(0)+' KB' : ''} · ${fmt(r.created_at)}</div>
          ${r.download_url ? `<a href="${esc(r.download_url)}" target="_blank" rel="noopener" class="dl-link">Download ↗</a>` : '<span class="no-link">No download available</span>'}
        </div>
      </div>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Eras Time Capsule — Data Export</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f0f1a;color:#e2e8f0;padding:24px;line-height:1.6}
  h1{font-size:1.6rem;font-weight:700;color:#a78bfa;margin-bottom:4px}
  .subtitle{color:#94a3b8;font-size:.9rem;margin-bottom:32px}
  h2{font-size:1.1rem;font-weight:600;color:#c4b5fd;margin:32px 0 12px;border-bottom:1px solid #2d2d44;padding-bottom:8px}
  .summary{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:32px}
  .stat{background:#1e1e33;border:1px solid #2d2d44;border-radius:10px;padding:12px 20px;text-align:center}
  .stat-n{font-size:1.6rem;font-weight:700;color:#a78bfa}
  .stat-l{font-size:.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em}
  .capsule{background:#1a1a2e;border:1px solid #2d2d44;border-radius:12px;padding:16px;margin-bottom:12px}
  .capsule-header{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap}
  .capsule-dir{font-size:.75rem;font-weight:600;padding:2px 8px;border-radius:999px}
  .capsule-dir.sent{background:#1d3a2f;color:#34d399}
  .capsule-dir.received{background:#2d1f3f;color:#c4b5fd}
  .capsule-status{font-size:.75rem;padding:2px 8px;border-radius:999px;background:#1e2a3a;color:#7dd3fc}
  .capsule-status.status-delivered{background:#1d3a2f;color:#34d399}
  .capsule-status.status-draft{background:#332a1a;color:#fbbf24}
  .capsule-date{font-size:.78rem;color:#64748b;margin-left:auto}
  .capsule-title{font-weight:600;font-size:1rem;color:#e2e8f0;margin-bottom:6px}
  .capsule-body{font-size:.88rem;color:#94a3b8;white-space:pre-wrap;background:#0f0f1a;border-radius:8px;padding:10px;margin:8px 0}
  .capsule-meta{font-size:.8rem;color:#64748b;margin-top:6px}
  .media-list{margin-top:10px;display:flex;flex-direction:column;gap:6px}
  .media-item{display:flex;align-items:center;gap:8px;background:#0f0f1a;border:1px solid #2d2d44;border-radius:8px;padding:8px 12px;text-decoration:none;color:#e2e8f0;transition:border-color .2s}
  .media-item:hover{border-color:#7c3aed}
  .media-icon{font-size:1.1rem}
  .media-name{font-size:.85rem;font-weight:500;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .media-meta{font-size:.75rem;color:#64748b;white-space:nowrap}
  .media-expires{font-size:.72rem;color:#f59e0b;white-space:nowrap}
  .vault-item{display:flex;align-items:flex-start;gap:12px;background:#1a1a2e;border:1px solid #2d2d44;border-radius:10px;padding:14px;margin-bottom:10px}
  .vault-info{flex:1;min-width:0}
  .vault-name{font-weight:500;font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .vault-meta{font-size:.78rem;color:#64748b;margin:3px 0 6px}
  .dl-link{font-size:.82rem;color:#818cf8;text-decoration:none}
  .dl-link:hover{text-decoration:underline}
  .no-link{font-size:.82rem;color:#475569}
  .note{background:#1e1e33;border:1px solid #3730a3;border-radius:8px;padding:12px 16px;font-size:.82rem;color:#94a3b8;margin-bottom:24px}
  @media(max-width:600px){body{padding:16px}.summary{gap:8px}.stat{padding:10px 14px}}
</style></head>
<body>
<h1>Eras Time Capsule — Data Export</h1>
<div class="subtitle">Exported on ${fmt(data.exportDate)} · ${esc(data.userEmail || '')}</div>
<div class="note">⏳ Media download links expire 24 hours after export. Download your files before then.</div>
<div class="summary">
  <div class="stat"><div class="stat-n">${(data.capsules?.sent||[]).length}</div><div class="stat-l">Sent Capsules</div></div>
  <div class="stat"><div class="stat-n">${(data.capsules?.received||[]).length}</div><div class="stat-l">Received Capsules</div></div>
  <div class="stat"><div class="stat-n">${(data.vault||[]).length}</div><div class="stat-l">Vault Items</div></div>
  <div class="stat"><div class="stat-n">${(data.recordLibrary||[]).length}</div><div class="stat-l">Recordings</div></div>
</div>
${sentHtml || receivedHtml ? `<h2>Capsules</h2>${sentHtml}${receivedHtml}` : ''}
${vaultHtml ? `<h2>Vault</h2>${vaultHtml}` : ''}
${recordHtml ? `<h2>Record Library</h2>${recordHtml}` : ''}
</body></html>`;
  };

  const handleExportData = async () => {
    setIsExportingData(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('No access token available');
      }

      toast.info('Generating your data export… this may take up to 30 seconds.', { duration: 6000 });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      let response: Response;
      try {
        response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/user-data-export`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            },
            signal: controller.signal
          }
        );
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.message || `Export failed (${response.status})`);
      }

      const data = await response.json();

      const html = buildExportHtml(data);
      const filename = `eras-data-export-${new Date().toISOString().split('T')[0]}.html`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      toast.success('Export downloaded! Open the .html file in any browser to view your data.', { duration: 6000 });
    } catch (error: any) {
      console.error('Error exporting data:', error);
      toast.error(error.message || 'Failed to export data');
    } finally {
      setIsExportingData(false);
    }
  };

  // Profile picture handlers
  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar();
      toast.success('Profile picture removed!', { icon: '🗑️' });
      setShowDeleteConfirm(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete profile picture');
    }
  };

  const handleUploadSuccess = () => {
    toast.success('Profile picture updated!', { icon: '✅' });
    refetchProfile();
    setShowUploadModal(false);
  };

  const userEmail = session?.user?.email || '';
  const userName = session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name || '';

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-6 md:space-y-8 px-4 md:px-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
          Settings
        </h1>
        <p className="text-black text-base md:text-lg">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Profile Information - Merged with Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="border-purple-500/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 md:bg-gradient-to-br md:from-purple-600 md:to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/50 shrink-0">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-white">Profile Information</CardTitle>
                <CardDescription className="text-white text-sm md:text-base">Update your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Avatar and Form Fields - Horizontal Layout */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: Profile Picture */}
              <div className="flex flex-col items-center md:items-start gap-3 md:w-48 shrink-0">
                <div 
                  onClick={() => setShowProfileModal(true)}
                  className="cursor-pointer group relative"
                >
                  <Avatar
                    src={profile?.avatar_url}
                    name={userName}
                    email={userEmail}
                    size="xl"
                    alt="Your profile picture"
                    className="w-32 h-32 ring-4 ring-purple-500/30 group-hover:ring-purple-500/50 transition-all duration-200"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-xs text-black text-center md:text-left">
                  Click photo to update. Square image, 400×400px min. Max 5MB.
                </p>
              </div>

              {/* Right: Form Fields */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white text-sm md:text-base">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-slate-500 focus:border-purple-500/50 h-11 md:h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white text-sm md:text-base">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      className="bg-slate-800/50 border-purple-500/20 text-white placeholder:text-slate-500 focus:border-purple-500/50 h-11 md:h-12 text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm md:text-base">Email</Label>
                  <Input
                    id="email"
                    value={userEmail}
                    disabled
                    className="bg-slate-800/30 border-purple-500/10 text-slate-400 h-11 md:h-12 text-base cursor-not-allowed"
                  />
                </div>

                {profileSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  >
                    <Alert className="bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/20">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <AlertDescription className="text-green-200 font-medium">
                        ✓ Profile updated successfully!
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <Button
                  onClick={handleUpdateProfile}
                  disabled={isUpdatingProfile}
                  className="w-full md:w-auto bg-purple-600 md:bg-gradient-to-r md:from-purple-600 md:to-violet-600 hover:bg-purple-700 md:hover:from-purple-700 md:hover:to-violet-700 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 min-h-[44px] px-6 transition-all duration-200 active:scale-95"
                >
                  {isUpdatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Password Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-orange-500/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 hover:border-orange-500/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-600 md:bg-gradient-to-br md:from-orange-600 md:to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/50 shrink-0">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-white">
                  {isOAuthOnly ? 'Add Email Login' : 'Change Password'}
                </CardTitle>
                <CardDescription className="text-white text-sm md:text-base">
                  {isOAuthOnly 
                    ? `You signed in with ${authProvider.charAt(0).toUpperCase() + authProvider.slice(1)}. Add a password for email login.`
                    : 'Keep your account secure'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Only show current password field for email users */}
            {!isOAuthOnly && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-black text-sm md:text-base">Enter current password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="bg-slate-800/50 border-orange-500/20 text-white placeholder:text-slate-500 focus:border-orange-500/50 h-11 md:h-12 text-base"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-black text-sm md:text-base">Enter new password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-slate-800/50 border-orange-500/20 text-white placeholder:text-slate-500 focus:border-orange-500/50 h-11 md:h-12 text-base"
              />
              <p className="text-xs md:text-sm text-black">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-black text-sm md:text-base">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-slate-800/50 border-orange-500/20 text-white placeholder:text-slate-500 focus:border-orange-500/50 h-11 md:h-12 text-base"
              />
            </div>

            {passwordSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
              >
                <Alert className="bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <AlertDescription className="text-green-200 font-medium">
                    ✓ Password changed successfully!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <Button
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="w-full md:w-auto bg-orange-600 md:bg-gradient-to-r md:from-orange-600 md:to-red-600 hover:bg-orange-700 md:hover:from-orange-700 md:hover:to-red-700 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 min-h-[44px] px-6 transition-all duration-200 active:scale-95"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isOAuthOnly ? 'Setting...' : 'Changing...'}
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  {isOAuthOnly ? 'Set Password' : 'Change Password'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-green-500/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 hover:border-green-500/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-600 md:bg-gradient-to-br md:from-green-600 md:to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 shrink-0">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-xl md:text-2xl font-bold text-white">Two-Factor Authentication</CardTitle>
                  {twoFactorEnabled && (
                    <Badge className="bg-green-600 text-white shadow-lg shadow-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  )}
                  {twoFactorPending && !twoFactorEnabled && (
                    <Badge className="bg-yellow-600 text-white shadow-lg shadow-yellow-500/30">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Setup Incomplete
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-white text-sm md:text-base">
                  {twoFactorEnabled ? 'Your account is protected with 2FA' : twoFactorPending ? 'Enrollment started but not verified' : 'Add an extra layer of security'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {twoFactorEnabled ? (
              // State 3: Fully active
              <div className="space-y-4">
                <div className="p-4 md:p-5 rounded-xl bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-green-300">
                        2FA is Active
                      </p>
                      <p className="text-sm text-white">
                        Your account is protected with two-factor authentication. Every sign-in requires your authenticator app code.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleDisable2FA}
                  variant="outline"
                  className="border-red-500/30 text-red-300 bg-red-900/20 hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-200 min-h-[44px] px-6 w-full md:w-auto"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Disable 2FA
                </Button>
              </div>
            ) : twoFactorPending ? (
              // State 2: Enrolled but not verified
              <div className="space-y-4">
                <div className="p-4 md:p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-yellow-300 mb-1">
                        Setup Incomplete — 2FA Is Not Active
                      </p>
                      <p className="text-sm text-white">
                        You started 2FA enrollment but never verified it with a code. Your account is <span className="font-semibold text-yellow-200">not protected</span> until setup is finished. Complete setup or discard and start fresh.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleEnable2FA}
                    disabled={isEnabling2FA}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold min-h-[44px] px-6"
                  >
                    {isEnabling2FA ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Restarting...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Complete Setup (Restart)
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={async () => {
                      if (pendingFactorId) {
                        await supabase.auth.mfa.unenroll({ factorId: pendingFactorId });
                        setPendingFactorId(null);
                        setTwoFactorPending(false);
                        toast.success('Incomplete 2FA enrollment removed');
                      }
                    }}
                    variant="outline"
                    className="border-red-500/30 text-red-300 bg-red-900/20 hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-200 min-h-[44px] px-6"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Discard Incomplete Setup
                  </Button>
                </div>
              </div>
            ) : (
              // State 1: Not set up at all
              <>
                <div className="p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-blue-300 mb-1">
                        Enhance Your Security
                      </p>
                      <p className="text-sm text-white">
                        Two-factor authentication adds an extra layer of protection by requiring a code from your authenticator app in addition to your password.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleEnable2FA}
                  disabled={isEnabling2FA}
                  className="w-full md:w-auto bg-green-600 md:bg-gradient-to-r md:from-green-600 md:to-emerald-600 hover:bg-green-700 md:hover:from-green-700 md:hover:to-emerald-700 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 min-h-[44px] px-6 transition-all duration-200 active:scale-95"
                >
                  {isEnabling2FA ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Enable 2FA
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Export */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Card className="border-indigo-500/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600 md:bg-gradient-to-br md:from-indigo-600 md:to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50 shrink-0">
                <PackageOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-white">Data Export</CardTitle>
                <CardDescription className="text-white text-sm md:text-base">
                  Download all your data in JSON format
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            {/* Info Box */}
            <div className="p-4 md:p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm md:text-base font-semibold text-indigo-300">
                    Your Export Includes:
                  </p>
                  <ul className="text-sm text-white space-y-1.5 ml-1">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>All sent and received capsules with metadata</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Vault media files with 24-hour download links</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Record library items with signed URLs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Achievement progress and unlocked achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>Profile information and settings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
              <p className="text-xs md:text-sm text-white">
                <strong className="text-indigo-300">Note:</strong> Media files are exported as signed URLs valid for 24 hours. 
                Download them promptly after exporting. The JSON file contains all your capsule data, messages, and metadata.
              </p>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExportData}
              disabled={isExportingData}
              className="w-full md:w-auto bg-indigo-600 md:bg-gradient-to-r md:from-indigo-600 md:to-purple-600 hover:bg-indigo-700 md:hover:from-indigo-700 md:hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 min-h-[44px] px-6 transition-all duration-200 active:scale-95"
            >
              {isExportingData ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting Data...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Account - Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-red-500/30 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-500/40 transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 md:bg-gradient-to-br md:from-red-600 md:to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/50 shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-white">Danger Zone</CardTitle>
                <CardDescription className="text-white text-sm md:text-base">Account deletion and recovery options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main warning box */}
            <div className="p-4 md:p-5 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <div className="space-y-3">
                  <div>
                    <p className="text-sm md:text-base font-semibold text-red-300 mb-1">
                      Account Deletion Process
                    </p>
                    <p className="text-sm text-white">
                      When you delete your account, we understand you might change your mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 30-Day Grace Period Info */}
            <div className="p-4 md:p-5 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm md:text-base font-semibold text-blue-300">
                    30-Day Grace Period
                  </p>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Your account will be <strong className="text-white">scheduled for deletion</strong>, not immediately deleted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>You can <strong className="text-white">sign back in any time within 30 days</strong> to reactivate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>Your capsules, media, and data will be <strong className="text-white">fully restored</strong> upon reactivation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span><strong className="text-red-300">After exactly 30 days</strong>, your account and all data will be <strong className="text-red-300">permanently deleted</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final tip */}
            <div className="p-3 md:p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-xs md:text-sm text-white text-center">
                💡 <strong className="text-white">Pro Tip:</strong> If you're unsure, just sign out. 
                Your account will remain safe and ready whenever you return.
              </p>
            </div>
            
            {/* Delete button */}
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="outline"
              className="border-red-500/30 text-red-300 bg-red-900/20 hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-200 min-h-[44px] px-6 w-full md:w-auto"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-500 md:bg-gradient-to-r md:from-purple-500 md:to-pink-500 shadow-2xl shadow-purple-500/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dialogs */}
      <Dialog open={show2FASetup} onOpenChange={(open) => {
        setShow2FASetup(open);
        if (!open) { setVerificationCode(''); setUsingExistingFactor(false); setOldEntryDeleted(false); }
      }}>
        <DialogContent className="bg-slate-900 border-purple-500/30">
          <DialogTitle className="text-white">
            {usingExistingFactor ? 'Complete 2FA Setup' : 'Set Up Two-Factor Authentication'}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {usingExistingFactor
              ? 'Your authenticator app already has this account. Enter the current 6-digit code shown there.'
              : 'Follow each step in order.'}
          </DialogDescription>
          <div className="space-y-4 mt-4">
            {usingExistingFactor ? (
              <>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-300 mb-1">Already in your authenticator app</p>
                    <p className="text-sm text-white">
                      Open your authenticator app, find the <span className="font-semibold text-blue-200">Eras Time Capsule</span> entry, and enter the 6-digit code shown.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    inputMode="numeric"
                    className="bg-slate-800/50 text-white h-12 text-center text-2xl tracking-widest font-mono"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Step 1 */}
                <div className="p-4 rounded-lg border border-red-500/40 bg-red-500/10">
                  <p className="text-sm font-bold text-red-300 mb-2">Step 1 of 3 — Delete old entry</p>
                  <p className="text-sm text-white mb-3">
                    Open your authenticator app. If it has <span className="font-bold text-red-200">any existing entry</span> for this account, <span className="font-bold text-red-200">delete it now</span>. If you skip this, the code you enter will not match and setup will fail.
                  </p>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={oldEntryDeleted}
                      onChange={e => setOldEntryDeleted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-red-500 shrink-0"
                    />
                    <span className="text-sm text-red-200 font-medium">
                      Done — I deleted the old entry (or I never had one)
                    </span>
                  </label>
                </div>

                {/* Steps 2 & 3 — gated behind checkbox */}
                <div className={`space-y-4 transition-opacity duration-200 ${oldEntryDeleted ? 'opacity-100' : 'opacity-25 pointer-events-none select-none'}`}>
                  <div>
                    <p className="text-sm font-bold text-slate-200 mb-2">Step 2 of 3 — Scan this QR code</p>
                    {qrCode && (
                      <div className="flex justify-center p-4 bg-white rounded-lg">
                        <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                      </div>
                    )}
                    {totpSecret && (
                      <div className="space-y-2 mt-3">
                        <Label className="text-slate-100 text-xs">Or enter manually:</Label>
                        <div className="flex gap-2">
                          <Input value={totpSecret} readOnly className="font-mono bg-slate-800/50 text-white text-xs" />
                          <Button variant="outline" size="sm" onClick={copySecretToClipboard} className="min-h-[44px] min-w-[44px]">
                            {secretCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-200 mb-2">Step 3 of 3 — Enter code from the <span className="text-green-300">newly added</span> entry</p>
                    <Input
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="6-digit code"
                      maxLength={6}
                      inputMode="numeric"
                      className="bg-slate-800/50 text-white h-12 text-center text-2xl tracking-widest font-mono"
                    />
                  </div>
                </div>
              </>
            )}

            <Button
              onClick={handleVerify2FA}
              disabled={isVerifying2FA || verificationCode.length !== 6 || (!usingExistingFactor && !oldEntryDeleted)}
              className="w-full bg-green-600 md:bg-gradient-to-r md:from-green-600 md:to-emerald-600 hover:bg-green-700 md:hover:from-green-700 md:hover:to-emerald-700 text-white min-h-[44px]"
            >
              {isVerifying2FA ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Enable'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-slate-900 border-red-500/30 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400 text-xl flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Schedule Account Deletion?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-slate-300">
              <p>
                Your account will be scheduled for deletion and you'll be signed out.
              </p>
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm text-blue-300 font-medium mb-1">
                  ⏰ 30-Day Recovery Window
                </p>
                <p className="text-xs text-slate-300">
                  Simply sign back in within 30 days and your account will be fully restored. 
                  After 30 days, deletion is permanent.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="space-y-2">
              <Label htmlFor="deleteConfirmPassword" className="text-slate-100">
                Enter your password to confirm
              </Label>
              <Input
                id="deleteConfirmPassword"
                type="password"
                value={deleteConfirmPassword}
                onChange={(e) => setDeleteConfirmPassword(e.target.value)}
                className="bg-slate-800/50 border-red-500/20 text-white h-12"
                placeholder="Password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deleteConfirmText" className="text-slate-100">
                Type <span className="font-mono font-bold text-red-400">DELETE</span> to confirm
              </Label>
              <Input
                id="deleteConfirmText"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="bg-slate-800/50 border-red-500/20 text-white h-12"
                placeholder="DELETE"
              />
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
              className="bg-red-600 hover:bg-red-700 text-white min-h-[44px]"
            >
              {isDeletingAccount ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Schedule Deletion'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Demo Dialogs */}
      {showUploadDemo && (
        <Dialog open={showUploadDemo} onOpenChange={setShowUploadDemo}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900">
            <UploadSystemDemo />
          </DialogContent>
        </Dialog>
      )}

      {showSearchDemo && (
        <Dialog open={showSearchDemo} onOpenChange={setShowSearchDemo}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900">
            <SearchDiscoveryDemo />
          </DialogContent>
        </Dialog>
      )}

      {showEchoNotificationTest && (
        <EchoNotificationModal
          isOpen={showEchoNotificationTest}
          onClose={() => setShowEchoNotificationTest(false)}
          notification={{
            id: 'test-notification',
            type: echoTestType,
            capsuleId: 'test-capsule',
            capsuleTitle: 'My Summer Vacation Memories',
            fromUserId: 'test-user',
            fromUserName: 'Sarah Johnson',
            timestamp: new Date().toISOString(),
            reactionType: echoTestType === 'reaction' ? 'heart' : undefined,
            noteContent: echoTestType === 'note' ? 'This capsule brought back so many wonderful memories! Thank you for sharing this special moment with me. 🌟' : undefined,
            read: false
          }}
        />
      )}

      {/* Profile Picture Upload Modal */}
      <ProfilePictureUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Epic Horizon Preview Modal */}
      {showEpicHorizonPreview && (
        <EpicHorizonPreview
          onClose={() => setShowEpicHorizonPreview(false)}
        />
      )}

      {/* Hybrid Profile Picture Modal - Preview + Options */}
      {showProfileModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ margin: 0 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
            style={{ maxHeight: '90vh', overflow: 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">Profile Picture</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Preview Section */}
              <div className="flex justify-center">
                <Avatar
                  src={profile?.avatar_url}
                  name={userName}
                  email={userEmail}
                  size="xl"
                  alt="Your profile picture"
                  className="w-40 h-40 ring-4 ring-purple-500/20"
                />
              </div>

              {/* Update Options */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700 mb-3">Update your photo:</p>
                
                {/* Choose from Gallery */}
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setShowUploadModal(true);
                  }}
                  className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-900">Choose from Gallery</p>
                      <p className="text-xs text-slate-600">Select an existing photo</p>
                    </div>
                  </div>
                </button>

                {/* Take New Photo */}
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setShowUploadModal(true);
                  }}
                  className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-900">Take New Photo</p>
                      <p className="text-xs text-slate-600">Use your camera to capture</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Remove Button - Centered */}
              {profile?.avatar_url && (
                <div className="pt-2 border-t border-slate-200">
                  <Button
                    onClick={() => {
                      setShowProfileModal(false);
                      setShowDeleteConfirm(true);
                    }}
                    disabled={uploading}
                    variant="outline"
                    className="w-full bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Photo
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" style={{ margin: 0 }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700 shadow-2xl relative"
          >
            <h3 className="text-lg text-white font-semibold mb-2">
              Remove Profile Picture?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Your profile will show your initials instead. You can always upload a new picture later.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                variant="outline"
                className="flex-1 bg-slate-700 hover:bg-slate-600 border-slate-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAvatar}
                disabled={uploading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {uploading ? 'Removing...' : 'Remove'}
              </Button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
