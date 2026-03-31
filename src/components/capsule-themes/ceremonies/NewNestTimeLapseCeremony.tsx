/**
 * New Nest - Time Lapse Legacy Ceremony (LEGENDARY)
 * 
 * CONCEPT: Blueprint unrolls. RAPID time-lapse through construction: foundation,
 * framing, walls, roof. Moving day. First dinner. Holidays. Kids growing. Pets.
 * Seasons blur. Years pass. Home ages beautifully. Present day with all memories
 * glowing in windows.
 * 
 * Duration: 16 seconds
 * Stages:
 * 1. 0-1.5s: Blueprint unrolls
 * 2. 1.5-4s: Construction time-lapse (foundation → roof)
 * 3. 4-6s: Moving day
 * 4. 6-9s: Life moments (dinner, holidays, kids)
 * 5. 9-11s: Seasons rapid cycle
 * 6. 11-13s: Years pass, home ages
 * 7. 13-16s: Present day - memories glow, epic radiance
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewNestTimeLapseCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewNestTimeLapseCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewNestTimeLapseCeremonyProps) {
  const [stage, setStage] = useState<'blueprint' | 'construction' | 'moving' | 'life' | 'seasons' | 'aging' | 'present' | 'outro'>('blueprint');
  const [constructionPhase, setConstructionPhase] = useState<'foundation' | 'framing' | 'walls'>('foundation');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('blueprint') },
      { time: 1500, action: () => setStage('construction') },
      { time: 4000, action: () => setStage('moving') },
      { time: 6000, action: () => setStage('life') },
      { time: 9000, action: () => setStage('seasons') },
      { time: 11000, action: () => setStage('aging') },
      { time: 13000, action: () => setStage('present') },
      { time: 16000, action: () => setStage('outro') },
      { time: 16500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Construction phase manager
  useEffect(() => {
    if (stage === 'construction') {
      const constructionTimeline = [
        { time: 0, action: () => setConstructionPhase('foundation') },
        { time: 800, action: () => setConstructionPhase('framing') },
        { time: 2000, action: () => setConstructionPhase('walls') }
      ];
      
      const timeouts = constructionTimeline.map(({ time, action }) => setTimeout(action, time));
      return () => timeouts.forEach(clearTimeout);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      {/* Title */}
      <AnimatePresence>
        {stage === 'blueprint' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="absolute top-20 left-0 right-0 text-center z-50"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{
                color: '#ea580c',
                textShadow: '0 4px 20px rgba(234, 88, 12, 0.4)'
              }}
            >
              {capsuleTitle}
            </motion.h1>
            <p className="text-orange-700 text-xl">The Story Begins</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLUEPRINT UNROLLING */}
      <AnimatePresence>
        {stage === 'blueprint' && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="500" height="400" viewBox="0 0 500 400">
              <defs>
                <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#dbeafe" />
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#93c5fd" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Blueprint background */}
              <rect x="0" y="0" width="500" height="400" fill="url(#blueprintGrid)" />

              {/* House blueprint lines */}
              <motion.g
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Foundation */}
                <motion.rect
                  x="100"
                  y="250"
                  width="300"
                  height="10"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
                
                {/* Walls */}
                <motion.path
                  d="M 100 250 L 100 150 M 400 250 L 400 150"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
                
                {/* Roof outline */}
                <motion.path
                  d="M 80 150 L 250 50 L 420 150"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                />

                {/* Door outline - just outline in blueprint */}
                <motion.rect
                  x="220"
                  y="200"
                  width="60"
                  height="50"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="2"
                  rx="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                />

                {/* Window outlines - just rectangles in blueprint */}
                {[
                  { x: 130, y: 180 },
                  { x: 200, y: 180 },
                  { x: 280, y: 180 },
                  { x: 350, y: 180 }
                ].map((pos, i) => (
                  <motion.rect
                    key={`blueprint-window-${i}`}
                    x={pos.x}
                    y={pos.y}
                    width="40"
                    height="40"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, delay: 1 + i * 0.05 }}
                  />
                ))}

              </motion.g>

              {/* Blueprint annotations */}
              <motion.text
                x="250"
                y="320"
                fontSize="16"
                fill="#1e40af"
                fontFamily="monospace"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                NEW HOME - 2026
              </motion.text>
            </svg>

            {/* Blueprint rolling effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-full"
              style={{
                background: 'linear-gradient(to bottom, transparent 90%, #fed7aa 100%)',
                transformOrigin: 'top'
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONSTRUCTION TIME-LAPSE */}
      <AnimatePresence>
        {(stage === 'construction' || stage === 'moving' || stage === 'life' || stage === 'seasons' || stage === 'aging' || stage === 'present') && (
          <motion.div
            className="absolute left-1/2 bottom-[10%] -translate-x-1/2 z-25"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Construction phases - ONLY SHOW DURING CONSTRUCTION STAGE */}
            {stage === 'construction' && (
              <AnimatePresence mode="wait">
                {/* Foundation phase */}
                <motion.div
                  key="foundation-phase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2"
                >
                  <svg width="350" height="100" viewBox="0 0 350 100">
                    <rect x="25" y="60" width="300" height="40" fill="#78350f" />
                    <text x="175" y="45" fontSize="16" fill="#92400e" textAnchor="middle" fontWeight="bold">
                      FOUNDATION
                    </text>
                  </svg>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Final house structure for all stages AFTER construction */}
            {(stage === 'moving' || stage === 'life' || stage === 'seasons' || stage === 'aging' || stage === 'present') && (
              <motion.svg
                width="400"
                height="320"
                viewBox="0 0 400 320"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <defs>
                  <filter id="aging" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={stage === 'aging' ? "1" : "0"} />
                  </filter>
                </defs>

                {/* House body */}
                <rect
                  x="50"
                  y="150"
                  width="300"
                  height="170"
                  fill={stage === 'aging' ? '#fde68a' : '#fef3c7'}
                  filter={stage === 'aging' ? 'url(#aging)' : 'none'}
                />

                {/* Roof */}
                <path d="M 30 150 L 200 50 L 370 150 Z" fill="#92400e" />
                <path d="M 35 150 L 200 55 L 365 150 Z" fill="#b45309" />

                {/* Chimney */}
                <rect x="280" y="80" width="30" height="70" fill="#78350f" />

                {/* Door */}
                <rect x="185" y="250" width="30" height="70" rx="3" fill="#92400e" />
                <circle cx="207" cy="285" r="3" fill="#fbbf24" />

                {/* Windows - PROPERLY ALIGNED INSIDE HOUSE */}
                {/* House walls: x=50 to x=350 (300px wide) */}
                {/* Window width: 50px, so max x = 280 (280+50=330 < 350) */}
                {/* Upper: 4 windows at x: 70, 140, 210, 280 */}
                {/* Lower: 2 windows at x: 70, 280 (aligned with outer uppers) */}
                {[
                  { x: 70, y: 175, memory: '🍽️' },
                  { x: 140, y: 175, memory: '🎄' },
                  { x: 210, y: 175, memory: '📚' },
                  { x: 280, y: 175, memory: '👨‍👩‍👧' },
                  { x: 70, y: 255, memory: '🎂' },
                  { x: 280, y: 255, memory: '💛' }
                ].map((window, i) => (
                  <g key={`house-window-${i}`}>
                    <rect
                      x={window.x}
                      y={window.y}
                      width="50"
                      height="55"
                      rx="3"
                      fill={(stage === 'life' || stage === 'present') ? '#fbbf24' : '#60a5fa'}
                      opacity={(stage === 'life' || stage === 'present') ? 0.95 : 0.7}
                    />
                    <line
                      x1={window.x + 25}
                      y1={window.y}
                      x2={window.x + 25}
                      y2={window.y + 55}
                      stroke={stage === 'present' ? '#d97706' : '#1e40af'}
                      strokeWidth="2"
                    />
                    <line
                      x1={window.x}
                      y1={window.y + 27.5}
                      x2={window.x + 50}
                      y2={window.y + 27.5}
                      stroke={stage === 'present' ? '#d97706' : '#1e40af'}
                      strokeWidth="2"
                    />

                    {/* Memory emojis in windows */}
                    {(stage === 'life' || stage === 'present') && (
                      <motion.text
                        x={window.x + 25}
                        y={window.y + 38}
                        fontSize="26"
                        textAnchor="middle"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0.9], scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                      >
                        {window.memory}
                      </motion.text>
                    )}

                    {/* Window glow in present stage */}
                    {stage === 'present' && (
                      <motion.rect
                        x={window.x - 5}
                        y={window.y - 5}
                        width="60"
                        height="65"
                        rx="5"
                        fill="#fbbf24"
                        opacity="0.3"
                        style={{ filter: 'blur(10px)' }}
                        animate={{
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    )}
                  </g>
                ))}

                {/* Chimney smoke (when life/present) */}
                {(stage === 'life' || stage === 'present') && (
                  <>
                    {[...Array(4)].map((_, i) => (
                      <motion.ellipse
                        key={`smoke-${i}`}
                        cx="295"
                        cy={70 - i * 12}
                        rx={6 + i * 2}
                        ry={5 + i * 2}
                        fill="#cbd5e1"
                        opacity={0.5 - i * 0.1}
                        animate={{
                          x: [0, 8, -8, 0],
                          opacity: [0.5 - i * 0.1, 0.3 - i * 0.1, 0]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.4
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Ground/yard */}
                <rect x="0" y="320" width="400" height="50" fill="#166534" />

                {/* Garden plants */}
                {[70, 140, 260, 330].map((x, i) => (
                  <g key={`plant-${i}`}>
                    <circle cx={x} cy="315" r="8" fill="#10b981" />
                    <circle cx={x - 5} cy="312" r="6" fill="#10b981" />
                    <circle cx={x + 5} cy="312" r="6" fill="#10b981" />
                  </g>
                ))}
              </motion.svg>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOVING DAY - Boxes floating */}
      <AnimatePresence>
        {stage === 'moving' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`box-${i}`}
                className="absolute z-30"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: `${60 + Math.random() * 30}%`
                }}
                initial={{ y: 100, opacity: 0, rotate: -20 }}
                animate={{ 
                  y: [100, -20, 0], 
                  opacity: [0, 1, 0.8],
                  rotate: [-20, 10, 0]
                }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.15,
                  ease: [0.34, 1, 0.68, 1]
                }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <rect x="5" y="5" width="50" height="50" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                  <line x1="5" y1="30" x2="55" y2="30" stroke="#92400e" strokeWidth="2" />
                  <line x1="30" y1="5" x2="30" y2="55" stroke="#92400e" strokeWidth="2" />
                  <text x="30" y="20" fontSize="12" fill="#78350f" textAnchor="middle">📦</text>
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SEASONS RAPID CYCLE */}
      <AnimatePresence>
        {stage === 'seasons' && (
          <>
            {/* Seasonal overlays that flash quickly */}
            {/* Spring - flowers */}
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`flower-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${60 + Math.random() * 30}%`
                  }}
                >
                  <span className="text-3xl">🌸</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Summer - sun rays */}
            <motion.div
              className="absolute top-[10%] right-[15%] z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                  boxShadow: '0 0 60px rgba(251, 191, 36, 0.8)'
                }}
              />
            </motion.div>

            {/* Fall - leaves */}
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`leaf-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, 100],
                    x: [0, Math.random() * 40 - 20],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05
                  }}
                >
                  <span className="text-2xl">🍂</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Winter - snow */}
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`snow-${i}`}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, 100],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.03,
                    repeat: Infinity
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MEMORY ORBS floating */}
      <AnimatePresence>
        {(stage === 'life' || stage === 'present') && (
          <>
            {['💕', '🎉', '🎁', '🌟', '✨', '🎈', '🎊', '💫'].map((emoji, i) => (
              <motion.div
                key={`memory-${i}`}
                className="absolute text-4xl z-35"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 40}%`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: stage === 'present' ? Infinity : 0,
                  repeatDelay: 2
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'present' && (
          <>
            {/* 360° warm golden rays */}
            {[...Array(48)].map((_, i) => {
              const rotation = (i * 360) / 48;
              const colors = ['rgba(251, 191, 36, 0.7)', 'rgba(245, 158, 11, 0.6)', 'rgba(252, 211, 77, 0.7)'];
              const color = colors[i % 3];
              
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
                    opacity: [0, 0.8, 0.6],
                    scaleX: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.008,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to right, transparent, ${color} 50%, transparent)`,
                      filter: 'blur(3px)'
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
                scale: [0, 2.8, 2.5],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(254, 243, 199, 1), rgba(251, 191, 36, 0.8), transparent)',
                  filter: 'blur(60px)'
                }}
              />
            </motion.div>

            {/* Memory photo frames orbiting */}
            {['📷', '🖼️', '📸', '🎞️', '📖', '💝'].map((emoji, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 200;
              
              return (
                <motion.div
                  key={`frame-${i}`}
                  className="absolute text-6xl z-48"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1.3, 1],
                    opacity: [0, 1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [-5, 5, -5]
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

            {/* "WHERE MEMORIES LIVE" text */}
            <motion.div
              className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-50"
              initial={{ scale: 0, opacity: 0, y: 30 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                y: [30, 0, 0]
              }}
              transition={{
                duration: 1.3,
                delay: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <h1
                className="text-6xl md:text-7xl font-black text-center"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #ea580c, #f59e0b, #fbbf24)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 50px rgba(251, 191, 36, 0.9)',
                  filter: 'drop-shadow(0 4px 40px rgba(251, 191, 36, 0.7))'
                }}
              >
                Where Memories Live
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}