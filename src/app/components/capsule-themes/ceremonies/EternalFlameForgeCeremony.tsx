/**
 * Eternal Flame — Forge Master (v3)
 * Stages: intro → forge → strike (3 swings) → glow → radiance → outro
 * Two hearts on the metal bar forged into one.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EternalFlameForgeCeremonyProps {
  capsuleTitle: string;
  media?: { url: string; type: string }[];
  isPreview?: boolean;
  onComplete?: () => void;
}

// Keyframes: opacity/transform/text-shadow only — no filter, no CSS vars
const FORGE_CSS = `
@keyframes forge-breathe {
  0%,100% { opacity: 0.52; }
  50%     { opacity: 1; }
}
@keyframes flame-dance {
  0%   { transform: scaleY(1)    scaleX(1)    rotate(0deg);    }
  22%  { transform: scaleY(1.14) scaleX(0.87) rotate(-3.5deg); }
  48%  { transform: scaleY(0.90) scaleX(1.10) rotate(2.8deg);  }
  75%  { transform: scaleY(1.08) scaleX(0.93) rotate(-1.5deg); }
  100% { transform: scaleY(1)    scaleX(1)    rotate(0deg);    }
}
@keyframes metal-pulse {
  0%,100% { opacity: 0.8; }
  50%     { opacity: 1; }
}
@keyframes hammer-hover {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-9px); }
}
@keyframes beam-spin {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes ash-fall {
  0%   { transform: translateY(-10px); opacity: 0; }
  8%   { opacity: 0.5; }
  92%  { opacity: 0.2; }
  100% { transform: translateY(108vh); opacity: 0; }
}
@keyframes title-breathe {
  0%,100% { opacity: 0.88; }
  50%     { opacity: 1; }
}
@keyframes forged-stamp {
  0%   { letter-spacing: 0.55em; opacity: 0;   transform: translate(-50%, 48px) scale(1.4); }
  65%  { letter-spacing: 0.12em; opacity: 1;   transform: translate(-50%, 48px) scale(1);   }
  100% { letter-spacing: 0.12em; opacity: 1;   transform: translate(-50%, 48px) scale(1);   }
}
@keyframes heart-breathe {
  0%,100% { transform: scale(1);    }
  50%     { transform: scale(1.1);  }
}
@keyframes heart-sep-pulse {
  0%,100% { opacity: 0.85; }
  50%     { opacity: 1; }
}
@keyframes heat-shimmer {
  0%,100% { opacity: 0.12; transform: scaleY(1);    }
  50%     { opacity: 0.22; transform: scaleY(1.04); }
}
`;

type Stage = 'intro' | 'forge' | 'strike' | 'glow' | 'radiance' | 'outro';

// Heart SVG path centered at (0, 0), bottom ≈ y+11
const HEART = 'M 0,-2 C -1.8,-6.5 -9,-6.5 -9,-2 C -9,1.5 -5,5.5 0,11 C 5,5.5 9,1.5 9,-2 C 9,-6.5 1.8,-6.5 0,-2 Z';

// ── Anvil ───────────────────────────────────────────────────────────────────────
function AnvilSVG({ strikeNum }: { strikeNum: number }) {
  const hot = strikeNum > 0;
  return (
    <svg viewBox="0 0 164 110" width="164" height="110" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#484848" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </linearGradient>
        <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
      </defs>
      {/* Ambient halo */}
      <ellipse cx="82" cy="58" rx="88" ry="48"
        fill={hot ? 'rgba(220,80,0,0.28)' : 'rgba(180,50,0,0.1)'}
        style={{ filter: 'blur(20px)', transition: 'fill 0.4s ease' }}
      />
      {/* Horn */}
      <path d="M 24,17 L 2,32 L 24,42" fill="url(#ag1)" stroke="#4a4a4a" strokeWidth="1" strokeLinejoin="round" />
      {/* Face */}
      <rect x="24" y="10" width="128" height="36" rx="4" fill="url(#ag1)" stroke="#545454" strokeWidth="1.5" />
      <rect x="24" y="10" width="128" height="9"  rx="4" fill="#4e4e4e" />
      {/* Hardy hole */}
      <rect x="110" y="26" width="14" height="11" rx="2" fill="#0d0d0d" />
      {/* Waist */}
      <path d="M 44,46 L 40,73 L 124,73 L 120,46 Z" fill="#252525" />
      {/* Base */}
      <rect x="26" y="73" width="112" height="20" rx="3" fill="url(#ag2)" stroke="#404040" strokeWidth="1" />
      <rect x="18" y="90" width="128" height="16" rx="4" fill="#1c1c1c" stroke="#363636" strokeWidth="1" />
      {/* Rivets */}
      <circle cx="36"  cy="98" r="2.5" fill="#333" />
      <circle cx="128" cy="98" r="2.5" fill="#333" />
      {/* Metal bar — white-hot at strike3 */}
      <rect x="30" y="4" width="104" height="9" rx="3"
        fill={strikeNum >= 3 ? '#ffffff' : strikeNum >= 2 ? '#fde68a' : strikeNum >= 1 ? '#fbbf24' : '#b45309'}
        style={{
          filter: strikeNum >= 2
            ? 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 26px #fbbf24)'
            : 'drop-shadow(0 0 6px #f97316)',
          animation: 'metal-pulse 2.4s ease-in-out infinite',
          transition: 'fill 0.35s ease',
        }}
      />
      {/* Collar highlight */}
      <rect x="28" y="12" width="108" height="3" rx="1" fill="rgba(251,191,36,0.2)" />
      {/* Heat shimmer on face */}
      <rect x="24" y="10" width="128" height="36" rx="4"
        fill="rgba(255,140,20,0.1)"
        style={{ animation: 'heat-shimmer 3.2s ease-in-out infinite' }}
      />
    </svg>
  );
}

// ── Hammer ──────────────────────────────────────────────────────────────────────
function HammerSVG({ isMobile }: { isMobile: boolean }) {
  return (
    <svg viewBox="0 0 48 122" width={isMobile ? 38 : 48} height={isMobile ? 98 : 122} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#252525" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <rect x="19" y="40" width="10" height="82" rx="4" fill="#7c4a1e" stroke="#9a5c22" strokeWidth="1" />
      {/* Wrap rings */}
      <rect x="19" y="58" width="10" height="3" rx="1" fill="#5a3310" />
      <rect x="19" y="72" width="10" height="3" rx="1" fill="#5a3310" />
      <rect x="19" y="86" width="10" height="3" rx="1" fill="#5a3310" />
      {/* Head */}
      <rect x="1" y="6" width="46" height="36" rx="5" fill="url(#hg1)" stroke="#585858" strokeWidth="1.5" />
      <rect x="1" y="6" width="46" height="9"  rx="5" fill="#585858" />
      {/* Striking face glow */}
      <rect x="1" y="39" width="46" height="4" rx="2" fill="rgba(251,191,36,0.35)" style={{ filter: 'blur(2px)' }} />
      {/* Notch */}
      <rect x="18" y="18" width="12" height="5" rx="2" fill="#1c1c1c" />
    </svg>
  );
}

// ── Two hearts → one on the metal bar ──────────────────────────────────────────
function ForgeHearts({ strikeNum, stage }: { strikeNum: number; stage: Stage }) {
  const merged   = strikeNum >= 3;
  const inGlow   = stage === 'glow' || stage === 'radiance';
  const showLarge = merged || inGlow;

  // Color based on heat
  const smallColor =
    strikeNum >= 2 ? '#fde68a' : strikeNum >= 1 ? '#fb923c' : '#c2410c';
  const smallGlow  =
    strikeNum >= 2 ? 'drop-shadow(0 0 6px #fbbf24)' : 'drop-shadow(0 0 4px #ea580c)';

  // Separation: 28 → 18 → 8 → 0 (merged)
  const sep = strikeNum >= 2 ? 8 : strikeNum >= 1 ? 18 : 28;

  // y position: just above metal bar (metal bar is at ~y=-51 from origin)
  // Raised a bit more to account for larger hearts
  const barY = -82;

  if (showLarge) {
    return (
      <AnimatePresence>
        <motion.div
          key="heart-merged"
          style={{ position: 'absolute', left: -22, top: barY, pointerEvents: 'none' }}
          initial={{ scale: 1.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="-12 -10 24 24" width="44" height="44" style={{ overflow: 'visible' }}>
            <path
              d={HEART}
              fill="#fff"
              style={{
                filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 28px #fbbf24)',
                animation: 'heart-breathe 2.2s ease-in-out infinite',
              }}
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Left heart */}
      <motion.div
        style={{ position: 'absolute', top: barY, left: -sep - 14, pointerEvents: 'none' }}
        animate={{ left: -sep - 14 }}
        transition={{ duration: 0.42, ease: [0.2, 0.85, 0.35, 1] }}
      >
        <svg viewBox="-12 -10 24 24" width="28" height="28" style={{ overflow: 'visible' }}>
          <path
            d={HEART}
            fill={smallColor}
            style={{
              filter: smallGlow,
              animation: 'heart-sep-pulse 2.8s ease-in-out infinite',
            }}
          />
        </svg>
      </motion.div>
      {/* Right heart */}
      <motion.div
        style={{ position: 'absolute', top: barY, left: sep - 14, pointerEvents: 'none' }}
        animate={{ left: sep - 14 }}
        transition={{ duration: 0.42, ease: [0.2, 0.85, 0.35, 1] }}
      >
        <svg viewBox="-12 -10 24 24" width="28" height="28" style={{ overflow: 'visible' }}>
          <path
            d={HEART}
            fill={smallColor}
            style={{
              filter: smallGlow,
              animation: 'heart-sep-pulse 2.8s ease-in-out 0.35s infinite',
            }}
          />
        </svg>
      </motion.div>
    </>
  );
}

// ── Sparks ──────────────────────────────────────────────────────────────────────
function buildSparks(count: number, radius: number, angleOff: number) {
  return Array.from({ length: count }, (_, i) => {
    const a  = (i / count) * Math.PI * 2 + angleOff;
    const r  = radius * (0.65 + (i % 6) * 0.065);
    const vx = Math.cos(a) * r;
    const up = Math.max(0, -Math.sin(a)) * r * 0.55;
    return {
      vx,
      vyMid: -up - 14,
      vyEnd: Math.sin(a) * r * 0.42 + up * 0.3,
      size:  3 + (i % 5) * 1.4,
      color: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#fbbf24' : '#fb923c',
      delay: i * 0.022,
      dur:   0.82 + (i % 4) * 0.11,
    };
  });
}

// ── Main Ceremony ───────────────────────────────────────────────────────────────
export function EternalFlameForgeCeremony({
  capsuleTitle,
  onComplete,
}: EternalFlameForgeCeremonyProps) {
  const [stage,     setStage]     = useState<Stage>('intro');
  const [strikeNum, setStrikeNum] = useState(0); // 0=idle, 1/2/3=after each swing
  const [typeText,  setTypeText]  = useState('');
  const typeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ── Timeline ──
  useEffect(() => {
    const GAP  = 1400; // ms between swings
    const ids: ReturnType<typeof setTimeout>[] = [];

    ids.push(setTimeout(() => setStage('forge'),    2300));
    ids.push(setTimeout(() => {
      setStage('strike');
      setStrikeNum(1);                  // swing 1
    }, 4300));
    ids.push(setTimeout(() => setStrikeNum(2),      4300 + GAP));     // swing 2
    ids.push(setTimeout(() => setStrikeNum(3),      4300 + GAP * 2)); // swing 3 (final)
    ids.push(setTimeout(() => setStage('glow'),     4300 + GAP * 2 + 1800));
    ids.push(setTimeout(() => setStage('radiance'), 4300 + GAP * 2 + 4600));
    ids.push(setTimeout(() => setStage('outro'),    4300 + GAP * 2 + 11200));
    const done = setTimeout(() => onComplete?.(),   4300 + GAP * 2 + 13200);

    return () => { ids.forEach(clearTimeout); clearTimeout(done); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Typewriter for intro ──
  useEffect(() => {
    if (stage !== 'intro') return;
    const label = 'THE FORGE AWAKENS';
    let idx = 0;
    setTypeText('');
    const t0 = setTimeout(() => {
      typeRef.current = setInterval(() => {
        idx++;
        setTypeText(label.slice(0, idx));
        if (idx >= label.length && typeRef.current) clearInterval(typeRef.current);
      }, 62);
    }, 600);
    return () => { clearTimeout(t0); if (typeRef.current) clearInterval(typeRef.current); };
  }, [stage]);

  // ── Particle memo ──
  const ashParticles = useMemo(() =>
    Array.from({ length: 11 }, (_, i) => ({
      left: 4 + i * 8.7,
      size: 1.4 + (i % 4) * 0.7,
      dur:  7.5 + (i % 5) * 1.3,
      delay: i * 0.75,
    })), []);

  const coals = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      x: (i - 3) * 28,
      size: 7 + (i % 4) * 4,
      delay: i * 0.2,
    })), []);

  const flames = useMemo(() => [
    { x: -56, h: 62,  w: 16, dur: 1.4,  delay: 0.05 },
    { x: -34, h: 88,  w: 22, dur: 1.6,  delay: 0.18 },
    { x: -10, h: 108, w: 28, dur: 1.5,  delay: 0 },
    { x: 16,  h: 96,  w: 26, dur: 1.7,  delay: 0.22 },
    { x: 40,  h: 80,  w: 20, dur: 1.45, delay: 0.10 },
    { x: 62,  h: 56,  w: 14, dur: 1.8,  delay: 0.30 },
  ], []);

  const sparks1 = useMemo(() => buildSparks(22, 136, 0),    []);
  const sparks2 = useMemo(() => buildSparks(24, 164, 0.28), []);
  const sparks3 = useMemo(() => buildSparks(28, 196, 0.55), []);
  const currentSparks = strikeNum === 1 ? sparks1 : strikeNum === 2 ? sparks2 : sparks3;

  const glowBeams = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * 360,
      color: i % 3 === 0 ? '#ff6b00' : i % 3 === 1 ? '#ffa500' : '#fcd34d',
      delay: i * 0.065,
    })), []);

  const embers = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: (i - 5.5) * 24,
      size:   5 + (i % 4) * 4,
      color:  i % 2 ? '#fbbf24' : '#f97316',
      drift:  (i % 2 ? 1 : -1) * 22,
      yTravel: 220 + (i % 5) * 38,
      delay:  i * 0.15,
    })), []);

  const showForge = stage !== 'intro' && stage !== 'outro';
  const showGlow  = stage === 'glow' || stage === 'radiance';
  // Impact point = metal bar top surface relative to forge origin
  const IMPACT_Y  = -49;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 90%, #1f0900 0%, #0d0400 55%, #000 100%)' }}
    >
      <style>{FORGE_CSS}</style>

      {/* Ground lava bloom */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 38% at 50% 100%, rgba(200,60,0,0.65) 0%, rgba(120,28,0,0.22) 55%, transparent 80%)',
          animation: 'forge-breathe 5.5s ease-in-out infinite',
        }}
      />

      {/* Ash drift */}
      {ashParticles.map((a, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${a.left}%`, top: 0,
            width: a.size, height: a.size,
            background: 'rgba(160,130,100,0.45)',
            animation: `ash-fall ${a.dur}s linear ${a.delay}s infinite`,
          }}
        />
      ))}

      {/* ══ INTRO ══ */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div key="intro"
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {coals.map((c, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{
                  width: c.size, height: c.size,
                  bottom: '26%',
                  left: `calc(50% + ${c.x}px)`,
                  marginLeft: -c.size / 2,
                }}
                initial={{ background: '#200e04', opacity: 0.15 }}
                animate={{ background: ['#200e04', '#7c2d12', '#c2410c', '#ea580c'], opacity: [0.15, 0.65, 0.95, 1] }}
                transition={{ delay: c.delay, duration: 1.4 }}
              />
            ))}

            <p style={{
              fontFamily: 'Georgia, serif',
              color: '#92400e',
              fontSize: isMobile ? '0.74rem' : '0.88rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              textShadow: '0 0 14px rgba(146,64,14,0.7)',
              minHeight: '1.3em',
              marginTop: '0.6rem',
            }}>
              {typeText}<span style={{ opacity: 0.4 }}>|</span>
            </p>

            <motion.p
              style={{
                fontFamily: 'Georgia, serif',
                color: '#fb923c',
                fontSize: isMobile ? '0.95rem' : '1.2rem',
                letterSpacing: '0.11em',
                textShadow: '0 0 18px rgba(251,146,60,0.55)',
                marginTop: '1rem',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
            >
              Forged in Fire · Bound Forever
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ FORGE CORE: Anvil + Hammer + Flames + Hearts ══ */}
      <AnimatePresence>
        {showForge && (
          <motion.div key="forge-core" className="absolute pointer-events-none"
            style={{ left: '50%', top: '47%' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            {/* CSS Flame tongues — below anvil */}
            {flames.map((f, i) => (
              <div key={i} className="absolute pointer-events-none"
                style={{
                  left: f.x - f.w / 2, bottom: -86,
                  width: f.w, height: f.h,
                  background:
                    i === 2
                      ? 'linear-gradient(to top, #ea580c, #fbbf24 55%, rgba(254,249,195,0.9) 100%)'
                      : i % 2 === 0
                      ? 'linear-gradient(to top, #c2410c, #f97316 58%, rgba(251,191,36,0.65) 100%)'
                      : 'linear-gradient(to top, #9a3412, #dc2626 55%, rgba(251,191,36,0.4) 100%)',
                  borderRadius: '50% 50% 30% 30%',
                  transformOrigin: 'bottom center',
                  animation: `flame-dance ${f.dur}s ease-in-out ${f.delay}s infinite`,
                  filter: 'blur(1.5px)',
                  opacity: 0.9,
                }}
              />
            ))}

            {/* Anvil */}
            <div style={{ position: 'absolute', left: -82, top: -55 }}>
              <AnvilSVG strikeNum={strikeNum} />
            </div>

            {/* Two hearts on the metal bar */}
            <ForgeHearts strikeNum={strikeNum} stage={stage} />

            {/* Hammer — keyed by strikeNum so it re-animates on each swing */}
            {(stage === 'forge' || stage === 'strike') && (
              <motion.div
                key={`hammer-${strikeNum}`}
                style={{ position: 'absolute', left: 30, top: -136, transformOrigin: 'top center' }}
                initial={{ rotate: -52, y: 0 }}
                animate={
                  strikeNum === 0
                    ? { rotate: -52, y: 0 }
                    : {
                        rotate: [-52, -58, 18, -38],
                        y:      [  0,  -14, 90,  14],
                      }
                }
                transition={
                  strikeNum === 0
                    ? {}
                    : { duration: 0.62, ease: [0.18, 0.82, 0.32, 1], times: [0, 0.14, 0.45, 1] }
                }
              >
                {/* CSS hover — only during forge idle */}
                <div style={{ animation: strikeNum === 0 ? 'hammer-hover 2.4s ease-in-out infinite' : 'none' }}>
                  <HammerSVG isMobile={isMobile} />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ STRIKE EFFECTS (flashes + sparks + rings) ══ */}
      <AnimatePresence>
        {stage === 'strike' && strikeNum > 0 && (
          <motion.div
            key={`strike-${strikeNum}`}
            className="absolute pointer-events-none"
            style={{ left: '50%', top: `calc(47% + ${IMPACT_Y}px)` }}
            initial={{ opacity: 1 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            {/* Orange screen flash */}
            <motion.div className="pointer-events-none"
              style={{ position: 'fixed', inset: 0, background: 'rgba(210,70,0,0.3)', zIndex: 45 }}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.24 }}
            />

            {/* White whiteout — final strike */}
            {strikeNum === 3 && (
              <motion.div className="pointer-events-none"
                style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 50 }}
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.42 }}
              />
            )}

            {/* FORGED stamp — stays after final strike */}
            {strikeNum === 3 && (
              <div style={{
                position: 'absolute', left: 0, top: 0, zIndex: 60,
                fontFamily: 'Georgia, serif', fontWeight: 900,
                fontSize: isMobile ? '2.8rem' : '4.4rem',
                letterSpacing: '0.12em',
                background: 'linear-gradient(to bottom, #ffffff 0%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
                animation: 'forged-stamp 0.55s cubic-bezier(0.22,1,0.36,1) 0.28s both',
              }}>
                FORGED
              </div>
            )}

            {/* Shockwave rings (more rings on later strikes) */}
            {Array.from({ length: strikeNum === 3 ? 4 : strikeNum === 2 ? 3 : 2 }, (_, ri) => (
              <motion.div key={ri} className="absolute rounded-full pointer-events-none"
                style={{
                  width: 56, height: 56,
                  border: `${Math.max(0.5, 2 - ri * 0.35)}px solid rgba(251,191,36,0.82)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0.85 }}
                animate={{ scale: 3 + ri * 0.9, opacity: 0 }}
                transition={{ duration: 0.46 + ri * 0.08, delay: ri * 0.07, ease: 'easeOut' }}
              />
            ))}

            {/* Impact flash */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{
                width: 120 + strikeNum * 20, height: 120 + strikeNum * 20,
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,230,138,0.7) 38%, transparent 72%)',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.9, 0.1], opacity: [1, 0.75, 0] }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />

            {/* Arcing sparks */}
            {currentSparks.map((p, i) => (
              <motion.div key={i} className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size, height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 2.2}px ${p.color}`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
                animate={{
                  x: [0, p.vx * 0.48, p.vx],
                  y: [0, p.vyMid, p.vyEnd],
                  scale: [1.5, 1.1, 0],
                  opacity: [1, 0.85, 0],
                }}
                transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut', times: [0, 0.44, 1] }}
              />
            ))}

            {/* Molten drips */}
            {(strikeNum >= 2 ? [-22, -8, 8, 22] : [-15, 15]).map((dx, i) => (
              <motion.div key={`drip-${i}`} className="absolute rounded-full pointer-events-none"
                style={{
                  width: 6, height: 10,
                  background: i % 2
                    ? 'radial-gradient(circle, #fbbf24, rgba(234,88,12,0.5))'
                    : 'radial-gradient(circle, #f97316, rgba(185,28,28,0.5))',
                  transform: `translate(calc(-50% + ${dx}px), -50%)`,
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 65, opacity: [1, 0.7, 0] }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: 'easeIn' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ GLOW STAGE ══ */}
      <AnimatePresence>
        {stage === 'glow' && (
          <motion.div key="glow" className="absolute inset-0 z-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            {/* Spinning radial beams */}
            <div style={{
              position: 'absolute', left: '50%', top: '47%', width: 0, height: 0,
              animation: 'beam-spin 24s linear infinite',
            }}>
              {glowBeams.map((b, i) => (
                <motion.div key={i}
                  style={{
                    position: 'absolute', left: 0, top: 0,
                    width: isMobile ? '55vw' : '70vw',
                    height: 3,
                    marginLeft: isMobile ? '-27.5vw' : '-35vw',
                    marginTop: -1.5,
                    background: `linear-gradient(to right, transparent, ${b.color} 50%, transparent)`,
                    transform: `rotate(${b.angle}deg)`,
                    filter: 'blur(2px)',
                    transformOrigin: 'center center',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.88, 0.72] }}
                  transition={{ duration: 1.3, delay: b.delay }}
                />
              ))}
            </div>

            {/* Forge bloom */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{
                width: 380, height: 240,
                left: '50%', top: '47%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse, rgba(255,100,0,0.5) 0%, transparent 70%)',
                filter: 'blur(48px)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0.7], scale: [0.5, 1.5, 1.25] }}
              transition={{ duration: 2.4 }}
            />

            <motion.p className="absolute pointer-events-none"
              style={{
                bottom: '18%', left: 0, right: 0, textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '1.1rem' : '1.45rem',
                color: '#fbbf24', letterSpacing: '0.13em', textTransform: 'uppercase',
                textShadow: '0 0 28px rgba(251,191,36,0.9), 0 2px 8px rgba(0,0,0,0.8)',
              }}
              initial={{ opacity: 0, scale: 1.9 }}
              animate={{ opacity: 1, scale: [1.9, 0.95, 1.05, 1] }}
              transition={{ delay: 0.75, duration: 0.85, times: [0, 0.55, 0.8, 1] }}
            >
              Your Bond · Forged Forever
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ EMBERS (glow + radiance) ══ */}
      <AnimatePresence>
        {showGlow && (
          <motion.div key="embers" className="absolute pointer-events-none"
            style={{ left: '50%', top: '52%' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {embers.map((e, i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{
                  width: e.size, height: e.size,
                  background: `radial-gradient(circle, #fff 0%, ${e.color} 55%, transparent 100%)`,
                  left: e.x, bottom: 0,
                }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  y: -e.yTravel,
                  opacity: [0, 0.95, 0.7, 0],
                  scale: [0, 1.2, 0.85, 0],
                  x: [0, e.drift, -e.drift * 0.4, 0],
                }}
                transition={{ duration: 3.4, delay: e.delay }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ RADIANCE STAGE ══ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div key="radiance"
            className="absolute inset-0 flex items-center justify-center z-25"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
          >
            {/* Volume light shafts */}
            {[-36, -18, 0, 18, 36].map((rot, i) => (
              <motion.div key={i} className="absolute pointer-events-none"
                style={{
                  left: '50%', top: 0, bottom: '38%',
                  width: isMobile ? 24 : 34,
                  translateX: '-50%',
                  transformOrigin: 'bottom center',
                  rotate: rot,
                  background: 'linear-gradient(to top, rgba(255,185,60,0.5), rgba(255,255,180,0.12) 60%, transparent 100%)',
                  filter: 'blur(8px)',
                }}
                initial={{ opacity: 0, scaleY: 0.15 }}
                animate={{ opacity: [0, 0.55, 0], scaleY: [0.15, 1, 1] }}
                transition={{ duration: 3.2, delay: i * 0.14 }}
              />
            ))}

            {/* "FORGED IN FIRE" headline */}
            <motion.div className="absolute pointer-events-none"
              style={{
                top: '6%', left: 0, right: 0, textAlign: 'center',
                fontFamily: 'Georgia, serif', fontWeight: 900,
                fontSize: isMobile ? '2.7rem' : '4.6rem',
                color: '#fbbf24', letterSpacing: '0.05em', textTransform: 'uppercase',
                textShadow: '0 0 48px rgba(251,191,36,0.8), 0 0 90px rgba(255,100,0,0.5)',
                animation: 'title-breathe 3s ease-in-out infinite',
              }}
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Forged in Fire
            </motion.div>

            {/* Radiance bloom */}
            <motion.div className="absolute rounded-full pointer-events-none"
              style={{
                width: 420, height: 280,
                background: 'radial-gradient(ellipse, rgba(255,100,0,0.55) 0%, transparent 70%)',
                filter: 'blur(55px)',
              }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.95, 0.72], scale: [0.4, 1.5, 1.25] }}
              transition={{ duration: 2.6 }}
            />

            {/* Subtitle — appears after headline settles, stays through outro */}
            <motion.p className="absolute pointer-events-none"
              style={{
                bottom: '18%', left: 0, right: 0, textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: isMobile ? '0.8rem' : '1rem',
                color: '#f97316', letterSpacing: '0.28em', textTransform: 'uppercase',
                textShadow: '0 0 18px rgba(249,115,22,0.8), 0 2px 8px rgba(0,0,0,0.9)',
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1.2 }}
            >
              Two Hearts · One Flame
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ OUTRO ══ */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div key="outro"
            className="absolute inset-0 bg-black z-50 pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default EternalFlameForgeCeremony;
