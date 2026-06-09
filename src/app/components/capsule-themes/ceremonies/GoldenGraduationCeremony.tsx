/**
 * Golden Moments - Graduation Cap Toss Ceremony
 * 
 * CONCEPT: The moment education transforms into destiny - a graduate tosses 
 * their cap and watches as it becomes a constellation of their future.
 * 
 * STORY: Graduate tosses cap → Cap rises in slow-motion → Transforms to golden 
 * star → Multiplies into constellation → Diploma unfurls → Knowledge explosion → 
 * Graduate catches glowing cap → Confetti triumph
 * 
 * STAGES:
 * 1. THE ANTICIPATION (0-2s) - Graduate holding cap, spotlight, deep breath
 * 2. THE TOSS (2-5s) - Cap launches upward in extreme slow-mo, tassel streams
 * 3. THE TRANSFORMATION (5-9s) - Cap becomes star, multiplies, constellation forms
 * 4. THE KNOWLEDGE ASCENDS (9-12s) - Books fly open, symbols everywhere
 * 5. THE TRIUMPH (12-15s) - Graduate catches cap, confetti explosion
 * 
 * VFX HIGHLIGHTS:
 * - Realistic cap physics with slow-motion
 * - Morphing animation: Cap → Star
 * - Constellation with connecting lines
 * - 50+ floating knowledge symbols
 * - Diploma scroll unfurling animation
 * - 200+ mortarboard confetti pieces
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GoldenGraduationCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function GoldenGraduationCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: GoldenGraduationCeremonyProps) {
  const [stage, setStage] = useState<'anticipation' | 'toss' | 'transform' | 'ascend' | 'triumph'>('anticipation');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('toss'), 2000),
      setTimeout(() => setStage('transform'), 5000),
      setTimeout(() => setStage('ascend'), 9000),
      setTimeout(() => setStage('triumph'), 12000),
      setTimeout(() => {
        if (!isPreview && onComplete) {
          onComplete();
        }
      }, 15000)
    ];

    // Completion failsafe - ensure ceremony always completes
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 16000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, [isPreview]); // Removed onComplete - don't restart ceremony midway through

  // Constellation stars
  const constellationStars = [
    { x: 50, y: 30, subject: '∑' },
    { x: 60, y: 25, subject: 'π' },
    { x: 65, y: 35, subject: '∫' },
    { x: 70, y: 30, subject: 'α' },
    { x: 55, y: 40, subject: '∞' },
    { x: 45, y: 35, subject: 'Δ' },
    { x: 40, y: 28, subject: 'Σ' },
    { x: 48, y: 22, subject: 'φ' },
    { x: 62, y: 42, subject: 'λ' },
    { x: 52, y: 45, subject: 'θ' },
    { x: 58, y: 20, subject: 'β' },
    { x: 43, y: 43, subject: 'ψ' }
  ];

  // Knowledge symbols
  const knowledgeSymbols = [
    { icon: '📚', x: 15, y: 30, rotate: -15 },
    { icon: '🔬', x: 85, y: 25, rotate: 20 },
    { icon: '🎨', x: 20, y: 60, rotate: 10 },
    { icon: '⚗️', x: 80, y: 55, rotate: -25 },
    { icon: '🎭', x: 10, y: 45, rotate: 15 },
    { icon: '🎼', x: 90, y: 40, rotate: -10 },
    { icon: '🌍', x: 25, y: 75, rotate: 20 },
    { icon: '💡', x: 75, y: 70, rotate: -15 },
    { icon: '🏛️', x: 15, y: 20, rotate: 12 },
    { icon: '🧬', x: 85, y: 15, rotate: -18 },
    { icon: '📐', x: 30, y: 85, rotate: 25 },
    { icon: '🔭', x: 70, y: 80, rotate: -20 },
    { icon: '💻', x: 12, y: 70, rotate: 8 },
    { icon: '⚖️', x: 88, y: 65, rotate: -12 },
    { icon: '🎓', x: 20, y: 35, rotate: 18 },
    { icon: '✏️', x: 80, y: 35, rotate: -22 }
  ];

  // Text knowledge symbols (equations, quotes, etc)
  const textSymbols = [
    { text: 'E=mc²', x: 22, y: 40, size: 'text-xl' },
    { text: '"To be..."', x: 78, y: 45, size: 'text-lg' },
    { text: 'DNA', x: 18, y: 55, size: 'text-2xl' },
    { text: 'H₂O', x: 82, y: 50, size: 'text-xl' },
    { text: 'F=ma', x: 28, y: 25, size: 'text-lg' },
    { text: 'φ(x)', x: 72, y: 30, size: 'text-xl' },
    { text: 'Renaissance', x: 15, y: 65, size: 'text-sm' },
    { text: 'Democracy', x: 85, y: 60, size: 'text-sm' }
  ];

  // Confetti particles (mortarboards and traditional)
  const confettiParticles = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 720 - 360,
    type: Math.random() > 0.7 ? 'cap' : 'rect',
    color: ['#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'][i % 5]
  }));

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 overflow-hidden">
      
      {/* STAGE 1: THE ANTICIPATION */}
      <AnimatePresence>
        {stage === 'anticipation' && (
          <>
            {/* Spotlight */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />

            {/* Graduate silhouette */}
            <motion.div
              className="absolute left-1/2 bottom-1/4 -translate-x-1/2 text-8xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
            >
              🎓
            </motion.div>

            {/* Classmate silhouettes in background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 text-4xl opacity-30"
                  style={{ left: `${5 + i * 6}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.3, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  🎓
                </motion.div>
              ))}
            </div>

            {/* Deep breath pulse */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Label */}
            <motion.div
              className="absolute top-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-amber-300 drop-shadow-lg">
                This is Your Moment 🎓
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: THE TOSS */}
      <AnimatePresence>
        {stage === 'toss' && (
          <>
            {/* Sky background transition */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-900 via-indigo-800 to-purple-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Cap in flight - ENHANCED */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              initial={{ y: window.innerHeight * 0.75, scale: 1, rotate: 0 }}
              animate={{ 
                y: window.innerHeight * 0.2,
                scale: 2.5,
                rotate: 720
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="relative">
                <div className="text-8xl filter drop-shadow-[0_0_30px_rgba(251,191,36,1)]">🎓</div>
                
                {/* Tassel streaming - MORE DRAMATIC */}
                <motion.div
                  className="absolute left-1/2 top-full w-2 h-24 origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, #fbbf24, #f59e0b, transparent)'
                  }}
                  animate={{ 
                    rotate: [0, -35, 35, -25, 25, -15, 15, 0],
                    scaleY: [1, 1.6, 1, 1.4, 1, 1.3, 1]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                
                {/* Cap shadow/depth effect */}
                <motion.div
                  className="absolute inset-0 text-8xl opacity-30 blur-lg"
                  style={{ transform: 'translateY(15px)' }}
                >
                  🎓
                </motion.div>
                
                {/* Golden ring expanding */}
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={`ring-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-400"
                    initial={{ width: 80, height: 80, opacity: 0.8 }}
                    animate={{
                      width: 200 + i * 60,
                      height: 200 + i * 60,
                      opacity: 0
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Golden particle trail - MORE DRAMATIC */}
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 rounded-full bg-amber-400"
                style={{
                  width: 4 + Math.random() * 4,
                  height: 4 + Math.random() * 4,
                  boxShadow: '0 0 15px rgba(251, 191, 36, 1)'
                }}
                initial={{ 
                  y: window.innerHeight * 0.75,
                  x: -i * 10 + Math.random() * 20,
                  opacity: 1,
                  scale: 1
                }}
                animate={{ 
                  y: window.innerHeight * 0.2 + i * 20,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.04,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Wind particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`wind-${i}`}
                className="absolute w-12 h-0.5 bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${30 + Math.random() * 40}%`
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 100, opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity
                }}
              />
            ))}

            {/* Label */}
            <motion.div
              className="absolute top-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-blue-200 drop-shadow-lg">
                Reaching for the Stars ✨
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: THE TRANSFORMATION */}
      <AnimatePresence>
        {stage === 'transform' && (
          <>
            {/* Starry night sky */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Background stars */}
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>

            {/* Cap morphing into star */}
            <motion.div
              className="absolute left-1/2 top-[20%] -translate-x-1/2"
              initial={{ scale: 1.5, rotate: 360 }}
              animate={{ scale: 2, rotate: 720 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute text-8xl"
              >
                🎓
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-8xl"
              >
                ⭐
              </motion.div>
            </motion.div>

            {/* Golden burst */}
            <motion.div
              className="absolute left-1/2 top-[20%] -translate-x-1/2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-radial from-amber-400 via-yellow-500 to-transparent" />
            </motion.div>

            {/* Constellation forms */}
            <AnimatePresence>
              {constellationStars.map((star, i) => (
                <React.Fragment key={i}>
                  {/* Star point */}
                  <motion.div
                    className="absolute"
                    style={{
                      left: `${star.x}%`,
                      top: `${star.y}%`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring", damping: 10 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="text-4xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        ⭐
                      </motion.div>
                      {/* Subject symbol */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white">
                        {star.subject}
                      </div>
                      {/* Glow */}
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-full blur-xl"
                        style={{ background: 'rgba(251, 191, 36, 0.5)' }}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Connecting lines */}
                  {i < constellationStars.length - 1 && (
                    <motion.svg
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                    >
                      <motion.line
                        x1={`${star.x}%`}
                        y1={`${star.y}%`}
                        x2={`${constellationStars[i + 1].x}%`}
                        y2={`${constellationStars[i + 1].y}%`}
                        stroke="#fbbf24"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                      />
                    </motion.svg>
                  )}
                </React.Fragment>
              ))}
            </AnimatePresence>

            {/* Diploma unfurls */}
            <motion.div
              className="absolute left-1/2 top-[60%] -translate-x-1/2"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            >
              <div className="relative w-96 h-32 bg-gradient-to-br from-amber-100 to-amber-50 border-4 border-amber-600 rounded shadow-2xl">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-amber-900 font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold">Knowledge Unlocked</div>
                    <div className="text-sm mt-2">∞ Future Possibilities</div>
                  </div>
                </motion.div>
                {/* Wax seal */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-red-600 border-2 border-red-800 flex items-center justify-center text-xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 2.8, type: "spring", damping: 10 }}
                >
                  🎓
                </motion.div>
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold text-amber-300 drop-shadow-lg">
                Knowledge Ascending 📜
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: THE KNOWLEDGE ASCENDS */}
      <AnimatePresence>
        {stage === 'ascend' && (
          <>
            {/* Starry knowledge universe background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Knowledge stream - books, scrolls, symbols rising in coordinated columns */}
            {[0, 1, 2, 3, 4].map(column => (
              <div key={`column-${column}`} className="absolute" style={{ left: `${15 + column * 17}%`, top: 0, bottom: 0 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                  <motion.div
                    key={`item-${item}`}
                    className="absolute left-1/2 -translate-x-1/2 text-4xl"
                    initial={{ 
                      y: window.innerHeight + 100,
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{ 
                      y: -100,
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.8],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 6,
                      delay: column * 0.15 + item * 0.3,
                      ease: "linear"
                    }}
                  >
                    {['📚', '📖', '📜', '✨', '🎓', '💡', '🔬', '🧪'][item % 8]}
                    
                    {/* Glowing trail behind each symbol */}
                    <motion.div
                      className="absolute left-1/2 top-full -translate-x-1/2 w-1 h-20 origin-top"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.6), transparent)',
                        filter: 'blur(2px)'
                      }}
                      animate={{ opacity: [0.8, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Cap floating in center, absorbing knowledge */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl z-10"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎓
              
              {/* Knowledge absorption effect - particles being pulled into cap */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                <motion.div
                  key={`absorb-${i}`}
                  className="absolute text-2xl"
                  style={{
                    left: `${50 + Math.cos((i * 30) * Math.PI / 180) * 150}%`,
                    top: `${50 + Math.sin((i * 30) * Math.PI / 180) * 150}%`
                  }}
                  animate={{
                    x: [0, -Math.cos((i * 30) * Math.PI / 180) * 150],
                    y: [0, -Math.sin((i * 30) * Math.PI / 180) * 150],
                    opacity: [1, 0],
                    scale: [1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeIn"
                  }}
                >
                  {'✨'}
                </motion.div>
              ))}

              {/* Pulsing knowledge aura */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={`aura-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-blue-400"
                  initial={{ width: 120, height: 120, opacity: 0.8 }}
                  animate={{
                    width: 280,
                    height: 280,
                    opacity: 0
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Energy core glow */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)'
                  ],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 3, repeat: completed ? 0 : 4 }}
              />
            </motion.div>

            {/* Wisdom constellation forming */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${30 + (i % 3) * 20}%`,
                  top: `${20 + Math.floor(i / 3) * 20}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0, 1.2, 1],
                  rotate: [0, 180]
                }}
                transition={{
                  delay: 1 + i * 0.2,
                  duration: 0.5
                }}
              >
                ⭐
                
                {/* Connecting lines between stars */}
                {i < 6 && (i % 3) < 2 && (
                  <motion.div
                    className="absolute left-full top-1/2 h-0.5 bg-blue-400/60 origin-left"
                    style={{ width: '20vw' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}

            {/* Label */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold text-blue-200 drop-shadow-lg">
                Knowledge Ascending 🌟
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 5: THE TRIUMPH */}
      <AnimatePresence>
        {stage === 'triumph' && (
          <>
            {/* Bright celebration background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Graduate with cap - CENTERED PROPERLY */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 8 }}
            >
              <motion.div
                className="text-9xl"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎓
              </motion.div>
            </motion.div>

            {/* Glowing cap effect */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
            />

            {/* Confetti explosion */}
            {confettiParticles.map(particle => (
              <motion.div
                key={particle.id}
                className={`absolute ${particle.type === 'cap' ? 'text-3xl' : ''}`}
                style={{
                  left: `${particle.x}%`,
                  top: '-10%',
                  width: particle.type === 'rect' ? 12 : undefined,
                  height: particle.type === 'rect' ? 16 : undefined,
                  backgroundColor: particle.type === 'rect' ? particle.color : undefined
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
                {particle.type === 'cap' && '🎓'}
              </motion.div>
            ))}

            {/* Fireworks */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={`firework-${i}`}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 2) * 20}%`
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <div 
                  className="w-32 h-32 rounded-full border-8"
                  style={{
                    borderColor: ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'][i],
                    boxShadow: `0 0 40px ${['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'][i]}`
                  }}
                />
              </motion.div>
            ))}

            {/* Label - FIXED POSITIONING */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                damping: 8
              }}
            >
              <h2 className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                Your Future is Bright! 🌟
              </h2>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}