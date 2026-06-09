/**
 * Career Summit - Skyscraper Ascent Ceremony (LEGENDARY)
 * 
 * CONCEPT: FAST-PACED corporate success - rapid elevator ascent,
 * QUICK floor counter animation, building lighting up, then BOOM into
 * stunning corner office with panoramic city view at golden hour
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CareerSkyscraperCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function CareerSkyscraperCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: CareerSkyscraperCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'closing' | 'ascending' | 'exterior' | 'office' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);
  const [floorNumber, setFloorNumber] = useState(1);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('closing') },
      { time: 2000, action: () => setStage('ascending') },
      { time: 6000, action: () => setStage('exterior') },
      { time: 8000, action: () => setStage('office') },
      { time: 10000, action: () => setStage('radiance') },
      { time: 14000, action: () => setStage('outro') },
      { time: 14500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Failsafe timeout - 1 second after last timeline action
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 15500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // FAST floor counter animation
  useEffect(() => {
    if (stage === 'ascending') {
      const duration = 4000; // Only 4 seconds!
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Aggressive acceleration for excitement
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        const currentFloor = Math.floor(1 + easedProgress * 99);
        
        setFloorNumber(currentFloor);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setFloorNumber(100);
        }
      };
      
      animate();
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950">
      {/* City skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 z-0">
        {[65, 85, 75, 95, 70, 90, 80, 100, 75, 85, 70, 95, 80].map((height, i) => (
          <motion.div
            key={`building-${i}`}
            className="absolute bg-slate-700"
            style={{
              left: `${i * 7.7}%`,
              bottom: 0,
              width: '7%',
              height: `${height}%`
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
          />
        ))}
      </div>

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-blue-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            opacity: 0.4 + Math.random() * 0.4
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: completed ? 0 : 5,
            delay: Math.random()
          }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#3b82f6',
                textShadow: '0 4px 20px rgba(59, 130, 246, 0.6)'
              }}
            >
              The Ascent
            </motion.h1>
            <p className="text-blue-200 text-xl" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Rising to the Top
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ELEVATOR INTERIOR */}
      <AnimatePresence>
        {(stage === 'intro' || stage === 'closing' || stage === 'ascending') && (
          <motion.div
            className="absolute inset-0 z-10"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="relative"
                style={{
                  width: '700px',
                  height: '600px',
                  perspective: '1200px'
                }}
              >
                {/* Elevator back wall */}
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                    boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {/* Paneling */}
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={`panel-${i}`}
                      className="absolute"
                      style={{
                        left: `${i * 20}%`,
                        top: '10%',
                        width: '19%',
                        height: '80%',
                        background: 'linear-gradient(90deg, #475569 0%, #334155 50%, #475569 100%)',
                        borderRight: i < 4 ? '2px solid rgba(71, 85, 105, 0.5)' : 'none'
                      }}
                    />
                  ))}

                  {/* Handrail */}
                  <div 
                    className="absolute left-8 right-8 rounded-full"
                    style={{
                      top: '50%',
                      height: '30px',
                      background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                  />

                  {/* FLOOR DISPLAY - BIGGER AND MORE PROMINENT */}
                  <motion.div
                    className="absolute top-8 left-1/2 -translate-x-1/2 bg-black rounded-lg p-8"
                    style={{
                      width: '220px',
                      height: '140px',
                      boxShadow: '0 0 30px rgba(59, 130, 246, 0.7), inset 0 2px 10px rgba(0, 0, 0, 0.9)',
                      border: '4px solid #334155'
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={Math.floor(floorNumber / 5) * 5} // Update every 5 floors for smoother animation
                          initial={{ opacity: 0, y: -15, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="text-8xl font-black tabular-nums"
                          style={{
                            color: '#3b82f6',
                            textShadow: '0 0 40px rgba(59, 130, 246, 1), 0 0 80px rgba(59, 130, 246, 0.9)',
                            fontFamily: 'monospace'
                          }}
                        >
                          {floorNumber}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Animated UP arrow */}
                    {stage === 'ascending' && (
                      <motion.div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-3xl"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: completed ? 0 : 8
                        }}
                      >
                        <div 
                          className="w-0 h-0"
                          style={{
                            borderLeft: '12px solid transparent',
                            borderRight: '12px solid transparent',
                            borderBottom: '16px solid #22c55e',
                            filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.8))'
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Speed lines during ascent */}
                  {stage === 'ascending' && (
                    <>
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`speed-${i}`}
                          className="absolute left-0 right-0 h-0.5 bg-blue-400"
                          style={{
                            top: `${5 + i * 8}%`,
                            opacity: 0.4
                          }}
                          animate={{
                            y: [0, 600],
                            opacity: [0, 0.6, 0]
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: completed ? 0 : 6,
                            delay: i * 0.1,
                            ease: 'linear'
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                {/* Elevator doors */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  {/* Left door */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 rounded-l-lg"
                    style={{
                      width: '50%',
                      background: 'linear-gradient(90deg, #94a3b8 0%, #cbd5e1 2%, #94a3b8 4%, #64748b 50%, #475569 100%)',
                      boxShadow: 'inset -8px 0 20px rgba(0, 0, 0, 0.4), 4px 0 12px rgba(0, 0, 0, 0.6)',
                      borderRight: '2px solid #334155'
                    }}
                    initial={{ x: '-100%' }}
                    animate={{ 
                      x: stage === 'intro' ? '-100%' : 0
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }}
                  >
                    <div 
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-24 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #64748b, #94a3b8, #64748b)',
                        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.4)'
                      }}
                    />
                  </motion.div>

                  {/* Right door */}
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 rounded-r-lg"
                    style={{
                      width: '50%',
                      background: 'linear-gradient(270deg, #94a3b8 0%, #cbd5e1 2%, #94a3b8 4%, #64748b 50%, #475569 100%)',
                      boxShadow: 'inset 8px 0 20px rgba(0, 0, 0, 0.4), -4px 0 12px rgba(0, 0, 0, 0.6)',
                      borderLeft: '2px solid #334155'
                    }}
                    initial={{ x: '100%' }}
                    animate={{ 
                      x: stage === 'intro' ? '100%' : 0
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.68, -0.55, 0.265, 1.55]
                    }}
                  >
                    <div 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-24 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #64748b, #94a3b8, #64748b)',
                        boxShadow: '-2px 0 6px rgba(0, 0, 0, 0.4)'
                      }}
                    />
                  </motion.div>
                </div>

                {/* INTENSE vibration during rapid ascent */}
                {stage === 'ascending' && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      x: [0, 2, -2, 2, -1, 1, 0],
                      y: [0, -1, 1, -1, 1, 0]
                    }}
                    transition={{
                      duration: 0.12,
                      repeat: completed ? 0 : 8
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BUILDING EXTERIOR - QUICK VIEW */}
      <AnimatePresence>
        {stage === 'exterior' && (
          <motion.div
            className="absolute inset-0 z-15 flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative" style={{ width: '300px', height: '650px' }}>
              {/* Building */}
              <div 
                className="absolute inset-0 rounded-t-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  boxShadow: '0 0 80px rgba(0, 0, 0, 0.9)'
                }}
              >
                {/* Windows rapid light-up */}
                {[...Array(25)].map((_, floor) => (
                  <div key={`floor-${floor}`} className="flex" style={{ height: '4%' }}>
                    {[...Array(8)].map((_, window) => {
                      const isElevatorShaft = window === 4;
                      const floorProgress = 25;
                      const isLit = true;
                      
                      return (
                        <motion.div
                          key={`window-${floor}-${window}`}
                          className="flex-1 m-0.5"
                          style={{
                            background: isElevatorShaft
                              ? floor >= 23
                                ? 'linear-gradient(180deg, #3b82f6, #60a5fa)'
                                : 'rgba(30, 41, 59, 0.8)'
                              : '#fbbf24',
                            boxShadow: isElevatorShaft && floor >= 23
                              ? '0 0 25px rgba(59, 130, 246, 1)'
                              : '0 0 10px rgba(251, 191, 36, 0.8)',
                            borderRadius: '1px'
                          }}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            delay: (24 - floor) * 0.04,
                            duration: 0.3
                          }}
                        />
                      );
                    })}
                  </div>
                ))}

                {/* Spire */}
                <div 
                  className="absolute -top-20 left-1/2 -translate-x-1/2"
                  style={{
                    width: '0',
                    height: '0',
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderBottom: '80px solid #1e293b'
                  }}
                >
                  {/* Antenna */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-28 bg-gradient-to-t from-slate-600 to-slate-300">
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500"
                      animate={{
                        opacity: [1, 0.2, 1],
                        boxShadow: [
                          '0 0 15px rgba(239, 68, 68, 1)',
                          '0 0 5px rgba(239, 68, 68, 0.4)',
                          '0 0 15px rgba(239, 68, 68, 1)'
                        ]
                      }}
                      transition={{
                        duration: 1,
                        repeat: completed ? 0 : 5
                      }}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-14 left-0 right-0 text-center text-blue-300 font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                SUMMIT TOWER
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORNER OFFICE - INSTANT REVEAL */}
      <AnimatePresence>
        {stage === 'office' && (
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Office with panoramic view */}
            <div className="absolute inset-0">
              {/* Golden hour sky */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 30%, #fb923c 60%, #6366f1 100%)'
                }}
              />

              {/* City buildings */}
              <div className="absolute bottom-0 left-0 right-0 h-64">
                {[...Array(28)].map((_, i) => {
                  const height = 45 + Math.random() * 55;
                  return (
                    <motion.div
                      key={`city-${i}`}
                      className="absolute"
                      style={{
                        left: `${i * 3.6}%`,
                        bottom: 0,
                        width: '3.5%',
                        height: `${height}%`,
                        background: 'rgba(15, 23, 42, 0.95)',
                        boxShadow: '0 0 25px rgba(0, 0, 0, 0.7)'
                      }}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.015, duration: 0.4 }}
                    >
                      {/* Lit windows */}
                      {[...Array(Math.floor(height / 12))].map((_, w) => (
                        <div
                          key={`window-${w}`}
                          className="absolute left-1/2 -translate-x-1/2"
                          style={{
                            top: `${w * 12 + 6}%`,
                            width: '50%',
                            height: '9%',
                            background: Math.random() > 0.5 ? '#fbbf24' : 'transparent',
                            boxShadow: Math.random() > 0.5 ? '0 0 6px #fbbf24' : 'none'
                          }}
                        />
                      ))}
                    </motion.div>
                  );
                })}
              </div>

              {/* Clouds */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`cloud-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${8 + i * 10}%`,
                    width: `${110 + Math.random() * 60}px`,
                    height: `${45 + Math.random() * 25}px`,
                    background: 'rgba(255, 255, 255, 0.35)',
                    filter: 'blur(18px)'
                  }}
                  animate={{
                    x: [0, 60, 0],
                    opacity: [0.25, 0.45, 0.25]
                  }}
                  transition={{
                    duration: 18 + i * 4,
                    repeat: completed ? 0 : 2,
                    ease: 'linear'
                  }}
                />
              ))}

              {/* Window frames */}
              <div className="absolute inset-0 pointer-events-none">
                {[25, 50, 75].map((pos) => (
                  <div
                    key={`v-${pos}`}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${pos}%`,
                      width: '10px',
                      background: 'linear-gradient(90deg, rgba(51, 65, 85, 0.7), rgba(71, 85, 105, 1), rgba(51, 65, 85, 0.7))',
                      boxShadow: '0 0 25px rgba(0, 0, 0, 0.6)'
                    }}
                  />
                ))}
                {[33, 66].map((pos) => (
                  <div
                    key={`h-${pos}`}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${pos}%`,
                      height: '10px',
                      background: 'linear-gradient(180deg, rgba(51, 65, 85, 0.7), rgba(71, 85, 105, 1), rgba(51, 65, 85, 0.7))',
                      boxShadow: '0 0 25px rgba(0, 0, 0, 0.6)'
                    }}
                  />
                ))}
              </div>

              {/* Executive desk */}
              <motion.div
                className="absolute bottom-28 left-1/2 -translate-x-1/2"
                style={{
                  width: '320px',
                  height: '110px',
                  background: 'linear-gradient(180deg, #92400e 0%, #78350f 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 12px 50px rgba(0, 0, 0, 0.9), inset 0 3px 10px rgba(255, 255, 255, 0.1)'
                }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {/* Desk items */}
                <div className="absolute top-4 left-8 w-14 h-18 bg-slate-700 rounded shadow-lg" />
                <div className="absolute top-10 right-8 w-10 h-10 bg-blue-500 rounded-lg" style={{ boxShadow: '0 6px 12px rgba(59, 130, 246, 0.6)' }} />
                <div className="absolute top-7 left-28 w-24 h-3 bg-slate-600 rounded" />
                <div className="absolute top-12 left-28 w-20 h-3 bg-slate-600 rounded" />
              </motion.div>

              {/* SUCCESS TEXT */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div 
                  className="text-6xl font-black mb-3"
                  style={{
                    color: '#fbbf24',
                    textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 6px 12px rgba(0, 0, 0, 0.7)'
                  }}
                >
                  100th Floor
                </div>
                <div className="text-2xl text-slate-200 font-semibold drop-shadow-lg">
                  Corner Office Unlocked
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(46)].map((_, i) => {
              const angle = (i / 46) * 360;

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 4 === 0 ? '11px' : '8px',
                    marginLeft: '-100vw',
                    marginTop: i % 4 === 0 ? '-5.5px' : '-4px',
                    background: i % 2 === 0
                      ? 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.9) 50%, transparent)'
                      : 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.85) 50%, transparent)',
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1.5px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.9, 2.7],
                    opacity: [0, 1, 0.97]
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
                scale: [0, 8, 7.7],
                opacity: [0, 1, 0.98],
                rotate: [0, 120]
              }}
              transition={{ duration: 1.7, ease: 'easeOut' }}
            >
              <div
                className="w-[58rem] h-[58rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 249, 195, 0.98) 4%, rgba(59, 130, 246, 0.96) 10%, rgba(251, 191, 36, 0.92) 20%, rgba(59, 130, 246, 0.88) 35%, rgba(20, 33, 61, 0.75) 55%, transparent 87%)',
                  boxShadow: '0 0 560px rgba(59, 130, 246, 0.96), 0 0 820px rgba(251, 191, 36, 0.82)',
                  filter: 'blur(135px)'
                }}
              />
            </motion.div>

            {/* Particles */}
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              const radius = 250;
              const icon = i % 2 === 0 ? '🏢' : '⭐';

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute text-3xl"
                  style={{
                    left: '50%',
                    top: '50%'
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
                    rotate: [0, 360]
                  }}
                  transition={{
                    delay: 0.4 + i * 0.04,
                    duration: 7.5,
                    repeat: completed ? 0 : 2,
                    ease: 'linear'
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}

            {/* Burst */}
            {[...Array(95)].map((_, i) => {
              const angle = (i / 95) * Math.PI * 2;
              const distance = 155 + Math.random() * 330;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 155],
                    scale: [0, 2.5, 2.2],
                    opacity: [0, 1, 0.97, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 3.1,
                    delay: i * 0.004,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#fbbf24' : '#bfdbfe',
                      boxShadow: `0 0 16px ${i % 3 === 0 ? 'rgba(59, 130, 246, 0.95)' : 'rgba(251, 191, 36, 0.95)'}`
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold drop-shadow-2xl mb-3"
              style={{
                color: '#3b82f6',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.95)'
              }}
            >
              Summit Reached
            </h2>
            <p className="text-2xl text-blue-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}