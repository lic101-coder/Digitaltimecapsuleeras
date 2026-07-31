import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface LuxeBirthdayCeremonyProps {
  onComplete: () => void;
  isVisible: boolean;
  age?: number;
  recipientName?: string;
}

const CANDLE_POSITIONS = [-64, -32, 0, 32, 64];

const CSS = `
@keyframes luxe-pop-ring {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.9; }
  55%  { opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(4.2); opacity: 0; }
}
@keyframes luxe-orb-float {
  0%   { opacity: 0; transform: translateX(-50%) scale(0); }
  30%  { opacity: 1;  transform: translateX(-50%) scale(1.1); }
  100% { opacity: 0;  transform: translateX(calc(-50% + var(--drift))) scale(0.4) translateY(-90px); }
}
`;

function buildBurst(x: number, y: number, color: string, count: number, speed: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return {
      vx: Math.cos(angle) * speed * (0.65 + (i % 5) * 0.15),
      vy: Math.sin(angle) * speed * (0.65 + (i % 5) * 0.15),
      color,
      x,
      y,
      size: 3 + (i % 4),
      delay: (i % 6) * 0.01,
    };
  });
}

// 12-position firework layout — 4 columns × 3 rows
const FIREWORK_BURSTS = [
  buildBurst(12, 18, '#FFD700', 22, 95),
  buildBurst(88, 16, '#FF69B4', 20, 88),
  buildBurst(50,  8, '#87CEEB', 24, 105),
  buildBurst(22, 42, '#FF6347', 18, 80),
  buildBurst(78, 38, '#9B59B6', 18, 80),
  buildBurst(50, 28, '#FFD700', 26, 115),
  buildBurst(30, 12, '#00FF7F', 16, 75),
  buildBurst(70, 12, '#FF4500', 16, 75),
  buildBurst(15, 60, '#FF69B4', 14, 70),
  buildBurst(85, 58, '#FFD700', 14, 70),
  buildBurst(42, 52, '#87CEEB', 18, 85),
  buildBurst(62, 48, '#d946ef', 18, 85),
];

// 3 shockwave rings per burst origin
function buildRings(burst: typeof FIREWORK_BURSTS[0]) {
  return [0, 1, 2].map((ri) => ({
    x: burst[0].x,
    y: burst[0].y,
    color: burst[0].color,
    size: 48 + ri * 22,
    delay: ri * 0.1,
  }));
}

// Glowing star orbs that drift up after the blow
const ORB_DEFS = Array.from({ length: 14 }, (_, i) => ({
  left: 20 + (i * 23) % 62,
  bottom: 40 + (i % 3) * 22,
  size: 10 + (i % 4) * 5,
  color: ['#FFD700','#FF69B4','#87CEEB','#9B59B6','#FF6347','#00FF7F','#FFA500'][i % 7],
  drift: (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 8),
  dur: 1.8 + (i % 4) * 0.4,
  delay: 0.1 + (i * 0.12) % 0.9,
}));

export function LuxeBirthdayCeremony({ onComplete, isVisible, age, recipientName }: LuxeBirthdayCeremonyProps) {
  const [phase, setPhase] = useState<'entrance' | 'cake-reveal' | 'candle-lit' | 'blow' | 'celebration'>('entrance');
  const [candleLit, setCandleLit] = useState(false);
  const [hasBlown, setHasBlown] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const mobileFireworkBursts = useMemo(
    () => (isMobile ? FIREWORK_BURSTS.slice(0, 5) : FIREWORK_BURSTS),
    [isMobile]
  );

  const allRings = useMemo(
    () => mobileFireworkBursts.map(buildRings).flat(),
    [mobileFireworkBursts]
  );

  const mobileOrbs = useMemo(
    () => (isMobile ? ORB_DEFS.slice(0, 7) : ORB_DEFS),
    [isMobile]
  );

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playLightSound = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  }, [initAudio]);

  const playBlowSound = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
  }, [initAudio]);

  const playChimeSound = useCallback(() => {
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;
    [523.25, 659.25, 783.99, 987.77].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + 2);
    });
  }, [initAudio]);

  const fireConfetti = useCallback(() => {
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#9B59B6', '#FF6347', '#00FF7F', '#FFA500', '#E6E6FA'];
    const count = isMobile ? 120 : 220;
    const opts = {
      colors,
      startVelocity: isMobile ? 40 : 55,
      gravity: 0.9,
      ticks: isMobile ? 180 : 260,
      shapes: ['square', 'circle'] as confetti.Shape[],
    };

    confetti({ ...opts, particleCount: count / 2, angle: 60, spread: 72, origin: { x: isMobile ? 0.12 : 0, y: 0.65 }, drift: 0.2 });
    confetti({ ...opts, particleCount: count / 2, angle: 120, spread: 72, origin: { x: isMobile ? 0.88 : 1, y: 0.65 }, drift: -0.2 });

    if (!isMobile) {
      setTimeout(() => confetti({ ...opts, particleCount: 80, spread: 105, origin: { x: 0.5, y: 0.5 }, startVelocity: 45, gravity: 0.8 }), 350);
    }

    // Second wave — a bit later with star shapes
    setTimeout(() => {
      confetti({ ...opts, particleCount: isMobile ? 60 : 100, angle: 75, spread: 90, origin: { x: 0.15, y: 0.7 }, startVelocity: isMobile ? 35 : 48 });
      confetti({ ...opts, particleCount: isMobile ? 60 : 100, angle: 105, spread: 90, origin: { x: 0.85, y: 0.7 }, startVelocity: isMobile ? 35 : 48 });
    }, isMobile ? 900 : 1400);
  }, [isMobile]);

  useEffect(() => {
    if (!isVisible) return;
    const t1 = setTimeout(() => setPhase('cake-reveal'), 1500);
    const t2 = setTimeout(() => {
      setPhase('candle-lit');
      setCandleLit(true);
      playLightSound();
      if (navigator.vibrate) navigator.vibrate(40);
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible, playLightSound]);

  const handleBlow = useCallback(() => {
    if (phase !== 'candle-lit' || hasBlown) return;
    initAudio();
    setPhase('blow');
    setHasBlown(true);
    setCandleLit(false);
    playBlowSound();
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

    setTimeout(() => {
      setPhase('celebration');
      playChimeSound();
      fireConfetti();
      if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40, 120]);
      setTimeout(() => onComplete(), isMobile ? 3500 : 4500);
    }, 900);
  }, [phase, hasBlown, playBlowSound, playChimeSound, fireConfetti, initAudio, isMobile]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'radial-gradient(ellipse at center, #2d1b3d 0%, #1a0f25 50%, #0a0510 100%)' }}
      onClick={handleBlow}
    >
      <style>{CSS}</style>

      {/* Floating bokeh */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: isMobile ? 12 : 20 }).map((_, i) => (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 8}px`,
              height: `${8 + (i % 3) * 8}px`,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              background: ['radial-gradient(circle,rgba(255,215,0,0.3),transparent)', 'radial-gradient(circle,rgba(255,182,193,0.3),transparent)', 'radial-gradient(circle,rgba(230,230,250,0.3),transparent)'][i % 3],
              filter: 'blur(4px)',
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: (i * 0.3) % 2, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* "Happy Birthday" entrance */}
      <AnimatePresence>
        {phase === 'entrance' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-24 z-50"
          >
            <h1
              className="text-5xl font-serif tracking-wider"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF69B4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Happy Birthday
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cake + candles */}
      <motion.div
        className="relative z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: phase === 'entrance' ? 100 : 0, opacity: phase === 'entrance' ? 0 : 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(255,215,0,0.2) 0%,transparent 70%)', filter: 'blur(60px)', transform: 'scale(2)' }}
          animate={{ opacity: phase === 'entrance' ? 0 : [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative flex flex-col items-center">
          {/* Candle row */}
          <div className="relative w-48 h-0 flex items-end justify-center mb-1" style={{ zIndex: 30 }}>
            {CANDLE_POSITIONS.map((cx, ci) => (
              <div
                key={`candle-${ci}`}
                className="absolute"
                style={{ left: `calc(50% + ${cx}px)`, bottom: 0, transform: 'translateX(-50%)' }}
              >
                <AnimatePresence>
                  {candleLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: [1, 1.6, 0], opacity: [1, 0.5, 0], y: -30 }}
                      transition={{ exit: { duration: 0.5 } }}
                      className="absolute"
                      style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)' }}
                    >
                      <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 28, height: 28,
                        background: 'radial-gradient(circle,rgba(255,140,0,0.9),rgba(255,215,0,0.4),transparent)',
                        filter: 'blur(8px)', borderRadius: '50%',
                      }} />
                      <motion.svg
                        width="14" height="20" viewBox="0 0 14 20"
                        style={{ position: 'relative', zIndex: 1 }}
                        animate={{ scaleX: [1, 1.1, 0.9, 1], skewX: [0, -3, 3, 0] }}
                        transition={{ duration: 0.5 + ci * 0.07, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <defs>
                          <radialGradient id={`fg-o-${ci}`} cx="50%" cy="65%">
                            <stop offset="0%" stopColor="#FF8C00" />
                            <stop offset="60%" stopColor="#FFA500" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
                          </radialGradient>
                          <radialGradient id={`fg-i-${ci}`} cx="50%" cy="75%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="50%" stopColor="#FFF8DC" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <path d="M7 1 C5 4 3 7 3 12 C3 16 5 19 7 19 C9 19 11 16 11 12 C11 7 9 4 7 1Z" fill={`url(#fg-o-${ci})`} />
                        <ellipse cx="7" cy="14" rx="2.5" ry="3.5" fill={`url(#fg-i-${ci})`} />
                      </motion.svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Smoke wisps per candle after blow */}
                <AnimatePresence>
                  {phase === 'blow' && !candleLit && (
                    <>
                      {[0, 1, 2, 3].map((j) => {
                        const driftX = (j % 2 === 0 ? 1 : -1) * (3 + j * 4);
                        const wispSize = 8 + j * 4;
                        return (
                          <motion.div
                            key={`wisp-${ci}-${j}`}
                            style={{
                              position: 'absolute', bottom: '100%', left: '50%',
                              marginLeft: -wispSize / 2,
                              width: wispSize, height: wispSize, borderRadius: '50%',
                              background: 'radial-gradient(circle, rgba(220,220,220,0.55) 0%, rgba(180,180,180,0.2) 55%, transparent 100%)',
                              filter: `blur(${3 + j * 2}px)`,
                              pointerEvents: 'none',
                            }}
                            initial={{ y: 0, x: 0, opacity: 0, scale: 0.4 }}
                            animate={{
                              y: [0, -(18 + j * 16), -(30 + j * 24)],
                              x: [0, driftX * 0.6, driftX * 1.4],
                              opacity: [0, 0.7, 0],
                              scale: [0.4, 1.2 + j * 0.3, 2 + j * 0.4],
                            }}
                            transition={{ duration: 1.4 + j * 0.2, delay: j * 0.1, ease: 'easeOut' }}
                          />
                        );
                      })}
                      <motion.div
                        style={{
                          position: 'absolute', bottom: '100%', left: '50%', marginLeft: -1,
                          width: 2, background: 'linear-gradient(to top, rgba(200,200,200,0.6), transparent)',
                          borderRadius: 2, pointerEvents: 'none', transformOrigin: 'bottom center',
                        }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: [0, 22, 14, 0],
                          opacity: [0, 0.55, 0.3, 0],
                          scaleX: [1, 1.5, 0.8, 0.3],
                          x: [0, (ci % 2 === 0 ? 3 : -3), (ci % 2 === 0 ? 5 : -5)],
                        }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Candle stick */}
                <div style={{
                  width: 6, height: isMobile ? 20 : 28,
                  background: `linear-gradient(to right, #F8F8FF, ${['#FFB6C1','#FFD700','#87CEEB','#DDA0DD','#98FB98'][ci]}, #F0E68C)`,
                  borderRadius: '2px 2px 0 0',
                  boxShadow: 'inset 1px 0 1px rgba(255,255,255,0.8), inset -1px 0 1px rgba(0,0,0,0.15)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                    width: 1.5, height: 4, background: '#555', borderRadius: 1,
                  }} />
                  {candleLit && (
                    <div style={{
                      position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
                      width: 3, height: 6,
                      background: ['#FFB6C1','#FFD700','#87CEEB','#DDA0DD','#98FB98'][ci],
                      borderRadius: '0 0 3px 3px', opacity: 0.7,
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cake tiers */}
          <div className="relative flex flex-col items-center gap-0">
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: isMobile ? 160 : 192, height: isMobile ? 60 : 80,
                borderRadius: 14,
                background: 'linear-gradient(to bottom, #E6E6FA 0%, #DDA0DD 50%, #FFB6C1 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.5)',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#FFD700,#FFA500,#FFD700,transparent)', opacity: 0.8 }} />
              <motion.div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: isMobile ? 210 : 256, height: isMobile ? 80 : 112,
                borderRadius: 14,
                background: 'linear-gradient(to bottom, #FFB6C1 0%, #FFE4E1 25%, #E0F2FE 75%, #87CEEB 100%)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
                {[15, 30, 47, 63, 80].map((left, i) => (
                  <motion.div
                    key={`drip-${i}`}
                    className="absolute top-0 rounded-b-full"
                    style={{ left: `${left}%`, width: 12, background: 'linear-gradient(to bottom,#FFD700,#FFA500)', opacity: 0.9 }}
                    initial={{ height: 0 }}
                    animate={{ height: 20 }}
                    transition={{ duration: 1.2, delay: 1 + i * 0.15, ease: 'easeOut' }}
                  />
                ))}
              </div>
              <motion.div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.3) 50%,transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </motion.div>
            <div style={{ width: isMobile ? 230 : 288, height: 10, borderRadius: 999, marginTop: 6, background: 'linear-gradient(to bottom,#E5E5E5,#C0C0C0)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }} />
          </div>
        </div>
      </motion.div>

      {/* Make a wish prompt */}
      <AnimatePresence>
        {phase === 'candle-lit' && !hasBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-28 z-50 text-center px-4"
          >
            <motion.p
              className="text-white/90 font-light text-lg tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Make a wish · tap to blow the candles
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ CELEBRATION ══ */}
      <AnimatePresence>
        {phase === 'celebration' && (
          <>
            {/* Firework sparks */}
            {mobileFireworkBursts.map((burst, bi) =>
              burst.map((spark, si) => (
                <motion.div
                  key={`fw-${bi}-${si}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${spark.x}%`, top: `${spark.y}%`,
                    width: spark.size, height: spark.size,
                    background: spark.color,
                    boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: spark.vx, y: spark.vy, opacity: [1, 0.9, 0], scale: [1, 0.8, 0] }}
                  transition={{ duration: isMobile ? 0.9 : 1.1, delay: bi * 0.11 + spark.delay, ease: [0.2, 0.8, 0.4, 1] }}
                />
              ))
            )}

            {/* Flash at each burst origin */}
            {mobileFireworkBursts.map((burst, bi) => (
              <motion.div
                key={`flash-${bi}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${burst[0].x}%`, top: `${burst[0].y}%`,
                  width: 28, height: 28, marginLeft: -14, marginTop: -14,
                  background: burst[0].color,
                  filter: 'blur(7px)',
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 3.5, 0], opacity: [1, 0.7, 0] }}
                transition={{ duration: 0.55, delay: bi * 0.11 }}
              />
            ))}

            {/* 3 shockwave rings per burst */}
            {allRings.map((r, i) => (
              <div
                key={`ring-${i}`}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: `${r.x}%`, top: `${r.y}%`,
                  width: r.size, height: r.size,
                  border: `2px solid ${r.color}`,
                  boxShadow: `0 0 10px ${r.color}88`,
                  animation: `luxe-pop-ring 0.8s cubic-bezier(0.2,0.8,0.3,1) ${r.delay + Math.floor(i / 3) * 0.11}s forwards`,
                  opacity: 0,
                }}
              />
            ))}

            {/* Glowing orbs floating up */}
            {mobileOrbs.map((orb, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${orb.left}%`,
                  bottom: `${orb.bottom}%`,
                  width: orb.size, height: orb.size,
                  background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, ${orb.color} 55%, transparent 90%)`,
                  boxShadow: `0 0 ${orb.size}px ${orb.color}99`,
                  filter: 'blur(1px)',
                }}
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.3, 1, 0],
                  y: -120 - (i % 3) * 50,
                  x: orb.drift,
                }}
                transition={{ duration: orb.dur, delay: orb.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Light rays */}
            {Array.from({ length: isMobile ? 8 : 18 }).map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute pointer-events-none"
                style={{
                  top: '50%', left: '50%',
                  width: 3, height: isMobile ? 140 : 220,
                  background: `linear-gradient(to bottom,${['rgba(255,215,0,0.85)','rgba(255,182,193,0.85)','rgba(230,230,250,0.85)','rgba(255,99,132,0.75)'][i % 4]},transparent)`,
                  transformOrigin: 'top center',
                  rotate: `${(i * 360) / (isMobile ? 8 : 18)}deg`,
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.95, 0], scaleY: [0, 1.7, 2.2] }}
                transition={{ duration: 1.8, delay: 0.08 + i * 0.04, ease: 'easeOut' }}
              />
            ))}

            {/* Falling confetti particles (supplemental) */}
            {Array.from({ length: isMobile ? 20 : 44 }).map((_, i) => (
              <motion.div
                key={`cp-${i}`}
                className="absolute rounded-sm pointer-events-none"
                style={{
                  left: `${8 + (i * 13) % 84}%`,
                  top: `${4 + (i * 17) % 40}%`,
                  width: 6 + (i % 4) * 2, height: 6 + (i % 3) * 3,
                  background: ['#FFD700','#FF69B4','#87CEEB','#9B59B6','#FF6347','#00FF7F','#FFA500'][i % 7],
                  rotate: `${(i * 37) % 360}deg`,
                }}
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  y: [0, 130 + (i % 5) * 40],
                  x: [(i % 2 === 0 ? 22 : -22) + (i % 3) * 10],
                  rotate: `${(i * 37 + 400) % 720}deg`,
                  scale: [0, 1.2, 0.8, 0],
                }}
                transition={{ duration: 2.2 + (i % 4) * 0.4, delay: (i * 0.04) % 0.9, ease: 'easeOut' }}
              />
            ))}

            {/* Celebration text */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ bottom: '18%', left: 0, right: 0, textAlign: 'center', zIndex: 40 }}
              initial={{ opacity: 0, scale: 0.4, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '1.7rem' : '2.6rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg,#FFD700 0%,#FFA500 40%,#FF69B4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 16px rgba(255,215,0,0.7))',
              }}>
                🎉 Happy Birthday! 🎉
              </p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                style={{
                  color: 'rgba(255,230,200,0.8)',
                  fontSize: isMobile ? '0.85rem' : '1rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: 8,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Your wish was just made ✨
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
