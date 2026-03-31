/**
 * New Nest - Snowglobe Escape Ceremony (LEGENDARY)
 * 
 * CONCEPT: Start trapped in tiny snowglobe with miniature house. Snow swirls.
 * Crack appears with sound. Globe SHATTERS in slow-motion. You and house EXPAND
 * to full size. Snow becomes stars. Whole world opens up around you. Free and home.
 * 
 * Duration: 14 seconds
 * Stages:
 * 1. 0-1.5s: Inside snowglobe - trapped, small
 * 2. 1.5-3s: Snow swirls intensify
 * 3. 3-5s: Crack appears and spreads
 * 4. 5-7s: SHATTER in slow-motion
 * 5. 7-9s: Expansion - you and house grow
 * 6. 9-11s: Snow transforms to stars
 * 7. 11-14s: Epic radiance finale - freedom
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewNestSnowglobeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewNestSnowglobeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewNestSnowglobeCeremonyProps) {
  const [stage, setStage] = useState<'trapped' | 'swirl' | 'crack' | 'shatter' | 'expand' | 'transform' | 'radiance' | 'outro'>('trapped');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('trapped') },
      { time: 1500, action: () => setStage('swirl') },
      { time: 3000, action: () => setStage('crack') },
      { time: 5000, action: () => setStage('shatter') },
      { time: 7000, action: () => setStage('expand') },
      { time: 9000, action: () => setStage('transform') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 14000, action: () => setStage('outro') },
      { time: 14500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950">
      {/* Title */}
      <AnimatePresence>
        {stage === 'trapped' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/4 left-0 right-0 text-center z-50"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{
                color: '#60a5fa',
                textShadow: '0 4px 20px rgba(96, 165, 250, 0.6)'
              }}
            >
              {capsuleTitle}
            </motion.h1>
            <p className="text-blue-200 text-xl">Your New Beginning</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SNOWGLOBE CONTAINER - Fish-eye effect */}
      <AnimatePresence>
        {(stage === 'trapped' || stage === 'swirl' || stage === 'crack') && (
          <motion.div
            className="absolute inset-0 z-20"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Globe glass with distortion */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                border: '8px solid rgba(255, 255, 250, 0.3)',
                background: 'radial-gradient(circle at center, transparent 60%, rgba(96, 165, 250, 0.2) 100%)',
                boxShadow: 'inset 0 0 100px rgba(96, 165, 250, 0.2), 0 0 60px rgba(96, 165, 250, 0.4)',
                overflow: 'hidden'
              }}
              animate={stage === 'crack' ? {
                scale: [1, 1.02, 1.01]
              } : {}}
              transition={{ duration: 0.3, repeat: stage === 'crack' ? 3 : 0 }}
            >
              {/* Distortion overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 250, 0.4), transparent 40%)',
                  mixBlendMode: 'overlay'
                }}
              />

              {/* Miniature house inside */}
              <motion.div
                className="absolute left-1/2 bottom-[35%] -translate-x-1/2"
                initial={{ scale: 0.4 }}
                animate={{ scale: stage === 'trapped' ? 0.4 : 0.45 }}
                transition={{ duration: 1 }}
              >
                <svg width="200" height="180" viewBox="0 0 200 180">
                  {/* House body - yellow walls */}
                  <rect x="35" y="80" width="130" height="100" fill="#fbbf24" />
                  
                  {/* Roof - brown shingles */}
                  <path d="M 25 80 L 100 30 L 175 80 Z" fill="#92400e" />
                  <path d="M 30 80 L 100 35 L 170 80 Z" fill="#b45309" opacity="0.7" />
                  
                  {/* Door - centered */}
                  <rect x="85" y="130" width="30" height="50" fill="#78350f" />
                  <circle cx="108" cy="155" r="2.5" fill="#fbbf24" />
                  
                  {/* Windows - PROPERLY ALIGNED */}
                  {/* Upper floor: 3 windows evenly spaced */}
                  {/* Left upper window */}
                  <rect x="50" y="95" width="24" height="28" fill="#60a5fa" opacity="0.85" />
                  <line x1="62" y1="95" x2="62" y2="123" stroke="#1e40af" strokeWidth="2" />
                  <line x1="50" y1="109" x2="74" y2="109" stroke="#1e40af" strokeWidth="2" />
                  
                  {/* Center upper window */}
                  <rect x="88" y="95" width="24" height="28" fill="#60a5fa" opacity="0.85" />
                  <line x1="100" y1="95" x2="100" y2="123" stroke="#1e40af" strokeWidth="2" />
                  <line x1="88" y1="109" x2="112" y2="109" stroke="#1e40af" strokeWidth="2" />
                  
                  {/* Right upper window */}
                  <rect x="126" y="95" width="24" height="28" fill="#60a5fa" opacity="0.85" />
                  <line x1="138" y1="95" x2="138" y2="123" stroke="#1e40af" strokeWidth="2" />
                  <line x1="126" y1="109" x2="150" y2="109" stroke="#1e40af" strokeWidth="2" />
                  
                  {/* Lower floor: 2 windows flanking door, aligned with upper windows */}
                  {/* Left lower window - aligned with left upper */}
                  <rect x="50" y="140" width="24" height="28" fill="#60a5fa" opacity="0.85" />
                  <line x1="62" y1="140" x2="62" y2="168" stroke="#1e40af" strokeWidth="2" />
                  <line x1="50" y1="154" x2="74" y2="154" stroke="#1e40af" strokeWidth="2" />
                  
                  {/* Right lower window - aligned with right upper */}
                  <rect x="126" y="140" width="24" height="28" fill="#60a5fa" opacity="0.85" />
                  <line x1="138" y1="140" x2="138" y2="168" stroke="#1e40af" strokeWidth="2" />
                  <line x1="126" y1="154" x2="150" y2="154" stroke="#1e40af" strokeWidth="2" />
                  
                  {/* Ground line */}
                  <rect x="0" y="180" width="200" height="20" fill="#166534" />
                </svg>
              </motion.div>

              {/* Snow particles inside globe */}
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={`snow-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 80}%`,
                    filter: 'blur(1px)'
                  }}
                  animate={{
                    y: stage === 'swirl' 
                      ? [0, Math.random() * 100 - 50]
                      : [0, 20, 0],
                    x: stage === 'swirl'
                      ? [0, Math.random() * 60 - 30]
                      : [0, Math.random() * 10 - 5, 0],
                    opacity: [0.8, 1, 0.8],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: stage === 'swirl' ? 1.5 : 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: stage === 'swirl' ? 'easeInOut' : 'linear'
                  }}
                />
              ))}

              {/* Globe base */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '180px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, #92400e, #78350f)',
                  borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
                  border: '3px solid #d97706',
                  borderBottom: 'none'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRACK EFFECT */}
      <AnimatePresence>
        {stage === 'crack' && (
          <>
            {/* Multiple crack lines */}
            {[
              { start: { x: 50, y: 30 }, end: { x: 70, y: 10 }, delay: 0 },
              { start: { x: 50, y: 30 }, end: { x: 30, y: 15 }, delay: 0.1 },
              { start: { x: 50, y: 30 }, end: { x: 60, y: 50 }, delay: 0.2 },
              { start: { x: 50, y: 30 }, end: { x: 40, y: 55 }, delay: 0.15 },
              { start: { x: 50, y: 30 }, end: { x: 75, y: 40 }, delay: 0.25 },
              { start: { x: 50, y: 30 }, end: { x: 25, y: 45 }, delay: 0.18 }
            ].map((crack, i) => (
              <motion.svg
                key={`crack-${i}`}
                className="absolute inset-0 z-25 pointer-events-none"
                style={{ width: '100%', height: '100%' }}
              >
                <motion.line
                  x1={`${crack.start.x}%`}
                  y1={`${crack.start.y}%`}
                  x2={`${crack.start.x}%`}
                  y2={`${crack.start.y}%`}
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                  initial={{
                    x2: `${crack.start.x}%`,
                    y2: `${crack.start.y}%`
                  }}
                  animate={{
                    x2: `${crack.end.x}%`,
                    y2: `${crack.end.y}%`
                  }}
                  transition={{
                    duration: 0.8,
                    delay: crack.delay,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(255, 255, 250, 0.8))'
                  }}
                />
              </motion.svg>
            ))}

            {/* Crack origin point glow */}
            <motion.div
              className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 z-24"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'radial-gradient(circle, rgba(255, 255, 250, 1), transparent)',
                  filter: 'blur(10px)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SHATTER EXPLOSION */}
      <AnimatePresence>
        {stage === 'shatter' && (
          <>
            {/* Glass shards flying outward */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 15) * (Math.PI / 180);
              const distance = 150 + Math.random() * 100;
              const rotation = Math.random() * 720 - 360;
              
              return (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute left-1/2 top-1/2 z-30"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 0.8, 0],
                    scale: [1, 0.8, 0.3],
                    rotate: rotation
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.34, 1, 0.68, 1]
                  }}
                >
                  <svg
                    width={20 + Math.random() * 30}
                    height={20 + Math.random() * 30}
                    viewBox="0 0 50 50"
                  >
                    <polygon
                      points={`${Math.random() * 50},0 50,${Math.random() * 50} ${Math.random() * 50},50 0,${Math.random() * 50}`}
                      fill="rgba(255, 255, 250, 0.6)"
                      stroke="rgba(96, 165, 250, 0.8)"
                      strokeWidth="2"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.6))'
                      }}
                    />
                  </svg>
                </motion.div>
              );
            })}

            {/* Shockwave effect */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-28"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 3, 4], 
                opacity: [1, 0.6, 0] 
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  border: '4px solid rgba(96, 165, 250, 0.8)',
                  borderRadius: '50%',
                  boxShadow: '0 0 40px rgba(96, 165, 250, 0.6)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EXPANSION - House grows to full size */}
      <AnimatePresence>
        {(stage === 'expand' || stage === 'transform' || stage === 'radiance') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-35"
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: stage === 'expand' ? [0, -20, 0] : 0
            }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <svg width="400" height="350" viewBox="0 0 400 350">
              <defs>
                <linearGradient id="expandHouseWall" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <filter id="houseGlow">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>

              {/* House body */}
              <rect x="50" y="150" width="300" height="200" fill="url(#expandHouseWall)" />

              {/* Roof */}
              <path d="M 30 150 L 200 50 L 370 150 Z" fill="#92400e" />
              <path d="M 35 150 L 200 55 L 365 150 Z" fill="#b45309" />

              {/* Chimney */}
              <rect x="280" y="80" width="30" height="70" fill="#78350f" />
              <rect x="275" y="75" width="40" height="10" fill="#92400e" />

              {/* Smoke from chimney */}
              {[...Array(5)].map((_, i) => (
                <motion.ellipse
                  key={`smoke-${i}`}
                  cx="295"
                  cy={70 - i * 15}
                  rx={8 + i * 2}
                  ry={6 + i * 2}
                  fill="#e5e7eb"
                  opacity={0.6 - i * 0.1}
                  animate={{
                    x: [0, 10, -10, 0],
                    opacity: [0.6 - i * 0.1, 0.4 - i * 0.1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}

              {/* Door */}
              <rect x="170" y="240" width="60" height="110" rx="4" fill="#92400e" />
              <circle cx="210" cy="295" r="4" fill="#fbbf24" />

              {/* Windows - glowing - PROPERLY ALIGNED INSIDE HOUSE */}
              {/* House walls: x=50 to x=350 (300px wide) */}
              {/* Window width: 50px, so max x position = 280 (280+50=330 < 350) */}
              {/* Upper floor: 4 windows at x: 70, 140, 210, 280 */}
              {/* Lower floor: 2 windows at x: 70, 280 (aligned with outer uppers) */}
              {[
                { x: 70, y: 180 },
                { x: 140, y: 180 },
                { x: 210, y: 180 },
                { x: 280, y: 180 },
                { x: 70, y: 270 },
                { x: 280, y: 270 }
              ].map((pos, i) => (
                <g key={`expand-window-${i}`}>
                  <motion.rect
                    x={pos.x}
                    y={pos.y}
                    width="50"
                    height="50"
                    rx="3"
                    fill="#fbbf24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.95, 0.9] }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                  <line
                    x1={pos.x + 25}
                    y1={pos.y}
                    x2={pos.x + 25}
                    y2={pos.y + 50}
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  <line
                    x1={pos.x}
                    y1={pos.y + 25}
                    x2={pos.x + 50}
                    y2={pos.y + 25}
                    stroke="#d97706"
                    strokeWidth="2"
                  />
                  {/* Window glow */}
                  <motion.rect
                    x={pos.x - 10}
                    y={pos.y - 10}
                    width="70"
                    height="70"
                    rx="8"
                    fill="#fbbf24"
                    opacity="0.4"
                    filter="url(#houseGlow)"
                    animate={{
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                </g>
              ))}

              {/* Ground/garden */}
              <rect x="0" y="350" width="400" height="50" fill="#166534" />
              
              {/* Small plants */}
              {[60, 120, 280, 340].map((x, i) => (
                <motion.g
                  key={`plant-${i}`}
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                >
                  <circle cx={x} cy="345" r="8" fill="#10b981" />
                  <circle cx={x - 6} cy="342" r="6" fill="#10b981" />
                  <circle cx={x + 6} cy="342" r="6" fill="#10b981" />
                </motion.g>
              ))}
            </svg>

            {/* Expansion energy waves */}
            {stage === 'expand' && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 2, 2.5], 
                      opacity: [0, 0.6, 0] 
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: i * 0.3,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '500px',
                        height: '500px',
                        border: '3px solid rgba(96, 165, 250, 0.6)',
                        borderRadius: '50%'
                      }}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SNOW TRANSFORMS TO STARS */}
      <AnimatePresence>
        {(stage === 'transform' || stage === 'radiance') && (
          <>
            {[...Array(80)].map((_, i) => {
              const startX = 20 + Math.random() * 60;
              const startY = 20 + Math.random() * 60;
              const endX = Math.random() * 100;
              const endY = Math.random() * 100;
              
              return (
                <motion.div
                  key={`star-particle-${i}`}
                  className="absolute z-30"
                  style={{
                    left: `${startX}%`,
                    top: `${startY}%`
                  }}
                  initial={{
                    scale: 1,
                    opacity: 0.8
                  }}
                  animate={{
                    x: `${(endX - startX) * 10}px`,
                    y: `${(endY - startY) * 10}px`,
                    scale: [1, 0.5, 1.2],
                    opacity: [0.8, 0.4, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.02,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      width: '8px',
                      height: '8px'
                    }}
                  >
                    {/* Star core */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #fef3c7, #fbbf24)',
                        boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)'
                      }}
                    />
                    {/* Star points */}
                    <div
                      className="absolute inset-[-2px]"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, #fef3c7, transparent, #fef3c7, transparent)',
                        opacity: 0.7,
                        filter: 'blur(1px)'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 360° silver-blue rays */}
            {[...Array(44)].map((_, i) => {
              const rotation = (i * 360) / 44;
              const color = i % 2 === 0 ? 'rgba(96, 165, 250, 0.7)' : 'rgba(254, 243, 199, 0.6)';
              
              return (
                <motion.div
                  key={`radiance-ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw',
                    height: '4px',
                    marginLeft: '-100vw',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.6],
                    scaleX: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.01,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to right, transparent, ${color} 50%, transparent)`,
                      filter: 'blur(2px)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center radiance pulse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2.2],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  background: 'radial-gradient(circle, rgba(254, 243, 199, 1), rgba(96, 165, 250, 0.8), transparent)',
                  filter: 'blur(50px)'
                }}
              />
            </motion.div>

            {/* Floating glass shards (remnants) */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180);
              const radius = 180;
              
              return (
                <motion.div
                  key={`floating-shard-${i}`}
                  className="absolute z-45"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1, 0.9],
                    opacity: [0, 0.6, 0.5],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30">
                      <polygon
                        points="15,0 25,10 20,25 5,20"
                        fill="rgba(255, 255, 250, 0.4)"
                        stroke="rgba(96, 165, 250, 0.6)"
                        strokeWidth="1"
                        style={{
                          filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.4))'
                        }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Freedom emojis */}
            {['🏠', '✨', '🆓', '🌟', '💫'].map((emoji, i) => {
              const angle = (i * 72) * (Math.PI / 180);
              const radius = 220;
              
              return (
                <motion.div
                  key={`freedom-emoji-${i}`}
                  className="absolute text-7xl z-48"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1.3, 1],
                    opacity: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {emoji}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* "YOUR WORLD AWAITS" text */}
            <motion.div
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-50"
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
              <h1
                className="text-6xl md:text-7xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #fef3c7, #fbbf24, #60a5fa)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(96, 165, 250, 0.8)',
                  filter: 'drop-shadow(0 4px 30px rgba(96, 165, 250, 0.6))'
                }}
              >
                Your World Awaits
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}