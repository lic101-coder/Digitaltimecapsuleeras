/**
 * Eternal Flame - The Forge Ceremony (EPIC) - AAA CINEMA QUALITY
 * 
 * CONCEPT: Ancient blacksmith forge - two molten hearts placed on anvil,
 * master blacksmith hammers them together with POWERFUL strikes,
 * massive spark fountains with each blow, hearts fuse into ONE unbreakable bond,
 * dramatic quench in water creates EPIC steam explosion, perfect eternal heart revealed,
 * forge transforms into cosmic supernova finale
 * 
 * ULTRA-CINEMATIC VFX:
 * - Detailed stone forge with realistic architecture
 * - Dormant coals ignite to white-hot with bellows pump
 * - Two molten metal hearts glow orange/white
 * - Rhythmic hammer strikes with camera shake effect
 * - Massive spark fountain (150+ particles) per strike
 * - Progressive fusion - hearts melt together
 * - Dramatic quench with volumetric steam explosion
 * - Perfect unbreakable heart emerges glowing
 * - Forge-to-cosmos transformation finale
 * - GPU-optimized particle systems
 * - Perfect pacing with anticipation beats
 * 
 * Stages:
 * 5. 11-12.5s: Hearts fuse - molten flow together
 * 6. 12.5-14.5s: Quench - water steam EXPLOSION
 * 7. 14.5-16s: Perfect heart revealed
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ForgeHammer } from './EternalFlameForgeHammer';

interface EternalFlameForgeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function EternalFlameForgeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: EternalFlameForgeCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'ignite' | 'hearts' | 'strike1' | 'strike2' | 'strike3' | 'strike4' | 'strike5' | 'fuse' | 'quench' | 'reveal' | 'radiance' | 'outro'>('intro');
  const [strikeCount, setStrikeCount] = useState(0);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('ignite') },
      { time: 4000, action: () => setStage('hearts') },
      { time: 6000, action: () => { setStage('strike1'); setStrikeCount(1); } },
      { time: 7000, action: () => { setStage('strike2'); setStrikeCount(2); } },
      { time: 8000, action: () => { setStage('strike3'); setStrikeCount(3); } },
      { time: 9000, action: () => { setStage('strike4'); setStrikeCount(4); } },
      { time: 10000, action: () => { setStage('strike5'); setStrikeCount(5); } },
      { time: 11000, action: () => setStage('fuse') },
      { time: 12500, action: () => setStage('quench') },
      { time: 14500, action: () => setStage('reveal') },
      { time: 16000, action: () => setStage('radiance') },
      { time: 18000, action: () => setStage('outro') },
      { time: 18500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  const isStriking = ['strike1', 'strike2', 'strike3', 'strike4', 'strike5'].includes(stage);
  const isPostStrike = ['fuse', 'quench', 'reveal', 'radiance'].includes(stage);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-neutral-950 via-stone-950 to-black">
      
      {/* STONE FORGE STRUCTURE */}
      <div className="absolute inset-0 z-5">
        {/* Stone wall background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #1c1917 0%, #292524 30%, #1c1917 100%)',
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.3) 80px, rgba(0,0,0,0.3) 82px),
              repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(0,0,0,0.2) 120px, rgba(0,0,0,0.2) 122px)
            `
          }}
        />

        {/* Forge opening - brick arch */}
        <div 
          className="absolute left-1/2 bottom-0 -translate-x-1/2 z-6"
          style={{
            width: '60%',
            height: '50%',
            background: 'linear-gradient(to bottom, rgba(41, 37, 36, 0.9), rgba(28, 25, 23, 1))',
            clipPath: 'polygon(10% 100%, 0% 30%, 15% 0%, 85% 0%, 100% 30%, 90% 100%)',
            boxShadow: 'inset 0 20px 60px rgba(0,0,0,0.9)'
          }}
        />

        {/* Forge floor */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/4 z-7"
          style={{
            background: 'linear-gradient(to bottom, rgba(68, 64, 60, 0.8), rgba(41, 37, 36, 1))',
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.7)'
          }}
        />
      </div>

      {/* TITLE - Intro only */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/4 left-0 right-0 text-center z-50"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-4"
              style={{
                background: 'linear-gradient(to bottom, #fbbf24, #f97316, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.7))',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.05em'
              }}
            >
              The Forge
            </motion.h1>
            <p 
              className="text-orange-200 text-2xl"
              style={{ 
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Forged in Fire, Bound Forever
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORGE COALS - Dormant then white-hot */}
      <motion.div
        className="absolute left-1/2 bottom-1/4 -translate-x-1/2 z-15"
        style={{
          width: '300px',
          height: '120px',
          borderRadius: '50% 50% 0 0'
        }}
      >
        {/* Coal bed */}
        <div 
          className="absolute inset-0 rounded-t-full"
          style={{
            background: stage === 'intro' 
              ? 'radial-gradient(ellipse at center, #1c1917, #0c0a09)'
              : stage === 'ignite' || stage === 'hearts'
              ? 'radial-gradient(ellipse at center, #fbbf24, #f97316, #dc2626)'
              : isStriking
              ? 'radial-gradient(ellipse at center, #fef3c7, #fbbf24, #f97316)'
              : 'radial-gradient(ellipse at center, #fbbf24, #f97316, #dc2626)',
            boxShadow: stage === 'intro'
              ? 'inset 0 -20px 40px rgba(0,0,0,0.9)'
              : isStriking
              ? 'inset 0 -20px 60px rgba(254, 243, 199, 0.9), 0 0 140px rgba(251, 191, 36, 1)'
              : 'inset 0 -20px 60px rgba(220, 38, 38, 0.8), 0 0 100px rgba(251, 191, 36, 0.9)',
            transition: isStriking ? 'all 0.1s ease-out' : 'all 2s ease-out'
          }}
        />

        {/* Individual coal glow spots */}
        <AnimatePresence>
          {(stage !== 'intro') && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`coal-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${20 + Math.random() * 60}%`,
                    width: `${10 + Math.random() * 20}px`,
                    height: `${10 + Math.random() * 20}px`,
                    background: isStriking 
                      ? 'radial-gradient(circle, #ffffff, #fef3c7, #fbbf24)'
                      : 'radial-gradient(circle, #fef3c7, #fbbf24, #f97316)',
                    boxShadow: isStriking
                      ? '0 0 30px rgba(255, 255, 255, 1)'
                      : '0 0 20px rgba(251, 191, 36, 0.9)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isStriking ? [1, 0.9, 1] : [0, 1, 0.8, 1],
                    scale: isStriking ? [1.3, 1.1, 1.3] : [0, 1.2, 0.9, 1.1]
                  }}
                  transition={{
                    duration: isStriking ? 0.3 : 1.5,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Heat shimmer waves */}
        <AnimatePresence>
          {(stage !== 'intro') && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`heat-wave-${i}`}
                  className="absolute left-0 right-0 z-16"
                  style={{
                    bottom: `${100 + i * 40}%`,
                    height: '40px',
                    background: isStriking
                      ? 'linear-gradient(to top, rgba(254, 243, 199, 0.25), transparent)'
                      : 'linear-gradient(to top, rgba(251, 191, 36, 0.15), transparent)',
                    filter: 'blur(8px)',
                    opacity: 0.6
                  }}
                  animate={{
                    x: ['-10%', '10%', '-10%'],
                    scaleX: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Forge ember particles floating upward */}
        <AnimatePresence>
          {(stage !== 'intro') && (
            <>
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`ember-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: '0%',
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    background: 'radial-gradient(circle, #fef3c7, #fbbf24)',
                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.9)'
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -200 - Math.random() * 200],
                    x: (Math.random() - 0.5) * 50,
                    opacity: [0, 1, 0.8, 0],
                    scale: [1, 1.2, 0.8, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ANVIL - Stone platform for forging */}
      <motion.div
        className="absolute left-1/2 bottom-1/4 -translate-x-1/2 z-16"
        style={{
          width: '200px',
          height: '100px'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        {/* Anvil body - Medieval blacksmith anvil */}
        <div 
          className="relative"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          {/* Top face (striking surface) */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '180px',
              height: '30px',
              background: 'linear-gradient(to bottom, #e5e7eb 0%, #d1d5db 20%, #9ca3af 50%, #6b7280 80%, #4b5563 100%)',
              borderRadius: '8px 8px 0 0',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 12px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.8)'
            }}
          />
          
          {/* Horn (pointed end) */}
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '-20px',
              width: '50px',
              height: '20px',
              background: 'linear-gradient(to right, #9ca3af, #6b7280, #4b5563)',
              borderRadius: '0 50% 50% 0',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), 2px 4px 12px rgba(0,0,0,0.6)'
            }}
          />
          
          {/* Middle body */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '140px',
              height: '35px',
              background: 'linear-gradient(to bottom, #6b7280, #4b5563, #374151)',
              boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.7)'
            }}
          />
          
          {/* Base/foot */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '35px',
              background: 'linear-gradient(to bottom, #374151, #1f2937, #111827)',
              borderRadius: '0 0 12px 12px',
              boxShadow: 'inset 0 -3px 8px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.9)'
            }}
          />

          {/* Worn metal texture on striking surface */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '8px',
              background: 'radial-gradient(ellipse, rgba(156, 163, 175, 0.5), transparent)',
              borderRadius: '50%',
              filter: 'blur(2px)'
            }}
          />
        </div>
      </motion.div>

      {/* TWO HEARTS - PERFECTLY CENTERED on the anvil, merging into one */}
      <AnimatePresence>
        {(stage === 'hearts' || isStriking || stage === 'fuse') && (
          <>
            {/* Left heart - RED - DEAD CENTER on anvil - PROGRESSIVELY MERGES */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-17 text-6xl"
              style={{
                bottom: 'calc(25% + 55px)' // Positioned squarely ON the anvil top surface
              }}
              initial={{ x: -80, opacity: 0, scale: 0.5 }}
              animate={{
                // Progressive merging: hearts get closer with each strike!
                x: stage === 'strike5' || stage === 'fuse' ? -8 
                   : stage === 'strike4' ? -12
                   : stage === 'strike3' ? -16
                   : stage === 'strike2' ? -20
                   : stage === 'strike1' ? -25
                   : stage === 'hearts' ? -55
                   : -55,
                opacity: 1,
                scale: isStriking ? [1, 0.85, 1] : 1,
                y: isStriking ? [0, 5, 0] : 0
              }}
              transition={{
                x: { duration: 0.8, ease: 'easeOut' },
                opacity: { duration: 0.8 },
                scale: isStriking ? { duration: 0.3 } : {},
                y: isStriking ? { duration: 0.3 } : {}
              }}
            >
              ❤️
            </motion.div>

            {/* Right heart - GREEN - DEAD CENTER on anvil - PROGRESSIVELY MERGES */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-17 text-6xl"
              style={{
                bottom: 'calc(25% + 55px)' // Positioned squarely ON the anvil top surface
              }}
              initial={{ x: 50, opacity: 0, scale: 0.5 }}
              animate={{
                // Progressive merging: hearts get closer with each strike!
                x: stage === 'strike5' || stage === 'fuse' ? 8
                   : stage === 'strike4' ? 12
                   : stage === 'strike3' ? 16
                   : stage === 'strike2' ? 20
                   : stage === 'strike1' ? 25
                   : stage === 'hearts' ? 55
                   : 55,
                opacity: 1,
                scale: isStriking ? [1, 0.85, 1] : 1,
                y: isStriking ? [0, 5, 0] : 0
              }}
              transition={{
                x: { duration: 0.8, ease: 'easeOut' },
                opacity: { duration: 0.8 },
                scale: isStriking ? { duration: 0.3 } : {},
                y: isStriking ? { duration: 0.3 } : {}
              }}
            >
              💚
            </motion.div>

            {/* Merged glow between hearts - GROWS as they get closer */}
            <AnimatePresence>
              {(isStriking || stage === 'fuse') && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 z-16"
                  style={{
                    bottom: 'calc(25% + 65px)',
                    width: '100px',
                    height: '60px',
                    background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.5), transparent)',
                    filter: 'blur(15px)'
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: stage === 'fuse' ? 1 : isStriking ? [0.8, 1, 0.8] : 0.7,
                    scale: stage === 'fuse' ? 2 : isStriking ? [1, 1.3, 1] : 1.1
                  }}
                  transition={{
                    opacity: { duration: isStriking ? 0.3 : 1.5 },
                    scale: { duration: isStriking ? 0.3 : 1.5 }
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>

      {/* MIGHTY HAMMER - CLEAR HAMMER HEAD STRIKING THE HEARTS */}
      <AnimatePresence>
        {isStriking && (
          <ForgeHammer strikeCount={strikeCount} />
        )}
      </AnimatePresence>

      {/* SPARK FOUNTAINS - Massive sparks with each strike */}
      <AnimatePresence>
        {isStriking && (
          <>
            {[...Array(180)].map((_, i) => {
              const angle = -90 + (Math.random() - 0.5) * 120;
              const velocity = 250 + Math.random() * 350;
              const rad = (angle * Math.PI) / 180;
              const endX = Math.cos(rad) * velocity;
              const endY = Math.sin(rad) * velocity;

              return (
                <motion.div
                  key={`spark-${strikeCount}-${i}`}
                  className="absolute left-1/2 bottom-[36%] z-25"
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f97316',
                    boxShadow: `0 0 12px ${i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f97316'}`
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: endX,
                    y: [0, endY, endY + 300],
                    opacity: [1, 1, 0.8, 0],
                    scale: [1, 1.5, 0.8, 0]
                  }}
                  transition={{
                    duration: 1.2 + Math.random() * 0.8,
                    delay: 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                />
              );
            })}

            {/* Impact flash */}
            <motion.div
              key={`impact-flash-${strikeCount}`}
              className="absolute left-1/2 bottom-[36%] -translate-x-1/2 z-27 rounded-full"
              style={{
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(254, 243, 199, 0.9) 30%, transparent 70%)',
                boxShadow: '0 0 100px rgba(255, 255, 255, 1)'
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 2.5, 0],
                opacity: [1, 0.9, 0]
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
                ease: 'easeOut'
              }}
            />

            {/* Screen shake effect */}
            <motion.div
              key={`shake-overlay-${strikeCount}`}
              className="absolute inset-0 z-50 pointer-events-none"
              animate={{
                x: [0, -8, 6, -4, 2, 0],
                y: [0, 4, -3, 2, -1, 0]
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1]
              }}
            >
              <div className="w-full h-full bg-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HEARTS FUSE - Molten flow together */}
      {/* REMOVED: No intermediate silver molten blob - hearts go straight to quench! */}
      <AnimatePresence>
        {(stage === 'fuse' || stage === 'quench' || stage === 'reveal' || stage === 'radiance') && (
          <motion.div
            className="absolute left-1/2 bottom-[36%] -translate-x-1/2 z-24 text-8xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: (stage === 'quench' || stage === 'reveal' || stage === 'radiance') ? 0 : 1,
              scale: 1
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <div 
              style={{
                filter: `
                  drop-shadow(0 0 40px rgba(251, 191, 36, 1))
                  drop-shadow(0 0 80px rgba(249, 115, 22, 0.9))
                  drop-shadow(0 0 120px rgba(255, 255, 255, 0.8))
                `
              }}
            >
              ❤️
            </div>

            {/* Molten drips */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`drip-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  bottom: '-10%',
                  width: '6px',
                  height: '12px',
                  background: 'linear-gradient(to bottom, #fbbf24, #f97316)',
                  boxShadow: '0 0 10px rgba(251, 191, 36, 0.9)'
                }}
                animate={{
                  y: [0, 40, 80],
                  opacity: [1, 0.8, 0],
                  scaleY: [1, 1.5, 0.5]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUENCH - Water steam EXPLOSION */}
      <AnimatePresence>
        {(stage === 'quench' || stage === 'reveal' || stage === 'radiance') && (
          <>
            {/* Water bucket pour */}
            {stage === 'quench' && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-28"
                style={{ bottom: '60%' }}
                initial={{ y: -300, rotate: 0 }}
                animate={{
                  y: 0,
                  rotate: [0, 0, 90]
                }}
                transition={{
                  duration: 1,
                  times: [0, 0.6, 1]
                }}
              >
                <div 
                  style={{
                    width: '80px',
                    height: '100px',
                    background: 'linear-gradient(to bottom, #71717a, #52525b)',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)'
                  }}
                />
              </motion.div>
            )}

            {/* MASSIVE STEAM EXPLOSION */}
            {stage === 'quench' && (
              <>
                {/* Central steam blast */}
                <motion.div
                  className="absolute left-1/2 bottom-[36%] -translate-x-1/2 z-29 rounded-full"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(226, 232, 240, 0.8) 40%, transparent 70%)',
                    filter: 'blur(60px)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 5, 6],
                    opacity: [0, 1, 0.9, 0],
                    y: [0, -200, -400]
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut'
                  }}
                />

                {/* Steam particles */}
                {[...Array(100)].map((_, i) => {
                  const angle = (i / 100) * Math.PI * 2;
                  const distance = 150 + Math.random() * 200;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;

                  return (
                    <motion.div
                      key={`steam-${i}`}
                      className="absolute left-1/2 bottom-[36%] z-28 rounded-full"
                      style={{
                        width: `${20 + Math.random() * 40}px`,
                        height: `${20 + Math.random() * 40}px`,
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(226, 232, 240, 0.4))',
                        filter: 'blur(12px)'
                      }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: x,
                        y: [y, y - 300],
                        opacity: [0, 0.9, 0.7, 0],
                        scale: [0, 2, 2.5, 1]
                      }}
                      transition={{
                        duration: 2.5 + Math.random(),
                        delay: i * 0.01,
                        ease: 'easeOut'
                      }}
                    />
                  );
                })}

                {/* Hiss sound wave rings */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`hiss-ring-${i}`}
                    className="absolute left-1/2 bottom-[36%] -translate-x-1/2 z-27 rounded-full"
                    style={{
                      width: '100px',
                      height: '100px',
                      border: '3px solid rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 8],
                      opacity: [0, 0.9, 0.6, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* PERFECT HEART REVEALED - Unbreakable eternal bond */}
      <AnimatePresence>
        {(stage === 'reveal' || stage === 'radiance') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{
              opacity: 1,
              scale: stage === 'radiance' ? 1 : [0.3, 1.2, 1],
              y: 0
            }}
            transition={{
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <div 
              className="text-[12rem] md:text-[15rem]"
              style={{
                filter: `
                  drop-shadow(0 0 50px rgba(220, 38, 38, 1))
                  drop-shadow(0 0 100px rgba(251, 191, 36, 0.9))
                  drop-shadow(0 0 150px rgba(255, 255, 255, 0.7))
                  brightness(1.2)
                `
              }}
            >
              ❤️
            </div>

            {/* Unbreakable aura */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.6), rgba(251, 191, 36, 0.4), transparent)',
                filter: 'blur(80px)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />

            {/* Metallic gleam */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent)',
                filter: 'blur(15px)'
              }}
              animate={{
                x: [0, 100, 0],
                opacity: [0.9, 0.6, 0.9]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORGE SUPERNOVA RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Radial fire beams */}
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * 360;

              return (
                <motion.div
                  key={`fire-beam-${i}`}
                  className="absolute z-35"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '280vw',
                    height: i % 4 === 0 ? '18px' : i % 3 === 0 ? '14px' : '10px',
                    marginLeft: '-140vw',
                    marginTop: i % 4 === 0 ? '-9px' : i % 3 === 0 ? '-7px' : '-5px',
                    background: i % 5 === 0
                      ? 'linear-gradient(to right, transparent, rgba(220, 38, 38, 1) 50%, transparent)'
                      : i % 5 === 1
                      ? 'linear-gradient(to right, transparent, rgba(249, 115, 22, 0.95) 50%, transparent)'
                      : i % 5 === 2
                      ? 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.95) 50%, transparent)'
                      : i % 5 === 3
                      ? 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9) 50%, transparent)'
                      : 'linear-gradient(to right, transparent, rgba(254, 243, 199, 0.9) 50%, transparent)',
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(3px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 3.8, 3.6],
                    opacity: [0, 1, 0.98]
                  }}
                  transition={{
                    duration: 1.9,
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
                scale: [0, 12, 11.5],
                opacity: [0, 1, 0.99],
                rotate: [0, 220]
              }}
              transition={{ duration: 2.3, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '90rem',
                  height: '90rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(254, 243, 199, 1) 4%, rgba(251, 243, 180, 0.99) 10%, rgba(251, 191, 36, 0.97) 20%, rgba(249, 115, 22, 0.93) 35%, rgba(220, 38, 38, 0.88) 50%, rgba(153, 27, 27, 0.75) 70%, transparent 92%)',
                  boxShadow: '0 0 800px rgba(251, 191, 36, 1), 0 0 1200px rgba(220, 38, 38, 0.8)',
                  filter: 'blur(180px)'
                }}
              />
            </motion.div>

            {/* Orbiting forge elements */}
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * 360;
              const radius = 320;
              const icons = ['🔨', '❤️', '🔥', '⚒️', '💎'];
              const icon = icons[i % 5];

              return (
                <motion.div
                  key={`orbit-forge-${i}`}
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
                    scale: [1, 1.5, 1.3, 1.5, 1]
                  }}
                  transition={{
                    delay: 0.6 + i * 0.05,
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}

            {/* Burst particles */}
            {[...Array(200)].map((_, i) => {
              const angle = (i / 200) * Math.PI * 2;
              const distance = 220 + Math.random() * 550;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#dc2626', '#f97316', '#fbbf24', '#fef3c7', '#ffffff'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <motion.div
                  key={`forge-particle-${i}`}
                  className="absolute z-36"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 280],
                    scale: [0, 3.5, 3],
                    opacity: [0, 1, 0.96, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 4.5,
                    delay: i * 0.005,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 28px ${color}, 0 0 56px ${color}80`
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
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.9, duration: 1.3, ease: 'easeOut' }}
            className="absolute bottom-16 left-0 right-0 text-center z-40"
          >
            <h2 
              className="text-5xl md:text-7xl font-bold drop-shadow-2xl mb-5"
              style={{
                background: 'linear-gradient(to bottom, #fef3c7, #fbbf24, #f97316, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 70px rgba(251, 191, 36, 1))',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.08em'
              }}
            >
              FORGED FOREVER
            </h2>
            <p 
              className="text-3xl md:text-4xl text-orange-100"
              style={{ 
                fontFamily: 'Georgia, serif',
                textShadow: '0 4px 24px rgba(0, 0, 0, 1), 0 0 50px rgba(251, 191, 36, 0.6)',
                letterSpacing: '0.05em'
              }}
            >
              {capsuleTitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}