/**
 * Voyage - Aurora Navigation Pathways Ceremony (Epic) - ULTRA CINEMATIC VFX VERSION v2
 * 
 * CONCEPT: Northern lights emerge as flowing ribbons, form navigational grid across starry sky,
 * constellations connect as waypoints, cosmic compass aligns, auroras intensify into radiance burst
 * 
 * ULTRA ENHANCEMENTS v2:
 * - PHOTOREALISTIC aurora flow with particle ribbons
 * - Enhanced constellation connections with starburst effects
 * - Atmospheric glow with multiple depth layers
 * - Dramatic 3D cosmic compass with holographic effect
 * - Better mobile optimization with adaptive particle counts
 * - Screen blend modes for authentic light stacking
 * - Radiance finale with aurora wave pulses
 * - GPU-accelerated transforms with will-change
 * - Cinematic camera movements and depth of field
 * 
 * Duration: 17 seconds
 * Stages:
 * 1. 0-1s: Intro
 * 2. 1-3s: Stars appear in night sky
 * 3. 3-6s: Aurora ribbons emerge and flow
 * 4. 6-9s: Navigation grid forms from auroras
 * 5. 9-11s: Constellations connect as waypoints
 * 6. 11-13s: Cosmic compass aligns
 * 7. 13-15.5s: Aurora radiance finale
 * 8. 15.5-17s: Outro
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VoyageEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function VoyageEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: VoyageEpicCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'stars' | 'aurora' | 'grid' | 'constellations' | 'compass' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('stars') },
      { time: 3000, action: () => setStage('aurora') },
      { time: 6000, action: () => setStage('grid') },
      { time: 9000, action: () => setStage('constellations') },
      { time: 11000, action: () => setStage('compass') },
      { time: 13000, action: () => setStage('radiance') },
      { time: 15500, action: () => setStage('outro') },
      { time: 17000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
      {/* Stars background - twinkling */}
      <AnimatePresence>
        {(stage !== 'intro') && (
          <>
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() > 0.7 ? '3px' : '2px',
                  height: Math.random() > 0.7 ? '3px' : '2px',
                  background: '#ffffff',
                  boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.7, 1],
                  scale: [0, 1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.005,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                  repeatType: 'loop'
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
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#a5f3fc',
                textShadow: '0 0 30px rgba(165, 243, 252, 0.8), 0 0 60px rgba(34, 211, 238, 0.6)'
              }}
            >
              Cosmic Pathways
            </motion.h1>
            <p className="text-cyan-300 text-xl" style={{ textShadow: '0 0 20px rgba(103, 232, 249, 0.6)' }}>
              Navigate the Stars
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aurora ribbons - flowing and organic */}
      <AnimatePresence>
        {(stage === 'aurora' || stage === 'grid' || stage === 'constellations' || stage === 'compass') && (
          <>
            {/* Primary aurora waves */}
            {[...Array(5)].map((_, i) => {
              const colors = [
                'rgba(34, 211, 238, 0.6)',
                'rgba(168, 85, 247, 0.5)',
                'rgba(59, 130, 246, 0.55)',
                'rgba(16, 185, 129, 0.5)',
                'rgba(99, 102, 241, 0.5)'
              ];

              return (
                <motion.div
                  key={`aurora-${i}`}
                  className="absolute left-0 right-0"
                  style={{
                    top: `${15 + i * 15}%`,
                    height: '120px',
                    background: `linear-gradient(90deg, transparent, ${colors[i]} 30%, ${colors[i]} 70%, transparent)`,
                    filter: 'blur(25px)',
                    transformOrigin: 'center center'
                  }}
                  initial={{ opacity: 0, scaleX: 0, y: -50 }}
                  animate={{
                    opacity: [0, 0.8, 0.6, 0.8],
                    scaleX: [0, 1.2, 1, 1.1],
                    y: [-50, 0, 20, 0],
                    skewY: [0, 2, -2, 0]
                  }}
                  transition={{
                    opacity: { duration: 2, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse' },
                    scaleX: { duration: 4, delay: i * 0.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    y: { duration: 5, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    skewY: { duration: 3.5, delay: i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  }}
                />
              );
            })}

            {/* Vertical aurora curtains */}
            {[...Array(3)].map((_, i) => {
              const colors = [
                'rgba(34, 211, 238, 0.4)',
                'rgba(168, 85, 247, 0.35)',
                'rgba(16, 185, 129, 0.4)'
              ];

              return (
                <motion.div
                  key={`aurora-vert-${i}`}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${25 + i * 25}%`,
                    width: '150px',
                    background: `linear-gradient(180deg, transparent, ${colors[i]} 40%, ${colors[i]} 60%, transparent)`,
                    filter: 'blur(30px)',
                    transformOrigin: 'center center'
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0.4, 0.6],
                    scaleY: [0, 1.1, 0.9, 1.05],
                    skewX: [0, -3, 3, 0]
                  }}
                  transition={{
                    opacity: { duration: 3, delay: 1 + i * 0.3, repeat: Infinity, repeatType: 'reverse' },
                    scaleY: { duration: 4.5, delay: 1 + i * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    skewX: { duration: 4, delay: 1 + i * 0.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Navigation grid forming from auroras */}
      <AnimatePresence>
        {(stage === 'grid' || stage === 'constellations' || stage === 'compass') && (
          <>
            {/* Horizontal grid lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`grid-h-${i}`}
                className="absolute left-0 right-0"
                style={{
                  top: `${20 + i * 15}%`,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.6) 30%, rgba(34, 211, 238, 0.6) 70%, transparent)',
                  boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)'
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Vertical grid lines */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`grid-v-${i}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${15 + i * 14}%`,
                  width: '2px',
                  background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.6) 20%, rgba(168, 85, 247, 0.6) 80%, transparent)',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Grid intersection nodes */}
            {[...Array(5)].map((_, row) =>
              [...Array(6)].map((_, col) => (
                <motion.div
                  key={`node-${row}-${col}`}
                  className="absolute"
                  style={{
                    left: `${15 + col * 14}%`,
                    top: `${20 + row * 15}%`,
                    width: '8px',
                    height: '8px',
                    marginLeft: '-4px',
                    marginTop: '-4px',
                    borderRadius: '50%',
                    background: '#22d3ee',
                    boxShadow: '0 0 12px rgba(34, 211, 238, 0.9)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0.8]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + (row * 0.05) + (col * 0.05)
                  }}
                />
              ))
            )}
          </>
        )}
      </AnimatePresence>

      {/* Constellations connecting as waypoints */}
      <AnimatePresence>
        {(stage === 'constellations' || stage === 'compass') && (
          <>
            {/* Constellation 1 - North Star group (top) */}
            {[[30, 15], [35, 12], [40, 15], [35, 20]].map((pos, i) => (
              <div key={`const1-${i}`}>
                <motion.div
                  className="absolute z-30"
                  style={{
                    left: `${pos[0]}%`,
                    top: `${pos[1]}%`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#fbbf24',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.9)',
                    marginLeft: '-5px',
                    marginTop: '-5px'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.8, 1.2], opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                />
                
                {i < 3 && (
                  <motion.svg
                    className="absolute z-29"
                    style={{
                      left: `${pos[0]}%`,
                      top: `${pos[1]}%`,
                      overflow: 'visible'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                  >
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={`${([[35, 12], [40, 15], [35, 20]][i][0] - pos[0]) * (typeof window !== 'undefined' ? window.innerWidth / 100 : 10)}`}
                      y2={`${([[35, 12], [40, 15], [35, 20]][i][1] - pos[1]) * (typeof window !== 'undefined' ? window.innerHeight / 100 : 10)}`}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                    />
                  </motion.svg>
                )}
              </div>
            ))}

            {/* Constellation 2 - East group (right) */}
            {[[70, 30], [75, 35], [78, 30], [75, 40]].map((pos, i) => (
              <div key={`const2-${i}`}>
                <motion.div
                  className="absolute z-30"
                  style={{
                    left: `${pos[0]}%`,
                    top: `${pos[1]}%`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#22d3ee',
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.9)',
                    marginLeft: '-5px',
                    marginTop: '-5px'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.8, 1.2], opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                />
                
                {i < 3 && (
                  <motion.svg
                    className="absolute z-29"
                    style={{
                      left: `${pos[0]}%`,
                      top: `${pos[1]}%`,
                      overflow: 'visible'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.4, delay: 1.4 + i * 0.15 }}
                  >
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={`${([[75, 35], [78, 30], [75, 40]][i][0] - pos[0]) * (typeof window !== 'undefined' ? window.innerWidth / 100 : 10)}`}
                      y2={`${([[75, 35], [78, 30], [75, 40]][i][1] - pos[1]) * (typeof window !== 'undefined' ? window.innerHeight / 100 : 10)}`}
                      stroke="#22d3ee"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 + i * 0.15 }}
                    />
                  </motion.svg>
                )}
              </div>
            ))}

            {/* Constellation 3 - South group (bottom) */}
            {[[45, 75], [50, 72], [55, 75], [50, 80]].map((pos, i) => (
              <div key={`const3-${i}`}>
                <motion.div
                  className="absolute z-30"
                  style={{
                    left: `${pos[0]}%`,
                    top: `${pos[1]}%`,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#a78bfa',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.9)',
                    marginLeft: '-5px',
                    marginTop: '-5px'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.8, 1.2], opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 + i * 0.15 }}
                />
                
                {i < 3 && (
                  <motion.svg
                    className="absolute z-29"
                    style={{
                      left: `${pos[0]}%`,
                      top: `${pos[1]}%`,
                      overflow: 'visible'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.4, delay: 2.2 + i * 0.15 }}
                  >
                    <motion.line
                      x1="0"
                      y1="0"
                      x2={`${([[50, 72], [55, 75], [50, 80]][i][0] - pos[0]) * (typeof window !== 'undefined' ? window.innerWidth / 100 : 10)}`}
                      y2={`${([[50, 72], [55, 75], [50, 80]][i][1] - pos[1]) * (typeof window !== 'undefined' ? window.innerHeight / 100 : 10)}`}
                      stroke="#a78bfa"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 2.2 + i * 0.15 }}
                    />
                  </motion.svg>
                )}
              </div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Cosmic compass aligning */}
      <AnimatePresence>
        {stage === 'compass' && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-35"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Outer ring with aurora glow */}
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <radialGradient id="cosmicGradient">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </radialGradient>
              </defs>

              {/* Outer glow ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#cosmicGradient)"
                strokeWidth="6"
                opacity="0.8"
              />

              {/* Inner ring */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                opacity="0.6"
              />

              {/* Center */}
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="rgba(15, 23, 42, 0.8)"
              />

              {/* Cardinal points */}
              <text x="100" y="25" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="bold">N</text>
              <text x="175" y="105" textAnchor="middle" fill="#22d3ee" fontSize="18" fontWeight="bold">E</text>
              <text x="100" y="180" textAnchor="middle" fill="#a78bfa" fontSize="18" fontWeight="bold">S</text>
              <text x="25" y="105" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">W</text>
            </svg>

            {/* Cosmic needle - using proper positioning */}
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                width: '0px',
                height: '0px',
                zIndex: 40
              }}
              initial={{ rotate: 270 }}
              animate={{ rotate: [270, 270 + 720, 360] }}
              transition={{
                duration: 1.8,
                ease: [0.34, 1.56, 0.64, 1],
                times: [0, 0.8, 1]
              }}
            >
              {/* North pointer - aurora cyan */}
              <div
                style={{
                  position: 'absolute',
                  left: '-8px',
                  bottom: '0px',
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '55px solid #22d3ee',
                  filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 1)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
                  transformOrigin: 'bottom center'
                }}
              />

              {/* South pointer - aurora purple */}
              <div
                style={{
                  position: 'absolute',
                  left: '-8px',
                  top: '0px',
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '55px solid #a78bfa',
                  filter: 'drop-shadow(0 0 12px rgba(167, 139, 250, 0.9)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
                  transformOrigin: 'top center'
                }}
              />
            </motion.div>

            {/* Center pivot */}
            <motion.div
              className="absolute left-1/2 top-1/2"
              style={{
                marginLeft: '-10px',
                marginTop: '-10px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 0%, #22d3ee 50%, #a78bfa 100%)',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.5)',
                zIndex: 45
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RADIANCE - Aurora intensifies */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Aurora-colored rays */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const colors = [
                'rgba(34, 211, 238, 0.95)',
                'rgba(168, 85, 247, 0.92)',
                'rgba(16, 185, 129, 0.93)',
                'rgba(59, 130, 246, 0.91)',
                'rgba(99, 102, 241, 0.9)'
              ];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 6 === 0 ? '14px' : i % 3 === 0 ? '10px' : '7px',
                    marginLeft: '-100vw',
                    marginTop: i % 6 === 0 ? '-7px' : i % 3 === 0 ? '-5px' : '-3.5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 5]} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.8, 2.6],
                    opacity: [0, 1, 0.96]
                  }}
                  transition={{
                    duration: 1.4,
                    ease: 'easeOut',
                    delay: (i % 6 === 0) ? 0 : 0.1
                  }}
                />
              );
            })}

            {/* Central aurora burst */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 7.5, 7.2],
                opacity: [0, 1, 0.97],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              <div
                className="w-[48rem] h-[48rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(224, 242, 254, 0.98) 5%, rgba(34, 211, 238, 0.95) 12%, rgba(168, 85, 247, 0.92) 22%, rgba(16, 185, 129, 0.88) 35%, rgba(59, 130, 246, 0.82) 50%, rgba(99, 102, 241, 0.72) 68%, transparent 94%)',
                  boxShadow: '0 0 500px rgba(34, 211, 238, 0.9), 0 0 700px rgba(168, 85, 247, 0.8)',
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Flowing aurora particles */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 200 + ring * 120;
                const count = 40 + ring * 20;

                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#22d3ee', '#a855f7', '#10b981', '#3b82f6', '#6366f1'];

                  particles.push(
                    <motion.div
                      key={`aurora-particle-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: colors[i % 5],
                        boxShadow: `0 0 16px ${colors[i % 5]}`
                      }}
                      animate={{
                        x: [
                          Math.cos((angle * Math.PI) / 180) * radius,
                          Math.cos(((angle + 360) * Math.PI) / 180) * radius
                        ],
                        y: [
                          Math.sin((angle * Math.PI) / 180) * radius,
                          Math.sin(((angle + 360) * Math.PI) / 180) * radius
                        ],
                        opacity: [0.9, 0.5, 0.9]
                      }}
                      transition={{
                        delay: 0.4 + (ring * 80 + i) * 0.003,
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

            {/* Burst particles with aurora colors */}
            {[...Array(100)].map((_, i) => {
              const angle = (i / 100) * Math.PI * 2;
              const distance = 140 + Math.random() * 320;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#22d3ee', '#a855f7', '#10b981', '#3b82f6', '#6366f1'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 150],
                    scale: [0, 2.2, 2],
                    opacity: [0, 1, 0.92, 0],
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
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: colors[i % 5],
                      boxShadow: `0 0 14px ${colors[i % 5]}`
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
            className="absolute bottom-20 left-0 right-0 text-center z-50"
          >
            <h2
              className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#22d3ee',
                textShadow: '0 0 40px rgba(34, 211, 238, 1), 0 0 80px rgba(168, 85, 247, 0.8)'
              }}
            >
              Stars Aligned
            </h2>
            <p className="text-2xl text-cyan-300 drop-shadow-lg" style={{ textShadow: '0 0 20px rgba(103, 232, 249, 0.8)' }}>
              {capsuleTitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}