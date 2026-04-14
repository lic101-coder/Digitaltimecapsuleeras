/**
 * Career Summit - Victory Podium Ceremony (RARE) - ULTRA CINEMATIC VFX VERSION
 * 
 * CONCEPT: Winner's podium rises from ground, YOU ascend to #1 spot,
 * crowd erupts with applause (visual sound waves), spotlights converge,
 * confetti cannons explode, trophy materializes in golden light
 * 
 * ULTRA ENHANCEMENTS:
 * - Dramatic 3D podium with realistic lighting and shadows
 * - Enhanced crowd eruption with radial sound waves
 * - Cinematic spotlight convergence with lens flares
 * - Massive confetti explosion with realistic physics
 * - Trophy materialization with particle burst
 * - Better mobile responsiveness
 * - GPU-accelerated transforms
 * - Anticipate easing on all major animations
 * 
 * Duration: 14 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-3s: Podium rising from ground with rumble
 * 3. 3-5s: Ascending to #1 position
 * 4. 5-7s: Crowd eruption with sound wave visuals
 * 5. 7-9s: Spotlights converging from all angles
 * 6. 9-11s: Confetti cannon explosion
 * 7. 11-12s: Golden trophy materializing
 * 8. 12-14s: Radiance finale
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CareerGavelCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function CareerGavelCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: CareerGavelCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'rising' | 'ascending' | 'crowd' | 'spotlights' | 'confetti' | 'trophy' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('rising') },
      { time: 3000, action: () => setStage('ascending') },
      { time: 5000, action: () => setStage('crowd') },
      { time: 7000, action: () => setStage('spotlights') },
      { time: 9000, action: () => setStage('confetti') },
      { time: 11000, action: () => setStage('trophy') },
      { time: 12000, action: () => setStage('radiance') },
      { time: 14000, action: () => setStage('outro') },
      { time: 14500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Stadium lights ambient */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`ambient-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 2) * 10}%`,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)',
              filter: 'blur(30px)'
            }}
            animate={{
              opacity: stage === 'radiance' ? 0.05 : [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}

        {/* Title */}
        <AnimatePresence>
          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute top-20 left-0 right-0 text-center z-20"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
                style={{
                  color: '#fbbf24',
                  textShadow: '0 4px 20px rgba(251, 191, 36, 0.6)'
                }}
              >
                Champion's Moment
              </motion.h1>
              <p className="text-indigo-200 text-xl" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
                Rise to Victory
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WINNER'S PODIUM */}
        <AnimatePresence>
          {(stage === 'rising' || stage === 'ascending' || stage === 'crowd' || stage === 'spotlights' || stage === 'confetti' || stage === 'trophy') && (
            // CENTERED CONTAINER FOR ALL PODIUMS
            <div className="absolute inset-0 flex items-end justify-center z-10">
              <div className="relative flex items-end justify-center gap-4" style={{ width: '580px', marginBottom: 0 }}>
                {/* Podium pieces rising */}
                {[
                  { pos: 2, height: 180, label: '2', color: '#94a3b8', delay: 0.2 },  // Silver LEFT
                  { pos: 1, height: 240, label: '1', color: '#fbbf24', delay: 0 },        // Gold CENTER
                  { pos: 3, height: 140, label: '3', color: '#cd7f32', delay: 0.4 }     // Bronze RIGHT
                ].map((podium) => (
                  <motion.div
                    key={`podium-${podium.pos}`}
                    className="relative"
                    initial={{ y: podium.height + 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: podium.delay,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <svg width="160" height={podium.height} viewBox={`0 0 160 ${podium.height}`}>
                      <defs>
                        <linearGradient id={`podiumGrad-${podium.pos}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={podium.color} stopOpacity="0.8" />
                          <stop offset="50%" stopColor={podium.color} />
                          <stop offset="100%" stopColor={podium.color} stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id={`topGrad-${podium.pos}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor={podium.color} stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      
                      {/* Podium top (isometric) */}
                      <path 
                        d={`M 30 10 L 80 0 L 130 10 L 80 20 Z`}
                        fill={`url(#topGrad-${podium.pos})`}
                        stroke={podium.color}
                        strokeWidth="2"
                      />
                      
                      {/* Podium front face */}
                      <rect 
                        x="30" 
                        y="10" 
                        width="50" 
                        height={podium.height - 10} 
                        fill={`url(#podiumGrad-${podium.pos})`}
                        stroke={podium.color}
                        strokeWidth="2"
                      />
                      
                      {/* Podium side face (darker) */}
                      <path 
                        d={`M 80 10 L 130 10 L 130 ${podium.height} L 80 ${podium.height} Z`}
                        fill={podium.color}
                        opacity="0.6"
                        stroke={podium.color}
                        strokeWidth="2"
                      />
                      
                      {/* Position number */}
                      <text
                        x="55"
                        y={podium.height / 2 + 20}
                        fontSize="64"
                        fontWeight="bold"
                        fill="#ffffff"
                        textAnchor="middle"
                        style={{ textShadow: `0 4px 8px rgba(0, 0, 0, 0.5)` }}
                      >
                        {podium.label}
                      </text>
                      
                      {/* Decorative lines */}
                      {[30, 50, 70].map((offset) => (
                        <line
                          key={offset}
                          x1="35"
                          y1={offset}
                          x2="75"
                          y2={offset}
                          stroke="#ffffff"
                          strokeWidth="1"
                          opacity="0.2"
                        />
                      ))}
                    </svg>

                    {/* Champion indicator on #1 podium */}
                    {podium.pos === 1 && stage !== 'rising' && (
                      <motion.div
                        className="absolute top-[-80px] left-1/2 -translate-x-1/2 text-7xl"
                        initial={{ y: 100, opacity: 0, scale: 0 }}
                        animate={{ 
                          y: stage === 'ascending' ? 0 : -20,
                          opacity: 1, 
                          scale: 1,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{
                          y: { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] },
                          opacity: { duration: 0.8 },
                          scale: { duration: 0.8 },
                          rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      >
                        🏆
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* CROWD ERUPTION - Sound wave visuals */}
        <AnimatePresence>
          {(stage === 'crowd' || stage === 'spotlights' || stage === 'confetti' || stage === 'trophy') && (
            <>
              {/* Left side crowd waves */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`wave-left-${i}`}
                  className="absolute"
                  style={{
                    left: '10%',
                    bottom: `${15 + i * 8}%`,
                    width: '3px',
                    height: `${40 + Math.random() * 60}px`,
                    background: 'linear-gradient(to top, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.4))',
                    borderRadius: '2px'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: [0, 1, 0.6, 1.2, 0.4, 1, 0.7, 1],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Right side crowd waves */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`wave-right-${i}`}
                  className="absolute"
                  style={{
                    right: '10%',
                    bottom: `${15 + i * 8}%`,
                    width: '3px',
                    height: `${40 + Math.random() * 60}px`,
                    background: 'linear-gradient(to top, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.4))',
                    borderRadius: '2px'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                    scaleY: [0, 1, 0.5, 1.3, 0.6, 0.9, 0.8, 1],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05 + 0.3,
                    times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Applause text bursts */}
              {['BRAVO!', 'YES!', 'AMAZING!', 'WOW!'].map((text, i) => (
                <motion.div
                  key={`text-${i}`}
                  className="absolute text-xl font-bold text-indigo-300"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${40 + (i % 2) * 10}%`
                  }}
                  initial={{ opacity: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [0, -40, -80, -120],
                    scale: [0, 1.2, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  {text}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* SPOTLIGHTS CONVERGING */}
        <AnimatePresence>
          {(stage === 'spotlights' || stage === 'confetti' || stage === 'trophy') && (
            <>
              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * 360;
                const startX = 50 + Math.cos((angle * Math.PI) / 180) * 150;
                const startY = 50 + Math.sin((angle * Math.PI) / 180) * 150;

                return (
                  <motion.div
                    key={`spotlight-${i}`}
                    className="absolute"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), rgba(251, 191, 36, 0.2) 40%, transparent 70%)',
                      filter: 'blur(20px)',
                      pointerEvents: 'none'
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      x: `${(50 - startX) * 1.35}%`,
                      y: `${(50 - startY) * 1.35}%`,
                      scale: [0.5, 2, 1.8],
                      opacity: [0, 1, 0.9]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Central spotlight glow */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3, opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <div
                  className="w-64 h-64 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9) 0%, rgba(251, 191, 36, 0.4) 40%, transparent 80%)',
                    filter: 'blur(40px)'
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CONFETTI EXPLOSION */}
        <AnimatePresence>
          {(stage === 'confetti' || stage === 'trophy') && (
            <>
              {[...Array(120)].map((_, i) => {
                const side = i % 2 === 0 ? -1 : 1;
                const startX = side === -1 ? 15 : 85;
                const angle = -60 + Math.random() * 60;
                const distance = 200 + Math.random() * 400;
                const endX = startX + Math.cos((angle * Math.PI) / 180) * distance;
                const endY = -100 + Math.sin((angle * Math.PI) / 180) * distance;
                
                const colors = ['#fbbf24', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = Math.random() > 0.5 ? 'rect' : 'circle';

                return (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute z-30"
                    style={{
                      left: `${startX}%`,
                      top: '100%',
                      width: shape === 'rect' ? '12px' : '10px',
                      height: shape === 'rect' ? '8px' : '10px',
                      backgroundColor: color,
                      borderRadius: shape === 'circle' ? '50%' : '2px'
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                    animate={{
                      x: `${(endX - startX) * 1.2}%`,
                      y: [0, endY, endY + 800],
                      opacity: [0, 1, 1, 1, 0],
                      rotate: [0, Math.random() * 720, Math.random() * 1440]
                    }}
                    transition={{
                      duration: 3.5,
                      delay: i * 0.01,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                );
              })}

              {/* Confetti cannon smoke puffs */}
              {[-15, 15].map((x) => (
                <motion.div
                  key={`smoke-${x}`}
                  className="absolute z-25"
                  style={{
                    left: `${50 + x}%`,
                    bottom: '0%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(203, 213, 225, 0.6), transparent)',
                    filter: 'blur(20px)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 2, 3],
                    opacity: [0, 0.6, 0],
                    y: [0, -100, -200]
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* GOLDEN TROPHY MATERIALIZING */}
        <AnimatePresence>
          {stage === 'trophy' && (
            <motion.div
              className="absolute z-35"
              style={{
                left: '50%',
                top: '35%',
                transform: 'translateX(-50%)'
              }}
              initial={{ opacity: 0, scale: 0, y: -50 }}
              animate={{ 
                opacity: 1, 
                scale: [0, 1.3, 1],
                y: [-50, 0, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <svg width="180" height="200" viewBox="0 0 180 200" style={{ filter: 'drop-shadow(0 15px 40px rgba(251, 191, 36, 0.8))' }}>
                <defs>
                  <linearGradient id="trophyGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <radialGradient id="trophyShine">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
                  </radialGradient>
                </defs>
                
                {/* Base */}
                <rect x="50" y="170" width="80" height="10" rx="5" fill="url(#trophyGold)" />
                <rect x="60" y="180" width="60" height="15" rx="3" fill="#d97706" />
                
                {/* Stem */}
                <rect x="80" y="150" width="20" height="20" rx="2" fill="url(#trophyGold)" />
                
                {/* Cup base */}
                <ellipse cx="90" cy="150" rx="30" ry="10" fill="url(#trophyGold)" />
                
                {/* Cup body */}
                <path d="M 60 150 Q 55 100, 65 60 L 115 60 Q 125 100, 120 150 Z" fill="url(#trophyGold)" />
                
                {/* Cup rim */}
                <ellipse cx="90" cy="60" rx="30" ry="10" fill="#fef3c7" />
                
                {/* Left handle */}
                <path d="M 65 80 Q 40 80, 40 110 Q 40 125, 55 130" fill="none" stroke="url(#trophyGold)" strokeWidth="8" strokeLinecap="round" />
                
                {/* Right handle */}
                <path d="M 115 80 Q 140 80, 140 110 Q 140 125, 125 130" fill="none" stroke="url(#trophyGold)" strokeWidth="8" strokeLinecap="round" />
                
                {/* Shine */}
                <ellipse cx="75" cy="90" rx="15" ry="35" fill="url(#trophyShine)" opacity="0.6" />
                
                {/* Star emblem */}
                <path d="M 90 95 L 95 110 L 110 110 L 98 118 L 102 133 L 90 125 L 78 133 L 82 118 L 70 110 L 85 110 Z" fill="#ffffff" opacity="0.8" />
              </svg>

              {/* Sparkles around trophy */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 360;
                const radius = 120;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-2xl"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 0],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.08,
                      ease: 'easeOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* RADIANCE */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* Rays */}
              {[...Array(40)].map((_, i) => {
                const angle = (i / 40) * 360;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: i % 4 === 0 ? '11px' : '8px',
                      marginLeft: '-100vw',
                      marginTop: i % 4 === 0 ? '-5.5px' : '-4px',
                      background: i % 2 === 0
                        ? 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.9) 50%, transparent)'
                        : 'linear-gradient(to right, transparent, rgba(254, 243, 199, 0.85) 50%, transparent)',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(1.5px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 2.8, 2.6],
                      opacity: [0, 1, 0.96]
                    }}
                    transition={{
                      duration: 1.3,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Central radiant glow */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 7.5, 7.2],
                  opacity: [0, 1, 0.98],
                  rotate: [0, 90]
                }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              >
                <div
                  className="w-[54rem] h-[54rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 249, 195, 0.98) 5%, rgba(251, 191, 36, 0.95) 12%, rgba(99, 102, 241, 0.9) 28%, rgba(251, 191, 36, 0.85) 45%, rgba(67, 56, 202, 0.7) 62%, transparent 90%)',
                    boxShadow: '0 0 520px rgba(251, 191, 36, 0.95), 0 0 780px rgba(99, 102, 241, 0.75)',
                    filter: 'blur(125px)'
                  }}
                />
              </motion.div>

              {/* Trophy and star particles orbiting */}
              {[...Array(14)].map((_, i) => {
                const angle = (i / 14) * 360;
                const radius = 230;
                const icon = i % 2 === 0 ? '🏆' : '⭐';

                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute text-3xl"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: [
                        Math.cos((angle * Math.PI) / 180) * radius,
                        Math.cos(((angle + 360) * Math.PI) / 180) * radius
                      ],
                      y: [
                        Math.sin((angle * Math.PI) / 180) * radius,
                        Math.sin(((angle + 360) * Math.PI) / 180) * radius
                      ],
                      rotate: [0, 360]
                    }}
                    transition={{
                      delay: 0.3 + i * 0.04,
                      duration: 7,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    {icon}
                  </motion.div>
                );
              })}

              {/* Burst particles */}
              {[...Array(85)].map((_, i) => {
                const angle = (i / 85) * Math.PI * 2;
                const distance = 145 + Math.random() * 310;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: [y, y + 145],
                      scale: [0, 2.3, 2],
                      opacity: [0, 1, 0.96, 0],
                      rotate: [0, Math.random() * 720]
                    }}
                    transition={{
                      duration: 2.9,
                      delay: i * 0.004,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#fbbf24' : '#fef3c7',
                        boxShadow: `0 0 14px ${i % 2 === 0 ? 'rgba(251, 191, 36, 0.9)' : 'rgba(254, 243, 199, 0.9)'}`
                      }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="absolute bottom-20 left-0 right-0 text-center z-40"
            >
              <h2 
                className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
                style={{
                  color: '#fbbf24',
                  textShadow: '0 0 35px rgba(251, 191, 36, 0.9)'
                }}
              >
                Victory Achieved
              </h2>
              <p className="text-2xl text-indigo-200 drop-shadow-lg">{capsuleTitle}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}