/**
 * Birthday - Cake & Candles Ceremony (SIMPLE & CLEAR)
 * 
 * A birthday cake with candles - you blow them out and they transform into magical light.
 * Features: Cake appears with lit candles → candles flicker → take a breath → blow out candles
 * → wind sweeps across → smoke trails rise → transform to brilliant radiance
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimalParticleCount } from './ceremonyOptimization';

interface BirthdayClassicCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function BirthdayClassicCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: BirthdayClassicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'cake' | 'flicker' | 'breath' | 'blowout' | 'smoke' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 800, action: () => setStage('cake') },
      { time: 2500, action: () => setStage('flicker') },
      { time: 4500, action: () => setStage('breath') },
      { time: 6500, action: () => setStage('blowout') },
      { time: 8500, action: () => setStage('smoke') },
      { time: 10500, action: () => setStage('radiance') },
      { time: 13500, action: () => setStage('outro') },
      { time: 14000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  const numCandles = 5;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a0f14] via-[#2d1a24] to-[#0f0510]">
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #4a2a3e 0%, #2d1a24 50%, #1a0f14 100%)',
                'radial-gradient(ellipse at 50% 50%, #6a3a5e 0%, #2d1a24 50%, #1a0f14 100%)'
              ]
            : 'radial-gradient(ellipse at 50% 50%, #2d1a24 0%, #1a0f14 70%, #050208 100%)'
        }}
        transition={{ 
          duration: stage === 'radiance' ? 0.7 : 2,
          repeat: stage === 'radiance' ? Infinity : 0
        }}
      />

      {/* Warm candlelight glow */}
      <AnimatePresence>
        {(stage === 'cake' || stage === 'flicker' || stage === 'breath') && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 146, 60, 0.3) 0%, rgba(234, 88, 12, 0.15) 40%, transparent 70%)',
                filter: 'blur(120px)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-pink-100 drop-shadow-2xl">
              Make a Wish
            </h1>
            <p className="text-pink-200/80 mt-3 text-base">Blow out the candles</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Birthday cake WITH candles on top */}
        <AnimatePresence>
          {(stage === 'cake' || stage === 'flicker' || stage === 'breath' || stage === 'blowout' || stage === 'smoke') && (
            <motion.div
              className="absolute z-25"
              style={{ 
                bottom: '25%',
                left: '50%',
                marginLeft: '-150px' // Half of cake width (300px) to perfectly center
              }}
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{ 
                scale: 1, 
                opacity: stage === 'smoke' ? [1, 1, 0.7, 0] : 1, 
                y: 0 
              }}
              exit={{ 
                scale: 1.2,
                opacity: 0,
                y: 20,
                filter: 'blur(20px)'
              }}
              transition={{ 
                duration: 1.2,
                ease: 'backOut',
                opacity: { duration: stage === 'smoke' ? 2.5 : 1.2 },
                exit: { duration: 1.8, delay: 0 }
              }}
            >
              {/* Candles positioned ON TOP of cake (absolutely positioned within this container) */}
              {[...Array(numCandles)].map((_, i) => {
                // Center candles properly on the 300px wide cake
                const candleWidth = 20; // Approximate candle width
                const xOffset = (i - (numCandles - 1) / 2) * 38; // Spacing between candles (tighter)
                const cakeCenter = 150; // Half of cake width (300px / 2)
                const rightShift = 5; // Very slight shift to the right
                
                return (
                  <motion.div
                    key={`candle-${i}`}
                    className="absolute"
                    style={{
                      bottom: '218px', // Position on top of cake
                      left: `${cakeCenter + xOffset + rightShift - candleWidth/2}px`, // Perfectly centered
                    }}
                    initial={{ scale: 0, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 1 + i * 0.1,
                      ease: 'backOut'
                    }}
                  >
                    {/* Flame */}
                    <AnimatePresence>
                      {(stage !== 'blowout' && stage !== 'smoke' && stage !== 'radiance') && (
                        <motion.div
                          className="absolute -top-12 left-1/2 -translate-x-1/2"
                          animate={
                            stage === 'breath'
                              ? {
                                  scaleX: [1, 0.4, 0.3, 0.5, 0.4],
                                  x: [-8, -20, -25, -18, -22],
                                  opacity: [1, 0.6, 0.5, 0.7, 0.6]
                                }
                              : stage === 'flicker'
                              ? {
                                  scale: [1, 1.15, 0.95, 1.1, 1],
                                  y: [0, -3, 1, -2, 0]
                                }
                              : { scale: 1, y: 0 }
                          }
                          exit={{
                            scale: [1, 0.3, 0],
                            opacity: [1, 0.3, 0],
                            y: [-5, -15]
                          }}
                          transition={
                            stage === 'breath'
                              ? { duration: 1.2, ease: 'easeInOut' }
                              : stage === 'flicker'
                              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }
                              : { duration: 0.6 }
                          }
                        >
                          {/* Outer glow */}
                          <div
                            className="absolute inset-0"
                            style={{
                              width: '28px',
                              height: '38px',
                              background: 'radial-gradient(ellipse at 50% 60%, rgba(255, 200, 50, 0.9), rgba(255, 150, 50, 0.6) 40%, rgba(255, 100, 30, 0.3) 70%, transparent)',
                              filter: 'blur(8px)',
                              transform: 'translate(-50%, -50%) scale(1.4)',
                              left: '50%',
                              top: '50%'
                            }}
                          />
                          
                          {/* Inner flame */}
                          <div
                            style={{
                              width: '16px',
                              height: '26px',
                              background: 'radial-gradient(ellipse at 50% 65%, #fff9e6 0%, #ffed4e 25%, #ff9a3c 60%, #ff6b35 85%, rgba(255, 69, 0, 0.8) 100%)',
                              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                              boxShadow: '0 0 20px rgba(255, 200, 100, 0.8), inset 0 -8px 8px rgba(255, 100, 0, 0.4)'
                            }}
                          />

                          {/* Bright core */}
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                              width: '8px',
                              height: '12px',
                              background: 'radial-gradient(ellipse, #ffffff 0%, #ffff99 40%, transparent 80%)',
                              filter: 'blur(2px)'
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Wick */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '10px',
                        background: 'linear-gradient(to bottom, #2c2c2c, #1a1a1a)',
                        borderRadius: '1px'
                      }}
                    />

                    {/* Candle body */}
                    <div
                      style={{
                        width: '14px',
                        height: '55px',
                        background: i % 3 === 0 
                          ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
                          : i % 3 === 1
                          ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)'
                          : 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
                        borderRadius: '3px 3px 1px 1px',
                        boxShadow: 'inset 2px 0 6px rgba(255, 255, 255, 0.3), inset -2px 0 6px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.4)',
                        position: 'relative'
                      }}
                    >
                      {/* Candle shine */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '3px',
                          width: '4px',
                          height: '25px',
                          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent)',
                          borderRadius: '2px',
                          filter: 'blur(1px)'
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Cake plate */}
              <div
                className="relative"
                style={{
                  width: '320px',
                  height: '12px',
                  background: 'linear-gradient(to bottom, #e5e7eb, #d1d5db)',
                  borderRadius: '50%',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  marginBottom: '4px'
                }}
              />

              {/* Cake base - bottom layer */}
              <div
                className="relative"
                style={{
                  width: '300px',
                  height: '90px',
                  background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #b91c1c 100%)',
                  borderRadius: '12px 12px 8px 8px',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5), inset 0 2px 15px rgba(255, 255, 255, 0.15)'
                }}
              >
                {/* Bottom frosting wave */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: '16px',
                    background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                    borderRadius: '12px 12px 0 0',
                    boxShadow: 'inset 0 -3px 8px rgba(217, 119, 6, 0.25)'
                  }}
                />

                {/* Frosting drips */}
                {[20, 40, 60, 80].map((left) => (
                  <div
                    key={`drip-bottom-${left}`}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: '16px',
                      width: '16px',
                      height: '8px',
                      background: 'linear-gradient(to bottom, #fde68a, #fbbf24)',
                      borderRadius: '0 0 8px 8px'
                    }}
                  />
                ))}

                {/* Decorative dots - FIXED to stay on cake */}
                {[...Array(9)].map((_, i) => (
                  <div
                    key={`dot-bottom-${i}`}
                    className="absolute"
                    style={{
                      left: `${10 + i * 10}%`, // Changed from 12 + i * 11 to keep within bounds (10-90%)
                      top: '50%',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#fde047',
                      boxShadow: `0 0 8px ${i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f59e0b' : '#fde047'}`
                    }}
                  />
                ))}
              </div>

              {/* Cake middle layer */}
              <div
                className="relative -mt-2"
                style={{
                  width: '300px',
                  height: '75px',
                  background: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #be123c 100%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 2px 12px rgba(255, 255, 255, 0.12)'
                }}
              >
                {/* Middle frosting */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: '14px',
                    background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: 'inset 0 -3px 8px rgba(217, 119, 6, 0.25)'
                  }}
                />

                {/* More frosting drips - FIXED */}
                {[15, 35, 55, 75].map((left) => (
                  <div
                    key={`drip-middle-${left}`}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: '14px',
                      width: '14px',
                      height: '7px',
                      background: 'linear-gradient(to bottom, #fde68a, #fbbf24)',
                      borderRadius: '0 0 7px 7px'
                    }}
                  />
                ))}

                {/* Decorative swirls */}
                {[...Array(7)].map((_, i) => (
                  <div
                    key={`swirl-${i}`}
                    className="absolute"
                    style={{
                      left: `${15 + i * 13}%`,
                      top: '45%',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#fef08a',
                      boxShadow: '0 0 6px rgba(254, 240, 138, 0.8)'
                    }}
                  />
                ))}
              </div>

              {/* Cake top layer */}
              <div
                className="relative -mt-2"
                style={{
                  width: '300px',
                  height: '65px',
                  background: 'linear-gradient(135deg, #c2185b 0%, #e91e63 50%, #c2185b 100%)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 15px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Top frosting - perfect for candles */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: '18px',
                    background: 'linear-gradient(to bottom, #fffbeb, #fef3c7)',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: 'inset 0 -3px 10px rgba(217, 119, 6, 0.2), 0 2px 8px rgba(254, 243, 199, 0.5)'
                  }}
                />

                {/* Final frosting drips */}
                {[10, 28, 50, 72, 90].map((left) => (
                  <div
                    key={`drip-top-${left}`}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: '18px',
                      width: '12px',
                      height: '6px',
                      background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
                      borderRadius: '0 0 6px 6px'
                    }}
                  />
                ))}

                {/* Top decorations */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`top-deco-${i}`}
                    className="absolute"
                    style={{
                      left: `${20 + i * 16}%`,
                      top: '55%',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#fbbf24',
                      boxShadow: '0 0 10px rgba(251, 191, 36, 0.7)',
                      border: '2px solid #fef3c7'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wind/breath effect */}
        <AnimatePresence>
          {(stage === 'breath' || stage === 'blowout') && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`wind-${i}`}
                  className="absolute z-26"
                  style={{
                    left: '10%',
                    top: `${45 + Math.random() * 15}%`,
                    width: '4px',
                    height: '2px',
                    borderRadius: '2px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    filter: 'blur(1px)'
                  }}
                  initial={{ x: 0, opacity: 0, scaleX: 0 }}
                  animate={{
                    x: [0, 600],
                    opacity: [0, 0.6, 0.8, 0],
                    scaleX: [0, 3, 4, 2]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: stage === 'blowout' ? i * 0.05 : i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Smoke trails (after candles blow out) */}
        <AnimatePresence>
          {stage === 'smoke' && (
            <>
              {[...Array(numCandles)].map((_, i) => {
                // Match the candle positioning exactly
                const candleWidth = 20;
                const xOffset = (i - (numCandles - 1) / 2) * 38;
                const cakeCenter = 150;
                const rightShift = 5;
                
                return (
                  <motion.div
                    key={`smoke-${i}`}
                    className="absolute z-30"
                    style={{
                      bottom: '295px', // ABOVE candles: 218 (candle bottom) + 55 (candle height) + 12 (wick) + 10 (space above flame)
                      left: `${cakeCenter + xOffset + rightShift}px`, // Match candle positioning exactly
                    }}
                    initial={{ opacity: 0, y: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.8, 0.6, 0],
                      y: [0, -120, -180, -250],
                      x: [0, (i - 2) * 8, (i - 2) * 15],
                      scale: [0.3, 0.8, 1.2, 1.5],
                      scaleX: [1, 1.3, 1.6, 2]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.15,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(156, 163, 175, 0.8) 0%, rgba(107, 114, 128, 0.4) 50%, transparent 80%)',
                        filter: 'blur(4px)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Smoke swirls upward and spreads - positioned at same location as main smoke */}
              {[...Array(30)].map((_, i) => {
                const angle = (i / 30) * Math.PI * 2;
                const radius = 60 + Math.random() * 80;
                
                return (
                  <motion.div
                    key={`smoke-particle-${i}`}
                    className="absolute z-29"
                    style={{
                      bottom: '295px', // Same as main smoke trails
                      left: '50%'
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      x: [0, Math.cos(angle) * radius],
                      y: [0, -100 - Math.random() * 100, -150 - Math.random() * 150],
                      scale: [0, 0.8, 1.2],
                      opacity: [0, 0.5, 0.3, 0],
                      rotate: [0, Math.random() * 360]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.04,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(203, 213, 225, 0.6) 0%, transparent 70%)',
                        filter: 'blur(3px)'
                      }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* EXPLOSIVE radiance */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 48 colorful rays */}
              {[...Array(48)].map((_, i) => {
                const angle = (i / 48) * 360;
                const colors = [
                  'rgba(236, 72, 153, 1)',  // pink
                  'rgba(251, 146, 60, 1)',  // orange
                  'rgba(251, 191, 36, 1)',  // yellow
                  'rgba(255, 255, 255, 1)'  // white
                ];

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: i % 3 === 0 ? '11px' : i % 3 === 1 ? '7px' : '9px',
                      marginLeft: '-100vw',
                      marginTop: i % 3 === 0 ? '-5.5px' : i % 3 === 1 ? '-3.5px' : '-4.5px',
                      background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.95)')} 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(2px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 2.8, 2.5],
                      opacity: [0, 1, 0.95]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Massive radiant core */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 7.5, 7],
                  opacity: [0, 1, 0.98]
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              >
                <div
                  className="w-[48rem] h-[48rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 242, 242, 0.98) 5%, rgba(252, 231, 243, 0.96) 12%, rgba(251, 207, 232, 0.92) 20%, rgba(249, 168, 212, 0.88) 30%, rgba(236, 72, 153, 0.82) 42%, rgba(251, 146, 60, 0.72) 58%, rgba(251, 191, 36, 0.58) 76%, rgba(253, 224, 71, 0.38) 90%, transparent 98%)',
                    boxShadow: '0 0 500px rgba(236, 72, 153, 1), 0 0 700px rgba(251, 146, 60, 0.8)',
                    filter: 'blur(120px)'
                  }}
                />
              </motion.div>

              {/* Orbiting light particles */}
              {(() => {
                const particles = [];
                for (let ring = 0; ring < 3; ring++) {
                  const radius = 200 + ring * 120;
                  const desktopCount = 45 + ring * 20;
                  const count = getOptimalParticleCount(desktopCount);
                  
                  for (let i = 0; i < count; i++) {
                    const angle = (i / count) * 360;
                    const colors = ['#ec4899', '#fb923c', '#fbbf24', '#ffffff'];
                    
                    particles.push(
                      <motion.div
                        key={`orbit-${ring}-${i}`}
                        className="absolute"
                        style={{
                          width: `${8 - ring}px`,
                          height: `${8 - ring}px`,
                          borderRadius: '50%',
                          background: colors[i % 4],
                          boxShadow: `0 0 15px ${colors[i % 4]}`,
                          filter: 'blur(1px)'
                        }}
                        animate={{
                          x: [
                            Math.cos(angle * Math.PI / 180) * radius,
                            Math.cos((angle + 360) * Math.PI / 180) * radius
                          ],
                          y: [
                            Math.sin(angle * Math.PI / 180) * radius,
                            Math.sin((angle + 360) * Math.PI / 180) * radius
                          ]
                        }}
                        transition={{
                          delay: 0.5 + (ring * 65 + i) * 0.003,
                          duration: 8 + ring * 2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                    );
                  }
                }
                return particles;
              })()}

              {/* Expanding burst */}
              {[...Array(getOptimalParticleCount(80))].map((_, i) => {
                const angle = (i / getOptimalParticleCount(80)) * Math.PI * 2;
                const distance = 140 + Math.random() * 340;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                    animate={{
                      x: x,
                      y: [y, y + 160],
                      scale: [0, 2, 1.7],
                      opacity: [0, 1, 0.9, 0],
                      rotate: [0, Math.random() * 360]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.006,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: `${12 + Math.random() * 10}px`,
                        height: '3px',
                        background: i % 2 === 0
                          ? 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.9), transparent)'
                          : 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.9), transparent)',
                        boxShadow: i % 2 === 0
                          ? '0 0 10px rgba(236, 72, 153, 0.8)'
                          : '0 0 10px rgba(251, 191, 36, 0.8)',
                        filter: 'blur(1px)'
                      }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-pink-50 drop-shadow-2xl mb-3">
              Happy Birthday!
            </h2>
            <p className="text-2xl text-pink-100 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}