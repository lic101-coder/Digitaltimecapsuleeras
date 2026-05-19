/**
 * Wedding - Sparkler Send-Off Symphony Ceremony (Premium)
 * 
 * ENHANCED: More dramatic sparkler effects, better particles, clearer phoenix
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingSparklerCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Spark {
  id: number;
  x: number;
  y: number;
}

export function WeddingSparklerCeremony({
  isVisible,
  onComplete
}: WeddingSparklerCeremonyProps) {
  const [stage, setStage] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const timeline = [
      { time: 0, stage: 0 },      // Intro
      { time: 500, stage: 1 },    // Sparklers ignite
      { time: 2500, stage: 2 },   // Archway formed
      { time: 4500, stage: 3 },   // Write "FOREVER"
      { time: 7000, stage: 4 },   // Phoenix forming
      { time: 9500, stage: 5 },   // Wings spread
      { time: 11500, stage: 6 },  // Radiance
      { time: 14000, stage: 7 }   // Complete
    ];

    const timeouts = timeline.map(({ time, stage: s }) => 
      setTimeout(() => setStage(s), time)
    );
    
    setTimeout(onComplete, 14000);
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Enhanced continuous sparks from sparklers
  useEffect(() => {
    if (stage >= 1 && stage <= 2) {
      const interval = setInterval(() => {
        const newSparks: Spark[] = [];
        // Create MORE sparks along the archway
        for (let i = 0; i < 10; i++) {
          const progress = i / 9;
          const angle = Math.PI * progress;
          const x = 50 + Math.cos(angle) * 30;
          const y = 75 - Math.sin(angle) * 20;
          
          // Multiple sparks per position
          for (let j = 0; j < 4; j++) {
            newSparks.push({
              id: Date.now() + Math.random() + j,
              x: x + (Math.random() - 0.5) * 2,
              y: y + (Math.random() - 0.5) * 2
            });
          }
        }
        setSparks(prev => [...prev.slice(-150), ...newSparks]);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a]">
      {/* Night stars */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Sparklers in archway - ENHANCED glow */}
      <AnimatePresence>
        {stage >= 1 && stage < 4 && (
          <>
            {[...Array(10)].map((_, i) => {
              const progress = i / 9;
              const angle = Math.PI * progress;
              const x = 50 + Math.cos(angle) * 30;
              const y = 75 - Math.sin(angle) * 20;
              
              return (
                <motion.div
                  key={`sparkler-${i}`}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  {/* Sparkler core - BIGGER and BRIGHTER */}
                  <motion.div
                    className="relative w-6 h-6 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #ffffff, #fbbf24)',
                      boxShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.6)'
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Infinity
                    }}
                  />
                  
                  {/* Glow halo around each sparkler */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), rgba(251, 191, 36, 0.2), transparent)',
                      filter: 'blur(10px)',
                      pointerEvents: 'none'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Enhanced animated sparks falling from sparklers */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={`spark-${spark.id}`}
            className="absolute rounded-full"
            style={{
              left: `${spark.x}%`,
              top: `${spark.y}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: 'radial-gradient(circle, #ffffff, #fbbf24)',
              boxShadow: '0 0 6px rgba(255, 255, 255, 1)'
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{
              y: 80 + Math.random() * 40,
              x: (Math.random() - 0.5) * 60,
              opacity: 0,
              scale: 0
            }}
            transition={{ duration: 1.2 + Math.random() * 0.5, ease: 'easeIn' }}
          />
        ))}
      </AnimatePresence>

      {/* "FOREVER" text - ENHANCED with better glow */}
      <AnimatePresence>
        {stage >= 3 && stage < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ exit: { duration: 0.6 } }}
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              className="text-9xl font-black tracking-wider"
              style={{
                color: '#ffffff',
                textShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(251, 191, 36, 1), 0 0 90px rgba(234, 88, 12, 1), 0 0 120px rgba(234, 88, 12, 0.6)',
                fontFamily: 'Arial, sans-serif',
                WebkitTextStroke: '2px rgba(251, 191, 36, 0.5)'
              }}
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              FOREVER
            </motion.div>
            
            {/* Enhanced glowing particles around text */}
            {[...Array(30)].map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const radius = 180;
              
              return (
                <motion.div
                  key={`text-glow-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    left: '50%',
                    top: '50%',
                    background: 'radial-gradient(circle, #ffffff, #fbbf24)',
                    filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 1))'
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: [0, 1, 0.9, 1],
                    scale: [0, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.04
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phoenix rising - CLEARER with fire emoji */}
      <AnimatePresence>
        {stage >= 4 && stage < 6 && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              y: stage === 5 ? -60 : 0,
              scale: stage === 5 ? 1.3 : 1
            }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2"
            style={{ 
              transform: 'translate(-50%, -50%)',
              fontSize: '140px',
              filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 1)) drop-shadow(0 0 80px rgba(234, 88, 12, 1))'
            }}
          >
            🔥
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phoenix wings - ENHANCED particle formation */}
      <AnimatePresence>
        {stage === 5 && (
          <>
            {/* Left wing - more particles */}
            {[...Array(40)].map((_, i) => {
              const spread = i / 40;
              const x = -90 - spread * 120;
              const y = -30 + Math.sin(spread * Math.PI) * 90;
              
              return (
                <motion.div
                  key={`wing-left-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: '50%',
                    top: '30%',
                    width: `${5 + Math.random() * 4}px`,
                    height: `${5 + Math.random() * 4}px`,
                    background: i % 3 === 0
                      ? 'radial-gradient(circle, #ffffff, #fbbf24)'
                      : i % 3 === 1 
                      ? 'radial-gradient(circle, #fbbf24, #ea580c)'
                      : 'radial-gradient(circle, #ea580c, #dc2626)',
                    filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 1))'
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.015,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
            
            {/* Right wing - more particles */}
            {[...Array(40)].map((_, i) => {
              const spread = i / 40;
              const x = 90 + spread * 120;
              const y = -30 + Math.sin(spread * Math.PI) * 90;
              
              return (
                <motion.div
                  key={`wing-right-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: '50%',
                    top: '30%',
                    width: `${5 + Math.random() * 4}px`,
                    height: `${5 + Math.random() * 4}px`,
                    background: i % 3 === 0
                      ? 'radial-gradient(circle, #ffffff, #fbbf24)'
                      : i % 3 === 1 
                      ? 'radial-gradient(circle, #fbbf24, #ea580c)'
                      : 'radial-gradient(circle, #ea580c, #dc2626)',
                    filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 1))'
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.015,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Epic radiance finale - ENHANCED */}
      <AnimatePresence>
        {stage === 6 && (
          <>
            {/* 48 rays - brighter */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-[30%] origin-left"
                  style={{
                    width: '65%',
                    height: i % 3 === 0 ? '5px' : '3px',
                    background: i % 2 === 0
                      ? 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(251, 191, 36, 0.9), rgba(234, 88, 12, 0.4), transparent)'
                      : 'linear-gradient(to right, rgba(251, 191, 36, 1), rgba(234, 88, 12, 0.7), transparent)',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 1.4, 1.2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Enhanced falling ember rain */}
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={`ember-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: '25%',
                  width: `${3 + Math.random() * 5}px`,
                  height: `${3 + Math.random() * 5}px`,
                  background: i % 3 === 0
                    ? 'radial-gradient(circle, #ffffff, #fbbf24)'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, #fbbf24, #ea580c)'
                    : 'radial-gradient(circle, #ea580c, #dc2626)',
                  filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 1))'
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: 550,
                  x: (Math.random() - 0.5) * 180,
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2.2 + Math.random() * 0.6,
                  delay: i * 0.02,
                  ease: 'easeIn'
                }}
              />
            ))}

            {/* Central explosion - BIGGER */}
            <motion.div
              className="absolute left-1/2 top-[30%] rounded-full"
              style={{
                width: '500px',
                height: '500px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(251, 191, 36, 0.7), rgba(234, 88, 12, 0.4), transparent)',
                filter: 'blur(50px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
