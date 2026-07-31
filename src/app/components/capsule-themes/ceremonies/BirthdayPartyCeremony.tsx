/**
 * Birthday - Balloon Celebration Ceremony
 *
 * Balloons float up, sway, then each one EXPLODES with:
 *   - white flash burst
 *   - 3 expanding shockwave rings
 *   - 18 colored sparkle shards radiating outward
 *   - 6 rubber debris chunks tumbling away
 *   - 4 glowing orbs drifting up
 *   - canvas-confetti burst at balloon position
 * Followed by a firework radiance finale.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface BirthdayPartyCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const CSS = `
@keyframes balloon-sway-a {
  0%,100% { transform: rotate(-6deg) translateX(-6px); }
  50%      { transform: rotate(6deg)  translateX(6px);  }
}
@keyframes balloon-sway-b {
  0%,100% { transform: rotate(5deg)  translateX(5px);  }
  50%      { transform: rotate(-5deg) translateX(-5px); }
}
@keyframes balloon-sway-c {
  0%,100% { transform: rotate(-4deg) translateX(-4px); }
  50%      { transform: rotate(7deg)  translateX(7px);  }
}
@keyframes pop-ring {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.9; }
  60%  { opacity: 0.55; }
  100% { transform: translate(-50%,-50%) scale(3.8); opacity: 0; }
}
@keyframes pop-flash {
  0%   { opacity: 1;   transform: translate(-50%,-50%) scale(0); }
  35%  { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
  100% { opacity: 0;   transform: translate(-50%,-50%) scale(2.2); }
}
@keyframes orbit-ring-spin {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes radiance-pulse {
  0%,100% { opacity: 0.88; transform: translate(-50%,-50%) scale(1); }
  50%      { opacity: 1;    transform: translate(-50%,-50%) scale(1.04); }
}
@keyframes debris-spin {
  from { transform: rotate(0deg);   }
  to   { transform: rotate(540deg); }
}
`;

const BALLOON_COLORS = [
  { main: '#ef4444', light: '#fca5a5', dark: '#dc2626', shadow: 'rgba(239,68,68,0.6)',  confetti: ['#ef4444','#fca5a5','#b91c1c'] },
  { main: '#f59e0b', light: '#fcd34d', dark: '#d97706', shadow: 'rgba(245,158,11,0.6)', confetti: ['#f59e0b','#fcd34d','#78350f'] },
  { main: '#22c55e', light: '#86efac', dark: '#16a34a', shadow: 'rgba(34,197,94,0.6)',  confetti: ['#22c55e','#86efac','#14532d'] },
  { main: '#3b82f6', light: '#93c5fd', dark: '#2563eb', shadow: 'rgba(59,130,246,0.6)', confetti: ['#3b82f6','#93c5fd','#1e3a8a'] },
  { main: '#a855f7', light: '#d8b4fe', dark: '#9333ea', shadow: 'rgba(168,85,247,0.6)', confetti: ['#a855f7','#d8b4fe','#581c87'] },
  { main: '#ec4899', light: '#f9a8d4', dark: '#db2777', shadow: 'rgba(236,72,153,0.6)', confetti: ['#ec4899','#f9a8d4','#831843'] },
  { main: '#eab308', light: '#fde047', dark: '#ca8a04', shadow: 'rgba(234,179,8,0.6)',  confetti: ['#eab308','#fde047','#713f12'] },
];

const SWAY_ANIMS = ['balloon-sway-a', 'balloon-sway-b', 'balloon-sway-c'];

function BalloonShape({ color, size = 80 }: { color: typeof BALLOON_COLORS[0]; size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.18 }}>
      <div style={{
        position: 'absolute', top: '18%', left: '26%',
        width: size * 0.38, height: size * 0.44,
        background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.28) 50%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(3px)',
      }} />
      <div style={{
        width: size, height: size * 1.18,
        background: `radial-gradient(ellipse at 35% 35%, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        boxShadow: `0 6px 26px ${color.shadow}, inset -8px -8px 18px rgba(0,0,0,0.18)`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', bottom: '-10px', left: '50%',
          transform: 'translateX(-50%)',
          width: 14, height: 10,
          background: color.dark, borderRadius: '50%',
          boxShadow: `0 2px 5px ${color.shadow}`,
        }} />
      </div>
      <div style={{
        position: 'absolute', bottom: '-78px', left: '50%',
        transform: 'translateX(-50%)',
        width: 2, height: 75,
        background: `linear-gradient(to bottom, ${color.dark}, rgba(255,255,255,0.2))`,
      }} />
    </div>
  );
}

// ── Pop effect data ────────────────────────────────────────────────────────────

// 3 shockwave rings per balloon, each with a size + delay offset
function buildRings(b: { xPos: number; floatHeight: number; colorIdx: number }) {
  return [0, 1, 2].map((ri) => ({
    left: `${b.xPos}%`,
    bottom: b.floatHeight * 0.85,
    colorIdx: b.colorIdx,
    size: 60 + ri * 28,
    borderWidth: Math.max(1, 2.5 - ri * 0.6),
    delay: ri * 0.12,
  }));
}

// 18 sparkle shards radiating out (elongated streaks + round glows mixed)
function buildSparks(b: { xPos: number; floatHeight: number; colorIdx: number }, popDelay: number) {
  const COUNT = isMobile ? 10 : 18;
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * Math.PI * 2;
    const dist = 55 + (i % 4) * 28;
    return {
      xCenter: (b.xPos - 50) * 6,
      yCenter: -(b.floatHeight * 0.85),
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      colorIdx: b.colorIdx,
      isLong: i % 3 !== 0,
      size: i % 3 === 0 ? 10 + (i % 4) * 3 : 14 + (i % 3) * 5,
      delay: popDelay + i * 0.018,
    };
  });
}

// 6 rubber debris chunks that tumble and fall
function buildDebris(b: { xPos: number; floatHeight: number; colorIdx: number }, popDelay: number) {
  const COUNT = isMobile ? 4 : 7;
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * Math.PI * 2 + 0.3;
    const speed = 45 + (i % 4) * 22;
    return {
      xCenter: (b.xPos - 50) * 6,
      yCenter: -(b.floatHeight * 0.85),
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed - 20,
      colorIdx: b.colorIdx,
      w: 8 + (i % 3) * 5,
      h: 5 + (i % 2) * 4,
      delay: popDelay + 0.04 + i * 0.03,
    };
  });
}

// 4 glowing orbs that float upward
function buildOrbs(b: { xPos: number; floatHeight: number; colorIdx: number }, popDelay: number) {
  return [0, 1, 2, 3].map((i) => ({
    xCenter: (b.xPos - 50) * 6,
    yCenter: -(b.floatHeight * 0.85),
    driftX: (i % 2 === 0 ? 1 : -1) * (14 + i * 9),
    colorIdx: (b.colorIdx + i) % BALLOON_COLORS.length,
    size: 14 + (i % 3) * 7,
    delay: popDelay + i * 0.1,
  }));
}

export function BirthdayPartyCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete,
}: BirthdayPartyCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'float1' | 'float2' | 'bounce' | 'pop' | 'radiance' | 'outro'>('intro');

  // ── Timeline ──
  useEffect(() => {
    const T = [
      { time: 0,     action: () => setStage('intro') },
      { time: 600,   action: () => setStage('float1') },
      { time: 2200,  action: () => setStage('float2') },
      { time: 4200,  action: () => setStage('bounce') },
      { time: 7200,  action: () => setStage('pop') },
      { time: 10800, action: () => setStage('radiance') },
      { time: 14500, action: () => setStage('outro') },
      { time: 15000, action: () => onComplete?.() },
    ];
    const ids = T.map(({ time, action }) => setTimeout(action, time));
    return () => ids.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fire canvas-confetti per balloon when pop stage starts ──
  useEffect(() => {
    if (stage !== 'pop') return;
    const allBalloons = [...wave1, ...wave2];
    const burstIds = allBalloons.map((b, i) =>
      setTimeout(() => {
        const col = BALLOON_COLORS[b.colorIdx];
        confetti({
          particleCount: isMobile ? 28 : 50,
          angle: 90,
          spread: 85,
          origin: { x: b.xPos / 100, y: 0.42 },
          colors: col.confetti,
          startVelocity: isMobile ? 30 : 42,
          gravity: 1.1,
          ticks: isMobile ? 120 : 180,
          shapes: ['square', 'circle'],
          scalar: isMobile ? 0.8 : 1,
        });
      }, i * 140)
    );
    return () => burstIds.forEach(clearTimeout);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Balloon data (all useMemo so Math.random is stable) ──
  const wave1 = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    xPos: 15 + i * 10,
    floatHeight: 340 + (i % 3) * 35,
    swayAnim: SWAY_ANIMS[i % 3],
    swayDuration: 2.8 + i * 0.25,
    delay: i * 0.14,
    colorIdx: i % BALLOON_COLORS.length,
  })), []);

  const wave2 = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    xPos: 20 + i * 10,
    floatHeight: 310 + (i % 2) * 40,
    swayAnim: SWAY_ANIMS[(i + 1) % 3],
    swayDuration: 3.1 + i * 0.2,
    delay: i * 0.12,
    colorIdx: (i + 3) % BALLOON_COLORS.length,
  })), []);

  // ── Pop effect data ──
  const allBalloons = useMemo(() => [...wave1, ...wave2], [wave1, wave2]);

  const allRings = useMemo(() =>
    allBalloons.flatMap((b) => buildRings(b)), [allBalloons]);

  const allSparks = useMemo(() =>
    allBalloons.flatMap((b, i) => buildSparks(b, i * 0.14)), [allBalloons]);

  const allDebris = useMemo(() =>
    allBalloons.flatMap((b, i) => buildDebris(b, i * 0.14)), [allBalloons]);

  const allOrbs = useMemo(() =>
    allBalloons.flatMap((b, i) => buildOrbs(b, i * 0.14 + 0.1)), [allBalloons]);

  // ── Radiance ──
  const rays = useMemo(() => Array.from({ length: isMobile ? 16 : 28 }, (_, i) => ({
    angle: (i / (isMobile ? 16 : 28)) * 360,
    height: [9, 5, 7, 6, 8][i % 5],
    colorIdx: i % BALLOON_COLORS.length,
  })), []);

  // Firework-style burst clusters in radiance
  const fireworkClusters = useMemo(() => {
    const positions = isMobile
      ? [{ x: 20, y: 25 }, { x: 80, y: 20 }, { x: 50, y: 12 }]
      : [{ x: 15, y: 22 }, { x: 85, y: 18 }, { x: 50, y: 10 }, { x: 30, y: 35 }, { x: 70, y: 30 }];
    return positions.map((pos, pi) =>
      Array.from({ length: isMobile ? 12 : 16 }, (_, i) => {
        const angle = (i / (isMobile ? 12 : 16)) * Math.PI * 2;
        const speed = 60 + (i % 4) * 22;
        return {
          px: pos.x, py: pos.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          colorIdx: (pi + i) % BALLOON_COLORS.length,
          size: 4 + (i % 4) * 2,
          delay: pi * 0.22 + i * 0.015,
        };
      })
    ).flat();
  }, []);

  const burstParticles = useMemo(() => Array.from({ length: isMobile ? 12 : 22 }, (_, i) => {
    const angle = (i / (isMobile ? 12 : 22)) * Math.PI * 2;
    const dist = 100 + (i % 4) * 52;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      colorIdx: i % BALLOON_COLORS.length,
      size: 10 + (i % 4) * 3,
      isCircle: i % 3 === 0,
      delay: i * 0.04,
    };
  }), []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0f0a1a] via-[#1a1028] to-[#0a0510]">
      <style>{CSS}</style>

      {/* Background bloom */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #5a3080 0%, #1a1028 50%, #0f0a1a 100%)'
            : stage === 'pop'
            ? 'radial-gradient(ellipse at 50% 50%, #2d1850 0%, #0f0a1a 70%, #050208 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #1a1028 0%, #0f0a1a 70%, #050208 100%)',
        }}
        transition={{ duration: 1.2 }}
      />

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-300 via-yellow-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
              Balloon Celebration
            </h1>
            <p className="text-purple-200/80 mt-3 text-base">Let's celebrate! 🎈</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">

        {/* ── Wave 1 balloons ── */}
        <AnimatePresence>
          {(stage === 'float1' || stage === 'float2' || stage === 'bounce') &&
            wave1.map((b, i) => (
              <motion.div
                key={`b1-${i}`}
                className="absolute z-30"
                style={{ left: `${b.xPos}%`, bottom: '-120px', transform: 'translateX(-50%)' }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ y: -b.floatHeight, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, y: -(b.floatHeight + 180) }}
                transition={{
                  y: { duration: 1.9, delay: b.delay, ease: 'easeOut' },
                  opacity: { duration: 0.55, delay: b.delay },
                  scale: { duration: 0.55, delay: b.delay },
                  exit: { duration: 0.5, delay: i * 0.05 },
                }}
              >
                <div style={{
                  animation: stage === 'bounce'
                    ? `${b.swayAnim} ${b.swayDuration}s ease-in-out infinite`
                    : undefined,
                  transformOrigin: 'bottom center',
                }}>
                  <BalloonShape color={BALLOON_COLORS[b.colorIdx]} />
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>

        {/* ── Wave 2 balloons ── */}
        <AnimatePresence>
          {(stage === 'float2' || stage === 'bounce') &&
            wave2.map((b, i) => (
              <motion.div
                key={`b2-${i}`}
                className="absolute"
                style={{ left: `${b.xPos}%`, bottom: '-120px', transform: 'translateX(-50%)', zIndex: 28 }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ y: -b.floatHeight, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, y: -(b.floatHeight + 180) }}
                transition={{
                  y: { duration: 1.7, delay: b.delay, ease: 'easeOut' },
                  opacity: { duration: 0.5, delay: b.delay },
                  scale: { duration: 0.5, delay: b.delay },
                  exit: { duration: 0.5, delay: 0.2 + i * 0.05 },
                }}
              >
                <div style={{
                  animation: stage === 'bounce'
                    ? `${b.swayAnim} ${b.swayDuration}s ease-in-out infinite`
                    : undefined,
                  transformOrigin: 'bottom center',
                }}>
                  <BalloonShape color={BALLOON_COLORS[b.colorIdx]} size={72} />
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>

        {/* ══ POP EFFECTS ══ */}
        <AnimatePresence>
          {stage === 'pop' && (
            <>
              {/* White flash per balloon */}
              {allBalloons.map((b, i) => (
                <div
                  key={`flash-${i}`}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: `${b.xPos}%`,
                    bottom: b.floatHeight * 0.82,
                    width: 80, height: 80,
                    background: `radial-gradient(circle, rgba(255,255,255,0.95) 0%, ${BALLOON_COLORS[b.colorIdx].light} 45%, transparent 75%)`,
                    animation: `pop-flash 0.55s ease-out ${i * 0.14}s forwards`,
                    opacity: 0,
                    filter: 'blur(2px)',
                  }}
                />
              ))}

              {/* 3 shockwave rings per balloon */}
              {allRings.map((r, i) => (
                <div
                  key={`ring-${i}`}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: r.left,
                    bottom: r.bottom,
                    width: r.size, height: r.size,
                    border: `${r.borderWidth}px solid ${BALLOON_COLORS[r.colorIdx].main}`,
                    boxShadow: `0 0 12px ${BALLOON_COLORS[r.colorIdx].shadow}, 0 0 24px ${BALLOON_COLORS[r.colorIdx].shadow}`,
                    animation: `pop-ring 0.75s cubic-bezier(0.2,0.8,0.3,1) ${r.delay + Math.floor(i / 3) * 0.14}s forwards`,
                    opacity: 0,
                  }}
                />
              ))}

              {/* Sparkle shards */}
              {allSparks.map((s, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ x: s.xCenter, y: s.yCenter, scale: 0, opacity: 0 }}
                  animate={{
                    x: s.xCenter + s.dx,
                    y: s.yCenter + s.dy,
                    scale: [0, 2, 1.5, 0],
                    opacity: [0, 1, 0.85, 0],
                  }}
                  transition={{ duration: 1.1, delay: s.delay, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  <div style={{
                    width: s.isLong ? `${s.size}px` : `${s.size * 0.7}px`,
                    height: s.isLong ? '3px' : `${s.size * 0.7}px`,
                    borderRadius: s.isLong ? '2px' : '50%',
                    background: s.isLong
                      ? `linear-gradient(90deg, transparent, ${BALLOON_COLORS[s.colorIdx].light}, ${BALLOON_COLORS[s.colorIdx].main}, transparent)`
                      : BALLOON_COLORS[s.colorIdx].main,
                    boxShadow: `0 0 ${s.isLong ? 6 : 10}px ${BALLOON_COLORS[s.colorIdx].shadow}`,
                    filter: 'brightness(1.2)',
                  }} />
                </motion.div>
              ))}

              {/* Rubber debris chunks (tumble as they fly) */}
              {allDebris.map((d, i) => (
                <motion.div
                  key={`debris-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ x: d.xCenter, y: d.yCenter, opacity: 0, scale: 0 }}
                  animate={{
                    x: [d.xCenter, d.xCenter + d.dx * 0.6, d.xCenter + d.dx],
                    y: [d.yCenter, d.yCenter + d.dy - 30, d.yCenter + d.dy + 80],
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.4, 1, 0],
                  }}
                  transition={{ duration: 1.4, delay: d.delay, ease: 'easeOut' }}
                >
                  <div style={{
                    width: d.w, height: d.h,
                    borderRadius: 3,
                    background: BALLOON_COLORS[d.colorIdx].main,
                    boxShadow: `0 0 5px ${BALLOON_COLORS[d.colorIdx].shadow}`,
                    animation: 'debris-spin 0.6s linear infinite',
                    transformOrigin: 'center center',
                  }} />
                </motion.div>
              ))}

              {/* Glowing orbs floating up */}
              {allOrbs.map((o, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none rounded-full"
                  style={{
                    width: o.size, height: o.size,
                    marginLeft: -o.size / 2,
                    marginTop: -o.size / 2,
                    background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, ${BALLOON_COLORS[o.colorIdx].light} 40%, ${BALLOON_COLORS[o.colorIdx].main} 70%, transparent 100%)`,
                    boxShadow: `0 0 ${o.size}px ${BALLOON_COLORS[o.colorIdx].shadow}`,
                    filter: 'blur(1px)',
                  }}
                  initial={{ x: o.xCenter, y: o.yCenter, scale: 0, opacity: 0 }}
                  animate={{
                    x: [o.xCenter, o.xCenter + o.driftX * 0.5, o.xCenter + o.driftX],
                    y: [o.yCenter, o.yCenter - 100, o.yCenter - 200],
                    scale: [0, 1.3, 0.8, 0],
                    opacity: [0, 0.95, 0.7, 0],
                  }}
                  transition={{ duration: 2.2, delay: o.delay, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* ══ RADIANCE FINALE ══ */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 28 rotating rays */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                {rays.map((r, i) => (
                  <div key={`ray-${i}`} style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    width: '200vw', height: `${r.height}px`,
                    marginLeft: '-100vw', marginTop: -r.height / 2,
                    background: `linear-gradient(to right, transparent, ${BALLOON_COLORS[r.colorIdx].main} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${r.angle}deg)`,
                    filter: 'blur(2px)',
                  }} />
                ))}
              </motion.div>

              {/* Radiant core bloom */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: '50%', top: '50%',
                  width: 440, height: 440,
                  marginLeft: -220, marginTop: -220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,230,138,0.9) 10%, rgba(134,239,172,0.82) 24%, rgba(147,197,253,0.78) 38%, rgba(216,180,254,0.7) 54%, rgba(249,168,212,0.55) 70%, transparent 88%)',
                  filter: 'blur(80px)',
                  animation: 'radiance-pulse 2.4s ease-in-out infinite',
                }}
              />

              {/* Spinning orbit ring */}
              <div className="absolute pointer-events-none" style={{
                left: '50%', top: '50%',
                width: 380, height: 380,
                border: '2px solid rgba(168,85,247,0.5)',
                borderRadius: '50%',
                boxShadow: '0 0 18px rgba(168,85,247,0.4)',
                animation: 'orbit-ring-spin 8s linear infinite',
              }} />

              {/* Second orbit ring (counter) */}
              <div className="absolute pointer-events-none" style={{
                left: '50%', top: '50%',
                width: 280, height: 280,
                marginLeft: -140, marginTop: -140,
                border: '1.5px solid rgba(236,72,153,0.4)',
                borderRadius: '50%',
                animation: 'orbit-ring-spin 12s linear infinite reverse',
              }} />

              {/* Firework clusters */}
              {fireworkClusters.map((f, i) => (
                <motion.div
                  key={`fw-${i}`}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: `${f.px}%`,
                    top: `${f.py}%`,
                    width: f.size, height: f.size,
                    background: BALLOON_COLORS[f.colorIdx].main,
                    boxShadow: `0 0 ${f.size * 2}px ${BALLOON_COLORS[f.colorIdx].shadow}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: f.vx, y: f.vy,
                    opacity: [1, 0.9, 0],
                    scale: [1.2, 0.8, 0],
                  }}
                  transition={{ duration: isMobile ? 0.9 : 1.1, delay: f.delay, ease: [0.2, 0.8, 0.3, 1] }}
                />
              ))}

              {/* Burst particles from center */}
              {burstParticles.map((p, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: p.x, y: [p.y, p.y + 90],
                    scale: [0, 2.2, 1.6],
                    opacity: [0, 1, 0.85, 0],
                  }}
                  transition={{ duration: 2.8, delay: p.delay, ease: 'easeOut' }}
                >
                  <div style={{
                    width: p.isCircle ? p.size : p.size + 4,
                    height: p.isCircle ? p.size : 4,
                    borderRadius: p.isCircle ? '50%' : 2,
                    background: BALLOON_COLORS[p.colorIdx].main,
                    boxShadow: `0 0 12px ${BALLOON_COLORS[p.colorIdx].shadow}`,
                    filter: 'brightness(1.2)',
                  }} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute bottom-20 left-0 right-0 text-center z-40 pointer-events-none"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-2">
              🎉 Let's Celebrate! 🎉
            </h2>
            <p className="text-purple-200/70 text-sm tracking-widest uppercase">
              {capsuleTitle || 'Happy Birthday!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
