/**
 * New Year's Eve - Cinematic Fireworks Ceremony
 * Stages: intro → rockets → wave1 → wave2 → wave3 → finale → radiance → outro
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
    100% { transform: translateY(-520px)  scaleY(0.3); opacity: 0; }
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
    0%,100% { filter: drop-shadow(0 0 8px rgba(80,100,200,0.4)); }
    50%     { filter: drop-shadow(0 0 14px rgba(100,130,255,0.65)); }
  }
  @keyframes ny-antenna-blink {
    0%,100% { opacity:0.8; box-shadow:0 0 4px #ff4040; }
    50%     { opacity:1;   box-shadow:0 0 10px #ff4040, 0 0 20px #ff4040; }
  }
`;

// ─── types ───────────────────────────────────────────────────────────────────
type Stage = 'intro' | 'rockets' | 'wave1' | 'wave2' | 'wave3' | 'finale' | 'radiance' | 'outro';

interface FireworkDef {
  id: number;
  x: number;        // % from left
  y: number;        // % from top  (sky position)
  color: string;
  sparkCount: number;
  style: 'chrysanthemum' | 'willow';
  delay: number;    // seconds after wave mount
  size: number;     // max spark travel px
}

interface RocketDef {
  id: number;
  x: number;        // % from left
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

// ─── skyline ─────────────────────────────────────────────────────────────────
const BUILDINGS = [
  { left: 2,  w: 55, h: 160, floors: 8,  antenna: true  },
  { left: 9,  w: 40, h: 110, floors: 5,  antenna: false },
  { left: 16, w: 70, h: 200, floors: 10, antenna: true  },
  { left: 25, w: 45, h: 130, floors: 6,  antenna: false },
  { left: 32, w: 35, h: 90,  floors: 4,  antenna: false },
  { left: 38, w: 60, h: 175, floors: 9,  antenna: true  },
  { left: 47, w: 80, h: 220, floors: 11, antenna: true  },
  { left: 57, w: 50, h: 145, floors: 7,  antenna: false },
  { left: 64, w: 38, h: 95,  floors: 4,  antenna: false },
  { left: 70, w: 65, h: 185, floors: 9,  antenna: true  },
  { left: 79, w: 45, h: 120, floors: 6,  antenna: false },
  { left: 85, w: 55, h: 155, floors: 8,  antenna: true  },
  { left: 92, w: 40, h: 105, floors: 5,  antenna: false },
];

const ANTENNA_BLDGS = BUILDINGS.filter((b) => b.antenna);
// antenna x% = left% + (half-width-in-px / assumed-container-width) * 100
// container ~500px → divide by 10 gives reasonable %
const ANTENNA_X = ANTENNA_BLDGS.map((b) => +(b.left + b.w / 20).toFixed(1));
// ≈ [4.8, 19.5, 41.0, 51.0, 73.3, 87.8]

// ─── wave builder — pairs rockets 1:1 with bursts ─────────────────────────────
// burst fires 0.85s after its rocket (rocket flight ~1.2s, burst leads the peak)
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
    bottomOffset: `${ANTENNA_BLDGS[bi].h + 38}px`,
  }));

  const fireworks: FireworkDef[] = antennaIndices.map((bi, i) => ({
    id: seed * 100 + i,
    x: ANTENNA_X[bi],
    y: 10 + ((seed * 11 + i * 17) % 22),   // 10–32% from top
    color: palette[i % palette.length],
    sparkCount: sc,
    style,
    delay: i * ROCKET_STAGGER + BURST_LEAD,
    size: 120 + (i * 23 % 65),
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

  // static stars
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: (i * 137.508) % 100,
        y: (i * 73.19)   % 80,
        opacity: 0.15 + (i % 7) * 0.05,
        size: i % 5 === 0 ? 2 : 1,
      })),
    [],
  );

  // ── wave data (rockets + burst fireworks, paired 1:1) ──────────────────────
  //
  //  Per-wave timing guarantees (burst-start + burst-duration < wave-window):
  //    wave1 [3 pairs]:  last burst 0.85+0.44=1.29s, end 1.29+1.7=2.99s  < 3.5s ✓
  //    wave2 [3 pairs]:  same                                              < 3.5s ✓
  //    wave3 [4 pairs]:  last burst 0.85+0.66=1.51s, end 1.51+1.8=3.31s  < 3.5s ✓ (willow 1.8s)
  //    finale[6 pairs]:  last burst 0.85+1.10=1.95s, end 1.95+1.7=3.65s  < 4.0s ✓
  //
  const wave1Data  = useMemo(() => buildWave('wave1',  [0, 2, 4],          'chrysanthemum', 1), []);
  const wave2Data  = useMemo(() => buildWave('wave2',  [1, 3, 5],          'chrysanthemum', 2), []);
  const wave3Data  = useMemo(() => buildWave('wave3',  [0, 2, 3, 5],       'willow',        3), []);
  const finaleData = useMemo(() => buildWave('finale', [0, 1, 2, 3, 4, 5], 'chrysanthemum', 4), []);

  // intro rockets — from all antennas, no paired bursts (pure buildup visual)
  const introRockets = useMemo<RocketDef[]>(
    () =>
      ANTENNA_BLDGS.map((b, i) => ({
        id: i,
        x: ANTENNA_X[i],
        delay: i * 0.28,
        color: WAVE_COLORS.rockets[i % WAVE_COLORS.rockets.length],
        bottomOffset: `${b.h + 38}px`,
      })),
    [],
  );

  // resolve active data from visibleWave tag
  const { activeRockets, activeFireworks } = useMemo(() => {
    const map: Record<string, { rockets: RocketDef[]; fireworks: FireworkDef[] }> = {
      wave1: wave1Data,
      wave2: wave2Data,
      wave3: wave3Data,
      finale: finaleData,
    };
    if (visibleWave === 'rockets') return { activeRockets: introRockets, activeFireworks: [] };
    const d = map[visibleWave ?? ''];
    return { activeRockets: d?.rockets ?? [], activeFireworks: d?.fireworks ?? [] };
  }, [visibleWave, wave1Data, wave2Data, wave3Data, finaleData, introRockets]);

  // ── timeline ──────────────────────────────────────────────────────────────
  //   Each window must exceed: last_burst_delay + spark_stagger + anim_duration
  //   wave1/2 [3 chrysanthemum]: 1.29 + 0.258 + 1.7  = 3.25s → 3.8s window ✓
  //   wave3   [4 willow]:        1.51 + 0.258 + 1.8  = 3.57s → 3.9s window ✓
  //   finale  [6 chrysanthemum]: 1.95 + 0.258 + 1.7  = 3.91s → 4.2s window ✓
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

  // canvas-confetti on finale
  useEffect(() => {
    if (stage !== 'finale') return;
    const cfg = { spread: 110, ticks: 280, gravity: 0.65, decay: 0.93, startVelocity: 50 };
    confetti({ ...cfg, particleCount: 160, angle: 60,  colors: ['#ffd700','#ff4444','#4499ff','#cc44ff'], origin: { x: 0,   y: 0.8 } });
    confetti({ ...cfg, particleCount: 160, angle: 120, colors: ['#ffd700','#ff4444','#4499ff','#cc44ff'], origin: { x: 1,   y: 0.8 } });
    const t1 = setTimeout(() => confetti({ ...cfg, particleCount: 220, angle: 90, colors: ['#ffffff','#ffd700','#ff44cc','#00ffff'], origin: { x: 0.5, y: 0.65 } }), 700);
    const t2 = setTimeout(() => {
      confetti({ ...cfg, particleCount: 120, angle: 70,  colors: ['#cc44ff','#00ffff','#ffffff'], origin: { x: 0.25, y: 0.75 } });
      confetti({ ...cfg, particleCount: 120, angle: 110, colors: ['#ffd700','#ff4444','#44ff99'],  origin: { x: 0.75, y: 0.75 } });
    }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const isOutro    = stage === 'outro';
  const isRadiance = stage === 'radiance' || stage === 'outro';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #030310 0%, #060618 35%, #090928 65%, #0c0c38 100%)',
        opacity: isOutro ? 0 : 1,
        transition: isOutro ? 'opacity 1.2s ease-in' : 'none',
      }}
    >
      <style>{CEREMONY_CSS}</style>

      {/* stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
            opacity: s.opacity,
          }}
        />
      ))}

      {/* rockets — remount on each wave via compound key */}
      {activeRockets.map((r) => (
        <Rocket
          key={`${visibleWave}-r${r.id}`}
          x={r.x}
          color={r.color}
          delay={r.delay}
          bottomOffset={r.bottomOffset}
        />
      ))}

      {/* firework bursts — remount on each wave via compound key */}
      {activeFireworks.map((fw) => (
        <FireworkBurst key={`${visibleWave}-fw${fw.id}`} {...fw} />
      ))}

      {/* city skyline */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 260,
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        {/* ground ambient glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-5%',
            right: '-5%',
            height: 50,
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(60,90,220,0.38) 0%, rgba(30,50,160,0.18) 55%, transparent 100%)',
            filter: 'blur(10px)',
            zIndex: 14,
          }}
        />

        {BUILDINGS.map((b, bi) => {
          const rows = Math.floor(b.h / 24);
          return (
            <div
              key={bi}
              style={{
                position: 'absolute',
                left: `${b.left}%`,
                bottom: 0,
                width: b.w,
                height: b.h,
                background: 'linear-gradient(to top, #12122a, #0c0c1e)',
                borderTop: '1.5px solid rgba(80,110,220,0.42)',
                borderLeft: '1px solid rgba(60,80,160,0.2)',
                borderRight: '1px solid rgba(60,80,160,0.2)',
                animation: `ny-building-glow 7s ease-in-out ${bi * 0.45}s infinite`,
              }}
            >
              {/* windows */}
              {Array.from({ length: rows }, (_, ri) =>
                [0, 1].map((col) => {
                  const wi = bi * 20 + ri * 2 + col;
                  return (
                    <div
                      key={`w-${ri}-${col}`}
                      style={{
                        position: 'absolute',
                        width: 4,
                        height: 5,
                        background: 'rgba(255,220,100,0.9)',
                        left: col === 0 ? Math.max(4, b.w * 0.22) : Math.max(4, b.w * 0.58),
                        bottom: 8 + ri * (b.h / rows),
                        borderRadius: 1,
                        boxShadow: '0 0 3px rgba(255,200,80,0.4)',
                        animation:
                          wi % 7 === 0
                            ? `ny-window-blink 9s step-start ${(wi % 5) * 1.4}s infinite`
                            : undefined,
                      }}
                    />
                  );
                }),
              )}

              {/* antenna */}
              {b.antenna && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: -38,
                      width: 2,
                      height: 38,
                      background:
                        'linear-gradient(to top, rgba(140,160,255,0.45), rgba(200,215,255,0.85))',
                      transform: 'translateX(-50%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: -43,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#ff4040',
                      transform: 'translateX(-50%)',
                      animation: 'ny-antenna-blink 1.8s ease-in-out infinite',
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* intro title */}
      {stage === 'intro' && (
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            textAlign: 'center',
            animation: 'ny-fade-in 1s ease forwards',
            zIndex: 30,
          }}
        >
          <h1
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontWeight: 700,
              color: '#ffd700',
              textShadow: '0 0 40px #ffd700, 0 0 80px rgba(255,215,0,0.4)',
              margin: 0,
              letterSpacing: '0.06em',
            }}
          >
            New Year&apos;s Eve
          </h1>
          <p
            style={{
              color: 'rgba(200,215,255,0.75)',
              fontFamily: 'serif',
              fontSize: '1.1rem',
              marginTop: '0.6rem',
              letterSpacing: '0.06em',
            }}
          >
            {capsuleTitle}
          </p>
        </div>
      )}

      {/* radiance */}
      {isRadiance && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            animation: 'ny-fade-in 1s ease forwards',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 500,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,215,0,0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <h2
            style={{
              fontFamily: 'serif',
              fontSize: 'clamp(2.5rem, 10vw, 5rem)',
              fontWeight: 700,
              color: '#ffd700',
              textShadow: '0 0 40px #ffd700, 0 0 80px rgba(255,215,0,0.4)',
              margin: 0,
              letterSpacing: '0.08em',
              animation: 'ny-glow-pulse 2s ease-in-out infinite',
              position: 'relative',
            }}
          >
            Happy New Year
          </h2>
          <p
            style={{
              color: 'rgba(255,215,0,0.75)',
              fontFamily: 'serif',
              fontSize: '1rem',
              marginTop: '1rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              position: 'relative',
            }}
          >
            {capsuleTitle}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Rocket ───────────────────────────────────────────────────────────────────
function Rocket({ x, color, delay, bottomOffset = '2%' }: RocketDef) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `calc(${x}% - 1.5px)`,
        bottom: bottomOffset,
        width: 3,
        height: 52,
        background: `linear-gradient(to top, transparent, ${color} 55%, #ffffff 100%)`,
        borderRadius: 2,
        boxShadow: `0 0 8px ${color}, 0 0 18px ${color}70`,
        zIndex: 22,
        animation: `ny-rocket 1.2s cubic-bezier(0.2, 0.6, 0.4, 1) ${delay}s both`,
      }}
    />
  );
}

// ─── FireworkBurst ────────────────────────────────────────────────────────────
function FireworkBurst({ x, y, color, sparkCount, style, delay, size }: FireworkDef) {
  // willow uses 1.8s so waves with willow bursts complete within their window
  const outerDuration = style === 'willow' ? '1.8s' : '1.7s';
  const animName      = style === 'willow' ? 'ny-willow' : 'ny-spark';

  const innerSparks = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        angle: (i / 16) * 360,
        dist: 28 + (i % 4) * 9,
      })),
    [],
  );

  const outerSparks = useMemo(
    () =>
      Array.from({ length: sparkCount }, (_, i) => ({
        id: i,
        angle: (i / sparkCount) * 360 + ((i * 7 % 11) - 5),
        dist: size - 8 + (i % 9) * 16,
      })),
    [sparkCount, size],
  );

  const ring1 = size * 1.6;
  const ring2 = size * 2.2;
  const bloom = size * 1.3;

  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: 20 }}>

      {/* shockwave ring 1 */}
      <div
        style={{
          position: 'absolute',
          width: ring1, height: ring1,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}50`,
          animation: `ny-ring-expand 1.0s ease-out ${delay}s both`,
        }}
      />

      {/* shockwave ring 2 */}
      <div
        style={{
          position: 'absolute',
          width: ring2, height: ring2,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
          animation: `ny-ring2-expand 1.35s ease-out ${delay + 0.12}s both`,
        }}
      />

      {/* soft color bloom */}
      <div
        style={{
          position: 'absolute',
          width: bloom, height: bloom,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, ${color}90 30%, transparent 70%)`,
          filter: 'blur(16px)',
          animation: `ny-bloom 1.1s ease-out ${delay}s both`,
        }}
      />

      {/* white-hot center flash */}
      <div
        style={{
          position: 'absolute',
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 0%, rgba(255,255,255,0.9) 40%, transparent 70%)',
          filter: 'blur(5px)',
          animation: `ny-center-flash 0.55s ease-out ${delay}s both`,
        }}
      />

      {/* inner white sparks */}
      {innerSparks.map((s) => (
        <div
          key={`i${s.id}`}
          style={
            {
              position: 'absolute',
              top: 0, left: 0,
              width: 5, height: 5,
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 5px #fff, 0 0 10px #fff',
              '--angle': `${s.angle}deg`,
              '--dist':  `${s.dist}px`,
              animation: `ny-sparkle 0.8s ease-out ${delay + 0.02}s both`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* outer colored sparks */}
      {outerSparks.map((s) => (
        <div
          key={`o${s.id}`}
          style={
            {
              position: 'absolute',
              top: 0, left: 0,
              width: 5, height: 5,
              borderRadius: '50%',
              background: s.id % 5 === 0 ? '#ffffff' : color,
              boxShadow: `0 0 7px ${color}, 0 0 16px ${color}70`,
              '--angle': `${s.angle}deg`,
              '--dist':  `${s.dist}px`,
              animation: `${animName} ${outerDuration} ease-out ${delay + 0.04 + s.id * 0.006}s both`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
