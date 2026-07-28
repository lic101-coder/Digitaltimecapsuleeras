/**
 * Birthday - Make a Wish Ceremony (MOBILE-SAFE + CAKE UPGRADE)
 *
 * Elaborate birthday cake, realistic candles, breath from in front of cake,
 * smoke trails, radiance finale.
 * Performance: all Math.random() in useMemo, CSS keyframes for loops,
 * capped element counts, max ~20 simultaneous animated elements.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BirthdayClassicCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const CSS = `
@keyframes candle-flicker {
  0%,100% { transform: scaleX(1) scaleY(1) rotate(0deg); }
  20%      { transform: scaleX(0.88) scaleY(1.12) rotate(-2.5deg); }
  50%      { transform: scaleX(1.1) scaleY(0.94) rotate(1.5deg); }
  75%      { transform: scaleX(0.93) scaleY(1.07) rotate(-1deg); }
}
@keyframes smoke-rise {
  0%   { transform: translateY(0) scaleX(1); opacity: 0.72; }
  55%  { opacity: 0.38; }
  100% { transform: translateY(-155px) scaleX(2.4); opacity: 0; }
}
@keyframes wish-pulse {
  0%,100% { opacity: 0.88; transform: scale(1); }
  50%      { opacity: 1;    transform: scale(1.04); }
}
@keyframes orbit-ring-spin {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
/* Breath puffs travel upward from below, fanning slightly */
@keyframes breath-up-l {
  0%   { transform: translateY(0) translateX(0) scaleX(0.4); opacity: 0; }
  15%  { opacity: 0.65; }
  70%  { opacity: 0.35; }
  100% { transform: translateY(-185px) translateX(-22px) scaleX(1.8); opacity: 0; }
}
@keyframes breath-up-c {
  0%   { transform: translateY(0) scaleX(0.5); opacity: 0; }
  15%  { opacity: 0.7; }
  70%  { opacity: 0.3; }
  100% { transform: translateY(-190px) scaleX(2.2); opacity: 0; }
}
@keyframes breath-up-r {
  0%   { transform: translateY(0) translateX(0) scaleX(0.4); opacity: 0; }
  15%  { opacity: 0.65; }
  70%  { opacity: 0.35; }
  100% { transform: translateY(-185px) translateX(22px) scaleX(1.8); opacity: 0; }
}
@keyframes rosette-glow {
  0%,100% { box-shadow: 0 0 6px rgba(251,191,36,0.6); }
  50%      { box-shadow: 0 0 12px rgba(251,191,36,1); }
}
`;

/* ─── Cake Tier ─────────────────────────────────────────────── */
function Rosette({ color, x, y }: { color: string; x: number; y: number }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: '18px', height: '18px', borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color})`,
      boxShadow: `0 0 8px ${color}99`,
      border: `1.5px solid rgba(255,255,255,0.35)`,
      animation: 'rosette-glow 2.8s ease-in-out infinite'
    }} />
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export function BirthdayClassicCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: BirthdayClassicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'cake' | 'flicker' | 'breath' | 'blowout' | 'smoke' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 800,   action: () => setStage('cake') },
      { time: 2500,  action: () => setStage('flicker') },
      { time: 4500,  action: () => setStage('breath') },
      { time: 6500,  action: () => setStage('blowout') },
      { time: 8500,  action: () => setStage('smoke') },
      { time: 10500, action: () => setStage('radiance') },
      { time: 13500, action: () => setStage('outro') },
      { time: 14000, action: () => onComplete?.() }
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const numCandles = 5;

  /* Pre-computed randomness */
  const smokeTrails = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    xDrift: (i - 2) * 8,
    delay: i * 0.18,
    duration: 2.2 + i * 0.15
  })), []);

  const smokeAmbient = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    left: 30 + i * 5,
    delay: i * 0.22,
    duration: 2.5 + (i % 3) * 0.4,
    size: 14 + (i % 4) * 3
  })), []);

  /* Breath puffs — 9 streaks in a fan from just below the candles */
  const breathStreaks = useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    animName: i < 3 ? 'breath-up-l' : i < 6 ? 'breath-up-c' : 'breath-up-r',
    delay: (stage === 'blowout' ? 0 : 0.15) + i * 0.11,
    duration: 1.1 + (i % 3) * 0.14,
    width: 5 + (i % 3) * 3,
    leftOffset: -20 + i * 5  // fan spread: -20px to +20px across
  })), [stage]);

  /* 24 rays */
  const rays = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360,
    height: i % 3 === 0 ? 10 : i % 3 === 1 ? 6 : 8,
    colorIdx: i % 4
  })), []);
  const rayColors = ['rgba(236,72,153,0.92)', 'rgba(251,146,60,0.92)', 'rgba(251,191,36,0.92)', 'rgba(255,255,255,0.95)'];

  /* 16 burst particles */
  const burstParticles = useMemo(() => Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 120 + (i % 4) * 60;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      color: rayColors[i % 4],
      size: 10 + (i % 3) * 3,
      delay: i * 0.04
    };
  }), []);

  /* Sprinkles embedded in cake — deterministic positions */
  const sprinkles = useMemo(() => [
    /* bottom tier */
    ...Array.from({ length: 14 }, (_, i) => ({
      tier: 0, x: 18 + i * 20, y: 30 + (i % 3) * 14,
      color: ['#fbbf24','#f472b6','#60a5fa','#34d399','#f87171'][i % 5],
      rot: i * 27
    })),
    /* middle tier */
    ...Array.from({ length: 10 }, (_, i) => ({
      tier: 1, x: 22 + i * 26, y: 22 + (i % 3) * 12,
      color: ['#fde047','#fb923c','#a78bfa','#6ee7b7','#fca5a5'][i % 5],
      rot: i * 36
    })),
    /* top tier */
    ...Array.from({ length: 8 }, (_, i) => ({
      tier: 2, x: 28 + i * 32, y: 18 + (i % 2) * 14,
      color: ['#fbbf24','#f472b6','#93c5fd'][i % 3],
      rot: i * 45
    }))
  ], []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a0f14] via-[#2d1a24] to-[#0f0510]">
      <style>{CSS}</style>

      {/* Background glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #6a3a5e 0%, #2d1a24 50%, #1a0f14 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #2d1a24 0%, #1a0f14 70%, #050208 100%)'
        }}
        transition={{ duration: 1.2 }}
      />

      {/* Candlelight ambient glow */}
      <AnimatePresence>
        {(stage === 'cake' || stage === 'flicker' || stage === 'breath') && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'radial-gradient(ellipse at 50% 55%, rgba(251,146,60,0.3) 0%, rgba(234,88,12,0.12) 40%, transparent 70%)',
              filter: 'blur(55px)',
              animation: 'wish-pulse 3s ease-in-out infinite'
            }}
          />
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pink-100 drop-shadow-2xl">Make a Wish</h1>
            <p className="text-pink-200/80 mt-3 text-base">Close your eyes and blow</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN SCENE ── */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* ━━━━ CAKE + CANDLES ━━━━ */}
        <AnimatePresence>
          {(stage === 'cake' || stage === 'flicker' || stage === 'breath' || stage === 'blowout' || stage === 'smoke') && (
            <motion.div
              className="absolute"
              style={{ bottom: '22%', left: '50%', marginLeft: '-160px' }}
              initial={{ scale: 0, opacity: 0, y: 80 }}
              animate={{
                scale: 1,
                opacity: stage === 'smoke' ? [1, 1, 0.6, 0] : 1,
                y: 0
              }}
              exit={{ scale: 1.08, opacity: 0, y: 16, filter: 'blur(14px)' }}
              transition={{
                duration: 1.2, ease: 'backOut',
                opacity: { duration: stage === 'smoke' ? 2.5 : 1.2 },
                exit: { duration: 1.5 }
              }}
            >
              {/* ── Candles ── */}
              {[...Array(numCandles)].map((_, i) => {
                const xOffset = (i - (numCandles - 1) / 2) * 40;
                const cx = 160 + xOffset; // centre of 320px cake

                return (
                  <motion.div
                    key={`candle-${i}`}
                    className="absolute"
                    style={{ bottom: '228px', left: `${cx - 8}px` }}
                    initial={{ scale: 0, y: 18, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 + i * 0.1, ease: 'backOut' }}
                  >
                    {/* Flame */}
                    <AnimatePresence>
                      {stage !== 'blowout' && stage !== 'smoke' && stage !== 'radiance' && (
                        <motion.div
                          className="absolute left-1/2 -translate-x-1/2"
                          animate={
                            stage === 'breath'
                              ? { scaleX: [1, 0.35, 0.3, 0.45], x: [0, -2, -4, -2], y: [0, -6, -10, -7], opacity: [1, 0.65, 0.5, 0.6] }
                              : {}
                          }
                          exit={{ scale: [1, 0.15, 0], opacity: [1, 0.25, 0], y: [-3, -16] }}
                          transition={
                            stage === 'breath'
                              ? { duration: 1.3, ease: 'easeInOut' }
                              : { duration: 0.45 }
                          }
                          style={stage === 'flicker' ? {
                            bottom: '62px',
                            animation: `candle-flicker ${1.3 + i * 0.17}s ease-in-out infinite`
                          } : { bottom: '62px' }}
                        >
                          {/* Outer glow */}
                          <div style={{
                            position: 'absolute', width: '30px', height: '42px',
                            left: '50%', top: '50%',
                            transform: 'translate(-50%,-50%) scale(1.5)',
                            background: 'radial-gradient(ellipse at 50% 60%, rgba(255,200,50,0.88), rgba(255,150,50,0.5) 40%, transparent)',
                            filter: 'blur(9px)'
                          }} />
                          {/* Inner flame */}
                          <div style={{
                            width: '16px', height: '28px',
                            background: 'radial-gradient(ellipse at 50% 65%, #fff9e6 0%, #ffed4e 22%, #ff9a3c 58%, #ff6b35 82%, rgba(255,69,0,0.8) 100%)',
                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                            boxShadow: '0 0 20px rgba(255,200,100,0.8)'
                          }} />
                          {/* Core */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
                            width: '7px', height: '11px',
                            background: 'radial-gradient(ellipse, #ffffff 0%, #ffff99 38%, transparent 80%)',
                            filter: 'blur(2px)'
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Wick */}
                    <div style={{
                      position: 'absolute', bottom: '62px', left: '50%',
                      transform: 'translateX(-50%)',
                      width: '2px', height: '11px',
                      background: 'linear-gradient(to bottom, #3c3c3c, #1a1a1a)',
                      borderRadius: '1px'
                    }} />

                    {/* Candle body */}
                    <div style={{
                      width: '15px', height: '62px',
                      background: i % 3 === 0
                        ? 'linear-gradient(160deg, #fde68a 0%, #fbbf24 40%, #d97706 100%)'
                        : i % 3 === 1
                        ? 'linear-gradient(160deg, #fbcfe8 0%, #ec4899 40%, #be185d 100%)'
                        : 'linear-gradient(160deg, #bfdbfe 0%, #3b82f6 40%, #1d4ed8 100%)',
                      borderRadius: '4px 4px 2px 2px',
                      boxShadow: 'inset 2px 0 5px rgba(255,255,255,0.35), inset -2px 0 5px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.45)',
                      position: 'relative'
                    }}>
                      {/* Shine stripe */}
                      <div style={{
                        position: 'absolute', top: '10px', left: '3px',
                        width: '4px', height: '28px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.65), transparent)',
                        borderRadius: '2px', filter: 'blur(1px)'
                      }} />
                      {/* Wax drip */}
                      <div style={{
                        position: 'absolute', top: 0, left: '30%',
                        width: '5px', height: `${8 + i * 2}px`,
                        background: i % 3 === 0 ? 'rgba(253,230,138,0.9)' : i % 3 === 1 ? 'rgba(251,207,232,0.9)' : 'rgba(191,219,254,0.9)',
                        borderRadius: '0 0 50% 50%'
                      }} />
                    </div>
                  </motion.div>
                );
              })}

              {/* ══════════════════════════
                  ELABORATE CAKE
                  DOM order top→bottom: top tier, middle, bottom, stand plate, pedestal
              ══════════════════════════ */}

              {/* ── Top tier ── (smallest, narrowest — top of cake) */}
              <div style={{
                width: '200px', height: '70px', margin: '0 auto',
                position: 'relative',
                background: 'linear-gradient(160deg, #c2185b 0%, #e91e63 50%, #ad1457 100%)',
                borderRadius: '10px 10px 6px 6px',
                boxShadow: '0 3px 18px rgba(0,0,0,0.38), inset 0 2px 10px rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '20px',
                  background: 'linear-gradient(to bottom, #fffbeb, #fef3c7 50%, #fde68a)',
                  borderRadius: '10px 10px 0 0',
                  boxShadow: '0 3px 8px rgba(254,243,199,0.4)'
                }} />
                {[8, 28, 50, 72, 88].map((l, di) => (
                  <div key={`drip-t-${l}`} style={{
                    position: 'absolute', left: `${l}%`, top: '20px',
                    width: `${11 + di % 3 * 3}px`, height: `${8 + di * 2}px`,
                    background: 'linear-gradient(to bottom, #fef3c7, #fde68a 60%, #fbbf24)',
                    borderRadius: '0 0 50% 50%'
                  }} />
                ))}
                {[14, 62, 110, 158].map((rx, ri) => (
                  <Rosette key={`ros-t-${ri}`} color={['#fbbf24','#f472b6','#60a5fa','#34d399'][ri]} x={rx} y={38} />
                ))}
                {sprinkles.filter(s => s.tier === 2).map((s, si) => (
                  <div key={`spr-t-${si}`} style={{
                    position: 'absolute', left: s.x, top: s.y,
                    width: '6px', height: '3px',
                    background: s.color, borderRadius: '2px',
                    transform: `rotate(${s.rot}deg)`,
                    boxShadow: `0 0 4px ${s.color}88`
                  }} />
                ))}
              </div>

              {/* ── Middle tier ── */}
              <div style={{
                width: '260px', height: '82px', margin: '0 auto', marginTop: '-8px',
                position: 'relative',
                background: 'linear-gradient(160deg, #be123c 0%, #e11d48 45%, #9f1239 100%)',
                borderRadius: '10px',
                boxShadow: '0 5px 22px rgba(0,0,0,0.45), inset 0 2px 10px rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '18px',
                  background: 'linear-gradient(to bottom, #fffbeb, #fef3c7 55%, #fde68a)',
                  borderRadius: '10px 10px 0 0'
                }} />
                {[14, 32, 50, 68, 85].map((l, di) => (
                  <div key={`drip-m-${l}`} style={{
                    position: 'absolute', left: `${l}%`, top: '18px',
                    width: `${13 + di % 2 * 4}px`, height: `${9 + di * 2}px`,
                    background: 'linear-gradient(to bottom, #fde68a, #fbbf24 65%, #f59e0b)',
                    borderRadius: '0 0 50% 50%'
                  }} />
                ))}
                {[20, 70, 120, 170, 220].map((rx, ri) => (
                  <Rosette key={`ros-m-${ri}`} color={['#f472b6','#fbbf24','#a78bfa','#34d399','#60a5fa'][ri]} x={rx} y={42} />
                ))}
                {sprinkles.filter(s => s.tier === 1).map((s, si) => (
                  <div key={`spr-m-${si}`} style={{
                    position: 'absolute', left: s.x, top: s.y,
                    width: '7px', height: '3px',
                    background: s.color, borderRadius: '2px',
                    transform: `rotate(${s.rot}deg)`,
                    boxShadow: `0 0 4px ${s.color}88`
                  }} />
                ))}
              </div>

              {/* ── Bottom tier ── (widest — base of cake) */}
              <div style={{
                width: '320px', height: '96px', marginTop: '-10px', position: 'relative',
                background: 'linear-gradient(160deg, #b91c1c 0%, #dc2626 45%, #991b1b 100%)',
                borderRadius: '14px 14px 8px 8px',
                boxShadow: '0 8px 28px rgba(0,0,0,0.55), inset 0 3px 14px rgba(255,255,255,0.12)'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '22px',
                  background: 'linear-gradient(to bottom, #fffbeb, #fef3c7 60%, #fde68a)',
                  borderRadius: '14px 14px 0 0',
                  boxShadow: '0 3px 8px rgba(217,119,6,0.2)'
                }} />
                {[12, 28, 44, 60, 76, 90].map((l, di) => (
                  <div key={`drip-b-${l}`} style={{
                    position: 'absolute', left: `${l}%`, top: '22px',
                    width: `${12 + di % 3 * 4}px`, height: `${10 + di * 2}px`,
                    background: 'linear-gradient(to bottom, #fde68a, #fbbf24 70%, #f59e0b)',
                    borderRadius: '0 0 50% 50%',
                    boxShadow: 'inset 1px 0 3px rgba(255,255,255,0.3)'
                  }} />
                ))}
                {[30, 80, 130, 180, 230, 280].map((rx, ri) => (
                  <Rosette key={`ros-b-${ri}`} color={['#fbbf24','#f472b6','#60a5fa','#34d399','#fb7185','#a78bfa'][ri]} x={rx} y={48} />
                ))}
                {sprinkles.filter(s => s.tier === 0).map((s, si) => (
                  <div key={`spr-b-${si}`} style={{
                    position: 'absolute', left: s.x, top: s.y,
                    width: '8px', height: '3px',
                    background: s.color,
                    borderRadius: '2px',
                    transform: `rotate(${s.rot}deg)`,
                    boxShadow: `0 0 4px ${s.color}88`
                  }} />
                ))}
                <div style={{
                  position: 'absolute', left: 0, right: 0, top: '72%',
                  height: '6px',
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.18) 80%, transparent)',
                }} />
              </div>

              {/* Cake stand plate */}
              <div style={{
                width: '320px', height: '10px',
                background: 'linear-gradient(to bottom, #e5e7eb, #d1d5db)',
                borderRadius: '50%',
                boxShadow: '0 3px 12px rgba(0,0,0,0.3)',
                marginBottom: '3px'
              }} />
              {/* Cake stand pedestal */}
              <div style={{
                width: '240px', height: '18px', margin: '0 auto',
                background: 'linear-gradient(to bottom, #f3f4f6, #d1d5db)',
                borderRadius: '0 0 50% 50%',
                boxShadow: '0 6px 18px rgba(0,0,0,0.35)'
              }} />

              {/* ── Star topper ── */}
              <AnimatePresence>
                {(stage === 'cake' || stage === 'flicker') && (
                  <motion.div
                    className="absolute"
                    style={{ bottom: '312px', left: '50%', transform: 'translateX(-50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {/* Stick */}
                    <div style={{
                      width: '3px', height: '24px', margin: '0 auto',
                      background: 'linear-gradient(to bottom, #6b7280, #9ca3af)',
                      borderRadius: '1px'
                    }} />
                    {/* Star */}
                    <div style={{
                      fontSize: '22px', textAlign: 'center', marginTop: '-2px',
                      filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.9))',
                      animation: 'rosette-glow 1.8s ease-in-out infinite'
                    }}>⭐</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ━━━━ BREATH PUFFS ━━━━
            Origin: just in front of and slightly below the candles
            (like a person leaning over the cake)
            Travels upward in a fan shape toward the flames.
        */}
        <AnimatePresence>
          {(stage === 'breath' || stage === 'blowout') && (
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(22% + 120px)',  /* front of cake, candle level */
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25
              }}
            >
              {breathStreaks.map((s, i) => (
                <div
                  key={`breath-${i}`}
                  style={{
                    position: 'absolute',
                    bottom: '-18px',
                    left: `${s.leftOffset}px`,
                    width: `${s.width + 30}px`,
                    height: '3px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.38)',
                    filter: 'blur(2px)',
                    transformOrigin: 'center bottom',
                    animation: `${s.animName} ${s.duration}s ease-out ${s.delay + (stage === 'blowout' ? 0 : 0.1)}s forwards`
                  }}
                />
              ))}
              {/* Central breath cloud — expands from the mouth position upward */}
              <motion.div
                style={{
                  position: 'absolute', bottom: '-10px', left: '-20px',
                  width: '40px', height: '22px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.22) 0%, transparent 75%)',
                  filter: 'blur(6px)'
                }}
                initial={{ scaleX: 0.5, scaleY: 0.5, opacity: 0 }}
                animate={{ scaleX: [0.5, 3.5], scaleY: [0.5, 2.5], opacity: [0, 0.6, 0.35, 0], y: [0, -100] }}
                transition={{ duration: stage === 'blowout' ? 1.0 : 1.3, ease: 'easeOut' }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* ━━━━ SMOKE TRAILS ━━━━ */}
        <AnimatePresence>
          {stage === 'smoke' && (
            <>
              {smokeTrails.map((s, i) => {
                const xOffset = (i - (numCandles - 1) / 2) * 40;
                return (
                  <div key={`smoke-${i}`} className="absolute z-30 pointer-events-none" style={{
                    bottom: 'calc(22% + 300px)',
                    left: `calc(50% + ${xOffset + s.xDrift}px)`,
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(156,163,175,0.72) 0%, rgba(107,114,128,0.28) 55%, transparent 80%)',
                    filter: 'blur(4px)',
                    animation: `smoke-rise ${s.duration}s ease-out ${s.delay}s forwards`
                  }} />
                );
              })}
              {smokeAmbient.map((s, i) => (
                <div key={`smoke-amb-${i}`} className="absolute z-20 pointer-events-none" style={{
                  bottom: 'calc(22% + 314px)',
                  left: `${s.left}%`,
                  width: `${s.size}px`, height: `${s.size}px`, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(203,213,225,0.5) 0%, transparent 70%)',
                  filter: 'blur(5px)',
                  animation: `smoke-rise ${s.duration}s ease-out ${s.delay}s forwards`
                }} />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* ━━━━ RADIANCE ━━━━ */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              <motion.div className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                {rays.map((r, i) => (
                  <div key={`ray-${i}`} style={{
                    position: 'absolute', left: '50%', top: '50%',
                    width: '200vw', height: `${r.height}px`,
                    marginLeft: '-100vw', marginTop: `${-r.height / 2}px`,
                    background: `linear-gradient(to right, transparent, ${rayColors[r.colorIdx]} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${r.angle}deg)`,
                    filter: 'blur(2px)'
                  }} />
                ))}
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 5.5, 5.2], opacity: [0, 1, 0.95] }}
                transition={{ duration: 1.5, ease: 'easeOut' }}>
                <div style={{
                  width: '400px', height: '400px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(252,231,243,0.96) 10%, rgba(249,168,212,0.88) 28%, rgba(236,72,153,0.78) 45%, rgba(251,146,60,0.6) 65%, transparent 85%)',
                  filter: 'blur(80px)',
                  animation: 'wish-pulse 2.5s ease-in-out infinite'
                }} />
              </motion.div>

              <div className="absolute pointer-events-none" style={{
                left: '50%', top: '50%',
                width: '340px', height: '340px',
                border: '2px solid rgba(236,72,153,0.45)',
                borderRadius: '50%',
                boxShadow: '0 0 16px rgba(236,72,153,0.35)',
                animation: 'orbit-ring-spin 12s linear infinite'
              }} />

              {burstParticles.map((p, i) => (
                <motion.div key={`burst-${i}`}
                  className="absolute left-1/2 top-1/2 pointer-events-none"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ x: p.x, y: [p.y, p.y + 100], scale: [0, 1.8, 1.4], opacity: [0, 1, 0.85, 0] }}
                  transition={{ duration: 2.5, delay: p.delay, ease: 'easeOut' }}>
                  <div style={{
                    width: `${p.size}px`, height: '3px',
                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                    filter: 'blur(1px)'
                  }} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Success */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-50 drop-shadow-2xl mb-3">Happy Birthday!</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
