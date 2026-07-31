/**
 * Pet Starlit Companions Ceremony - CELESTIAL PAW CONSTELLATION
 *
 * A paw print made of glowing golden stars lights up in the night sky.
 * A soft nebula blooms behind it in warm gold/rose tones.
 * Real shooting stars streak across the sky on CSS keyframes.
 * A full silver moon rises in the upper right with a soft halo.
 * The paw pulses with a gentle heartbeat glow at the finale.
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetStarlitCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

// Paw print star positions (% of container) — tighter grouping, clear paw proportion
const PAW_STARS = [
  { x: 37, y: 40, size: 26, label: 'main-pad' },  // large oval pad, centered below
  { x: 27, y: 26, size: 13, label: 'toe-tl' },    // left toe
  { x: 33, y: 22, size: 13, label: 'toe-tcl' },   // center-left toe (slightly higher)
  { x: 41, y: 22, size: 13, label: 'toe-tcr' },   // center-right toe (slightly higher)
  { x: 47, y: 26, size: 13, label: 'toe-tr' },    // right toe
];

// Outline circles for each paw element — drawn as constellation rings around the stars
// cx/cy match PAW_STARS x/y; rx/ry for ellipse (main pad is oval)
const PAW_OUTLINES = [
  { cx: 37, cy: 40, rx: 7.5, ry: 6,   idx: 0 }, // main pad oval
  { cx: 27, cy: 26, rx: 4.5, ry: 4.5, idx: 1 }, // toe-tl
  { cx: 33, cy: 22, rx: 4.5, ry: 4.5, idx: 2 }, // toe-tcl
  { cx: 41, cy: 22, rx: 4.5, ry: 4.5, idx: 3 }, // toe-tcr
  { cx: 47, cy: 26, rx: 4.5, ry: 4.5, idx: 4 }, // toe-tr
];

// Light-up order: toes first, then main pad
const PAW_LIGHT_ORDER = [1, 2, 3, 4, 0];

export function PetStarlitCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete,
}: PetStarlitCeremonyProps) {
  const [stage, setStage] = useState<
    'intro' | 'stars' | 'connecting' | 'constellation' | 'moon' | 'shooting' | 'radiance' | 'outro'
  >('intro');

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  // --- Background star layers ---
  const tinyStars = useMemo(() => {
    const count = isMobile ? 30 : 60;
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.3,
      size: 1,
    }));
  }, []);

  const mediumStars = useMemo(() => {
    const count = isMobile ? 10 : 20;
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  const warmStars = useMemo(() => {
    const count = isMobile ? 4 : 8;
    return Array.from({ length: count }, (_, i) => ({
      left: 5 + Math.random() * 90,
      top: 5 + Math.random() * 70,
      size: 3 + Math.random(),
      color: i % 2 === 0 ? '#ffd700' : '#ffe4b5',
      delay: Math.random() * 3,
    }));
  }, []);

  // --- Timeline ---
  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 600,   action: () => setStage('stars') },
      { time: 3200,  action: () => setStage('connecting') },
      { time: 5800,  action: () => setStage('constellation') },
      { time: 8200,  action: () => setStage('moon') },
      { time: 10800, action: () => setStage('shooting') },
      { time: 13200, action: () => setStage('radiance') },
      { time: 15000, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() },
    ];
    const timeouts = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );
    const failsafe = setTimeout(() => onComplete?.(), 17000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []);

  const shootingStarCount = isMobile ? 3 : 5;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #050a1a 0%, #0a1128 30%, #111830 60%, #0d1422 100%)',
      }}
    >
      {/* ── CSS KEYFRAMES ── */}
      <style>{`
        @keyframes pet-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.4); }
        }
        @keyframes pet-warm-twinkle {
          0%, 100% { opacity: 0.5;  transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes pet-heartbeat {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
          14%      { transform: translate(-50%, -50%) scale(1.18); opacity: 0.9; }
          28%      { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
          42%      { transform: translate(-50%, -50%) scale(1.10); opacity: 0.75; }
          56%      { transform: translate(-50%, -50%) scale(1);   opacity: 0.55; }
        }
        @keyframes pet-shoot-1 {
          0%   { transform: translate(0px, 0px)     rotate(35deg) scaleX(0.05); opacity: 0; }
          8%   { opacity: 1; transform: translate(20px, 12px)   rotate(35deg) scaleX(1); }
          80%  { opacity: 0.4; }
          100% { transform: translate(600px, 350px) rotate(35deg) scaleX(0.3); opacity: 0; }
        }
        @keyframes pet-shoot-2 {
          0%   { transform: translate(0px, 0px)     rotate(30deg) scaleX(0.05); opacity: 0; }
          8%   { opacity: 1; transform: translate(18px, 10px)   rotate(30deg) scaleX(1); }
          80%  { opacity: 0.3; }
          100% { transform: translate(540px, 310px) rotate(30deg) scaleX(0.3); opacity: 0; }
        }
        @keyframes pet-shoot-3 {
          0%   { transform: translate(0px, 0px)     rotate(38deg) scaleX(0.05); opacity: 0; }
          8%   { opacity: 1; transform: translate(22px, 14px)   rotate(38deg) scaleX(1); }
          80%  { opacity: 0.35; }
          100% { transform: translate(650px, 400px) rotate(38deg) scaleX(0.25); opacity: 0; }
        }
        @keyframes pet-shoot-4 {
          0%   { transform: translate(0px, 0px)     rotate(32deg) scaleX(0.05); opacity: 0; }
          8%   { opacity: 1; transform: translate(16px, 10px)   rotate(32deg) scaleX(1); }
          80%  { opacity: 0.3; }
          100% { transform: translate(570px, 330px) rotate(32deg) scaleX(0.25); opacity: 0; }
        }
        @keyframes pet-shoot-5 {
          0%   { transform: translate(0px, 0px)     rotate(40deg) scaleX(0.05); opacity: 0; }
          8%   { opacity: 1; transform: translate(24px, 16px)   rotate(40deg) scaleX(1); }
          80%  { opacity: 0.3; }
          100% { transform: translate(620px, 380px) rotate(40deg) scaleX(0.25); opacity: 0; }
        }
        @keyframes pet-trail-glow {
          0%   { box-shadow: 4px 0 12px 3px rgba(255,255,255,1), 0 0 20px 4px rgba(200,220,255,0.8); }
          50%  { box-shadow: 4px 0 8px 2px rgba(255,255,255,0.7), 0 0 12px 2px rgba(200,220,255,0.5); }
          100% { box-shadow: none; }
        }
        @keyframes pet-moon-halo {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%      { opacity: 0.28; transform: scale(1.05); }
        }
        @keyframes pet-pad-pulse {
          0%, 100% { box-shadow: 0 0 20px 4px #ffd700, 0 0 50px 10px rgba(255,179,0,0.5), 0 0 90px 20px rgba(255,140,0,0.25); }
          50%      { box-shadow: 0 0 32px 8px #ffd700, 0 0 80px 20px rgba(255,179,0,0.65), 0 0 130px 35px rgba(255,140,0,0.35); }
        }
      `}</style>

      {/* ── LAYER 1: Tiny static stars ── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {tinyStars.map((s, i) => (
          <div
            key={`tiny-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* ── LAYER 2: Medium twinkling stars (CSS animation) ── */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {mediumStars.map((s, i) => (
          <div
            key={`med-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: '2px',
              height: '2px',
              background: '#cce0ff',
              opacity: 0.4,
              animation: `pet-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── LAYER 3: Warm accent stars ── */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {warmStars.map((s, i) => (
          <div
            key={`warm-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              opacity: 0.6,
              boxShadow: `0 0 6px ${s.color}`,
              animation: `pet-warm-twinkle ${3 + i * 0.4}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── NEBULA CLOUD (behind paw) ── */}
      <AnimatePresence>
        {(stage === 'connecting' ||
          stage === 'constellation' ||
          stage === 'moon' ||
          stage === 'shooting' ||
          stage === 'radiance') && (
          <>
            <motion.div
              className="absolute"
              style={{
                left: '20%',
                top: '18%',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,183,0,0.18) 0%, rgba(251,146,60,0.10) 50%, transparent 75%)',
                filter: isMobile ? 'blur(30px)' : 'blur(55px)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute"
              style={{
                left: '28%',
                top: '24%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(251,113,133,0.15) 0%, rgba(244,114,182,0.08) 50%, transparent 75%)',
                filter: isMobile ? 'blur(20px)' : 'blur(40px)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute"
              style={{
                left: '32%',
                top: '30%',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(167,139,250,0.14) 0%, rgba(139,92,246,0.07) 50%, transparent 75%)',
                filter: isMobile ? 'blur(15px)' : 'blur(30px)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, delay: 0.9, ease: 'easeOut' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ── PAW PRINT CONSTELLATION ── */}
      <AnimatePresence>
        {(stage === 'stars' ||
          stage === 'connecting' ||
          stage === 'constellation' ||
          stage === 'moon' ||
          stage === 'shooting' ||
          stage === 'radiance') && (
          <>
            {PAW_LIGHT_ORDER.map((starIdx, lightStep) => {
              const star = PAW_STARS[starIdx];
              const isMainPad = star.label === 'main-pad';
              const glowColor = isMainPad ? '#ffd700' : '#ffb300';
              const glowSize = isMainPad ? star.size * 2.5 : star.size * 2;
              const inRadiance = stage === 'radiance';

              return (
                <motion.div
                  key={`paw-${star.label}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    background: `radial-gradient(circle at 40% 35%, #fff8dc, ${glowColor} 55%, #ff8c00 100%)`,
                    boxShadow: `0 0 ${glowSize}px 4px ${glowColor}, 0 0 ${glowSize * 2}px 10px rgba(255,179,0,0.5), 0 0 ${glowSize * 3}px 20px rgba(255,140,0,0.25)`,
                    zIndex: 20,
                    animation: inRadiance
                      ? `pet-pad-pulse 2.2s ease-in-out infinite`
                      : undefined,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: [0, 1.5, 0.9, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.1,
                    delay: 0.4 + lightStep * 0.45,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* ── PAW CONSTELLATION OUTLINES — ellipses tracing each toe & pad shape ── */}
      <AnimatePresence>
        {(stage === 'connecting' || stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <svg
            className="absolute inset-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', zIndex: 18, pointerEvents: 'none' }}
          >
            <defs>
              <filter id="pawLineGlow">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {PAW_OUTLINES.map((o, i) => {
              const delay = i === 0 ? 1.0 : 0.15 + i * 0.25;
              return (
                <motion.ellipse
                  key={`paw-outline-${i}`}
                  cx={o.cx}
                  cy={o.cy}
                  rx={o.rx}
                  ry={o.ry}
                  fill="none"
                  stroke="rgba(255,210,80,0.65)"
                  strokeWidth={i === 0 ? 0.7 : 0.5}
                  strokeDasharray="2.5 2"
                  filter="url(#pawLineGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.0, delay, ease: 'easeInOut' }}
                />
              );
            })}
          </svg>
        )}
      </AnimatePresence>

      {/* ── MOON ── */}
      <AnimatePresence>
        {(stage === 'moon' ||
          stage === 'shooting' ||
          stage === 'radiance') && (
          <>
            {/* Outer soft halo */}
            <motion.div
              className="absolute"
              style={{
                right: isMobile ? '4%' : '10%',
                top: isMobile ? '3%' : '8%',
                width: isMobile ? '160px' : '260px',
                height: isMobile ? '160px' : '260px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(220,230,255,0.22) 0%, rgba(180,200,255,0.10) 50%, transparent 72%)',
                filter: isMobile ? 'blur(18px)' : 'blur(30px)',
                zIndex: 5,
                animation: 'pet-moon-halo 4s ease-in-out infinite',
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1.6 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            />

            {/* Moon disc */}
            <motion.div
              className="absolute"
              style={{
                right: isMobile ? '4%' : '10%',
                top: isMobile ? '3%' : '8%',
                width: isMobile ? '80px' : '130px',
                height: isMobile ? '80px' : '130px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 38% 32%, #ffffff 0%, #f0f4ff 40%, #dce6f7 72%, #bfcfea 100%)',
                boxShadow:
                  '0 0 50px 12px rgba(200,215,255,0.7), 0 0 100px 30px rgba(180,200,255,0.35), 0 0 160px 50px rgba(160,185,255,0.15), inset -14px -14px 35px rgba(120,155,205,0.3)',
                zIndex: 7,
                border: '1px solid rgba(255,255,255,0.35)',
              }}
              initial={{ opacity: 0, scale: 0, y: 80 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2.2, ease: [0.34, 1.4, 0.64, 1] }}
            />

            {/* Moon surface detail (desktop) */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute"
                  style={{
                    right: 'calc(10% + 30px)',
                    top: 'calc(8% + 55px)',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(140,165,210,0.35), transparent 70%)',
                    zIndex: 8,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    right: 'calc(10% + 60px)',
                    top: 'calc(8% + 30px)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(140,165,210,0.28), transparent 70%)',
                    zIndex: 8,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1.3 }}
                />
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* ── SHOOTING STARS (CSS keyframe, GPU-smooth) ── */}
      {(stage === 'shooting' || stage === 'radiance') && (
        <>
          {/* Shooting star 1 */}
          <div
            style={{
              position: 'absolute',
              left: '8%',
              top: '6%',
              width: '160px',
              height: '2.5px',
              background:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 30%, white 80%, white 100%)',
              boxShadow: '4px 0 12px 3px rgba(255,255,255,0.9), 0 0 20px 4px rgba(200,220,255,0.6)',
              transformOrigin: 'right center',
              zIndex: 25,
              animation: 'pet-shoot-1 1.8s ease-in 0.1s both',
            }}
          />
          {/* Shooting star 2 */}
          <div
            style={{
              position: 'absolute',
              left: '22%',
              top: '3%',
              width: '130px',
              height: '2px',
              background:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 30%, white 80%, white 100%)',
              boxShadow: '4px 0 12px 3px rgba(255,255,255,0.9), 0 0 20px 4px rgba(200,220,255,0.6)',
              transformOrigin: 'right center',
              zIndex: 25,
              animation: 'pet-shoot-2 2.1s ease-in 0.9s both',
            }}
          />
          {/* Shooting star 3 */}
          <div
            style={{
              position: 'absolute',
              left: '3%',
              top: '18%',
              width: '160px',
              height: '2.5px',
              background:
                'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 25%, white 75%, white 100%)',
              boxShadow: '4px 0 12px 3px rgba(255,255,255,0.9), 0 0 20px 4px rgba(200,220,255,0.6)',
              transformOrigin: 'right center',
              zIndex: 25,
              animation: 'pet-shoot-3 1.6s ease-in 1.7s both',
            }}
          />
          {/* Shooting star 4 (desktop only) */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                left: '55%',
                top: '2%',
                width: '130px',
                height: '2px',
                background:
                  'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 30%, white 80%, white 100%)',
                boxShadow: '4px 0 12px 3px rgba(255,255,255,0.9), 0 0 20px 4px rgba(200,220,255,0.6)',
                transformOrigin: 'right center',
                zIndex: 25,
                animation: 'pet-shoot-4 2.0s ease-in 0.4s both',
              }}
            />
          )}
          {/* Shooting star 5 (desktop only) */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                left: '38%',
                top: '10%',
                width: '130px',
                height: '2px',
                background:
                  'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 30%, white 80%, white 100%)',
                boxShadow: '4px 0 12px 3px rgba(255,255,255,0.9), 0 0 20px 4px rgba(200,220,255,0.6)',
                transformOrigin: 'right center',
                zIndex: 25,
                animation: 'pet-shoot-5 1.9s ease-in 2.3s both',
              }}
            />
          )}
        </>
      )}

      {/* ── RADIANCE: Heartbeat glow + "Always With You" ── */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Heartbeat pulse around paw */}
            <div
              className="absolute"
              style={{
                left: '35%',
                top: '38%',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,183,0,0.22) 0%, rgba(251,146,60,0.12) 45%, transparent 70%)',
                filter: isMobile ? 'blur(20px)' : 'blur(40px)',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                animation: 'pet-heartbeat 2.4s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Title text */}
            <motion.div
              className="absolute inset-x-0 z-30 text-center"
              style={{ bottom: '12%' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <h2
                className="text-3xl md:text-5xl font-bold tracking-wide"
                style={{
                  color: '#fde68a',
                  textShadow:
                    '0 0 30px #fbbf24, 0 0 60px rgba(251,191,36,0.4)',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  letterSpacing: '0.06em',
                }}
              >
                Always With You
              </h2>
              {capsuleTitle && (
                <motion.p
                  className="mt-3 text-base md:text-lg"
                  style={{
                    color: 'rgba(253,230,138,0.65)',
                    textShadow: '0 0 12px rgba(251,191,36,0.3)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.7 }}
                >
                  {capsuleTitle}
                </motion.p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── OUTRO FADE ── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: '#050a1a',
              zIndex: 50,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
