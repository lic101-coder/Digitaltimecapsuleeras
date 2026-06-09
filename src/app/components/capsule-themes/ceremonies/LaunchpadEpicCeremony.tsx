/**
 * Launchpad - To the Stars Ceremony (Epic)
 * 
 * CONCEPT: Full rocket launch sequence - from pad to the stars!
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LaunchpadEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadEpicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'countdown' | 'liftoff' | 'ascent' | 'space' | 'destination' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('countdown') },
      { time: 3200, action: () => setStage('liftoff') },
      { time: 6400, action: () => setStage('ascent') },
      { time: 9600, action: () => setStage('space') },
      { time: 12400, action: () => setStage('destination') },
      { time: 14400, action: () => setStage('radiance') },
      { time: 16700, action: () => setStage('outro') },
      { time: 17000, action: () => {
        setCompleted(true);
        onComplete?.();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // CRITICAL FAILSAFE: Force completion after 18 seconds if ceremony hasn't finished
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Launchpad Epic ceremony failsafe triggered - forcing completion');
        setStage('outro');
        setCompleted(true);
        onComplete?.();
      }
    }, 18000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #1a1550 0%, #0a0a28 50%, #000510 90%)',
                'radial-gradient(ellipse at 50% 50%, #2a2570 0%, #0a0a28 50%, #000510 90%)'
              ]
            : stage === 'destination' || stage === 'space'
            ? 'radial-gradient(ellipse at 50% 40%, #0a0a28 0%, #050515 60%, #000510 95%)'
            : stage === 'ascent'
            ? 'linear-gradient(to bottom, #000510 0%, #0a1428 30%, #1a3450 60%, #4a7db4 90%, #87CEEB 100%)'
            : stage === 'liftoff'
            ? 'linear-gradient(to bottom, #4a7db4 0%, #87CEEB 40%, #b0d4e8 70%, #d4e8f0 100%)'
            : 'linear-gradient(to bottom, #87CEEB 0%, #b0d4e8 50%, #d4e8f0 100%)'
        }}
        transition={{
          duration: stage === 'radiance' ? 0.8 : stage === 'space' ? 2.5 : 3,
          repeat: (stage === 'radiance' && !completed) ? 3 : 0
        }}
      />

      {/* Stars appear in space stage */}
      <AnimatePresence>
        {(stage === 'space' || stage === 'destination' || stage === 'radiance') && (
          <>
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: `0 0 ${2 + Math.random() * 4}px rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: completed ? 0 : [0, 1, 0.8, 1],
                  scale: completed ? 1 : [0, 1, 0.9, 1]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.01,
                  repeat: (stage === 'destination' || stage === 'radiance') && !completed ? 3 : 0,
                  repeatDelay: Math.random() * 2
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl">
              To the Stars
            </h1>
            <p className="text-white/80 mt-3 text-base">Your journey begins</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        
        {/* LAUNCHPAD */}
        <AnimatePresence>
          {(stage === 'countdown' || stage === 'liftoff') && (
            <motion.div
              className="absolute z-20"
              style={{
                left: '50%',
                bottom: '5%',
                transform: 'translateX(-50%)'
              }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ exit: { duration: 0.8 } }}
            >
              {/* Platform */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '250px',
                  height: '20px',
                  background: 'linear-gradient(to bottom, #666, #444)',
                  borderRadius: '4px',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)'
                }}
              />
              
              {/* Support legs */}
              {[-1, 1].map((side, i) => (
                <div
                  key={`leg-${i}`}
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: `calc(50% + ${side * 80}px)`,
                    width: '8px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, #888, #555)',
                    transform: `translateX(-50%) skewX(${side * 15}deg)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROCKET WITH INTEGRATED FLAMES */}
        <AnimatePresence>
          {(stage === 'countdown' || stage === 'liftoff' || stage === 'ascent' || stage === 'space' || stage === 'destination') && (
            <motion.div
              className="absolute z-25"
              initial={{
                left: '50%',
                bottom: '8%',
                scale: 1
              }}
              animate={{
                left: '50%',
                bottom: stage === 'destination' ? '110%' : stage === 'space' ? '95%' : stage === 'ascent' ? '65%' : stage === 'liftoff' ? '25%' : '8%',
                scale: stage === 'destination' ? 0.4 : stage === 'space' ? 0.6 : stage === 'ascent' ? 0.8 : 1,
                rotate: stage === 'destination' ? [0, -5, 5, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{
                bottom: {
                  duration: stage === 'destination' ? 2 : stage === 'space' ? 3 : stage === 'ascent' ? 3 : stage === 'liftoff' ? 3 : 0,
                  ease: stage === 'destination' ? [0.6, 0.0, 0.4, 1] : [0.4, 0.0, 0.2, 1]
                },
                scale: {
                  duration: stage === 'destination' ? 2 : stage === 'space' ? 3 : stage === 'ascent' ? 3 : stage === 'liftoff' ? 3 : 0,
                  ease: 'easeOut'
                },
                rotate: {
                  duration: 2,
                  ease: 'easeInOut'
                },
                exit: { duration: 0.6 }
              }}
              style={{
                width: '60px',
                marginLeft: '-30px',
                transformOrigin: 'bottom center'
              }}
            >
              {/* Nose cone */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '180px',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '30px solid transparent',
                  borderRight: '30px solid transparent',
                  borderBottom: '60px solid #e8e8e8',
                  filter: 'drop-shadow(0 -2px 8px rgba(0, 0, 0, 0.3))'
                }}
              />

              {/* Upper stage */}
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '120px',
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(to right, #b0b0b0 0%, #ffffff 30%, #e8e8e8 50%, #c0c0c0 70%, #909090 100%)',
                  borderRadius: '4px',
                  boxShadow: 'inset -5px 0 15px rgba(0, 0, 0, 0.3), inset 5px 0 15px rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Window */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #4a9fd8 0%, #2a5f88 70%, #1a3f58 100%)',
                    border: '2px solid #888'
                  }}
                />
              </div>

              {/* Lower stage - ROCKET BASE */}
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '0',
                  width: '60px',
                  height: '120px',
                  background: 'linear-gradient(to right, #d8d8d8 0%, #ffffff 20%, #f0f0f0 40%, #e0e0e0 60%, #c8c8c8 80%, #a8a8a8 100%)',
                  borderRadius: '4px',
                  boxShadow: 'inset -8px 0 20px rgba(0, 0, 0, 0.25), inset 8px 0 20px rgba(255, 255, 255, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Red stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: '0',
                    right: '0',
                    height: '15px',
                    background: 'linear-gradient(to right, #b83030 0%, #e84040 50%, #b83030 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                />
                
                {/* Blue stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50px',
                    left: '0',
                    right: '0',
                    height: '15px',
                    background: 'linear-gradient(to right, #3060b8 0%, #4080e8 50%, #3060b8 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>

              {/* ENGINE FLAMES - ALIGNED TO 60PX ROCKET BASE */}
              <div
                style={{
                  position: 'absolute',
                  left: '-6px',
                  bottom: '-5px',
                  width: '60px',
                  zIndex: -1
                }}
              >
                {/* Main engine plume */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    width: (stage === 'liftoff' || stage === 'ascent' || stage === 'space' || stage === 'destination') ? '90px' : '70px',
                    height: (stage === 'liftoff' || stage === 'ascent' || stage === 'space' || stage === 'destination') ? '280px' : '140px',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 220, 120, 0.98) 12%, rgba(255, 180, 80, 0.95) 28%, rgba(255, 130, 50, 0.9) 48%, rgba(255, 90, 30, 0.82) 68%, rgba(220, 60, 20, 0.6) 85%, rgba(180, 40, 10, 0.3) 95%, transparent 100%)',
                    borderRadius: '50% 50% 50% 50% / 15% 15% 85% 85%',
                    filter: 'blur(10px)',
                    boxShadow: '0 0 100px rgba(255, 150, 50, 0.9), 0 0 150px rgba(255, 100, 30, 0.7)'
                  }}
                  animate={{
                    x: '-50%',
                    scaleY: stage === 'countdown' ? [0.8, 1.15, 0.85, 1.05] : [1, 1.2, 0.95, 1.15],
                    scaleX: stage === 'countdown' ? [1, 0.92, 1.08, 0.98] : [1, 1.12, 0.92, 1.08]
                  }}
                  transition={{
                    duration: stage === 'countdown' ? 0.4 : 0.18,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Mid-intensity flame layer */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    width: '65px',
                    height: (stage === 'liftoff' || stage === 'ascent' || stage === 'space' || stage === 'destination') ? '220px' : '110px',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 200, 0.98) 20%, rgba(255, 200, 120, 0.94) 45%, rgba(255, 150, 70, 0.88) 70%, rgba(255, 100, 40, 0.7) 88%, transparent 100%)',
                    borderRadius: '50% 50% 50% 50% / 18% 18% 82% 82%',
                    filter: 'blur(6px)'
                  }}
                  animate={{
                    x: '-50%',
                    scaleY: [1, 1.25, 1, 1.18],
                    opacity: [1, 0.96, 1, 0.98]
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Bright core */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    width: '42px',
                    height: '95px',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 250, 220, 1) 35%, rgba(255, 210, 140, 0.96) 70%, rgba(255, 170, 100, 0.85) 90%, transparent 100%)',
                    borderRadius: '50% 50% 50% 50% / 20% 20% 80% 80%',
                    filter: 'blur(3px)'
                  }}
                  animate={{
                    x: '-50%',
                    scaleY: [1, 1.3, 1, 1.22],
                    opacity: [1, 0.97, 1, 0.98]
                  }}
                  transition={{
                    duration: 0.13,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Extreme white-hot core */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    width: '28px',
                    height: '50px',
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 240, 200, 0.95) 85%, transparent 100%)',
                    borderRadius: '50% 50% 50% 50% / 25% 25% 75% 75%',
                    boxShadow: '0 0 40px rgba(255, 255, 255, 1), 0 0 70px rgba(255, 240, 200, 0.9)'
                  }}
                  animate={{
                    x: '-50%',
                    scaleY: [1, 1.25, 1.05, 1.2],
                    opacity: [1, 0.98, 1, 0.99]
                  }}
                  transition={{
                    duration: 0.11,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Smoke plume at base - only during liftoff/ascent */}
                {(stage === 'liftoff' || stage === 'ascent') && (
                  <>
                    {[...Array(25)].map((_, i) => (
                      <motion.div
                        key={`smoke-${i}`}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: (stage === 'liftoff' || stage === 'ascent') ? '240px' : '120px',
                          transform: 'translateX(-50%)',
                          width: `${35 + Math.random() * 50}px`,
                          height: `${35 + Math.random() * 50}px`,
                          borderRadius: '50%',
                          background: `radial-gradient(circle, rgba(200, 200, 200, ${0.5 + Math.random() * 0.3}), transparent 70%)`,
                          filter: 'blur(18px)'
                        }}
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                        animate={{
                          x: (Math.random() - 0.5) * 180,
                          y: [0, 90 + Math.random() * 70],
                          opacity: [0, 0.75, 0.55, 0],
                          scale: [0.4, 1.6, 2.2, 2.8]
                        }}
                        transition={{
                          duration: 2.2 + Math.random() * 0.8,
                          delay: i * 0.09,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Sparks/embers */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`spark-${i}`}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: (stage === 'liftoff' || stage === 'ascent' || stage === 'space' || stage === 'destination') ? '250px' : '125px',
                      transform: 'translateX(-50%)',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: i % 3 === 0 ? '#ffaa44' : i % 3 === 1 ? '#ff8833' : '#ffcc66',
                      boxShadow: `0 0 12px ${i % 3 === 0 ? '#ffaa44' : i % 3 === 1 ? '#ff8833' : '#ffcc66'}`
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 110,
                      y: [0, 60 + Math.random() * 90],
                      opacity: [1, 0.85, 0],
                      scale: [1, 0.6, 0]
                    }}
                    transition={{
                      duration: 0.9 + Math.random() * 0.7,
                      delay: i * 0.06,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              {/* Fins - one on each side */}
              {[-1, 1].map((side, i) => (
                <div
                  key={`fin-${i}`}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    [side === -1 ? 'left' : 'right']: side === -1 ? '-30px' : '-30px',
                    width: '0',
                    height: '0',
                    borderTop: '40px solid transparent',
                    borderBottom: '40px solid transparent',
                    [side === -1 ? 'borderRight' : 'borderLeft']: '30px solid #a8a8a8',
                    filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.4))'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* COUNTDOWN NUMBERS */}
        <AnimatePresence>
          {stage === 'countdown' && (
            <>
              {[3, 2, 1].map((num, i) => (
                <motion.div
                  key={`countdown-${num}`}
                  className="absolute z-30"
                  style={{
                    left: '50%',
                    top: '30%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0.8]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.65,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      fontSize: '120px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.8), 0 0 80px rgba(255, 200, 100, 0.6)',
                      filter: 'drop-shadow(0 5px 20px rgba(0, 0, 0, 0.5))'
                    }}
                  >
                    {num}
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* VAPOR TRAIL in ascent/space */}
        <AnimatePresence>
          {(stage === 'ascent' || stage === 'space' || stage === 'destination') && (
            <motion.div
              className="absolute z-22"
              style={{
                left: '50%',
                bottom: '0',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '100%'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.4] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`trail-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: `${i * 3}%`,
                    transform: 'translateX(-50%)',
                    width: `${10 + i * 0.5}px`,
                    height: `${20 + i}px`,
                    borderRadius: '50%',
                    background: stage === 'destination' 
                      ? `radial-gradient(ellipse, rgba(170, 140, 255, ${0.3 - i * 0.01}), transparent 70%)`
                      : stage === 'space'
                      ? `radial-gradient(ellipse, rgba(255, 255, 255, ${0.4 - i * 0.013}), transparent 70%)`
                      : `radial-gradient(ellipse, rgba(200, 200, 200, ${0.5 - i * 0.015}), transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                  animate={{
                    x: stage === 'destination' ? [0, -5, 5, 0] : 0,
                    scaleX: [1, 1.1, 1]
                  }}
                  transition={{
                    x: { duration: 2, ease: 'easeInOut' },
                    scaleX: { duration: 0.6 + i * 0.02, repeat: Infinity, ease: 'easeInOut' }
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NEBULA DESTINATION */}
        <AnimatePresence>
          {stage === 'destination' && (
            <motion.div
              className="absolute z-21"
              style={{
                left: '50%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 1],
                scale: [0, 1.2, 1],
                rotate: [0, 360]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2,
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
              }}
            >
              {/* Nebula layers */}
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(138, 43, 226, 0.6) 0%, rgba(75, 0, 130, 0.4) 30%, rgba(138, 43, 226, 0.3) 50%, transparent 75%)',
                  filter: 'blur(40px)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '350px',
                  height: '350px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(255, 20, 147, 0.5) 0%, rgba(138, 43, 226, 0.3) 40%, transparent 70%)',
                  filter: 'blur(35px)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(100, 149, 237, 0.6) 0%, rgba(138, 43, 226, 0.4) 50%, transparent 75%)',
                  filter: 'blur(30px)'
                }}
              />

              {/* Bright core */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(200, 150, 255, 0.7) 50%, transparent 80%)',
                  boxShadow: '0 0 100px rgba(138, 43, 226, 0.8)',
                  filter: 'blur(15px)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
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
            {/* Rays */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const colors = ['rgba(138, 43, 226, 1)', 'rgba(255, 20, 147, 1)', 'rgba(100, 149, 237, 1)', 'rgba(255, 255, 255, 1)'];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 3 === 0 ? '12px' : i % 3 === 1 ? '8px' : '10px',
                    marginLeft: '-100vw',
                    marginTop: i % 3 === 0 ? '-6px' : i % 3 === 1 ? '-4px' : '-5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.93)')} 50%, transparent)`,
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
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 7.5, 7.3],
                opacity: [0, 1, 0.97],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <div
                className="w-[48rem] h-[48rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 230, 255, 0.98) 7%, rgba(200, 150, 255, 0.95) 16%, rgba(138, 43, 226, 0.91) 26%, rgba(100, 149, 237, 0.87) 38%, rgba(75, 0, 130, 0.81) 52%, rgba(138, 43, 226, 0.71) 68%, rgba(50, 20, 80, 0.55) 84%, transparent 98%)',
                  boxShadow: '0 0 500px rgba(138, 43, 226, 1), 0 0 700px rgba(100, 149, 237, 0.85)',
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 195 + ring * 120;
                const count = 44 + ring * 22;
                
                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#8a2be2', '#ff1493', '#6495ed', '#ffffff'];
                  
                  particles.push(
                    <motion.div
                      key={`orbit-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: colors[i % 4],
                        boxShadow: `0 0 16px ${colors[i % 4]}`,
                        filter: 'blur(1px)'
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
                        delay: 0.5 + (ring * 66 + i) * 0.003,
                        duration: 7 + ring * 2,
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
              const distance = 150 + Math.random() * 320;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#8a2be2', '#ff1493', '#6495ed'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 150],
                    scale: [0, 2.2, 1.9],
                    opacity: [0, 1, 0.9, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.8,
                    delay: i * 0.006,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '9px',
                      borderRadius: '50%',
                      background: colors[i % 3],
                      boxShadow: `0 0 13px ${colors[i % 3]}`,
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
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-100 drop-shadow-2xl mb-3">
              Reach for the Stars
            </h2>
            <p className="text-2xl text-blue-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}