/**
 * New Year's Eve - Cinematic Fireworks Ceremony
 * Enhanced: better rockets from antenna tips, richer explosions, detailed cityscape
 *
 * Timing contract per wave:
 *   rockets fire at   i * 0.22s
 *   burst fires at    i * 0.22s + 0.85s  (rocket is near peak)
 *   last burst done   before next wave starts
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// ─── keyframes ───────────────────────────────────────────────────────────────
const CEREMONY_CSS = `
  @keyframes ny-rocket {
    0%   { transform: translateY(0)       scaleY(1);   opacity: 1; }
    80%  { opacity: 0.9; }
    100% { transform: translateY(-540px)  scaleY(0.3); opacity: 0; }
  }
  @keyframes ny-exhaust-flicker {
    0%,100% { transform: scaleY(1)   scaleX(1);   opacity: 0.95; }
    33%     { transform: scaleY(1.3) scaleX(0.8); opacity: 1; }
    66%     { transform: scaleY(0.8) scaleX(1.2); opacity: 0.85; }
  }
  @keyframes ny-ring-expand {
    0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
    7%   { opacity: 1; }
    55%  { opacity: 0.6; }
    100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
  }
  @keyframes ny-ring2-expand {
    0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
    7%   { opacity: 0.55; }
    100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
  }
  @keyframes ny-center-flash {
    0%   { transform: translate(-50%,-50%) scale(0.1); opacity: 0; }
    7%   { opacity: 1; }
    25%  { transform: translate(-50%,-50%) scale(1.5); opacity: 1; }
    100% { transform: translate(-50%,-50%) scale(2.8); opacity: 0; }
  }
  @keyframes ny-bloom {
    0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
    7%   { opacity: 1; }
    45%  { opacity: 0.75; }
    100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
  }
  @keyframes ny-glow-cloud {
    0%   { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
    15%  { opacity: 0.5; }
    60%  { opacity: 0.35; }
    100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
  }
  @keyframes ny-spark {
    0%   { transform: rotate(var(--angle)) translateX(0)            scale(1);    opacity: 0; }
    6%   { opacity: 1; }
    45%  { opacity: 1; }
    100% { transform: rotate(var(--angle)) translateX(var(--dist))  scale(0.15); opacity: 0; }
  }
  @keyframes ny-sparkle {
    0%   { transform: rotate(var(--angle)) translateX(0)            scale(1.5);  opacity: 0; }
    6%   { opacity: 1; }
    35%  { opacity: 1; }
    100% { transform: rotate(var(--angle)) translateX(var(--dist))  scale(0.05); opacity: 0; }
  }
  @keyframes ny-willow {
    0%   { transform: rotate(var(--angle)) translateX(0)            translateY(0);     opacity: 0; }
    6%   { opacity: 1; }
    30%  { opacity: 1; }
    100% { transform: rotate(var(--angle)) translateX(var(--dist))  translateY(88px);  opacity: 0; }
  }
  @keyframes ny-fade-in {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes ny-glow-pulse {
    0%,100% { text-shadow: 0 0 40px #ffd700, 0 0 80px rgba(255,215,0,0.4); }
    50%      { text-shadow: 0 0 60px #ffd700, 0 0 120px rgba(255,215,0,0.7), 0 0 180px rgba(255,215,0,0.3); }
  }
  @keyframes ny-window-blink {
    0%,90%,100% { opacity: 1; } 92%,98% { opacity: 0.1; }
  }
  @keyframes ny-building-glow {
    0%,100% { filter: drop-shadow(0 0 6px rgba(60,90,200,0.35)); }
    50%     { filter: drop-shadow(0 0 14px rgba(100,130,255,0.6)); }
  }
  @keyframes ny-antenna-blink {
    0%,100% { opacity:0.8; box-shadow:0 0 4px #ff4040; }
    50%     { opacity:1;   box-shadow:0 0 10px #ff4040, 0 0 22px #ff4040; }
  }
  @keyframes ny-moon-pulse {
    0%,100% { box-shadow: 0 0 18px 4px rgba(255,240,180,0.25); }
    50%     { box-shadow: 0 0 28px 8px rgba(255,240,180,0.45); }
  }
  @keyframes ny-horizon-shimmer {
    0%,100% { opacity: 0.55; }
    50%     { opacity: 0.75; }
  }
`;

// ─── types ───────────────────────────────────────────────────────────────────
type Stage = 'intro' | 'rockets' | 'wave1' | 'wave2' | 'wave3' | 'finale' | 'radiance' | 'outro';

interface FireworkDef {
  id: number;
  x: number;
  y: number;
  color: string;
  sparkCount: number;
  style: 'chrysanthemum' | 'willow';
  delay: number;
  size: number;
}

interface RocketDef {
  id: number;
  x: number;
  delay: number;
  color: string;
  bottomOffset: string;
}

// ─── palette ─────────────────────────────────────────────────────────────────
const WAVE_COLORS: Record<string, string[]> = {
  rockets: ['#ffd700', '#ffffff', '#ffa500'],
  wave1:   ['#ffd700', '#fff3a0', '#ffa500', '#ffffff'],
  wave2:   ['#ff4444', '#4499ff', '#44ff99', '#ffaa00'],
  wave3:   ['#cc44ff', '#ff44cc', '#00ffff', '#ff88cc'],
  finale:  ['#ffd700', '#ff4444', '#4499ff', '#cc44ff', '#ff44cc', '#00ffff'],
};

// ─── skyline — enriched building definitions ──────────────────────────────────
interface BuildingDef {
  left: number;
  w: number;
  h: number;
  floors: number;
  antenna: boolean;
  style: 'flat' | 'stepped' | 'spire';
  windowCols: number;
  accentColor: string;
}

const BUILDINGS: BuildingDef[] = [
  { left: 2,  w: 54,  h: 158, floors: 8,  antenna: true,  style: 'stepped', windowCols: 2, accentColor: 'rgba(80,120,255,0.5)' },
  { left: 9,  w: 38,  h: 108, floors: 5,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(60,90,200,0.4)'  },
  { left: 16, w: 70,  h: 202, floors: 10, antenna: true,  style: 'spire',   windowCols: 3, accentColor: 'rgba(100,140,255,0.5)' },
  { left: 25, w: 44,  h: 132, floors: 6,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(70,100,220,0.4)'  },
  { left: 32, w: 34,  h: 90,  floors: 4,  antenna: false, style: 'stepped', windowCols: 2, accentColor: 'rgba(60,90,200,0.4)'  },
  { left: 38, w: 60,  h: 178, floors: 9,  antenna: true,  style: 'flat',    windowCols: 3, accentColor: 'rgba(90,130,255,0.5)'  },
  { left: 47, w: 80,  h: 224, floors: 11, antenna: true,  style: 'spire',   windowCols: 3, accentColor: 'rgba(110,150,255,0.55)' },
  { left: 57, w: 50,  h: 148, floors: 7,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(70,100,220,0.4)'  },
  { left: 64, w: 36,  h: 96,  floors: 4,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(60,90,200,0.4)'  },
  { left: 70, w: 64,  h: 188, floors: 9,  antenna: true,  style: 'stepped', windowCols: 3, accentColor: 'rgba(100,140,255,0.5)' },
  { left: 79, w: 44,  h: 122, floors: 6,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(70,100,220,0.4)'  },
  { left: 85, w: 56,  h: 158, floors: 8,  antenna: true,  style: 'spire',   windowCols: 2, accentColor: 'rgba(90,130,255,0.5)'  },
  { left: 92, w: 38,  h: 106, floors: 5,  antenna: false, style: 'flat',    windowCols: 2, accentColor: 'rgba(60,90,200,0.4)'  },
];

const ANTENNA_BLDGS = BUILDINGS.filter((b) => b.antenna);
const ANTENNA_X = ANTENNA_BLDGS.map((b) => +(b.left + b.w / 20).toFixed(1));

// ─── wave builder ─────────────────────────────────────────────────────────────
const ROCKET_STAGGER = 0.22;
const BURST_LEAD     = 0.85;

function buildWave(
  waveKey: string,
  antennaIndices: number[],
  style: 'chrysanthemum' | 'willow',
  seed: number,
): { rockets: RocketDef[]; fireworks: FireworkDef[] } {
  const palette = WAVE_COLORS[waveKey];
  const sc = isMobile ? 28 : 44;

  const rockets: RocketDef[] = antennaIndices.map((bi, i) => ({
    id: bi,
    x: ANTENNA_X[bi],
    delay: i * ROCKET_STAGGER,
    color: palette[i % palette.length],
    bottomOffset: `${ANTENNA_BLDGS[bi].h + 44}px`,
  }));

  const fireworks: FireworkDef[] = antennaIndices.map((bi, i) => ({
    id: seed * 100 + i,
    x: ANTENNA_X[bi],
    y: 10 + ((seed * 11 + i * 17) % 22),
    color: palette[i % palette.length],
    sparkCount: sc,
    style,
    delay: i * ROCKET_STAGGER + BURST_LEAD,
    size: 130 + (i * 23 % 65),
  }));

  return { rockets, fireworks };
}

// ─── component ────────────────────────────────────────────────────────────────
interface Props {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewYearFireworksCeremony({ capsuleTitle, onComplete }: Props) {
  const [stage,       setStage]       = useState<Stage>('intro');
  const [visibleWave, setVisibleWave] = useState<string | null>(null);

  const stars = useMemo(
    () => Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: (i * 137.508) % 100,
      y: (i * 73.19)   % 80,
      opacity: 0.15 + (i % 7) * 0.06,
      size: i % 5 === 0 ? 2 : 1,
    })),
    [],
  );

  const wave1Data  = useMemo(() => buildWave('wave1',  [0, 2, 4],          'chrysanthemum', 1), []);
  const wave2Data  = useMemo(() => buildWave('wave2',  [1, 3, 5],          'chrysanthemum', 2), []);
  const wave3Data  = useMemo(() => buildWave('wave3',  [0, 2, 3, 5],       'willow',        3), []);
  const finaleData = useMemo(() => buildWave('finale', [0, 1, 2, 3, 4, 5], 'chrysanthemum', 4), []);

  const introRockets = useMemo<RocketDef[]>(
    () => ANTENNA_BLDGS.map((b, i) => ({
      id: i,
      x: ANTENNA_X[i],
      delay: i * 0.28,
      color: WAVE_COLORS.rockets[i % WAVE_COLORS.rockets.length],
      bottomOffset: `${b.h + 44}px`,
    })),
    [],
  );

  const { activeRockets, activeFireworks } = useMemo(() => {
    const map: Record<string, { rockets: RocketDef[]; fireworks: FireworkDef[] }> = {
      wave1: wave1Data, wave2: wave2Data, wave3: wave3Data, finale: finaleData,
    };
    if (visibleWave === 'rockets') return { activeRockets: introRockets, activeFireworks: [] };
    const d = map[visibleWave ?? ''];
    return { activeRockets: d?.rockets ?? [], activeFireworks: d?.fireworks ?? [] };
  }, [visibleWave, wave1Data, wave2Data, wave3Data, finaleData, introRockets]);

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => ts.push(setTimeout(fn, ms));

    at(0,     () => { setStage('intro');    setVisibleWave(null); });
    at(1500,  () => { setStage('rockets');  setVisibleWave('rockets'); });
    at(4000,  () => { setStage('wave1');    setVisibleWave('wave1'); });
    at(7800,  () => { setStage('wave2');    setVisibleWave('wave2'); });
    at(11600, () => { setStage('wave3');    setVisibleWave('wave3'); });
    at(15500, () => { setStage('finale');   setVisibleWave('finale'); });
    at(19700, () => { setStage('radiance'); setVisibleWave(null); });
    at(21700, () => { setStage('outro');    setVisibleWave(null); });
    at(22200, () => { onComplete?.(); });

    const failsafe = setTimeout(() => onComplete?.(), 23000);
    return () => { ts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stage !== 'finale') return;
    const cfg = { spread: 110, ticks: 280, gravity: 0.65, decay: 0.93, startVelocity: 50 };
    confetti({ ...cfg, particleCount: 160, angle: 60,  colors: ['#ffd700','#ff4444','#4499ff','#cc44ff'], origin: { x: isMobile ? 0.12 : 0,   y: 0.8 } });
    confetti({ ...cfg, particleCount: 160, angle: 120, colors: ['#ffd700','#ff4444','#4499ff','#cc44ff'], origin: { x: isMobile ? 0.88 : 1,   y: 0.8 } });
    const t1 = setTimeout(() => confetti({ ...cfg, particleCount: 220, angle: 90,  colors: ['#ffffff','#ffd700','#ff44cc','#00ffff'], origin: { x: 0.5, y: 0.65 } }), 700);
    const t2 = setTimeout(() => {
      confetti({ ...cfg, particleCount: 120, angle: 70,  colors: ['#cc44ff','#00ffff','#ffffff'], origin: { x: 0.25, y: 0.75 } });
      confetti({ ...cfg, particleCount: 120, angle: 110, colors: ['#ffd700','#ff4444','#44ff99'],  origin: { x: 0.75, y: 0.75 } });
    }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const isOutro    = stage === 'outro';
  const isRadiance = stage === 'radiance' || stage === 'outro';

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      background: 'linear-gradient(to bottom, #020210 0%, #050518 30%, #080825 60%, #0b0b35 100%)',
      opacity: isOutro ? 0 : 1,
      transition: isOutro ? 'opacity 1.2s ease-in' : 'none',
    }}>
      <style>{CEREMONY_CSS}</style>

      {/* Moon */}
      <div style={{
        position: 'absolute', top: '8%', right: '12%',
        width: 42, height: 42, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, #fffde8 0%, #fff8c0 45%, #ffe88a 100%)',
        boxShadow: '0 0 18px 4px rgba(255,240,180,0.25)',
        animation: 'ny-moon-pulse 4s ease-in-out infinite',
        zIndex: 5,
      }} />
      {/* moon shadow crescent */}
      <div style={{
        position: 'absolute', top: 'calc(8% + 6px)', right: 'calc(12% - 8px)',
        width: 36, height: 36, borderRadius: '50%',
        background: '#050518',
        zIndex: 6,
        opacity: 0.45,
      }} />

      {/* Horizon atmosphere glow */}
      <div style={{
        position: 'absolute', bottom: 260, left: '-5%', right: '-5%',
        height: 90,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(60,80,200,0.22) 0%, rgba(30,50,160,0.1) 55%, transparent 100%)',
        filter: 'blur(18px)',
        animation: 'ny-horizon-shimmer 5s ease-in-out infinite',
        zIndex: 10,
      }} />

      {/* Stars */}
      {stars.map((s) => (
        <div key={s.id} style={{
          position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: '50%',
          background: '#fff', opacity: s.opacity,
        }} />
      ))}

      {/* Rockets */}
      {activeRockets.map((r) => (
        <Rocket key={`${visibleWave}-r${r.id}`} x={r.x} color={r.color} delay={r.delay} bottomOffset={r.bottomOffset} />
      ))}

      {/* Firework bursts */}
      {activeFireworks.map((fw) => (
        <FireworkBurst key={`${visibleWave}-fw${fw.id}`} {...fw} />
      ))}

      {/* City skyline */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 280, zIndex: 15, pointerEvents: 'none' }}>

        {/* Ground reflection strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 30,
          background: 'linear-gradient(to top, rgba(20,30,80,0.9), transparent)',
          zIndex: 13,
        }} />

        {/* Ground ambient glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: '-5%', right: '-5%', height: 55,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(60,90,220,0.42) 0%, rgba(30,50,160,0.18) 55%, transparent 100%)',
          filter: 'blur(10px)', zIndex: 14,
        }} />

        {BUILDINGS.map((b, bi) => {
          const rows = Math.floor(b.h / 22);
          const colPositions = b.windowCols === 3
            ? [Math.max(4, b.w * 0.18), Math.max(4, b.w * 0.48), Math.max(4, b.w * 0.75)]
            : [Math.max(4, b.w * 0.22), Math.max(4, b.w * 0.62)];

          return (
            <div key={bi} style={{ position: 'absolute', left: `${b.left}%`, bottom: 0, width: b.w }}>

              {/* Main building body */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: b.h,
                background: `linear-gradient(to top, #0e0e28, #111130)`,
                borderTop: `2px solid ${b.accentColor}`,
                borderLeft: '1px solid rgba(60,80,160,0.22)',
                borderRight: '1px solid rgba(60,80,160,0.22)',
                animation: `ny-building-glow ${6 + bi * 0.4}s ease-in-out ${bi * 0.3}s infinite`,
              }}>
                {/* Side highlight for 3D depth */}
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: Math.max(3, b.w * 0.08), bottom: 0,
                  background: `linear-gradient(to left, ${b.accentColor.replace('0.5)', '0.15)').replace('0.4)', '0.12)')}, transparent)`,
                }} />

                {/* Windows */}
                {Array.from({ length: rows }, (_, ri) =>
                  colPositions.map((colX, col) => {
                    const wi = bi * 30 + ri * 3 + col;
                    const warmWindow  = wi % 5 !== 3;
                    const windowColor = warmWindow
                      ? `rgba(255, ${195 + (wi % 4) * 10}, ${80 + (wi % 3) * 15}, 0.88)`
                      : `rgba(180, 210, 255, 0.75)`;
                    return (
                      <div key={`w-${ri}-${col}`} style={{
                        position: 'absolute',
                        width: b.windowCols === 3 ? 4 : 5,
                        height: 6,
                        background: windowColor,
                        left: colX,
                        bottom: 8 + ri * (b.h / rows),
                        borderRadius: 1,
                        boxShadow: warmWindow
                          ? `0 0 4px rgba(255,200,80,0.5)`
                          : `0 0 4px rgba(160,200,255,0.5)`,
                        animation: wi % 7 === 0
                          ? `ny-window-blink 9s step-start ${(wi % 5) * 1.4}s infinite`
                          : undefined,
                      }} />
                    );
                  })
                )}

                {/* Spire roof */}
                {b.style === 'spire' && (
                  <div style={{
                    position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: `${b.w * 0.18}px solid transparent`,
                    borderRight: `${b.w * 0.18}px solid transparent`,
                    borderBottom: `22px solid #12122e`,
                    filter: `drop-shadow(0 -2px 4px ${b.accentColor})`,
                  }} />
                )}

                {/* Stepped setback floor */}
                {b.style === 'stepped' && (
                  <div style={{
                    position: 'absolute', top: -18, left: '15%', right: '15%', height: 18,
                    background: 'linear-gradient(to top, #111132, #131336)',
                    borderTop: `1.5px solid ${b.accentColor}`,
                    borderLeft: '1px solid rgba(60,80,160,0.3)',
                    borderRight: '1px solid rgba(60,80,160,0.3)',
                  }} />
                )}

                {/* Water tower on some flat buildings */}
                {b.style === 'flat' && bi % 4 === 1 && (
                  <div style={{
                    position: 'absolute', top: -(b.w * 0.18 + 12), left: '60%',
                    width: b.w * 0.18, height: b.w * 0.18 + 12,
                  }}>
                    <div style={{
                      width: '100%', height: '65%',
                      background: 'linear-gradient(135deg, #1a1a40, #222255)',
                      borderRadius: '2px 2px 4px 4px',
                      border: '1px solid rgba(80,100,200,0.3)',
                    }} />
                    <div style={{
                      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                      width: 2, height: '35%',
                      background: 'rgba(140,160,255,0.5)',
                    }} />
                  </div>
                )}
              </div>

              {/* Antenna */}
              {b.antenna && (
                <>
                  <div style={{
                    position: 'absolute', left: '50%', bottom: b.h, transform: 'translateX(-50%)',
                    width: 2, height: 44,
                    background: 'linear-gradient(to top, rgba(120,140,255,0.35), rgba(200,215,255,0.9))',
                  }} />
                  {/* Antenna tip glow dot */}
                  <div style={{
                    position: 'absolute', left: '50%', bottom: b.h + 42,
                    transform: 'translateX(-50%)',
                    width: 7, height: 7, borderRadius: '50%',
                    background: '#ff4040',
                    animation: 'ny-antenna-blink 1.8s ease-in-out infinite',
                  }} />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Intro title */}
      {stage === 'intro' && (
        <div style={{
          position: 'absolute', top: '30%', left: 0, right: 0, textAlign: 'center',
          animation: 'ny-fade-in 1s ease forwards', zIndex: 30,
        }}>
          <h1 style={{
            fontFamily: 'serif', fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 700,
            color: '#ffd700', textShadow: '0 0 40px #ffd700, 0 0 80px rgba(255,215,0,0.4)',
            margin: 0, letterSpacing: '0.06em',
          }}>
            New Year&apos;s Eve
          </h1>
          <p style={{
            color: 'rgba(200,215,255,0.75)', fontFamily: 'serif', fontSize: '1.1rem',
            marginTop: '0.6rem', letterSpacing: '0.06em',
          }}>
            {capsuleTitle}
          </p>
        </div>
      )}

      {/* Radiance */}
      {isRadiance && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 40, animation: 'ny-fade-in 1s ease forwards',
        }}>
          <div style={{
            position: 'absolute', width: 520, height: 280, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,215,0,0.2) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }} />
          <h2 style={{
            fontFamily: 'serif', fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: 700,
            color: '#ffd700', textShadow: '0 0 40px #ffd700, 0 0 80px rgba(255,215,0,0.4)',
            margin: 0, letterSpacing: '0.08em',
            animation: 'ny-glow-pulse 2s ease-in-out infinite', position: 'relative',
          }}>
            Happy New Year
          </h2>
          <p style={{
            color: 'rgba(255,215,0,0.75)', fontFamily: 'serif', fontSize: '1rem',
            marginTop: '1rem', letterSpacing: '0.14em', textTransform: 'uppercase', position: 'relative',
          }}>
            {capsuleTitle}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Rocket — wider body, nose cone, exhaust glow ─────────────────────────────
function Rocket({ x, color, delay, bottomOffset = '2%' }: RocketDef) {
  return (
    <div style={{
      position: 'absolute',
      left: `calc(${x}% - 4px)`,
      bottom: bottomOffset,
      width: 8,
      zIndex: 22,
      animation: `ny-rocket 1.2s cubic-bezier(0.2, 0.6, 0.4, 1) ${delay}s both`,
    }}>
      {/* nose cone */}
      <div style={{
        position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: `10px solid ${color}`,
        filter: `drop-shadow(0 -2px 4px ${color})`,
      }} />

      {/* body */}
      <div style={{
        width: '100%', height: 44,
        background: `linear-gradient(to top, transparent 0%, ${color}70 20%, ${color} 55%, #ffffff 90%, #ffffff 100%)`,
        borderRadius: '3px 3px 1px 1px',
        boxShadow: `0 0 10px ${color}90, 0 0 22px ${color}50`,
      }} />

      {/* exhaust glow — flickers independently */}
      <div style={{
        position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)',
        width: 20, height: 26,
        background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.9) 0%, ${color} 38%, transparent 78%)`,
        filter: 'blur(5px)',
        borderRadius: '50%',
        animation: `ny-exhaust-flicker 0.12s ease-in-out infinite`,
        transformOrigin: 'top center',
      }} />

      {/* outer exhaust halo */}
      <div style={{
        position: 'absolute', top: 42, left: '50%', transform: 'translateX(-50%)',
        width: 32, height: 18,
        background: `radial-gradient(ellipse, ${color}50 0%, transparent 70%)`,
        filter: 'blur(8px)',
        borderRadius: '50%',
      }} />
    </div>
  );
}

// ─── FireworkBurst — richer bloom, secondary ring, 24-spark inner burst ───────
function FireworkBurst({ x, y, color, sparkCount, style, delay, size }: FireworkDef) {
  const outerDuration = style === 'willow' ? '1.8s' : '1.7s';
  const animName      = style === 'willow' ? 'ny-willow' : 'ny-spark';

  const innerSparks = useMemo(
    () => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i / 24) * 360 + (i % 3) * 1.5,
      dist: 18 + (i % 6) * 9,
    })),
    [],
  );

  const outerSparks = useMemo(
    () => Array.from({ length: sparkCount }, (_, i) => ({
      id: i,
      angle: (i / sparkCount) * 360 + ((i * 7 % 11) - 5),
      dist: size - 4 + (i % 9) * 18,
      big: i % 8 === 0,
    })),
    [sparkCount, size],
  );

  const ring1   = size * 1.9;
  const ring2   = size * 2.7;
  const ring3   = size * 2.1;
  const bloom   = size * 2.0;
  const glowRad = size * 2.8;

  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: 20 }}>

      {/* persistent glow cloud behind everything */}
      <div style={{
        position: 'absolute', width: glowRad, height: glowRad, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}28 0%, ${color}14 38%, transparent 70%)`,
        filter: 'blur(22px)',
        animation: `ny-glow-cloud 2.4s ease-out ${delay}s both`,
      }} />

      {/* shockwave ring 1 — bright primary color */}
      <div style={{
        position: 'absolute', width: ring1, height: ring1, borderRadius: '50%',
        border: `2.5px solid ${color}`,
        boxShadow: `0 0 16px ${color}, 0 0 32px ${color}60, inset 0 0 16px ${color}40`,
        animation: `ny-ring-expand 1.0s ease-out ${delay}s both`,
      }} />

      {/* shockwave ring 2 — white */}
      <div style={{
        position: 'absolute', width: ring2, height: ring2, borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.55)',
        boxShadow: '0 0 10px rgba(255,255,255,0.3)',
        animation: `ny-ring2-expand 1.35s ease-out ${delay + 0.12}s both`,
      }} />

      {/* shockwave ring 3 — secondary color trail */}
      <div style={{
        position: 'absolute', width: ring3, height: ring3, borderRadius: '50%',
        border: `1.5px solid ${color}70`,
        animation: `ny-ring2-expand 1.65s ease-out ${delay + 0.28}s both`,
      }} />

      {/* soft color bloom */}
      <div style={{
        position: 'absolute', width: bloom, height: bloom, borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, ${color}90 22%, ${color}45 48%, transparent 70%)`,
        filter: 'blur(20px)',
        animation: `ny-bloom 1.15s ease-out ${delay}s both`,
      }} />

      {/* white-hot center flash */}
      <div style={{
        position: 'absolute', width: 38, height: 38, borderRadius: '50%',
        background: 'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.92) 32%, transparent 70%)',
        filter: 'blur(6px)',
        animation: `ny-center-flash 0.58s ease-out ${delay}s both`,
      }} />

      {/* inner sparks — 24, alternating color/white */}
      {innerSparks.map((s) => (
        <div key={`i${s.id}`}
          style={{
            position: 'absolute', top: 0, left: 0, width: 5, height: 5, borderRadius: '50%',
            background: s.id % 3 === 0 ? color : '#ffffff',
            boxShadow: `0 0 6px ${s.id % 3 === 0 ? color : '#fff'}, 0 0 12px ${s.id % 3 === 0 ? color : '#fff'}`,
            '--angle': `${s.angle}deg`, '--dist': `${s.dist}px`,
            animation: `ny-sparkle 0.88s ease-out ${delay + 0.02}s both`,
          } as React.CSSProperties}
        />
      ))}

      {/* outer sparks */}
      {outerSparks.map((s) => (
        <div key={`o${s.id}`}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: s.big ? 7 : 5, height: s.big ? 7 : 5,
            borderRadius: '50%',
            background: s.id % 5 === 0 ? '#ffffff' : color,
            boxShadow: `0 0 8px ${color}, 0 0 18px ${color}70`,
            '--angle': `${s.angle}deg`, '--dist': `${s.dist}px`,
            animation: `${animName} ${outerDuration} ease-out ${delay + 0.04 + s.id * 0.006}s both`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
