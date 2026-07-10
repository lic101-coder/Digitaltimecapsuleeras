/**
 * Birthday - Balloon Celebration Ceremony (MOBILE-SAFE REBUILD)
 *
 * Colorful balloons float up, sway, pop like fireworks, radiance finale.
 * Performance: all Math.random() in useMemo, CSS keyframes for balloon sway,
 * pop sparkles capped and staggered, max ~20 simultaneous animated elements.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BirthdayPartyCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const CSS = `
@keyframes balloon-sway-a {
  0%,100% { transform: rotate(-6deg) translateX(-6px); }
  50%      { transform: rotate(6deg) translateX(6px); }
}
@keyframes balloon-sway-b {
  0%,100% { transform: rotate(5deg) translateX(5px); }
  50%      { transform: rotate(-5deg) translateX(-5px); }
}
@keyframes balloon-sway-c {
  0%,100% { transform: rotate(-4deg) translateX(-4px); }
  50%      { transform: rotate(7deg) translateX(7px); }
}
@keyframes pop-shockwave {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.9; }
  60%  { opacity: 0.5; }
  100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
}
@keyframes orbit-ring-spin {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes confetti-pulse {
  0%,100% { opacity: 0.88; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.03); }
}
`;

const BALLOON_COLORS = [
  { main: '#ef4444', light: '#fca5a5', dark: '#dc2626', shadow: 'rgba(239,68,68,0.55)' },
  { main: '#f59e0b', light: '#fcd34d', dark: '#d97706', shadow: 'rgba(245,158,11,0.55)' },
  { main: '#eab308', light: '#fde047', dark: '#ca8a04', shadow: 'rgba(234,179,8,0.55)' },
  { main: '#22c55e', light: '#86efac', dark: '#16a34a', shadow: 'rgba(34,197,94,0.55)' },
  { main: '#3b82f6', light: '#93c5fd', dark: '#2563eb', shadow: 'rgba(59,130,246,0.55)' },
  { main: '#a855f7', light: '#d8b4fe', dark: '#9333ea', shadow: 'rgba(168,85,247,0.55)' },
  { main: '#ec4899', light: '#f9a8d4', dark: '#db2777', shadow: 'rgba(236,72,153,0.55)' }
];

const SWAY_ANIMS = ['balloon-sway-a', 'balloon-sway-b', 'balloon-sway-c'];

function BalloonShape({ color, size = 80 }: { color: typeof BALLOON_COLORS[0]; size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.18 }}>
      {/* Shine */}
      <div style={{
        position: 'absolute', top: '20%', left: '28%',
        width: size * 0.36, height: size * 0.42,
        background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.25) 55%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(3px)'
      }} />
      {/* Body */}
      <div style={{
        width: size, height: size * 1.18,
        background: `radial-gradient(ellipse at 35% 35%, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        boxShadow: `0 5px 22px ${color.shadow}, inset -8px -8px 18px rgba(0,0,0,0.18)`,
        position: 'relative'
      }}>
        {/* Knot */}
        <div style={{
          position: 'absolute', bottom: '-10px', left: '50%',
          transform: 'translateX(-50%)',
          width: '14px', height: '10px',
          background: color.dark, borderRadius: '50%',
          boxShadow: `0 2px 5px ${color.shadow}`
        }} />
      </div>
      {/* String */}
      <div style={{
        position: 'absolute', bottom: '-75px', left: '50%',
        transform: 'translateX(-50%)',
        width: '2px', height: '72px',
        background: `linear-gradient(to bottom, ${color.dark}, rgba(255,255,255,0.25))`,
      }} />
    </div>
  );
}

export function BirthdayPartyCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: BirthdayPartyCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'float1' | 'float2' | 'bounce' | 'pop' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 600,   action: () => setStage('float1') },
      { time: 2200,  action: () => setStage('float2') },
      { time: 4200,  action: () => setStage('bounce') },
      { time: 7200,  action: () => setStage('pop') },
      { time: 9200,  action: () => setStage('radiance') },
      { time: 12500, action: () => setStage('outro') },
      { time: 13000, action: () => onComplete?.() }
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Wave 1: 7 balloons, pre-computed positions
  const wave1 = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    xPos: 15 + i * 10,
    floatHeight: 340 + (i % 3) * 35,
    swayAnim: SWAY_ANIMS[i % 3],
    swayDuration: 2.8 + i * 0.25,
    delay: i * 0.14,
    colorIdx: i % BALLOON_COLORS.length
  })), []);

  // Wave 2: 6 balloons
  const wave2 = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    xPos: 20 + i * 10,
    floatHeight: 310 + (i % 2) * 40,
    swayAnim: SWAY_ANIMS[(i + 1) % 3],
    swayDuration: 3.1 + i * 0.2,
    delay: i * 0.12,
    colorIdx: (i + 3) % BALLOON_COLORS.length
  })), []);

  // Pop sparkles: 8 balloons × 8 sparkles = 64, staggered
  const popSparkles = useMemo(() => {
    const balloons = [...wave1.slice(0, 5), ...wave2.slice(0, 3)];
    return balloons.flatMap((b, balloonIdx) =>
      Array.from({ length: 8 }, (_, sparkleIdx) => {
        const angle = (sparkleIdx / 8) * Math.PI * 2;
        const dist = 35 + (sparkleIdx % 3) * 25;
        return {
          balloonIdx,
          xCenter: (b.xPos - 50) * 6,
          yCenter: -(b.floatHeight * 0.85),
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          colorIdx: b.colorIdx,
          delay: balloonIdx * 0.12 + sparkleIdx * 0.025
        };
      })
    );
  }, []);

  // Pop shockwave positions — one per balloon
  const popShockwaves = useMemo(() => wave1.slice(0, 5).map((b, i) => ({
    xCenter: `${b.xPos}%`,
    yOffset: b.floatHeight * 0.85,
    delay: i * 0.12,
    colorIdx: b.colorIdx
  })), []);

  // 24 rays
  const rays = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360,
    height: i % 3 === 0 ? 10 : i % 3 === 1 ? 6 : 8,
    colorIdx: i % BALLOON_COLORS.length
  })), []);

  // 18 burst particles — deterministic
  const burstParticles = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const dist = 110 + (i % 4) * 55;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      colorIdx: i % BALLOON_COLORS.length,
      size: 10 + (i % 4) * 3,
      isCircle: i % 3 === 0,
      delay: i * 0.04
    };
  }), []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0f0a1a] via-[#1a1028] to-[#0a0510]">
      <style>{CSS}</style>

      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #5a3080 0%, #1a1028 50%, #0f0a1a 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #1a1028 0%, #0f0a1a 70%, #050208 100%)'
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
            <p className="text-purple-200/80 mt-3 text-base">Let's celebrate!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">

        {/* Wave 1 balloons */}
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
                  exit: { duration: 0.7, delay: i * 0.07 }
                }}
              >
                <div style={{
                  animation: stage === 'bounce'
                    ? `${b.swayAnim} ${b.swayDuration}s ease-in-out infinite`
                    : undefined,
                  transformOrigin: 'bottom center'
                }}>
                  <BalloonShape color={BALLOON_COLORS[b.colorIdx]} />
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>

        {/* Wave 2 balloons */}
        <AnimatePresence>
          {(stage === 'float2' || stage === 'bounce') &&
            wave2.map((b, i) => (
              <motion.div
                key={`b2-${i}`}
                className="absolute z-28"
                style={{ left: `${b.xPos}%`, bottom: '-120px', transform: 'translateX(-50%)' }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{ y: -b.floatHeight, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, y: -(b.floatHeight + 180) }}
                transition={{
                  y: { duration: 1.7, delay: b.delay, ease: 'easeOut' },
                  opacity: { duration: 0.5, delay: b.delay },
                  scale: { duration: 0.5, delay: b.delay },
                  exit: { duration: 0.7, delay: 0.25 + i * 0.07 }
                }}
              >
                <div style={{
                  animation: stage === 'bounce'
                    ? `${b.swayAnim} ${b.swayDuration}s ease-in-out infinite`
                    : undefined,
                  transformOrigin: 'bottom center'
                }}>
                  <BalloonShape color={BALLOON_COLORS[b.colorIdx]} size={72} />
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>

        {/* Pop shockwave rings — one per balloon */}
        <AnimatePresence>
          {stage === 'pop' && popShockwaves.map((s, i) => (
            <div
              key={`shock-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: s.xCenter,
                bottom: `${s.yOffset}px`,
                width: '80px', height: '80px',
                border: `2px solid ${BALLOON_COLORS[s.colorIdx].main}`,
                borderRadius: '50%',
                boxShadow: `0 0 14px ${BALLOON_COLORS[s.colorIdx].shadow}`,
                animation: `pop-shockwave 0.7s ease-out ${s.delay}s forwards`,
                opacity: 0
              }}
            />
          ))}
        </AnimatePresence>

        {/* Pop sparkles — 64 total, staggered so max ~20 at once */}
        <AnimatePresence>
          {stage === 'pop' && popSparkles.map((s, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute z-32 left-1/2 top-1/2 pointer-events-none"
              initial={{ x: s.xCenter, y: s.yCenter, scale: 0, opacity: 0 }}
              animate={{
                x: s.xCenter + s.dx,
                y: s.yCenter + s.dy,
                scale: [0, 1.8, 1.4, 0],
                opacity: [0, 1, 0.75, 0]
              }}
              transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
            >
              <div style={{
                width: '10px', height: '3px',
                background: `linear-gradient(90deg, transparent, ${BALLOON_COLORS[s.colorIdx].main}, transparent)`,
                boxShadow: `0 0 8px ${BALLOON_COLORS[s.colorIdx].shadow}`,
                filter: 'blur(0.5px)'
              }} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Radiance */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 24 rays — static wrapper */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {rays.map((r, i) => (
                  <div
                    key={`ray-${i}`}
                    style={{
                      position: 'absolute',
                      left: '50%', top: '50%',
                      width: '200vw', height: `${r.height}px`,
                      marginLeft: '-100vw', marginTop: `${-r.height / 2}px`,
                      background: `linear-gradient(to right, transparent, ${BALLOON_COLORS[r.colorIdx].main} 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${r.angle}deg)`,
                      filter: 'blur(2px)'
                    }}
                  />
                ))}
              </motion.div>

              {/* Radiant core — single element, CSS pulse */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 5.5, 5.2], opacity: [0, 1, 0.96] }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              >
                <div style={{
                  width: '400px', height: '400px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,230,138,0.95) 10%, rgba(134,239,172,0.88) 22%, rgba(147,197,253,0.82) 36%, rgba(216,180,254,0.75) 50%, rgba(249,168,212,0.6) 65%, transparent 85%)',
                  filter: 'blur(80px)',
                  animation: 'confetti-pulse 2.5s ease-in-out infinite'
                }} />
              </motion.div>

              {/* CSS orbit ring */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: '50%', top: '50%',
                  width: '360px', height: '360px',
                  border: '2px solid rgba(168,85,247,0.45)',
                  borderRadius: '50%',
                  boxShadow: '0 0 16px rgba(168,85,247,0.35)',
                  animation: 'orbit-ring-spin 10s linear infinite'
                }}
              />

              {/* 18 burst particles — deterministic */}
              {burstParticles.map((p, i) => (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: p.x, y: [p.y, p.y + 100],
                    scale: [0, 2, 1.6],
                    opacity: [0, 1, 0.85, 0]
                  }}
                  transition={{ duration: 2.6, delay: p.delay, ease: 'easeOut' }}
                >
                  <div style={{
                    width: p.isCircle ? `${p.size}px` : `${p.size + 4}px`,
                    height: p.isCircle ? `${p.size}px` : '4px',
                    borderRadius: p.isCircle ? '50%' : '2px',
                    background: BALLOON_COLORS[p.colorIdx].main,
                    boxShadow: `0 0 10px ${BALLOON_COLORS[p.colorIdx].shadow}`,
                    filter: 'brightness(1.15)'
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-200 via-yellow-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
              Let's Celebrate!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
