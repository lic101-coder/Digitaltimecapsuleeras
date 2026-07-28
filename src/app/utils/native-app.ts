// Detects whether the React app is running inside a native iOS/Android shell
// (Capacitor, WKWebView wrapper, or any custom native container).
//
// The native shell should inject window.__ERAS_NATIVE__ = true into the WKWebView
// before the page loads. As a fallback we also check common Capacitor signals.

export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;

  // Primary signal: explicit flag set by the native shell
  if ((window as any).__ERAS_NATIVE__ === true) return true;

  // Capacitor signal
  if ((window as any).Capacitor?.isNativePlatform?.()) return true;

  // Cordova signal
  if ((window as any).cordova) return true;

  return false;
}

export function isIOSNative(): boolean {
  if (!isNativeApp()) return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// The custom URL scheme registered in Xcode Info.plist.
// Must also be added to Supabase Auth → URL Configuration → Redirect URLs.
export const NATIVE_REDIRECT_URL = 'erasapp://auth/callback';
