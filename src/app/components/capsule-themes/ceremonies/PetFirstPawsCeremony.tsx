/**
 * Pet First Paws Home Ceremony - CRYSTAL CLEAR ADOPTION JOURNEY
 * 
 * SUPER CLEAR STORY:
 * 1. Person alone and lonely (empty home, sad face)
 * 2. Goes to "PET ADOPTION CENTER" building
 * 3. Love at first sight - meets their perfect pet!
 * 4. Walking home together with leash
 * 5. Happy at home - photos on wall, playing together
 * 6. "A PERFECT MATCH!" finale
 * 
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetFirstPawsCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetFirstPawsCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetFirstPawsCeremonyProps) {
  const [stage, setStage] = useState<'title' | 'lonely' | 'center' | 'meeting' | 'connection' | 'home' | 'together' | 'finale' | 'outro'>('title');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('title') },
      { time: 1000, action: () => setStage('lonely') },
      { time: 3200, action: () => setStage('center') },
      { time: 5600, action: () => setStage('meeting') },
      { time: 8000, action: () => setStage('connection') },
      { time: 10000, action: () => setStage('home') },
      { time: 13000, action: () => setStage('together') },
      { time: 15500, action: () => setStage('finale') },
      { time: 17500, action: () => setStage('outro') },
      { time: 18000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-amber-50">
      {/* Title */}
      <AnimatePresence>
        {stage === 'title' && capsuleTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-amber-800 drop-shadow-2xl text-center px-8">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 1: LONELY PERSON - ENHANCED EMOTIONAL DEPTH */}
      <AnimatePresence>
        {stage === 'lonely' && (
          <>
            {/* Dark vignette for mood */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Sad person alone - larger and more prominent */}
            <motion.div
              className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-[10rem] z-30"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [-8, 8, -8]
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8, type: 'spring', bounce: 0.3 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              😔
            </motion.div>

            {/* "LONELY..." text - BIGGER */}
            <motion.div
              className="absolute top-[18%] left-1/2 -translate-x-1/2 z-40"
              initial={{ opacity: 0, y: -40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.5 }}
            >
              <div className="bg-slate-800 px-16 py-8 rounded-3xl border-8 border-slate-950 shadow-2xl">
                <h3 className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl">
                  FEELING LONELY... 💔
                </h3>
              </div>
            </motion.div>

            {/* Empty room indicators - SPREAD OUT */}
            <motion.div
              className="absolute bottom-[18%] left-[15%] text-7xl opacity-30 z-10"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
            >
              📦
            </motion.div>
            <motion.div
              className="absolute bottom-[18%] right-[15%] text-7xl opacity-30 z-10"
              initial={{ opacity: 0, scale: 0, rotate: 45 }}
              animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
            >
              📦
            </motion.div>
            <motion.div
              className="absolute top-[28%] left-[12%] text-6xl opacity-25 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{ delay: 1.4, type: 'spring', bounce: 0.4 }}
            >
              📦
            </motion.div>
            
            {/* Rain cloud above person - ANIMATED RAIN */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[25%] text-7xl z-20"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 0.7, y: [0, 5, 0] }}
              transition={{ 
                opacity: { delay: 1.3, duration: 0.8 },
                y: { delay: 1.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              ☁️
            </motion.div>
            
            {/* Rain drops falling */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="absolute left-1/2 text-3xl z-15"
                style={{ marginLeft: `${(i - 4) * 15}px` }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, 80]
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.8 + i * 0.15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                💧
              </motion.div>
            ))}

            {/* Subtle dark particles drifting */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`dark-particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-slate-400 opacity-20 z-5"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${30 + Math.random() * 50}%`
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: ADOPTION CENTER - ENHANCED */}
      <AnimatePresence>
        {(stage === 'center' || stage === 'meeting') && (
          <>
            {/* Bright hopeful background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.3), transparent 70%)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Adoption Center Building - ANIMATED */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
            >
              {/* Building */}
              <div className="relative">
                {/* Roof */}
                <motion.div 
                  className="w-0 h-0 mx-auto"
                  style={{
                    borderLeft: '200px solid transparent',
                    borderRight: '200px solid transparent',
                    borderBottom: '100px solid #3b82f6'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
                {/* Walls */}
                <motion.div 
                  className="w-[400px] h-72 bg-blue-200 border-8 border-blue-800 relative -mt-2"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {/* Big door */}
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-48 bg-blue-900 border-4 border-blue-950 rounded-t-2xl"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    <div className="absolute right-4 top-1/2 w-4 h-4 rounded-full bg-yellow-400 border-2 border-yellow-600" />
                  </motion.div>
                  
                  {/* Windows with pet silhouettes - BOUNCING IN */}
                  <motion.div 
                    className="absolute left-12 top-16 w-20 h-20 bg-yellow-100 border-4 border-blue-900 rounded-lg flex items-center justify-center text-4xl"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.9, type: 'spring', bounce: 0.6 }}
                  >
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🐕
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="absolute right-12 top-16 w-20 h-20 bg-yellow-100 border-4 border-blue-900 rounded-lg flex items-center justify-center text-4xl"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.1, type: 'spring', bounce: 0.6 }}
                  >
                    <motion.div
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🐱
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 top-16 w-20 h-20 bg-yellow-100 border-4 border-blue-900 rounded-lg flex items-center justify-center text-3xl"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: 'spring', bounce: 0.6 }}
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🐇
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* HUGE SIGN - "PET ADOPTION CENTER" - 25% SMALLER */}
            <motion.div
              className="absolute top-[8%] left-1/2 -translate-x-1/2 z-40"
              initial={{ opacity: 0, y: -50, scale: 0.5, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotate: 0 
              }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1.2, delay: 0.6, type: 'spring', bounce: 0.6 }}
            >
              <motion.div 
                className="bg-rose-500 px-7 py-3 rounded-2xl border-6 border-rose-700 shadow-xl"
                animate={{
                  boxShadow: [
                    '0 20px 40px rgba(244, 63, 94, 0.5)',
                    '0 20px 50px rgba(244, 63, 94, 0.7)',
                    '0 20px 40px rgba(244, 63, 94, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <h3 className="text-3xl md:text-4xl font-black text-white text-center drop-shadow-xl">
                  🏥 PET ADOPTION CENTER 🏥
                </h3>
              </motion.div>
            </motion.div>

            {/* Person walking toward building - WITH WALKING ANIMATION */}
            {stage === 'center' && (
              <motion.div
                className="absolute text-8xl bottom-[22%] z-25"
                style={{ transform: 'scaleX(-1)' }} // ✅ FACING RIGHT toward building
                initial={{ left: '-12%' }}
                animate={{ left: '40%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: 'linear' }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -8, 0, -8, 0],
                    rotate: [0, -2, 0, 2, 0]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                >
                  🚶
                </motion.div>
              </motion.div>
            )}

            {/* Floating hearts around building - HOPE AND LOVE */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`hope-heart-${i}`}
                className="absolute text-4xl z-10"
                style={{
                  left: `${25 + i * 5}%`,
                  top: `${35 + (i % 3) * 8}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.8],
                  y: [-20, -60],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: 0.8 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              >
                💕
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: MEETING THE PET - REPOSITIONED FOR VISIBILITY */}
      <AnimatePresence>
        {(stage === 'meeting' || stage === 'connection') && (
          <>
            {/* Clear space - remove adoption center building */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-pink-50 to-purple-50" />
            
            {/* Person on left side - WITH WRAPPER FOR CENTERED EFFECTS */}
            <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* HEARTBEAT effect from person - PERFECTLY CENTERED */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`heartbeat-person-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-pink-400 z-8"
                  style={{ width: '140px', height: '140px' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 2.5, 3.5]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              ))}
              
              {/* Person emoji - centered in wrapper */}
              <motion.div
                className="text-9xl z-30"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ 
                  opacity: { duration: 0.6 },
                  x: { duration: 0.6 },
                  scale: { duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                😊
              </motion.div>
              
              {/* Glowing aura around person - PERFECTLY CENTERED */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 207, 232, 0.8), rgba(251, 191, 36, 0.4) 50%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1] 
                }}
                transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Dog on right side - WITH WRAPPER FOR CENTERED EFFECTS */}
            <div className="absolute right-[26%] top-1/2 translate-x-1/2 -translate-y-1/2">
              {/* HEARTBEAT effect from dog - PERFECTLY CENTERED */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`heartbeat-dog-${i}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-pink-400 z-8"
                  style={{ width: '100px', height: '100px' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 2.5, 3.5]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 1.2 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              ))}
              
              {/* Dog emoji - centered in wrapper */}
              <motion.div
                className="text-6xl z-30"
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  rotate: [0, -10, 10, -10, 10, -8, 8, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  opacity: { duration: 0.6 },
                  x: { duration: 0.6 },
                  rotate: { duration: 1.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 1, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                🐕
              </motion.div>
              
              {/* Glowing aura around dog - PERFECTLY CENTERED */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 207, 232, 0.8), rgba(251, 191, 36, 0.4) 50%, transparent 70%)',
                  filter: 'blur(35px)'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1] 
                }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            
            {/* Tail wagging excitement - MORE INTENSE */}
            <motion.div
              className="absolute right-[30%] top-[45%] text-4xl z-25"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.5, 1],
                rotate: [0, 25, -25, 0],
                x: [0, 5, -5, 0]
              }}
              transition={{
                duration: 0.4,
                delay: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💝
            </motion.div>

            {/* MORE tail wag hearts */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wag-heart-${i}`}
                className="absolute right-[30%] top-[45%] text-3xl z-24"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  x: (Math.random() - 0.5) * 60,
                  y: -30 - Math.random() * 30,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              >
                💕
              </motion.div>
            ))}

            {/* Eye contact line - connection forming - PULSING */}
            <motion.svg
              className="absolute left-[25%] top-1/2 -translate-y-1/2 z-20"
              width="600"
              height="20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.line
                x1="0"
                y1="10"
                x2="600"
                y2="10"
                stroke="#ec4899"
                strokeWidth="6"
                strokeDasharray="10 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.svg>

            {/* Multiple connection lines - ENERGY FLOWING */}
            {[...Array(4)].map((_, i) => (
              <motion.svg
                key={`connect-line-${i}`}
                className="absolute left-[25%] top-1/2 -translate-y-1/2 z-19"
                width="600"
                height="20"
                style={{ top: `${50 + (i - 2) * 3}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ 
                  duration: 2,
                  delay: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <motion.line
                  x1="0"
                  y1="10"
                  x2="600"
                  y2="10"
                  stroke="#f472b6"
                  strokeWidth="3"
                  strokeDasharray="5 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ 
                    duration: 2.5,
                    delay: 1.5 + i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </motion.svg>
            ))}

            {/* GIANT LOVE AURA connecting them both */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 rounded-full z-5"
              style={{
                background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.3), rgba(251, 207, 232, 0.2) 40%, transparent 70%)',
                filter: 'blur(60px)'
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: [0, 0.8, 0.5, 0.8],
                scale: [0.3, 1, 1.1, 1] 
              }}
              transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Small indicator: "At Adoption Center" - TOP instead of bottom */}
            <motion.div
              className="absolute top-[12%] left-1/2 -translate-x-1/2 z-35"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-blue-500 px-8 py-3 rounded-xl border-4 border-blue-700 shadow-lg">
                <p className="text-2xl font-bold text-white">
                  🏥 At the Adoption Center 🏥
                </p>
              </div>
            </motion.div>

            {/* Soft hearts floating between them - MORE HEARTS, MORE LOVE */}
            {stage === 'meeting' && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`soft-heart-${i}`}
                    className="absolute left-1/2 top-[45%] -translate-x-1/2 text-4xl z-15"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.9, 0],
                      scale: [0, 1.2, 0.9],
                      x: (Math.random() - 0.5) * 120,
                      y: [-20, -80],
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 1 + i * 0.15,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  >
                    {['💕', '💖', '💗', '💝'][i % 4]}
                  </motion.div>
                ))}

                {/* Sparkles of destiny - TWINKLING */}
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={`destiny-sparkle-${i}`}
                    className="absolute w-2 h-2 rounded-full z-18"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${35 + Math.random() * 30}%`,
                      background: 'radial-gradient(circle, #fbbf24, #fff)',
                      boxShadow: '0 0 10px rgba(251, 191, 36, 0.9)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0.5, 1, 0],
                      scale: [0, 1.5, 1, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.5 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                ))}

                {/* Words of love appearing */}
                {['MEANT', 'TO', 'BE'].map((word, i) => (
                  <motion.div
                    key={`word-${i}`}
                    className="absolute left-1/2 -translate-x-1/2 text-2xl font-black text-pink-600 z-16"
                    style={{ 
                      top: `${30 + i * 8}%`,
                      textShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 2px 10px rgba(0,0,0,0.3)'
                    }}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{
                      opacity: [0, 1, 0.8, 0],
                      scale: [0, 1.2, 1, 0.8],
                      y: [20, 0, -10, -30]
                    }}
                    transition={{
                      duration: 3,
                      delay: 1.8 + i * 0.4,
                      ease: 'easeOut'
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </>
            )}

            {/* Hearts appearing between them - CONNECTION STAGE */}
            {stage === 'connection' && (
              <>
                {/* "IT'S LOVE!" - 40% SMALLER */}
                <motion.div
                  className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-40"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
                >
                  <div className="bg-pink-500 px-7 py-3 rounded-2xl border-6 border-pink-700 shadow-2xl">
                    <h3 className="text-3xl md:text-4xl font-black text-white">
                      IT'S LOVE! 💕✨
                    </h3>
                  </div>
                </motion.div>

                {/* Massive heart burst */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`heart-${i}`}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl z-15"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.2, 1, 0.8],
                      x: (Math.random() - 0.5) * 250,
                      y: -50 - Math.random() * 120,
                      rotate: Math.random() * 360
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      ease: 'easeOut'
                    }}
                  >
                    {['❤️', '💕', '💖', '💗', '💝'][i % 5]}
                  </motion.div>
                ))}

                {/* Connection sparkles */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 2, 2.5, 3]
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <div className="text-8xl">✨</div>
                </motion.div>

                {/* Rainbow sparkles around the connection */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full z-20"
                    style={{
                      background: ['#ff0080', '#00ff80', '#0080ff', '#ff80ff', '#ffff00'][i % 5],
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0],
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: WALKING HOME TOGETHER */}
      <AnimatePresence>
        {stage === 'home' && (
          <>
            {/* Simple outdoor scene */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-300" />
            
            {/* House in distance - MUCH BIGGER, WARM, INVITING - ON THE GROUND */}
            <motion.div
              className="absolute right-[10%] bottom-[12%] text-[18rem] z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              🏡
            </motion.div>

            {/* Warm glow from house - BIGGER GLOW */}
            <motion.div
              className="absolute right-[10%] bottom-[12%] w-80 h-80 rounded-full z-10"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.7), rgba(251, 146, 60, 0.4) 50%, transparent 70%)',
                filter: 'blur(50px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Person walking with dog on leash */}
            <motion.div
              className="absolute bottom-[22%]"
              style={{ transform: 'scaleX(-1)' }} // ✅ FACING RIGHT toward home
              initial={{ left: '10%' }}
              animate={{ left: '55%' }}
              transition={{ duration: 2.5, ease: 'linear' }}
            >
              <div className="relative">
                {/* Person */}
                <div className="text-7xl inline-block">
                  <motion.div
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  >
                    🚶
                  </motion.div>
                </div>
                
                {/* Leash - curved line - STARTS AT HAND LEVEL */}
                <svg 
                  className="absolute left-14 top-10" 
                  width="40" 
                  height="40"
                  style={{ overflow: 'visible' }}
                >
                  <motion.path
                    d="M 0 0 Q 18 10, 32 2"
                    stroke="#8B4513"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: ['M 0 0 Q 18 10, 32 2', 'M 0 0 Q 18 7, 32 2', 'M 0 0 Q 18 10, 32 2']
                    }}
                    transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>

                {/* Dog - SMALLER, proper pet size, SAME BASELINE AS PERSON */}
                <div className="absolute left-[84px] top-[12px] text-5xl">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5], y: [-2, 2, -2] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  >
                    🐕
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* "GOING HOME TOGETHER!" - SMALLER TO AVOID TREE */}
            <motion.div
              className="absolute top-[20%] left-1/2 -translate-x-1/2 z-40"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-green-500 px-4 py-2 rounded-xl border-4 border-green-700 shadow-2xl">
                <h3 className="text-xl md:text-2xl font-black text-white">
                  GOING HOME TOGETHER! 🏡
                </h3>
              </div>
            </motion.div>

            {/* Happy particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${40 + Math.random() * 40}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.8],
                  y: -40
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              >
                {['🌟', '✨', '💫'][i % 3]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 5: HAPPY TOGETHER AT HOME */}
      <AnimatePresence>
        {stage === 'together' && (
          <>
            {/* Home interior background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-orange-100" />

            {/* Person and dog together - happy */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative flex items-center gap-6">
                {/* Person */}
                <motion.div
                  className="text-9xl"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  😊
                </motion.div>

                {/* Dog - SMALLER */}
                <motion.div
                  className="text-7xl"
                  animate={{ 
                    rotate: [-5, 5, -5],
                    y: [-5, 5, -5]
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🐕
                </motion.div>
              </div>
            </motion.div>

            {/* Photo frames appearing on wall - showing memories */}
            {[
              { emoji: '📸', pos: { left: '15%', top: '20%' }, label: 'First Day!' },
              { emoji: '🖼️', pos: { right: '15%', top: '20%' }, label: 'Best Friends' },
              { emoji: '🎨', pos: { left: '10%', top: '45%' }, label: 'Adventures' }
            ].map((frame, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={frame.pos}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + i * 0.2,
                  type: 'spring',
                  bounce: 0.6
                }}
              >
                <div className="relative">
                  <div className="text-7xl">{frame.emoji}</div>
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded-lg border-2 border-amber-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.2 }}
                  >
                    {frame.label}
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Pet supplies */}
            <motion.div
              className="absolute right-[12%] bottom-[35%] text-6xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              🥣
            </motion.div>
            <motion.div
              className="absolute left-[18%] bottom-[30%] text-5xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              🎾
            </motion.div>

            {/* Floating hearts */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`heart-float-${i}`}
                className="absolute text-4xl"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${60 + Math.random() * 30}%`
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: -100,
                  scale: [0.5, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }}
              >
                💕
              </motion.div>
            ))}

            {/* "A FAMILY NOW!" */}
            <motion.div
              className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="bg-amber-500 px-10 py-5 rounded-2xl border-6 border-amber-700 shadow-2xl">
                <h3 className="text-4xl md:text-5xl font-black text-white">
                  NOW A FAMILY! 🏡❤️
                </h3>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FINALE: A PERFECT MATCH */}
      <AnimatePresence>
        {stage === 'finale' && (
          <>
            {/* Radiant background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 80%)',
                filter: 'blur(100px)'
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 1.5 }}
            />

            {/* Massive heart burst */}
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 180 + Math.random() * 250;
              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{ fontSize: `${2.5 + Math.random() * 2}rem` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8],
                    scale: [0, 1.3, 1],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    rotate: Math.random() * 720
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.015,
                    ease: 'easeOut'
                  }}
                >
                  {['❤️', '💕', '💖', '💗', '💝', '🐾'][Math.floor(Math.random() * 6)]}
                </motion.div>
              );
            })}

            {/* GIANT "A PERFECT MATCH!" */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.5 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-black text-rose-600 mb-6 text-center px-4"
                style={{
                  textShadow: '0 0 60px rgba(225, 29, 72, 0.9), 0 8px 32px rgba(0,0,0,0.4)'
                }}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                A PERFECT MATCH!
              </motion.h1>
              
              <motion.div
                className="text-8xl flex gap-4"
                animate={{
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <span>👤</span>
                <span>❤️</span>
                <span>🐕</span>
              </motion.div>
            </motion.div>

            {/* Sparkles everywhere */}
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'radial-gradient(circle, #fff, #fbbf24)',
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.9)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-white z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}