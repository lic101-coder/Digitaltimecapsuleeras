/**
 * Birthday - Aurora Cascade Ceremony (V3.0 EPIC ENHANCEMENT)
 * 
 * 🌌 ULTRA CINEMA-QUALITY STORY: A soul's cosmic birthday celebration
 * 
 * REFINED NARRATIVE ARC:
 * - Absolute stillness → First heartbeat of celebration
 * - Single spark blooms into dancing light
 * - Aurora ribbons emerge with graceful power
 * - Ribbons cascade in waves, building energy
 * - Full cosmic aurora symphony explosion
 * - Climactic supernova with title reveal
 * 
 * ENHANCEMENTS V3:
 * - Smoother easing functions (cubic bezier curves)
 * - Layered depth with foreground/background auroras
 * - More dramatic color transitions
 * - Better particle choreography
 * - Epic crescendo pacing
 * - Atmospheric glow effects
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimalParticleCount } from './ceremonyOptimization';

interface BirthdayAuroraCascadeCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  isVisible?: boolean;
  onComplete?: () => void;
}

export function BirthdayAuroraCascadeCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  isVisible = true,
  onComplete
}: BirthdayAuroraCascadeCeremonyProps) {
  const [stage, setStage] = useState<'void' | 'pulse' | 'spark' | 'aurora_birth' | 'cascade' | 'symphony' | 'supernova' | 'outro'>('void');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('void') },
      { time: 1500, action: () => setStage('pulse') },
      { time: 3000, action: () => setStage('spark') },
      { time: 5000, action: () => setStage('aurora_birth') },
      { time: 8000, action: () => setStage('cascade') },
      { time: 11500, action: () => setStage('symphony') },
      { time: 15000, action: () => setStage('supernova') },
      { time: 17500, action: () => setStage('outro') },
      { time: 18000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Enhanced aurora color palette - more vibrant and cinematic
  const auroraColors = [
    { main: '#ff1744', glow: 'rgba(255, 23, 68, 0.9)', name: 'crimson' },      // Crimson
    { main: '#ff6b9d', glow: 'rgba(255, 107, 157, 0.9)', name: 'rose' },       // Rose
    { main: '#d946ef', glow: 'rgba(217, 70, 239, 0.9)', name: 'fuchsia' },     // Fuchsia
    { main: '#a855f7', glow: 'rgba(168, 85, 247, 0.9)', name: 'purple' },      // Purple
    { main: '#6366f1', glow: 'rgba(99, 102, 241, 0.9)', name: 'indigo' },      // Indigo
    { main: '#06b6d4', glow: 'rgba(6, 182, 212, 0.9)', name: 'cyan' },         // Cyan
    { main: '#10b981', glow: 'rgba(16, 185, 129, 0.9)', name: 'emerald' },     // Emerald
    { main: '#84cc16', glow: 'rgba(132, 204, 22, 0.9)', name: 'lime' },        // Lime
    { main: '#fbbf24', glow: 'rgba(251, 191, 36, 0.9)', name: 'amber' },       // Amber
    { main: '#f97316', glow: 'rgba(249, 115, 22, 0.9)', name: 'orange' },      // Orange
  ];

  // Smooth easing function for cinematic feel
  const cinematicEase = [0.43, 0.13, 0.23, 0.96];

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#000000] via-[#0a0118] to-[#000308]">
      
      {/* Deep space starfield with depth layers */}
      <div className="absolute inset-0">
        {/* Background stars (distant, slower) */}
        {[...Array(getOptimalParticleCount(60))].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: Math.random() * 1.5 + 0.5 + 'px',
              height: Math.random() * 1.5 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.4)'
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Foreground stars (closer, brighter) */}
        {[...Array(getOptimalParticleCount(40))].map((_, i) => (
          <motion.div
            key={`fg-star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* STAGE 1: PULSE - Celebration heartbeat awakens */}
      <AnimatePresence>
        {stage === 'pulse' && (
          <>
            {/* Gentle pulse waves */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '2px solid rgba(168, 85, 247, 0.6)',
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 5],
                  opacity: [0.8, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: cinematicEase,
                  repeat: 1
                }}
              />
            ))}
            
            {/* Central glow pulse */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 0.5, 1],
                opacity: [0, 0.6, 0, 0.6]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: 1,
                ease: 'easeInOut'
              }}
            >
              <div
                className="w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(217,70,239,0.4) 50%, transparent 80%)',
                  filter: 'blur(25px)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: SPARK - Life ignites */}
      <AnimatePresence>
        {(stage === 'spark' || stage === 'aurora_birth') && (
          <>
            {/* Central brilliant spark */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'spark' ? 1 : 1.2,
                opacity: stage === 'spark' ? 1 : 0.8
              }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.5, ease: cinematicEase }}
            >
              <div
                className="w-48 h-48 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(251,191,36,0.95) 20%, rgba(217,70,239,0.7) 50%, rgba(168,85,247,0.4) 80%, transparent 100%)',
                  filter: 'blur(20px)',
                  boxShadow: '0 0 120px rgba(251, 191, 36, 1), 0 0 240px rgba(168, 85, 247, 0.8)'
                }}
              />
            </motion.div>

            {/* Spark particles radiating with choreography */}
            {stage === 'spark' && [...Array(getOptimalParticleCount(40))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(40)) * Math.PI * 2;
              const distance = 150 + (i % 3) * 50;
              return (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0.8],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.015,
                    ease: cinematicEase
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: auroraColors[i % auroraColors.length].main,
                      boxShadow: `0 0 15px ${auroraColors[i % auroraColors.length].glow}`,
                      filter: 'blur(2px)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: AURORA BIRTH - First ribbons emerge with grace */}
      <AnimatePresence>
        {(stage === 'aurora_birth' || stage === 'cascade' || stage === 'symphony') && (
          <>
            {/* Background aurora layer (slower, deeper) */}
            {auroraColors.slice(0, 5).map((color, i) => (
              <motion.div
                key={`aurora-bg-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '220px',
                  top: `${-5 + i * 20}%`,
                  background: `linear-gradient(to bottom, ${color.glow}80, transparent)`,
                  filter: 'blur(60px)',
                  transformOrigin: 'center',
                  zIndex: 1
                }}
                initial={{ opacity: 0, scaleY: 0, y: -200 }}
                animate={{
                  opacity: stage === 'aurora_birth' ? 0.5 : stage === 'cascade' ? 0.7 : 0.85,
                  scaleY: [0, 1.3, 1.1],
                  y: 0,
                  scaleX: [0.7, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  ease: cinematicEase
                }}
              />
            ))}

            {/* Foreground aurora layer (faster, brighter) */}
            {auroraColors.slice(5).map((color, i) => (
              <motion.div
                key={`aurora-fg-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '180px',
                  top: `${5 + i * 18}%`,
                  background: `linear-gradient(to bottom, ${color.glow}, transparent 70%)`,
                  filter: 'blur(40px)',
                  transformOrigin: 'center',
                  zIndex: 2
                }}
                initial={{ opacity: 0, scaleY: 0, y: -150 }}
                animate={{
                  opacity: stage === 'aurora_birth' ? [0, 0.8] : stage === 'cascade' ? [0.8, 0.95] : [0.95, 1],
                  scaleY: [0, 1.4, 1.2],
                  y: 0,
                  scaleX: [0.6, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.15,
                  ease: cinematicEase
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: CASCADE - Aurora ribbons flow like waterfalls */}
      <AnimatePresence>
        {(stage === 'cascade' || stage === 'symphony') && (
          <>
            {/* Flowing diagonal ribbons */}
            {auroraColors.map((color, i) => (
              <motion.div
                key={`cascade-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '160px',
                  top: `${-15 + i * 13}%`,
                  background: `linear-gradient(135deg, ${color.glow}, transparent 60%)`,
                  filter: 'blur(35px)',
                  transformOrigin: 'left top',
                  zIndex: 3
                }}
                initial={{ opacity: 0, scaleX: 0, x: '-100%', rotate: -10 }}
                animate={{
                  opacity: stage === 'cascade' ? [0, 0.85, 0.7] : [0.7, 0.9, 0.75],
                  scaleX: [0, 1.6, 1.3],
                  x: ['0%', '15%', '0%'],
                  rotate: stage === 'symphony' ? [-10, 5, -5] : -10
                }}
                transition={{
                  opacity: { duration: 2, delay: i * 0.12 },
                  scaleX: { duration: 2.5, delay: i * 0.12, ease: cinematicEase },
                  x: { 
                    duration: stage === 'symphony' ? 4 : 5, 
                    delay: i * 0.15,
                    repeat: stage === 'symphony' ? Infinity : 0,
                    ease: 'easeInOut'
                  },
                  rotate: {
                    duration: 5,
                    repeat: stage === 'symphony' ? Infinity : 0,
                    ease: 'easeInOut'
                  }
                }}
              />
            ))}

            {/* Vertical flowing curtains */}
            {[...Array(getOptimalParticleCount(10))].map((_, i) => (
              <motion.div
                key={`curtain-${i}`}
                className="absolute top-0 bottom-0"
                style={{
                  width: '120px',
                  left: `${5 + i * 10}%`,
                  background: `linear-gradient(to bottom, ${auroraColors[i % auroraColors.length].glow}, transparent 65%)`,
                  filter: 'blur(35px)',
                  transformOrigin: 'top center',
                  zIndex: 4
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: stage === 'symphony' ? [0.4, 0.95, 0.6] : [0, 0.75],
                  scaleY: [0, 1.3, 1.1],
                  x: stage === 'symphony' ? [0, (Math.random() - 0.5) * 60, 0] : 0
                }}
                transition={{
                  duration: 3 + Math.random() * 1.5,
                  delay: 0.3 + i * 0.15,
                  repeat: stage === 'symphony' ? Infinity : 0,
                  ease: cinematicEase
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 5: SYMPHONY - Full cosmic aurora explosion */}
      <AnimatePresence>
        {stage === 'symphony' && (
          <>
            {/* Swirling energy vortex */}
            {[...Array(getOptimalParticleCount(60))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(60)) * Math.PI * 2;
              const layer = i % 4;
              const radius = 120 + layer * 50;
              return (
                <motion.div
                  key={`vortex-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: auroraColors[i % auroraColors.length].main,
                    boxShadow: `0 0 18px ${auroraColors[i % auroraColors.length].glow}`,
                    filter: 'blur(3px)',
                    zIndex: 10
                  }}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + Math.PI) * radius,
                      Math.cos(angle) * radius
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + Math.PI) * radius,
                      Math.sin(angle) * radius
                    ],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.7, 1.6, 0.7]
                  }}
                  transition={{
                    duration: 4 + layer * 0.5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.02
                  }}
                />
              );
            })}

            {/* Dancing light beams */}
            {[...Array(getOptimalParticleCount(20))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(20)) * 360;
              return (
                <motion.div
                  key={`beam-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '100%',
                    height: '8px',
                    background: `linear-gradient(to right, ${auroraColors[i % auroraColors.length].glow}, transparent 50%)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(5px)',
                    zIndex: 5
                  }}
                  animate={{
                    scaleX: [0.6, 1, 0.6],
                    opacity: [0.3, 0.8, 0.3],
                    rotate: [angle, angle + 10, angle]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 6: SUPERNOVA - Epic finale climax */}
      <AnimatePresence>
        {stage === 'supernova' && (
          <>
            {/* Intense rainbow rays explosion */}
            {[...Array(getOptimalParticleCount(100))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(100)) * 360;
              const colorIndex = Math.floor((i / getOptimalParticleCount(100)) * auroraColors.length);
              const rayLength = 120 + (i % 3) * 20;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: `${rayLength}%`,
                    height: '14px',
                    background: `linear-gradient(to right, ${auroraColors[colorIndex].glow}, transparent 65%)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)',
                    zIndex: 20
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: 1, 
                    opacity: [0, 1, 0.8],
                    height: ['14px', '18px', '14px']
                  }}
                  transition={{
                    scaleX: { duration: 0.8, delay: i * 0.002, ease: 'easeOut' },
                    opacity: { duration: 0.8, delay: i * 0.002 },
                    height: { duration: 1.5, delay: i * 0.002, repeat: Infinity, ease: 'easeInOut' }
                  }}
                />
              );
            })}

            {/* Massive central supernova core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1
              }}
              transition={{ duration: 1.5, ease: cinematicEase }}
              style={{ zIndex: 25 }}
            >
              <motion.div
                className="w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(251,191,36,0.95) 12%, rgba(217,70,239,0.8) 25%, rgba(168,85,247,0.6) 40%, rgba(6,182,212,0.4) 60%, rgba(16,185,129,0.2) 80%, transparent 95%)',
                  filter: 'blur(90px)'
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [1, 0.9, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Explosive rainbow particles */}
            {[...Array(getOptimalParticleCount(80))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(80)) * Math.PI * 2;
              const distance = 250 + Math.random() * 450;
              const colorIndex = Math.floor(Math.random() * auroraColors.length);
              return (
                <motion.div
                  key={`explosion-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: auroraColors[colorIndex].main,
                    boxShadow: `0 0 25px ${auroraColors[colorIndex].glow}`,
                    filter: 'blur(3px)',
                    zIndex: 30
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.8, 1],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.008,
                    ease: cinematicEase
                  }}
                />
              );
            })}

            {/* Title reveal with epic entrance */}
            <motion.div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 text-center px-8"
              initial={{ opacity: 0, scale: 0.3, y: 100, rotateX: 45 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: 0
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.6, 
                ease: cinematicEase 
              }}
            >
              <motion.h2 
                className="text-4xl md:text-7xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #d946ef, #06b6d4, #10b981, #f97316, #ff1744)',
                  backgroundSize: '300% 300%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.9))',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 4,
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
                transition={{ duration: 1, delay: 1.2, ease: cinematicEase }}
                style={{
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.8), 0 0 100px rgba(251, 191, 36, 0.5)'
                }}
              >
                Another trip around the sun ✨
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