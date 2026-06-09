/**
 * Fresh Start – Blueprint to Reality Ceremony (v4 — Single Continuous Building)
 *
 * ONE building grows from sketch → colour → 3-D reality without ever
 * disappearing or being replaced by a different building.
 *
 * Stage flow:
 * 1. title   (0 – 1s)    – capsule title reveal
 * 2. canvas  (1 – 3.5s)  – blank paper, hand + pencil arriving
 * 3. sketch  (3.5 – 7s)  – building outline draws itself on paper
 * 4. color   (7 – 10.5s) – colour floods into the same outline; paint splashes
 * 5. peel    (10.5 – 14s)– paper background peels away; building revealed on sky
 * 6. reality (14 – 18s)  – final building with full environment & celebration
 * 7. outro   (18 – 19s)  – white fade
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartKeyKingdomCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

/* ─── Shared building constants ──────────────────────────────────────────── */
const BW = 160;   // SVG viewBox width
const BH = 200;   // SVG viewBox height
const WINDOWS = Array.from({ length: 24 }, (_, i) => ({ col: i % 4, row: Math.floor(i / 4) }));

export function FreshStartKeyKingdomCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: FreshStartKeyKingdomCeremonyProps) {
  const [stage, setStage] = useState<'title' | 'canvas' | 'sketch' | 'color' | 'peel' | 'reality' | 'outro'>('title');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('title')   },
      { time: 1000,  action: () => setStage('canvas')  },
      { time: 3500,  action: () => setStage('sketch')  },
      { time: 7000,  action: () => setStage('color')   },
      { time: 10500, action: () => setStage('peel')    },
      { time: 14000, action: () => setStage('reality') },
      { time: 18000, action: () => setStage('outro')   },
      { time: 19000, action: () => onComplete?.()      },
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    const failsafe = setTimeout(() => { setCompleted(true); onComplete?.(); }, 20000);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []);

  /* Which stages show the building */
  const buildingVisible  = ['sketch', 'color', 'peel', 'reality'].includes(stage);
  /* Whether the building has filled colour yet */
  const buildingColoured = ['color', 'peel', 'reality'].includes(stage);
  /* Whether it's fully in 3-D reality mode */
  const buildingReality  = stage === 'reality';

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* ── BACKGROUND LAYER (changes each stage) ──────────────────────────── */}

      {/* Dark intro */}
      <AnimatePresence>
        {stage === 'title' && (
          <motion.div key="bg-title" className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
        )}
      </AnimatePresence>

      {/* Paper background (canvas + sketch + color) */}
      <AnimatePresence>
        {(stage === 'canvas' || stage === 'sketch' || stage === 'color') && (
          <motion.div key="bg-paper" className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.5 }}>
            {/* Ruled lines */}
            {[...Array(30)].map((_, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-blue-50" style={{ top: `${(i + 1) * 3.33}%` }} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sky background (peel reveals it, reality keeps it) */}
      <AnimatePresence>
        {(stage === 'peel' || stage === 'reality') && (
          <motion.div key="bg-sky" className="absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-300 to-green-200"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {/* Sun rays */}
            {[...Array(14)].map((_, i) => (
              <motion.div key={`sr-${i}`} className="absolute top-[18%] left-[28%] w-3 origin-left"
                style={{ height: '45%', background: 'linear-gradient(to right, rgba(251,191,36,0.18), transparent)',
                  transform: `rotate(${-55 + i * 9}deg)`, transformOrigin: 'left center' }}
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
            {/* Clouds */}
            {[...Array(5)].map((_, i) => (
              <motion.div key={`cl-${i}`} className="absolute text-5xl opacity-80"
                style={{ left: `${8 + i * 20}%`, top: `${7 + (i % 2) * 10}%` }}
                animate={{ x: [0, 30, 0], y: [0, -8, 0] }}
                transition={{ duration: 18, delay: i * 0.8, repeat: completed ? 0 : 2, ease: 'easeInOut' }}>☁️</motion.div>
            ))}
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-green-400 to-green-600 overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <motion.div key={`gr-${i}`} className="absolute bottom-0 w-1 bg-green-700 rounded-t-full"
                  style={{ left: `${i * 2}%`, height: 8 + Math.floor(Math.random() * 14) }}
                  animate={{ scaleY: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: i * 0.05, repeat: completed ? 0 : 5, ease: 'easeInOut' }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CANVAS STAGE EXTRAS ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'canvas' && (
          <>
            {/* Dramatic light rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div key={`lr-${i}`} className="absolute top-0 left-1/2 w-2 origin-top"
                style={{ height: '60%', background: 'linear-gradient(to bottom,rgba(251,191,36,0.2),transparent)',
                  transform: `rotate(${-60 + i * 15}deg)`, transformOrigin: 'top center' }}
                initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: [0, 0.6, 0.3], scaleY: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }} />
            ))}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[12%] bg-gradient-to-r from-slate-600 to-slate-800 px-10 py-4 rounded-full border-2 border-slate-300 shadow-2xl z-50"
              initial={{ opacity: 0, y: -50, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.4, type: 'spring', damping: 8 }}>
              <span className="text-2xl font-black text-white">Where Dreams Begin... ✨</span>
            </motion.div>
            {/* Pencil arriving */}
            <motion.div className="absolute right-[20%] top-[35%] text-9xl z-30"
              initial={{ x: 200, y: -150, opacity: 0, rotate: -60, scale: 0.5 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.6, type: 'spring', damping: 12 }}>✍️</motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SKETCH STAGE EXTRAS ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'sketch' && (
          <>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-blue-500 to-indigo-700 px-10 py-4 rounded-full border-2 border-blue-200 shadow-2xl z-50"
              initial={{ opacity: 0, y: -40, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 9 }}>
              <span className="text-2xl font-black text-white">Drawing Your Vision... 📐</span>
            </motion.div>
            {/* Travelling pencil */}
            <motion.div className="absolute text-5xl z-40"
              initial={{ x: '30%', y: '15%' }}
              animate={{ x: ['30%', '50%', '70%', '50%', '30%'], y: ['15%', '25%', '45%', '65%', '75%'] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, delay: 0.3, ease: 'linear' }}>✏️</motion.div>
            {/* Pencil shavings */}
            {[...Array(20)].map((_, i) => (
              <motion.div key={`sh-${i}`} className="absolute rounded-sm"
                style={{ width: 2 + Math.random() * 4, height: 2 + Math.random() * 6,
                  background: i % 3 === 0 ? '#94a3b8' : '#cbd5e1',
                  left: `${42 + Math.random() * 20}%`, top: `${50 + Math.random() * 15}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0.4], scale: [0, 1, 0.8], rotate: Math.random() * 360 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: 'easeOut' }} />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── COLOR STAGE EXTRAS ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'color' && (
          <>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-12 py-4 rounded-full border-4 border-white shadow-2xl z-50"
              initial={{ opacity: 0, y: -50, scale: 0.3, rotate: -10 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 1, delay: 0.5, type: 'spring', damping: 10 }}>
              <span className="text-2xl font-black text-white">Bringing Dreams to Life! 🎨</span>
            </motion.div>
            {/* Paint explosion particles */}
            {[...Array(120)].map((_, i) => (
              <motion.div key={`sp-${i}`} className="absolute rounded-full z-10"
                style={{ width: 6 + Math.random() * 10, height: 6 + Math.random() * 10, left: '50%', top: '50%',
                  background: ['#f59e0b','#ec4899','#8b5cf6','#3b82f6','#10b981','#ef4444'][i % 6],
                  filter: 'blur(3px)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 1], opacity: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 500, y: (Math.random() - 0.5) * 500 }}
                transition={{ duration: 2, delay: i * 0.012, ease: [0.16, 1, 0.3, 1] }} />
            ))}
            {/* Dripping paint from top */}
            {[...Array(14)].map((_, i) => (
              <motion.div key={`dp-${i}`} className="absolute w-3 rounded-full z-10"
                style={{ left: `${8 + i * 6.5}%`, top: '-5%',
                  background: ['#f59e0b','#ec4899','#8b5cf6','#3b82f6','#10b981'][i % 5],
                  filter: 'blur(1px)' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: [0, 40 + Math.random() * 60, 50 + Math.random() * 80], opacity: [0, 0.8, 0.5] }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: 'easeOut' }} />
            ))}
            {/* Giant paintbrush sweeping */}
            <motion.div className="absolute text-9xl z-40"
              initial={{ x: '-20%', y: '50%', opacity: 0, rotate: -45 }}
              animate={{ x: '75%', y: '45%', opacity: [0, 1, 1, 0], rotate: 15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}>🖌️</motion.div>
            {/* Watercolour splatters */}
            {[...Array(20)].map((_, i) => (
              <motion.div key={`wc-${i}`} className="absolute rounded-full"
                style={{ width: 20 + Math.random() * 40, height: 20 + Math.random() * 40,
                  left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                  background: ['#f59e0b','#ec4899','#8b5cf6','#3b82f6'][i % 4],
                  filter: 'blur(8px)' }}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.25 }}
                transition={{ duration: 0.8, delay: 0.5 + Math.random() * 1.5 }} />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ── PEEL STAGE EXTRAS ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'peel' && (
          <>
            {/* Paper layer peeling away — building is NOT on this layer */}
            <motion.div className="absolute inset-0 origin-top-left z-30 shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #e9d5ff 50%, #dbeafe 100%)',
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
              animate={{ scaleX: [1, 0.5, 0], scaleY: [1, 0.6, 0], x: [0, 200, 500], y: [0, 100, -400], rotate: [0, 25, 70], opacity: [1, 0.8, 0] }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}>
              {/* Crack lines radiating on the paper before it tears */}
              {[...Array(8)].map((_, i) => (
                <motion.div key={`ck-${i}`} className="absolute left-[40%] top-[40%] w-px bg-slate-600 origin-left"
                  style={{ height: 80 + Math.random() * 120, transform: `rotate(${-30 + i * 15}deg)` }}
                  initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 0.4 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }} />
              ))}
            </motion.div>

            {/* Paper fragment explosion */}
            {[...Array(70)].map((_, i) => (
              <motion.div key={`tf-${i}`} className="absolute rounded-sm shadow z-40"
                style={{ width: 10 + Math.random() * 35, height: 10 + Math.random() * 35,
                  background: ['#fce7f3','#e9d5ff','#dbeafe'][i % 3],
                  left: `${30 + Math.random() * 40}%`, top: `${30 + Math.random() * 40}%` }}
                initial={{ opacity: 1, rotate: 0, scale: 1 }}
                animate={{ opacity: 0, rotate: (Math.random() - 0.5) * 900,
                  x: (Math.random() - 0.5) * 700, y: -350 - Math.random() * 300, scale: [1, 1.2, 0.3] }}
                transition={{ duration: 2.2, delay: 0.3 + i * 0.02, ease: [0.16, 1, 0.3, 1] }} />
            ))}

            {/* Label */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[8%] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-12 py-4 rounded-full border-4 border-white shadow-2xl z-50"
              initial={{ opacity: 0, scale: 0, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.8, type: 'spring', damping: 10 }}>
              <span className="text-2xl font-black text-white">Reality Breaking Through! 💥</span>
            </motion.div>

            {/* Impact shockwave */}
            <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white z-50"
              initial={{ scale: 0, opacity: 0.9 }} animate={{ scale: 7, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} />
          </>
        )}
      </AnimatePresence>

      {/* ── REALITY STAGE EXTRAS ────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'reality' && (
          <>
            {/* "YOUR DREAM IS REAL!" title */}
            <motion.div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-50 w-full px-4"
              initial={{ opacity: 0, y: -80, scale: 0.3, rotate: -15 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 1.5, type: 'spring', damping: 12 }}>
              <motion.h1
                className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent"
                style={{ WebkitTextStroke: '3px rgba(255,255,255,0.4)',
                  filter: 'drop-shadow(0 0 30px rgba(251,191,36,1)) drop-shadow(0 0 60px rgba(249,115,22,0.8))' }}
                animate={{ scale: [1, 1.07, 1] }}
                transition={{ duration: 2, repeat: completed ? 0 : 6, ease: 'easeInOut' }}>
                YOUR DREAM IS REAL!
              </motion.h1>
            </motion.div>

            {/* Confetti storm */}
            {[...Array(180)].map((_, i) => (
              <motion.div key={`cf-${i}`} className="absolute rounded-full z-40"
                style={{ width: 3 + Math.random() * 5, height: 3 + Math.random() * 5,
                  left: `${Math.random() * 100}%`, top: '-10%',
                  background: ['#fbbf24','#f59e0b','#fb923c','#ffffff','#fef08a'][i % 5] }}
                animate={{ y: [0, 1300], rotate: [0, Math.random() * 720], opacity: [0, 1, 0.9, 0], x: Math.sin(i) * 90 }}
                transition={{ duration: 3 + Math.random() * 2, delay: 1.5 + i * 0.015, ease: 'linear' }} />
            ))}

            {/* Fireworks */}
            {[...Array(7)].map((_, i) => (
              <motion.div key={`fw-${i}`} className="absolute z-40" style={{ left: `${15 + i * 13}%`, top: '18%' }}>
                <motion.div className="w-4 h-4 rounded-full bg-yellow-300"
                  animate={{ opacity: [0, 1, 0], scale: [0, 10, 0] }}
                  transition={{ duration: 1.8, delay: 2.5 + i * 0.4 }} />
                {[...Array(10)].map((_, j) => (
                  <motion.div key={j} className="absolute w-2 h-2 rounded-full"
                    style={{ background: ['#fbbf24','#ef4444','#ec4899'][j % 3], left: '50%', top: '50%' }}
                    animate={{ x: Math.cos((j / 10) * Math.PI * 2) * 70, y: [0, Math.sin((j / 10) * Math.PI * 2) * 70, Math.sin((j / 10) * Math.PI * 2) * 70 + 90], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{ duration: 2, delay: 2.5 + i * 0.4 }} />
                ))}
              </motion.div>
            ))}

            {/* Sparkles around building */}
            {[...Array(35)].map((_, i) => (
              <motion.div key={`sk-${i}`} className="absolute text-3xl z-40"
                style={{ left: `${32 + Math.random() * 36}%`, top: `${32 + Math.random() * 38}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0, 2, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 2, delay: 1 + i * 0.09, repeat: completed ? 0 : 2, repeatDelay: 1.5 }}>✨</motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          THE ONE PERSISTENT BUILDING — visible from sketch through reality
          Never removed, only changes appearance based on stage
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {buildingVisible && (
          <motion.div
            key="the-building"
            className="absolute left-1/2 -translate-x-1/2 z-20"
            style={{
              bottom: buildingReality ? '6.5%' : '12%',
              width: buildingReality ? '300px' : '260px',
            }}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3-D depth shadow only in reality mode */}
            {buildingReality && (
              <motion.div
                className="absolute -inset-4 rounded-t-2xl"
                style={{ boxShadow: '0 -20px 80px rgba(245,158,11,0.55), 0 0 130px rgba(251,191,36,0.38)', zIndex: -1 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
            )}

            <svg viewBox={`0 0 ${BW} ${BH}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>

              {/* ── Main body ────────────────────────────────────────────── */}
              <motion.rect x="30" y="10" width="100" height="160"
                fill={buildingColoured ? '#fbbf24' : 'none'}
                stroke={buildingColoured ? '#92400e' : '#1e293b'}
                strokeWidth={buildingColoured ? 3 : 4}
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: stage === 'sketch' ? 0 : 1, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1,
                  fill: buildingColoured ? '#fbbf24' : 'none',
                  filter: buildingReality ? 'drop-shadow(0 4px 12px rgba(251,191,36,0.4))' : 'none' }}
                transition={{ pathLength: { duration: 1.5, delay: 0.4, ease: 'easeInOut' }, fill: { duration: 0.8 }, opacity: { duration: 0.3 } }}
              />

              {/* ── Windows ──────────────────────────────────────────────── */}
              {WINDOWS.map(({ col, row }, i) => (
                <motion.rect key={`w-${i}`}
                  x={45 + col * 18} y={25 + row * 20} width="10" height="12"
                  fill={buildingColoured ? '#93c5fd' : 'none'}
                  stroke={buildingColoured ? '#1e3a8a' : '#1e293b'}
                  strokeWidth={buildingColoured ? 2 : 2}
                  initial={{ pathLength: stage === 'sketch' ? 0 : 1, scale: 0 }}
                  animate={{
                    pathLength: 1, scale: 1,
                    fill: buildingColoured ? (buildingReality && i % 3 === 0 ? undefined : '#93c5fd') : 'none',
                    ...(buildingReality && i % 3 === 0
                      ? { fill: ['#7dd3fc', '#fef08a', '#7dd3fc'] as any,
                          boxShadow: ['0 0 4px rgba(254,240,138,0.4)', '0 0 12px rgba(254,240,138,1)', '0 0 4px rgba(254,240,138,0.4)'] as any }
                      : {})
                  }}
                  transition={{ pathLength: { duration: 0.25, delay: stage === 'sketch' ? 1.8 + i * 0.04 : 0 },
                    scale: { duration: 0.25, delay: stage === 'sketch' ? 1.8 + i * 0.04 : buildingColoured ? 2 + i * 0.03 : 0, type: 'spring', stiffness: 220 },
                    fill: buildingReality ? { duration: 2, delay: i * 0.1, repeat: completed ? 0 : 4 } : { duration: 0.6, delay: buildingColoured ? 2 + i * 0.03 : 0 } }}
                />
              ))}

              {/* ── Storefront base ──────────────────────────────────────── */}
              <motion.rect x="30" y="170" width="100" height="30"
                fill={buildingColoured ? '#1e40af' : 'none'}
                stroke={buildingColoured ? '#1e3a8a' : '#1e293b'}
                strokeWidth={buildingColoured ? 3 : 4}
                initial={{ pathLength: stage === 'sketch' ? 0 : 1, scaleY: buildingColoured ? 0 : 1 }}
                animate={{ pathLength: 1, scaleY: 1,
                  fill: buildingColoured ? '#1e40af' : 'none' }}
                transition={{ pathLength: { duration: 0.6, delay: stage === 'sketch' ? 2.8 : 0 },
                  scaleY: { duration: 0.6, delay: buildingColoured ? 2.7 : 0, ease: 'backOut' },
                  fill: { duration: 0.4, delay: buildingColoured ? 2.6 : 0 } }}
              />

              {/* ── Glass doors (coloured stages only) ───────────────────── */}
              {buildingColoured && (<>
                <motion.rect x="40" y="175" width="18" height="20" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 3 }} />
                <motion.rect x="102" y="175" width="18" height="20" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 3 }} />
                {/* Door divider */}
                <motion.line x1="80" y1="170" x2="80" y2="200" stroke="#0c4a6e" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 3.1 }} />
              </>)}

              {/* ── Sign above door ───────────────────────────────────────── */}
              <motion.rect x="50" y="155" width="60" height="12"
                fill={buildingColoured ? '#fbbf24' : 'none'}
                stroke={buildingColoured ? '#92400e' : '#1e293b'}
                strokeWidth={2}
                initial={{ pathLength: stage === 'sketch' ? 0 : 1, scale: 0 }}
                animate={{ pathLength: 1, scale: 1, fill: buildingColoured ? '#fbbf24' : 'none' }}
                transition={{ pathLength: { duration: 0.5, delay: stage === 'sketch' ? 3.2 : 0 },
                  scale: { duration: 0.5, delay: stage === 'sketch' ? 3.2 : buildingColoured ? 3.2 : 0, type: 'spring', bounce: 0.4 },
                  fill: { duration: 0.4, delay: 3 } }} />

              {/* ── "YOUR SHOP" text on sign (reality only) ──────────────── */}
              {buildingReality && (
                <motion.text x="80" y="164" textAnchor="middle"
                  fontSize="6" fontWeight="bold" fill="#78350f"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }}>
                  YOUR SHOP
                </motion.text>
              )}

              {/* ── Awning stripes (coloured+) ─────────────────────────── */}
              {buildingColoured && (
                <motion.rect x="30" y="155" width="100" height="6" fill="#ef4444"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 3.4, ease: 'backOut' }} />
              )}
            </svg>

            {/* ── Ground shadow in reality mode ──────────────────────────── */}
            {buildingReality && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-3 rounded-full"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%)', zIndex: 2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TITLE stage ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'title' && capsuleTitle && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-bold text-purple-400 drop-shadow-2xl text-center px-8">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OUTRO ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div className="absolute inset-0 bg-white z-[60]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
        )}
      </AnimatePresence>
    </div>
  );
}
