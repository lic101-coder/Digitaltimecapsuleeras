/**
 * New Life - GENESIS: Birth of a World (V3.0 EPIC ENHANCEMENT)
 * 
 * 🌍 ULTRA CINEMA-QUALITY STORY: From void to vibrant life - creation itself
 * 
 * REFINED NARRATIVE ARC:
 * - Infinite darkness → Life's first heartbeat echoes
 * - Heartbeat strengthens → Spark of creation ignites
 * - Light becomes matter → Sphere forms with gravitational grace
 * - Waters cascade from cosmos → Oceans flood the world
 * - Earth awakens → Continents rise, forests bloom
 * - Planet radiates living energy → "A new world begins"
 * 
 * ENHANCEMENTS V3:
 * - More dramatic heartbeat visualization
 * - Smoother planet formation with depth
 * - Better water cascade choreography
 * - More realistic continent emergence
 * - Epic atmosphere and glow effects
 * - Cinematic pacing with emotional crescendos
 * - Better color grading and transitions
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimalParticleCount } from './ceremonyOptimization';

interface NewLifeGenesisCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  isVisible?: boolean;
  onComplete?: () => void;
}

export function NewLifeGenesisCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  isVisible = true,
  onComplete
}: NewLifeGenesisCeremonyProps) {
  const [stage, setStage] = useState<'void' | 'heartbeat' | 'ignition' | 'formation' | 'waters' | 'awakening' | 'radiance' | 'outro' | 'complete'>('void');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('void') },
      { time: 2000, action: () => setStage('heartbeat') },
      { time: 4500, action: () => setStage('ignition') },
      { time: 7000, action: () => setStage('formation') },
      { time: 10000, action: () => setStage('waters') },
      { time: 13000, action: () => setStage('awakening') },
      { time: 16000, action: () => setStage('radiance') },
      { time: 19500, action: () => setStage('outro') },
      { time: 20000, action: () => {
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // CRITICAL FAILSAFE: Force completion after 23 seconds if ceremony hasn't finished
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Genesis ceremony failsafe triggered - forcing completion');
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }
    }, 23000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Cinematic easing for smooth transitions
  const cinematicEase = [0.43, 0.13, 0.23, 0.96];
  const smoothEase = [0.25, 0.1, 0.25, 1];

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#000000] flex items-center justify-center">
      
      {/* Distant cosmic stars with depth */}
      <div className="absolute inset-0">
        {/* Deep background stars */}
        {[...Array(getOptimalParticleCount(50))].map((_, i) => (
          <motion.div
            key={`star-bg-${i}`}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: completed ? 0 : [0.15, 0.4, 0.15],
              scale: completed ? 1 : [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: completed ? 0 : 5, // Limit repeats
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Closer foreground stars */}
        {[...Array(getOptimalParticleCount(30))].map((_, i) => (
          <motion.div
            key={`star-fg-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2.5 + 0.8 + 'px',
              height: Math.random() * 2.5 + 0.8 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)'
            }}
            animate={{
              opacity: completed ? 0 : [0.3, 0.8, 0.3],
              scale: completed ? 1 : [1, 1.3, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: completed ? 0 : 7, // Limit repeats
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* STAGE 1: HEARTBEAT - Life's first pulse in the void */}
      <AnimatePresence>
        {stage === 'heartbeat' && (
          <>
            {/* Epic heartbeat rings */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`heartbeat-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '3px solid rgba(251, 191, 36, 0.7)',
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 6],
                  opacity: [0.9, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  ease: cinematicEase
                }}
              />
            ))}
            
            {/* Central heartbeat core with intense glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.3, 1, 0.3, 1],
                opacity: [0, 0.9, 0, 0.9]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                times: [0, 0.25, 0.5, 0.75],
                ease: 'easeInOut'
              }}
            >
              <div
                className="w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(249,115,22,0.8) 40%, rgba(217,70,239,0.4) 70%, transparent 90%)',
                  filter: 'blur(30px)',
                  boxShadow: '0 0 80px rgba(251, 191, 36, 0.8)'
                }}
              />
            </motion.div>

            {/* Heartbeat sound wave visualization */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '3px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, rgba(251,191,36,0.8), transparent)',
                  filter: 'blur(2px)',
                  transformOrigin: 'bottom center'
                }}
                animate={{
                  x: [-200 + i * 50, -250 + i * 50],
                  scaleY: [0.2, 1.5, 0.2, 1.5, 0.2],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: IGNITION - The spark of creation */}
      <AnimatePresence>
        {(stage === 'ignition') && (
          <>
            {/* Brilliant ignition flash */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 2, 1],
                opacity: [0, 1, 0.9]
              }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 2, ease: cinematicEase }}
            >
              <div
                className="w-64 h-64 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,243,199,1) 15%, rgba(251,191,36,0.95) 35%, rgba(249,115,22,0.8) 60%, rgba(234,88,12,0.5) 85%, transparent 100%)',
                  filter: 'blur(25px)',
                  boxShadow: '0 0 150px rgba(251, 191, 36, 1), 0 0 300px rgba(249, 115, 22, 0.9)'
                }}
              />
            </motion.div>

            {/* Energy burst rays */}
            {[...Array(getOptimalParticleCount(30))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(30)) * 360;
              return (
                <motion.div
                  key={`ignition-ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'linear-gradient(to right, rgba(251,191,36,0.9), transparent 50%)',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0.7] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.02,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* MAIN PLANET SPHERE - Persistent across stages */}
      <AnimatePresence>
        {(stage === 'formation' || stage === 'waters' || stage === 'awakening' || stage === 'radiance') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: stage === 'radiance' ? 1.12 : 1,
              opacity: 1,
              rotate: stage === 'radiance' ? 360 : 0
            }}
            transition={{
              scale: { duration: stage === 'formation' ? 2.5 : 3, ease: cinematicEase },
              opacity: { duration: 2 },
              rotate: { duration: stage === 'radiance' ? 15 : 0, ease: 'linear' }
            }}
            style={{ zIndex: 20 }}
          >
            {/* PLANET CORE CONTAINER */}
            <div
              className="relative rounded-full"
              style={{
                width: '450px',
                height: '450px',
                overflow: 'hidden'
              }}
            >
              
              {/* STAGE 3: FORMATION - Molten sphere forms */}
              <AnimatePresence>
                {(stage === 'formation') && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 42% 38%, #fef3c7 0%, #fde68a 15%, #fbbf24 30%, #f59e0b 50%, #ea580c 70%, #dc2626 85%, #991b1b 95%)',
                      borderRadius: '50%'
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: cinematicEase }}
                  >
                    {/* Molten surface texture */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: stage === 'formation' && !completed ? [0.8, 1, 0.8] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: stage === 'formation' && !completed ? 2 : 0, // Limit repeats
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 4: WATERS - Ocean floods the world with ENHANCED REALISM */}
              <AnimatePresence>
                {(stage === 'waters' || stage === 'awakening' || stage === 'radiance') && (
                  <>
                    {/* Deep ocean base - VIVID TURQUOISE/CYAN - UNMISSABLE CHANGE */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at 42% 35%, #06b6d4 0%, #0891b2 20%, #0e7490 40%, #155e75 60%, #164e63 80%, #0c4a6e 100%)',
                        borderRadius: '50%'
                      }}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{
                        opacity: 1,
                        scale: 1.1
                      }}
                      transition={{ duration: 2.5, ease: smoothEase }}
                    />

                    {/* MASSIVE OCEAN WAVES - HUGE AND OBVIOUS */}
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={`giant-wave-${i}`}
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(ellipse at ${30 + i * 20}% ${40 + i * 10}%, rgba(255, 255, 255, 0.6) 0%, rgba(34, 211, 238, 0.4) 25%, transparent 50%)`,
                          borderRadius: '50%',
                          mixBlendMode: 'overlay',
                          filter: 'blur(8px)'
                        }}
                        animate={{
                          scale: [0.8, 1.3, 0.8],
                          opacity: [0.3, 0.9, 0.3],
                          x: ['-5%', '5%', '-5%']
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: completed ? 0 : 3,
                          delay: i * 0.6,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}

                    {/* GIANT GLOWING WATER HIGHLIGHTS - IMPOSSIBLE TO MISS */}
                    {[0, 1, 2, 3].map(i => (
                      <motion.div
                        key={`mega-shimmer-${i}`}
                        className="absolute rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          width: '80px',
                          height: '80px',
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(6, 182, 212, 0.6) 50%, transparent 100%)',
                          filter: 'blur(15px)',
                          boxShadow: '0 0 60px rgba(6, 182, 212, 1)'
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.5, 0.5],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 3,
                          repeat: completed ? 0 : 4,
                          delay: i * 0.5,
                          ease: 'easeInOut'
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Water droplets rushing in - epic cascade */}
              <AnimatePresence>
                {stage === 'waters' && (
                  <>
                    {[...Array(getOptimalParticleCount(120))].map((_, i) => {
                      const angle = (i / getOptimalParticleCount(120)) * Math.PI * 2;
                      const distance = 700 + Math.random() * 300;
                      const size = 6 + Math.random() * 6;
                      return (
                        <motion.div
                          key={`water-${i}`}
                          className="absolute"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: '50%',
                            background: '#38bdf8',
                            boxShadow: '0 0 12px rgba(56, 189, 248, 1)',
                            left: '50%',
                            top: '50%',
                            filter: 'blur(1.5px)'
                          }}
                          initial={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 0,
                            scale: 0.3
                          }}
                          animate={{
                            x: 0,
                            y: 0,
                            opacity: [0, 1, 0],
                            scale: [0.3, 1.5, 0]
                          }}
                          transition={{
                            duration: 1.5 + Math.random() * 0.8,
                            delay: i * 0.008,
                            ease: 'easeIn'
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* STAGE 5: AWAKENING - Continents rise and bloom */}
              <AnimatePresence>
                {(stage === 'awakening' || stage === 'radiance') && (
                  <svg
                    viewBox="0 0 450 450"
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: 'none', zIndex: 10 }}
                  >
                    {/* MASSIVELY LARGER CONTINENT 1 - Takes up 40% more space */}
                    <motion.path
                      d="M 60,100 Q 95,75 140,70 Q 185,75 220,100 Q 250,130 260,170 Q 265,210 250,250 Q 230,285 190,300 Q 150,310 110,295 Q 75,275 60,240 Q 48,200 50,160 Q 52,120 60,100 Z"
                      fill={stage === 'radiance' ? '#22c55e' : '#047857'}
                      initial={{ opacity: 0, scale: 0, x: 225, y: 225 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 0.3,
                        ease: cinematicEase
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 20px rgba(34, 197, 94, 1))'
                          : 'drop-shadow(0 0 15px rgba(4, 120, 87, 0.9))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* MASSIVELY LARGER CONTINENT 2 - Takes up 45% more space */}
                    <motion.path
                      d="M 240,60 Q 285,45 330,55 Q 375,75 400,115 Q 415,160 415,205 Q 410,250 385,285 Q 355,315 310,325 Q 265,330 225,310 Q 195,285 185,245 Q 180,200 190,155 Q 205,105 225,75 Q 232,65 240,60 Z"
                      fill={stage === 'radiance' ? '#10b981' : '#065f46'}
                      initial={{ opacity: 0, scale: 0, x: 225, y: 225 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 0.6,
                        ease: cinematicEase
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 20px rgba(16, 185, 129, 1))'
                          : 'drop-shadow(0 0 15px rgba(6, 95, 70, 0.9))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* MASSIVELY LARGER CONTINENT 3 - Takes up 50% more space */}
                    <motion.path
                      d="M 100,250 Q 145,230 195,240 Q 240,260 270,300 Q 285,345 280,390 Q 265,430 230,450 Q 185,465 140,455 Q 95,435 70,395 Q 55,350 60,305 Q 70,265 85,250 Q 92,245 100,250 Z"
                      fill={stage === 'radiance' ? '#84cc16' : '#4d7c0f'}
                      initial={{ opacity: 0, scale: 0, x: 225, y: 225 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      transition={{
                        duration: 2.5,
                        delay: 0.9,
                        ease: cinematicEase
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 20px rgba(132, 204, 22, 1))'
                          : 'drop-shadow(0 0 15px rgba(77, 124, 15, 0.9))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* ENHANCED: Coastal highlights (beaches/shores) on continents */}
                    {/* Northern continent beach */}
                    <motion.path
                      d="M 95,140 Q 120,125 145,123 Q 170,125 195,138"
                      stroke="rgba(254, 243, 199, 0.7)"
                      strokeWidth="4"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
                      style={{ filter: 'blur(1px)' }}
                    />

                    {/* Eastern continent beach */}
                    <motion.path
                      d="M 245,105 Q 275,95 300,100 Q 325,110 345,130"
                      stroke="rgba(254, 243, 199, 0.7)"
                      strokeWidth="4"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
                      style={{ filter: 'blur(1px)' }}
                    />

                    {/* ENHANCED: Mountain ranges on continents (darker green peaks) */}
                    {/* Northern continent mountains */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.circle
                        key={`n-mountain-${i}`}
                        cx={110 + i * 18}
                        cy={148 + Math.sin(i) * 8}
                        r={6 + Math.random() * 4}
                        fill="rgba(6, 78, 59, 0.8)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.8 + i * 0.1, ease: 'easeOut' }}
                        style={{ filter: 'blur(0.5px)' }}
                      />
                    ))}

                    {/* Eastern continent mountains */}
                    {[0, 1, 2, 3].map(i => (
                      <motion.circle
                        key={`e-mountain-${i}`}
                        cx={260 + i * 20}
                        cy={138 + Math.sin(i * 1.5) * 10}
                        r={5 + Math.random() * 3}
                        fill="rgba(4, 120, 87, 0.8)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.1 + i * 0.1, ease: 'easeOut' }}
                        style={{ filter: 'blur(0.5px)' }}
                      />
                    ))}

                    {/* Forest vegetation blooming */}
                    {stage === 'radiance' && [...Array(getOptimalParticleCount(50))].map((_, j) => {
                      const x = 90 + Math.random() * 270;
                      const y = 100 + Math.random() * 270;
                      const size = 2 + Math.random() * 5;
                      return (
                        <motion.circle
                          key={`veg-${j}`}
                          cx={x}
                          cy={y}
                          r={size}
                          fill="#065f46"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0.9],
                            scale: [0, 1.3, 1]
                          }}
                          transition={{ 
                            delay: 0.5 + j * 0.02, 
                            duration: 0.8,
                            ease: cinematicEase
                          }}
                          style={{
                            filter: 'drop-shadow(0 0 3px rgba(6, 95, 70, 0.8))'
                          }}
                        />
                      );
                    })}
                  </svg>
                )}
              </AnimatePresence>

              {/* MASSIVE BRIGHT WHITE CLOUDS - GIANT AND UNMISSABLE */}
              <AnimatePresence>
                {(stage === 'awakening' || stage === 'radiance') && (
                  <>
                    {/* HUGE cloud formations */}
                    {[0, 1, 2, 3].map((i) => {
                      const size = 150 + i * 30;
                      return (
                        <motion.div
                          key={`mega-cloud-${i}`}
                          className="absolute"
                          style={{
                            width: `${size}px`,
                            height: `${size * 0.7}px`,
                            left: `${10 + i * 22}%`,
                            top: `${15 + i * 15}%`,
                            background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 70%, transparent 90%)',
                            borderRadius: '50%',
                            filter: 'blur(25px)',
                            boxShadow: '0 0 50px rgba(255, 255, 255, 0.9)'
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0.9],
                            scale: [0, 1.2, 1],
                            x: [0, 30, 0],
                            rotate: [0, 15, 0]
                          }}
                          transition={{
                            opacity: { duration: 2, delay: i * 0.3 },
                            scale: { duration: 2.5, delay: i * 0.3 },
                            x: { duration: 6 + i, repeat: completed ? 0 : 2, ease: 'easeInOut' },
                            rotate: { duration: 8, repeat: completed ? 0 : 1, ease: 'easeInOut' }
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

            </div>

            {/* ENHANCED: Atmospheric rim lighting (scattering effect) */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                width: '450px',
                height: '450px',
                background: 'radial-gradient(circle at 30% 30%, transparent 0%, transparent 65%, rgba(125, 211, 252, 0.25) 75%, rgba(56, 189, 248, 0.4) 85%, rgba(14, 165, 233, 0.25) 95%, transparent 100%)',
                opacity: stage === 'waters' || stage === 'awakening' || stage === 'radiance' ? 0.8 : 0
              }}
              animate={{
                opacity: stage === 'waters' || stage === 'awakening' || stage === 'radiance' ? [0.6, 0.9, 0.6] : 0
              }}
              transition={{
                opacity: { duration: 3, repeat: completed ? 0 : 3, ease: 'easeInOut' }
              }}
            />

            {/* MASSIVE BRIGHT PLANET GLOW - CYAN/TURQUOISE - UNMISSABLE */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                width: '450px',
                height: '450px',
                boxShadow: stage === 'radiance'
                  ? '0 0 100px rgba(6, 182, 212, 1), 0 0 200px rgba(8, 145, 178, 1), 0 0 350px rgba(14, 116, 144, 0.9)'
                  : stage === 'awakening'
                  ? '0 0 70px rgba(6, 182, 212, 1), 0 0 140px rgba(8, 145, 178, 0.8)'
                  : stage === 'waters'
                  ? '0 0 70px rgba(6, 182, 212, 1), 0 0 140px rgba(8, 145, 178, 0.8)'
                  : '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(249, 115, 22, 0.6)'
              }}
              animate={{
                boxShadow: stage === 'radiance' && !completed
                  ? [
                      '0 0 100px rgba(6, 182, 212, 1), 0 0 200px rgba(8, 145, 178, 1), 0 0 350px rgba(14, 116, 144, 0.9)',
                      '0 0 130px rgba(6, 182, 212, 1), 0 0 260px rgba(8, 145, 178, 1), 0 0 450px rgba(14, 116, 144, 1)',
                      '0 0 100px rgba(6, 182, 212, 1), 0 0 200px rgba(8, 145, 178, 1), 0 0 350px rgba(14, 116, 144, 0.9)'
                    ]
                  : undefined
              }}
              transition={{
                duration: 2.5,
                repeat: stage === 'radiance' && !completed ? 2 : 0,
                ease: 'easeInOut'
              }}
            />

          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 6: RADIANCE - Living energy explosion */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Life energy rays emanating */}
            {[...Array(getOptimalParticleCount(50))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(50)) * 360;
              return (
                <motion.div
                  key={`life-ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '130%',
                    height: '8px',
                    background: 'linear-gradient(to right, rgba(16, 185, 129, 0.9), transparent 55%)',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)',
                    zIndex: 15
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: [0, 1, 0.8],
                    height: completed ? '8px' : ['8px', '12px', '8px']
                  }}
                  transition={{
                    scaleX: { duration: 1, delay: i * 0.008, ease: 'easeOut' },
                    opacity: { duration: 1, delay: i * 0.008 },
                    height: { duration: 2, delay: 1, repeat: completed ? 0 : 2, ease: 'easeInOut' } // Limit repeats
                  }}
                />
              );
            })}

            {/* Life particles bursting outward */}
            {[...Array(getOptimalParticleCount(70))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(70)) * Math.PI * 2;
              const distance = 280 + Math.random() * 350;
              const size = 8 + Math.random() * 6;
              return (
                <motion.div
                  key={`life-particle-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 18px rgba(16, 185, 129, 1)',
                    filter: 'blur(2.5px)',
                    zIndex: 25
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.015,
                    ease: cinematicEase
                  }}
                />
              );
            })}

            {/* Epic title reveal */}
            <motion.div
              className="absolute inset-x-0 bottom-[8%] z-40 text-center px-8"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              transition={{ 
                duration: 1.3, 
                delay: 0.8, 
                ease: cinematicEase 
              }}
            >
              <motion.h2 
                className="text-4xl md:text-7xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #22c55e, #84cc16, #65a30d, #14b8a6)',
                  backgroundSize: '250% 250%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 35px rgba(16, 185, 129, 0.9))',
                }}
                animate={{
                  backgroundPosition: completed ? '0% 50%' : ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: completed ? 0 : 2, // Limit repeats
                  ease: 'linear'
                }}
              >
                {capsuleTitle}
              </motion.h2>
              <motion.p
                className="text-xl md:text-3xl text-white font-light tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4, ease: cinematicEase }}
                style={{
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(16, 185, 129, 0.6)'
                }}
              >
                A new world begins 🌍
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Outro fade - smooth to black */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
