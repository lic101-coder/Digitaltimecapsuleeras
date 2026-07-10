/**
 * New Life — "The First Heartbeat"
 *
 * Story: Pure darkness. A single amber point ignites and pulses
 * at 150 BPM — the true fetal heart rate. A luminous EKG thread
 * draws itself across the void. Cells emerge and divide in
 * generations. An organic heart materializes, breathing and
 * radiating vein-threads outward. The world warms from void-black
 * to amber to rose. The capsule title descends into the warmth.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewLifeGenesisCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

/* ─────────────────────── CSS ─────────────────────── */
const CSS = `
/* 150 BPM — fetal */
@keyframes beat-fast {
  0%,100% { transform: scale(1);    opacity: 0.88; }
  8%      { transform: scale(1.6);  opacity: 1; }
  20%     { transform: scale(0.9);  opacity: 0.82; }
  30%     { transform: scale(1);    opacity: 0.88; }
}
/* 60 BPM — newborn calm */
@keyframes beat-slow {
  0%,100% { transform: scale(1);    opacity: 0.82; }
  10%     { transform: scale(1.48); opacity: 1; }
  28%     { transform: scale(0.93); opacity: 0.85; }
  42%     { transform: scale(1);    opacity: 0.82; }
}
@keyframes beat-ring-fast {
  0%   { transform: scale(0.25); opacity: 0.8; }
  100% { transform: scale(5);    opacity: 0; }
}
@keyframes beat-ring-slow {
  0%   { transform: scale(0.25); opacity: 0.65; }
  100% { transform: scale(6.5);  opacity: 0; }
}
@keyframes beat-enter {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
@keyframes cell-divide-flash {
  0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.4); }
  30%  { opacity: 1; transform: translate(-50%,-50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(1); }
}
@keyframes vein-glow {
  0%,100% { opacity: 0.5; }
  50%     { opacity: 0.9; }
}
@keyframes heart-enter {
  from { transform: translate(-50%,-52%) scale(0); opacity: 0; }
  to   { transform: translate(-50%,-52%) scale(1); opacity: 1; }
}
@keyframes heart-breathe {
  0%,100% {
    transform: translate(-50%,-52%) scale(1);
    filter: drop-shadow(0 0 10px rgba(255,120,40,0.8)) drop-shadow(0 0 28px rgba(255,100,30,0.4));
  }
  10% {
    transform: translate(-50%,-52%) scale(1.14);
    filter: drop-shadow(0 0 22px rgba(255,160,70,1)) drop-shadow(0 0 60px rgba(255,130,50,0.7));
  }
  26% {
    transform: translate(-50%,-52%) scale(0.93);
    filter: drop-shadow(0 0 13px rgba(255,110,35,0.85)) drop-shadow(0 0 34px rgba(255,90,25,0.45));
  }
  42% {
    transform: translate(-50%,-52%) scale(1);
    filter: drop-shadow(0 0 10px rgba(255,120,40,0.8)) drop-shadow(0 0 28px rgba(255,100,30,0.4));
  }
}
@keyframes impression-float {
  0%   { transform: translateY(0)     scale(0.55); opacity: 0; }
  22%  { opacity: 0.52; }
  78%  { opacity: 0.42; }
  100% { transform: translateY(-36px) scale(0.92); opacity: 0; }
}
@keyframes star-twinkle {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.28; }
}
@keyframes life-shimmer {
  0%,100% { text-shadow: 0 0 20px rgba(255,160,70,0.75), 0 0 50px rgba(255,130,40,0.38); }
  50%     { text-shadow: 0 0 36px rgba(255,190,95,1),   0 0 85px rgba(255,155,60,0.65); }
}
@keyframes ekg-spark {
  0%   { opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes core-bloom {
  0%   { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(3.5); opacity: 0; }
}
`;

/* ─────────────────────── EKG Path (3 complete cycles) ─────────────────────── */
const EKG_PATH = [
  'M 0,50',
  'L 28,50',
  'C 31,50 33,44 35,41 C 37,38 40,38 42,41 C 44,44 46,50 48,50',
  'L 63,50',
  'L 65,32 L 68,-14 L 71,92 L 74,50',
  'C 79,50 83,45 88,43 C 93,41 98,43 103,47 C 108,50 111,50 113,50',
  'L 121,50',
  'L 150,50',
  'C 153,50 155,44 157,41 C 159,38 162,38 164,41 C 166,44 168,50 170,50',
  'L 185,50',
  'L 187,32 L 190,-14 L 193,92 L 196,50',
  'C 201,50 205,45 210,43 C 215,41 220,43 225,47 C 230,50 233,50 235,50',
  'L 243,50',
  'L 272,50',
  'C 275,50 277,44 279,41 C 281,38 284,38 286,41 C 288,44 290,50 292,50',
  'L 307,50',
  'L 309,32 L 312,-14 L 315,92 L 318,50',
  'C 323,50 327,45 332,43 C 337,41 342,43 347,47 C 352,50 355,50 357,50',
  'L 375,50',
].join(' ');

/* ─────────────────────── Heart SVG path (organic) ─────────────────────── */
const HEART_PATH =
  'M 50,72 C 18,55 3,36 3,21 C 3,8 13,0 24,0 C 34,0 43,8 50,18 C 57,8 66,0 76,0 C 87,0 97,8 97,21 C 97,36 82,55 50,72 Z';

type Stage = 'void' | 'pulse' | 'ekg' | 'divide' | 'heart' | 'bloom' | 'reveal' | 'outro';

export function NewLifeGenesisCeremony({
  capsuleTitle,
  onComplete,
}: NewLifeGenesisCeremonyProps) {
  const [stage, setStage] = useState<Stage>('void');
  const [beatReady, setBeatReady] = useState(false);
  const [heartReady, setHeartReady] = useState(false);

  useEffect(() => {
    const ts: { t: number; s: Stage }[] = [
      { t: 0,     s: 'void' },
      { t: 600,   s: 'pulse' },
      { t: 2800,  s: 'ekg' },
      { t: 6200,  s: 'divide' },
      { t: 10000, s: 'heart' },
      { t: 14500, s: 'bloom' },
      { t: 18200, s: 'reveal' },
      { t: 22500, s: 'outro' },
    ];
    const ids = ts.map(({ t, s }) => setTimeout(() => setStage(s), t));
    const done = setTimeout(() => onComplete?.(), 23500);
    // Allow entry animations to complete before switching to infinite loops
    const beatT  = setTimeout(() => setBeatReady(true),  600 + 600);
    const heartT = setTimeout(() => setHeartReady(true), 10000 + 1000);
    return () => { ids.forEach(clearTimeout); clearTimeout(done); clearTimeout(beatT); clearTimeout(heartT); };
  }, []);

  /* ── Stars ── */
  const bgStars = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      x: ((i * 37 + Math.cos(i) * 20 + 200) % 100 + 100) % 100,
      y: ((i * 23 + Math.sin(i) * 15 + 100) % 100 + 100) % 100,
      r: 0.7 + (i % 3) * 0.55,
      opacity: 0.10 + (i % 5) * 0.06,
      dur: 3.5 + (i % 5) * 1.1,
      delay: (i * 0.35) % 6,
    })),
  []);

  /* ── Cell positions (4 generations) ── */
  const cells = useMemo(() => {
    const cx = 50, cy = 50;
    const r2 = 5, r3 = 10.5, r4 = 17;
    return [
      { x: cx,       y: cy,             r: 17, gen: 1, delay: 0 },
      { x: cx - r2,  y: cy,             r: 13, gen: 2, delay: 0.12 },
      { x: cx + r2,  y: cy,             r: 13, gen: 2, delay: 0.12 },
      { x: cx - r3,  y: cy - r3 * 0.5, r: 10, gen: 3, delay: 0.28 },
      { x: cx + r3,  y: cy - r3 * 0.5, r: 10, gen: 3, delay: 0.28 },
      { x: cx - r3,  y: cy + r3 * 0.5, r: 10, gen: 3, delay: 0.38 },
      { x: cx + r3,  y: cy + r3 * 0.5, r: 10, gen: 3, delay: 0.38 },
      ...Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 10;
        return { x: cx + Math.cos(a) * r4, y: cy + Math.sin(a) * r4 * 0.8, r: 7, gen: 4, delay: 0.55 + (i % 5) * 0.06 };
      }),
    ];
  }, []);

  /* ── Division sparks ── */
  const divSparks = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const d = 8 + (i % 5) * 4;
      return {
        x: 50 + Math.cos(a) * d,
        y: 50 + Math.sin(a) * d * 0.8,
        delay: 0.04 + (i % 8) * 0.08,
        dur: 0.5 + (i % 4) * 0.1,
        size: 2.5 + (i % 5),
        color: i % 3 === 0 ? 'rgba(255,230,140,0.95)' : i % 3 === 1 ? 'rgba(255,170,70,0.9)' : 'rgba(255,210,100,0.85)',
      };
    }),
  []);

  /* ── Vein threads ── */
  const veinPaths = useMemo(() => [
    { d: 'M 50,50 C 34,41 20,30 6,18',    delay: 0 },
    { d: 'M 50,50 C 56,33 60,20 62,3',    delay: 0.14 },
    { d: 'M 50,50 C 67,39 80,30 94,18',   delay: 0.22 },
    { d: 'M 50,50 C 72,50 84,50 98,50',   delay: 0.08 },
    { d: 'M 50,50 C 70,63 82,72 94,82',   delay: 0.32 },
    { d: 'M 50,50 C 52,68 53,80 54,97',   delay: 0.18 },
    { d: 'M 50,50 C 30,65 18,74 6,82',    delay: 0.28 },
    { d: 'M 50,50 C 26,50 12,50 1,50',    delay: 0.04 },
    { d: 'M 50,50 C 38,38 28,28 14,14',   delay: 0.42 },
    { d: 'M 50,50 C 62,38 72,28 84,14',   delay: 0.36 },
  ], []);

  /* ── Bloom forms ── */
  const bloomForms = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      x:  12 + (i * 6.8) % 76,
      y:  14 + (i * 5.9) % 72,
      dur: 4.2 + (i % 4) * 1.0,
      delay: (i * 0.48) % 7,
      shape: i % 3,
    })),
  []);

  const isFast = ['pulse', 'ekg', 'divide'].includes(stage);
  const isSlow = ['heart', 'bloom', 'reveal'].includes(stage);
  const showCells  = ['divide', 'heart', 'bloom', 'reveal'].includes(stage);
  const showHeart  = ['heart', 'bloom', 'reveal'].includes(stage);
  const showVeins  = ['heart', 'bloom', 'reveal'].includes(stage);
  const showBloom  = ['bloom', 'reveal'].includes(stage);
  const showReveal = stage === 'reveal';

  const beatAnim = isFast ? 'beat-fast 0.4s ease-in-out infinite'
    : isSlow ? 'beat-slow 1.0s ease-in-out infinite' : 'none';
  const ringAnim = isFast ? 'beat-ring-fast' : 'beat-ring-slow';
  const ringDur  = isFast ? 0.4 : 1.0;
  const ringGap  = isFast ? 0.2 : 0.5;

  const bgGradient: Record<Stage, string> = {
    void:   'radial-gradient(ellipse 80% 70% at 50% 50%, #070010 0%, #030008 100%)',
    pulse:  'radial-gradient(ellipse 80% 70% at 50% 50%, #130406 0%, #07000b 100%)',
    ekg:    'radial-gradient(ellipse 80% 70% at 50% 50%, #1e0804 0%, #0b0208 100%)',
    divide: 'radial-gradient(ellipse 80% 70% at 50% 50%, #2a0f07 0%, #0f0308 100%)',
    heart:  'radial-gradient(ellipse 70% 65% at 50% 52%, #3c1a08 0%, #190608 75%, #09021c 100%)',
    bloom:  'radial-gradient(ellipse 75% 70% at 50% 52%, #4e220c 0%, #2a0d0a 58%, #0d061a 100%)',
    reveal: 'radial-gradient(ellipse 80% 75% at 50% 52%, #5a2c12 0%, #361408 52%, #0d061a 100%)',
    outro:  'radial-gradient(ellipse 80% 75% at 50% 52%, #5a2c12 0%, #361408 52%, #0d061a 100%)',
  };

  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: bgGradient[stage], transition: 'background 3.5s ease' }}>
      <style>{CSS}</style>

      {/* ── Depth vignette ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 18%, rgba(4,0,10,0.75) 100%)' }} />

      {/* ── Starfield ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: stage === 'void' ? 0.5 : showBloom ? 0.12 : 0.25 }}>
        {bgStars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
            fill="rgba(255,240,220,1)"
            style={{
              animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
              opacity: s.opacity,
            }}
          />
        ))}
      </svg>

      {/* ══════════════════════════════════════════
          CENTRAL BEAT POINT
          ══════════════════════════════════════════ */}
      {/*
        Beat center — all children use negative margins to center without
        transform so CSS scale animations don't fight positional transforms.
      */}
      {stage !== 'void' && (
        <div className="absolute pointer-events-none" style={{ left: '50%', top: '50%' }}>

          {/* Expanding core bloom on initial ignition */}
          {stage === 'pulse' && (
            <div className="absolute rounded-full"
              style={{
                width: '28px', height: '28px',
                marginLeft: '-14px', marginTop: '-14px',
                background: 'radial-gradient(circle, rgba(255,220,150,0.9), rgba(255,140,40,0.4))',
                animation: 'core-bloom 1.0s ease-out forwards',
              }} />
          )}

          {/* Pulse rings — negative margin centers them; keyframe only scales */}
          {(isFast || isSlow) && [0, 1, 2, 3].map(i => (
            <div key={`ring-${i}-${stage}`}
              className="absolute rounded-full"
              style={{
                width: '22px', height: '22px',
                marginLeft: '-11px', marginTop: '-11px',
                border: `${isFast ? '2px' : '1.5px'} solid rgba(255,145,55,${isFast ? 0.75 : 0.6})`,
                boxShadow: `0 0 ${isFast ? 12 : 8}px rgba(255,120,40,${isFast ? 0.55 : 0.4})`,
                animation: `${ringAnim} ${ringDur}s ease-out ${i * ringGap}s infinite`,
                opacity: 0,
              }}
            />
          ))}

          {/* Ambient core glow */}
          <div className="absolute rounded-full"
            style={{
              width: '110px', height: '110px',
              marginLeft: '-55px', marginTop: '-55px',
              background: 'radial-gradient(circle, rgba(255,145,55,0.2) 0%, rgba(255,100,30,0.06) 55%, transparent 75%)',
              filter: 'blur(16px)',
              animation: beatAnim,
            }}
          />

          {/* The beating point — entry then steady loop (no forwards+infinite chain) */}
          {!showHeart && (
            <div
              className="absolute rounded-full"
              style={{
                width: '22px', height: '22px',
                marginLeft: '-11px', marginTop: '-11px',
                background: 'radial-gradient(circle, #FFEEC0 0%, #FFA040 38%, #FF5C10 80%)',
                boxShadow: '0 0 16px rgba(255,145,55,1), 0 0 38px rgba(255,100,30,0.6)',
                animation: beatReady
                  ? (isFast ? 'beat-fast 0.4s ease-in-out infinite' : 'beat-slow 1.0s ease-in-out infinite')
                  : 'beat-enter 0.55s cubic-bezier(0.22,1,0.36,1) both',
              }}
            />
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════
          EKG GOLDEN THREAD
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {['ekg', 'divide', 'heart', 'bloom', 'reveal'].includes(stage) && (
          <motion.svg
            viewBox="0 -20 375 140"
            preserveAspectRatio="none"
            className="absolute pointer-events-none"
            style={{
              left: 0, top: '50%',
              width: '100%', height: '96px',
              transform: 'translateY(-48px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'heart' || showBloom ? 0.22 : 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: stage === 'heart' ? 3 : 0.6 }}
          >
            <defs>
              <filter id="ekgGlow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Wide glow halo */}
            <motion.path
              d={EKG_PATH}
              stroke="rgba(255,150,50,0.45)"
              strokeWidth="8"
              fill="none"
              filter="url(#ekgGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
            {/* Mid amber layer */}
            <motion.path
              d={EKG_PATH}
              stroke="rgba(255,185,80,0.7)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
            {/* Sharp gold core */}
            <motion.path
              d={EKG_PATH}
              stroke="rgba(255,225,120,0.98)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          CELL DIVISION
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showCells && (
          <div className="absolute inset-0 pointer-events-none">

            {/* Division sparks */}
            {stage === 'divide' && divSparks.map((f, i) => (
              <div key={i}
                className="absolute rounded-full"
                style={{
                  left: `${f.x}%`, top: `${f.y}%`,
                  width: `${f.size}px`, height: `${f.size}px`,
                  background: f.color,
                  animation: `cell-divide-flash ${f.dur}s ease-out ${f.delay}s both`,
                }} />
            ))}

            {/* Filaments — SVG viewBox 0 0 100 100 */}
            <svg className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100" preserveAspectRatio="none">
              {cells.filter(c => c.gen > 1).map((c, i) => (
                <motion.path key={i}
                  d={`M 50,50 L ${c.x.toFixed(1)},${c.y.toFixed(1)}`}
                  stroke="rgba(255,170,65,0.32)"
                  strokeWidth="0.28"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.5, delay: (c.gen - 1) * 0.55 + c.delay }}
                />
              ))}
            </svg>

            {/* Cell bodies */}
            {cells.map((c, i) => {
              const genDelay  = (c.gen - 1) * 0.55;
              const colors = ['rgba(255,148,55,1)', 'rgba(255,118,92,0.94)', 'rgba(255,195,82,0.9)', 'rgba(255,140,60,0.85)'];
              const fill = colors[(c.gen - 1) % colors.length];
              const glow = c.gen === 1
                ? '0 0 18px rgba(255,140,50,1), 0 0 44px rgba(255,105,30,0.6)'
                : '0 0 10px rgba(255,148,62,0.8)';
              return (
                <motion.div key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${c.x}%`, top: `${c.y}%`,
                    width: `${c.r * 2}px`, height: `${c.r * 2}px`,
                    transform: 'translate(-50%,-50%)',
                    background: `radial-gradient(circle at 33% 30%, rgba(255,248,210,0.9), ${fill})`,
                    boxShadow: glow,
                    border: '1px solid rgba(255,210,130,0.38)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: c.gen === 1 && showHeart ? 0 : 0.9 }}
                  transition={{ duration: 0.55, delay: genDelay + c.delay, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          THE HEART
          CSS-only animation: enter → breathe
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showHeart && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%', top: '50%',
              width: '100px', height: '78px',
              transformOrigin: 'center center',
              animation: 'heart-enter 0.95s cubic-bezier(0.22,1,0.36,1) forwards, heart-breathe 1.0s ease-in-out 0.95s infinite',
            }}
          >
            <svg viewBox="0 0 100 75" width="100" height="78" style={{ overflow: 'visible' }}>
              <defs>
                <radialGradient id="hFillGrad" cx="50%" cy="38%" r="64%">
                  <stop offset="0%"   stopColor="#FFEAA0" stopOpacity="0.97" />
                  <stop offset="22%"  stopColor="#FFA048" stopOpacity="0.95" />
                  <stop offset="58%"  stopColor="#FF5C1C" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#CC2E00" stopOpacity="0.84" />
                </radialGradient>
                <radialGradient id="hBloomGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(255,120,40,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,80,20,0)" />
                </radialGradient>
                <filter id="hBlurFilt">
                  <feGaussianBlur stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              {/* Outer luminous bloom */}
              <path d={HEART_PATH}
                fill="rgba(255,110,35,0.18)"
                transform="scale(1.3) translate(-11.5,-10)"
                filter="url(#hBlurFilt)"
              />
              {/* Mid glow ring */}
              <path d={HEART_PATH}
                fill="rgba(255,140,50,0.12)"
                transform="scale(1.14) translate(-7,-5)"
              />
              {/* Heart body */}
              <path d={HEART_PATH}
                fill="url(#hFillGrad)"
                stroke="rgba(255,210,130,0.6)"
                strokeWidth="1.2"
              />
              {/* Specular arc */}
              <path d="M 30,11 C 35,5 47,6 51,14"
                fill="none" stroke="rgba(255,252,210,0.65)"
                strokeWidth="2.5" strokeLinecap="round" />
              {/* Inner contour depth */}
              <path d={HEART_PATH}
                fill="none" stroke="rgba(180,60,10,0.25)" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </AnimatePresence>

      {/* ── Vein threads (bloom radiate outward) ── */}
      <AnimatePresence>
        {showVeins && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100" preserveAspectRatio="none"
            style={{ animation: 'vein-glow 1.0s ease-in-out infinite' }}>
            <defs>
              <filter id="vBlur">
                <feGaussianBlur stdDeviation="0.65" />
              </filter>
            </defs>
            {veinPaths.map((v, i) => (
              <React.Fragment key={i}>
                {/* Glow halo */}
                <motion.path
                  d={v.d} stroke="rgba(255,145,55,0.35)" strokeWidth="1.4"
                  fill="none" filter="url(#vBlur)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, delay: v.delay, ease: 'easeOut' }}
                />
                {/* Core line */}
                <motion.path
                  d={v.d} stroke="rgba(255,188,88,0.7)" strokeWidth="0.28"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, delay: v.delay, ease: 'easeOut' }}
                />
              </React.Fragment>
            ))}
          </svg>
        )}
      </AnimatePresence>

      {/* ── Organic bloom forms ── */}
      <AnimatePresence>
        {showBloom && bloomForms.map((f, i) => {
          const fills   = ['rgba(55,130,42,0.4)', 'rgba(255,148,62,0.36)', 'rgba(205,100,78,0.33)'];
          const widths  = [12, 20, 9];
          const heights = [22, 16, 28];
          return (
            <div key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${f.x}%`, top: `${f.y}%`,
                width: `${widths[f.shape]}px`,
                height: `${heights[f.shape]}px`,
                transform: 'translate(-50%,-50%)',
                background: `radial-gradient(circle at 38% 28%, rgba(255,240,200,0.38), ${fills[f.shape]})`,
                animation: `impression-float ${f.dur}s ease-in-out ${f.delay}s infinite`,
                filter: 'blur(2px)',
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* ── Warmth overlay (bloom stage) ── */}
      <AnimatePresence>
        {showBloom && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 54%, rgba(255,140,45,0.1) 0%, rgba(185,82,22,0.06) 52%, transparent 75%)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
          />
        )}
      </AnimatePresence>

      {/* ── Living-green edge (reveal) ── */}
      <AnimatePresence>
        {showReveal && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(22,68,14,0.32) 80%, rgba(12,48,6,0.52) 100%)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 4.5 }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          CAPSULE TITLE
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showReveal && (
          <div className="absolute z-40 text-center pointer-events-none"
            style={{ left: '50%', bottom: '9%', transform: 'translateX(-50%)', width: '90%', maxWidth: '350px' }}>

            <motion.p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '9px',
                letterSpacing: '0.5em',
                color: 'rgba(255,192,92,0.65)',
                textTransform: 'uppercase',
                marginBottom: '13px',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.0 }}
            >
              EVERY HEARTBEAT IS A BEGINNING
            </motion.p>


            <motion.p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(255,170,75,0.5)',
                marginTop: '16px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 1.3 }}
            >
              — life begins here —
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* ── Outro ── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div className="absolute inset-0 z-50"
            style={{ background: '#07000d' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
