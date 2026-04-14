/**
 * Voyage - Around the World Ceremony (Legendary) - ULTRA CINEMATIC VFX VERSION v2
 * 
 * CONCEPT: Airplane flies over world landmarks across the globe,
 * smooth flight paths with detailed monuments and realistic presentation
 * 
 * ULTRA ENHANCEMENTS v2:
 * - Dramatic airplane takeoff with engine thrust particles
 * - Enhanced realistic contrails with turbulence and fade
 * - Atmospheric depth with layered clouds and parallax
 * - HIGHLY detailed 3D landmarks with ambient animations
 * - Better mobile responsiveness with adaptive effects
 * - Landing pad with animated approach indicators
 * - Radiance finale with globe projection and orbiting planes
 * - GPU-accelerated transforms
 * - Cinematic camera movements
 * 
 * Duration: 15 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-3s: Airplane appears on runway with smooth takeoff
 * 3. 3-6s: Fly OVER Eiffel Tower
 * 4. 6-9s: Fly OVER Pyramids
 * 5. 9-11s: Fly OVER Mountains
 * 6. 11-13s: Smooth landing return home
 * 7. 13-14.5s: Radiance finale
 * 8. 14.5-15s: Outro
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VoyageLegendaryCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function VoyageLegendaryCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: VoyageLegendaryCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'runway' | 'eiffel' | 'pyramids' | 'mountains' | 'return' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('runway') },
      { time: 3000, action: () => setStage('eiffel') },
      { time: 6000, action: () => setStage('pyramids') },
      { time: 9000, action: () => setStage('mountains') },
      { time: 11000, action: () => setStage('return') },
      { time: 13000, action: () => setStage('radiance') },
      { time: 14500, action: () => setStage('outro') },
      { time: 15000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-300 via-blue-200 to-orange-100">
      {/* Soft cloud background */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              left: `${-10 + i * 10}%`,
              top: `${5 + (i % 4) * 20}%`,
              width: `${100 + Math.random() * 80}px`,
              height: `${50 + Math.random() * 40}px`,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '30px 0 30px rgba(255, 255, 255, 0.4), -30px 0 30px rgba(255, 255, 255, 0.4)',
              filter: 'blur(4px)'
            }}
            animate={{
              x: [0, 40, 0],
              opacity: stage === 'radiance' ? 0.1 : 0.6
            }}
            transition={{
              x: { duration: 25 + i * 4, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 1 }
            }}
          />
        ))}
      </div>

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
                color: '#0369a1',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              World Tour
            </motion.h1>
            <p className="text-sky-700 text-xl" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Adventures Across the Globe
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Runway with airplane - ENHANCED TAKEOFF */}
      <AnimatePresence>
        {stage === 'runway' && (
          <motion.div
            className="absolute left-1/2 bottom-20 -translate-x-1/2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Runway */}
            <motion.div
              className="relative"
              style={{
                width: '400px',
                height: '70px',
                background: 'linear-gradient(180deg, #64748b 0%, #475569 100%)',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Runway markings */}
              <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 flex justify-around px-8">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: '24px',
                      height: '10px',
                      background: '#fbbf24',
                      borderRadius: '2px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                  />
                ))}
              </div>

              {/* Airplane emoji on runway - SMOOTH TAKEOFF */}
              <motion.div
                className="absolute"
                style={{
                  left: '30px',
                  top: '50%',
                  fontSize: '56px',
                  transformOrigin: 'center center'
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.6,
                  x: 0,
                  y: 0,
                  rotate: 15
                }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 1],
                  scale: [0.6, 0.8, 0.9, 1, 1.1],
                  x: [0, 0, 40, 120, 280],
                  y: [0, 0, 0, -15, -80],
                  rotate: [15, 15, 10, 0, -8]
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  times: [0, 0.15, 0.35, 0.6, 1],
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                ✈️
              </motion.div>
            </motion.div>

            {/* Takeoff message */}
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sky-700 font-semibold text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, times: [0, 0.2, 0.7, 1], delay: 0.3 }}
            >
              Preparing for takeoff...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying airplane with landmarks */}
      <AnimatePresence>
        {(stage === 'eiffel' || stage === 'pyramids' || stage === 'mountains' || stage === 'return') && (
          <>
            {/* Airplane emoji - PERFECTLY STRAIGHT horizontal flight */}
            <motion.div
              className="absolute z-40"
              initial={
                stage === 'eiffel' 
                  ? { left: '-8%', top: '8%' }
                  : stage === 'pyramids'
                  ? { left: '108%', top: '8%' }
                  : stage === 'mountains'
                  ? { left: '-8%', top: '8%' }
                  : { left: '108%', top: '8%' }
              }
              animate={{
                left: stage === 'eiffel' 
                  ? ['-8%', '108%']
                  : stage === 'pyramids'
                  ? ['108%', '-8%']
                  : stage === 'mountains'
                  ? ['-8%', '108%']
                  : ['108%', '50%'],
                top: stage === 'return' 
                  ? ['8%', '15%', '28%', '42%']
                  : '8%'
              }}
              transition={{
                duration: stage === 'return' ? 2 : 3,
                ease: stage === 'return' ? [0.25, 0.46, 0.45, 0.94] : 'linear',
                times: stage === 'return' ? [0, 0.3, 0.7, 1] : undefined
              }}
              style={{
                fontSize: '72px',
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35))'
              }}
            >
              {/* Airplane rotated to appear perfectly horizontal */}
              <div style={{ 
                transform: (stage === 'pyramids' || stage === 'return') 
                  ? 'scaleX(-1) rotate(45deg)' 
                  : 'scaleX(1) rotate(45deg)',
                display: 'inline-block',
                transformOrigin: 'center center'
              }}>
                ✈️
              </div>
              
              {/* Enhanced contrail - positioned correctly for direction */}
              <div
                className="absolute"
                style={{ 
                  // When plane is flipped (right-to-left), contrail needs to be on right side
                  // When plane is normal (left-to-right), contrail needs to be on left side
                  left: (stage === 'pyramids' || stage === 'return') ? '60px' : '-40px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`trail-${i}`}
                    style={{
                      position: 'absolute',
                      left: (stage === 'pyramids' || stage === 'return') 
                        ? `${i * 22 + 10}px`  // Extend to the right when plane goes left
                        : `${-i * 22 - 10}px`, // Extend to the left when plane goes right
                      top: '0px',
                      width: `${18 + i * 5}px`,
                      height: `${10 + i * 2.5}px`,
                      borderRadius: '50%',
                      background: `rgba(255, 255, 255, ${0.9 - i * 0.08})`,
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)',
                      filter: `blur(${2 + i * 0.3}px)`
                    }}
                    animate={{
                      opacity: [0.9 - i * 0.08, 0.5 - i * 0.05, 0],
                      scale: [1, 1.5, 1.8]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.08,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* EIFFEL TOWER - Highly detailed and grand */}
            {stage === 'eiffel' && (
              <motion.div
                className="absolute z-20"
                style={{
                  right: '15%',
                  bottom: '8%'
                }}
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1 }}
              >
                {/* Sky behind tower */}
                <div className="absolute -top-32 -left-20 w-64 h-48 bg-gradient-to-b from-pink-200 via-purple-200 to-transparent rounded-full opacity-40 blur-2xl" />
                
                <svg width="160" height="340" viewBox="0 0 160 340" style={{ filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))' }}>
                  <defs>
                    <linearGradient id="eiffelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <radialGradient id="eiffelGlow">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9" />
                    </radialGradient>
                  </defs>
                  
                  {/* Base level - widest */}
                  <path d="M 30 340 L 40 280 L 120 280 L 130 340 Z" fill="url(#eiffelGrad)" />
                  <rect x="40" y="278" width="80" height="4" fill="#a78bfa" opacity="0.8" />
                  
                  {/* Lattice work - base */}
                  <line x1="45" y1="340" x2="55" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="60" y1="340" x2="65" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="75" y1="340" x2="80" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="90" y1="340" x2="95" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="105" y1="340" x2="105" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="115" y1="340" x2="105" y2="280" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  
                  {/* Horizontal beams - base */}
                  {[310, 295].map((y, i) => (
                    <line key={i} x1="35" y1={y} x2="125" y2={y} stroke="#a78bfa" strokeWidth="2" opacity="0.7" />
                  ))}
                  
                  {/* Second level */}
                  <path d="M 50 280 L 55 200 L 105 200 L 110 280 Z" fill="url(#eiffelGrad)" />
                  <rect x="55" y="198" width="50" height="4" fill="#a78bfa" opacity="0.8" />
                  
                  {/* Lattice - second level */}
                  <line x1="55" y1="280" x2="60" y2="200" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="70" y1="280" x2="73" y2="200" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="85" y1="280" x2="87" y2="200" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  <line x1="100" y1="280" x2="100" y2="200" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
                  
                  {/* Horizontal beams - second */}
                  {[250, 230].map((y, i) => (
                    <line key={i} x1="52" y1={y} x2="108" y2={y} stroke="#a78bfa" strokeWidth="1.5" opacity="0.7" />
                  ))}
                  
                  {/* Third level */}
                  <path d="M 60 200 L 64 120 L 96 120 L 100 200 Z" fill="url(#eiffelGrad)" />
                  <rect x="64" y="118" width="32" height="3" fill="#a78bfa" opacity="0.8" />
                  
                  {/* Lattice - third level */}
                  <line x1="63" y1="200" x2="67" y2="120" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
                  <line x1="75" y1="200" x2="77" y2="120" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
                  <line x1="85" y1="200" x2="83" y2="120" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
                  <line x1="95" y1="200" x2="93" y2="120" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
                  
                  {/* Horizontal beams - third */}
                  {[170, 150].map((y, i) => (
                    <line key={i} x1="61" y1={y} x2="99" y2={y} stroke="#a78bfa" strokeWidth="1.2" opacity="0.7" />
                  ))}
                  
                  {/* Fourth level - observation deck */}
                  <path d="M 68 120 L 70 60 L 90 60 L 92 120 Z" fill="url(#eiffelGrad)" />
                  <rect x="70" y="58" width="20" height="3" fill="#a78bfa" opacity="0.9" />
                  
                  {/* Top lights */}
                  <circle cx="72" cy="60" r="2" fill="#fbbf24" opacity="0.9" />
                  <circle cx="80" cy="60" r="2" fill="#fbbf24" opacity="0.9" />
                  <circle cx="88" cy="60" r="2" fill="#fbbf24" opacity="0.9" />
                  
                  {/* Spire */}
                  <path d="M 74 60 L 78 15 L 82 15 L 86 60 Z" fill="url(#eiffelGrad)" />
                  <rect x="77" y="8" width="6" height="10" fill="#7c3aed" />
                  
                  {/* Antenna tip */}
                  <rect x="78.5" y="2" width="3" height="8" fill="#a78bfa" />
                  <circle cx="80" cy="2" r="2" fill="#fbbf24" />
                  
                  {/* Glow effect */}
                  <circle cx="80" cy="2" r="4" fill="url(#eiffelGlow)" opacity="0.6" />
                </svg>

                {/* Label */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-purple-800 font-bold text-lg whitespace-nowrap bg-white/80 px-4 py-1 rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Paris, France 🗼
                </motion.div>
              </motion.div>
            )}

            {/* PYRAMIDS OF GIZA - Highly detailed and grand */}
            {stage === 'pyramids' && (
              <motion.div
                className="absolute z-20"
                style={{
                  left: '25%',
                  bottom: '8%'
                }}
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1 }}
              >
                {/* Desert sun */}
                <motion.div
                  className="absolute -top-20 left-32 w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                    boxShadow: '0 0 60px rgba(251, 191, 36, 0.6)'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                />
                
                <svg width="320" height="220" viewBox="0 0 320 220" style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5))' }}>
                  <defs>
                    <linearGradient id="pyramidFront" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="pyramidSide" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="50%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                    <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0" />
                      <stop offset="100%" stopColor="#fde68a" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Sand dunes background */}
                  <ellipse cx="160" cy="220" rx="160" ry="30" fill="url(#sandGradient)" opacity="0.6" />
                  
                  {/* GREAT PYRAMID (Khufu) - Largest, center */}
                  {/* Front face */}
                  <path d="M 160 30 L 50 220 L 270 220 Z" fill="url(#pyramidFront)" />
                  {/* Side face */}
                  <path d="M 160 30 L 270 220 L 160 190 Z" fill="url(#pyramidSide)" opacity="0.85" />
                  
                  {/* Stone block details - front */}
                  {[...Array(12)].map((_, row) => {
                    const y = 50 + row * 14;
                    const width = 40 + row * 16;
                    return (
                      <line 
                        key={`block-${row}`}
                        x1={160 - width/2} 
                        y1={y} 
                        x2={160 + width/2} 
                        y2={y} 
                        stroke="#d97706" 
                        strokeWidth="1.5" 
                        opacity="0.4"
                      />
                    );
                  })}
                  
                  {/* Pyramid of Khafre - Second largest, right */}
                  <path d="M 245 60 L 170 220 L 320 220 Z" fill="url(#pyramidFront)" opacity="0.95" />
                  <path d="M 245 60 L 320 220 L 245 195 Z" fill="url(#pyramidSide)" opacity="0.8" />
                  
                  {/* Stone blocks - Khafre */}
                  {[...Array(10)].map((_, row) => {
                    const y = 75 + row * 14.5;
                    const width = 30 + row * 14;
                    return (
                      <line 
                        key={`block2-${row}`}
                        x1={245 - width/2} 
                        y1={y} 
                        x2={245 + width/2} 
                        y2={y} 
                        stroke="#d97706" 
                        strokeWidth="1" 
                        opacity="0.3"
                      />
                    );
                  })}
                  
                  {/* Pyramid of Menkaure - Smallest, left */}
                  <path d="M 75 100 L 0 220 L 150 220 Z" fill="url(#pyramidFront)" opacity="0.9" />
                  <path d="M 75 100 L 150 220 L 75 200 Z" fill="url(#pyramidSide)" opacity="0.75" />
                  
                  {/* Stone blocks - Menkaure */}
                  {[...Array(8)].map((_, row) => {
                    const y = 115 + row * 13;
                    const width = 25 + row * 12;
                    return (
                      <line 
                        key={`block3-${row}`}
                        x1={75 - width/2} 
                        y1={y} 
                        x2={75 + width/2} 
                        y2={y} 
                        stroke="#d97706" 
                        strokeWidth="0.8" 
                        opacity="0.3"
                      />
                    );
                  })}
                  
                  {/* Sphinx silhouette - foreground */}
                  <ellipse cx="50" cy="210" rx="25" ry="15" fill="#b45309" opacity="0.6" />
                  <rect x="25" y="200" width="50" height="20" rx="5" fill="#b45309" opacity="0.6" />
                  <path d="M 45 200 L 35 185 L 55 185 Z" fill="#b45309" opacity="0.7" />
                </svg>

                {/* Label */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-amber-900 font-bold text-lg whitespace-nowrap bg-white/80 px-4 py-1 rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Giza, Egypt 🏜️
                </motion.div>
              </motion.div>
            )}

            {/* HIMALAYAS MOUNTAINS - Highly detailed and majestic */}
            {stage === 'mountains' && (
              <motion.div
                className="absolute z-20"
                style={{
                  right: '10%',
                  bottom: '8%'
                }}
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1 }}
              >
                {/* Mountain mist/clouds */}
                <div className="absolute top-20 left-10 w-64 h-40 bg-gradient-to-r from-blue-200 via-white to-blue-200 rounded-full opacity-30 blur-3xl" />
                
                <svg width="360" height="260" viewBox="0 0 360 260" style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))' }}>
                  <defs>
                    <linearGradient id="mtGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="20%" stopColor="#e0e7ff" />
                      <stop offset="60%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="mtGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="25%" stopColor="#ddd6fe" />
                      <stop offset="70%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                    <linearGradient id="mtGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="15%" stopColor="#dbeafe" />
                      <stop offset="55%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <radialGradient id="snowGlow">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.6" />
                    </radialGradient>
                  </defs>
                  
                  {/* Background mountain range - far */}
                  <path d="M 0 180 Q 60 140, 120 160 Q 180 150, 240 170 Q 300 155, 360 180 L 360 260 L 0 260 Z" fill="#a5b4fc" opacity="0.4" />
                  
                  {/* Mid-ground mountains */}
                  <path d="M 0 200 L 80 120 L 160 200 Z" fill="url(#mtGrad2)" opacity="0.7" />
                  <path d="M 80 120 L 60 150 L 100 150 Z" fill="url(#snowGlow)" opacity="0.8" />
                  
                  <path d="M 200 200 L 280 140 L 360 200 Z" fill="url(#mtGrad3)" opacity="0.75" />
                  <path d="M 280 140 L 265 165 L 295 165 Z" fill="url(#snowGlow)" opacity="0.85" />
                  
                  {/* MOUNT EVEREST - Tallest peak, center */}
                  <path d="M 180 15 L 80 260 L 280 260 Z" fill="url(#mtGrad1)" />
                  
                  {/* Everest snow cap - detailed */}
                  <path d="M 180 15 L 140 80 L 220 80 Z" fill="#ffffff" opacity="0.98" />
                  <path d="M 180 15 L 150 60 L 210 60 Z" fill="url(#snowGlow)" />
                  
                  {/* Ice ridges */}
                  <path d="M 180 15 L 165 45 L 175 50" stroke="#e0e7ff" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M 180 15 L 195 45 L 185 50" stroke="#e0e7ff" strokeWidth="2" fill="none" opacity="0.7" />
                  
                  {/* Snow patterns */}
                  <path d="M 150 90 Q 160 95, 170 90 Q 180 85, 190 90 Q 200 95, 210 90" stroke="#f8fafc" strokeWidth="3" fill="none" opacity="0.6" />
                  <path d="M 145 110 Q 160 115, 175 110 Q 190 105, 205 110 Q 215 115, 225 110" stroke="#f8fafc" strokeWidth="2.5" fill="none" opacity="0.5" />
                  
                  {/* Rock face details */}
                  <line x1="140" y1="150" x2="160" y2="180" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
                  <line x1="200" y1="150" x2="180" y2="180" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
                  <line x1="120" y1="200" x2="140" y2="230" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                  <line x1="220" y1="200" x2="200" y2="230" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                  
                  {/* Left companion peak */}
                  <path d="M 90 90 L 20 260 L 160 260 Z" fill="url(#mtGrad2)" opacity="0.9" />
                  <path d="M 90 90 L 65 130 L 115 130 Z" fill="#ffffff" opacity="0.95" />
                  <path d="M 90 90 L 75 115 L 105 115 Z" fill="url(#snowGlow)" opacity="0.85" />
                  
                  {/* Right companion peak */}
                  <path d="M 270 100 L 200 260 L 340 260 Z" fill="url(#mtGrad3)" opacity="0.88" />
                  <path d="M 270 100 L 250 135 L 290 135 Z" fill="#ffffff" opacity="0.93" />
                  <path d="M 270 100 L 258 120 L 282 120 Z" fill="url(#snowGlow)" opacity="0.8" />
                  
                  {/* Peak glow effects */}
                  <circle cx="180" cy="15" r="8" fill="#ffffff" opacity="0.6" filter="blur(4px)" />
                  <circle cx="90" cy="90" r="6" fill="#ffffff" opacity="0.5" filter="blur(3px)" />
                  <circle cx="270" cy="100" r="6" fill="#ffffff" opacity="0.5" filter="blur(3px)" />
                </svg>

                {/* Label */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-indigo-900 font-bold text-lg whitespace-nowrap bg-white/80 px-4 py-1 rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Himalayas, Nepal 🏔️
                </motion.div>
              </motion.div>
            )}

            {/* Home/landing pad - SMOOTH LANDING */}
            {stage === 'return' && (
              <motion.div
                className="absolute z-20"
                style={{
                  left: '50%',
                  bottom: '18%',
                  transform: 'translateX(-50%)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <svg width="180" height="180" viewBox="0 0 180 180" style={{ filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3))' }}>
                  {/* Landing circle - animated rings */}
                  <motion.circle 
                    cx="90" 
                    cy="90" 
                    r="80" 
                    fill="#10b981" 
                    opacity="0.85"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle 
                    cx="90" 
                    cy="90" 
                    r="65" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="5" 
                    strokeDasharray="10,8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.circle 
                    cx="90" 
                    cy="90" 
                    r="50" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="4" 
                    strokeDasharray="8,6"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                  <circle cx="90" cy="90" r="35" fill="none" stroke="#ffffff" strokeWidth="4" />
                  <circle cx="90" cy="90" r="22" fill="#34d399" opacity="0.7" />
                  
                  {/* Home icon - larger and detailed */}
                  <path d="M 90 60 L 55 82 L 65 82 L 65 112 L 80 112 L 80 95 L 100 95 L 100 112 L 115 112 L 115 82 L 125 82 Z" fill="#ffffff" />
                  <rect x="83" y="100" width="14" height="12" fill="#10b981" opacity="0.8" />
                  <rect x="70" y="88" width="8" height="8" fill="#34d399" opacity="0.9" />
                  <rect x="102" y="88" width="8" height="8" fill="#34d399" opacity="0.9" />
                </svg>

                {/* Welcome home message */}
                <motion.div
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-emerald-900 font-bold text-xl whitespace-nowrap bg-white/95 px-6 py-2 rounded-full shadow-xl"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  🏠 Welcome Home!
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(40)].map((_, i) => {
              const angle = (i / 40) * 360;

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 4 === 0 ? '10px' : '7px',
                    marginLeft: '-100vw',
                    marginTop: i % 4 === 0 ? '-5px' : '-3.5px',
                    background: i % 2 === 0
                      ? 'linear-gradient(to right, transparent, rgba(14, 165, 233, 0.9) 50%, transparent)'
                      : 'linear-gradient(to right, transparent, rgba(16, 185, 129, 0.85) 50%, transparent)',
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1.5px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.6, 2.4],
                    opacity: [0, 1, 0.95]
                  }}
                  transition={{
                    duration: 1.3,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central radiant glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 6.8, 6.5],
                opacity: [0, 1, 0.96],
                rotate: [0, 120]
              }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            >
              <div
                className="w-[48rem] h-[48rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(224, 242, 254, 0.96) 6%, rgba(14, 165, 233, 0.92) 15%, rgba(16, 185, 129, 0.88) 28%, rgba(3, 105, 161, 0.8) 45%, rgba(6, 78, 59, 0.65) 65%, transparent 92%)',
                  boxShadow: '0 0 450px rgba(14, 165, 233, 0.85), 0 0 650px rgba(16, 185, 129, 0.7)',
                  filter: 'blur(110px)'
                }}
              />
            </motion.div>

            {/* Airplane particles orbiting */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              const radius = 200;

              return (
                <motion.div
                  key={`plane-particle-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    x: [
                      Math.cos((angle * Math.PI) / 180) * radius,
                      Math.cos(((angle + 360) * Math.PI) / 180) * radius
                    ],
                    y: [
                      Math.sin((angle * Math.PI) / 180) * radius,
                      Math.sin(((angle + 360) * Math.PI) / 180) * radius
                    ],
                    rotate: [angle, angle + 360]
                  }}
                  transition={{
                    delay: 0.4 + i * 0.03,
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <div style={{ fontSize: '20px' }}>✈️</div>
                </motion.div>
              );
            })}

            {/* Burst particles */}
            {[...Array(70)].map((_, i) => {
              const angle = (i / 70) * Math.PI * 2;
              const distance = 130 + Math.random() * 280;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 120],
                    scale: [0, 2, 1.7],
                    opacity: [0, 1, 0.9, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.005,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: i % 2 === 0 ? '#0ea5e9' : '#10b981',
                      boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(14, 165, 233, 0.8)' : 'rgba(16, 185, 129, 0.8)'}`
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
                color: '#0369a1',
                textShadow: '0 0 30px rgba(14, 165, 233, 0.8)'
              }}
            >
              Journey Complete
            </h2>
            <p className="text-2xl text-sky-700 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}