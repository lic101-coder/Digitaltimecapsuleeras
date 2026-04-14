/**
 * New Life - STORK STORM DELIVERY (EPIC/LEGENDARY)
 * 
 * 🦩⛈️ FIGHTING THE STORM TO DELIVER THE JOY 🌈🏠
 * 
 * Single devoted stork battles fierce storm with precious bundle,
 * fighting through lightning, wind, and rain to get baby home safely.
 * Epic dedication, emotional triumph. Using ACTUAL EMOJIS animated.
 * 
 * Duration: 20 seconds
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewLifeLotusBloomCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewLifeLotusBloomCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeLotusBloomCeremonyProps) {
  const [stage, setStage] = useState<'storm' | 'struggle' | 'breakthrough' | 'rainbow' | 'landing' | 'delivery'>('storm');
  const [lightningFlash, setLightningFlash] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('storm') },
      { time: 5000, action: () => setStage('struggle') },
      { time: 9000, action: () => setStage('breakthrough') },
      { time: 12000, action: () => setStage('rainbow') },
      { time: 16000, action: () => setStage('landing') },
      { time: 18000, action: () => setStage('delivery') },
      { time: 20500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Lightning strikes during storm
  useEffect(() => {
    if (stage === 'storm' || stage === 'struggle') {
      const strikes = [600, 1800, 3200, 4600, 6200, 7800, 8600];
      const timeouts = strikes.map(time => 
        setTimeout(() => {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 120);
        }, time)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [stage]);

  const isStorm = stage === 'storm' || stage === 'struggle';
  const isCalm = stage === 'breakthrough' || stage === 'rainbow' || stage === 'landing' || stage === 'delivery';
  const isHome = stage === 'landing' || stage === 'delivery';

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* DYNAMIC SKY */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: isCalm
            ? 'linear-gradient(to bottom, #fbbf24 0%, #fb923c 25%, #f472b6 55%, #a78bfa 85%, #6366f1 100%)'
            : 'linear-gradient(to bottom, #1f2937 0%, #374151 30%, #4b5563 70%, #6b7280 100%)'
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* LIGHTNING FLASH - Full screen white */}
      <AnimatePresence>
        {lightningFlash && (
          <motion.div
            className="absolute inset-0 z-5"
            style={{
              background: 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7) 50%, transparent 80%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          />
        )}
      </AnimatePresence>

      {/* DARK STORM CLOUDS - Layered */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(16)].map((_, i) => {
              const size = 250 + Math.random() * 350;
              const layer = i % 3;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-10"
                  style={{
                    left: `${(i * 12) % 130 - 15}%`,
                    top: `${8 + layer * 18 + (i % 5) * 6}%`,
                    width: `${size}px`,
                    height: `${size * 0.65}px`,
                    borderRadius: '60% 60% 55% 55%',
                    background: `radial-gradient(ellipse at ${35 + Math.random() * 30}% ${35 + Math.random() * 30}%, #4b5563, #1f2937, #0f172a)`,
                    filter: 'blur(25px)',
                    opacity: 0.9
                  }}
                  animate={{
                    x: [0, 40 + Math.random() * 20, 0],
                    opacity: [0.85, 1, 0.85],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{
                    duration: 6 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* TORRENTIAL RAIN - 250 drops */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(250)].map((_, i) => {
              const x = Math.random() * 100;
              const speed = 0.35 + Math.random() * 0.2;
              const length = 15 + Math.random() * 15;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-15"
                  style={{
                    left: `${x}%`,
                    top: '-8%',
                    width: '2.5px',
                    height: `${length}px`,
                    background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.5))',
                    borderRadius: '4px',
                    transform: 'rotate(18deg)'
                  }}
                  animate={{
                    y: ['0vh', '125vh']
                  }}
                  transition={{
                    duration: speed,
                    delay: i * 0.003,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* WIND GUSTS - Visible turbulence */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-12"
                style={{
                  left: '-30%',
                  top: `${12 + i * 8}%`,
                  width: '160%',
                  height: '4px',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.18) 70%, transparent)',
                  filter: 'blur(6px)'
                }}
                animate={{
                  x: [0, '50%', 0]
                }}
                transition={{
                  duration: 1.8 + Math.random() * 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STORK EMOJI - MAIN CHARACTER */}
      <motion.div
        className="absolute z-30"
        style={{
          left: '50%',
          top: isHome ? '55%' : '40%',
          fontSize: '80px',
          transform: 'translateX(-50%)',
          filter: isStorm
            ? 'drop-shadow(0 8px 30px rgba(0, 0, 0, 0.9))'
            : 'drop-shadow(0 6px 25px rgba(251, 191, 36, 0.6))'
        }}
        animate={{
          y: isStorm ? [0, -20, 5, -15, 0] : [0, -12, 0],
          x: isStorm ? [-30, 25, -20, 15, -30] : [0],
          rotate: isStorm ? [-12, 8, -10, 6, -12] : isHome ? [0, -5, 0] : [0],
          scale: isHome ? [1, 1.1, 1] : [1]
        }}
        transition={{
          duration: isStorm ? 2.2 : isHome ? 2 : 3.5,
          repeat: isHome ? 0 : Infinity,
          ease: isStorm ? 'easeInOut' : 'easeInOut'
        }}
      >
        🦩
      </motion.div>

      {/* BUNDLE EMOJI - Precious cargo */}
      <motion.div
        className="absolute z-32"
        style={{
          left: '50%',
          top: isHome ? '63%' : '48%',
          fontSize: '48px',
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 1)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.8))'
        }}
        animate={{
          y: isStorm ? [0, -20, 5, -15, 0] : [0, -12, 0],
          x: isStorm ? [-30, 25, -20, 15, -30] : [0],
          rotate: isStorm ? [-8, 5, -6, 4, -8] : isHome ? [0, 3, 0] : [0],
          scale: isHome ? [1, 1.15, 1] : [1]
        }}
        transition={{
          duration: isStorm ? 2.2 : isHome ? 2 : 3.5,
          repeat: isHome ? 0 : Infinity,
          ease: 'easeInOut'
        }}
      >
        👶
      </motion.div>

      {/* GLOWING AURA AROUND BUNDLE */}
      <motion.div
        className="absolute z-31"
        style={{
          left: '50%',
          top: isHome ? '63%' : '48%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), rgba(251, 191, 36, 0.3) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
          y: isStorm ? [0, -20, 5, -15, 0] : [0, -12, 0],
          x: isStorm ? [-30, 25, -20, 15, -30] : [0]
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity },
          opacity: { duration: 2, repeat: Infinity },
          y: { duration: isStorm ? 2.2 : 3.5, repeat: Infinity },
          x: { duration: isStorm ? 2.2 : 3.5, repeat: Infinity }
        }}
      />

      {/* STORK'S DETERMINATION - Protective wing effect during storm */}
      <AnimatePresence>
        {isStorm && (
          <motion.div
            className="absolute z-29"
            style={{
              left: '50%',
              top: '46%',
              width: '140px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.15), transparent 70%)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(15px)'
            }}
            animate={{
              y: [0, -20, 5, -15, 0],
              x: [-30, 25, -20, 15, -30],
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </AnimatePresence>

      {/* BREAKTHROUGH - Cloud explosion */}
      <AnimatePresence>
        {stage === 'breakthrough' && (
          <>
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 180 + Math.random() * 180;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-20"
                  style={{
                    left: '50%',
                    top: '35%',
                    width: '100px',
                    height: '60px',
                    borderRadius: '60%',
                    background: 'radial-gradient(ellipse, #9ca3af, #6b7280)',
                    filter: 'blur(20px)'
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 0.7, 0],
                    scale: [1, 2.5, 3]
                  }}
                  transition={{
                    duration: 2.5,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Radiant light burst */}
            <motion.div
              className="absolute z-19"
              style={{
                left: '50%',
                top: '35%',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0.4) 40%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(40px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 3, 4],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* RAINBOW - Full arc */}
      <AnimatePresence>
        {isCalm && (
          <motion.div
            className="absolute z-8"
            style={{
              left: '50%',
              top: '15%',
              width: '900px',
              height: '450px',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            {/* 7 rainbow arcs */}
            {[
              { color: '#ef4444', size: 1 },      // Red
              { color: '#f97316', size: 0.94 },   // Orange
              { color: '#fbbf24', size: 0.88 },   // Yellow
              { color: '#22c55e', size: 0.82 },   // Green
              { color: '#3b82f6', size: 0.76 },   // Blue
              { color: '#6366f1', size: 0.70 },   // Indigo
              { color: '#a855f7', size: 0.64 }    // Violet
            ].map((arc, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `22px solid ${arc.color}`,
                  borderBottom: 'none',
                  transform: `scale(${arc.size})`,
                  opacity: 0.75,
                  filter: 'blur(4px)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STARDUST TRAIL - When flying calm */}
      <AnimatePresence>
        {isCalm && !isHome && (
          <>
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-28"
                style={{
                  left: '50%',
                  top: '48%',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#fbbf24',
                  boxShadow: '0 0 12px rgba(251, 191, 36, 1)'
                }}
                animate={{
                  x: (Math.random() - 0.5) * 80,
                  y: 60 + Math.random() * 50,
                  opacity: [1, 0.7, 0],
                  scale: [1, 1.3, 0]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* COTTAGE HOME - Warm and welcoming */}
      <AnimatePresence>
        {isHome && (
          <motion.div
            className="absolute bottom-0 z-25"
            style={{
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {/* House structure */}
            <div
              style={{
                width: '240px',
                height: '160px',
                background: 'linear-gradient(135deg, #92400e, #78350f, #451a03)',
                borderRadius: '12px',
                position: 'relative',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Roof */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-75px',
                  transform: 'translateX(-50%)',
                  width: '260px',
                  height: '95px',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #7f1d1d)',
                  boxShadow: 'inset 0 -15px 25px rgba(0, 0, 0, 0.4)'
                }}
              />

              {/* Chimney with smoke */}
              <div
                style={{
                  position: 'absolute',
                  right: '40px',
                  top: '-100px',
                  width: '30px',
                  height: '60px',
                  background: '#7f1d1d',
                  borderRadius: '6px 6px 0 0'
                }}
              >
                {/* Cozy smoke puffs */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '100%',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(156, 163, 175, 0.7)',
                      filter: 'blur(6px)',
                      transform: 'translateX(-50%)'
                    }}
                    animate={{
                      y: [-15, -100],
                      x: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 40],
                      opacity: [0.7, 0],
                      scale: [0.9, 1.8]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              {/* Front door - GLOWING with warmth */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '0',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '95px',
                  background: 'linear-gradient(to bottom, #451a03, #292524)',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: stage === 'delivery'
                    ? 'inset -4px 0 30px rgba(251, 191, 36, 1), inset 4px 0 30px rgba(251, 146, 60, 0.8)'
                    : 'inset -4px 0 15px rgba(251, 191, 36, 0.6)'
                }}
                animate={{
                  boxShadow: stage === 'delivery'
                    ? [
                        'inset -4px 0 30px rgba(251, 191, 36, 1), inset 4px 0 30px rgba(251, 146, 60, 0.8)',
                        'inset -5px 0 40px rgba(251, 191, 36, 1), inset 5px 0 40px rgba(251, 146, 60, 1)',
                        'inset -4px 0 30px rgba(251, 191, 36, 1), inset 4px 0 30px rgba(251, 146, 60, 0.8)'
                      ]
                    : undefined
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
              >
                {/* Doorknob */}
                <div
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#fbbf24',
                    boxShadow: '0 0 8px rgba(251, 191, 36, 1)'
                  }}
                />

                {/* Light spilling from door crack */}
                {stage === 'delivery' && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      bottom: '0',
                      width: '3px',
                      background: 'linear-gradient(to bottom, #fbbf24, #fb923c)',
                      filter: 'blur(8px)',
                      boxShadow: '-20px 0 40px rgba(251, 191, 36, 0.8)'
                    }}
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                )}
              </motion.div>

              {/* Windows - warm glow */}
              {[
                { left: '30px', top: '45px' },
                { right: '30px', top: '45px' }
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...pos,
                    width: '48px',
                    height: '48px',
                    background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                    borderRadius: '6px',
                    boxShadow: '0 0 30px rgba(251, 191, 36, 0.9), inset 0 0 15px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Window panes */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                      gap: '3px',
                      padding: '3px'
                    }}
                  >
                    {[0, 1, 2, 3].map(pane => (
                      <div
                        key={pane}
                        style={{
                          background: 'rgba(120, 53, 15, 0.4)',
                          borderRadius: '3px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Garden flowers - welcoming */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '35px' }}>
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${(i / 18) * 100}%`,
                    bottom: '0',
                    fontSize: '20px'
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.15, 1],
                    rotate: [0, 15, -8, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.8 + i * 0.06
                  }}
                >
                  {['🌸', '🌺', '🌼', '🌻'][i % 4]}
                </motion.div>
              ))}
            </div>

            {/* Welcome mat */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '14px',
                background: 'linear-gradient(to bottom, #7f1d1d, #991b1b)',
                borderRadius: '3px',
                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.4)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TITLE */}
      <AnimatePresence>
        {stage === 'delivery' && (
          <motion.div
            className="absolute text-center z-50"
            style={{
              left: '50%',
              top: '12%',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: -35 }}
            animate={{
              opacity: [0, 1],
              y: [-35, 0]
            }}
            transition={{
              duration: 1.8,
              delay: 1,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-3"
              style={{
                color: '#fef9c3',
                textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.7), 0 5px 18px rgba(0, 0, 0, 1)',
                WebkitTextStroke: '1px rgba(251, 191, 36, 0.3)'
              }}
            >
              {capsuleTitle}
            </h1>
            <motion.p
              className="text-xl md:text-2xl font-medium"
              style={{
                color: '#fbbf24',
                textShadow: '0 0 25px rgba(251, 191, 36, 0.9), 0 4px 14px rgba(0, 0, 0, 0.9)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1.5 }}
            >
              Worth every storm, every mile
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
