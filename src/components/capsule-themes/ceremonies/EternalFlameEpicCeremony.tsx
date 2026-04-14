/**
 * Eternal Flame - Firefly Symphony Ceremony ✨🌟
 * 
 * COMPLETELY FIXED - Realistic fireflies, smooth animations, perfect positioning
 * 
 * FIXES:
 * - Fireflies stay ON SCREEN (10-90% range)
 * - REALISTIC firefly appearance (teardrop shape, yellow-green glow)
 * - SMOOTH animations with proper easing
 * - No bunching or off-screen issues
 * - Natural firefly blinking/pulsing
 * - Proper layered sphere formation
 * 
 * Duration: 14 seconds
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  isMobile, 
  getOptimalParticleCount, 
  getOptimalBlur, 
  getPerformanceStyle,
  getOptimalRayCount 
} from './ceremonyOptimization';

interface EternalFlameEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function EternalFlameEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: EternalFlameEpicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'rising' | 'swarm' | 'pulse' | 'release' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('rising') },
      { time: 4500, action: () => setStage('swarm') },
      { time: 7500, action: () => setStage('pulse') },
      { time: 10000, action: () => setStage('release') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 13500, action: () => setStage('outro') },
      { time: 14000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate fireflies with SAFE positioning (stays on screen)
  const fireflies = useMemo(() => {
    const count = getOptimalParticleCount(180);
    return Array.from({ length: count }, (_, i) => {
      const layer = i % 3; // 0=inner, 1=mid, 2=outer
      
      return {
        id: i,
        // START: Bottom of screen, well within bounds
        startX: 15 + Math.random() * 70, // 15-85%
        startY: 92 + Math.random() * 6,   // 92-98%
        
        // Rising speed
        riseSpeed: 2.8 + Math.random() * 1.5,
        
        // Gentle sway amount
        swayAmount: (Math.random() - 0.5) * 20,
        
        // Size variation
        size: 0.8 + Math.random() * 0.5,
        
        // Timing
        delay: i * 0.02,
        pulseDelay: Math.random() * 1.5,
        pulseSpeed: 1.2 + Math.random() * 0.8,
        
        // Layer for sphere
        layer: layer,
        
        // Firefly color (yellow-green realistic)
        color: i % 4 === 0 ? '#d4ff00' : i % 4 === 1 ? '#e8ff40' : i % 4 === 2 ? '#f0ff60' : '#ffff80'
      };
    });
  }, []);

  // Calculate positions - KEEP ON SCREEN
  const calculatePositions = (firefly: typeof fireflies[0]) => {
    // Rising: gentle upward with sway, STAYS IN 15-85% X range
    const risingX = Math.max(15, Math.min(85, firefly.startX + firefly.swayAmount));
    const risingY = firefly.startY - 45; // Move up but not too much
    
    // Swarm: sphere at center, different radius per layer
    const swarmAngle = (firefly.id / fireflies.length) * Math.PI * 2;
    let swarmRadius;
    
    if (firefly.layer === 0) {
      swarmRadius = 3 + (firefly.id % 3) * 1.5; // Inner: 3-7.5vh
    } else if (firefly.layer === 1) {
      swarmRadius = 8 + (firefly.id % 4) * 1.8; // Mid: 8-15vh
    } else {
      swarmRadius = 16 + (firefly.id % 5) * 2; // Outer: 16-26vh
    }
    
    // Center at 50%, 45%
    const swarmX = 50 + Math.cos(swarmAngle) * swarmRadius;
    const swarmY = 45 + Math.sin(swarmAngle) * swarmRadius * 0.7;
    
    // Release: spread outward but STAY ON SCREEN (20-80% range)
    const releaseAngle = swarmAngle;
    const releaseSpread = 20 + firefly.layer * 8;
    let releaseX = swarmX + Math.cos(releaseAngle) * releaseSpread;
    let releaseY = swarmY + Math.sin(releaseAngle) * releaseSpread - 25;
    
    // Clamp to screen bounds
    releaseX = Math.max(20, Math.min(80, releaseX));
    releaseY = Math.max(10, Math.min(85, releaseY));
    
    return { risingX, risingY, swarmX, swarmY, releaseX, releaseY };
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#0f0f22]">
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #2a2550 0%, #0a0a1a 50%, #050510 100%)',
                'radial-gradient(ellipse at 50% 50%, #353a70 0%, #0a0a1a 50%, #050510 100%)'
              ]
            : stage === 'pulse'
            ? 'radial-gradient(ellipse at 50% 45%, #1a1a35 0%, #0a0a1a 60%, #050510 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #0f0f22 0%, #0a0a1a 70%, #050510 100%)'
        }}
        transition={{ 
          duration: stage === 'radiance' ? 0.6 : 1.8,
          repeat: stage === 'radiance' ? Infinity : 0,
          ease: 'easeInOut'
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: getOptimalParticleCount(60) }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 2.5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Ambient glow at swarm center */}
      <AnimatePresence>
        {(stage === 'swarm' || stage === 'pulse') && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: stage === 'pulse' ? [0.5, 0.85, 0.5] : 0.5,
              scale: stage === 'pulse' ? [1, 1.5, 1] : 1
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              opacity: { duration: stage === 'pulse' ? 1.5 : 2, repeat: stage === 'pulse' ? Infinity : 0 },
              scale: { duration: stage === 'pulse' ? 1.5 : 2, repeat: stage === 'pulse' ? Infinity : 0 },
              ease: 'easeInOut'
            }}
          >
            <div
              style={{
                width: isMobile() ? '350px' : '550px',
                height: isMobile() ? '350px' : '550px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 255, 80, 0.4) 0%, rgba(200, 240, 60, 0.25) 40%, rgba(180, 220, 50, 0.1) 70%, transparent 90%)',
                filter: `blur(${getOptimalBlur(80)}px)`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-100 drop-shadow-2xl">
              Firefly Symphony
            </h1>
            <p className="text-amber-200/80 mt-3 text-base">A thousand lights unite</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        
        {/* REALISTIC FIREFLIES */}
        <AnimatePresence>
          {(stage === 'rising' || stage === 'swarm' || stage === 'pulse' || stage === 'release') && (
            <>
              {fireflies.map((firefly) => {
                const { risingX, risingY, swarmX, swarmY, releaseX, releaseY } = calculatePositions(firefly);
                
                // Current target position
                let targetX = risingX;
                let targetY = risingY;
                
                if (stage === 'swarm' || stage === 'pulse' || stage === 'release') {
                  targetX = stage === 'release' ? releaseX : swarmX;
                  targetY = stage === 'release' ? releaseY : swarmY;
                }
                
                return (
                  <motion.div
                    key={`firefly-${firefly.id}`}
                    className="absolute z-30"
                    initial={{
                      left: `${firefly.startX}%`,
                      top: `${firefly.startY}%`,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      left: `${targetX}%`,
                      top: `${targetY}%`,
                      opacity: stage === 'release' 
                        ? [1, 1, 0.8, 0] 
                        : [0, 0.9, 1],
                      scale: stage === 'release' 
                        ? [firefly.size, firefly.size * 2.5, firefly.size * 2, 0]
                        : stage === 'pulse' 
                        ? [firefly.size, firefly.size * 1.6, firefly.size] 
                        : firefly.size
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.3 }
                    }}
                    transition={{
                      left: { 
                        duration: stage === 'release' 
                          ? 0.9 
                          : stage === 'swarm' || stage === 'pulse' 
                          ? 3 
                          : firefly.riseSpeed,
                        ease: stage === 'release' ? 'easeOut' : [0.45, 0.05, 0.55, 0.95],
                        delay: stage === 'release' ? firefly.id * 0.003 : (stage === 'swarm' || stage === 'pulse') ? 0 : firefly.delay
                      },
                      top: { 
                        duration: stage === 'release' 
                          ? 0.9 
                          : stage === 'swarm' || stage === 'pulse' 
                          ? 3 
                          : firefly.riseSpeed,
                        ease: stage === 'release' ? 'easeOut' : [0.45, 0.05, 0.55, 0.95],
                        delay: stage === 'release' ? firefly.id * 0.003 : (stage === 'swarm' || stage === 'pulse') ? 0 : firefly.delay
                      },
                      opacity: { 
                        duration: stage === 'release' ? 0.9 : 0.8,
                        ease: 'easeInOut',
                        delay: firefly.delay
                      },
                      scale: {
                        duration: stage === 'pulse' ? firefly.pulseSpeed : 0.8,
                        ease: 'easeInOut',
                        repeat: stage === 'pulse' ? Infinity : 0,
                        delay: stage === 'pulse' ? firefly.pulseDelay : firefly.delay
                      }
                    }}
                    style={{
                      ...getPerformanceStyle()
                    }}
                  >
                    {/* REALISTIC FIREFLY - Teardrop shape with glow */}
                    
                    {/* Outer glow */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${stage === 'release' ? 50 : 36}px`,
                        height: `${stage === 'release' ? 50 : 36}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${firefly.color}60 0%, ${firefly.color}30 50%, transparent 80%)`,
                        filter: `blur(${getOptimalBlur(10)}px)`
                      }}
                    />

                    {/* Middle glow - pulsing for realism */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        width: `${stage === 'release' ? 32 : 24}px`,
                        height: `${stage === 'release' ? 32 : 24}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${firefly.color}aa 0%, ${firefly.color}55 60%, transparent 85%)`,
                        filter: `blur(${getOptimalBlur(6)}px)`
                      }}
                      animate={{
                        opacity: stage === 'pulse' ? [0.7, 1, 0.7] : 0.85,
                        scale: stage === 'pulse' ? [0.9, 1.3, 0.9] : 1
                      }}
                      transition={{
                        duration: firefly.pulseSpeed,
                        repeat: stage === 'pulse' ? Infinity : 0,
                        ease: 'easeInOut',
                        delay: firefly.pulseDelay
                      }}
                    />
                    
                    {/* Firefly body - teardrop/oval shape */}
                    <div
                      style={{
                        position: 'absolute',
                        width: `${stage === 'release' ? 20 : 16}px`,
                        height: `${stage === 'release' ? 22 : 18}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%', // Teardrop shape
                        background: `linear-gradient(180deg, ${firefly.color}ee 0%, ${firefly.color}dd 40%, ${firefly.color}aa 100%)`,
                        boxShadow: isMobile() 
                          ? `0 0 12px ${firefly.color}` 
                          : `0 0 20px ${firefly.color}dd, 0 0 35px ${firefly.color}88`,
                        filter: `blur(${getOptimalBlur(3)}px)`
                      }}
                    />

                    {/* Bright center - realistic flash */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        width: `${stage === 'release' ? 10 : 7}px`,
                        height: `${stage === 'release' ? 10 : 7}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background: '#ffffee',
                        boxShadow: '0 0 10px #fff, 0 0 15px #ffff80',
                        filter: 'blur(1.5px)'
                      }}
                      animate={{
                        opacity: stage === 'pulse' ? [0.6, 1, 0.6] : 0.9,
                        scale: stage === 'pulse' ? [0.8, 1.5, 0.8] : 1
                      }}
                      transition={{
                        duration: firefly.pulseSpeed,
                        repeat: stage === 'pulse' ? Infinity : 0,
                        ease: 'easeInOut',
                        delay: firefly.pulseDelay
                      }}
                    />

                    {/* Subtle trail during rising - only desktop */}
                    {!isMobile() && stage === 'rising' && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: '2px',
                          height: '20px',
                          marginLeft: '-1px',
                          background: `linear-gradient(to bottom, ${firefly.color}99, ${firefly.color}44, transparent)`,
                          filter: 'blur(1.5px)',
                          borderRadius: '50%'
                        }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scaleY: [1, 1.15, 1]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* RELEASE explosion */}
        <AnimatePresence>
          {stage === 'release' && (
            <>
              {/* Flash */}
              <motion.div
                className="absolute inset-0 z-35"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.4 }}
                style={{ background: 'rgba(230, 255, 120, 0.4)' }}
              />

              {/* Core burst */}
              <motion.div
                className="absolute z-34"
                style={{
                  left: '50%',
                  top: '45%',
                  transform: 'translate(-50%, -50%)',
                  ...getPerformanceStyle()
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 10, 12],
                  opacity: [1, 0.9, 0]
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div
                  style={{
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 200, 1) 0%, rgba(230, 255, 120, 0.9) 30%, rgba(200, 240, 80, 0.6) 65%, transparent 90%)',
                    boxShadow: '0 0 120px rgba(230, 255, 120, 1), 0 0 200px rgba(200, 240, 80, 0.8)',
                    filter: `blur(${getOptimalBlur(20)}px)`
                  }}
                />
              </motion.div>

              {/* Shockwaves */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`shock-${i}`}
                  className="absolute z-33"
                  style={{
                    left: '50%',
                    top: '45%',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    border: `${5 - i}px solid rgba(230, 255, 120, ${0.9 - i * 0.18})`,
                    boxShadow: `0 0 50px rgba(200, 240, 80, ${0.8 - i * 0.15})`,
                    transform: 'translate(-50%, -50%)',
                    ...getPerformanceStyle()
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 14],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.07,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {Array.from({ length: getOptimalRayCount(64) }).map((_, i) => {
              const angle = (i / getOptimalRayCount(64)) * 360;
              const colors = [
                'rgba(230, 255, 120, 1)', 
                'rgba(255, 255, 150, 1)', 
                'rgba(200, 240, 100, 1)', 
                'rgba(255, 255, 200, 1)'
              ];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 3 === 0 ? '11px' : i % 3 === 1 ? '8px' : '9px',
                    marginLeft: '-100vw',
                    marginTop: i % 3 === 0 ? '-5.5px' : i % 3 === 1 ? '-4px' : '-4.5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.96)')} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: `blur(${getOptimalBlur(2)}px)`,
                    ...getPerformanceStyle()
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 3.2, 3],
                    opacity: [0, 1, 0.96]
                  }}
                  transition={{
                    duration: 1.6,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Core */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 8.5, 8],
                opacity: [0, 1, 0.98],
                rotate: [0, 120]
              }}
              transition={{ duration: 1.9, ease: 'easeOut' }}
            >
              <div
                className="w-[56rem] h-[56rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 220, 0.99) 4%, rgba(245, 255, 180, 0.97) 11%, rgba(230, 255, 120, 0.93) 20%, rgba(210, 245, 90, 0.87) 32%, rgba(190, 230, 70, 0.78) 48%, rgba(170, 210, 60, 0.65) 68%, rgba(140, 180, 50, 0.45) 85%, transparent 98%)',
                  boxShadow: '0 0 650px rgba(230, 255, 120, 1), 0 0 850px rgba(200, 240, 80, 0.9)',
                  filter: `blur(${getOptimalBlur(140)}px)`
                }}
              />
            </motion.div>

            {/* Burst particles */}
            {Array.from({ length: getOptimalParticleCount(120) }).map((_, i) => {
              const angle = (i / getOptimalParticleCount(120)) * Math.PI * 2;
              const distance = 140 + Math.random() * 380;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#e6ff78', '#f0ff90', '#d4ff60', '#ffff99'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: colors[i % 4],
                    boxShadow: isMobile() ? `0 0 12px ${colors[i % 4]}` : `0 0 22px ${colors[i % 4]}`,
                    filter: `blur(${getOptimalBlur(1)}px)`,
                    ...getPerformanceStyle()
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 180],
                    scale: [0, 2.5, 2],
                    opacity: [0, 1, 0.95, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.3 + Math.random() * 1.2,
                    ease: 'easeOut',
                    delay: i * 0.006
                  }}
                />
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
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-50"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-amber-100 drop-shadow-2xl mb-4">
              Symphony Complete
            </h2>
            <p className="text-3xl text-yellow-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}