/**
 * New Year's Eve - Neon Countdown Pulse Ceremony (RARE)
 * 
 * CONCEPT: Electronic rave energy - massive 3D countdown numbers 10→1,
 * each number pulses with electronic beats and explodes into neon shockwave,
 * gets progressively faster and more intense, "1" detonates into rave lights
 * 
 * Duration: 16 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-11s: Countdown 10→1 with pulses (1 second per number)
 * 3. 11-13s: Final "1" massive pulse
 * 4. 13-16s: Radiance finale
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewYearCountdownCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewYearCountdownCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewYearCountdownCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'countdown' | 'finale' | 'radiance' | 'outro'>('intro');
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  // Main timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('countdown') },
      { time: 12000, action: () => setStage('finale') },
      { time: 14000, action: () => setStage('radiance') },
      { time: 16000, action: () => setStage('outro') },
      { time: 16500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // COUNTDOWN LOGIC - FIXED: Each number shows for full 1 second
  useEffect(() => {
    if (stage !== 'countdown' && stage !== 'finale') {
      setCurrentNumber(null);
      return;
    }

    if (stage === 'countdown') {
      const timeouts: NodeJS.Timeout[] = [];
      
      // Each number shows for EXACTLY 1 second with no overlap
      // Show 10 immediately at 0ms
      setCurrentNumber(10);
      
      // Show 9 at 1100ms (allowing 100ms for transition)
      timeouts.push(setTimeout(() => setCurrentNumber(9), 1100));
      
      // Show 8 at 2200ms
      timeouts.push(setTimeout(() => setCurrentNumber(8), 2200));
      
      // Show 7 at 3300ms
      timeouts.push(setTimeout(() => setCurrentNumber(7), 3300));
      
      // Show 6 at 4400ms
      timeouts.push(setTimeout(() => setCurrentNumber(6), 4400));
      
      // Show 5 at 5500ms
      timeouts.push(setTimeout(() => setCurrentNumber(5), 5500));
      
      // Show 4 at 6600ms
      timeouts.push(setTimeout(() => setCurrentNumber(4), 6600));
      
      // Show 3 at 7700ms
      timeouts.push(setTimeout(() => setCurrentNumber(3), 7700));
      
      // Show 2 at 8800ms
      timeouts.push(setTimeout(() => setCurrentNumber(2), 8800));
      
      // Show 1 at 9900ms
      timeouts.push(setTimeout(() => setCurrentNumber(1), 9900));
      
      return () => timeouts.forEach(t => clearTimeout(t));
    }
    
    // Keep showing 1 during finale
    if (stage === 'finale') {
      setCurrentNumber(1);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-black via-purple-950 to-black">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(139, 92, 246, 0.4) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* Pulsing ambient lights */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            width: '250px',
            height: '250px',
            background: i % 3 === 0
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.4), transparent)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 left-0 right-0 text-center z-20"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Neon Countdown
            </motion.h1>
            <p className="text-white text-2xl font-medium">⏰ The Final Seconds ⏰</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COUNTDOWN NUMBERS */}
      <AnimatePresence mode="wait">
        {currentNumber !== null && (
          <motion.div
            key={`number-${currentNumber}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ scale: 0, opacity: 0, rotateY: -180, z: -500 }}
            animate={{
              scale: stage === 'finale' && currentNumber === 1 
                ? [1, 2, 1.8, 2.2]
                : [0, 1.6, 1.2, 1.4, 1],
              opacity: [0, 1, 1, 0.95],
              rotateY: [-180, 20, -10, 5, 0],
              y: [50, -20, 0],
              rotate: [0, -5, 3, 0]
            }}
            exit={{
              scale: [1, 1.3, 0],
              opacity: [0.95, 0.7, 0],
              rotateY: [0, 90, 180],
              y: [0, -50, -150],
              rotate: [0, 15]
            }}
            transition={{
              duration: stage === 'finale' && currentNumber === 1 ? 1.5 : 0.9,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            {/* Number with 3D effect */}
            <div className="relative">
              <motion.div
                className="text-[22rem] font-black leading-none"
                style={{
                  color: currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899',
                  textShadow: `
                    0 0 100px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 1)' : 'rgba(236, 72, 153, 1)'},
                    0 0 150px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 0.9)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 0.9)' : 'rgba(236, 72, 153, 0.9)'},
                    0 15px 40px rgba(0, 0, 0, 0.9)
                  `,
                  WebkitTextStroke: '5px rgba(255, 255, 255, 0.4)'
                }}
                animate={{
                  scale: [1, 1.08, 1.04, 1.08, 1],
                  textShadow: [
                    `0 0 100px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 1)' : 'rgba(236, 72, 153, 1)'}`,
                    `0 0 160px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 1)' : 'rgba(236, 72, 153, 1)'}`,
                    `0 0 100px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 1)' : 'rgba(236, 72, 153, 1)'}`
                  ]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {currentNumber}
              </motion.div>

              {/* 3D depth layers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`depth-${i}`}
                  className="absolute inset-0 text-[22rem] font-black leading-none"
                  style={{
                    color: currentNumber <= 3 ? '#7f1d1d' : currentNumber <= 6 ? '#78350f' : '#701a75',
                    zIndex: -1 - i,
                    transform: `translate(${i * 3}px, ${i * 3}px)`,
                    opacity: 0.4 - i * 0.03
                  }}
                >
                  {currentNumber}
                </div>
              ))}
            </div>

            {/* Multiple pulsing rings */}
            {[...Array(3)].map((_, ringIndex) => (
              <motion.div
                key={`ring-${ringIndex}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8"
                style={{
                  width: `${500 + ringIndex * 80}px`,
                  height: `${500 + ringIndex * 80}px`,
                  borderColor: currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899',
                  boxShadow: `0 0 80px ${currentNumber <= 3 ? 'rgba(239, 68, 68, 0.9)' : currentNumber <= 6 ? 'rgba(245, 158, 11, 0.9)' : 'rgba(236, 72, 153, 0.9)'}`
                }}
                animate={{
                  scale: [1, 1.3, 1.1],
                  opacity: [0.9, 0.2, 0.9],
                  rotate: ringIndex % 2 === 0 ? [0, 180, 360] : [360, 180, 0]
                }}
                transition={{
                  duration: 1 + ringIndex * 0.2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}

            {/* Electricity arcs around number */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`arc-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '550px',
                  height: '550px'
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3 - i * 0.3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '-10px',
                    width: '4px',
                    height: '80px',
                    background: `linear-gradient(to bottom, ${currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899'}, transparent)`,
                    boxShadow: `0 0 20px ${currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899'}`,
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOCKWAVES on each number change */}
      <AnimatePresence>
        {currentNumber !== null && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`shockwave-${currentNumber}-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 z-30"
                style={{
                  borderColor: currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899'
                }}
                initial={{ width: '200px', height: '200px', opacity: 1 }}
                animate={{
                  width: '1200px',
                  height: '1200px',
                  opacity: 0
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Beat particles */}
      {currentNumber !== null && (
        <>
          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            return (
              <motion.div
                key={`beat-${currentNumber}-${i}`}
                className="absolute left-1/2 top-1/2 z-25"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * 300,
                  y: Math.sin(angle) * 300,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899',
                    boxShadow: `0 0 20px ${currentNumber <= 3 ? '#ef4444' : currentNumber <= 6 ? '#f59e0b' : '#ec4899'}`
                  }}
                />
              </motion.div>
            );
          })}
        </>
      )}

      {/* RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rainbow starburst */}
            {[...Array(60)].map((_, i) => {
              const rotation = (i * 360) / 60;
              const colors = ['#ef4444', '#f59e0b', '#fbbf24', '#84cc16', '#22d3ee', '#8b5cf6', '#ec4899'];
              const color = colors[i % colors.length];
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw',
                    height: '5px',
                    marginLeft: '-100vw',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.5],
                    scaleX: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.008,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to right, transparent, ${color}80 50%, transparent)`,
                      filter: 'blur(3px)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center radiance */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(236, 72, 153, 0.8), transparent)',
                  filter: 'blur(60px)'
                }}
              />
            </motion.div>

            {/* "HAPPY NEW YEAR" text */}
            <motion.div
              className="absolute top-2/3 left-1/2 -translate-x-1/2 z-50"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                y: [20, 0, 0]
              }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.h1
                className="text-6xl md:text-7xl font-black whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6, #22d3ee, #ec4899)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 40px rgba(236, 72, 153, 0.8))'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                HAPPY NEW YEAR! 🎉
              </motion.h1>
            </motion.div>

            {/* Celebration particles */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`celebration-${i}`}
                className="absolute z-45"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -100]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="text-4xl"
                >
                  {['🎉', '🎊', '✨', '🌟', '💫'][i % 5]}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}