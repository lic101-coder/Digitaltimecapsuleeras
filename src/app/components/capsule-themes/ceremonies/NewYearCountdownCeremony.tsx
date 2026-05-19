/**
 * New Year's Eve - Neon Countdown Pulse Ceremony (RARE)
 * 
 * CONCEPT: Electronic rave energy - massive 3D countdown numbers 10→0,
 * each number pulses with electronic beats and explodes into neon shockwave,
 * gets progressively faster and more intense, "0" detonates into rave lights
 * 
 * Stages:
 */

import React, { useState, useEffect, useRef } from 'react';
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
  const [stage, setStage] = useState<'intro' | 'countdown' | 'finale' | 'radiance'>('intro');
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // INTRO: 0-2s
    timers.push(setTimeout(() => {
      setStage('countdown');
      setCurrentNumber(10); // Start at 10
    }, 2000));

    // COUNTDOWN: 2s-13s (10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
    // Each number stays for 1 second
    let countdownValue = 10;
    
    // Set up interval starting at 3 seconds (1 second after we show 10)
    timers.push(setTimeout(() => {
      intervalRef.current = setInterval(() => {
        countdownValue--;
        setCurrentNumber(countdownValue);
        
        // Stop at 0
        if (countdownValue <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1000); // Each number shows for EXACTLY 1 second
    }, 3000));

    // FINALE: 13-15s (keep showing 0 with mega effects)
    timers.push(setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setStage('finale');
      setCurrentNumber(0);
    }, 13000));

    // RADIANCE: 15-18s
    timers.push(setTimeout(() => {
      setStage('radiance');
      setCurrentNumber(null);
    }, 15000));

    // COMPLETE: 18s
    timers.push(setTimeout(() => {
      if (!isPreview && onComplete) {
        onComplete();
      }
    }, 18000));

    // Cleanup
    return () => {
      timers.forEach(clearTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

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

      {/* INTRO - Title */}
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

      {/* COUNTDOWN & FINALE - The big numbers */}
      <AnimatePresence mode="wait">
        {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
          <motion.div
            key={`number-display-${currentNumber}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ scale: 0, opacity: 0, rotateY: -90 }}
            animate={{
              scale: stage === 'finale' && currentNumber === 0
                ? [1.5, 3, 2.8, 3, 2.9]
                : [0.5, 1.5, 1],
              opacity: 1,
              rotateY: 0
            }}
            exit={{
              scale: 0,
              opacity: 0,
              rotateY: 90
            }}
            transition={{
              duration: stage === 'finale' ? 2 : 0.4,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            {/* Main number with 3D effect */}
            <div className="relative">
              <motion.div
                className="text-[22rem] font-black leading-none select-none"
                style={{
                  color: currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899',
                  textShadow: `
                    0 0 120px ${currentNumber === 0 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 3 ? 'rgba(245, 158, 11, 1)' : currentNumber <= 6 ? 'rgba(251, 191, 36, 1)' : 'rgba(236, 72, 153, 1)'},
                    0 0 180px ${currentNumber === 0 ? 'rgba(239, 68, 68, 0.9)' : currentNumber <= 3 ? 'rgba(245, 158, 11, 0.9)' : currentNumber <= 6 ? 'rgba(251, 191, 36, 0.9)' : 'rgba(236, 72, 153, 0.9)'},
                    0 20px 50px rgba(0, 0, 0, 0.9)
                  `,
                  WebkitTextStroke: '6px rgba(255, 255, 255, 0.5)'
                }}
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {currentNumber}
              </motion.div>

              {/* 3D depth layers */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`depth-${i}`}
                  className="absolute inset-0 text-[22rem] font-black leading-none select-none pointer-events-none"
                  style={{
                    color: currentNumber === 0 ? '#7f1d1d' : currentNumber <= 3 ? '#78350f' : currentNumber <= 6 ? '#713f12' : '#701a75',
                    zIndex: -1 - i,
                    transform: `translate(${i * 2.5}px, ${i * 2.5}px)`,
                    opacity: 0.35 - i * 0.02
                  }}
                >
                  {currentNumber}
                </div>
              ))}
            </div>

            {/* Multiple pulsing rings */}
            {[...Array(5)].map((_, ringIndex) => (
              <motion.div
                key={`ring-${ringIndex}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-8"
                style={{
                  width: `${400 + ringIndex * 120}px`,
                  height: `${400 + ringIndex * 120}px`,
                  borderColor: currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899',
                  boxShadow: `0 0 100px ${currentNumber === 0 ? 'rgba(239, 68, 68, 1)' : currentNumber <= 3 ? 'rgba(245, 158, 11, 1)' : currentNumber <= 6 ? 'rgba(251, 191, 36, 1)' : 'rgba(236, 72, 153, 1)'}`
                }}
                animate={{
                  scale: stage === 'finale' ? [1, 1.6, 1.4] : [1, 1.5, 1.2],
                  opacity: stage === 'finale' ? [0.9, 0.2, 0.9] : [0.8, 0.1, 0.8],
                  rotate: ringIndex % 2 === 0 ? [0, 360] : [360, 0]
                }}
                transition={{
                  duration: 1 + ringIndex * 0.2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}

            {/* Electricity arcs */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`arc-container-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '650px',
                  height: '650px'
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2.2 - i * 0.15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '-15px',
                    width: '5px',
                    height: '100px',
                    background: `linear-gradient(to bottom, ${currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899'}, transparent)`,
                    boxShadow: `0 0 25px ${currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899'}`,
                    filter: 'blur(2px)'
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0.4, 2, 0.4]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.08
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOCKWAVES on each number */}
      <AnimatePresence>
        {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`shockwave-${currentNumber}-wave-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 z-30"
                style={{
                  borderColor: currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899'
                }}
                initial={{ width: '150px', height: '150px', opacity: 1 }}
                animate={{
                  width: stage === 'finale' ? '2000px' : '1400px',
                  height: stage === 'finale' ? '2000px' : '1400px',
                  opacity: 0
                }}
                transition={{
                  duration: stage === 'finale' ? 1.8 : 1.2,
                  delay: i * 0.12,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Beat particles radiating out */}
      {currentNumber !== null && (stage === 'countdown' || stage === 'finale') && (
        <>
          {[...Array(32)].map((_, i) => {
            const angle = (i / 32) * Math.PI * 2;
            return (
              <motion.div
                key={`particle-${currentNumber}-${i}`}
                className="absolute left-1/2 top-1/2 z-25"
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(angle) * (stage === 'finale' ? 500 : 350),
                  y: Math.sin(angle) * (stage === 'finale' ? 500 : 350),
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: stage === 'finale' ? 1.8 : 1.2,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background: currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899',
                    boxShadow: `0 0 25px ${currentNumber === 0 ? '#ef4444' : currentNumber <= 3 ? '#f59e0b' : currentNumber <= 6 ? '#fbbf24' : '#ec4899'}`
                  }}
                />
              </motion.div>
            );
          })}
        </>
      )}

      {/* RADIANCE FINALE - The grand explosion */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rainbow starburst rays */}
            {[...Array(72)].map((_, i) => {
              const rotation = (i * 360) / 72;
              const colors = ['#ef4444', '#f59e0b', '#fbbf24', '#84cc16', '#22d3ee', '#8b5cf6', '#ec4899'];
              const color = colors[i % colors.length];
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw',
                    height: '8px',
                    marginLeft: '-100vw',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 1, 0.7],
                    scaleX: [0, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.006,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to right, transparent, ${color}90 50%, transparent)`,
                      filter: 'blur(4px)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center radiance burst */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 3.5, 3],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(239, 68, 68, 0.9), rgba(236, 72, 153, 0.7), transparent)',
                  filter: 'blur(70px)'
                }}
              />
            </motion.div>

            {/* "HAPPY NEW YEAR" text */}
            <motion.div
              className="absolute top-2/3 left-1/2 -translate-x-1/2 z-50 px-4"
              initial={{ scale: 0, opacity: 0, y: 30 }}
              animate={{
                scale: [0, 1.4, 1.1],
                opacity: [0, 1, 1],
                y: [30, 0, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-center"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #f59e0b, #8b5cf6, #22d3ee, #ec4899)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 50px rgba(236, 72, 153, 1))'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                HAPPY NEW YEAR! 🎉
              </motion.h1>
            </motion.div>

            {/* Celebration particles floating up */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`celebration-${i}`}
                className="absolute z-45 text-5xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.3, 1, 0],
                  opacity: [0, 1, 1, 0],
                  y: [0, -200],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 1.2,
                  ease: 'easeOut'
                }}
              >
                {['🎉', '🎊', '✨', '🌟', '💫', '🎆', '🎇'][i % 7]}
              </motion.div>
            ))}

            {/* Additional sparkle bursts */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute z-45"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 270]
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.4 + Math.random() * 1,
                  ease: 'easeOut'
                }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    background: ['#ef4444', '#f59e0b', '#22d3ee', '#8b5cf6', '#ec4899'][i % 5],
                    boxShadow: `0 0 40px ${['#ef4444', '#f59e0b', '#22d3ee', '#8b5cf6', '#ec4899'][i % 5]}`
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}