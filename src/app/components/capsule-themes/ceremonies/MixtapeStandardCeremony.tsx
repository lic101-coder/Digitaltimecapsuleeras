/**
 * Mixtape - Vinyl Spin Ceremony 🎵💿✨
 * 
 * EPIC REPLACEMENT FOR TAPE DREAMS!
 * 
 * CONCEPT: Massive vinyl record spins with holographic grooves, spectrum analyzer pulses,
 * needle drops with waveform visualization, then EXPLODES into rainbow vinyl shards!
 * 
 * FEATURES:
 * - Spinning vinyl with holographic grooves (35 grooves!)
 * - DJ turntable aesthetic
 * - Spectrum analyzer bars pulsing to rhythm
 * - Turntable arm/needle dropping with precision
 * - Audio waveform radiating from needle (12 waveforms)
 * - Vinyl shatters into 60+ orbital shards
 * - Rainbow radiance finale with orbiting particles
 * - Smooth 60fps animations
 * - Retro-futuristic design
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MixtapeStandardCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function MixtapeStandardCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: MixtapeStandardCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'spin' | 'needle' | 'pulse' | 'shatter' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('spin') },
      { time: 3500, action: () => setStage('needle') },
      { time: 6500, action: () => setStage('pulse') },
      { time: 10000, action: () => setStage('shatter') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 14500, action: () => setStage('outro') },
      { time: 15000, action: () => {
        setCompleted(true);
        onComplete?.();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // CRITICAL FAILSAFE: Force completion after 16 seconds if ceremony hasn't finished
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Mixtape Standard ceremony failsafe triggered - forcing completion');
        setStage('outro');
        setCompleted(true);
        onComplete?.();
      }
    }, 16000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-950 via-black to-pink-950">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
        }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffff00',
              borderRadius: '50%',
              boxShadow: `0 0 8px ${i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffff00'}`,
              opacity: 0.4 + Math.random() * 0.3
            }}
            animate={{
              y: [0, -40 - Math.random() * 30, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.4, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.8, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 text-center z-50 px-4"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-3"
              style={{
                fontFamily: 'Impact, sans-serif',
                background: 'linear-gradient(135deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                filter: 'drop-shadow(0 0 30px rgba(255, 0, 255, 0.6))',
                letterSpacing: '6px'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              VINYL SPIN
            </motion.h1>
            <p className="text-pink-300 text-lg md:text-xl" style={{ textShadow: '0 0 10px rgba(236, 72, 153, 0.8)' }}>
              Timeless Memories
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spectrum analyzer bars (bottom) */}
      <AnimatePresence>
        {(stage === 'pulse') && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-1 md:gap-2 z-20 px-4 pb-4">
            {[...Array(32)].map((_, i) => {
              const height = 20 + Math.random() * 60;
              const color = i % 4 === 0 ? '#ff00ff' : i % 4 === 1 ? '#00ffff' : i % 4 === 2 ? '#ffff00' : '#ff0080';
              return (
                <motion.div
                  key={`bar-${i}`}
                  style={{
                    width: 'clamp(4px, 1.5vw, 12px)',
                    background: `linear-gradient(to top, ${color}, transparent)`,
                    borderRadius: '2px 2px 0 0',
                    boxShadow: `0 0 10px ${color}`
                  }}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: [`${height}px`, `${height * 1.8}px`, `${height * 0.6}px`, `${height * 1.5}px`, `${height}px`],
                    opacity: [0, 1, 0.8, 1, 0.9]
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.6, repeat: Infinity, delay: i * 0.03 },
                    opacity: { duration: 0.4 }
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main vinyl record */}
      <AnimatePresence>
        {(stage === 'spin' || stage === 'needle' || stage === 'pulse') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            style={{
              width: 'min(400px, 80vw)',
              height: 'min(400px, 80vw)'
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: stage === 'spin' ? [0, 1.1, 1] : stage === 'pulse' ? [1, 1.05, 1] : 1,
              opacity: 1,
              rotate: stage === 'spin' || stage === 'needle' || stage === 'pulse' ? 360 : 0
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { duration: stage === 'pulse' ? 1.5 : 1.2, repeat: stage === 'pulse' ? Infinity : 0, ease: 'easeInOut' },
              opacity: { duration: 0.8 },
              rotate: { duration: stage === 'pulse' ? 2 : 3, repeat: Infinity, ease: 'linear' }
            }}
          >
            {/* Outer vinyl edge - glossy */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 60%, #000000 100%)',
                boxShadow: '0 0 60px rgba(255, 0, 255, 0.6), inset 0 0 40px rgba(255, 0, 255, 0.2), 0 20px 50px rgba(0, 0, 0, 0.8)',
                border: '3px solid rgba(255, 0, 255, 0.5)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Center label */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '30%',
                  height: '30%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 30px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                    '0 0 50px rgba(0, 255, 255, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.5)',
                    '0 0 30px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Center hole */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '16%',
                    height: '16%',
                    borderRadius: '50%',
                    background: '#000000',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9)'
                  }}
                />
              </motion.div>

              {/* Holographic grooves */}
              {[...Array(35)].map((_, i) => {
                const radiusPercent = 15 + i * 2;
                return (
                  <motion.div
                    key={`groove-${i}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: `${radiusPercent * 2}%`,
                      height: `${radiusPercent * 2}%`,
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 0, 255, 0.15)',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 ${Math.random() * 3}px rgba(${i % 3 === 0 ? '255, 0, 255' : i % 3 === 1 ? '0, 255, 255' : '255, 255, 0'}, ${0.2 + Math.random() * 0.3})`
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      boxShadow: [
                        `0 0 ${Math.random() * 3}px rgba(255, 0, 255, 0.3)`,
                        `0 0 ${Math.random() * 6}px rgba(0, 255, 255, 0.5)`,
                        `0 0 ${Math.random() * 3}px rgba(255, 0, 255, 0.3)`
                      ]
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                  />
                );
              })}

              {/* Shiny reflection */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '20%',
                  width: '40%',
                  height: '30%',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.3), transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'rotate(-30deg)'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Turntable arm / needle */}
      <AnimatePresence>
        {(stage === 'needle' || stage === 'pulse') && (
          <motion.div
            className="absolute z-35"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '0% 0%',
              marginLeft: 'min(150px, 30vw)',
              marginTop: 'min(-150px, -30vw)'
            }}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{
              rotate: stage === 'needle' ? [-45, -15] : -15,
              opacity: 1
            }}
            transition={{
              rotate: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
              opacity: { duration: 0.8 }
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Tonearm */}
              <motion.line
                x1="10"
                y1="10"
                x2="100"
                y2="100"
                stroke="url(#armGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 255, 0.6))' }}
              />
              {/* Needle tip */}
              <motion.circle
                cx="100"
                cy="100"
                r="6"
                fill="#00ffff"
                style={{ filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 1))' }}
                animate={{
                  r: [6, 9, 6],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" />
                  <stop offset="100%" stopColor="#00ffff" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio waveform radiating from needle */}
      <AnimatePresence>
        {(stage === 'needle' || stage === 'pulse') && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * 360;
              return (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute z-33"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '3px',
                    height: 'min(120px, 20vw)',
                    background: `linear-gradient(to bottom, ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg) translateY(min(-200px, -35vw))`,
                    filter: 'blur(1px)',
                    boxShadow: `0 0 12px ${i % 2 === 0 ? '#ff00ff' : '#00ffff'}`
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: stage === 'pulse' ? [0.6, 1.3, 0.6] : [0, 1],
                    opacity: [0, 1]
                  }}
                  transition={{
                    scaleY: { duration: stage === 'pulse' ? 0.7 : 1, repeat: stage === 'pulse' ? Infinity : 0, delay: i * 0.08 },
                    opacity: { duration: 0.8, delay: i * 0.08 }
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Vinyl shatter - vinyl explodes into orbital shards! */}
      <AnimatePresence>
        {stage === 'shatter' && (
          <>
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 180 + Math.random() * 250;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const size = 15 + Math.random() * 25;
              const rotation = Math.random() * 360;
              const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0080'];

              return (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                  animate={{
                    x: x,
                    y: y,
                    scale: [1, 1.3, 1.1],
                    opacity: [1, 0.9, 0.95],
                    rotate: [rotation, rotation + 180]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.008,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: `${size}px`,
                      height: `${size * 1.3}px`,
                      background: `linear-gradient(135deg, ${colors[i % 4]}, ${colors[(i + 1) % 4]})`,
                      clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)',
                      boxShadow: `0 0 15px ${colors[i % 4]}`,
                      filter: 'brightness(1.2)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE - Rainbow explosion */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Expanding rays */}
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

            {/* Central radiance bloom */}
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
            {[...Array(80)].map((_, i) => {
              const ring = Math.floor(i / 30);
              const radius = 200 + ring * 100;
              const angle = (i / 30) * 360;
              const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ffffff'];

              return (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute left-1/2 top-1/2"
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
                    delay: 0.5 + i * 0.01,
                    duration: 5 + ring,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="absolute bottom-20 left-0 right-0 text-center z-50 px-4"
          >
            <h2
              className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
              style={{
                fontFamily: 'Impact, sans-serif',
                background: 'linear-gradient(135deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(255, 0, 255, 0.8))',
                letterSpacing: 'clamp(2px, 1vw, 6px)'
              }}
            >
              SPINNING FOREVER
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