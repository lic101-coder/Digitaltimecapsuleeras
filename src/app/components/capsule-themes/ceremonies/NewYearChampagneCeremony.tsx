/**
 * New Year's Eve - Champagne Supernova Ceremony (LEGENDARY)
 * Mobile-optimised: memoised particles, reduced counts, fixed SVG gradient, static filter on mobile
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface NewYearChampagneCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

const CHAMPAGNE_CSS = `
@keyframes ch-pop-ring {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.92; }
  55%  { opacity: 0.6; }
  100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
}
@keyframes ch-flash {
  0%   { opacity: 0; }
  8%   { opacity: 1; }
  40%  { opacity: 0; }
}
@keyframes ch-orb-float {
  0%   { transform: translate(0, 0) scale(1); opacity: 0.9; }
  100% { transform: translate(var(--dx), -90px) scale(0.4); opacity: 0; }
}
`;

export function NewYearChampagneCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewYearChampagneCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'bottle' | 'unwrap' | 'cork' | 'fountain' | 'nebula' | 'stars' | 'radiance' | 'outro'>('intro');
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  const chColors = useMemo(() => ['#fbbf24','#fef3c7','#f59e0b','#fb923c','#ffffff','#fde68a','#ec4899','#a855f7'], []);

  const chFwPositions = useMemo(() => [
    {x:8,y:15},{x:22,y:10},{x:38,y:18},{x:52,y:8},{x:68,y:16},{x:82,y:12},{x:14,y:30},{x:88,y:25},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);

  const chFwSparks = useMemo(() => chFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: chColors[i % chColors.length], delay: i*0.04 };
    })
  ), [chFwPositions, chColors, isMobile]);

  const chFwRings = useMemo(() => chFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#fbbf24','#fef3c7','#f59e0b'][i] }))
  ), [chFwPositions]);

  const chOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: chColors[i % chColors.length]
  })), [chColors, isMobile]);

  // Cork-stage particles — all memoised, no Math.random() in render
  const sprayData = useMemo(() => {
    const count = isMobile ? 50 : 100;
    return Array.from({length: count}, (_, i) => {
      const angle = -90 + ((i * 23.7) % 95) - 47.5;
      const distance = 50 + (i * 37) % 360;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      return { x, y, isCircle: i % 5 === 0, styleIdx: i % 6 };
    });
  }, [isMobile]);

  const confettiCorkData = useMemo(() => {
    const count = isMobile ? 60 : 120;
    const colors = ['#fbbf24','#f59e0b','#fef3c7','#ec4899','#8b5cf6','#22d3ee','#10b981','#f43f5e','#fb923c','#a78bfa'];
    return Array.from({length: count}, (_, i) => {
      const angle = -90 + ((i * 17.3) % 130) - 65;
      const distance = 70 + (i * 29) % 420;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      return {
        x, y,
        color: colors[i % colors.length],
        rotEnd: (i * 53) % 1620,
        isTall: i % 3 === 0,
        isCircle: (i * 7) % 5 === 0,
        borderRadius: (i * 3) % 7 > 4 ? '50%' : '2px'
      };
    });
  }, [isMobile]);

  const starSparkleData = useMemo(() => {
    const count = isMobile ? 20 : 40;
    return Array.from({length: count}, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 90 + (i * 11) % 110;
      return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
    });
  }, [isMobile]);

  const secondarySparkData = useMemo(() => {
    const count = isMobile ? 30 : 60;
    return Array.from({length: count}, (_, i) => {
      const angle = (i * 23.7) % (Math.PI * 2);
      const distance = 40 + (i * 11) % 180;
      return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
    });
  }, [isMobile]);

  const dropletData = useMemo(() => {
    const count = isMobile ? 20 : 40;
    return Array.from({length: count}, (_, i) => {
      const angle = ((i * 13) % 120 - 60) * (Math.PI / 180);
      const distance = 50 + (i * 17) % 150;
      const yTravel = -100 - (i * 31) % 300;
      const dur = 2.2 + (i * 0.08) % 0.8;
      return { angle, distance, yTravel, dur };
    });
  }, [isMobile]);

  const bubbleStarData = useMemo(() => {
    const count = isMobile ? 30 : 60;
    return Array.from({length: count}, (_, i) => ({
      xPos: (i * 7.3) % 100,
      delay: i * 0.05,
      dur: 2 + (i * 0.05) % 1,
    }));
  }, [isMobile]);

  const screenH = typeof window !== 'undefined' ? window.innerHeight : 800;

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 1000,  action: () => setStage('bottle') },
      { time: 2500,  action: () => setStage('unwrap') },
      { time: 4000,  action: () => setStage('cork') },
      { time: 6000,  action: () => setStage('fountain') },
      { time: 8500,  action: () => setStage('nebula') },
      { time: 10500, action: () => setStage('stars') },
      { time: 12500, action: () => setStage('radiance') },
      { time: 14000, action: () => setStage('outro') },
      { time: 14500, action: () => onComplete?.() }
    ];
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    const failsafe = setTimeout(() => { onComplete?.(); }, 15500);
    return () => { timeouts.forEach(clearTimeout); clearTimeout(failsafe); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#fbbf24','#fef3c7','#f59e0b','#fb923c','#ffffff','#fde68a','#ec4899'];
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

  const sprayBg = (idx: number) => {
    if (idx === 0) return 'linear-gradient(135deg, #ffffff, #fef3c7)';
    if (idx === 1) return 'linear-gradient(135deg, #fef3c7, #fbbf24)';
    if (idx === 2) return 'linear-gradient(135deg, #fde68a, #fbbf24)';
    if (idx === 3) return '#fbbf24';
    if (idx === 4) return '#f59e0b';
    return '#d97706';
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-950 via-amber-950/40 to-slate-950">
      <style>{CHAMPAGNE_CSS}</style>

      {/* Luxurious ambient lighting — reduced blur on mobile */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={`ambient-${i}`} className="absolute rounded-full"
          style={{
            left: `${5 + i * 18}%`, top: `${10 + (i % 3) * 25}%`,
            width: '200px', height: '200px',
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(251,191,36,0.15), transparent)'
              : 'radial-gradient(circle, rgba(254,243,199,0.1), transparent)',
            filter: `blur(${isMobile ? 30 : 60}px)`
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-black drop-shadow-2xl mb-4"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 30px rgba(251,191,36,0.6)'
              }}
              animate={{ filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
              transition={{ duration: 2, repeat: 7 }}
            >
              Champagne Dreams
            </motion.h1>
            <motion.p className="text-amber-200 text-2xl font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              ✨ Pop Into the New Year ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAMPAGNE BOTTLE */}
      <AnimatePresence>
        {(stage === 'bottle' || stage === 'unwrap' || stage === 'cork' || stage === 'fountain' || stage === 'nebula' || stage === 'stars') && (
          <motion.div
            className="absolute left-1/2 bottom-[5%] -translate-x-1/2 z-20"
            initial={{ y: 350, opacity: 0, scale: 0.6, rotateY: -30 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            exit={{ opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.6 } }}
          >
            <motion.svg
              width="240" height="480" viewBox="0 0 240 480"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))' }}
              animate={stage === 'cork' ? { rotate: [0, -2, 2, -1, 0], y: [0, 5, 0] } : {}}
              transition={{ duration: 0.3, repeat: stage === 'cork' ? 3 : 0 }}
            >
              <defs>
                {/* Fixed: was x2="100%%" — double percent is invalid SVG */}
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#065f46" />
                  <stop offset="30%"  stopColor="#10b981" />
                  <stop offset="50%"  stopColor="#34d399" />
                  <stop offset="70%"  stopColor="#10b981" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="foilGold">
                  <stop offset="0%"   stopColor="#fde68a" />
                  <stop offset="50%"  stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
              </defs>

              <path d="M 80 180 Q 75 220, 75 280 L 75 430 Q 75 440, 85 445 L 120 450 L 155 445 Q 165 440, 165 430 L 165 280 Q 165 220, 160 180 Z"
                fill="url(#glassGradient)" opacity="0.92" />
              <ellipse cx="120" cy="450" rx="35" ry="8" fill="#064e3b" opacity="0.6" />
              <path d="M 80 180 Q 70 150, 95 105 L 145 105 Q 170 150, 160 180"
                fill="url(#glassGradient)" opacity="0.92" />
              <rect x="100" y="60" width="40" height="45" rx="4" fill="url(#glassGradient)" opacity="0.92" />
              <ellipse cx="120" cy="60" rx="22" ry="7" fill="url(#glassGradient)" opacity="0.95" />
              <ellipse cx="120" cy="58" rx="20" ry="6" fill="#065f46" opacity="0.8" />
              <ellipse cx="95"  cy="250" rx="18" ry="120" fill="url(#glassShine)" opacity="0.6" />
              <ellipse cx="85"  cy="220" rx="10" ry="60"  fill="#ffffff" opacity="0.4" />
              <ellipse cx="145" cy="280" rx="8"  ry="50"  fill="#ffffff" opacity="0.25" />

              <rect  x="85" y="300" width="70" height="90" rx="6" fill="#fef3c7" opacity="0.95" />
              <rect  x="88" y="303" width="64" height="84" rx="4" fill="#fffbeb" opacity="0.9" />
              <text x="120" y="330" fontSize="20" fontWeight="900" fill="#d97706" textAnchor="middle">GRAND</text>
              <text x="120" y="350" fontSize="20" fontWeight="900" fill="#d97706" textAnchor="middle">ANNÉE</text>
              <line x1="95" y1="358" x2="145" y2="358" stroke="#fbbf24" strokeWidth="2" />
              <text x="120" y="375" fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">2026</text>
              <text x="120" y="387" fontSize="8" fill="#78350f" textAnchor="middle">VINTAGE CELEBRATION</text>

              <AnimatePresence>
                {(stage === 'bottle' || stage === 'unwrap') && (
                  <motion.g
                    initial={{ opacity: 1 }}
                    animate={stage === 'unwrap' ? {
                      scaleY: [1, 0.8, 0.4, 0.1, 0],
                      y: [0, 10, 25, 45, 65],
                      opacity: [1, 0.9, 0.6, 0.3, 0],
                      rotate: [0, 2, -2, 4, 0]
                    } : {}}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <path d="M 98 60 L 98 35 Q 98 28, 105 28 L 135 28 Q 142 28, 142 35 L 142 60 Z"
                      fill="url(#foilGold)" stroke="#d97706" strokeWidth="1" />
                    <ellipse cx="120" cy="28" rx="22" ry="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                    {[...Array(5)].map((_, i) => (
                      <line key={`wire-${i}`} x1="98" y1={35 + i * 6} x2="142" y2={35 + i * 6}
                        stroke="#d97706" strokeWidth="0.5" opacity="0.6" />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORK EXPLOSION */}
      <AnimatePresence>
        {stage === 'cork' && (
          <>
            {/* Flash burst */}
            <motion.div className="absolute z-35"
              style={{ left: '50%', bottom: '54%', transform: 'translate(-50%, 0)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 0.5, 5.2, 4.5, 3.8], opacity: [0, 0.3, 1, 0.85, 0] }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], times: [0, 0.1, 0.25, 0.6, 1] }}
            >
              <div className="w-48 h-48 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,243,199,1) 25%, rgba(251,191,36,0.95) 55%, transparent 100%)',
                  boxShadow: '0 0 140px rgba(251,191,36,1), 0 0 220px rgba(251,191,36,0.9)',
                  filter: `blur(${isMobile ? 8 : 14}px)`
                }}
              />
            </motion.div>

            {/* Shockwave rings */}
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <motion.div key={`shockwave-${i}`} className="absolute z-34"
                style={{ left: '50%', bottom: '54%', transform: 'translate(-50%, 0)' }}
                initial={{ scale: 0, opacity: 0.95 }}
                animate={{ scale: [0, 0.8, 6.5 + i * 0.4], opacity: [0.95, 0.85, 0.6, 0] }}
                transition={{ duration: 2, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-36 h-36 rounded-full border-[7px]"
                  style={{
                    borderColor: i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f59e0b',
                    boxShadow: `0 0 45px ${i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f59e0b'}`
                  }}
                />
              </motion.div>
            ))}

            {/* Cork projectile */}
            <motion.div className="absolute z-40"
              style={{ left: '50%', bottom: '54%' }}
              initial={{ x: '-50%', y: 0, rotate: 0, scale: 1 }}
              animate={{
                x: ['-50%','-47%','-40%','-28%','-5%','30%','75%'],
                y: [0, -80, -280, -450, -580, -650, -680],
                rotate: [0, 60, 180, 420, 720, 1080, 1440],
                scale: [1, 1.25, 1.3, 1.15, 0.95, 0.7, 0.4]
              }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], times: [0,0.12,0.28,0.48,0.68,0.88,1] }}
            >
              <div className="relative">
                <div className="w-11 h-16 rounded-t-full"
                  style={{
                    background: 'linear-gradient(145deg, #d97706 0%, #b45309 25%, #92400e 55%, #78350f 85%, #5f2c0a 100%)',
                    boxShadow: '0 18px 50px rgba(0,0,0,0.7), inset -5px 0 15px rgba(0,0,0,0.5)',
                    border: '2.5px solid #78350f'
                  }}
                >
                  <div className="absolute inset-x-0 top-1/4 h-px bg-black opacity-20" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-black opacity-15" />
                  <div className="absolute inset-x-0 top-3/4 h-px bg-black opacity-20" />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 40%, #f59e0b 75%, #d97706 100%)',
                    boxShadow: '0 0 25px rgba(251,191,36,1), 0 4px 12px rgba(0,0,0,0.5)'
                  }}
                />
              </div>

              {/* Cork trail */}
              {[...Array(isMobile ? 12 : 24)].map((_, i) => (
                <motion.div key={`cork-trail-${i}`}
                  className="absolute top-8 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ y: [0, 18 + i * 20], scale: [0, 0.8, 2.5, 1.8, 1, 0], opacity: [0, 0.4, 1, 0.9, 0.6, 0] }}
                  transition={{ duration: 1.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="w-5 h-5 rounded-full"
                    style={{
                      background: i % 4 === 0 ? 'radial-gradient(circle, #ffffff, #fef3c7)'
                        : i % 4 === 1 ? 'radial-gradient(circle, #fef3c7, #fbbf24)'
                        : i % 4 === 2 ? '#fbbf24' : '#f59e0b',
                      boxShadow: `0 0 18px ${i % 4 === 0 ? '#fef3c7' : i % 4 === 1 ? '#fbbf24' : '#f59e0b'}`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* POP! text */}
            <motion.div className="absolute z-50 text-9xl font-black"
              style={{
                left: '50%', bottom: '64%',
                color: '#fbbf24',
                textShadow: '0 0 50px rgba(251,191,36,1), 0 0 100px rgba(251,191,36,0.9), 0 8px 25px rgba(0,0,0,0.95)',
                WebkitTextStroke: '5px rgba(255,255,255,0.6)'
              }}
              initial={{ scale: 0, opacity: 0, rotate: -60, y: 0, x: '-50%' }}
              animate={{
                scale: [0, 0.5, 2.6, 2.1, 2.3, 1.9, 1.5],
                opacity: [0, 0.3, 1, 1, 1, 0.9, 0],
                rotate: [-60, -30, 20, -12, 8, -3, 0],
                y: [0, -15, -35, -25, -32, -28, -50],
                x: ['-50%','-50%','-50%','-50%','-50%','-50%','-50%']
              }}
              transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1], times: [0,0.15,0.35,0.5,0.65,0.85,1] }}
            >
              POP! 🎊
            </motion.div>

            {/* Champagne spray — MEMOISED */}
            {sprayData.map((s, i) => (
              <motion.div key={`spray-${i}`} className="absolute z-30"
                style={{ left: '50%', bottom: '54%' }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: [0, s.x * 0.2, s.x * 0.5, s.x * 0.8, s.x],
                  y: [0, s.y * 0.4, s.y * 0.7, s.y * 0.9, s.y + 280],
                  scale: [0, 1.2, 2.5, 2, 1.5, 1.2],
                  opacity: [0, 0.5, 1, 0.95, 0.75, 0]
                }}
                transition={{ duration: 2.4, delay: i * 0.01, ease: [0.22, 1, 0.36, 1], times: [0,0.2,0.4,0.65,0.85,1] }}
              >
                <div className={s.isCircle ? 'w-6 h-6 rounded-full' : 'w-3 h-9'}
                  style={{
                    background: sprayBg(s.styleIdx),
                    boxShadow: '0 0 22px rgba(251,191,36,0.95)',
                    borderRadius: s.isCircle ? '50%' : '3px'
                  }}
                />
              </motion.div>
            ))}

            {/* Confetti — MEMOISED */}
            {confettiCorkData.map((c, i) => (
              <motion.div key={`confetti-cork-${i}`} className="absolute z-32"
                style={{ left: '50%', bottom: '54%' }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, c.x * 0.4, c.x * 0.75, c.x],
                  y: [0, c.y * 0.5, c.y * 0.8, c.y, c.y + 450],
                  opacity: [0, 0.6, 1, 1, 0.85, 0],
                  scale: [0, 1.5, 2.3, 2.3, 2, 1.7],
                  rotate: [0, (i * 37) % 720, c.rotEnd]
                }}
                transition={{ duration: 3.2, delay: i * 0.013, ease: [0.22, 1, 0.36, 1], times: [0,0.25,0.45,0.65,0.85,1] }}
              >
                <div className={c.isTall ? 'w-5 h-10' : c.isCircle ? 'w-5 h-5 rounded-full' : 'w-4 h-8'}
                  style={{ backgroundColor: c.color, boxShadow: `0 0 18px ${c.color}`, borderRadius: c.borderRadius }}
                />
              </motion.div>
            ))}

            {/* Star sparkles — MEMOISED */}
            {starSparkleData.map((s, i) => (
              <motion.div key={`star-sparkle-${i}`} className="absolute z-36 text-3xl"
                style={{ left: '50%', bottom: '54%' }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  x: [0, s.x * 0.6, s.x],
                  y: [0, s.y * 0.6, s.y],
                  scale: [0, 1.2, 2.2, 1.5, 0],
                  opacity: [0, 0.7, 1, 0.9, 0],
                  rotate: [0, 120, 240]
                }}
                transition={{ duration: 1.7, delay: i * 0.018, ease: [0.22, 1, 0.36, 1], times: [0,0.3,0.5,0.8,1] }}
              >
                ✨
              </motion.div>
            ))}

            {/* Secondary sparks — MEMOISED */}
            {secondarySparkData.map((s, i) => (
              <motion.div key={`secondary-spark-${i}`} className="absolute z-33"
                style={{ left: '50%', bottom: '54%' }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x: s.x, y: s.y, scale: [0, 2, 1.5, 0], opacity: [0, 1, 0.8, 0] }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.008, ease: 'easeOut' }}
              >
                <div className="w-2 h-2 rounded-full"
                  style={{ background: i % 2 === 0 ? '#fbbf24' : '#fef3c7', boxShadow: `0 0 12px ${i % 2 === 0 ? '#fbbf24' : '#fef3c7'}` }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* CHAMPAGNE FOUNTAIN */}
      <AnimatePresence>
        {(stage === 'fountain' || stage === 'nebula' || stage === 'stars') && (
          <>
            {[...Array(12)].map((_, i) => {
              const offset = i - 6;
              return (
                <motion.div key={`fountain-main-${i}`} className="absolute z-25"
                  style={{ left: `${50 + offset * 1.5}%`, bottom: '54%' }}
                  initial={{ y: 0, scaleY: 0, opacity: 0 }}
                  animate={{
                    y: stage === 'fountain' ? [-40, -180, -320] : [-320, -380, -420],
                    scaleY: [0, 1.8, 1.2],
                    opacity: stage === 'fountain' ? [0, 1, 0.9] : [0.9, 0.5, 0],
                    x: [offset * 5, offset * 35, offset * 60]
                  }}
                  transition={{ duration: stage === 'fountain' ? 2.5 : 2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{
                    width: '14px', height: '120px',
                    background: 'linear-gradient(to bottom, rgba(251,191,36,0.95), rgba(254,243,199,0.8), rgba(251,191,36,0.4))',
                    borderRadius: '50%', filter: 'blur(2px)', boxShadow: '0 0 20px rgba(251,191,36,0.8)'
                  }} />
                </motion.div>
              );
            })}

            {/* Splashing droplets — MEMOISED */}
            {dropletData.map((d, i) => (
              <motion.div key={`droplet-${i}`} className="absolute z-24"
                style={{ left: '50%', bottom: '54%' }}
                initial={{ x: '-50%', y: 0, scale: 1, opacity: 0 }}
                animate={{
                  x: `calc(-50% + ${Math.cos(d.angle) * d.distance}px)`,
                  y: [0, d.yTravel * 0.7, d.yTravel],
                  scale: [0, 1, 0],
                  opacity: [0, 0.9, 0]
                }}
                transition={{ duration: d.dur, delay: i * 0.03, ease: [0.34, 1, 0.68, 1] }}
              >
                <div className="w-3 h-3 rounded-full"
                  style={{ background: 'radial-gradient(circle, #fef3c7, #fbbf24)', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* COSMIC NEBULA */}
      <AnimatePresence>
        {(stage === 'nebula' || stage === 'stars') && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div key={`nebula-${i}`} className="absolute z-28"
                style={{ left: `${30 + i * 10}%`, top: `${20 + (i % 3) * 20}%`, width: '180px', height: '180px' }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.5, 2],
                  opacity: [0, 0.7, 0.3],
                  rotate: i % 2 === 0 ? [0, 180, 360] : [0, -180, -360]
                }}
                transition={{ duration: 2.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div style={{
                  width: '100%', height: '100%',
                  background: 'radial-gradient(circle, rgba(251,191,36,0.6), rgba(254,243,199,0.4), transparent)',
                  filter: `blur(${isMobile ? 18 : 30}px)`,
                  borderRadius: '50%'
                }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ASCENDING BUBBLES → STARS — MEMOISED positions, finite inner repeat */}
      <AnimatePresence>
        {(stage === 'stars' || stage === 'radiance') && (
          <>
            {bubbleStarData.map((b, i) => (
              <motion.div key={`bubble-star-${i}`} className="absolute z-30"
                style={{ left: `${b.xPos}%`, bottom: '10%' }}
                initial={{ y: 0, scale: 0, opacity: 0 }}
                animate={{
                  y: [-50, -screenH * 0.5, -screenH * 0.9],
                  scale: [0, 1, 1.2],
                  opacity: [0, 1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: b.dur, delay: b.delay, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: 4, delay: b.delay }}
                >
                  <div className="relative" style={{ width: '12px', height: '12px' }}>
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(circle, #fef3c7, #fbbf24)', boxShadow: '0 0 15px rgba(251,191,36,0.9)' }}
                    />
                    <div className="absolute inset-[-3px]"
                      style={{ background: 'conic-gradient(from 0deg, transparent, #fef3c7, transparent, #fef3c7, transparent)', opacity: 0.6, filter: 'blur(1px)' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {chFwPositions.map((pos, pi) => (
              <React.Fragment key={`ch-fw-${pi}`}>
                {chFwSparks[pi].map((s, si) => (
                  <motion.div key={`ch-spark-${pi}-${si}`} className="absolute rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color, zIndex: 51 }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {chFwRings[pi].map((r, ri) => (
                  <div key={`ch-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{
                      left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20,
                      borderColor: r.color, animation: `ch-pop-ring 0.9s ease-out ${r.delay}s both`
                    }}
                  />
                ))}
                <div key={`ch-flash-${pi}`} className="absolute rounded-full"
                  style={{
                    left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${chColors[pi % chColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'ch-flash 0.5s ease-out both'
                  }}
                />
              </React.Fragment>
            ))}

            {chOrbs.map((orb, i) => (
              <div key={`ch-orb-${i}`} className="absolute rounded-full"
                style={{
                  left: `${orb.x}%`, bottom: '20%', width: 10, height: 10, zIndex: 49,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `ch-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}

            {/* Starburst rays */}
            {[...Array(44)].map((_, i) => {
              const rotation = (i * 360) / 44;
              return (
                <motion.div key={`ray-${i}`} className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw', height: '4px', marginLeft: '-100vw',
                    transformOrigin: 'center', transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: [0, 0.6, 0.4], scaleX: [0, 1, 1] }}
                  transition={{ duration: 1.5, delay: i * 0.01, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.8) 50%, transparent)',
                    filter: 'blur(2px)'
                  }} />
                </motion.div>
              );
            })}

            {/* Pulsing center light */}
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 1.5], opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div style={{
                width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(254,243,199,1), rgba(251,191,36,0.8), transparent)',
                filter: `blur(${isMobile ? 25 : 40}px)`
              }} />
            </motion.div>

            {/* Floating celebration emojis */}
            {['🍾','🥂','✨','🫧','🎊','🌟'].map((emoji, i) => (
              <motion.div key={`emoji-${i}`} className="absolute text-6xl z-40"
                style={{ left: `${15 + i * 15}%`, top: '50%' }}
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1], y: [0, -30, -20], rotate: [0, 360] }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: 7, ease: 'easeInOut' }}
                >
                  {emoji}
                </motion.div>
              </motion.div>
            ))}

            {/* CHEERS text — animated filter only on desktop to avoid mobile GPU pressure */}
            <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.h1
                className="text-7xl md:text-8xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #fb923c, #fef3c7)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 20px rgba(251,191,36,0.7))'
                }}
                animate={isMobile ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                } : {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  filter: [
                    'drop-shadow(0 4px 20px rgba(251,191,36,0.6))',
                    'drop-shadow(0 4px 30px rgba(251,191,36,1))',
                    'drop-shadow(0 4px 20px rgba(251,191,36,0.6))'
                  ]
                }}
                transition={{ duration: 1.5, repeat: 7 }}
              >
                🥂 CHEERS! 🥂
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl font-semibold text-center mt-3"
                style={{ color: '#fef3c7', textShadow: '0 0 20px rgba(251,191,36,0.9), 0 4px 14px rgba(0,0,0,0.9)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
              >
                New Year, new memories, new magic ✨
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
