/**
 * Fresh Start — "The Hourglass Flip"
 *
 * Story: An ornate brass hourglass hangs in the void, heavy with
 * ashen sand (the past). Ancient weight settles. A long beat of
 * silence — then the hourglass tilts, rotates on its own, and rights
 * itself. Dark sand scatters like ash. Pure gold cascades from above.
 * Light blooms. The capsule title rises from the warmth.
 *
 * No hands. The glass moves of its own accord — time chooses itself.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartDigitalAvatarCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

/* ─────────────────────── CSS ─────────────────────── */
const CSS = `
@keyframes dust-float {
  0%   { transform: translateY(0) scale(1);       opacity: 0; }
  15%  { opacity: 0.55; }
  85%  { opacity: 0.30; }
  100% { transform: translateY(-70px) scale(0.35); opacity: 0; }
}
@keyframes grain-gold {
  0%   { transform: translateY(0);     opacity: 0; }
  6%   { opacity: 0.95; }
  94%  { opacity: 0.80; }
  100% { transform: translateY(224px); opacity: 0; }
}
@keyframes grain-sparkle {
  0%   { transform: translateY(0) scale(1);       opacity: 0; }
  6%   { opacity: 1; }
  50%  { transform: translateY(112px) scale(1.7); opacity: 1; }
  94%  { opacity: 0.85; }
  100% { transform: translateY(224px) scale(0.7); opacity: 0; }
}
@keyframes glass-glow-pulse {
  0%,100% { opacity: 0.45; }
  50%     { opacity: 1; }
}
@keyframes mote-rise {
  0%   { transform: translateY(0) scale(1);        opacity: 0; }
  10%  { opacity: 0.8; }
  100% { transform: translateY(-160px) scale(0.4); opacity: 0; }
}
@keyframes gold-shimmer {
  0%,100% { text-shadow: 0 0 22px rgba(255,200,55,0.75), 0 0 55px rgba(255,175,25,0.4); }
  50%     { text-shadow: 0 0 40px rgba(255,225,90,1),   0 0 90px rgba(255,210,60,0.7); }
}
@keyframes sand-settle {
  from { transform: scaleY(0); transform-origin: bottom; }
  to   { transform: scaleY(1); transform-origin: bottom; }
}
@keyframes neck-trickle {
  0%,100% { opacity: 0; }
  10%,80%  { opacity: 0.8; }
}
@keyframes sand-spin-out {
  0%   { opacity: 1; }
  55%  { opacity: 0.6; }
  100% { opacity: 0; }
}
@keyframes gold-pool-fill {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes bg-breathe {
  0%,100% { opacity: 0.6; }
  50%     { opacity: 1; }
}
@keyframes frame-glow-ring {
  0%   { transform: translate(-50%,-50%) scale(0.95); opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(2.2);  opacity: 0; }
}
`;

/* ─────────────────────── Unique ID ─────────────────────── */
const uid = Math.random().toString(36).slice(2, 8);

/* ─────────────────────── Types ─────────────────────── */
interface GrainDef {
  cx: number;
  cy: number;
  r: number;
  dur: number;
  delay: number;
  sparkle: boolean;
  color: string;
}

type Stage = 'void' | 'weight' | 'settle' | 'flip' | 'cascade' | 'bloom' | 'reveal' | 'outro';

/* ─────────────────────── Hourglass SVG ─────────────────────── */
/*
 * viewBox 0 0 160 280 — ornate brass frame with:
 *   Top/bottom caps (y=0–26 / y=254–280), beveled
 *   Left pillar x=5–19, right x=141–155
 *   Neck band y=128–152
 *   4 ornate corner rivets
 *   Glass bulbs (curves, neck at y=140/142)
 */
function HourglassSVG({
  showOldSand,
  showCascade,
  grains,
  glowAmt,
  stage,
}: {
  showOldSand: boolean;
  showCascade: boolean;
  grains: GrainDef[];
  glowAmt: number;
  stage: Stage;
}) {
  const brass   = '#B8860B';
  const brassLt = '#D4A020';
  const brassHi = '#F2C840';
  const brassDeep = '#7A5800';
  const glassFill = 'rgba(210,235,255,0.055)';
  const glassStk  = 'rgba(200,225,255,0.32)';
  const glowOpacity = 0.35 + glowAmt * 0.65;
  const glowColor   = `rgba(255,205,65,${glowOpacity})`;

  return (
    <svg viewBox="0 0 160 280" width="160" height="280"
      style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <clipPath id={`glassFull-${uid}`}>
          <path d="M 30,24 C 30,85 73,115 73,140 L 73,142 C 73,168 30,205 30,258 L 130,258 C 130,205 87,168 87,142 L 87,140 C 87,115 130,85 130,24 Z" />
        </clipPath>
        <clipPath id={`topBulb-${uid}`}>
          <path d="M 30,24 C 30,85 73,115 73,140 L 87,140 C 87,115 130,85 130,24 Z" />
        </clipPath>
        <clipPath id={`botBulb-${uid}`}>
          <path d="M 73,142 C 73,168 30,205 30,258 L 130,258 C 130,205 87,168 87,142 Z" />
        </clipPath>

        <linearGradient id={`darkSand-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7A4410" stopOpacity="0.5" />
          <stop offset="40%"  stopColor="#4A2008" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#160602" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`goldSand-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFE890" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#FFB820" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C87800" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`frameGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={brassHi} />
          <stop offset="50%"  stopColor={brass} />
          <stop offset="100%" stopColor={brassDeep} />
        </linearGradient>
        <linearGradient id={`capGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={brassDeep} />
          <stop offset="25%"  stopColor={brassLt} />
          <stop offset="50%"  stopColor={brassHi} />
          <stop offset="75%"  stopColor={brassLt} />
          <stop offset="100%" stopColor={brassDeep} />
        </linearGradient>
        <radialGradient id={`innerGlow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,205,65,0.45)" />
          <stop offset="100%" stopColor="rgba(255,180,20,0)" />
        </radialGradient>
        <filter id={`glow-${uid}`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`softGlow-${uid}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id={`glassSheen-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.14)" />
          <stop offset="45%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* ─── Old sand — pre-loaded; spins out (fades) during flip ─── */}
      {showOldSand && (
        <g clipPath={`url(#botBulb-${uid})`}
          style={{ animation: stage === 'flip' ? 'sand-spin-out 2.6s ease-in forwards' : 'none' }}>
          <rect x="0" y="142" width="160" height="116"
            fill={`url(#darkSand-${uid})`}
          />
          <path d="M 73,143 Q 80,140 87,143"
            stroke="rgba(150,90,45,0.5)" strokeWidth="1.5" fill="none" />
        </g>
      )}

      {/* ─── Neck trickle — CSS pulse, no repeat:Infinity on motion ─── */}
      {(stage === 'weight' || stage === 'settle') && (
        <g clipPath={`url(#glassFull-${uid})`}>
          <ellipse cx="80" cy="141" rx="1.5" ry="3"
            fill="rgba(80,40,10,0.6)"
            style={{ animation: 'neck-trickle 2.5s ease-in-out infinite' }}
          />
        </g>
      )}

      {/* ─── Gold cascade ─── */}
      {showCascade && (
        <g clipPath={`url(#glassFull-${uid})`}>
          {/* Accumulating gold pool — scaleY from bottom via CSS */}
          <rect x="30" y="174" width="100" height="84"
            fill={`url(#goldSand-${uid})`}
            style={{
              animation: 'gold-pool-fill 6s cubic-bezier(0.4,0,0.2,1) forwards',
              transformOrigin: '80px 258px',
            }}
          />

          {/* Glow bloom in top bulb */}
          <ellipse cx="80" cy="82" rx="52" ry="65"
            fill={`url(#innerGlow-${uid})`}
            style={{ animation: 'glass-glow-pulse 1.8s ease-in-out infinite', opacity: glowOpacity }}
          />

          {/* Gold grains */}
          {grains.map((g, i) => (
            <circle key={i} cx={g.cx} cy={g.cy} r={g.r} fill={g.color}
              style={{ animation: `${g.sparkle ? 'grain-sparkle' : 'grain-gold'} ${g.dur}s linear ${g.delay}s infinite` }}
            />
          ))}

          {/* Glass sheen on top */}
          <path d="M 30,24 C 30,85 73,115 73,140 L 73,142 C 73,168 30,205 30,258 L 130,258 C 130,205 87,168 87,142 L 87,140 C 87,115 130,85 130,24 Z"
            fill={`url(#glassSheen-${uid})`} />
        </g>
      )}

      {/* ─── Glass outline ─── */}
      <path
        d="M 30,24 C 30,85 73,115 73,140 L 73,142 C 73,168 30,205 30,258 L 130,258 C 130,205 87,168 87,142 L 87,140 C 87,115 130,85 130,24 Z"
        fill={glassFill} stroke={glassStk} strokeWidth="1.2"
      />
      <path d="M 73,140 L 73,142 M 87,140 L 87,142"
        stroke="rgba(220,240,255,0.45)" strokeWidth="1" fill="none" />

      {/* ─── Pillars ─── */}
      <rect x="5"   y="22" width="14" height="236" rx="2" fill={`url(#frameGrad-${uid})`} />
      <rect x="141" y="22" width="14" height="236" rx="2" fill={`url(#frameGrad-${uid})`} />
      <line x1="7"   y1="24" x2="7"   y2="254" stroke={brassHi}             strokeWidth="1"   opacity="0.5" />
      <line x1="153" y1="24" x2="153" y2="254" stroke={brassHi}             strokeWidth="1"   opacity="0.5" />
      <line x1="18"  y1="24" x2="18"  y2="254" stroke="rgba(0,0,0,0.3)"    strokeWidth="1" />
      <line x1="142" y1="24" x2="142" y2="254" stroke="rgba(0,0,0,0.3)"    strokeWidth="1" />
      {/* Pillar engraving */}
      <line x1="12" y1="60"  x2="12" y2="220" stroke={brassHi} strokeWidth="0.5" opacity="0.3" strokeDasharray="4 6" />
      <line x1="148" y1="60" x2="148" y2="220" stroke={brassHi} strokeWidth="0.5" opacity="0.3" strokeDasharray="4 6" />

      {/* ─── Neck band ─── */}
      <rect x="5" y="128" width="150" height="24" rx="4" fill={`url(#capGrad-${uid})`} />
      <rect x="5" y="128" width="150" height="24" rx="4" fill="rgba(0,0,0,0.16)" />
      <line x1="5" y1="136" x2="155" y2="136" stroke={brassHi} strokeWidth="0.6" opacity="0.4" />
      <line x1="5" y1="143" x2="155" y2="143" stroke="rgba(0,0,0,0.28)" strokeWidth="0.6" />

      {/* ─── Top cap ─── */}
      <rect x="5" y="0" width="150" height="26" rx="6" fill={`url(#capGrad-${uid})`} />
      <rect x="8" y="2" width="144" height="22" rx="5" fill="none" stroke={brassHi} strokeWidth="0.8" opacity="0.45" />
      <line x1="20" y1="13" x2="140" y2="13" stroke={brassHi} strokeWidth="0.5" opacity="0.35" />
      {/* Ornamental divots on cap */}
      {[38, 60, 80, 100, 122].map((x, i) => (
        <ellipse key={i} cx={x} cy="13" rx="3" ry="2" fill={brass} stroke={brassHi} strokeWidth="0.4" opacity="0.6" />
      ))}

      {/* ─── Bottom cap ─── */}
      <rect x="5" y="254" width="150" height="26" rx="6" fill={`url(#capGrad-${uid})`} />
      <rect x="8" y="256" width="144" height="22" rx="5" fill="none" stroke={brassHi} strokeWidth="0.8" opacity="0.45" />
      <line x1="20" y1="267" x2="140" y2="267" stroke={brassHi} strokeWidth="0.5" opacity="0.35" />
      {[38, 60, 80, 100, 122].map((x, i) => (
        <ellipse key={i} cx={x} cy="267" rx="3" ry="2" fill={brass} stroke={brassHi} strokeWidth="0.4" opacity="0.6" />
      ))}

      {/* ─── Ornamental rivets ─── */}
      {([[12, 18], [148, 18], [12, 262], [148, 262]] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6.5" fill={brass} />
          <circle cx={cx} cy={cy} r="6.5" fill="none" stroke={brassHi} strokeWidth="1.2" opacity="0.6" />
          <circle cx={cx} cy={cy} r="2.5" fill={brassHi} opacity="0.8" />
          <circle cx={cx} cy={cy} r="1"   fill="rgba(255,255,220,0.9)" />
        </g>
      ))}

      {/* ─── Frame glow ring when cascade active ─── */}
      {showCascade && (
        <path
          d="M 30,24 C 30,85 73,115 73,140 L 73,142 C 73,168 30,205 30,258 L 130,258 C 130,205 87,168 87,142 L 87,140 C 87,115 130,85 130,24 Z"
          fill="none" stroke={glowColor} strokeWidth="4"
          filter={`url(#glow-${uid})`}
          style={{ animation: 'glass-glow-pulse 1.8s ease-in-out infinite' }}
        />
      )}
    </svg>
  );
}

/* ─────────────────────── Main Component ─────────────────────── */
export function FreshStartDigitalAvatarCeremony({
  capsuleTitle,
  onComplete,
}: FreshStartDigitalAvatarCeremonyProps) {
  const [stage, setStage] = useState<Stage>('void');

  useEffect(() => {
    const ts: { t: number; s: Stage }[] = [
      { t: 0,     s: 'void' },
      { t: 600,   s: 'weight' },
      { t: 3400,  s: 'settle' },
      { t: 5800,  s: 'flip' },
      { t: 9400,  s: 'cascade' },
      { t: 14800, s: 'bloom' },
      { t: 18200, s: 'reveal' },
      { t: 22500, s: 'outro' },
    ];
    const ids = ts.map(({ t, s }) => setTimeout(() => setStage(s), t));
    const done = setTimeout(() => onComplete?.(), 23500);
    return () => { ids.forEach(clearTimeout); clearTimeout(done); };
  }, []);

  /* ── Gold grains (cascade) ── */
  const grains = useMemo<GrainDef[]>(() =>
    Array.from({ length: 72 }, (_, i) => {
      const cx = 55 + Math.cos(i * 2.39) * 28;
      const r  = 1.2 + (i % 4) * 0.7;
      const dur   = 0.9 + (i % 5) * 0.2;
      const delay = (i * 0.09) % 3.0;
      const sparkle = i % 7 === 0;
      const startY  = 26 + (i % 8) * 4;
      const colors  = ['#FFD83A', '#FFE060', '#FFF080', '#FFD020', '#FFFFFF', '#FFB810'];
      return { cx, cy: startY, r, dur, delay, sparkle, color: colors[i % colors.length] };
    }),
  []);

  /* ── Scatter particles — ash erupting during flip ── */
  const scatterParticles = useMemo(() =>
    Array.from({ length: 44 }, (_, i) => {
      const angle = (i / 44) * Math.PI * 2;
      const dist  = 55 + (i % 6) * 20;
      return {
        sx: Math.cos(angle) * dist,
        sy: Math.sin(angle) * dist,
        size: 1.5 + (i % 5) * 1.2,
        dur: 0.5 + (i % 4) * 0.1,
        delay: (i % 6) * 0.03,
        color: i % 3 === 0 ? 'rgba(120,80,30,0.75)' : i % 3 === 1 ? 'rgba(80,50,20,0.6)' : 'rgba(180,130,60,0.5)',
      };
    }),
  []);

  /* ── Ambient dust ── */
  const dustMotes = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      x:   28 + (i * 37) % 46,
      y:   20 + (i * 23) % 62,
      size: 1.2 + (i % 3) * 0.9,
      dur:  4.2 + (i % 5) * 1.0,
      delay: (i * 0.38) % 5,
      opacity: 0.2 + (i % 4) * 0.1,
    })),
  []);

  /* ── Rising motes ── */
  const risingMotes = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      x:  36 + Math.cos(i * 1.55) * 16,
      delay: (i * 0.22) % 3.2,
      dur: 2.0 + (i % 4) * 0.6,
      size: 1.5 + (i % 3) * 0.8,
      color: i % 4 === 0 ? 'rgba(255,230,100,0.95)' : 'rgba(255,200,50,0.85)',
    })),
  []);

  // Sand rotates WITH the glass during the flip
  const showOldSand = ['weight', 'settle', 'flip'].includes(stage);
  const showFlip    = stage === 'flip';
  const showCascade = ['cascade', 'bloom', 'reveal'].includes(stage);
  const showReveal  = ['bloom', 'reveal'].includes(stage);
  const glowAmt     = showCascade ? 1 : 0;

  return (
    <div className="relative w-full h-full overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #1a0e00 0%, #2f1900 40%, #1a0c00 100%)' }}>
      <style>{CSS}</style>

      {/* Depth vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(8,3,0,0.8) 100%)' }} />

      {/* Warm atmosphere haze */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(180,110,20,0.08) 0%, transparent 70%)',
          opacity: showCascade ? 1 : 0.3,
          transition: 'opacity 3s ease',
        }} />

      {/* ── Ambient dust motes ── */}
      {stage !== 'void' && dustMotes.map((m, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${m.x}%`, top: `${m.y}%`,
            width: `${m.size}px`, height: `${m.size}px`,
            background: 'rgba(190,140,65,0.75)',
            animation: `dust-float ${m.dur}s ease-in-out ${m.delay}s infinite`,
            opacity: m.opacity,
          }} />
      ))}

      {/* ── Floor warmth ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(160,95,10,0.22) 0%, transparent 100%)',
          opacity: showCascade ? 1 : 0.4,
          transition: 'opacity 3s ease',
        }} />

      {/* ══════════════════════════════════════════
          HOURGLASS — rotates on its own
          ══════════════════════════════════════════ */}
      <div className="absolute" style={{
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '160px', height: '280px',
      }}>

        {/* Glow rings behind hourglass (cascade) */}
        {showCascade && [0, 1, 2].map(i => (
          <div key={i}
            className="absolute pointer-events-none"
            style={{
              left: '50%', top: '50%',
              width: '180px', height: '180px',
              borderRadius: '50%',
              border: '1px solid rgba(255,185,30,0.3)',
              animation: `frame-glow-ring 3.5s ease-out ${i * 1.1}s infinite`,
            }} />
        ))}

        {/* ─── GLASS + FRAME ─── */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: 'center center' }}
          animate={
            showFlip || showCascade
              ? { rotate: 360, y: 0 }
              : stage === 'settle'
              ? { rotate: [0, -4, 4, -2, 0], y: 0 }
              : stage === 'weight'
              ? { rotate: [-1.5, 1.5, -1, 0], y: 0 }
              : { rotate: 0, y: 0 }
          }
          transition={
            showFlip
              /* Single uninterrupted arc — slow start, peak mid, slow settle */
              ? { duration: 2.6, delay: 0.5, ease: [0.4, 0.0, 0.2, 1.0] }
              : showCascade
              /* Already at 360°, hold with no movement */
              ? { duration: 0 }
              : { duration: 2.5, ease: 'easeInOut' }
          }
        >
          <HourglassSVG
            showOldSand={showOldSand}
            showCascade={showCascade}
            grains={grains}
            glowAmt={glowAmt}
            stage={stage}
          />
        </motion.div>
      </div>

      {/* ── Ash scatter (during flip) ── */}
      <AnimatePresence>
        {showFlip && (
          <div className="absolute pointer-events-none"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            {scatterParticles.map((p, i) => (
              <motion.div key={i}
                className="absolute rounded-full"
                style={{ width: `${p.size}px`, height: `${p.size}px`, background: p.color }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 0.85 }}
                animate={{ x: p.sx, y: p.sy, scale: 0.1, opacity: 0 }}
                transition={{ duration: p.dur, delay: p.delay + 0.8, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ── Rising gold motes (cascade) ── */}
      <AnimatePresence>
        {showCascade && risingMotes.map((m, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              left: `${m.x}%`, top: '48%',
              width: `${m.size}px`, height: `${m.size}px`,
              background: m.color,
              boxShadow: '0 0 5px rgba(255,200,50,0.7)',
              animation: `mote-rise ${m.dur}s ease-out ${m.delay}s infinite`,
            }} />
        ))}
      </AnimatePresence>

      {/* ── TITLE REVEAL ── */}
      <AnimatePresence>
        {showReveal && (
          <motion.div
            className="absolute z-40 text-center pointer-events-none"
            style={{ left: '50%', transform: 'translateX(-50%)', bottom: '8%', width: '90%', maxWidth: '360px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '9.5px',
                letterSpacing: '0.5em',
                color: 'rgba(200,162,65,0.7)',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9 }}
            >
              YOUR TIME BEGINS NOW
            </motion.p>


            <motion.p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(200,162,65,0.5)',
                marginTop: '16px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.2 }}
            >
              — a fresh chapter —
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Outro fade ── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div className="absolute inset-0 z-50"
            style={{ background: '#1a0e00' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }} />
        )}
      </AnimatePresence>
    </div>
  );
}
