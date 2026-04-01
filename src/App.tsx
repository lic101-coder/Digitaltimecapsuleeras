import React, { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import {
  PlusCircle,
  BarChart3,
  LogOut,
  ChevronDown,
  Settings as SettingsIcon,
  Edit3,
  Camera,
  Sparkles,
  AlertCircle,
  X,
  Bell,
  FileText,
  Shield,
  RefreshCw,
  Users,
  FileBox,
  Calendar,
  Trophy,
  Landmark,
  Film,
  Menu,
  PackageOpen,
  HelpCircle,
  GraduationCap,
  Package,
  FolderOpen,
  ChevronRight,
  Compass,
} from "lucide-react";
import { MomentPrismLogo } from "./components/MomentPrismLogo";
import { CapsuleViewer } from "./components/CapsuleViewer";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { UnifiedHome } from "./components/UnifiedHome";
import { CreateCapsule } from "./components/CreateCapsule";
import { CapsuleDetailModal } from "./components/CapsuleDetailModal";
import { MobileRecorder } from "./components/MobileRecorder";
import { RecordInterface } from "./components/RecordInterface";
import { LegacyVault } from "./components/LegacyVault";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ErasOdyssey } from "./components/onboarding/ErasOdyssey";
import { OnboardingOrchestrator } from "./components/onboarding/OnboardingOrchestrator";
import { Settings } from "./components/Settings";
import { CalendarView } from "./components/CalendarView";
import "./utils/clearOldTutorial"; // Exposes window.clearTutorial() for dev use
import { NotificationPreferences } from "./components/NotificationPreferences";
import { LegacyAccessBeneficiaries } from "./components/LegacyAccessBeneficiaries";
import { TermsOfService } from "./components/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CleanupHiddenCapsules } from "./components/CleanupHiddenCapsules";
import { ResetPassword } from "./components/ResetPassword";
import { VerifyEmail } from "./components/VerifyEmail";
import { BeneficiaryVerification } from "./components/BeneficiaryVerification";
import { BeneficiaryVaultAccess } from "./components/BeneficiaryVaultAccess";
import RequestVerification from "./pages/RequestVerification";
import { AppLoader } from "./components/AppLoader";
import { LoadingAnimation } from "./components/LoadingAnimation";
import { ErasGate } from "./components/ErasGate";
import { AchievementsDashboard } from "./components/AchievementsDashboard";
import { AchievementUnlockManager } from "./components/AchievementUnlockManager";
import { TitleDisplay } from "./components/TitleDisplay";
import { TitleCarouselModal } from "./components/TitleCarouselModal";
import { HeaderBackground } from "./components/HeaderBackground";
import { WelcomeCelebrationManager } from "./components/WelcomeCelebrationManager";
import { ForgottenMemories } from "./components/ForgottenMemories";
import { ConnectionHealthIndicator } from "./components/ConnectionHealthIndicator";
import { EchoNotificationToast } from "./components/EchoNotificationToast";
import { EchoNotificationCenter } from "./components/EchoNotificationCenter";
import { NotificationCenter } from "./components/NotificationCenter";
import { WelcomeNotification } from "./components/WelcomeNotification";
import { Avatar } from "./components/Avatar";
import { ProfilePictureUploadModal } from "./components/ProfilePictureUploadModal";
import { HelpSupportModal } from "./components/HelpSupportModal";
import { MetaTags } from "./components/MetaTags";
import { MediaPreviewModal } from "./components/MediaPreviewModal";
import { ReferralSystem } from "./components/ReferralSystem";
import { UnsubscribePage } from "./components/UnsubscribePage";
import { Store } from "./components/Store";
import { motion, AnimatePresence } from "motion/react";

// Custom Hooks
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/textarea-fix.css";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useActivityTracking } from "./hooks/useActivityTracking";
import { useWorkflow } from "./hooks/useWorkflow";
import { useTabNavigation } from "./hooks/useTabNavigation";
import { useConnectionHealth } from "./hooks/useConnectionHealth";
import { useEchoNotifications } from "./hooks/useEchoNotifications";
import { useNotifications } from "./hooks/useNotifications";
import { useProfile } from "./hooks/useProfile";
import {
  TitlesProvider,
  useTitles,
} from "./contexts/TitlesContext";
import type { EchoNotification } from "./hooks/useEchoNotifications";

// Supabase
import { supabase } from "./utils/supabase/client";
import {
  projectId,
  publicAnonKey,
} from "./utils/supabase/info";
import { toast, Toaster } from "sonner";

// PHASE 1 PERFORMANCE OPTIMIZATION
import { CacheService } from "./utils/cache";

// Production logging system (use logger.debug() for dev-only logs, logger.info() for production)
import { logger } from "./utils/logger";

// Google Analytics Type Declaration
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Top-level error catching
logger.info("App.tsx loaded successfully");

export default function App() {
  // Add path state for client-side routing without page reloads
  const [currentPath, setCurrentPath] = React.useState(
    window.location.pathname,
  );

  React.useEffect(() => {
    // Service Worker Registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          logger.info(
            "✅ Service Worker registered with scope:",
            registration.scope,
          );

          // Check for updates
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    logger.info(
                      "🔄 New content is available; please refresh.",
                    );
                    // Show update toast
                    toast("Update available", {
                      description:
                        "A new version of Eras is available.",
                      action: {
                        label: "Refresh",
                        onClick: () => window.location.reload(),
                      },
                      duration: Infinity, // Keep it until they click
                    });
                  } else {
                    logger.info(
                      "✅ Content is cached for offline use.",
                    );
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          // Only log as debug since SW is not critical for app functionality
          logger.debug(
            "Service Worker registration failed (non-critical):",
            error,
          );
        });
    }

    // Google Analytics (gtag.js) Installation
    if (typeof window !== "undefined") {
      // Load gtag.js script
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-DNEMSVJVNQ";
      document.head.appendChild(gtagScript);

      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-DNEMSVJVNQ");

      logger.info("✅ Google Analytics initialized");
    }

    // PHASE 1 OPTIMIZATION: Initialize cache and performance monitoring
    try {
      CacheService.initialize();
      logger.debug("Cache service initialized");
    } catch (error) {
      logger.warn("Cache initialization failed:", error);
    }

    // Monitor for URL changes during this component's lifetime
    const handlePopState = (e: PopStateEvent) => {
      logger.debug(
        "popstate event fired during App component lifetime",
      );
      setCurrentPath(window.location.pathname);
    };
    const handleHashChange = (e: HashChangeEvent) => {
      logger.debug(
        "hashchange event fired during App component lifetime",
      );
    };

    // Listen for custom navigation events
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("navigate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
      window.removeEventListener("navigate", handleNavigation);
    };
  }, []);

  try {
    // Route handling - use state variable for instant client-side navigation
    const path = currentPath;
    const viewingMatch = path.match(/^\/view\/(.+)$/);

    // Handle special routes
    if (viewingMatch) {
      return <CapsuleViewer viewingToken={viewingMatch[1]} />;
    }

    // 🎁 Referral signup route: /join/:code
    const joinMatch = path.match(/^\/join\/(.+)$/);
    if (joinMatch) {
      const referralCode = joinMatch[1];
      // Redirect to home with ref parameter
      React.useEffect(() => {
        window.location.href = `/?ref=${referralCode}`;
      }, []);
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-xl mb-2">🎁 Welcome to Eras!</div>
            <div className="text-slate-400">Redirecting you to create your account...</div>
          </div>
        </div>
      );
    }

    // 🔥 NEW: Unsubscribe from referral invites route: /unsubscribe
    if (path === "/unsubscribe") {
      return <UnsubscribePage />;
    }

    if (path === "/terms") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <TermsOfService />
        </div>
      );
    }

    if (path === "/privacy") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <PrivacyPolicy />
        </div>
      );
    }

    if (path === "/cleanup-hidden") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
          <CleanupHiddenCapsules />
        </div>
      );
    }

    if (path === "/reset-password") {
      return (
        <ResetPassword
          onSuccess={() => {
            // After successful password reset, redirect to home
            window.location.href = "/";
          }}
        />
      );
    }

    if (path === "/verify-email") {
      return (
        <VerifyEmail
          onSuccess={() => {
            // After successful email verification, redirect to home
            window.location.href = "/";
          }}
        />
      );
    }

    if (path === "/verify-beneficiary") {
      // Extract token from URL query params
      const urlParams = new URLSearchParams(
        window.location.search,
      );
      const token = urlParams.get("token");

      return (
        <BeneficiaryVerification
          token={token || undefined}
          onComplete={() => {
            window.location.href = "/";
          }}
        />
      );
    }

    // ✅ NEW: Request verification link page (for beneficiaries who lost their email)
    if (path === "/request-verification") {
      return <RequestVerification />;
    }

    if (path === "/legacy-vault/access") {
      // Extract access token from URL query params
      const urlParams = new URLSearchParams(
        window.location.search,
      );
      const accessToken = urlParams.get("token");

      return (
        <BeneficiaryVaultAccess
          accessToken={accessToken || undefined}
          onBack={() => {
            window.location.href = "/";
          }}
        />
      );
    }

    if (path === "/test-welcome") {
      return <WelcomeCelebrationTest />;
    }

    // Main App Component - Wrap with AuthProvider and TitlesProvider
    // AuthProvider MUST be outermost to ensure single auth state instance
    return (
      <AuthProvider>
        <TitlesProvider>
          <MainApp />
        </TitlesProvider>
      </AuthProvider>
    );
  } catch (error) {
    logger.error("Fatal error in App component:", error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-red-600">
            App Failed to Load
          </h1>
          <p className="text-sm text-gray-600">
            Error:{" "}
            {error instanceof Error
              ? error.message
              : "Unknown error"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}

function MainApp() {
  // Track MainApp component lifecycle and renders (dev-only)
  const mainAppIdRef = React.useRef(
    Math.random().toString(36).substring(7),
  );
  const renderCountRef = React.useRef(0);
  renderCountRef.current++;

  logger.debug("MainApp rendering", {
    id: mainAppIdRef.current,
    renderCount: renderCountRef.current,
  });

  React.useEffect(() => {
    // Track last mount to detect unexpected remounts
    let lastMountTime = 0;
    let lastMountId = "";
    try {
      const stored = sessionStorage.getItem(
        "eras-mainapp-last-mount-time",
      );
      const storedId = sessionStorage.getItem(
        "eras-mainapp-last-mount-id",
      );
      if (stored) lastMountTime = parseInt(stored);
      if (storedId) lastMountId = storedId;
    } catch (e) {
      // Ignore
    }

    const now = Date.now();
    const currentId = mainAppIdRef.current;
    const timeSinceLastMount =
      lastMountTime > 0 ? now - lastMountTime : 0;

    // Detect remounts (expected in Figma Make dev mode due to HMR)
    if (
      timeSinceLastMount > 0 &&
      timeSinceLastMount < 5000 &&
      timeSinceLastMount > 100 &&
      lastMountId !== currentId
    ) {
      logger.debug("HMR: MainApp remounted", {
        timeSinceLastMount,
        previousId: lastMountId,
        currentId,
      });
    }

    // Store current mount info
    try {
      sessionStorage.setItem(
        "eras-mainapp-last-mount-time",
        now.toString(),
      );
      sessionStorage.setItem(
        "eras-mainapp-last-mount-id",
        currentId,
      );
    } catch (e) {
      // Ignore sessionStorage errors
    }

    logger.debug("MainApp mounted", {
      id: mainAppIdRef.current,
      renderCount: renderCountRef.current,
    });
    return () => {
      logger.debug("MainApp unmounting", {
        id: mainAppIdRef.current,
      });
    };
  }, []);

  // 🎁 CRITICAL: Capture referral code from URL on initial page load
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('ref');
      
      if (referralCode) {
        // Store in sessionStorage to persist through OAuth redirects
        sessionStorage.setItem('eras-pending-referral', referralCode);
        console.log(`🎯 [Referral] Captured referral code from URL: ${referralCode}`);
        
        // Clean up URL to remove ref parameter (optional, for cleaner URLs)
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('ref');
        window.history.replaceState({}, '', newUrl.toString());
      }
    } catch (error) {
      console.warn('⚠️ [Referral] Failed to capture referral code:', error);
    }
  }, []);

  // ErasGate state - universal authentication interceptor
  const [showErasGate, setShowErasGate] = React.useState(false);
  const [gateAuthData, setGateAuthData] = React.useState<{
    userData: any;
    accessToken: string;
    isFreshLogin: boolean;
  } | null>(null);
  const [pendingAuthData, setPendingAuthData] = React.useState<{
    userData: any;
    accessToken: string;
  } | null>(null);

  // Use a ref to track if we're transitioning to prevent any flash
  const isTransitioningRef = React.useRef(false);
  const [isTransitioning, setIsTransitioning] =
    React.useState(false);

  // Track if we should trigger slide animation - use ref for immediate availability
  const triggerSlideAnimationRef = React.useRef(false);
  const [triggerSlideAnimation, setTriggerSlideAnimation] =
    React.useState(false);

  // Track state changes (dev-only)
  React.useEffect(() => {
    logger.debug("[ErasGate] showErasGate changed", {
      showErasGate,
    });
  }, [showErasGate]);

  React.useEffect(() => {
    logger.debug("[ErasGate] gateAuthData changed", {
      hasValue: !!gateAuthData,
    });
  }, [gateAuthData]);

  React.useEffect(() => {
    logger.debug("[ErasGate] pendingAuthData changed", {
      hasValue: !!pendingAuthData,
      timestamp: new Date().toISOString(),
    });
  }, [pendingAuthData]);

  React.useEffect(() => {
    logger.debug("[ErasGate] isTransitioning changed", {
      isTransitioning,
    });
  }, [isTransitioning]);

  React.useEffect(() => {
    console.log(
      `🎬 [STATE CHANGE] triggerSlideAnimation: ${triggerSlideAnimation}`,
    );
  }, [triggerSlideAnimation]);

  // DIAGNOSTIC: Log state changes that trigger ErasGate
  React.useEffect(() => {
    if (showErasGate) {
      console.log("🚪 ErasGate activated");
    }
  }, [showErasGate]);

  React.useEffect(() => {
    if (isTransitioning) {
      console.log("🔄 Transition started");
    } else {
      console.log("✅ Transition complete");
    }
  }, [isTransitioning]);

  // PHASE 6: Connection Health Monitoring - Detects Cloudflare errors and database issues
  useConnectionHealth();

  // Global error handler for unhandled promise rejections (refresh token errors, etc.)
  React.useEffect(() => {
    const handleUnhandledRejection = (
      event: PromiseRejectionEvent,
    ) => {
      const error = event.reason;

      // Check if this is a refresh token error
      if (
        error?.message?.includes("Invalid Refresh Token") ||
        error?.message?.includes("Refresh Token Not Found") ||
        error?.message?.includes("refresh_token_not_found")
      ) {
        console.warn(
          "🔑 Unhandled refresh token error detected:",
          error,
        );

        // Prevent default error logging
        event.preventDefault();

        // Clear auth state and sign out
        localStorage.removeItem("eras-auth-state");
        localStorage.removeItem("eras-auth-token");

        // Sign out locally
        supabase.auth.signOut({ scope: "local" }).catch((e) => {
          console.warn("Error during local sign out:", e);
        });

        // Show user-friendly message
        toast.error(
          "Your session has expired. Please sign in again.",
          {
            duration: 5000,
            position: "top-center",
          },
        );
      }
    };

    window.addEventListener(
      "unhandledrejection",
      handleUnhandledRejection,
    );

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  const handleGateComplete = React.useCallback(
    (userData: any, accessToken: string) => {
      console.log("🚪 [ERAS GATE] Gate completion received");
      console.log(
        "🚪 [ERAS GATE] ⚠️ CRITICAL - This will set pendingAuthData and navigate to home!",
      );
      console.log("🚪 [ERAS GATE] User:", userData?.email);
      console.log(
        "🚪 [ERAS GATE] Timestamp:",
        new Date().toISOString(),
      );
      console.log(
        "🚪 [ERAS GATE] Stack trace:",
        new Error().stack,
      );
      console.log(
        "🚪 [ERAS GATE] Transitioning to Dashboard with user data",
      );

      // Set refs immediately (synchronous)
      isTransitioningRef.current = false;
      triggerSlideAnimationRef.current = true;

      // CRITICAL: Reset processing flags so subsequent logins work
      isProcessingAuthRef.current = false;
      console.log("🚪 [ERAS GATE] ✅ Reset processing flags");
      console.log("🚪 [ERAS GATE] ✨ Ready for next sign-in");

      // Clear the safety timeout since gate completed successfully
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
        processingTimeoutRef.current = null;
      }

      // Store auth data for MainAppContent
      setPendingAuthData({ userData, accessToken });

      // Close gate and trigger transition
      setShowErasGate(false);
      setGateAuthData(null);
      setTriggerSlideAnimation(true);
      setIsTransitioning(false);

      // Reset slide trigger after animation completes (800ms animation + buffer)
      setTimeout(() => {
        console.log("🎬 Resetting slide animation trigger");
        triggerSlideAnimationRef.current = false;
        setTriggerSlideAnimation(false);
      }, 1200);
    },
    [],
  );

  // Track if we're currently processing authentication
  const isProcessingAuthRef = React.useRef(false);
  const processingTimeoutRef = React.useRef<number | null>(
    null,
  );

  // CRITICAL FIX: Use refs for state checks to prevent callback recreation
  const showErasGateRef = React.useRef(showErasGate);
  const isTransitioningStateRef = React.useRef(isTransitioning);
  const pendingAuthDataRef = React.useRef(pendingAuthData);
  const gateAuthDataRef = React.useRef(gateAuthData);

  // Update refs when state changes
  React.useEffect(() => {
    showErasGateRef.current = showErasGate;
  }, [showErasGate]);

  React.useEffect(() => {
    isTransitioningStateRef.current = isTransitioning;
  }, [isTransitioning]);

  React.useEffect(() => {
    pendingAuthDataRef.current = pendingAuthData;
  }, [pendingAuthData]);

  React.useEffect(() => {
    gateAuthDataRef.current = gateAuthData;
  }, [gateAuthData]);

  // CRITICAL: Memoize callbacks to prevent MainAppContent from remounting
  // IMPORTANT: Must be declared BEFORE early return to comply with Rules of Hooks
  // Route ALL authentication through ErasGate - universal interceptor
  const onAuthenticationSuccess = React.useCallback(
    (
      userData: any,
      accessToken: string,
      options: { isFreshLogin?: boolean } = {},
    ) => {
      console.log(
        "🚪 [ERAS GATE] onAuthenticationSuccess called",
      );
      console.log("🚪 [ERAS GATE] userData:", userData);
      console.log(
        "🚪 [ERAS GATE] isFreshLogin:",
        options.isFreshLogin !== false,
      ); // Default to true
      console.log("🚪 [ERAS GATE] Current state:", {
        showErasGate: showErasGateRef.current,
        isTransitioning_current:
          isTransitioningStateRef.current,
        isProcessingAuthRef: isProcessingAuthRef.current,
        pendingAuthData: !!pendingAuthDataRef.current,
        gateAuthData: !!gateAuthDataRef.current,
      });

      // Determine if this is a fresh login (default to true for backward compatibility)
      const isFreshLogin = options.isFreshLogin !== false;

      // GUARD: Prevent duplicate calls if already processing
      if (isProcessingAuthRef.current) {
        console.warn(
          "🚪 [ERAS GATE] ⏭️ SKIPPED: Auth already in progress (duplicate call)",
        );
        console.log(
          "🚪 This is normal if multiple auth events fired simultaneously",
        );
        return;
      }

      // GUARD: Prevent duplicate calls if gate is already active
      if (showErasGateRef.current) {
        console.warn(
          "🚪 [ERAS GATE] ⏭️ SKIPPED: Gate already active (duplicate call)",
        );
        console.log(
          "🚪 This is normal if multiple auth events fired simultaneously",
        );
        return;
      }

      console.log("🚪 [ERAS GATE] ✅ Activating ErasGate");
      console.log(
        "🚪 [ERAS GATE] → User will be routed through universal authentication interceptor",
      );
      console.log(
        "🚪 [ERAS GATE] → Eclipse animation decision handled by gate",
      );
      isProcessingAuthRef.current = true;

      // Safety timeout: Reset processing flag after 15s in case gate fails
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      processingTimeoutRef.current = setTimeout(() => {
        if (isProcessingAuthRef.current) {
          console.warn(
            "⚠️ [ERAS GATE] Safety timeout: Resetting isProcessingAuthRef after 15s",
          );
          isProcessingAuthRef.current = false;
          setShowErasGate(false);
          setGateAuthData(null);
        }
        processingTimeoutRef.current = null;
      }, 15000);

      // Set ref immediately (synchronous) to prevent flash
      isTransitioningRef.current = true;

      // Activate ErasGate with auth data
      setIsTransitioning(true);
      setGateAuthData({ userData, accessToken, isFreshLogin });
      setShowErasGate(true);
      console.log(
        "🚪 [ERAS GATE] ✅ Gate activated - waiting for gate completion",
      );
    },
    [],
  ); // Empty deps - use refs for state checks instead

  const onAuthDataProcessed = React.useCallback(() => {
    setPendingAuthData(null);
  }, []);

  // If ErasGate should show, return it immediately AFTER all hooks are called
  // ErasGate is the universal authentication interceptor - it decides whether to show Eclipse
  if (showErasGate && gateAuthData) {
    console.log("🚪 [ERAS GATE] RENDERING ErasGate component");
    console.log(
      "🚪 [ERAS GATE] Gate will handle Eclipse animation decision",
    );
    return (
      <ErasGate
        userData={gateAuthData.userData}
        accessToken={gateAuthData.accessToken}
        isFreshLogin={gateAuthData.isFreshLogin}
        onGateComplete={handleGateComplete}
      />
    );
  } else {
    console.log(
      "🚪 [ERAS GATE] Not showing - showErasGate:",
      showErasGate,
      "hasGateData:",
      !!gateAuthData,
    );
  }

  // Now that animation is done, continue with normal app logic
  return (
    <>
      <MainAppContent
        onAuthenticationSuccess={onAuthenticationSuccess}
        pendingAuthData={pendingAuthData}
        gateAuthData={gateAuthData}
        onAuthDataProcessed={onAuthDataProcessed}
        isTransitioning={isTransitioningRef.current}
        triggerSlideAnimation={triggerSlideAnimation}
        triggerSlideAnimationRef={triggerSlideAnimationRef}
      />
      <Analytics />
    </>
  );
}

// CRITICAL: Memoize MainAppContent to prevent unnecessary remounts
// Custom comparison function to handle ref properly
const MainAppContent = React.memo(
  function MainAppContent({
    onAuthenticationSuccess,
    pendingAuthData,
    gateAuthData,
    onAuthDataProcessed,
    isTransitioning,
    triggerSlideAnimation,
    triggerSlideAnimationRef,
  }: {
    onAuthenticationSuccess: (
      userData: any,
      accessToken: string,
      options?: { isFreshLogin?: boolean },
    ) => void;
    pendingAuthData: {
      userData: any;
      accessToken: string;
    } | null;
    gateAuthData: {
      userData: any;
      accessToken: string;
      isFreshLogin: boolean;
    } | null;
    onAuthDataProcessed: () => void;
    isTransitioning: boolean;
    triggerSlideAnimation: boolean;
    triggerSlideAnimationRef: React.MutableRefObject<boolean>;
  }) {
    // Diagnostic: Detect unexpected remounts and log all relevant state
    const mountIdRef = React.useRef(
      Math.random().toString(36).substring(7),
    );
    const lastLoggedTab = React.useRef(null);

    // Track authentication state to prevent issues
    const isAuthenticatedRef = React.useRef(false);
    const isProcessingAuthRef = React.useRef(false);

    // Custom Hooks (MUST be declared BEFORE useEffects that depend on them)
    const auth = useAuth();
    const network = useNetworkStatus();
    const {
      activeTab,
      lastActiveTab,
      handleTabChange: originalHandleTabChange,
      setActiveTab,
    } = useTabNavigation();
    const workflow = useWorkflow();
    const { titleProfile, availableTitles } = useTitles();
    const { profile, refetchProfile } = useProfile();

    // Force re-render key for title display - increments when titleProfile changes
    const titleRenderKey = React.useMemo(() => {
      // Create a unique key based on equipped title to trigger animations
      return `${titleProfile?.equipped_achievement_id || "none"}-${Date.now()}`;
    }, [titleProfile?.equipped_achievement_id]);

    // Memoize bell color calculations to prevent re-computing on every render
    const bellStyles = React.useMemo(() => {
      const shouldUseBlackBell =
        !titleProfile?.equipped_title ||
        titleProfile?.equipped_title === "Sevenfold Sage";
      return {
        bellColor: shouldUseBlackBell ? "text-black" : "text-white",
        bellBorderColor: shouldUseBlackBell ? "border-black/40" : "border-white/40",
        bellBgColor: shouldUseBlackBell ? "bg-black/10" : "bg-white/10",
      };
    }, [titleProfile?.equipped_title]);

    // Check if this is an OAuth callback (for auth screen logic)
    const isOAuthCallback = React.useMemo(() => {
      try {
        const hash = window.location.hash;
        const hasOAuthHash =
          hash &&
          hash.includes("access_token") &&
          !hash.includes("type=");

        // CRITICAL: Also check for OAuth expectation flag set when user clicked "Sign in with Google"
        // This ensures Auth component renders even if Supabase has already processed the hash
        const oauthExpected =
          sessionStorage.getItem("eras-oauth-expects-gate") ===
          "true";

        const result = hasOAuthHash || oauthExpected;

        if (result) {
          console.log(
            "🚪 [OAUTH DETECTION] OAuth callback detected!",
            {
              hasOAuthHash,
              oauthExpected,
              hash: hash || "(no hash)",
            },
          );
        }

        return result;
      } catch {
        return false;
      }
    }, []);

    // Safety: Clear OAuth expectation flag after 10 seconds if it hasn't been cleared
    // This prevents the Auth screen from showing forever if something goes wrong
    React.useEffect(() => {
      if (
        isOAuthCallback &&
        sessionStorage.getItem("eras-oauth-expects-gate") ===
          "true"
      ) {
        const timeout = setTimeout(() => {
          console.warn(
            "⚠️ [OAUTH TIMEOUT] Clearing stale OAuth expectation flag after 10s",
          );
          sessionStorage.removeItem("eras-oauth-expects-gate");
          sessionStorage.removeItem("eras-oauth-flow");
          sessionStorage.removeItem("eras-oauth-timestamp");
          sessionStorage.removeItem(
            "eras-oauth-callback-ready",
          );
        }, 10000);

        return () => clearTimeout(timeout);
      }
    }, [isOAuthCallback]);

    // Local State (MUST be declared before useEffects that depend on them)
    const [editingCapsule, setEditingCapsule] = useState(null);
    const [viewingCapsule, setViewingCapsule] = useState(null); // NEW: For viewing received capsules in Portal overlay
    const [quickAddDate, setQuickAddDate] =
      useState<Date | null>(null); // NEW: Pre-filled date for Quick Add from Calendar
    const [dashboardRefreshKey, setDashboardRefreshKey] =
      useState(0);
    const [createCapsuleKey, setCreateCapsuleKey] = useState(0); // Force reset CreateCapsule
    const [showQuickRecorder, setShowQuickRecorder] =
      useState(false);

    // Echo Notification System - NEW: Using unified Notification Center only
    const [showNotificationCenter, setShowNotificationCenter] =
      useState(false);
    const [activeToasts, setActiveToasts] = useState<
      EchoNotification[]
    >([]);
    const [
      viewingCapsuleFromNotification,
      setViewingCapsuleFromNotification,
    ] = useState<{
      capsuleId: string;
      notificationType?: "received" | "delivered" | "echo";
    } | null>(null);

    // Settings dropdown state
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [showTutorialsSubmenu, setShowTutorialsSubmenu] = useState(false);

    // 📚 Onboarding Orchestrator state
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingModule, setOnboardingModule] = useState<
      string | undefined
    >(undefined);

    // 👑 Listen for Title Modal Close Event to trigger First Capsule onboarding
    React.useEffect(() => {
      const handleTitleModalClosed = (event: CustomEvent) => {
        const { title } = event.detail;

        console.log(
          "👑 [Title Modal Event] Received titleModalClosed event",
          { title },
        );

        // Only trigger for Time Novice title
        if (title === "Time Novice") {
          console.log(
            "👑 [Title Modal Event] Time Novice modal closed",
          );

          // Check if First Capsule onboarding has been completed
          const firstCapsuleCompleted = localStorage.getItem(
            "eras_onboarding_first_capsule_completed",
          );

          if (firstCapsuleCompleted) {
            console.log(
              "👑 [Title Modal Event] First Capsule already completed, skipping trigger",
            );
            return;
          }

          console.log(
            "👑 [Title Modal Event] Triggering First Capsule onboarding in 1 second...",
          );

          setTimeout(() => {
            console.log(
              "📚 [Onboarding Trigger] Showing First Capsule onboarding",
            );
            setShowOnboarding(true);
            setOnboardingModule("first_capsule");
          }, 1000); // 1 second delay
        }
      };

      window.addEventListener(
        "titleModalClosed",
        handleTitleModalClosed as EventListener,
      );

      return () => {
        window.removeEventListener(
          "titleModalClosed",
          handleTitleModalClosed as EventListener,
        );
      };
    }, []);

    // 🔥 Store removeMedia function from CreateCapsule
    const removeMediaByVaultIdRef = React.useRef<
      ((vaultId: string) => void) | null
    >(null);

    // Profile Picture Upload
    const [
      showProfilePictureUpload,
      setShowProfilePictureUpload,
    ] = useState(false);
    const {
      notifications,
      unreadCount,
      markAsRead,
      markAsSeen,
      markAllAsRead,
      dismissNotification,
      clearAll,
    } = useEchoNotifications(
      auth.user?.id || null,
      auth.session?.access_token || null,
    );

    // New Unified Notification System
    const {
      notifications: unifiedNotifications,
      unreadCount: unifiedUnreadCount,
      addNotification,
      markAsRead: markUnifiedAsRead,
      markAllAsRead: markAllUnifiedAsRead,
    } = useNotifications();

    // Migrate existing echo notifications to unified system (one-time migration on mount)
    // Track which notification IDs have been migrated to prevent duplicates
    const migratedNotificationIds = useRef(new Set<string>());
    React.useEffect(() => {
      if (!auth.user?.id) return;

      // Only migrate unread/unseen notifications that haven't been migrated yet
      const unseenEchoNotifications = notifications.filter(
        (n) =>
          (!n.seen || !n.read) &&
          !migratedNotificationIds.current.has(n.id),
      );

      if (unseenEchoNotifications.length > 0) {
        console.log(
          `🔄 [Migration] Migrating ${unseenEchoNotifications.length} echo notifications to unified system`,
        );

        unseenEchoNotifications.forEach((oldNotif) => {
          const echoType = oldNotif.echoType;
          const senderName = oldNotif.senderName || "Someone";
          const capsuleTitle =
            oldNotif.capsuleTitle || "your capsule";
          const echoContent = oldNotif.echoContent;
          const capsuleId = oldNotif.capsuleId;

          let title = "";
          let content = "";
          let metadata: any = {};

          if (echoType === "emoji") {
            title = `${senderName} reacted to your capsule`;
            content = `${senderName} reacted to your capsule`;
            metadata = {
              emoji: echoContent,
              senderName,
              capsuleName: capsuleTitle,
              capsuleId,
              echoId: oldNotif.echoId || oldNotif.id,
            };
          } else {
            title = `${senderName} commented on your capsule`;
            content = `${senderName} commented on \"${capsuleTitle}\"`;
            metadata = {
              senderName,
              capsuleName: capsuleTitle,
              capsuleId,
              echoText: echoContent,
              echoId: oldNotif.echoId || oldNotif.id,
            };
          }

          // Preserve original timestamp from echo notification
          const originalTimestamp =
            oldNotif.createdAt || oldNotif.timestamp;
          const timestampMs =
            typeof originalTimestamp === "string"
              ? new Date(originalTimestamp).getTime()
              : originalTimestamp;

          // Add to unified notification center with original timestamp
          const notifId = addNotification({
            type: "echo",
            title,
            content,
            metadata,
            timestamp: timestampMs, // Preserve original timestamp
          });

          // Track that we've migrated this notification
          if (notifId) {
            migratedNotificationIds.current.add(oldNotif.id);
            console.log(
              `✅ [Migration] Migrated notification ${oldNotif.id}`,
            );
          } else {
            // If addNotification returned null (duplicate), still mark as migrated
            migratedNotificationIds.current.add(oldNotif.id);
            console.log(
              `⏭️ [Migration] Skipped duplicate notification ${oldNotif.id}`,
            );
          }
        });
      }
    }, [auth.user?.id, notifications, addNotification]);

    // Enhanced mark all as read - marks both unified and old system notifications
    const handleMarkAllAsRead = React.useCallback(() => {
      // Mark unified notifications as read
      markAllUnifiedAsRead();

      // Also mark old echo notifications as read to keep systems in sync
      if (notifications.length > 0) {
        notifications.forEach((notif) => {
          if (!notif.read) {
            markAsRead(notif.id);
          }
        });
        console.log(
          "✅ [Mark All] Marked all notifications as read (unified + old system)",
        );
      }
    }, [markAllUnifiedAsRead, notifications, markAsRead]);

    // Audio notification ref
    const notificationSoundRef =
      useRef<HTMLAudioElement | null>(null);

    // Listen for echo notifications from server broadcasts
    React.useEffect(() => {
      if (!auth.user?.id || !auth.session?.access_token) return;

      const userId = auth.user.id;
      console.log(
        `🔔 [Echo Notifications] Setting up broadcast listener for user: ${userId}`,
      );

      const channel = supabase.channel(
        `echo_notifications:${userId}`,
      );

      channel.on(
        "broadcast",
        { event: "new_echo" },
        async (payload: any) => {
          console.log(
            "🔔 [Echo Notifications] Received broadcast:",
            payload,
          );
          const notification = payload.payload;

          if (!notification) {
            console.warn(
              "🔔 [Echo Notifications] Invalid payload - missing notification data",
            );
            return;
          }

          // Convert old echo notification format to new unified format
          const senderName =
            notification.senderName || "Someone";
          const capsuleTitle =
            notification.capsuleTitle || "your capsule";
          const echoType = notification.echoType;
          const echoContent = notification.echoContent;
          const capsuleId = notification.capsuleId;

          let title = "";
          let content = "";
          let metadata: any = {};

          if (echoType === "emoji") {
            title = `${senderName} reacted to your capsule`;
            content = `${senderName} reacted to your capsule`;
            metadata = {
              emoji: echoContent,
              senderName,
              capsuleName: capsuleTitle,
              capsuleId,
              echoId: notification.echoId || notification.id,
            };
          } else {
            title = `${senderName} commented on your capsule`;
            content = `${senderName} commented on "${capsuleTitle}"`;
            metadata = {
              senderName,
              capsuleName: capsuleTitle,
              capsuleId,
              echoText: echoContent,
              echoId: notification.echoId || notification.id,
            };
          }

          // Preserve original timestamp from broadcast notification
          const originalTimestamp =
            notification.createdAt || notification.timestamp;
          const timestampMs =
            typeof originalTimestamp === "string"
              ? new Date(originalTimestamp).getTime()
              : originalTimestamp;

          console.log(
            "🔔 [Echo Notifications] Adding notification:",
            {
              title,
              content,
              metadata,
              timestamp: new Date(timestampMs).toISOString(),
            },
          );

          // Check user's notification preferences before adding notification
          const {
            data: { user: currentUser },
          } = await supabase.auth.getUser();
          const notifPrefs =
            currentUser?.user_metadata?.notificationPreferences;

          // Check if echo notifications are enabled (default: true)
          const echoNotificationsEnabled =
            notifPrefs?.echoNotifications !== false;
          const echoSoundEnabled =
            notifPrefs?.echoSound !== false;
          const echoHapticEnabled =
            notifPrefs?.echoHaptic !== false;

          if (!echoNotificationsEnabled) {
            console.log(
              "🔇 Echo notifications disabled by user preference, skipping notification",
            );
            return;
          }

          // Add to unified notification center with original timestamp
          // FIXED: Duplicate notification prevention
          // We DO NOT call addNotification here because the migration logic (lines 671-741)
          // already syncs notifications from useEchoNotifications hook to the unified system.
          // Calling it here causes a race condition where the same notification is added twice.
          // We ONLY handle sound and haptics here.

          /* 
      addNotification({
        type: 'echo',
        title,
        content,
        metadata,
        timestamp: timestampMs // Preserve original timestamp
      });
      */

          // Play notification sound only if enabled
          if (
            echoSoundEnabled &&
            notificationSoundRef.current
          ) {
            notificationSoundRef.current.play().catch((err) => {
              console.log(
                "Could not play notification sound:",
                err,
              );
            });
          }

          // Trigger haptic feedback only if enabled
          if (echoHapticEnabled) {
            triggerHapticFeedback();
          }
        },
      );

      channel.subscribe((status) => {
        console.log(
          `🔔 [Echo Notifications] Channel status: ${status}`,
        );
      });

      return () => {
        console.log(
          `🔔 [Echo Notifications] Cleaning up broadcast listener`,
        );
        supabase.removeChannel(channel);
      };
    }, [
      auth.user?.id,
      auth.session?.access_token,
      addNotification,
    ]);

    React.useEffect(() => {
      // Use sessionStorage to track last mount timestamp across remounts
      let lastMountTime = 0;
      try {
        const stored = sessionStorage.getItem(
          "eras-last-mount-time",
        );
        if (stored) {
          lastMountTime = parseInt(stored);
        }
      } catch (e) {
        // Ignore storage errors
      }

      const now = Date.now();
      const currentId = mountIdRef.current;
      const timeSinceLastMount =
        lastMountTime > 0 ? now - lastMountTime : 0;

      // Also track mount ID to distinguish between remounts and re-renders
      let lastMountId = "";
      try {
        lastMountId =
          sessionStorage.getItem("eras-last-mount-id") || "";
      } catch (e) {
        // Ignore
      }

      // CRITICAL: Detect unexpected remounts (remount within 5 seconds is suspicious)
      // Only flag if this is a DIFFERENT component instance (different ID)
      const isRemount =
        timeSinceLastMount > 0 &&
        timeSinceLastMount < 5000 &&
        timeSinceLastMount > 100 &&
        lastMountId !== currentId;

      if (isRemount) {
        // HMR remount detected - silently restore scroll position
        // No need to log this expected development behavior

        // CRITICAL: Restore scroll position after HMR remount
        // Wait for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          try {
            const savedScrollPosition = sessionStorage.getItem(
              "eras-scroll-position",
            );
            const savedScrollTab = sessionStorage.getItem(
              "eras-scroll-tab",
            );

            if (
              savedScrollPosition &&
              savedScrollTab === activeTab
            ) {
              const scrollY = parseInt(savedScrollPosition);
              // Silently restore scroll position
              window.scrollTo(0, scrollY);

              // Double-check after a short delay (sometimes DOM needs more time)
              setTimeout(() => {
                if (window.scrollY !== scrollY) {
                  window.scrollTo(0, scrollY);
                }
              }, 100);
            }
          } catch (error) {
            console.warn(
              "Failed to restore scroll position:",
              error,
            );
          }
        });
      }

      // Mount tracking - silent in normal operation

      // Store current mount timestamp and ID for next mount detection
      try {
        sessionStorage.setItem(
          "eras-last-mount-time",
          now.toString(),
        );
        sessionStorage.setItem("eras-last-mount-id", currentId);
      } catch (e) {
        // Ignore storage errors
      }

      // Save scroll position continuously during this component's lifetime
      const saveScrollPosition = () => {
        try {
          sessionStorage.setItem(
            "eras-scroll-position",
            window.scrollY.toString(),
          );
          sessionStorage.setItem("eras-scroll-tab", activeTab);
        } catch (e) {
          // Ignore storage errors
        }
      };

      // Save scroll position on scroll events (debounced)
      let scrollTimeout: number;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(
          saveScrollPosition,
          150,
        );
      };

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      // Also save before unmount
      const handleBeforeUnmount = () => {
        saveScrollPosition();
      };

      return () => {
        console.log(
          `🎬 MainAppContent unmounting (ID: ${mountIdRef.current})`,
        );
        clearTimeout(scrollTimeout);
        window.removeEventListener("scroll", handleScroll);
        saveScrollPosition(); // Save one last time before unmount
      };
    }, [activeTab]); // Include activeTab so we track the correct tab

    // Monitor isTransitioning to catch rapid changes that could cause issues
    React.useEffect(() => {
      if (isTransitioning) {
        console.log(
          "🔄 Component is transitioning (hidden with opacity, not unmounted)",
        );
      } else {
        console.log(
          "✅ Component transition complete (visible)",
        );
      }
    }, [isTransitioning]);

    // State variables
    const [unexpectedReset, setUnexpectedReset] =
      useState(null);
    const [recorderFullscreen, setRecorderFullscreen] =
      useState(false);
    const [hasUnsavedWork, setHasUnsavedWork] = useState(false);
    const [showSessionWarning, setShowSessionWarning] =
      useState(false);
    const [sessionWarningCallback, setSessionWarningCallback] =
      useState(null);
    const [vaultRefreshKey, setVaultRefreshKey] = useState(0);
    const [recordResetKey, setRecordResetKey] = useState(0); // Force RecordInterface remount for clean state
    const [settingsSection, setSettingsSection] = useState<
      | "profile"
      | "titles"
      | "password"
      | "security"
      | "storage"
      | "notifications"
      | "account"
      | undefined
    >(undefined);
    const [showTitleCarousel, setShowTitleCarousel] =
      useState(false);
    const [showArchiveModal, setShowArchiveModal] =
      useState(false); // For Archive modal in gear menu
    const [showHelpModal, setShowHelpModal] = useState(false); // For Help & Support modal
    const [showReferralModal, setShowReferralModal] = useState(false); // For Referral System modal
    const [previewMedia, setPreviewMedia] = useState<any>(null); // For media preview from received capsules

    // Track when user is actively working on Create tab to prevent unexpected resets
    const userActiveOnCreateRef = React.useRef(false);
    const createTabOpenedAt = React.useRef<number | null>(null);

    // Track tab before navigating to vault (for back navigation)
    const tabBeforeVault = React.useRef<string | null>(null);

    // CRITICAL: Preserve scroll position across potential remounts
    // Save scroll position to sessionStorage periodically
    React.useEffect(() => {
      const saveScrollPosition = () => {
        try {
          const scrollY =
            window.scrollY ||
            document.documentElement.scrollTop;
          if (scrollY > 0) {
            sessionStorage.setItem(
              "eras-scroll-position",
              scrollY.toString(),
            );
            sessionStorage.setItem(
              "eras-scroll-tab",
              activeTab,
            );
          }
        } catch (e) {
          // Ignore storage errors
        }
      };

      // Save on scroll (throttled)
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(saveScrollPosition, 200);
      };

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      // Also save when tab changes
      saveScrollPosition();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [activeTab]);

    // CRITICAL: Restore scroll position on mount
    React.useEffect(() => {
      try {
        const savedPosition = sessionStorage.getItem(
          "eras-scroll-position",
        );
        const savedTab = sessionStorage.getItem(
          "eras-scroll-tab",
        );

        if (savedPosition && savedTab === activeTab) {
          const scrollY = parseInt(savedPosition);
          if (scrollY > 0) {
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollY);
              console.log(
                "📜 Restored scroll position:",
                scrollY,
              );
            });
          }
        }
      } catch (e) {
        // Ignore storage errors
      }
    }, []); // Only run once on mount

    // ✅ FIXED: Dashboard will handle clearing notification capsule ID after processing
    // The previous timer-based approach was clearing it too early when switching tabs

    // Process pending auth data after animation completes
    // CRITICAL: Store stable references to prevent dependency issues
    const handleAuthenticatedRef = React.useRef(
      auth.handleAuthenticated,
    );
    const setActiveTabRef = React.useRef(setActiveTab);
    const onAuthDataProcessedRef = React.useRef(
      onAuthDataProcessed,
    );

    // Update refs when callbacks change
    React.useEffect(() => {
      handleAuthenticatedRef.current = auth.handleAuthenticated;
      setActiveTabRef.current = setActiveTab;
      onAuthDataProcessedRef.current = onAuthDataProcessed;
    }, [
      auth.handleAuthenticated,
      setActiveTab,
      onAuthDataProcessed,
    ]);

    const pendingAuthProcessedRef = React.useRef(false);
    React.useEffect(() => {
      const isAuthenticated = auth.isAuthenticated;

      console.log("📊 [AUTH EFFECT] State check:", {
        hasPendingAuthData: !!pendingAuthData,
        isAuthenticated: isAuthenticated,
        alreadyProcessed: pendingAuthProcessedRef.current,
        timestamp: new Date().toISOString(),
        stackTrace: new Error().stack
          ?.split("\n")
          .slice(2, 5)
          .join("\n"),
      });

      if (
        pendingAuthData &&
        !isAuthenticated &&
        !pendingAuthProcessedRef.current
      ) {
        pendingAuthProcessedRef.current = true;
        console.log(
          "🎬 [AUTH EFFECT] Animation completed, processing authentication data",
        );
        console.log(
          "🎬 [AUTH EFFECT] ⚠️ THIS WILL NAVIGATE TO HOME TAB",
        );
        console.log(
          "🎬 [AUTH EFFECT] Stack trace:",
          new Error().stack,
        );
        console.log(
          "📊 [AUTH EFFECT] User data:",
          pendingAuthData.userData,
        );

        handleAuthenticatedRef.current(
          pendingAuthData.userData,
          pendingAuthData.accessToken,
        );
        console.log(
          "✅ [AUTH EFFECT] handleAuthenticated called",
        );

        // Mark as authenticated
        isAuthenticatedRef.current = true;
        isProcessingAuthRef.current = false;
        console.log(
          "✅ [AUTH EFFECT] Set isAuthenticatedRef.current = true",
        );

        onAuthDataProcessedRef.current();
        console.log(
          "✅ [AUTH EFFECT] onAuthDataProcessed called (should clear pendingAuthData)",
        );

        // ALWAYS navigate to dashboard/home after successful sign-in
        console.log(
          "🏠 [AUTH EFFECT] Navigating to Home tab after successful sign-in",
        );
        console.log(
          "🏠 [AUTH EFFECT] Current active tab before navigation:",
          activeTab,
        );
        console.log(
          "🏠 [AUTH EFFECT] Time since last mount:",
          Date.now() -
            parseInt(
              sessionStorage.getItem(
                "eras-mainapp-last-mount-time",
              ) || "0",
            ),
        );
        setActiveTabRef.current("home");
        console.log(
          "🏠 [AUTH EFFECT] ✅ Navigation command issued",
        );

        // 📚 Check if user needs onboarding (after Eras Gate has completed)
        const checkOnboarding = async () => {
          try {
            console.log(
              "📚 [ONBOARDING] Checking if user needs onboarding",
            );
            
            // CRITICAL: First check localStorage for faster response (helps with OAuth re-logins)
            const localStorageCompleted = localStorage.getItem('eras_onboarding_first_capsule_completed');
            if (localStorageCompleted === 'true') {
              console.log(
                "📚 [ONBOARDING] User has completed onboarding (localStorage check)",
              );
              return; // Skip backend check, user has completed
            }
            
            // Backend check (for cross-device consistency)
            const response = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/onboarding/state`,
              {
                headers: {
                  Authorization: `Bearer ${publicAnonKey}`,
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  userId: pendingAuthData.userData.id,
                }),
              },
            );

            if (response.ok) {
              const data = await response.json();
              const completionState =
                data.completionState || {};

              // Check if core onboarding is needed
              if (!completionState.first_capsule) {
                console.log(
                  "📚 [ONBOARDING] New user detected - showing core onboarding",
                );
                setShowOnboarding(true);
                setOnboardingModule(undefined); // undefined = auto-select first needed module
              } else {
                console.log(
                  "📚 [ONBOARDING] User has completed core onboarding (backend check)",
                );
                // Sync to localStorage for future fast checks
                localStorage.setItem('eras_onboarding_first_capsule_completed', 'true');
              }
            }
          } catch (error) {
            console.error(
              "❌ [ONBOARDING] Failed to check onboarding state:",
              error,
            );
          }
        };

        // Delay onboarding check slightly to ensure smooth transition after Eras Gate
        setTimeout(checkOnboarding, 500);
      }

      // Update authenticated state when auth.isAuthenticated changes
      if (isAuthenticated) {
        isAuthenticatedRef.current = true;
        isProcessingAuthRef.current = false;
      } else {
        isAuthenticatedRef.current = false;
        isProcessingAuthRef.current = false;
      }

      // Reset ref when pendingAuthData is cleared
      if (!pendingAuthData) {
        console.log(
          "🧹 [AUTH EFFECT] pendingAuthData cleared, resetting ref",
        );
        pendingAuthProcessedRef.current = false;
      }
    }, [pendingAuthData, auth.isAuthenticated]);

    // 🎁 NEW: Separate effect to check onboarding for newly authenticated users
    // This runs independently of pendingAuthData to catch all authentication scenarios
    const hasCheckedOnboardingRef = React.useRef(false);
    React.useEffect(() => {
      const isAuthenticated = auth.isAuthenticated;
      const userId = auth.user?.id;

      // Only check once per session, when user first becomes authenticated
      if (isAuthenticated && userId && !hasCheckedOnboardingRef.current) {
        hasCheckedOnboardingRef.current = true;

        const checkOnboardingForNewUser = async () => {
          try {
            console.log(
              "📚 [ONBOARDING CHECK] Checking onboarding state for authenticated user:",
              userId,
            );

            // Backend check is source of truth - do NOT check localStorage first
            // (localStorage can be stale from previous accounts with same email)
            const response = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/onboarding/state`,
              {
                headers: {
                  Authorization: `Bearer ${publicAnonKey}`,
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ userId }),
              },
            );

            if (response.ok) {
              const data = await response.json();
              const completionState = data.completionState || {};

              // Check if core onboarding is needed
              if (!completionState.first_capsule) {
                console.log(
                  "📚 [ONBOARDING CHECK] ✅ New user detected - showing First Capsule Tutorial",
                );
                // Small delay to ensure UI is ready
                setTimeout(() => {
                  setShowOnboarding(true);
                  setOnboardingModule("first_capsule");
                }, 1000);
              } else {
                console.log(
                  "📚 [ONBOARDING CHECK] User has completed onboarding",
                );
                // Sync to localStorage for faster subsequent checks
                localStorage.setItem(
                  "eras_onboarding_first_capsule_completed",
                  "true",
                );
              }
            } else {
              console.error(
                "❌ [ONBOARDING CHECK] Failed to fetch onboarding state:",
                response.status,
              );
            }
          } catch (error) {
            console.error(
              "❌ [ONBOARDING CHECK] Error checking onboarding:",
              error,
            );
          }
        };

        // Delay check to ensure Eras Gate animation has completed
        // and user is fully settled on the home screen
        setTimeout(checkOnboardingForNewUser, 1500);
      }

      // Reset when user logs out
      if (!isAuthenticated && hasCheckedOnboardingRef.current) {
        hasCheckedOnboardingRef.current = false;
      }
    }, [auth.isAuthenticated, auth.user?.id]);

    // 🔧 MOBILE FIX: Force close notification center when capsule modal opens
    React.useEffect(() => {
      if (viewingCapsule && showNotificationCenter) {
        console.log(
          "🔧 [MOBILE FIX] Closing notification center because capsule modal opened",
        );
        setShowNotificationCenter(false);
      }
    }, [viewingCapsule, showNotificationCenter]);

    // Auto-check for retroactive achievement unlocks on first login
    const hasCheckedRetroactiveRef = React.useRef(false);
    React.useEffect(() => {
      const isAuthenticated = auth.isAuthenticated;
      const accessToken = auth.session?.access_token;
      const userId = auth.user?.id;

      if (
        isAuthenticated &&
        accessToken &&
        userId &&
        !hasCheckedRetroactiveRef.current
      ) {
        hasCheckedRetroactiveRef.current = true;

        // Check localStorage to see if we've ever run this before
        const hasRunKey = `eras-retroactive-checked-${userId}`;
        const hasRunBefore = localStorage.getItem(hasRunKey);

        if (!hasRunBefore) {
          console.log(
            "🔄 [Retroactive] First login detected, checking for retroactive unlocks...",
          );

          // CRITICAL: Check if user has completed onboarding first
          // Don't run retroactive for brand new users - they should see tutorial first
          setTimeout(async () => {
            try {
              // Check onboarding state before running retroactive
              console.log("📚 [Retroactive] Checking if user has completed onboarding...");
              const onboardingCheck = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/onboarding/state`,
                {
                  headers: {
                    Authorization: `Bearer ${publicAnonKey}`,
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({ userId }),
                },
              );

              if (onboardingCheck.ok) {
                const onboardingData = await onboardingCheck.json();
                const completionState = onboardingData.completionState || {};

                // If user hasn't completed first capsule tutorial, skip retroactive
                if (!completionState.first_capsule) {
                  console.log(
                    "📚 [Retroactive] ⏭️ SKIPPING - user hasn't completed onboarding yet",
                  );
                  console.log(
                    "📚 [Retroactive] Tutorial will show first, then achievements after completion",
                  );
                  // Don't mark as checked - let it run after onboarding
                  hasCheckedRetroactiveRef.current = false;
                  return;
                }
              }

              console.log(
                "🔄 [Retroactive] ✅ User has completed onboarding, running migration...",
              );

              const response = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/achievements/retroactive-migration`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                },
              );

              if (response.ok) {
                const result = await response.json();

                if (result.success && result.newUnlocks > 0) {
                  console.log(
                    `✅ [Retroactive] Unlocked ${result.newUnlocks} achievements from past activity`,
                  );
                }

                // Mark as checked
                localStorage.setItem(hasRunKey, "true");
              }
            } catch (error) {
              console.error(
                "[Retroactive] Failed to check:",
                error,
              );
            }
          }, 5000); // 5 second delay - AFTER onboarding check (1.5s) completes
        }
      }
    }, [
      auth.isAuthenticated,
      auth.session?.access_token,
      auth.user?.id,
    ]);

    // 🎁 Check for pending referral achievements on login
    const hasCheckedReferralRef = React.useRef(false);
    React.useEffect(() => {
      const isAuthenticated = auth.isAuthenticated;
      const accessToken = auth.session?.access_token;
      const userId = auth.user?.id;

      if (
        isAuthenticated &&
        accessToken &&
        userId &&
        !hasCheckedReferralRef.current
      ) {
        hasCheckedReferralRef.current = true;

        console.log(
          "🔔 [Referral] Checking for pending referral achievements...",
        );

        // Check after a delay to let the app load
        setTimeout(async () => {
          try {
            const response = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/pending-achievements`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              },
            );

            if (response.ok) {
              const result = await response.json();

              if (result.unseenAchievements?.length > 0) {
                console.log(
                  `🎉 [Referral] Found ${result.unseenAchievements.length} unseen referral achievements!`,
                  result.unseenAchievements,
                );

                // Show celebration for each unseen achievement
                for (const achievement of result.unseenAchievements) {
                  // Dispatch achievement unlock event to trigger celebration modal
                  const event = new CustomEvent("achievementUnlocked", {
                    detail: {
                      achievementId: achievement.achievementId,
                      source: "referral_pending",
                    },
                  });
                  window.dispatchEvent(event);
                }

                // Mark as seen
                await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/mark-seen`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      achievementIds: result.unseenAchievements.map(
                        (a: any) => a.achievementId,
                      ),
                    }),
                  },
                );
              }
            }
          } catch (error) {
            console.error(
              "[Referral] Failed to check pending achievements:",
              error,
            );
          }
        }, 4000); // 4 second delay after login (after retroactive check)
      }
    }, [
      auth.isAuthenticated,
      auth.session?.access_token,
      auth.user?.id,
    ]);

    // Responsive logo sizing
    const [isMobile, setIsMobile] = React.useState(
      window.innerWidth < 640,
    );
    React.useEffect(() => {
      const handleResize = () =>
        setIsMobile(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () =>
        window.removeEventListener("resize", handleResize);
    }, []);

    // Monitor active tab changes for debugging with detailed context
    React.useEffect(() => {
      if (activeTab !== lastLoggedTab.current) {
        const stack = new Error().stack;
        console.log(
          `📊 Active tab changed: ${lastLoggedTab.current} → ${activeTab}`,
          {
            timestamp: new Date().toISOString(),
            isAuthenticated: auth.isAuthenticated,
            hasEditingCapsule: !!editingCapsule,
            createCapsuleKey,
            workflowStep: workflow.workflowStep,
            hasWorkflowMedia: !!workflow.workflowMedia,
            stackTrace: stack
              ?.split("\n")
              .slice(0, 5)
              .join("\n"), // First 5 lines of stack
          },
        );
        lastLoggedTab.current = activeTab;
      }
    }, [
      activeTab,
      auth.isAuthenticated,
      editingCapsule,
      createCapsuleKey,
      workflow.workflowStep,
      workflow.workflowMedia,
    ]);

    // Ensure valid tab is shown when authenticated (only run once EVER per session)
    React.useEffect(() => {
      // Only run this validation once per session using sessionStorage
      const hasValidated = sessionStorage.getItem(
        "eras-tab-validated",
      );

      console.log("📋 Tab validation check:", {
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        hasValidated,
        activeTab,
      });

      if (
        auth.isAuthenticated &&
        !auth.isLoading &&
        !hasValidated
      ) {
        sessionStorage.setItem("eras-tab-validated", "true");

        const validTabs = [
          "home",
          "create",
          "record",
          "vault",
          "received",
          "settings",
          "calendar",
          "notifications",
          "legacy-access",
          "terms",
          "privacy",
          "achievements",
        ];
        if (activeTab && !validTabs.includes(activeTab)) {
          console.log(
            "⚠️ Invalid tab detected on initial load, redirecting to home:",
            activeTab,
          );
          setActiveTab("home");
        } else {
          console.log(
            "✅ Tab validation passed on initial load:",
            activeTab,
          );
        }
      }
    }, [
      auth.isAuthenticated,
      auth.isLoading,
      activeTab,
      setActiveTab,
    ]);

    // Monitor when user is on Create tab and track how long they've been there
    React.useEffect(() => {
      if (activeTab === "create") {
        if (!createTabOpenedAt.current) {
          createTabOpenedAt.current = Date.now();
          console.log("🎨 User opened Create tab");
        }
        // Mark user as active after 5 seconds on the tab
        const timer = setTimeout(() => {
          userActiveOnCreateRef.current = true;
          console.log(
            "🎨 User is now actively working on Create tab (5s+ elapsed)",
          );
        }, 5000);

        return () => clearTimeout(timer);
      } else {
        // Reset when leaving Create tab
        if (userActiveOnCreateRef.current) {
          console.log(
            "🎨 User left Create tab after being active",
          );
        }
        userActiveOnCreateRef.current = false;
        createTabOpenedAt.current = null;
      }
    }, [activeTab]);

    // Clear workflow when navigating away from Create tab (unless going to record tab)
    // CRITICAL FIX: Store workflow.resetWorkflow in a ref to prevent dependency issues
    const workflowResetRef = React.useRef(
      workflow.resetWorkflow,
    );
    React.useEffect(() => {
      workflowResetRef.current = workflow.resetWorkflow;
    }, [workflow.resetWorkflow]);

    // NEW: Ref for returning to theme selection (Step 1) when clicking Compose while on Compose
    const returnToThemeSelectionRef = React.useRef<(() => void) | null>(null);

    React.useEffect(() => {
      const isLeavingCreate =
        lastActiveTab === "create" && activeTab !== "create";
      const isGoingToWorkflowTab = ["record", "vault"].includes(
        activeTab,
      );

      if (
        isLeavingCreate &&
        !isGoingToWorkflowTab &&
        !editingCapsule
      ) {
        console.log(
          "🧹 Clearing workflow state when leaving Create tab",
        );
        workflowResetRef.current();
        // Also clear Quick Add date when leaving Create tab
        setQuickAddDate(null);
      }

      // Clear settings section when leaving Settings tab
      if (
        lastActiveTab === "settings" &&
        activeTab !== "settings"
      ) {
        setSettingsSection(undefined);
      }
    }, [activeTab, lastActiveTab, editingCapsule]);

    // Wrapper for handleTabChange to reset CreateCapsule when navigating to Create tab
    // CRITICAL FIX: Store callbacks in refs to prevent dependency issues
    const originalHandleTabChangeRef = React.useRef(
      originalHandleTabChange,
    );
    React.useEffect(() => {
      originalHandleTabChangeRef.current =
        originalHandleTabChange;
    }, [originalHandleTabChange]);

    const handleTabChange = React.useCallback(
      async (newTab, options = {}) => {
        const { editingCapsuleOverride = null } = options;
        // CRITICAL FIX: Reset RecordInterface when navigating TO Record tab for clean state
        if (newTab === "record" && activeTab !== "record") {
          console.log(
            "🎥 Navigating to Record tab - incrementing reset key for fresh mount",
          );
          setRecordResetKey((prev) => prev + 1);
        }

        // If navigating to Create tab from anywhere except Record/Vault tabs, reset for fresh start
        // This preserves the workflow when coming from Record or Vault but clears old state otherwise
        // IMPORTANT: Use activeTab (current) instead of lastActiveTab because lastActiveTab hasn't been updated yet
        const isComingFromWorkflowTab = [
          "record",
          "vault",
        ].includes(activeTab);
        // 🔥 FIX #2: ALSO preserve when coming FROM create tab (navigating away and back)
        const isComingFromCreateTab = activeTab === "create";
        // IMPORTANT: Don't check workflow.workflowMedia here because state might not be updated yet
        const shouldPreserveWorkflow =
          isComingFromWorkflowTab || isComingFromCreateTab;

        // 🔥 NEW: Check if user has a draft with work in progress
        let hasDraftWorkInProgress = false;
        try {
          const draftStr = localStorage.getItem(
            "eras_capsule_draft",
          );
          if (draftStr) {
            const draft = JSON.parse(draftStr);
            hasDraftWorkInProgress = !!(
              draft.title ||
              draft.textMessage ||
              (draft.mediaFiles && draft.mediaFiles.length > 0)
            );
            console.log("📄 Draft exists:", {
              hasTitle: !!draft.title,
              hasMessage: !!draft.textMessage,
              titlePreview: draft.title?.substring(0, 30),
              messagePreview: draft.textMessage?.substring(
                0,
                30,
              ),
            });
          } else {
            console.log("📄 No draft found in localStorage");
          }
        } catch (e) {
          console.error("📄 Error checking draft:", e);
        }

        // CRITICAL: Only reset CreateCapsule if we're actually navigating TO create from a different tab
        // Don't reset if we're already on create tab (prevents unexpected resets while working)
        const isActuallyNavigatingToCreate =
          newTab === "create" && activeTab !== "create";

        // CRITICAL PROTECTION: If user has been actively working on Create tab, never allow unexpected resets
        const timeOnCreateTab = createTabOpenedAt.current
          ? Date.now() - createTabOpenedAt.current
          : 0;
        const userHasBeenWorking =
          userActiveOnCreateRef.current ||
          timeOnCreateTab > 3000;

        console.log("🔄 TAB CHANGE:", {
          from: activeTab,
          to: newTab,
          isActuallyNavigatingToCreate,
          shouldPreserveWorkflow,
          hasDraftWorkInProgress,
          willResetKey:
            isActuallyNavigatingToCreate &&
            !editingCapsule &&
            !shouldPreserveWorkflow &&
            !hasDraftWorkInProgress,
          currentKey: createCapsuleKey,
        });

        if (isActuallyNavigatingToCreate) {
          const effectiveEditingCapsule = editingCapsuleOverride || editingCapsule;
          if (
            !effectiveEditingCapsule &&
            !shouldPreserveWorkflow &&
            !hasDraftWorkInProgress
          ) {
            console.log(
              "🔄 ❌ RESETTING CreateCapsule - component will REMOUNT and LOSE state (coming from:",
              activeTab,
              ")",
            );
            // IMPORTANT: Reset workflow FIRST to clear workflowMedia before CreateCapsule renders
            workflowResetRef.current();
            setCreateCapsuleKey((prev) => prev + 1);
            setEditingCapsule(null);
            // Reset activity tracking
            userActiveOnCreateRef.current = false;
            createTabOpenedAt.current = null;
          } else if (shouldPreserveWorkflow) {
            console.log(
              "✅ PRESERVING workflow - coming from:",
              activeTab,
              "(component will NOT remount, state preserved)",
            );
          } else if (effectiveEditingCapsule) {
            console.log(
              "✅ Preserving state - editing existing capsule",
            );
          } else if (hasDraftWorkInProgress) {
            console.log(
              "✅ Preserving draft - user has work in progress",
            );
          }
        } else if (
          newTab === "create" &&
          activeTab === "create"
        ) {
          console.log(
            "⏭️ Clicking Compose while already on Create tab - returning to Step 1 (theme selection)",
          );
          // User wants to restart - trigger callback to return to Step 1
          if (returnToThemeSelectionRef.current) {
            returnToThemeSelectionRef.current();
          }
        }

        // IMPORTANT: When leaving Create tab (going to any other tab except record/vault), clear the workflow
        if (
          activeTab === "create" &&
          newTab !== "create" &&
          !["record", "vault"].includes(newTab)
        ) {
          console.log(
            "🧹 Clearing workflow when leaving Create tab to:",
            newTab,
          );
          workflowResetRef.current();
        }

        // Track the previous tab when navigating TO vault (for back navigation)
        if (newTab === "vault" && activeTab !== "vault") {
          tabBeforeVault.current = activeTab;
          console.log(
            "🏛️ Navigating to Vault from:",
            activeTab,
          );

          // 🔥 CRITICAL FIX: Only sync importedVaultMediaIds when NOT coming from create tab
          // When coming from create tab, handleOpenVault has already set the correct IDs
          // and we shouldn't overwrite them with potentially stale workflowMedia
          if (activeTab !== "create") {
            // This ensures the vault shows the correct selection state even when
            // the user navigated directly to vault (not through CreateCapsule's vault button)
            const currentMedia = workflow.workflowMedia || [];
            const currentImportedIds = new Set<string>();
            currentMedia.forEach((item) => {
              const vaultId = item.vault_id || item.id;
              if (vaultId && item.fromVault) {
                currentImportedIds.add(vaultId);
              }
            });
            workflow.setImportedVaultMediaIds(
              currentImportedIds,
            );
            console.log(
              "📌 Synced imported vault media IDs on vault navigation:",
              currentImportedIds.size,
              "items",
            );
          } else {
            console.log(
              "📌 Skipping sync - already handled by handleOpenVault",
            );
          }
        }

        // Close any open overlays when navigating tabs (especially capsule portal/viewing overlay)
        setViewingCapsule(null);

        // Call the original handleTabChange
        await originalHandleTabChangeRef.current(newTab);

        // 🔥 SCROLL TO TOP: Always scroll to top when changing tabs
        // This ensures every tab loads at the top, especially the Vault
        if (activeTab !== newTab) {
          console.log(
            "📜 Scrolling to top for new tab:",
            newTab,
          );

          // Clear any saved scroll position to prevent restoration
          try {
            sessionStorage.removeItem("eras-scroll-position");
            sessionStorage.removeItem("eras-scroll-tab");
          } catch (e) {
            // Ignore storage errors
          }

          // Scroll to top immediately
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });

            // Double-check after animation
            setTimeout(() => {
              if (window.scrollY > 0) {
                window.scrollTo({
                  top: 0,
                  behavior: "instant",
                });
              }
            }, 300);
          });
        }
      },
      [editingCapsule, activeTab],
    );

    // Activity tracking
    useActivityTracking(activeTab, showQuickRecorder);

    // Helper: Play notification sound (subtle and respectful)
    const playNotificationSound =
      React.useCallback(async () => {
        try {
          // Check user's notification preferences
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const echoSoundEnabled =
            user?.user_metadata?.notificationPreferences
              ?.echoSound !== false;

          if (!echoSoundEnabled) {
            console.log(
              "🔇 Echo sounds disabled by user preference",
            );
            return;
          }

          // Create a subtle notification sound using Web Audio API
          const audioContext = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          // Gentle two-tone notification sound (like a soft chime)
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(
            800,
            audioContext.currentTime,
          ); // First tone
          oscillator.frequency.setValueAtTime(
            1000,
            audioContext.currentTime + 0.1,
          ); // Second tone

          gainNode.gain.setValueAtTime(
            0.15,
            audioContext.currentTime,
          ); // Gentle volume
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.4,
          );

          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.4);
        } catch (error) {
          // Silently fail if audio isn't supported
          console.log(
            "Audio notification not available:",
            error,
          );
        }
      }, []);

    // Helper: Trigger haptic feedback (mobile)
    const triggerHapticFeedback =
      React.useCallback(async () => {
        try {
          // Check user's notification preferences
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const echoHapticEnabled =
            user?.user_metadata?.notificationPreferences
              ?.echoHaptic !== false;

          if (!echoHapticEnabled) {
            console.log(
              "📳 Echo haptic feedback disabled by user preference",
            );
            return;
          }

          if ("vibrate" in navigator) {
            // Gentle double-tap vibration pattern
            navigator.vibrate([30, 50, 30]);
          }
        } catch (error) {
          // Silently fail if haptics aren't supported
        }
      }, []);

    // Echo Notification System - NEW: Using unified Notification Center only
    // All echo notifications are now displayed in the Notification Center (bell icon)
    // No modals, no toasts - just the clean Notification Center interface
    React.useEffect(() => {
      console.log(
        `🔔 [Notifications] Using unified Notification Center for all echo notifications`,
      );
      console.log(
        `📊 [Notifications] Current notification count: ${notifications.length}, Unread: ${unreadCount}`,
      );
      console.log(
        `📊 [Notifications] UNIFIED unreadCount: ${unifiedUnreadCount}`,
      );
      console.log(
        `📊 [Notifications] UNIFIED notifications: ${unifiedNotifications.length}`,
      );
      console.log(
        `🔔 [BADGE CHECK] Should show badge: ${unifiedUnreadCount > 0 ? "YES" : "NO"}`,
      );
    }, [
      notifications,
      unreadCount,
      unifiedUnreadCount,
      unifiedNotifications,
    ]);

    // Clean up stale capsule redirect tokens on mount (if not on a /view/ route)
    // AND check if we should navigate to Received tab after viewing a capsule
    // IMPORTANT: Only run ONCE on mount, not on every auth state change
    const hasRunRedirectCleanup = React.useRef(false);
    const initialAuthState = React.useRef(auth.isAuthenticated);

    React.useEffect(() => {
      // CRITICAL: Only run once, ever. Use ref to prevent re-running on auth changes.
      if (hasRunRedirectCleanup.current) {
        return;
      }

      // Only run if user is authenticated (wait for first auth check to complete)
      if (!auth.isAuthenticated) {
        return;
      }

      // CRITICAL: Mark as run IMMEDIATELY to prevent any possibility of re-running
      hasRunRedirectCleanup.current = true;
      console.log(
        "🧹 Running redirect cleanup logic (one-time only)",
      );

      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/view/")) {
        // Check if we should navigate to Received tab after viewing a capsule
        const capsuleRedirect = sessionStorage.getItem(
          "capsule_redirect",
        );
        if (capsuleRedirect === "received") {
          console.log(
            "📬 Navigating to Received tab after capsule view",
          );
          sessionStorage.removeItem("capsule_redirect");
          sessionStorage.removeItem("capsule_view_token");
          sessionStorage.removeItem(
            "capsule_redirect_timestamp",
          );
          setActiveTab("received");
          return;
        }

        // Clear any stale redirect tokens that might cause unwanted redirects
        const hasRedirectTokens =
          sessionStorage.getItem("capsule_redirect") ||
          sessionStorage.getItem("capsule_view_token");
        if (hasRedirectTokens) {
          console.log(
            "🧹 Clearing stale capsule redirect tokens on main app load",
          );
          sessionStorage.removeItem("capsule_redirect");
          sessionStorage.removeItem("capsule_view_token");
          sessionStorage.removeItem(
            "capsule_redirect_timestamp",
          );
        }
      }
    }, [auth.isAuthenticated, setActiveTab]);


    const recordRestoreMediaRef = React.useRef<
      ((media: any) => void) | null
    >(null); // Callback to restore media in RecordInterface

    const handleCapsuleCreated = React.useCallback(() => {
      // CRITICAL: Clear ALL dashboard cache when a capsule is created/updated
      if (auth.user?.id) {
        const cacheKey = `dashboard_capsules_${auth.user.id}`;
        try {
          localStorage.removeItem(cacheKey);
          sessionStorage.removeItem(cacheKey);
          // Also clear any selection state to prevent confusion
          sessionStorage.removeItem(
            `dashboard_selection_${auth.user.id}`,
          );
          sessionStorage.removeItem(
            `dashboard_selection_restored_${auth.user.id}`,
          );
          // CRITICAL: Set invalidation timestamp to force Dashboard to re-fetch
          localStorage.setItem(
            `dashboard_invalidated_${auth.user.id}`,
            Date.now().toString(),
          );
          console.log(
            "🗑️ All dashboard cache cleared and invalidated after capsule creation/update",
          );
        } catch (error) {
          console.warn(
            "Failed to clear dashboard cache:",
            error,
          );
        }
      }

      setDashboardRefreshKey((prev) => {
        const newKey = prev + 1;
        console.log(
          `🔄 Dashboard refresh key updated: ${prev} → ${newKey} (forces remount for fresh data)`,
        );
        return newKey;
      });
      workflow.resetWorkflow();
      setEditingCapsule(null);
      setQuickAddDate(null); // Clear Quick Add date after capsule is created
      handleTabChange("home");

      // 🎁 Check if user was referred and trigger referral achievement
      console.log('🎯 [Referral] handleCapsuleCreated called - checking referral status');
      console.log('🎯 [Referral] auth.user?.id:', auth.user?.id);
      
      // Get fresh access token asynchronously
      auth.getAccessToken().then((accessToken) => {
        console.log('🎯 [Referral] Retrieved access token:', accessToken ? 'exists' : 'missing');
        
        if (accessToken) {
          console.log('🎯 [Referral] Calling check-achievement after capsule creation for user:', auth.user?.id);
          fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/check-achievement`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          )
            .then((res) => {
              console.log('🎯 [Referral] check-achievement response status:', res.status);
              return res.json();
            })
            .then((data) => {
              console.log('🎯 [Referral] check-achievement response data:', data);
              if (data.referred && data.unlockedAchievements?.length > 0) {
                console.log(
                  `🎉 [Referral] Unlocked achievements for referrer:`,
                  data.unlockedAchievements,
                );
              } else if (data.referred) {
                console.log('🎯 [Referral] User was referred but no achievements unlocked yet');
              } else {
                console.log('🎯 [Referral] User was not referred by anyone');
              }
            })
            .catch((err) => {
              console.error('❌ [Referral] Failed to check referral achievement:', err);
            });
        } else {
          console.warn('⚠️ [Referral] No access token available to check achievement');
        }
      }).catch((err) => {
        console.error('❌ [Referral] Failed to retrieve access token:', err);
      });
    }, [
      auth.user?.id,
      auth.getAccessToken,
      workflow.resetWorkflow,
      handleTabChange,
    ]);

    const handleOnboardingComplete = React.useCallback(() => {
      auth.setShowOnboarding(false);

      // Check if user chose to create first capsule
      const redirectToCreate = localStorage.getItem(
        "eras_odyssey_redirect_to_create",
      );
      if (redirectToCreate) {
        localStorage.removeItem(
          "eras_odyssey_redirect_to_create",
        );
        // Reset workflow to ensure we start at step 1
        workflow.resetWorkflow();
        setEditingCapsule(null);
        // Navigate to create tab
        handleTabChange("create");
      }
    }, [auth, handleTabChange, workflow, setEditingCapsule]);

    const handleOpenVault = React.useCallback(
      (
        currentMedia?: any[],
        currentTheme?: string,
        currentThemeMetadata?: any,
      ) => {
        console.log("🏛️ Opening Vault from CreateCapsule", {
          mediaCount: currentMedia?.length,
          theme: currentTheme,
          hasThemeMetadata: !!currentThemeMetadata,
        });
        if (currentMedia) {
          console.log(
            "🏛️ Saving current media to workflow before navigating to Vault",
          );
          workflow.setWorkflowMedia(currentMedia);

          // 🔥 CRITICAL FIX: Rebuild importedVaultMediaIds based on current media
          // This ensures removed media is unmarked in the vault
          const currentImportedIds = new Set<string>();
          currentMedia.forEach((item) => {
            // Check for vault_id (media from vault) or id (media with vault ID tracked)
            const vaultId = item.vault_id || item.id;
            if (vaultId && item.fromVault) {
              currentImportedIds.add(vaultId);
              console.log(
                "📌 Keeping imported media ID:",
                vaultId,
              );
            }
          });
          workflow.setImportedVaultMediaIds(currentImportedIds);
          console.log(
            "📌 Updated imported media IDs:",
            currentImportedIds.size,
            "items",
          );
        }
        // 🎨 CRITICAL FIX: Save theme to workflow so it persists when returning from Vault
        if (currentTheme) {
          console.log(
            "🎨 Saving theme to workflow:",
            currentTheme,
          );
          workflow.setWorkflowTheme(currentTheme);
          workflow.setWorkflowThemeMetadata(
            currentThemeMetadata || {},
          );
        }
        handleTabChange("vault");
      },
      [handleTabChange, workflow],
    );

    // LegacyVault handlers
    const handleVaultUseMedia = React.useCallback(
      async (mediaItems) => {
        try {
          console.log("🏛️ Using media from Vault:", mediaItems);
          console.log(
            "🏛️ Media items count:",
            mediaItems?.length,
          );
          console.log("🏛️ First item sample:", mediaItems?.[0]);

          // Convert media items to workflow format
          if (mediaItems && mediaItems.length > 0) {
            console.log("🔄 Starting media conversion...");

            // APPEND to existing workflow media instead of replacing
            const existingMedia = workflow.workflowMedia || [];
            const newCombinedMedia = [
              ...existingMedia,
              ...mediaItems,
            ];

            console.log("🔄 Appending to workflowMedia");
            console.log(
              "🔄 Existing media count:",
              existingMedia.length,
            );
            console.log(
              "🔄 New media count:",
              mediaItems.length,
            );
            console.log(
              "🔄 Combined media count:",
              newCombinedMedia.length,
            );

            // Track imported media IDs to show checkmarks in Vault
            const newImportedIds = new Set(
              workflow.importedVaultMediaIds,
            );
            mediaItems.forEach((item) => {
              if (item.id || item.vault_id) {
                newImportedIds.add(item.id || item.vault_id);
                console.log(
                  "📌 Tracking imported media ID:",
                  item.id || item.vault_id,
                );
              }
            });
            workflow.setImportedVaultMediaIds(newImportedIds);
            console.log(
              "📌 Total imported media IDs:",
              newImportedIds.size,
            );

            workflow.setWorkflowMedia(newCombinedMedia);
            workflow.setWorkflowStep("create");

            console.log("✅ Workflow state set");

            // Wait for state to propagate
            await new Promise((resolve) =>
              setTimeout(resolve, 200),
            );

            console.log("🔄 Navigating to create tab");
            console.log(
              "🔄 workflowMedia after delay:",
              workflow.workflowMedia,
            );

            await handleTabChange("create");
            console.log("✅ Navigation complete");
          } else {
            console.warn("⚠️ No media items to use");
          }
        } catch (error) {
          console.error("❌ Error in onUseMedia:", error);
          console.error("❌ Error stack:", error.stack);
        }
      },
      [
        workflow.setWorkflowMedia,
        workflow.setWorkflowStep,
        workflow.workflowMedia,
        handleTabChange,
      ],
    );

    // Handle media removal from capsule - update imported vault media IDs
    const handleMediaRemoved = React.useCallback(
      (
        mediaId: string,
        wasFromVault: boolean,
        vaultId?: string,
      ) => {
        console.log("🗑️ [APP] Media removed from capsule:", {
          mediaId,
          wasFromVault,
          vaultId,
        });

        // 🔥 CRITICAL FIX: Also remove from workflowMedia to prevent media reappearing
        // when user goes to vault and back
        const currentMedia = workflow.workflowMedia || [];
        const updatedMedia = currentMedia.filter(
          (item) => item.id !== mediaId && item.id !== vaultId,
        );
        if (updatedMedia.length !== currentMedia.length) {
          workflow.setWorkflowMedia(updatedMedia);
          console.log("✅ Removed media from workflowMedia:", {
            mediaId,
            before: currentMedia.length,
            after: updatedMedia.length,
          });
        }

        if (wasFromVault && vaultId) {
          // Remove this ID from importedVaultMediaIds
          const updatedIds = new Set(
            workflow.importedVaultMediaIds,
          );
          updatedIds.delete(vaultId);
          workflow.setImportedVaultMediaIds(updatedIds);
          console.log(
            "✅ Removed vault media ID from imported set:",
            vaultId,
          );
          console.log(
            "📊 Remaining imported IDs:",
            updatedIds.size,
          );
        }
      },
      [workflow],
    );

    // Handle unchecking media in vault - remove from capsule
    const handleRemoveFromCapsule = React.useCallback(
      (vaultId: string) => {
        console.log(
          "🔄 [APP] Removing media from capsule via vault uncheck:",
          vaultId,
        );

        // Call CreateCapsule's removeMedia function directly if available
        if (removeMediaByVaultIdRef.current) {
          removeMediaByVaultIdRef.current(vaultId);
        }

        // Remove from workflowMedia - check both id and vault_id
        const currentMedia = workflow.workflowMedia || [];
        const updatedMedia = currentMedia.filter(
          (item) =>
            item.id !== vaultId && item.vault_id !== vaultId,
        );
        workflow.setWorkflowMedia(updatedMedia);
        console.log("📊 Removed media from workflowMedia:", {
          before: currentMedia.length,
          after: updatedMedia.length,
        });

        // Remove from importedVaultMediaIds
        const updatedIds = new Set(
          workflow.importedVaultMediaIds,
        );
        updatedIds.delete(vaultId);
        workflow.setImportedVaultMediaIds(updatedIds);
        console.log(
          "✅ Removed vault media ID from imported set:",
          vaultId,
        );
      },
      [workflow],
    );

    // 🔥 Handle vault media IDs loaded from editing capsule
    const handleVaultMediaIdsLoaded = React.useCallback(
      (vaultMediaIds: string[]) => {
        console.log(
          "🏛️ [APP] Vault media IDs loaded from editing capsule:",
          vaultMediaIds,
        );
        const idsSet = new Set(vaultMediaIds);
        workflow.setImportedVaultMediaIds(idsSet);
        console.log(
          "✅ Initialized importedVaultMediaIds with",
          idsSet.size,
          "items",
        );
      },
      [workflow],
    );

    // 🔥 Callback to register CreateCapsule's removeMedia function
    const handleRegisterRemoveMedia = React.useCallback(
      (fn: (vaultId: string) => void) => {
        removeMediaByVaultIdRef.current = fn;
      },
      [],
    );

    // Handle editing capsule details (title, message, date, theme, etc.)
    const handleEditCapsuleDetails = React.useCallback(
      (capsule) => {
        setEditingCapsule(capsule);
        handleTabChange("create", { editingCapsuleOverride: capsule });
      },
      [handleTabChange, setEditingCapsule],
    );

    // 🔥 SMART CAPSULE VIEW HANDLER
    // Used by Timeline & Calendar views to intelligently route capsule clicks:
    // - Drafts → Edit mode (Create tab)
    // - Scheduled/Delivered/Received → Detail modal with ceremony
    // Note: Classic/Folder view (Dashboard) manages its own modal independently
    const handleViewCapsule = React.useCallback(
      (capsule) => {
        console.log('🎯 handleViewCapsule called:', {
          id: capsule.id,
          title: capsule.title,
          status: capsule.status,
          isReceived: capsule.isReceived
        });

        // Drafts go to edit/create mode
        if (capsule.status === 'draft') {
          console.log('📝 Draft detected - routing to create tab for editing');
          setEditingCapsule(capsule);
          handleTabChange("create", { editingCapsuleOverride: capsule });
        } 
        // All other capsules (scheduled, delivered, received) open in detail modal
        else {
          console.log('👁️ Non-draft capsule - opening CapsuleDetailModal');
          setViewingCapsule(capsule);
        }
      },
      [handleTabChange, setEditingCapsule, setViewingCapsule],
    );

    const handleVaultClose = React.useCallback(() => {
      // Navigate back to the tab the user came from, or Home if unknown
      const returnTab = tabBeforeVault.current || "home";
      console.log(
        "🔙 Closing Vault - navigating back to:",
        returnTab,
      );

      // Clear the tracked tab
      tabBeforeVault.current = null;

      handleTabChange(returnTab);
    }, [handleTabChange]);

    const handleVaultNavigateToSettings =
      React.useCallback(() => {
        handleTabChange("legacy-access");
      }, [handleTabChange]);

    // RecordInterface handlers
    const handleRecordMediaCaptured = React.useCallback(
      async (mediaItems) => {
        console.log(
          "📥 [APP] handleRecordMediaCaptured called with:",
          {
            count: mediaItems?.length,
            items: mediaItems?.map((m) => ({
              id: m.id,
              type: m.type,
              hasBlob: !!m.blob,
              blobSize: m.blob?.size,
            })),
            existingWorkflowMedia:
              workflow.workflowMedia?.length || 0,
          },
        );

        if (!mediaItems || mediaItems.length === 0) return;

        // CRITICAL FIX: Append new media to existing workflowMedia instead of replacing
        workflow.setWorkflowMedia((prev) => {
          if (!prev || prev.length === 0) {
            console.log("✅ First media - setting fresh array");
            return mediaItems;
          }
          console.log(
            "✅ Appending media - combining",
            prev.length,
            "+",
            mediaItems.length,
          );
          return [...prev, ...mediaItems];
        });
        workflow.setWorkflowStep("create");

        await new Promise((resolve) =>
          setTimeout(resolve, 100),
        );
        await handleTabChange("create");
      },
      [
        workflow.setWorkflowMedia,
        workflow.setWorkflowStep,
        handleTabChange,
      ],
    );

    const handleRecordOpenVault = React.useCallback(() => {
      console.log("🏛️ Opening Vault from RecordInterface");
      handleTabChange("vault");
    }, [handleTabChange]);

    const handleRecordClose = React.useCallback(() => {
      // Smart navigation: go back to where we came from
      // If user was on 'create' before Record, go back to create
      // Otherwise, go to home
      const destination =
        lastActiveTab === "create" ? "create" : "home";
      console.log(
        `🔙 Closing Record - navigating to ${destination} (came from: ${lastActiveTab})`,
      );
      handleTabChange(destination);
    }, [lastActiveTab, handleTabChange]);

    // Loading State
    if (auth.isCheckingAuth) {
      return (
        <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="text-center px-4 max-w-md w-full">
            <MomentPrismLogo size={120} showSubtitle={true} />
            <div className="mt-8 space-y-3">
              <div className="text-lg text-muted-foreground font-medium animate-pulse">
                Loading Eras...
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-shimmer w-1/3"
                  style={{
                    animation:
                      "shimmer 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
            {network.networkError && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="font-medium">
                    Connection Issue
                  </p>
                </div>
                <p className="mb-3 whitespace-pre-wrap">
                  {network.networkError}
                </p>
                {network.networkError.includes("server") && (
                  <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
                    <p className="font-medium mb-1">
                      Common Solutions:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Check your internet connection</li>
                      <li>
                        Verify Supabase Edge Function is
                        deployed
                      </li>
                      <li>
                        Ensure environment variables are
                        configured
                      </li>
                      <li>Try refreshing the page</li>
                    </ul>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={network.clearNetworkError}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Continue Anyway
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 📚 Onboarding Orchestrator - Show if user needs onboarding (after Eras Gate)
    if (showOnboarding && auth.user?.id) {
      console.log(
        "📚 [ONBOARDING] Rendering OnboardingOrchestrator",
      );

      const handleOnboardingComplete = async () => {
        console.log("📚 [ONBOARDING] Onboarding completed");

        // Check completion status and award achievements accordingly
        try {
          const completionData = localStorage.getItem(
            "eras_onboarding_completion",
          );
          const exitData = localStorage.getItem(
            "eras_onboarding_exit",
          );

          if (completionData) {
            const {
              firstCapsuleCompleted,
              vaultMasteryCompleted,
            } = JSON.parse(completionData);
            console.log("📚 [ONBOARDING] Completion status:", {
              firstCapsuleCompleted,
              vaultMasteryCompleted,
            });

            const achievementsToAward = [];

            if (firstCapsuleCompleted) {
              // Initialize A001 "First Step" achievement + Time Novice title
              console.log(
                "🎁 [ONBOARDING] Initializing A001 First Step and Time Novice title...",
              );
              try {
                await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/achievements/initialize-titles`,
                  {
                    headers: {
                      Authorization: `Bearer ${auth.session?.access_token}`,
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  },
                );
                console.log(
                  "✅ [ONBOARDING] A001 and Time Novice initialized successfully",
                );
              } catch (err) {
                console.error(
                  "❌ Failed to initialize A001 and Time Novice:",
                  err,
                );
              }

              // Award Time Keeper for completing the tutorial
              achievementsToAward.push("time_keeper"); // Time Keeper → Chrono Apprentice

              if (vaultMasteryCompleted) {
                achievementsToAward.push("vault_guardian"); // Vault Guardian → Legacy Architect
              }
            }

            if (achievementsToAward.length > 0) {
              console.log(
                "🏆 [ONBOARDING] Awarding achievements:",
                achievementsToAward,
              );

              for (const achievementId of achievementsToAward) {
                try {
                  // Award achievement based on ID
                  const actionMap: Record<string, string> = {
                    time_keeper:
                      "onboarding_first_capsule_complete",
                    vault_guardian:
                      "onboarding_vault_mastery_complete",
                  };

                  const action =
                    actionMap[achievementId] ||
                    "onboarding_module_complete";

                  await fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/achievements/track`,
                    {
                      headers: {
                        Authorization: `Bearer ${auth.session?.access_token}`,
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({
                        action,
                        metadata: {},
                      }),
                    },
                  );
                } catch (err) {
                  console.error(
                    "❌ Failed to award achievement:",
                    achievementId,
                    err,
                  );
                }
              }
            }

            localStorage.removeItem(
              "eras_onboarding_completion",
            );
          } else if (exitData) {
            const { moduleId } = JSON.parse(exitData);
            console.log(
              "📚 [ONBOARDING] User exited module early:",
              moduleId,
            );

            if (moduleId === "first_capsule") {
              console.log(
                "🏆 [ONBOARDING] First Capsule dismissed - initializing A001 First Step and Time Novice",
              );
              // Initialize A001 "First Step" achievement + Time Novice title even if user exits early
              try {
                await fetch(
                  `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/achievements/initialize-titles`,
                  {
                    headers: {
                      Authorization: `Bearer ${auth.session?.access_token}`,
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  },
                );
                console.log(
                  "✅ [ONBOARDING] A001 and Time Novice initialized successfully",
                );
              } catch (err) {
                console.error(
                  "❌ Failed to initialize A001 and Time Novice:",
                  err,
                );
              }
            }

            localStorage.removeItem("eras_onboarding_exit");
          }
        } catch (err) {
          console.error(
            "❌ [ONBOARDING] Failed to process achievement awards:",
            err,
          );
        }

        setShowOnboarding(false);
        setOnboardingModule(undefined);
      };

      return (
        <OnboardingOrchestrator
          userId={auth.user.id}
          forceModule={onboardingModule}
          onComplete={handleOnboardingComplete}
          onDismiss={handleOnboardingComplete}
        />
      );
    }

    // Authentication Screen
    // IMPORTANT: Keep Auth visible if we're in the middle of authentication process
    // CRITICAL: Don't show Auth if pendingAuthData or gateAuthData exists (user is already being authenticated)
    // CRITICAL: ALWAYS show Auth during OAuth callback to ensure it processes the tokens
    const shouldShowAuth =
      (!auth.isAuthenticated &&
        !pendingAuthData &&
        !gateAuthData) ||
      auth.isLoggingOut ||
      isOAuthCallback;

    console.log("🔐 [AUTH CHECK] Auth screen decision:", {
      isAuthenticated: auth.isAuthenticated,
      isLoggingOut: auth.isLoggingOut,
      hasPendingAuthData: !!pendingAuthData,
      hasGateAuthData: !!gateAuthData,
      isOAuthCallback: isOAuthCallback,
      isAuthenticatedRef: isAuthenticatedRef.current,
      isProcessingAuthRef: isProcessingAuthRef.current,
      shouldShowAuth: shouldShowAuth,
    });

    if (shouldShowAuth) {
      return (
        <>
          <Auth
            onAuthenticated={(
              userData,
              accessToken,
              options,
            ) => {
              console.log(
                "✅ [AUTH] onAuthenticated callback fired from Auth component",
              );
              console.log("📊 [AUTH] User data:", userData);
              // Don't call auth.handleAuthenticated here - trigger animation first
              // The animation will complete, then pendingAuthData effect will call handleAuthenticated
              onAuthenticationSuccess(
                userData,
                accessToken,
                options,
              );
            }}
          />

          {/* Toaster MUST be here so it's available during authentication */}
          <Toaster
            position="top-center"
            expand={true}
            richColors
            closeButton
            duration={5000}
          />
        </>
      );
    }

    // Main Application UI
    // CRITICAL: Hide content during transition instead of unmounting to prevent remount cycles
    return (
      <>
        <MetaTags />
        <div
          className={`min-h-screen flex flex-col transition-colors duration-500 ${
            activeTab === "home"
              ? "bg-gradient-to-br from-purple-50/60 via-blue-50/50 to-pink-50/60 dark:from-purple-950/30 dark:via-blue-950/25 dark:to-pink-950/30"
              : "bg-gradient-to-br from-slate-50 to-slate-100"
          }`}
          style={{
            opacity: isTransitioning ? 0 : 1,
            pointerEvents: isTransitioning ? "none" : "auto",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {/* Header Background - Customizable gradient based on equipped title with transition animations */}
          {activeTab !== "record" && (
            <AnimatePresence mode="wait">
              {titleProfile?.equipped_title && (() => {
                // Look up rarity from unlocked_titles or availableTitles
                const equippedTitleData = 
                  availableTitles?.titles?.find(t => t.title === titleProfile.equipped_title) ||
                  titleProfile.unlocked_titles?.find(t => t.title === titleProfile.equipped_title);
                const rarity = (equippedTitleData?.rarity || "common") as "common" | "uncommon" | "rare" | "epic" | "legendary";
                
                console.log('[HeaderBackground] Rendering with:', {
                  titleName: titleProfile.equipped_title,
                  rarity,
                  equippedTitleData
                });
                
                return (
                  <HeaderBackground
                    key={titleProfile.equipped_title}
                    titleName={titleProfile.equipped_title}
                    titleRarity={rarity}
                  />
                );
              })()}
            </AnimatePresence>
          )}

          {/* Network Status Banner */}
          {(!network.isOnline || network.networkError) && (
            <div className="bg-orange-600 text-white px-4 py-2.5 text-center text-sm border-b border-orange-700 shadow-sm">
              <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
                <div className="flex-shrink-0">
                  {!network.isOnline ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>
                <span className="flex-1 text-left sm:text-center">
                  {network.networkError ||
                    "No internet connection. Some features may not work."}
                </span>
                <div className="flex gap-2">
                  {network.networkError && (
                    <button
                      onClick={network.clearNetworkError}
                      className="px-3 py-1 bg-orange-700 hover:bg-orange-800 rounded text-xs font-medium transition-colors"
                    >
                      Dismiss
                    </button>
                  )}
                  {!navigator.onLine && (
                    <button
                      onClick={() => window.location.reload()}
                      className="px-3 py-1 bg-orange-700 hover:bg-orange-800 rounded text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reload
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div
            className={`flex-1 flex flex-col ${
              activeTab === "record"
                ? "overflow-hidden"
                : "container mx-auto px-4 sm:px-6 py-2 sm:py-3 overflow-y-auto"
            }`}
          >
            {/* iPhone Onboarding Alert - Disabled */}
            {false &&
              /iPad|iPhone|iPod/.test(navigator.userAgent) &&
              auth.isAuthenticated &&
              !localStorage.getItem(
                "eras-onboarding-completed",
              ) &&
              !localStorage.getItem(
                "eras-onboarding-dont-show-again",
              ) &&
              !auth.showOnboarding && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg animate-pulse">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Welcome to Eras! 👋
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        Tap the button to start your tutorial
                        and learn how to create time capsules.
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        auth.setShowOnboarding(true)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white min-h-[36px] px-3"
                    >
                      <span className="text-xs font-medium">
                        Start
                      </span>
                    </Button>
                  </div>
                </div>
              )}

            {/* Unexpected Reset Recovery Notification */}
            {unexpectedReset && (
              <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      Session Interrupted
                    </div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">
                      {unexpectedReset === "create" &&
                        "Your work has been auto-saved. Go back to continue editing your capsule."}
                      {unexpectedReset === "editor" &&
                        "Your enhancements have been saved. Go back to continue editing."}
                      {unexpectedReset !== "create" &&
                        unexpectedReset !== "editor" &&
                        `You were moved from the ${unexpectedReset} tab. This can happen due to network issues.`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleTabChange(unexpectedReset);
                        setUnexpectedReset(null);
                      }}
                      className="bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-300 min-h-[36px] px-3"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      <span className="text-xs font-medium">
                        Go Back
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setUnexpectedReset(null)}
                      className="text-orange-600 hover:text-orange-700 min-h-[36px] px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Header - Hidden when Record tab is active */}
            {activeTab !== "record" && (
              <div className="mb-3 sm:mb-4">
                <div className="relative flex items-start justify-start min-h-[80px] sm:min-h-[100px] pl-0 sm:pl-6">
                  {/* Logo - Left aligned - Clickable to open title selector */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-[100] -ml-6 sm:ml-0 relative">
                    <MomentPrismLogo
                      size={isMobile ? 80 : 120}
                      showSubtitle={true}
                      onClick={() => setShowTitleCarousel(true)}
                    />
                  </div>

                  {/* DESKTOP ONLY: Welcome + Title - CENTERED ABOVE TITLE */}
                  <div className="hidden sm:flex absolute top-0 right-14 z-20">
                    <div className="flex flex-col items-center gap-1">
                      {/* Welcome text with Avatar - Always centered, bell positioned absolutely */}
                      <div className="relative flex items-center gap-1">
                        <motion.div
                          key={`desktop-name-${!!titleProfile?.equipped_title}-${titleRenderKey}`}
                          initial={{
                            y: titleProfile?.equipped_title
                              ? -10
                              : 10,
                            opacity: 0,
                          }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            duration: 0.5,
                          }}
                          className="text-base font-bold whitespace-nowrap inline-flex items-baseline gap-0 text-black dark:text-white"
                        >
                          <span>Welcome,&nbsp;</span>
                          <button
                            onClick={() =>
                              setShowTitleCarousel(true)
                            }
                            className="cursor-pointer inline"
                            style={{
                              display: "inline",
                              padding: 0,
                              margin: 0,
                              border: "none",
                              background: "none",
                            }}
                          >
                            {auth.user?.firstName || "User"}
                          </button>
                        </motion.div>
                        {/* Profile Avatar - Click to change picture */}
                        <button
                          onClick={() =>
                            setShowProfilePictureUpload(true)
                          }
                          className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity"
                          aria-label="Change profile picture"
                        >
                          <Avatar
                            src={profile?.avatar_url}
                            name={auth.user?.firstName}
                            email={auth.user?.email}
                            size="sm"
                            alt="Your profile"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MOBILE ONLY: Single Row - Welcome + Avatar + Bell on Row 1, Gear centered beneath Bell on Row 2 */}
                  <div className="sm:hidden">
                    {/* Row 1: Welcome, User! + Avatar - Positioned right, left of Bell */}
                    <div className="absolute top-1 right-16 z-20 flex flex-row flex-nowrap items-center gap-1 whitespace-nowrap">
                      <span className="text-xs font-bold text-black dark:text-white">
                        Welcome,&nbsp;
                      </span>
                      <button
                        onClick={() =>
                          setShowTitleCarousel(true)
                        }
                        className="cursor-pointer font-bold text-black dark:text-white text-xs flex-shrink-0 whitespace-nowrap"
                        style={{
                          padding: 0,
                          margin: 0,
                          border: "none",
                          background: "none",
                        }}
                      >
                        {auth.user?.firstName || "User"}
                      </button>
                      {/* Profile Avatar - Click to change picture */}
                      <button
                        onClick={() =>
                          setShowProfilePictureUpload(true)
                        }
                        className="cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity flex-shrink-0"
                        aria-label="Change profile picture"
                      >
                        <Avatar
                          src={profile?.avatar_url}
                          name={auth.user?.firstName}
                          email={auth.user?.email}
                          size="xs"
                          alt="Your profile"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fixed Controls Overlay - Bell and Settings follow user down the page */}
            {activeTab !== "record" && (
                  <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                    <div className="relative flex items-start justify-end h-0 px-2 container mx-auto">
                      {/* Bell & Settings - Right */}
                      <div className="pointer-events-auto mt-1 sm:mt-3 flex flex-row items-center gap-3">
                        {/* Bell Icon & Settings Gear - Stacked Vertically */}
                        <div className="flex flex-col items-center gap-3 sm:gap-4">
                          {/* Bell Icon */}
                          <button
                            onClick={() => {
                              console.log(
                                "🔔 [BELL CLICK] unifiedUnreadCount:",
                                unifiedUnreadCount,
                              );
                              console.log(
                                "🔔 [BELL CLICK] unifiedNotifications.length:",
                                unifiedNotifications.length,
                              );
                              setShowNotificationCenter(true);
                            }}
                            className="cursor-pointer hover:opacity-70 active:opacity-50 transition-opacity"
                            aria-label="Notifications"
                          >
                            {isMobile ? (
                              <div className="relative">
                                {/* Glow background for prominence */}
                                <div
                                  className={`relative ${bellStyles.bellBgColor} p-2 rounded-full border-2 ${bellStyles.bellBorderColor}`}
                                >
                                  <Bell
                                    className={`w-6 h-6 ${bellStyles.bellColor}`}
                                  />
                                </div>
                                {unifiedUnreadCount > 0 && (
                                  <div
                                    className="absolute animate-pulse"
                                    style={{
                                      top: "-2px",
                                      left: "-6px",
                                      width: "16px",
                                      height: "16px",
                                      background: "#ec4899",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      zIndex: 9999,
                                      border: "1px solid white",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "10px",
                                        lineHeight: "1",
                                        color: "white",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {unifiedUnreadCount > 9
                                        ? "9+"
                                        : unifiedUnreadCount}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="relative">
                                {/* Glow background for prominence */}
                                <div
                                  className={`relative ${bellStyles.bellBgColor} p-2 rounded-full border-2 ${bellStyles.bellBorderColor}`}
                                >
                                  <Bell
                                    className={`w-6 h-6 ${bellStyles.bellColor}`}
                                  />
                                </div>
                                {unifiedUnreadCount > 0 && (
                                  <div
                                    className="absolute animate-pulse"
                                    style={{
                                      top: "-2px",
                                      left: "-2px",
                                      width: "18px",
                                      height: "18px",
                                      background: "#ec4899",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      zIndex: 9999,
                                      border: "1px solid white",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        lineHeight: "1",
                                        color: "white",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {unifiedUnreadCount > 9
                                        ? "9+"
                                        : unifiedUnreadCount}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </button>

                          {/* Settings Gear */}
                          <div className="relative">
                            <button 
                              onClick={() => {
                                console.log("⚙️ [GEAR CLICK] Toggling dropdown");
                                setShowSettingsDropdown(!showSettingsDropdown);
                              }}
                              className="cursor-pointer relative group"
                              aria-label="Settings"
                            >
                              {/* Glowing halo background */}
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-md opacity-60 group-hover:opacity-80 animate-pulse"></div>

                              {/* Solid background with gear icon */}
                              <div className="relative bg-slate-900 p-3 rounded-full border-2 border-yellow-400 transition-transform group-hover:scale-110">
                                <SettingsIcon
                                  className="w-6 h-6 text-yellow-400"
                                  style={{
                                    strokeWidth: "2.5px",
                                  }}
                                />
                              </div>
                            </button>

                            {/* Custom Dropdown Menu */}
                            {showSettingsDropdown && (
                              <>
                                {/* Backdrop to close dropdown */}
                                <div 
                                  className="fixed inset-0 z-40"
                                  onClick={() => setShowSettingsDropdown(false)}
                                />
                                
                                {/* Dropdown content */}
                                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-visible">
                                  {/* ✨ PREMIUM STORE - Moved to top for maximum visibility */}
                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Store clicked");
                                      setShowSettingsDropdown(false);
                                      handleTabChange("store");
                                    }}
                                    className="w-full py-4 pl-4 pr-4 text-white hover:bg-gradient-to-r hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-300 flex items-center gap-3 group relative overflow-hidden border-b-2 border-purple-500/30"
                                  >
                                    {/* Epic background glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Animated sparkle icon - ENHANCED */}
                                    <span className="text-3xl w-8 flex-shrink-0 relative z-10 group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_12px_rgba(147,51,234,0.8)]">
                                      ✨
                                    </span>
                                    
                                    {/* Text with ENHANCED gradient */}
                                    <div className="flex flex-col items-start relative z-10">
                                      <span className="text-lg font-black bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">
                                        Premium Store
                                      </span>
                                      <span className="text-xs text-slate-300 group-hover:text-white font-medium transition-colors">
                                        Unlock Epic Themes & Added Beneficiaries
                                      </span>
                                    </div>
                                    
                                    {/* Enhanced shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                  </button>
                                  
                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Legacy Access clicked");
                                      setShowSettingsDropdown(false);
                                      handleTabChange("legacy-access");
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">🔑</span>
                                    <span className="text-base">Legacy Access</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Archive clicked");
                                      setShowSettingsDropdown(false);
                                      setShowArchiveModal(true);
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">📦</span>
                                    <span className="text-base">Archive</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Achievements clicked");
                                      setShowSettingsDropdown(false);
                                      handleTabChange("achievements");
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">🏆</span>
                                    <span className="text-base">Achievements</span>
                                  </button>

                                  <div className="relative">
                                    <button
                                      onClick={() => {
                                        console.log("⚙️ [DROPDOWN] Tutorials clicked");
                                        setShowTutorialsSubmenu(!showTutorialsSubmenu);
                                      }}
                                      className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                    >
                                      <span className="text-lg w-8 flex-shrink-0">🎓</span>
                                      <span className="text-base flex-1">Tutorials</span>
                                      <ChevronRight className={`w-4 h-4 transition-transform ${showTutorialsSubmenu ? 'rotate-90' : ''}`} />
                                    </button>
                                    {showTutorialsSubmenu && (
                                      <div className="bg-slate-750">
                                        <button
                                          onClick={() => {
                                            console.log("⚙️ [SUBMENU] Eras Odyssey tutorial clicked");
                                            setShowSettingsDropdown(false);
                                            setShowTutorialsSubmenu(false);
                                            auth.setShowOnboarding(true);
                                          }}
                                          className="w-full py-2.5 pl-12 pr-4 text-sm text-slate-300 hover:bg-slate-700 transition-colors text-left"
                                        >
                                          Eras Odyssey
                                        </button>
                                        <button
                                          onClick={() => {
                                            console.log("⚙️ [SUBMENU] First Capsule tutorial clicked");
                                            setShowSettingsDropdown(false);
                                            setShowTutorialsSubmenu(false);
                                            setShowOnboarding(true);
                                            setOnboardingModule("first_capsule");
                                          }}
                                          className="w-full py-2.5 pl-12 pr-4 text-sm text-slate-300 hover:bg-slate-700 transition-colors text-left"
                                        >
                                          First Capsule
                                        </button>
                                        <button
                                          onClick={() => {
                                            console.log("⚙️ [SUBMENU] Vault Mastery tutorial clicked");
                                            setShowSettingsDropdown(false);
                                            setShowTutorialsSubmenu(false);
                                            setShowOnboarding(true);
                                            setOnboardingModule("vault_mastery");
                                          }}
                                          className="w-full py-2.5 pl-12 pr-4 text-sm text-slate-300 hover:bg-slate-700 transition-colors text-left"
                                        >
                                          Vault Mastery
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Help & Support clicked");
                                      setShowSettingsDropdown(false);
                                      setShowHelpModal(true);
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">💡</span>
                                    <span className="text-base">Help & Support</span>
                                  </button>

                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Refer a Friend clicked");
                                      setShowSettingsDropdown(false);
                                      setShowReferralModal(true);
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">🤝</span>
                                    <span className="text-base">Refer a Friend</span>
                                  </button>
                                  
                                  <div className="h-px bg-slate-700" />
                                  
                                  <button
                                    onClick={() => {
                                      console.log("⚙️ [DROPDOWN] Settings clicked");
                                      setShowSettingsDropdown(false);
                                      handleTabChange("settings");
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-slate-200 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">⚙️</span>
                                    <span className="text-base">Settings</span>
                                  </button>
                                  
                                  <div className="h-px bg-slate-700" />
                                  
                                  <button
                                    onClick={async () => {
                                      console.log("⚙️ [DROPDOWN] Sign Out clicked");
                                      setShowSettingsDropdown(false);
                                      await auth.handleLogout();
                                    }}
                                    className="w-full py-3 pl-4 pr-4 text-red-400 hover:bg-slate-700 transition-colors flex items-center"
                                  >
                                    <span className="text-lg w-8 flex-shrink-0">🚪</span>
                                    <span className="text-base">Sign Out</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            )}

            {/* Navigation - Clean Eras Style - Hidden when Record tab is active */}
            {activeTab !== "record" && (
              <div className="-mt-3 mb-3 sm:mt-0 sm:mb-5">
                <div className="flex items-end justify-center gap-1 sm:gap-8 md:gap-16 max-w-4xl mx-auto px-2">
                  <button
                    onClick={() => handleTabChange("home")}
                    className={`group relative flex flex-col items-center justify-end gap-0.5 sm:gap-2 flex-1 sm:flex-none py-1 px-2 sm:py-3 sm:px-6 transition-all duration-300 ${
                      activeTab === "home"
                        ? "scale-105"
                        : "hover:scale-105 active:scale-95"
                    }`}
                    data-state={
                      activeTab === "home"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {/* Background glow for active state */}
                    {activeTab === "home" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 to-gray-100/60 dark:from-slate-800/30 dark:to-gray-800/30 rounded-2xl blur-xl -z-10"></div>
                    )}

                    {/* Emoji - Responsive sizing for 4 icons */}
                    <span
                      className={`transition-all duration-300 ${
                        activeTab === "home"
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                      style={{
                        fontSize: isMobile ? "44px" : "58px",
                        lineHeight: 1,
                        filter:
                          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                        textShadow:
                          "0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      🏡
                    </span>

                    <span
                      className={`font-bold transition-all duration-300 block text-xs sm:text-base ${
                        activeTab === "home"
                          ? "text-slate-700 dark:text-slate-300"
                          : "text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                      }`}
                    >
                      Home
                    </span>

                    {/* Active indicator bar */}
                    {activeTab === "home" && (
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                        <div className="w-16 sm:w-24 h-1.5 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full shadow-lg shadow-slate-500/50"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleTabChange("create")}
                    className={`group relative flex flex-col items-center justify-end gap-0.5 sm:gap-2 flex-1 sm:flex-none py-1 px-2 sm:py-3 sm:px-6 transition-all duration-300 ${
                      activeTab === "create"
                        ? "scale-105"
                        : "hover:scale-105 active:scale-95"
                    }`}
                    data-state={
                      activeTab === "create"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {/* Background glow for active state */}
                    {activeTab === "create" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 to-teal-100/60 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl blur-xl -z-10"></div>
                    )}

                    {/* Emoji - Responsive sizing for 4 icons */}
                    <span
                      className={`transition-all duration-300 ${
                        activeTab === "create"
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                      style={{
                        fontSize: isMobile ? "44px" : "58px",
                        lineHeight: 1,
                        filter:
                          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                        textShadow:
                          "0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      ✨
                    </span>

                    <span
                      className={`font-bold transition-all duration-300 block text-xs sm:text-base ${
                        activeTab === "create"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-emerald-500 dark:text-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      }`}
                    >
                      Compose
                    </span>

                    {/* Active indicator bar */}
                    {activeTab === "create" && (
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                        <div className="w-16 sm:w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/50"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleTabChange("record")}
                    className={`group relative flex flex-col items-center justify-end gap-0.5 sm:gap-2 flex-1 sm:flex-none py-1 px-2 sm:py-3 sm:px-6 transition-all duration-300 ${
                      activeTab === "record"
                        ? "scale-105"
                        : "hover:scale-105 active:scale-95"
                    }`}
                    data-state={
                      activeTab === "record"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {/* Background glow for active state */}
                    {activeTab === "record" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-orange-100/60 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl blur-xl -z-10"></div>
                    )}

                    {/* Emoji - Responsive sizing for 4 icons */}
                    <span
                      className={`transition-all duration-300 ${
                        activeTab === "record"
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                      style={{
                        fontSize: isMobile ? "44px" : "58px",
                        lineHeight: 1,
                        filter:
                          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                        textShadow:
                          "0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      📹
                    </span>

                    <span
                      className={`font-bold transition-all duration-300 block text-xs sm:text-base ${
                        activeTab === "record"
                          ? "text-amber-600 dark:text-amber-500"
                          : "text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-500"
                      }`}
                    >
                      Record
                    </span>

                    {/* Active indicator bar */}
                    {activeTab === "record" && (
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                        <div className="w-16 sm:w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg shadow-amber-500/50"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleTabChange("vault")}
                    className={`group relative flex flex-col items-center justify-end gap-0.5 sm:gap-2 flex-1 sm:flex-none py-1 px-2 sm:py-3 sm:px-6 transition-all duration-300 ${
                      activeTab === "vault"
                        ? "scale-105"
                        : "hover:scale-105 active:scale-95"
                    }`}
                    data-state={
                      activeTab === "vault"
                        ? "active"
                        : "inactive"
                    }
                  >
                    {/* Background glow for active state */}
                    {activeTab === "vault" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl blur-xl -z-10"></div>
                    )}

                    {/* Emoji - Responsive sizing for 4 icons */}
                    <span
                      className={`transition-all duration-300 ${
                        activeTab === "vault"
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                      style={{
                        fontSize: isMobile ? "44px" : "58px",
                        lineHeight: 1,
                        filter:
                          "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                        textShadow:
                          "0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      🏛️
                    </span>

                    <span
                      className={`font-bold transition-all duration-300 block text-xs sm:text-base ${
                        activeTab === "vault"
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-purple-500 dark:text-purple-500 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                      }`}
                    >
                      Vault
                    </span>

                    {/* Active indicator bar */}
                    {activeTab === "vault" && (
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                        <div className="w-16 sm:w-24 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-lg shadow-purple-500/50"></div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div
              className={`flex-1 transition-all duration-300 ${workflow.isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
            >
              {activeTab === "home" && (
                <ErrorBoundary>
                  {(() => {
                    const shouldAnimate =
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation;
                    console.log(
                      "🎬 Rendering Home (Unified: Timeline + Classic) with triggerSlideAnimation:",
                      shouldAnimate,
                      "(ref:",
                      triggerSlideAnimationRef.current,
                      "state:",
                      triggerSlideAnimation,
                      ")",
                    );
                    return null;
                  })()}
                  <motion.div
                    key={
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation
                        ? "slide-in"
                        : "normal"
                    }
                    initial={
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation
                        ? { x: 400, opacity: 0, scale: 0.95 }
                        : { x: 0, opacity: 1, scale: 1 }
                    }
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onAnimationStart={() =>
                      console.log(
                        "🎬 Home motion.div animation STARTED, shouldAnimate:",
                        triggerSlideAnimationRef.current ||
                          triggerSlideAnimation,
                      )
                    }
                    onAnimationComplete={() =>
                      console.log(
                        "🎬 Home motion.div animation COMPLETED",
                      )
                    }
                  >
                    <UnifiedHome
                      key={dashboardRefreshKey}
                      user={auth.user}
                      onViewCapsule={handleViewCapsule}
                      onCreateCapsule={() => {
                        // Simple navigation to create tab
                        handleTabChange("create");
                      }}
                      onEditCapsule={handleEditCapsuleDetails}
                      onEditCapsuleDetails={
                        handleEditCapsuleDetails
                      }
                      initialViewingCapsuleId={
                        viewingCapsuleFromNotification
                      }
                      viewingCapsuleFromNotification={
                        viewingCapsuleFromNotification
                      }
                      onOpenVault={() =>
                        handleTabChange("vault")
                      }
                      onClearNotificationCapsuleId={() =>
                        setViewingCapsuleFromNotification(null)
                      }
                    />
                  </motion.div>
                </ErrorBoundary>
              )}

              {activeTab === "create" && (
                <ErrorBoundary>
                  {(() => {
                    const shouldAnimate =
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation;
                    console.log(
                      "🎬 Rendering Create with triggerSlideAnimation:",
                      shouldAnimate,
                      "(ref:",
                      triggerSlideAnimationRef.current,
                      "state:",
                      triggerSlideAnimation,
                      ")",
                    );
                    return null;
                  })()}
                  <motion.div
                    key={
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation
                        ? "slide-in"
                        : "normal"
                    }
                    initial={
                      triggerSlideAnimationRef.current ||
                      triggerSlideAnimation
                        ? { x: 400, opacity: 0, scale: 0.95 }
                        : { x: 0, opacity: 1, scale: 1 }
                    }
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                    className="min-h-full"
                    onAnimationStart={() =>
                      console.log(
                        "🎬 Create motion.div animation STARTED, shouldAnimate:",
                        triggerSlideAnimationRef.current ||
                          triggerSlideAnimation,
                      )
                    }
                    onAnimationComplete={() =>
                      console.log(
                        "🎬 Create motion.div animation COMPLETED",
                      )
                    }
                  >
                    {(() => {
                      console.log(
                        "📝 Rendering Create tab content:",
                        {
                          hasUser: !!auth.user,
                          userId: auth.user?.id,
                          userName: auth.user?.firstName,
                          hasEditingCapsule: !!editingCapsule,
                          editingCapsuleId: editingCapsule?.id,
                          editingCapsuleAttachments:
                            editingCapsule?.attachments
                              ?.length || 0,
                          workflowStep: workflow.workflowStep,
                        },
                      );
                      return null;
                    })()}

                    <CreateCapsule
                      key={createCapsuleKey}
                      onCapsuleCreated={handleCapsuleCreated}
                      onRegisterReturnToTheme={(callback) => {
                        returnToThemeSelectionRef.current = callback;
                      }}
                      onNavigateToHome={() => {
                        console.log(
                          "🏠 Navigating to Home from draft save",
                        );
                        handleTabChange("home");
                        
                        // 🎁 Check if user was referred and trigger referral achievement (for draft capsules)
                        console.log('🎯 [Referral] onNavigateToHome called - checking referral status (draft/scheduled)');
                        
                        auth.getAccessToken().then((accessToken) => {
                          console.log('🎯 [Referral] Retrieved access token (draft):', accessToken ? 'exists' : 'missing');
                          
                          if (accessToken) {
                            console.log('🎯 [Referral] Calling check-achievement after draft/scheduled capsule save for user:', auth.user?.id);
                            fetch(
                              `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/api/referrals/check-achievement`,
                              {
                                method: 'POST',
                                headers: {
                                  'Authorization': `Bearer ${accessToken}`,
                                  'Content-Type': 'application/json',
                                },
                              }
                            )
                              .then((res) => {
                                console.log('🎯 [Referral] check-achievement response status (draft):', res.status);
                                return res.json();
                              })
                              .then((data) => {
                                console.log('🎯 [Referral] check-achievement response data (draft):', data);
                                if (data.referred && data.unlockedAchievements?.length > 0) {
                                  console.log(
                                    `🎉 [Referral] Unlocked achievements for referrer (draft):`,
                                    data.unlockedAchievements,
                                  );
                                } else if (data.referred) {
                                  console.log('🎯 [Referral] User was referred but no achievements unlocked yet (draft)');
                                } else {
                                  console.log('🎯 [Referral] User was not referred by anyone (draft)');
                                }
                              })
                              .catch((err) => {
                                console.error('❌ [Referral] Failed to check referral achievement (draft):', err);
                              });
                          } else {
                            console.warn('⚠️ [Referral] No access token available to check achievement (draft)');
                          }
                        }).catch((err) => {
                          console.error('❌ [Referral] Failed to retrieve access token (draft):', err);
                        });
                      }}
                      editingCapsule={editingCapsule}
                      onCancelEdit={() => {
                        console.log(
                          "❌ Cancelling edit - clearing editingCapsule",
                        );
                        setEditingCapsule(null);
                      }}
                      initialMedia={workflow.workflowMedia}
                      workflowStep={workflow.workflowStep}
                      workflowTheme={workflow.workflowTheme}
                      workflowThemeMetadata={
                        workflow.workflowThemeMetadata
                      }
                      onWorkInProgressChange={setHasUnsavedWork}
                      user={auth.user}
                      onOpenVault={handleOpenVault}
                      onOpenRecord={() => {
                        console.log(
                          "🎥 Opening Record tab from Create tab",
                        );
                        handleTabChange("record");
                      }}
                      onNavigateToStore={() => {
                        console.log(
                          "✨ Opening Store tab from Create tab (locked theme)",
                        );
                        handleTabChange("store");
                      }}
                      initialDeliveryDate={quickAddDate}
                      workflow={workflow}
                      onMediaRemoved={handleMediaRemoved}
                      onVaultMediaIdsLoaded={
                        handleVaultMediaIdsLoaded
                      }
                      onRegisterRemoveMedia={
                        handleRegisterRemoveMedia
                      }
                    />
                  </motion.div>
                </ErrorBoundary>
              )}

              {activeTab === "settings" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up">
                    <Settings
                      user={auth.user}
                      onProfileUpdate={(userData) => {
                        auth.setUser((prevUser) => ({
                          ...prevUser,
                          firstName: userData.firstName,
                          lastName: userData.lastName,
                        }));
                      }}
                      onDataChange={() => {
                        // Refresh Dashboard/Calendar when capsules are restored
                        console.log(
                          "🔄 Capsule data changed, refreshing...",
                        );
                        setDashboardRefreshKey(
                          (prev) => prev + 1,
                        );
                      }}
                      onReplayOnboarding={(moduleId) => {
                        console.log(
                          "🎬 [ONBOARDING REPLAY] Triggering module:",
                          moduleId,
                        );
                        setOnboardingModule(moduleId);
                        setShowOnboarding(true);
                      }}
                      initialSection={settingsSection}
                    />
                  </div>
                </ErrorBoundary>
              )}

              {/* Calendar View removed - now integrated into Home tab as a view option */}

              {activeTab === "legacy-access" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up">
                    <LegacyAccessBeneficiaries onOpenStore={() => handleTabChange("store")} />
                  </div>
                </ErrorBoundary>
              )}

              {activeTab === "terms" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up space-y-8">
                    <TermsOfService />
                    <div className="border-t pt-8">
                      <PrivacyPolicy />
                    </div>
                  </div>
                </ErrorBoundary>
              )}

              {activeTab === "privacy" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up">
                    <PrivacyPolicy />
                  </div>
                </ErrorBoundary>
              )}

              {activeTab === "record" && (
                  <ErrorBoundary>
                    {(() => {
                      const shouldAnimate =
                        triggerSlideAnimationRef.current ||
                        triggerSlideAnimation;
                      console.log(
                        "🎬 Rendering Record with triggerSlideAnimation:",
                        shouldAnimate,
                        "(ref:",
                        triggerSlideAnimationRef.current,
                        "state:",
                        triggerSlideAnimation,
                        ")",
                      );
                      return null;
                    })()}
                    <motion.div
                      key={
                        triggerSlideAnimationRef.current ||
                        triggerSlideAnimation
                          ? "slide-in"
                          : "normal"
                      }
                      initial={
                        triggerSlideAnimationRef.current ||
                        triggerSlideAnimation
                          ? { x: 400, opacity: 0, scale: 0.95 }
                          : { x: 0, opacity: 1, scale: 1 }
                      }
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2,
                      }}
                      className="w-full h-full"
                      onAnimationStart={() =>
                        console.log(
                          "🎬 Record motion.div animation STARTED, shouldAnimate:",
                          triggerSlideAnimationRef.current ||
                            triggerSlideAnimation,
                        )
                      }
                      onAnimationComplete={() =>
                        console.log(
                          "🎬 Record motion.div animation COMPLETED",
                        )
                      }
                    >
                      <RecordInterface
                        key={recordResetKey}
                        onMediaCaptured={
                          handleRecordMediaCaptured
                        }
                        onOpenVault={handleRecordOpenVault}
                        onClose={handleRecordClose}
                        onRegisterRestoreCallback={(
                          callback,
                        ) => {
                          recordRestoreMediaRef.current =
                            callback;
                        }}
                      />
                    </motion.div>
                  </ErrorBoundary>
                )}

              {activeTab === "vault" && (
                <ErrorBoundary>
                  <React.Suspense fallback={<AppLoader />}>
                    <div className="animate-fade-in-up">
                      <LegacyVault
                        key={vaultRefreshKey}
                        onUseMedia={handleVaultUseMedia}
                        onClose={handleVaultClose}
                        onNavigateToGlobalSettings={
                          handleVaultNavigateToSettings
                        }
                        importedMediaIds={
                          workflow.importedVaultMediaIds
                        }
                        onRemoveFromCapsule={
                          handleRemoveFromCapsule
                        }
                      />
                    </div>
                  </React.Suspense>
                </ErrorBoundary>
              )}

              {activeTab === "achievements" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up">
                    <AchievementsDashboard />
                  </div>
                </ErrorBoundary>
              )}

              {activeTab === "store" && (
                <ErrorBoundary>
                  <div className="animate-fade-in-up">
                    <Store 
                      onClose={() => handleTabChange("home")} 
                      userId={auth.user?.id || ''}
                      onOpenLegacyAccess={() => handleTabChange("legacy-access")}
                    />
                  </div>
                </ErrorBoundary>
              )}
            </div>

            {/* Footer - Hidden when Record tab is active */}
            {activeTab !== "record" && (
              <div className="mt-1 pt-1 sm:mt-2 sm:pt-2 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-[10px] sm:text-sm text-muted-foreground">
                  <span className="hidden sm:inline">
                    © 2025 Eras. Capture Today, Unlock
                    Tomorrow.
                  </span>
                  <span className="sm:hidden">
                    © 2025 Eras
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleTabChange("terms")}
                      className="hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      Terms
                    </button>
                    <span className="text-muted-foreground/50">
                      •
                    </span>
                    <button
                      onClick={() => handleTabChange("privacy")}
                      className="hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      Privacy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Recorder Modal - Now replaced by Record tab */}

          {/* Eras Odyssey Tutorial */}
          {auth.showOnboarding && (
            <>
              {/* HIDE ENTIRE APP CONTENT WHEN TUTORIAL IS SHOWING */}
              <style>{`
            body > div:first-child { display: none !important; }
            .tutorial-mobile-fullscreen ~ * { display: none !important; }
          `}</style>
              <ErasOdyssey
                onComplete={handleOnboardingComplete}
                onSkip={handleOnboardingComplete}
              />
            </>
          )}

          {/* Session Warning Dialog */}
          <Dialog
            open={showSessionWarning}
            onOpenChange={setShowSessionWarning}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <AlertCircle className="w-5 h-5" />
                  Session Issue Detected
                </DialogTitle>
                <DialogDescription>
                  Your session has expired or there was an
                  authentication issue. You have unsaved work
                  that will be lost if you sign out now.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Your work is saved locally
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    We've automatically saved a draft of your
                    capsule. You can recover it when you sign
                    back in.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setShowSessionWarning(false);
                      window.location.reload();
                    }}
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Page & Keep Working
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowSessionWarning(false);
                      if (sessionWarningCallback) {
                        sessionWarningCallback();
                      }
                    }}
                    className="w-full"
                  >
                    Sign Out (Work Saved as Draft)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Media Enhancement Overlay - Shows on top of any tab */}
          {/* TODO: Implement MediaEnhancementOverlay if needed
          {showEnhancementOverlay && enhancementMedia && (
            <MediaEnhancementOverlay
              mediaFile={
                Array.isArray(enhancementMedia)
                  ? undefined
                  : enhancementMedia?.blob ||
                      enhancementMedia?.url
                    ? enhancementMedia
                    : undefined
              }
              mediaFiles={
                Array.isArray(enhancementMedia)
                  ? enhancementMedia.filter(
                      (m) => m?.blob || m?.url,
                    )
                  : undefined
              }
              onSave={handleEnhancementSave}
              onReplaceSave={handleEnhancementReplaceSave}
              onUseInCapsule={handleEnhancementUseInCapsule}
              onCancel={handleEnhancementDiscard}
            />
          )}
          */}

          {/* Achievement Unlock Manager - Global achievement notifications */}
          <AchievementUnlockManager
            onNavigateToAchievements={() =>
              handleTabChange("achievements")
            }
            onNavigateToTitles={() => {
              setShowTitleCarousel(true);
            }}
          />

          {/* Welcome Celebration Manager - Shows First Step achievement to existing users once */}
          <WelcomeCelebrationManager />

          {/* Connection Health Indicator - Shows Cloudflare errors and connectivity status */}
          <ConnectionHealthIndicator
            onRetry={() => {
              console.log("🔄 User requested manual retry");
              window.location.reload();
            }}
          />

          {/* Title Carousel Modal - Accessible from header name/title */}
          <TitleCarouselModal
            isOpen={showTitleCarousel}
            onClose={() => setShowTitleCarousel(false)}
          />

          {/* Archive Modal - Accessible from gear menu */}
          {showArchiveModal && auth.session?.access_token && (
            <ForgottenMemories
              accessToken={auth.session.access_token}
              onClose={() => setShowArchiveModal(false)}
              onRestore={() => {
                // Refresh vault data when item is restored
                setVaultRefreshKey((prev) => prev + 1);
              }}
            />
          )}

          {/* 🎁 Referral System Modal - Accessible from gear menu */}
          {showReferralModal && auth.session?.access_token && (
            <Dialog open={showReferralModal} onOpenChange={setShowReferralModal}>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
                <DialogHeader className="sr-only">
                  <DialogTitle>Invite Friends & Earn Rewards</DialogTitle>
                  <DialogDescription>
                    Share Eras with your friends and unlock exclusive horizon effects when they join and create their first capsule.
                  </DialogDescription>
                </DialogHeader>
                <ReferralSystem 
                  onClose={() => setShowReferralModal(false)}
                  accessToken={auth.session.access_token}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* PORTALS: Render overlays outside main container to avoid z-index/overflow issues */}

        {/* New Unified Notification Center - z-[9999], portal overlay */}
        <NotificationCenter
          isOpen={showNotificationCenter}
          onClose={() => setShowNotificationCenter(false)}
          notifications={unifiedNotifications}
          onMarkAsRead={markUnifiedAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onNotificationClick={(
            capsuleId: string,
            notificationType?:
              | "received"
              | "delivered"
              | "echo",
          ) => {
            console.log(
              "🔔 Opening capsule from notification:",
              capsuleId,
              "type:",
              notificationType,
            );
            // 🔧 MOBILE FIX: Force close notification center immediately
            setShowNotificationCenter(false);

            // ⚡ INSTANT OPEN: Pre-fetch and display capsule immediately
            // No need to navigate - just set viewing capsule directly
            console.log(
              "⚡ [INSTANT OPEN] Pre-fetching capsule for instant display",
            );

            // If already on home tab, just set the viewing capsule
            if (activeTab === "home") {
              setViewingCapsuleFromNotification({
                capsuleId,
                notificationType,
              });
            } else {
              // Navigate to home, then set viewing capsule
              setTimeout(() => {
                handleTabChange("home");
                setViewingCapsuleFromNotification({
                  capsuleId,
                  notificationType,
                });
              }, 50);
            }
          }}
        />

        {/* Welcome Notification - Shows once per user */}
        <WelcomeNotification
          userId={auth.user?.id || null}
          addNotification={addNotification}
        />

        {/* Profile Picture Upload Modal */}
        <ProfilePictureUploadModal
          isOpen={showProfilePictureUpload}
          onClose={() => setShowProfilePictureUpload(false)}
          onSuccess={async () => {
            setShowProfilePictureUpload(false);
            // Refetch profile to update avatar immediately
            await refetchProfile();
            toast.success(
              "Profile picture updated successfully!",
            );
          }}
        />

        {/* Help & Support Modal */}
        <HelpSupportModal
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
          userEmail={auth.user?.email}
          userName={profile?.display_name}
          userId={auth.user?.id}
        />

        {/* Media Preview Modal - For viewing media from received capsules */}
        {previewMedia && (
          <MediaPreviewModal
            isOpen={true}
            mediaFile={previewMedia}
            onClose={() => setPreviewMedia(null)}
          />
        )}

        {/* Capsule Detail Portal Overlay - For viewing scheduled/delivered/received capsules from Timeline/Calendar */}
        {viewingCapsule && (
          <CapsuleDetailModal
            capsule={viewingCapsule}
            isOpen={true}
            onClose={() => {
              setViewingCapsule(null);
              // Stay on current view, don't force navigate
            }}
            onEditDetails={(capsule) => {
              // Allow editing if needed (drafts are handled separately)
              setViewingCapsule(null);
              handleEditCapsuleDetails(capsule);
            }}
            onMediaClick={(media) => {
              // Open media preview modal
              console.log(
                "Media clicked from received capsule:",
                media,
              );
              // ✅ Normalize media object to support both naming conventions
              const normalizedMedia = {
                id: media.id,
                file_name: media.file_name || media.filename,
                file_type:
                  media.file_type ||
                  media.type ||
                  media.media_type,
                file_size: media.file_size || media.size,
                url: media.url || media.file_url,
                created_at:
                  media.created_at || new Date().toISOString(),
              };
              setPreviewMedia(normalizedMedia);
            }}
            canEdit={false} // Received capsules are not editable
            onEchoSent={async () => {
              // Refresh capsule data after echo is sent
              console.log("💫 Echo sent from Portal overlay");
              // Could refresh here if needed
            }}
          />
        )}

        {/* Toaster for toast notifications - Required for all toast() calls to work */}
        <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
          duration={5000}
        />

        {/* Global style override for Portal Dialog z-index */}
        {viewingCapsule && (
          <style>{`
        [data-slot="dialog-overlay"] {
          z-index: 199 !important;
        }
      `}</style>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    // DIAGNOSTIC: Log prop changes
    const propsEqual =
      prevProps.isTransitioning === nextProps.isTransitioning &&
      prevProps.triggerSlideAnimation ===
        nextProps.triggerSlideAnimation &&
      prevProps.pendingAuthData === nextProps.pendingAuthData &&
      prevProps.onAuthenticationSuccess ===
        nextProps.onAuthenticationSuccess &&
      prevProps.onAuthDataProcessed ===
        nextProps.onAuthDataProcessed;

    if (!propsEqual) {
      console.log(
        "📊 MainAppContent props changed (re-rendering):",
      );
      if (
        prevProps.isTransitioning !== nextProps.isTransitioning
      ) {
        console.log(
          "  - isTransitioning:",
          prevProps.isTransitioning,
          "→",
          nextProps.isTransitioning,
        );
      }
      if (
        prevProps.triggerSlideAnimation !==
        nextProps.triggerSlideAnimation
      ) {
        console.log(
          "  - triggerSlideAnimation:",
          prevProps.triggerSlideAnimation,
          "→",
          nextProps.triggerSlideAnimation,
        );
      }
      if (
        prevProps.pendingAuthData !== nextProps.pendingAuthData
      ) {
        console.log(
          "  - pendingAuthData:",
          !!prevProps.pendingAuthData,
          "→",
          !!nextProps.pendingAuthData,
        );
      }
      if (
        prevProps.onAuthenticationSuccess !==
        nextProps.onAuthenticationSuccess
      ) {
        console.log(
          "  - onAuthenticationSuccess: function reference changed",
        );
      }
      if (
        prevProps.onAuthDataProcessed !==
        nextProps.onAuthDataProcessed
      ) {
        console.log(
          "  - onAuthDataProcessed: function reference changed",
        );
      }
    }

    // Return true to SKIP re-render, false to re-render
    // Custom comparison: only re-render if these specific props change
    // This prevents remounts when parent re-renders for unrelated reasons
    return propsEqual;
  },
);