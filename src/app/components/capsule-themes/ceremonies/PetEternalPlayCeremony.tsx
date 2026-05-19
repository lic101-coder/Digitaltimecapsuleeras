/**
 * Pet Eternal Garden Ceremony (FULLY ENHANCED)
 * 
 * A magical garden where all beloved pets play forever in eternal paradise.
 * Enhanced with richer details, better cohesion, and stunning visual moments.
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetEternalPlayCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetEternalPlayCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetEternalPlayCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'seed' | 'bloom' | 'pets' | 'transform' | 'space' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 800, action: () => setStage('seed') },
      { time: 2800, action: () => setStage('bloom') },
      { time: 5800, action: () => setStage('pets') },
      { time: 8800, action: () => setStage('transform') },
      { time: 11800, action: () => setStage('space') },
      { time: 13800, action: () => setStage('radiance') },
      { time: 15500, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && capsuleTitle && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-x-0 top-[20%] z-30 text-center px-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starfield for space stage */}
      <AnimatePresence>
        {stage === 'space' && (
          <>
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 2.5 + 0.5 + 'px',
                  height: Math.random() * 2.5 + 0.5 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ duration: 1.8, delay: Math.random() * 0.6 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Golden seed falls from heaven */}
      <AnimatePresence>
        {stage === 'seed' && (
          <>
            {/* Seed with divine glow */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ top: '8%', opacity: 0 }}
              animate={{ top: '63%', opacity: 1 }}
              transition={{ duration: 2, ease: 'easeIn' }}
            >
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 70%, #ea580c 100%)',
                  boxShadow: '0 0 50px #fbbf24, 0 0 100px #f59e0b, 0 0 150px #ea580c'
                }}
              />
            </motion.div>

            {/* Divine light beam following seed */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: '0%',
                width: '2px',
                height: '63%',
                background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0), rgba(251, 191, 36, 0.8))',
                filter: 'blur(3px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.3 }}
            />

            {/* Impact ripples */}
            {[0, 0.2, 0.4].map((delay, idx) => (
              <motion.div
                key={`ripple-${idx}`}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: '63%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 5 + idx, opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, delay: 2 + delay }}
              >
                <div
                  className="w-24 h-24 rounded-full border-4 border-yellow-400"
                  style={{ filter: 'blur(4px)' }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Garden blooms into existence */}
      <AnimatePresence>
        {(stage === 'bloom' || stage === 'pets' || stage === 'transform') && (
          <>
            {/* Lush grass meadow */}
            <motion.div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: '42%',
                background: 'linear-gradient(to top, #047857 0%, #059669 30%, #10b981 60%, #34d399 100%)'
              }}
              initial={{ scaleY: 0, transformOrigin: 'bottom' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
            />

            {/* Wildflowers blooming across meadow */}
            {[...Array(45)].map((_, i) => {
              const colors = ['#ec4899', '#f472b6', '#fbbf24', '#f59e0b', '#a855f7', '#c084fc', '#fb923c', '#ef4444'];
              const color = colors[i % colors.length];
              const row = Math.floor(i / 15);
              const col = i % 15;
              
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${5 + col * 6.2}%`,
                    bottom: `${2 + row * 7}%`,
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    boxShadow: stage === 'transform' 
                      ? `0 0 25px ${color}, 0 0 40px ${color}` 
                      : `0 0 15px ${color}`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: stage === 'transform' ? [1, 0.75, 1] : 1 
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: i * 0.035,
                    repeat: stage === 'transform' ? Infinity : 0,
                    repeatType: 'reverse',
                    repeatDelay: 0.2
                  }}
                />
              );
            })}

            {/* Majestic cherry blossom tree */}
            <motion.div
              className="absolute left-1/2 bottom-0 -translate-x-1/2"
              initial={{ scaleY: 0, transformOrigin: 'bottom' }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2.8, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Tree trunk - SOLID and VISIBLE */}
              <div
                className="w-24 md:w-32 mx-auto relative"
                style={{
                  height: '300px',
                  borderRadius: '999px 999px 0 0',
                  background: 'linear-gradient(to right, #78350f 0%, #92400e 40%, #a16207 50%, #92400e 60%, #78350f 100%)',
                  boxShadow: stage === 'transform' 
                    ? '0 0 60px #fbbf24, 0 0 100px #f59e0b, inset 0 0 30px rgba(0,0,0,0.3)' 
                    : 'inset 0 0 30px rgba(0,0,0,0.3)'
                }}
              />
              
              {/* Pink cherry blossoms - CLEAR circular canopy */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: '20px',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, #f472b6 0%, #ec4899 40%, #db2777 70%, transparent 100%)',
                  borderRadius: '50%',
                  filter: 'blur(0px)'
                }}
                animate={{
                  boxShadow: stage === 'transform' 
                    ? [
                        '0 0 40px #ec4899, 0 0 80px #f472b6', 
                        '0 0 80px #fbbf24, 0 0 120px #f59e0b', 
                        '0 0 40px #ec4899, 0 0 80px #f472b6'
                      ]
                    : '0 0 40px #ec4899, 0 0 80px #f472b6'
                }}
                transition={{ duration: 3, repeat: stage === 'transform' ? Infinity : 0 }}
              >
                {/* Individual cherry blossom clusters for detail */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={i}
                      className="absolute text-4xl"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      🌸
                    </div>
                  );
                })}
                
                {/* Center of tree - dense blooms */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                  🌸
                </div>
              </motion.div>

              {/* Falling petals from tree */}
              {stage === 'transform' && (
                <>
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`falling-petal-${i}`}
                      className="absolute text-2xl"
                      style={{
                        left: `${-100 + Math.random() * 200}px`,
                        top: `${50 + Math.random() * 100}px`
                      }}
                      animate={{
                        y: [0, 300],
                        x: [0, (Math.random() - 0.5) * 100],
                        rotate: [0, 360],
                        opacity: [0.9, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      🌸
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>

            {/* Butterflies dancing in garden */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl md:text-4xl"
                style={{
                  left: `${12 + (i * 16) % 76}%`,
                  top: `${22 + (i * 9) % 35}%`,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
                animate={{
                  x: [0, (i % 2 === 0 ? 50 : -50), 0],
                  y: [0, -35, -70, -35, 0],
                  rotate: [0, 12, -12, 0]
                }}
                transition={{
                  duration: 6 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut'
                }}
              >
                🦋
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Beloved pets playing in paradise (ALL FACING RIGHT) */}
      <AnimatePresence>
        {(stage === 'pets' || stage === 'transform') && (
          <>
            {/* Dog - running and playing - FACING RIGHT */}
            <motion.div
              className="absolute text-7xl md:text-8xl"
              style={{
                bottom: '20%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                transform: 'scaleX(1)' // CORRECT: Facing right
              }}
              initial={{ left: '-12%', opacity: 0 }}
              animate={{
                left: stage === 'transform' ? ['12%', '32%', '18%', '25%'] : '18%',
                opacity: 1,
                rotate: stage === 'transform' ? [0, -4, 4, 0] : 0
              }}
              transition={{
                left: { duration: 3.5, repeat: stage === 'transform' ? Infinity : 0, ease: 'easeInOut' },
                rotate: { duration: 1.8, repeat: stage === 'transform' ? Infinity : 0 },
                opacity: { duration: 1.2 }
              }}
            >
              🐕
            </motion.div>

            {/* Cat - lounging peacefully - FACING RIGHT */}
            <motion.div
              className="absolute text-6xl md:text-7xl"
              style={{
                bottom: '22%',
                right: '15%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                transform: 'scaleX(1)' // CORRECT: Facing right
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: stage === 'transform' ? [1, 1.1, 1] : 1
              }}
              transition={{
                scale: { duration: 3, repeat: stage === 'transform' ? Infinity : 0 },
                opacity: { duration: 1.2, delay: 0.4 }
              }}
            >
              🐱
            </motion.div>

            {/* Bird - full body bird on branch - CHIRPING */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl"
              style={{
                top: '30%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))'
              }}
              initial={{ opacity: 0, y: -40 }}
              animate={{
                opacity: 1,
                y: stage === 'transform' ? [-10, 10, -10] : 0,
                scale: stage === 'transform' ? [1, 1.05, 1] : 1
              }}
              transition={{
                y: { duration: 2, repeat: stage === 'transform' ? Infinity : 0 },
                scale: { duration: 2, repeat: stage === 'transform' ? Infinity : 0 },
                opacity: { duration: 1.2, delay: 0.7 }
              }}
            >
              🐦
            </motion.div>

            {/* Rabbit - hopping joyfully - FACING RIGHT */}
            <motion.div
              className="absolute text-6xl md:text-7xl"
              style={{
                bottom: '21%',
                left: '58%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                transform: 'scaleX(1)' // CORRECT: Facing right
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: stage === 'transform' ? [0, -30, 0] : 0
              }}
              transition={{
                y: { duration: 1.4, repeat: stage === 'transform' ? Infinity : 0, repeatDelay: 0.7 },
                opacity: { duration: 1.2, delay: 1 }
              }}
            >
              🐇
            </motion.div>

            {/* Magical golden orbs floating */}
            {stage === 'transform' && (
              <>
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${8 + i * 6}%`,
                      bottom: `${15 + (i % 4) * 9}%`,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0.2), transparent)',
                      filter: 'blur(12px)'
                    }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1.6, 0.5],
                      y: [0, -60, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.18,
                      repeat: Infinity
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Garden becomes celestial island */}
      <AnimatePresence>
        {stage === 'space' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: 0.32 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          >
            <div
              className="relative w-[550px] h-[550px] rounded-full"
              style={{
                background: 'radial-gradient(circle, #10b981 0%, #059669 50%, #047857 100%)',
                boxShadow: '0 0 140px rgba(16, 185, 129, 0.7), 0 0 220px rgba(16, 185, 129, 0.4)'
              }}
            >
              {/* Radiant tree in center */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #fbbf24 0%, #ec4899 50%, transparent 75%)',
                  filter: 'blur(50px)'
                }}
              />
            </div>

            {/* Cosmic aurora surrounding garden */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.3), transparent 60%)',
                  filter: 'blur(100px)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Epic radiance finale */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 72-ray divine starburst */}
            {[...Array(72)].map((_, i) => {
              const angle = (i / 72) * 360;
              const colors = ['#fbbf24', '#ec4899', '#a855f7', '#10b981', '#f59e0b', '#f472b6', '#fb923c', '#ef4444'];
              const color = colors[i % colors.length];
              
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '120%',
                    height: '16px',
                    background: `linear-gradient(to right, ${color}, transparent)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.01,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central radiant light */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <div
                className="w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 1), rgba(236, 72, 153, 0.8), rgba(168, 85, 247, 0.5), transparent)',
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Spiraling flower petals */}
            {[...Array(50)].map((_, i) => {
              const colors = ['#ec4899', '#f472b6', '#fbbf24', '#a855f7', '#fb923c'];
              const color = colors[i % colors.length];
              const angle = (i / 50) * Math.PI * 2;
              
              return (
                <motion.div
                  key={`petal-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    filter: 'blur(2px)'
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.3, 0.7],
                    x: Math.cos(angle) * 700,
                    y: Math.sin(angle) * 700,
                    opacity: [1, 1, 0],
                    rotate: i * 50
                  }}
                  transition={{
                    duration: 2.8,
                    delay: i * 0.018,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}