/**
 * New Year's Eve - Neon Countdown Pulse Ceremony (RARE)
 * Mobile-optimised: CSS rays, memoised particles, short transitions for number visibility
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface NewYearCountdownCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const COUNTDOWN_CSS = `
@keyframes ny-pop-ring {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.92; }
  55%  { opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
}
@keyframes ny-flash {
  0%   { opacity: 0; }
  8%   { opacity: 1; }
  40%  { opacity: 0; }
}
@keyframes ny-orb-float {
  0%   { transform: translate(0, 0) scale(1); opacity: 0.9; }
  100% { transform: translate(var(--dx), -90px) scale(0.4); opacity: 0; }
}
@keyframes ny-ray-appear {
  0%   { opacity: 0; }
  25%  { opacity: 1; }
  100% { opacity: 0.65; }
}
`;

export function NewYearCountdownCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewYearCountdownCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'countdown' | 'finale' | 'radiance'>('intro');
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const nyColors = useMemo(() => ['#ec4899','#f59e0b','#8b5cf6','#22d3ee','#ef4444','#ffffff','#fbbf24','#fb923c'], []);

  const nyFwPositions = useMemo(() => [
    {x:10,y:20},{x:25,y:12},{x:40,y:22},{x:55,y:10},{x:70,y:20},{x:85,y:14},{x:15,y:35},{x:90,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);

  const nyFwSparks = useMemo(() => nyFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: nyColors[i % nyColors.length], delay: i*0.04 };
    })
  ), [nyFwPositions, nyColors, isMobile]);

  const nyFwRings = useMemo(() => nyFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#ec4899','#f59e0b','#8b5cf6'][i] }))
  ), [nyFwPositions]);

  const nyOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: nyColors[i % nyColors.length]
  })), [nyColors, isMobile]);

  // Memoised radiance-stage particles — no Math.random() in render
  const celebrationData = useMemo(() => Array.from({length: isMobile ? 28 : 50}, (_, i) => ({
    left: (i * 7.3) % 100,
    top:  (i * 11.7) % 100,
    rotateDir: i % 2 === 0 ? 360 : -360,
    delay: (i * 0.024) % 1.2,
    emoji: ['🎉', '🎊', '✨', '🌟', '💫', '🎆', '🎇'][i % 7]
  })), [isMobile]);

  const sparkleData = useMemo(() => Array.from({length: isMobile ? 14 : 30}, (_, i) => ({
    left:  15 + (i * 4.7) % 70,
    top:   15 + (i * 6.3) % 70,
    delay: 0.4 + (i * 0.033) % 1,
    color: ['#ef4444','#f59e0b','#22d3ee','#8b5cf6','#ec4899'][i % 5]
  })), [isMobile]);

  const beatParticleCount = isMobile ? 16 : 32;
  const rayCount = isMobile ? 36 : 72;

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => { setStage('countdown'); setCurrentNumber(10); }, 2000));

    let countdownValue = 10;
    timers.push(setTimeout(() => {
      intervalRef.current = setInterval(() => {
        countdownValue--;
        setCurrentNumber(countdownValue);
        if (countdownValue <= 0) {
          if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        }
      }, 1000);
    }, 3000));

    timers.push(setTimeout(() => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      setStage('finale'); setCurrentNumber(0);
    }, 13000));

    timers.push(setTimeout(() => { setStage('radiance'); setCurrentNumber(null); }, 15000));
    timers.push(setTimeout(() => { if (!isPreview && onComplete) onComplete(); }, 18000));

    const failsafe = setTimeout(() => { onComplete?.(); }, 19000);
    return () => {
      timers.forEach(clearTimeout); clearTimeout(failsafe);
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#ec4899','#f59e0b','#8b5cf6','#22d3ee','#ef4444','#ffffff','#fbbf24'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60,  origin: { x: isMobile ? 0.12 : 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60,  origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const numColor  = (n: number | null) =>
    n === 0 ? '#ef4444' : (n ?? 10) <= 3 ? '#f59e0b' : (n ?? 10) <= 6 ? '#fbbf24' : '#ec4899';
  const numGlow   = (n: number | null) =>
    n === 0 ? 'rgba(239,68,68,1)' : (n ?? 10) <= 3 ? 'rgba(245,158,11,1)' : (n ?? 10) <= 6 ? 'rgba(251,191,36,1)' : 'rgba(236,72,153,1)';
  const numShadow = (n: number | null) =>
    n === 0 ? '#7f1d1d' : (n ?? 10) <= 3 ? '#78350f' : (n ?? 10) <= 6 ? '#713f12' : '#701a75';

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black">
      <style>{COUNTDOWN_CSS}</style>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(139,92,246,0.4) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Ambient lights — reduced blur on mobile */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
            width: '250px', height: '250px',
            background: i % 3 === 0
              ? 'radial-gradient(circle, rgba(236,72,153,0.4), transparent)'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(245,158,11,0.4), transparent)'
              : 'radial-gradient(circle, rgba(139,92,246,0.4), transparent)',
            filter: `blur(${isMobile ? 20 : 40}px)`
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.3, repeat: 6, ease: 'easeInOut' }}
        />
      ))}

      {/* INTRO */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.8 }}
            className="absolute top-1/3 left-0 right-0 text-center z-20"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Neon Countdown
            </motion.h1>
            <p className="text-white text-2xl font-medium">⏰ The Final Seconds ⏰</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COUNTDOWN NUMBERS — perspective wrapper for proper 3D rotateY
          No mode="wait": enter (0.25s) and exit (0.15s) overlap slightly.
          Each number is fully visible for ~750ms of the 1000ms interval. */}
      <div style={{ position: 'absolute', inset: 0, perspective: '1000px' }}>
        <AnimatePresence>
          {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
            <motion.div
              key={`number-display-${currentNumber}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
              animate={{
                scale: stage === 'finale' && currentNumber === 0
                  ? [1.5, 3, 2.8, 3, 2.9]
                  : [1.3, 1],
                opacity: 1,
                rotateY: 0
              }}
              exit={{ scale: 0, opacity: 0, rotateY: 90, transition: { duration: 0.15, ease: 'easeIn' } }}
              transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative">
                <motion.div
                  className="text-[22rem] font-black leading-none select-none"
                  style={{
                    color: numColor(currentNumber),
                    textShadow: `0 0 120px ${numGlow(currentNumber)}, 0 0 180px ${numGlow(currentNumber)}, 0 20px 50px rgba(0,0,0,0.9)`,
                    WebkitTextStroke: '6px rgba(255,255,255,0.5)'
                  }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.5, repeat: 8, ease: 'easeInOut' }}
                >
                  {currentNumber}
                </motion.div>

                {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                  <div key={`depth-${i}`}
                    className="absolute inset-0 text-[22rem] font-black leading-none select-none pointer-events-none"
                    style={{
                      color: numShadow(currentNumber),
                      zIndex: -1 - i,
                      transform: `translate(${i * 2.5}px, ${i * 2.5}px)`,
                      opacity: 0.35 - i * 0.02
                    }}
                  >
                    {currentNumber}
                  </div>
                ))}
              </div>

              {[...Array(isMobile ? 3 : 5)].map((_, ri) => (
                <motion.div key={`ring-${ri}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8"
                  style={{
                    width: `${400 + ri * 120}px`, height: `${400 + ri * 120}px`,
                    borderColor: numColor(currentNumber),
                    boxShadow: `0 0 100px ${numGlow(currentNumber)}`
                  }}
                  animate={{
                    scale:   stage === 'finale' ? [1, 1.6, 1.4] : [1, 1.5, 1.2],
                    opacity: stage === 'finale' ? [0.9, 0.2, 0.9] : [0.8, 0.1, 0.8],
                    rotate:  ri % 2 === 0 ? [0, 360] : [360, 0]
                  }}
                  transition={{ duration: 1 + ri * 0.2, repeat: 8, ease: 'linear' }}
                />
              ))}

              {[...Array(isMobile ? 5 : 10)].map((_, i) => (
                <motion.div key={`arc-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: '650px', height: '650px' }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2.2 - i * 0.15, repeat: 8, ease: 'linear' }}
                >
                  <motion.div className="absolute"
                    style={{
                      left: '50%', top: '-15px', width: '5px', height: '100px',
                      background: `linear-gradient(to bottom, ${numColor(currentNumber)}, transparent)`,
                      boxShadow: `0 0 25px ${numColor(currentNumber)}`,
                      filter: 'blur(2px)'
                    }}
                    animate={{ opacity: [0, 1, 0], scaleY: [0.4, 2, 0.4] }}
                    transition={{ duration: 0.6, repeat: 8, delay: i * 0.08 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shockwaves */}
      <AnimatePresence>
        {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div key={`shockwave-${currentNumber}-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 z-30"
                style={{ borderColor: numColor(currentNumber) }}
                initial={{ width: '150px', height: '150px', opacity: 1 }}
                animate={{
                  width:   stage === 'finale' ? '2000px' : '1400px',
                  height:  stage === 'finale' ? '2000px' : '1400px',
                  opacity: 0
                }}
                transition={{ duration: stage === 'finale' ? 1.8 : 1.2, delay: i * 0.12, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Beat particles */}
      {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
        <>
          {[...Array(beatParticleCount)].map((_, i) => {
            const angle = (i / beatParticleCount) * Math.PI * 2;
            return (
              <motion.div key={`particle-${currentNumber}-${i}`}
                className="absolute left-1/2 top-1/2 z-25"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * (stage === 'finale' ? 500 : 350),
                  y: Math.sin(angle) * (stage === 'finale' ? 500 : 350),
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: stage === 'finale' ? 1.8 : 1.2, ease: 'easeOut' }}
              >
                <div className="w-5 h-5 rounded-full"
                  style={{ background: numColor(currentNumber), boxShadow: `0 0 25px ${numColor(currentNumber)}` }} />
              </motion.div>
            );
          })}
        </>
      )}

      {/* RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {nyFwPositions.map((pos, pi) => (
              <React.Fragment key={`ny-fw-${pi}`}>
                {nyFwSparks[pi].map((s, si) => (
                  <motion.div key={`ny-spark-${pi}-${si}`} className="absolute rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color, zIndex: 51 }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {nyFwRings[pi].map((r, ri) => (
                  <div key={`ny-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{
                      left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20,
                      borderColor: r.color, animation: `ny-pop-ring 0.9s ease-out ${r.delay}s both`
                    }}
                  />
                ))}
                <div key={`ny-flash-${pi}`} className="absolute rounded-full"
                  style={{
                    left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${nyColors[pi % nyColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'ny-flash 0.5s ease-out both'
                  }}
                />
              </React.Fragment>
            ))}

            {nyOrbs.map((orb, i) => (
              <div key={`ny-orb-${i}`} className="absolute rounded-full"
                style={{
                  left: `${orb.x}%`, bottom: '20%', width: 10, height: 10, zIndex: 49,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `ny-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}

            {/* Rainbow rays — CSS animated only, no framer-motion per element */}
            {[...Array(rayCount)].map((_, i) => {
              const rotation = (i * 360) / rayCount;
              const colors = ['#ef4444','#f59e0b','#fbbf24','#84cc16','#22d3ee','#8b5cf6','#ec4899'];
              const color = colors[i % colors.length];
              return (
                <div key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw', height: '8px', marginLeft: '-100vw',
                    transformOrigin: 'center', transform: `rotate(${rotation}deg)`,
                    opacity: 0,
                    animation: `ny-ray-appear 1.8s ease-out ${i * (isMobile ? 0.012 : 0.006)}s forwards`
                  }}
                >
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(to right, transparent, ${color}90 50%, transparent)`,
                    filter: 'blur(4px)'
                  }} />
                </div>
              );
            })}

            {/* Center radiance — viewport-fill with opacity fade, no scale+blur thrash */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(239,68,68,0.25) 20%, rgba(236,72,153,0.18) 40%, transparent 70%)',
                filter: `blur(${isMobile ? 25 : 55}px)`
              }}
            />

            <motion.div
              className="absolute top-2/3 left-1/2 -translate-x-1/2 z-50 px-4"
              initial={{ scale: 0, opacity: 0, y: 30 }}
              animate={{ scale: [0, 1.4, 1.1], opacity: [0, 1, 1], y: [30, 0, 0] }}
              transition={{ duration: 1.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-center"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6, #22d3ee, #ec4899)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 50px rgba(236,72,153,1))'
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: 6 }}
              >
                🎉 HAPPY NEW YEAR! 🎉
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl font-semibold text-center mt-2"
                style={{ color: '#fef3c7', textShadow: '0 0 20px rgba(236,72,153,0.9), 0 4px 14px rgba(0,0,0,0.9)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                The countdown ends · your story begins ✨
              </motion.p>
            </motion.div>

            {/* Celebration emojis — MEMOISED positions */}
            {celebrationData.map((p, i) => (
              <motion.div key={`celebration-${i}`}
                className="absolute text-5xl"
                style={{ left: `${p.left}%`, top: `${p.top}%`, zIndex: 45 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1, 0], opacity: [0, 1, 1, 0], y: [0, -200], rotate: [0, p.rotateDir] }}
                transition={{ duration: 3, delay: p.delay, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.div>
            ))}

            {/* Sparkle bursts — MEMOISED positions */}
            {sparkleData.map((s, i) => (
              <motion.div key={`sparkle-${i}`}
                className="absolute"
                style={{ left: `${s.left}%`, top: `${s.top}%`, zIndex: 45 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 0], opacity: [0, 1, 0], rotate: [0, 270] }}
                transition={{ duration: 1.8, delay: s.delay, ease: 'easeOut' }}
              >
                <div className="w-8 h-8 rounded-full"
                  style={{ background: s.color, boxShadow: `0 0 40px ${s.color}` }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
