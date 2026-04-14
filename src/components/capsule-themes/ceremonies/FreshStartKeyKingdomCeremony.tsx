/**
 * Fresh Start - Blueprint to Reality Ceremony
 * 
 * FROM SKETCH TO STOREFRONT - 17 seconds of epic dream materialization
 * 
 * Scene Flow:
 * 1. "The Blank Canvas" (0-2.5s) - Empty paper with dramatic light rays, hand with pencil
 * 2. "Sketch Your Dream" (2.5-6s) - Animated sketch drawing with dust particles
 * 3. "The Color Explosion" (6-9.5s) - Massive watercolor burst with paint drips
 * 4. "Breaking Through" (9.5-13s) - Epic paper tear revealing 3D reality
 * 5. "Your Dream Lives" (13-17s) - Full 3D storefront with mega celebration
 * 
 * v3 - MAXIMUM VFX ENHANCEMENT
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FreshStartKeyKingdomCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function FreshStartKeyKingdomCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: FreshStartKeyKingdomCeremonyProps) {
  const [stage, setStage] = useState<'title' | 'canvas' | 'sketch' | 'color' | 'peel' | 'reality' | 'outro'>('title');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('title') },
      { time: 1000, action: () => setStage('canvas') },
      { time: 3500, action: () => setStage('sketch') },
      { time: 7000, action: () => setStage('color') },
      { time: 10500, action: () => setStage('peel') },
      { time: 14000, action: () => setStage('reality') },
      { time: 18000, action: () => setStage('outro') },
      { time: 19000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900">
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
            <h2 className="text-4xl md:text-6xl font-bold text-purple-400 drop-shadow-2xl text-center px-8">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 1: THE BLANK CANVAS (0-2.5s) - ENHANCED */}
      <AnimatePresence>
        {stage === 'canvas' && (
          <>
            {/* White paper background with shadow depth */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Paper texture lines */}
              {[...Array(30)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute left-0 right-0 h-px bg-blue-50"
                  style={{ top: `${(i + 1) * 3.33}%` }}
                />
              ))}

              {/* Paper grain effect */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
              }} />
            </motion.div>

            {/* Epic light rays from top */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`lightray-${i}`}
                className="absolute top-0 left-1/2 w-2 origin-top"
                style={{
                  height: '60%',
                  background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.2), transparent)',
                  transform: `rotate(${-60 + i * 15}deg)`,
                  transformOrigin: 'top center'
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: [0, 0.6, 0.3], scaleY: 1 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              />
            ))}

            {/* "Where Dreams Begin..." label - more dramatic */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[12%] bg-gradient-to-r from-slate-600 to-slate-800 px-10 py-4 rounded-full border-3 border-slate-300 shadow-2xl z-50"
              initial={{ opacity: 0, y: -50, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ duration: 0.9, delay: 0.4, type: 'spring', damping: 8 }}
            >
              <span className="text-2xl font-black text-white drop-shadow-lg">Where Dreams Begin... ✨</span>
              
              {/* Glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(148, 163, 184, 0.3)',
                    '0 0 40px rgba(148, 163, 184, 0.6)',
                    '0 0 20px rgba(148, 163, 184, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Hand with pencil - more dramatic entrance */}
            <motion.div
              className="absolute right-[20%] top-[35%] text-9xl z-30 drop-shadow-xl"
              initial={{ x: 200, y: -150, opacity: 0, rotate: -60, scale: 0.5 }}
              animate={{ 
                x: 0, 
                y: 0, 
                opacity: 1, 
                rotate: 0,
                scale: 1
              }}
              transition={{ duration: 1.4, delay: 0.6, type: 'spring', damping: 12 }}
            >
              ✍️
            </motion.div>

            {/* Floating dust particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 bg-slate-300 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: 0.8 + Math.random() * 1,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 2: SKETCH YOUR DREAM (2.5-6s) - ENHANCED */}
      <AnimatePresence>
        {stage === 'sketch' && (
          <>
            {/* White paper background */}
            <motion.div className="absolute inset-0 bg-white">
              {[...Array(30)].map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute left-0 right-0 h-px bg-blue-50"
                  style={{ top: `${(i + 1) * 3.33}%` }}
                />
              ))}
            </motion.div>

            {/* "Drawing Your Vision..." label with drawing sound effect feel */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-blue-500 to-indigo-700 px-10 py-4 rounded-full border-3 border-blue-200 shadow-2xl z-50"
              initial={{ opacity: 0, y: -40, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 9 }}
            >
              <span className="text-2xl font-black text-white drop-shadow-lg">Drawing Your Vision... 📐</span>
            </motion.div>

            {/* Pencil following the drawing path */}
            <motion.div
              className="absolute text-5xl z-40"
              initial={{ x: '30%', y: '15%' }}
              animate={{
                x: ['30%', '50%', '70%', '50%', '30%'],
                y: ['15%', '25%', '45%', '65%', '75%']
              }}
              transition={{ duration: 3, delay: 0.3, ease: 'linear' }}
            >
              ✏️
            </motion.div>

            {/* Building sketch with dramatic reveal */}
            <motion.svg 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96" 
              viewBox="0 0 160 200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Building outline - with dramatic stroke animation */}
              <motion.rect
                x="30"
                y="10"
                width="100"
                height="160"
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              />

              {/* Windows - staggered and bouncy */}
              {[...Array(24)].map((_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                return (
                  <motion.rect
                    key={`sketch-window-${i}`}
                    x={45 + col * 18}
                    y={25 + row * 20}
                    width="10"
                    height="12"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2"
                    initial={{ pathLength: 0, scale: 0 }}
                    animate={{ pathLength: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.25, 
                      delay: 1.8 + i * 0.04,
                      type: 'spring',
                      stiffness: 200
                    }}
                  />
                );
              })}

              {/* Storefront entrance */}
              <motion.rect
                x="30"
                y="170"
                width="100"
                height="30"
                fill="none"
                stroke="#1e293b"
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 2.8, ease: 'easeOut' }}
              />

              {/* Door divider */}
              <motion.line
                x1="80"
                y1="170"
                x2="80"
                y2="200"
                stroke="#1e293b"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 3.0 }}
              />

              {/* Sign above entrance */}
              <motion.rect
                x="50"
                y="155"
                width="60"
                height="12"
                fill="none"
                stroke="#1e293b"
                strokeWidth="2"
                initial={{ pathLength: 0, scale: 0 }}
                animate={{ pathLength: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 3.2, type: 'spring', bounce: 0.4 }}
              />
            </motion.svg>

            {/* Enhanced pencil shavings and dust */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`mark-${i}`}
                className="absolute rounded-sm"
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 6,
                  background: i % 3 === 0 ? '#94a3b8' : '#cbd5e1',
                  left: `${42 + Math.random() * 20}%`,
                  top: `${50 + Math.random() * 15}%`
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0.4], 
                  scale: [0, 1, 0.8],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 3: THE COLOR EXPLOSION (6-9.5s) - MASSIVELY ENHANCED */}
      <AnimatePresence>
        {stage === 'color' && (
          <>
            {/* Watercolor background with wave effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* "Bringing Dreams to Life!" - more epic */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-12 py-4 rounded-full border-4 border-white shadow-2xl z-50"
              initial={{ opacity: 0, y: -50, scale: 0.3, rotate: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1, delay: 0.5, type: 'spring', damping: 10 }}
            >
              <span className="text-2xl font-black text-white drop-shadow-2xl">Bringing Dreams to Life! 🎨</span>
              
              {/* Rainbow pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(168, 85, 247, 0.5)',
                    '0 0 60px rgba(236, 72, 153, 0.8)',
                    '0 0 30px rgba(168, 85, 247, 0.5)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* MEGA color explosion - more particles */}
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={`splash-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 6 + Math.random() * 10,
                  height: 6 + Math.random() * 10,
                  left: '50%',
                  top: '50%',
                  background: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#f97316'][i % 7],
                  filter: 'blur(3px)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 1],
                  opacity: [0, 1, 0.6],
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.01,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            ))}

            {/* Paint drips from top */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`drip-${i}`}
                className="absolute w-3 rounded-full"
                style={{
                  left: `${10 + i * 6}%`,
                  top: '-5%',
                  background: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][i % 5],
                  filter: 'blur(1px)'
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: [0, 40 + Math.random() * 60, 50 + Math.random() * 80],
                  opacity: [0, 0.8, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Colored building - with paint splash effect */}
            <motion.svg 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96" 
              viewBox="0 0 160 200"
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Building with glow */}
              <motion.rect
                x="30"
                y="10"
                width="100"
                height="160"
                fill="#fbbf24"
                stroke="#92400e"
                strokeWidth="3"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                filter="drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))"
              />

              {/* Windows with colorful pop-in */}
              {[...Array(24)].map((_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                return (
                  <motion.rect
                    key={`color-window-${i}`}
                    x={45 + col * 18}
                    y={25 + row * 20}
                    width="10"
                    height="12"
                    fill="#93c5fd"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 2 + i * 0.03,
                      type: 'spring',
                      stiffness: 300,
                      damping: 15
                    }}
                  />
                );
              })}

              {/* Storefront with dramatic reveal */}
              <motion.rect
                x="30"
                y="170"
                width="100"
                height="30"
                fill="#1e40af"
                stroke="#1e3a8a"
                strokeWidth="3"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, delay: 2.7, ease: 'backOut' }}
              />

              {/* Glass doors with shine */}
              <motion.rect
                x="40"
                y="175"
                width="18"
                height="20"
                fill="#bae6fd"
                stroke="#0c4a6e"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 3 }}
              />
              
              <motion.rect
                x="102"
                y="175"
                width="18"
                height="20"
                fill="#bae6fd"
                stroke="#0c4a6e"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 3 }}
              />

              {/* Sign with bounce */}
              <motion.rect
                x="50"
                y="155"
                width="60"
                height="12"
                fill="#fbbf24"
                stroke="#92400e"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.2, type: 'spring', bounce: 0.6 }}
              />
            </motion.svg>

            {/* Giant paintbrush sweeping across */}
            <motion.div
              className="absolute text-9xl z-40"
              initial={{ x: '-20%', y: '50%', opacity: 0, rotate: -45 }}
              animate={{ x: '70%', y: '45%', opacity: [0, 1, 1, 0], rotate: 15 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            >
              🖌️
            </motion.div>

            {/* Watercolor splatters */}
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`splat-${i}`}
                className="absolute rounded-full opacity-30"
                style={{
                  width: 20 + Math.random() * 40,
                  height: 20 + Math.random() * 40,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'][i % 4],
                  filter: 'blur(8px)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5 + Math.random() * 2 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SCENE 4: BREAKING THROUGH (9.5-13s) - ULTRA ENHANCED */}
      <AnimatePresence>
        {stage === 'peel' && (
          <>
            {/* Sky with dramatic lighting */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-300 to-green-200"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Sun rays breaking through */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`sunray-${i}`}
                className="absolute top-[20%] left-[30%] w-3 origin-left"
                style={{
                  height: '40%',
                  background: 'linear-gradient(to right, rgba(251, 191, 36, 0.4), transparent)',
                  transform: `rotate(${-45 + i * 15}deg)`,
                  transformOrigin: 'left center'
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.6, 0.4] }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
              />
            ))}

            {/* "Reality Breaking Through!" - EXPLOSIVE */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[8%] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-12 py-4 rounded-full border-4 border-white shadow-2xl z-50"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0 
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.9, delay: 0.7, type: 'spring', damping: 10 }}
            >
              <span className="text-2xl font-black text-white drop-shadow-2xl">Reality Breaking Through! 💥</span>
              
              {/* Explosion glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(14, 165, 233, 0.6)',
                    '0 0 80px rgba(59, 130, 246, 1)',
                    '0 0 30px rgba(14, 165, 233, 0.6)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Paper tearing with crack lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`crack-${i}`}
                className="absolute left-[40%] top-[40%] w-1 bg-slate-700 origin-left"
                style={{
                  height: 100 + Math.random() * 150,
                  transform: `rotate(${-30 + i * 15}deg)`
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.3 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              />
            ))}

            {/* Peeling paper - more dramatic */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 origin-top-left shadow-2xl"
              animate={{
                scaleX: [1, 0.6, 0],
                scaleY: [1, 0.7, 0],
                x: [0, 150, 400],
                y: [0, 80, -300],
                rotate: [0, 20, 60],
                opacity: [1, 0.7, 0]
              }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
              }}
            >
              {/* Building on paper */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">
                🏪
              </div>
            </motion.div>

            {/* MASSIVE paper explosion */}
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={`tear-${i}`}
                className="absolute rounded-sm shadow-lg"
                style={{
                  width: 10 + Math.random() * 40,
                  height: 10 + Math.random() * 40,
                  background: ['#fce7f3', '#e9d5ff', '#dbeafe'][i % 3],
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`
                }}
                initial={{ opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  rotate: (Math.random() - 0.5) * 1080,
                  x: (Math.random() - 0.5) * 800,
                  y: -400 - Math.random() * 300,
                  scale: [1, 1.2, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.3 + i * 0.02,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            ))}

            {/* 3D building emerging with dramatic scale */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-96 bg-gradient-to-b from-amber-400 via-orange-400 to-amber-600 rounded-t-2xl border-4 border-amber-700"
              initial={{ y: 150, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 1, type: 'spring', damping: 18 }}
              style={{
                boxShadow: '0 -10px 60px rgba(245, 158, 11, 0.4), 0 0 80px rgba(251, 191, 36, 0.3)'
              }}
            >
              {/* Windows with light flicker */}
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={`3d-window-${i}`}
                  className="absolute w-8 h-10 bg-sky-300 rounded border-2 border-amber-700"
                  style={{
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${15 + Math.floor(i / 4) * 15}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: i % 4 === 0 ? ['#7dd3fc', '#fef08a', '#7dd3fc'] : '#7dd3fc'
                  }}
                  transition={{ 
                    opacity: { duration: 0.4, delay: 1.5 + i * 0.04 },
                    scale: { duration: 0.4, delay: 1.5 + i * 0.04, type: 'spring' },
                    backgroundColor: { duration: 2, delay: 2, repeat: Infinity }
                  }}
                />
              ))}

              {/* Storefront with shine effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-600 to-blue-800 border-t-4 border-yellow-400"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, delay: 2.2, ease: 'backOut' }}
              >
                {/* Glass shine sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{ duration: 1.5, delay: 2.5 }}
                />
              </motion.div>
            </motion.div>

            {/* Impact shockwave */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* SCENE 5: YOUR DREAM LIVES (13-17s) - MAXIMUM CELEBRATION */}
      <AnimatePresence>
        {stage === 'reality' && (
          <>
            {/* Perfect sky */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-sky-400 via-blue-300 to-green-200"
            />

            {/* Volumetric sun rays */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`volray-${i}`}
                className="absolute top-[15%] left-[25%] w-4 origin-left"
                style={{
                  height: '50%',
                  background: 'linear-gradient(to right, rgba(251, 191, 36, 0.15), transparent)',
                  transform: `rotate(${-60 + i * 10}deg)`,
                  transformOrigin: 'left center'
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}

            {/* Animated clouds */}
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute text-6xl opacity-80 drop-shadow-lg"
                style={{
                  left: `${5 + i * 15}%`,
                  top: `${8 + (i % 2) * 12}%`
                }}
                animate={{
                  x: [0, 40, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 20,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                ☁️
              </motion.div>
            ))}

            {/* Ground with grass effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-green-400 to-green-600 overflow-hidden">
              {/* Grass blades */}
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={`grass-${i}`}
                  className="absolute bottom-0 w-1 bg-green-700 rounded-t-full"
                  style={{
                    left: `${i * 2}%`,
                    height: 8 + Math.random() * 16
                  }}
                  animate={{
                    scaleY: [1, 1.1, 1],
                    rotate: [0, 2, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            {/* THE STOREFRONT - MAXIMUM GLORY */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-80 h-[420px] bg-gradient-to-b from-amber-400 via-orange-400 to-amber-600 rounded-t-2xl border-4 border-amber-700"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', damping: 20 }}
              style={{
                boxShadow: '0 -20px 80px rgba(245, 158, 11, 0.5), 0 0 120px rgba(251, 191, 36, 0.4)'
              }}
            >
              {/* Windows with dynamic lighting */}
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={`window-${i}`}
                  className="absolute w-8 h-10 bg-sky-300 rounded border-2 border-amber-700"
                  style={{
                    left: `${15 + (i % 4) * 20}%`,
                    top: `${10 + Math.floor(i / 4) * 13}%`
                  }}
                  animate={{
                    backgroundColor: i % 3 === 0 ? ['#7dd3fc', '#fef08a', '#7dd3fc'] : '#7dd3fc',
                    boxShadow: i % 3 === 0 ? 
                      ['0 0 5px rgba(254, 240, 138, 0.5)', '0 0 15px rgba(254, 240, 138, 1)', '0 0 5px rgba(254, 240, 138, 0.5)'] :
                      '0 0 5px rgba(125, 211, 252, 0.5)'
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              ))}

              {/* Epic storefront entrance */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-blue-600 to-blue-800 border-t-4 border-yellow-400 flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {/* Glass doors with reflection */}
                <motion.div 
                  className="w-16 h-20 bg-sky-200 rounded border-2 border-blue-900 mx-1 relative overflow-hidden"
                  animate={{
                    boxShadow: ['0 0 10px rgba(186, 230, 253, 0.5)', '0 0 20px rgba(186, 230, 253, 1)', '0 0 10px rgba(186, 230, 253, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Glass shine */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="w-16 h-20 bg-sky-200 rounded border-2 border-blue-900 mx-1 relative overflow-hidden"
                  animate={{
                    boxShadow: ['0 0 10px rgba(186, 230, 253, 0.5)', '0 0 20px rgba(186, 230, 253, 1)', '0 0 10px rgba(186, 230, 253, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </motion.div>

              {/* "YOUR SHOP" sign - ULTRA GLOWING */}
              <motion.div
                className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 px-12 py-4 rounded-lg border-4 border-yellow-600 shadow-2xl z-10"
                initial={{ scale: 0, y: 30, rotate: -10 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 1.2, type: 'spring', bounce: 0.6 }}
              >
                <div className="text-3xl font-black text-amber-900 relative z-10">YOUR SHOP</div>
                
                {/* Ultra glow pulse */}
                <motion.div
                  className="absolute inset-0 rounded-lg -z-10"
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(250, 204, 21, 0.8), 0 0 80px rgba(251, 191, 36, 0.6)',
                      '0 0 80px rgba(250, 204, 21, 1), 0 0 120px rgba(251, 191, 36, 0.8)',
                      '0 0 40px rgba(250, 204, 21, 0.8), 0 0 80px rgba(251, 191, 36, 0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Sparkle burst from sign */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`signsparkle-${i}`}
                    className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: Math.cos((i / 12) * Math.PI * 2) * 60,
                      y: Math.sin((i / 12) * Math.PI * 2) * 60,
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 1.5 + i * 0.08,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </motion.div>

              {/* Striped awning with wave */}
              <motion.div 
                className="absolute bottom-28 left-0 right-0 h-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" 
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>

            {/* "YOUR DREAM IS REAL!" - EPIC MAXIMUM */}
            <motion.div
              className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center z-50"
              initial={{ opacity: 0, y: -80, scale: 0.3, rotate: -15 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 1.8, type: 'spring', damping: 12 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.4)',
                  filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 1)) drop-shadow(0 0 60px rgba(249, 115, 22, 0.8))'
                }}
                animate={{
                  scale: [1, 1.08, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                YOUR DREAM IS REAL!
              </motion.h1>

              {/* Rainbow shimmer sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                animate={{
                  x: ['-200%', '200%']
                }}
                transition={{
                  duration: 2,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.div>

            {/* MEGA golden confetti storm */}
            {[...Array(200)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 3 + Math.random() * 5,
                  height: 3 + Math.random() * 5,
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  background: ['#fbbf24', '#f59e0b', '#fb923c', '#ffffff', '#fef08a'][i % 5]
                }}
                animate={{
                  y: [0, 1200],
                  rotate: [0, Math.random() * 720],
                  opacity: [0, 1, 0.9, 0],
                  x: Math.sin(i) * 100
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: 1.5 + i * 0.015,
                  ease: 'linear'
                }}
              />
            ))}

            {/* Sparkle explosion around building */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${35 + Math.random() * 35}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  delay: 1 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Epic firework bursts */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`firework-${i}`}
                className="absolute"
                style={{
                  left: `${15 + i * 12}%`,
                  top: '20%'
                }}
              >
                {/* Center burst */}
                <motion.div
                  className="w-4 h-4 rounded-full bg-yellow-300"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 12, 0]
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 2.5 + i * 0.4
                  }}
                />
                
                {/* Radiating sparks */}
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={`spark-${j}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899'][j % 4],
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: Math.cos((j / 12) * Math.PI * 2) * 80,
                      y: [0, Math.sin((j / 12) * Math.PI * 2) * 80, Math.sin((j / 12) * Math.PI * 2) * 80 + 100],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: 2.5 + i * 0.4
                    }}
                  />
                ))}
              </motion.div>
            ))}

            {/* Rising star particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${25 + Math.random() * 50}%`,
                  bottom: '0%'
                }}
                animate={{
                  y: [0, -600],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  delay: 2 + Math.random() * 2,
                  ease: 'easeOut'
                }}
              >
                ⭐
              </motion.div>
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