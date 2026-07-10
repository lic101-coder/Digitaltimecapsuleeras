/**
 * Eternal Flame - Unity Candle Ceremony 🕯️✨
 * 
 * REFINED VERSION - Smooth animations, perfect positioning, dramatic unity
 * 
 * FIXES:
 * - Flames properly positioned on candles
 * - Smooth, fluid animations throughout
 * - DRAMATIC "becoming one" sequence with pause and merge
 * - Flames reach toward each other before merging
 * - Perfect timing and choreography
 * 
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const UNITY_CSS = `
@keyframes flame-core-glow {
  0%,100% { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
  50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.22); }
}
@keyframes unity-orbit-spin {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes unity-radiance-pulse {
  0%,100% { opacity: 0.88; }
  50%      { opacity: 1; }
}
`;

interface EternalFlameClassicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function EternalFlameClassicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: EternalFlameClassicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'appear' | 'flicker' | 'move' | 'reach' | 'touch' | 'fuse' | 'merge' | 'radiance' | 'outro' | 'complete'>('intro');
  const [shake, setShake] = useState(false);
  const [completed, setCompleted] = useState(false);

  /* ── Pre-computed particles — never call Math.random() in render ── */
  const burstColors = ['#f43f5e', '#fb923c', '#fbbf24', '#fda4af'];

  const fuseBurst = useMemo(() => Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 120 + (i % 4) * 52;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, colorIdx: i % 4, rot: i * 22 };
  }), []);

  const mergeBurst = useMemo(() => Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2 + 0.2;
    const dist = 130 + (i % 4) * 56;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, colorIdx: i % 4, rot: i * 22 };
  }), []);

  const radianceBurst = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const dist = 150 + (i % 4) * 70;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, colorIdx: i % 4 };
  }), []);

  const radianceRays = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360,
    height: i % 3 === 0 ? 12 : i % 3 === 1 ? 8 : 10,
    colorIdx: i % 4
  })), []);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('appear') },
      { time: 3000, action: () => setStage('flicker') },
      { time: 6000, action: () => setStage('move') },
      { time: 9500, action: () => setStage('reach') },      // Flames reach for each other - LONGER
      { time: 12500, action: () => setStage('touch') },      // Flames touch - dramatic moment - LONGER
      { time: 14000, action: () => setStage('fuse') },       // Candles melt/flow together - VISIBLE MORPH
      { time: 15500, action: () => { setStage('merge'); setShake(true); } },  // EXPLOSION
      { time: 15900, action: () => setShake(false) },
      { time: 16500, action: () => setStage('radiance') },
      { time: 20500, action: () => setStage('outro') },
      { time: 21000, action: () => {
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // CRITICAL FAILSAFE: Force completion after 25 seconds if ceremony hasn't finished
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Unity Candle failsafe triggered - forcing completion');
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }
    }, 25000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a0f14] via-[#2d1420] to-[#0f0510]">
      <style>{UNITY_CSS}</style>
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #6a3050 0%, #2d1420 50%, #1a0f14 100%)',
                'radial-gradient(ellipse at 50% 50%, #8a4070 0%, #2d1420 50%, #1a0f14 100%)'
              ]
            : stage === 'reach' || stage === 'touch'
            ? 'radial-gradient(ellipse at 50% 50%, #4a2540 0%, #2d1420 50%, #1a0f14 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #2d1420 0%, #1a0f14 70%, #050208 100%)'
        }}
        transition={{
          duration: stage === 'radiance' ? 0.5 : 1.5,
          repeat: stage === 'radiance' && !completed ? 3 : 0 // Limit repeats
        }}
      />

      {/* Screen shake container */}
      <motion.div
        className="absolute inset-0"
        animate={shake ? {
          x: [0, -10, 10, -8, 8, -4, 4, 0],
          y: [0, 8, -8, 6, -6, 3, -3, 0]
        } : {}}
        transition={{
          duration: 0.4,
          ease: 'easeInOut'
        }}
      >
        {/* Title */}
        <AnimatePresence>
          {stage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-16 left-0 right-0 text-center z-20"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-rose-100 drop-shadow-2xl">
                Unity Candle
              </h1>
              <p className="text-rose-200/80 mt-3 text-base">Two become one</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* Left candle (rose) */}
          <AnimatePresence>
            {(stage === 'appear' || stage === 'flicker' || stage === 'move' || stage === 'reach' || stage === 'touch') && (
              <motion.div
                className="absolute z-30"
                initial={{ 
                  left: '30%',
                  top: '50%',
                  scale: 0, 
                  opacity: 0,
                  rotate: 0
                }}
                animate={{ 
                  left: (stage === 'move' || stage === 'reach' || stage === 'touch') ? '44%' : '30%',
                  top: '50%',
                  scale: (stage === 'touch') ? [1, 1, 0.8, 0] : 1,
                  opacity: (stage === 'touch') ? [1, 1, 0.5, 0] : 1,
                  rotate: (stage === 'move') ? 5 
                          : (stage === 'reach' || stage === 'touch') ? 12  // BEND MORE dramatically toward center
                          : 0
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ 
                  left: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] },
                  rotate: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96] },
                  scale: { duration: stage === 'touch' ? 1 : 1.2, ease: 'easeInOut' },
                  opacity: { duration: stage === 'touch' ? 1 : 1.2, ease: 'easeInOut' }
                }}
                style={{
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Candle body - POSITIONED FIRST */}
                <div
                  style={{
                    width: '18px',
                    height: '75px',
                    background: 'linear-gradient(135deg, #fda4af 0%, #fb7185 50%, #f43f5e 100%)',
                    borderRadius: '4px 4px 2px 2px',
                    boxShadow: 'inset 3px 0 8px rgba(255, 255, 255, 0.4), inset -3px 0 8px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(244, 63, 94, 0.5)',
                    position: 'relative'
                  }}
                >
                  {/* Candle shine */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '4px',
                      width: '5px',
                      height: '38px',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent)',
                      borderRadius: '2px',
                      filter: 'blur(1px)'
                    }}
                  />

                  {/* Wax drips */}
                  {stage !== 'intro' && [0, 1, 2].map((i) => (
                    <motion.div
                      key={`drip-left-${i}`}
                      className="absolute"
                      style={{
                        width: '2px',
                        left: `${25 + i * 25}%`,
                        top: `${15 + i * 12}px`,
                        background: 'linear-gradient(to bottom, rgba(253, 164, 175, 0.8), rgba(251, 113, 133, 0.9))',
                        borderRadius: '0 0 50% 50%',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                      }}
                      initial={{ height: 0 }}
                      animate={{
                        height: [0, 10 + i * 2]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1 + i * 0.5,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </div>

                {/* FLAME - Positioned ABOVE candle */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '75px' // Position at top of candle
                  }}
                  animate={
                    stage === 'flicker' || stage === 'move'
                      ? {
                          scale: [1, 1.15, 0.95, 1.1, 1],
                          y: [0, -3, 1, -4, 0],
                          rotate: [0, -2, 1, -3, 0]
                        }
                      : stage === 'reach' || stage === 'touch'
                      ? {
                          scale: [1, 1.5, 1.4, 1.6, 1.5],  // BIGGER scale
                          y: [0, -12, -10, -15, -12],  // Stretch UP more
                          x: [0, 14, 12, 18, 16], // Reach FURTHER toward center
                          rotate: [0, 25, 22, 30, 28],  // Lean MORE dramatically
                          scaleX: [1, 1.4, 1.3, 1.5, 1.4]  // Stretch horizontally toward each other!
                        }
                      : { scale: 1, y: 0, x: 0, rotate: 0 }
                  }
                  transition={{
                    duration: (stage === 'reach' || stage === 'touch') ? 1.5 : 1.8,
                    repeat: (stage === 'flicker' || stage === 'move' || stage === 'reach') ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Outer glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '40px',
                      height: '55px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 113, 133, 0.8), rgba(244, 63, 94, 0.5) 50%, transparent 80%)',
                      filter: 'blur(10px)'
                    }}
                  />
                  
                  {/* Main flame shape */}
                  <div
                    style={{
                      width: '20px',
                      height: '32px',
                      background: 'radial-gradient(ellipse at 50% 65%, #ffffff 0%, #ffe0e0 12%, #fde047 30%, #fb923c 55%, #f43f5e 80%, rgba(225, 29, 72, 0.9) 100%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: '0 0 20px rgba(251, 113, 133, 0.8)',
                      position: 'relative'
                    }}
                  >
                    {/* Bright core */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: '10px',
                        height: '16px',
                        background: 'radial-gradient(ellipse, #ffffff 0%, #fffacd 40%, transparent 80%)',
                        filter: 'blur(2px)',
                        animation: 'flame-core-glow 1.8s ease-in-out infinite'
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right candle (amber) */}
          <AnimatePresence>
            {(stage === 'appear' || stage === 'flicker' || stage === 'move' || stage === 'reach' || stage === 'touch') && (
              <motion.div
                className="absolute z-30"
                initial={{
                  left: '70%',
                  top: '50%',
                  scale: 0,
                  opacity: 0,
                  rotate: 0
                }}
                animate={{
                  left: (stage === 'move' || stage === 'reach' || stage === 'touch') ? '56%' : '70%',
                  top: '50%',
                  scale: (stage === 'touch') ? [1, 1, 0.8, 0] : 1,
                  opacity: (stage === 'touch') ? [1, 1, 0.5, 0] : 1,
                  rotate: (stage === 'move') ? -5
                          : (stage === 'reach' || stage === 'touch') ? -12  // BEND MORE dramatically toward center
                          : 0
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  left: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 },
                  rotate: { duration: 3, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 },
                  scale: { duration: stage === 'touch' ? 1 : 1.2, ease: 'easeInOut', delay: 0.1 },
                  opacity: { duration: stage === 'touch' ? 1 : 1.2, ease: 'easeInOut', delay: 0.1 }
                }}
                style={{
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Candle body - POSITIONED FIRST */}
                <div
                  style={{
                    width: '18px',
                    height: '75px',
                    background: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #f59e0b 100%)',
                    borderRadius: '4px 4px 2px 2px',
                    boxShadow: 'inset 3px 0 8px rgba(255, 255, 255, 0.4), inset -3px 0 8px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(245, 158, 11, 0.5)',
                    position: 'relative'
                  }}
                >
                  {/* Candle shine */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '4px',
                      width: '5px',
                      height: '38px',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.7), transparent)',
                      borderRadius: '2px',
                      filter: 'blur(1px)'
                    }}
                  />

                  {/* Wax drips */}
                  {stage !== 'intro' && [0, 1, 2].map((i) => (
                    <motion.div
                      key={`drip-right-${i}`}
                      className="absolute"
                      style={{
                        width: '2px',
                        left: `${25 + i * 25}%`,
                        top: `${15 + i * 12}px`,
                        background: 'linear-gradient(to bottom, rgba(254, 240, 138, 0.8), rgba(251, 191, 36, 0.9))',
                        borderRadius: '0 0 50% 50%',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                      }}
                      initial={{ height: 0 }}
                      animate={{
                        height: [0, 10 + i * 2]
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.2 + i * 0.5,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </div>

                {/* FLAME - Positioned ABOVE candle */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '75px' // Position at top of candle
                  }}
                  animate={
                    stage === 'flicker' || stage === 'move'
                      ? {
                          scale: [1, 1.12, 0.98, 1.08, 1],
                          y: [0, -4, 2, -3, 0],
                          rotate: [0, 2, -1, 3, 0]
                        }
                      : stage === 'reach' || stage === 'touch'
                      ? {
                          scale: [1, 1.45, 1.35, 1.55, 1.45],  // BIGGER scale - match left
                          y: [0, -11, -9, -14, -11],  // Stretch UP more
                          x: [0, -14, -12, -18, -16], // Reach FURTHER toward center (negative for right)
                          rotate: [0, -25, -22, -30, -28],  // Lean MORE dramatically (negative for right)
                          scaleX: [1, 1.4, 1.3, 1.5, 1.4]  // Stretch horizontally toward each other!
                        }
                      : { scale: 1, y: 0, x: 0, rotate: 0 }
                  }
                  transition={{
                    duration: (stage === 'reach' || stage === 'touch') ? 1.5 : 2,
                    repeat: (stage === 'flicker' || stage === 'move' || stage === 'reach') ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: 0.15
                  }}
                >
                  {/* Outer glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '40px',
                      height: '55px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, 0.8), rgba(245, 158, 11, 0.5) 50%, transparent 80%)',
                      filter: 'blur(10px)'
                    }}
                  />
                  
                  {/* Main flame shape */}
                  <div
                    style={{
                      width: '20px',
                      height: '32px',
                      background: 'radial-gradient(ellipse at 50% 65%, #ffffff 0%, #fffdf0 12%, #fef08a 30%, #fbbf24 55%, #f59e0b 80%, rgba(217, 119, 6, 0.9) 100%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
                      position: 'relative'
                    }}
                  >
                    {/* Bright core */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: '10px',
                        height: '16px',
                        background: 'radial-gradient(ellipse, #ffffff 0%, #fffdf0 40%, transparent 80%)',
                        filter: 'blur(2px)',
                        animation: 'flame-core-glow 1.9s ease-in-out infinite'
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOUCH moment - connecting energy */}
          <AnimatePresence>
            {(stage === 'reach' || stage === 'touch') && (
              <>
                {/* Flowing energy streams BETWEEN the flames */}
                {[...Array(12)].map((_, i) => {
                  const delay = i * 0.08;
                  return (
                    <motion.div
                      key={`energy-stream-${i}`}
                      className="absolute left-1/2 z-31"
                      style={{
                        top: 'calc(50% - 75px)',
                        width: '4px',
                        height: '40px',
                        background: i % 2 === 0 
                          ? 'linear-gradient(to bottom, rgba(251, 113, 133, 0.9), rgba(251, 191, 36, 0.7))'
                          : 'linear-gradient(to bottom, rgba(251, 191, 36, 0.9), rgba(251, 113, 133, 0.7))',
                        borderRadius: '50%',
                        filter: 'blur(3px)',
                        boxShadow: '0 0 15px rgba(255, 200, 120, 0.8)'
                      }}
                      initial={{ scaleY: 0, opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      animate={{
                        scaleY: stage === 'touch' ? [0, 1.5, 1.3] : [0, 1.2, 1],
                        opacity: stage === 'touch' ? [0, 1, 0.9] : [0, 0.8, 0.7],
                        x: [i % 2 === 0 ? -30 : 30, 0],
                        y: [-10, 5, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        delay: delay,
                        repeat: stage === 'reach' ? Infinity : 0,
                        repeatDelay: 0.3,
                        ease: 'easeInOut'
                      }}
                    />
                  );
                })}

                {/* Molten wax particles flowing between candles */}
                {stage === 'reach' && [...Array(20)].map((_, i) => {
                  const startX = i % 2 === 0 ? -50 : 50;
                  return (
                    <motion.div
                      key={`wax-particle-${i}`}
                      className="absolute left-1/2 z-29"
                      style={{
                        top: 'calc(50% - 50px)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: i % 2 === 0 
                          ? 'radial-gradient(circle, #fda4af, #fb7185)'
                          : 'radial-gradient(circle, #fde68a, #fbbf24)',
                        boxShadow: i % 2 === 0 
                          ? '0 0 10px rgba(251, 113, 133, 0.9)'
                          : '0 0 10px rgba(251, 191, 36, 0.9)'
                      }}
                      initial={{ x: startX, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: [startX, startX * 0.5, 0],
                        y: [0, -8, -5],
                        opacity: [0, 1, 0.8, 0],
                        scale: [0, 1.2, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.12,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  );
                })}

                {/* Electric arc when flames touch */}
                {stage === 'touch' && (
                  <>
                    <motion.div
                      className="absolute left-1/2 z-33"
                      style={{
                        top: 'calc(50% - 85px)',
                        transform: 'translateX(-50%)'
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 1, 0.8],
                        scale: [0, 2, 1.8, 1.5]
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    >
                      {/* Bright electric core */}
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 200, 0.95) 20%, rgba(255, 200, 120, 0.8) 45%, transparent 75%)',
                          boxShadow: '0 0 80px rgba(255, 255, 255, 1), 0 0 120px rgba(255, 200, 120, 0.9)',
                          filter: 'blur(4px)'
                        }}
                      />
                      
                      {/* Electric bolts */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`bolt-${i}`}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            width: '2px',
                            height: '30px',
                            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 220, 120, 0.8), transparent)',
                            transformOrigin: 'top center',
                            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                            filter: 'blur(1px)',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)'
                          }}
                          animate={{
                            scaleY: [0, 1.5, 1.2, 1.4],
                            opacity: [0, 1, 0.8, 0.9]
                          }}
                          transition={{
                            duration: 0.4,
                            delay: i * 0.05,
                            repeat: 3,
                            ease: 'easeOut'
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* SWIRLING FLAME VORTEX - Flames spiral together */}
                    {[...Array(24)].map((_, i) => {
                      const angle = (i / 24) * 360;
                      const radius = 25 + (i % 3) * 10;
                      const isRose = i % 2 === 0;
                      
                      return (
                        <motion.div
                          key={`vortex-${i}`}
                          className="absolute left-1/2 z-32"
                          style={{
                            top: 'calc(50% - 75px)',
                            width: '8px',
                            height: '12px',
                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                            background: isRose
                              ? 'radial-gradient(ellipse, #fb7185, #f43f5e)'
                              : 'radial-gradient(ellipse, #fbbf24, #f59e0b)',
                            boxShadow: isRose
                              ? '0 0 8px rgba(251, 113, 133, 0.9)'
                              : '0 0 8px rgba(251, 191, 36, 0.9)',
                            filter: 'blur(1px)'
                          }}
                          animate={{
                            x: [
                              Math.cos((angle) * Math.PI / 180) * radius,
                              Math.cos((angle + 720) * Math.PI / 180) * 5,
                              0
                            ],
                            y: [
                              Math.sin((angle) * Math.PI / 180) * radius,
                              Math.sin((angle + 720) * Math.PI / 180) * 5,
                              0
                            ],
                            scale: [0.5, 1.2, 0.8, 0],
                            opacity: [0, 1, 0.9, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.03,
                            ease: 'easeInOut'
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </AnimatePresence>

          {/* Original connection spark for 'touch' stage only */}
          <AnimatePresence>
            {stage === 'touch' && (
              <motion.div
                className="absolute left-1/2 z-32"
                style={{
                  top: 'calc(50% - 75px)', // Match flame height
                  transform: 'translateX(-50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0, 1.5, 1.3]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Connection spark */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 200, 120, 0.9) 30%, rgba(255, 150, 100, 0.6) 60%, transparent 85%)',
                    boxShadow: '0 0 60px rgba(255, 200, 120, 1), 0 0 100px rgba(255, 150, 100, 0.8)',
                    filter: 'blur(8px)'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FUSE - Candles melt/flow together */}
          <AnimatePresence>
            {stage === 'fuse' && (
              <>
                {/* White flash */}
                <motion.div
                  className="absolute inset-0 bg-white z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.35 }}
                />

                {/* Explosion core */}
                <motion.div
                  className="absolute left-1/2 z-39"
                  style={{
                    top: 'calc(50% - 75px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 8, 10],
                    opacity: [1, 0.95, 0]
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 220, 100, 0.95) 25%, rgba(255, 150, 100, 0.75) 55%, transparent 85%)',
                      filter: 'blur(25px)'
                    }}
                  />
                </motion.div>

                {/* Shockwaves */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`shockwave-${i}`}
                    className="absolute left-1/2 z-38"
                    style={{
                      top: 'calc(50% - 75px)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: `${5 - i}px solid rgba(255, 200, 120, ${1 - i * 0.2})`,
                      boxShadow: `0 0 40px rgba(255, 150, 100, ${1 - i * 0.2})`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 12],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.07,
                      ease: 'easeOut'
                    }}
                  />
                ))}

                {/* Burst particles — 16 deterministic */}
                {fuseBurst.map((p, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute left-1/2 z-37"
                    style={{
                      top: 'calc(50% - 75px)',
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: burstColors[p.colorIdx],
                      boxShadow: `0 0 12px ${burstColors[p.colorIdx]}`
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: p.x, y: p.y, scale: [0, 2, 1.5, 0], opacity: [0, 1, 0.9, 0], rotate: [0, p.rot] }}
                    transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* MERGE - Massive explosion */}
          <AnimatePresence>
            {stage === 'merge' && (
              <>
                {/* White flash */}
                <motion.div
                  className="absolute inset-0 bg-white z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.35 }}
                />

                {/* Explosion core */}
                <motion.div
                  className="absolute left-1/2 z-39"
                  style={{
                    top: 'calc(50% - 75px)',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 8, 10],
                    opacity: [1, 0.95, 0]
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 220, 100, 0.95) 25%, rgba(255, 150, 100, 0.75) 55%, transparent 85%)',
                      filter: 'blur(25px)'
                    }}
                  />
                </motion.div>

                {/* Shockwaves */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`shockwave-${i}`}
                    className="absolute left-1/2 z-38"
                    style={{
                      top: 'calc(50% - 75px)',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      border: `${5 - i}px solid rgba(255, 200, 120, ${1 - i * 0.2})`,
                      boxShadow: `0 0 40px rgba(255, 150, 100, ${1 - i * 0.2})`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 12],
                      opacity: [1, 0]
                    }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.07,
                      ease: 'easeOut'
                    }}
                  />
                ))}

                {/* Burst particles — 16 deterministic */}
                {mergeBurst.map((p, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute left-1/2 z-37"
                    style={{
                      top: 'calc(50% - 75px)',
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: burstColors[p.colorIdx],
                      boxShadow: `0 0 12px ${burstColors[p.colorIdx]}`
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: p.x, y: p.y, scale: [0, 2, 1.5, 0], opacity: [0, 1, 0.9, 0], rotate: [0, p.rot] }}
                    transition={{ duration: 0.8, delay: i * 0.02, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* UNIFIED FLAME - Properly positioned */}
          <AnimatePresence>
            {(stage === 'merge' || stage === 'radiance') && (
              <motion.div
                className="absolute left-1/2 top-1/2 z-35"
                style={{
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: stage === 'merge' ? [0, 1.3, 1] : 1,
                  opacity: stage === 'merge' ? [0, 0, 1] : 1
                }}
                transition={{
                  duration: stage === 'merge' ? 0.9 : 0.5,
                  delay: stage === 'merge' ? 0.3 : 0
                }}
              >
                {/* Candle body */}
                <div
                  style={{
                    width: '32px',
                    height: '90px',
                    background: 'linear-gradient(135deg, #fda4af 0%, #fb923c 25%, #fbbf24 50%, #fb7185 75%, #f59e0b 100%)',
                    borderRadius: '6px 6px 3px 3px',
                    boxShadow: 'inset 4px 0 12px rgba(255, 255, 255, 0.5), inset -4px 0 12px rgba(0, 0, 0, 0.4), 0 6px 25px rgba(251, 146, 60, 0.7)',
                    position: 'relative'
                  }}
                >
                  {/* Candle shine */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '9px',
                      width: '9px',
                      height: '50px',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)',
                      borderRadius: '3px',
                      filter: 'blur(1.5px)'
                    }}
                  />
                </div>

                {/* UNIFIED FLAME - Positioned above candle */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '90px'
                  }}
                  animate={(stage === 'merge' || stage === 'radiance') && !completed ? {
                    scale: [1, 1.1, 1.05, 1.12, 1],
                    y: [0, -5, 2, -7, 0],
                    rotate: [0, -1, 0.5, -1.5, 0]
                  } : { scale: 1, y: 0, rotate: 0 }}
                  transition={{
                    duration: 2,
                    repeat: (stage === 'merge' || stage === 'radiance') && !completed ? 5 : 0, // Limit repeats
                    ease: 'easeInOut'
                  }}
                >
                  {/* Massive outer glow */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '120px',
                      height: '150px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(ellipse at 50% 60%, rgba(255, 200, 120, 0.9), rgba(251, 146, 60, 0.7) 30%, rgba(251, 113, 133, 0.5) 60%, transparent 85%)',
                      filter: 'blur(25px)'
                    }}
                  />

                  {/* Secondary pulsing layer — CSS animation */}
                  <div style={{
                    position: 'absolute',
                    width: '80px', height: '105px',
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(ellipse at 50% 55%, rgba(255,230,150,0.85), rgba(251,191,36,0.6) 50%, transparent 80%)',
                    filter: 'blur(15px)',
                    animation: 'unity-radiance-pulse 2.2s ease-in-out infinite'
                  }} />

                  {/* Main enormous flame */}
                  <div
                    style={{
                      width: '60px',
                      height: '95px',
                      background: 'radial-gradient(ellipse at 50% 65%, #ffffff 0%, #fffdf0 8%, #fef08a 20%, #fbbf24 38%, #fb923c 58%, #f43f5e 78%, rgba(225, 29, 72, 0.95) 100%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: '0 0 60px rgba(251, 146, 60, 1), 0 0 90px rgba(244, 63, 94, 0.7)',
                      position: 'relative'
                    }}
                  >
                    {/* Bright core — CSS animation */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: '28px', height: '42px',
                      background: 'radial-gradient(ellipse, #ffffff 0%, #fffdf0 30%, transparent 75%)',
                      filter: 'blur(5px)',
                      animation: 'flame-core-glow 1.8s ease-in-out infinite'
                    }} />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RADIANCE finale — mobile-safe */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 24 static rays */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
              >
                {radianceRays.map((r, i) => (
                  <div key={`ray-${i}`} style={{
                    position: 'absolute', left: '50%', top: '50%',
                    width: '200vw', height: `${r.height}px`,
                    marginLeft: '-100vw', marginTop: `${-r.height / 2}px`,
                    background: `linear-gradient(to right, transparent, ${burstColors[r.colorIdx]} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${r.angle}deg)`,
                    filter: 'blur(2px)'
                  }} />
                ))}
              </motion.div>

              {/* Radiant core */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 6, 5.8], opacity: [0, 1, 0.96] }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              >
                <div style={{
                  width: '440px', height: '440px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,252,232,0.97) 5%, rgba(251,191,36,0.9) 22%, rgba(251,146,60,0.82) 40%, rgba(251,113,133,0.7) 58%, transparent 88%)',
                  filter: 'blur(100px)',
                  animation: 'unity-radiance-pulse 3s ease-in-out infinite'
                }} />
              </motion.div>

              {/* Single CSS orbit ring — zero JS per frame */}
              <div className="absolute pointer-events-none" style={{
                left: '50%', top: '50%',
                width: '360px', height: '360px',
                border: '2px solid rgba(251,113,133,0.45)',
                borderRadius: '50%',
                boxShadow: '0 0 18px rgba(251,146,60,0.35)',
                animation: 'unity-orbit-spin 11s linear infinite'
              }} />

              {/* 20 burst particles — deterministic */}
              {radianceBurst.map((p, i) => (
                <motion.div
                  key={`radiance-burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{ x: p.x, y: [p.y, p.y + 140], scale: [0, 2.2, 1.8], opacity: [0, 1, 0.88, 0] }}
                  transition={{ duration: 2.8, delay: i * 0.055, ease: 'easeOut' }}
                >
                  <div style={{
                    width: '11px', height: '11px', borderRadius: '50%',
                    background: burstColors[p.colorIdx],
                    boxShadow: `0 0 14px ${burstColors[p.colorIdx]}`
                  }} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Success message */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-20 left-0 right-0 text-center z-50"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-rose-100 drop-shadow-2xl mb-4">
                Forever United
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}