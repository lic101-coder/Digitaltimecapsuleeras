/**
 * Golden Moments - Photo Finish Victory Ceremony
 * 
 * CONCEPT: The final split-second of winning a championship - time freezes,
 * the universe acknowledges your triumph, then EXPLODES in celebration.
 * 
 * STORY: Athlete crosses finish line/scores winning point - time FREEZES at 
 * moment of victory - world processes the win - then ERUPTS.
 * 
 * STAGES:
 * 1. THE FINAL PUSH (0-2s) - Athlete in motion, blurred crowd, finish line approaching
 * 2. TIME STANDS STILL (2-6s) - Moment of contact, everything FREEZES, universe pauses
 * 3. VICTORY RECOGNIZED (6-9s) - Golden light, trophy materializes, scoreboard lights up
 * 4. UNIVERSE CELEBRATES (9-14s) - TIME RESUMES, confetti explosion, fireworks, golden rain
 * 
 * VFX HIGHLIGHTS:
 * - Time freeze effect with suspended particles
 * - Trophy rising from ground with volumetric lighting
 * - 200+ confetti particles with physics
 * - Stadium lights igniting in sequence
 * - Fireworks bursts with light bloom
 * - Golden rain cascade
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface GoldenVictoryCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function GoldenVictoryCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: GoldenVictoryCeremonyProps) {
  const [stage, setStage] = useState<'push' | 'freeze' | 'recognized' | 'celebrate'>('push');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('freeze'), 2000),
      setTimeout(() => setStage('recognized'), 6000),
      setTimeout(() => setStage('celebrate'), 9000),
      setTimeout(() => {
        if (!isPreview && onComplete) {
          onComplete();
        }
      }, 14000)
    ];

    // Completion failsafe - ensure ceremony always completes
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 15000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, [isPreview]); // Removed onComplete - don't restart ceremony midway through

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 720 - 360,
    type: Math.random() > 0.7 ? 'trophy' : 'rect'
  }));

  // Generate stadium lights
  const stadiumLights = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30),
    delay: i * 0.1
  }));

  // Generate fireworks
  const fireworks = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 20 + (i * 10),
    y: 20 + (Math.random() * 30),
    delay: i * 0.2,
    size: 80 + Math.random() * 120
  }));

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const gvColors = useMemo(() => ['#fbbf24','#f59e0b','#ef4444','#ffffff','#fb923c','#fde68a','#ec4899'], []);
  const gvFwPositions = useMemo(() => [
    {x:10,y:18},{x:25,y:10},{x:42,y:20},{x:58,y:8},{x:72,y:18},{x:88,y:12},{x:18,y:32},{x:82,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const gvFwSparks = useMemo(() => gvFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: gvColors[i % gvColors.length], delay: i*0.04 };
    })
  ), [gvFwPositions, gvColors, isMobile]);
  const gvFwRings = useMemo(() => gvFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#fbbf24','#ef4444','#fb923c'][i] }))
  ), [gvFwPositions]);
  const gvOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: gvColors[i % gvColors.length]
  })), [gvColors, isMobile]);

  useEffect(() => {
    if (stage !== 'celebrate') return;
    const colors = ['#fbbf24','#f59e0b','#ef4444','#ffffff','#fb923c','#fde68a','#ec4899'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60, origin: { x: isMobile ? 0.12 : 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60, origin: { x: isMobile ? 0.12 : 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  // Generate frozen particles (sweat, dust, etc)
  const frozenParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    y: 30 + Math.random() * 40,
    size: 2 + Math.random() * 4
  }));

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      
      {/* STAGE 1: THE FINAL PUSH */}
      <AnimatePresence>
        {stage === 'push' && (
          <>
            {/* Motion blur background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30"
                animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 100%' }}
              />
            </motion.div>

            {/* Crowd silhouettes */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 bg-black/80"
                  style={{
                    left: `${i * 5}%`,
                    width: `${3 + Math.random() * 2}%`,
                    height: `${40 + Math.random() * 30}%`,
                    borderRadius: '50% 50% 0 0'
                  }}
                  animate={{
                    scaleY: [1, 1.1, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </motion.div>

            {/* Athlete silhouette in motion - COMING FROM RIGHT, RUNNING LEFT */}
            <motion.div
              className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2"
              initial={{ x: 300, scale: 0.8 }}
              animate={{ x: -50, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "linear" }}
            >
              <div className="relative">
                <motion.div
                  className="text-9xl"
                  animate={{ 
                    rotate: [0, -10, 0],
                    y: [-8, 8, -8]
                  }}
                  transition={{ 
                    rotate: { duration: 0.25, repeat: Infinity },
                    y: { duration: 0.25, repeat: Infinity }
                  }}
                >
                  🏃
                </motion.div>
                
                {/* Champion glow */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full blur-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)'
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                
                {/* Motion trails - behind the runner */}
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 text-9xl"
                    initial={{ opacity: 0.7 - i * 0.12, x: 0 }}
                    animate={{ opacity: 0, x: 60 + i * 20 }}
                    transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.05 }}
                  >
                    🏃
                  </motion.div>
                ))}
                
                {/* Speed lines - moving right to left */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <motion.div
                    key={`speed-${i}`}
                    className="absolute left-full top-1/2 w-40 h-1.5 bg-blue-400/80"
                    style={{ 
                      top: `${25 + i * 10}%`,
                      left: '100%',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
                    }}
                    animate={{ 
                      x: [250, -60],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{ 
                      duration: 0.45, 
                      repeat: Infinity,
                      delay: i * 0.07,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Dust clouds kicked up */}
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={`dust-${i}`}
                    className="absolute bottom-0 left-1/2 text-4xl opacity-60"
                    animate={{
                      x: [0, 80],
                      y: [0, 20],
                      scale: [0.5, 1.5],
                      opacity: [0.6, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  >
                    💨
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* OPPONENT - NECK AND NECK! Just barely behind by inches! */}
            <motion.div
              className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
              initial={{ x: 295, scale: 0.8 }}
              animate={{ x: -45, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "linear" }}
            >
              <div className="relative">
                <motion.div
                  className="text-9xl opacity-90"
                  animate={{ 
                    rotate: [0, -10, 0],
                    y: [-8, 8, -8]
                  }}
                  transition={{ 
                    rotate: { duration: 0.25, repeat: Infinity, delay: 0.02 },
                    y: { duration: 0.25, repeat: Infinity, delay: 0.02 }
                  }}
                >
                  🏃
                </motion.div>
                
                {/* Opponent glow - red for second place */}
                <motion.div
                  className="absolute inset-0 -z-10 rounded-full blur-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, transparent 70%)'
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                
                {/* Opponent motion trails - slightly dimmer */}
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={`opp-${i}`}
                    className="absolute inset-0 text-9xl opacity-80"
                    initial={{ opacity: 0.6 - i * 0.12, x: 0 }}
                    animate={{ opacity: 0, x: 55 + i * 18 }}
                    transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.05 }}
                  >
                    🏃
                  </motion.div>
                ))}
                
                {/* Opponent speed lines - red */}
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={`opp-speed-${i}`}
                    className="absolute left-full top-1/2 w-36 h-1.5 bg-red-400/70"
                    style={{ 
                      top: `${25 + i * 10}%`,
                      left: '100%',
                      boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)'
                    }}
                    animate={{ 
                      x: [240, -55],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{ 
                      duration: 0.45, 
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Opponent dust */}
                {[0, 1].map(i => (
                  <motion.div
                    key={`opp-dust-${i}`}
                    className="absolute bottom-0 left-1/2 text-3xl opacity-50"
                    animate={{
                      x: [0, 70],
                      y: [0, 18],
                      scale: [0.5, 1.4],
                      opacity: [0.5, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: "easeOut"
                    }}
                  >
                    💨
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* PHOTO FINISH CAMERA FLASH - captures the exact moment */}
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0, 0.95, 0, 0.8, 0, 0] }}
              transition={{ times: [0, 0.6, 0.7, 0.85, 0.87, 0.89, 0.91, 0.93, 1], duration: 1.8 }}
            />
            
            {/* FINISH LINE */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 z-10"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 40px, #000000 40px, #000000 80px)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
              }}
            />
            
            {/* Finish line glow */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-40 -translate-x-1/2 blur-2xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))'
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* "PHOTO FINISH!" text overlay */}
            <motion.div
              className="absolute top-16 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 1, 0], scale: [0.5, 1.2, 1, 1, 0.8] }}
              transition={{ times: [0, 0.1, 0.3, 0.8, 1], duration: 1.8 }}
            >
              <h3 className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]" style={{
                textShadow: '0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.8)'
              }}>
                PHOTO FINISH!
              </h3>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: TIME STANDS STILL */}
      <AnimatePresence>
        {stage === 'freeze' && (
          <>
            {/* Freeze effect overlay */}
            <motion.div
              className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Frozen athlete */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl"
              initial={{ scale: 1 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              🏃
              {/* Freeze glow - ENHANCED */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Ice crystal shards forming */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <motion.div
                  key={`ice-${i}`}
                  className="absolute left-1/2 top-1/2 w-16 h-1 bg-cyan-200/80"
                  style={{
                    transformOrigin: '0 0'
                  }}
                  initial={{ rotate: i * 45, scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0.6] }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                />
              ))}
            </motion.div>

            {/* Frozen particles (sweat, dust) */}
            {frozenParticles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-blue-300/60"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1], scale: 1 }}
                transition={{ duration: 0.5, delay: particle.id * 0.02 }}
              />
            ))}

            {/* Stopped sound waves visualization */}
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-400/40"
                initial={{ width: 200, height: 200, opacity: 0.8 }}
                animate={{ 
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Freeze time clock */}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 10 }}
            >
              <div className="text-8xl">⏸️</div>
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-blue-200 drop-shadow-lg">
                The World Holds Its Breath ⏸️
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: VICTORY RECOGNIZED */}
      <AnimatePresence>
        {stage === 'recognized' && (
          <>
            {/* Golden light emanation */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 via-yellow-600/40 to-amber-500/40" />
            </motion.div>

            {/* Athlete with golden aura */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="text-9xl">🏃</div>
                {/* Golden glow emanation */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-radial from-yellow-400 via-amber-500 to-transparent blur-2xl" />
                </motion.div>
              </div>
            </motion.div>

            {/* Trophy rising from ground */}
            <motion.div
              className="absolute left-1/2 top-3/4 -translate-x-1/2"
              initial={{ y: 200, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.div
                className="text-8xl"
                animate={{ 
                  y: [-5, 5, -5],
                  rotateY: [0, 360]
                }}
                transition={{ 
                  y: { duration: 2, repeat: completed ? 0 : 4, ease: "easeInOut" },
                  rotateY: { duration: 3, repeat: completed ? 0 : 3, ease: "linear" }
                }}
              >
                🏆
              </motion.div>
              
              {/* Volumetric light beam */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-screen origin-top"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6) 0%, transparent 100%)'
                }}
              />
            </motion.div>

            {/* Scoreboard WIN display */}
            <motion.div
              className="absolute top-20 left-1/2 -translate-x-1/2"
              initial={{ scale: 0, rotateX: -90 }}
              animate={{ scale: 1, rotateX: 0 }}
              transition={{ 
                delay: 0.8,
                type: "spring",
                damping: 8
              }}
            >
              <div className="bg-black/80 border-4 border-amber-500 rounded-lg px-12 py-6">
                <motion.div
                  className="text-6xl font-black text-amber-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  CHAMPION!
                </motion.div>
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-amber-300 drop-shadow-lg">
                CHAMPION! 🏆
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: UNIVERSE CELEBRATES */}
      <AnimatePresence>
        {stage === 'celebrate' && (
          <>
            {/* Explosion background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600" />
            </motion.div>

            {/* Stadium lights igniting */}
            {stadiumLights.map(light => (
              <motion.div
                key={light.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transformOrigin: 'center'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: light.delay }}
              >
                <motion.div
                  className="w-2 h-96 bg-gradient-to-b from-white via-yellow-300 to-transparent"
                  style={{
                    transform: `rotate(${light.angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: light.delay }}
                />
              </motion.div>
            ))}

            {/* Fireworks */}
            {fireworks.map(fw => (
              <motion.div
                key={fw.id}
                className="absolute"
                style={{
                  left: `${fw.x}%`,
                  top: `${fw.y}%`
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ 
                  duration: 1.5,
                  delay: fw.delay,
                  ease: "easeOut"
                }}
              >
                <div 
                  className="rounded-full border-8"
                  style={{
                    width: fw.size,
                    height: fw.size,
                    borderColor: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899'][fw.id % 4],
                    boxShadow: `0 0 40px ${['#fbbf24', '#f59e0b', '#ef4444', '#ec4899'][fw.id % 4]}`
                  }}
                />
              </motion.div>
            ))}

            {/* Confetti explosion */}
            {confettiParticles.map(particle => (
              <motion.div
                key={particle.id}
                className={`absolute ${particle.type === 'trophy' ? 'text-2xl' : 'w-3 h-4'}`}
                style={{
                  left: `${particle.x}%`,
                  top: '-10%',
                  backgroundColor: particle.type === 'rect' 
                    ? ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6'][particle.id % 5]
                    : undefined
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: [1, 1, 0],
                  rotate: particle.rotation
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeIn"
                }}
              >
                {particle.type === 'trophy' && '🏆'}
              </motion.div>
            ))}

            {/* Athlete in victory pose */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1.3 }}
              animate={{ 
                scale: 1.4,
                y: [-10, 10, -10]
              }}
              transition={{
                scale: { duration: 0.5 },
                y: { duration: 1.5, repeat: completed ? 0 : 6, ease: "easeInOut" }
              }}
            >
              <div className="text-9xl">🙌</div>
            </motion.div>

            {/* Trophy in hands */}
            <motion.div
              className="absolute left-1/2 top-[55%] -translate-x-1/2 text-7xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🏆
            </motion.div>

            {/* Golden rain particles */}
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="absolute w-1 h-6 bg-gradient-to-b from-yellow-300 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-5%'
                }}
                initial={{ y: 0, opacity: 0.8 }}
                animate={{ y: window.innerHeight + 50, opacity: 0 }}
                transition={{
                  duration: 1 + Math.random() * 1,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}

            {/* Firework clusters */}
            {gvFwPositions.map((pos, pi) => (
              <React.Fragment key={`gv-fw-${pi}`}>
                {gvFwSparks[pi].map((s, si) => (
                  <motion.div key={`gv-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {gvFwRings[pi].map((r, ri) => (
                  <div key={`gv-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20, borderColor: r.color, animation: `gv-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`gv-flash-${pi}`} className="absolute rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${gvColors[pi % gvColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'gv-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {gvOrbs.map((orb, i) => (
              <div key={`gv-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left: `${orb.x}%`, bottom: '20%', width: 10, height: 10,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `gv-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black drop-shadow-[0_0_24px_rgba(251,191,36,0.9)]"
                style={{ background: 'linear-gradient(90deg,#fbbf24,#fb923c,#ef4444,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                🏆 YOU DID IT! 🏆
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pan {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes gv-pop-ring {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes gv-flash {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes gv-orb-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}