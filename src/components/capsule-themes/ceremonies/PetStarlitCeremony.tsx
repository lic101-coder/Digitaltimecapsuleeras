/**
 * Pet Starlit Companions Ceremony - EPIC CELESTIAL MEMORIAL
 * 
 * Stars connect to form constellation of pet silhouette watching over you.
 * Shooting stars trace paw print patterns across night sky.
 * Moon emerges bathing constellation in silver light.
 * Peaceful, comforting - they're "up there" watching forever.
 * 
 * Duration: 16 seconds
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetStarlitCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetStarlitCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetStarlitCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'stars' | 'connecting' | 'constellation' | 'moon' | 'shooting' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 600, action: () => setStage('stars') },
      { time: 3200, action: () => setStage('connecting') },
      { time: 5800, action: () => setStage('constellation') },
      { time: 8200, action: () => setStage('moon') },
      { time: 10800, action: () => setStage('shooting') },
      { time: 13200, action: () => setStage('radiance') },
      { time: 15000, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Constellation pattern - SUPER CLEAR DOG PROFILE - obvious head, ears, body, tail, legs
  const constellationPoints = [
    // CLEAR DOG SITTING PROFILE - positioned LEFT away from moon
    // Left ear tip (pointing ears)
    { x: 15, y: 12 },
    // Left ear base
    { x: 18, y: 18 },
    // Top of head
    { x: 22, y: 16 },
    // Forehead
    { x: 25, y: 18 },
    // Snout forward (nose)
    { x: 30, y: 20 },
    { x: 33, y: 21 },
    // Mouth/chin
    { x: 30, y: 24 },
    // Neck down
    { x: 26, y: 28 },
    // Chest
    { x: 24, y: 32 },
    // Front leg top
    { x: 24, y: 38 },
    // Front leg bottom
    { x: 24, y: 44 },
    // Paw
    { x: 22, y: 48 },
    
    // Belly line
    { x: 26, y: 48 },
    { x: 30, y: 48 },
    
    // Back leg bottom
    { x: 32, y: 48 },
    // Back leg up
    { x: 34, y: 44 },
    { x: 36, y: 40 },
    
    // Back/rear
    { x: 38, y: 38 },
    
    // Tail starts - curves UP
    { x: 40, y: 35 },
    { x: 42, y: 30 },
    { x: 43, y: 25 },
    // Tail tip
    { x: 44, y: 20 },
    
    // Back line down from tail base
    { x: 38, y: 32 },
    { x: 34, y: 28 },
    // Shoulder
    { x: 28, y: 24 },
    
    // Right ear
    { x: 26, y: 18 },
    { x: 28, y: 12 },
    { x: 30, y: 16 }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0f172a]">
      {/* Distant stars twinkling */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && capsuleTitle && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-x-0 top-[15%] z-30 text-center px-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-100 drop-shadow-2xl">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Constellation stars appearing */}
      <AnimatePresence>
        {(stage === 'stars' || stage === 'connecting' || stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <>
            {constellationPoints.map((point, i) => {
              const size = 8 + (i % 3) * 4;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: `0 0 ${size * 4}px rgba(147, 197, 253, 0.9), 0 0 ${size * 8}px rgba(96, 165, 250, 0.5)`,
                    zIndex: 20
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.9],
                    scale: [0, 1.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Connecting lines forming constellation */}
      <AnimatePresence>
        {(stage === 'connecting' || stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 15 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(147, 197, 253, 0)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 0.8)" />
                <stop offset="100%" stopColor="rgba(147, 197, 253, 0)" />
              </linearGradient>
            </defs>
            
            {/* Connect stars in sequence to form pet shape */}
            {constellationPoints.map((point, i) => {
              if (i === constellationPoints.length - 1) return null;
              
              const nextPoint = constellationPoints[i + 1];
              
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + i * 0.12,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
            
            {/* Additional connections to complete the shape */}
            {/* Head to body */}
            <motion.line
              x1={`${constellationPoints[1].x}%`}
              y1={`${constellationPoints[1].y}%`}
              x2={`${constellationPoints[5].x}%`}
              y2={`${constellationPoints[5].y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2, ease: 'easeInOut' }}
            />
            
            {/* Tail to body */}
            <motion.line
              x1={`${constellationPoints[12].x}%`}
              y1={`${constellationPoints[12].y}%`}
              x2={`${constellationPoints[6].x}%`}
              y2={`${constellationPoints[6].y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.3, ease: 'easeInOut' }}
            />
          </svg>
        )}
      </AnimatePresence>

      {/* Constellation glow/silhouette */}
      <AnimatePresence>
        {(stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '42%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 10
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Moon emerging behind constellation */}
      <AnimatePresence>
        {(stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <>
            {/* Moon */}
            <motion.div
              className="absolute"
              style={{
                right: '15%',
                top: '20%',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fef9c3, #fde047, #facc15)',
                boxShadow: '0 0 80px rgba(250, 204, 21, 0.6), inset -20px -20px 40px rgba(234, 179, 8, 0.3)',
                zIndex: 5
              }}
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
            />

            {/* Moon glow */}
            <motion.div
              className="absolute"
              style={{
                right: '15%',
                top: '20%',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(250, 204, 21, 0.4), transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 4
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 2.5 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            />

            {/* Moonlight bathing constellation */}
            <motion.div
              className="absolute"
              style={{
                left: '35%',
                top: '25%',
                width: '35%',
                height: '45%',
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.15), rgba(251, 191, 36, 0.08), transparent)',
                filter: 'blur(40px)',
                zIndex: 8,
                transform: 'rotate(-25deg)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Shooting stars with paw print trails */}
      <AnimatePresence>
        {(stage === 'shooting' || stage === 'radiance') && (
          <>
            {[...Array(12)].map((_, i) => {
              const startX = 10 + Math.random() * 30;
              const startY = 10 + Math.random() * 40;
              
              return (
                <React.Fragment key={`shooting-${i}`}>
                  {/* Shooting star */}
                  <motion.div
                    className="absolute w-3 h-3 bg-white rounded-full"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      boxShadow: '0 0 12px rgba(255, 255, 255, 0.9)',
                      zIndex: 25
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [0, 400 + Math.random() * 200],
                      y: [0, 300 + Math.random() * 150]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      ease: 'linear'
                    }}
                  />
                  
                  {/* Paw print trail */}
                  {[...Array(8)].map((_, j) => (
                    <motion.div
                      key={`trail-paw-${i}-${j}`}
                      className="absolute text-xl opacity-60"
                      style={{
                        left: `${startX}%`,
                        top: `${startY}%`,
                        zIndex: 24
                      }}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        x: [(400 + Math.random() * 200) * (j / 8)],
                        y: [(300 + Math.random() * 150) * (j / 8)],
                        scale: [0, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2 + j * 0.1,
                        ease: 'linear'
                      }}
                    >
                      🐾
                    </motion.div>
                  ))}
                  
                  {/* Shooting star trail glow */}
                  <motion.div
                    className="absolute h-1 origin-left"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent)',
                      filter: 'blur(3px)',
                      zIndex: 23,
                      transform: 'rotate(35deg)'
                    }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      width: ['0px', '120px', '0px']
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      ease: 'linear'
                    }}
                  />
                </React.Fragment>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE - Constellation pulses with heartbeat */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Heartbeat pulse from constellation */}
            <motion.div
              className="absolute"
              style={{
                left: '50%',
                top: '42%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3), transparent 60%)',
                filter: 'blur(80px)',
                zIndex: 12
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Stars sparkling around constellation */}
            {[...Array(80)].map((_, i) => {
              const angle = (i / 80) * Math.PI * 2;
              const distance = 100 + Math.random() * 150;
              const x = 50 + Math.cos(angle) * (distance / 8);
              const y = 42 + Math.sin(angle) * (distance / 8);
              
              return (
                <motion.div
                  key={`radiance-star-${i}`}
                  className="absolute w-2 h-2 bg-blue-200 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    boxShadow: '0 0 8px rgba(147, 197, 253, 0.9)',
                    zIndex: 22
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.015,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* "Forever Watching" text */}
            <motion.div
              className="absolute inset-x-0 bottom-[15%] z-30 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <h1 
                className="text-4xl md:text-6xl font-bold text-blue-200"
                style={{
                  textShadow: '0 0 40px rgba(96, 165, 250, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)',
                  filter: 'drop-shadow(0 4px 12px rgba(30, 58, 138, 0.6))'
                }}
              >
                Forever Watching ⭐
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-slate-900 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}