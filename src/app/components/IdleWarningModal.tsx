import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ShieldAlert } from 'lucide-react';

interface IdleWarningModalProps {
  show: boolean;
  secondsLeft: number;
  hasDraft: boolean;
  onStaySignedIn: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function IdleWarningModal({ show, secondsLeft, hasDraft, onStaySignedIn }: IdleWarningModalProps) {
  const isUrgent = secondsLeft <= 30;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#0f0f1a] border border-white/10 shadow-2xl">

              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: isUrgent
                    ? 'linear-gradient(90deg, #ef4444, #f97316)'
                    : 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                }}
              />

              <div className="p-6 flex flex-col items-center text-center gap-4">

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: isUrgent
                      ? 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)'
                      : 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 100%)',
                    border: `1px solid ${isUrgent ? 'rgba(239,68,68,0.3)' : 'rgba(139,92,246,0.3)'}`,
                  }}
                >
                  {isUrgent
                    ? <ShieldAlert className="w-6 h-6 text-red-400" />
                    : <Clock className="w-6 h-6 text-purple-400" />
                  }
                </div>

                {/* Headline */}
                <div>
                  <h2 className="text-white font-semibold text-lg leading-snug mb-1">
                    Still there?
                  </h2>
                  <p className="text-white/50 text-sm">
                    You've been inactive for a while.
                  </p>
                </div>

                {/* Countdown */}
                <div
                  className="rounded-xl px-5 py-3 w-full"
                  style={{
                    background: isUrgent
                      ? 'rgba(239,68,68,0.08)'
                      : 'rgba(139,92,246,0.08)',
                    border: `1px solid ${isUrgent ? 'rgba(239,68,68,0.2)' : 'rgba(139,92,246,0.15)'}`,
                  }}
                >
                  <p className="text-white/40 text-xs mb-1">Signing out in</p>
                  <p
                    className="font-mono font-bold text-3xl tabular-nums"
                    style={{ color: isUrgent ? '#f87171' : '#a78bfa' }}
                  >
                    {formatTime(secondsLeft)}
                  </p>
                </div>

                {/* Draft notice */}
                {hasDraft && (
                  <div className="flex items-start gap-2 rounded-lg px-3 py-2 w-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-400 text-sm mt-0.5">✓</span>
                    <p className="text-emerald-300/80 text-xs text-left leading-relaxed">
                      Your draft has been saved. It will be waiting for you when you sign back in.
                    </p>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={onStaySignedIn}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 active:scale-95"
                  style={{
                    background: isUrgent
                      ? 'linear-gradient(135deg, #ef4444, #f97316)'
                      : 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    boxShadow: isUrgent
                      ? '0 4px 20px rgba(239,68,68,0.35)'
                      : '0 4px 20px rgba(139,92,246,0.35)',
                  }}
                >
                  Stay Signed In
                </button>

                <p className="text-white/25 text-xs">
                  You'll be signed out automatically to protect your account.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
