/**
 * Mixtape - Arcade Insert Coin Ceremony (Epic)
 * 
 * CONCEPT: 8-bit pixel adventure with classic game sprites breaking into 3D
 * 
 * Duration: 17 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-3s: Insert coin animation
 * 3. 3-6s: Game start with sprites appearing
 * 4. 6-9s: Multiple classic game references
 * 5. 9-12s: Pixel explosion into 3D
 * 6. 12-14s: Golden trophy transformation
 * 7. 14-16.5s: Radiance finale
 * 8. 16.5-17s: Outro
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MixtapeEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function MixtapeEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: MixtapeEpicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'coin' | 'sprites' | 'games' | 'explosion' | 'trophy' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('coin') },
      { time: 3000, action: () => setStage('sprites') },
      { time: 6000, action: () => setStage('games') },
      { time: 9000, action: () => setStage('explosion') },
      { time: 12000, action: () => setStage('trophy') },
      { time: 14000, action: () => setStage('radiance') },
      { time: 16500, action: () => setStage('outro') },
      { time: 17000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Pixel grid background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0a0a14 100%)',
          backgroundSize: '20px 20px',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `
        }}
        animate={{
          opacity: stage === 'explosion' ? 0.3 : 1
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 2, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
            style={{ fontFamily: 'monospace' }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#00ff00',
                textShadow: '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)',
                  '0 0 30px rgba(0, 255, 0, 1), 0 0 60px rgba(0, 255, 0, 0.7)',
                  '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)'
                ]
              }}
              transition={{ duration: 1, repeat: 1 }}
            >
              ARCADE
            </motion.h1>
            <p className="text-cyan-400" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
              Insert Coin to Continue
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSERT COIN */}
      <AnimatePresence>
        {stage === 'coin' && (
          <>
            {/* Blinking INSERT COIN text */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30"
              style={{ fontFamily: 'monospace' }}
              animate={{
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity
              }}
            >
              <div
                className="text-4xl font-bold"
                style={{
                  color: '#ffff00',
                  textShadow: '0 0 20px rgba(255, 255, 0, 0.9), 0 0 40px rgba(255, 255, 0, 0.6)',
                  letterSpacing: '4px'
                }}
              >
                INSERT COIN
              </div>
            </motion.div>

            {/* Coin slot */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: '120px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  borderRadius: '8px',
                  boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.4)',
                  border: '3px solid #1a252f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '6px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '3px'
                  }}
                />
              </div>
            </motion.div>

            {/* Falling coin */}
            <motion.div
              className="absolute left-1/2 z-35"
              initial={{ 
                top: '20%',
                x: '-50%',
                rotateY: 0
              }}
              animate={{
                top: ['20%', '50%'],
                rotateY: [0, 1080]
              }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: 'easeIn'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 50%, #e67e22 100%)',
                  boxShadow: '0 0 20px rgba(241, 196, 15, 0.8), inset 0 2px 8px rgba(255, 255, 255, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.4)',
                  border: '3px solid #d68910',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#8b6914',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
                }}
              >
                $
              </div>
            </motion.div>

            {/* Coin clink flash */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-32"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 3, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.4,
                delay: 1.5
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
                  boxShadow: '0 0 60px rgba(255, 255, 255, 0.9)'
                }}
              />
            </motion.div>

            {/* PLAYER 1 START */}
            <motion.div
              className="absolute bottom-1/3 left-1/2 -translate-x-1/2 z-30"
              style={{ fontFamily: 'monospace' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.5, 1],
                scale: [0, 1.2, 1]
              }}
              transition={{
                duration: 0.5,
                delay: 1.6
              }}
            >
              <div
                className="text-3xl font-bold"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 20px rgba(0, 255, 0, 0.9), 0 0 40px rgba(0, 255, 0, 0.6)',
                  letterSpacing: '3px'
                }}
              >
                PLAYER 1 START
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SPRITES STAGE - Classic characters appear */}
      <AnimatePresence>
        {(stage === 'sprites' || stage === 'games') && (
          <>
            {/* Pac-Man style circle chomping across */}
            <motion.div
              className="absolute z-25"
              initial={{ left: '-10%', top: '25%' }}
              animate={{
                left: stage === 'sprites' ? '110%' : '50%',
                top: stage === 'sprites' ? '25%' : '30%'
              }}
              transition={{
                duration: stage === 'sprites' ? 3 : 0.5,
                ease: 'linear'
              }}
            >
              <motion.div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffff00',
                  boxShadow: '0 0 20px rgba(255, 255, 0, 0.8)',
                  position: 'relative',
                  clipPath: 'polygon(0% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)'
                }}
                animate={{
                  clipPath: [
                    'polygon(0% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)',
                    'polygon(0% 50%, 50% 25%, 0% 0%, 0% 100%, 50% 75%)',
                    'polygon(0% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)'
                  ]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity
                }}
              />
            </motion.div>

            {/* Dots for Pac-Man to eat */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute z-24"
                style={{
                  left: `${10 + i * 12}%`,
                  top: '26.5%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff8800',
                  boxShadow: '0 0 10px rgba(255, 136, 0, 0.8)'
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.35
                }}
              />
            ))}

            {/* Space Invaders aliens marching */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`alien-${i}`}
                className="absolute z-25"
                style={{
                  left: `${15 + i * 12}%`,
                  top: stage === 'sprites' ? '15%' : '20%'
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: stage === 'sprites' ? [0, 10, 0] : 0
                }}
                transition={{
                  opacity: { duration: 0.3, delay: i * 0.1 },
                  y: { duration: 0.8, repeat: Infinity, delay: i * 0.1 }
                }}
              >
                <svg width="40" height="32" viewBox="0 0 40 32" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.8))' }}>
                  <rect x="8" y="0" width="8" height="8" fill="#00ff00" />
                  <rect x="24" y="0" width="8" height="8" fill="#00ff00" />
                  <rect x="0" y="8" width="40" height="8" fill="#00ff00" />
                  <rect x="0" y="16" width="8" height="8" fill="#00ff00" />
                  <rect x="8" y="16" width="8" height="8" fill="transparent" />
                  <rect x="16" y="16" width="8" height="8" fill="#00ff00" />
                  <rect x="24" y="16" width="8" height="8" fill="transparent" />
                  <rect x="32" y="16" width="8" height="8" fill="#00ff00" />
                  <rect x="0" y="24" width="8" height="8" fill="#00ff00" />
                  <rect x="32" y="24" width="8" height="8" fill="#00ff00" />
                </svg>
              </motion.div>
            ))}

            {/* Tetris blocks falling */}
            {[...Array(4)].map((_, i) => {
              const colors = ['#00ffff', '#ffff00', '#ff00ff', '#ff8800'];
              const shapes = [
                [[0,0], [1,0], [2,0], [3,0]], // I piece
                [[0,0], [1,0], [0,1], [1,1]], // O piece
                [[1,0], [0,1], [1,1], [2,1]], // T piece
                [[0,0], [1,0], [1,1], [2,1]]  // Z piece
              ];

              return (
                <motion.div
                  key={`tetris-${i}`}
                  className="absolute z-25"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: stage === 'sprites' ? '-10%' : '40%'
                  }}
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    y: stage === 'sprites' ? window.innerHeight * 0.8 : 0,
                    rotate: stage === 'sprites' ? [0, 90, 180, 270, 360] : 0
                  }}
                  transition={{
                    duration: stage === 'sprites' ? 3 : 0.5,
                    delay: i * 0.3,
                    ease: stage === 'sprites' ? 'linear' : 'easeOut'
                  }}
                >
                  {shapes[i].map((pos, j) => (
                    <div
                      key={`block-${j}`}
                      style={{
                        position: 'absolute',
                        left: `${pos[0] * 20}px`,
                        top: `${pos[1] * 20}px`,
                        width: '20px',
                        height: '20px',
                        background: colors[i],
                        border: '2px solid rgba(0, 0, 0, 0.3)',
                        boxShadow: `0 0 15px ${colors[i]}`,
                        borderRadius: '2px'
                      }}
                    />
                  ))}
                </motion.div>
              );
            })}

            {/* Pac-Man ghosts floating */}
            {[...Array(4)].map((_, i) => {
              const colors = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb851']; // Blinky (red), Pinky (pink), Inky (cyan), Clyde (orange)

              return (
                <motion.div
                  key={`ghost-${i}`}
                  className="absolute z-25"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: stage === 'sprites' ? '45%' : '50%'
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: stage === 'sprites' ? [0, -15, 0] : 0,
                    opacity: 1
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: i * 0.2 },
                    y: { duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }
                  }}
                >
                  <svg width="50" height="56" viewBox="0 0 50 56" style={{ filter: `drop-shadow(0 0 12px ${colors[i]})` }}>
                    {/* Ghost body */}
                    <path
                      d="M 5 25 Q 5 5, 25 5 Q 45 5, 45 25 L 45 50 L 40 45 L 35 50 L 30 45 L 25 50 L 20 45 L 15 50 L 10 45 L 5 50 Z"
                      fill={colors[i]}
                      stroke="rgba(0, 0, 0, 0.2)"
                      strokeWidth="1"
                    />
                    
                    {/* Eyes - white background */}
                    <ellipse cx="18" cy="22" rx="6" ry="8" fill="white" />
                    <ellipse cx="32" cy="22" rx="6" ry="8" fill="white" />
                    
                    {/* Pupils */}
                    <motion.ellipse
                      cx="18"
                      cy="24"
                      rx="3"
                      ry="4"
                      fill="#0000cc"
                      animate={{
                        cx: [18, 20, 18, 16, 18]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                    <motion.ellipse
                      cx="32"
                      cy="24"
                      rx="3"
                      ry="4"
                      fill="#0000cc"
                      animate={{
                        cx: [32, 34, 32, 30, 32]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  </svg>
                </motion.div>
              );
            })}

            {/* Score counter */}
            <motion.div
              className="absolute top-8 right-8 z-30"
              style={{ fontFamily: 'monospace', color: '#ffffff', fontSize: '24px', textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              SCORE: <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {i === 19 ? (i + 1) * 500 : ''}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>

            {/* Lives indicator */}
            <motion.div
              className="absolute top-8 left-8 z-30 flex items-center gap-2"
              style={{ fontFamily: 'monospace', color: '#ffffff', fontSize: '20px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>LIVES:</span>
              {[...Array(3)].map((_, i) => (
                <div
                  key={`life-${i}`}
                  style={{
                    width: '20px',
                    height: '20px',
                    background: '#ff0000',
                    clipPath: 'polygon(50% 0%, 0% 40%, 20% 40%, 50% 70%, 80% 40%, 100% 40%)',
                    filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))'
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EXPLOSION - Pixels break into 3D */}
      <AnimatePresence>
        {stage === 'explosion' && (
          <>
            {/* Massive pixel burst */}
            {[...Array(150)].map((_, i) => {
              const angle = (i / 150) * Math.PI * 2;
              const distance = 100 + Math.random() * 400;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#ff8800'];
              const size = 8 + Math.random() * 16;

              return (
                <motion.div
                  key={`pixel-${i}`}
                  className="absolute left-1/2 top-1/2 z-30"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotateX: 0, rotateY: 0 }}
                  animate={{
                    x: x,
                    y: y,
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0.8],
                    rotateX: [0, Math.random() * 360],
                    rotateY: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.003,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      background: colors[i % 5],
                      boxShadow: `0 0 20px ${colors[i % 5]}, inset 0 0 8px rgba(255, 255, 255, 0.4)`,
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* GAME OVER text */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-35"
              style={{ fontFamily: 'monospace' }}
              initial={{ scale: 0, opacity: 0, rotateX: -90 }}
              animate={{
                scale: [0, 1.3, 1],
                opacity: 1,
                rotateX: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.5
              }}
            >
              <div
                className="text-6xl font-bold"
                style={{
                  color: '#ff0000',
                  textShadow: '0 0 30px rgba(255, 0, 0, 0.9), 0 0 60px rgba(255, 0, 0, 0.6)',
                  letterSpacing: '8px'
                }}
              >
                GAME OVER
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TROPHY */}
      <AnimatePresence>
        {stage === 'trophy' && (
          <>
            {/* NEW HIGH SCORE text */}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 z-35"
              style={{ fontFamily: 'monospace' }}
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: [0, 1, 0.8, 1],
                y: 0
              }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="text-5xl font-bold"
                style={{
                  color: '#ffff00',
                  textShadow: '0 0 30px rgba(255, 255, 0, 1), 0 0 60px rgba(255, 255, 0, 0.7)',
                  letterSpacing: '6px'
                }}
              >
                NEW HIGH SCORE!
              </div>
            </motion.div>

            {/* Golden Trophy */}
            <motion.div
              className="absolute left-1/2 z-35"
              style={{
                top: '32%',
                transform: 'translateX(-50%)'
              }}
              initial={{ scale: 0, rotateY: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1],
                rotateY: [0, 360],
                opacity: 1
              }}
              transition={{
                scale: { duration: 1, ease: 'easeOut' },
                rotateY: { duration: 2, ease: 'linear' },
                opacity: { duration: 0.5 }
              }}
            >
              <svg width="200" height="240" viewBox="0 0 200 240" style={{ filter: 'drop-shadow(0 10px 40px rgba(255, 215, 0, 0.8))' }}>
                {/* Cup body */}
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="50%" stopColor="#ffed4e" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                
                {/* Left handle */}
                <path d="M 50 60 Q 20 80 30 120 L 50 110 Z" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
                
                {/* Right handle */}
                <path d="M 150 60 Q 180 80 170 120 L 150 110 Z" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
                
                {/* Main cup */}
                <path d="M 60 40 L 50 130 Q 100 150 150 130 L 140 40 Z" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="3" />
                
                {/* Cup rim */}
                <ellipse cx="100" cy="40" rx="45" ry="12" fill="#ffed4e" stroke="#b8860b" strokeWidth="2" />
                
                {/* Base stem */}
                <rect x="85" y="130" width="30" height="40" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="2" />
                
                {/* Base */}
                <ellipse cx="100" cy="180" rx="50" ry="15" fill="url(#goldGradient)" stroke="#b8860b" strokeWidth="3" />
                
                {/* Shine effect */}
                <ellipse cx="80" cy="80" rx="15" ry="30" fill="rgba(255, 255, 255, 0.4)" />
              </svg>

              {/* Sparkles around trophy */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={`sparkle-${i}`}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: '16px',
                      height: '16px',
                      background: '#ffffff',
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                      boxShadow: '0 0 20px rgba(255, 255, 255, 1)'
                    }}
                    animate={{
                      x: [0, x],
                      y: [0, y],
                      scale: [0, 1, 0.8, 1],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.08,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Winner name plate */}
            <motion.div
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-35"
              style={{ fontFamily: 'monospace' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: [0, 1.2, 1]
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  border: '3px solid #ffd700',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.4)'
                }}
              >
                <div className="text-2xl font-bold text-yellow-400" style={{ letterSpacing: '2px' }}>
                  CHAMPION
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays with arcade colors */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const colors = ['rgba(0, 255, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(0, 255, 255, 1)', 'rgba(255, 0, 255, 1)', 'rgba(255, 136, 0, 1)'];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 5 === 0 ? '12px' : i % 5 === 1 ? '8px' : i % 5 === 2 ? '10px' : i % 5 === 3 ? '9px' : '11px',
                    marginLeft: '-100vw',
                    marginTop: i % 5 === 0 ? '-6px' : i % 5 === 1 ? '-4px' : i % 5 === 2 ? '-5px' : i % 5 === 3 ? '-4.5px' : '-5.5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 5].replace('1)', '0.94)')} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.8, 2.6],
                    opacity: [0, 1, 0.95]
                  }}
                  transition={{
                    duration: 1.4,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central glow with arcade colors */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 7.2, 7],
                opacity: [0, 1, 0.96],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.7, ease: 'easeOut' }}
            >
              <div
                className="w-[48rem] h-[48rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 200, 0.98) 6%, rgba(0, 255, 0, 0.95) 14%, rgba(255, 255, 0, 0.92) 24%, rgba(0, 255, 255, 0.88) 36%, rgba(255, 0, 255, 0.82) 50%, rgba(255, 136, 0, 0.74) 66%, rgba(0, 255, 0, 0.60) 80%, transparent 96%)',
                  boxShadow: '0 0 500px rgba(0, 255, 0, 0.9), 0 0 700px rgba(255, 255, 0, 0.8)',
                  filter: 'blur(115px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles with pixel aesthetic */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 190 + ring * 115;
                const count = 48 + ring * 24;
                
                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#ff8800'];
                  
                  particles.push(
                    <motion.div
                      key={`orbit-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '8px',
                        height: '8px',
                        background: colors[i % 5],
                        boxShadow: `0 0 15px ${colors[i % 5]}`,
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      animate={{
                        x: [
                          Math.cos(angle * Math.PI / 180) * radius,
                          Math.cos((angle + 360) * Math.PI / 180) * radius
                        ],
                        y: [
                          Math.sin(angle * Math.PI / 180) * radius,
                          Math.sin((angle + 360) * Math.PI / 180) * radius
                        ],
                        rotate: [0, 360]
                      }}
                      transition={{
                        delay: 0.5 + (ring * 72 + i) * 0.003,
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
            {[...Array(90)].map((_, i) => {
              const angle = (i / 90) * Math.PI * 2;
              const distance = 145 + Math.random() * 310;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#ff8800'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 145],
                    scale: [0, 2.2, 2],
                    opacity: [0, 1, 0.9, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.7,
                    delay: i * 0.006,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '10px',
                      background: colors[i % 5],
                      boxShadow: `0 0 14px ${colors[i % 5]}`,
                      border: '1px solid rgba(255, 255, 255, 0.3)'
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
            style={{ fontFamily: 'monospace' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-300 drop-shadow-2xl mb-3" style={{ textShadow: '0 0 30px rgba(0, 255, 0, 0.9)' }}>
              Level Complete!
            </h2>
            <p className="text-2xl text-yellow-300 drop-shadow-lg" style={{ textShadow: '0 0 20px rgba(255, 255, 0, 0.9)' }}>{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}