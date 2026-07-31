import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { supabase } from '../utils/supabase/client';
import { DatabaseService } from '../utils/supabase/database';
import { toast } from 'sonner';
import { CacheService } from '../utils/cache';
import { isNativeApp, NATIVE_REDIRECT_URL } from '../utils/native-app';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Refs so setInterval/setTimeout closures always read fresh state
  // without needing the effect to re-run on every auth state change.
  const isAuthenticatedRef = useRef(false);
  const isLoggingOutRef    = useRef(false);

  // Keep refs in sync with state (runs synchronously after every render where these changed)
  useEffect(() => { isAuthenticatedRef.current = isAuthenticated; }, [isAuthenticated]);
  useEffect(() => { isLoggingOutRef.current    = isLoggingOut;    }, [isLoggingOut]);

  const handleAuthError = useCallback((error) => {
    console.error('Auth error:', error);
    
    // Handle specific auth errors
    if (error?.message?.includes('Invalid Refresh Token') || 
        error?.message?.includes('Refresh Token Not Found') ||
        error?.message?.includes('refresh_token_not_found')) {
      console.warn('🔑 Refresh token is invalid - clearing session and signing out');
      
      // Clear all auth state
      setUser(null);
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      setAccessToken(null);
      
      // Clear stored tokens and auth state
      try {
        // Get the current user ID before clearing (for cache cleanup)
        const authStateStr = localStorage.getItem('eras-auth-state');
        let userId = null;
        if (authStateStr) {
          try {
            const authState = JSON.parse(authStateStr);
            userId = authState.user?.id;
          } catch (e) {
            console.warn('Could not parse auth state for cleanup:', e);
          }
        }
        
        // Clear auth-related storage
        localStorage.removeItem('eras-auth-state');
        localStorage.removeItem('eras_capsule_draft');
        sessionStorage.removeItem('capsule_redirect');
        sessionStorage.removeItem('capsule_view_token');
        
        // 🔥 CRITICAL: Clear dashboard cache to prevent stale data showing after logout
        if (userId) {
          console.log(`🧹 Clearing dashboard cache for user ${userId.substring(0, 8)}...`);
          localStorage.removeItem(`dashboard_capsules_${userId}`);
          sessionStorage.removeItem(`dashboard_capsules_${userId}`);
          localStorage.removeItem(`received_capsules_${userId}`);
          localStorage.removeItem(`received_capsules_v3_${userId}`);
          localStorage.removeItem(`received_count_${userId}`);
          console.log('✅ Dashboard cache cleared');
        }
        
        // Clear Supabase's stored session
        supabase.auth.signOut({ scope: 'local' });
      } catch (clearError) {
        console.warn('Error clearing auth state:', clearError);
      }
      
      // Show friendly error message
      toast.error('Your session has expired. Please sign in again.', {
        duration: 5000,
        position: 'top-center'
      });
    }
  }, []);

  const setUserFromSession = (session) => {
    const userData = {
      id: session.user.id,
      email: session.user.email,
      firstName: session.user.user_metadata?.firstName || 
                 session.user.user_metadata?.first_name || 
                 session.user.user_metadata?.full_name?.split(' ')[0] || 
                 session.user.user_metadata?.name?.split(' ')[0] ||
                 'User',
      lastName: session.user.user_metadata?.lastName || 
                session.user.user_metadata?.last_name || 
                session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') ||
                session.user.user_metadata?.name?.split(' ').slice(1).join(' ') ||
                ''
    };
    
    const provider = session.user.app_metadata?.provider;
    if (provider) {
      console.log(`✅ User authenticated via ${provider}`);
    }
    
    // Clear explicit logout flag on successful authentication
    try {
      sessionStorage.removeItem('eras-explicit-logout');
      sessionStorage.removeItem('eras-logout-timestamp');
      console.log('🔓 Cleared logout flag - auto-login now enabled');
    } catch (e) {
      console.warn('Could not clear logout flag:', e);
    }
    
    try {
      localStorage.setItem('eras-auth-state', JSON.stringify({
        isAuthenticated: true,
        user: userData,
        provider: provider,
        timestamp: Date.now()
      }));
    } catch (storageError) {
      console.warn('Could not store auth state:', storageError);
    }

    setUser(userData);
    setIsAuthenticated(true);
    setAccessToken(session.access_token);
    
    // Claim any pending capsules for this user's email
    const claimPendingCapsules = async () => {
      try {
        // Use the access token from the session we already have
        const accessToken = session.access_token;
        console.log('🔑 Using access token from active session');
        
        const result = await DatabaseService.claimPendingCapsules(accessToken);
        if (result.claimed > 0) {
          console.log(`🎉 Claimed ${result.claimed} pending capsule(s)`);
          
          // Clear received capsules cache to force refresh
          CacheService.delete(`received_capsules_${userData.id}`);
          CacheService.delete(`received_count_${userData.id}`);
          
          toast.success(
            `Welcome! You have ${result.claimed} capsule${result.claimed > 1 ? 's' : ''} waiting for you in your Received tab.`,
            {
              duration: 6000,
              position: 'top-center'
            }
          );
        }
      } catch (error) {
        console.error('Error claiming pending capsules:', error);
        // Silently fail - user can still view capsules via email links
      }
    };
    
    // Delay slightly to let the Edge Function server warm up (cold start protection)
    setTimeout(() => {
      claimPendingCapsules();
    }, 500);
    
    // Onboarding disabled
    // const checkOnboarding = () => {
    //   const hasCompletedOnboarding = localStorage.getItem('eras-onboarding-completed');
    //   const dontShowAgain = localStorage.getItem('eras-onboarding-dont-show-again');
    //   const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    //   
    //   if (!hasCompletedOnboarding && !dontShowAgain && !showOnboarding) {
    //     if (isIOSDevice) {
    //       setTimeout(() => setShowOnboarding(true), 800);
    //     } else {
    //       setShowOnboarding(true);
    //     }
    //   }
    // };
    // 
    // setTimeout(checkOnboarding, 150);
  };

  const checkExistingSession = async () => {
    try {
      console.log('🔍 Checking for existing session...');
      

      
      // CRITICAL: Check for explicit logout flag
      try {
        const explicitLogout = sessionStorage.getItem('eras-explicit-logout');
        const logoutTimestamp = sessionStorage.getItem('eras-logout-timestamp');
        
        if (explicitLogout === 'true') {
          const logoutAge = logoutTimestamp ? Date.now() - parseInt(logoutTimestamp) : 0;
          const fiveMinutes = 5 * 60 * 1000;
          
          if (logoutAge < fiveMinutes) {
            console.log('🔐 [SESSION CHECK] User explicitly logged out recently - blocking auto-login');
            console.log(`⏱️ Logout was ${Math.round(logoutAge / 1000)} seconds ago`);
            
            // Clear the flag after 5 minutes (in case user closed browser)
            if (logoutAge >= fiveMinutes) {
              sessionStorage.removeItem('eras-explicit-logout');
              sessionStorage.removeItem('eras-logout-timestamp');
            }
            
            setIsCheckingAuth(false);
            return;
          } else {
            // Flag expired, clear it
            console.log('ℹ️ Logout flag expired (>5 min), clearing...');
            sessionStorage.removeItem('eras-explicit-logout');
            sessionStorage.removeItem('eras-logout-timestamp');
          }
        }
      } catch (flagError) {
        console.warn('Could not check logout flag:', flagError);
      }
      
      if (!navigator.onLine) {
        console.log('📵 Device is offline, skipping auth check');
        setIsCheckingAuth(false);
        return;
      }

      // Check localStorage for existing auth state (backup/cache)
      let usedCachedAuth = false;
      try {
        const cachedAuth = localStorage.getItem('eras-auth-state');
        if (cachedAuth) {
          const authData = JSON.parse(cachedAuth);
          const age = Date.now() - (authData.timestamp || 0);
          const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
          
          if (age < maxAge && authData.isAuthenticated && authData.user) {
            console.log('📦 Found cached auth state (age: ' + Math.round(age / 1000 / 60) + ' minutes)');
            // Set cached state immediately for better UX
            setUser(authData.user);
            setIsAuthenticated(true);
            usedCachedAuth = true;
            
            // Show a subtle toast to let user know we're restoring their session
            toast.success('Welcome back! Restoring your session...', {
              duration: 2000,
              id: 'session-restore'
            });
          } else if (age >= maxAge) {
            console.log('⏰ Cached auth state expired, clearing...');
            localStorage.removeItem('eras-auth-state');
          }
        }
      } catch (cacheError) {
        console.warn('Could not read cached auth state:', cacheError);
      }

      // CRITICAL: If this is an OAuth callback, skip auto-login and let Auth.tsx handle it
      // This ensures the Auth component's useEffect can run and trigger ErasGate
      try {
        const hash = window.location.hash;
        const isOAuthCallback = hash && hash.includes('access_token') && !hash.includes('type=');
        
        if (isOAuthCallback) {
          console.log('🚪 [OAUTH] OAuth callback detected in checkExistingSession');
          console.log('🚪 [OAUTH] Skipping automatic session check to let Auth.tsx handle it');
          console.log('🚪 [OAUTH] This ensures ErasGate is triggered properly');
          setIsCheckingAuth(false);
          return;
        }
      } catch (e) {
        console.warn('Could not check for OAuth callback:', e);
      }

      try {
        const { data: { session }, error } = await Promise.race([
          supabase.auth.getSession(),
          new Promise<{ data: { session: null }, error: Error }>((_, reject) => 
            setTimeout(() => reject(new Error('Session check timeout')), 8000) // Increased to 8 seconds
          )
        ]);
        
        if (error) {
          console.error('❌ Auth session error:', error.message);
          
          // Handle refresh token errors specifically
          if (error.message?.includes('Invalid Refresh Token') || 
              error.message?.includes('Refresh Token Not Found') ||
              error.message?.includes('refresh_token_not_found')) {
            console.warn('🔑 Invalid refresh token detected during session check');
            handleAuthError(error);
            setIsCheckingAuth(false);
            return;
          } else {
            // For other errors, keep cached state if we have it
            if (!isAuthenticated) {
              setIsCheckingAuth(false);
            }
          }
          setIsCheckingAuth(false);
          return;
        }

        if (session?.user) {
          console.log('✅ Found existing session from Supabase');
          setUserFromSession(session);
          
          // Dismiss the cached session toast if we verified with Supabase
          if (usedCachedAuth) {
            toast.dismiss('session-restore');
            // Removed annoying "Session verified!" toast
          }
        } else {
          console.log('ℹ️ No existing session found in Supabase');
          // Clear cached auth if Supabase session doesn't exist
          if (isAuthenticated) {
            console.log('⚠️ Cached auth exists but Supabase session is gone - clearing cache');
            
            // Get user ID before clearing for cache cleanup
            const userId = user?.id;
            
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('eras-auth-state');
            
            // 🔥 Clear dashboard cache to prevent stale data
            if (userId) {
              console.log(`🧹 Clearing dashboard cache for expired session...`);
              localStorage.removeItem(`dashboard_capsules_${userId}`);
              sessionStorage.removeItem(`dashboard_capsules_${userId}`);
              localStorage.removeItem(`received_capsules_${userId}`);
              localStorage.removeItem(`received_capsules_v3_${userId}`);
              localStorage.removeItem(`received_count_${userId}`);
            }
            
            toast.error('Your session has expired. Please sign in again.', {
              duration: 4000
            });
          }
        }
      } catch (error) {
        // Handle timeout and other errors gracefully
        if (error.message === 'Session check timeout') {
          console.warn('⏱️ Session check timed out after 8 seconds');
          
          // If we have cached auth, let the user continue with it
          if (usedCachedAuth && isAuthenticated) {
            console.log('✅ Continuing with cached session (server check timed out)');
            toast.dismiss('session-restore');
            toast.success('Welcome back! (Using cached session)', { duration: 2000 });
          } else {
            console.log('⚠️ Session check timeout with no cached auth - user needs to sign in');
          }
        } else {
          console.error('❌ Auth check error:', error.message);
          handleAuthError(error);
        }
      } finally {
        setIsCheckingAuth(false);
      }
    } catch (error) {
      console.error('❌ Auth check error:', error.message);
      handleAuthError(error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAuthenticated = useCallback((userData, accessToken = null) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    // Clear explicit logout flag on successful authentication
    try {
      sessionStorage.removeItem('eras-explicit-logout');
      sessionStorage.removeItem('eras-logout-timestamp');
      console.log('🔓 Cleared logout flag - auto-login now enabled');
    } catch (e) {
      console.warn('Could not clear logout flag:', e);
    }
    
    // Claim any pending capsules for this user's email
    const claimPendingCapsules = async () => {
      try {
        // Use provided access token if available, otherwise get from session
        if (accessToken) {
          console.log('🔑 Using provided access token');
          const result = await DatabaseService.claimPendingCapsules(accessToken);
          if (result.claimed > 0) {
            console.log(`🎉 Claimed ${result.claimed} pending capsule(s)`);

            // Clear received capsules cache to force refresh
            CacheService.delete(`received_capsules_${userData.id}`);
            CacheService.delete(`received_capsules_v3_${userData.id}`);
            CacheService.delete(`received_count_${userData.id}`);
            
            toast.success(
              `Welcome! You have ${result.claimed} capsule${result.claimed > 1 ? 's' : ''} waiting for you in your Received tab.`,
              {
                duration: 6000,
                position: 'top-center'
              }
            );
          }
        } else {
          // Fallback: wait for session to be persisted
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const result = await DatabaseService.claimPendingCapsules();
          if (result.claimed > 0) {
            console.log(`🎉 Claimed ${result.claimed} pending capsule(s)`);

            // Clear received capsules cache to force refresh
            CacheService.delete(`received_capsules_${userData.id}`);
            CacheService.delete(`received_capsules_v3_${userData.id}`);
            CacheService.delete(`received_count_${userData.id}`);
            
            toast.success(
              `Welcome! You have ${result.claimed} capsule${result.claimed > 1 ? 's' : ''} waiting for you in your Received tab.`,
              {
                duration: 6000,
                position: 'top-center'
              }
            );
          }
        }
      } catch (error) {
        console.error('Error claiming pending capsules:', error);
        // Silently fail - user can still view capsules via email links
      }
    };
    
    // Add delay to allow Edge Function server to warm up (cold start protection)
    if (accessToken) {
      setTimeout(claimPendingCapsules, 500);
    } else {
      setTimeout(claimPendingCapsules, 2000);
    }
    
    // Onboarding disabled
    // const checkOnboarding = () => {
    //   const hasCompletedOnboarding = localStorage.getItem('eras-onboarding-completed');
    //   const dontShowAgain = localStorage.getItem('eras-onboarding-dont-show-again');
    //   const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    //   
    //   if (!hasCompletedOnboarding && !dontShowAgain && !showOnboarding) {
    //     if (isIOSDevice) {
    //       setTimeout(() => setShowOnboarding(true), 1000);
    //     } else {
    //       setShowOnboarding(true);
    //     }
    //   }
    // };
    // 
    // setTimeout(checkOnboarding, 100);
  }, []);

  const handleLogout = useCallback(async (options?: { preserveDraft?: boolean }) => {
    console.log('👋 Starting sign out process...');
    console.log('🧹 [LOGOUT] COMPLETE CLEANUP - Ensuring user is fully signed out');

    // Set refs immediately (synchronous) so any in-flight setInterval
    // callbacks see the correct values before React re-renders.
    isLoggingOutRef.current    = true;
    isAuthenticatedRef.current = false;

    setIsLoggingOut(true);
    setUser(null);
    setIsAuthenticated(false);
    setIsCheckingAuth(false);
    setShowOnboarding(false);
    setAccessToken(null);

    // Step 1: Clear ALL localStorage items
    try {
      // Clear per-user cache keys (capture userId before state is cleared)
      const logoutUserId = (user as any)?.id;
      if (logoutUserId) {
        localStorage.removeItem(`dashboard_capsules_${logoutUserId}`);
        sessionStorage.removeItem(`dashboard_capsules_${logoutUserId}`);
        localStorage.removeItem(`received_capsules_${logoutUserId}`);
        localStorage.removeItem(`received_capsules_v3_${logoutUserId}`);
        localStorage.removeItem(`received_count_${logoutUserId}`);
      }

      // preserveDraft: idle-timeout logout keeps the draft so user doesn't lose work
      if (!options?.preserveDraft) {
        localStorage.removeItem('eras_capsule_draft');
      } else {
        console.log('📝 [LOGOUT] Preserving capsule draft for next sign-in');
      }
      localStorage.removeItem('eras-onboarding-completed');
      localStorage.removeItem('eras-auth-state');
      localStorage.removeItem('eras-remember-email');
      localStorage.removeItem('eras-remember-me');
      localStorage.removeItem('eras-session-created');
      sessionStorage.removeItem('capsule_redirect');
      sessionStorage.removeItem('capsule_view_token');
      sessionStorage.removeItem('eras-tab-validated');
      
      // 🔒 BULLETPROOF CLEANUP: Clear all achievement session locks
      const sessionKeys = Object.keys(sessionStorage);
      for (const key of sessionKeys) {
        if (key.startsWith('eras_achievement_shown_') || 
            key.startsWith('eras_title_event_')) {
          sessionStorage.removeItem(key);
        }
      }
      console.log('🏆 Achievement session locks cleared');
      
      // Clear global achievement flags
      if (typeof window !== 'undefined') {
        (window as any).__erasAchievementShownIds = new Set();
        console.log('🌐 Global achievement flags reset');
      }
      
      // CRITICAL: Set explicit logout flag to prevent auto-login on next visit
      sessionStorage.setItem('eras-explicit-logout', 'true');
      sessionStorage.setItem('eras-logout-timestamp', Date.now().toString());
      
      console.log('🔒 Remember Me settings and capsule redirect tokens cleared');
      console.log('🔐 [LOGOUT] Set explicit logout flag - auto-login disabled');
      console.log('🌙 [LOGOUT] ✨ Lunar Eclipse will play on next sign-in');
    } catch (storageError) {
      console.warn('Could not clear localStorage:', storageError);
    }
    
    console.log('✅ Local session cleared - UI updated');
    
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Step 2: Force Supabase signOut with aggressive cleanup
    try {
      if (!navigator.onLine) {
        console.log('📵 Device offline - performing local sign out only');
        // Even offline, clear Supabase's local storage
        try {
          await supabase.auth.signOut({ scope: 'local' });
          console.log('✅ Local Supabase session cleared (offline mode)');
        } catch (localSignOutError) {
          console.warn('⚠️ Could not clear local Supabase session:', localSignOutError);
        }
        setIsLoggingOut(false);
        return;
      }
      
      console.log('🌐 [LOGOUT] Performing GLOBAL sign out to clear all sessions');
      
      // Use 'global' scope to sign out from all devices/tabs
      // This is critical for mobile browsers where session might persist
      await Promise.race([
        supabase.auth.signOut({ scope: 'global' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Logout timeout')), 3000)
        )
      ]);
      
      console.log('✅ Server sign out successful (global scope)');
      console.log('🧹 [LOGOUT] Supabase session cleared from all devices');
    } catch (signOutError) {
      if (signOutError.message === 'Logout timeout') {
        console.log('⚠️ Server sign out timed out - forcing local cleanup');
        // Even if server times out, ensure local session is cleared
        try {
          await supabase.auth.signOut({ scope: 'local' });
          console.log('✅ Fallback: Local session cleared');
        } catch (localError) {
          console.warn('⚠️ Could not clear local session:', localError);
        }
      } else {
        console.warn('⚠️ Server sign out error:', signOutError.message);
        // Try local signout as fallback
        try {
          await supabase.auth.signOut({ scope: 'local' });
          console.log('✅ Fallback: Local session cleared after error');
        } catch (localError) {
          console.warn('⚠️ Could not clear local session:', localError);
        }
      }
    } finally {
      // Step 3: Final aggressive cleanup - clear any Supabase storage keys
      try {
        // Clear Supabase auth keys from localStorage
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.startsWith('sb-') || 
            key.includes('supabase') || 
            key.includes('auth-token')
          )) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => {
          localStorage.removeItem(key);
          console.log(`🧹 [LOGOUT] Removed Supabase key: ${key.substring(0, 20)}...`);
        });
        
        if (keysToRemove.length > 0) {
          console.log(`✅ Cleared ${keysToRemove.length} Supabase storage keys`);
        }
      } catch (cleanupError) {
        console.warn('⚠️ Could not perform final storage cleanup:', cleanupError);
      }
      
      console.log('🎉 [LOGOUT] COMPLETE - User fully signed out, all sessions cleared');
      console.log('🔐 [LOGOUT] Next login will require authentication');
      setIsLoggingOut(false);
    }
  }, []);

  // Initialize auth
  useEffect(() => {
    let mounted = true;
    let pageLoadTimeout = null;
    let sessionMonitor = null;

    if (!isAuthenticated) {
      pageLoadTimeout = setTimeout(() => {
        if (mounted && isCheckingAuth && !isAuthenticated) {
          console.log('⏱️ Initial auth check completed - ready for login');
          setIsCheckingAuth(false);
        }
      }, 3000);
    }

    // Monitor session persistence every 30 seconds when authenticated.
    // Uses refs (not closure values) so the callback always sees fresh state.
    sessionMonitor = setInterval(async () => {
      // Skip entirely if not authenticated or already in a logout flow.
      if (!isAuthenticatedRef.current || isLoggingOutRef.current) return;

      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        // Refresh-token errors during the monitor almost always mean Supabase is
        // mid-rotation (old token consumed, new one not yet stored). Never sign
        // the user out immediately — always attempt recovery first.
        if (error) {
          const isTokenError =
            error.message?.includes('Invalid Refresh Token') ||
            error.message?.includes('Refresh Token Not Found') ||
            error.message?.includes('refresh_token_not_found');

          if (isTokenError) {
            console.warn('⚠️ Refresh token error in session monitor — attempting recovery (token rotation in progress?)');

            // Step 1: wait for rotation to complete, then re-check.
            await new Promise(resolve => setTimeout(resolve, 3500));
            if (!isAuthenticatedRef.current || isLoggingOutRef.current) return;

            const { data: { session: recoveredSession } } = await supabase.auth.getSession();
            if (recoveredSession) {
              console.log('✅ Session recovered after token rotation wait');
              setUserFromSession(recoveredSession);
              return;
            }

            // Step 2: explicitly ask Supabase to issue a new token pair.
            const { data: { session: refreshedSession }, error: refreshErr } =
              await supabase.auth.refreshSession();
            if (refreshedSession) {
              console.log('✅ Session refreshed successfully via refreshSession()');
              setUserFromSession(refreshedSession);
              return;
            }

            // Both recovery paths failed — the token is genuinely gone.
            console.warn('🔑 Refresh token unrecoverable after retry + refresh — signing out');
            handleAuthError(refreshErr ?? error);
            return;
          }
          // Non-token errors: ignore and let the next interval try again.
          return;
        }

        if (!session && isAuthenticatedRef.current && !isLoggingOutRef.current) {
          // getSession() can return null momentarily during a background token
          // refresh. Wait 3 s and verify before treating it as a real lost session.
          await new Promise(resolve => setTimeout(resolve, 3000));

          // Re-check refs — a logout may have started while we were waiting.
          if (!isAuthenticatedRef.current || isLoggingOutRef.current) return;

          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (!retrySession) {
            console.warn('⚠️ Session confirmed lost after retry - logging out');
            handleLogout();
          }
          // If retrySession exists, the token refresh completed fine — do nothing.
        }
      } catch (error) {
        console.warn('Session monitor error:', error);
        // Same recovery logic for thrown errors — don't sign out on first catch.
        const isTokenError =
          error?.message?.includes('Invalid Refresh Token') ||
          error?.message?.includes('Refresh Token Not Found') ||
          error?.message?.includes('refresh_token_not_found');
        if (isTokenError) {
          await new Promise(resolve => setTimeout(resolve, 3500));
          if (!isAuthenticatedRef.current || isLoggingOutRef.current) return;
          const { data: { session: s } } = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
          if (s) { setUserFromSession(s); return; }
          const { data: { session: s2 } } = await supabase.auth.refreshSession().catch(() => ({ data: { session: null } }));
          if (s2) { setUserFromSession(s2); return; }
          handleAuthError(error);
        }
      }
    }, 30000); // Check every 30 seconds

    // ── Deep-link handler for native iOS OAuth callbacks ────────────────────
    // When the app is opened via erasapp://auth/callback?code=...&... (or #...)
    // we extract the session from the URL and hand it to Supabase.
    const handleDeepLink = async (url: string) => {
      try {
        if (!url.startsWith('erasapp://')) return;
        console.log('🔗 [DeepLink] Incoming native callback URL received');

        // Supabase puts tokens in the hash fragment OR as query params depending on flow type.
        // exchangeCodeForSession handles both PKCE code and implicit token fragments.
        const { data, error } = await supabase.auth.exchangeCodeForSession(url);

        if (error) {
          console.error('🔗 [DeepLink] Failed to exchange code for session:', error.message);
          toast.error('Sign-in failed. Please try again.', { duration: 5000 });
          return;
        }

        if (data?.session) {
          console.log('🔗 [DeepLink] Session established via deep link ✅');
          setUserFromSession(data.session);
        }
      } catch (err) {
        console.error('🔗 [DeepLink] Unexpected error handling deep link:', err);
      }
    };

    // On initial load: if the page/app was opened with an erasapp:// URL,
    // window.location.href will contain it (some WKWebView bridges load it as the href).
    if (isNativeApp() && window.location.href.startsWith('erasapp://')) {
      handleDeepLink(window.location.href);
    }

    // Listen for subsequent deep links while the app is running.
    // Native shells (Capacitor, custom WKWebView) should dispatch this event
    // when a new URL opens the app.
    const onDeepLinkEvent = (e: Event) => {
      const url = (e as CustomEvent<{ url: string }>).detail?.url ?? (e as CustomEvent<string>).detail;
      if (typeof url === 'string') handleDeepLink(url);
    };
    window.addEventListener('erasapp:deeplink', onDeepLinkEvent);
    // ────────────────────────────────────────────────────────────────────────

    checkExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('🔐 Auth state change:', event, 'Session exists:', !!session?.user);
      
      if (event === 'SIGNED_OUT') {
        console.log('👋 User signed out');
        setUser(null);
        setIsAuthenticated(false);
        
        try {
          localStorage.removeItem('eras-auth-state');
          sessionStorage.removeItem('capsule_redirect');
          sessionStorage.removeItem('capsule_view_token');
          sessionStorage.removeItem('capsule_redirect_timestamp');
        } catch (storageError) {
          console.warn('Could not clear stored auth state:', storageError);
        }
      }
      
      if (event === 'SIGNED_IN' && session?.user && !isAuthenticated) {
        // CRITICAL: Check if this is an OAuth callback that should trigger ErasGate
        try {
          const oauthExpectsGate = sessionStorage.getItem('eras-oauth-expects-gate');
          const hash = window.location.hash;
          const isOAuthCallback = (hash && hash.includes('access_token') && !hash.includes('type=')) || oauthExpectsGate === 'true';
          
          if (isOAuthCallback) {
            console.log('🚪 [OAUTH] SIGNED_IN event for OAuth callback detected!');
            console.log('🚪 [OAUTH] This will be handled through Auth.tsx → ErasGate flow');
            // Set a flag so Auth component knows to process this
            sessionStorage.setItem('eras-oauth-callback-ready', 'true');
            return;
          }
        } catch (e) {
          console.warn('Could not check for OAuth callback:', e);
        }
        
        console.log('✅ User signed in');
        setUserFromSession(session);
        
        // Check for capsule redirect after OAuth completion
        // IMPORTANT: Only redirect if we're NOT already on a /view/ route to prevent redirect loops
        const currentPath = window.location.pathname;
        const isAlreadyOnViewRoute = currentPath.startsWith('/view/');
        
        if (!isAlreadyOnViewRoute) {
          const capsuleRedirect = sessionStorage.getItem('capsule_redirect');
          const viewToken = sessionStorage.getItem('capsule_view_token');
          const capsuleRedirectTimestamp = sessionStorage.getItem('capsule_redirect_timestamp');
          
          // CRITICAL FIX: Only redirect if the redirect token is fresh (less than 30 seconds old)
          // This prevents stale tokens from previous sessions from triggering unwanted redirects after app updates/refreshes
          const isFreshRedirect = capsuleRedirectTimestamp && 
            (Date.now() - parseInt(capsuleRedirectTimestamp)) < 30000; // 30 seconds
          
          if (capsuleRedirect && viewToken && isFreshRedirect) {
            console.log('📬 Redirecting to received capsule after OAuth authentication (fresh redirect token)');
            // Clear sessionStorage IMMEDIATELY to prevent redirect loops
            sessionStorage.removeItem('capsule_redirect');
            sessionStorage.removeItem('capsule_view_token');
            sessionStorage.removeItem('capsule_redirect_timestamp');
            
            // Add a small delay to ensure auth is fully set up
            setTimeout(() => {
              window.location.href = `/view/${viewToken}`;
            }, 500);
          } else if (capsuleRedirect || viewToken) {
            // Clear stale redirect tokens
            console.log('🧹 Clearing stale capsule redirect tokens (too old or incomplete)');
            sessionStorage.removeItem('capsule_redirect');
            sessionStorage.removeItem('capsule_view_token');
            sessionStorage.removeItem('capsule_redirect_timestamp');
          }
        } else {
          console.log('ℹ️ Already on view route, skipping capsule redirect check');
          // Clear any stale redirect tokens to prevent future issues
          sessionStorage.removeItem('capsule_redirect');
          sessionStorage.removeItem('capsule_view_token');
          sessionStorage.removeItem('capsule_redirect_timestamp');
        }
      }
      
      // Handle email verification/password recovery
      if (event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
        console.log(`🔐 Auth event: ${event}`, { hasSession: !!session, hasUser: !!session?.user });
        
        // If user is updated with a valid session, update our state
        if (session?.user && event === 'USER_UPDATED') {
          console.log('✅ User updated with valid session');
          
          // Only update if not already authenticated (avoid unnecessary updates)
          if (!isAuthenticated) {
            setUserFromSession(session);
          }
        }
      }
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('🔄 Token refreshed silently - no action needed');
        // CRITICAL: Do NOT update user state on token refresh
        // This was causing unwanted re-renders and tab resets
        // Supabase client handles token refresh automatically in the background
        // The session remains valid and all API calls will use the new token
        // We don't need to do anything here
      }
      
      // Handle token refresh errors
      if (event === 'USER_UPDATED' && !session?.user) {
        console.warn('⚠️ User update event with no session - possible token refresh failure');
      }
    });

    return () => {
      mounted = false;
      if (pageLoadTimeout) {
        clearTimeout(pageLoadTimeout);
      }
      if (sessionMonitor) {
        clearInterval(sessionMonitor);
      }
      if (subscription) {
        subscription.unsubscribe();
      }
      window.removeEventListener('erasapp:deeplink', onDeepLinkEvent);
    };
  }, []);

  // Helper function to get current access token (async)
  const getAccessToken = useCallback(async () => {
    // Try to use cached token first
    if (accessToken) {
      console.log('🔑 Using cached access token');
      return accessToken;
    }
    
    // Fallback: get from current session with retry and refresh logic
    try {
      console.log('🔄 Fetching fresh session token...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session fetch error:', error.message);
        
        // If refresh token is invalid, try to refresh the session
        if (error.message?.includes('Invalid Refresh Token') || 
            error.message?.includes('Refresh Token Not Found') ||
            error.message?.includes('refresh_token_not_found')) {
          console.warn('🔄 Refresh token invalid, attempting to refresh session...');
          
          try {
            const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
            
            if (refreshError) {
              console.error('❌ Session refresh failed:', refreshError.message);
              handleAuthError(refreshError);
              return null;
            }
            
            if (refreshedSession?.access_token) {
              console.log('✅ Session refreshed successfully');
              setAccessToken(refreshedSession.access_token);
              setUserFromSession(refreshedSession);
              return refreshedSession.access_token;
            }
          } catch (refreshErr) {
            console.error('❌ Session refresh exception:', refreshErr);
            handleAuthError(refreshErr);
            return null;
          }
        }
        
        return null;
      }
      
      if (session?.access_token) {
        console.log('✅ Got fresh access token from session');
        setAccessToken(session.access_token);
        return session.access_token;
      }
      
      console.warn('⚠️ No session available');
      return null;
    } catch (error) {
      console.error('❌ Error getting access token:', error);
      return null;
    }
  }, [accessToken, handleAuthError]);

  // Memoize the return object to prevent unnecessary re-renders in parent components
  // This ensures that if nothing actually changed, we return the same object reference
  // CRITICAL: Stringify user to ensure we only re-create object when user actually changes
  const userString = useMemo(() => user ? JSON.stringify(user) : null, [user]);
  
  // CRITICAL: Memoize setState functions to ensure stable references
  const setShowOnboardingMemoized = useCallback(setShowOnboarding, []);
  const setUserMemoized = useCallback(setUser, []);
  
  // CRITICAL FIX: Memoize user object separately using userString to prevent recreation
  // Parse userString back to object to ensure consistent reference when data hasn't changed
  const userObject = useMemo(() => {
    return userString ? JSON.parse(userString) : null;
  }, [userString]);
  
  // CRITICAL: Memoize session object separately to prevent creating new object every render
  // IMPORTANT: Use userString for memoization so session only changes when token OR user data changes
  const sessionObject = useMemo(() => {
    return accessToken && userObject ? { access_token: accessToken, user: userObject } : null;
  }, [accessToken, userString, userObject]);
  
  const authObject = useMemo(() => ({
    user: userObject,
    isAuthenticated,
    isCheckingAuth,
    isLoggingOut,
    showOnboarding,
    accessToken,
    session: sessionObject,
    isLoading: isCheckingAuth,
    setShowOnboarding: setShowOnboardingMemoized,
    handleAuthenticated,
    handleLogout,
    setUser: setUserMemoized,
    getAccessToken
  }), [userObject, userString, isAuthenticated, isCheckingAuth, isLoggingOut, showOnboarding, accessToken, sessionObject, setShowOnboardingMemoized, handleAuthenticated, handleLogout, setUserMemoized, getAccessToken]);
  
  // CRITICAL DIAGNOSTIC: Track what's causing authObject to recreate
  const authObjectRef = React.useRef(authObject);
  const authRenderCount = React.useRef(0);
  authRenderCount.current++;
  
  React.useEffect(() => {
    if (authObjectRef.current !== authObject) {
      // Only log if it's an unexpected recreation (not during initial auth check)
      const isExpectedChange = (
        authObjectRef.current?.isCheckingAuth !== authObject.isCheckingAuth ||
        authObjectRef.current?.isAuthenticated !== authObject.isAuthenticated ||
        authObjectRef.current?.accessToken !== authObject.accessToken
      );
      
      if (!isExpectedChange) {
        console.log('🔴 [useAuth] AUTH OBJECT RECREATED!', {
          renderCount: authRenderCount.current,
          isAuthenticated,
          hasUser: !!userObject,
          userId: userObject?.id,
          userChanged: authObjectRef.current?.user !== authObject.user,
          isCheckingAuth,
          isCheckingAuthChanged: authObjectRef.current?.isCheckingAuth !== authObject.isCheckingAuth,
          isLoggingOut,
          isLoggingOutChanged: authObjectRef.current?.isLoggingOut !== authObject.isLoggingOut,
          showOnboarding,
          showOnboardingChanged: authObjectRef.current?.showOnboarding !== authObject.showOnboarding,
          hasAccessToken: !!accessToken,
          accessTokenChanged: authObjectRef.current?.accessToken !== authObject.accessToken,
          sessionObjectChanged: authObjectRef.current?.session !== authObject.session,
          handleAuthenticatedChanged: authObjectRef.current?.handleAuthenticated !== authObject.handleAuthenticated,
          handleLogoutChanged: authObjectRef.current?.handleLogout !== authObject.handleLogout,
          getAccessTokenChanged: authObjectRef.current?.getAccessToken !== authObject.getAccessToken,
          setUserChanged: authObjectRef.current?.setUser !== authObject.setUser,
          sessionChanged: authObjectRef.current?.session !== authObject.session
        });
      }
      authObjectRef.current = authObject;
    }
  }, [authObject, isAuthenticated, userObject?.id, isCheckingAuth, isLoggingOut, showOnboarding, accessToken]);
  
  return authObject;
}