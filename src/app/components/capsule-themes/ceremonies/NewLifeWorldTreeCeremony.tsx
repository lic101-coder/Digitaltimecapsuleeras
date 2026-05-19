/**
 * New Life - SUNRISE SYMPHONY: Epic Mountain Sunrise (LEGENDARY)
 * 
 * Young couple stands on grassy flowery plain, watching distant mountains
 * and epic sunrise with volumetric god rays, Christopher Nolan-level cinematography
 * 
 * PROPER DEPTH LAYERING:
 * - Foreground: Blooming wildflowers
 * - Mid-ground: Grassy plain with couple
 * - Background: Distant mountains (smaller, set back)
 * - Sky: Epic sunrise with god rays
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewLifeWorldTreeCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewLifeWorldTreeCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeWorldTreeCeremonyProps) {
  const [stage, setStage] = useState<'predawn' | 'firstlight' | 'rays' | 'painting'>('predawn');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('predawn') },
      { time: 4000, action: () => setStage('firstlight') },
      { time: 8000, action: () => setStage('rays') },
      { time: 13000, action: () => setStage('painting') },
      { time: 22500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  const isLit = stage !== 'predawn';
  const isRadiant = stage === 'rays' || stage === 'painting';
  const isPainting = stage === 'painting';

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* DYNAMIC SKY GRADIENT */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: isPainting
            ? 'linear-gradient(to bottom, #fbbf24 0%, #fb923c 18%, #f472b6 38%, #c084fc 58%, #818cf8 78%, #4f46e5 100%)'
            : isRadiant
            ? 'linear-gradient(to bottom, #fcd34d 0%, #fbbf24 20%, #fb923c 40%, #f472b6 60%, #c084fc 80%, #8b5cf6 100%)'
            : isLit
            ? 'linear-gradient(to bottom, #94a3b8 0%, #64748b 25%, #475569 50%, #334155 75%, #1e293b 100%)'
            : 'linear-gradient(to bottom, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)'
        }}
        transition={{ duration: 3.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* STARS - Fade out as sun rises */}
      <AnimatePresence>
        {(stage === 'predawn' || stage === 'firstlight') && (
          <>
            {[...Array(220)].map((_, i) => {
              const size = Math.random() * 2.5 + 0.8;
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute z-5"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: `0 0 ${size * 2.5}px rgba(255, 255, 255, 0.8)`,
                    willChange: 'transform'
                  }}
                  animate={{
                    opacity: [0.4, 0.9, 0.4],
                    scale: [0.9, 1.15, 0.9]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: i * 0.006
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* DISTANT MOUNTAIN RANGE - SIMPLE REALISTIC TRIANGULAR PEAKS */}
      <motion.div
        className="absolute z-10"
        style={{
          left: '0',
          right: '0',
          bottom: '35%',
          height: '26%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLit ? 1 : 0.3
        }}
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Simple mountain peaks - classic triangular shapes with varied heights */}
        {[
          { left: '8%', height: '75%', width: '15%', peakOffset: '48%' },
          { left: '20%', height: '88%', width: '18%', peakOffset: '52%' },
          { left: '35%', height: '100%', width: '20%', peakOffset: '50%' },
          { left: '52%', height: '85%', width: '17%', peakOffset: '47%' },
          { left: '66%', height: '92%', width: '19%', peakOffset: '51%' },
          { left: '82%', height: '78%', width: '16%', peakOffset: '49%' }
        ].map((peak, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: peak.left,
              bottom: '0',
              width: peak.width,
              height: peak.height,
              clipPath: `polygon(${peak.peakOffset} 0%, 0% 100%, 100% 100%)`,
              background: isLit 
                ? i % 2 === 0 
                  ? 'linear-gradient(125deg, #475569 0%, #334155 50%, #1e293b 100%)'
                  : 'linear-gradient(125deg, #334155 0%, #1e293b 50%, #0f172a 100%)'
                : 'linear-gradient(125deg, #0f172a 0%, #020617 50%, #000000 100%)',
              filter: isRadiant ? 'brightness(1.15)' : 'brightness(0.85)',
              willChange: 'filter'
            }}
          />
        ))}

        {/* Snow caps on tallest peaks */}
        {isPainting && [1, 2, 4].map((peakIndex) => {
          const peaks = [
            { left: '8%', height: '75%', width: '15%', peakOffset: '48%' },
            { left: '20%', height: '88%', width: '18%', peakOffset: '52%' },
            { left: '35%', height: '100%', width: '20%', peakOffset: '50%' },
            { left: '52%', height: '85%', width: '17%', peakOffset: '47%' },
            { left: '66%', height: '92%', width: '19%', peakOffset: '51%' },
            { left: '82%', height: '78%', width: '16%', peakOffset: '49%' }
          ];
          const peak = peaks[peakIndex];
          
          return (
            <motion.div
              key={`snow-${peakIndex}`}
              style={{
                position: 'absolute',
                left: peak.left,
                bottom: peak.height,
                width: peak.width,
                height: '18%',
                clipPath: `polygon(${peak.peakOffset} 0%, 30% 80%, 70% 80%)`,
                background: 'linear-gradient(125deg, #ffffff, #f8fafc, #e2e8f0)',
                filter: 'brightness(1.4) drop-shadow(0 2px 8px rgba(255,255,255,0.5))'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ delay: 1.2 + peakIndex * 0.25, duration: 1.8 }}
            />
          );
        })}
      </motion.div>

      {/* GRASSY PLAIN - Ground extending from bottom to horizon */}
      <motion.div
        className="absolute z-18"
        style={{
          left: '0',
          right: '0',
          bottom: '0',
          height: '38%',
          background: isPainting
            ? 'linear-gradient(to bottom, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 1) 45%, rgba(21, 128, 61, 1) 100%)'
            : isLit
            ? 'linear-gradient(to bottom, rgba(21, 128, 61, 0.7) 0%, rgba(20, 83, 45, 0.85) 45%, rgba(14, 61, 33, 1) 100%)'
            : 'linear-gradient(to bottom, rgba(15, 23, 42, 0.5) 0%, rgba(14, 61, 33, 0.7) 45%, rgba(7, 30, 16, 1) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      />

      {/* GRASS TEXTURE on plain */}
      <AnimatePresence>
        {isLit && (
          <>
            {[...Array(120)].map((_, i) => {
              const xPos = (i / 120) * 100;
              const yPos = 0 + (Math.random() * 35);
              
              return (
                <motion.div
                  key={`grass-blade-${i}`}
                  className="absolute z-19"
                  style={{
                    left: `${xPos}%`,
                    bottom: `${yPos}%`,
                    width: '2.5px',
                    height: `${12 + Math.random() * 18}px`,
                    background: isPainting 
                      ? 'linear-gradient(to top, rgba(22, 163, 74, 0.8), rgba(34, 197, 94, 0.5), transparent)'
                      : 'linear-gradient(to top, rgba(21, 128, 61, 0.6), rgba(22, 163, 74, 0.4), transparent)',
                    borderRadius: '50%',
                    transformOrigin: 'bottom center'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1.1, 1],
                    opacity: [0, 0.8],
                    rotate: [(Math.random() - 0.5) * 8]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5 + i * 0.01,
                    ease: 'easeOut'
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [-4, 4, -4]
                    }}
                    transition={{
                      duration: 2.5 + Math.random() * 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* WILDFLOWERS on plain - Mid-ground */}
      <AnimatePresence>
        {isPainting && (
          <>
            {[...Array(80)].map((_, i) => {
              const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🏵️', '💮', '🌹'];
              const xPos = (i / 80) * 100;
              const yPos = 5 + (Math.random() * 28);
              const size = 11 + Math.random() * 10;
              
              return (
                <motion.div
                  key={`plain-flower-${i}`}
                  className="absolute z-20"
                  style={{
                    left: `${xPos}%`,
                    bottom: `${yPos}%`,
                    fontSize: `${size}px`
                  }}
                  initial={{ scale: 0, rotate: 0, opacity: 0, y: 12 }}
                  animate={{
                    scale: [0, 1.3, 1],
                    rotate: [0, 15, -8, 0],
                    opacity: [0, 1],
                    y: [12, 0]
                  }}
                  transition={{
                    duration: 1.3,
                    delay: 0.8 + i * 0.025,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {flowers[i % flowers.length]}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* SUN - Rising from behind distant mountains - SMOOTH */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="absolute z-14"
            style={{
              left: '50%',
              bottom: '58%',
              transform: 'translateX(-50%)'
            }}
            initial={{ y: 350, scale: 0.5, opacity: 0 }}
            animate={{
              y: isRadiant ? -100 : 0,
              scale: isRadiant ? 2 : 1,
              opacity: 1
            }}
            transition={{
              duration: stage === 'firstlight' ? 4.5 : 5.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Main sun disc - perfectly smooth */}
            <div
              style={{
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                background: isRadiant 
                  ? 'radial-gradient(circle at center, #ffffff 0%, #fffbeb 15%, #fef9c3 30%, #fde68a 45%, #fbbf24 60%, #fb923c 75%, #f97316 90%, #ea580c 100%)'
                  : 'radial-gradient(circle at center, #ffffff 0%, #fef9c3 25%, #fbbf24 55%, #fb923c 80%, #f97316 100%)',
                boxShadow: isRadiant
                  ? '0 0 450px rgba(251, 191, 36, 1), 0 0 900px rgba(251, 146, 60, 0.9), 0 0 1400px rgba(249, 115, 22, 0.65)'
                  : '0 0 280px rgba(251, 191, 36, 0.95), 0 0 550px rgba(251, 146, 60, 0.65)',
                willChange: 'transform'
              }}
            />
            
            {/* Sun corona rays - EPIC explosion */}
            {[...Array(32)].map((_, i) => {
              const angle = (i / 32) * 360;
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: isRadiant ? '420px' : '220px',
                    height: isRadiant ? '8px' : '4.5px',
                    background: isRadiant 
                      ? 'linear-gradient(to right, rgba(251, 191, 36, 1), rgba(251, 146, 60, 0.8) 55%, rgba(249, 115, 22, 0.4) 80%, transparent)'
                      : 'linear-gradient(to right, rgba(251, 191, 36, 0.9), rgba(251, 146, 60, 0.5) 60%, transparent)',
                    transformOrigin: 'left center',
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    filter: 'blur(4px)'
                  }}
                  animate={{
                    width: isRadiant ? ['420px', '550px', '420px'] : '220px',
                    opacity: isRadiant ? [0.95, 1, 0.95] : [0.8, 1, 0.8],
                    scaleY: isRadiant ? [1, 1.8, 1] : 1
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.035
                  }}
                />
              );
            })}

            {/* Explosive radiance at peak */}
            {isRadiant && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '750px',
                  height: '750px',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.7), rgba(251, 146, 60, 0.5) 35%, rgba(249, 115, 22, 0.25) 65%, transparent)',
                  filter: 'blur(80px)',
                  pointerEvents: 'none'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 1.5],
                  opacity: [0, 1, 0.85]
                }}
                transition={{
                  duration: 3.5,
                  ease: 'easeOut'
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* VOLUMETRIC GOD RAYS */}
      <AnimatePresence>
        {(stage === 'rays' || isPainting) && (
          <>
            {[...Array(18)].map((_, i) => {
              const angle = -65 + (i * 7.5);
              const height = 900 + Math.random() * 500;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-16"
                  style={{
                    left: '50%',
                    bottom: '58%',
                    width: '12px',
                    height: `${height}px`,
                    background: 'linear-gradient(to top, rgba(251, 191, 36, 0.35), rgba(251, 191, 36, 0.18) 45%, transparent)',
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    filter: 'blur(18px)'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1.1, 1],
                    opacity: [0, 0.9, 0.75]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.12,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* COUPLE SILHOUETTE - Refined man and woman with subtle details */}
      <motion.div
        className="absolute z-32"
        style={{
          left: '30%',
          bottom: '14%',
          display: 'flex',
          gap: '4px',
          alignItems: 'flex-end'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isLit ? 1 : 0.25,
          y: 0
        }}
        transition={{ duration: 3, delay: 2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* MAN - Taller, athletic build, short hair */}
        <svg width="42" height="100" viewBox="0 0 42 100" style={{ filter: isLit ? 'drop-shadow(0 0 22px rgba(0, 0, 0, 0.95))' : 'none' }}>
          {/* Head */}
          <circle cx="21" cy="13" r="11" fill={isLit ? '#0f172a' : '#020617'} />
          
          {/* Short masculine hair */}
          <ellipse cx="21" cy="9" rx="11" ry="8" fill={isLit ? '#0f172a' : '#020617'} />
          <path d="M 10,10 Q 10,6 12,5" stroke={isLit ? '#0f172a' : '#020617'} strokeWidth="3" fill="none" />
          <path d="M 32,10 Q 32,6 30,5" stroke={isLit ? '#0f172a' : '#020617'} strokeWidth="3" fill="none" />
          
          {/* Neck */}
          <rect x="17" y="22" width="8" height="7" fill={isLit ? '#0f172a' : '#020617'} />
          
          {/* Athletic torso - broad shoulders tapering to waist */}
          <path 
            d="M 7,29 L 35,29 L 35,48 L 31,68 L 26,80 L 16,80 L 11,68 L 7,48 Z" 
            fill={isLit ? '#0f172a' : '#020617'} 
          />
          
          {/* Left arm - around her shoulder */}
          <path 
            d="M 35,33 Q 46,35 52,40" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="6" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Right arm - relaxed at side */}
          <path 
            d="M 7,33 Q 2,48 2,55" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="5.5" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Legs */}
          <rect x="11" y="80" width="7" height="20" rx="1" fill={isLit ? '#0f172a' : '#020617'} />
          <rect x="24" y="80" width="7" height="20" rx="1" fill={isLit ? '#0f172a' : '#020617'} />
        </svg>

        {/* WOMAN - Feminine silhouette with dress, long hair */}
        <svg width="40" height="92" viewBox="0 0 40 92" style={{ filter: isLit ? 'drop-shadow(0 0 22px rgba(0, 0, 0, 0.95))' : 'none' }}>
          {/* Head */}
          <circle cx="20" cy="12" r="9.5" fill={isLit ? '#0f172a' : '#020617'} />
          
          {/* Long flowing hair - key feminine feature */}
          <ellipse cx="20" cy="16" rx="14" ry="20" fill={isLit ? '#0f172a' : '#020617'} />
          
          {/* Hair strands flowing */}
          <path 
            d="M 7,14 Q 5,24 6,32" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="5" 
            fill="none" 
            strokeLinecap="round"
          />
          <path 
            d="M 33,14 Q 35,24 34,32" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="5" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Neck - slender */}
          <rect x="16" y="20" width="8" height="6" fill={isLit ? '#0f172a' : '#020617'} />
          
          {/* Upper body - narrow shoulders, defined waist */}
          <path 
            d="M 11,26 L 29,26 L 27,42 L 25,50 L 15,50 L 13,42 Z" 
            fill={isLit ? '#0f172a' : '#020617'} 
          />
          
          {/* Dress - A-line flare from waist */}
          <path 
            d="M 15,50 L 25,50 L 32,80 L 8,80 Z" 
            fill={isLit ? '#0f172a' : '#020617'} 
          />
          
          {/* Belt/waist detail */}
          <line x1="13" y1="50" x2="27" y2="50" stroke={isLit ? '#1e293b' : '#020617'} strokeWidth="1.5" />
          
          {/* Left arm - leaning toward him */}
          <path 
            d="M 11,30 Q 3,34 -8,40\" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="5" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Right arm - gracefully at side */}
          <path 
            d="M 29,30 Q 34,42 36,52" 
            stroke={isLit ? '#0f172a' : '#020617'} 
            strokeWidth="4.5" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Feet peeking from dress */}
          <ellipse cx="16" cy="82" rx="4" ry="6" fill={isLit ? '#0f172a' : '#020617'} />
          <ellipse cx="24" cy="82" rx="4" ry="6" fill={isLit ? '#0f172a' : '#020617'} />
        </svg>
      </motion.div>

      {/* FOREGROUND FLOWERS - Closest to viewer, larger */}
      <AnimatePresence>
        {isPainting && (
          <>
            {[...Array(40)].map((_, i) => {
              const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷'];
              const xPos = (i / 40) * 100;
              const yPos = 0 + (Math.random() * 8);
              const size = 18 + Math.random() * 14;
              
              return (
                <motion.div
                  key={`foreground-flower-${i}`}
                  className="absolute z-38"
                  style={{
                    left: `${xPos}%`,
                    bottom: `${yPos}%`,
                    fontSize: `${size}px`,
                    filter: yPos < 3 ? 'blur(1px)' : 'none'
                  }}
                  initial={{ scale: 0, rotate: 0, opacity: 0, y: 18 }}
                  animate={{
                    scale: [0, 1.35, 1],
                    rotate: [0, 20, -10, 0],
                    opacity: [0, 1],
                    y: [18, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.5 + i * 0.03,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {flowers[i % flowers.length]}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* TITLE */}
      <AnimatePresence>
        {isPainting && (
          <motion.div
            className="absolute text-center z-50"
            style={{
              left: '50%',
              top: '10%',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: [0, 1],
              y: [-50, 0]
            }}
            transition={{
              duration: 2.5,
              delay: 2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{
                color: '#fef9c3',
                textShadow: '0 0 60px rgba(251, 191, 36, 1), 0 0 120px rgba(251, 191, 36, 0.9), 0 8px 28px rgba(0, 0, 0, 1)',
                WebkitTextStroke: '1.5px rgba(251, 191, 36, 0.45)'
              }}
            >
              {capsuleTitle}
            </h1>
            <motion.p
              className="text-2xl md:text-3xl font-medium"
              style={{
                color: '#fbbf24',
                textShadow: '0 0 35px rgba(251, 191, 36, 1), 0 6px 22px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2.5 }}
            >
              Every sunrise is a new beginning
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}