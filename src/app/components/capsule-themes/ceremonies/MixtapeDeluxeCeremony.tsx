/**
 * Mixtape - Neon Nights Ceremony (Deluxe) 🌆✨
 * 
 * ENHANCED & FIXED - 80s synthwave with MORE effects!
 * 
 * FEATURES:
 * - Animated VHS scanlines across entire screen
 * - Glitch effects during key moments
 * - Perspective grid with neon colors
 * - Neon sun with animated scan lines
 * - Palm tree silhouettes
 * - Mountain ranges with gradients
 * - "FRIENDS FOREVER" text (properly positioned & responsive)
 * - Neon signs (ARCADE, RETRO, 1985)
 * - Flying DeLorean with light trails
 * - TWO neon convertibles (pink & cyan) driving across screen
 * - Laser beams shooting from bottom
 * - Geometric shapes floating
 * - Enhanced radiance finale with orbiting particles
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MixtapeDeluxeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function MixtapeDeluxeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: MixtapeDeluxeCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'grid' | 'sun' | 'city' | 'shapes' | 'pulse' | 'radiance' | 'outro'>('intro');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1200, action: () => setStage('grid') },
      { time: 3200, action: () => setStage('sun') },
      { time: 5200, action: () => setStage('city') },
      { time: 8200, action: () => setStage('shapes') },
      { time: 10500, action: () => { setStage('pulse'); setGlitch(true); } },
      { time: 10700, action: () => setGlitch(false) },
      { time: 12500, action: () => setStage('radiance') },
      { time: 15500, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-black via-purple-950 to-pink-900">
      {/* VHS Scanlines overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.15) 2px, rgba(0, 0, 0, 0.15) 4px)',
            opacity: 0.3
          }}
          animate={{
            y: [0, -4, 0]
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Glitch effect */}
      <AnimatePresence>
        {glitch && (
          <motion.div
            className="absolute inset-0 z-45 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              x: [0, -5, 5, -3, 3, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 0, 255, 0.1) 2px, rgba(255, 0, 255, 0.1) 4px)',
                mixBlendMode: 'screen'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: '#ffffff',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
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
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 text-center z-50"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-3 px-4"
              style={{
                fontFamily: 'Impact, sans-serif',
                color: '#ff00ff',
                textShadow: '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5), 4px 4px 0px #00ffff',
                letterSpacing: '8px'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5), 4px 4px 0px #00ffff',
                  '0 0 30px rgba(255, 0, 255, 1), 0 0 50px rgba(0, 255, 255, 0.7), 4px 4px 0px #00ffff',
                  '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5), 4px 4px 0px #00ffff'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              NEON NIGHTS
            </motion.h1>
            <p className="text-cyan-300 text-lg px-4" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)', fontFamily: 'monospace', letterSpacing: '4px' }}>
              FOREVER ELECTRIC
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSPECTIVE GRID */}
      <AnimatePresence>
        {(stage === 'grid' || stage === 'sun' || stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'grid' ? [0, 0.8] : 0.6 }}
            transition={{ duration: 1.2 }}
          >
            <svg
              className="absolute bottom-0 left-0 right-0"
              style={{ height: '70%', width: '100%' }}
              viewBox="0 0 1000 700"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
                  <stop offset="30%" stopColor="#ff00ff" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#00ffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00ffff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Horizontal lines */}
              {[...Array(25)].map((_, i) => {
                const horizonY = 0;
                const bottomY = 700;
                const progress = i / 24;
                const y = horizonY + (bottomY - horizonY) * Math.pow(progress, 0.6);

                return (
                  <motion.line
                    key={`h-line-${i}`}
                    x1="0"
                    y1={y}
                    x2="1000"
                    y2={y}
                    stroke="url(#gridGradient)"
                    strokeWidth={2 + progress * 2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: 0.6 + progress * 0.4
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: i * 0.04,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}

              {/* Vertical lines */}
              {[...Array(31)].map((_, i) => {
                const xBottom = (i / 30) * 1000;
                const vanishingPointX = 500;
                const vanishingPointY = 0;

                return (
                  <motion.line
                    key={`v-line-${i}`}
                    x1={xBottom}
                    y1={700}
                    x2={vanishingPointX}
                    y2={vanishingPointY}
                    stroke="url(#gridGradient)"
                    strokeWidth={2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: 0.7
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.4 + i * 0.02,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HORIZON LINE */}
      <AnimatePresence>
        {(stage === 'sun' || stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <motion.div
            className="absolute left-0 right-0 z-15"
            style={{ top: '30%' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: 1,
              opacity: 0.8
            }}
            transition={{ duration: 1 }}
          >
            <div
              style={{
                height: '3px',
                background: 'linear-gradient(to right, #ff00ff, #00ffff, #ffff00, #00ffff, #ff00ff)',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)',
                filter: 'blur(1px)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUN - Enhanced with more animation */}
      <AnimatePresence>
        {(stage === 'sun' || stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <motion.div
            className="absolute left-1/2 z-20"
            style={{
              top: '30%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ 
              scale: 0, 
              y: 100,
              opacity: 0 
            }}
            animate={{
              scale: stage === 'sun' ? [0, 1.2, 1] : stage === 'pulse' ? [1, 1.15, 1] : 1,
              y: 0,
              opacity: 1
            }}
            transition={{ 
              scale: { duration: stage === 'pulse' ? 1.5 : 2, repeat: stage === 'pulse' ? Infinity : 0 },
              y: { duration: 2, ease: 'easeOut' },
              opacity: { duration: 1 }
            }}
          >
            {/* Outer glow rings */}
            {[300, 260, 220].map((size, i) => (
              <motion.div
                key={`glow-ring-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 0, 255, 0.3)',
                  boxShadow: `0 0 40px rgba(255, 0, 255, 0.6), inset 0 0 40px rgba(255, 0, 255, 0.2)`
                }}
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}

            {/* Sun body with grid texture */}
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #ffff00 0%, #ff00ff 50%, #ff0080 100%)',
                boxShadow: '0 0 70px rgba(255, 0, 255, 1), 0 0 120px rgba(255, 0, 255, 0.9), inset 0 0 50px rgba(255, 255, 0, 0.6)',
                border: '3px solid #ff00ff',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Scan lines */}
              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={`sun-line-${i}`}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${i * 7.14}%`,
                    height: '2px',
                    background: 'rgba(255, 0, 255, 0.5)',
                    boxShadow: '0 0 6px rgba(255, 0, 255, 0.7)'
                  }}
                  animate={{
                    opacity: [0.4, 0.9, 0.4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}

              {/* Glowing center */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 0, 0.7) 40%, transparent 70%)'
                }}
              />
            </div>

            {/* Enhanced sun rays */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              return (
                <motion.div
                  key={`sun-ray-${i}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '140px',
                    height: '5px',
                    background: 'linear-gradient(to right, #ff00ff, transparent)',
                    transformOrigin: 'left center',
                    transform: `rotate(${angle}deg)`,
                    boxShadow: '0 0 12px rgba(255, 0, 255, 0.9)'
                  }}
                  animate={{
                    scaleX: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PALM TREES */}
      <AnimatePresence>
        {(stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <>
            {/* Left palm */}
            <motion.div
              className="absolute z-22"
              style={{ left: '8%', top: '25%' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <svg width="80" height="180" viewBox="0 0 80 180">
                {/* Trunk */}
                <rect x="35" y="80" width="10" height="100" fill="#ff00ff" opacity="0.6" />
                {/* Palm fronds */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i - 2) * 25;
                  return (
                    <motion.ellipse
                      key={`palm-left-${i}`}
                      cx="40"
                      cy="80"
                      rx="35"
                      ry="8"
                      fill="none"
                      stroke="#00ffff"
                      strokeWidth="3"
                      style={{
                        transformOrigin: '40px 80px',
                        transform: `rotate(${angle}deg)`,
                        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))'
                      }}
                      animate={{
                        ry: [8, 10, 8]
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Right palm */}
            <motion.div
              className="absolute z-22"
              style={{ right: '8%', top: '23%' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <svg width="80" height="190" viewBox="0 0 80 190">
                {/* Trunk */}
                <rect x="35" y="85" width="10" height="105" fill="#ff00ff" opacity="0.6" />
                {/* Palm fronds */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i - 2) * 25;
                  return (
                    <motion.ellipse
                      key={`palm-right-${i}`}
                      cx="40"
                      cy="85"
                      rx="35"
                      ry="8"
                      fill="none"
                      stroke="#00ffff"
                      strokeWidth="3"
                      style={{
                        transformOrigin: '40px 85px',
                        transform: `rotate(${angle}deg)`,
                        filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))'
                      }}
                      animate={{
                        ry: [8, 10, 8]
                      }}
                      transition={{
                        duration: 2.2 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MOUNTAIN RANGES */}
      <AnimatePresence>
        {(stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <>
            {/* Mountain range 1 */}
            <motion.div
              className="absolute left-0 right-0 z-18"
              style={{ top: '28%' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,200 0,150 150,100 300,140 450,80 600,120 750,90 900,130 1000,110 1000,200"
                  fill="url(#mountain1)"
                  stroke="#ff00ff"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.6))' }}
                />
              </svg>
            </motion.div>

            {/* Mountain range 2 */}
            <motion.div
              className="absolute left-0 right-0 z-19"
              style={{ top: '26%' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <svg width="100%" height="250" viewBox="0 0 1000 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,250 0,180 120,140 280,170 400,120 550,160 700,110 850,150 1000,130 1000,250"
                  fill="url(#mountain2)"
                  stroke="#00ffff"
                  strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))' }}
                />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* "FRIENDS FOREVER" - FIXED positioning */}
      <AnimatePresence>
        {(stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <motion.div
            className="absolute z-40"
            style={{
              left: '50%',
              top: '15%',
              transform: 'translateX(-50%)',
              width: 'fit-content',
              maxWidth: '90%',
              textAlign: 'center'
            }}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{
              opacity: stage === 'city' ? [0, 1, 0.9, 1] : stage === 'pulse' ? [0.9, 1, 0.9] : 0.9,
              y: 0,
              scale: 1
            }}
            transition={{ 
              opacity: { duration: stage === 'pulse' ? 1 : 0.8, repeat: stage === 'pulse' ? Infinity : 0 },
              y: { duration: 0.8 },
              scale: { duration: 0.8 }
            }}
          >
            <div
              style={{
                fontFamily: 'Impact, sans-serif',
                fontSize: 'clamp(20px, 5vw, 44px)',
                fontWeight: 'bold',
                color: '#ff00ff',
                textShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff, 0 0 60px #ff00ff, 3px 3px 0px #00ffff',
                letterSpacing: 'clamp(1px, 0.6vw, 5px)',
                textAlign: 'center',
                padding: '0 8px'
              }}
            >
              FRIENDS FOREVER
            </div>
            <motion.div
              style={{
                position: 'absolute',
                inset: '-8px',
                border: '3px solid #00ffff',
                borderRadius: '10px',
                boxShadow: '0 0 25px #00ffff, inset 0 0 25px rgba(0, 255, 255, 0.2)'
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                boxShadow: [
                  '0 0 25px #00ffff, inset 0 0 25px rgba(0, 255, 255, 0.2)',
                  '0 0 45px #00ffff, inset 0 0 45px rgba(0, 255, 255, 0.4)',
                  '0 0 25px #00ffff, inset 0 0 25px rgba(0, 255, 255, 0.2)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional neon signs */}
      <AnimatePresence>
        {(stage === 'shapes' || stage === 'pulse') && (
          <>
            {/* "ARCADE" sign */}
            <motion.div
              className="absolute z-38"
              style={{ left: '12%', top: '35%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0.7, 0.9], scale: 1 }}
              transition={{ 
                opacity: { duration: 1.5, repeat: Infinity },
                scale: { duration: 0.6 }
              }}
            >
              <div
                style={{
                  fontFamily: 'Impact, sans-serif',
                  fontSize: 'clamp(16px, 2.5vw, 28px)',
                  color: '#ffff00',
                  textShadow: '0 0 15px #ffff00, 0 0 30px #ffff00',
                  letterSpacing: '3px',
                  transform: 'rotate(-12deg)'
                }}
              >
                ARCADE
              </div>
            </motion.div>

            {/* "RETRO" sign */}
            <motion.div
              className="absolute z-38"
              style={{ right: '15%', top: '38%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.85, 0.6, 0.85], scale: 1 }}
              transition={{ 
                opacity: { duration: 1.8, repeat: Infinity, delay: 0.3 },
                scale: { duration: 0.6, delay: 0.2 }
              }}
            >
              <div
                style={{
                  fontFamily: 'Impact, sans-serif',
                  fontSize: 'clamp(14px, 2.2vw, 24px)',
                  color: '#00ffff',
                  textShadow: '0 0 15px #00ffff, 0 0 30px #00ffff',
                  letterSpacing: '3px',
                  transform: 'rotate(8deg)'
                }}
              >
                RETRO
              </div>
            </motion.div>

            {/* "1985" sign */}
            <motion.div
              className="absolute z-38"
              style={{ left: '50%', top: '52%', transform: 'translateX(-50%)' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.8, 0.5, 0.8], scale: 1 }}
              transition={{ 
                opacity: { duration: 2.2, repeat: Infinity, delay: 0.5 },
                scale: { duration: 0.7, delay: 0.3 }
              }}
            >
              <div
                style={{
                  fontFamily: 'Impact, sans-serif',
                  fontSize: 'clamp(18px, 3vw, 32px)',
                  color: '#ff00ff',
                  textShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff',
                  letterSpacing: '4px'
                }}
              >
                1985
              </div>
            </motion.div>

            {/* Flying DeLorean-style trail */}
            <motion.div
              className="absolute z-36"
              style={{ left: '-10%', top: '20%' }}
              animate={{
                left: ['-10%', '110%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
                delay: 1
              }}
            >
              <svg width="80" height="40" viewBox="0 0 80 40">
                {/* Car body */}
                <rect x="10" y="15" width="60" height="20" fill="#ff00ff" opacity="0.8" />
                {/* Light trails */}
                {[0, 1, 2].map((i) => (
                  <motion.rect
                    key={`trail-${i}`}
                    x={-20 - i * 15}
                    y={15}
                    width={15}
                    height={20}
                    fill="#00ffff"
                    opacity={0.6 - i * 0.2}
                    animate={{
                      opacity: [0.6 - i * 0.2, 0, 0.6 - i * 0.2]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Neon Convertible Cars */}
      <AnimatePresence>
        {(stage === 'city' || stage === 'shapes' || stage === 'pulse') && (
          <>
            {/* Pink convertible driving left to right */}
            <motion.div
              className="absolute z-37"
              style={{ left: '-15%', top: '60%' }}
              animate={{
                left: ['-15%', '115%']
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.5
              }}
            >
              <svg width="140" height="70" viewBox="0 0 140 70">
                {/* Headlight beams */}
                <motion.polygon
                  points="130,45 200,30 200,60"
                  fill="rgba(255, 255, 0, 0.3)"
                  style={{ filter: 'blur(3px)' }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
                {/* Car body */}
                <path
                  d="M 20,50 L 30,35 L 50,30 L 80,30 L 100,35 L 110,50 Z"
                  fill="url(#carGradient1)"
                  stroke="#ff00ff"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(255, 0, 255, 0.8))' }}
                />
                {/* Windshield */}
                <path
                  d="M 50,32 L 55,28 L 75,28 L 80,32 Z"
                  fill="rgba(0, 255, 255, 0.3)"
                  stroke="#00ffff"
                  strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))' }}
                />
                {/* Wheels */}
                <circle cx="40" cy="50" r="8" fill="#000000" stroke="#00ffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' }} />
                <circle cx="90" cy="50" r="8" fill="#000000" stroke="#00ffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' }} />
                {/* Headlights */}
                <motion.circle
                  cx="125"
                  cy="45"
                  r="4"
                  fill="#ffff00"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 1))' }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
                <motion.circle
                  cx="125"
                  cy="55"
                  r="4"
                  fill="#ffff00"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 1))' }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
                {/* Speed lines */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.line
                    key={`speed-${i}`}
                    x1={-10 - i * 20}
                    y1={40 + i * 5}
                    x2={10 - i * 20}
                    y2={40 + i * 5}
                    stroke="#ff00ff"
                    strokeWidth="2"
                    opacity={0.5 - i * 0.1}
                    style={{ filter: 'blur(1px)' }}
                    animate={{
                      opacity: [0.5 - i * 0.1, 0, 0.5 - i * 0.1]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="carGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00ff" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Cyan convertible driving right to left (higher up) */}
            <motion.div
              className="absolute z-37"
              style={{ right: '-15%', top: '45%', transform: 'scaleX(-1)' }}
              animate={{
                right: ['-15%', '115%']
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
                delay: 3
              }}
            >
              <svg width="140" height="70" viewBox="0 0 140 70">
                {/* Headlight beams */}
                <motion.polygon
                  points="130,45 200,30 200,60"
                  fill="rgba(255, 255, 0, 0.3)"
                  style={{ filter: 'blur(3px)' }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
                {/* Car body */}
                <path
                  d="M 20,50 L 30,35 L 50,30 L 80,30 L 100,35 L 110,50 Z"
                  fill="url(#carGradient2)"
                  stroke="#00ffff"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))' }}
                />
                {/* Windshield */}
                <path
                  d="M 50,32 L 55,28 L 75,28 L 80,32 Z"
                  fill="rgba(255, 0, 255, 0.3)"
                  stroke="#ff00ff"
                  strokeWidth="1.5"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.6))' }}
                />
                {/* Wheels */}
                <circle cx="40" cy="50" r="8" fill="#000000" stroke="#ffff00" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.8))' }} />
                <circle cx="90" cy="50" r="8" fill="#000000" stroke="#ffff00" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.8))' }} />
                {/* Headlights */}
                <motion.circle
                  cx="125"
                  cy="45"
                  r="4"
                  fill="#ffff00"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 1))' }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
                <motion.circle
                  cx="125"
                  cy="55"
                  r="4"
                  fill="#ffff00"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 1))' }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
                {/* Speed lines */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.line
                    key={`speed2-${i}`}
                    x1={-10 - i * 20}
                    y1={40 + i * 5}
                    x2={10 - i * 20}
                    y2={40 + i * 5}
                    stroke="#00ffff"
                    strokeWidth="2"
                    opacity={0.5 - i * 0.1}
                    style={{ filter: 'blur(1px)' }}
                    animate={{
                      opacity: [0.5 - i * 0.1, 0, 0.5 - i * 0.1]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="carGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#0080ff" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Laser beams */}
      <AnimatePresence>
        {(stage === 'pulse') && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`laser-${i}`}
                className="absolute z-25"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: '0%',
                  width: '3px',
                  height: '100%',
                  background: `linear-gradient(to top, ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}, transparent)`,
                  filter: `blur(2px)`,
                  boxShadow: `0 0 15px ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}`,
                  transformOrigin: 'bottom'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* GEOMETRIC SHAPES - Enhanced */}
      <AnimatePresence>
        {(stage === 'shapes' || stage === 'pulse') && (
          <>
            {[...Array(10)].map((_, i) => {
              const isTriangle = i % 2 === 0;
              const colors = ['#ff00ff', '#00ffff', '#ffff00'];
              const size = 45 + Math.random() * 50;
              const x = 10 + (i * 10);
              const y = 42 + (i % 4) * 15;

              return (
                <motion.div
                  key={`shape-${i}`}
                  className="absolute z-35"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  animate={{
                    opacity: stage === 'shapes' ? [0, 0.8] : [0.8, 1, 0.8],
                    scale: stage === 'shapes' ? [0, 1] : [1, 1.3, 1],
                    rotate: stage === 'shapes' ? [0, 180] : [180, 360],
                    y: stage === 'pulse' ? [0, -25, 0] : 0
                  }}
                  transition={{
                    opacity: { duration: stage === 'pulse' ? 2 : 0.7, delay: i * 0.1, repeat: stage === 'pulse' ? Infinity : 0 },
                    scale: { duration: stage === 'pulse' ? 2 : 0.9, delay: i * 0.1, repeat: stage === 'pulse' ? Infinity : 0 },
                    rotate: { duration: stage === 'pulse' ? 4 : 1.2, delay: i * 0.1, repeat: stage === 'pulse' ? Infinity : 0 },
                    y: { duration: 2.2, delay: i * 0.2, repeat: stage === 'pulse' ? Infinity : 0 }
                  }}
                >
                  <svg width={size} height={size} viewBox="0 0 100 100">
                    {isTriangle ? (
                      <polygon
                        points="50,10 90,90 10,90"
                        fill="none"
                        stroke={colors[i % 3]}
                        strokeWidth="4"
                        style={{
                          filter: `drop-shadow(0 0 18px ${colors[i % 3]})`
                        }}
                      />
                    ) : (
                      <rect
                        x="10"
                        y="10"
                        width="80"
                        height="80"
                        fill="none"
                        stroke={colors[i % 3]}
                        strokeWidth="4"
                        style={{
                          filter: `drop-shadow(0 0 18px ${colors[i % 3]})`
                        }}
                      />
                    )}
                  </svg>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE - Enhanced */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const colors = ['rgba(255, 0, 255, 1)', 'rgba(0, 255, 255, 1)', 'rgba(255, 255, 0, 1)', 'rgba(255, 255, 255, 1)'];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 4 === 0 ? '12px' : i % 4 === 1 ? '9px' : i % 4 === 2 ? '11px' : '10px',
                    marginLeft: '-100vw',
                    marginTop: i % 4 === 0 ? '-6px' : i % 4 === 1 ? '-4.5px' : i % 4 === 2 ? '-5.5px' : '-5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.94)')} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 3, 2.8],
                    opacity: [0, 1, 0.95]
                  }}
                  transition={{
                    duration: 1.4,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 7.5, 7.2],
                opacity: [0, 1, 0.97],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.7, ease: 'easeOut' }}
            >
              <div
                className="w-[52rem] h-[52rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 200, 255, 0.98) 7%, rgba(255, 0, 255, 0.95) 16%, rgba(0, 255, 255, 0.91) 26%, rgba(255, 255, 0, 0.86) 38%, rgba(255, 0, 255, 0.79) 52%, rgba(0, 255, 255, 0.69) 68%, rgba(80, 40, 120, 0.53) 84%, transparent 97%)',
                  boxShadow: '0 0 500px rgba(255, 0, 255, 0.97), 0 0 700px rgba(0, 255, 255, 0.85)',
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 190 + ring * 120;
                const count = 45 + ring * 22;
                
                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ffffff'];
                  
                  particles.push(
                    <motion.div
                      key={`orbit-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: colors[i % 4],
                        boxShadow: `0 0 16px ${colors[i % 4]}`
                      }}
                      animate={{
                        x: [
                          Math.cos(angle * Math.PI / 180) * radius,
                          Math.cos((angle + 360) * Math.PI / 180) * radius
                        ],
                        y: [
                          Math.sin(angle * Math.PI / 180) * radius,
                          Math.sin((angle + 360) * Math.PI / 180) * radius
                        ]
                      }}
                      transition={{
                        delay: 0.5 + (ring * 67 + i) * 0.003,
                        duration: 6.8 + ring * 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  );
                }
              }
              return particles;
            })()}

            {/* Burst particles */}
            {[...Array(100)].map((_, i) => {
              const angle = (i / 100) * Math.PI * 2;
              const distance = 145 + Math.random() * 320;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#ff00ff', '#00ffff', '#ffff00'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 150],
                    scale: [0, 2.3, 2],
                    opacity: [0, 1, 0.95, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.8,
                    delay: i * 0.007,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '9px',
                      borderRadius: '50%',
                      background: colors[i % 3],
                      boxShadow: `0 0 14px ${colors[i % 3]}`,
                      filter: 'brightness(1.3)'
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
            transition={{ delay: 0.6, duration: 0.9 }}
            className="absolute bottom-20 left-0 right-0 text-center z-50 px-4"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
              style={{
                fontFamily: 'Impact, sans-serif',
                color: '#ff00ff',
                textShadow: '0 0 25px #ff00ff, 0 0 50px #00ffff, 3px 3px 0px #00ffff',
                letterSpacing: 'clamp(2px, 1vw, 6px)'
              }}
            >
              NEVER ENDING
            </h2>
            <p 
              className="text-2xl text-cyan-300" 
              style={{ 
                textShadow: '0 0 15px rgba(0, 255, 255, 0.9)', 
                fontFamily: 'monospace',
                fontSize: 'clamp(16px, 3vw, 24px)'
              }}
            >
              {capsuleTitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
