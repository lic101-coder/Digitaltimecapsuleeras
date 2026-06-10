/**
 * Fresh Start – Blueprint to Reality Ceremony (v6 — Epic Construction)
 *
 * Stage flow:
 * 1. blueprint    (0–3s)    – dark navy + blueprint grid, SVG building draws itself, pencil ✏️
 * 2. foundation   (3–6s)    – dawn sky, concrete slab slides up, workers 👷, crane 🏗️
 * 3. construction (6–11s)   – 6 floors stack up with stagger, floor counter, 8 sparks
 * 4. topping-out  (11–13s)  – gold star at peak, 8 confetti squares, "BUILDING COMPLETE!"
 * 5. radiance     (13–17s)  – golden hour sky, warm glow, light rays, capsule title, skyline
 * 6. outro        (17–18s)  – fade to white
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartKeyKingdomCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

// 6 SVG path segments for the building blueprint drawing
const BLUEPRINT_PATHS = [
  // Outer left wall
  'M 70 200 L 70 55',
  // Outer right wall
  'M 130 200 L 130 55',
  // Roof triangle
  'M 55 55 L 100 18 L 145 55 Z',
  // Top windows
  'M 78 68 L 95 68 L 95 82 L 78 82 Z M 105 68 L 122 68 L 122 82 L 105 82 Z',
  // Mid windows
  'M 78 92 L 95 92 L 95 106 L 78 106 Z M 105 92 L 122 92 L 122 106 L 105 106 Z',
  // Door arch
  'M 86 162 L 86 200 M 114 162 L 114 200 M 86 162 Q 100 148 114 162',
];

// Floor definitions bottom→top
const FLOOR_DEFS = [
  { color: '#0f2547', border: '#1e3a6e' },
  { color: '#162d5a', border: '#1e3f7e' },
  { color: '#1a3570', border: '#244a98' },
  { color: '#1d3d80', border: '#2755b0' },
  { color: '#1e4496', border: '#2b5fc8' },
  { color: '#2250aa', border: '#3068d8' },
];

export function FreshStartKeyKingdomCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete,
}: FreshStartKeyKingdomCeremonyProps) {
  type Stage =
    | 'blueprint'
    | 'foundation'
    | 'construction'
    | 'topping-out'
    | 'radiance'
    | 'outro';

  const [stage, setStage] = useState<Stage>('blueprint');
  const [floorCount, setFloorCount] = useState(0);

  useEffect(() => {
    const events: { time: number; fn: () => void }[] = [
      { time: 0,     fn: () => { setStage('blueprint'); setFloorCount(0); } },
      { time: 3000,  fn: () => setStage('foundation') },
      { time: 6000,  fn: () => setStage('construction') },
      // tick floors up 1–6
      { time: 6400,  fn: () => setFloorCount(1) },
      { time: 6800,  fn: () => setFloorCount(2) },
      { time: 7200,  fn: () => setFloorCount(3) },
      { time: 7600,  fn: () => setFloorCount(4) },
      { time: 8000,  fn: () => setFloorCount(5) },
      { time: 8400,  fn: () => setFloorCount(6) },
      { time: 11000, fn: () => setStage('topping-out') },
      { time: 13000, fn: () => setStage('radiance') },
      { time: 17000, fn: () => setStage('outro') },
      { time: 18000, fn: () => onComplete?.() },
    ];
    const timers = events.map(({ time, fn }) => setTimeout(fn, time));
    const failsafe = setTimeout(() => onComplete?.(), 19000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []);

  // Path draw delays — one per BLUEPRINT_PATHS segment
  const pathDelays = useMemo(() => BLUEPRINT_PATHS.map((_, i) => i * 0.38), []);

  // Pencil dot: travels along a simplified horizontal arc across viewport
  const pencilX = useMemo(() => ['-5%', '30%', '62%', '92%'], []);
  const pencilY = useMemo(() => ['55%', '30%', '48%', '60%'], []);

  // 8 construction sparks: fixed positions near building top-centre
  const sparks = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 42 + Math.random() * 16,   // 42–58% horiz, relative to building area
        angle: (i / 8) * 360,
        dist: 18 + Math.random() * 22,
        delay: Math.random() * 0.3,
      })),
    []
  );

  // 8 confetti squares for topping-out
  const confetti = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 30 + Math.random() * 40,  // % across building width
        color: ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#a855f7', '#f97316', '#ec4899'][i],
        delay: i * 0.07,
        endY: 60 + Math.random() * 80, // px below start
        rotate: Math.random() * 360,
      })),
    []
  );

  // 6 light rays from building peak, fanning outward
  const lightRays = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        rotation: -60 + i * 24,
        width: 20 + Math.random() * 20,
        delay: i * 0.12,
        opacity: 0.35 + Math.random() * 0.25,
      })),
    []
  );

  // Skyline buildings (static, background decoration)
  const skylineBuildings = useMemo(
    () => [
      { left: '2%',  width: '7%',  height: '22%', color: '#0a1628' },
      { left: '10%', width: '5%',  height: '16%', color: '#0c1e36' },
      { left: '16%', width: '9%',  height: '28%', color: '#0a1628' },
      { left: '72%', width: '8%',  height: '24%', color: '#0a1628' },
      { left: '81%', width: '6%',  height: '18%', color: '#0c1e36' },
      { left: '88%', width: '10%', height: '30%', color: '#0a1628' },
    ],
    []
  );

  // Whether we're showing the building block stack
  const showBuilding = ['construction', 'topping-out', 'radiance'].includes(stage);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">

      {/* ── BACKGROUND LAYERS ──────────────────────────────────────────────────── */}

      {/* Base: always dark navy */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #060d1f 0%, #0f1f3d 55%, #060d1f 100%)' }}
      />

      {/* Blueprint grid — blueprint stage */}
      <AnimatePresence>
        {stage === 'blueprint' && (
          <motion.div
            key="bp-grid"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage:
                'linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        )}
      </AnimatePresence>

      {/* Dawn sky — foundation stage */}
      <AnimatePresence>
        {stage === 'foundation' && (
          <motion.div
            key="dawn-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background:
                'linear-gradient(180deg, #0a0f1e 0%, #1a2744 35%, #2d3f6e 60%, #3d5a9c 80%, #5c7cb8 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Construction sky — construction + topping-out */}
      <AnimatePresence>
        {(stage === 'construction' || stage === 'topping-out') && (
          <motion.div
            key="construction-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              background:
                'linear-gradient(180deg, #07111f 0%, #111f3a 30%, #1a2e55 60%, #1e3670 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Golden hour — radiance stage */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="golden-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background:
                'linear-gradient(180deg, #1a0a00 0%, #7c2d12 30%, #ea580c 60%, #fbbf24 85%, #1e3a5f 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── STAGE 1: BLUEPRINT ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'blueprint' && (
          <motion.div
            key="blueprint-stage"
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blueprint SVG */}
            <div className="relative" style={{ width: '52%', maxWidth: 260 }}>
              <svg
                viewBox="0 0 200 210"
                className="w-full"
                style={{ overflow: 'visible' }}
              >
                {/* Faint guide-line grid inside SVG */}
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={`gy-${y}`}
                    x1="20"
                    y1={y}
                    x2="180"
                    y2={y}
                    stroke="rgba(37,99,235,0.18)"
                    strokeWidth="0.8"
                  />
                ))}
                {[40, 80, 120, 160].map((x) => (
                  <line
                    key={`gx-${x}`}
                    x1={x}
                    y1="10"
                    x2={x}
                    y2="205"
                    stroke="rgba(37,99,235,0.18)"
                    strokeWidth="0.8"
                  />
                ))}

                {/* Animated building paths */}
                {BLUEPRINT_PATHS.map((d, i) => (
                  <motion.path
                    key={`bp-path-${i}`}
                    d={d}
                    fill="none"
                    stroke={i < 2 ? '#93c5fd' : i === 2 ? '#bfdbfe' : '#60a5fa'}
                    strokeWidth={i < 3 ? 2.5 : 1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { delay: pathDelays[i], duration: 0.7, ease: 'easeInOut' },
                      opacity: { delay: pathDelays[i], duration: 0.1 },
                    }}
                  />
                ))}

                {/* Dimension tick marks */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0, duration: 0.4 }}
                >
                  <line x1="55" y1="205" x2="145" y2="205" stroke="#3b82f6" strokeWidth="1" />
                  <line x1="55" y1="202" x2="55" y2="208" stroke="#3b82f6" strokeWidth="1" />
                  <line x1="145" y1="202" x2="145" y2="208" stroke="#3b82f6" strokeWidth="1" />
                </motion.g>
              </svg>

              {/* Pencil emoji travelling along the top */}
              <motion.div
                className="absolute pointer-events-none text-lg"
                style={{ top: 0, left: 0 }}
                initial={{ x: '-10%', y: '90%', opacity: 0 }}
                animate={{
                  x: ['−10%', '10%', '42%', '78%', '95%'],
                  y: ['90%', '40%', '20%', '35%', '60%'],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{ duration: 2.3, delay: 0.1, ease: 'easeInOut' }}
              >
                ✏️
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.div
              className="mt-5 text-center px-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold"
                style={{ color: '#93c5fd' }}
              >
                Architecture of Your Future
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 2: FOUNDATION ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'foundation' && (
          <motion.div
            key="foundation-stage"
            className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-[12%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Concrete slab */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                width: '52%',
                maxWidth: 280,
                height: 52,
                background: 'linear-gradient(180deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
              }}
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
            >
              {/* Rebar lines */}
              {[20, 40, 60, 80].map((pct) => (
                <div
                  key={pct}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${pct}%`,
                    width: 2,
                    background: 'rgba(0,0,0,0.3)',
                  }}
                />
              ))}
              <span
                className="relative z-10 text-xs font-bold uppercase tracking-widest"
                style={{ color: '#d1d5db' }}
              >
                Foundation
              </span>
            </motion.div>

            {/* Breaking Ground text */}
            <motion.p
              className="mt-4 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: '#fbbf24' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              ⚒️ Breaking Ground
            </motion.p>

            {/* Left worker */}
            <motion.div
              className="absolute text-3xl"
              style={{ bottom: '15%', left: '12%' }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.4 }}
            >
              👷
            </motion.div>

            {/* Right worker */}
            <motion.div
              className="absolute text-3xl"
              style={{ bottom: '15%', right: '12%' }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.55 }}
            >
              👷
            </motion.div>

            {/* Crane descending from top-right */}
            <motion.div
              className="absolute text-4xl"
              style={{ top: '4%', right: '8%' }}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.8 }}
            >
              🏗️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 3: CONSTRUCTION ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'construction' && (
          <motion.div
            key="construction-stage"
            className="absolute inset-0 z-20 flex flex-col items-center justify-end"
            style={{ paddingBottom: '8%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Crane (persistent) */}
            <motion.div
              className="absolute text-4xl"
              style={{ top: '4%', right: '8%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              🏗️
            </motion.div>

            {/* Left worker */}
            <motion.div
              className="absolute text-3xl"
              style={{ bottom: '9%', left: '8%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              👷
            </motion.div>

            {/* Right worker */}
            <motion.div
              className="absolute text-3xl"
              style={{ bottom: '9%', right: '8%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              👷
            </motion.div>

            {/* Building stack */}
            <div
              className="relative flex flex-col-reverse"
              style={{ width: '50%', maxWidth: 280 }}
            >
              {FLOOR_DEFS.map((floor, i) => (
                <motion.div
                  key={`floor-${i}`}
                  className="relative"
                  style={{
                    height: 46,
                    background: floor.color,
                    border: `1.5px solid ${floor.border}`,
                    borderBottom: i === 0 ? `1.5px solid ${floor.border}` : 'none',
                    // Window pattern via repeating-linear-gradient
                    backgroundImage: `
                      linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 24%,
                        rgba(255,255,255,0.12) 25%,
                        rgba(255,255,255,0.12) 26%
                      )
                    `,
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.4)',
                  }}
                  initial={{ y: 80, opacity: 0, scaleX: 0.8 }}
                  animate={{ y: 0, opacity: 1, scaleX: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                    delay: 0.35 + i * 0.4,
                  }}
                >
                  {/* Window row highlights (CSS-only, no extra elements) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, transparent, transparent 22%, rgba(147,197,253,0.18) 23%, rgba(147,197,253,0.18) 27%, transparent 28%)',
                      backgroundSize: '25% 100%',
                      backgroundPositionY: '30%',
                      backgroundRepeat: 'repeat-x',
                      height: '55%',
                      top: '20%',
                    }}
                  />
                </motion.div>
              ))}

              {/* Foundation base */}
              <div
                style={{
                  height: 20,
                  background: 'linear-gradient(180deg, #374151 0%, #1f2937 100%)',
                  borderRadius: '0 0 4px 4px',
                }}
              />
            </div>

            {/* Floor counter */}
            <AnimatePresence mode="wait">
              {floorCount > 0 && (
                <motion.div
                  key={`fc-${floorCount}`}
                  className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
                  initial={{ opacity: 0, scale: 0.7, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <span
                    className="text-2xl font-black tabular-nums"
                    style={{ color: '#fbbf24', textShadow: '0 0 12px rgba(251,191,36,0.8)' }}
                  >
                    FLOOR {floorCount}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 8 sparks — single-play, appear when last floor lands */}
            {floorCount >= 6 &&
              sparks.map((spark) => {
                const rad = (spark.angle * Math.PI) / 180;
                const tx = Math.cos(rad) * spark.dist;
                const ty = Math.sin(rad) * spark.dist - spark.dist * 0.5;
                return (
                  <motion.div
                    key={`spark-${spark.id}`}
                    className="absolute rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: '#fbbf24',
                      boxShadow: '0 0 6px 2px rgba(251,191,36,0.9)',
                      bottom: `calc(8% + 280px)`,
                      left: `${spark.x}%`,
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 0], x: tx, y: ty, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.7, delay: spark.delay, ease: 'easeOut' }}
                  />
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 4: TOPPING-OUT ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'topping-out' && (
          <motion.div
            key="topping-out-stage"
            className="absolute inset-0 z-20 flex flex-col items-center justify-end"
            style={{ paddingBottom: '8%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Building silhouette (static for this stage) */}
            <div
              className="relative flex flex-col-reverse"
              style={{ width: '50%', maxWidth: 280 }}
            >
              {FLOOR_DEFS.map((floor, i) => (
                <div
                  key={`floor-static-${i}`}
                  style={{
                    height: 46,
                    background: floor.color,
                    border: `1.5px solid ${floor.border}`,
                    borderBottom: i === 0 ? `1.5px solid ${floor.border}` : 'none',
                    backgroundImage: `
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 24%,
                        rgba(255,255,255,0.12) 25%,
                        rgba(255,255,255,0.12) 26%
                      )
                    `,
                  }}
                />
              ))}
              <div
                style={{
                  height: 20,
                  background: 'linear-gradient(180deg, #374151 0%, #1f2937 100%)',
                  borderRadius: '0 0 4px 4px',
                }}
              />

              {/* Gold star at peak */}
              <motion.div
                className="absolute left-1/2 text-3xl"
                style={{ top: -32, transform: 'translateX(-50%)' }}
                initial={{ scale: 0, rotate: -30, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              >
                ⭐
              </motion.div>

              {/* Flag at peak */}
              <motion.div
                className="absolute text-2xl"
                style={{ top: -52, left: '56%' }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
              >
                🚩
              </motion.div>

              {/* 8 confetti squares bursting from peak */}
              {confetti.map((c) => (
                <motion.div
                  key={`conf-${c.id}`}
                  className="absolute"
                  style={{
                    width: 8,
                    height: 8,
                    background: c.color,
                    left: `${c.x}%`,
                    top: -10,
                    borderRadius: 1,
                  }}
                  initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
                  animate={{
                    y: c.endY,
                    x: (c.x - 50) * 1.2,
                    opacity: [1, 1, 0],
                    rotate: c.rotate,
                    scale: [1, 1, 0.3],
                  }}
                  transition={{ duration: 1.2, delay: c.delay, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* BUILDING COMPLETE stamp */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 text-center px-6"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <p
                className="text-2xl md:text-3xl font-black uppercase tracking-widest"
                style={{
                  color: '#fbbf24',
                  textShadow: '0 0 20px rgba(251,191,36,0.9), 0 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                Building Complete!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 5: RADIANCE ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance-stage"
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            {/* City skyline silhouette */}
            {skylineBuildings.map((b, i) => (
              <div
                key={`sky-${i}`}
                className="absolute bottom-0"
                style={{
                  left: b.left,
                  width: b.width,
                  height: b.height,
                  background: b.color,
                }}
              />
            ))}

            {/* Radial amber glow behind main building */}
            <div
              className="absolute"
              style={{
                bottom: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '65%',
                height: '55%',
                background:
                  'radial-gradient(ellipse at center bottom, rgba(251,191,36,0.3) 0%, rgba(234,88,12,0.15) 45%, transparent 75%)',
                filter: 'blur(24px)',
              }}
            />

            {/* Light rays anchored at building peak */}
            {lightRays.map((ray) => (
              <motion.div
                key={`ray-${ray.id}`}
                className="absolute"
                style={{
                  width: ray.width,
                  height: '35%',
                  top: '18%',
                  left: '50%',
                  transformOrigin: 'top center',
                  transform: `translateX(-50%) rotate(${ray.rotation}deg)`,
                  background:
                    'linear-gradient(to bottom, rgba(251,191,36,0.6), transparent)',
                  borderRadius: '0 0 50% 50%',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: ray.opacity }}
                transition={{ duration: 0.6, delay: ray.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Main building — glowing */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col-reverse"
              style={{
                bottom: '8%',
                width: '50%',
                maxWidth: 280,
              }}
            >
              {FLOOR_DEFS.map((floor, i) => (
                <motion.div
                  key={`floor-rad-${i}`}
                  style={{
                    height: 46,
                    background: floor.color,
                    border: `1.5px solid ${floor.border}`,
                    borderBottom: i === 0 ? `1.5px solid ${floor.border}` : 'none',
                    backgroundImage: `
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 22%,
                        rgba(254,240,138,0.22) 23%,
                        rgba(254,240,138,0.22) 27%,
                        transparent 28%
                      )
                    `,
                    boxShadow: `0 0 16px rgba(251,191,36,0.18), inset 0 0 8px rgba(254,240,138,0.05)`,
                  }}
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                />
              ))}
              <div
                style={{
                  height: 20,
                  background: 'linear-gradient(180deg, #374151 0%, #1f2937 100%)',
                  borderRadius: '0 0 4px 4px',
                }}
              />

              {/* Star at peak */}
              <div
                className="absolute left-1/2 text-2xl"
                style={{ top: -28, transform: 'translateX(-50%)' }}
              >
                ⭐
              </div>
            </div>

            {/* Title text */}
            <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-8 px-6 text-center gap-3">
              <motion.p
                className="text-xs uppercase tracking-[0.3em] font-semibold"
                style={{ color: '#fbbf24' }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your New Chapter Begins
              </motion.p>
              {capsuleTitle && (
                <motion.h2
                  className="text-3xl md:text-5xl font-black text-white"
                  style={{
                    textShadow:
                      '0 0 30px rgba(251,191,36,0.7), 0 2px 8px rgba(0,0,0,0.8)',
                    lineHeight: 1.1,
                  }}
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 160, damping: 18 }}
                >
                  {capsuleTitle}
                </motion.h2>
              )}
              <motion.div
                className="h-0.5 rounded-full"
                style={{
                  width: 80,
                  background:
                    'linear-gradient(90deg, transparent, rgba(251,191,36,0.9), transparent)',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              />

              {/* Ambient slow pulse line */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '60%',
                  height: 4,
                  borderRadius: 999,
                  background:
                    'radial-gradient(ellipse at center, rgba(251,191,36,0.5) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                  bottom: '6%',
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OUTRO: WHITE FADE ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro"
            className="absolute inset-0 bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
