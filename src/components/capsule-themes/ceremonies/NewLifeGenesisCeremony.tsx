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
 * Duration: 20 seconds
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
  const [stage, setStage] = useState<'void' | 'heartbeat' | 'ignition' | 'formation' | 'waters' | 'awakening' | 'radiance' | 'outro'>('void');

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
      { time: 20000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

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
              opacity: [0.15, 0.4, 0.15],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
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
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
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
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 4: WATERS - Ocean floods the world */}
              <AnimatePresence>
                {(stage === 'waters' || stage === 'awakening' || stage === 'radiance') && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 42% 35%, #7dd3fc 0%, #38bdf8 15%, #0ea5e9 30%, #0284c7 50%, #0369a1 70%, #075985 85%, #0c4a6e 100%)',
                      borderRadius: '50%'
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: 1,
                      scale: 1.1
                    }}
                    transition={{ duration: 2.5, ease: smoothEase }}
                  />
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
                    {/* Continent 1 - Northern landmass */}
                    <motion.path
                      d="M 90,135 Q 115,120 145,118 Q 175,120 200,135 Q 220,155 225,180 Q 228,205 218,230 Q 203,250 178,258 Q 153,262 130,252 Q 112,240 103,220 Q 96,200 92,175 Q 89,155 90,135 Z"
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
                        delay: 0.3, 
                        ease: cinematicEase 
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.8))'
                          : 'drop-shadow(0 0 8px rgba(6, 95, 70, 0.6))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* Continent 2 - Eastern landmass */}
                    <motion.path
                      d="M 240,100 Q 270,92 300,95 Q 330,105 350,125 Q 365,150 368,180 Q 368,210 353,235 Q 333,255 305,263 Q 277,268 250,258 Q 228,245 218,220 Q 212,195 215,170 Q 220,140 230,115 Q 235,105 240,100 Z"
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
                        delay: 0.6, 
                        ease: cinematicEase 
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))'
                          : 'drop-shadow(0 0 8px rgba(4, 120, 87, 0.6))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* Continent 3 - Southern landmass */}
                    <motion.path
                      d="M 135,270 Q 165,262 195,268 Q 220,280 235,305 Q 242,335 235,365 Q 220,390 195,402 Q 168,410 140,402 Q 115,388 102,363 Q 95,335 98,305 Q 105,280 118,268 Q 125,265 135,270 Z"
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
                          ? 'drop-shadow(0 0 12px rgba(132, 204, 22, 0.8))'
                          : 'drop-shadow(0 0 8px rgba(77, 124, 15, 0.6))',
                        transformOrigin: '50% 50%'
                      }}
                    />

                    {/* Continent 4 - Southwestern landmass */}
                    <motion.path
                      d="M 295,250 Q 320,243 345,248 Q 365,260 375,285 Q 380,310 372,335 Q 358,355 335,365 Q 310,372 285,362 Q 265,348 258,325 Q 254,300 260,275 Q 268,255 280,245 Q 287,242 295,250 Z"
                      fill={stage === 'radiance' ? '#65a30d' : '#3f6212'}
                      initial={{ opacity: 0, scale: 0, x: 225, y: 225 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      transition={{ 
                        duration: 2.5, 
                        delay: 1.2, 
                        ease: cinematicEase 
                      }}
                      style={{
                        filter: stage === 'radiance'
                          ? 'drop-shadow(0 0 12px rgba(101, 163, 13, 0.8))'
                          : 'drop-shadow(0 0 8px rgba(63, 98, 18, 0.6))',
                        transformOrigin: '50% 50%'
                      }}
                    />

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

              {/* Atmospheric clouds forming */}
              <AnimatePresence>
                {(stage === 'awakening' || stage === 'radiance') && (
                  <>
                    {[...Array(getOptimalParticleCount(15))].map((_, i) => {
                      const size = 50 + Math.random() * 80;
                      return (
                        <motion.div
                          key={`cloud-${i}`}
                          className="absolute rounded-full"
                          style={{
                            width: `${size}px`,
                            height: `${size * 0.6}px`,
                            background: 'rgba(255, 255, 255, 0.5)',
                            filter: 'blur(15px)',
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            zIndex: 5
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0.6, 0.4],
                            scale: [0, 1.2, 1],
                            x: [(Math.random() - 0.5) * 120]
                          }}
                          transition={{
                            opacity: { duration: 2, delay: 1 + i * 0.1 },
                            scale: { duration: 2.5, delay: 1 + i * 0.1, ease: cinematicEase },
                            x: { 
                              duration: 4 + Math.random() * 3,
                              delay: 2,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut'
                            }
                          }}
                        />
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

            </div>

            {/* Planet atmospheric glow - evolves with stage */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                width: '450px',
                height: '450px',
                boxShadow: stage === 'radiance'
                  ? '0 0 80px rgba(16, 185, 129, 1), 0 0 160px rgba(34, 197, 94, 0.9), 0 0 240px rgba(132, 204, 22, 0.7)'
                  : stage === 'awakening'
                  ? '0 0 50px rgba(16, 185, 129, 0.8), 0 0 100px rgba(34, 197, 94, 0.6)'
                  : stage === 'waters'
                  ? '0 0 50px rgba(14, 165, 233, 0.8), 0 0 100px rgba(56, 189, 248, 0.6)'
                  : '0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(249, 115, 22, 0.6)'
              }}
              animate={{
                boxShadow: stage === 'radiance'
                  ? [
                      '0 0 80px rgba(16, 185, 129, 1), 0 0 160px rgba(34, 197, 94, 0.9), 0 0 240px rgba(132, 204, 22, 0.7)',
                      '0 0 100px rgba(16, 185, 129, 1), 0 0 200px rgba(34, 197, 94, 1), 0 0 300px rgba(132, 204, 22, 0.8)',
                      '0 0 80px rgba(16, 185, 129, 1), 0 0 160px rgba(34, 197, 94, 0.9), 0 0 240px rgba(132, 204, 22, 0.7)'
                    ]
                  : undefined
              }}
              transition={{
                duration: 2.5,
                repeat: stage === 'radiance' ? Infinity : 0,
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
                    height: ['8px', '12px', '8px']
                  }}
                  transition={{
                    scaleX: { duration: 1, delay: i * 0.008, ease: 'easeOut' },
                    opacity: { duration: 1, delay: i * 0.008 },
                    height: { duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' }
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
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
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
