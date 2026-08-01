/**
 * Gratitude - Garden of Gratitude Ceremony
 *
 * LAYOUT RULE: every flower uses a plain (non-motion) outer div for all CSS
 * positioning so Framer Motion never overrides translateX(-50%).
 * Only the inner visual children are motion.divs.
 *
 * All flowers at bottom: 24px (grass line).  Depth = SIZE only.
 * Stem: fixed-height wrapper + scaleY reveal from bottom (GPU, no reflow).
 * Flower head: always at correct position, springs in with scale 0→1.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface GratitudeGardenCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Flower {
  id: number;
  leftPct: number;
  emoji: string;
  color: string;
  fontSize: number;   // rem
  stemHeight: number; // px
  stemWidth: number;  // px
  zIndex: number;
  delay: number;
  swayDelay: number;
}

interface Creature {
  id: number;
  leftPct: number;
  bottomPct: number;
  emoji: string;
  scale: number;
  flap: boolean;
  delay: number;
  driftX: number;
  driftY: number;
  duration: number;
}

interface Petal {
  id: number;
  startX: number;
  startY: number;
  spiralAngle: number;
  spiralRadius: number;
  color: string;
  delay: number;
  size: number;
}

const GRASS_Y = 24; // px from screen bottom — all stems root here

export function GratitudeGardenCeremony({
  isVisible: _isVisible,
  onComplete,
}: GratitudeGardenCeremonyProps) {
  const [stage, setStage] = useState<
    'intro' | 'seeds' | 'sprout' | 'bloom' | 'butterflies' | 'wind' | 'heart' | 'radiance'
  >('intro');
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const tl = [
      { t: 0,     fn: () => setStage('intro') },
      { t: 1500,  fn: () => setStage('seeds') },
      { t: 2500,  fn: () => setStage('sprout') },
      { t: 4500,  fn: () => setStage('bloom') },
      { t: 7500,  fn: () => setStage('butterflies') },
      { t: 9500,  fn: () => setStage('wind') },
      { t: 12000, fn: () => setStage('heart') },
      { t: 14000, fn: () => setStage('radiance') },
      { t: 16000, fn: () => onComplete?.() },
    ];
    const handles = tl.map(({ t, fn }) => setTimeout(fn, t));
    const failsafe = setTimeout(() => { onComplete?.(); }, 17000);
    return () => { handles.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  // ─── Flowers ─────────────────────────────────────────────────────────────
  const flowers = useMemo((): Flower[] => {
    const types = [
      { emoji: '🌹', color: '#EF4444' },
      { emoji: '🌻', color: '#FBBF24' },
      { emoji: '🌷', color: '#F472B6' },
      { emoji: '🌼', color: '#FDE047' },
      { emoji: '🌺', color: '#FB7185' },
      { emoji: '🏵️', color: '#F59E0B' },
      { emoji: '🪷', color: '#F0ABFC' },
      { emoji: '🌸', color: '#FCA5A5' },
      { emoji: '💐', color: '#EC4899' },
      { emoji: '💮', color: '#FCD34D' },
    ];

    const count = isMobile ? 30 : 50;

    // Group flowers into natural clusters of 5 (one per depth tier).
    // Each group has a center x; the 5 members spread ±14% around it.
    const flowers: Flower[] = [];
    for (let i = 0; i < count; i++) {
      const groupIdx = Math.floor(i / 5);
      const posInGroup = i % 5;
      const depth = posInGroup; // 0 = front/big … 4 = back/small

      // Group centers spread across full width using golden-ratio step
      const groupCenter = 8 + (groupIdx * 38.2) % 84;
      // Member x within ±13% of group center
      const memberOffset = (posInGroup - 2) * 5.8;
      const leftPct = Math.max(3, Math.min(96, groupCenter + memberOffset));

      // Size: front big, back small
      const fontSize   = 2.7 - depth * 0.46;     // 2.7 → 0.86 rem
      const stemHeight = Math.round(90 - depth * 16); // 90 → 26 px
      const stemWidth  = Math.max(2, Math.round(fontSize * 0.7));

      flowers.push({
        id: i,
        leftPct,
        emoji: types[i % types.length].emoji,
        color: types[i % types.length].color,
        fontSize,
        stemHeight,
        stemWidth,
        zIndex: 26 - depth * 2,
        delay: i * 0.05,
        swayDelay: (i % 7) * 0.5,
      });
    }
    return flowers;
  }, [isMobile]);

  // ─── Seeds ───────────────────────────────────────────────────────────────
  const seeds = useMemo(() =>
    flowers
      .filter((_, i) => i % 2 === 0)
      .map((f, i) => ({ id: i, leftPct: f.leftPct, delay: i * 0.055 }))
  , [flowers]);

  // ─── Butterflies & bees ──────────────────────────────────────────────────
  const creatures = useMemo((): Creature[] => {
    const count = isMobile ? 8 : 14;
    const types = [
      { emoji: '🦋', flap: true,  dxM: 1.0, dur: 5.5 },
      { emoji: '🦋', flap: true,  dxM: 0.8, dur: 6.0 },
      { emoji: '🐝', flap: false, dxM: 0.3, dur: 2.2 },
      { emoji: '🦋', flap: true,  dxM: 1.2, dur: 5.0 },
      { emoji: '🦋', flap: true,  dxM: 0.9, dur: 6.5 },
      { emoji: '🐝', flap: false, dxM: 0.25,dur: 2.4 },
      { emoji: '🦋', flap: true,  dxM: 1.1, dur: 5.8 },
      { emoji: '🐝', flap: false, dxM: 0.35,dur: 2.0 },
      { emoji: '🦋', flap: true,  dxM: 1.0, dur: 5.2 },
      { emoji: '🦋', flap: true,  dxM: 0.7, dur: 6.2 },
      { emoji: '🐝', flap: false, dxM: 0.28,dur: 2.6 },
      { emoji: '🦋', flap: true,  dxM: 1.15,dur: 5.4 },
      { emoji: '🦋', flap: true,  dxM: 0.85,dur: 6.8 },
      { emoji: '🦋', flap: true,  dxM: 1.0, dur: 5.6 },
    ];
    return Array.from({ length: count }, (_, i) => {
      const t = types[i % types.length];
      return {
        id: i,
        leftPct: 5 + (i * 7.3 + (i % 3) * 14) % 88,
        bottomPct: 14 + (i * 5.7 + (i % 4) * 7) % 32,
        emoji: t.emoji,
        scale: 0.85 + (i % 4) * 0.08,
        flap: t.flap,
        delay: i * 0.22,
        driftX: ((i % 5) - 2) * 60 * t.dxM + (i % 3) * 18,
        driftY: 30 + (i % 4) * 12,
        duration: t.dur,
      };
    });
  }, [isMobile]);

  // ─── Petals ───────────────────────────────────────────────────────────────
  const petals = useMemo((): Petal[] => {
    const colors = ['#EF4444', '#F59E0B', '#FBBF24', '#FB923C', '#F472B6', '#FB7185'];
    const count = isMobile ? 20 : 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      startX: ((i * 7.7) % 80 - 40) * 2.8,
      startY: 150 + (i % 5) * 22,
      spiralAngle: (i / count) * Math.PI * 2 * 2.5,
      spiralRadius: (i / count) * 200,
      color: colors[i % colors.length],
      delay: i * 0.04,
      size: 0.9 + (i % 4) * 0.1,
    }));
  }, [isMobile]);

  // ─── Firework / radiance data ─────────────────────────────────────────────
  const ggColors = useMemo(
    () => ['#22c55e', '#fbbf24', '#fb923c', '#10b981', '#ffffff', '#86efac', '#f9a8d4'],
    []
  );
  const ggFwPositions = useMemo(
    () =>
      [
        { x: 10, y: 18 }, { x: 26, y: 10 }, { x: 42, y: 20 }, { x: 58, y: 8 },
        { x: 74, y: 18 }, { x: 88, y: 12 }, { x: 18, y: 34 }, { x: 82, y: 28 },
      ].slice(0, isMobile ? 5 : 8),
    [isMobile]
  );
  const ggFwSparks = useMemo(
    () =>
      ggFwPositions.map(() =>
        Array.from({ length: isMobile ? 14 : 20 }, (_, i) => {
          const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
          const d = 50 + (i % 5) * 20;
          return { x: Math.cos(a) * d, y: Math.sin(a) * d, color: ggColors[i % ggColors.length], delay: i * 0.04 };
        })
      ),
    [ggFwPositions, ggColors, isMobile]
  );
  const ggFwRings = useMemo(
    () =>
      ggFwPositions.map(() =>
        Array.from({ length: 3 }, (_, i) => ({
          delay: i * 0.15,
          color: ['#22c55e', '#fbbf24', '#86efac'][i],
        }))
      ),
    [ggFwPositions]
  );
  const ggOrbs = useMemo(
    () =>
      Array.from({ length: isMobile ? 10 : 18 }, (_, i) => ({
        x: 5 + (i * 5.5) % 90,
        dx: (i % 7 - 3) * 18,
        dur: 2.5 + (i % 4) * 0.5,
        delay: i * 0.18,
        color: ggColors[i % ggColors.length],
      })),
    [ggColors, isMobile]
  );
  const backgroundStars = useMemo(() => {
    const count = isMobile ? 20 : 40;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: (i * 17.3) % 100,
      top: (i * 13.1) % 60,
      size: 1 + (i % 3) * 0.75,
      delay: (i % 7) * 0.43,
      duration: 2.5 + (i % 4) * 0.5,
    }));
  }, [isMobile]);

  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#22c55e', '#fbbf24', '#fb923c', '#10b981', '#ffffff', '#86efac'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60,  origin: { x: isMobile ? 0.12 : 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60,  origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  const showFlowers  = stage === 'sprout' || stage === 'bloom' || stage === 'butterflies' || stage === 'wind' || stage === 'heart';
  const showCreature = stage === 'butterflies' || stage === 'wind';
  const showPetals   = stage === 'wind' || stage === 'heart';

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#060f08] via-[#0c1c10] to-[#152a18]">

      <style>{`
        @keyframes gg-pop-ring {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes gg-flash {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes gg-orb-float {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes gg-twinkle {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        @keyframes gg-sway {
          0%, 100% { transform: rotate(0deg); }
          25%       { transform: rotate(2.5deg); }
          75%       { transform: rotate(-2.5deg); }
        }
        @keyframes gg-flap {
          0%, 100% { transform: scaleX(1)    scaleY(1); }
          50%       { transform: scaleX(0.78) scaleY(1.12); }
        }
        @keyframes gg-bee {
          0%, 100% { transform: translateY(0)    translateX(0); }
          33%       { transform: translateY(-6px) translateX(4px); }
          66%       { transform: translateY(-3px) translateX(-4px); }
        }
        @keyframes gg-ray {
          0%   { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .gg-twinkle { animation: gg-twinkle ease-in-out infinite; }
        .gg-sway    { animation: gg-sway 4s ease-in-out infinite; display: block; }
        .gg-flap    { animation: gg-flap 0.28s ease-in-out infinite; }
        .gg-bee     { animation: gg-bee  1.4s ease-in-out infinite; }
        .gg-ray     { animation: gg-ray  1.2s ease-out forwards; }
      `}</style>

      {/* Sky gradient */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-[3000ms]"
        style={{
          opacity: stage === 'bloom' || stage === 'butterflies' || stage === 'wind' ? 0.78 : 0.35,
          background: 'radial-gradient(ellipse at 50% 18%, rgba(251,191,36,0.48) 0%, rgba(251,146,60,0.22) 38%, rgba(34,197,94,0.1) 68%, transparent 100%)',
          filter: isMobile ? 'blur(30px)' : 'blur(80px)',
        }}
      />

      {/* Morning mist */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none transition-opacity duration-[4000ms]"
        style={{
          height: '22%',
          opacity: stage === 'bloom' || stage === 'butterflies' ? 0.5 : 0,
          background: 'linear-gradient(to top, rgba(200,240,210,0.18) 0%, rgba(180,230,195,0.08) 60%, transparent 100%)',
          filter: isMobile ? 'blur(10px)' : 'blur(18px)',
        }}
      />

      {/* Ground */}
      <AnimatePresence>
        {stage !== 'intro' && (
          <motion.div className="absolute bottom-0 left-0 right-0 h-1/2"
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ background: 'linear-gradient(180deg, rgba(30,14,4,0) 0%, rgba(42,20,6,0.55) 22%, rgba(34,16,4,0.88) 58%, rgba(22,10,2,0.97) 100%)' }}
          />
        )}
      </AnimatePresence>

      {/* Grass strip — rendered ABOVE flowers so stems disappear into it */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: GRASS_Y + 10,
          background: 'linear-gradient(to top, #0f3d22 0%, #136130 55%, #18783a 85%, transparent 100%)',
          opacity: stage === 'intro' ? 0 : 0.97,
          transition: 'opacity 1.5s ease',
          zIndex: 35,
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundStars.map(s => (
          <div key={`s${s.id}`} className="absolute rounded-full bg-amber-200 gg-twinkle"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
          />
        ))}
      </div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-green-200 drop-shadow-2xl px-6">
              Garden of Gratitude
            </h1>
            <p className="text-green-300/80 mt-3 text-base">Where appreciation blooms eternal</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Seeds ─────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {(stage === 'seeds' || stage === 'sprout') && seeds.map(seed => (
          <motion.div key={`seed-${seed.id}`}
            style={{ position: 'absolute', left: `${seed.leftPct}%`, bottom: GRASS_Y, zIndex: 20, transform: 'translateX(-50%)' }}
            initial={{ y: -640, scale: 0, opacity: 0 }}
            animate={{
              y:       stage === 'sprout' ? 30  : 0,
              scale:   stage === 'sprout' ? 0   : 1,
              opacity: stage === 'sprout' ? 0   : [0, 1, 1],
            }}
            transition={{ delay: seed.delay, duration: stage === 'sprout' ? 0.3 : 1.1, ease: 'easeOut' }}
          >
            <div className="rounded-full" style={{
              width: 5, height: 5,
              background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(180,83,9,1) 100%)',
              boxShadow: '0 0 8px rgba(251,191,36,0.9)',
            }} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Flowers ───────────────────────────────────────────────────────────
        CRITICAL: outer div is a PLAIN div (not motion.div).
        This ensures CSS transform: translateX(-50%) is NEVER overridden by
        Framer Motion. Only inner children are motion.divs.

        Layout (flex-column, bottom-anchored):
          [flower head]   ← top of flex container
          [stem wrapper]  ← bottom of flex container, touches grass at bottom: GRASS_Y
      ─────────────────────────────────────────────────────────────────────── */}
      {showFlowers && flowers.map(f => (
        <div
          key={`fl-${f.id}`}
          style={{
            position: 'absolute',
            left: `${f.leftPct}%`,
            bottom: GRASS_Y,
            zIndex: f.zIndex,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Flower head — springs in from scale 0 */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: stage === 'heart' ? 0 : 1 }}
            transition={{
              scale:   { delay: f.delay + 0.3, type: 'spring', stiffness: 220, damping: 14 },
              opacity: { delay: f.delay + 0.3, duration: 0.35 },
            }}
          >
            <div
              className="gg-sway"
              style={{
                fontSize: `${f.fontSize}rem`,
                filter: `drop-shadow(0 3px 8px ${f.color}80)`,
                animationDelay: `${f.swayDelay}s`,
                lineHeight: 1,
              }}
            >
              {f.emoji}
            </div>

            {/* Bloom sparkle */}
            {stage === 'bloom' && (
              <motion.div
                style={{ position: 'absolute', top: -4, right: -4, fontSize: `${Math.max(0.55, f.fontSize * 0.42)}rem`, pointerEvents: 'none' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                transition={{ delay: f.delay + 0.9, duration: 1.6 }}
              >✨</motion.div>
            )}
          </motion.div>

          {/* Stem — fixed-height wrapper + scaleY reveal from bottom */}
          <div style={{ width: f.stemWidth, height: f.stemHeight, overflow: 'hidden', flexShrink: 0 }}>
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(to top, #0f4923, #166534 55%, #1a7a3c 100%)`,
                borderRadius: 2,
                transformOrigin: 'bottom center',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: stage === 'heart' ? 0 : 1 }}
              transition={{ delay: f.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}

      {/* ── Butterflies & bees ────────────────────────────────────────────────── */}
      {showCreature && creatures.map(c => (
        <motion.div key={`cr-${c.id}`}
          style={{ position: 'absolute', left: `${c.leftPct}%`, bottom: `${c.bottomPct}%`, zIndex: 28 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={stage === 'wind' ? { scale: 0, opacity: 0, y: -120 } : { scale: c.scale, opacity: 1 }}
          transition={{ delay: c.delay, duration: 0.9 }}
        >
          <motion.div
            animate={c.flap ? {
              x: [0, c.driftX * 0.5, c.driftX, c.driftX * 0.4, 0, -c.driftX * 0.3, 0],
              y: [0, -c.driftY * 0.3, -c.driftY, -c.driftY * 0.6, -c.driftY * 0.15, -c.driftY * 0.4, 0],
              rotate: [0, 5, -4, 8, 0, -5, 0],
            } : {
              x: [0, c.driftX * 0.5, 0, -c.driftX * 0.3, 0],
              y: [0, -c.driftY * 0.4, -c.driftY * 0.2, -c.driftY * 0.5, 0],
            }}
            transition={{ duration: c.duration, repeat: Infinity, ease: 'easeInOut', delay: c.delay * 0.5 }}
          >
            <div className={c.flap ? 'gg-flap' : 'gg-bee'} style={{ fontSize: `${c.scale * 1.8}rem` }}>
              {c.emoji}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Petals / heart / radiance — centered overlay ──────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>

        {/* Petals */}
        <AnimatePresence>
          {showPetals && petals.map(p => {
            const sx = Math.cos(p.spiralAngle) * p.spiralRadius;
            const sy = Math.sin(p.spiralAngle) * p.spiralRadius - 100;
            return (
              <motion.div key={`pt-${p.id}`} className="absolute"
                initial={{ x: p.startX, y: p.startY, scale: 0, opacity: 0, rotate: 0 }}
                animate={stage === 'wind'
                  ? { x: sx, y: sy, scale: p.size * 1.5, opacity: 0.95, rotate: 720 }
                  : { x: 0,  y: -80, scale: p.size * 1.8, opacity: 1,    rotate: 720 }}
                transition={{ delay: p.delay, duration: stage === 'wind' ? 2 : 1.5, ease: 'easeOut' }}
              >
                <div className="rounded-full" style={{
                  width: 8 * p.size, height: 8 * p.size,
                  background: `radial-gradient(circle, ${p.color} 0%, ${p.color}DD 100%)`,
                  boxShadow: `0 0 10px ${p.color}B0`,
                }} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Heart */}
        <AnimatePresence>
          {stage === 'heart' && (
            <>
              {Array.from({ length: 15 }, (_, i) => {
                const t = (i / 15) * Math.PI * 2;
                const s = 50;
                const hx = s * 16 * Math.pow(Math.sin(t), 3);
                const hy = -s * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
                return (
                  <motion.div key={`hp-${i}`} className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: hx, y: hy - 80, scale: 1.5, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 1.2, ease: 'easeOut' }}
                  >
                    <div className="rounded-full" style={{ width: 6, height: 6, background: '#EF4444', boxShadow: '0 0 12px #EF4444' }} />
                  </motion.div>
                );
              })}

              <motion.div className="absolute text-[10rem] md:text-[12rem]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1.25], opacity: 1, y: -80 }}
                transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 60px rgba(34,197,94,1)) drop-shadow(0 0 120px rgba(34,197,94,0.5))' }}
              >💚</motion.div>

              {['🌸', '🌿', '🌼', '🍀', '🌺', '✨'].map((emoji, i) => {
                const a = (i / 6) * Math.PI * 2;
                const r = isMobile ? 130 : 175;
                return (
                  <motion.div key={`orb-${i}`} className="absolute text-2xl md:text-3xl"
                    initial={{ x: 0, y: -80, scale: 0, opacity: 0 }}
                    animate={{ x: Math.cos(a) * r, y: Math.sin(a) * r - 80, scale: 1, opacity: 0.9 }}
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.9, ease: 'easeOut' }}
                  >{emoji}</motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Radiance */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={`ray-${i}`} className="absolute gg-ray"
                  style={{
                    left: '50%', top: '50%',
                    width: '120vw', height: 4,
                    marginLeft: '-60vw', marginTop: -2,
                    background: 'linear-gradient(to right, transparent, rgba(34,197,94,0.8) 50%, transparent)',
                    transformOrigin: 'center',
                    transform: `rotate(${(i / 12) * 360}deg)`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ))}

              <motion.div className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 0.88 }} transition={{ duration: 1.5 }}
                style={{ background: 'radial-gradient(circle at 50% 55%, rgba(255,255,255,0.9) 0%, rgba(34,197,94,0.68) 20%, rgba(22,163,74,0.38) 48%, transparent 74%)' }}
              />

              {Array.from({ length: 8 }, (_, i) => {
                const a = (i / 8) * Math.PI * 2;
                const d = isMobile ? 110 : 150;
                return (
                  <motion.div key={`sp-${i}`} className="absolute text-2xl md:text-3xl"
                    initial={{ x: 0, y: -80, scale: 0, opacity: 0 }}
                    animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d - 80, scale: 1.3, opacity: 0.9 }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                  >✨</motion.div>
                );
              })}

              {['🌸', '🌺', '🌻', '🌷', '🌹', '💐'].map((emoji, i) => {
                const a = (i / 6) * Math.PI * 2;
                const d = isMobile ? 155 : 200;
                return (
                  <motion.div key={`fr-${i}`} className="absolute text-3xl md:text-4xl"
                    initial={{ x: 0, y: -80, scale: 0, opacity: 0 }}
                    animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d - 80, scale: 1.2, opacity: 0.9 }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.12 }}
                  >{emoji}</motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

      </div>

      {/* Firework clusters */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {ggFwPositions.map((pos, pi) => (
              <React.Fragment key={`fw-${pi}`}>
                {ggFwSparks[pi].map((s, si) => (
                  <motion.div key={`sp-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {ggFwRings[pi].map((r, ri) => (
                  <div key={`rg-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20, borderColor: r.color, animation: `gg-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div className="absolute rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${ggColors[pi % ggColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'gg-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {ggOrbs.map((orb, i) => (
              <div key={`orb-${i}`} className="absolute rounded-full z-49"
                style={{ left: `${orb.x}%`, bottom: '20%', width: 10, height: 10,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `gg-orb-float ${orb.dur}s ease-out ${orb.delay}s both`,
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40 px-4"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-3"
              style={{ background: 'linear-gradient(90deg,#4ade80,#fbbf24,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 20px rgba(34,197,94,0.7))' }}>
              🌸 Garden of Gratitude 🌸
            </h2>
            <p className="text-lg md:text-xl text-green-100/90 drop-shadow-lg italic">
              Every bloom a heartfelt thank you, carried on the morning breeze ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
