/**
 * New Year's Eve - Firework Symphony Ceremony (PERFORMANCE OPTIMIZED)
 * 
 * CONCEPT: Epic choreographed fireworks display that builds from single sparks
 * to a massive pyrotechnic finale. Multiple types: rockets, chrysanthemums,
 * willows, palms, strobes, all perfectly timed. Grand finale spells "2026"
 * in the sky with golden fireworks
 * 
 * OPTIMIZATIONS:
 * - Clear old fireworks before new waves (prevents particle accumulation)
 * - Mobile: Reduced particle counts
 * - GPU-accelerated animations
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  isMobile,
  getOptimalParticleCount, 
  getOptimalBlur, 
  getPerformanceStyle,
  getOptimalRayCount 
} from './ceremonyOptimization';

interface NewYearFireworksCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  type: 'chrysanthemum' | 'willow' | 'palm' | 'strobe' | 'ring';
  size: 'small' | 'medium' | 'large';
  delay: number;
}

export function NewYearFireworksCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewYearFireworksCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'rockets' | 'wave1' | 'wave2' | 'wave3' | 'finale' | 'radiance' | 'outro'>('intro');
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('rockets') },
      { time: 3500, action: () => { setFireworks([]); setStage('wave1'); launchWave1(); } },
      { time: 7000, action: () => { setFireworks([]); setStage('wave2'); } },
      { time: 9500, action: () => { launchWave2(); } },
      { time: 12500, action: () => { setFireworks([]); setStage('wave3'); } },
      { time: 15000, action: () => { launchWave3(); } },
      { time: 17000, action: () => { setFireworks([]); setStage('finale'); } },
      { time: 19000, action: () => { setStage('radiance'); } },  // "2026" shows for 2 FULL seconds!
      { time: 22000, action: () => setStage('outro') },  // "HAPPY NEW YEAR!" shows for 3 FULL seconds!
      { time: 22500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  const launchWave1 = () => {
    // FIREWORKS MATCH ROCKET POSITIONS - Launch from ALL buildings!
    const buildingPositions = [5, 16, 27, 38, 49, 60, 71, 82, 93];
    const colors = ['#ff0040', '#00ff88', '#0088ff', '#ffaa00', '#ff00ff'];
    const wave: Firework[] = [];
    
    // Create fireworks at each building position
    buildingPositions.forEach((xPos, i) => {
      wave.push({
        id: Date.now() + i,
        x: xPos,
        y: 20 + (i % 3) * 10,  // Vary height slightly
        color: colors[i % colors.length],
        type: 'chrysanthemum',
        size: i % 2 === 0 ? 'large' : 'medium',
        delay: i * 0.12
      });
    });
    
    setFireworks(wave);
  };

  const launchWave2 = () => {
    // FIREWORKS MATCH ROCKET POSITIONS - Launch from ALL buildings!
    const buildingPositions = [5, 16, 27, 38, 49, 60, 71, 82, 93];
    const colors = ['#fbbf24', '#a855f7', '#22d3ee', '#f43f5e', '#10b981'];
    const wave: Firework[] = [];
    
    // Create fireworks at each building position
    buildingPositions.forEach((xPos, i) => {
      wave.push({
        id: Date.now() + i + 100,
        x: xPos,
        y: 15 + (i % 3) * 12,
        color: colors[i % colors.length],
        type: i % 3 === 0 ? 'willow' : i % 3 === 1 ? 'palm' : 'ring',
        size: 'medium',
        delay: i * 0.1
      });
    });
    
    setFireworks(prev => [...prev, ...wave]);
  };

  const launchWave3 = () => {
    // MASSIVE EPIC FINALE - Launch from ALL buildings! TRIPLE BURSTS!
    const buildingPositions = [5, 16, 27, 38, 49, 60, 71, 82, 93];
    const colors = ['#ff006e', '#8338ec', '#3a86ff', '#fb5607', '#ffbe0b', '#ff0040', '#00ff88', '#22d3ee'];
    const wave: Firework[] = [];
    
    // Create TRIPLE fireworks at each building position for EPIC finale!
    buildingPositions.forEach((xPos, i) => {
      // First burst
      wave.push({
        id: Date.now() + i + 200,
        x: xPos,
        y: 12 + (i % 4) * 10,
        color: colors[i % colors.length],
        type: i % 4 === 0 ? 'chrysanthemum' : i % 4 === 1 ? 'strobe' : i % 4 === 2 ? 'palm' : 'ring',
        size: 'large',
        delay: i * 0.08
      });
      
      // Second burst (staggered slightly higher and delayed)
      wave.push({
        id: Date.now() + i + 300,
        x: xPos + (i % 2 === 0 ? 3 : -3),  // Offset
        y: 25 + (i % 3) * 8,
        color: colors[(i + 2) % colors.length],
        type: i % 3 === 0 ? 'willow' : i % 3 === 1 ? 'chrysanthemum' : 'strobe',
        size: 'large',
        delay: i * 0.08 + 0.3
      });
      
      // THIRD burst (even more staggered for EPIC effect!)
      wave.push({
        id: Date.now() + i + 400,
        x: xPos + (i % 2 === 0 ? -2 : 2),
        y: 18 + (i % 4) * 7,
        color: colors[(i + 5) % colors.length],
        type: i % 4 === 0 ? 'palm' : i % 4 === 1 ? 'chrysanthemum' : i % 4 === 2 ? 'ring' : 'willow',
        size: 'medium',
        delay: i * 0.08 + 0.6
      });
    });
    
    setFireworks(prev => [...prev, ...wave]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
      {/* City skyline silhouette - FIXED WINDOW PLACEMENT */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10">
        {[
          { left: 0, width: 10, height: 75 },
          { left: 11, width: 9, height: 85 },
          { left: 21, width: 11, height: 68 },
          { left: 33, width: 8, height: 92 },
          { left: 42, width: 12, height: 78 },
          { left: 55, width: 9, height: 88 },
          { left: 65, width: 10, height: 72 },
          { left: 76, width: 11, height: 95 },
          { left: 88, width: 10, height: 82 }
        ].map((building, i) => (
          <div
            key={`building-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${building.left}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
              background: 'linear-gradient(to top, #0f172a, #1e293b)',
              clipPath: 'polygon(0 100%, 0 8%, 15% 8%, 15% 0, 85% 0, 85% 8%, 100% 8%, 100% 100%)'
            }}
          >
            {/* Building windows - PROPERLY POSITIONED INSIDE BUILDING */}
            {/* For a building at width W, windows must fit inside: x from 0 to W */}
            {/* Window grid: 2 columns × 3-4 rows, properly spaced */}
            {[
              { x: 20, y: 20 }, { x: 60, y: 20 },  // Top row
              { x: 20, y: 45 }, { x: 60, y: 45 },  // Middle row
              { x: 20, y: 70 }, { x: 60, y: 70 }   // Bottom row
            ].map((pos, j) => (
              <div
                key={`window-${j}`}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: '15%',
                  height: '10%',
                  background: Math.random() > 0.4 ? '#fbbf24' : 'transparent',
                  opacity: 0.7,
                  boxShadow: Math.random() > 0.4 ? '0 0 8px rgba(251, 191, 36, 0.6)' : 'none'
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Stars in night sky */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            opacity: 0.6
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 left-0 right-0 text-center z-20"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f43f5e, #8b5cf6, #22d3ee)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Firework Symphony
            </motion.h1>
            <p className="text-white text-2xl font-medium">🎆 Light Up the Sky 🎆</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROCKET LAUNCHES - WAVE 1 */}
      <AnimatePresence>
        {stage === 'rockets' && (
          <>
            {[...Array(5)].map((_, i) => (
              <div key={`rocket-${i}`}>
                {/* Rocket trail */}
                <motion.div
                  className="absolute z-15"
                  style={{
                    left: `${25 + i * 12}%`,
                    bottom: '15%',
                    width: '4px',
                    transformOrigin: 'bottom'
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: ['0px', '40vh'],
                    opacity: [0, 1, 0.6, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0), rgba(251, 191, 36, 0.8), rgba(251, 146, 60, 1))',
                      filter: 'blur(2px)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                    }}
                  />
                </motion.div>

                {/* Rocket tip */}
                <motion.div
                  className="absolute z-16"
                  style={{
                    left: `${25 + i * 12}%`,
                    bottom: '15%'
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: [0, '-40vh'],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    className="w-3 h-6 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #fef3c7, #fbbf24)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 1)'
                    }}
                  />
                </motion.div>

                {/* Sparks */}
                {[...Array(8)].map((_, j) => (
                  <motion.div
                    key={`spark-${i}-${j}`}
                    className="absolute z-14"
                    style={{
                      left: `${25 + i * 12}%`,
                      bottom: '15%'
                    }}
                    initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
                    animate={{
                      y: [0, -20 - j * 15],
                      x: [(Math.random() - 0.5) * 30],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.2 + j * 0.05,
                      ease: 'easeOut'
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                  </motion.div>
                ))}
              </div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ROCKET LAUNCHES - WAVE 2 */}
      <AnimatePresence>
        {stage === 'wave2' && (
          <>
            {[...Array(8)].map((_, i) => {
              const buildingPositions = [5, 16, 27, 38, 49, 60, 71, 82, 93];
              const launchX = buildingPositions[i % buildingPositions.length];
              return (
                <div key={`rocket-wave2-${i}`}>
                  {/* Rocket trail */}
                  <motion.div
                    className="absolute z-15"
                    style={{
                      left: `${launchX}%`,
                      bottom: '15%',
                      width: '5px',
                      transformOrigin: 'bottom'
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: ['0px', '35vh'],
                      opacity: [0, 1, 0.7, 0]
                    }}
                    transition={{
                      duration: 1.3,
                      delay: i * 0.15,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(to bottom, rgba(168, 85, 247, 0), rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 1))`,
                        filter: 'blur(2px)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)'
                      }}
                    />
                  </motion.div>

                  {/* Rocket tip */}
                  <motion.div
                    className="absolute z-16"
                    style={{
                      left: `${launchX}%`,
                      bottom: '15%'
                    }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                      y: [0, '-35vh'],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 1.3,
                      delay: i * 0.15,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      className="w-3 h-7 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #fae8ff, #a855f7)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 1)'
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* ROCKET LAUNCHES - WAVE 3 */}
      <AnimatePresence>
        {stage === 'wave3' && (
          <>
            {[...Array(12)].map((_, i) => {
              const buildingPositions = [5, 16, 27, 38, 49, 60, 71, 82, 93];
              const launchX = buildingPositions[i % buildingPositions.length];
              const colors = [
                { trail: 'rgba(239, 68, 68, 0.8)', tip: '#ef4444', shadow: 'rgba(239, 68, 68, 0.8)' },
                { trail: 'rgba(34, 211, 238, 0.8)', tip: '#22d3ee', shadow: 'rgba(34, 211, 238, 0.8)' },
                { trail: 'rgba(132, 204, 22, 0.8)', tip: '#84cc16', shadow: 'rgba(132, 204, 22, 0.8)' }
              ];
              const color = colors[i % 3];
              return (
                <div key={`rocket-wave3-${i}`}>
                  {/* Rocket trail */}
                  <motion.div
                    className="absolute z-15"
                    style={{
                      left: `${launchX}%`,
                      bottom: '15%',
                      width: '6px',
                      transformOrigin: 'bottom'
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: ['0px', '42vh'],
                      opacity: [0, 1, 0.8, 0]
                    }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.08,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(to bottom, transparent, ${color.trail})`,
                        filter: 'blur(2px)',
                        boxShadow: `0 0 20px ${color.shadow}`
                      }}
                    />
                  </motion.div>

                  {/* Rocket tip */}
                  <motion.div
                    className="absolute z-16"
                    style={{
                      left: `${launchX}%`,
                      bottom: '15%'
                    }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{
                      y: [0, '-42vh'],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.08,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      className="w-4 h-8 rounded-full"
                      style={{
                        background: `radial-gradient(circle, white, ${color.tip})`,
                        boxShadow: `0 0 25px ${color.tip}`
                      }}
                    />
                  </motion.div>

                  {/* Epic sparks */}
                  {[...Array(12)].map((_, j) => (
                    <motion.div
                      key={`spark-wave3-${i}-${j}`}
                      className="absolute z-14"
                      style={{
                        left: `${launchX}%`,
                        bottom: '15%'
                      }}
                      initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
                      animate={{
                        y: [0, -25 - j * 18],
                        x: [(Math.random() - 0.5) * 40],
                        opacity: [0, 1, 0.7, 0],
                        scale: [0, 1.2, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.08 + j * 0.03,
                        ease: 'easeOut'
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{
                          background: color.tip,
                          boxShadow: `0 0 10px ${color.tip}`
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* FIREWORKS DISPLAY */}
      <AnimatePresence>
        {fireworks.map((firework) => (
          <FireworkBurst key={firework.id} {...firework} />
        ))}
      </AnimatePresence>

      {/* GRAND FINALE - "2026" */}
      <AnimatePresence mode="wait">
        {stage === 'finale' && (
          <>
            {/* "2026" in fireworks - ULTRA LIGHTWEIGHT! */}
            {/* Each digit positioned to spell out 2026 across the sky */}
            {[
              { digit: '2', x: 15 },
              { digit: '0', x: 35 },
              { digit: '2', x: 55 },
              { digit: '6', x: 75 }
            ].map((item, index) => (
              <motion.div
                key={`digit-${index}`}
                className="absolute z-35"
                style={{
                  left: `${item.x}%`,
                  top: '25%'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.3, 1],
                  opacity: [0, 1, 1]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              >
                <motion.div
                  className="text-[10rem] font-black"
                  style={{
                    color: '#fbbf24',
                    textShadow: `
                      0 0 40px rgba(251, 191, 36, 1),
                      0 0 80px rgba(251, 191, 36, 0.8),
                      0 0 120px rgba(251, 191, 36, 0.6),
                      0 10px 40px rgba(0, 0, 0, 0.8)
                    `,
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.5)'
                  }}
                  animate={{
                    textShadow: [
                      '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.8)',
                      '0 0 60px rgba(251, 191, 36, 1), 0 0 120px rgba(251, 191, 36, 1)',
                      '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.8)'
                    ]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {item.digit}
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
            {/* 360° rainbow starburst */}
            {[...Array(getOptimalRayCount())].map((_, i) => {
              const rotation = (i * 360) / getOptimalRayCount();
              const colors = ['#ff0040', '#ff6b00', '#fbbf24', '#00ff88', '#00d4ff', '#8b5cf6', '#ff00ff'];
              const color = colors[i % colors.length];
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw',
                    height: '5px',
                    marginLeft: '-100vw',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.5],
                    scaleX: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.008,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to right, transparent, ${color}80 50%, transparent)`,
                      filter: 'blur(3px)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center radiance */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(251, 191, 36, 0.8), transparent)',
                  filter: 'blur(50px)'
                }}
              />
            </motion.div>

            {/* Celebration emojis orbiting */}
            {['🎆', '🎇', '✨', '🌟', '💫', '⭐'].map((emoji, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 180;
              return (
                <motion.div
                  key={`emoji-orbit-${i}`}
                  className="absolute text-7xl z-45"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    {emoji}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* "HAPPY NEW YEAR" text */}
            <motion.div
              className="absolute top-2/3 left-1/2 -translate-x-1/2 z-50 px-4"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                y: [20, 0, 0]
              }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f43f5e, #8b5cf6, #22d3ee, #fbbf24)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
                  filter: 'drop-shadow(0 4px 30px rgba(251, 191, 36, 0.6))'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                HAPPY NEW YEAR! 🎉
              </motion.h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for individual firework bursts
function FireworkBurst({ x, y, color, type, size, delay }: Firework) {
  // Get particle count based on size and mobile optimization
  const baseCount = size === 'large' ? 80 : size === 'medium' ? 50 : 30;
  const particleCount = getOptimalParticleCount(baseCount);
  const maxDistance = size === 'large' ? 100 : size === 'medium' ? 70 : 50;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-30"
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
    >
      {/* Center flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ 
          scale: [0, 3, 0], 
          opacity: [1, 0.8, 0] 
        }}
        transition={{ 
          duration: 0.6, 
          delay,
          ease: 'easeOut' 
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-12 h-12 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}, transparent)`,
            filter: 'blur(10px)'
          }}
        />
      </motion.div>

      {/* Burst particles based on type */}
      {type === 'chrysanthemum' && (
        <>
          {[...Array(particleCount)].map((_, i) => {
            const angle = (i * 360 / particleCount) * (Math.PI / 180);
            const distance = maxDistance + Math.random() * 20;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`
                }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 1.5,
                  delay,
                  ease: 'easeOut'
                }}
              />
            );
          })}
        </>
      )}

      {type === 'willow' && (
        <>
          {[...Array(particleCount)].map((_, i) => {
            const angle = (i * 360 / particleCount) * (Math.PI / 180);
            const distance = maxDistance;
            return (
              <motion.div
                key={`willow-${i}`}
                className="absolute w-1 h-12 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  background: `linear-gradient(to bottom, ${color}, transparent)`,
                  filter: 'blur(1px)'
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: angle * (180 / Math.PI) }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance + 40,
                  opacity: 0
                }}
                transition={{
                  duration: 2,
                  delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            );
          })}
        </>
      )}

      {type === 'palm' && (
        <>
          {[...Array(particleCount)].map((_, i) => {
            const angle = ((i * 360 / particleCount) - 90) * (Math.PI / 180);
            const distance = maxDistance * (0.7 + Math.random() * 0.6);
            return (
              <motion.div
                key={`palm-${i}`}
                className="absolute w-1 h-16 -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  background: `linear-gradient(to bottom, ${color}, transparent)`,
                  filter: 'blur(1px)'
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: angle * (180 / Math.PI) }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.abs(Math.sin(angle)) * distance + 50,
                  opacity: 0
                }}
                transition={{
                  duration: 2.2,
                  delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            );
          })}
        </>
      )}

      {type === 'ring' && (
        <>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2.5, 3],
              opacity: [1, 0.8, 0]
            }}
            transition={{
              duration: 1.5,
              delay,
              ease: 'easeOut'
            }}
          >
            <div
              className="rounded-full border-4"
              style={{
                width: `${maxDistance * 2}px`,
                height: `${maxDistance * 2}px`,
                borderColor: color,
                boxShadow: `0 0 20px ${color}`
              }}
            />
          </motion.div>
        </>
      )}

      {type === 'strobe' && (
        <>
          {[...Array(particleCount)].map((_, i) => {
            const angle = (i * 360 / particleCount) * (Math.PI / 180);
            const distance = maxDistance;
            return (
              <motion.div
                key={`strobe-${i}`}
                className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: [1, 0, 1, 0, 1, 0],
                  scale: [1, 1.5, 1, 1.5, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay,
                  ease: 'linear'
                }}
              />
            );
          })}
        </>
      )}
    </motion.div>
  );
}

// Helper function to get positions for drawing digits in fireworks
function getDigitPositions(digit: string): { x: number; y: number }[] {
  const patterns: Record<string, { x: number; y: number }[]> = {
    '0': [
      // Top
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      // Sides
      { x: 0, y: 1 }, { x: 4, y: 1 },
      { x: 0, y: 2 }, { x: 4, y: 2 },
      { x: 0, y: 3 }, { x: 4, y: 3 },
      // Bottom
      { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }
    ],
    '2': [
      // Top
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      // Top right
      { x: 4, y: 1 },
      // Middle
      { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
      // Bottom left
      { x: 0, y: 3 },
      // Bottom
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }
    ],
    '6': [
      // Top
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
      // Left side
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      // Middle
      { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
      // Bottom section
      { x: 0, y: 3 }, { x: 4, y: 3 },
      // Bottom
      { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }
    ]
  };

  return patterns[digit] || [];
}