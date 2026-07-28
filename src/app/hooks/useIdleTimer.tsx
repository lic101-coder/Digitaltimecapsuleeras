import { useEffect, useRef, useCallback, useState } from 'react';

const IDLE_TIMEOUT_MS  = 30 * 60 * 1000; // 30 minutes
const WARNING_BEFORE_MS = 2 * 60 * 1000; // warn at 28 minutes (2 min before logout)
const WARNING_AT_MS    = IDLE_TIMEOUT_MS - WARNING_BEFORE_MS; // 28 min

// User-activity events that reset the idle clock
const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'click',
  'pointerdown',
];

export interface IdleTimerOptions {
  onLogout: () => void;
  enabled?: boolean;
}

export function useIdleTimer({ onLogout, enabled = true }: IdleTimerOptions) {
  const [showWarning, setShowWarning]     = useState(false);
  const [secondsLeft, setSecondsLeft]     = useState(WARNING_BEFORE_MS / 1000);

  const lastActivityRef  = useRef<number>(Date.now());
  const logoutTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const warningShownAtRef = useRef<number | null>(null);

  const clearAllTimers = useCallback(() => {
    if (logoutTimerRef.current)   clearTimeout(logoutTimerRef.current);
    if (warningTimerRef.current)  clearTimeout(warningTimerRef.current);
    if (countdownRef.current)     clearInterval(countdownRef.current);
    logoutTimerRef.current  = null;
    warningTimerRef.current = null;
    countdownRef.current    = null;
  }, []);

  const startCountdown = useCallback(() => {
    setSecondsLeft(WARNING_BEFORE_MS / 1000);
    warningShownAtRef.current = Date.now();

    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const scheduleTimers = useCallback(() => {
    clearAllTimers();

    // Show warning at 28 min
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      startCountdown();

      // Sign out at 30 min
      logoutTimerRef.current = setTimeout(() => {
        setShowWarning(false);
        onLogout();
      }, WARNING_BEFORE_MS);
    }, WARNING_AT_MS);
  }, [clearAllTimers, startCountdown, onLogout]);

  // Dismiss warning and reset the full 30-min clock
  const staySignedIn = useCallback(() => {
    setShowWarning(false);
    lastActivityRef.current = Date.now();
    scheduleTimers();
  }, [scheduleTimers]);

  // Called by activity events
  const handleActivity = useCallback(() => {
    // Ignore activity if the warning is already showing — user must explicitly
    // click "Stay Signed In" to prevent accidental dismissal
    if (showWarning) return;

    lastActivityRef.current = Date.now();
    scheduleTimers();
  }, [showWarning, scheduleTimers]);

  useEffect(() => {
    if (!enabled) return;

    scheduleTimers();

    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      clearAllTimers();
      ACTIVITY_EVENTS.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, handleActivity, scheduleTimers, clearAllTimers]);

  return { showWarning, secondsLeft, staySignedIn };
}
