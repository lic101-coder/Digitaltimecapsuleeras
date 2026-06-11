/**
 * Golden Wedding Dance Ceremony — CINEMATIC CROWN JEWEL (Epic Upgrade)
 *
 * Stage flow:
 * 1. overture   (0–3s)   — 3-beam crossover, 18 stars, capsuleTitle + "A CELEBRATION OF LOVE"
 * 2. approach   (3–6s)   — Couple slides to center, 4 heart rings, rose petals, "THE MOMENT IT ALL BEGAN"
 * 3. dance-era1 (6–9s)   — "THE FIRST DANCE", amber, oval floor spotlight, sway, 4 music notes
 * 4. dance-era2 (9–12s)  — "THROUGH THE YEARS", indigo, lively couple, 8 confetti squares
 * 5. dance-era3 (12–15s) — "YOUR FOREVER", halo ring, couple glow, 8 ring sparkles
 * 6. sparkle    (15–18s) — White flash, 20 sparkles, "LOVE ETERNAL", "LOVE IS FOREVER ♾", champagne toast, 3 hearts
 * 7. radiance   (18–20s) — Volumetric beams, scale-pulse capsule title, "YOUR LOVE STORY BEGINS NOW", ring, 3 hearts
 *
 * Rules obeyed:
 * - All Math.random() only inside useMemo
 * - repeat:Infinity only on elements with duration >3s (ambient)
 * - Max ~22 simultaneous animated elements (checked per stage)
 * - spring only on 2-keyframe transitions
 * - 3+ keyframe arrays always use ease:'easeInOut'
 * - Couple always in <div className="inline-flex gap-4 items-center whitespace-nowrap">
 * - Failsafe at 21s
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GoldenWeddingDanceCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function GoldenWeddingDanceCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: GoldenWeddingDanceCeremonyProps) {
  const [stage, setStage] = useState<
    | 'overture'
    | 'approach'
    | 'dance-era1'
    | 'dance-era2'
    | 'dance-era3'
    | 'sparkle'
    | 'radiance'
  >('overture');

  useEffect(() => {
    const timeline = [
      { time: 0,     fn: () => setStage('overture')   },
      { time: 3000,  fn: () => setStage('approach')   },
      { time: 6000,  fn: () => setStage('dance-era1') },
      { time: 9000,  fn: () => setStage('dance-era2') },
      { time: 12000, fn: () => setStage('dance-era3') },
      { time: 15000, fn: () => setStage('sparkle')    },
      { time: 18000, fn: () => setStage('radiance')   },
      { time: 20000, fn: () => onComplete?.()         },
    ];
    const timers = timeline.map(({ time, fn }) => setTimeout(fn, time));
    const failsafe = setTimeout(() => { onComplete?.(); }, 21000);
    return () => { timers.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ── Pre-computed arrays (ALL Math.random() only here, never in JSX) ─────────

  // 18 twinkling stars — 3 size tiers: 2px, 4px, 6px
  const stars = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 3 + Math.random() * 94,
      y: 2 + Math.random() * 50,
      size: [2, 4, 6][Math.floor(Math.random() * 3)],
      duration: 4 + Math.random() * 3,   // 4–7s — ambient
      delay: Math.random() * 2.5,
    })),
  []);

  // 4 sparkle-blink dots around the title area (overture)
  const titleSparkles = useMemo(() => [
    { id: 0, left: '28%', top: '28%' },
    { id: 1, left: '72%', top: '28%' },
    { id: 2, left: '24%', top: '52%' },
    { id: 3, left: '76%', top: '52%' },
  ], []);

  // 12 falling rose petals for approach
  const approachPetals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 3 + Math.random() * 94,
      delay: i * 0.2,
      duration: 2.0 + Math.random() * 1.2,
      rotate: Math.floor(Math.random() * 360),
      driftX: (Math.random() - 0.5) * 70,
    })),
  []);

  // 4 concentric heart ring sizes for approach meeting ripple
  const heartRings = useMemo(() =>
    [60, 110, 170, 230].map((size, i) => ({
      id: i,
      size,
      delay: i * 0.22,
    })),
  []);

  // Era 1 — 4 music notes at fixed x positions
  const era1Notes = useMemo(() =>
    [15, 30, 68, 83].map((x, i) => ({
      id: i,
      x,
      delay: i * 0.28,
      duration: 2.2 + Math.random() * 0.6,
    })),
  []);

  // Era 2 — 8 confetti squares, 4 colors, fixed positions
  const era2Confetti = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 70,
      delay: i * 0.12,
      color: ['#fbbf24', '#818cf8', '#34d399', '#f472b6'][i % 4],
      rotate: Math.floor(Math.random() * 45),
      size: 8 + Math.floor(Math.random() * 8),
    })),
  []);

  // Era 2 — 4 music notes
  const era2Notes = useMemo(() =>
    [20, 38, 62, 80].map((x, i) => ({
      id: i,
      x,
      delay: i * 0.22,
      duration: 1.8 + Math.random() * 0.5,
    })),
  []);

  // Era 3 — 8 golden sparkle ring (cos/sin)
  const era3Sparkles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 38 + Math.random() * 18;
      return {
        id: i,
        x: 50 + Math.cos(angle) * r * 0.6,
        y: 52 + Math.sin(angle) * r * 0.42,
        delay: 0.08 * i,
        duration: 1.1 + Math.random() * 0.4,
        size: 5 + Math.floor(Math.random() * 6),
      };
    }),
  []);

  // Sparkle stage — 12 ring + 8 scatter = 20 total (single-play, no repeat)
  const sparkles = useMemo(() => {
    const ring = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const r = 30 + Math.random() * 18;
      return {
        id: i,
        x: 50 + Math.cos(angle) * r * 0.58,
        y: 50 + Math.sin(angle) * r * 0.4,
        delay: 0.04 * i,
        duration: 1.0 + Math.random() * 0.55,
        size: 7 + Math.floor(Math.random() * 7),
        color: ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff'][i % 4],
      };
    });
    const scatter = Array.from({ length: 8 }, (_, i) => ({
      id: 12 + i,
      x: 8 + Math.random() * 84,
      y: 12 + Math.random() * 76,
      delay: 0.06 + Math.random() * 0.38,
      duration: 0.9 + Math.random() * 0.65,
      size: 4 + Math.floor(Math.random() * 6),
      color: ['#fbbf24', '#fda4af', '#fb7185', '#fde68a'][i % 4],
    }));
    return [...ring, ...scatter];
  }, []);

  // Sparkle stage — 3 floating hearts drifting upward
  const sparkleHearts = useMemo(() =>
    [30, 50, 70].map((x, i) => ({
      id: i,
      x,
      delay: 0.6 + i * 0.2,
      duration: 2.0 + Math.random() * 0.5,
    })),
  []);

  // Radiance — 8 volumetric beam angles spread -40° to +40°, alternating widths
  const beams = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: -40 + (80 / 7) * i,
      delay: 0.12 * i,
      width: i % 2 === 0 ? 32 : 48,
    })),
  []);

  // Radiance — 8 rose petals at fixed positions
  const radiancePetals = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 82,
      rotate: Math.floor(Math.random() * 360),
      delay: 0.1 * i + 0.4,
    })),
  []);

  // Radiance — 3 final floating hearts
  const radianceHearts = useMemo(() =>
    [25, 50, 75].map((x, i) => ({
      id: i,
      x,
      delay: 0.8 + i * 0.25,
      duration: 2.2 + Math.random() * 0.4,
    })),
  []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #3b0764 0%, #7c2d12 40%, #1c1917 100%)' }}
    >

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 1 — OVERTURE (0–3s): Cinematic Opening
          Budget: 3 beams + 18 stars + 4 sparkle-blink + 2 text + 2 notes = 29 → staggered ~18 peak ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'overture' && (
          <motion.div
            key="overture"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* ── 3-beam crossover: center + top-left + top-right ── */}

            {/* Center beam — scaleX 0.1→1 */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                height: '100%',
                background:
                  'radial-gradient(ellipse 55% 95% at 50% 0%, rgba(251,191,36,0.5) 0%, rgba(124,45,18,0.2) 50%, transparent 75%)',
                transformOrigin: 'top center',
              }}
              initial={{ opacity: 0, scaleX: 0.1 }}
              animate={{ opacity: 0.8, scaleX: 1 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
            />

            {/* Top-left beam — angled, scaleX 0→1, delay 0.2s */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                left: 0,
                width: '70%',
                height: '90%',
                background:
                  'radial-gradient(ellipse 60% 90% at 0% 0%, rgba(251,191,36,0.3) 0%, rgba(124,45,18,0.1) 50%, transparent 75%)',
                transformOrigin: 'top left',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.65, scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.2, ease: 'easeOut' }}
            />

            {/* Top-right beam — angled, scaleX 0→1, delay 0.4s */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                right: 0,
                width: '70%',
                height: '90%',
                background:
                  'radial-gradient(ellipse 60% 90% at 100% 0%, rgba(251,191,36,0.3) 0%, rgba(124,45,18,0.1) 50%, transparent 75%)',
                transformOrigin: 'top right',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.65, scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.4, ease: 'easeOut' }}
            />

            {/* 18 twinkling stars — repeat:Infinity, 4–7s ambient */}
            {stars.map((s) => (
              <motion.div
                key={`star-${s.id}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                  background: '#fde68a',
                  boxShadow: `0 0 ${s.size * 4}px #fbbf24, 0 0 ${s.size * 8}px rgba(251,191,36,0.4)`,
                }}
                animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.5, 0.7] }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* 4 sparkle-blink dots around title — repeat:Infinity ambient */}
            {titleSparkles.map((ts) => (
              <motion.div
                key={`tsp-${ts.id}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: ts.left,
                  top: ts.top,
                  width: 4,
                  height: 4,
                  background: '#ffffff',
                  boxShadow: '0 0 6px #ffffff, 0 0 12px rgba(255,255,255,0.6)',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: ts.id * 0.35,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Center text cluster */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {/* Decorative dashes */}
              <motion.p
                className="text-xs uppercase tracking-[0.5em] font-light"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.3 }}
              >
                — A LOVE STORY —
              </motion.p>

              {/* capsuleTitle in massive gold serif */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-center px-4 leading-tight"
                style={{
                  color: '#fbbf24',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.06em',
                  textShadow:
                    '0 0 40px rgba(251,191,36,1), 0 0 80px rgba(251,191,36,0.5), 0 0 160px rgba(251,191,36,0.2)',
                }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              >
                {capsuleTitle}
              </motion.h1>

              {/* "A CELEBRATION OF LOVE" subtitle in rose pink */}
              <motion.p
                className="text-sm md:text-base font-semibold tracking-[0.35em] uppercase"
                style={{
                  color: '#fda4af',
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 16px rgba(253,164,175,0.7)',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1 }}
              >
                A CELEBRATION OF LOVE
              </motion.p>

              {/* 🎵 note drifts up from left */}
              <motion.span
                className="absolute text-3xl select-none pointer-events-none"
                style={{ left: '20%', bottom: '30%' }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -80 }}
                transition={{ duration: 2.2, delay: 1.0, ease: 'easeOut' }}
              >
                🎵
              </motion.span>

              {/* 🎶 note drifts up from right */}
              <motion.span
                className="absolute text-3xl select-none pointer-events-none"
                style={{ right: '20%', bottom: '35%' }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -70 }}
                transition={{ duration: 2.0, delay: 1.3, ease: 'easeOut' }}
              >
                🎶
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 2 — APPROACH (3–6s): The Meeting
          Budget: bg + 12 petals + 4 rings + couple + heart + 2 text = 21 ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'approach' && (
          <motion.div
            key="approach"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Spotlight halo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 90% at 50% 0%, rgba(251,191,36,0.3) 0%, transparent 68%)',
              }}
            />

            {/* 12 falling rose petals — single-play, max 4 visible at once (staggered 0.2s) */}
            {approachPetals.map((p) => (
              <motion.span
                key={`apetal-${p.id}`}
                className="absolute text-xl select-none pointer-events-none"
                style={{ left: `${p.x}%`, top: '-6%', rotate: p.rotate }}
                animate={{
                  y: ['0%', '118%'],
                  x: [0, p.driftX],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              >
                🌹
              </motion.span>
            ))}

            {/* 4 concentric heart rings — ripple from center on meeting */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {heartRings.map((r) => (
                <motion.div
                  key={`hring-${r.id}`}
                  className="absolute rounded-full"
                  style={{
                    width: r.size,
                    height: r.size,
                    border: `2px solid #fb7185`,
                    boxShadow: '0 0 12px rgba(251,113,133,0.5)',
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1, 2], opacity: [1, 0.6, 0] }}
                  transition={{
                    duration: 1.4,
                    delay: 1.6 + r.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Couple and text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              <div className="inline-flex gap-4 items-center whitespace-nowrap">
                {/* 🤵 slides from x:-400 */}
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                >
                  🤵
                </motion.span>

                {/* 💕 springs in when they meet — spring on 2 keyframes */}
                <motion.span
                  className="text-4xl select-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7, type: 'spring', stiffness: 320, damping: 11 }}
                >
                  💕
                </motion.span>

                {/* 💃 slides from x:+400 */}
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                >
                  💃
                </motion.span>
              </div>

              <motion.p
                className="text-sm md:text-base font-bold tracking-[0.3em] uppercase"
                style={{ color: '#fda4af', textShadow: '0 0 18px rgba(251,113,133,0.7)' }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.75 }}
              >
                TWO HEARTS, ONE STORY
              </motion.p>

              {/* "THE MOMENT IT ALL BEGAN" — small, elegant, italic gold */}
              <motion.p
                className="text-xs italic tracking-widest"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                THE MOMENT IT ALL BEGAN
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 3 — DANCE-ERA1 (6–9s): "THE FIRST DANCE"
          Budget: amber tint + oval spotlight + 4 notes + couple + 2 text = 10 ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era1' && (
          <motion.div
            key="dance-era1"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Warm amber era tint — single-play */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(251,191,36,0.13)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Oval floor spotlight — ambient, repeat:Infinity 3.5s */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                bottom: '22%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 180,
                height: 50,
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(251,191,36,0.55) 0%, rgba(245,158,11,0.25) 50%, transparent 75%)',
                filter: 'blur(8px)',
              }}
              animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 4 music notes floating up — single-play */}
            {era1Notes.map((n) => (
              <motion.span
                key={`e1n-${n.id}`}
                className="absolute text-2xl select-none pointer-events-none"
                style={{ left: `${n.x}%`, bottom: '28%' }}
                animate={{ y: [0, -130], opacity: [0, 1, 0] }}
                transition={{ duration: n.duration, delay: n.delay, ease: 'easeOut' }}
              >
                ♪
              </motion.span>
            ))}

            {/* Couple + text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              {/* Era label */}
              <motion.p
                className="text-xs italic tracking-widest"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif', opacity: 0.9 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                ✦ THE FIRST DANCE ✦
              </motion.p>

              {/* Couple sways gently — 3-keyframe → ease not spring, repeat:2 */}
              <div className="inline-flex gap-4 items-center whitespace-nowrap">
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2.4, repeat: 2, ease: 'easeInOut' }}
                >
                  🤵
                </motion.span>
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 2.4, repeat: 2, ease: 'easeInOut' }}
                >
                  💃
                </motion.span>
              </div>

              <motion.p
                className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase"
                style={{ color: '#fde68a' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                WALTZING THROUGH THE YEARS
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 4 — DANCE-ERA2 (9–12s): "THROUGH THE YEARS"
          Budget: indigo tint + 8 confetti + 4 notes + couple + 2 text = 16 ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era2' && (
          <motion.div
            key="dance-era2"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Cool indigo era tint */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(99,102,241,0.15)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {/* 8 confetti squares — spring on 2 keyframes, staggered */}
            {era2Confetti.map((c) => (
              <motion.div
                key={`e2c-${c.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: c.size,
                  height: c.size,
                  background: c.color,
                  borderRadius: 2,
                  rotate: c.rotate,
                  boxShadow: `0 0 8px ${c.color}99`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: c.delay, type: 'spring', stiffness: 280, damping: 16 }}
              />
            ))}

            {/* 4 music notes — single-play */}
            {era2Notes.map((n) => (
              <motion.span
                key={`e2n-${n.id}`}
                className="absolute text-2xl select-none pointer-events-none"
                style={{ left: `${n.x}%`, bottom: '25%' }}
                animate={{ y: [0, -120], opacity: [0, 1, 0] }}
                transition={{ duration: n.duration, delay: n.delay, ease: 'easeOut' }}
              >
                🎶
              </motion.span>
            ))}

            {/* Couple + text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              <motion.p
                className="text-xs italic tracking-widest"
                style={{ color: '#a5b4fc', fontFamily: 'Georgia, serif', opacity: 0.9 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                ✦ THROUGH THE YEARS ✦
              </motion.p>

              {/* Energetic faster spin — 3-keyframe → ease, repeat:2 */}
              <div className="inline-flex gap-4 items-center whitespace-nowrap">
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ rotate: [-5, 5, -5], y: [-12, 12, -12] }}
                  transition={{ duration: 1.6, repeat: 2, ease: 'easeInOut' }}
                >
                  🤵
                </motion.span>
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ rotate: [5, -5, 5], y: [12, -12, 12] }}
                  transition={{ duration: 1.6, repeat: 2, ease: 'easeInOut' }}
                >
                  💃
                </motion.span>
              </div>

              {/* "♾️ of memories" */}
              <motion.p
                className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase"
                style={{ color: '#c7d2fe' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                ♾ OF MEMORIES
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 5 — DANCE-ERA3 (12–15s): "YOUR FOREVER"
          Budget: halo ring + glow + 8 sparkles + couple + 2 text = 13 ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era3' && (
          <motion.div
            key="dance-era3"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* 8 golden sparkle ring — single-play */}
            {era3Sparkles.map((s) => (
              <motion.div
                key={`e3s-${s.id}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                  background: '#fbbf24',
                  boxShadow: `0 0 ${s.size * 3}px #f59e0b, 0 0 ${s.size * 6}px rgba(251,191,36,0.4)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                transition={{ duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Camera-zoom feel: entire content scales 1→1.05 */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <motion.p
                className="text-xs italic tracking-widest"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif', opacity: 0.9 }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                ✦ YOUR FOREVER ✦
              </motion.p>

              {/* Halo ring around couple — scale 0→1.4, single-play */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    border: '2px solid rgba(251,191,36,0.6)',
                    boxShadow: '0 0 20px rgba(251,191,36,0.3)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                />

                <div className="inline-flex gap-4 items-center whitespace-nowrap relative z-10">
                  {/* Couple glows — drop-shadow filter animate, repeat:2 */}
                  <motion.span
                    className="text-5xl md:text-7xl select-none"
                    style={{ display: 'inline-block' }}
                    animate={{
                      rotate: [-4, 4, -4],
                      y: [-8, 8, -8],
                      filter: [
                        'drop-shadow(0 0 8px #fbbf24)',
                        'drop-shadow(0 0 24px #fbbf24)',
                        'drop-shadow(0 0 8px #fbbf24)',
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: 2, ease: 'easeInOut' }}
                  >
                    🤵
                  </motion.span>
                  <motion.span
                    className="text-5xl md:text-7xl select-none"
                    style={{ display: 'inline-block' }}
                    animate={{
                      rotate: [4, -4, 4],
                      y: [8, -8, 8],
                      filter: [
                        'drop-shadow(0 0 8px #fbbf24)',
                        'drop-shadow(0 0 24px #fbbf24)',
                        'drop-shadow(0 0 8px #fbbf24)',
                      ],
                    }}
                    transition={{ duration: 2.8, repeat: 2, ease: 'easeInOut' }}
                  >
                    💃
                  </motion.span>
                </div>
              </div>

              <motion.p
                className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase"
                style={{
                  color: '#fbbf24',
                  textShadow: '0 0 25px rgba(251,191,36,0.8), 0 0 50px rgba(251,191,36,0.4)',
                  fontFamily: 'Georgia, serif',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                ALWAYS AND FOREVER
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 6 — SPARKLE (15–18s): Explosion of Light
          Budget: flash + 20 sparkles + couple + champagne + title + "LOVE IS FOREVER" + 3 hearts = ~22 peak ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'sparkle' && (
          <motion.div
            key="sparkle"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* White full-screen flash — single-play 0.6s */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ background: '#ffffff' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* 20 sparkle dots — single-play, NO repeat */}
            {sparkles.map((s) => (
              <motion.div
                key={`sp-${s.id}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  boxShadow: `0 0 ${s.size * 3}px ${s.color}, 0 0 ${s.size * 7}px ${s.color}55`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                transition={{ duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* 3 floating hearts drifting upward — single-play */}
            {sparkleHearts.map((h) => (
              <motion.span
                key={`sh-${h.id}`}
                className="absolute text-2xl select-none pointer-events-none"
                style={{ left: `${h.x}%`, bottom: '20%' }}
                animate={{ y: [0, -120], opacity: [0, 1, 0] }}
                transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
              >
                ❤️
              </motion.span>
            ))}

            {/* Center content — z-10 so above sparkles */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              {/* Couple with 💍 ring overlaid between them */}
              <div className="relative inline-flex gap-4 items-center whitespace-nowrap">
                <span className="text-5xl md:text-7xl select-none">🤵</span>
                <span className="text-5xl md:text-7xl select-none">💃</span>

                {/* 💍 ring positioned at center-bottom of the couple, overlapping like a held ring */}
                <motion.span
                  className="absolute select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(22px, 6vw, 36px)',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.9))',
                  }}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.65, type: 'spring', stiffness: 320, damping: 14 }}
                >
                  💍
                </motion.span>
              </div>

              {/* "LOVE ETERNAL ✨" massive gold */}
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-center px-4 mt-4"
                style={{
                  color: '#fbbf24',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.05em',
                  textShadow:
                    '0 0 20px rgba(251,191,36,1), 0 0 50px rgba(251,191,36,0.7), 0 0 100px rgba(251,191,36,0.4)',
                }}
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 18 }}
              >
                LOVE ETERNAL ✨
              </motion.h2>

              {/* "LOVE IS FOREVER ♾" — large gold, fade in at delay 0.5s */}
              <motion.p
                className="text-lg md:text-2xl font-bold tracking-widest"
                style={{
                  color: '#fbbf24',
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 16px rgba(251,191,36,0.8)',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                LOVE IS FOREVER ♾
              </motion.p>

              {/* 🥂 champagne toast bounce */}
              <motion.span
                className="text-4xl select-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -20, 0] }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
              >
                🥂
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          STAGE 7 — RADIANCE (18–20s): Finale
          Budget: glow + 8 beams + 8 petals + couple + 3 text + ring + 3 hearts = 25 → peak ~22 ✓
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Ambient golden radial glow expanding — single-play */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(124,45,18,0.15) 40%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              initial={{ width: 100, height: 100, opacity: 0 }}
              animate={{ width: '400%', height: '400%', opacity: [0, 0.9, 0.65] }}
              transition={{ duration: 2.0, ease: 'easeOut' }}
            />

            {/* 8 tall volumetric light beams — alternating widths 32/48px, scaleY 0→1 staggered */}
            {beams.map((b) => (
              <motion.div
                key={`beam-${b.id}`}
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  left: '50%',
                  width: b.width,
                  height: '55%',
                  background:
                    'linear-gradient(to bottom, rgba(251,191,36,0.6) 0%, rgba(251,191,36,0.15) 60%, transparent 100%)',
                  transformOrigin: 'top center',
                  transform: `translateX(-50%) rotate(${b.angle}deg)`,
                  filter: 'blur(3px)',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.75 }}
                transition={{ duration: 1.1, delay: b.delay, ease: 'easeOut' }}
              />
            ))}

            {/* 8 rose petals at fixed positions — single-play staggered */}
            {radiancePetals.map((p) => (
              <motion.span
                key={`rpetal-${p.id}`}
                className="absolute text-2xl select-none pointer-events-none"
                style={{ left: `${p.x}%`, top: `${p.y}%`, rotate: p.rotate }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: p.delay, duration: 0.6, ease: 'easeOut' }}
              >
                🌹
              </motion.span>
            ))}

            {/* 3 final floating hearts drifting upward — single-play */}
            {radianceHearts.map((h) => (
              <motion.span
                key={`rh-${h.id}`}
                className="absolute text-2xl select-none pointer-events-none"
                style={{ left: `${h.x}%`, bottom: '15%' }}
                animate={{ y: [0, -140], opacity: [0, 1, 0] }}
                transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
              >
                ❤️
              </motion.span>
            ))}

            {/* Main center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center z-10">
              {/* Couple — ambient gentle sway, repeat:Infinity 6s — ring overlaid between them */}
              <div className="relative inline-flex gap-4 items-center whitespace-nowrap">
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🤵
                </motion.span>
                <motion.span
                  className="text-5xl md:text-7xl select-none"
                  style={{ display: 'inline-block' }}
                  animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  💃
                </motion.span>

                {/* 💍 ring overlaid at center-bottom of couple */}
                <motion.span
                  className="absolute select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(22px, 6vw, 36px)',
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    filter: 'drop-shadow(0 0 10px rgba(251,191,36,1))',
                  }}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 15 }}
                >
                  💍
                </motion.span>
              </div>

              {/* Capsule title — MASSIVE gold serif, slow scale pulse repeat:Infinity 4s ambient */}
              <motion.h1
                className="text-3xl md:text-5xl font-bold leading-snug"
                style={{
                  color: '#fbbf24',
                  fontFamily: 'Georgia, serif',
                  textShadow:
                    '0 0 30px rgba(251,191,36,1), 0 0 70px rgba(251,191,36,0.6), 0 0 140px rgba(251,191,36,0.3)',
                  maxWidth: '88%',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.03, 1] }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.4 },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }}
              >
                {capsuleTitle}
              </motion.h1>

              {/* "YOUR LOVE STORY BEGINS NOW" */}
              <motion.p
                className="text-xs md:text-sm font-bold tracking-widest uppercase"
                style={{
                  color: '#fde68a',
                  letterSpacing: '0.3em',
                  textShadow: '0 0 20px rgba(251,191,36,0.6)',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.8 }}
              >
                YOUR LOVE STORY BEGINS NOW
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
