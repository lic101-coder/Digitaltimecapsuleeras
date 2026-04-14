/**
 * Pet Rainbow Bridge Ceremony (PERFECTED)
 * 
 * The legendary Rainbow Bridge with spectacular full-color rainbow display.
 * Bird rotated 45 degrees to point forward (like airplane in Voyage ceremony).
 * All animals properly oriented facing right.
 * 
 * Duration: 14 seconds
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetRainbowBridgeCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetRainbowBridgeCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetRainbowBridgeCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'rainbow' | 'prints' | 'crossing' | 'stars' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 800, action: () => setStage('rainbow') },     // Rainbow FIRST
      { time: 3200, action: () => setStage('prints') },     // Then paw prints
      { time: 4800, action: () => setStage('crossing') },   // Then animals
      { time: 8800, action: () => setStage('stars') },
      { time: 11500, action: () => setStage('radiance') },
      { time: 13000, action: () => setStage('outro') },
      { time: 14000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Rainbow - all 7 brilliant colors
  const rainbowBands = [
    { color: '#ef4444', name: 'Red', size: 30 },
    { color: '#f97316', name: 'Orange', size: 30 },
    { color: '#fbbf24', name: 'Yellow', size: 30 },
    { color: '#22c55e', name: 'Green', size: 30 },
    { color: '#3b82f6', name: 'Blue', size: 30 },
    { color: '#6366f1', name: 'Indigo', size: 30 },
    { color: '#a855f7', name: 'Violet', size: 30 }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0ea5e9] via-[#7dd3fc] to-[#bae6fd]">
      {/* Clouds in sky */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 20) % 90}%`,
              top: `${10 + (i % 5) * 11}%`,
              width: `${130 + i * 18}px`,
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.7)',
              filter: 'blur(28px)'
            }}
            animate={{
              x: [0, 30, 0],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
              ease: 'easeInOut'
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
            className="absolute inset-x-0 top-[20%] z-30 text-center px-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
              {capsuleTitle}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paw prints on ground */}
      <AnimatePresence>
        {(stage === 'prints' || stage === 'crossing') && (
          <>
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={`paw-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${3 + i * 7}%`,
                  bottom: '38%',
                  transform: i % 2 === 0 ? 'rotate(-12deg)' : 'rotate(12deg)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                🐾
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* SPECTACULAR RAINBOW BRIDGE - All 7 colors vivid and clear */}
      <AnimatePresence>
        {(stage === 'rainbow' || stage === 'prints' || stage === 'crossing' || stage === 'stars') && (
          <>
            {/* Individual rainbow color bands forming perfect arc */}
            {rainbowBands.map((band, i) => (
              <div key={`band-${i}`}>
                {/* Main rainbow arc - forms left to right */}
                <motion.div
                  className="absolute"
                  style={{
                    left: '0%',
                    top: `${5 + i * 3.2}%`,
                    width: '100%',
                    height: `${420 - i * 22}px`,
                    borderTop: `${band.size}px solid ${band.color}`,
                    borderRadius: '50%',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    filter: 'blur(1px)',
                    opacity: 0.95,
                    transformOrigin: 'left center'
                  }}
                  initial={{ 
                    clipPath: 'inset(0 100% 0 0)',
                    opacity: 0
                  }}
                  animate={{
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 0.95
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
                
                {/* Inner glow for each band - forms left to right */}
                <motion.div
                  className="absolute"
                  style={{
                    left: '0%',
                    top: `${5 + i * 3.2}%`,
                    width: '100%',
                    height: `${420 - i * 22}px`,
                    borderTop: `${band.size - 4}px solid ${band.color}`,
                    borderRadius: '50%',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    filter: 'blur(8px)',
                    opacity: 0.6,
                    transformOrigin: 'left center'
                  }}
                  initial={{ 
                    clipPath: 'inset(0 100% 0 0)',
                    opacity: 0
                  }}
                  animate={{
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 0.6
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              </div>
            ))}

            {/* Rainbow shimmer effect during crossing */}
            {stage === 'crossing' && (
              <motion.div
                className="absolute left-0 w-full"
                style={{
                  top: '5%',
                  height: '420px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                  filter: 'blur(50px)',
                  pointerEvents: 'none'
                }}
                animate={{
                  x: ['-150%', '250%']
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            )}

            {/* Rainbow glow reflection on ground */}
            <motion.div
              className="absolute inset-x-0"
              style={{
                bottom: '18%',
                height: '35%',
                background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.05), transparent)',
                filter: 'blur(70px)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 1.2 }}
            />

            {/* Cloud puffs at rainbow ends */}
            <motion.div
              className="absolute left-[-6%] w-44 h-44 rounded-full"
              style={{
                top: '43%',
                background: 'radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.5))',
                filter: 'blur(35px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.5 }}
            />
            <motion.div
              className="absolute right-[-6%] w-44 h-44 rounded-full"
              style={{
                top: '43%',
                background: 'radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.5))',
                filter: 'blur(35px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 1.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ANIMALS CROSSING - All facing right, bird rotated 45° */}
      <AnimatePresence>
        {stage === 'crossing' && (
          <>
            {/* Tennis ball bouncing WILDLY ahead - thrown in arc */}
            <motion.div
              className="absolute text-6xl md:text-7xl"
              style={{
                bottom: '33%',
                zIndex: 27,
                filter: 'drop-shadow(0 8px 16px rgba(34, 197, 94, 0.6))'
              }}
              initial={{ left: '8%', y: 0 }}
              animate={{ 
                left: '125%',
                y: [0, -120, -80, -140, -60, -100, -40, -80, -20, -60, 0, -40, 0],
                rotate: [0, 180, 360, 540, 720, 900, 1080, 1260, 1440],
                scale: [1, 1.3, 1.1, 1.4, 1, 1.3, 0.9, 1.2, 1]
              }}
              transition={{
                left: { duration: 3.5, ease: 'linear' },
                y: { duration: 3.5, times: [0, 0.08, 0.15, 0.25, 0.35, 0.45, 0.55, 0.68, 0.78, 0.88, 0.94, 0.98, 1], ease: 'easeInOut' },
                rotate: { duration: 3.5, ease: 'linear' },
                scale: { duration: 3.5, times: [0, 0.1, 0.2, 0.35, 0.5, 0.6, 0.7, 0.85, 1], ease: 'easeInOut' }
              }}
            >
              🎾
            </motion.div>
            
            {/* Toy bone tumbling in different arc - thrown high */}
            <motion.div
              className="absolute text-5xl md:text-6xl"
              style={{
                bottom: '36%',
                zIndex: 27,
                filter: 'drop-shadow(0 8px 16px rgba(245, 158, 11, 0.6))'
              }}
              initial={{ left: '10%', y: 0 }}
              animate={{ 
                left: '122%',
                y: [0, -160, -100, -180, -80, -140, -50, -100, -20, 0],
                rotate: [0, -90, -180, -270, -360, -450, -540, -630, -720],
                scale: [1, 1.2, 1, 1.3, 0.9, 1.2, 0.8, 1.1, 1]
              }}
              transition={{
                left: { duration: 3.8, delay: 0.15, ease: 'linear' },
                y: { duration: 3.8, delay: 0.15, times: [0, 0.12, 0.22, 0.35, 0.48, 0.6, 0.72, 0.85, 0.95, 1], ease: 'easeInOut' },
                rotate: { duration: 3.8, delay: 0.15, ease: 'linear' },
                scale: { duration: 3.8, delay: 0.15, ease: 'easeInOut' }
              }}
            >
              🦴
            </motion.div>
            
            {/* SVG ANIMATED DOG - LEGS RUNNING - REFINED & CUTER - FACING RIGHT */}
            <motion.div
              className="absolute"
              style={{
                bottom: '32%',
                zIndex: 25,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
                transform: 'scaleX(-1)' // ✅ FLIP TO FACE RIGHT
              }}
              initial={{ left: '-15%' }}
              animate={{ 
                left: '115%',
                y: [0, -18, -8, -20, -6, -18, -8, -16, -6, -18, -4, -16, -2, -12, 0], // Excited galloping
                rotate: [0, -3, 1, -4, 2, -3, 1, -3, 2, -2, 1, -2, 0], // Body bouncing
                scaleY: [1, 1.08, 0.96, 1.1, 0.94, 1.08, 0.96, 1.06, 0.98, 1.04, 0.98, 1.02, 1] // Compression/stretch
              }}
              transition={{
                left: { duration: 3.8, ease: [0.42, 0, 0.58, 1] },
                y: { duration: 3.8, times: [0, 0.08, 0.15, 0.22, 0.3, 0.38, 0.46, 0.54, 0.62, 0.7, 0.78, 0.86, 0.92, 0.96, 1], ease: 'easeInOut' },
                rotate: { duration: 3.8, ease: 'easeInOut' },
                scaleY: { duration: 3.8, ease: 'easeInOut' }
              }}
            >
              <svg width="140" height="110" viewBox="0 0 140 110">
                {/* NO MORE INNER TRANSFORM - we flip the whole div with scaleX(-1) */}
                {/* BODY - Rounded and cute */}
                <ellipse cx="60" cy="50" rx="40" ry="26" fill="#D2691E" stroke="#A0522D" strokeWidth="3"/>
                
                {/* HEAD - Bigger and rounder */}
                <circle cx="100" cy="40" r="24" fill="#CD853F" stroke="#A0522D" strokeWidth="3"/>
                
                {/* SNOUT - Prominent */}
                <ellipse cx="118" cy="44" rx="14" ry="12" fill="#DEB887" stroke="#A0522D" strokeWidth="2"/>
                {/* Nose - black and shiny */}
                <ellipse cx="125" cy="44" rx="5" ry="6" fill="#000"/>
                <circle cx="126" cy="42" r="2" fill="#fff" opacity="0.7"/>
                
                {/* EARS - Floppy and adorable */}
                <motion.ellipse 
                  cx="88" cy="22" rx="10" ry="18" 
                  fill="#A0522D" stroke="#8B4513" strokeWidth="2"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '88px 30px' }}
                />
                <ellipse cx="90" cy="26" rx="6" ry="12" fill="#DEB887"/>
                
                <motion.ellipse 
                  cx="110" cy="20" rx="10" ry="18" 
                  fill="#A0522D" stroke="#8B4513" strokeWidth="2"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.17 }}
                  style={{ transformOrigin: '110px 28px' }}
                />
                <ellipse cx="109" cy="24" rx="6" ry="12" fill="#DEB887"/>
                
                {/* EYES - Big and expressive */}
                <circle cx="104" cy="36" r="4" fill="#000"/>
                <circle cx="105" cy="34" r="2" fill="#fff"/>
                <circle cx="94" cy="36" r="4" fill="#000"/>
                <circle cx="95" cy="34" r="2" fill="#fff"/>
                
                {/* EYEBROWS - Add personality */}
                <path d="M 90 30 Q 92 28, 96 30" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M 102 30 Q 104 28, 108 30" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
                
                {/* MOUTH - Happy smile */}
                <path d="M 115 50 Q 118 53, 121 50" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round"/>
                
                {/* TONGUE - Hanging out happily */}
                <motion.ellipse
                  cx="118" cy="56" rx="4" ry="7"
                  fill="#ff69b4"
                  stroke="#d63384"
                  strokeWidth="1.5"
                  animate={{ scaleY: [1, 1.15, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* TAIL - Wagging enthusiastically */}
                <motion.path
                  d="M 24 45 Q 12 38, 6 28"
                  fill="none"
                  stroke="#A0522D"
                  strokeWidth="7"
                  strokeLinecap="round"
                  animate={{ d: ['M 24 45 Q 12 38, 6 28', 'M 24 45 Q 12 25, 10 15', 'M 24 45 Q 12 38, 6 28'] }}
                  transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* ANIMATED LEGS - More dynamic running */}
                {/* Front left leg */}
                <motion.g
                  animate={{ rotate: [0, -40, 30, -40, 0] }}
                  transition={{ duration: 0.32, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '78px 70px' }}
                >
                  <line x1="78" y1="70" x2="78" y2="96" stroke="#A0522D" strokeWidth="6" strokeLinecap="round"/>
                  <ellipse cx="78" cy="100" rx="5" ry="4" fill="#654321"/>
                </motion.g>
                
                {/* Front right leg */}
                <motion.g
                  animate={{ rotate: [0, 30, -40, 30, 0] }}
                  transition={{ duration: 0.32, repeat: Infinity, ease: 'linear', delay: 0.16 }}
                  style={{ transformOrigin: '90px 70px' }}
                >
                  <line x1="90" y1="70" x2="90" y2="96" stroke="#A0522D" strokeWidth="6" strokeLinecap="round"/>
                  <ellipse cx="90" cy="100" rx="5" ry="4" fill="#654321"/>
                </motion.g>
                
                {/* Back left leg */}
                <motion.g
                  animate={{ rotate: [0, 30, -40, 30, 0] }}
                  transition={{ duration: 0.32, repeat: Infinity, ease: 'linear', delay: 0.08 }}
                  style={{ transformOrigin: '42px 70px' }}
                >
                  <line x1="42" y1="70" x2="42" y2="96" stroke="#A0522D" strokeWidth="6" strokeLinecap="round"/>
                  <ellipse cx="42" cy="100" rx="5" ry="4" fill="#654321"/>
                </motion.g>
                
                {/* Back right leg */}
                <motion.g
                  animate={{ rotate: [0, -40, 30, -40, 0] }}
                  transition={{ duration: 0.32, repeat: Infinity, ease: 'linear', delay: 0.24 }}
                  style={{ transformOrigin: '54px 70px' }}
                >
                  <line x1="54" y1="70" x2="54" y2="96" stroke="#A0522D" strokeWidth="6" strokeLinecap="round"/>
                  <ellipse cx="54" cy="100" rx="5" ry="4" fill="#654321"/>
                </motion.g>
              </svg>
            </motion.div>

            {/* SVG ANIMATED CAT - LEGS RUNNING - REFINED & CUTER - FACING RIGHT */}
            <motion.div
              className="absolute"
              style={{
                bottom: '30%',
                zIndex: 24,
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
                transform: 'scaleX(-1)' // ✅ FLIP TO FACE RIGHT
              }}
              initial={{ left: '-20%' }}
              animate={{ 
                left: '110%',
                y: [0, -14, -6, -16, -4, -14, -6, -12, -4, -14, -2, -12, 0], // Graceful bounding
                rotate: [0, -2, 1, -2.5, 1.5, -2, 1, -2, 1, -1.5, 0.5, -1, 0], // Subtle tilt
                scaleY: [1, 1.06, 0.98, 1.08, 0.96, 1.06, 0.98, 1.04, 0.98, 1.02, 1],
                x: [0, 3, -2, 4, -3, 3, -2, 3, -1, 2, 0] // Cat swagger
              }}
              transition={{
                left: { duration: 4, delay: 0.3, ease: [0.42, 0, 0.58, 1] },
                y: { duration: 4, delay: 0.3, times: [0, 0.1, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88, 0.94, 0.98, 1], ease: 'easeInOut' },
                rotate: { duration: 4, delay: 0.3, ease: 'easeInOut' },
                scaleY: { duration: 4, delay: 0.3, ease: 'easeInOut' },
                x: { duration: 4, delay: 0.3, ease: 'easeInOut' }
              }}
            >
              <svg width="120" height="90" viewBox="0 0 120 90">
                {/* NO MORE INNER TRANSFORM - we flip the whole div with scaleX(-1) */}
                {/* BODY - Sleek cat shape */}
                <ellipse cx="50" cy="45" rx="34" ry="20" fill="#FF8C42" stroke="#E67325" strokeWidth="2.5"/>
                
                {/* HEAD - Round and cute */}
                <circle cx="86" cy="36" r="18" fill="#FF8C42" stroke="#E67325" strokeWidth="2.5"/>
                
                {/* SNOUT - Small and delicate */}
                <ellipse cx="100" cy="40" rx="10" ry="8" fill="#FFB380" stroke="#E67325" strokeWidth="1.5"/>
                {/* Nose - pink triangle */}
                <path d="M 105 39 L 108 43 L 102 43 Z" fill="#ff69b4"/>
                <line x1="105" y1="43" x2="105" y2="47" stroke="#E67325" strokeWidth="1.5"/>
                
                {/* EARS - Pointed and alert */}
                <motion.g
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '77px 22px' }}
                >
                  <path d="M 77 24 L 72 12 L 80 20 Z" fill="#FF8C42" stroke="#E67325" strokeWidth="2"/>
                  <path d="M 77 24 L 75 16 L 78 21 Z" fill="#FFB380"/>
                </motion.g>
                
                <motion.g
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                  style={{ transformOrigin: '95px 20px' }}
                >
                  <path d="M 95 22 L 100 10 L 92 18 Z" fill="#FF8C42" stroke="#E67325" strokeWidth="2"/>
                  <path d="M 95 22 L 97 14 L 94 19 Z" fill="#FFB380"/>
                </motion.g>
                
                {/* EYES - Almond shaped and mysterious */}
                <ellipse cx="89" cy="34" rx="4" ry="6" fill="#228B22"/>
                <ellipse cx="89" cy="33" rx="2" ry="4" fill="#000"/>
                <ellipse cx="89.5" cy="31" rx="1" ry="2" fill="#fff" opacity="0.8"/>
                
                <ellipse cx="78" cy="34" rx="4" ry="6" fill="#228B22"/>
                <ellipse cx="78" cy="33" rx="2" ry="4" fill="#000"/>
                <ellipse cx="78.5" cy="31" rx="1" ry="2" fill="#fff" opacity="0.8"/>
                
                {/* WHISKERS - Long and elegant */}
                <line x1="100" y1="38" x2="115" y2="36" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="100" y1="40" x2="115" y2="40" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="100" y1="42" x2="115" y2="44" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* TAIL - Graceful curve and swish */}
                <motion.path
                  d="M 20 42 Q 8 30, 4 18"
                  fill="none"
                  stroke="#E67325"
                  strokeWidth="5"
                  strokeLinecap="round"
                  animate={{ 
                    d: [
                      'M 20 42 Q 8 30, 4 18', 
                      'M 20 42 Q 10 24, 8 10', 
                      'M 20 42 Q 12 32, 10 20',
                      'M 20 42 Q 8 30, 4 18'
                    ]
                  }}
                  transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Tail tip - darker */}
                <motion.circle
                  r="3"
                  fill="#8B4513"
                  animate={{
                    cx: [4, 8, 10, 4],
                    cy: [18, 10, 20, 18]
                  }}
                  transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* ANIMATED LEGS - Graceful cat running */}
                {/* Front left leg */}
                <motion.g
                  animate={{ rotate: [0, -35, 25, -35, 0] }}
                  transition={{ duration: 0.28, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '68px 60px' }}
                >
                  <line x1="68" y1="60" x2="68" y2="80" stroke="#E67325" strokeWidth="5" strokeLinecap="round"/>
                  <ellipse cx="68" cy="83" rx="4" ry="3" fill="#8B4513"/>
                </motion.g>
                
                {/* Front right leg */}
                <motion.g
                  animate={{ rotate: [0, 25, -35, 25, 0] }}
                  transition={{ duration: 0.28, repeat: Infinity, ease: 'linear', delay: 0.14 }}
                  style={{ transformOrigin: '78px 60px' }}
                >
                  <line x1="78" y1="60" x2="78" y2="80" stroke="#E67325" strokeWidth="5" strokeLinecap="round"/>
                  <ellipse cx="78" cy="83" rx="4" ry="3" fill="#8B4513"/>
                </motion.g>
                
                {/* Back left leg */}
                <motion.g
                  animate={{ rotate: [0, 25, -35, 25, 0] }}
                  transition={{ duration: 0.28, repeat: Infinity, ease: 'linear', delay: 0.07 }}
                  style={{ transformOrigin: '36px 60px' }}
                >
                  <line x1="36" y1="60" x2="36" y2="80" stroke="#E67325" strokeWidth="5" strokeLinecap="round"/>
                  <ellipse cx="36" cy="83" rx="4" ry="3" fill="#8B4513"/>
                </motion.g>
                
                {/* Back right leg */}
                <motion.g
                  animate={{ rotate: [0, -35, 25, -35, 0] }}
                  transition={{ duration: 0.28, repeat: Infinity, ease: 'linear', delay: 0.21 }}
                  style={{ transformOrigin: '46px 60px' }}
                >
                  <line x1="46" y1="60" x2="46" y2="80" stroke="#E67325" strokeWidth="5" strokeLinecap="round"/>
                  <ellipse cx="46" cy="83" rx="4" ry="3" fill="#8B4513"/>
                </motion.g>
              </svg>
            </motion.div>
            
            {/* Paw prints appearing as they walk */}
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={`walk-paw-${i}`}
                className="absolute text-xl"
                style={{
                  left: `${i * 6}%`,
                  bottom: '31%',
                  transform: i % 2 === 0 ? 'rotate(-8deg)' : 'rotate(8deg)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0.4], 
                  scale: [0, 1, 0.85] 
                }}
                transition={{
                  duration: 1.2,
                  delay: (i * 4) / 18,
                  ease: 'easeOut'
                }}
              >
                🐾
              </motion.div>
            ))}

            {/* Golden light trails behind animals */}
            {[0, 0.25, 0.4].map((delay, idx) => (
              <motion.div
                key={`trail-${idx}`}
                className="absolute"
                style={{
                  bottom: idx === 2 ? '48%' : idx === 1 ? '30%' : '32%',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.7), transparent)',
                  filter: 'blur(18px)',
                  zIndex: 20
                }}
                initial={{ left: '-12%', opacity: 0 }}
                animate={{
                  left: ['0%', '110%'],
                  opacity: [0, 0.9, 0.6, 0]
                }}
                transition={{
                  duration: 4,
                  delay,
                  ease: 'linear'
                }}
              />
            ))}

            {/* Cherry blossom petals drifting */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute text-2xl"
                style={{
                  left: `${8 + i * 4}%`,
                  bottom: '26%'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0, 1, 0.9],
                  y: [0, -100],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2.5,
                  delay: (i * 4) / 24,
                  ease: 'easeOut'
                }}
              >
                🌸
              </motion.div>
            ))}

            {/* Sparkles trailing */}
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-3 h-3 bg-white rounded-full"
                style={{
                  left: `${4 + i * 3}%`,
                  bottom: `${28 + (i % 4) * 4}%`,
                  filter: 'blur(1px)',
                  boxShadow: '0 0 8px rgba(255,255,255,0.9)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.6, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: (i * 4) / 35,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* CONSTELLATION OF STARS */}
      <AnimatePresence>
        {(stage === 'stars' || stage === 'radiance') && (
          <>
            {/* Star constellation */}
            {[...Array(28)].map((_, i) => {
              const angle = (i / 28) * Math.PI * 2;
              const distance = 70 + (i % 4) * 35;
              const x = 50 + Math.cos(angle) * (distance / 3.5);
              const y = 50 + Math.sin(angle) * (distance / 5);
              const size = 7 + (i % 3) * 5;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.9)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.85],
                    scale: [0, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.045,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Connecting constellation lines */}
            {stage === 'stars' && (
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 15 }}>
                {[...Array(24)].map((_, i) => {
                  const angle1 = (i / 28) * Math.PI * 2;
                  const angle2 = ((i + 1) / 28) * Math.PI * 2;
                  const distance = 70 + (i % 4) * 35;
                  
                  const x1 = 50 + Math.cos(angle1) * (distance / 3.5);
                  const y1 = 50 + Math.sin(angle1) * (distance / 5);
                  const x2 = 50 + Math.cos(angle2) * (distance / 3.5);
                  const y2 = 50 + Math.sin(angle2) * (distance / 5);
                  
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.04 }}
                    />
                  );
                })}
              </svg>
            )}
          </>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE - Rainbow explosion */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 84 rainbow-colored rays */}
            {[...Array(84)].map((_, i) => {
              const angle = (i / 84) * 360;
              const colorIndex = Math.floor((i / 84) * 7);
              const color = rainbowBands[colorIndex].color;
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '120%',
                    height: '14px',
                    background: `linear-gradient(to right, ${color}, transparent)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(5px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.006,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central rainbow supernova */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div
                className="w-[650px] h-[650px] rounded-full"
                style={{
                  background: `radial-gradient(circle, 
                    ${rainbowBands[0].color}50, 
                    ${rainbowBands[1].color}45, 
                    ${rainbowBands[2].color}40,
                    ${rainbowBands[3].color}35,
                    ${rainbowBands[4].color}30,
                    ${rainbowBands[5].color}25,
                    transparent)`,
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Flower petals spiraling */}
            {[...Array(36)].map((_, i) => {
              const angle = (i / 36) * Math.PI * 2;
              
              return (
                <motion.div
                  key={`final-petal-${i}`}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.2, 0.9],
                    x: Math.cos(angle) * 550,
                    y: Math.sin(angle) * 550,
                    opacity: [1, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.025,
                    ease: 'easeOut'
                  }}
                >
                  🌸
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}