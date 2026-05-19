/**
 * Wedding - Interlocking Rings Ceremony (Standard)
 * 
 * BRAND NEW CONCEPT: Two wedding rings orbit, interlock, and become infinity
 * Simple geometric elegance - unlike any other ceremony
 * 
 * Two rings appear → orbit each other → draw closer → 
 * interlock together → glow intensifies → transform to infinity → golden burst
 * 
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingVowThreadCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function WeddingVowThreadCeremony({
  isVisible,
  onComplete
}: WeddingVowThreadCeremonyProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timeline = [
      { time: 0, stage: 0 },      // Intro
      { time: 500, stage: 1 },    // Two rings appear
      { time: 2500, stage: 2 },   // Rings orbit each other
      { time: 4500, stage: 3 },   // Rings draw closer
      { time: 6500, stage: 4 },   // Rings interlock
      { time: 8500, stage: 5 },   // Glow intensifies
      { time: 10500, stage: 6 },  // Transform to infinity
      { time: 11500, stage: 7 },  // Radiance burst
      { time: 13000, stage: 8 }   // Complete
    ];

    const timeouts = timeline.map(({ time, stage: s }) => 
      setTimeout(() => setStage(s), time)
    );
    
    setTimeout(onComplete, 13000);
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1a0f2e] via-[#2d1b3d] to-[#1a0f2e]">
      {/* Elegant starfield */}
      {[...Array(70)].map((_, i) => (
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
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* TWO SEPARATE RINGS - orbiting and approaching */}
      <AnimatePresence>
        {stage >= 1 && stage < 6 && (
          <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
            {/* Left ring (Bride's ring) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: -200, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: stage >= 4 ? -40 : stage >= 3 ? -80 : -150,
                rotate: stage >= 2 ? 360 : 0
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                x: { duration: stage >= 4 ? 1.5 : stage >= 3 ? 1.2 : 0, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: stage >= 2 && stage < 4 ? Infinity : 0, ease: 'linear' }
              }}
              className="absolute"
            >
              {/* Ring structure */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Outer gold */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#goldGradient1)"
                  strokeWidth="14"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.8))'
                  }}
                />
                {/* Inner highlight */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#shineGradient1)"
                  strokeWidth="14"
                  strokeDasharray="20 60"
                  style={{ opacity: 0.6 }}
                />
                {/* Diamond on top */}
                <motion.g
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  <polygon
                    points="60,10 65,20 55,20"
                    fill="url(#diamondGradient)"
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 1))'
                    }}
                  />
                  <polygon
                    points="55,20 65,20 60,25"
                    fill="rgba(200, 230, 255, 0.9)"
                  />
                </motion.g>
                
                <defs>
                  <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#DAA520" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="shineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>
                  <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#c8e6ff" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Glow effect */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full"
                style={{
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent)',
                  filter: 'blur(20px)',
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: stage === 5 ? [0.5, 1, 0.5] : 0.5,
                  scale: stage === 5 ? [1, 1.3, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: stage === 5 ? Infinity : 0
                }}
              />
            </motion.div>

            {/* Right ring (Groom's ring) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 200, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: stage >= 4 ? 40 : stage >= 3 ? 80 : 150,
                rotate: stage >= 2 ? -360 : 0
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { duration: stage >= 4 ? 1.5 : stage >= 3 ? 1.2 : 0, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: stage >= 2 && stage < 4 ? Infinity : 0, ease: 'linear' }
              }}
              className="absolute"
            >
              {/* Ring structure */}
              <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Outer gold */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#goldGradient2)"
                  strokeWidth="14"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.8))'
                  }}
                />
                {/* Inner highlight */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#shineGradient2)"
                  strokeWidth="14"
                  strokeDasharray="20 60"
                  style={{ opacity: 0.6 }}
                />
                
                <defs>
                  <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#DAA520" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="shineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Glow effect */}
              <motion.div
                className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full"
                style={{
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent)',
                  filter: 'blur(20px)',
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: stage === 5 ? [0.5, 1, 0.5] : 0.5,
                  scale: stage === 5 ? [1, 1.3, 1] : 1
                }}
                transition={{
                  duration: 1,
                  repeat: stage === 5 ? Infinity : 0,
                  delay: 0.5
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERLOCKED RINGS - Olympic style */}
      <AnimatePresence>
        {stage === 4 || stage === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ exit: { duration: 0.8 } }}
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <svg width="200" height="120" viewBox="0 0 200 120">
              {/* Left ring - in front on top, behind on bottom */}
              <defs>
                <mask id="leftMask">
                  <rect width="200" height="120" fill="white" />
                  {/* Cut out where right ring goes in front */}
                  <ellipse cx="120" cy="60" rx="47" ry="47" fill="black" />
                  <ellipse cx="120" cy="60" rx="33" ry="33" fill="white" />
                </mask>
              </defs>
              
              <circle
                cx="80"
                cy="60"
                r="40"
                fill="none"
                stroke="url(#interlockGold1)"
                strokeWidth="14"
                mask="url(#leftMask)"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(218, 165, 32, 1))'
                }}
              />
              
              {/* Right ring - behind on top, in front on bottom */}
              <defs>
                <mask id="rightMask">
                  <rect width="200" height="120" fill="white" />
                  {/* Cut out where left ring goes in front */}
                  <ellipse cx="80" cy="60" rx="47" ry="47" fill="black" />
                  <ellipse cx="80" cy="60" rx="33" ry="33" fill="white" />
                </mask>
              </defs>
              
              <circle
                cx="120"
                cy="60"
                r="40"
                fill="none"
                stroke="url(#interlockGold2)"
                strokeWidth="14"
                mask="url(#rightMask)"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(218, 165, 32, 1))'
                }}
              />
              
              {/* Shine effects */}
              <motion.circle
                cx="80"
                cy="60"
                r="40"
                fill="none"
                stroke="url(#interlockShine)"
                strokeWidth="14"
                strokeDasharray="15 40"
                mask="url(#leftMask)"
                style={{ opacity: 0.7 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.circle
                cx="120"
                cy="60"
                r="40"
                fill="none"
                stroke="url(#interlockShine)"
                strokeWidth="14"
                strokeDasharray="15 40"
                mask="url(#rightMask)"
                style={{ opacity: 0.7 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              <defs>
                <linearGradient id="interlockGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="interlockGold2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="interlockShine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Intensifying glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-48 h-48 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.5), rgba(218, 165, 32, 0.3), transparent)',
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }}
              animate={{
                scale: stage === 5 ? [1, 1.4, 1] : 1,
                opacity: stage === 5 ? [0.6, 1, 0.6] : 0.6
              }}
              transition={{
                duration: 1.2,
                repeat: stage === 5 ? Infinity : 0
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* INFINITY SYMBOL - transformation */}
      <AnimatePresence>
        {stage >= 6 && stage < 7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 1, ease: 'easeOut', exit: { duration: 0.6 } }}
            className="absolute left-1/2 top-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <svg width="280" height="140" viewBox="0 0 280 140">
              {/* Infinity symbol using two circles */}
              <path
                d="M 70 70 C 70 45, 45 30, 25 30 C 5 30, -10 45, -10 70 C -10 95, 5 110, 25 110 C 45 110, 70 95, 70 70 Z"
                transform="translate(70, 0)"
                fill="none"
                stroke="url(#infinityGold)"
                strokeWidth="18"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(218, 165, 32, 1))'
                }}
              />
              <path
                d="M 70 70 C 70 45, 95 30, 115 30 C 135 30, 150 45, 150 70 C 150 95, 135 110, 115 110 C 95 110, 70 95, 70 70 Z"
                transform="translate(70, 0)"
                fill="none"
                stroke="url(#infinityGold)"
                strokeWidth="18"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(218, 165, 32, 1))'
                }}
              />
              
              {/* Animated shine traveling along the infinity */}
              <motion.circle
                r="8"
                fill="rgba(255, 255, 255, 0.9)"
                style={{
                  filter: 'blur(4px) drop-shadow(0 0 8px rgba(255, 255, 255, 1))'
                }}
                animate={{
                  offsetDistance: ['0%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 95 70 C 95 45, 70 30, 50 30 C 30 30, 5 45, 5 70 C 5 95, 30 110, 50 110 C 70 110, 95 95, 95 70 C 95 45, 120 30, 140 30 C 160 30, 185 45, 185 70 C 185 95, 160 110, 140 110 C 120 110, 95 95, 95 70"
                />
              </motion.circle>
              
              <defs>
                <linearGradient id="infinityGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8860B" />
                  <stop offset="25%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="75%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Pulsing glow around infinity */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-64 h-32 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.6), rgba(218, 165, 32, 0.3), transparent)',
                filter: 'blur(40px)',
                pointerEvents: 'none'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 7 && (
          <>
            {/* 44 radiant rays */}
            {[...Array(44)].map((_, i) => {
              const angle = (i / 44) * 360;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '55%',
                    height: i % 3 === 0 ? '5px' : '3px',
                    background: `linear-gradient(to right, rgba(255, 215, 0, ${0.9 + Math.random() * 0.1}), rgba(218, 165, 32, 0.6), transparent)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 1.4, 1.2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Golden particle burst */}
            {[...Array(90)].map((_, i) => {
              const angle = (i / 90) * 360;
              const distance = 200 + Math.random() * 150;
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: `${3 + Math.random() * 5}px`,
                    height: `${3 + Math.random() * 5}px`,
                    background: i % 2 === 0
                      ? 'radial-gradient(circle, #FFD700, #DAA520)'
                      : 'radial-gradient(circle, #ffffff, #FFD700)',
                    filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 1))'
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle * Math.PI / 180) * distance,
                    y: Math.sin(angle * Math.PI / 180) * distance,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{
                    duration: 1.8,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central golden explosion */}
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: '500px',
                height: '500px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 215, 0, 0.7), rgba(218, 165, 32, 0.4), transparent)',
                filter: 'blur(60px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2 }}
            />

            {/* Bright white flash at center */}
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: '150px',
                height: '150px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1), transparent 60%)',
                filter: 'blur(20px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 1.5],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
