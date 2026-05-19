/**
 * Birthday - Balloon Celebration Ceremony (CLEAR & FUN)
 * 
 * Birthday balloons float up, multiply, then pop into brilliant radiance.
 * Features: Balloons rise from bottom → more balloons join → they bounce and sway
 * → balloons pop in sequence with sparkles → final massive radiance burst
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimalParticleCount } from './ceremonyOptimization';

interface BirthdayPartyCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function BirthdayPartyCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: BirthdayPartyCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'float1' | 'float2' | 'bounce' | 'pop' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 600, action: () => setStage('float1') },
      { time: 2200, action: () => setStage('float2') },
      { time: 4200, action: () => setStage('bounce') },
      { time: 7200, action: () => setStage('pop') },
      { time: 9200, action: () => setStage('radiance') },
      { time: 12500, action: () => setStage('outro') },
      { time: 13000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  const balloonColors = [
    { main: '#ef4444', light: '#fca5a5', dark: '#dc2626', shadow: 'rgba(239, 68, 68, 0.6)' },     // red
    { main: '#f59e0b', light: '#fcd34d', dark: '#d97706', shadow: 'rgba(245, 158, 11, 0.6)' },    // orange
    { main: '#eab308', light: '#fde047', dark: '#ca8a04', shadow: 'rgba(234, 179, 8, 0.6)' },     // yellow
    { main: '#22c55e', light: '#86efac', dark: '#16a34a', shadow: 'rgba(34, 197, 94, 0.6)' },     // green
    { main: '#3b82f6', light: '#93c5fd', dark: '#2563eb', shadow: 'rgba(59, 130, 246, 0.6)' },    // blue
    { main: '#a855f7', light: '#d8b4fe', dark: '#9333ea', shadow: 'rgba(168, 85, 247, 0.6)' },    // purple
    { main: '#ec4899', light: '#f9a8d4', dark: '#db2777', shadow: 'rgba(236, 72, 153, 0.6)' }     // pink
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0f0a1a] via-[#1a1028] to-[#0a0510]">
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #3a2050 0%, #1a1028 50%, #0f0a1a 100%)',
                'radial-gradient(ellipse at 50% 50%, #5a3080 0%, #1a1028 50%, #0f0a1a 100%)'
              ]
            : 'radial-gradient(ellipse at 50% 50%, #1a1028 0%, #0f0a1a 70%, #050208 100%)'
        }}
        transition={{ 
          duration: stage === 'radiance' ? 0.7 : 2,
          repeat: stage === 'radiance' ? Infinity : 0
        }}
      />

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
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-300 via-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
              Balloon Celebration
            </h1>
            <p className="text-purple-200/80 mt-3 text-base">Let's celebrate!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene */}
      <div className="absolute inset-0">
        
        {/* First wave of balloons */}
        <AnimatePresence>
          {(stage === 'float1' || stage === 'float2' || stage === 'bounce') && 
            [...Array(7)].map((_, i) => {
              const color = balloonColors[i];
              // PERFECTLY CENTERED: Spread 7 balloons evenly across the modal
              // Distribution: 15%, 25%, 35%, 45%, 55%, 65%, 75%
              const xPos = 15 + i * 10; // Start at 15%, increment by 10%
              
              return (
                <motion.div
                  key={`balloon-1-${i}`}
                  className="absolute z-30"
                  style={{
                    left: `${xPos}%`, // Percentage positioning relative to modal
                    bottom: '-120px', // Start from below the screen
                    transform: 'translateX(-50%)' // Center each balloon on its position
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0 }}
                  animate={stage === 'bounce' ? {
                    y: [`-${350 + (i % 3) * 35}px`, `-${365 + (i % 3) * 35}px`, `-${335 + (i % 3) * 35}px`, `-${365 + (i % 3) * 35}px`],
                    x: [0, 15, -10, 15],
                    rotate: [0, 8, -6, 8],
                    scale: 1,
                    opacity: 1
                  } : {
                    y: `-${350 + (i % 3) * 35}px`, // Float UP
                    x: [0, 10, -5, 10],
                    rotate: [0, 5, -3, 5],
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ 
                    scale: 0,
                    opacity: 0,
                    y: `-${550 + (i % 3) * 35}px` // Exit upwards
                  }}
                  transition={{
                    y: { duration: stage === 'bounce' ? 2.5 + i * 0.2 : 2, delay: i * 0.15, ease: stage === 'bounce' ? 'easeInOut' : 'easeOut', repeat: stage === 'bounce' ? Infinity : 0 },
                    x: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
                    rotate: { duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
                    opacity: { duration: 0.6, delay: i * 0.15 },
                    scale: { duration: 0.6, delay: i * 0.15 },
                    exit: { duration: 0.8, delay: i * 0.08 }
                  }}
                >
                  {/* Balloon string */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-80px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '2px',
                      height: '80px',
                      background: `linear-gradient(to bottom, ${color.dark}, rgba(255, 255, 255, 0.3))`,
                      transformOrigin: 'top center'
                    }}
                  />

                  {/* Balloon shine */}
                  <motion.div
                    className="absolute"
                    style={{
                      top: '20%',
                      left: '30%',
                      width: '30px',
                      height: '35px',
                      background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(4px)'
                    }}
                  />

                  {/* Balloon body */}
                  <div
                    style={{
                      width: '80px',
                      height: '95px',
                      background: `radial-gradient(ellipse at 35% 35%, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: `0 5px 25px ${color.shadow}, inset -10px -10px 20px rgba(0, 0, 0, 0.2)`,
                      position: 'relative'
                    }}
                  >
                    {/* Balloon knot */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '12px',
                        background: color.dark,
                        borderRadius: '50%',
                        boxShadow: `0 2px 6px ${color.shadow}`
                      }}
                    />
                  </div>
                </motion.div>
              );
            })
          }
        </AnimatePresence>

        {/* Second wave of balloons */}
        <AnimatePresence>
          {(stage === 'float2' || stage === 'bounce') && 
            [...Array(6)].map((_, i) => {
              const color = balloonColors[(i + 3) % balloonColors.length];
              // Second wave centered: 20%, 30%, 40%, 50%, 60%, 70%
              const xPos = 20 + i * 10; // Start at 20%, increment by 10%
              
              return (
                <motion.div
                  key={`balloon-2-${i}`}
                  className="absolute z-28"
                  style={{
                    left: `${xPos}%`,
                    bottom: '-120px', // Start from below the screen
                    transform: 'translateX(-50%)' // Center each balloon on its position
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0 }}
                  animate={stage === 'bounce' ? {
                    y: [`-${320 + (i % 2) * 40}px`, `-${335 + (i % 2) * 40}px`, `-${305 + (i % 2) * 40}px`, `-${335 + (i % 2) * 40}px`],
                    x: [0, -12, 8, -12],
                    rotate: [0, -7, 5, -7],
                    scale: 1,
                    opacity: 1
                  } : {
                    y: `-${320 + (i % 2) * 40}px`, // Float UP
                    x: [0, -8, 5, -8],
                    rotate: [0, -4, 3, -4],
                    opacity: 1,
                    scale: 1
                  }}
                  exit={{ 
                    scale: 0,
                    opacity: 0,
                    y: `-${520 + (i % 2) * 40}px` // Exit upwards
                  }}
                  transition={{
                    y: { duration: stage === 'bounce' ? 2.8 + i * 0.25 : 1.8, delay: i * 0.12, ease: stage === 'bounce' ? 'easeInOut' : 'easeOut', repeat: stage === 'bounce' ? Infinity : 0 },
                    x: { duration: 3.5 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
                    rotate: { duration: 3.5 + i * 0.25, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
                    opacity: { duration: 0.6, delay: i * 0.12 },
                    scale: { duration: 0.6, delay: i * 0.12 },
                    exit: { duration: 0.8, delay: 0.3 + i * 0.08 }
                  }}
                >
                  {/* Balloon string */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-80px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '2px',
                      height: '80px',
                      background: `linear-gradient(to bottom, ${color.dark}, rgba(255, 255, 255, 0.3))`,
                      transformOrigin: 'top center'
                    }}
                  />

                  {/* Balloon shine */}
                  <motion.div
                    className="absolute"
                    style={{
                      top: '20%',
                      left: '30%',
                      width: '30px',
                      height: '35px',
                      background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                      borderRadius: '50%',
                      filter: 'blur(4px)'
                    }}
                  />

                  {/* Balloon body */}
                  <div
                    style={{
                      width: '80px',
                      height: '95px',
                      background: `radial-gradient(ellipse at 35% 35%, ${color.light} 0%, ${color.main} 50%, ${color.dark} 100%)`,
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      boxShadow: `0 5px 25px ${color.shadow}, inset -10px -10px 20px rgba(0, 0, 0, 0.2)`,
                      position: 'relative'
                    }}
                  >
                    {/* Balloon knot */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '12px',
                        background: color.dark,
                        borderRadius: '50%',
                        boxShadow: `0 2px 6px ${color.shadow}`
                      }}
                    />
                  </div>
                </motion.div>
              );
            })
          }
        </AnimatePresence>

        {/* Balloon popping sparkles */}
        <AnimatePresence>
          {stage === 'pop' && (
            <>
              {/* Pop sparkles from each balloon position */}
              {[...Array(13)].map((_, balloonIdx) => {
                // Match the PERFECTLY CENTERED balloon positions
                const xPos = balloonIdx < 7 
                  ? 26 + balloonIdx * 8  // First wave: 26, 34, 42, 50, 58, 66, 74
                  : 27 + (balloonIdx - 7) * 10; // Second wave: 27, 37, 47, 57, 67, 77
                const yOffset = balloonIdx < 7 
                  ? (balloonIdx % 3) * 35
                  : ((balloonIdx - 7) % 2) * 40;
                
                // Generate sparkles for this balloon
                return [...Array(15)].map((_, sparkleIdx) => {
                  const angle = (sparkleIdx / 15) * Math.PI * 2;
                  const distance = 40 + Math.random() * 70;
                  const color = balloonColors[balloonIdx % balloonColors.length];
                  
                  return (
                    <motion.div
                      key={`sparkle-${balloonIdx}-${sparkleIdx}`}
                      className="absolute z-32 left-1/2 top-1/2"
                      initial={{ 
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 0
                      }}
                      animate={{
                        x: [(xPos - 50) * 10, (xPos - 50) * 10 + Math.cos(angle) * distance], // Convert % to pixels relative to center
                        y: [-yOffset, -yOffset + Math.sin(angle) * distance],
                        scale: [0, 2, 1.5, 0],
                        opacity: [0, 1, 0.8, 0],
                        rotate: [0, Math.random() * 360]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: balloonIdx * 0.1 + sparkleIdx * 0.02,
                        ease: 'easeOut'
                      }}
                    >
                      <div
                        style={{
                          width: `${8 + Math.random() * 8}px`,
                          height: '3px',
                          background: `linear-gradient(90deg, transparent, ${color.main}, transparent)`,
                          boxShadow: `0 0 10px ${color.shadow}`,
                          filter: 'blur(1px)'
                        }}
                      />
                    </motion.div>
                  );
                });
              }).flat()}
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
                const color = balloonColors[i % balloonColors.length];

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
                      background: `linear-gradient(to right, transparent, ${color.main.replace(')', ', 0.95)')} 50%, transparent)`,
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
                  opacity: [0, 1, 0.98],
                  rotate: [0, 180]
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              >
                <div
                  className="w-[48rem] h-[48rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 226, 226, 0.98) 5%, rgba(253, 230, 138, 0.96) 12%, rgba(134, 239, 172, 0.92) 20%, rgba(147, 197, 253, 0.88) 30%, rgba(216, 180, 254, 0.82) 42%, rgba(249, 168, 212, 0.72) 58%, rgba(251, 146, 60, 0.58) 76%, rgba(239, 68, 68, 0.38) 90%, transparent 98%)',
                    boxShadow: '0 0 500px rgba(168, 85, 247, 1), 0 0 700px rgba(236, 72, 153, 0.8)',
                    filter: 'blur(120px)'
                  }}
                />
              </motion.div>

              {/* Orbiting confetti pieces */}
              {(() => {
                const particles = [];
                for (let ring = 0; ring < 3; ring++) {
                  const radius = 200 + ring * 120;
                  const desktopCount = 50 + ring * 25;
                  const count = getOptimalParticleCount(desktopCount);
                  
                  for (let i = 0; i < count; i++) {
                    const angle = (i / count) * 360;
                    const color = balloonColors[i % balloonColors.length].main;
                    
                    particles.push(
                      <motion.div
                        key={`orbit-${ring}-${i}`}
                        className="absolute"
                        style={{
                          width: i % 3 === 0 ? '12px' : '8px',
                          height: i % 3 === 0 ? '8px' : '12px',
                          borderRadius: i % 2 === 0 ? '50%' : '2px',
                          background: color,
                          boxShadow: `0 0 15px ${color}`,
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
                          ],
                          rotate: [0, 360]
                        }}
                        transition={{
                          delay: 0.5 + (ring * 75 + i) * 0.003,
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
              {[...Array(getOptimalParticleCount(90))].map((_, i) => {
                const angle = (i / getOptimalParticleCount(90)) * Math.PI * 2;
                const distance = 140 + Math.random() * 340;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const color = balloonColors[i % balloonColors.length].main;

                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                    animate={{
                      x: x,
                      y: [y, y + 160],
                      scale: [0, 2.2, 1.8],
                      opacity: [0, 1, 0.9, 0],
                      rotate: [0, Math.random() * 720]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.006,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: i % 2 === 0 ? '16px' : '12px',
                        height: i % 2 === 0 ? '12px' : '16px',
                        borderRadius: i % 3 === 0 ? '50%' : '2px',
                        background: color,
                        boxShadow: `0 0 12px ${color}`,
                        filter: 'brightness(1.2)'
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
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
              Let's Celebrate!
            </h2>
            <p className="text-2xl text-purple-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}