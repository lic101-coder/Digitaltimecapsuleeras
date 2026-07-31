/**
 * Golden Wedding Dance Ceremony — CINEMATIC FIRST DANCE SPOTLIGHT (Full Epic Redesign)
 *
 * 29-second cinematic ceremony:
 * 1. curtain    (0–3.5s)   — Theatrical velvet curtains part, stage revealed, "NOW PRESENTING"
 * 2. overture   (3.5–7s)   — 3-beam crossover, twinkling stars, capsule title reveal
 * 3. approach   (7–10s)    — Couple enters from wings, heart rings, rose petals, "TWO HEARTS ONE STORY"
 * 4. dance-era1 (10–14s)   — HERO: theatrical spotlight CONE, dust motes, dance floor oval, couple sways
 * 5. dance-era2 (14–17s)   — THROUGH THE YEARS: lively confetti, energetic couple
 * 6. dance-era3 (17–20s)   — YOUR FOREVER: halo ring, golden sparkles, camera zoom
 * 7. ring       (20–23s)   — RING SPOTLIGHT: tight spot, 💍 perfectly centered 🤵💍💃, pulse rings
 * 8. sparkle    (23–26s)   — White flash, burst of sparkles, "LOVE ETERNAL ✨", champagne
 * 9. radiance   (26–29s)   — Full confetti, firework clusters, beams, "💍 LOVE ETERNAL 💍"
 *
 * Key fixes:
 * - 💍 always in flex row: 🤵 💍 💃 (never absolutely positioned off-center)
 * - Theatrical spotlight = clip-path trapezoid + dust motes + floor oval
 * - isMobile via useState (computed once)
 * - All Math.random() in useMemo
 * - No completed state
 * - No animated filter on mobile
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface GoldenWeddingDanceCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

type Stage = 'curtain' | 'overture' | 'approach' | 'dance-era1' | 'dance-era2' | 'dance-era3' | 'ring' | 'sparkle' | 'radiance';

export function GoldenWeddingDanceCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: GoldenWeddingDanceCeremonyProps) {
  const [stage, setStage] = useState<Stage>('curtain');
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const tl = [
      { t: 0,     fn: () => setStage('curtain')    },
      { t: 3500,  fn: () => setStage('overture')   },
      { t: 7000,  fn: () => setStage('approach')   },
      { t: 10000, fn: () => setStage('dance-era1') },
      { t: 14000, fn: () => setStage('dance-era2') },
      { t: 17000, fn: () => setStage('dance-era3') },
      { t: 20000, fn: () => setStage('ring')       },
      { t: 23000, fn: () => setStage('sparkle')    },
      { t: 26000, fn: () => setStage('radiance')   },
      { t: 29000, fn: () => onComplete?.()         },
    ];
    const timers = tl.map(({ t, fn }) => setTimeout(fn, t));
    const failsafe = setTimeout(() => { onComplete?.(); }, 30000);
    return () => { timers.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ── Pre-computed arrays — ALL Math.random() only here ─────────────────────

  const stars = useMemo(() =>
    Array.from({ length: isMobile ? 12 : 20 }, (_, i) => ({
      x: 3 + (i * 4.97) % 94,
      y: 2 + (i * 2.73) % 52,
      size: [2, 3, 5][i % 3],
      duration: 4 + (i * 0.41) % 3,
      delay: (i * 0.19) % 2.5,
    })), [isMobile]);

  const petals = useMemo(() =>
    Array.from({ length: isMobile ? 8 : 14 }, (_, i) => ({
      x: 4 + (i * 6.81) % 92,
      delay: i * 0.22,
      duration: 2.2 + (i * 0.11) % 1.2,
      rotate: (i * 53) % 360,
      driftX: ((i * 13.7) % 70) - 35,
    })), [isMobile]);

  const heartRings = useMemo(() =>
    [55, 105, 165, 225].map((size, i) => ({ size, delay: i * 0.22 })), []);

  // Dust motes inside the spotlight beam (x constrained to ~25-75% = beam center)
  const spotlightDust = useMemo(() => {
    const count = isMobile ? 8 : 15;
    return Array.from({ length: count }, (_, i) => ({
      left: 28 + (i * 3.47) % 44,
      top: 12 + (i * 4.31) % 60,
      duration: 4 + (i * 0.53) % 3,
      delay: (i * 0.27) % 2.5,
      driftX: ((i * 5.3) % 22) - 11,
      driftY: ((i * 3.7) % 20) - 10,
    }));
  }, [isMobile]);

  const era1Notes = useMemo(() =>
    [10, 24, 74, 88].map((x, i) => ({
      x, delay: 0.3 + i * 0.3, duration: 2.8 + (i * 0.17) % 0.8,
    })), []);

  const era2Confetti = useMemo(() =>
    Array.from({ length: isMobile ? 7 : 12 }, (_, i) => ({
      x: 5 + (i * 7.83) % 90,
      y: 6 + (i * 6.31) % 74,
      delay: i * 0.1,
      color: ['#fbbf24', '#818cf8', '#34d399', '#f472b6', '#fb923c', '#38bdf8'][i % 6],
      rotate: (i * 37) % 45,
      size: 7 + (i * 1.9) % 9,
    })), [isMobile]);

  const era2Notes = useMemo(() =>
    [16, 33, 65, 82].map((x, i) => ({
      x, delay: i * 0.22, duration: 1.9 + (i * 0.11) % 0.5,
    })), []);

  const era3Sparkles = useMemo(() => {
    const count = isMobile ? 8 : 12;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = 52 + (i * 3.1) % 22;
      return {
        x: 50 + Math.cos(angle) * r * 0.55,
        y: 52 + Math.sin(angle) * r * 0.42,
        delay: 0.08 * i,
        duration: 1.1 + (i * 0.07) % 0.45,
        size: 4 + (i * 1.3) % 7,
      };
    });
  }, [isMobile]);

  const ringPulses = useMemo(() =>
    [45, 90, 145, 215].map((size, i) => ({ size, delay: i * 0.28 })), []);

  const sparkles = useMemo(() => {
    const total = isMobile ? 16 : 24;
    const ring = Math.floor(total * 0.6);
    const scatter = total - ring;
    return [
      ...Array.from({ length: ring }, (_, i) => {
        const a = (i / ring) * Math.PI * 2;
        const r = 28 + (i * 3.7) % 22;
        return {
          x: 50 + Math.cos(a) * r * 0.58,
          y: 50 + Math.sin(a) * r * 0.4,
          delay: i * 0.04,
          duration: 1.0 + (i * 0.06) % 0.6,
          size: 6 + (i * 0.9) % 9,
          color: ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff'][i % 4],
        };
      }),
      ...Array.from({ length: scatter }, (_, i) => ({
        x: 6 + (i * 9.1) % 88,
        y: 8 + (i * 7.3) % 80,
        delay: 0.05 + (i * 0.07) % 0.4,
        duration: 0.9 + (i * 0.08) % 0.7,
        size: 4 + (i * 1.1) % 7,
        color: ['#fbbf24', '#fda4af', '#fb7185', '#fde68a'][i % 4],
      })),
    ];
  }, [isMobile]);

  const sparkleHearts = useMemo(() =>
    [22, 50, 78].map((x, i) => ({
      x, delay: 0.5 + i * 0.2, duration: 2.1 + (i * 0.13) % 0.5,
    })), []);

  const beams = useMemo(() => {
    const count = isMobile ? 7 : 11;
    return Array.from({ length: count }, (_, i) => ({
      angle: -55 + (110 / (count - 1)) * i,
      delay: 0.1 * i,
      width: i % 2 === 0 ? 28 : 46,
    }));
  }, [isMobile]);

  const radiancePetals = useMemo(() =>
    Array.from({ length: isMobile ? 5 : 9 }, (_, i) => ({
      x: 4 + (i * 10.3) % 92,
      y: 4 + (i * 8.7) % 84,
      rotate: (i * 47) % 360,
      delay: 0.1 * i + 0.35,
    })), [isMobile]);

  const gwColors = useMemo(() => ['#fbbf24','#f59e0b','#fda4af','#fb7185','#ffffff','#fde68a','#ec4899'], []);

  const fwPositions = useMemo(() => [
    {x:7,y:13},{x:22,y:7},{x:38,y:17},{x:56,y:5},{x:71,y:14},{x:87,y:9},{x:14,y:31},{x:83,y:27},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);

  const fwSparks = useMemo(() => fwPositions.map((_, pi) => {
    const count = isMobile ? 12 : 20;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      const d = 44 + (i % 5) * 19;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: gwColors[(pi+i) % gwColors.length], delay: i*0.04 };
    });
  }), [fwPositions, gwColors, isMobile]);

  const fwRings = useMemo(() => fwPositions.map(() =>
    [0, 0.15, 0.3].map((delay, i) => ({ delay, color: ['#fbbf24','#fda4af','#fb7185'][i] }))
  ), [fwPositions]);

  const orbs = useMemo(() =>
    Array.from({ length: isMobile ? 9 : 18 }, (_, i) => ({
      x: 5 + (i * 5.3) % 90,
      dx: ((i * 17) % 80) - 40,
      dur: 2.3 + (i * 0.33) % 1.5,
      delay: i * 0.18,
      color: gwColors[i % gwColors.length],
    })), [gwColors, isMobile]);

  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#fbbf24','#f59e0b','#fda4af','#fb7185','#ffffff','#fde68a','#ec4899'];
    const base = { spread: 80, ticks: 220, gravity: 0.9, decay: 0.93, startVelocity: 40, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 130, angle: 60,  origin: { x: 0,   y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 130, angle: 120, origin: { x: 1,   y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 90, angle: 90, origin: { x: 0.5, y: 0.6 } }), 400);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 110, angle: 60, origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 110, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 1000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: 'linear-gradient(160deg, #0d0a1a 0%, #1a0a2e 40%, #0d0a1a 100%)' }}>

      {/* ═══════════════════════════════════════════════════════════════
          CURTAIN — Theatrical reveal
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'curtain' && (
          <motion.div key="curtain" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
            {/* Stage glow behind curtains */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(251,191,36,0.35) 0%, rgba(124,45,18,0.15) 55%, transparent 80%)' }} />

            {/* Floor footlights */}
            <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(251,191,36,0.22) 0%, transparent 100%)' }} />

            {/* Left curtain panel */}
            <motion.div className="absolute top-0 left-0 bottom-0 z-20" style={{ width: '52%' }}
              initial={{ x: 0 }} animate={{ x: '-100%' }}
              transition={{ duration: 2.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #6b0f0f 0%, #991b1b 45%, #b91c1c 80%, #881212 100%)' }} />
              {[14, 28, 44, 60, 76, 90].map((p, i) => (
                <div key={i} className="absolute top-0 bottom-0 w-0.5 opacity-15"
                  style={{ left: `${p}%`, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />
              ))}
              {/* Gold trim on inner edge */}
              <div className="absolute top-0 right-0 bottom-0 w-5"
                style={{ background: 'linear-gradient(to left, #fbbf24, #d97706, #92400e)' }} />
              {/* Curtain valance top */}
              <div className="absolute top-0 left-0 right-0 h-8"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', borderBottom: '3px solid rgba(251,191,36,0.6)' }} />
            </motion.div>

            {/* Right curtain panel */}
            <motion.div className="absolute top-0 right-0 bottom-0 z-20" style={{ width: '52%' }}
              initial={{ x: 0 }} animate={{ x: '100%' }}
              transition={{ duration: 2.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, #6b0f0f 0%, #991b1b 45%, #b91c1c 80%, #881212 100%)' }} />
              {[10, 24, 40, 58, 72, 88].map((p, i) => (
                <div key={i} className="absolute top-0 bottom-0 w-0.5 opacity-15"
                  style={{ left: `${p}%`, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />
              ))}
              <div className="absolute top-0 left-0 bottom-0 w-5"
                style={{ background: 'linear-gradient(to right, #fbbf24, #d97706, #92400e)' }} />
              <div className="absolute top-0 left-0 right-0 h-8"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', borderBottom: '3px solid rgba(251,191,36,0.6)' }} />
            </motion.div>

            {/* Center reveal text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
              <motion.p className="text-xs uppercase tracking-[0.7em] font-light"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, times: [0, 0.25, 0.75, 1] }}
              >✦ NOW PRESENTING ✦</motion.p>
              <motion.h2 className="text-2xl md:text-3xl font-bold text-center px-8"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif', textShadow: '0 0 30px rgba(251,191,36,0.9)', letterSpacing: '0.05em' }}
                initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.75, 1, 1, 0.9] }}
                transition={{ duration: 3.2, delay: 0.2, times: [0, 0.3, 0.75, 1] }}
              >THE FIRST DANCE<br />SPOTLIGHT</motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          OVERTURE — Stage reveal, title, stars
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'overture' && (
          <motion.div key="overture" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
            {/* Center beam */}
            <motion.div className="absolute pointer-events-none"
              style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', transformOrigin: 'top center', background: 'radial-gradient(ellipse 55% 95% at 50% 0%, rgba(251,191,36,0.48) 0%, rgba(124,45,18,0.18) 50%, transparent 75%)' }}
              initial={{ opacity: 0, scaleX: 0.1 }} animate={{ opacity: 0.8, scaleX: 1 }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
            />
            {/* Left beam */}
            <motion.div className="absolute pointer-events-none"
              style={{ top: 0, left: 0, width: '70%', height: '90%', transformOrigin: 'top left', background: 'radial-gradient(ellipse 60% 90% at 0% 0%, rgba(251,191,36,0.28) 0%, transparent 75%)' }}
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 0.6, scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.2, ease: 'easeOut' }}
            />
            {/* Right beam */}
            <motion.div className="absolute pointer-events-none"
              style={{ top: 0, right: 0, width: '70%', height: '90%', transformOrigin: 'top right', background: 'radial-gradient(ellipse 60% 90% at 100% 0%, rgba(251,191,36,0.28) 0%, transparent 75%)' }}
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 0.6, scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.4, ease: 'easeOut' }}
            />

            {/* Twinkling stars */}
            {stars.map((s, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: '#fde68a', boxShadow: `0 0 ${s.size * 4}px #fbbf24, 0 0 ${s.size * 8}px rgba(251,191,36,0.35)` }}
                animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.5, 0.7] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <motion.p className="text-xs uppercase tracking-[0.5em] font-light"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >— A LOVE STORY —</motion.p>

              <motion.h1 className="text-3xl md:text-5xl font-black leading-tight"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif', textShadow: '0 0 40px rgba(251,191,36,0.95), 0 4px 24px rgba(0,0,0,0.6)', letterSpacing: '0.04em' }}
                initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.55, type: 'spring', stiffness: 180, damping: 18 }}
              >{capsuleTitle}</motion.h1>

              <motion.p className="text-sm md:text-base font-semibold tracking-[0.35em] uppercase"
                style={{ color: '#fda4af', fontFamily: 'Georgia, serif', textShadow: '0 0 18px rgba(253,164,175,0.7)' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1 }}
              >A CELEBRATION OF LOVE</motion.p>

              <motion.div className="flex gap-8 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                {['💍', '🌹', '🥂', '🌹', '💍'].map((e, i) => (
                  <motion.span key={i} className="text-2xl"
                    animate={{ y: [-4, 4, -4], rotate: [-8, 8, -8] }}
                    transition={{ duration: 2 + i*0.3, repeat: Infinity, delay: i*0.2, ease: 'easeInOut' }}
                  >{e}</motion.span>
                ))}
              </motion.div>
            </div>

            {/* Music notes */}
            <motion.span className="absolute text-3xl pointer-events-none select-none"
              style={{ left: '18%', bottom: '32%' }}
              initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -90 }}
              transition={{ duration: 2.4, delay: 1.2, ease: 'easeOut' }}
            >🎵</motion.span>
            <motion.span className="absolute text-3xl pointer-events-none select-none"
              style={{ right: '18%', bottom: '36%' }}
              initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: -80 }}
              transition={{ duration: 2.2, delay: 1.6, ease: 'easeOut' }}
            >🎶</motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          APPROACH — Couple enters from wings
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'approach' && (
          <motion.div key="approach" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Warm spotlight halo from above */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(251,191,36,0.28) 0%, transparent 68%)' }} />

            {/* Falling rose petals */}
            {petals.map((p, i) => (
              <motion.span key={i} className="absolute text-2xl pointer-events-none select-none"
                style={{ left: `${p.x}%`, top: '-6%', rotate: p.rotate }}
                animate={{ y: ['0%', '118%'], x: [0, p.driftX], opacity: [0, 1, 1, 0] }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
              >🌹</motion.span>
            ))}

            {/* Heart rings rippling from center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {heartRings.map((r, i) => (
                <motion.div key={i} className="absolute rounded-full"
                  style={{ width: r.size, height: r.size, border: '2px solid #fb7185', boxShadow: '0 0 14px rgba(251,113,133,0.5)' }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1, 2.2], opacity: [1, 0.7, 0] }}
                  transition={{ duration: 1.5, delay: 1.7 + r.delay, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Couple + text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
              <div className="inline-flex items-center gap-5 whitespace-nowrap">
                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  initial={{ x: -450, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >🤵</motion.span>

                <motion.span className="text-4xl select-none"
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, type: 'spring', stiffness: 340, damping: 12 }}
                >💕</motion.span>

                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  initial={{ x: 450, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >💃</motion.span>
              </div>

              <motion.p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase"
                style={{ color: '#fda4af', textShadow: '0 0 20px rgba(251,113,133,0.7)' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.75 }}
              >TWO HEARTS, ONE STORY</motion.p>

              <motion.p className="text-xs italic tracking-widest"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >THE MOMENT IT ALL BEGAN</motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          DANCE-ERA1 — THE HERO STAGE: Theatrical spotlight cone
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era1' && (
          <motion.div key="dance-era1" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Very dark stage — spotlight stands out */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #060410 0%, #0e0820 60%, #1a0f14 100%)' }} />

            {/* ── THEATRICAL SPOTLIGHT CONE ──
                Trapezoid: narrow at top (where the light source is), wide at base (where it hits floor)
                clip-path: top edge 10% wide, base edge 90% wide, centered
            */}
            <motion.div className="absolute pointer-events-none"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                height: '82%',
                clipPath: 'polygon(44% 0%, 56% 0%, 92% 100%, 8% 100%)',
                background: 'linear-gradient(to bottom, rgba(255,248,210,0.72) 0%, rgba(251,191,36,0.32) 45%, rgba(251,191,36,0.08) 85%, transparent 100%)',
                filter: isMobile ? 'blur(4px)' : 'blur(6px)',
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Spotlight source — bright point at top center */}
            <motion.div className="absolute pointer-events-none rounded-full"
              style={{ top: '-8px', left: '50%', transform: 'translateX(-50%)', width: 40, height: 40, background: 'radial-gradient(circle, rgba(255,255,240,0.95) 0%, rgba(251,191,36,0.6) 50%, transparent 80%)', filter: 'blur(6px)' }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── DUST MOTES floating in the beam ── */}
            {spotlightDust.map((d, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ left: `${d.left}%`, top: `${d.top}%`, width: 2, height: 2, background: 'rgba(255,255,240,0.7)', boxShadow: '0 0 4px rgba(255,255,200,0.8)' }}
                animate={{ y: [d.driftY, -d.driftY, d.driftY], x: [d.driftX, -d.driftX, d.driftX], opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: d.duration, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* ── DANCE FLOOR OVAL — glowing ellipse at base of spotlight ── */}
            <motion.div className="absolute pointer-events-none"
              style={{
                bottom: '14%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isMobile ? 220 : 300,
                height: isMobile ? 52 : 70,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(255,248,190,0.65) 0%, rgba(251,191,36,0.28) 50%, transparent 78%)',
                filter: isMobile ? 'blur(10px)' : 'blur(14px)',
              }}
              animate={{ opacity: [0.55, 0.9, 0.55] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floor reflection line */}
            <div className="absolute pointer-events-none"
              style={{ bottom: '14%', left: '25%', right: '25%', height: 1, background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.25), transparent)' }} />

            {/* Couple swaying gently — centered in spotlight */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              <motion.p className="text-xs italic tracking-widest"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >✦ THE FIRST DANCE ✦</motion.p>

              <div className="inline-flex items-center gap-4 md:gap-6 whitespace-nowrap">
                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2.6, repeat: 3, ease: 'easeInOut' }}
                >🤵</motion.span>
                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 2.6, repeat: 3, ease: 'easeInOut' }}
                >💃</motion.span>
              </div>

              <motion.p className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase"
                style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.8)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >WALTZING THROUGH TIME</motion.p>
            </div>

            {/* 4 music notes drifting up from sides */}
            {era1Notes.map((n, i) => (
              <motion.span key={i} className="absolute text-2xl md:text-3xl pointer-events-none select-none"
                style={{ left: `${n.x}%`, bottom: '28%', color: 'rgba(251,191,36,0.8)' }}
                animate={{ y: [0, -140], opacity: [0, 1, 0] }}
                transition={{ duration: n.duration, delay: n.delay, ease: 'easeOut' }}
              >♪</motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          DANCE-ERA2 — THROUGH THE YEARS
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era2' && (
          <motion.div key="dance-era2" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(99,102,241,0.14)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />

            {/* Confetti squares */}
            {era2Confetti.map((c, i) => (
              <motion.div key={i} className="absolute pointer-events-none"
                style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.size, height: c.size, background: c.color, borderRadius: 2, rotate: c.rotate, boxShadow: `0 0 8px ${c.color}99`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
                transition={{ delay: c.delay, type: 'spring', stiffness: 280, damping: 16 }}
              />
            ))}

            {era2Notes.map((n, i) => (
              <motion.span key={i} className="absolute text-2xl pointer-events-none select-none"
                style={{ left: `${n.x}%`, bottom: '26%' }}
                animate={{ y: [0, -120], opacity: [0, 1, 0] }}
                transition={{ duration: n.duration, delay: n.delay, ease: 'easeOut' }}
              >🎶</motion.span>
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
              <motion.p className="text-xs italic tracking-widest"
                style={{ color: '#a5b4fc', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >✦ THROUGH THE YEARS ✦</motion.p>

              <div className="inline-flex items-center gap-4 whitespace-nowrap">
                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  animate={{ rotate: [-5, 5, -5], y: [-12, 12, -12] }}
                  transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
                >🤵</motion.span>
                <motion.span className="text-6xl md:text-8xl select-none" style={{ display: 'inline-block' }}
                  animate={{ rotate: [5, -5, 5], y: [12, -12, 12] }}
                  transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
                >💃</motion.span>
              </div>

              <motion.p className="text-sm md:text-base font-semibold tracking-[0.28em] uppercase"
                style={{ color: '#c7d2fe' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >♾ OF MEMORIES</motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          DANCE-ERA3 — YOUR FOREVER
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'dance-era3' && (
          <motion.div key="dance-era3" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {era3Sparkles.map((s, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: '#fbbf24', boxShadow: `0 0 ${s.size*3}px #f59e0b`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.9, 0], opacity: [0, 1, 0] }}
                transition={{ duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10"
              initial={{ scale: 1 }} animate={{ scale: 1.05 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            >
              <motion.p className="text-xs italic tracking-widest"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >✦ YOUR FOREVER ✦</motion.p>

              {/* Halo ring around couple */}
              <div className="relative flex items-center justify-center">
                <motion.div className="absolute pointer-events-none rounded-full"
                  style={{ width: 180, height: 180, border: '2px solid rgba(251,191,36,0.6)', boxShadow: '0 0 24px rgba(251,191,36,0.3), inset 0 0 24px rgba(251,191,36,0.1)' }}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.3, opacity: 1 }}
                  transition={{ duration: 1.3, delay: 0.3, ease: 'easeOut' }}
                />
                <div className="inline-flex items-center gap-4 whitespace-nowrap relative z-10">
                  <motion.span className="text-6xl md:text-8xl select-none"
                    style={{ display: 'inline-block', filter: isMobile ? 'drop-shadow(0 0 16px #fbbf24)' : undefined }}
                    animate={isMobile
                      ? { rotate: [-4, 4, -4], y: [-8, 8, -8] }
                      : { rotate: [-4, 4, -4], y: [-8, 8, -8], filter: ['drop-shadow(0 0 8px #fbbf24)', 'drop-shadow(0 0 28px #fbbf24)', 'drop-shadow(0 0 8px #fbbf24)'] }}
                    transition={{ duration: 2.8, repeat: 2, ease: 'easeInOut' }}
                  >🤵</motion.span>
                  <motion.span className="text-6xl md:text-8xl select-none"
                    style={{ display: 'inline-block', filter: isMobile ? 'drop-shadow(0 0 16px #fbbf24)' : undefined }}
                    animate={isMobile
                      ? { rotate: [4, -4, 4], y: [8, -8, 8] }
                      : { rotate: [4, -4, 4], y: [8, -8, 8], filter: ['drop-shadow(0 0 8px #fbbf24)', 'drop-shadow(0 0 28px #fbbf24)', 'drop-shadow(0 0 8px #fbbf24)'] }}
                    transition={{ duration: 2.8, repeat: 2, ease: 'easeInOut' }}
                  >💃</motion.span>
                </div>
              </div>

              <motion.p className="text-base md:text-xl font-bold tracking-[0.3em] uppercase"
                style={{ color: '#fbbf24', textShadow: '0 0 28px rgba(251,191,36,0.85), 0 0 55px rgba(251,191,36,0.4)', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >ALWAYS AND FOREVER</motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          RING — Dedicated spotlight ring moment
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'ring' && (
          <motion.div key="ring" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Very dark stage for maximum spotlight drama */}
            <div className="absolute inset-0" style={{ background: '#04020f' }} />

            {/* Tight spotlight cone on center — narrower than dance-era1 */}
            <motion.div className="absolute pointer-events-none"
              style={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '80%',
                clipPath: 'polygon(46% 0%, 54% 0%, 82% 100%, 18% 100%)',
                background: 'linear-gradient(to bottom, rgba(255,255,220,0.85) 0%, rgba(251,191,36,0.4) 40%, rgba(251,191,36,0.1) 85%, transparent 100%)',
                filter: isMobile ? 'blur(5px)' : 'blur(8px)',
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            />

            {/* Spotlight source glow */}
            <div className="absolute pointer-events-none rounded-full"
              style={{ top: '-6px', left: '50%', transform: 'translateX(-50%)', width: 32, height: 32, background: 'radial-gradient(circle, rgba(255,255,220,1) 0%, rgba(251,191,36,0.7) 60%, transparent 80%)', filter: 'blur(5px)' }}
            />

            {/* Pulse rings radiating from ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingTop: '8%' }}>
              {ringPulses.map((r, i) => (
                <motion.div key={i} className="absolute rounded-full"
                  style={{ width: r.size, height: r.size, border: '1.5px solid rgba(251,191,36,0.6)', boxShadow: '0 0 20px rgba(251,191,36,0.3)' }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1, 1.8], opacity: [0, 0.8, 0] }}
                  transition={{ duration: 2, delay: 0.8 + r.delay, repeat: 2, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* Floor oval */}
            <div className="absolute pointer-events-none"
              style={{ bottom: '12%', left: '50%', transform: 'translateX(-50%)', width: isMobile ? 200 : 260, height: 55, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,248,190,0.55) 0%, rgba(251,191,36,0.2) 55%, transparent 80%)', filter: isMobile ? 'blur(12px)' : 'blur(16px)' }}
            />

            {/* Center: couple with ring between them — PERFECTLY CENTERED via flex */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
              <motion.p className="text-xs uppercase tracking-[0.6em]"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >✦ WITH THIS RING ✦</motion.p>

              {/* Ring centered between couple using flex row */}
              <div className="inline-flex items-center gap-3 md:gap-4 whitespace-nowrap">
                <motion.span className="text-5xl md:text-7xl select-none" style={{ display: 'inline-block' }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >🤵</motion.span>

                <motion.span className="text-4xl md:text-5xl select-none"
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
                  style={{ filter: 'drop-shadow(0 0 18px rgba(251,191,36,1)) drop-shadow(0 0 40px rgba(251,191,36,0.7))' }}
                >💍</motion.span>

                <motion.span className="text-5xl md:text-7xl select-none" style={{ display: 'inline-block' }}
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >💃</motion.span>
              </div>

              <motion.h2 className="text-3xl md:text-5xl font-black text-center"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif', textShadow: '0 0 30px rgba(251,191,36,0.95), 0 0 60px rgba(251,191,36,0.5)' }}
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, type: 'spring', stiffness: 200, damping: 18 }}
              >I DO ♾</motion.h2>

              <motion.p className="text-sm md:text-base tracking-[0.35em] uppercase font-semibold"
                style={{ color: '#fda4af' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7 }}
              >A PERFECT CIRCLE OF LOVE</motion.p>
            </div>

            {/* Golden sparkle motes */}
            {[...Array(isMobile ? 6 : 10)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ left: `${35 + (i*5.7)%30}%`, top: `${30 + (i*4.1)%40}%`, width: 3, height: 3, background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.9)' }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 1.5, delay: 0.8 + i*0.2, repeat: 2, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          SPARKLE — Explosion of light
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'sparkle' && (
          <motion.div key="sparkle" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* White flash */}
            <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ background: '#ffffff' }}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />

            {/* Sparkle burst */}
            {sparkles.map((s, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: s.color, boxShadow: `0 0 ${s.size*3}px ${s.color}, 0 0 ${s.size*7}px ${s.color}55`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.9, 0], opacity: [0, 1, 0] }}
                transition={{ duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Floating hearts */}
            {sparkleHearts.map((h, i) => (
              <motion.span key={i} className="absolute text-2xl pointer-events-none select-none"
                style={{ left: `${h.x}%`, bottom: '22%' }}
                animate={{ y: [0, -130], opacity: [0, 1, 0] }}
                transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
              >❤️</motion.span>
            ))}

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              {/* Couple with ring CENTERED in flex row */}
              <div className="inline-flex items-center gap-3 md:gap-4 whitespace-nowrap">
                <span className="text-5xl md:text-7xl select-none">🤵</span>
                <motion.span className="text-3xl md:text-5xl select-none"
                  initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.65, type: 'spring', stiffness: 320, damping: 14 }}
                  style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.95))' }}
                >💍</motion.span>
                <span className="text-5xl md:text-7xl select-none">💃</span>
              </div>

              <motion.h2 className="text-3xl md:text-5xl font-bold text-center px-4 mt-2"
                style={{ color: '#fbbf24', fontFamily: 'Georgia, serif', letterSpacing: '0.05em', textShadow: '0 0 22px rgba(251,191,36,1), 0 0 55px rgba(251,191,36,0.7), 0 0 110px rgba(251,191,36,0.4)' }}
                initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 18 }}
              >LOVE ETERNAL ✨</motion.h2>

              <motion.p className="text-lg md:text-2xl font-bold tracking-widest"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif', textShadow: '0 0 18px rgba(251,191,36,0.8)' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >LOVE IS FOREVER ♾</motion.p>

              <motion.span className="text-5xl select-none"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, y: [0, -20, 0] }}
                transition={{ delay: 0.45, duration: 0.65, ease: 'easeInOut' }}
              >🥂</motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          RADIANCE — Grand Finale
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div key="radiance" className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Viewport-fill glow — no scale/width animation */}
            <motion.div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.32) 0%, rgba(124,45,18,0.18) 42%, transparent 72%)', filter: isMobile ? 'blur(15px)' : 'blur(28px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />

            {/* Volumetric beams */}
            {beams.map((b, i) => (
              <motion.div key={i} className="absolute pointer-events-none"
                style={{ top: 0, left: '50%', width: b.width, height: '58%', background: 'linear-gradient(to bottom, rgba(251,191,36,0.62) 0%, rgba(251,191,36,0.16) 60%, transparent 100%)', transformOrigin: 'top center', transform: `translateX(-50%) rotate(${b.angle}deg)`, filter: 'blur(3px)' }}
                initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 0.78 }}
                transition={{ duration: 1.1, delay: b.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Rose petals */}
            {radiancePetals.map((p, i) => (
              <motion.span key={i} className="absolute text-2xl pointer-events-none select-none"
                style={{ left: `${p.x}%`, top: `${p.y}%`, rotate: p.rotate }}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: p.delay, duration: 0.6, ease: 'easeOut' }}
              >🌹</motion.span>
            ))}

            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center z-10">
              {/* Couple with ring CENTERED between them */}
              <div className="inline-flex items-center gap-3 md:gap-5 whitespace-nowrap">
                <motion.span className="text-5xl md:text-7xl select-none" style={{ display: 'inline-block' }}
                  animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >🤵</motion.span>

                <motion.span className="text-4xl md:text-5xl select-none"
                  initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 15 }}
                  style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,1))' }}
                >💍</motion.span>

                <motion.span className="text-5xl md:text-7xl select-none" style={{ display: 'inline-block' }}
                  animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >💃</motion.span>
              </div>

              <motion.h2 className="text-3xl md:text-5xl font-black text-center px-4 mt-1"
                style={{ background: 'linear-gradient(90deg, #fbbf24, #fda4af, #fb7185, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.6))' }}
                initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 18 }}
              >💍 LOVE ETERNAL 💍</motion.h2>

              <motion.p className="text-sm md:text-base italic tracking-[0.3em]"
                style={{ color: '#fde68a', fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >— forever waltzing —</motion.p>
            </div>

            {/* Firework clusters */}
            {fwPositions.map((pos, pi) => (
              <React.Fragment key={pi}>
                {fwSparks[pi].map((s, si) => (
                  <motion.div key={si} className="absolute rounded-full z-50"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {fwRings[pi].map((r, ri) => (
                  <div key={ri} className="absolute rounded-full border-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20, borderColor: r.color, animation: `gw-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div className="absolute rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40, background: `radial-gradient(circle, ${gwColors[pi % gwColors.length]}cc, transparent)`, filter: 'blur(8px)', animation: 'gw-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}

            {/* Rising orbs */}
            {orbs.map((orb, i) => (
              <div key={i} className="absolute rounded-full"
                style={{ left: `${orb.x}%`, bottom: '20%', width: 10, height: 10, background: orb.color, boxShadow: `0 0 14px ${orb.color}`, '--dx': `${orb.dx}px`, animation: `gw-orb-float ${orb.dur}s ease-out ${orb.delay}s both` } as React.CSSProperties}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gw-pop-ring {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.5); opacity: 0; }
        }
        @keyframes gw-flash {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3.2); opacity: 0; }
        }
        @keyframes gw-orb-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-190px) translateX(var(--dx)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
