/**
 * New Life - Cosmic Egg Ceremony 🥚🌌
 * 
 * Epic mythological birth from a celestial galaxy egg
 * 
 * SEQUENCE:
 * 1. Intro - Cosmic egg floats in void with opal shimmer
 * 2. Pulse - Egg pulses with internal light (something's inside)
 * 3. Crack - First cracks appear with golden light beams
 * 4. Shatter - Cracks multiply, light intensifies
 * 5. Hatch - Egg shatters revealing swirling galaxy/nebula
 * 6. Condense - Galaxy swirls and condenses into baby silhouette
 * 7. Radiance - Baby silhouette glows, stardust particles
 * 8. Outro - Gentle fade with lingering sparkles
 * 
 * QUALITY LEVEL: Matches Time Traveler Singularity
 * 
 * Duration: ~16 seconds
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getOptimalParticleCount, 
  getOptimalBlur,
  getPerformanceStyle,
  shouldRenderComplexEffect
} from './ceremonyOptimization';

interface NewLifeTreeOfLifeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface Crack {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  length: number;
  delay: number;
}

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface NebulaCloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
  rotation: number;
}

export function NewLifeTreeOfLifeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeTreeOfLifeCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'pulse' | 'crack' | 'shatter' | 'hatch' | 'condense' | 'radiance' | 'outro'>('intro');
  const [cracks, setCracks] = useState<Crack[]>([]);
  const [starParticles, setStarParticles] = useState<StarParticle[]>([]);
  const [nebulaClouds, setNebulaClouds] = useState<NebulaCloud[]>([]);

  // Timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('pulse') },      // +500ms - longer intro
      { time: 4500, action: () => setStage('crack') },      // +1000ms - appreciate pulse
      { time: 7000, action: () => setStage('shatter') },    // +1500ms - see cracks clearly
      { time: 9500, action: () => setStage('hatch') },      // +2000ms - dramatic shatter
      { time: 12500, action: () => setStage('condense') },  // +2500ms - bigger hatch
      { time: 15500, action: () => setStage('radiance') },  // +3000ms - longer condense
      { time: 18000, action: () => setStage('outro') },     // +3500ms - radiance glory
      { time: 19500, action: () => onComplete?.() }         // 19.5s total (was 16s)
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Generate procedural cracks
  useEffect(() => {
    if (stage === 'crack' || stage === 'shatter') {
      const crackCount = stage === 'crack' ? 8 : 24;
      const optimizedCount = getOptimalParticleCount(crackCount);
      
      const newCracks: Crack[] = Array.from({ length: optimizedCount }, (_, i) => {
        const angle = (i / optimizedCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const length = 80 + Math.random() * 120;
        
        return {
          id: i,
          x1: 50,
          y1: 50,
          x2: 50 + Math.cos(angle) * length,
          y2: 50 + Math.sin(angle) * length,
          angle,
          length,
          delay: i * 0.05
        };
      });
      
      setCracks(newCracks);
    }
  }, [stage]);

  // Generate nebula clouds during hatch
  useEffect(() => {
    if (stage === 'hatch') {
      const cloudCount = getOptimalParticleCount(12);
      const colors = [
        'rgba(139, 92, 246, 0.6)', // Purple
        'rgba(236, 72, 153, 0.6)', // Pink
        'rgba(147, 51, 234, 0.6)', // Violet
        'rgba(192, 132, 252, 0.6)', // Light purple
        'rgba(167, 139, 250, 0.5)', // Lavender
      ];

      const newClouds: NebulaCloud[] = Array.from({ length: cloudCount }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50 + (Math.random() - 0.5) * 40,
        scale: 0.5 + Math.random() * 1.5,
        color: colors[i % colors.length],
        rotation: Math.random() * 360
      }));

      setNebulaClouds(newClouds);
    }
  }, [stage]);

  // Generate star particles during radiance
  useEffect(() => {
    if (stage === 'radiance') {
      const starCount = getOptimalParticleCount(60);
      
      const newStars: StarParticle[] = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 50 + (Math.random() - 0.5) * 60,
        size: 2 + Math.random() * 4,
        duration: 1.5 + Math.random() * 1,
        delay: i * 0.02
      }));

      setStarParticles(newStars);
    }
  }, [stage]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-black"
      style={getPerformanceStyle()}
    >
      {/* Background stars - always visible */}
      <div className="absolute inset-0">
        {Array.from({ length: getOptimalParticleCount(100) }).map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* INTRO & PULSE - Cosmic Egg */}
        {(stage === 'intro' || stage === 'pulse') && (
          <motion.div
            key="egg"
            className="relative"
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotateY: 0,
            }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Egg glow aura */}
            {shouldRenderComplexEffect() && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                  filter: `blur(${getOptimalBlur(60)}px)`,
                  width: '500px',
                  height: '500px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: stage === 'pulse' ? [1, 1.2, 1] : 1,
                  opacity: stage === 'pulse' ? [0.4, 0.7, 0.4] : 0.4
                }}
                transition={{
                  duration: 2,
                  repeat: stage === 'pulse' ? Infinity : 0
                }}
              />
            )}

            {/* The Cosmic Egg */}
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96 rounded-[50%] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(192, 132, 252, 0.8) 30%, rgba(139, 92, 246, 0.7) 60%, rgba(236, 72, 153, 0.6) 100%)',
                boxShadow: shouldRenderComplexEffect() 
                  ? '0 0 100px rgba(139, 92, 246, 0.8), inset 0 0 100px rgba(255, 255, 255, 0.3)'
                  : '0 0 50px rgba(139, 92, 246, 0.8)',
                border: '4px solid rgba(255, 255, 255, 0.4)',
              }}
              animate={{
                scale: stage === 'pulse' ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: stage === 'pulse' ? Infinity : 0
              }}
            >
              {/* Opal shimmer effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.5) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />

              {/* Internal light pulse */}
              {stage === 'pulse' && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.6) 0%, transparent 60%)',
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}

        {/* CRACK & SHATTER - Cracks appearing */}
        {(stage === 'crack' || stage === 'shatter') && (
          <motion.div
            key="cracking"
            className="relative"
          >
            {/* Egg with cracks */}
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96 rounded-[50%]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(192, 132, 252, 0.8) 30%, rgba(139, 92, 246, 0.7) 60%, rgba(236, 72, 153, 0.6) 100%)',
                border: '4px solid rgba(255, 255, 255, 0.4)',
              }}
              animate={{
                scale: stage === 'shatter' ? [1, 1.1, 1.05] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: stage === 'shatter' ? 3 : 0
              }}
            >
              {/* Crack lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                {cracks.map((crack) => (
                  <motion.line
                    key={crack.id}
                    x1={`${crack.x1}%`}
                    y1={`${crack.y1}%`}
                    x2={`${crack.x1}%`}
                    y2={`${crack.y1}%`}
                    stroke="rgba(255, 215, 0, 0.9)"
                    strokeWidth={stage === 'shatter' ? "4" : "3"}
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      x2: `${crack.x2}%`,
                      y2: `${crack.y2}%`,
                      pathLength: 1 
                    }}
                    transition={{
                      duration: 0.5,
                      delay: crack.delay
                    }}
                    filter={shouldRenderComplexEffect() ? `drop-shadow(0 0 ${getOptimalBlur(8)}px rgba(255, 215, 0, 0.8))` : undefined}
                  />
                ))}
              </svg>

              {/* Light beams from cracks */}
              {cracks.map((crack) => (
                <motion.div
                  key={`beam-${crack.id}`}
                  className="absolute"
                  style={{
                    left: `${crack.x1}%`,
                    top: `${crack.y1}%`,
                    width: '4px',
                    height: `${crack.length}px`,
                    background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.8), transparent)',
                    transform: `rotate(${crack.angle}rad)`,
                    transformOrigin: 'top center',
                    filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(4)}px)` : undefined,
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 0] }}
                  transition={{
                    duration: 1,
                    delay: crack.delay
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* HATCH - Egg shatters, galaxy revealed */}
        {stage === 'hatch' && (
          <motion.div
            key="hatching"
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Egg shards flying outward */}
            {Array.from({ length: getOptimalParticleCount(16) }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const distance = 300;
              
              return (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute w-12 h-16 md:w-16 md:h-20 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(192, 132, 252, 0.7))',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    rotate: angle * (180 / Math.PI) + Math.random() * 360,
                    opacity: 0
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Galaxy/Nebula revealed */}
            <motion.div
              className="relative w-96 h-96"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            >
              {/* Central glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)',
                  filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(40)}px)` : undefined,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />

              {/* Nebula clouds */}
              {nebulaClouds.map((cloud) => (
                <motion.div
                  key={cloud.id}
                  className="absolute rounded-full"
                  style={{
                    left: `${cloud.x}%`,
                    top: `${cloud.y}%`,
                    width: '120px',
                    height: '120px',
                    background: cloud.color,
                    filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(30)}px)` : `blur(${getOptimalBlur(20)}px)`,
                    transform: `translate(-50%, -50%) rotate(${cloud.rotation}deg)`,
                  }}
                  animate={{
                    scale: [cloud.scale, cloud.scale * 1.3, cloud.scale],
                    rotate: [cloud.rotation, cloud.rotation + 180],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}

              {/* Spiral arms */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                {[0, 120, 240].map((offset) => (
                  <div
                    key={offset}
                    className="absolute inset-0"
                    style={{
                      background: `conic-gradient(from ${offset}deg, transparent 0%, rgba(139, 92, 246, 0.6) 30%, transparent 50%)`,
                      filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(20)}px)` : undefined,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* CONDENSE - Galaxy condenses into baby silhouette */}
        {stage === 'condense' && (
          <motion.div
            key="condensing"
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Swirling particles converging */}
            <motion.div
              className="relative w-96 h-96"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            >
              {/* Spiral converging effect */}
              {Array.from({ length: getOptimalParticleCount(40) }).map((_, i) => {
                const angle = (i / 40) * Math.PI * 2;
                const startRadius = 200;
                
                return (
                  <motion.div
                    key={`converge-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-purple-400"
                    style={{
                      left: '50%',
                      top: '50%',
                      filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(2)}px)` : undefined,
                    }}
                    initial={{
                      x: Math.cos(angle) * startRadius,
                      y: Math.sin(angle) * startRadius,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                      scale: [1, 2, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.02,
                      ease: 'easeInOut'
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Baby silhouette forming */}
            <motion.div
              className="absolute flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <div 
                className="text-9xl md:text-[12rem]"
                style={{
                  filter: shouldRenderComplexEffect() 
                    ? `drop-shadow(0 0 ${getOptimalBlur(30)}px rgba(255, 215, 0, 0.8))`
                    : `drop-shadow(0 0 ${getOptimalBlur(15)}px rgba(255, 215, 0, 0.8))`,
                }}
              >
                👶
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* RADIANCE - Baby glows with stardust */}
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Baby silhouette */}
            <motion.div
              className="relative z-10"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div 
                className="text-9xl md:text-[12rem]"
                style={{
                  filter: shouldRenderComplexEffect()
                    ? `drop-shadow(0 0 ${getOptimalBlur(40)}px rgba(255, 215, 0, 1))`
                    : `drop-shadow(0 0 ${getOptimalBlur(20)}px rgba(255, 215, 0, 1))`,
                }}
              >
                👶
              </div>
            </motion.div>

            {/* Stardust particles */}
            {starParticles.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-yellow-300"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(1)}px)` : undefined,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -50]
                }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Radiant rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border-4 border-yellow-400"
                style={{
                  width: '200px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: [1, 3],
                  opacity: [0.8, 0],
                  borderWidth: ['4px', '1px']
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        )}

        {/* OUTRO */}
        {stage === 'outro' && (
          <motion.div
            key="outro"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div 
              className="text-9xl md:text-[12rem]"
              style={{
                filter: shouldRenderComplexEffect() 
                  ? `drop-shadow(0 0 ${getOptimalBlur(40)}px rgba(255, 215, 0, 1))`
                  : `drop-shadow(0 0 ${getOptimalBlur(20)}px rgba(255, 215, 0, 1))`,
              }}
            >
              👶
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}