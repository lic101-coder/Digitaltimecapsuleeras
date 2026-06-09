/**
 * Career Summit - Hall of Excellence Ceremony (LEGENDARY)
 * 
 * CONCEPT: Walking down prestigious hall lined with portraits of legends,
 * red carpet rolling out, flash photography bursting, YOUR portrait
 * being unveiled at end of hall with golden frame, nameplate appears
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CareerSignatureCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function CareerSignatureCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: CareerSignatureCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'hall' | 'carpet' | 'walking' | 'unveiling' | 'nameplate' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('hall') },
      { time: 4000, action: () => setStage('carpet') },
      { time: 6000, action: () => setStage('walking') },
      { time: 9000, action: () => setStage('unveiling') },
      { time: 12000, action: () => setStage('nameplate') },
      { time: 14000, action: () => setStage('radiance') },
      { time: 16000, action: () => setStage('outro') },
      { time: 16500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Failsafe timeout - 1 second after last timeline action
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 17500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  const legends = [
    { name: 'Da Vinci', emoji: '🎨' },
    { name: 'Einstein', emoji: '⚛️' },
    { name: 'Curie', emoji: '🔬' },
    { name: 'Tesla', emoji: '⚡' },
    { name: 'Jobs', emoji: '💻' },
    { name: 'Earhart', emoji: '✈️' }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Title */}
        <AnimatePresence>
          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute top-20 left-0 right-0 text-center z-50"
            >
              <motion.h1 
                className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
                style={{
                  color: '#c084fc',
                  textShadow: '0 4px 20px rgba(192, 132, 252, 0.6)',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Hall of Excellence
              </motion.h1>
              <p className="text-purple-200 text-xl" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)', fontFamily: 'Georgia, serif' }}>
                Among the Legends
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HALL PERSPECTIVE - Vanishing point */}
        <AnimatePresence>
          {(stage === 'hall' || stage === 'carpet' || stage === 'walking' || stage === 'unveiling' || stage === 'nameplate') && (
            <>
              {/* Floor with perspective */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-5"
                style={{
                  height: '60%',
                  background: 'linear-gradient(to bottom, rgba(30, 27, 75, 0.3), rgba(30, 27, 75, 0.9))',
                  clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {/* Floor tile lines */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`floor-${i}`}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${i * 12}%`,
                      height: '1px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      transform: `scaleX(${0.3 + i * 0.08})`
                    }}
                  />
                ))}
              </motion.div>

              {/* Walls with perspective */}
              <motion.div
                className="absolute inset-0 z-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                {/* Left wall */}
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: '35%',
                    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.4))',
                    clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)'
                  }}
                />
                
                {/* Right wall */}
                <div
                  className="absolute right-0 top-0 bottom-0"
                  style={{
                    width: '35%',
                    background: 'linear-gradient(to left, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.4))',
                    clipPath: 'polygon(100% 0%, 0% 20%, 0% 80%, 100% 100%)'
                  }}
                />
              </motion.div>

              {/* Ceiling with chandeliers glow */}
              {[25, 50, 75].map((pos, i) => (
                <motion.div
                  key={`chandelier-${i}`}
                  className="absolute z-6"
                  style={{
                    left: '50%',
                    top: `${15 + i * 3}%`,
                    transform: 'translateX(-50%)',
                    width: `${180 - i * 40}px`,
                    height: `${180 - i * 40}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), rgba(251, 191, 36, 0.1) 50%, transparent)',
                    filter: 'blur(20px)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0.3, 0.5, 0.3],
                    scale: 1
                  }}
                  transition={{
                    opacity: { duration: 3, repeat: completed ? 0 : 3, ease: 'easeInOut' },
                    scale: { duration: 1, delay: i * 0.2 }
                  }}
                />
              ))}

              {/* PORTRAITS ON WALLS */}
              {legends.map((legend, i) => {
                const isLeft = i % 2 === 0;
                const depth = Math.floor(i / 2);
                
                return (
                  <motion.div
                    key={`portrait-${i}`}
                    className="absolute z-10"
                    style={{
                      left: isLeft ? `${8 + depth * 3}%` : 'auto',
                      right: isLeft ? 'auto' : `${8 + depth * 3}%`,
                      top: `${25 + depth * 12}%`,
                      transform: stage === 'walking' 
                        ? `scale(${1.2 + depth * 0.4}) translateY(-${depth * 40}px)`
                        : 'scale(1)',
                      transition: 'transform 3s ease-out'
                    }}
                    initial={{ opacity: 0, scale: 0, rotateY: isLeft ? -45 : 45 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotateY: isLeft ? -15 : 15
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 1 + i * 0.2,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <div
                      className="relative"
                      style={{
                        width: `${90 - depth * 10}px`,
                        height: `${120 - depth * 15}px`,
                        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                        border: '4px solid #d4af37',
                        borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 2px 8px rgba(212, 175, 55, 0.2)'
                      }}
                    >
                      {/* Portrait "image" */}
                      <div className="absolute inset-2 flex items-center justify-center text-4xl bg-gradient-to-br from-slate-700 to-slate-900 rounded">
                        {legend.emoji}
                      </div>
                      
                      {/* Nameplate */}
                      <div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-serif text-amber-100"
                        style={{
                          background: '#78350f',
                          border: '1px solid #d4af37',
                          borderRadius: '3px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {legend.name}
                      </div>

                      {/* Frame shine */}
                      <div 
                        className="absolute inset-0 rounded"
                        style={{
                          background: 'linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)'
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* RED CARPET ROLLING OUT */}
        <AnimatePresence>
          {(stage === 'carpet' || stage === 'walking' || stage === 'unveiling' || stage === 'nameplate') && (
            <>
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-8"
                style={{
                  width: '240px',
                  height: '65%',
                  background: 'linear-gradient(to bottom, rgba(153, 27, 27, 0.3), rgba(153, 27, 27, 0.95))',
                  clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                  transformOrigin: 'top center'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: stage === 'walking' ? 1.5 : 1 }}
                transition={{
                  scaleY: stage === 'carpet' 
                    ? { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }
                    : { duration: 3, ease: 'easeOut' }
                }}
              >
                {/* Carpet texture */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 0, 0, 0.2) 3px, rgba(0, 0, 0, 0.2) 6px)'
                }} />

                {/* Golden ropes on sides */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
              </motion.div>

              {/* Velvet stanchions */}
              {[-1, 1].map((side, i) => (
                <motion.div
                  key={`stanchion-${i}`}
                  className="absolute z-9"
                  style={{
                    left: '50%',
                    marginLeft: side === -1 ? '-140px' : '100px',  // Just OUTSIDE carpet edges (carpet is 240px wide)
                    bottom: '15%',
                    transform: stage === 'walking' ? `translateY(-150px) scale(1.8)` : 'translateY(0) scale(1)',
                    transition: 'transform 3s ease-out'
                  }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.5 + i * 0.2
                  }}
                >
                  <svg width="40" height="120" viewBox="0 0 40 120">
                    <defs>
                      <linearGradient id={`stanchionGrad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                    </defs>
                    
                    {/* Base */}
                    <circle cx="20" cy="110" r="15" fill={`url(#stanchionGrad-${i})`} />
                    
                    {/* Post */}
                    <rect x="17" y="20" width="6" height="90" fill={`url(#stanchionGrad-${i})`} />
                    
                    {/* Top */}
                    <circle cx="20" cy="20" r="12" fill="#fbbf24" />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* FLASH PHOTOGRAPHY */}
        <AnimatePresence>
          {stage === 'walking' && (
            <>
              {[...Array(20)].map((_, i) => {
                const side = i % 2 === 0 ? 'left' : 'right';
                const xPos = side === 'left' ? Math.random() * 30 : 70 + Math.random() * 30;
                const yPos = 20 + Math.random() * 50;

                return (
                  <motion.div
                    key={`flash-${i}`}
                    className="absolute z-20 pointer-events-none"
                    style={{
                      left: `${xPos}%`,
                      top: `${yPos}%`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.15,
                      repeat: 2,
                      repeatDelay: 0.6
                    }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3) 50%, transparent)',
                        filter: 'blur(8px)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Camera emojis */}
              {[...Array(8)].map((_, i) => {
                const side = i % 2 === 0;
                return (
                  <motion.div
                    key={`camera-${i}`}
                    className="absolute text-3xl z-15"
                    style={{
                      left: side ? `${10 + i * 2}%` : 'auto',
                      right: side ? 'auto' : `${10 + i * 2}%`,
                      top: `${30 + (i % 3) * 15}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0, 1.2, 1],
                      rotate: side ? -15 : 15
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1
                    }}
                  >
                    📸
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* YOUR PORTRAIT - UNVEILING */}
        <AnimatePresence>
          {(stage === 'unveiling' || stage === 'nameplate') && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              initial={{ scale: 0.3, opacity: 0, y: -100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Ornate golden frame */}
              <div
                className="relative"
                style={{
                  width: '320px',
                  height: '400px',
                  background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                  border: '12px solid transparent',
                  borderImage: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #fbbf24) 1',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 4px 20px rgba(251, 191, 36, 0.3), 0 0 80px rgba(251, 191, 36, 0.6)'
                }}
              >
                {/* Inner decorative border */}
                <div className="absolute inset-4 border-4 border-purple-400 rounded-lg opacity-40" />

                {/* "Portrait" - Your achievement icon */}
                <div className="absolute inset-8 flex items-center justify-center bg-gradient-to-br from-purple-900 via-slate-900 to-purple-950 rounded-lg">
                  <motion.div
                    className="text-9xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: completed ? 0 : 3,
                      ease: 'easeInOut'
                    }}
                  >
                    🌟
                  </motion.div>
                </div>

                {/* Corner ornaments */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                  <motion.div
                    key={corner}
                    className="absolute w-8 h-8"
                    style={{
                      [corner.includes('top') ? 'top' : 'bottom']: '-6px',
                      [corner.includes('left') ? 'left' : 'right']: '-6px',
                      background: 'radial-gradient(circle, #fbbf24, #d97706)',
                      borderRadius: '50%',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: completed ? 0 : 3,
                      ease: 'linear'
                    }}
                  />
                ))}

                {/* Spotlight from above */}
                <motion.div
                  className="absolute -top-40 left-1/2 -translate-x-1/2 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.6] }}
                  transition={{ duration: 1.5 }}
                >
                  <div
                    style={{
                      width: '200px',
                      height: '300px',
                      background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), transparent)',
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                      filter: 'blur(20px)'
                    }}
                  />
                </motion.div>

                {/* Sparkle effects around frame */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * 360;
                  const radius = 200;
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
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: x,
                        y: y,
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180]
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.5 + i * 0.08,
                        repeat: completed ? 0 : 3,
                        repeatDelay: 1
                      }}
                    >
                      ✨
                    </motion.div>
                  );
                })}
              </div>

              {/* Velvet curtain pulling away */}
              {[-1, 1].map((side) => (
                <motion.div
                  key={`curtain-${side}`}
                  className="absolute top-0 bottom-0 z-35"
                  style={{
                    left: side === -1 ? 0 : '50%',
                    width: '50%',
                    background: 'linear-gradient(to right, rgba(88, 28, 135, 0.95), rgba(88, 28, 135, 0.85))',
                    boxShadow: `${side === -1 ? '8px' : '-8px'} 0 20px rgba(0, 0, 0, 0.6)`
                  }}
                  initial={{ x: 0 }}
                  animate={{ x: side === -1 ? '-100%' : '100%' }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {/* Curtain folds */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0"
                      style={{
                        left: `${i * 20}%`,
                        width: '15%',
                        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent, rgba(0, 0, 0, 0.3))'
                      }}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAMEPLATE */}
        <AnimatePresence>
          {stage === 'nameplate' && (
            <motion.div
              className="absolute left-1/2 z-32"
              style={{
                top: '70%',
                transform: 'translateX(-50%)'
              }}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <div
                className="px-8 py-4 rounded-lg font-serif"
                style={{
                  background: 'linear-gradient(135deg, #78350f, #92400e)',
                  border: '3px solid #fbbf24',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(251, 191, 36, 0.4)'
                }}
              >
                <div className="text-3xl font-bold text-amber-100 text-center mb-1">
                  {capsuleTitle}
                </div>
                <div className="text-lg text-amber-300 text-center italic">
                  Inducted {new Date().getFullYear()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RADIANCE */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* Rays */}
              {[...Array(48)].map((_, i) => {
                const angle = (i / 48) * 360;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: i % 4 === 0 ? '10px' : '7px',
                      marginLeft: '-100vw',
                      marginTop: i % 4 === 0 ? '-5px' : '-3.5px',
                      background: i % 2 === 0
                        ? 'linear-gradient(to right, transparent, rgba(192, 132, 252, 0.9) 50%, transparent)'
                        : 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.85) 50%, transparent)',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(1.5px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 2.9, 2.7],
                      opacity: [0, 1, 0.97]
                    }}
                    transition={{
                      duration: 1.4,
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
                  scale: [0, 7.8, 7.5],
                  opacity: [0, 1, 0.98],
                  rotate: [0, 120]
                }}
                transition={{ duration: 1.7, ease: 'easeOut' }}
              >
                <div
                  className="w-[56rem] h-[56rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 249, 195, 0.98) 5%, rgba(192, 132, 252, 0.95) 10%, rgba(251, 191, 36, 0.92) 22%, rgba(192, 132, 252, 0.88) 38%, rgba(88, 28, 135, 0.75) 55%, transparent 88%)',
                    boxShadow: '0 0 540px rgba(192, 132, 252, 0.95), 0 0 800px rgba(251, 191, 36, 0.8)',
                    filter: 'blur(130px)'
                  }}
                />
              </motion.div>

              {/* Portrait frame and star particles orbiting */}
              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * 360;
                const radius = 240;
                const icon = i % 2 === 0 ? '🖼️' : '⭐';

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
                      delay: 0.4 + i * 0.04,
                      duration: 8,
                      repeat: completed ? 0 : 2,
                      ease: 'linear'
                    }}
                  >
                    {icon}
                  </motion.div>
                );
              })}

              {/* Burst particles */}
              {[...Array(90)].map((_, i) => {
                const angle = (i / 90) * Math.PI * 2;
                const distance = 150 + Math.random() * 320;
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
                      y: [y, y + 150],
                      scale: [0, 2.4, 2.1],
                      opacity: [0, 1, 0.96, 0],
                      rotate: [0, Math.random() * 720]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.004,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: i % 3 === 0 ? '#c084fc' : i % 3 === 1 ? '#fbbf24' : '#e9d5ff',
                        boxShadow: `0 0 15px ${i % 3 === 0 ? 'rgba(192, 132, 252, 0.9)' : 'rgba(251, 191, 36, 0.9)'}`
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
              transition={{ delay: 0.7, duration: 0.9 }}
              className="absolute bottom-20 left-0 right-0 text-center z-40"
            >
              <h2 
                className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
                style={{
                  color: '#c084fc',
                  textShadow: '0 0 40px rgba(192, 132, 252, 0.95)',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Legend Enshrined
              </h2>
              <p className="text-2xl text-purple-200 drop-shadow-lg font-serif">{capsuleTitle}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}