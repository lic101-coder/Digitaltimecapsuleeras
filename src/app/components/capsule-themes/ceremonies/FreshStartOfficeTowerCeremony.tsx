/**
 * Fresh Start - Office Tower Ascension Ceremony
 * 
 * 
 * Scene Flow:
 * 1. "Threshold of Giants" (0-2.5s) - Person looking up at massive tower
 * 2. "The Ascension" (2.5-7s) - Epic elevator ride with confidence building
 * 3. "The Golden Arrival" (7-9.5s) - Doors explode open with confetti
 * 4. "Welcome Integration" (9.5-11.5s) - Team greets, coffee, gifts
 * 5. "At My Desk" (11.5-13.5s) - Nameplate materializes, computer sparkles
 * FINALE: "The Empire Below" (13.5-15s) - Aerial city, glowing window, YOUR JOURNEY BEGINS!
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartOfficeTowerCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function FreshStartOfficeTowerCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: FreshStartOfficeTowerCeremonyProps) {
  const [stage, setStage] = useState<'title' | 'threshold' | 'ascension' | 'arrival' | 'welcome' | 'desk' | 'finale' | 'outro'>('title');
  const [floor, setFloor] = useState(1);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('title') },
      { time: 1000, action: () => setStage('threshold') },
      { time: 3500, action: () => setStage('ascension') },
      { time: 8000, action: () => setStage('arrival') },
      { time: 10500, action: () => setStage('welcome') },
      { time: 12500, action: () => setStage('desk') },
      { time: 14500, action: () => setStage('finale') },
      { time: 16000, action: () => setStage('outro') },
      { time: 17000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Elevator floor counter animation
  useEffect(() => {
    if (stage === 'ascension') {
      let currentFloor = 1;
      const interval = setInterval(() => {
        currentFloor += Math.floor(Math.random() * 3) + 1;
        if (currentFloor <= 52) {
          setFloor(currentFloor);
        } else {
          setFloor(52);
          clearInterval(interval);
        }
      }, 100); // Counter updates every 100ms continuously

      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-800 via-blue-900 to-slate-900">
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
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 drop-shadow-2xl text-center px-8">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 1: THRESHOLD OF GIANTS (0-2.5s) */}
      <AnimatePresence>
        {stage === 'threshold' && (
          <>
            {/* Morning sky */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-200 to-sky-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* MASSIVE office tower - extends beyond screen */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-64 bg-gradient-to-b from-slate-600 via-blue-800 to-slate-900 rounded-t-3xl border-4 border-blue-600 shadow-2xl"
              style={{ height: '120%' }}
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring', damping: 15 }}
            >
              {/* Glass reflection shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  x: [-50, 50]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Windows grid - properly positioned with margins */}
              {[...Array(60)].map((_, i) => {
                const col = i % 5; // 5 columns
                const row = Math.floor(i / 5); // 12 rows
                const windowWidth = 8; // percentage
                const windowHeight = 3; // percentage
                const marginLeft = 12; // left edge margin %
                const marginRight = 12; // right edge margin %
                const availableWidth = 100 - marginLeft - marginRight; // 76%
                const horizontalSpacing = availableWidth / 5; // space per column
                const verticalSpacing = 6; // space between rows
                const topMargin = 8; // top margin %
                
                return (
                  <motion.div
                    key={`window-${i}`}
                    className="absolute w-2 h-3 bg-sky-200 rounded-sm"
                    style={{
                      left: `${marginLeft + col * horizontalSpacing + (horizontalSpacing - windowWidth) / 2}%`,
                      top: `${topMargin + row * verticalSpacing}%`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.8] }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }}
                  />
                );
              })}

              {/* Company logo at top */}
              <motion.div
                className="absolute top-[3%] left-1/2 -translate-x-1/2 text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2, type: 'spring' }}
              >
                🏢
              </motion.div>
            </motion.div>

            {/* Building name sign */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[45%] bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-2 rounded-lg border-2 border-blue-400 shadow-xl z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
            >
              <span className="text-sm font-bold text-white">YOUR NEW COMPANY</span>
            </motion.div>

            {/* "Your Journey Begins Here" label */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[8%] bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 rounded-full border-2 border-white shadow-2xl"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 1, type: 'spring', damping: 10 }}
            >
              <span className="text-xl font-black text-white drop-shadow-lg">Your Journey Begins Here 🚀</span>
            </motion.div>

            {/* Person at ground level - small, looking up in awe */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[10%] text-6xl z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🧑‍💼
              </motion.div>

              {/* Briefcase */}
              <div className="absolute -right-8 bottom-0 text-3xl">💼</div>

              {/* Reflection in the glass */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -top-2 text-2xl opacity-20"
                animate={{
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >
                🧑‍💼
              </motion.div>
            </motion.div>

            {/* Nervous energy aura */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 70%)',
                filter: 'blur(25px)'
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />

            {/* Thought bubble with text */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[25%] bg-white rounded-2xl px-4 py-2 border-4 border-slate-300 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1], scale: [0, 1.1, 1] }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span className="text-lg font-bold text-slate-700">Today's the day!</span>
              
              {/* Thought bubble tail */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white" />
            </motion.div>

            {/* Heart beat anticipation */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`heartbeat-${i}`}
                className="absolute left-1/2 -translate-x-1/2 bottom-[12%] text-2xl"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.3, 1.5],
                  y: [0, -10, -20]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                💓
              </motion.div>
            ))}

            {/* Sun rays */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute left-[20%] top-[10%] w-1 h-32 bg-gradient-to-b from-yellow-200 to-transparent origin-top"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                  opacity: 0.3
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 2: THE ASCENSION (2.5-7s) */}
      <AnimatePresence>
        {stage === 'ascension' && (
          <>
            {/* Elevator interior */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Elevator walls */}
            <div className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-slate-500 to-slate-700" />
            <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-slate-500 to-slate-700" />

            {/* Person in elevator - confidence building */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[30%] text-8xl z-20"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              🧑‍💼
            </motion.div>

            {/* FLOOR DISPLAY - Epic counter */}
            <motion.div
              className="absolute top-[10%] right-[20%] w-24 h-16 bg-slate-900 rounded border-4 border-amber-500 flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)'
              }}
            >
              <motion.div
                className="text-4xl font-black text-amber-400"
                key={floor}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                {floor}
              </motion.div>
            </motion.div>

            {/* Confidence aura - growing */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[30%] rounded-full pointer-events-none"
              style={{
                width: `${100 + (floor / 52) * 100}px`,
                height: `${100 + (floor / 52) * 100}px`,
                background: `radial-gradient(circle, rgba(251, 191, 36, ${0.2 + (floor / 52) * 0.4}), transparent 70%)`,
                filter: 'blur(30px)'
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />

            {/* Speed lines */}
            {floor > 25 && [...Array(20)].map((_, i) => (
              <motion.div
                key={`speed-${i}`}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  repeat: Infinity
                }}
              />
            ))}

            {/* Confidence particles rising */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`conf-${i}`}
                className="absolute w-1 h-1 rounded-full bg-amber-400"
                style={{
                  left: `${45 + Math.random() * 10}%`,
                  bottom: '25%'
                }}
                animate={{
                  y: [0, -200],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* DING on arrival */}
            {floor === 52 && (
              <motion.div
                className="absolute top-[10%] left-1/2 -translate-x-1/2 text-6xl"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.5 }}
              >
                🔔
                
                {/* Sound wave */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-amber-400"
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 3: THE GOLDEN ARRIVAL (7-9.5s) */}
      <AnimatePresence>
        {stage === 'arrival' && (
          <>
            {/* Bright office background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-200 via-orange-100 to-yellow-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* GOLDEN LIGHT EXPLOSION from elevator doors */}
            <motion.div
              className="absolute inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{ duration: 1 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.8), transparent 60%)'
              }}
            />

            {/* CONFETTI EXPLOSION */}
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-3 h-3 z-50"
                style={{
                  left: '50%',
                  top: '50%',
                  background: ['#fbbf24', '#f59e0b', '#ffffff', '#fb923c'][i % 4],
                  borderRadius: i % 3 === 0 ? '50%' : '0'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.8],
                  opacity: [0, 1, 0.7],
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 400 - 100,
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.005,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Welcome team */}
            {[
              { x: -30, emoji: '👨‍💼', delay: 0.5 },
              { x: -15, emoji: '👩‍💻', delay: 0.6 },
              { x: 0, emoji: '🧑‍💼', delay: 0.7 },
              { x: 15, emoji: '👨‍💻', delay: 0.8 },
              { x: 30, emoji: '👩‍💼', delay: 0.9 }
            ].map((person, i) => (
              <motion.div
                key={`team-${i}`}
                className="absolute bottom-[25%] text-5xl z-30"
                style={{ left: `calc(50% + ${person.x}%)`, transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: person.delay }}
              >
                {person.emoji}
                
                {/* Clapping animation */}
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, delay: person.delay + 0.5, repeat: Infinity }}
                >
                  👏
                </motion.div>
              </motion.div>
            ))}

            {/* "WELCOME TO THE TEAM!" banner */}
            <motion.div
              className="absolute top-[15%] left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-lg border-4 border-blue-700 shadow-2xl z-40"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.5 }}
            >
              <h2 className="text-2xl md:text-4xl font-black text-white text-center">
                WELCOME TO THE TEAM!
              </h2>
            </motion.div>

            {/* Balloons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`balloon-${i}`}
                className="absolute text-4xl z-20"
                style={{
                  left: `${20 + i * 10}%`,
                  bottom: '5%'
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: 1
                }}
                transition={{
                  duration: 3,
                  delay: 0.8 + i * 0.1,
                  repeat: Infinity
                }}
              >
                {['🎈', '🎉', '🎊'][i % 3]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 4: WELCOME INTEGRATION (9.5-11.5s) */}
      <AnimatePresence>
        {stage === 'welcome' && (
          <>
            <motion.div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-orange-50" />

            {/* Coffee handoff */}
            <motion.div
              className="absolute left-[40%] top-1/2 -translate-y-1/2 flex items-center gap-8 z-20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-7xl">👨‍💼</div>
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                ☕
              </motion.div>
              <div className="text-7xl">😊</div>
            </motion.div>

            {/* Hearts floating up */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  bottom: '20%'
                }}
                animate={{
                  y: [0, -200],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  ease: 'easeOut'
                }}
              >
                💖
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 5: AT MY DESK (11.5-13.5s) */}
      <AnimatePresence>
        {stage === 'desk' && (
          <>
            <motion.div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-blue-50" />

            {/* Desk */}
            <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-3xl shadow-2xl" />

            {/* Person at desk */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[30%] text-7xl z-20">
              🧑‍💻
            </div>

            {/* NAMEPLATE MATERIALIZATION */}
            <motion.div
              className="absolute left-[30%] bottom-[25%] z-30"
            >
              {/* Gathering particles */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={`gather-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-amber-400"
                  initial={{
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    opacity: 0
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.01
                  }}
                />
              ))}

              {/* Nameplate appears */}
              <motion.div
                className="relative bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-2 rounded border-2 border-amber-700 shadow-xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
              >
                <div className="text-sm font-bold text-amber-900">YOUR NAME</div>
                <div className="text-xs text-amber-800">New Team Member</div>

                {/* Light rays burst */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`nameray-${i}`}
                    className="absolute left-1/2 top-1/2 w-1 h-24 bg-gradient-to-t from-amber-400 to-transparent origin-bottom"
                    style={{ transform: `rotate(${i * 45}deg) translateX(-50%)` }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.05 }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Computer monitor */}
            <motion.div
              className="absolute left-[60%] bottom-[25%] w-32 h-24 bg-slate-800 rounded border-4 border-slate-700 z-20 overflow-hidden"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {/* Screen with sparkle cascade */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />

              {/* Sparkles cascading down */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`screen-sparkle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  style={{
                    left: `${(i % 10) * 10}%`,
                    top: '-5%'
                  }}
                  animate={{
                    y: [0, 120],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.2 + (i % 10) * 0.1,
                    ease: 'linear'
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FINALE: THE EMPIRE BELOW (13.5-15s) */}
      <AnimatePresence>
        {stage === 'finale' && (
          <>
            {/* Sky - golden hour */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-orange-300 via-pink-200 to-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* City buildings below */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`city-building-${i}`}
                className="absolute bottom-0 bg-gradient-to-b from-slate-500 to-slate-800 opacity-50"
                style={{
                  left: `${i * 8}%`,
                  width: '8%',
                  height: `${150 + Math.random() * 100}px`,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px'
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.03 }}
              />
            ))}

            {/* THE HERO BUILDING - Center, glowing */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[12%] h-[280px] bg-gradient-to-b from-amber-400 to-orange-600 rounded-t-lg border-4 border-amber-500 z-20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                boxShadow: '0 0 60px rgba(251, 191, 36, 0.9)'
              }}
            >
              {/* Windows */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`hero-window-${i}`}
                  className="absolute w-2 h-3 bg-yellow-200/80 rounded-sm"
                  style={{
                    left: `${25 + (i % 3) * 25}%`,
                    top: `${15 + Math.floor(i / 3) * 10}%`
                  }}
                />
              ))}

              {/* THE GLOWING WINDOW */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[40%] w-6 h-6 rounded-sm"
                style={{
                  background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 1)'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                {/* Light rays */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`window-ray-${i}`}
                    className="absolute left-1/2 top-1/2 w-0.5 h-16 bg-gradient-to-t from-yellow-300 to-transparent origin-bottom"
                    style={{ transform: `rotate(${i * 45}deg) translateX(-50%)` }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scaleY: [1, 1.4, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Divine light beam from sky */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-full bg-gradient-to-b from-yellow-200/40 via-yellow-300/20 to-transparent"
              style={{ filter: 'blur(20px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.6] }}
              transition={{ duration: 1.5 }}
            />

            {/* "YOUR JOURNEY BEGINS!" text */}
            <motion.div
              className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center z-50"
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  textShadow: '0 0 30px rgba(251, 191, 36, 0.8)',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                YOUR JOURNEY BEGINS!
              </motion.h1>
            </motion.div>

            {/* Celebration confetti */}
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={`final-confetti-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '15%',
                  background: ['#fbbf24', '#f59e0b', '#fb923c', '#ffffff'][i % 4]
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.6],
                  x: (Math.random() - 0.5) * 500,
                  y: Math.random() * 400 + 100,
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.8 + i * 0.01,
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