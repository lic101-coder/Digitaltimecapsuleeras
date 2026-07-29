import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface NightOwlHorizonProps {
  height: string;
  positioning: string;
  variants: { initial: any; animate: any; exit: any };
  performanceStyle: React.CSSProperties;
  effects: Record<string, React.ReactNode>;
  cosmicEvents: React.ReactNode;
}

// ─── Aurora wave geometry ────────────────────────────────────────────────────
// viewBox coords: 0 0 1000 100  (100 = full horizon height)
const VW  = 1000;
const PTS = 28; // sample points per edge — must be identical across all keyframes

/**
 * Build a closed ribbon SVG path for one aurora curtain.
 * Top edge + bottom edge sampled at PTS+1 points each → total 2*(PTS+1) = 58 `L` points.
 * Structure is IDENTICAL for every keyframe, only Y values differ → Framer Motion can morph.
 */
function aurPath(topY: number, botY: number, amp: number, phase: number): string {
  const pts: string[] = [];

  // Top edge: left → right  (fundamental + 2 harmonics for organic look)
  for (let i = 0; i <= PTS; i++) {
    const t  = i / PTS;
    const x  = t * VW;
    const y  = topY
      + Math.sin(t * Math.PI * 3.5 + phase)            * amp
      + Math.sin(t * Math.PI * 6.5 + phase * 1.55)     * (amp * 0.38)
      + Math.sin(t * Math.PI * 11  + phase * 0.85)     * (amp * 0.16);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Bottom edge: right → left  (independently phased so edges don't move in lockstep)
  for (let i = PTS; i >= 0; i--) {
    const t  = i / PTS;
    const x  = t * VW;
    const y  = botY
      + Math.sin(t * Math.PI * 3.5 + phase + 1.35)     * (amp * 0.58)
      + Math.sin(t * Math.PI * 6   + phase * 1.2 + 0.6) * (amp * 0.22);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return `M ${pts[0]} L ${pts.slice(1).join(' L ')} Z`;
}

/** Four cleanly-looping phases (Δphase = π/2, so 4×Δphase = 2π). */
function bandPaths(topY: number, botY: number, amp: number, basePhase: number) {
  const phases = [0, Math.PI / 2, Math.PI, Math.PI * 3 / 2];
  const paths  = phases.map(p => aurPath(topY, botY, amp, basePhase + p));
  return [...paths, paths[0]]; // append first = seamless loop
}

// ─── Pine forest silhouette ──────────────────────────────────────────────────
function buildForestPath(seeds: number[]): string {
  const vbH = 90;
  const pts: [number, number][] = [];
  const trees: { x: number; w: number; h: number }[] = [];
  let cursor = -8, si = 0;
  while (cursor < 1010) {
    const h = 38 + (seeds[si % seeds.length] % 36);
    const w = 20 + (seeds[(si + 1) % seeds.length] % 16);
    trees.push({ x: cursor, w, h });
    cursor += Math.round(w * 0.68);
    si++;
  }
  pts.push([trees[0].x - 5, vbH]);
  for (const { x, w, h } of trees) {
    const cx = x + w / 2, hw = w / 2;
    const base = vbH - 14, tip = base - h;
    pts.push([x - 2,           base            ]);
    pts.push([cx - hw * 0.80,  base - h * 0.38 ]);
    pts.push([cx - hw * 0.55,  base - h * 0.65 ]);
    pts.push([cx,              tip              ]);
    pts.push([cx + hw * 0.55,  base - h * 0.65 ]);
    pts.push([cx + hw * 0.80,  base - h * 0.38 ]);
    pts.push([x + w + 2,       base            ]);
  }
  pts.push([1015, vbH]);
  pts.push([0,    vbH]);
  return 'M ' + pts.map(([x, y]) => `${x},${y}`).join(' L ') + ' Z';
}

// ─── Band definitions ─────────────────────────────────────────────────────────
// topY / botY are in viewBox units (0–100). amp = max wave displacement.
const BAND_DEFS = [
  // Brightest green arc (sits lowest in sky, most visible)
  { id: 'g1', topY: 10, botY: 52, amp: 8,  base: 0.0,
    stops: ['#d9f99d','#4ade80','#22c55e','#15803d'],
    opacities: [0, 0.55, 0.90, 0.55, 0],
    glowDur: 9.0,  glowDelay: 0.0 },

  // Teal/cyan mid-band
  { id: 't1', topY: 4,  botY: 46, amp: 10, base: 0.4,
    stops: ['#a5f3fc','#22d3ee','#06b6d4','#0891b2'],
    opacities: [0, 0.45, 0.75, 0.45, 0],
    glowDur: 11.5, glowDelay: 1.8 },

  // Violet upper band (faintest, highest in sky)
  { id: 'p1', topY: -4, botY: 40, amp: 12, base: 0.9,
    stops: ['#f0abfc','#c084fc','#a855f7','#7c3aed'],
    opacities: [0, 0.35, 0.60, 0.35, 0],
    glowDur: 14.0, glowDelay: 3.5 },

  // Secondary green wash — wider, slower, sits behind the main arc
  { id: 'g2', topY: 16, botY: 62, amp: 7,  base: 1.6,
    stops: ['#bbf7d0','#4ade80','#22c55e','#16a34a'],
    opacities: [0, 0.30, 0.55, 0.30, 0],
    glowDur: 12.5, glowDelay: 5.2 },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export function NightOwlHorizon({
  height, positioning, variants, performanceStyle, effects, cosmicEvents
}: NightOwlHorizonProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const forestSeeds = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => Math.round(Math.abs(Math.sin(i * 7.3 + 1.1)) * 100)), []);
  const forestPath = useMemo(() => buildForestPath(forestSeeds), [forestSeeds]);
  const forestPath2 = useMemo(() =>
    buildForestPath(forestSeeds.map((s, i) => (s + i * 3 + 17) % 50)), [forestSeeds]);

  const stars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top:  Math.random() * 62,
    size: i < 6 ? 2.4 + Math.random() * 1.6 : 0.9 + Math.random() * 1.5,
    delay: i * 0.14,
    dur:   2.0 + Math.random() * 2.8,
  })), []);

  // Pre-compute all aurora keyframe paths outside render
  const auroraPathSets = useMemo(() =>
    BAND_DEFS.map(b => bandPaths(b.topY, b.botY, b.amp, b.base)), []);

  // Vertical ray lines: very faint striations suggesting electromagnetic rays
  const rays = useMemo(() => Array.from({ length: isMobile ? 14 : 22 }, (_, i) => ({
    x:   30 + i * (940 / (isMobile ? 13 : 21)),
    len: 35 + (i % 5) * 8,
    topY: 2 + (i % 4) * 5,
    op:  0.06 + (i % 3) * 0.04,
  })), [isMobile]);

  return (
    <motion.div
      className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      style={performanceStyle}
    >
      {/* ── Deep midnight sky ────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #010810 0%, #021020 28%, #041828 58%, #061c2e 82%, #091e34 100%)',
      }} />

      {/* ── Aurora borealis — SVG with path morphing ─────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.92 }}
      >
        <defs>
          {/* Per-band gradients — userSpaceOnUse keeps gradient fixed in sky coords */}
          {BAND_DEFS.map((b, bi) => (
            <linearGradient key={b.id}
              id={`ag-${b.id}`} x1="0" y1="0" x2="0" y2="100"
              gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor={b.stops[0]} stopOpacity={b.opacities[0]} />
              <stop offset="18%"  stopColor={b.stops[1]} stopOpacity={b.opacities[1]} />
              <stop offset="45%"  stopColor={b.stops[2]} stopOpacity={b.opacities[2]} />
              <stop offset="72%"  stopColor={b.stops[3]} stopOpacity={b.opacities[3]} />
              <stop offset="100%" stopColor={b.stops[3]} stopOpacity={0} />
            </linearGradient>
          ))}

          {/* Soft glow filter (heavy blur — background luminance) */}
          <filter id="fGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="6 12" />
          </filter>

          {/* Structure filter (light blur — keeps ribbon edges readable) */}
          <filter id="fCrisp" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5 3" />
          </filter>

          {/* Ray filter */}
          <filter id="fRay" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1 0.5" />
          </filter>
        </defs>

        {/* Layer 1 — ambient glow (heavy blur, lower opacity) */}
        {BAND_DEFS.map((b, bi) => (
          <motion.path
            key={`glow-${b.id}`}
            d={auroraPathSets[bi][0]}
            fill={`url(#ag-${b.id})`}
            filter="url(#fGlow)"
            style={{ opacity: 0.55 }}
            animate={{ d: auroraPathSets[bi], opacity: [0.45, 0.70, 0.50, 0.65, 0.45] }}
            transition={{
              d:       { duration: b.glowDur, delay: b.glowDelay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
              opacity: { duration: b.glowDur * 0.9, delay: b.glowDelay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Layer 2 — structural ribbon (light blur, full opacity) */}
        {BAND_DEFS.map((b, bi) => (
          <motion.path
            key={`crisp-${b.id}`}
            d={auroraPathSets[bi][0]}
            fill={`url(#ag-${b.id})`}
            filter="url(#fCrisp)"
            animate={{ d: auroraPathSets[bi], opacity: [0.75, 1.0, 0.80, 0.95, 0.75] }}
            transition={{
              d:       { duration: b.glowDur, delay: b.glowDelay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
              opacity: { duration: b.glowDur * 0.75, delay: b.glowDelay + 0.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Layer 3 — fine vertical ray striations (characteristic aurora texture) */}
        {rays.map((ray, i) => (
          <line
            key={i}
            x1={ray.x} y1={ray.topY}
            x2={ray.x + (i % 3 - 1) * 2} y2={ray.topY + ray.len}
            stroke={i % 3 === 0 ? '#4ade80' : i % 3 === 1 ? '#22d3ee' : '#c084fc'}
            strokeWidth="0.9"
            strokeOpacity={ray.op}
            filter="url(#fRay)"
          />
        ))}
      </svg>

      {/* ── Ambient aurora horizon bloom ─────────────────────────────────── */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: '30%', height: '45%',
          background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(34,197,94,0.10) 0%, rgba(6,182,212,0.06) 50%, transparent 100%)',
          pointerEvents: 'none' }}
        animate={{ opacity: [0.6, 1, 0.7, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Stars ────────────────────────────────────────────────────────── */}
      {stars.map(s => (
        <div
          key={s.id}
          className={s.id > 22 && s.id % 2 === 0 ? 'hidden sm:block' : ''}
          style={{
            position: 'absolute',
            width:  `${s.size}px`, height: `${s.size}px`,
            left:   `${s.left}%`, top: `${s.top}%`,
            borderRadius: '50%',
            background: s.size > 3 ? 'rgba(245,250,255,0.95)' : 'rgba(210,228,245,0.85)',
            boxShadow: s.size > 3
              ? `0 0 ${s.size * 3}px rgba(180,215,255,0.75)`
              : `0 0 ${s.size}px rgba(200,225,255,0.45)`,
            animation: `no-twinkle ${s.dur}s ease-in-out infinite ${s.delay}s`,
          }}
        />
      ))}

      {/* ── Shooting stars ───────────────────────────────────────────────── */}
      <div style={{ position:'absolute', left:'12%', top:'8%', width:'72px', height:'1.5px',
        background:'linear-gradient(90deg,transparent,rgba(220,240,255,0.92),transparent)',
        borderRadius:'2px', animation:'no-shoot 1.4s ease-out infinite 2.5s' }} />
      <div className="hidden sm:block" style={{ position:'absolute', left:'58%', top:'14%', width:'60px', height:'1.5px',
        background:'linear-gradient(90deg,transparent,rgba(220,240,255,0.85),transparent)',
        borderRadius:'2px', animation:'no-shoot 1.4s ease-out infinite 7.2s' }} />

      {/* ── Orion-ish constellation (desktop) ────────────────────────────── */}
      <svg className="absolute hidden sm:block pointer-events-none"
        style={{ left:'4%', top:'7%', width:52, height:60, opacity:0.50 }} viewBox="0 0 60 70">
        <circle cx="15" cy="35" r="1.6" fill="rgba(200,225,255,0.9)" />
        <circle cx="30" cy="32" r="1.6" fill="rgba(200,225,255,0.9)" />
        <circle cx="45" cy="35" r="1.6" fill="rgba(200,225,255,0.9)" />
        <circle cx="8"  cy="18" r="2"   fill="rgba(255,200,160,0.85)" />
        <circle cx="52" cy="16" r="1.8" fill="rgba(160,200,255,0.85)" />
        <circle cx="14" cy="60" r="1.8" fill="rgba(180,210,255,0.8)" />
        <circle cx="46" cy="58" r="1.6" fill="rgba(180,210,255,0.8)" />
        <line x1="15" y1="35" x2="30" y2="32" stroke="rgba(180,210,255,0.22)" strokeWidth="0.8" />
        <line x1="30" y1="32" x2="45" y2="35" stroke="rgba(180,210,255,0.22)" strokeWidth="0.8" />
        <line x1="8"  y1="18" x2="15" y2="35" stroke="rgba(180,210,255,0.18)" strokeWidth="0.8" />
        <line x1="52" y1="16" x2="45" y2="35" stroke="rgba(180,210,255,0.18)" strokeWidth="0.8" />
        <line x1="15" y1="35" x2="14" y2="60" stroke="rgba(180,210,255,0.15)" strokeWidth="0.8" />
        <line x1="45" y1="35" x2="46" y2="58" stroke="rgba(180,210,255,0.15)" strokeWidth="0.8" />
      </svg>

      {/* ── Moon halo ────────────────────────────────────────────────────── */}
      <div className="no-moon-halo" style={{
        position:'absolute', right:'17%', top:'6%',
        width:130, height:130, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(255,252,200,0.20) 0%,rgba(200,220,255,0.08) 55%,transparent 75%)',
        animation:'no-moonpulse 5s ease-in-out infinite',
      }} />

      {/* ── Crescent moon ────────────────────────────────────────────────── */}
      <svg className="no-moon-wrap" style={{
        position:'absolute', right:'17%', top:'5%', width:96, height:96,
        filter:'drop-shadow(0 0 16px rgba(255,252,180,0.60)) drop-shadow(0 0 38px rgba(220,210,140,0.28))',
      }} viewBox="0 0 100 100">
        <defs>
          <radialGradient id="noMoonG" cx="35%" cy="38%" r="65%">
            <stop offset="0%"   stopColor="#fffff5" />
            <stop offset="60%"  stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="38" fill="url(#noMoonG)" />
        <circle cx="68" cy="42" r="33" fill="#010810" />
        <circle cx="26" cy="48" r="3.5" fill="rgba(200,190,120,0.22)" />
        <circle cx="32" cy="62" r="2.2" fill="rgba(200,190,120,0.18)" />
        <circle cx="20" cy="38" r="2"   fill="rgba(200,190,120,0.16)" />
      </svg>

      {/* ── Owl (unchanged) ──────────────────────────────────────────────── */}
      <div style={{
        position:'absolute',
        ...(isMobile
          ? { left:'50%', top:'10%', transform:'translateX(-50%)' }
          : { right:'22%', top:'28%' }),
      }}>
        <div style={{ animation:'no-owlbob 4s ease-in-out infinite' }}>
          <svg width={isMobile ? 72 : 80} height={isMobile ? 86 : 96} viewBox="0 0 80 96"
            style={{ filter: isMobile
              ? 'drop-shadow(0 0 10px rgba(167,139,250,0.9)) drop-shadow(0 0 20px rgba(139,92,246,0.7))'
              : 'drop-shadow(0 4px 24px rgba(99,102,241,0.5)) drop-shadow(0 0 8px rgba(160,140,255,0.3))' }}>
            <ellipse cx="18" cy="64" rx="18" ry="10" fill="#4338ca" style={{ animation:'no-wingfan 5s ease-in-out infinite', transformOrigin:'32px 60px' }} />
            <ellipse cx="62" cy="64" rx="18" ry="10" fill="#4338ca" style={{ animation:'no-wingfan 5s ease-in-out infinite', animationDelay:'0.3s', transform:'scaleX(-1)', transformOrigin:'48px 60px' }} />
            <ellipse cx="18" cy="60" rx="10" ry="4" fill="rgba(165,180,252,0.25)" />
            <ellipse cx="62" cy="60" rx="10" ry="4" fill="rgba(165,180,252,0.25)" />
            <ellipse cx="40" cy="66" rx="22" ry="28" fill="#3730a3" />
            <ellipse cx="40" cy="72" rx="14" ry="18" fill="#4f46e5" />
            {[0,1,2,3,4].map(row => [-6,-2,2,6].map(col => (
              <ellipse key={`${row}-${col}`} cx={40+col} cy={58+row*8} rx="3.5" ry="4.5" fill="rgba(165,180,252,0.45)" />
            )))}
            <ellipse cx="40" cy="38" rx="20" ry="20" fill="#3730a3" />
            <polygon points="26,22 23,10 31,20" fill="#3730a3" />
            <polygon points="54,22 57,10 49,20" fill="#3730a3" />
            <polygon points="26,21 24,13 30,20" fill="#4f46e5" />
            <polygon points="54,21 56,13 50,20" fill="#4f46e5" />
            <ellipse cx="40" cy="38" rx="16" ry="15" fill="#6d28d9" />
            <circle cx="31" cy="36" r="8"   fill="#312e81" />
            <circle cx="49" cy="36" r="8"   fill="#312e81" />
            <circle cx="31" cy="36" r="6.5" fill="#fbbf24" />
            <circle cx="49" cy="36" r="6.5" fill="#fbbf24" />
            <circle cx="31" cy="36" r="4"   fill="#0a0612" />
            <circle cx="49" cy="36" r="4"   fill="#0a0612" />
            <circle cx="33" cy="34" r="1.4" fill="white" style={{ animation:'no-glint 3s ease-in-out infinite' }} />
            <circle cx="51" cy="34" r="1.4" fill="white" style={{ animation:'no-glint 3s ease-in-out infinite', animationDelay:'0.2s' }} />
            <polygon points="40,41 36,46 44,46" fill="#f59e0b" />
            <line x1="30" y1="93" x2="22" y2="96" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="93" x2="28" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="93" x2="34" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="46" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="50" y2="97" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="93" x2="58" y2="96" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ── Branch (desktop) ─────────────────────────────────────────────── */}
      <svg className="hidden sm:block" style={{ position:'absolute', right:'7%', top:'47%', width:200, height:30 }} viewBox="0 0 200 30">
        <path d="M0 20 Q60 14 120 18 Q160 20 200 16" stroke="#060f1e" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M0 20 Q60 14 120 18 Q160 20 200 16" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 18 Q75 8 80 4"    stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M110 17 Q115 5 118 0" stroke="#1e1b4b" strokeWidth="2"   fill="none" strokeLinecap="round" />
      </svg>

      {/* ── Pine forest silhouette ───────────────────────────────────────── */}
      <svg style={{ position:'absolute', bottom:14, left:0, width:'100%', height:'80px' }}
        preserveAspectRatio="none" viewBox="0 0 1000 90">
        <path d={forestPath}  fill="#050d1c" />
        <path d={forestPath2} fill="#030912" transform="translate(14,10) scale(0.84,0.76)" />
      </svg>

      {/* Ground strip */}
      <div className="absolute bottom-0 left-0 right-0"
        style={{ height:'22px', background:'linear-gradient(180deg,#030912 0%,#020810 100%)' }} />

      {/* ── CSS keyframes ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes no-twinkle   { 0%,100%{opacity:.22;transform:scale(.8)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes no-shoot     { 0%{opacity:0;transform:translateX(0) translateY(0)} 10%{opacity:1} 80%{opacity:.6} 100%{opacity:0;transform:translateX(160px) translateY(80px)} }
        @keyframes no-moonpulse { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes no-owlbob    { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-5px) rotate(2deg)} }
        @keyframes no-wingfan   { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-18deg)} 60%{transform:rotate(8deg)} }
        @keyframes no-glint     { 0%,100%{opacity:0;transform:scale(.5)} 50%{opacity:1;transform:scale(1)} }
        @media(max-width:639px){
          .no-moon-wrap { right:60% !important; top:4% !important; width:72px !important; height:72px !important }
          .no-moon-halo { right:58% !important; top:2% !important; width:100px !important; height:100px !important }
        }
      `}</style>

      {Object.values(effects).map(effect => effect)}
      {cosmicEvents}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
    </motion.div>
  );
}
