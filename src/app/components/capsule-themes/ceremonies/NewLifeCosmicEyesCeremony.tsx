/**
 * New Life - STORM & CALM: Stork Delivery (EPIC/LEGENDARY)
 * Performance-safe: CSS keyframes for lightning flash and loops,
 * useMemo for all random data, capped element counts.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface NewLifeCosmicEyesCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const STORK_CSS = `
@keyframes sk-pop-ring {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.92; }
  55%  { opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
}
@keyframes sk-flash {
  0%   { opacity: 0; }
  8%   { opacity: 1; }
  40%  { opacity: 0; }
}
@keyframes sk-orb-float {
  0%   { transform: translate(0, 0) scale(1); opacity: 0.9; }
  100% { transform: translate(var(--dx), -90px) scale(0.4); opacity: 0; }
}
@keyframes lightning-flash {
  0%,100%         { opacity: 0; }
  5%, 8%          { opacity: 1; }
  12%             { opacity: 0; }
  40%, 43%        { opacity: 0.9; }
  47%             { opacity: 0; }
  72%, 75%        { opacity: 0.85; }
  79%             { opacity: 0; }
  94%, 96%        { opacity: 0.8; }
}
@keyframes wind-gust {
  0%   { transform: translateX(-40%); opacity: 0; }
  30%  { opacity: 0.3; }
  70%  { opacity: 0.3; }
  100% { transform: translateX(65%); opacity: 0; }
}
@keyframes rain-fall {
  from { transform: translateY(-10vh) rotate(25deg); }
  to   { transform: translateY(130vh) rotate(25deg); }
}
@keyframes smoke-puff {
  0%   { transform: translateY(-24px) translateX(0) scale(1); opacity: 0.85; }
  100% { transform: translateY(-140px) translateX(30px) scale(2.5); opacity: 0; }
}
`;

export function NewLifeCosmicEyesCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeCosmicEyesCeremonyProps) {
  const [stage, setStage] = useState<'storm' | 'struggle' | 'breakthrough' | 'rainbow' | 'landing' | 'dropoff' | 'flyaway'>('storm');

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const skColors = useMemo(() => ['#fbbf24','#fb923c','#f472b6','#a78bfa','#ffffff','#fde68a','#34d399','#60a5fa'], []);
  const skFwPositions = useMemo(() => [
    {x:8,y:12},{x:22,y:8},{x:38,y:16},{x:52,y:7},{x:68,y:14},{x:82,y:10},{x:14,y:26},{x:90,y:20},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const skFwSparks = useMemo(() => skFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: skColors[i % skColors.length], delay: i*0.04 };
    })
  ), [skFwPositions, skColors, isMobile]);
  const skFwRings = useMemo(() => skFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#fbbf24','#f472b6','#a78bfa'][i] }))
  ), [skFwPositions]);
  const skOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: skColors[i % skColors.length]
  })), [skColors, isMobile]);

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('storm') },
      { time: 2500,  action: () => setStage('struggle') },
      { time: 5000,  action: () => setStage('breakthrough') },
      { time: 6500,  action: () => setStage('rainbow') },
      { time: 12000, action: () => setStage('landing') },
      { time: 17000, action: () => setStage('dropoff') },
      { time: 19500, action: () => setStage('flyaway') },
      { time: 22500, action: () => onComplete?.() }
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage !== 'dropoff') return;
    const colors = ['#fbbf24','#fb923c','#f472b6','#a78bfa','#ffffff','#fde68a','#34d399'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60, origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  const isStorm = ['storm', 'struggle'].includes(stage);
  const isCalm  = ['breakthrough', 'rainbow', 'landing', 'dropoff', 'flyaway'].includes(stage);
  const isHome  = ['landing', 'dropoff', 'flyaway'].includes(stage);
  const showRainbow = ['rainbow', 'landing', 'dropoff', 'flyaway'].includes(stage);
  const hasBaby = !['dropoff', 'flyaway'].includes(stage);

  /* ── Stable random data ── */
  const rainDrops = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    x:      (i / 80) * 100,
    speed:  0.22 + (i % 5) * 0.024,
    length: 18 + (i % 4) * 5,
    delay:  i * 0.0025
  })), []);

  const windGusts = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    top:      10 + i * 8,
    duration: 1.1 + (i % 3) * 0.13,
    delay:    i * 0.08
  })), []);

  const clouds = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    size:     300 + (i % 5) * 80,
    left:     (i * 12) % 130 - 15,
    top:      6 + (i % 3) * 16 + (i % 5) * 5,
    bgX:      30 + (i % 4) * 8,
    bgY:      30 + (i % 3) * 9,
    moveDur:  4 + (i % 3) * 0.8,
    delay:    i * 0.12
  })), []);

  const stardustTrail = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    xDrift: ((i % 10) - 5) * 11.5,
    yDrift: 78 + (i % 6) * 11,
    dur:    2.5,
    delay:  i * 0.068
  })), []);

  const breakthroughClouds = useMemo(() => Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const distance = 220 + (i % 4) * 62;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      delay: i * 0.008
    };
  }), []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <style>{STORK_CSS}</style>

      {/* Sky */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: stage === 'dropoff' || stage === 'flyaway'
            ? 'linear-gradient(to bottom, #fbbf24 0%, #fb923c 15%, #f472b6 35%, #e879f9 55%, #c084fc 75%, #a78bfa 90%, #6366f1 100%)'
            : stage === 'landing'
            ? 'linear-gradient(to bottom, #fcd34d 0%, #fbbf24 18%, #fb923c 38%, #f472b6 58%, #c084fc 78%, #8b5cf6 100%)'
            : stage === 'rainbow'
            ? 'linear-gradient(to bottom, #fef3c7 0%, #fcd34d 15%, #fbbf24 30%, #fb923c 48%, #f472b6 68%, #c084fc 85%, #8b5cf6 100%)'
            : stage === 'breakthrough'
            ? 'linear-gradient(to bottom, #94a3b8 0%, #64748b 22%, #f59e0b 55%, #fb923c 78%, #f472b6 100%)'
            : 'linear-gradient(to bottom, #1f2937 0%, #374151 30%, #4b5563 70%, #6b7280 100%)'
        }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Lightning flash — CSS animation, no useState/setTimeout */}
      {isStorm && (
        <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 20%, rgba(255,255,255,1), rgba(255,255,255,0.65) 40%, transparent 75%)',
            animation: 'lightning-flash 5s ease-in-out infinite'
          }}
        />
      )}

      {/* Storm clouds */}
      <AnimatePresence>
        {isStorm && (
          <>
            {clouds.map((c, i) => (
              <motion.div key={i} className="absolute z-10"
                style={{
                  left: `${c.left}%`, top: `${c.top}%`,
                  width: `${c.size}px`, height: `${c.size * 0.6}px`,
                  borderRadius: '60% 60% 55% 55%',
                  background: `radial-gradient(ellipse at ${c.bgX}% ${c.bgY}%, #4b5563, #1f2937, #0f172a)`,
                  filter: 'blur(30px)', opacity: 0.95
                }}
                animate={{ x: [0, 50, 0], opacity: [0.9, 0.98, 0.9], scale: [1, 1.12, 1] }}
                exit={{ opacity: 0, scale: 1.4, transition: { duration: 1 } }}
                transition={{ duration: c.moveDur, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Rain — CSS animation, capped at 80 */}
      <AnimatePresence>
        {isStorm && (
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            {rainDrops.map((r, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${r.x}%`,
                top: '-10%',
                width: '3px',
                height: `${r.length}px`,
                background: 'linear-gradient(to bottom, rgba(147,197,253,1), rgba(59,130,246,0.7))',
                borderRadius: '4px',
                animation: `rain-fall ${r.speed}s linear ${r.delay}s infinite`
              }} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Wind gusts — CSS animation */}
      <AnimatePresence>
        {isStorm && (
          <div className="absolute inset-0 z-12 pointer-events-none overflow-hidden">
            {windGusts.map((w, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: '-40%', top: `${w.top}%`,
                width: '180%', height: '6px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.26) 70%, transparent)',
                filter: 'blur(8px)',
                animation: `wind-gust ${w.duration}s ease-in-out ${w.delay}s infinite`
              }} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Stork */}
      <motion.div
        className="absolute z-30"
        style={{
          left: stage === 'flyaway' ? '150%' : '50%',
          top: stage === 'dropoff' ? '58%' : isHome ? '50%' : '40%'
        }}
        animate={{
          y: isStorm ? [0, -34, 12, -30, 0] : stage === 'dropoff' ? [0, -8, 0] : isHome ? [0, -10, 0] : [0, -22, 0],
          x: isStorm ? [-52, 48, -48, 38, -52] : stage === 'flyaway' ? [0, 650] : [0],
          rotate: isStorm ? [-22, 18, -20, 14, -22] : stage === 'flyaway' ? [0, -15] : isHome ? [0, -5, 0] : [0],
          scale: isHome ? (stage === 'dropoff' ? 1.08 : [1, 1.12, 1]) : [1]
        }}
        transition={{
          y: { duration: isStorm ? 2.4 : isHome ? 3 : 5.8, repeat: stage === 'flyaway' ? 0 : Infinity },
          x: { duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 5.8), repeat: stage === 'flyaway' ? 0 : Infinity, ease: stage === 'flyaway' ? [0.4, 0, 0.8, 1] : 'easeInOut' },
          rotate: { duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 3), repeat: stage === 'flyaway' ? 0 : Infinity },
          scale: { duration: 3, repeat: isHome && stage !== 'dropoff' ? 0 : Infinity },
          ease: 'easeInOut'
        }}
      >
        <svg width="110" height="90" viewBox="0 0 110 90" style={{
          transform: 'translateX(-50%)',
          filter: isStorm ? 'drop-shadow(0 14px 45px rgba(0,0,0,1))' : 'drop-shadow(0 12px 38px rgba(251,191,36,0.85))'
        }}>
          <ellipse cx="45" cy="50" rx="24" ry="18" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <motion.path d="M 60,42 Q 75,30 78,18" stroke="#ffffff" strokeWidth="8" fill="none" strokeLinecap="round"
            animate={{ d: isStorm ? ["M 60,42 Q 75,30 78,18","M 60,42 Q 73,32 76,20","M 60,42 Q 75,30 78,18"] : "M 60,42 Q 75,30 78,18" }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <circle cx="80" cy="15" r="9" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          <path d="M 88,14 L 105,12 L 104,16 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
          <circle cx="83" cy="13" r="1.8" fill="#1f2937" />
          <motion.g animate={{ rotate: isStorm ? [-25, 25, -25] : [-18, 18, -18] }}
            transition={{ duration: isStorm ? 0.35 : 0.45, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '45px 45px' }}>
            <ellipse cx="30" cy="45" rx="28" ry="12" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.2" opacity="0.95" />
          </motion.g>
          <motion.g animate={{ rotate: isStorm ? [25, -25, 25] : [18, -18, 18] }}
            transition={{ duration: isStorm ? 0.35 : 0.45, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '45px 45px' }}>
            <ellipse cx="60" cy="45" rx="28" ry="12" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.2" opacity="0.95" />
          </motion.g>
          <path d="M 42,65 L 40,78" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 48,65 L 50,78" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {hasBaby && (
          <div style={{
            position: 'absolute', left: '75%', top: '8%',
            fontSize: '48px',
            filter: 'drop-shadow(0 0 45px rgba(251,191,36,1)) drop-shadow(0 7px 24px rgba(0,0,0,1))',
            transform: 'translate(-50%,-50%)'
          }}>👶</div>
        )}
        {hasBaby && (
          <>
            <div style={{
              position: 'absolute', left: '75%', top: '8%',
              width: '62px', height: '58px',
              background: 'linear-gradient(135deg, rgba(254,249,195,0.85), rgba(251,191,36,0.65))',
              borderRadius: '45% 45% 48% 48%',
              border: '4px solid rgba(254,249,195,0.7)',
              transform: 'translate(-50%,-50%)', zIndex: -1
            }} />
            <div style={{
              position: 'absolute', left: '75%', top: '8%',
              width: '52px', height: '52px',
              background: 'radial-gradient(circle, rgba(254,249,195,0.5), rgba(251,191,36,0.3))',
              borderRadius: '50%', transform: 'translate(-50%,-50%)',
              filter: 'blur(8px)', zIndex: -2
            }} />
          </>
        )}
      </motion.div>

      {/* Glowing aura */}
      <motion.div
        className="absolute z-29 pointer-events-none"
        style={{
          left: stage === 'flyaway' ? '150%' : '50%',
          top: stage === 'dropoff' ? '58%' : isHome ? '50%' : '40%',
          width: '130px', height: '130px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.82), rgba(251,191,36,0.48) 50%, transparent 70%)',
          filter: 'blur(30px)'
        }}
        animate={{
          scale: [1, 1.5, 1], opacity: [0.92, 1, 0.92],
          y: isStorm ? [0, -34, 12, -30, 0] : stage === 'dropoff' ? [0, -8, 0] : isHome ? [0, -10, 0] : [0, -22, 0],
          x: isStorm ? [-52, 48, -48, 38, -52] : stage === 'flyaway' ? [0, 650] : [0]
        }}
        transition={{
          scale: { duration: 2.8, repeat: Infinity },
          opacity: { duration: 2.8, repeat: Infinity },
          y: { duration: isStorm ? 2.4 : isHome ? 3 : 5.8, repeat: stage === 'flyaway' ? 0 : Infinity },
          x: { duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 5.8), repeat: stage === 'flyaway' ? 0 : Infinity }
        }}
      />

      {/* Protective glow (storm) */}
      <AnimatePresence>
        {isStorm && (
          <motion.div className="absolute z-28 pointer-events-none"
            style={{
              left: '50%', top: '40%',
              width: '195px', height: '145px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.24), transparent 82%)',
              transform: 'translate(-50%,-50%)', filter: 'blur(24px)'
            }}
            animate={{ y: [0, -34, 12, -30, 0], x: [-52, 48, -48, 38, -52], scale: [1, 1.28, 1], opacity: [0.58, 0.78, 0.58] }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Breakthrough */}
      <AnimatePresence>
        {stage === 'breakthrough' && (
          <>
            {breakthroughClouds.map((c, i) => (
              <motion.div key={i} className="absolute z-20"
                style={{
                  left: '50%', top: '36%',
                  width: '135px', height: '78px', borderRadius: '70%',
                  background: 'radial-gradient(ellipse, #9ca3af, #6b7280)',
                  filter: 'blur(30px)'
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: c.x, y: c.y, opacity: [1, 0.88, 0], scale: [1, 3.5, 4.8] }}
                transition={{ duration: 1.5, delay: c.delay, ease: 'easeOut' }}
              />
            ))}
            <motion.div className="absolute z-19"
              style={{
                left: '50%', top: '36%',
                width: '580px', height: '580px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.98), rgba(251,191,36,0.6) 40%, transparent 70%)',
                transform: 'translate(-50%,-50%)', filter: 'blur(60px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 5, 6], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Rainbow */}
      <AnimatePresence>
        {showRainbow && (
          <motion.div className="absolute z-8"
            style={{ left: '-5%', right: '-5%', top: '-8%', height: '85%' }}
            initial={{ opacity: 0, scaleX: 0.4, scaleY: 0.5, y: 100 }}
            animate={{ opacity: stage === 'dropoff' || stage === 'flyaway' ? 1 : 0.92, scaleX: 1.1, scaleY: 1, y: 0 }}
            transition={{ duration: 5, ease: [0.34, 1.3, 0.64, 1] }}
          >
            <svg viewBox="0 0 1000 850" className="w-full h-full" style={{ overflow: 'visible' }}>
              {[
                { color: '#ef4444', size: 820, delay: 0 },
                { color: '#f97316', size: 770, delay: 0.2 },
                { color: '#fbbf24', size: 720, delay: 0.4 },
                { color: '#22c55e', size: 670, delay: 0.6 },
                { color: '#3b82f6', size: 620, delay: 0.8 },
                { color: '#6366f1', size: 570, delay: 1 },
                { color: '#a855f7', size: 520, delay: 1.2 }
              ].map((arc, i) => (
                <motion.path key={i}
                  d={`M -50,850 Q 500,${850 - arc.size} 1050,850`}
                  fill="none" stroke={arc.color} strokeWidth={45} strokeLinecap="round"
                  opacity="0" style={{ filter: 'blur(5px)' }}
                  animate={{ opacity: stage === 'dropoff' || stage === 'flyaway' ? 0.95 : 0.85, strokeDashoffset: [2400, 0] }}
                  transition={{
                    opacity: { delay: arc.delay, duration: 3.2, ease: 'easeOut' },
                    strokeDashoffset: { delay: arc.delay, duration: 3.8, ease: [0.4, 0, 0.2, 1] }
                  }}
                  strokeDasharray="2400"
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stardust trail */}
      <AnimatePresence>
        {isCalm && !isHome && (
          <>
            {stardustTrail.map((s, i) => (
              <motion.div key={i} className="absolute z-27"
                style={{
                  left: '50%', top: '40%',
                  width: '9.5px', height: '9.5px', borderRadius: '50%',
                  background: '#fbbf24', boxShadow: '0 0 20px rgba(251,191,36,1)'
                }}
                animate={{ x: s.xDrift, y: s.yDrift, opacity: [1, 0.88, 0], scale: [1, 1.7, 0] }}
                transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Cottage */}
      <AnimatePresence>
        {isHome && (
          <motion.div className="absolute bottom-0 z-25" style={{ left: '50%', transform: 'translateX(-50%)' }}
            initial={{ y: 190, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{
              width: '280px', height: '190px',
              background: 'linear-gradient(135deg, #92400e, #78350f, #451a03)',
              borderRadius: '20px', position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.75)'
            }}>
              {/* Roof */}
              <div style={{
                position: 'absolute', left: '50%', top: '-92px',
                transform: 'translateX(-50%)',
                width: '300px', height: '115px',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #7f1d1d)',
                boxShadow: 'inset 0 -24px 35px rgba(0,0,0,0.55)'
              }} />
              {/* Chimney */}
              <div style={{
                position: 'absolute', right: '50px', top: '-120px',
                width: '40px', height: '78px',
                background: '#7f1d1d', borderRadius: '10px 10px 0 0'
              }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: '50%', bottom: '100%',
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: 'rgba(156,163,175,0.85)', filter: 'blur(10px)',
                    transform: 'translateX(-50%)',
                    animation: `smoke-puff ${5.5}s ease-out ${i * 0.8}s infinite`
                  }} />
                ))}
              </div>
              {/* Door */}
              <motion.div style={{
                position: 'absolute', left: '50%', bottom: 0,
                transform: 'translateX(-50%)',
                width: '78px', height: '115px',
                background: 'linear-gradient(to bottom, #451a03, #292524)',
                borderRadius: '20px 20px 0 0',
                boxShadow: stage === 'dropoff' || stage === 'flyaway'
                  ? 'inset -8px 0 50px rgba(251,191,36,1), inset 8px 0 50px rgba(251,146,60,1)'
                  : 'inset -7px 0 24px rgba(251,191,36,0.78)'
              }}
              animate={{
                boxShadow: stage === 'dropoff' || stage === 'flyaway'
                  ? [
                      'inset -8px 0 50px rgba(251,191,36,1), inset 8px 0 50px rgba(251,146,60,1)',
                      'inset -9px 0 60px rgba(251,191,36,1), inset 9px 0 60px rgba(251,146,60,1)',
                      'inset -8px 0 50px rgba(251,191,36,1), inset 8px 0 50px rgba(251,146,60,1)'
                    ]
                  : undefined
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
              >
                <div style={{
                  position: 'absolute', right: '16px', top: '56%',
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: '#fbbf24', boxShadow: '0 0 16px rgba(251,191,36,1)'
                }} />
                {(stage === 'dropoff' || stage === 'flyaway') && (
                  <motion.div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: '7px',
                    background: 'linear-gradient(to bottom, #fbbf24, #fb923c)',
                    filter: 'blur(16px)', boxShadow: '-35px 0 60px rgba(251,191,36,1)'
                  }}
                  animate={{ opacity: [0.95, 1, 0.95] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </motion.div>
              {/* Windows */}
              {[{ left: '40px', top: '55px' }, { right: '40px', top: '55px' }].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', ...pos,
                  width: '60px', height: '60px',
                  background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                  borderRadius: '10px',
                  boxShadow: '0 0 45px rgba(251,191,36,1), inset 0 0 24px rgba(0,0,0,0.45)'
                }}>
                  <div style={{
                    position: 'absolute', inset: 0, display: 'grid',
                    gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
                    gap: '6px', padding: '6px'
                  }}>
                    {[0,1,2,3].map(pane => (
                      <div key={pane} style={{ background: 'rgba(120,53,15,0.55)', borderRadius: '5px' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Garden flowers */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '48px' }}>
              {[...Array(26)].map((_, i) => (
                <motion.div key={i} style={{
                  position: 'absolute', left: `${(i / 26) * 100}%`, bottom: 0, fontSize: '26px'
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.32, 1], rotate: [0, 24, -15, 0] }}
                transition={{ duration: 1.6, delay: 1.4 + i * 0.05 }}
                >
                  {['🌸','🌺','🌼','🌻'][i % 4]}
                </motion.div>
              ))}
            </div>

            {/* Welcome mat */}
            <div style={{
              position: 'absolute', left: '50%', bottom: 0,
              transform: 'translateX(-50%)',
              width: '100px', height: '22px',
              background: 'linear-gradient(to bottom, #7f1d1d, #991b1b)',
              borderRadius: '7px', boxShadow: '0 7px 14px rgba(0,0,0,0.58)'
            }} />

            {/* Baby on doorstep */}
            <AnimatePresence>
              {(stage === 'dropoff' || stage === 'flyaway') && (
                <motion.div style={{
                  position: 'absolute', left: '50%', bottom: '22px',
                  fontSize: '50px', transform: 'translateX(-50%)'
                }}
                initial={{ scale: 0, y: -120, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], y: [-120, 5, 0], opacity: [0, 1, 1] }}
                transition={{ duration: 1.2, ease: [0.34, 1.2, 0.64, 1] }}
                >
                  👶
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Firework clusters — dropoff/flyaway finale */}
      <AnimatePresence>
        {(stage === 'dropoff' || stage === 'flyaway') && (
          <>
            {skFwPositions.map((pos, pi) => (
              <React.Fragment key={`sk-fw-${pi}`}>
                {skFwSparks[pi].map((s, si) => (
                  <motion.div key={`sk-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {skFwRings[pi].map((r, ri) => (
                  <div key={`sk-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{
                      left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20,
                      borderColor: r.color, animation: `sk-pop-ring 0.9s ease-out ${r.delay}s both`
                    }}
                  />
                ))}
                <div key={`sk-flash-${pi}`} className="absolute rounded-full"
                  style={{
                    left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${skColors[pi % skColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'sk-flash 0.5s ease-out both'
                  }}
                />
              </React.Fragment>
            ))}
            {skOrbs.map((orb, i) => (
              <div key={`sk-orb-${i}`} className="absolute rounded-full z-49"
                style={{
                  left: `${orb.x}%`, bottom: '25%', width: 10, height: 10,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `sk-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {(stage === 'dropoff' || stage === 'flyaway') && (
          <motion.div className="absolute text-center z-50"
            style={{ left: '50%', top: '8%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: [0, 1], y: [-50, 0] }}
            transition={{ duration: 2.5, delay: 1.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-black"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #ffffff, #f472b6, #fbbf24)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 25px rgba(251,191,36,0.9))'
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ delay: 2.6, duration: 3, repeat: 4 }}
            >
              👶 Worth Every Storm, Every Mile 👶
            </motion.h2>
            <motion.p className="text-base md:text-lg font-medium mt-2"
              style={{ color: '#fde68a', textShadow: '0 0 18px rgba(251,191,36,0.9), 0 4px 12px rgba(0,0,0,0.9)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 2 }}
            >
              Delivered with love · from above ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
