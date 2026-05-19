/**
 * Fresh Start - Digital Avatar Boot-Up Ceremony
 * 
 * 
 * Scene Flow:
 * 1. "Home Office Sanctuary" (0-2.5s) - Cozy pajamas, coffee steam, laptop
 * 2. "Boot Sequence" (2.5-6s) - Dark terminal background, falling Matrix code
 * 3. "Avatar Materialization" (6-9s) - Pixelation to smooth avatar
 * 4. "The Welcome Matrix" (9-12s) - Video grid, chat messages flood
 * 5. "Digital Workspace Expands" (12-14.5s) - Monitors appear, productivity
 * FINALE: "Dual Reality Harmony" (14.5-15s) - Split screen real/virtual
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartDigitalAvatarCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function FreshStartDigitalAvatarCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: FreshStartDigitalAvatarCeremonyProps) {
  const [stage, setStage] = useState<'title' | 'homeoffice' | 'bootsequence' | 'avatar' | 'welcome' | 'workspace' | 'dualreality' | 'outro'>('title');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('title') },
      { time: 1000, action: () => setStage('homeoffice') },
      { time: 3500, action: () => setStage('bootsequence') },
      { time: 6000, action: () => setStage('avatar') },
      { time: 9000, action: () => setStage('welcome') },
      { time: 12000, action: () => setStage('workspace') },
      { time: 14500, action: () => setStage('dualreality') },
      { time: 16000, action: () => setStage('outro') },
      { time: 17000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-900 to-purple-900">
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
            <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-2xl text-center px-8">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 1: HOME OFFICE SANCTUARY (0-2.5s) */}
      <AnimatePresence>
        {stage === 'homeoffice' && (
          <>
            {/* Cozy room background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-amber-100 to-orange-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* "Good Morning, Remote Life Begins" label */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 rounded-full border-2 border-white shadow-2xl"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring', damping: 10 }}
            >
              <span className="text-xl font-black text-white drop-shadow-lg">Good Morning, Remote Life Begins ☕</span>
            </motion.div>

            {/* Window with morning light */}
            <div className="absolute right-[10%] top-[15%] w-32 h-40 bg-gradient-to-br from-sky-200 to-blue-300 rounded-lg border-4 border-amber-800 opacity-80" />

            {/* Desk */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-3xl shadow-2xl" />

            {/* Person in pajamas */}
            <motion.div
              className="absolute left-1/2 bottom-[35%] -translate-x-1/2 text-8xl z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              🧑‍💻
            </motion.div>

            {/* Coffee mug with steam */}
            <motion.div
              className="absolute left-[35%] bottom-[30%] text-6xl z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ☕
              
              {/* Enhanced steam particles with varied speeds */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`steam-${i}`}
                  className="absolute left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: 3 + Math.random() * 2,
                    height: 3 + Math.random() * 2,
                    bottom: '100%',
                    backgroundColor: `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${255}, ${0.4 + Math.random() * 0.3})`
                  }}
                  animate={{
                    y: [-5, -35 - Math.random() * 20],
                    x: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 25],
                    opacity: [0.6, 0.4, 0],
                    scale: [0.8, 1.3 + Math.random() * 0.5, 2]
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeOut'
                  }}
                />
              ))}

              {/* Coffee warmth glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 70%)',
                  filter: 'blur(15px)'
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Laptop (closed, about to open) with better animation */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-[25%] w-48 h-32 bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg border-4 border-slate-700 shadow-xl z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Screen about to glow */}
              <motion.div
                className="absolute inset-2 bg-slate-900 rounded"
                animate={{
                  boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 20px rgba(59, 130, 246, 0.3)']
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5
                }}
              />
            </motion.div>

            {/* Ambient morning dust motes */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 rounded-full bg-yellow-200/40"
                style={{
                  right: `${15 + Math.random() * 20}%`,
                  top: `${20 + Math.random() * 40}%`
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -30, 0],
                  x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 2: BOOT SEQUENCE (2.5-6s) */}
      <AnimatePresence>
        {stage === 'bootsequence' && (
          <>
            {/* Dark terminal background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* "Initializing Your Digital Presence..." label */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full border-2 border-cyan-300 shadow-2xl z-50"
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', damping: 10 }}
            >
              <span className="text-xl font-black text-white drop-shadow-lg">Initializing Your Digital Presence... 🔌</span>
            </motion.div>

            {/* Falling Matrix code */}
            {[...Array(50)].map((_, col) => (
              <div
                key={`matrix-col-${col}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${(col * 2)}%`,
                  width: '2%'
                }}
              >
                {[...Array(20)].map((_, char) => (
                  <motion.div
                    key={`char-${char}`}
                    className="absolute text-sm font-mono font-bold"
                    style={{
                      top: `${char * 5}%`,
                      left: 0,
                      color: char === 0 ? '#00ff41' : `rgba(0, 255, 65, ${1 - char * 0.05})`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0.3],
                      y: ['0%', '500%']
                    }}
                    transition={{
                      duration: 2,
                      delay: col * 0.02 + char * 0.05,
                      ease: 'linear'
                    }}
                  >
                    {['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ'][Math.floor(Math.random() * 10)]}
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Hidden messages in code */}
            <motion.div
              className="absolute left-1/2 top-[30%] -translate-x-1/2 text-xl font-mono font-bold text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              WELCOME
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-[50%] -translate-x-1/2 text-xl font-mono font-bold text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              INITIALIZE
            </motion.div>

            {/* Screen glow on face */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-green-500/10 to-transparent pointer-events-none"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* SCENE 3: AVATAR MATERIALIZATION (6-9s) */}
      <AnimatePresence>
        {stage === 'avatar' && (
          <>
            {/* Virtual space background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-purple-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Grid floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[50%] opacity-30">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`grid-h-${i}`}
                  className="absolute left-0 right-0 border-b border-cyan-400/30"
                  style={{ bottom: `${i * 10}%` }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <div
                  key={`grid-v-${i}`}
                  className="absolute top-0 bottom-0 border-r border-cyan-400/30"
                  style={{ left: `${i * 5}%` }}
                />
              ))}
            </div>

            {/* Avatar materializing - pixelation phases */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {/* Phase 1: Chunky pixels (0-1.2s) */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: [1, 0], scale: [1, 1.1] }}
                transition={{ duration: 1.2 }}
              >
                <div className="grid grid-cols-8 grid-rows-8 gap-1">
                  {[...Array(64)].map((_, i) => (
                    <motion.div
                      key={`pixel-${i}`}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background: i % 3 === 0 ? '#3b82f6' : i % 2 === 0 ? '#8b5cf6' : '#60a5fa'
                      }}
                      animate={{
                        opacity: [0, 1],
                        scale: [0, 1, 1]
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.01
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Phase 2: Higher resolution (1.2s+) */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ 
                  opacity: [0, 1],
                  filter: ['blur(10px)', 'blur(0px)']
                }}
                transition={{ duration: 1.5, delay: 1.2 }}
              >
                🧑‍💼
              </motion.div>

              {/* Materialization particles */}
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={`materialize-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    background: i % 2 === 0 ? '#00ffff' : '#ff00ff'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.01,
                    ease: 'easeOut'
                  }}
                />
              ))}

              {/* Completion burst */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-cyan-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 2, 3] }}
                transition={{ duration: 1, delay: 2.5 }}
              />
            </motion.div>

            {/* Floating geometric shapes */}
            {[
              { x: 20, y: 20, size: 40, delay: 0.5 },
              { x: 80, y: 30, size: 30, delay: 0.8 },
              { x: 15, y: 70, size: 35, delay: 1.1 }
            ].map((shape, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute border-2 border-magenta-400/50 rounded"
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: shape.size,
                  height: shape.size
                }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.5, 0.5],
                  rotate: 360,
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 3,
                  delay: shape.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 4: THE WELCOME MATRIX (9-12s) */}
      <AnimatePresence>
        {stage === 'welcome' && (
          <>
            {/* Virtual space maintained */}
            <motion.div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-purple-950" />

            {/* Grid floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[50%] opacity-20">
              {[...Array(10)].map((_, i) => (
                <div key={`grid-h2-${i}`} className="absolute left-0 right-0 border-b border-cyan-400/30" style={{ bottom: `${i * 10}%` }} />
              ))}
            </div>

            {/* Avatar center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl z-20">
              🧑‍💼
            </div>

            {/* Video call grid appearing around avatar */}
            {[
              { x: -25, y: -20, emoji: '👨‍💼', delay: 0.2 },
              { x: 0, y: -25, emoji: '👩‍💻', delay: 0.35 },
              { x: 25, y: -20, emoji: '🧑‍💼', delay: 0.5 },
              { x: -25, y: 20, emoji: '👨‍💻', delay: 0.65 },
              { x: 0, y: 25, emoji: '👩‍💼', delay: 0.8 },
              { x: 25, y: 20, emoji: '🧑‍💻', delay: 0.95 }
            ].map((coworker, i) => (
              <motion.div
                key={`coworker-${i}`}
                className="absolute w-20 h-20 bg-gradient-to-br from-cyan-900 to-purple-900 rounded-lg border-2 border-cyan-400 flex items-center justify-center shadow-xl"
                style={{
                  left: `calc(50% + ${coworker.x}%)`,
                  top: `calc(50% + ${coworker.y}%)`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0, rotateY: 90 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0
                }}
                transition={{
                  duration: 0.5,
                  delay: coworker.delay,
                  type: 'spring'
                }}
              >
                <motion.div
                  className="text-3xl"
                  animate={i % 2 === 0 ? { rotate: [-10, 10, -10] } : { scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: coworker.delay + 0.5
                  }}
                >
                  {coworker.emoji}
                </motion.div>

                {/* Sparkle on appear */}
                <motion.div
                  className="absolute -top-2 -right-2 text-xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                  transition={{ duration: 0.6, delay: coworker.delay + 0.2 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            ))}

            {/* Chat messages panel */}
            <motion.div
              className="absolute right-[5%] top-1/2 -translate-y-1/2 w-64 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border-2 border-cyan-400 shadow-2xl overflow-hidden p-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="text-cyan-400 font-bold mb-2 text-sm">Team Chat</div>
              
              {/* Messages flooding in */}
              {[
                { text: 'Welcome! 🎉', delay: 0.7 },
                { text: 'So excited! 💪', delay: 1.0 },
                { text: 'Let\'s do this! 🙌', delay: 1.3 },
                { text: 'Coffee soon? ☕', delay: 1.6 }
              ].map((msg, i) => (
                <motion.div
                  key={`msg-${i}`}
                  className="bg-purple-800/50 rounded px-2 py-1 mb-2 text-xs text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: msg.delay }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </motion.div>

            {/* Connection lines */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute left-1/2 top-1/2 w-px h-24 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"
                style={{
                  transform: `rotate(${i * 60}deg)`
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.5], scaleY: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 5: DIGITAL WORKSPACE EXPANDS (12-14.5s) */}
      <AnimatePresence>
        {stage === 'workspace' && (
          <>
            <motion.div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-900 to-purple-950" />

            {/* Avatar at desk */}
            <div className="absolute left-1/2 bottom-[35%] -translate-x-1/2 text-6xl z-20">
              🧑‍💻
            </div>

            {/* Virtual desk */}
            <motion.div
              className="absolute left-1/2 bottom-[25%] -translate-x-1/2 w-96 h-4 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Three floating monitors */}
            {[
              { x: -40, scale: 0.9, delay: 0.3, content: '📊', label: 'Dashboard' },
              { x: 0, scale: 1.1, delay: 0.5, content: '💻', label: 'Code Editor' },
              { x: 40, scale: 0.9, delay: 0.7, content: '💬', label: 'Messages' }
            ].map((monitor, i) => (
              <motion.div
                key={`monitor-${i}`}
                className="absolute left-1/2 top-[30%] -translate-x-1/2 w-32 h-24 bg-gradient-to-br from-cyan-900/50 to-purple-900/50 rounded-lg border-2 border-cyan-400/50 shadow-2xl flex flex-col items-center justify-center"
                style={{
                  marginLeft: `${monitor.x}%`,
                  transform: `translate(-50%, -50%) scale(${monitor.scale})`
                }}
                initial={{ opacity: 0, y: -50, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: monitor.delay, type: 'spring' }}
              >
                <div className="text-4xl mb-1">{monitor.content}</div>
                <div className="text-xs text-cyan-300">{monitor.label}</div>

                {/* Screen activity lines */}
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={`activity-${j}`}
                    className="absolute left-2 right-2 h-0.5 bg-cyan-400/50 rounded"
                    style={{ top: `${40 + j * 15}%` }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scaleX: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: monitor.delay + j * 0.2,
                      repeat: Infinity
                    }}
                  />
                ))}
              </motion.div>
            ))}

            {/* Productivity particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`prod-${i}`}
                className="absolute w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  left: '50%',
                  top: '35%'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -50 - Math.random() * 50],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150]
                }}
                transition={{
                  duration: 2,
                  delay: 1 + i * 0.05,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* FINALE: DUAL REALITY HARMONY (14.5-15s) */}
      <AnimatePresence>
        {stage === 'dualreality' && (
          <>
            {/* Split screen divider */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-magenta-400 to-cyan-400 z-30"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* LEFT SIDE: Real World */}
            <div className="absolute left-0 top-0 bottom-0 right-1/2 bg-gradient-to-b from-amber-100 to-orange-50">
              {/* Person at home desk */}
              <div className="absolute left-1/2 bottom-[35%] -translate-x-1/2 text-6xl">
                🧑‍💻
              </div>
              
              {/* Laptop */}
              <div className="absolute left-1/2 bottom-[25%] -translate-x-1/2 w-24 h-16 bg-slate-700 rounded border-2 border-slate-600" />
              
              {/* Coffee */}
              <div className="absolute left-[30%] bottom-[30%] text-3xl">☕</div>
              
              {/* String lights ON (success!) */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`light-${i}`}
                  className="absolute top-[10%] w-2 h-2 rounded-full bg-yellow-400"
                  style={{
                    left: `${30 + i * 10}%`,
                    boxShadow: '0 0 10px rgba(250, 204, 21, 0.8)'
                  }}
                  animate={{
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Label */}
              <motion.div
                className="absolute top-4 left-4 text-sm font-bold text-amber-800 bg-white/50 px-3 py-1 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Real
              </motion.div>
            </div>

            {/* RIGHT SIDE: Virtual World */}
            <div className="absolute right-0 top-0 bottom-0 left-1/2 bg-gradient-to-b from-purple-950 via-indigo-900 to-purple-950">
              {/* Avatar at desk */}
              <div className="absolute left-1/2 bottom-[35%] -translate-x-1/2 text-6xl">
                🧑‍💼
              </div>
              
              {/* Virtual monitors */}
              {[-15, 0, 15].map((offset, i) => (
                <motion.div
                  key={`v-monitor-${i}`}
                  className="absolute left-1/2 top-[25%] w-16 h-12 bg-cyan-900/50 rounded border border-cyan-400/50"
                  style={{ marginLeft: `${offset}%`, transform: 'translate(-50%, -50%)' }}
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Success glow */}
              <motion.div
                className="absolute left-1/2 bottom-[35%] -translate-x-1/2 w-32 h-32 rounded-full bg-cyan-400/20"
                style={{ filter: 'blur(30px)' }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />

              {/* Label */}
              <motion.div
                className="absolute top-4 right-4 text-sm font-bold text-cyan-400 bg-black/50 px-3 py-1 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Virtual
              </motion.div>
            </div>

            {/* "THE FUTURE IS NOW!" text */}
            <motion.div
              className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center z-50"
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                THE FUTURE IS NOW!
              </motion.h1>
            </motion.div>

            {/* Particle burst from center line */}
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  background: i % 2 === 0 ? '#00ffff' : '#ff00ff'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400
                }}
                transition={{
                  duration: 2,
                  delay: 1 + i * 0.01,
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