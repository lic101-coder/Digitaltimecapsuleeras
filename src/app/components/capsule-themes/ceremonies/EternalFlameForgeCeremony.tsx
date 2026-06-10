/**
 * Eternal Flame - The Forge Ceremony (EPIC Enhanced)
 *
 * "Forge Master" pattern — mobile-safe animation rewrite.
 * Stages: intro → forge → strike1 → strike2 → strike3 → glow → radiance → outro
 *
 * RULES:
 * - All particle arrays via useMemo, no Math.random() in JSX
 * - repeat: Infinity only on slow ambient pulses (>3s, subtle)
 * - Max ~25 elements animating at peak
 * - Failsafe onComplete at ~17s
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EternalFlameForgeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

/* ─── CSS keyframes injected once ──────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes heat-shimmer {
  0%   { opacity: 0; }
  50%  { opacity: 0.45; }
  100% { opacity: 0; }
}
@keyframes metal-glow {
  0%   { opacity: 0.7; }
  50%  { opacity: 1; }
  100% { opacity: 0.7; }
}
@keyframes beam-rotate {
  0%   { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes lava-breathe {
  0%   { opacity: 0.4; }
  50%  { opacity: 0.8; }
  100% { opacity: 0.4; }
}
`;

function useInjectStyles() {
  useEffect(() => {
    const id = 'forge-ceremony-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = KEYFRAMES;
      document.head.appendChild(el);
    }
  }, []);
}

export function EternalFlameForgeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: EternalFlameForgeCeremonyProps) {
  useInjectStyles();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const [stage, setStage] = useState<
    'intro' | 'forge' | 'strike1' | 'strike2' | 'strike3' | 'glow' | 'radiance' | 'outro' | 'complete'
  >('intro');

  // Typewriter title state
  const [titleChars, setTitleChars] = useState('');
  const titleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Pre-computed particle data ───────────────────────────────────────────

  // Intro: 7 coal ember dots along the forge floor
  const coalEmbers = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: (i - 3) * 32,
        delay: i * 0.28,
        size: 9 + (i % 3) * 4,
      })),
    []
  );

  // Falling ash particles: 8 small dots from top
  const ashParticles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        left: 8 + i * 11.5, // percent across width
        size: 2 + (i % 2),
        duration: 6 + (i % 4) * 0.9,
        delay: i * 0.7,
        color: i % 3 === 0 ? 'rgba(255,255,255,0.45)' : i % 3 === 1 ? 'rgba(180,160,140,0.4)' : 'rgba(120,100,80,0.35)',
      })),
    []
  );

  // Strike helpers: build 10 sparks with tail positions
  const buildSparks = (baseAngle: number, radius: number) =>
    Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2 + baseAngle;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const size = 4 + (i % 3) * 2;
      const color = i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#fbbf24' : '#f97316';
      return {
        x,
        y,
        tailX: Math.cos(angle) * radius * 0.75,
        tailY: Math.sin(angle) * radius * 0.75,
        delay: i * 0.035,
        color,
        size,
        glow: `0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}80`,
      };
    });

  const sparks1 = useMemo(() => buildSparks(0, 160), []); // eslint-disable-line react-hooks/exhaustive-deps
  const sparks2 = useMemo(() => buildSparks(Math.PI / 8, 170), []); // eslint-disable-line react-hooks/exhaustive-deps
  const sparks3 = useMemo(() => buildSparks(Math.PI / 4, 185), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Molten drips
  const moltenDrips = useMemo(
    () => [
      { x: -22, delay: 0.45, color: '#f97316' },
      { x: 22,  delay: 0.6,  color: '#fbbf24' },
    ],
    []
  );

  // Flowing cinders near anvil (forge stage)
  const forgeCinders = useMemo(
    () => [
      { x: -28, delay: 0,    color: '#f97316' },
      { x: 0,   delay: 0.3,  color: '#fbbf24' },
      { x: 28,  delay: 0.6,  color: '#fb923c' },
    ],
    []
  );

  // Strike 3 lightning bolts at 3 useMemo positions
  const strike3Bolts = useMemo(
    () => [
      { x: -80, y: -60 },
      { x: 0,   y: -80 },
      { x: 80,  y: -55 },
    ],
    []
  );

  // Radiance / glow embers: 8 dramatic upward drifters
  const embers = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        x: (i - 3.5) * 28,
        delay: i * 0.2,
        size: 6 + (i % 3) * 4,
        color: i % 2 === 0 ? '#fbbf24' : '#f97316',
        drift: (i % 2 === 0 ? 1 : -1) * 24,
        yTravel: 260 + (i % 3) * 40,
      })),
    []
  );

  // Glow stage: 12 radial beams
  const glowBeams = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * 360,
        delay: i * 0.08,
        color: i % 3 === 0 ? '#ff6b00' : i % 3 === 1 ? '#ffa500' : '#fbbf24',
      })),
    []
  );

  // Radiance: 5 volumetric light beams
  const volumeBeams = useMemo(
    () => [
      { rotate: -35, delay: 0 },
      { rotate: -17, delay: 0.15 },
      { rotate: 0,   delay: 0.3 },
      { rotate: 17,  delay: 0.45 },
      { rotate: 35,  delay: 0.6 },
    ],
    []
  );

  // ─── Timeline ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 2400,  action: () => setStage('forge') },
      { time: 4400,  action: () => setStage('strike1') },
      { time: 5800,  action: () => setStage('strike2') },
      { time: 7200,  action: () => setStage('strike3') },
      { time: 8600,  action: () => setStage('glow') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 14200, action: () => setStage('outro') },
      { time: 15200, action: () => {
        setStage('complete');
        onComplete?.();
      }},
    ];

    const ids = timeline.map(({ time, action }) => setTimeout(action, time));

    const failsafe = setTimeout(() => {
      setStage('complete');
      onComplete?.();
    }, 17000);

    return () => {
      ids.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Typewriter effect for intro subtitle
  useEffect(() => {
    if (stage === 'intro') {
      const text = 'THE FORGE AWAKENS';
      let idx = 0;
      setTitleChars('');
      const delay = setTimeout(() => {
        titleIntervalRef.current = setInterval(() => {
          idx++;
          setTitleChars(text.slice(0, idx));
          if (idx >= text.length && titleIntervalRef.current) {
            clearInterval(titleIntervalRef.current);
          }
        }, 60);
      }, 400);
      return () => {
        clearTimeout(delay);
        if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
      };
    }
  }, [stage]);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const activeStrikeSparks =
    stage === 'strike1' ? sparks1 :
    stage === 'strike2' ? sparks2 :
    stage === 'strike3' ? sparks3 :
    null;

  const isStriking = stage === 'strike1' || stage === 'strike2' || stage === 'strike3';

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center bottom, #1a0800 0%, #0d0400 60%, #000 100%)' }}
    >
      {/* ── Lava-glow breathing background (CSS animation, ambient) ─────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(220,88,0,0.55) 0%, rgba(150,40,0,0.2) 40%, transparent 70%)',
          animation: 'lava-breathe 6s ease-in-out infinite',
        }}
      />

      {/* ── Falling ash particles (ambient, each >5s, repeat:Infinity allowed) ── */}
      {ashParticles.map((ash, i) => (
        <motion.div
          key={`ash-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ash.size,
            height: ash.size,
            left: `${ash.left}%`,
            background: ash.color,
            top: 0,
          }}
          animate={{ y: ['0%', '115%'] }}
          transition={{
            duration: ash.duration,
            delay: ash.delay,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: ash.delay * 0.4,
          }}
        />
      ))}

      {/* ── Stage 1: Title intro ─────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="title-intro"
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Coal embers along forge floor waking up — 7 now */}
            {coalEmbers.map((e, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: e.size,
                  height: e.size,
                  bottom: '26%',
                  left: `calc(50% + ${e.x}px)`,
                  translateX: '-50%',
                }}
                initial={{ background: '#1f1007', boxShadow: 'none', opacity: 0.3 }}
                animate={{
                  background: ['#1f1007', '#7c2d12', '#c2410c', '#ea580c'],
                  boxShadow: [
                    'none',
                    '0 0 6px #7c2d12',
                    '0 0 14px #c2410c',
                    '0 0 22px rgba(234,88,12,0.9)',
                  ],
                  opacity: [0.3, 0.7, 0.9, 1],
                }}
                transition={{ delay: e.delay, duration: 1.4, ease: 'easeOut' }}
              />
            ))}

            {/* Bellows emoji — stoked compress/expand */}
            <motion.div
              style={{
                fontSize: isMobile ? '2rem' : '2.8rem',
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 0 10px rgba(234,88,12,0.6))',
                userSelect: 'none',
              }}
              initial={{ scaleX: 1, opacity: 0 }}
              animate={{ scaleX: [1, 0.7, 1, 0.7, 1], opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.6, ease: 'easeInOut', repeat: 2 }}
            >
              🪗
            </motion.div>

            {/* Capsule title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '2.4rem' : '3.5rem',
                fontWeight: 700,
                background: 'linear-gradient(to bottom, #fbbf24, #f97316, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 32px rgba(251,191,36,0.6))',
                letterSpacing: '0.06em',
                textAlign: 'center',
                padding: '0 1.5rem',
              }}
            >
              {capsuleTitle}
            </motion.h1>

            {/* Typewriter "THE FORGE AWAKENS" subtitle */}
            <p
              style={{
                fontFamily: 'Georgia, serif',
                color: '#9a3412',
                fontSize: isMobile ? '0.78rem' : '0.98rem',
                marginTop: '0.5rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                textShadow: '0 0 14px rgba(154,52,18,0.6)',
                minHeight: '1.5em',
              }}
            >
              {titleChars}
              <span style={{ opacity: 0.6 }}>|</span>
            </p>

            {/* Heat shimmer lines — CSS keyframes, zero JS cost */}
            <div
              className="absolute pointer-events-none"
              style={{ left: '50%', bottom: '32%', translateX: '-50%', width: 200 }}
            >
              {[{ top: -55, width: 80, animDelay: '0s' }, { top: -40, width: 100, animDelay: '0.8s' }, { top: -25, width: 120, animDelay: '1.6s' }].map((line, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: line.width,
                    height: 1,
                    left: '50%',
                    top: line.top,
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(to right, transparent, rgba(234,88,12,0.35) 50%, transparent)',
                    borderRadius: 1,
                    animation: `heat-shimmer 3.2s ease-in-out ${line.animDelay} infinite`,
                  }}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 1 }}
              style={{
                fontFamily: 'Georgia, serif',
                color: '#fdba74',
                fontSize: isMobile ? '1rem' : '1.3rem',
                marginTop: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(255,107,0,0.5)',
              }}
            >
              Forged in Fire, Bound Forever
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 2+: Anvil with ambient pulse ───────────────────────────── */}
      <AnimatePresence>
        {(stage !== 'intro' && stage !== 'complete') && (
          <motion.div
            key="anvil-center"
            className="absolute left-1/2 top-1/2 z-20"
            style={{ translateX: '-50%', translateY: '-40%' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              isStriking
                ? { opacity: 1, scale: [1, 0.9, 1] }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0 }}
            transition={
              isStriking
                ? { duration: 0.32, ease: [0.36, 0.07, 0.19, 0.97] }
                : { duration: 0.9, ease: 'easeOut' }
            }
          >
            {/* Glow halo — ambient pulse (4s safe) */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 200,
                height: 100,
                left: '50%',
                top: '65%',
                translateX: '-50%',
                translateY: '-50%',
                background: 'radial-gradient(ellipse, rgba(255,107,0,0.5) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={stage === 'forge' ? {
                opacity: [0.5, 1, 0.5],
                scaleX: [1, 1.12, 1],
              } : { opacity: 0.7 }}
              transition={{ duration: 4, repeat: isStriking ? 0 : Infinity, ease: 'easeInOut' }}
            />

            {/* Molten glow beneath anvil */}
            {stage === 'forge' && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  width: 150,
                  height: 45,
                  left: '50%',
                  top: '82%',
                  translateX: '-50%',
                  translateY: '-50%',
                  background: 'radial-gradient(ellipse, rgba(251,146,60,0.6) 0%, rgba(234,88,12,0.3) 50%, transparent 80%)',
                  filter: 'blur(18px)',
                  borderRadius: '50%',
                }}
                animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [1, 1.18, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Glow stage: golden shimmer rotating conic gradient */}
            {stage === 'glow' && (
              <motion.div
                className="absolute pointer-events-none rounded-full"
                style={{
                  width: 180,
                  height: 180,
                  left: '50%',
                  top: '50%',
                  translateX: '-50%',
                  translateY: '-50%',
                  background:
                    'conic-gradient(from 0deg, transparent 0%, rgba(251,191,36,0.45) 20%, rgba(255,255,255,0.75) 40%, rgba(251,191,36,0.45) 60%, transparent 80%)',
                  filter: 'blur(8px)',
                }}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: [0, 0.85, 0.5, 0] }}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
              />
            )}

            {/* Hammer descending in forge stage */}
            {stage === 'forge' && (
              <motion.div
                style={{
                  position: 'absolute',
                  fontSize: isMobile ? '2.5rem' : '3.8rem',
                  top: -85,
                  left: '50%',
                  translateX: '-50%',
                  filter: 'drop-shadow(0 0 14px rgba(251,146,60,0.6))',
                  userSelect: 'none',
                }}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                🔨
              </motion.div>
            )}

            {/* Hammer recoil bounce after descent */}
            {stage === 'forge' && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: -85,
                  left: '50%',
                  translateX: '-50%',
                }}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ delay: 1.6, duration: 0.4, ease: 'easeInOut' }}
              />
            )}

            {/* Hot metal bar on the anvil (CSS glow, metal-glow keyframe) */}
            {(stage === 'forge' || isStriking) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '62%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: 8,
                  background: 'linear-gradient(to right, #7c2d12, #ea580c, #fbbf24, #ea580c, #7c2d12)',
                  borderRadius: 3,
                  boxShadow: '0 0 18px rgba(234,88,12,0.8), 0 0 6px rgba(251,191,36,0.6)',
                  animation: 'metal-glow 3s ease-in-out infinite',
                }}
              />
            )}

            {/* Heat shimmer lines above anvil — forge stage (CSS) */}
            {stage === 'forge' && (
              <>
                {[
                  { top: -60, width: 80,  animDelay: '0s' },
                  { top: -44, width: 105, animDelay: '0.6s' },
                  { top: -28, width: 130, animDelay: '1.2s' },
                ].map((line, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: line.width,
                      height: 1,
                      left: '50%',
                      top: line.top,
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(to right, transparent, rgba(255,200,100,0.5) 50%, transparent)',
                      borderRadius: 2,
                      filter: 'blur(1px)',
                      animation: `heat-shimmer 3.4s ease-in-out ${line.animDelay} infinite`,
                    }}
                  />
                ))}
              </>
            )}

            {/* Flowing cinders drifting upward — forge stage */}
            {stage === 'forge' &&
              forgeCinders.map((c, i) => (
                <motion.div
                  key={`cinder-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 5,
                    height: 5,
                    background: c.color,
                    boxShadow: `0 0 8px ${c.color}`,
                    left: c.x,
                    bottom: '65%',
                    translateX: '-50%',
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -40, opacity: [1, 0.6, 0] }}
                  transition={{ duration: 1.1, delay: c.delay, ease: 'easeOut' }}
                />
              ))}

            {/* Anvil emoji */}
            <div
              style={{
                fontSize: isMobile ? '5rem' : '7rem',
                filter: isStriking
                  ? 'drop-shadow(0 0 50px #fff) drop-shadow(0 0 25px #fbbf24)'
                  : stage === 'glow'
                  ? 'drop-shadow(0 0 32px #fbbf24) drop-shadow(0 0 14px #ffa500)'
                  : 'drop-shadow(0 0 22px rgba(255,107,0,0.7))',
                transition: 'filter 0.3s ease-out',
                userSelect: 'none',
              }}
            >
              ⚒️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Strike sparks, tails, drips, shockwave, bg flash ────────────── */}
      <AnimatePresence mode="wait">
        {isStriking && activeStrikeSparks && (
          <motion.div
            key={stage}
            className="absolute left-1/2 top-1/2 z-25"
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Full-screen orange bg flash for each strike */}
            <motion.div
              className="pointer-events-none"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(234,88,12,0.25)',
                zIndex: 45,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />

            {/* Shockwave ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 80,
                height: 80,
                translateX: '-50%',
                translateY: '-50%',
                border: '2px solid rgba(251,191,36,0.8)',
                boxShadow: '0 0 12px rgba(251,191,36,0.5)',
              }}
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Hammer swing visual */}
            <motion.div
              style={{
                position: 'absolute',
                fontSize: isMobile ? '3rem' : '4.5rem',
                top: -105,
                left: '50%',
                translateX: '-50%',
                filter: 'drop-shadow(0 0 20px #fbbf24)',
                userSelect: 'none',
              }}
              initial={{ y: -60, rotate: -40, opacity: 0 }}
              animate={{ y: 0, rotate: 20, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.4, 1] }}
            >
              🔨
            </motion.div>

            {/* Impact flash — single play */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 180,
                height: 180,
                translateX: '-50%',
                translateY: '-50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.97) 0%, rgba(254,243,199,0.75) 35%, transparent 70%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 2.2, 0], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            {/* Strike 3 full-screen white flash */}
            {stage === 'strike3' && (
              <motion.div
                className="pointer-events-none"
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: '#ffffff',
                  zIndex: 50,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.95, 0] }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            )}

            {/* "FORGED" stamp — strike3 only */}
            {stage === 'strike3' && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  translateX: '-50%',
                  translateY: '-50%',
                  zIndex: 60,
                  fontFamily: 'Georgia, serif',
                  fontWeight: 900,
                  fontSize: isMobile ? '2.8rem' : '4.5rem',
                  letterSpacing: '0.18em',
                  background: 'linear-gradient(to bottom, #ffffff, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 28px rgba(251,191,36,0.95))',
                  whiteSpace: 'nowrap',
                }}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.55, type: 'spring', stiffness: 280, damping: 18 }}
              >
                FORGED
              </motion.div>
            )}

            {/* Strike 3: ⚡ emojis burst */}
            {stage === 'strike3' &&
              strike3Bolts.map((bolt, i) => (
                <motion.div
                  key={`bolt-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    fontSize: isMobile ? '1.6rem' : '2.2rem',
                    left: bolt.x,
                    top: bolt.y,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 62,
                    filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.9))',
                    userSelect: 'none',
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
                  transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
                >
                  ⚡
                </motion.div>
              ))}

            {/* 10 sparks — single play */}
            {activeStrikeSparks.map((p, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: p.glow,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 1, 0],
                  scale: [1.5, 1, 0],
                }}
                transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
              />
            ))}

            {/* 10 spark tails */}
            {activeStrikeSparks.map((p, i) => (
              <motion.div
                key={`tail-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: Math.max(2, p.size - 2),
                  height: Math.max(2, p.size - 2),
                  background: p.color,
                  boxShadow: p.glow,
                  translateX: '-50%',
                  translateY: '-50%',
                  opacity: 0,
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: p.tailX,
                  y: p.tailY,
                  opacity: [0, 0.8, 0],
                  scale: [1, 0.6, 0],
                }}
                transition={{ duration: 1.0, delay: p.delay + 0.1, ease: 'easeOut' }}
              />
            ))}

            {/* 2 molten drips */}
            {moltenDrips.map((d, i) => (
              <motion.div
                key={`drip-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 7,
                  height: 11,
                  background: `radial-gradient(circle, ${d.color} 0%, rgba(234,88,12,0.6) 70%, transparent 100%)`,
                  boxShadow: `0 0 10px ${d.color}`,
                  left: d.x,
                  top: 0,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 65, opacity: [1, 0.8, 0] }}
                transition={{ duration: 0.85, delay: d.delay, ease: 'easeIn' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Glow stage: beams (rotating) + cooling + bond text ───────────── */}
      <AnimatePresence>
        {stage === 'glow' && (
          <motion.div
            key="glow-stage"
            className="absolute inset-0 flex items-center justify-center z-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Cooling metal background overlay — 3 color stages */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.4) 0%, transparent 65%)' }}
              animate={{
                background: [
                  'radial-gradient(ellipse at center, rgba(251,191,36,0.4) 0%, transparent 65%)',
                  'radial-gradient(ellipse at center, rgba(220,38,38,0.32) 0%, transparent 65%)',
                  'radial-gradient(ellipse at center, rgba(124,45,18,0.22) 0%, transparent 65%)',
                ],
              }}
              transition={{ duration: 2.4, ease: 'easeOut' }}
            />

            {/* 12 glow beams in a rotating wrapper */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 0,
                height: 0,
                transform: 'translate(-50%, -50%)',
                animation: 'beam-rotate 20s linear infinite',
              }}
            >
              {glowBeams.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{
                    left: 0,
                    top: 0,
                    width: isMobile ? '55vw' : '72vw',
                    height: 3,
                    marginLeft: isMobile ? '-27.5vw' : '-36vw',
                    marginTop: -1.5,
                    background: `linear-gradient(to right, transparent, ${b.color} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${b.angle}deg)`,
                    filter: 'blur(2px)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.9, 0.7] }}
                  transition={{ duration: 1.4, delay: b.delay, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* "YOUR BOND, FORGED FOREVER" — dramatic stamp entrance */}
            <motion.p
              className="absolute pointer-events-none"
              style={{
                bottom: '20%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '1.05rem' : '1.4rem',
                color: '#fbbf24',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textShadow: '0 0 22px rgba(251,191,36,0.8)',
              }}
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: [2, 0.9, 1.05, 1.0] }}
              transition={{
                delay: 0.9,
                duration: 0.9,
                ease: 'easeInOut',
                times: [0, 0.55, 0.8, 1.0],
              }}
            >
              YOUR BOND, FORGED FOREVER
            </motion.p>

            {/* "STRENGTH TESTED" */}
            <motion.p
              className="absolute pointer-events-none"
              style={{
                bottom: '14%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '0.72rem' : '0.9rem',
                color: '#f97316',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textShadow: '0 0 14px rgba(249,115,22,0.7)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
            >
              STRENGTH TESTED
            </motion.p>

            {/* "BOND UNBREAKABLE" */}
            <motion.p
              className="absolute pointer-events-none"
              style={{
                bottom: '9%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '0.72rem' : '0.9rem',
                color: '#dc2626',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textShadow: '0 0 14px rgba(220,38,38,0.7)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
            >
              BOND UNBREAKABLE
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Embers drifting upward (glow + radiance stages) ──────────────── */}
      <AnimatePresence>
        {(stage === 'glow' || stage === 'radiance') && (
          <motion.div
            key="embers"
            className="absolute left-1/2 z-22"
            style={{ top: '55%', translateX: '-50%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {embers.map((e, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: e.size,
                  height: e.size,
                  background: `radial-gradient(circle, #fff 0%, ${e.color} 60%, transparent 100%)`,
                  boxShadow: `0 0 ${e.size * 2}px ${e.color}, 0 0 ${e.size * 4}px ${e.color}60`,
                  left: e.x,
                  bottom: 0,
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  y: -e.yTravel,
                  opacity: [0, 0.95, 0.65, 0],
                  scale: [0, 1.3, 0.9, 0],
                  x: [0, e.drift, -e.drift * 0.5, 0],
                }}
                transition={{ duration: 3.4, delay: e.delay, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Radiance stage ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            className="absolute inset-0 flex items-center justify-center z-28"
          >
            {/* "FORGED IN FIRE" — massive rising label */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: '8%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '2.8rem' : '5rem',
                fontWeight: 900,
                color: '#fbbf24',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(251,191,36,0.8), 0 0 80px rgba(255,107,0,0.5)',
                filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.7))',
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0, duration: 1.2, ease: 'easeOut' }}
            >
              FORGED IN FIRE
            </motion.div>

            {/* 5 volumetric light beams */}
            {volumeBeams.map((vb, i) => (
              <motion.div
                key={`vbeam-${i}`}
                className="absolute pointer-events-none"
                style={{
                  left: '50%',
                  top: 0,
                  bottom: '38%',
                  width: isMobile ? 20 : 30,
                  translateX: '-50%',
                  transformOrigin: 'bottom center',
                  rotate: vb.rotate,
                  background: 'linear-gradient(to top, rgba(255,200,80,0.4), rgba(255,255,255,0.14) 60%, transparent 100%)',
                  filter: 'blur(7px)',
                }}
                initial={{ opacity: 0, scaleY: 0.3 }}
                animate={{ opacity: [0, 0.45, 0], scaleY: [0.3, 1, 1] }}
                transition={{ duration: 2.6, delay: vb.delay, ease: 'easeOut' }}
              />
            ))}

            {/* White-hot flash div */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 220,
                height: 220,
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,243,199,0.8) 40%, transparent 70%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3.2, opacity: [1, 0.6, 0] }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
            />

            {/* Forge glow bloom */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 360,
                height: 240,
                background: 'radial-gradient(ellipse, rgba(255,107,0,0.6) 0%, transparent 70%)',
                filter: 'blur(45px)',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0.75], scale: [0.6, 1.5, 1.3] }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
            />

            {/* Capsule title — hot stamp animation */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ bottom: '22%', left: 0, right: 0, textAlign: 'center' }}
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1.0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: isMobile ? '1.7rem' : '2.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.9))',
                  background: 'linear-gradient(to bottom, #fbbf24, #f59e0b, #dc7e00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ color: '#ffffff' }}
                animate={{ color: ['#ffffff', '#fbbf24', '#f59e0b'] }}
                transition={{ delay: 0.7, duration: 1.8, ease: 'easeOut' }}
              >
                FORGED FOREVER
              </motion.h2>
              <motion.p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: isMobile ? '1.05rem' : '1.45rem',
                  textAlign: 'center',
                  padding: '0 1rem',
                  background: 'linear-gradient(to right, #fbbf24, #fff, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.6))',
                  letterSpacing: '0.05em',
                }}
              >
                {capsuleTitle}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Outro fade ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro-overlay"
            className="absolute inset-0 bg-black z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
