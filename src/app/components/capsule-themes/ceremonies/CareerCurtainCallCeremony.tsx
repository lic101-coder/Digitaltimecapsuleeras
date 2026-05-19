/**
 * Career Summit - The Curtain Call Ceremony (EPIC) - AAA CINEMA REBUILD v2
 * 
 * CONCEPT: Broadway theater - velvet curtains rise, YOU illuminated center stage,
 * rose bouquets rain down, audience erupts (represented by rising light orbs + silhouettes),
 * camera flash strobes, thunderous applause shockwaves, confetti cannon barrage,
 * dramatic bow, supernova radiance finale with theater transforming into cosmos
 * 
 * ULTRA-REFINED CINEMA ENHANCEMENTS:
 * - Multi-layer theater environment (stage, curtains, arch, balconies)
 * - Audience as ABSTRACT light orbs + simple silhouettes (NO EMOJI!)
 * - Professional spotlight rig with barn doors and gobos
 * - Rose physics with stem rotation and petal scatter
 * - Standing ovation = RISING LIGHT WAVES (elegant, sophisticated)
 * - Camera flash system with realistic strobe timing
 * - Applause represented by SHOCKWAVE RINGS + particle bursts
 * - Industrial confetti cannons with smoke trails
 * - Stage-to-cosmos transformation for finale
 * - Cinematic pacing with perfect anticipation beats
 * 
 * Stages:
 * 2. 2-4.5s: Curtain rises dramatically with dust motes
 * 3. 4.5-6.5s: YOU walk to center stage with confidence
 * 4. 6.5-8.5s: Spotlight system locks on YOU
 * 5. 8.5-10.5s: Rose bouquets thrown from darkness
 * 6. 10.5-12.5s: Audience erupts - RISING LIGHT WAVE ovation
 * 7. 12.5-14.5s: Camera flashes + applause shockwaves
 * 8. 14.5-16.5s: Confetti cannon BARRAGE
 * 9. 16.5-17.5s: Graceful bow
 * 10. 17.5-20s: Theater transforms into cosmic radiance
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CareerCurtainCallCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function CareerCurtainCallCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: CareerCurtainCallCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'curtain' | 'entrance' | 'spotlight' | 'roses' | 'ovation' | 'flash' | 'confetti' | 'bow' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('curtain') },
      { time: 4500, action: () => setStage('entrance') },
      { time: 6500, action: () => setStage('spotlight') },
      { time: 8500, action: () => setStage('roses') },
      { time: 10500, action: () => setStage('ovation') },
      { time: 12500, action: () => setStage('flash') },
      { time: 14500, action: () => setStage('confetti') },
      { time: 16500, action: () => setStage('bow') },
      { time: 17500, action: () => setStage('radiance') },
      { time: 20000, action: () => setStage('outro') },
      { time: 20500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-neutral-950 via-black to-neutral-950 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* THEATER PROSCENIUM ARCH - Ornate gold frame */}
        <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top arch with decorative molding */}
        <div 
          className="absolute top-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(to bottom, #d4af37 0%, #b8941f 50%, #aa8a2e 100%)',
            clipPath: 'polygon(0 0, 100% 0, 97% 100%, 3% 100%)',
            boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.6), 0 8px 30px rgba(212,175,55,0.3)'
          }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 42px)'
          }} />
        </div>

        {/* Side columns */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12"
          style={{
            background: 'linear-gradient(to right, #d4af37 0%, #b8941f 40%, rgba(170,138,46,0) 100%)',
            boxShadow: 'inset -15px 0 30px rgba(0,0,0,0.7)'
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-12"
          style={{
            background: 'linear-gradient(to left, #d4af37 0%, #b8941f 40%, rgba(170,138,46,0) 100%)',
            boxShadow: 'inset 15px 0 30px rgba(0,0,0,0.7)'
          }}
        />

        {/* Vignette for depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

      {/* WOODEN STAGE FLOOR - Polished hardwood */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2/5 z-7"
        style={{
          background: 'linear-gradient(to bottom, rgba(92, 64, 51, 0.6) 0%, rgba(92, 64, 51, 0.95) 100%)',
          backgroundImage: `
            repeating-linear-gradient(90deg, 
              transparent, transparent 100px,
              rgba(0, 0, 0, 0.2) 100px, rgba(0, 0, 0, 0.2) 102px
            ),
            linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)
          `
        }}
      >
        {/* Stage edge highlight */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4) 50%, transparent)',
            boxShadow: '0 1px 4px rgba(212,175,55,0.3)'
          }}
        />
      </div>

      {/* FOOTLIGHTS - Warm theatrical glow along stage edge */}
      <AnimatePresence>
        {(stage !== 'intro') && (
          <div className="absolute bottom-[38%] left-0 right-0 z-19 h-2">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`footlight-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${6 + i * 5.5}%`,
                  width: '12px',
                  height: '12px',
                  background: 'radial-gradient(circle, rgba(255, 253, 235, 1), rgba(251, 191, 36, 0.8))',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 -4px 60px rgba(251, 191, 36, 0.6)'
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 1, 0.8],
                  scale: [0.8, 1.1, 1, 1.1]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  repeat: Infinity,
                  repeatDelay: 0.3
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ORCHESTRA PIT GLOW - Soft ambient light from below */}
      <AnimatePresence>
        {(stage !== 'intro') && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-6 rounded-t-full"
            style={{
              width: '70%',
              height: '25%',
              background: 'radial-gradient(ellipse at bottom, rgba(251, 191, 36, 0.15), transparent 70%)',
              filter: 'blur(40px)'
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0.3, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        )}
      </AnimatePresence>

      {/* TITLE - Intro only */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/4 left-0 right-0 text-center z-50"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-5"
              style={{
                background: 'linear-gradient(to bottom, #fef3c7, #fbbf24, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(251, 191, 36, 0.6)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.08em'
              }}
              animate={{
                textShadow: [
                  '0 0 80px rgba(251, 191, 36, 0.6)',
                  '0 0 100px rgba(251, 191, 36, 0.8)',
                  '0 0 80px rgba(251, 191, 36, 0.6)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              The Curtain Call
            </motion.h1>
            <p 
              className="text-amber-200 text-2xl md:text-3xl"
              style={{ 
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.15em'
              }}
            >
              YOUR STANDING OVATION
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUDIENCE - Abstract light orbs (NO EMOJI!) */}
      <AnimatePresence>
        {stage === 'intro' && (
          <>
            {/* Audience light dots - main floor */}
            {[...Array(120)].map((_, i) => {
              const row = Math.floor(i / 20);
              const seat = i % 20;
              
              return (
                <motion.div
                  key={`audience-light-${i}`}
                  className="absolute rounded-full z-8"
                  style={{
                    left: `${8 + seat * 4.2}%`,
                    bottom: `${5 + row * 6}%`,
                    width: row < 2 ? '6px' : '4px',
                    height: row < 2 ? '6px' : '4px',
                    background: 'radial-gradient(circle, rgba(255, 240, 200, 0.6), rgba(255, 240, 200, 0.2))',
                    boxShadow: '0 0 4px rgba(255, 240, 200, 0.4)',
                    opacity: 0.3 - row * 0.03
                  }}
                  animate={{
                    opacity: [0.3 - row * 0.03, 0.4 - row * 0.03, 0.3 - row * 0.03],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              );
            })}

            {/* Balcony lights */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`balcony-light-${i}`}
                className="absolute rounded-full z-8"
                style={{
                  left: `${5 + i * 2.2}%`,
                  top: `${10 + Math.floor(i / 20) * 3}%`,
                  width: '3px',
                  height: '3px',
                  background: 'radial-gradient(circle, rgba(255, 240, 200, 0.4), transparent)',
                  opacity: 0.2
                }}
                animate={{
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 3 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* VELVET CURTAINS - Rich crimson with realistic folds */}
      <AnimatePresence>
        {(stage === 'intro' || stage === 'curtain') && (
          <>
            {/* Left curtain panel */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 z-40"
              style={{
                width: '51%',
                background: 'linear-gradient(to right, #7f1d1d 0%, #991b1b 20%, #b91c1c 40%, #991b1b 60%, #7f1d1d 100%)',
                boxShadow: 'inset -80px 0 100px rgba(0, 0, 0, 0.8)',
              }}
              initial={{ x: 0 }}
              animate={{ x: stage === 'curtain' ? '-100%' : 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
            >
              {/* Vertical velvet folds */}
              {[...Array(16)].map((_, i) => (
                <div
                  key={`fold-left-${i}`}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${i * 6.25}%`,
                    width: '3.5%',
                    background: i % 2 === 0 
                      ? 'linear-gradient(to right, rgba(0,0,0,0.5), transparent 30%, transparent 70%, rgba(0,0,0,0.3))'
                      : 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 50%, transparent)',
                    boxShadow: i % 2 === 0 ? 'inset 3px 0 8px rgba(0,0,0,0.6)' : 'none'
                  }}
                />
              ))}

              {/* Gold tassel rope */}
              <div 
                className="absolute top-0 right-6 w-5 h-48"
                style={{
                  background: 'linear-gradient(to bottom, #d4af37, #c9a961, #d4af37)',
                  borderRadius: '2.5px',
                  boxShadow: '0 10px 25px rgba(212, 175, 55, 0.5), inset -1px 0 3px rgba(0,0,0,0.4)'
                }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #c9a961, #aa8a2e)',
                    clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)'
                  }}
                />
              </div>
            </motion.div>

            {/* Right curtain panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 z-40"
              style={{
                width: '51%',
                background: 'linear-gradient(to left, #7f1d1d 0%, #991b1b 20%, #b91c1c 40%, #991b1b 60%, #7f1d1d 100%)',
                boxShadow: 'inset 80px 0 100px rgba(0, 0, 0, 0.8)',
              }}
              initial={{ x: 0 }}
              animate={{ x: stage === 'curtain' ? '100%' : 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
            >
              {/* Vertical velvet folds */}
              {[...Array(16)].map((_, i) => (
                <div
                  key={`fold-right-${i}`}
                  className="absolute top-0 bottom-0"
                  style={{
                    right: `${i * 6.25}%`,
                    width: '3.5%',
                    background: i % 2 === 0 
                      ? 'linear-gradient(to left, rgba(0,0,0,0.5), transparent 30%, transparent 70%, rgba(0,0,0,0.3))'
                      : 'linear-gradient(to left, transparent, rgba(255,255,255,0.08) 50%, transparent)',
                    boxShadow: i % 2 === 0 ? 'inset -3px 0 8px rgba(0,0,0,0.6)' : 'none'
                  }}
                />
              ))}

              {/* Gold tassel rope */}
              <div 
                className="absolute top-0 left-6 w-5 h-48"
                style={{
                  background: 'linear-gradient(to bottom, #d4af37, #c9a961, #d4af37)',
                  borderRadius: '2.5px',
                  boxShadow: '0 10px 25px rgba(212, 175, 55, 0.5), inset 1px 0 3px rgba(0,0,0,0.4)'
                }}
              >
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #c9a961, #aa8a2e)',
                    clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)'
                  }}
                />
              </div>
            </motion.div>

            {/* Dust motes when curtain rises */}
            {stage === 'curtain' && (
              <>
                {[...Array(80)].map((_, i) => (
                  <motion.div
                    key={`dust-${i}`}
                    className="absolute rounded-full z-39"
                    style={{
                      left: `${25 + Math.random() * 50}%`,
                      top: '5%',
                      width: `${2 + Math.random() * 3}px`,
                      height: `${2 + Math.random() * 3}px`,
                      background: 'rgba(255, 253, 240, 0.5)',
                      boxShadow: '0 0 6px rgba(255, 253, 240, 0.6)'
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: Math.random() * 500 + 200,
                      x: (Math.random() - 0.5) * 150,
                      opacity: [0, 0.7, 0.5, 0],
                      scale: [1, 1.8, 1.2, 0.6]
                    }}
                    transition={{
                      duration: 3.5 + Math.random() * 2,
                      delay: Math.random() * 0.8,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* YOU - Center stage star */}
      <AnimatePresence>
        {(stage === 'entrance' || stage === 'spotlight' || stage === 'roses' || stage === 'ovation' || stage === 'flash' || stage === 'confetti' || stage === 'bow') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25"
            initial={{ x: '-60vw', opacity: 0, scale: 0.8 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: stage === 'bow' ? [1, 1.15, 0.9, 1.05, 1] : 1,
              y: stage === 'bow' ? [0, 0, 15, 0, 0] : 0
            }}
            transition={{
              x: { duration: 2, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.5 },
              scale: stage === 'bow' ? { duration: 1.5, times: [0, 0.25, 0.5, 0.75, 1] } : {},
              y: stage === 'bow' ? { duration: 1.5, times: [0, 0.25, 0.5, 0.75, 1] } : {}
            }}
          >
            <div className="text-9xl md:text-[12rem]">⭐</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFESSIONAL SPOTLIGHT SYSTEM */}
      <AnimatePresence>
        {(stage === 'spotlight' || stage === 'roses' || stage === 'ovation' || stage === 'flash' || stage === 'confetti' || stage === 'bow') && (
          <>
            {/* Main key light - center */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              style={{
                width: '350px',
                height: '140%',
                background: 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(255, 253, 235, 1) 0%, rgba(255, 250, 220, 0.8) 8%, rgba(255, 247, 200, 0.5) 18%, rgba(255, 247, 200, 0.25) 35%, transparent 65%)',
                filter: 'blur(20px)'
              }}
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Fill lights from sides */}
            {[-35, 35].map((offset, idx) => (
              <motion.div
                key={`fill-${idx}`}
                className="absolute top-0 z-19 pointer-events-none"
                style={{
                  left: `calc(50% + ${offset}%)`,
                  width: '250px',
                  height: '120%',
                  background: 'radial-gradient(ellipse 100% 35% at 50% 0%, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.2) 20%, transparent 55%)',
                  filter: 'blur(30px)'
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.5, 0.35, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 1.5
                }}
              />
            ))}

            {/* Center stage pool glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-18 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 6, opacity: 0.6 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 253, 235, 0.9) 0%, rgba(255, 247, 200, 0.5) 30%, transparent 70%)',
                  filter: 'blur(80px)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ROSE BOUQUETS - Realistic physics */}
      <AnimatePresence>
        {(stage === 'roses' || stage === 'ovation' || stage === 'flash' || stage === 'confetti' || stage === 'bow') && (
          <>
            {/* Full rose bouquets - THROWN from audience! */}
            {[...Array(18)].map((_, i) => {
              // START from audience positions (rows 0-5, seats spread across)
              const row = Math.floor(Math.random() * 6);
              const seat = Math.floor(Math.random() * 20);
              const startX = 8 + seat * 4.2;  // Match audience seating positions
              const startY = 5 + row * 6;     // Match audience row heights
              
              // THROW toward stage center (45-55% horizontal)
              const landX = 45 + (Math.random() - 0.5) * 10;
              
              // Realistic throwing arc - higher peak for back rows
              const peakY = -(250 + row * 40 + Math.random() * 100);
              const landY = 35;  // Land on stage
              
              return (
                <motion.div
                  key={`rose-bouquet-${i}`}
                  className="absolute text-5xl md:text-6xl z-24"
                  style={{
                    left: `${startX}%`,
                    bottom: `${startY}%`  // START from audience position!
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                  animate={{
                    x: `${(landX - startX)}%`,  // Horizontal throw toward center
                    y: [0, peakY, -landY],     // Parabolic arc
                    rotate: [0, (Math.random() - 0.5) * 360, (Math.random() - 0.5) * 720],  // Tumbling motion
                    opacity: [0, 1, 1, 1]
                  }}
                  transition={{
                    duration: 1.6 + row * 0.1 + Math.random() * 0.4,  // Back rows take longer
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]  // Realistic gravity curve
                  }}
                >
                  💐
                </motion.div>
              );
            })}

            {/* Individual scattered roses - THROWN from audience! */}
            {[...Array(25)].map((_, i) => {
              // START from audience positions
              const row = Math.floor(Math.random() * 6);
              const seat = Math.floor(Math.random() * 20);
              const startX = 8 + seat * 4.2;
              const startY = 5 + row * 6;
              
              // THROW toward stage
              const landX = 40 + (Math.random() - 0.5) * 20;
              const peakY = -(200 + row * 35 + Math.random() * 80);
              const landY = 38;
              
              return (
                <motion.div
                  key={`single-rose-${i}`}
                  className="absolute text-4xl z-24"
                  style={{
                    left: `${startX}%`,
                    bottom: `${startY}%`  // START from audience!
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                  animate={{
                    x: `${(landX - startX)}%`,
                    y: [0, peakY, -landY],
                    rotate: [0, Math.random() * 540],
                    opacity: [0, 1, 1, 1]
                  }}
                  transition={{
                    duration: 1.5 + row * 0.1 + Math.random() * 0.3,
                    delay: 0.2 + i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  🌹
                </motion.div>
              );
            })}

            {/* Rose petals - fine scatter */}
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute z-23"
                style={{
                  left: `${35 + Math.random() * 30}%`,
                  top: `${35 + Math.random() * 25}%`,
                  width: '7px',
                  height: '11px',
                  borderRadius: '60% 0 60% 0',
                  background: ['#dc2626', '#ef4444', '#f87171', '#fca5a5'][Math.floor(Math.random() * 4)],
                  opacity: 0.7
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 350,
                  y: Math.random() * 600,
                  rotate: Math.random() * 1440,
                  opacity: [0, 0.7, 0.5, 0]
                }}
                transition={{
                  duration: 3.5 + Math.random() * 2.5,
                  delay: 1 + Math.random() * 0.7,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STANDING OVATION - Rising light wave (NO EMOJI!) */}
      <AnimatePresence>
        {(stage === 'spotlight' || stage === 'roses' || stage === 'ovation' || stage === 'flash' || stage === 'confetti' || stage === 'bow') && (
          <>
            {/* Rising light orbs from audience area */}
            {[...Array(150)].map((_, i) => {
              const row = Math.floor(i / 25);
              const seat = i % 25;
              const waveDelay = ((5 - row) * 0.15) + (seat * 0.02);
              
              return (
                <motion.div
                  key={`ovation-orb-${i}`}
                  className="absolute rounded-full z-22"
                  style={{
                    left: `${5 + seat * 3.6}%`,
                    bottom: `${5 + row * 6}%`,
                    width: row < 2 ? '10px' : '8px',
                    height: row < 2 ? '10px' : '8px',
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 1), rgba(251, 191, 36, 0.6))',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.9)'
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    y: [-5, -25, -20],
                    opacity: [0, 1, 0.9],
                    scale: [0, 1.8, 1.5]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: waveDelay,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              );
            })}

            {/* Radial energy waves from center */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`energy-wave-${i}`}
                className="absolute left-1/2 bottom-1/4 -translate-x-1/2 z-21 rounded-full"
                style={{
                  width: '100px',
                  height: '100px',
                  border: '3px solid rgba(251, 191, 36, 0.8)',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 12],
                  opacity: [0, 0.8, 0.5, 0]
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.5 + i * 0.3,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Vertical acclaim beams shooting upward */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`acclaim-beam-${i}`}
                className="absolute z-21"
                style={{
                  left: `${8 + i * 5.5}%`,
                  bottom: '5%',
                  width: '4px',
                  height: '80vh',
                  background: 'linear-gradient(to top, rgba(251, 191, 36, 0.9), rgba(251, 191, 36, 0.6) 40%, transparent)',
                  filter: 'blur(6px)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1.2, 1],
                  opacity: [0, 0.9, 0.8]
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* CAMERA FLASH STROBES + APPLAUSE SHOCKWAVES */}
      <AnimatePresence>
        {(stage === 'flash' || stage === 'confetti' || stage === 'bow') && (
          <>
            {/* Camera flash strobes */}
            {[...Array(50)].map((_, i) => {
              const row = Math.floor(Math.random() * 6);
              const seat = Math.floor(Math.random() * 20);
              
              return (
                <motion.div
                  key={`camera-flash-${i}`}
                  className="absolute rounded-full z-30"
                  style={{
                    left: `${8 + seat * 4.2}%`,
                    bottom: `${5 + row * 6}%`,
                    width: '50px',
                    height: '50px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, transparent 70%)',
                    boxShadow: '0 0 100px rgba(255, 255, 255, 1)',
                    filter: 'blur(4px)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.9, 0],
                    scale: [0, 2.5, 2.2, 0]
                  }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.06,
                    repeat: 2,
                    repeatDelay: 0.4 + Math.random() * 0.5
                  }}
                />
              );
            })}

            {/* Applause shockwave rings */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`shockwave-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 pointer-events-none"
                style={{
                  border: '5px solid rgba(251, 191, 36, 0.8)',
                  width: '150px',
                  height: '150px',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), inset 0 0 30px rgba(251, 191, 36, 0.4)'
                }}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{
                  scale: [0.2, 8],
                  opacity: [0, 1, 0.8, 0]
                }}
                transition={{
                  duration: 2.8,
                  delay: i * 0.22,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Applause word bursts */}
            {['BRAVO!', 'STUNNING!', 'PHENOMENAL!', 'BRILLIANT!'].map((word, i) => (
              <motion.div
                key={`word-${i}`}
                className="absolute text-3xl md:text-4xl font-bold z-22"
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${22 + (i % 2) * 20}%`,
                  color: '#fbbf24',
                  textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(251, 191, 36, 0.6)',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.1em'
                }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -100, -200],
                  scale: [0, 1.5, 1.2, 0.9],
                  rotate: [(Math.random() - 0.5) * 15, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1.2
                }}
              >
                {word}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* CONFETTI CANNON BARRAGE */}
      <AnimatePresence>
        {(stage === 'confetti' || stage === 'bow') && (
          <>
            {/* Confetti particles - industrial scale */}
            {[...Array(350)].map((_, i) => {
              const cannon = i % 4;
              const startX = cannon === 0 ? 5 : cannon === 1 ? 35 : cannon === 2 ? 65 : 95;
              const angle = cannon === 1 || cannon === 2 ? -90 : (cannon === 0 ? -75 : -105);
              const velocity = 400 + Math.random() * 600;
              const endX = startX + Math.cos((angle * Math.PI) / 180) * velocity;
              const endY = -350 + Math.sin((angle * Math.PI) / 180) * velocity;
              
              const colors = ['#fbbf24', '#dc2626', '#ffffff', '#fef3c7', '#991b1b', '#d4af37', '#f59e0b'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const shape = Math.random() > 0.6 ? 'rect' : 'circle';

              return (
                <motion.div
                  key={`confetti-piece-${i}`}
                  className="absolute z-28"
                  style={{
                    left: `${startX}%`,
                    bottom: '-8%',
                    width: shape === 'rect' ? '18px' : '16px',
                    height: shape === 'rect' ? '14px' : '16px',
                    backgroundColor: color,
                    borderRadius: shape === 'circle' ? '50%' : '3px',
                    boxShadow: `0 0 12px ${color}80`
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    x: `${(endX - startX) * 2}%`,
                    y: [0, endY, endY + 1400],
                    opacity: [0, 1, 1, 1, 0.8, 0],
                    rotate: [0, Math.random() * 720, Math.random() * 1800]
                  }}
                  transition={{
                    duration: 5.5,
                    delay: i * 0.005,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                />
              );
            })}

            {/* Cannon smoke blasts */}
            {[5, 35, 65, 95].map((x, idx) => (
              <motion.div
                key={`smoke-blast-${idx}`}
                className="absolute z-27"
                style={{
                  left: `${x}%`,
                  bottom: '-5%',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(226, 232, 240, 0.9), rgba(203, 213, 225, 0.5) 40%, transparent)',
                  filter: 'blur(50px)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 3.5, 4.5],
                  opacity: [0, 0.9, 0],
                  y: [0, -250, -500]
                }}
                transition={{
                  duration: 3.5,
                  delay: idx * 0.08,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* THEATER-TO-COSMOS TRANSFORMATION FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Radial cosmic beams */}
            {[...Array(72)].map((_, i) => {
              const angle = (i / 72) * 360;

              return (
                <motion.div
                  key={`cosmic-beam-${i}`}
                  className="absolute z-35"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '300vw',
                    height: i % 5 === 0 ? '16px' : i % 3 === 0 ? '12px' : '9px',
                    marginLeft: '-150vw',
                    marginTop: i % 5 === 0 ? '-8px' : i % 3 === 0 ? '-6px' : '-4.5px',
                    background: i % 6 === 0
                      ? 'linear-gradient(to right, transparent, rgba(212, 175, 55, 1) 50%, transparent)'
                      : i % 6 === 1
                      ? 'linear-gradient(to right, transparent, rgba(251, 191, 36, 1) 50%, transparent)'
                      : i % 6 === 2
                      ? 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.95) 50%, transparent)'
                      : i % 6 === 3
                      ? 'linear-gradient(to right, transparent, rgba(220, 38, 38, 0.9) 50%, transparent)'
                      : i % 6 === 4
                      ? 'linear-gradient(to right, transparent, rgba(251, 243, 180, 0.95) 50%, transparent)'
                      : 'linear-gradient(to right, transparent, rgba(217, 119, 6, 0.9) 50%, transparent)',
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 3.5, 3.3],
                    opacity: [0, 1, 0.97]
                  }}
                  transition={{
                    duration: 1.8,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Supernova core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-36"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 11, 10.5],
                opacity: [0, 1, 0.99],
                rotate: [0, 200]
              }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '80rem',
                  height: '80rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 253, 240, 1) 3%, rgba(254, 249, 195, 1) 8%, rgba(251, 243, 180, 0.99) 15%, rgba(212, 175, 55, 0.96) 25%, rgba(251, 191, 36, 0.92) 40%, rgba(245, 158, 11, 0.85) 55%, rgba(220, 38, 38, 0.7) 70%, transparent 90%)',
                  boxShadow: '0 0 700px rgba(251, 191, 36, 1), 0 0 1000px rgba(212, 175, 55, 0.8)',
                  filter: 'blur(170px)'
                }}
              />
            </motion.div>

            {/* Orbiting theater elements */}
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * 360;
              const radius = 300;
              const icons = ['🎭', '⭐', '🌹', '👏', '💫', '🎪'];
              const icon = icons[i % 6];

              return (
                <motion.div
                  key={`orbit-element-${i}`}
                  className="absolute text-5xl z-37"
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
                    rotate: [0, 360],
                    scale: [1, 1.4, 1.2, 1.4, 1]
                  }}
                  transition={{
                    delay: 0.5 + i * 0.04,
                    duration: 9,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}

            {/* Burst particles */}
            {[...Array(180)].map((_, i) => {
              const angle = (i / 180) * Math.PI * 2;
              const distance = 200 + Math.random() * 500;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#d4af37', '#fbbf24', '#ffffff', '#dc2626', '#fef3c7'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <motion.div
                  key={`finale-particle-${i}`}
                  className="absolute z-36"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 250],
                    scale: [0, 3.2, 2.8],
                    opacity: [0, 1, 0.95, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.004,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 24px ${color}, 0 0 48px ${color}80`
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
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
              className="absolute bottom-20 left-0 right-0 text-center z-40"
            >
              <h2 
                className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-5"
                style={{
                  background: 'linear-gradient(to bottom, #fef3c7, #fbbf24, #d97706)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 60px rgba(251, 191, 36, 1))',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.08em'
                }}
              >
                STANDING OVATION
              </h2>
              <p 
                className="text-3xl md:text-4xl text-amber-100"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 1), 0 0 40px rgba(251, 191, 36, 0.5)',
                  letterSpacing: '0.05em'
                }}
              >
                {capsuleTitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}