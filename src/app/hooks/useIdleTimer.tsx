import { useEffect, useRef, useCallback, useState } from 'react';

const IDLE_TIMEOUT_MS   = 30 * 60 * 1000; // 30 minutes total
const WARNING_BEFORE_MS =  2 * 60 * 1000; // show warning 2 min before logout
const WARNING_AT_MS     = IDLE_TIMEOUT_MS - WARNING_BEFORE_MS; // 28 min

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove', 'mousedown', 'keydown', 'touchstart',
  'scroll', 'click', 'pointerdown',
];

export interface IdleTimerOptions {
  onLogout: () => void;
  enabled?: boolean;
}

export function useIdleTimer({ onLogout, enabled = true }: IdleTimerOptions) {
  // ── State (slots 1-2) ────────────────────────────────────────────────────
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(WARNING_BEFORE_MS / 1000);

  // ── Refs (slots 3-7) ─────────────────────────────────────────────────────
  const onLogoutRef     = useRef(onLogout);
  const showWarningRef  = useRef(false);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Callbacks (slots 8-12) — declared BEFORE effects to preserve hook order
  const clearAllTimers = useCallback(() => {
    if (warningTimerRef.current)  { clearTimeout(warningTimerRef.current);  warningTimerRef.current  = null; }
    if (logoutTimerRef.current)   { clearTimeout(logoutTimerRef.current);   logoutTimerRef.current   = null; }
    if (countdownRef.current)     { clearInterval(countdownRef.current);    countdownRef.current     = null; }
  }, []);

  const startCountdown = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setSecondsLeft(WARNING_BEFORE_MS / 1000);
    countdownRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(countdownRef.current!);
          countdownRef.current = null;
          return 0;
        }
        return next;
      });
    }, 1000);
  }, []);

  const scheduleTimers = useCallback(() => {
    clearAllTimers();
    warningTimerRef.current = setTimeout(() => {
      showWarningRef.current = true;
      setShowWarning(true);
      startCountdown();
      logoutTimerRef.current = setTimeout(() => {
        showWarningRef.current = false;
        setShowWarning(false);
        if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
        onLogoutRef.current();
      }, WARNING_BEFORE_MS);
    }, WARNING_AT_MS);
  }, [clearAllTimers, startCountdown]);

  const staySignedIn = useCallback(() => {
    showWarningRef.current = false;
    setShowWarning(false);
    setSecondsLeft(WARNING_BEFORE_MS / 1000);
    scheduleTimers();
  }, [scheduleTimers]);

  const handleActivity = useCallback(() => {
    if (showWarningRef.current) return;
    scheduleTimers();
  }, [scheduleTimers]);

  // ── Effects (slots 13-14) ─────────────────────────────────────────────────
  // Keep onLogout ref fresh without triggering the main effect to re-run.
  useEffect(() => { onLogoutRef.current = onLogout; }, [onLogout]);

  // Single stable effect — [enabled] only; stable callbacks read from refs.
  useEffect(() => {
    if (!enabled) return;
    scheduleTimers();
    ACTIVITY_EVENTS.forEach(e => window.addEventListener(e, handleActivity, { passive: true }));
    return () => {
      clearAllTimers();
      ACTIVITY_EVENTS.forEach(e => window.removeEventListener(e, handleActivity));
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return { showWarning, secondsLeft, staySignedIn };
}
