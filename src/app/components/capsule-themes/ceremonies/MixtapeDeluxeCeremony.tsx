/**
 * Mixtape - Neon Nights Ceremony (Deluxe Enhanced — Round 4)
 *
 * 80s synthwave aesthetic — dark purple/navy background, neon pink/cyan/magenta palette
 * Mobile-safe rebuild: all arrays via useMemo, Math.random() only in useMemo,
 * repeat:Infinity only on slow ambient elements (>3s, subtle), max ~22 simultaneous elements.
 */

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface MixtapeDeluxeCeremonyProps {
  capsuleTitle: string
  media?: any[]
  isPreview?: boolean
  onComplete?: () => void
}

export function MixtapeDeluxeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: MixtapeDeluxeCeremonyProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const [stage, setStage] = useState<
    'intro' | 'synthwave' | 'delorean' | 'friends' | 'radiance'
  >('intro')
  const completedRef = React.useRef(false)

  // ── Ambient stars (useMemo — static positions, slow twinkle) ──────────────
  const stars = useMemo(() => {
    const count = isMobile ? 40 : 70
    return Array.from({ length: count }, (_, i) => {
      const tier = i % 10
      const size = tier < 6 ? 1 : tier < 9 ? 2 : 3
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 55,
        size,
        duration: 3.5 + Math.random() * 3,
        delay: Math.random() * 3,
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Grid pulse lines for intro stage ─────────────────────────────────────
  const gridPulseLines = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
    }))
  }, [])

  // ── Buildings for synthwave skyline — 10 total ─────────────────────────────
  const buildings = useMemo(() => {
    const specs = [
      { heightPct: 30, width: 38, left: '2%',  color: '#ff00ff', windows: 3, delay: 0.5 },
      { heightPct: 45, width: 28, left: '8%',  color: '#00ffff', windows: 4, delay: 0.6 },
      { heightPct: 60, width: 44, left: '14%', color: '#ff00ff', windows: 6, delay: 0.7 },
      { heightPct: 35, width: 22, left: '21%', color: '#aa00ff', windows: 3, delay: 0.8 },
      { heightPct: 38, width: 26, left: '48%', color: '#ff00aa', windows: 4, delay: 0.75 },
      { heightPct: 50, width: 36, right: '21%', color: '#ff00aa', windows: 5, delay: 0.8 },
      { heightPct: 40, width: 26, right: '14%', color: '#00ffff', windows: 4, delay: 0.7 },
      { heightPct: 65, width: 46, right: '7%',  color: '#ff00ff', windows: 6, delay: 0.6 },
      { heightPct: 28, width: 20, right: '2%',  color: '#ffff00', windows: 2, delay: 0.5 },
      { heightPct: 28, width: 20, left: '74%',  color: '#00ffcc', windows: 2, delay: 0.65 },
    ]
    return specs.map((s, i) => ({
      ...s,
      id: i,
      windowPositions: Array.from({ length: s.windows }, (_, wi) => ({
        wx: 20 + (wi % 2) * 40,
        wy: 15 + Math.floor(wi / 2) * 28,
        lit: Math.random() > 0.35,
      })),
    }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Flying neon birds — 4 drifting across sky ────────────────────────────
  const neonBirds = useMemo(() => {
    return [
      { id: 0, top: 8 + Math.random() * 10, duration: 6 + Math.random() * 2, delay: 0.5 },
      { id: 1, top: 16 + Math.random() * 8, duration: 5 + Math.random() * 3, delay: 2.5 },
      { id: 2, top: 22, duration: 6 + Math.random() * 1, delay: 1.2 },
      { id: 3, top: 28, duration: 7 + Math.random() * 1, delay: 3.5 },
    ]
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Neon road lane markings (synthwave stage) ─────────────────────────────
  const laneDashes = useMemo(() => {
    return [
      { id: 0, delay: 0.3, startY: 32, endY: 52, startW: 3, endW: 10, startH: 2, endH: 5 },
      { id: 1, delay: 0.5, startY: 36, endY: 55, startW: 4, endW: 12, startH: 2, endH: 5 },
      { id: 2, delay: 0.7, startY: 39, endY: 58, startW: 3, endW: 10, startH: 2, endH: 6 },
    ]
  }, [])

  // ── Stage 3: star-streak lines behind car — 16 total ─────────────────────
  const starStreaks = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      top: 6 + i * 4.8,
      width: 35 + Math.random() * 65,
      delay: 0.05 + Math.random() * 0.5,
    }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tire track dots — 3 positions on road ────────────────────────────────
  const tireTracks = useMemo(() => {
    return [
      { id: 0, leftPct: 22, delay: 1.0 },
      { id: 1, leftPct: 40, delay: 1.5 },
      { id: 2, leftPct: 58, delay: 2.0 },
    ]
  }, [])

  // ── Confetti squares for friends stage ───────────────────────────────────
  const confettiSquares = useMemo(() => {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#00ff88', '#ff0088']
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: 8 + Math.random() * 84,
      top: 55 + Math.random() * 30,
      size: 8 + Math.random() * 12,
      delay: i * 0.12,
      rotate: Math.random() * 45,
    }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Light columns for radiance stage — 10 total ──────────────────────────
  const lightColumns = useMemo(() => {
    const colors = [
      '#ff00ff', '#00ffff', '#ffff00', '#ffffff',
      '#ff0088', '#00ff88', '#ff6600', '#aa00ff',
      '#ff44cc', '#44ffee',
    ]
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: 8 + i * 8.4,
      delay: i * 0.1,
    }))
  }, [])

  // ── Concert spotlights — 5 beams ─────────────────────────────────────────
  const spotlights = useMemo(() => {
    return [
      { id: 0, color: 'rgba(255,0,255,0.18)',   angle: -35, left: '10%', delay: 0.1 },
      { id: 1, color: 'rgba(255,0,255,0.18)',   angle: -20, left: '20%', delay: 0.2 },
      { id: 2, color: 'rgba(0,255,255,0.16)',   angle: 0,   left: '50%', delay: 0.5 },
      { id: 3, color: 'rgba(255,0,128,0.18)',   angle: 20,  left: '78%', delay: 0.8 },
      { id: 4, color: 'rgba(170,0,255,0.16)',   angle: 35,  left: '90%', delay: 1.0 },
    ]
  }, [])

  // ── Timeline ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const schedule: Array<{ t: number; fn: () => void }> = [
      { t: 0,     fn: () => setStage('intro') },
      { t: 2000,  fn: () => setStage('synthwave') },
      { t: 6000,  fn: () => setStage('delorean') },
      { t: 10000, fn: () => setStage('friends') },
      { t: 14000, fn: () => setStage('radiance') },
      {
        t: 16500,
        fn: () => {
          if (!completedRef.current) {
            completedRef.current = true
            onComplete?.()
          }
        },
      },
    ]

    const handles = schedule.map(({ t, fn }) => setTimeout(fn, t))

    // Failsafe at ~17s
    const failsafe = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.()
      }
    }, 17000)

    return () => {
      handles.forEach(clearTimeout)
      clearTimeout(failsafe)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Derived booleans ──────────────────────────────────────────────────────
  const showGrid =
    stage === 'synthwave' ||
    stage === 'delorean' ||
    stage === 'friends' ||
    stage === 'radiance'

  const showSun =
    stage === 'synthwave' ||
    stage === 'delorean' ||
    stage === 'friends' ||
    stage === 'radiance'

  const showPalms =
    stage === 'synthwave' ||
    stage === 'delorean' ||
    stage === 'friends' ||
    stage === 'radiance'

  const showSigns =
    stage === 'synthwave' ||
    stage === 'delorean' ||
    stage === 'friends' ||
    stage === 'radiance'

  const screenW = typeof window !== 'undefined' ? window.innerWidth : 800

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #0a0015 0%, #12002a 40%, #1a0040 70%, #0d001a 100%)',
      }}
      animate={{
        boxShadow: [
          'inset 0 0 60px rgba(255,0,255,0.4)',
          'inset 0 0 90px rgba(255,0,255,0.65)',
          'inset 0 0 60px rgba(255,0,255,0.4)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* ── CSS keyframes ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes zap-flicker {
          0%, 100% { opacity: 0; }
          45%, 55% { opacity: 1; }
        }
        @keyframes neon-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes city-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes road-rush {
          0%   { background-position: 50% 0%; }
          100% { background-position: 50% 100%; }
        }
        @keyframes sun-chromatic {
          0%, 100% { filter: drop-shadow(0 0 20px #ff00ff) drop-shadow(0 0 40px rgba(255,0,255,0.5)); }
          50%       { filter: drop-shadow(0 0 30px #ff6600) drop-shadow(0 0 60px rgba(255,100,0,0.6)); }
        }
        @keyframes palm-glow-pulse-l {
          0%, 100% { filter: drop-shadow(0 0 16px #00ffff) drop-shadow(0 0 32px rgba(0,255,255,0.4)) drop-shadow(0 0 8px #ffffff); }
          50%       { filter: drop-shadow(0 0 28px #00ffff) drop-shadow(0 0 56px rgba(0,255,255,0.7)) drop-shadow(0 0 14px #ffffff); }
        }
        @keyframes palm-glow-pulse-r {
          0%, 100% { filter: drop-shadow(0 0 16px #ff00ff) drop-shadow(0 0 32px rgba(255,0,255,0.4)) drop-shadow(0 0 8px #ffffff); }
          50%       { filter: drop-shadow(0 0 28px #ff00ff) drop-shadow(0 0 56px rgba(255,0,255,0.7)) drop-shadow(0 0 14px #ffffff); }
        }
        @keyframes trail-pulse {
          0%, 100% { opacity: 0.8; }
          50%       { opacity: 0.3; }
        }
        @keyframes neon-pulse {
          0%, 100% { text-shadow: 0 0 24px #ff00ff, 0 0 48px #00ffff, 3px 3px 0 #00ffff; }
          50%       { text-shadow: 0 0 40px #ff00ff, 0 0 80px #ff00ff, 0 0 16px #ffffff, 3px 3px 0 #00ffff; }
        }
      `}</style>

      {/* ── VHS scanline overlay — static, no animation ──────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
          zIndex: 60,
        }}
      />

      {/* ── CRT neon scan sweep — single bar travelling top→bottom, CSS only ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255,255,255,0.18)',
          animation: 'neon-scan 4s linear infinite',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── CSS perspective grid — road-rush animation ─────────────────────── */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            key="grid"
            className="absolute left-0 right-0 bottom-0 pointer-events-none"
            style={{
              height: '55%',
              zIndex: 5,
              perspective: '400px',
              perspectiveOrigin: '50% 0%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: 'rotateX(55deg)',
                transformOrigin: '50% 0%',
                backgroundImage: `
                  linear-gradient(rgba(255,0,255,0.55) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,255,0.45) 1px, transparent 1px)
                `,
                backgroundSize: `${isMobile ? '60px' : '80px'} ${isMobile ? '40px' : '55px'}`,
                animation: 'road-rush 0.8s linear infinite',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Intro grid pulse lines — 8 lines sweep upward once ───────────── */}
      <AnimatePresence>
        {stage === 'intro' && (
          <>
            {gridPulseLines.map((line) => (
              <motion.div
                key={`pulse-line-${line.id}`}
                className="absolute left-0 right-0 pointer-events-none"
                style={{
                  height: '2px',
                  background: 'linear-gradient(to right, transparent, rgba(0,255,255,0.6), rgba(255,0,255,0.6), transparent)',
                  zIndex: 6,
                  bottom: 0,
                }}
                initial={{ bottom: '0%', opacity: 0 }}
                animate={{ bottom: '55%', opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 1.4,
                  delay: line.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── Ambient stars — slow twinkle, repeat:Infinity ok (>3s, subtle) ─ */}
      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: '#ffffff',
            zIndex: 3,
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ════════════════════════════════════════════════════════════════════
          STAGE 1 — INTRO (0–2s): "NEON NIGHTS" + VHS tape load + chromatic aberration
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="intro-title"
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Chromatic aberration copies — flash once then vanish */}
            <motion.div
              style={{
                position: 'absolute',
                fontFamily: 'Impact, "Arial Narrow", sans-serif',
                fontSize: 'clamp(36px, 10vw, 80px)',
                color: 'rgba(255,30,30,0.7)',
                letterSpacing: 'clamp(4px, 1.5vw, 12px)',
                textAlign: 'center',
                lineHeight: 1,
                left: 'calc(50% - 2px)',
                transform: 'translateX(-50%)',
                top: '50%',
                marginTop: 'clamp(-40px, -5vw, -40px)',
                zIndex: 38,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              NEON NIGHTS
            </motion.div>
            <motion.div
              style={{
                position: 'absolute',
                fontFamily: 'Impact, "Arial Narrow", sans-serif',
                fontSize: 'clamp(36px, 10vw, 80px)',
                color: 'rgba(0,255,255,0.7)',
                letterSpacing: 'clamp(4px, 1.5vw, 12px)',
                textAlign: 'center',
                lineHeight: 1,
                left: 'calc(50% + 2px)',
                transform: 'translateX(-50%)',
                top: '50%',
                marginTop: 'clamp(-40px, -5vw, -40px)',
                zIndex: 38,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              NEON NIGHTS
            </motion.div>

            <motion.h1
              style={{
                fontFamily: 'Impact, "Arial Narrow", sans-serif',
                fontSize: 'clamp(36px, 10vw, 80px)',
                color: '#ff00ff',
                textShadow:
                  '0 0 20px #ff00ff, 0 0 40px #ff00ff, 4px 4px 0 #00ffff',
                letterSpacing: 'clamp(4px, 1.5vw, 12px)',
                textAlign: 'center',
                lineHeight: 1,
                position: 'relative',
                zIndex: 39,
              }}
              initial={{ filter: 'blur(16px)', scale: 1.3, opacity: 0 }}
              animate={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              NEON NIGHTS
            </motion.h1>

            <motion.p
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(11px, 2.5vw, 18px)',
                color: '#00ffff',
                textShadow: '0 0 10px #00ffff',
                letterSpacing: 'clamp(3px, 1vw, 7px)',
                marginTop: '12px',
                position: 'relative',
                zIndex: 39,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              FOREVER ELECTRIC
            </motion.p>

            {/* SIDE A ► cassette label */}
            <motion.p
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(9px, 1.6vw, 12px)',
                color: '#ffd700',
                textShadow: '0 0 8px #ffd700, 0 0 16px rgba(255,215,0,0.5)',
                letterSpacing: 'clamp(2px, 0.7vw, 4px)',
                marginTop: '5px',
                position: 'relative',
                zIndex: 39,
                border: '1px solid rgba(255,215,0,0.4)',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              SIDE A ►
            </motion.p>

            {/* EST. 1985 subtext */}
            <motion.p
              style={{
                fontFamily: 'monospace',
                fontSize: 'clamp(9px, 1.8vw, 13px)',
                color: 'rgba(255,215,0,0.7)',
                textShadow: '0 0 8px #ffd700',
                letterSpacing: 'clamp(2px, 0.8vw, 5px)',
                marginTop: '6px',
                position: 'relative',
                zIndex: 39,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              EST. 1985
            </motion.p>

            {/* VHS tape-loading scan line sweeping top→bottom once */}
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '4px',
                background: 'rgba(255,255,255,0.30)',
                zIndex: 50,
                pointerEvents: 'none',
              }}
              initial={{ top: '-20px', opacity: 0 }}
              animate={{ top: '100%', opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          STAGE 2 — SYNTHWAVE (2–6s): sun rises, palm trees, 10 buildings, signs, birds
          ════════════════════════════════════════════════════════════════════ */}

      {/* Neon sun — wrapped in chromatic CSS glow animation */}
      <AnimatePresence>
        {showSun && (
          <motion.div
            key="sun"
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '18%',
              transform: 'translate(-50%, -50%)',
              zIndex: 12,
              animation: 'sun-chromatic 4s ease-in-out infinite',
            }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          >
            <svg
              width={isMobile ? 140 : 190}
              height={isMobile ? 140 : 190}
              viewBox="0 0 170 170"
              overflow="visible"
            >
              {/* Decorative rainbow ring */}
              <defs>
                <linearGradient id="sunRainbow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#ff00ff" />
                  <stop offset="33%"  stopColor="#ffff00" />
                  <stop offset="66%"  stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
                <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffee00" />
                  <stop offset="50%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#cc0066" />
                </linearGradient>
                <clipPath id="sunClip">
                  <circle cx="85" cy="85" r="72" />
                </clipPath>
              </defs>

              {/* Second outer glow ring — larger, slow ambient pulse */}
              <motion.circle
                cx="85"
                cy="85"
                r="94"
                fill="none"
                stroke="rgba(255,100,0,0.15)"
                strokeWidth="2"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Outer glow ring — slow ambient pulse, repeat:Infinity ok */}
              <motion.circle
                cx="85"
                cy="85"
                r="82"
                fill="none"
                stroke="rgba(255,0,255,0.25)"
                strokeWidth="3"
                animate={{ r: [82, 88, 82], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Decorative rainbow ring at r=60 */}
              <circle
                cx="85"
                cy="85"
                r="60"
                fill="none"
                stroke="url(#sunRainbow)"
                strokeWidth="2"
                opacity="0.35"
              />
              {/* Static sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                const rad = (angle * Math.PI) / 180
                const innerR = 75
                const outerR = 100
                const x1 = 85 + innerR * Math.cos(rad)
                const y1 = 85 + innerR * Math.sin(rad)
                const x2 = 85 + outerR * Math.cos(rad)
                const y2 = 85 + outerR * Math.sin(rad)
                return (
                  <line
                    key={`ray-${idx}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,200,0,0.5)"
                    strokeWidth="2"
                  />
                )
              })}
              <circle cx="83" cy="85" r="72" fill="rgba(0,255,255,0.2)" clipPath="url(#sunClip)" />
              <circle cx="87" cy="85" r="72" fill="rgba(255,0,255,0.2)" clipPath="url(#sunClip)" />
              <circle cx="85" cy="85" r="72" fill="url(#sunGrad)" />
              {/* 10 scan lines inside the sun */}
              {[5, 16, 27, 37, 47, 57, 67, 77, 87, 95].map((pct, idx) => (
                <line
                  key={`sl-${idx}`}
                  x1="13"
                  y1={85 - 72 + pct * 1.44}
                  x2="157"
                  y2={85 - 72 + pct * 1.44}
                  stroke="rgba(200,0,200,0.55)"
                  strokeWidth="2.5"
                  clipPath="url(#sunClip)"
                />
              ))}
              <circle
                cx="85"
                cy="85"
                r="72"
                fill="none"
                stroke="#ff00ff"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0 0 18px #ff00ff)' }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizon line */}
      <AnimatePresence>
        {showSun && (
          <motion.div
            key="horizon"
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: '30%',
              height: '3px',
              background:
                'linear-gradient(to right, #ff00ff, #00ffff, #ffff00, #00ffff, #ff00ff)',
              boxShadow: '0 0 18px rgba(255,0,255,0.8)',
              zIndex: 13,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* 10 city buildings with neon-lit windows + animated window lights */}
      <AnimatePresence>
        {showSun && (
          <>
            {buildings.map((b) => (
              <motion.div
                key={`building-${b.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: (b as any).left,
                  right: (b as any).right,
                  bottom: '45%',
                  width: `${b.width}px`,
                  height: `${b.heightPct * (isMobile ? 0.6 : 1)}px`,
                  background: '#000000',
                  border: `1.5px solid ${b.color}`,
                  boxShadow: `0 0 8px ${b.color}, inset 0 0 8px rgba(0,0,0,0.8), 0 2px 12px rgba(255,0,255,0.4)`,
                  zIndex: 11,
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: b.delay }}
              >
                {b.windowPositions.map((wp, wi) =>
                  wp.lit ? (
                    <div
                      key={`win-${wi}`}
                      style={{
                        position: 'absolute',
                        left: `${wp.wx}%`,
                        top: `${wp.wy}%`,
                        width: '5px',
                        height: '5px',
                        background: '#ffff00',
                        boxShadow: '0 0 4px #ffff00',
                      }}
                    />
                  ) : null
                )}
                {/* Animated window lights for tall buildings (indices 0,2,4,6 → ids 0,2,4,6) */}
                {[0, 2, 4, 6].includes(b.id) && (() => {
                  const pulseDs = ['3.2s', '4.1s', '3.7s', '4.8s']
                  const pd = pulseDs[[0, 2, 4, 6].indexOf(b.id)]
                  return (
                    <>
                      <div
                        style={{
                          position: 'absolute',
                          left: '15%',
                          top: '25%',
                          width: '4px',
                          height: '4px',
                          background: 'rgba(255,255,0,0.8)',
                          animation: `city-pulse ${pd} ease-in-out infinite`,
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: '55%',
                          top: '60%',
                          width: '4px',
                          height: '4px',
                          background: 'rgba(255,255,0,0.8)',
                          animation: `city-pulse ${pd} ease-in-out infinite`,
                          animationDelay: `${parseFloat(pd) / 2}s`,
                        }}
                      />
                    </>
                  )
                })()}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Flying neon birds — 4, ambient drift, repeat:Infinity (>5s) */}
      <AnimatePresence>
        {showSun && (
          <>
            {neonBirds.map((bird) => (
              <motion.div
                key={`bird-${bird.id}`}
                className="absolute pointer-events-none select-none"
                style={{
                  top: `${bird.top}%`,
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#00ffff',
                  textShadow: '0 0 8px #00ffff',
                  zIndex: 15,
                }}
                initial={{ left: '-5%', opacity: 0 }}
                animate={{ left: '110%', opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                  duration: bird.duration,
                  delay: bird.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                ~
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Neon road lane markings — 3 dashes animating far→near, single-play */}
      <AnimatePresence>
        {(stage === 'synthwave' || stage === 'delorean') && (
          <>
            {laneDashes.map((dash) => (
              <motion.div
                key={`lane-${dash.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 0 6px rgba(255,255,255,0.8)',
                  zIndex: 9,
                  transformOrigin: 'center center',
                }}
                initial={{
                  top: `${dash.startY}%`,
                  width: `${dash.startW}px`,
                  height: `${dash.startH}px`,
                  x: '-50%',
                  opacity: 0,
                }}
                animate={{
                  top: [`${dash.startY}%`, `${dash.endY}%`],
                  width: [`${dash.startW}px`, `${dash.endW}px`],
                  height: [`${dash.startH}px`, `${dash.endH}px`],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: dash.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Palm trees — wrapped with CSS glow pulse animations + ground glow */}
      <AnimatePresence>
        {showPalms && (
          <>
            {/* Left palm wrapper */}
            <div
              style={{
                position: 'absolute',
                left: isMobile ? '2%' : '6%',
                bottom: '38%',
                zIndex: 14,
                animation: 'palm-glow-pulse-l 3.5s ease-in-out infinite',
              }}
            >
              <motion.div
                key="palm-left"
                className="pointer-events-none select-none"
                style={{
                  fontSize: isMobile ? '64px' : '88px',
                  lineHeight: 1,
                  position: 'relative',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.95, y: 0, rotate: [-3, 3, -3] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1, delay: 0.4 },
                  y: { duration: 1, delay: 0.4 },
                  rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }}
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  🌴
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-8px',
                      fontSize: '14px',
                      animation: 'zap-flicker 2.5s ease-in-out infinite',
                    }}
                  >
                    ⚡
                  </span>
                </span>
              </motion.div>
              {/* Ground glow — left palm */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#00ffff',
                  filter: 'blur(6px)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Right palm wrapper */}
            <div
              style={{
                position: 'absolute',
                right: isMobile ? '2%' : '6%',
                bottom: '38%',
                zIndex: 14,
                animation: 'palm-glow-pulse-r 3.5s ease-in-out infinite',
                animationDelay: '1.75s',
              }}
            >
              <motion.div
                key="palm-right"
                className="pointer-events-none select-none"
                style={{
                  fontSize: isMobile ? '64px' : '88px',
                  lineHeight: 1,
                  position: 'relative',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.95, y: 0, rotate: [3, -3, 3] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1, delay: 0.6 },
                  y: { duration: 1, delay: 0.6 },
                  rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
                }}
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  🌴
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-8px',
                      fontSize: '14px',
                      animation: 'zap-flicker 2.5s ease-in-out infinite',
                      animationDelay: '1.25s',
                    }}
                  >
                    ⚡
                  </span>
                </span>
              </motion.div>
              {/* Ground glow — right palm */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#ff00ff',
                  filter: 'blur(6px)',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }}
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Neon signs — ARCADE, RETRO, DRIVE (hot-pink double border) */}
      <AnimatePresence>
        {showSigns && (
          <>
            {[
              {
                label: 'ARCADE',
                color: '#ffff00',
                left: isMobile ? '5%' : '10%',
                top: '34%',
                rotate: -10,
                delay: 0.8,
                drive: false,
              },
              {
                label: 'RETRO',
                color: '#00ffff',
                right: isMobile ? '5%' : '12%',
                top: '38%',
                rotate: 8,
                delay: 1.2,
                drive: false,
              },
            ].map((sign) => (
              <motion.div
                key={`sign-${sign.label}`}
                className="absolute pointer-events-none"
                style={{
                  left: (sign as any).left,
                  right: (sign as any).right,
                  top: sign.top,
                  transform: `rotate(${sign.rotate}deg)`,
                  zIndex: 18,
                  maxWidth: 'calc(100vw - 20px)',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: sign.delay }}
              >
                <span
                  style={{
                    fontFamily: 'Impact, "Arial Narrow", sans-serif',
                    fontSize: isMobile ? '18px' : '26px',
                    color: sign.color,
                    textShadow: `0 0 12px ${sign.color}, 0 0 24px ${sign.color}`,
                    letterSpacing: '3px',
                  }}
                >
                  {sign.label}
                </span>
              </motion.div>
            ))}

            {/* DRIVE neon sign — hot-pink double border box-shadow */}
            <motion.div
              key="sign-drive"
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '44%',
                transform: 'translateX(-50%)',
                zIndex: 18,
                maxWidth: 'calc(100vw - 20px)',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
            >
              <span
                style={{
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: isMobile ? '22px' : '32px',
                  color: '#ff2d9b',
                  letterSpacing: '4px',
                  display: 'inline-block',
                  padding: '3px 10px',
                  border: '2px solid #ff2d9b',
                  boxShadow:
                    '0 0 12px #ff2d9b, 0 0 28px #ff2d9b, inset 0 0 10px rgba(255,45,155,0.25), 0 0 0 4px rgba(255,45,155,0.25)',
                  textShadow: '0 0 14px #ff2d9b, 0 0 30px #ff2d9b',
                  borderRadius: '4px',
                }}
              >
                DRIVE
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          STAGE 3 — DELOREAN (6–10s): SPEEDWAY + hero car + 2 bg cars
          + trail + 16 streaks + underglow + tire tracks + dual sonic boom rings
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'delorean' && (
          <>
            {/* SPEEDWAY neon sign */}
            <motion.div
              key="speedway-sign"
              className="absolute pointer-events-none"
              style={{
                position: 'absolute',
                top: '8%',
                left: '4%',
                zIndex: 25,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.5, delay: 0.3, ease: 'easeInOut' }}
            >
              <span
                style={{
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: 'clamp(14px, 3.5vw, 22px)',
                  color: '#ff00ff',
                  textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px rgba(255,0,255,0.5)',
                  letterSpacing: '3px',
                }}
              >
                SPEEDWAY
              </span>
            </motion.div>

            {/* 🚙 hero car */}
            <motion.div
              key="delorean"
              className="absolute pointer-events-none select-none"
              style={{
                bottom: '38%',
                fontSize: isMobile ? '36px' : '52px',
                zIndex: 22,
                lineHeight: 1,
              }}
              initial={{ x: -200 }}
              animate={{ x: screenW + 200 }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.3 }}
            >
              <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🚙</span>
            </motion.div>

            {/* CSS trail-pulse gradient following car */}
            <motion.div
              key="car-trail-css"
              className="absolute pointer-events-none"
              style={{
                bottom: isMobile ? 'calc(38% + 8px)' : 'calc(38% + 12px)',
                left: 0,
                width: '60px',
                height: '20px',
                background: 'linear-gradient(to left, rgba(0,255,255,0.5), transparent)',
                animation: 'trail-pulse 1.8s ease-in-out infinite',
                zIndex: 21,
              }}
              initial={{ x: -200 }}
              animate={{ x: screenW + 200 }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.3 }}
            />

            {/* Neon underglow */}
            <motion.div
              key="underglow"
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(38% - 4px)',
                width: isMobile ? '48px' : '68px',
                height: '8px',
                background: 'linear-gradient(to right, rgba(0,255,255,0.7), rgba(255,0,255,0.7))',
                filter: 'blur(6px)',
                borderRadius: '50%',
                zIndex: 21,
              }}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: screenW + 200, opacity: [0, 0.9, 0.9, 0.5] }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.3 }}
            />

            {/* Headlight beams */}
            <motion.div
              key="headlight-1"
              className="absolute pointer-events-none"
              style={{
                bottom: isMobile ? 'calc(38% + 8px)' : 'calc(38% + 12px)',
                left: 0,
                width: isMobile ? '60px' : '90px',
                height: isMobile ? '18px' : '26px',
                background: 'rgba(255, 220, 100, 0.7)',
                clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)',
                filter: 'blur(2px)',
                zIndex: 23,
              }}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: [0, 0.8], x: screenW + 200 }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.3 }}
            />
            <motion.div
              key="headlight-2"
              className="absolute pointer-events-none"
              style={{
                bottom: isMobile ? 'calc(38% - 8px)' : 'calc(38% - 10px)',
                left: 0,
                width: isMobile ? '60px' : '90px',
                height: isMobile ? '14px' : '20px',
                background: 'rgba(255, 230, 120, 0.5)',
                clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)',
                filter: 'blur(3px)',
                zIndex: 23,
              }}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: [0, 0.6], x: screenW + 200 }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.3 }}
            />

            {/* Light trail behind hero car */}
            <motion.div
              key="car-trail"
              className="absolute pointer-events-none"
              style={{
                bottom: isMobile ? 'calc(38% + 10px)' : 'calc(38% + 14px)',
                left: 0,
                height: isMobile ? '5px' : '7px',
                width: '40%',
                background:
                  'linear-gradient(to right, transparent, rgba(0,255,255,0.8), rgba(255,0,255,0.6), transparent)',
                filter: 'blur(2px)',
                zIndex: 21,
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0.7], opacity: [0, 1, 0.4] }}
              transition={{ duration: 3.2, ease: 'easeInOut', delay: 0.3 }}
            />

            {/* Wheel sparks */}
            <motion.div
              key="wheel-spark-1"
              className="absolute pointer-events-none rounded-full"
              style={{
                bottom: isMobile ? 'calc(38% - 6px)' : 'calc(38% - 8px)',
                left: 0,
                width: '5px',
                height: '5px',
                background: '#ff6600',
                boxShadow: '0 0 6px #ff6600',
                zIndex: 22,
              }}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: screenW + 200, y: [0, -4, 0, -4, 0], opacity: [0, 1, 1, 1, 0.8] }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.4 }}
            />
            <motion.div
              key="wheel-spark-2"
              className="absolute pointer-events-none rounded-full"
              style={{
                bottom: isMobile ? 'calc(38% - 6px)' : 'calc(38% - 8px)',
                left: 0,
                width: '5px',
                height: '5px',
                background: '#ffaa00',
                boxShadow: '0 0 6px #ffaa00',
                zIndex: 22,
              }}
              initial={{ x: -165, opacity: 0 }}
              animate={{ x: screenW + 235, y: [0, -4, 0, -4, 0], opacity: [0, 1, 1, 1, 0.8] }}
              transition={{ duration: 3.2, ease: 'linear', delay: 0.4 }}
            />

            {/* 3 tire track dots */}
            {tireTracks.map((tt) => (
              <motion.div
                key={`tire-${tt.id}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: `${tt.leftPct}%`,
                  bottom: 'calc(38% - 3px)',
                  width: '6px',
                  height: '6px',
                  background: 'rgba(0,255,255,0.8)',
                  boxShadow: '0 0 5px rgba(0,255,255,0.9)',
                  zIndex: 20,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.9, 0.9, 0], scale: [0, 1.2, 1, 0.8] }}
                transition={{ duration: 1.8, delay: tt.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Sonic boom ring 1 — magenta, delay 1.8s */}
            <motion.div
              key="sonic-boom"
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                bottom: '38%',
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                marginLeft: isMobile ? '-30px' : '-40px',
                marginBottom: isMobile ? '-30px' : '-40px',
                border: '2px solid rgba(255,0,255,0.9)',
                borderRadius: '50%',
                zIndex: 24,
              }}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.9, delay: 1.8, ease: 'easeOut' }}
            />

            {/* Sonic boom ring 2 — cyan, delay 2.0s */}
            <motion.div
              key="sonic-boom-2"
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                bottom: '38%',
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                marginLeft: isMobile ? '-30px' : '-40px',
                marginBottom: isMobile ? '-30px' : '-40px',
                border: '2px solid #00ffff',
                borderRadius: '50%',
                zIndex: 24,
              }}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.9, delay: 2.0, ease: 'easeOut' }}
            />

            {/* Car B */}
            <motion.div
              key="car-b"
              className="absolute pointer-events-none select-none"
              style={{
                bottom: '26%',
                fontSize: isMobile ? '20px' : '28px',
                zIndex: 19,
                lineHeight: 1,
              }}
              initial={{ x: -150 }}
              animate={{ x: screenW + 150 }}
              transition={{ duration: 4.5, ease: 'linear', delay: 0.8 }}
            >
              <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🚗</span>
            </motion.div>

            {/* Neon trace behind Car B */}
            <motion.div
              key="car-b-trace"
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(26% + 4px)',
                left: 0,
                height: '2px',
                width: '15%',
                background: 'linear-gradient(to right, transparent, rgba(255,0,255,0.4), transparent)',
                zIndex: 18,
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4.5, ease: 'linear', delay: 0.8 }}
            />

            {/* Car C */}
            <motion.div
              key="car-c"
              className="absolute pointer-events-none select-none"
              style={{
                bottom: '20%',
                fontSize: isMobile ? '20px' : '28px',
                zIndex: 17,
                lineHeight: 1,
              }}
              initial={{ x: -100 }}
              animate={{ x: screenW + 100 }}
              transition={{ duration: 5.5, ease: 'linear', delay: 1.4 }}
            >
              <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>🚕</span>
            </motion.div>

            {/* Neon trace behind Car C */}
            <motion.div
              key="car-c-trace"
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(20% + 4px)',
                left: 0,
                height: '2px',
                width: '15%',
                background: 'linear-gradient(to right, transparent, rgba(255,0,255,0.4), transparent)',
                zIndex: 16,
                transformOrigin: 'left center',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 5.5, ease: 'linear', delay: 1.4 }}
            />

            {/* 16 star streaks */}
            {starStreaks.map((streak) => (
              <motion.div
                key={`streak-${streak.id}`}
                className="absolute pointer-events-none"
                style={{
                  top: `${streak.top}%`,
                  left: 0,
                  height: '2px',
                  width: `${streak.width}%`,
                  background:
                    'linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)',
                  zIndex: 20,
                  transformOrigin: 'left center',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 1.8,
                  delay: streak.delay + 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          STAGE 4 — FRIENDS FOREVER (10–14s)
          Main text + glitch + track listing + TV border + BEST FRIENDS ribbon
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(stage === 'friends' || stage === 'radiance') && (
          <>
            {/* Retro TV border around friends section — primary cyan frame */}
            <motion.div
              key="tv-border"
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: isMobile ? '8%' : '6%',
                width: isMobile ? '92vw' : '70vw',
                maxWidth: '560px',
                transform: 'translateX(-50%)',
                zIndex: 29,
                border: '2px solid #ff00ff',
                borderRadius: '12px',
                boxShadow: '0 0 16px #ff00ff, inset 0 0 12px rgba(255,0,255,0.1)',
                padding: isMobile ? '12px 10px 16px' : '16px 20px 22px',
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Second magenta inset frame */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '2px',
                  border: '1px solid rgba(255,0,255,0.4)',
                  borderRadius: '6px',
                  pointerEvents: 'none',
                  zIndex: 30,
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Glitch copy 1 */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: isMobile ? '12px' : '16px',
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: 'clamp(20px, 6vw, 52px)',
                  color: 'rgba(255,30,30,0.55)',
                  letterSpacing: 'clamp(2px, 1vw, 6px)',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                  width: '92vw',
                  maxWidth: '92vw',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                }}
                animate={{ x: [-2, 2, -2], opacity: [0.6, 0, 0.6, 0, 0] }}
                transition={{ duration: 0.18, repeat: 3, repeatDelay: 1.1 }}
              >
                FRIENDS FOREVER
              </motion.div>
              {/* Glitch copy 2 */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: isMobile ? '12px' : '16px',
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: 'clamp(20px, 6vw, 52px)',
                  color: 'rgba(0,255,255,0.45)',
                  letterSpacing: 'clamp(2px, 1vw, 6px)',
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                  width: '92vw',
                  maxWidth: '92vw',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                }}
                animate={{ x: [2, -2, 2], opacity: [0, 0.55, 0, 0.55, 0] }}
                transition={{ duration: 0.18, repeat: 3, repeatDelay: 1.1, delay: 0.09 }}
              >
                FRIENDS FOREVER
              </motion.div>

              {/* Main title */}
              <div
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  width: '92vw',
                  maxWidth: '92vw',
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    fontFamily: 'Impact, "Arial Narrow", sans-serif',
                    fontSize: 'clamp(20px, 6vw, 52px)',
                    color: '#ff00ff',
                    textShadow: '0 0 18px #ff00ff, 0 0 36px #ff00ff, 3px 3px 0 #00ffff',
                    letterSpacing: 'clamp(2px, 1vw, 6px)',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                  animate={{
                    textShadow: [
                      '0 0 18px #ff00ff, 0 0 36px #ff00ff, 3px 3px 0 #00ffff',
                      '0 0 32px #ff00ff, 0 0 60px #ff00ff, 3px 3px 0 #00ffff',
                      '0 0 18px #ff00ff, 0 0 36px #ff00ff, 3px 3px 0 #00ffff',
                    ],
                  }}
                  transition={{ duration: 1.2, repeat: 2 }}
                >
                  FRIENDS FOREVER
                </motion.div>

                {/* SINCE DAY ONE subtitle — neon yellow monospace */}
                <motion.p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(9px, 2vw, 14px)',
                    color: '#ffff00',
                    textShadow: '0 0 8px #ffff00',
                    letterSpacing: '0.2em',
                    marginTop: '4px',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  SINCE DAY ONE
                </motion.p>

                {/* Mixtape track listing — distinct neon colors per line */}
                <div
                  style={{
                    maxWidth: '80vw',
                    overflow: 'hidden',
                    margin: '0 auto',
                  }}
                >
                  {[
                    { label: '01. THE NIGHT WE MET', color: '#ff00ff', delay: 0.6 },
                    { label: '02. NEON BOULEVARD',   color: '#00ffff', delay: 0.9 },
                    { label: '03. FOREVER ELECTRIC', color: '#ffff00', delay: 1.2 },
                  ].map((track) => (
                    <motion.p
                      key={track.label}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 'clamp(8px, 1.6vw, 11px)',
                        color: track.color,
                        textShadow: `0 0 6px ${track.color}`,
                        letterSpacing: '1px',
                        marginTop: '4px',
                        textAlign: 'left',
                        paddingLeft: isMobile ? '4px' : '8px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: track.delay }}
                    >
                      {track.label}
                    </motion.p>
                  ))}
                </div>

                {/* ★ BEST FRIENDS ★ ribbon */}
                <motion.p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(9px, 1.8vw, 13px)',
                    color: '#ff2d9b',
                    textShadow: '0 0 10px #ff2d9b',
                    letterSpacing: '2px',
                    marginTop: '8px',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  ★ BEST FRIENDS ★
                </motion.p>
              </div>
            </motion.div>

            {/* 6 neon confetti squares */}
            {confettiSquares.map((sq) => (
              <motion.div
                key={`confetti-${sq.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${sq.left}%`,
                  top: `${sq.top}%`,
                  width: `${sq.size}px`,
                  height: `${sq.size}px`,
                  background: sq.color,
                  boxShadow: `0 0 8px ${sq.color}`,
                  transform: `rotate(${sq.rotate}deg)`,
                  zIndex: 28,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.85 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: sq.delay }}
              />
            ))}

            {/* Extra neon signs: VIBES + FOREVER */}
            <motion.div
              key="sign-vibes"
              className="absolute pointer-events-none"
              style={{
                left: isMobile ? '8%' : '15%',
                top: '35%',
                zIndex: 26,
                maxWidth: 'calc(100vw - 20px)',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <span
                style={{
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: isMobile ? '16px' : '22px',
                  color: '#ff00aa',
                  textShadow: '0 0 12px #ff00aa, 0 0 24px #ff00aa',
                  letterSpacing: '3px',
                  transform: 'rotate(-6deg)',
                  display: 'inline-block',
                }}
              >
                VIBES
              </span>
            </motion.div>
            <motion.div
              key="sign-forever2"
              className="absolute pointer-events-none"
              style={{
                right: isMobile ? '8%' : '15%',
                top: '38%',
                zIndex: 26,
                maxWidth: 'calc(100vw - 20px)',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <span
                style={{
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: isMobile ? '16px' : '22px',
                  color: '#00ffcc',
                  textShadow: '0 0 12px #00ffcc, 0 0 24px #00ffcc',
                  letterSpacing: '3px',
                  transform: 'rotate(5deg)',
                  display: 'inline-block',
                }}
              >
                FOREVER
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          STAGE 5 — RADIANCE (14–17s): 5 spotlights + stage floor + 10 columns + capsule title
          ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 5 concert spotlight beams */}
            {spotlights.map((sp) => (
              <motion.div
                key={`spotlight-${sp.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: sp.left,
                  bottom: '45%',
                  width: isMobile ? '50px' : '70px',
                  height: isMobile ? '220px' : '320px',
                  background: `linear-gradient(to top, ${sp.color}, transparent)`,
                  filter: 'blur(12px)',
                  transform: `translateX(-50%) rotate(${sp.angle}deg)`,
                  transformOrigin: 'bottom center',
                  zIndex: 7,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 1, delay: sp.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Stage floor glow */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(255,0,255,0.3), transparent)',
                filter: 'blur(20px)',
                zIndex: 7,
                pointerEvents: 'none',
              }}
            />

            {/* Outer ambient glow */}
            <motion.div
              key="radiance-glow"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ zIndex: 8 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.8, opacity: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: isMobile ? '280px' : '420px',
                  height: isMobile ? '280px' : '420px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,0,255,0.35) 0%, rgba(0,255,255,0.2) 40%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
            </motion.div>

            {/* Inner core burst */}
            <motion.div
              key="radiance-core"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ zIndex: 9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.7 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            >
              <div
                style={{
                  width: isMobile ? '80px' : '120px',
                  height: isMobile ? '80px' : '120px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,220,255,0.5) 50%, transparent 80%)',
                  filter: 'blur(20px)',
                }}
              />
            </motion.div>

            {/* 10 light columns */}
            {lightColumns.map((col) => (
              <motion.div
                key={`col-${col.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${col.left}%`,
                  bottom: '45%',
                  width: '3px',
                  height: isMobile ? '120px' : '180px',
                  background: `linear-gradient(to top, ${col.color}, transparent)`,
                  boxShadow: `0 0 6px ${col.color}`,
                  zIndex: 10,
                  transformOrigin: 'bottom center',
                  transform: 'translateX(-50%)',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 0.9, 0.7] }}
                transition={{ duration: 1.2, delay: col.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Capsule title with CSS neon-pulse */}
            <motion.div
              key="capsule-title"
              className="absolute bottom-16 left-0 right-0 text-center z-40 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h2
                style={{
                  fontFamily: 'Impact, "Arial Narrow", sans-serif',
                  fontSize: 'clamp(24px, 7vw, 52px)',
                  color: '#ff00ff',
                  letterSpacing: 'clamp(2px, 1vw, 6px)',
                  marginBottom: '8px',
                  animation: 'neon-pulse 3s ease-in-out infinite',
                }}
              >
                NEVER ENDING
              </h2>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(14px, 3.5vw, 22px)',
                  color: '#00ffff',
                  textShadow: '0 0 12px rgba(0,255,255,0.9)',
                  letterSpacing: '2px',
                }}
              >
                {capsuleTitle}
              </p>
              {/* YOUR MIXTAPE IS FOREVER */}
              <motion.p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(9px, 1.8vw, 12px)',
                  color: '#00ffff',
                  textShadow: '0 0 8px #00ffff, 0 0 18px rgba(0,255,255,0.5)',
                  letterSpacing: '2px',
                  marginTop: '6px',
                  fontStyle: 'italic',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                YOUR MIXTAPE IS FOREVER
              </motion.p>
              {/* YOUR FRIENDSHIP, FOREVER ELECTRIC */}
              <motion.p
                style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(9px, 1.8vw, 11px)',
                  color: 'rgba(255,255,255,0.55)',
                  textShadow: '0 0 6px rgba(255,255,255,0.4)',
                  letterSpacing: '2px',
                  marginTop: '4px',
                  fontStyle: 'italic',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                YOUR FRIENDSHIP, FOREVER ELECTRIC
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
