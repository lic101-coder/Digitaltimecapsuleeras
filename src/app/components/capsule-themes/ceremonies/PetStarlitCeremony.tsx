/**
 * Pet Starlit Companions Ceremony - EPIC CELESTIAL MEMORIAL
 * 
 * Stars connect to form constellation of pet silhouette watching over you.
 * Shooting stars trace paw print patterns across night sky.
 * Moon emerges bathing constellation in silver light.
 * Peaceful, comforting - they're "up there" watching forever.
 * 
 */

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetStarlitCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetStarlitCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetStarlitCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'stars' | 'connecting' | 'constellation' | 'moon' | 'shooting' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const radianceStars = useMemo(() => {
    const count = isMobile ? 30 : 60;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 100 + Math.random() * 150;
      return {
        x: 50 + Math.cos(angle) * (distance / 8),
        y: 42 + Math.sin(angle) * (distance / 8),
      };
    });
  }, []);

  const bgStars = useMemo(() => {
    const count = isMobile ? 60 : 150;
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.2 + Math.random() * 0.3,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 1 + Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 600, action: () => setStage('stars') },
      { time: 3200, action: () => setStage('connecting') },
      { time: 5800, action: () => setStage('constellation') },
      { time: 8200, action: () => setStage('moon') },
      { time: 10800, action: () => setStage('shooting') },
      { time: 13200, action: () => setStage('radiance') },
      { time: 15000, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Completion failsafe - ensure ceremony always completes
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 17000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Constellation pattern - SUPER CLEAR DOG PROFILE - obvious head, ears, body, tail, legs
  const constellationPoints = [
    // CLEAR DOG SITTING PROFILE - positioned LEFT away from moon
    // Left ear tip (pointing ears)
    { x: 15, y: 12 },
    // Left ear base
    { x: 18, y: 18 },
    // Top of head
    { x: 22, y: 16 },
    // Forehead
    { x: 25, y: 18 },
    // Snout forward (nose)
    { x: 30, y: 20 },
    { x: 33, y: 21 },
    // Mouth/chin
    { x: 30, y: 24 },
    // Neck down
    { x: 26, y: 28 },
    // Chest
    { x: 24, y: 32 },
    // Front leg top
    { x: 24, y: 38 },
    // Front leg bottom
    { x: 24, y: 44 },
    // Paw
    { x: 22, y: 48 },
    
    // Belly line
    { x: 26, y: 48 },
    { x: 30, y: 48 },
    
    // Back leg bottom
    { x: 32, y: 48 },
    // Back leg up
    { x: 34, y: 44 },
    { x: 36, y: 40 },
    
    // Back/rear
    { x: 38, y: 38 },
    
    // Tail starts - curves UP
    { x: 40, y: 35 },
    { x: 42, y: 30 },
    { x: 43, y: 25 },
    // Tail tip
    { x: 44, y: 20 },
    
    // Back line down from tail base
    { x: 38, y: 32 },
    { x: 34, y: 28 },
    // Shoulder
    { x: 28, y: 24 },
    
    // Right ear
    { x: 26, y: 18 },
    { x: 28, y: 12 },
    { x: 30, y: 16 }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0f172a]">
      {/* Distant stars twinkling */}
      <div className="absolute inset-0">
        {bgStars.map((star, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
            animate={{
              opacity: [star.opacity, 0.8, star.opacity],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: 4,
              delay: star.delay
            }}
          />
        ))}
      </div>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && capsuleTitle && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-x-0 top-[15%] z-30 text-center px-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-100 drop-shadow-2xl">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Constellation stars appearing */}
      <AnimatePresence>
        {(stage === 'stars' || stage === 'connecting' || stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <>
            {constellationPoints.map((point, i) => {
              const size = 18 + (i % 3) * 8; // MASSIVE stars - impossible to miss

              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    background: 'radial-gradient(circle, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                    boxShadow: `0 0 ${size * 6}px rgba(255, 255, 255, 1), 0 0 ${size * 12}px rgba(255, 255, 255, 0.9), 0 0 ${size * 18}px rgba(226, 232, 240, 0.7)`,
                    zIndex: 20,
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.98, 1],
                    scale: [0, 1.7, 1.05, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.12,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Connecting lines forming constellation */}
      <AnimatePresence>
        {(stage === 'connecting' || stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 15 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* ULTRA THICK glowing lines forming UNMISTAKABLE dog shape */}
            {constellationPoints.map((point, i) => {
              if (i === constellationPoints.length - 1) return null;

              const nextPoint = constellationPoints[i + 1];

              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="5"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
                    strokeLinecap: 'round'
                  }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
            
            {/* Additional connections to complete the shape */}
            {/* Head to body */}
            <motion.line
              x1={`${constellationPoints[1].x}%`}
              y1={`${constellationPoints[1].y}%`}
              x2={`${constellationPoints[5].x}%`}
              y2={`${constellationPoints[5].y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2, ease: 'easeInOut' }}
            />
            
            {/* Tail to body */}
            <motion.line
              x1={`${constellationPoints[12].x}%`}
              y1={`${constellationPoints[12].y}%`}
              x2={`${constellationPoints[6].x}%`}
              y2={`${constellationPoints[6].y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.3, ease: 'easeInOut' }}
            />
          </svg>
        )}
      </AnimatePresence>

      {/* Constellation glow/silhouette */}
      <AnimatePresence>
        {(stage === 'constellation' || stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '42%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 10
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Moon emerging behind constellation */}
      <AnimatePresence>
        {(stage === 'moon' || stage === 'shooting' || stage === 'radiance') && (
          <>
            {/* MASSIVE SILVER MOON - Dominant focal point */}
            <motion.div
              className="absolute"
              style={{
                right: isMobile ? '2%' : '12%',
                top: isMobile ? '2%' : '15%',
                width: isMobile ? '120px' : '260px',
                height: isMobile ? '120px' : '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 38% 35%, #ffffff, #fafafa, #f8fafc, #f1f5f9, #e2e8f0)',
                boxShadow: '0 0 140px rgba(255, 255, 255, 0.9), 0 0 220px rgba(241, 245, 249, 0.7), inset -30px -30px 60px rgba(148, 163, 184, 0.35)',
                zIndex: 5,
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
              initial={{ opacity: 0, scale: 0, y: 120 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
            />

            {/* Detailed moon craters - desktop only */}
            {!isMobile && <>
              <motion.div
                className="absolute"
                style={{
                  right: 'calc(12% + 80px)',
                  top: 'calc(15% + 110px)',
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(148, 163, 184, 0.4), rgba(148, 163, 184, 0.2) 50%, transparent)',
                  zIndex: 6
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
              <motion.div
                className="absolute"
                style={{
                  right: 'calc(12% + 140px)',
                  top: 'calc(15% + 60px)',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(148, 163, 184, 0.35), rgba(148, 163, 184, 0.15) 50%, transparent)',
                  zIndex: 6
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <motion.div
                className="absolute"
                style={{
                  right: 'calc(12% + 50px)',
                  top: 'calc(15% + 160px)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(148, 163, 184, 0.3), rgba(148, 163, 184, 0.1) 50%, transparent)',
                  zIndex: 6
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ duration: 2, delay: 1.2 }}
              />
            </>}

            {/* Massive silver moon glow */}
            <motion.div
              className="absolute"
              style={{
                right: isMobile ? '2%' : '12%',
                top: isMobile ? '2%' : '15%',
                width: isMobile ? '120px' : '260px',
                height: isMobile ? '120px' : '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(241, 245, 249, 0.4) 40%, transparent 70%)',
                filter: 'blur(90px)',
                zIndex: 4
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 3.2 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />

            {/* DRAMATIC silver moonlight bathing entire constellation */}
            <motion.div
              className="absolute"
              style={{
                left: '30%',
                top: '20%',
                width: '45%',
                height: '55%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(241, 245, 249, 0.18) 40%, rgba(226, 232, 240, 0.12) 70%, transparent)',
                filter: 'blur(50px)',
                zIndex: 8,
                transform: 'rotate(-28deg)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* SPECTACULAR SHOOTING STARS/COMETS - Impossible to miss */}
      <AnimatePresence>
        {(stage === 'shooting' || stage === 'radiance') && (
          <>
            {[...Array(isMobile ? 8 : 18)].map((_, i) => {
              const startX = 5 + Math.random() * 40;
              const startY = 2 + Math.random() * 50;
              const endX = 500 + Math.random() * 300;
              const endY = 400 + Math.random() * 250;

              return (
                <React.Fragment key={`shooting-${i}`}>
                  {/* MASSIVE bright comet head */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      width: '10px',
                      height: '10px',
                      background: 'radial-gradient(circle, #ffffff, #fafafa, #f1f5f9)',
                      boxShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.9), 0 0 90px rgba(241, 245, 249, 0.7)',
                      zIndex: 25
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0.9, 0],
                      x: [0, endX],
                      y: [0, endY],
                      scale: [1, 1.3, 1.2, 1, 0.8]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.15,
                      ease: 'linear'
                    }}
                  />

                  {/* LONG brilliant glowing trail */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      width: '150px',
                      height: '5px',
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, rgba(241, 245, 249, 0.6) 60%, transparent 100%)',
                      filter: 'blur(3px)',
                      transformOrigin: 'left center',
                      zIndex: 24,
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, scaleX: 0 }}
                    animate={{
                      opacity: [0, 1, 0.85, 0],
                      x: [0, endX],
                      y: [0, endY],
                      scaleX: [0, 1.4, 1.2, 0.9]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.15,
                      ease: 'linear'
                    }}
                  />

                  {/* Sparkle trail particles */}
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={`sparkle-${i}-${j}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${startX}%`,
                        top: `${startY}%`,
                        width: '4px',
                        height: '4px',
                        background: '#ffffff',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)',
                        zIndex: 23
                      }}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0.6, 0],
                        x: [0, endX * (j / 5)],
                        y: [0, endY * (j / 5)],
                        scale: [0, 1.2, 0.8, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: i * 0.15 + j * 0.08,
                        ease: 'linear'
                      }}
                    />
                  ))}
                  
                  {/* Paw print trail */}
                  {[...Array(8)].map((_, j) => (
                    <motion.div
                      key={`trail-paw-${i}-${j}`}
                      className="absolute text-xl opacity-60"
                      style={{
                        left: `${startX}%`,
                        top: `${startY}%`,
                        zIndex: 24
                      }}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        x: [(400 + Math.random() * 200) * (j / 8)],
                        y: [(300 + Math.random() * 150) * (j / 8)],
                        scale: [0, 1, 0.7]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2 + j * 0.1,
                        ease: 'linear'
                      }}
                    >
                      🐾
                    </motion.div>
                  ))}
                  
                  {/* Shooting star trail glow */}
                  <motion.div
                    className="absolute h-1 origin-left"
                    style={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent)',
                      filter: 'blur(3px)',
                      zIndex: 23,
                      transform: 'rotate(35deg)'
                    }}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      width: ['0px', '120px', '0px']
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      ease: 'linear'
                    }}
                  />
                </React.Fragment>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* RADIANCE - Constellation pulses with heartbeat */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Heartbeat pulse from constellation */}
            <motion.div
              className="absolute"
              style={{
                left: '50%',
                top: '42%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3), transparent 60%)',
                filter: 'blur(80px)',
                zIndex: 12
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Stars sparkling around constellation */}
            {radianceStars.map((star, i) => (
              <motion.div
                key={`radiance-star-${i}`}
                className="absolute w-2 h-2 bg-blue-200 rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  boxShadow: '0 0 8px rgba(147, 197, 253, 0.9)',
                  zIndex: 22
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* "Forever Watching" text */}
            <motion.div
              className="absolute inset-x-0 bottom-[15%] z-30 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <h1 
                className="text-4xl md:text-6xl font-bold text-blue-200"
                style={{
                  textShadow: '0 0 40px rgba(96, 165, 250, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)',
                  filter: 'drop-shadow(0 4px 12px rgba(30, 58, 138, 0.6))'
                }}
              >
                Forever Watching ⭐
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-slate-900 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}