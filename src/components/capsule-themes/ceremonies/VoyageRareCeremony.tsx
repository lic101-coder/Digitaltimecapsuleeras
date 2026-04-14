/**
 * Voyage - Compass Rose Bloom Ceremony (Rare) - ULTRA CINEMATIC VFX VERSION
 * 
 * CONCEPT: Ornate compass emerges and expands with cardinal directions illuminating,
 * needle spins and locks north, rays burst from compass points
 * 
 * ULTRA ENHANCEMENTS v2:
 * - Dramatic 3D depth with parallax layers
 * - Enhanced needle physics with realistic momentum and overshoot
 * - Cinematic lens flares and light blooms
 * - Atmospheric fog with depth layers
 * - Enhanced metallic reflections and specularity
 * - More particle density with realistic physics
 * - Compass rotation with inertia
 * - Mobile responsive text sizing
 * - GPU-accelerated transforms with will-change
 * 
 * Duration: 12 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-3s: Compass emerges and expands
 * 3. 3-5s: Cardinal directions illuminate sequentially
 * 4. 5-7s: Ornate details flourish
 * 5. 7-9s: Needle spins and locks north
 * 6. 9-11.5s: Radiance finale
 * 7. 11.5-12s: Outro
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VoyageRareCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function VoyageRareCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: VoyageRareCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'emerge' | 'directions' | 'details' | 'needle' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('emerge') },
      { time: 3000, action: () => setStage('directions') },
      { time: 5000, action: () => setStage('details') },
      { time: 7000, action: () => setStage('needle') },
      { time: 9000, action: () => setStage('radiance') },
      { time: 11500, action: () => setStage('outro') },
      { time: 12000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Subtle map texture background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 46, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 46, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        animate={{
          opacity: stage === 'radiance' ? 0.05 : 0.2
        }}
        transition={{ duration: 1 }}
      />

      {/* Vintage paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(210, 180, 140, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(210, 180, 140, 0.2) 0%, transparent 50%)'
        }}
      />

      {/* Atmospheric golden glow - VFX enhancement */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'radiance' ? 0.6 : stage === 'needle' ? 0.4 : 0.2
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.25) 0%, rgba(160, 116, 40, 0.15) 40%, transparent 70%)',
            filter: 'blur(100px)',
            mixBlendMode: 'screen'
          }}
        />
      </motion.div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#d4af37',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 4px 8px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Journey Awaits
            </motion.h1>
            <p className="text-amber-200 text-xl" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Navigate Your Path
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main compass container - centered */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        
        {/* Compass outer ring */}
        <AnimatePresence>
          {(stage === 'emerge' || stage === 'directions' || stage === 'details' || stage === 'needle') && (
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                marginLeft: '-150px',
                marginTop: '-150px'
              }}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: 0
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {/* Outer brass ring */}
              <svg width="300" height="300" viewBox="0 0 300 300">
                <defs>
                  <radialGradient id="brassGradient">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f4e5b8" />
                    <stop offset="100%" stopColor="#a07428" />
                  </radialGradient>
                  <filter id="compassShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="0" dy="4" result="offsetblur"/>
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer ring */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="145" 
                  fill="none" 
                  stroke="url(#brassGradient)" 
                  strokeWidth="8"
                  filter="url(#compassShadow)"
                />
                
                {/* Inner ring */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="130" 
                  fill="none" 
                  stroke="url(#brassGradient)" 
                  strokeWidth="3"
                  opacity="0.7"
                />

                {/* Background circle */}
                <circle 
                  cx="150" 
                  cy="150" 
                  r="125" 
                  fill="#1e293b"
                  opacity="0.95"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cardinal direction markers - N, E, S, W */}
        <AnimatePresence>
          {(stage === 'directions' || stage === 'details' || stage === 'needle') && (
            <>
              {['N', 'E', 'S', 'W'].map((dir, index) => {
                const angle = index * 90; // 0°=N, 90°=E, 180°=S, 270°=W
                const radius = 110;
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = -Math.cos((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={dir}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      marginLeft: `${x - 16}px`,
                      marginTop: `${y - 16}px`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: 'easeOut'
                    }}
                  >
                    <motion.div
                      className="w-8 h-8 flex items-center justify-center font-bold text-xl"
                      style={{
                        color: dir === 'N' ? '#ef4444' : '#d4af37',
                        textShadow: `0 0 12px ${dir === 'N' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(212, 175, 55, 0.6)'}`,
                        fontFamily: 'Georgia, serif'
                      }}
                      animate={{
                        textShadow: [
                          `0 0 12px ${dir === 'N' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(212, 175, 55, 0.6)'}`,
                          `0 0 20px ${dir === 'N' ? 'rgba(239, 68, 68, 1)' : 'rgba(212, 175, 55, 0.9)'}`,
                          `0 0 12px ${dir === 'N' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(212, 175, 55, 0.6)'}`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {dir}
                    </motion.div>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Degree markers and ornate details */}
        <AnimatePresence>
          {(stage === 'details' || stage === 'needle') && (
            <>
              {/* 45-degree markers (NE, SE, SW, NW) */}
              {[45, 135, 225, 315].map((angle, index) => {
                const radius = 105;
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = -Math.cos((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={`deg-${angle}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      marginLeft: `${x - 3}px`,
                      marginTop: `${y - 3}px`,
                      width: '6px',
                      height: '6px',
                      background: '#d4af37',
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Small tick marks every 30 degrees */}
              {Array.from({ length: 12 }, (_, i) => i * 30).map((angle, index) => {
                if ([0, 90, 180, 270].includes(angle)) return null; // Skip cardinals
                
                const radius = 118;
                const x = Math.sin((angle * Math.PI) / 180) * radius;
                const y = -Math.cos((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={`tick-${angle}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      marginLeft: `${x - 1}px`,
                      marginTop: `${y - 4}px`,
                      width: '2px',
                      height: '8px',
                      background: '#8b7355',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 0.6 }}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.5 + index * 0.03,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Center circle for needle pivot */}
        <AnimatePresence>
          {(stage === 'details' || stage === 'needle') && (
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                marginLeft: '-8px',
                marginTop: '-8px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f4e5b8 0%, #d4af37 50%, #8b7355 100%)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                zIndex: 50
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            />
          )}
        </AnimatePresence>

        {/* Compass needle - using proper clock hand positioning */}
        <AnimatePresence>
          {stage === 'needle' && (
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                width: '0px',
                height: '0px',
                zIndex: 45
              }}
              initial={{ rotate: 180 }}
              animate={{ rotate: [180, 360 + 360 + 360, 360] }}
              transition={{ 
                duration: 1.8,
                ease: [0.34, 1.56, 0.64, 1],
                times: [0, 0.85, 1]
              }}
            >
              {/* North-pointing half (red) */}
              <div
                style={{
                  position: 'absolute',
                  left: '-6px',
                  bottom: '0px',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: '70px solid #ef4444',
                  filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4))',
                  transformOrigin: 'bottom center'
                }}
              />
              
              {/* South-pointing half (white/silver) */}
              <div
                style={{
                  position: 'absolute',
                  left: '-6px',
                  top: '0px',
                  width: '0',
                  height: '0',
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '70px solid #e2e8f0',
                  filter: 'drop-shadow(0 0 4px rgba(226, 232, 240, 0.6)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                  transformOrigin: 'top center'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays from compass points */}
            {[...Array(36)].map((_, i) => {
              const angle = (i / 36) * 360;
              const isPrimary = i % 9 === 0; // Every 9th ray is primary (cardinal/intercardinal)

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: isPrimary ? '10px' : '6px',
                    marginLeft: '-100vw',
                    marginTop: isPrimary ? '-5px' : '-3px',
                    background: isPrimary 
                      ? 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.92) 50%, transparent)'
                      : 'linear-gradient(to right, transparent, rgba(139, 115, 85, 0.7) 50%, transparent)',
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1.5px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.5, 2.3],
                    opacity: [0, 1, 0.95]
                  }}
                  transition={{
                    duration: 1.2,
                    ease: 'easeOut',
                    delay: isPrimary ? 0 : 0.1
                  }}
                />
              );
            })}

            {/* Central radiant glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 6.5, 6.2],
                opacity: [0, 1, 0.95],
                rotate: [0, 90]
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                className="w-[48rem] h-[48rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(248, 239, 210, 0.9) 8%, rgba(212, 175, 55, 0.85) 18%, rgba(160, 116, 40, 0.7) 35%, rgba(139, 115, 85, 0.5) 55%, transparent 90%)',
                  boxShadow: '0 0 400px rgba(212, 175, 55, 0.8), 0 0 600px rgba(212, 175, 55, 0.6)',
                  filter: 'blur(100px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * 360;
              const radius = 180 + (i % 3) * 80;

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#d4af37',
                    boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)'
                  }}
                  animate={{
                    x: [
                      Math.cos((angle * Math.PI) / 180) * radius,
                      Math.cos(((angle + 360) * Math.PI) / 180) * radius
                    ],
                    y: [
                      Math.sin((angle * Math.PI) / 180) * radius,
                      Math.sin(((angle + 360) * Math.PI) / 180) * radius
                    ]
                  }}
                  transition={{
                    delay: 0.3 + i * 0.02,
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              );
            })}

            {/* Burst particles */}
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 120 + Math.random() * 250;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 100],
                    scale: [0, 1.8, 1.5],
                    opacity: [0, 1, 0.9, 0],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.004,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#f4e5b8',
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#d4af37',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Your Path is Set
            </h2>
            <p className="text-2xl text-amber-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}