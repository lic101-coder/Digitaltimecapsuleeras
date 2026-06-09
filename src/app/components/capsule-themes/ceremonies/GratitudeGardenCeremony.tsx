/**
 * Gratitude - Garden of Gratitude Ceremony (ULTRA SMOOTH)
 * 
 * Magical garden blooming sequence with perfect performance.
 * Features: golden seeds → explosive growth → 20 diverse flowers bloom
 * → butterflies emerge → petals spiral → heart forms → radiant finale
 * 
 * EXTREME OPTIMIZATIONS:
 * - 20 flowers (was 50) - 60% reduction
 * - CSS-only animations
 * - NO blur during heavy stages
 * - Minimal DOM elements
 * - GPU-accelerated transforms only
 * 
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GratitudeGardenCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Seed {
  id: number;
  x: number;
  finalY: number;
  delay: number;
  size: number;
}

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  color: string;
  size: number;
  delay: number;
  swayDelay: number;
}

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  color: string;
  delay: number;
}

interface Petal {
  id: number;
  startX: number;
  startY: number;
  spiralAngle: number;
  spiralRadius: number;
  color: string;
  delay: number;
  size: number;
}

export function GratitudeGardenCeremony({
  isVisible,
  onComplete
}: GratitudeGardenCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'seeds' | 'sprout' | 'bloom' | 'butterflies' | 'wind' | 'heart' | 'radiance'>('intro');
  const [completed, setCompleted] = useState(false);

  // Timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1500, action: () => setStage('seeds') },
      { time: 2500, action: () => setStage('sprout') },
      { time: 4500, action: () => setStage('bloom') },
      { time: 7500, action: () => setStage('butterflies') },
      { time: 9500, action: () => setStage('wind') },
      { time: 12000, action: () => setStage('heart') },
      { time: 14000, action: () => setStage('radiance') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Failsafe timeout - 1 second after last timeline action
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 17000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Memoize seeds - 25 total to match flowers
  const seeds = useMemo((): Seed[] => {
    return Array.from({ length: 25 }, (_, i) => {
      // Match the flower grid positions for seeds
      const col = i % 5;
      const row = Math.floor(i / 5);
      const spreadX = 550;
      const baseX = -spreadX / 2 + (col / 4) * spreadX;
      const randomX = (Math.random() - 0.5) * 20;
      
      return {
        id: i,
        x: baseX + randomX,
        finalY: 100 + Math.random() * 25,
        delay: i * 0.05,
        size: 1 + Math.random() * 0.2
      };
    });
  }, []);

  // Memoize flowers - 25 total in beautiful centered arrangement
  const flowers = useMemo((): Flower[] => {
    const flowerTypes = [
      { emoji: '🌹', color: '#EF4444' },
      { emoji: '🌻', color: '#FBBF24' },
      { emoji: '🌷', color: '#F472B6' },
      { emoji: '🌼', color: '#FDE047' },
      { emoji: '💐', color: '#EC4899' },
      { emoji: '🌺', color: '#FB7185' },
      { emoji: '🏵️', color: '#F59E0B' },
      { emoji: '🪷', color: '#F0ABFC' },
      { emoji: '🌸', color: '#FCA5A5' },
      { emoji: '💮', color: '#FCD34D' } // Replaced wilted rose with white flower
    ];

    const result: Flower[] = [];
    
    // 5 rows of 5 flowers = 25 total, evenly distributed and centered
    const rows = 5;
    const cols = 5;
    const spreadX = 550; // Total horizontal spread
    const spreadY = 180; // Total vertical spread
    const centerOffsetY = 20; // Move garden down slightly for better centering
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const flowerType = flowerTypes[(row * cols + col) % flowerTypes.length];
        
        // Calculate centered, evenly distributed positions
        const baseX = -spreadX / 2 + (col / (cols - 1)) * spreadX;
        const randomX = (Math.random() - 0.5) * 25; // Smaller random offset
        
        // Front row at bottom (Y=80), back row at top (Y=-100)
        const baseY = 80 - (row / (rows - 1)) * spreadY + centerOffsetY;
        const randomY = (Math.random() - 0.5) * 12;
        
        // Size based on depth - front flowers larger
        const perspectiveSize = 1.5 - (row / (rows - 1)) * 0.35 + Math.random() * 0.08;
        
        result.push({
          id: row * cols + col,
          x: baseX + randomX,
          y: baseY + randomY,
          emoji: flowerType.emoji,
          color: flowerType.color,
          size: perspectiveSize,
          delay: (row * cols + col) * 0.06,
          swayDelay: Math.random() * 3
        });
      }
    }
    
    return result;
  }, []);

  // Memoize butterflies - 8 total with better positioning
  const butterflies = useMemo((): Butterfly[] => {
    const colors = ['#F472B6', '#FBBF24', '#60A5FA', '#A78BFA', '#34D399', '#FB923C', '#EC4899', '#F59E0B'];
    return Array.from({ length: 8 }, (_, i) => {
      // Select flowers from different areas of the garden
      const flowerIndex = Math.floor((i / 8) * flowers.length);
      return {
        id: i,
        startX: flowers[flowerIndex]?.x || (Math.random() - 0.5) * 250,
        startY: flowers[flowerIndex]?.y - 20 || -20,
        color: colors[i],
        delay: i * 0.15
      };
    });
  }, [flowers]);

  // Memoize petals - 30 total
  const petals = useMemo((): Petal[] => {
    const colors = ['#EF4444', '#F59E0B', '#FBBF24', '#FB923C', '#F472B6', '#FB7185'];
    return Array.from({ length: 30 }, (_, i) => {
      const spiralTurns = 3;
      const progress = i / 30;
      const angle = progress * Math.PI * 2 * spiralTurns;
      const radius = progress * 250;

      return {
        id: i,
        startX: flowers[i % flowers.length]?.x || 0,
        startY: flowers[i % flowers.length]?.y || 100,
        spiralAngle: angle,
        spiralRadius: radius,
        color: colors[i % colors.length],
        delay: i * 0.03,
        size: 0.9 + Math.random() * 0.4
      };
    });
  }, [flowers]);

  // Memoize background stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 3,
      duration: 2.5 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-[3000ms]"
        style={{
          opacity: stage === 'bloom' || stage === 'butterflies' || stage === 'wind' ? 0.7 : 0.3,
          background: 'radial-gradient(ellipse at 50% 25%, rgba(251, 191, 36, 0.4) 0%, rgba(251, 146, 60, 0.2) 40%, transparent 75%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Ground */}
      <AnimatePresence>
        {stage !== 'intro' && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(180deg, rgba(92, 57, 33, 0) 0%, rgba(92, 57, 33, 0.5) 25%, rgba(76, 45, 25, 0.85) 60%, rgba(59, 35, 18, 0.95) 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Background stars - CSS only */}
      <div className="absolute inset-0">
        {backgroundStars.map((star) => (
          <div
            key={`bg-star-${star.id}`}
            className="absolute rounded-full bg-amber-200 animate-twinkle"
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
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-green-200 drop-shadow-2xl px-6">
              Garden of Gratitude
            </h1>
            <p className="text-green-300/80 mt-3 text-base">Where appreciation blooms eternal</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Seeds falling */}
        <AnimatePresence>
          {(stage === 'seeds' || stage === 'sprout') && seeds.map((seed) => (
            <motion.div
              key={seed.id}
              className="absolute z-20"
              initial={{ x: seed.x, y: -120, scale: 0, opacity: 0 }}
              animate={{ 
                x: seed.x,
                y: stage === 'sprout' ? seed.finalY : seed.finalY - 60,
                scale: stage === 'sprout' ? [seed.size, 0] : seed.size,
                opacity: stage === 'sprout' ? [1, 0] : [0, 1, 1]
              }}
              transition={{
                delay: seed.delay,
                duration: stage === 'sprout' ? 0.5 : 1.5,
                ease: 'easeOut'
              }}
            >
              {/* Seed - NO BLUR */}
              <div 
                className="rounded-full"
                style={{
                  width: `${4 * seed.size}px`,
                  height: `${4 * seed.size}px`,
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(180, 83, 9, 1) 100%)',
                  boxShadow: '0 0 12px rgba(251, 191, 36, 0.9)'
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 20 Flowers */}
        <AnimatePresence>
          {(stage === 'sprout' || stage === 'bloom' || stage === 'butterflies' || stage === 'wind' || stage === 'heart') && flowers.map((flower) => (
            <motion.div
              key={flower.id}
              className="absolute z-25"
              initial={{ x: flower.x, y: flower.y + 60, scale: 0, opacity: 0 }}
              animate={{ 
                x: flower.x,
                y: flower.y,
                scale: flower.size,
                opacity: stage === 'heart' ? 0 : 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                delay: flower.delay,
                duration: stage === 'heart' ? 0.6 : 1.5,
                ease: 'easeOut'
              }}
            >
              {/* Stem */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-700"
                style={{ width: `${flower.size * 2.5}px` }}
                initial={{ height: 0 }}
                animate={{ height: `${flower.size * 55}px` }}
                transition={{ delay: flower.delay, duration: 0.8, ease: 'easeOut' }}
              >
                {/* Leaves */}
                <motion.div
                  className="absolute left-0 bg-green-600 rounded-full"
                  style={{ 
                    top: '35%',
                    width: `${flower.size * 14}px`,
                    height: `${flower.size * 9}px`,
                    transform: `rotate(-45deg) translateX(-100%)`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: flower.delay + 0.4, duration: 0.3 }}
                />
                <motion.div
                  className="absolute right-0 bg-green-600 rounded-full"
                  style={{ 
                    top: '65%',
                    width: `${flower.size * 14}px`,
                    height: `${flower.size * 9}px`,
                    transform: `rotate(45deg) translateX(100%)`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: flower.delay + 0.5, duration: 0.3 }}
                />
              </motion.div>

              {/* Flower bloom */}
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: flower.delay + 0.7,
                  duration: 0.8,
                  ease: 'easeOut'
                }}
              >
                <div 
                  className="flower-sway"
                  style={{
                    fontSize: `${flower.size * 3.2}rem`,
                    filter: `drop-shadow(0 ${flower.size * 5}px ${flower.size * 12}px ${flower.color}AA)`,
                    animationDelay: `${flower.swayDelay}s`
                  }}
                >
                  {flower.emoji}
                </div>
              </motion.div>

              {/* Bloom sparkle */}
              {stage === 'bloom' && (
                <motion.div
                  className="absolute -top-4 -right-4"
                  style={{ fontSize: `${flower.size * 1.8}rem` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 2, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    delay: flower.delay + 1,
                    duration: 1.5
                  }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Butterflies - 8 total */}
        <AnimatePresence>
          {(stage === 'butterflies' || stage === 'wind') && butterflies.map((butterfly) => {
            const pathRadius = 140;
            
            return (
              <motion.div
                key={butterfly.id}
                className="absolute z-28 text-4xl"
                initial={{ x: butterfly.startX, y: butterfly.startY - 30, scale: 0, opacity: 0 }}
                animate={stage === 'wind' ? {
                  scale: [1, 0],
                  opacity: [1, 0],
                  y: butterfly.startY - 200
                } : {
                  scale: 1,
                  opacity: 1,
                  x: [
                    butterfly.startX,
                    butterfly.startX + pathRadius,
                    butterfly.startX,
                    butterfly.startX - pathRadius,
                    butterfly.startX
                  ],
                  y: [
                    butterfly.startY - 30,
                    butterfly.startY - 100,
                    butterfly.startY - 150,
                    butterfly.startY - 100,
                    butterfly.startY - 30
                  ]
                }}
                transition={{
                  delay: butterfly.delay,
                  duration: stage === 'wind' ? 1.2 : 7,
                  repeat: stage === 'wind' || completed ? 0 : 3,
                  ease: 'easeInOut'
                }}
                style={{
                  filter: `drop-shadow(0 0 8px ${butterfly.color})`
                }}
              >
                <div className="butterfly-flap">🦋</div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Petals spiraling - 30 total */}
        <AnimatePresence>
          {(stage === 'wind' || stage === 'heart') && petals.map((petal) => {
            const spiralX = Math.cos(petal.spiralAngle) * petal.spiralRadius;
            const spiralY = Math.sin(petal.spiralAngle) * petal.spiralRadius - 100;

            return (
              <motion.div
                key={`petal-${petal.id}`}
                className="absolute z-30"
                initial={{ x: petal.startX, y: petal.startY, scale: 0, opacity: 0, rotate: 0 }}
                animate={stage === 'wind' ? {
                  x: spiralX,
                  y: spiralY,
                  scale: petal.size * 1.5,
                  opacity: 0.95,
                  rotate: 720
                } : {
                  x: 0,
                  y: -80,
                  scale: petal.size * 1.8,
                  opacity: 1,
                  rotate: 720
                }}
                transition={{
                  delay: petal.delay,
                  duration: stage === 'wind' ? 2 : 1.5,
                  ease: 'easeOut'
                }}
              >
                <div 
                  className="rounded-full"
                  style={{
                    width: `${8 * petal.size}px`,
                    height: `${8 * petal.size}px`,
                    background: `radial-gradient(circle, ${petal.color} 0%, ${petal.color}DD 100%)`,
                    boxShadow: `0 0 10px ${petal.color}B0`
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Heart formation - 15 particles */}
        <AnimatePresence>
          {stage === 'heart' && (
            <>
              {Array.from({ length: 15 }, (_, i) => {
                const t = (i / 15) * Math.PI * 2;
                const heartScale = 50;
                const x = heartScale * 16 * Math.pow(Math.sin(t), 3);
                const y = -heartScale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;

                return (
                  <motion.div
                    key={`heart-particle-${i}`}
                    className="absolute z-35"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y - 80,
                      scale: 1.5,
                      opacity: 1
                    }}
                    transition={{
                      delay: 0.3 + i * 0.05,
                      duration: 1.2,
                      ease: 'easeOut'
                    }}
                  >
                    <div 
                      className="rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        background: '#EF4444',
                        boxShadow: '0 0 12px #EF4444'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Giant heart */}
              <motion.div
                className="absolute z-34 text-[10rem]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.4, 1.2],
                  opacity: 1,
                  y: -80
                }}
                transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(239, 68, 68, 1))'
                }}
              >
                💚
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Radiance - 12 rays, NO BLUR */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 360;
                
                return (
                  <div
                    key={`ray-${i}`}
                    className="absolute radiance-ray"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '120vw',
                      height: '4px',
                      marginLeft: '-60vw',
                      marginTop: '-2px',
                      background: `linear-gradient(to right, transparent, rgba(34, 197, 94, 0.8) 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      animationDelay: `${i * 0.06}s`
                    }}
                  />
                );
              })}

              {/* Central glow - NO BLUR */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0.85, y: -80 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <div 
                  className="w-80 h-80 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(34, 197, 94, 0.7) 40%, rgba(22, 163, 74, 0.4) 70%, transparent 90%)',
                    boxShadow: '0 0 120px rgba(34, 197, 94, 0.7)'
                  }}
                />
              </motion.div>

              {/* Sparkles - 8 total */}
              {Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 150;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance - 80;

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-3xl"
                    initial={{ x: 0, y: -80, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: 1.3,
                      opacity: 0.9
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + i * 0.1,
                      ease: 'easeOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}

              {/* Flower emojis - 6 total */}
              {Array.from({ length: 6 }, (_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const distance = 200;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance - 80;
                const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐'];

                return (
                  <motion.div
                    key={`flower-emoji-${i}`}
                    className="absolute text-4xl"
                    initial={{ x: 0, y: -80, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: 1.2,
                      opacity: 0.9
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + i * 0.12,
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
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-200 drop-shadow-2xl mb-3">
              Your Garden of Gratitude Blooms ✨🌸💚
            </h2>
            <p className="text-2xl text-green-300 drop-shadow-lg">
              20 flowers flourish with eternal appreciation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes flower-sway {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        
        @keyframes butterfly-flap {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          50% { transform: scaleX(0.85) scaleY(1.1); }
        }
        
        @keyframes radiance-ray-expand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .flower-sway {
          animation: flower-sway 4s ease-in-out infinite;
        }
        
        .butterfly-flap {
          animation: butterfly-flap 0.3s ease-in-out infinite;
        }

        .radiance-ray {
          animation: radiance-ray-expand 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}