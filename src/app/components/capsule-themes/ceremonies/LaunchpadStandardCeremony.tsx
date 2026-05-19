/**
 * Launchpad - Metamorphosis Ceremony (Standard)
 * 
 * CONCEPT: REALISTIC chrysalis transformation - butterfly STRUGGLES out and takes flight!
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LaunchpadStandardCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadStandardCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadStandardCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'chrysalis' | 'cracking' | 'emergence' | 'drying' | 'flight' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('chrysalis') },
      { time: 4200, action: () => setStage('cracking') },
      { time: 7200, action: () => setStage('emergence') },
      { time: 9800, action: () => setStage('drying') },
      { time: 11500, action: () => setStage('flight') },
      { time: 12500, action: () => setStage('radiance') },
      { time: 15800, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a1f1a] via-[#0d2820] to-[#0f3328]">
      {/* Background - forest morning */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 40%, #2d5f4a 0%, #1a3d2f 40%, #0a1f1a 80%)',
                'radial-gradient(ellipse at 50% 40%, #3d7f6a 0%, #1a3d2f 40%, #0a1f1a 80%)'
              ]
            : stage === 'flight' || stage === 'drying'
            ? 'radial-gradient(ellipse at 50% 35%, #2d5f4a 0%, #1a3d2f 50%, #0a1f1a 85%)'
            : stage === 'emergence' || stage === 'cracking'
            ? 'radial-gradient(ellipse at 50% 50%, #254636 0%, #1a3d2f 60%, #0a1f1a 90%)'
            : 'radial-gradient(ellipse at 50% 50%, #1a3d2f 0%, #0d2820 70%, #0a1f1a 100%)'
        }}
        transition={{ 
          duration: stage === 'radiance' ? 0.8 : 2.5,
          repeat: stage === 'radiance' ? Infinity : 0
        }}
      />

      {/* Soft light rays through trees - ENHANCED */}
      <AnimatePresence>
        {(stage === 'drying' || stage === 'flight' || stage === 'radiance') && (
          <>
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`light-ray-${i}`}
                className="absolute"
                style={{
                  left: `${10 + i * 6}%`,
                  top: '-10%',
                  width: i % 2 === 0 ? '6px' : '4px',
                  height: '70%',
                  background: `linear-gradient(to bottom, rgba(255, 248, 220, ${0.25 + (i % 3) * 0.03}), rgba(255, 240, 200, ${0.15 + (i % 3) * 0.02}), transparent)`,
                  transform: `rotate(${-10 + i * 2.8}deg)`,
                  filter: 'blur(2px)',
                  boxShadow: `0 0 20px rgba(255, 248, 220, ${0.2 + (i % 3) * 0.02})`
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0.45, 0.48],
                  scaleY: [0, 1.3, 1.1]
                }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                transition={{ 
                  duration: 2.4, 
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Floating leaves - NEW ELEMENT */}
      <AnimatePresence>
        {(stage === 'flight' || stage === 'radiance') && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${-10 + Math.random() * 20}%`,
                  fontSize: '24px',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
                initial={{ opacity: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.6],
                  y: [0, 300 + Math.random() * 200],
                  x: [(Math.random() - 0.5) * 150],
                  rotate: [0, Math.random() * 360]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              >
                {i % 4 === 0 ? '🍃' : i % 4 === 1 ? '🍂' : i % 4 === 2 ? '🌿' : '🍁'}
              </motion.div>
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
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-100 drop-shadow-2xl">
              Metamorphosis
            </h1>
            <p className="text-emerald-200/80 mt-3 text-base">Your transformation is complete</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* CHRYSALIS STAGE */}
        <AnimatePresence>
          {(stage === 'chrysalis' || stage === 'cracking' || stage === 'emergence') && (
            <motion.div
              className="absolute z-30"
              style={{
                left: '50%',
                top: '45%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ 
                opacity: stage === 'emergence' ? [1, 0.8, 0] : 1,
                y: 0,
                scale: stage === 'emergence' ? [1, 1.05, 0.95] : 1
              }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 }
              }}
              transition={{ duration: stage === 'emergence' ? 1 : 1.2, ease: 'easeOut' }}
            >
              {/* Branch */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  width: '200px',
                  height: '8px',
                  marginLeft: '-100px',
                  background: 'linear-gradient(to right, transparent, #3d2817, #3d2817, transparent)',
                  borderRadius: '4px'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  width: '2px',
                  height: '50px',
                  marginLeft: '-1px',
                  background: 'linear-gradient(to bottom, #3d2817, #4a3520)',
                  transformOrigin: 'top center'
                }}
              />

              {/* Chrysalis body */}
              <motion.div
                style={{
                  width: '85px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 80%, #3a6d2a 100%)',
                  borderRadius: '45% 45% 50% 50%',
                  position: 'relative',
                  boxShadow: 'inset -8px -8px 20px rgba(0, 0, 0, 0.3), inset 8px 8px 20px rgba(255, 255, 255, 0.1), 0 10px 30px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                animate={{
                  rotate: stage === 'emergence' ? [-2, 4, -4, 2, -2] : stage === 'cracking' ? [-2, 2, -2] : [-1, 1, -1]
                }}
                transition={{
                  duration: stage === 'emergence' ? 0.4 : stage === 'cracking' ? 0.3 : 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                {/* Segment lines */}
                {[25, 45, 65, 85].map((top, i) => (
                  <div
                    key={`segment-${i}`}
                    style={{
                      position: 'absolute',
                      top: `${top}%`,
                      left: '5%',
                      right: '5%',
                      height: '1px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '50%'
                    }}
                  />
                ))}

                {/* Inner glow building */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '15%',
                    background: 'radial-gradient(circle, rgba(255, 215, 100, 0.6) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(15px)'
                  }}
                  animate={{
                    opacity: stage === 'emergence' ? [0.8, 1, 0.8] : stage === 'cracking' ? [0.3, 0.8, 0.3] : [0, 0.3, 0],
                    scale: stage === 'emergence' ? [1.3, 1.5, 1.3] : stage === 'cracking' ? [1, 1.3, 1] : [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: stage === 'emergence' ? 0.6 : stage === 'cracking' ? 1 : 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* MAJOR SPLIT - Chrysalis opening */}
                {stage === 'emergence' && (
                  <>
                    {/* Left half splitting open */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 100%)',
                        borderRadius: '45% 20% 20% 50%',
                        transformOrigin: 'center left',
                        boxShadow: 'inset -8px -8px 20px rgba(0, 0, 0, 0.4)',
                        zIndex: 5
                      }}
                      animate={{
                        rotateY: [-5, -45, -60],
                        x: [-2, -15, -25]
                      }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                    
                    {/* Right half splitting open */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(-135deg, #7fb069 0%, #5a9d4a 40%, #4a7d3a 100%)',
                        borderRadius: '20% 45% 50% 20%',
                        transformOrigin: 'center right',
                        boxShadow: 'inset 8px -8px 20px rgba(0, 0, 0, 0.4)',
                        zIndex: 5
                      }}
                      animate={{
                        rotateY: [5, 45, 60],
                        x: [2, 15, 25]
                      }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                    />
                  </>
                )}

                {/* Cracks forming */}
                {stage === 'cracking' && (
                  <>
                    {[
                      { x1: '50%', y1: '20%', x2: '70%', y2: '10%', delay: 0, angle: 25 },
                      { x1: '50%', y1: '30%', x2: '30%', y2: '15%', delay: 0.2, angle: -35 },
                      { x1: '50%', y1: '40%', x2: '75%', y2: '45%', delay: 0.4, angle: 15 },
                      { x1: '50%', y1: '50%', x2: '25%', y2: '55%', delay: 0.6, angle: -20 },
                      { x1: '50%', y1: '60%', x2: '70%', y2: '70%', delay: 0.8, angle: 25 },
                      { x1: '50%', y1: '70%', x2: '30%', y2: '80%', delay: 1.0, angle: -30 }
                    ].map((crack, i) => (
                      <motion.div
                        key={`crack-${i}`}
                        style={{
                          position: 'absolute',
                          left: crack.x1,
                          top: crack.y1,
                          width: '3px',
                          height: '35px',
                          background: 'linear-gradient(to bottom, rgba(255, 215, 100, 0.95), rgba(255, 215, 100, 0.7), transparent)',
                          transformOrigin: 'top center',
                          transform: `rotate(${crack.angle}deg)`,
                          filter: 'blur(0.5px)',
                          boxShadow: '0 0 10px rgba(255, 215, 100, 0.7), inset 0 0 5px rgba(255, 255, 255, 0.5)'
                        }}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ 
                          scaleY: [0, 1, 1.1],
                          opacity: [0, 1, 0.9]
                        }}
                        transition={{ duration: 0.5, delay: crack.delay }}
                      />
                    ))}

                    {/* Light beams through cracks */}
                    {[15, 35, 55, 75].map((top, i) => (
                      <motion.div
                        key={`light-${i}`}
                        style={{
                          position: 'absolute',
                          left: i % 2 === 0 ? '75%' : '25%',
                          top: `${top}%`,
                          width: '25px',
                          height: '4px',
                          background: `linear-gradient(to ${i % 2 === 0 ? 'right' : 'left'}, rgba(255, 215, 100, 0.95), transparent)`,
                          filter: 'blur(2px)',
                          boxShadow: '0 0 15px rgba(255, 215, 100, 0.9)'
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0.85, 1],
                          scaleX: [0, 2, 1.8]
                        }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                      />
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUTTERFLY EMERGENCE & FLIGHT */}
        <AnimatePresence>
          {(stage === 'emergence' || stage === 'drying' || stage === 'flight') && (
            <motion.div
              className="absolute z-35"
              initial={{
                left: '50%',
                top: '47%',
                scale: 0.5,
                opacity: 0
              }}
              animate={{
                left: stage === 'flight' ? ['50%', '52%', '48%', '50%', '50%'] : '50%',
                top: stage === 'flight' ? ['47%', '42%', '35%', '25%', '10%'] : stage === 'drying' ? '44%' : '47%',
                scale: stage === 'flight' ? [1, 1.1, 1.25, 1.4, 1.5] : stage === 'drying' ? [0.8, 1] : [0.5, 0.8],
                opacity: stage === 'flight' ? [1, 1, 0.9, 0.7, 0] : [0, 1],
                rotate: stage === 'flight' ? [0, -8, 8, -5, 0] : stage === 'drying' ? [0, -3, 3, 0] : [-10, 0]
              }}
              exit={{ opacity: 0, scale: 1.6 }}
              transition={{
                scale: { 
                  duration: stage === 'flight' ? 1 : stage === 'drying' ? 1.5 : 2.5,
                  ease: 'easeOut' 
                },
                opacity: { 
                  duration: stage === 'flight' ? 1 : stage === 'drying' ? 1.5 : 2.5,
                  ease: 'easeOut' 
                },
                left: { duration: 1, ease: 'easeInOut' },
                top: { duration: 1, ease: [0.4, 0.0, 0.2, 1] },
                rotate: { duration: 1, ease: 'easeInOut' }
              }}
              style={{
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Butterfly body */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '12px',
                  height: '70px',
                  marginLeft: '-6px',
                  marginTop: '-35px',
                  background: 'linear-gradient(to bottom, #2c1810 0%, #1a0f08 100%)',
                  borderRadius: '6px',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              />

              {/* Head */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '16px',
                  height: '16px',
                  marginLeft: '-8px',
                  marginTop: '-43px',
                  background: 'radial-gradient(circle, #3d2817, #2c1810)',
                  borderRadius: '50%',
                  zIndex: 11
                }}
              />

              {/* Antennae */}
              {[-1, 1].map((side, i) => (
                <motion.div
                  key={`antenna-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '2px',
                    height: '25px',
                    marginLeft: `${side * 4}px`,
                    marginTop: '-50px',
                    background: 'linear-gradient(to bottom, #2c1810, transparent)',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${side * 35}deg)`,
                    zIndex: 11
                  }}
                  animate={{
                    rotate: stage === 'flight' ? [side * 35, side * 30, side * 35] : [side * 35, side * 32, side * 35]
                  }}
                  transition={{
                    duration: stage === 'flight' ? 0.6 : 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Wings - LEFT */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'right center',
                  zIndex: 5
                }}
                animate={{
                  rotateY: stage === 'flight' 
                    ? [10, -20, 20, -20, 10]
                    : stage === 'drying'
                    ? [60, 30, 10]
                    : [90, 80, 70, 60],
                  x: stage === 'flight' ? [0, -6, 6, -6, 0] : 0
                }}
                transition={{
                  rotateY: { 
                    duration: stage === 'flight' ? 0.4 : stage === 'drying' ? 2 : 2.5,
                    ease: stage === 'flight' ? 'easeInOut' : [0.4, 0.0, 0.2, 1],
                    repeat: stage === 'flight' ? Infinity : 0
                  },
                  x: { duration: 0.4, repeat: stage === 'flight' ? Infinity : 0, ease: 'easeInOut' }
                }}
              >
                {/* Upper left wing */}
                <div
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '-25px',
                    width: '80px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff8555 20%, #ffa575 40%, #ff7f50 60%, #ff6b35 80%)',
                    borderRadius: '80% 20% 50% 80%',
                    border: '2px solid #d85a2a',
                    boxShadow: 'inset -10px -10px 30px rgba(0, 0, 0, 0.3), inset 10px 10px 30px rgba(255, 255, 255, 0.2), 0 5px 20px rgba(255, 107, 53, 0.4)'
                  }}
                >
                  {/* Wing patterns */}
                  <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '25%',
                    width: '20px',
                    height: '20px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '35%',
                    width: '15px',
                    height: '15px',
                    background: 'radial-gradient(circle, rgba(255, 215, 100, 0.5), transparent)',
                    borderRadius: '50%'
                  }} />
                  {/* Wing veins */}
                  {[20, 40, 60].map((top, i) => (
                    <div
                      key={`vein-l-${i}`}
                      style={{
                        position: 'absolute',
                        top: `${top}%`,
                        right: '10%',
                        width: '70%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.15)',
                        transformOrigin: 'right center',
                        transform: `rotate(${-20 + i * 10}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Lower left wing */}
                <div
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '15px',
                    width: '70px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ffaa44 0%, #ffbb66 30%, #ffcc88 60%, #ffaa44 90%)',
                    borderRadius: '50% 20% 80% 50%',
                    border: '2px solid #dd9933',
                    boxShadow: 'inset -8px -8px 25px rgba(0, 0, 0, 0.3), inset 8px 8px 25px rgba(255, 255, 255, 0.2), 0 5px 20px rgba(255, 170, 68, 0.4)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: '30%',
                    width: '18px',
                    height: '18px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent)',
                    borderRadius: '50%'
                  }} />
                  {/* Wing veins */}
                  {[30, 50, 70].map((top, i) => (
                    <div
                      key={`vein-ll-${i}`}
                      style={{
                        position: 'absolute',
                        top: `${top}%`,
                        right: '15%',
                        width: '65%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.12)',
                        transformOrigin: 'right center',
                        transform: `rotate(${-15 + i * 8}deg)`
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Wings - RIGHT */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'left center',
                  zIndex: 5
                }}
                animate={{
                  rotateY: stage === 'flight'
                    ? [-10, 20, -20, 20, -10]
                    : stage === 'drying'
                    ? [-60, -30, -10]
                    : [-90, -80, -70, -60],
                  x: stage === 'flight' ? [0, 6, -6, 6, 0] : 0
                }}
                transition={{
                  rotateY: { 
                    duration: stage === 'flight' ? 0.4 : stage === 'drying' ? 2 : 2.5,
                    ease: stage === 'flight' ? 'easeInOut' : [0.4, 0.0, 0.2, 1],
                    repeat: stage === 'flight' ? Infinity : 0
                  },
                  x: { duration: 0.4, repeat: stage === 'flight' ? Infinity : 0, ease: 'easeInOut' }
                }}
              >
                {/* Upper right wing */}
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '-25px',
                    width: '80px',
                    height: '70px',
                    background: 'linear-gradient(-135deg, #ff6b35 0%, #ff8555 20%, #ffa575 40%, #ff7f50 60%, #ff6b35 80%)',
                    borderRadius: '20% 80% 80% 50%',
                    border: '2px solid #d85a2a',
                    boxShadow: 'inset 10px -10px 30px rgba(0, 0, 0, 0.3), inset -10px 10px 30px rgba(255, 255, 255, 0.2), 0 5px 20px rgba(255, 107, 53, 0.4)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '25%',
                    width: '20px',
                    height: '20px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '35%',
                    width: '15px',
                    height: '15px',
                    background: 'radial-gradient(circle, rgba(255, 215, 100, 0.5), transparent)',
                    borderRadius: '50%'
                  }} />
                  {/* Wing veins */}
                  {[20, 40, 60].map((top, i) => (
                    <div
                      key={`vein-r-${i}`}
                      style={{
                        position: 'absolute',
                        top: `${top}%`,
                        left: '10%',
                        width: '70%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.15)',
                        transformOrigin: 'left center',
                        transform: `rotate(${20 - i * 10}deg)`
                      }}
                    />
                  ))}
                </div>

                {/* Lower right wing */}
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '15px',
                    width: '70px',
                    height: '60px',
                    background: 'linear-gradient(-135deg, #ffaa44 0%, #ffbb66 30%, #ffcc88 60%, #ffaa44 90%)',
                    borderRadius: '20% 50% 50% 80%',
                    border: '2px solid #dd9933',
                    boxShadow: 'inset 8px -8px 25px rgba(0, 0, 0, 0.3), inset -8px 8px 25px rgba(255, 255, 255, 0.2), 0 5px 20px rgba(255, 170, 68, 0.4)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    width: '18px',
                    height: '18px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent)',
                    borderRadius: '50%'
                  }} />
                  {/* Wing veins */}
                  {[30, 50, 70].map((top, i) => (
                    <div
                      key={`vein-rr-${i}`}
                      style={{
                        position: 'absolute',
                        top: `${top}%`,
                        left: '15%',
                        width: '65%',
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.12)',
                        transformOrigin: 'left center',
                        transform: `rotate(${15 - i * 8}deg)`
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Sparkle trail during flight */}
              {stage === 'flight' && (
                <>
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '80%',
                        width: '6px',
                        height: '6px',
                        background: i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#ffaa44' : '#ffd700',
                        borderRadius: '50%',
                        boxShadow: `0 0 10px ${i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#ffaa44' : '#ffd700'}`,
                        filter: 'blur(1px)'
                      }}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: (Math.random() - 0.5) * 50,
                        y: 30 + Math.random() * 30
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.08,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini butterflies during flight */}
        <AnimatePresence>
          {stage === 'flight' && (
            <>
              {[...Array(25)].map((_, i) => {
                const angle = (i / 25) * Math.PI * 2;
                const distance = 80 + Math.random() * 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance - 50;
                
                return (
                  <motion.div
                    key={`mini-butterfly-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '35%',
                      width: '22px',
                      height: '22px'
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: [0, endX * 0.5, endX],
                      y: [0, endY * 0.5, endY],
                      opacity: [0, 1, 0.8, 0],
                      scale: [0, 1, 0.8, 0],
                      rotate: [0, Math.random() * 360, Math.random() * 720]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.2 + i * 0.025,
                      ease: [0.4, 0.0, 0.2, 1]
                    }}
                  >
                    {/* Simple butterfly silhouette */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#ffaa44' : '#ffd700',
                      clipPath: 'polygon(50% 20%, 20% 40%, 10% 70%, 30% 90%, 50% 85%, 70% 90%, 90% 70%, 80% 40%)',
                      filter: 'blur(0.5px)',
                      boxShadow: `0 0 8px ${i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#ffaa44' : '#ffd700'}`
                    }} />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(42)].map((_, i) => {
              const angle = (i / 42) * 360;
              const colors = ['rgba(255, 107, 53, 1)', 'rgba(255, 170, 68, 1)', 'rgba(255, 215, 100, 1)', 'rgba(139, 195, 74, 1)'];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 3 === 0 ? '10px' : i % 3 === 1 ? '7px' : '8px',
                    marginLeft: '-100vw',
                    marginTop: i % 3 === 0 ? '-5px' : i % 3 === 1 ? '-3.5px' : '-4px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.92)')} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.6, 2.4],
                    opacity: [0, 1, 0.94]
                  }}
                  transition={{
                    duration: 1.4,
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
                scale: [0, 7, 6.8],
                opacity: [0, 1, 0.96],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.7, ease: 'easeOut' }}
            >
              <div
                className="w-[45rem] h-[45rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 200, 0.98) 8%, rgba(255, 170, 68, 0.94) 18%, rgba(255, 107, 53, 0.9) 28%, rgba(139, 195, 74, 0.84) 40%, rgba(100, 160, 50, 0.76) 54%, rgba(70, 130, 40, 0.64) 70%, rgba(40, 90, 25, 0.46) 86%, transparent 98%)',
                  boxShadow: '0 0 450px rgba(255, 170, 68, 1), 0 0 650px rgba(139, 195, 74, 0.8)',
                  filter: 'blur(110px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 180 + ring * 110;
                const count = 40 + ring * 18;
                
                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#ff6b35', '#ffaa44', '#ffd700', '#8bc34a'];
                  
                  particles.push(
                    <motion.div
                      key={`orbit-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: colors[i % 4],
                        boxShadow: `0 0 14px ${colors[i % 4]}`,
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
                        delay: 0.4 + (ring * 58 + i) * 0.003,
                        duration: 6.5 + ring * 1.8,
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
            {[...Array(80)].map((_, i) => {
              const angle = (i / 80) * Math.PI * 2;
              const distance = 140 + Math.random() * 300;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#ff6b35', '#ffaa44', '#ffd700', '#8bc34a'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 140],
                    scale: [0, 2, 1.7],
                    opacity: [0, 1, 0.88, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.6,
                    delay: i * 0.005,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '11px',
                      height: '7px',
                      borderRadius: '50%',
                      background: colors[i % 4],
                      boxShadow: `0 0 11px ${colors[i % 4]}`,
                      filter: 'brightness(1.25)'
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
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-100 drop-shadow-2xl mb-3">
              You've Transformed
            </h2>
            <p className="text-2xl text-orange-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}