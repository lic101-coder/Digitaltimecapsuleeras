/**
 * Gratitude - Infinite Gratitude Ceremony (ULTRA SMOOTH)
 * 
 * Clear, elegant cosmic journey with realistic physics and smooth transitions.
 * Features: singularity birth → energy expands → 8 celestial bodies orbit smoothly
 * → graceful convergence to flower → golden bloom → RADIANT finale
 * 
 * EXTREME OPTIMIZATIONS:
 * - Smooth orbital mechanics with proper easing
 * - NO blur on rays (12 total, was 40)
 * - 30 particles (was 140+)
 * - Clear staging and continuity
 * - GPU-accelerated transforms only
 * 
 * Duration: 15 seconds
 * Clear Journey:
 * 1. 0-2s: Gratitude seed appears and pulses
 * 2. 2-4s: Energy waves ripple outward
 * 3. 4-7s: 8 celestial bodies emerge and orbit harmoniously
 * 4. 7-10s: Bodies gracefully converge to flower positions
 * 5. 10-12s: Golden cosmic flower blooms
 * 6. 12-15s: Epic radiance with 12 rays + particles
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GratitudeInfiniteCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Wave {
  id: number;
  delay: number;
}

interface CelestialBody {
  id: number;
  angle: number;
  orbitRadius: number;
  color: string;
  emoji: string;
  flowerX: number;
  flowerY: number;
}

interface Petal {
  id: number;
  angle: number;
  distance: number;
  size: number;
}

export function GratitudeInfiniteCeremony({
  isVisible,
  onComplete
}: GratitudeInfiniteCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'birth' | 'expansion' | 'cosmic' | 'unity' | 'bloom' | 'radiance'>('intro');

  // Clear timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1500, action: () => setStage('birth') },
      { time: 3000, action: () => setStage('expansion') },
      { time: 5000, action: () => setStage('cosmic') },
      { time: 8000, action: () => setStage('unity') },
      { time: 11000, action: () => setStage('bloom') },
      { time: 13000, action: () => setStage('radiance') },
      { time: 15000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Memoize waves - 6 total
  const waves = useMemo((): Wave[] => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 0.3
    }));
  }, []);

  // Memoize 8 celestial bodies
  const bodies = useMemo((): CelestialBody[] => {
    const colors = ['#60A5FA', '#FBBF24', '#EC4899', '#A78BFA', '#34D399', '#F59E0B', '#FB7185', '#F472B6'];
    const emojis = ['🌍', '⭐', '🌙', '✨', '💫', '🌟', '🌠', '⚡'];
    
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2; // Start from top
      const flowerRadius = 170;
      
      return {
        id: i,
        angle: angle * (180 / Math.PI),
        orbitRadius: 180,
        color: colors[i],
        emoji: emojis[i],
        flowerX: Math.cos(angle) * flowerRadius,
        flowerY: Math.sin(angle) * flowerRadius
      };
    });
  }, []);

  // Memoize bloom petals - 20 total
  const petals = useMemo((): Petal[] => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * Math.PI * 2,
      distance: 130 + (i % 3) * 25,
      size: 1 + (i % 3) * 0.25
    }));
  }, []);

  // Memoize background stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#000000] via-[#0a0520] to-[#1a0a30]">
      {/* Subtle cosmic ambiance - NO BLUR during radiance */}
      {stage !== 'radiance' && (
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{
            opacity: stage === 'bloom' ? 0.4 : 0.2,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      )}

      {/* Background stars - CSS only */}
      <div className="absolute inset-0">
        {backgroundStars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-2xl px-6">
              Infinite Gratitude
            </h1>
            <p className="text-purple-300/70 mt-3">Where all gratitude converges as one</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Central birth point - gratitude seed */}
        <AnimatePresence>
          {(stage === 'birth' || stage === 'expansion') && (
            <motion.div
              className="absolute z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'expansion' ? [1, 1.15, 0.7] : 1,
                opacity: stage === 'expansion' ? [1, 1, 0.3] : 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: stage === 'expansion' ? 1.8 : 1.3,
                ease: 'easeOut'
              }}
            >
              {/* Core point - simplified glow */}
              <motion.div
                className="relative w-28 h-28 rounded-full seed-pulse"
                style={{
                  background: 'radial-gradient(circle, #FFFFFF 0%, #FEF3C7 30%, #FCD34D 60%, #F59E0B 100%)',
                  boxShadow: '0 0 60px rgba(251, 191, 36, 1), inset 0 0 30px rgba(255, 255, 255, 0.8)'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expansion waves - 6 total */}
        <AnimatePresence>
          {(stage === 'expansion' || stage === 'cosmic') && waves.map((wave) => (
            <motion.div
              key={`wave-${wave.id}`}
              className="absolute z-20 rounded-full"
              style={{
                border: '2px solid rgba(251, 191, 36, 0.7)',
                boxShadow: '0 0 25px rgba(251, 191, 36, 0.5)'
              }}
              initial={{ width: '0px', height: '0px', opacity: 0 }}
              animate={{ 
                width: '800px',
                height: '800px',
                opacity: [0, 0.75, 0.35, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                delay: wave.delay,
                duration: 2.2,
                ease: 'easeOut'
              }}
            />
          ))}
        </AnimatePresence>

        {/* 8 Celestial bodies with SMOOTH transitions */}
        <AnimatePresence>
          {(stage === 'cosmic' || stage === 'unity' || stage === 'bloom') && bodies.map((body) => {
            // Calculate positions based on stage
            let currentX, currentY, currentScale;
            
            if (stage === 'cosmic') {
              // Simple pulsing orbit position
              currentX = Math.cos(body.angle * Math.PI / 180) * body.orbitRadius;
              currentY = Math.sin(body.angle * Math.PI / 180) * body.orbitRadius;
              currentScale = 1.5;
            } else {
              // Unity/Bloom - move to flower positions
              currentX = body.flowerX;
              currentY = body.flowerY;
              currentScale = stage === 'bloom' ? 1.4 : 1.6;
            }

            return (
              <motion.div
                key={body.id}
                className="absolute z-25"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: currentX,
                  y: currentY,
                  scale: currentScale,
                  opacity: stage === 'bloom' ? 0.65 : 1
                }}
                transition={{
                  delay: body.id * 0.12,
                  duration: stage === 'cosmic' ? 1.5 : 2.2,
                  ease: [0.22, 1, 0.36, 1] // Smooth custom easing
                }}
              >
                {/* Body glow - simplified */}
                <div
                  className="absolute inset-0 -m-10 body-glow"
                  style={{
                    background: `radial-gradient(circle, ${body.color}90 0%, ${body.color}40 50%, transparent 80%)`
                  }}
                />

                {/* Body icon */}
                <div 
                  className="text-5xl relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 18px ${body.color})`
                  }}
                >
                  {body.emoji}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Cosmic flower bloom */}
        <AnimatePresence>
          {stage === 'bloom' && (
            <>
              {/* Center bloom glow */}
              <motion.div
                className="absolute z-28"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.4, 1.2],
                  opacity: [0, 1, 0.85]
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              >
                <div 
                  className="w-72 h-72 rounded-full bloom-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(251, 191, 36, 0.7) 30%, rgba(245, 158, 11, 0.4) 60%, transparent 80%)',
                    boxShadow: '0 0 100px rgba(251, 191, 36, 0.9)'
                  }}
                />
              </motion.div>

              {/* Petals - 20 total */}
              {petals.map((petal) => {
                const x = Math.cos(petal.angle) * petal.distance;
                const y = Math.sin(petal.angle) * petal.distance;

                return (
                  <motion.div
                    key={`petal-${petal.id}`}
                    className="absolute z-27"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: petal.size,
                      opacity: 0.9
                    }}
                    transition={{
                      delay: 0.3 + petal.id * 0.04,
                      duration: 1.3,
                      ease: 'easeOut'
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full petal-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.85) 0%, rgba(245, 158, 11, 0.55) 60%, transparent 90%)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Center golden heart */}
              <motion.div
                className="absolute z-29 text-8xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.25, 1.1],
                  opacity: [0, 1, 0.95]
                }}
                transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 1))'
                }}
              >
                💛
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Epic radiance finale - 12 rays, NO BLUR */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 12 golden rays - CSS animation, NO BLUR */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 360;
                
                return (
                  <div
                    key={`ray-${i}`}
                    className="absolute radiance-ray"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '150vw',
                      height: '6px',
                      marginLeft: '-75vw',
                      marginTop: '-3px',
                      background: `linear-gradient(to right, transparent, rgba(251, 191, 36, ${i % 2 === 0 ? 0.95 : 0.75}) 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                );
              })}

              {/* Central supernova - NO BLUR */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 3.5,
                  opacity: 0.9
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              >
                <div 
                  className="w-96 h-96 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 205, 0.85) 12%, rgba(251, 191, 36, 0.8) 28%, rgba(245, 158, 11, 0.6) 50%, rgba(217, 119, 6, 0.35) 75%, transparent 90%)',
                    boxShadow: '0 0 180px rgba(251, 191, 36, 0.95), 0 0 280px rgba(255, 255, 255, 0.5)'
                  }}
                />
              </motion.div>

              {/* Particle ring - 30 total (was 140+) */}
              {Array.from({ length: 30 }, (_, i) => {
                const angle = (i / 30) * Math.PI * 2;
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(245, 158, 11, 0.8) 100%)',
                      boxShadow: '0 0 10px rgba(251, 191, 36, 1)'
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.5, 1.2],
                      opacity: [0, 1, 0.9]
                    }}
                    transition={{
                      delay: 0.4 + i * 0.02,
                      duration: 1.5,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Sparkle burst - 12 total */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 130 + Math.random() * 50;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-4xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.5, 1.2],
                      opacity: [0, 1, 0.9]
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 0.3 + i * 0.06,
                      ease: 'easeOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}

              {/* Celestial emojis - 8 total */}
              {Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 170;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                const emojis = ['⭐', '💫', '🌟', '✨', '🌙', '🌠', '⚡', '💛'];

                return (
                  <motion.div
                    key={`emoji-${i}`}
                    className="absolute text-5xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.4, 1.15],
                      opacity: [0, 1, 0.9]
                    }}
                    transition={{
                      duration: 1.6,
                      delay: 0.5 + i * 0.08,
                      ease: 'easeOut'
                    }}
                  >
                    {emojis[i]}
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
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-24 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl mb-3">
              Your Gratitude Radiates Infinitely ✨💛
            </h2>
            <p className="text-2xl text-yellow-300 drop-shadow-lg">
              Connected to all that is, was, and ever will be
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animations */}
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes seed-pulse {
          0%, 100% { box-shadow: 0 0 60px rgba(251, 191, 36, 1), inset 0 0 30px rgba(255, 255, 255, 0.8); }
          50% { box-shadow: 0 0 80px rgba(251, 191, 36, 1.2), inset 0 0 40px rgba(255, 255, 255, 1); }
        }
        
        @keyframes body-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
        
        @keyframes bloom-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1.2); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes petal-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        
        @keyframes radiance-ray-expand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .star-twinkle {
          animation: star-twinkle ease-in-out infinite;
        }
        
        .seed-pulse {
          animation: seed-pulse 2s ease-in-out infinite;
        }
        
        .body-glow {
          animation: body-glow 2.5s ease-in-out infinite;
        }
        
        .bloom-pulse {
          animation: bloom-pulse 3s ease-in-out infinite;
        }
        
        .petal-pulse {
          animation: petal-pulse 2s ease-in-out infinite;
        }

        .radiance-ray {
          animation: radiance-ray-expand 1.4s ease-out forwards;
          transform-origin: center center;
        }
      `}</style>
    </div>
  );
}
