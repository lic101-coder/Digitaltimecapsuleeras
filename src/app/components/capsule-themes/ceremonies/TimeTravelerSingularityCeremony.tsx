/**
 * Time Traveler — HEX GRID PULSE
 * Stargate-style portal activation ceremony. Cinematic, sequential, building
 * tension then explosive release. Dark electric blue/purple/cyan palette.
 *
 * Stage timing:
 *   init     0–3s    SYSTEM BOOT
 *   chevron  3–11s   LOCKING SEQUENCE
 *   surge    11–14s  POWER BUILD-UP
 *   kawoosh  14–18s  PORTAL EXPLOSION
 *   journey  18–21s  THROUGH THE PORTAL
 *   outro    21–22s  FADE
 */

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface TimeTravelerSingularityCeremonyProps {
  capsuleTitle: string
  media?: any[]
  isPreview?: boolean
  onComplete?: () => void
}

type Stage =
  | 'init'
  | 'chevron'
  | 'surge'
  | 'kawoosh'
  | 'journey'
  | 'outro'

export function TimeTravelerSingularityCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: TimeTravelerSingularityCeremonyProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const [stage, setStage] = useState<Stage>('init')
  const [lockedCount, setLockedCount] = useState(0)
  const [chevronLabel, setChevronLabel] = useState('')
  const [showAllLockedBanner, setShowAllLockedBanner] = useState(false)
  const [titleChars, setTitleChars] = useState<boolean[]>([])
  const [titleFullyDecoded, setTitleFullyDecoded] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [systemOnline, setSystemOnline] = useState(false)
  const [showScanline, setShowScanline] = useState(false)
  const [powerLevel, setPowerLevel] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  const [midRingPulse, setMidRingPulse] = useState(false)
  const [finalRingPulse, setFinalRingPulse] = useState(false)

  // ── Static geometry — useMemo with Math.random() ──────────────────────────

  const hexPositions = useMemo(() => {
    const radius = isMobile ? 110 : 150
    const positions: { x: number; y: number }[] = []
    positions.push({ x: 0, y: 0 }) // center
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
      positions.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius })
    }
    return positions
  }, [])

  const connectionLines = useMemo(() => {
    return hexPositions.slice(1).map((pos, i) => {
      const next = hexPositions[i === 7 ? 1 : i + 2]
      return { x1: pos.x, y1: pos.y, x2: next.x, y2: next.y }
    })
  }, [hexPositions])

  const stars = useMemo(() => {
    const count = isMobile ? 60 : 80
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 0.8 + Math.random() * 1.7,
      opacity: 0.2 + Math.random() * 0.4,
      dur: 4 + Math.random() * 4,
      delay: Math.random() * 5,
    }))
  }, [])

  const arcAngles = useMemo(() => [45, 135, 225, 315], [])

  const beamAngles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => (i / 8) * 360), [])

  // Varied ring configs: [delay, borderStyle, expandScale, duration]
  const kawooshRings = useMemo(() => [
    { delay: 0,    border: '3px solid #00e5ff', scale: 4,   duration: 1.2 },
    { delay: 0.25, border: '2px solid #7c3aed', scale: 5,   duration: 1.5 },
    { delay: 0.5,  border: '3px solid #ffffff', scale: 3.5, duration: 1.0 },
    { delay: 0.75, border: '2px solid #00e5ff', scale: 6,   duration: 1.8 },
    { delay: 1.0,  border: '1px solid rgba(0,229,255,0.5)', scale: 7, duration: 2.2 },
  ], [])

  // Varied beam configs: [widthPct, color]
  const beamConfigs = useMemo(() => [
    { width: 440, color: '#00e5ff', glow: 'rgba(0,229,255,0.7)' },   // 0 even cyan
    { width: 350, color: '#7c3aed', glow: 'rgba(124,58,237,0.7)' },  // 1 odd purple
    { width: 490, color: '#00e5ff', glow: 'rgba(0,229,255,0.7)' },   // 2 even cyan
    { width: 380, color: '#7c3aed', glow: 'rgba(124,58,237,0.7)' },  // 3 odd purple
    { width: 440, color: '#00e5ff', glow: 'rgba(0,229,255,0.7)' },   // 4 even cyan
    { width: 350, color: '#7c3aed', glow: 'rgba(124,58,237,0.7)' },  // 5 odd purple
    { width: 490, color: '#00e5ff', glow: 'rgba(0,229,255,0.7)' },   // 6 even cyan
    { width: 380, color: '#7c3aed', glow: 'rgba(124,58,237,0.7)' },  // 7 odd purple
  ], [])

  const tunnelCircles = useMemo(() =>
    [200, 160, 120, 85, 50, 20].map((r, i) => ({
      r,
      opacity: 0.12 + i * 0.14,
    })), [])

  const lightStreaks = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      angle: (i / 16) * 360,
      length: 200 + Math.random() * 180,
      delay: i * 0.055,
      opacity: 0.4 + Math.random() * 0.5,
    })), [])

  const orbitDots = useMemo(() => {
    const r = 70
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        size: 3 + Math.random() * 3,
        delay: i * 0.15,
      }
    })
  }, [])

  // ── Timeline ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []

    // Stage transitions
    t.push(setTimeout(() => setStage('chevron'), 3000))
    t.push(setTimeout(() => setStage('surge'), 11000))
    t.push(setTimeout(() => setStage('kawoosh'), 14000))
    t.push(setTimeout(() => setStage('journey'), 18000))
    t.push(setTimeout(() => setStage('outro'), 21000))

    // Kawoosh full-screen flash
    t.push(setTimeout(() => { setShowFlash(true); setTimeout(() => setShowFlash(false), 500) }, 14050))

    // Failsafe at 23s
    t.push(setTimeout(() => onComplete?.(), 23000))

    return () => t.forEach(clearTimeout)
  }, [])

  // ── Init stage ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (stage !== 'init') return
    const timers: ReturnType<typeof setTimeout>[] = []

    // Scanline sweep after short pause
    timers.push(setTimeout(() => setShowScanline(true), 200))
    timers.push(setTimeout(() => setShowScanline(false), 2200))

    // Title decode
    const chars = capsuleTitle.split('')
    setTitleChars(Array(chars.length).fill(false))
    setTitleFullyDecoded(false)
    chars.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setTitleChars(prev => { const n = [...prev]; n[i] = true; return n })
      }, 400 + i * 45))
    })
    const decodeEnd = 400 + chars.length * 45 + 200
    timers.push(setTimeout(() => {
      setSubtitleVisible(true)
      setTitleFullyDecoded(true)
    }, decodeEnd))
    timers.push(setTimeout(() => setSystemOnline(true), 1800))

    return () => timers.forEach(clearTimeout)
  }, [stage, capsuleTitle])

  // ── Chevron lock sequence ─────────────────────────────────────────────────

  useEffect(() => {
    if (stage !== 'chevron') return
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < 9; i++) {
      timers.push(setTimeout(() => {
        setLockedCount(i + 1)
        if (i < 8) {
          setChevronLabel(`CHEVRON ${i + 1} LOCKED`)
        }
        if (i === 3) setMidRingPulse(true)
        if (i === 8) {
          setFinalRingPulse(true)
          setShowAllLockedBanner(true)
          setTimeout(() => setShowAllLockedBanner(false), 1800)
        }
      }, i * 800))
    }
    return () => timers.forEach(clearTimeout)
  }, [stage])

  // ── Surge power counter ───────────────────────────────────────────────────

  useEffect(() => {
    if (stage !== 'surge') return
    setPowerLevel(0)
    const interval = setInterval(() => {
      setPowerLevel(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 1
      })
    }, 28)
    return () => clearInterval(interval)
  }, [stage])

  // ── onComplete after outro ────────────────────────────────────────────────

  useEffect(() => {
    if (stage === 'outro') {
      const t = setTimeout(() => onComplete?.(), 1200)
      return () => clearTimeout(t)
    }
  }, [stage])

  const isOutro = stage === 'outro'

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: '#020817', fontFamily: 'monospace' }}
      animate={{ opacity: isOutro ? 0 : 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* ── CSS for blink/orbit/portal-spin/cursor/power-pulse ── */}
      <style>{`
        @keyframes surge-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes hex-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes portal-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes power-pulse {
          0%   { box-shadow: 0 0 24px rgba(124,58,237,0.7), inset 0 0 24px rgba(124,58,237,0.15); }
          50%  { box-shadow: 0 0 48px rgba(124,58,237,1.0), inset 0 0 40px rgba(124,58,237,0.35), 0 0 80px rgba(124,58,237,0.4); }
          100% { box-shadow: 0 0 24px rgba(124,58,237,0.7), inset 0 0 24px rgba(124,58,237,0.15); }
        }
        .surge-blink  { animation: surge-blink 0.45s step-end infinite; }
        .hex-orbit    { animation: hex-orbit 3.5s linear infinite; }
        .power-ring   { animation: power-pulse 1.8s ease-in-out infinite; }
        .cursor-blink { animation: cursor-blink 0.7s step-end infinite; }
      `}</style>

      {/* ════════════════════ AMBIENT BG GLOW (repeat:Infinity 5s) ════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,229,255,0.05) 0%, rgba(124,58,237,0.04) 55%, transparent 100%)',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ════════════════════ STAR FIELD ════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: stage === 'journey' ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {stars.map(s => (
          <motion.div
            key={`star-${s.id}`}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              background: `rgba(200,230,255,${s.opacity})`,
            }}
            animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* ════════════════════ STAGE 1: INIT ═════════════════════════════════ */}

      {/* Scanline sweep — single play */}
      <AnimatePresence>
        {showScanline && (
          <motion.div
            className="absolute left-0 right-0 pointer-events-none z-40"
            style={{ height: 2, background: 'rgba(255,255,255,0.75)', boxShadow: '0 0 12px rgba(255,255,255,0.9)' }}
            initial={{ top: '-4px', opacity: 0.7 }}
            animate={{ top: '100%', opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      {/* Title decode + subtitle */}
      <AnimatePresence>
        {(stage === 'init' || stage === 'chevron') && (
          <motion.div
            className="absolute top-8 sm:top-12 left-0 right-0 text-center z-20 px-4"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#00e5ff] mb-2"
              style={{ textShadow: '0 0 24px rgba(0,229,255,0.85), 0 0 4px rgba(0,229,255,0.5)' }}
            >
              {capsuleTitle.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: titleChars[i] ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
              {/* Blinking cursor after title fully decoded — pure CSS */}
              {titleFullyDecoded && (
                <span
                  className="cursor-blink"
                  style={{ marginLeft: 2, display: 'inline-block', color: '#00e5ff' }}
                >
                  |
                </span>
              )}
            </h1>
            <AnimatePresence>
              {subtitleVisible && (
                <motion.p
                  className="text-xs sm:text-sm tracking-[0.22em] text-[#7c3aed]"
                  style={{ textShadow: '0 0 12px rgba(124,58,237,0.8)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  PORTAL ACTIVATION SEQUENCE INITIATED
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM ONLINE label */}
      <AnimatePresence>
        {stage === 'init' && systemOnline && (
          <motion.div
            className="absolute bottom-8 left-0 right-0 text-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-xs tracking-[0.3em] text-[#00e5ff]"
              style={{ textShadow: '0 0 10px rgba(0,229,255,0.7)' }}
            >
              ▶ SYSTEM ONLINE
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════ CENTRAL HEX GRID ══════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 0, height: 0 }}>

          {/* Electric-blue ambient bg chevron pulse (repeat:Infinity 5s) */}
          {(stage === 'chevron' || stage === 'surge') && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                left: -(isMobile ? 160 : 220),
                top: -(isMobile ? 160 : 220),
                width: (isMobile ? 320 : 440),
                height: (isMobile ? 320 : 440),
                background: 'radial-gradient(circle, rgba(0,100,255,0.08) 0%, transparent 70%)',
              }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* SVG connection lines */}
          <svg
            className="absolute pointer-events-none"
            style={{ left: -300, top: -300, width: 600, height: 600 }}
          >
            {connectionLines.map((line, i) => {
              const show = (stage === 'chevron' || stage === 'surge') && lockedCount > i + 1
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={line.x1 + 300} y1={line.y1 + 300}
                  x2={line.x2 + 300} y2={line.y2 + 300}
                  stroke="#00e5ff"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={show ? { pathLength: 1, opacity: 0.65 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              )
            })}
          </svg>

          {/* 9 hexagons */}
          {hexPositions.map((pos, idx) => {
            const isLocked = lockedCount > idx
            const isCenter = idx === 0
            const visible = stage === 'init' || stage === 'chevron' || stage === 'surge'
            const lockedColor = '#fbbf24'
            const idleColor = '#00e5ff'
            const fill = isLocked ? 'rgba(251,191,36,0.12)' : 'rgba(0,229,255,0.03)'
            const stroke = isLocked ? lockedColor : idleColor
            const glow = isLocked
              ? (isCenter && stage === 'surge'
                  ? 'drop-shadow(0 0 22px #ffffff) drop-shadow(0 0 8px #00e5ff)'
                  : `drop-shadow(0 0 10px ${lockedColor})`)
              : 'none'

            return (
              <motion.div
                key={`hex-${idx}`}
                className="absolute"
                style={{ left: pos.x - 28, top: pos.y - 32, width: 56, height: 64 }}
                animate={
                  !visible
                    ? { opacity: 0, scale: 0.85 }
                    : isLocked
                    ? { opacity: 1, scale: 1, filter: glow }
                    : { opacity: 0.15, scale: 1, filter: 'none' }
                }
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Surge simultaneous pulse (bounded repeat: 2) */}
                {stage === 'surge' && isLocked && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 0.7, ease: 'easeInOut', repeat: 2 }}
                  >
                    <svg viewBox="0 0 56 64" className="w-full h-full">
                      <polygon
                        points="28,2 54,16 54,48 28,62 2,48 2,16"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2"
                      />
                      {isCenter && (
                        <polygon
                          points="28,2 54,16 54,48 28,62 2,48 2,16"
                          fill="rgba(255,255,255,0.28)"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                      )}
                    </svg>
                  </motion.div>
                )}

                {/* Normal SVG (non-surge) */}
                {stage !== 'surge' && (
                  <svg viewBox="0 0 56 64" className="w-full h-full">
                    <polygon
                      points="28,2 54,16 54,48 28,62 2,48 2,16"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={isLocked ? '2' : '1'}
                      strokeOpacity={isLocked ? '1' : '0.35'}
                    />
                  </svg>
                )}

                {/* Lock flash (single play) */}
                <AnimatePresence>
                  {isLocked && stage === 'chevron' && (
                    <motion.div
                      key={`flash-${idx}-${lockedCount}`}
                      className="absolute inset-0 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.55)' }}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{ duration: 0.32, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Mid-ring pulse (after lock 4) */}
          <AnimatePresence>
            {midRingPulse && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: -50, top: -50, width: 100, height: 100,
                  border: '2px solid #00e5ff',
                  boxShadow: '0 0 14px rgba(0,229,255,0.7)',
                }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onAnimationComplete={() => setMidRingPulse(false)}
              />
            )}
          </AnimatePresence>

          {/* Final ring pulse (after all 9 locked) */}
          <AnimatePresence>
            {finalRingPulse && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: -80, top: -80, width: 160, height: 160,
                  border: '3px solid #fbbf24',
                  boxShadow: '0 0 30px rgba(251,191,36,0.9)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onAnimationComplete={() => setFinalRingPulse(false)}
              />
            )}
          </AnimatePresence>

          {/* ── SURGE: power ring — CSS breathing glow ── */}
          <AnimatePresence>
            {stage === 'surge' && (
              <motion.div
                className="absolute rounded-full pointer-events-none power-ring"
                style={{
                  left: -(isMobile ? 160 : 200),
                  top: -(isMobile ? 160 : 200),
                  width: isMobile ? 320 : 400,
                  height: isMobile ? 320 : 400,
                  border: '2px solid #7c3aed',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* ── SURGE: electric arcs ── */}
          <AnimatePresence>
            {stage === 'surge' &&
              arcAngles.map((angle, i) => (
                <motion.div
                  key={`arc-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: -(isMobile ? 140 : 180),
                    top: -1,
                    width: isMobile ? 280 : 360,
                    height: 2,
                    background: 'linear-gradient(to right, transparent 5%, #00e5ff 50%, transparent 95%)',
                    transformOrigin: 'center',
                    transform: `rotate(${angle}deg)`,
                    boxShadow: '0 0 8px rgba(0,229,255,0.85)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.9, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeInOut', times: [0, 0.2, 0.75, 1] }}
                />
              ))}
          </AnimatePresence>

          {/* ── SURGE: 6 orbit dots (CSS animation at 3.5s — repeat:Infinity ok) ── */}
          <AnimatePresence>
            {stage === 'surge' && (
              <div className="absolute hex-orbit" style={{ width: 0, height: 0 }}>
                {orbitDots.map((dot, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: dot.x - dot.size / 2,
                      top: dot.y - dot.size / 2,
                      width: dot.size,
                      height: dot.size,
                      background: '#00e5ff',
                      boxShadow: '0 0 6px rgba(0,229,255,0.9)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: dot.delay }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* ── KAWOOSH: portal iris open effect ── */}
          <AnimatePresence>
            {stage === 'kawoosh' && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: -150, top: -150, width: 300, height: 300,
                  background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.95) 41%)',
                  zIndex: 1,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {/* ── KAWOOSH: 5 concentric expanding rings (varied) ── */}
          <AnimatePresence>
            {stage === 'kawoosh' &&
              kawooshRings.map((ring, i) => (
                <motion.div
                  key={`kring-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: -80, top: -80, width: 160, height: 160,
                    border: ring.border,
                    boxShadow: '0 0 20px rgba(0,229,255,0.85), inset 0 0 8px rgba(0,229,255,0.2)',
                  }}
                  initial={{ scale: 0.1, opacity: 1 }}
                  animate={{ scale: ring.scale, opacity: 0 }}
                  transition={{ duration: ring.duration, delay: ring.delay, ease: 'easeOut' }}
                />
              ))}
          </AnimatePresence>

          {/* ── KAWOOSH: 8 energy beams (alternating cyan/purple, varied widths) ── */}
          <AnimatePresence>
            {stage === 'kawoosh' &&
              beamAngles.map((angle, i) => {
                const cfg = beamConfigs[i]
                return (
                  <motion.div
                    key={`beam-${i}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: -(cfg.width / 2), top: -1, width: cfg.width, height: 2,
                      background: `linear-gradient(to right, transparent 5%, ${cfg.color} 50%, transparent 95%)`,
                      transformOrigin: 'center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(0.5px)',
                      boxShadow: `0 0 6px ${cfg.glow}`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.8, 0] }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut', times: [0, 0.25, 0.7, 1] }}
                  />
                )
              })}
          </AnimatePresence>

          {/* ── KAWOOSH: vortex — outer spinning ring (CSS, GPU-smooth) ── */}
          <AnimatePresence>
            {stage === 'kawoosh' && (
              <>
                {/* Outer conic ring */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: -120, top: -120, width: 240, height: 240,
                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,229,255,0.5) 30%, rgba(124,58,237,0.4) 60%, transparent 100%)',
                    animation: 'portal-spin 2s linear forwards',
                    animationIterationCount: 2,
                    boxShadow: '0 0 40px rgba(0,229,255,0.5)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0.95], opacity: [0, 0.9, 0.7] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', times: [0, 0.5, 1] }}
                />

                {/* Inner counter-rotating conic ring */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: -70, top: -70, width: 140, height: 140,
                    background: 'conic-gradient(from 180deg, transparent, rgba(255,255,255,0.8), transparent)',
                    animation: 'portal-spin 1.2s linear reverse',
                    animationIterationCount: 'infinite',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.85 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />

                {/* Center bright dot */}
                <motion.div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: -10, top: -10, width: 20, height: 20,
                    background: '#ffffff',
                    boxShadow: '0 0 30px 10px rgba(0,229,255,0.8)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── JOURNEY: tunnel circles with opacity pulse ── */}
          <AnimatePresence>
            {stage === 'journey' &&
              tunnelCircles.map((c, i) => (
                <motion.div
                  key={`tunnel-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: -c.r, top: -c.r, width: c.r * 2, height: c.r * 2,
                    border: `1px solid rgba(0,229,255,${c.opacity})`,
                    boxShadow: `0 0 ${6 + i * 2}px rgba(0,229,255,${c.opacity * 0.5})`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, c.opacity, c.opacity * 0.45, c.opacity, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3.5, delay: i * 0.08, ease: 'easeInOut', times: [0, 0.15, 0.5, 0.85, 1], repeat: Infinity }}
                />
              ))}
          </AnimatePresence>

          {/* ── JOURNEY: 16 light streaks ── */}
          <AnimatePresence>
            {stage === 'journey' &&
              lightStreaks.map((streak, i) => (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: 0, top: -0.5, width: streak.length, height: 1,
                    background: `linear-gradient(to right, rgba(0,229,255,${streak.opacity}), transparent)`,
                    transformOrigin: 'left center',
                    transform: `rotate(${streak.angle}deg)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0], opacity: [0, streak.opacity, streak.opacity * 0.8, 0] }}
                  transition={{ duration: 1.8, delay: streak.delay, ease: 'easeOut', times: [0, 0.3, 0.7, 1] }}
                />
              ))}
          </AnimatePresence>

          {/* ── JOURNEY: ambient purple glow (repeat:Infinity 4s — ambient) ── */}
          <AnimatePresence>
            {stage === 'journey' && (
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: -250, top: -120, width: 500, height: 240,
                  background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.5, 0.8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ════════════════════ CHEVRON STATUS TEXT ════════════════════════════ */}
      <AnimatePresence mode="wait">
        {stage === 'chevron' && !showAllLockedBanner && chevronLabel && (
          <motion.div
            key={chevronLabel}
            className="absolute bottom-16 left-0 right-0 text-center z-20"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <span
              className="text-sm tracking-[0.25em]"
              style={{ color: '#fbbf24', textShadow: '0 0 14px rgba(251,191,36,0.9)' }}
            >
              ◆ {chevronLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALL 9 CHEVRONS LOCKED banner — dramatic gold glow + scale ease */}
      <AnimatePresence>
        {showAllLockedBanner && (
          <motion.div
            className="absolute bottom-12 left-0 right-0 text-center z-30 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [0.9, 1.05, 1.0] }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.45, ease: 'easeInOut', times: [0, 0.55, 1] }}
          >
            <span
              className="text-base sm:text-lg tracking-[0.2em] font-bold inline-block px-4 py-2"
              style={{
                color: '#fbbf24',
                textShadow: '0 0 20px rgba(251,191,36,1), 0 0 4px rgba(255,255,255,0.8)',
                border: '1px solid #fbbf24',
                boxShadow: '0 0 20px rgba(251,191,36,0.6)',
              }}
            >
              ✦ ALL 9 CHEVRONS LOCKED ✦
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════ SURGE HUD ══════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'surge' && (
          <motion.div
            className="absolute bottom-10 left-0 right-0 text-center z-20 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="text-sm tracking-[0.2em]"
              style={{ color: '#00e5ff', textShadow: '0 0 12px rgba(0,229,255,0.85)' }}
            >
              POWER: {String(powerLevel).padStart(3, '0')}%
            </div>
            <div
              className="surge-blink text-xs tracking-[0.3em]"
              style={{ color: '#ff4444', textShadow: '0 0 10px rgba(255,68,68,0.9)' }}
            >
              ⚠ KAWOOSH IMMINENT ⚠
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════ KAWOOSH: full-screen flash ═════════════════════ */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: 'rgba(180,240,255,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, ease: 'easeInOut', times: [0, 0.25, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════ PORTAL OPEN text (kawoosh) ═════════════════════ */}
      <AnimatePresence>
        {stage === 'kawoosh' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.15, 0.3, 0.75, 1], ease: 'easeInOut' }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.15em] text-white"
              style={{
                textShadow: '0 0 40px #00e5ff, 0 0 80px rgba(0,229,255,0.4), 0 0 8px #ffffff',
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1.0] }}
              transition={{ duration: 1.2, ease: 'easeInOut', times: [0, 0.4, 1] }}
            >
              PORTAL OPEN
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════ JOURNEY: capsule title + tagline ═══════════════ */}
      <AnimatePresence>
        {stage === 'journey' && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider"
              style={{ color: '#00e5ff', textShadow: '0 0 28px rgba(0,229,255,0.8), 0 0 6px rgba(0,229,255,0.4)' }}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {capsuleTitle}
            </motion.h2>
            <motion.p
              className="text-xs sm:text-sm tracking-[0.2em] text-[#7c3aed]"
              style={{ textShadow: '0 0 12px rgba(124,58,237,0.7)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              YOUR MEMORIES — PRESERVED ACROSS TIME
            </motion.p>
            <motion.span
              className="text-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.7 }}
            >
              ⏳
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
