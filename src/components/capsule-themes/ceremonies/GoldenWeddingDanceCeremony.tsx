/**
 * Golden Moments - Wedding First Dance Ceremony
 * 
 * CONCEPT: Two souls unite under the gaze of eternity - a first dance that 
 * transforms the universe into their personal fairy tale.
 * 
 * STORY: Couple takes position → Hands touch, spark ignites → Golden vines 
 * grow around them → Roses bloom everywhere → They spin, world spins with them → 
 * Hearts explode from them → Sky transforms to eternal love
 * 
 * STAGES:
 * 1. THE APPROACH (0-2s) - Couple walks to center, anticipation builds
 * 2. FIRST TOUCH (2-5s) - Hands meet, golden spark, connection formed
 * 3. THE DANCE BEGINS (5-9s) - Waltz motion, golden vines grow, roses bloom
 * 4. THE WORLD SPINS (9-12s) - Dramatic spin, universe revolves around them
 * 5. ETERNAL LOVE (12-16s) - Hearts rain down, infinity symbol, forever sealed
 * 
 * VFX HIGHLIGHTS:
 * - Realistic waltz physics with momentum
 * - Growing golden vines with blooming roses
 * - Universe rotation effect
 * - 300+ floating heart particles
 * - Infinity symbol formation
 * - Ring exchange sparkles
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GoldenWeddingDanceCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function GoldenWeddingDanceCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: GoldenWeddingDanceCeremonyProps) {
  const [stage, setStage] = useState<'approach' | 'touch' | 'dance' | 'spin' | 'eternal'>('approach');

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('touch'), 2000),
      setTimeout(() => setStage('dance'), 5000),
      setTimeout(() => setStage('spin'), 9000),
      setTimeout(() => setStage('eternal'), 12000),
      setTimeout(() => {
        if (!isPreview && onComplete) {
          onComplete();
        }
      }, 16000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isPreview, onComplete]);

  // Heart particles for eternal love stage
  const heartParticles = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: ['text-xs', 'text-sm', 'text-base', 'text-lg'][Math.floor(Math.random() * 4)],
    emoji: ['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)]
  }));

  // Rose bloom positions
  const roses = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 20 + (i % 8) * 10,
    y: 30 + Math.floor(i / 8) * 15,
    delay: i * 0.2
  }));

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-purple-950 to-slate-950 overflow-hidden">
      
      {/* STAGE 1: THE APPROACH */}
      <AnimatePresence>
        {stage === 'approach' && (
          <>
            {/* Moonlight ambiance */}
            <motion.div
              className="absolute top-10 right-20 w-40 h-40 rounded-full bg-white/20 blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Spotlight on dance floor */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Couple walking in from sides */}
            <motion.div
              className="absolute left-[30%] top-1/2 -translate-y-1/2 text-7xl"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              🤵
              {/* Nervous heart beating */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  y: [-3, 3, -3]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                💓
              </motion.div>
              
              {/* Anticipation sparkles */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`groom-spark-${i}`}
                  className="absolute text-xl"
                  style={{
                    left: `${-20 + i * 20}%`,
                    top: `${30 + i * 15}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="absolute right-[30%] top-1/2 -translate-y-1/2 text-7xl"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              👰
              {/* Nervous heart beating */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  y: [-3, 3, -3]
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              >
                💓
              </motion.div>
              
              {/* Anticipation sparkles */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`bride-spark-${i}`}
                  className="absolute text-xl"
                  style={{
                    right: `${-20 + i * 20}%`,
                    top: `${30 + i * 15}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + i * 0.3,
                    repeat: Infinity
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>

            {/* Rose petals falling gently */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ left: `${Math.random() * 100}%`, top: '-5%' }}
                initial={{ y: 0, opacity: 0.8, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 50,
                  opacity: 0,
                  rotate: 360,
                  x: Math.sin(i) * 50
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: Math.random() * 2,
                  ease: "linear",
                  repeat: Infinity
                }}
              >
                🌸
              </motion.div>
            ))}

            {/* Label */}
            <motion.div
              className="absolute top-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-rose-200 drop-shadow-lg">
                Two Souls, One Moment 🤵👰
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: FIRST TOUCH */}
      <AnimatePresence>
        {stage === 'touch' && (
          <>
            {/* Couple centered, hands touching */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="text-8xl flex gap-1">
                  <span>🤵</span>
                  <span>👰</span>
                </div>
                
                {/* Golden spark at connection point */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 3, 1],
                    opacity: [1, 0.8, 0]
                  }}
                  transition={{ duration: 1.5, repeat: 3 }}
                >
                  <div className="w-4 h-4 rounded-full bg-amber-400" style={{
                    boxShadow: '0 0 40px rgba(251, 191, 36, 1)'
                  }} />
                </motion.div>

                {/* Lightning-like connection lines */}
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={`lightning-${i}`}
                    className="absolute left-1/2 top-1/2 w-1 h-16 bg-gradient-to-b from-amber-400 via-yellow-500 to-transparent origin-top"
                    initial={{ scaleY: 0, rotate: (i - 1) * 30, opacity: 0 }}
                    animate={{ 
                      scaleY: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.2,
                      repeat: 5,
                      repeatDelay: 0.3
                    }}
                    style={{ filter: 'blur(1px)' }}
                  />
                ))}

                {/* Hearts bursting from connection */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={`burst-heart-${i}`}
                    className="absolute left-1/2 top-1/2 text-xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i * 60) * Math.PI / 180) * 80,
                      y: Math.sin((i * 60) * Math.PI / 180) * 80,
                      opacity: 0,
                      scale: [0, 1.2, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + i * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    💖
                  </motion.div>
                ))}

                {/* Sparkles radiating out */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute left-1/2 top-1/2 text-2xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i * 45) * Math.PI / 180) * 100,
                      y: Math.sin((i * 45) * Math.PI / 180) * 100,
                      opacity: 0,
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    ✨
                  </motion.div>
                ))}

                {/* Golden ring pulse */}
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-400"
                    initial={{ width: 100, height: 100, opacity: 0.8 }}
                    animate={{
                      width: 300,
                      height: 300,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      ease: "easeOut",
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Wedding rings appearing */}
            <motion.div
              className="absolute left-[48%] top-[40%] text-5xl"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 1, type: "spring", damping: 10 }}
            >
              💍
            </motion.div>

            <motion.div
              className="absolute right-[48%] top-[40%] text-5xl"
              initial={{ scale: 0, rotate: 180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring", damping: 10 }}
            >
              💍
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-amber-300 drop-shadow-lg">
                The Spark of Forever ✨
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: THE DANCE BEGINS */}
      <AnimatePresence>
        {stage === 'dance' && (
          <>
            {/* Elegant ballroom materializing - CINEMATIC BACKGROUND */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-purple-950 via-rose-950 to-slate-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Ballroom floor appearing with golden inlays - POLISHED */}
            <motion.div
              className="absolute left-0 right-0 bottom-0 h-1/2"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(120, 53, 15, 0.4) 20%, rgba(92, 40, 10, 0.6) 100%)',
                transformOrigin: 'bottom'
              }}
            >
              {/* Floor tile grid - REFINED */}
              <motion.div 
                className="absolute inset-0 opacity-20" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(251, 191, 36, 0.4) 2px, transparent 2px)',
                  backgroundSize: '60px 60px'
                }} 
              />
              
              {/* Perspective grid lines for depth */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.line
                    key={`grid-h-${i}`}
                    x1="0%"
                    y1={`${20 + i * 20}%`}
                    x2="100%"
                    y2={`${20 + i * 20}%`}
                    stroke="rgba(251, 191, 36, 0.6)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* Couple dancing - CENTER FOCUS - ENHANCED WALTZ */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-20"
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                rotate: [0, -18, 18, -15, 15, -10, 10, -5, 5, 0],
                x: [0, -25, 25, -20, 20, -12, 12, -5, 5, 0],
                y: [0, -15, -8, -12, -5, -10, -3, -5, 0, 0]
              }}
              transition={{ 
                scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { duration: 0.4 },
                rotate: { duration: 10, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] },
                x: { duration: 10, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] },
                y: { duration: 10, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
            >
              <div className="flex gap-2">
                <span>🤵</span>
                <span>👰</span>
              </div>
              
              {/* Glowing dance aura - SMOOTHER COLOR TRANSITIONS */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)',
                    'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
                    'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)',
                    'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(251, 191, 36, 0.3) 50%, transparent 70%)'
                  ],
                  scale: [1, 1.5, 1.3, 1.4, 1.2, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] }}
              />

              {/* Love particles orbiting - REFINED MOVEMENT */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                const radius = 90;
                return (
                  <motion.div
                    key={`love-particle-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                    initial={{ 
                      x: Math.cos(angle * Math.PI / 180) * radius,
                      y: Math.sin(angle * Math.PI / 180) * radius,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      x: Math.cos(angle * Math.PI / 180) * radius,
                      y: Math.sin(angle * Math.PI / 180) * radius,
                      rotate: [0, 360],
                      scale: [0, 1, 1.3, 1, 0.9, 1],
                      opacity: [0, 0.5, 1, 1, 0.8, 1]
                    }}
                    transition={{
                      x: { duration: 6, repeat: Infinity, ease: "linear" },
                      y: { duration: 6, repeat: Infinity, ease: "linear" },
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" },
                      opacity: { duration: 2.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                    }}
                  >
                    {['💕', '💖', '✨', '💝', '💗'][i % 5]}
                  </motion.div>
                );
              })}

              {/* Dance motion blur trails - ENHANCED */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`blur-trail-${i}`}
                  className="absolute inset-0 text-9xl -z-10"
                  animate={{
                    opacity: [0, 0.15, 0],
                    x: [-15, 15],
                    y: [-8, 8]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  style={{
                    filter: 'blur(8px)'
                  }}
                >
                  <div className="flex gap-2">
                    <span>🤵</span>
                    <span>👰</span>
                  </div>
                </motion.div>
              ))}

              {/* Dance footprint trail - SMOOTHER APPEARANCE */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <motion.div
                  key={`footprint-${i}`}
                  className="absolute text-2xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.5, 0],
                    scale: [0, 1.1, 1, 0.9],
                    x: -50 + Math.sin(i * 1.5) * 35,
                    y: 90 + i * 12,
                    rotate: i % 2 === 0 ? -25 : 25
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.35,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  👣
                </motion.div>
              ))}
            </motion.div>

            {/* Chandelier descending - MORE DRAMATIC */}
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 z-10"
              initial={{ y: -300, opacity: 0, scale: 0.8 }}
              animate={{ y: 30, opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="relative text-9xl">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💎
                </motion.div>
                
                {/* Chandelier light beams - VOLUMETRIC LIGHTING */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <motion.div
                    key={`beam-${i}`}
                    className="absolute left-1/2 top-full w-3 origin-top"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: '85vh',
                      opacity: [0.25, 0.6, 0.35, 0.5, 0.25],
                      scaleX: [0.8, 1.2, 0.9, 1.1, 0.8]
                    }}
                    transition={{
                      height: { delay: 0.8 + i * 0.08, duration: 1.5, ease: "easeOut" },
                      opacity: { duration: 4, repeat: Infinity, delay: i * 0.4 },
                      scaleX: { duration: 3.5, repeat: Infinity, delay: i * 0.35 }
                    }}
                    style={{
                      background: `linear-gradient(to bottom, 
                        rgba(251, 191, 36, ${0.6 - i * 0.05}) 0%, 
                        rgba(251, 191, 36, ${0.3 - i * 0.03}) 40%, 
                        transparent 70%)`,
                      transform: `rotate(${-70 + i * 20}deg)`,
                      filter: 'blur(4px)',
                      mixBlendMode: 'screen'
                    }}
                  />
                ))}
                
                {/* Crystal prisms - ENHANCED SPARKLE */}
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={`prism-${i}`}
                    className="absolute text-2xl"
                    style={{
                      left: `${-40 + i * 20}%`,
                      top: '140%',
                      filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.9))'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1],
                      scale: [0, 1],
                      rotate: [0, 360],
                      y: [0, -8, 0, 8, 0]
                    }}
                    transition={{
                      opacity: { delay: 1.2 + i * 0.15, duration: 0.5 },
                      scale: { delay: 1.2 + i * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                      rotate: { duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.2 },
                      y: { duration: 2.5, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }
                    }}
                  >
                    💎
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Golden vines GROWING - COORDINATED ANIMATION */}
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={`vine-pair-${i}`}
                className="absolute bottom-0 z-5"
                style={{ left: i % 2 === 0 ? `${12 + i * 8}%` : `${78 - i * 8}%` }}
              >
                {/* Vine stem growing up - SMOOTHER */}
                <motion.div
                  className="relative w-4 origin-bottom"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: '60vh', opacity: 1 }}
                  transition={{
                    duration: 2.8,
                    delay: 0.6 + i * 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    background: 'linear-gradient(to top, rgba(133, 77, 14, 0.9) 0%, rgba(180, 83, 9, 0.7) 50%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  {/* Leaves sprouting - REFINED TIMING */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map(j => (
                    <motion.div
                      key={`leaf-${j}`}
                      className="absolute text-4xl"
                      style={{
                        bottom: `${12 + j * 11}%`,
                        left: j % 2 === 0 ? '-35px' : '8px',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                      }}
                      initial={{ scale: 0, rotate: 0, opacity: 0, x: j % 2 === 0 ? 15 : -15 }}
                      animate={{ 
                        scale: [0, 1.2, 1], 
                        rotate: j % 2 === 0 ? [-90, -45] : [90, 40],
                        opacity: [0, 1, 1],
                        x: 0,
                        y: [0, -3, 0, 3, 0]
                      }}
                      transition={{
                        scale: { delay: 1.2 + i * 0.2 + j * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                        rotate: { delay: 1.2 + i * 0.2 + j * 0.12, duration: 0.8, ease: "easeOut" },
                        opacity: { delay: 1.2 + i * 0.2 + j * 0.12, duration: 0.4 },
                        x: { delay: 1.2 + i * 0.2 + j * 0.12, duration: 0.6, ease: "easeOut" },
                        y: { duration: 3, repeat: Infinity, delay: 1.8 + i * 0.2 + j * 0.12, ease: "easeInOut" }
                      }}
                    >
                      🍃
                    </motion.div>
                  ))}

                  {/* Roses blooming - ENHANCED BLOOM ANIMATION */}
                  {[0, 1, 2, 3, 4].map(j => (
                    <motion.div
                      key={`vine-rose-${j}`}
                      className="absolute text-5xl"
                      style={{
                        bottom: `${20 + j * 17}%`,
                        left: j % 2 === 0 ? '-38px' : '2px',
                        filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))'
                      }}
                      initial={{ scale: 0, rotate: -270, opacity: 0 }}
                      animate={{ 
                        scale: [0, 0.5, 1.15, 1], 
                        rotate: [-270, -90, 10, 0],
                        opacity: [0, 0.5, 1, 1],
                        y: [0, -4, 4, 0]
                      }}
                      transition={{
                        scale: { 
                          delay: 1.8 + i * 0.2 + j * 0.18, 
                          duration: 1, 
                          ease: [0.34, 1.56, 0.64, 1],
                          times: [0, 0.4, 0.8, 1]
                        },
                        rotate: { 
                          delay: 1.8 + i * 0.2 + j * 0.18, 
                          duration: 1, 
                          ease: [0.34, 1.56, 0.64, 1] 
                        },
                        opacity: { 
                          delay: 1.8 + i * 0.2 + j * 0.18, 
                          duration: 0.6 
                        },
                        y: { 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: 2.4 + i * 0.2 + j * 0.18, 
                          ease: "easeInOut" 
                        }
                      }}
                    >
                      🌹
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* Rose petals floating - MORE NATURAL MOVEMENT */}
            {Array.from({ length: 30 }).map((_, i) => {
              const startX = 10 + Math.random() * 80;
              const startY = 10 + Math.random() * 50;
              return (
                <motion.div
                  key={`floating-petal-${i}`}
                  className="absolute text-3xl z-15"
                  style={{
                    left: `${startX}%`,
                    top: `${startY}%`
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.9, 0.9, 0.6, 0],
                    scale: [0, 1.1, 1, 1, 0.9, 0.7],
                    y: [0, -40 + Math.random() * 20, -25, -50, -30, -20],
                    x: [0, Math.sin(i) * 25, Math.cos(i) * 18, -Math.sin(i) * 15, Math.cos(i) * 10, 0],
                    rotate: [0, 120 + Math.random() * 60, 240, 360, 480, 600]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 2,
                    delay: 1.8 + Math.random() * 2,
                    repeat: Infinity,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                  }}
                >
                  🌸
                </motion.div>
              );
            })}

            {/* Musical notes floating - REFINED MUSIC VISUALIZATION */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <motion.div
                key={`note-${i}`}
                className="absolute text-4xl z-15"
                style={{
                  left: `${15 + (i * 7)}%`,
                  top: `${25 + Math.sin(i) * 25}%`
                }}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.9, 0.9, 0.7, 0],
                  y: [-100, -160],
                  x: [0, Math.sin(i * 2) * 35],
                  rotate: [0, 180 + i * 20, 360],
                  scale: [0.5, 1.3, 1.1, 1, 0.7]
                }}
                transition={{
                  duration: 4.5,
                  delay: 0.8 + i * 0.35,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1]
                }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.8))'
                }}
              >
                {['🎵', '🎶', '♪', '♫', '🎼'][i % 5]}
              </motion.div>
            ))}

            {/* Ambient fairy lights - MORE MAGICAL */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`fairy-${i}`}
                className="absolute w-3 h-3 rounded-full z-15"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  top: `${5 + Math.random() * 75}%`,
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(251, 191, 36, 0.6) 50%, transparent 100%)',
                  boxShadow: '0 0 15px rgba(251, 191, 36, 1)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.4, 1, 0.4, 0],
                  scale: [0, 0.8, 1.3, 0.9, 0]
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  delay: 1 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Spotlight pools on floor - DEPTH */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={`spotlight-${i}`}
                className="absolute bottom-0 w-80 h-40 rounded-full blur-3xl"
                style={{
                  left: `${25 + i * 25}%`,
                  background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
                  transform: 'translateX(-50%) perspective(500px) rotateX(75deg)'
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.6, 0.4, 0.6, 0],
                  scale: [0.8, 1.2, 1, 1.1, 0.9]
                }}
                transition={{
                  duration: 4,
                  delay: 1 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute bottom-14 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.h2 
                className="text-4xl font-bold text-rose-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                animate={{
                  textShadow: [
                    '0 4px 12px rgba(0,0,0,0.8), 0 0 20px rgba(251, 191, 36, 0.4)',
                    '0 4px 12px rgba(0,0,0,0.8), 0 0 30px rgba(236, 72, 153, 0.4)',
                    '0 4px 12px rgba(0,0,0,0.8), 0 0 20px rgba(251, 191, 36, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Dancing Through Time 💃
              </motion.h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: THE WORLD SPINS */}
      <AnimatePresence>
        {stage === 'spin' && (
          <>
            {/* Universe rotating around them */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              style={{ transformOrigin: 'center' }}
            >
              {/* Stars spinning */}
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-2xl"
                  style={{
                    left: `${50 + Math.cos((i * 360 / 50) * Math.PI / 180) * 45}%`,
                    top: `${50 + Math.sin((i * 360 / 50) * Math.PI / 180) * 45}%`
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                >
                  ✨
                </motion.div>
              ))}

              {/* Cosmic roses orbiting */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <motion.div
                  key={`cosmic-rose-${i}`}
                  className="absolute text-5xl"
                  style={{
                    left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 40}%`,
                    top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 40}%`
                  }}
                >
                  🌹
                </motion.div>
              ))}
            </motion.div>

            {/* Couple at center - DRAMATIC SPIN */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-10"
              animate={{ 
                rotate: 720,
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 4, ease: "easeInOut" },
                scale: { duration: 4, ease: "easeInOut" }
              }}
            >
              💑
              
              {/* Energy rings during spin */}
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={`energy-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 150 + i * 50,
                    height: 150 + i * 50,
                    border: '3px solid rgba(251, 191, 36, 0.6)',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)'
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    rotate: { duration: 3 - i * 0.2, ease: "linear", repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity },
                    opacity: { duration: 2, repeat: Infinity }
                  }}
                />
              ))}
            </motion.div>

            {/* Spiral light trails */}
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={`spiral-${i}`}
                className="absolute left-1/2 top-1/2 w-1 h-96 origin-bottom bg-gradient-to-t from-transparent via-rose-400 to-transparent"
                animate={{
                  rotate: 360,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  rotate: { duration: 2, ease: "linear", repeat: Infinity, delay: i * 0.5 },
                  opacity: { duration: 2, repeat: Infinity, delay: i * 0.5 }
                }}
                style={{
                  filter: 'blur(3px)',
                  transformOrigin: '50% 0%'
                }}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                The Universe is Yours 🌌
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 5: ETERNAL LOVE */}
      <AnimatePresence>
        {stage === 'eternal' && (
          <>
            {/* Heavenly background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Infinite hearts raining down */}
            {heartParticles.map(particle => (
              <motion.div
                key={particle.id}
                className={`absolute ${particle.size}`}
                style={{
                  left: `${particle.x}%`,
                  top: '-10%'
                }}
                initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 100,
                  opacity: [1, 1, 0],
                  rotate: [-20, 20, -20],
                  x: [0, Math.sin(particle.id) * 50, 0]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "linear",
                  repeat: Infinity
                }}
              >
                {particle.emoji}
              </motion.div>
            ))}

            {/* Infinity symbol forming */}
            <motion.div
              className="absolute left-1/2 top-[30%] -translate-x-1/2"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                type: "spring",
                damping: 12
              }}
            >
              <motion.div
                className="text-9xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 8, ease: "linear", repeat: Infinity },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                ♾️
              </motion.div>
              
              {/* Glowing aura around infinity */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl -z-10"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%)'
                  ],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* Couple beneath infinity symbol */}
            <motion.div
              className="absolute left-1/2 top-[55%] -translate-x-1/2 text-8xl"
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 10 }}
            >
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-3, 3, -3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                💑
              </motion.div>
            </motion.div>

            {/* Wedding bells */}
            <motion.div
              className="absolute left-[35%] top-[20%] text-6xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: [-10, 10, -10]
              }}
              transition={{
                y: { delay: 0.8, type: "spring", damping: 8 },
                opacity: { delay: 0.8 },
                rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              🔔
            </motion.div>

            <motion.div
              className="absolute right-[35%] top-[20%] text-6xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotate: [10, -10, 10]
              }}
              transition={{
                y: { delay: 1, type: "spring", damping: 8 },
                opacity: { delay: 1 },
                rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              🔔
            </motion.div>

            {/* Doves flying */}
            {[0, 1].map(i => (
              <motion.div
                key={`dove-${i}`}
                className="absolute text-5xl"
                initial={{ 
                  x: i === 0 ? -100 : window.innerWidth + 100,
                  y: '20%',
                  opacity: 0
                }}
                animate={{
                  x: i === 0 ? window.innerWidth + 100 : -100,
                  y: '15%',
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 4,
                  delay: 1.5 + i * 0.5,
                  ease: "easeInOut"
                }}
              >
                🕊️
              </motion.div>
            ))}

            {/* Light beams from sky */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={`light-${i}`}
                className="absolute top-0 w-24 h-full origin-top"
                style={{
                  left: `${20 + i * 15}%`,
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)',
                  filter: 'blur(10px)'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scaleY: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute bottom-16 left-0 right-0 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.5,
                type: "spring",
                damping: 8
              }}
            >
              <h2 className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                Love Eternal 💕
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}