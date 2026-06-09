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

import React, { useState, useEffect, useMemo } from 'react';
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
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('predawn') },
      { time: 4000, action: () => setStage('firstlight') },
      { time: 8000, action: () => setStage('rays') },
      { time: 13000, action: () => setStage('painting') },
      { time: 22500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Completion failsafe - ensure ceremony always completes
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 23000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  const isLit = stage !== 'predawn';
  const isRadiant = stage === 'rays' || stage === 'painting';
  const isPainting = stage === 'painting';

  // Stable flower/butterfly data — computed once so Math.random() never re-runs on render
  const midFlowers = useMemo(() => {
    const types = ['🌸', '🌺', '🌼', '🌻', '🌷', '🦋', '🌸', '🌺', '🦋', '🌼'];
    return Array.from({ length: 80 }, (_, i) => ({
      emoji: types[i % types.length],
      x: (i / 80) * 100,
      y: 5 + Math.random() * 26,
      size: 11 + Math.random() * 10,
      delay: 0.6 + i * 0.02,
    }));
  }, []);

  const fgFlowers = useMemo(() => {
    const types = ['🌸', '🌺', '🌼', '🌻', '🌷'];
    return Array.from({ length: 40 }, (_, i) => ({
      emoji: types[i % types.length],
      x: (i / 40) * 100,
      y: Math.random() * 7,
      size: 18 + Math.random() * 14,
      blur: Math.random() < 0.2,
      delay: 1.2 + i * 0.025,
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* CINEMATIC SUNRISE SKY - National Geographic quality */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: isPainting
            ? 'linear-gradient(to bottom, #93c5fd 0%, #60a5fa 8%, #fbbf24 22%, #f97316 36%, #fb7185 52%, #ec4899 66%, #c026d3 80%, #7e22ce 100%)'
            : isRadiant
            ? 'linear-gradient(to bottom, #bfdbfe 0%, #93c5fd 10%, #fcd34d 24%, #fbbf24 38%, #fb923c 52%, #f97316 66%, #c026d3 82%, #581c87 100%)'
            : isLit
            ? 'linear-gradient(to bottom, #1e3a5f 0%, #2d5986 18%, #f97316 38%, #fbbf24 55%, #fde68a 72%, #fef9c3 100%)'
            : 'linear-gradient(to bottom, #020617 0%, #0f172a 25%, #1e1b4b 60%, #312e81 85%, #3730a3 100%)'
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ENHANCED: Atmospheric color wash during sunrise */}
      {isRadiant && (
        <motion.div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, 0.3) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 60%)',
            mixBlendMode: 'overlay'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.6] }}
          transition={{ duration: 3.5, delay: 1, ease: 'easeOut' }}
        />
      )}

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
                    repeat: completed ? 0 : 10,
                    delay: i * 0.006
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* ENHANCED: DISTANT MOUNTAIN RANGE - MAJESTIC LAYERED PEAKS */}
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
        {/* Atmospheric haze in valleys - DEPTH EFFECT */}
        {isPainting && [0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={`valley-mist-${i}`}
            style={{
              position: 'absolute',
              left: `${15 + i * 18}%`,
              bottom: '0',
              width: '120px',
              height: '35%',
              background: 'linear-gradient(to top, rgba(251, 191, 36, 0.25), rgba(251, 191, 36, 0.15) 40%, transparent)',
              filter: 'blur(25px)',
              mixBlendMode: 'overlay'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.5] }}
            transition={{ duration: 2.5, delay: 2 + i * 0.3, ease: 'easeOut' }}
          />
        ))}

        {/* DRAMATICALLY DIFFERENT MOUNTAIN COLORS - DEEP PURPLE/MAGENTA */}
        {[
          { left: '5%', height: '80%', width: '18%', peakOffset: '48%' },
          { left: '18%', height: '95%', width: '21%', peakOffset: '52%' },
          { left: '35%', height: '110%', width: '24%', peakOffset: '50%' },
          { left: '55%', height: '92%', width: '20%', peakOffset: '47%' },
          { left: '72%', height: '98%', width: '22%', peakOffset: '51%' }
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
                  ? 'linear-gradient(125deg, #5f27cd 0%, #341f97 50%, #2c3a47 100%)'
                  : 'linear-gradient(125deg, #341f97 0%, #2c3a47 50%, #1e272e 100%)'
                : 'linear-gradient(125deg, #0f172a 0%, #020617 50%, #000000 100%)',
              filter: isRadiant ? 'brightness(1.3) saturate(1.4)' : 'brightness(0.85)',
              boxShadow: isRadiant ? `inset 0 0 60px rgba(255, 107, 53, 0.4)` : 'none',
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

      {/* DRAMATICALLY DIFFERENT GROUND - GOLDEN/YELLOW MEADOW */}
      <motion.div
        className="absolute z-18"
        style={{
          left: '0',
          right: '0',
          bottom: '0',
          height: '38%',
          background: isPainting
            ? 'linear-gradient(to bottom, rgba(250, 204, 21, 0.95) 0%, rgba(234, 179, 8, 1) 45%, rgba(202, 138, 4, 1) 100%)'
            : isLit
            ? 'linear-gradient(to bottom, rgba(202, 138, 4, 0.7) 0%, rgba(161, 98, 7, 0.85) 45%, rgba(133, 77, 14, 1) 100%)'
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

      {/* WILDFLOWERS + BUTTERFLIES on plain - Mid-ground */}
      <AnimatePresence>
        {isPainting && (
          <>
            {midFlowers.map((f, i) => (
              <motion.div
                key={`plain-flower-${i}`}
                className="absolute z-20"
                style={{ left: `${f.x}%`, bottom: `${f.y}%`, fontSize: `${f.size}px` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {f.emoji}
              </motion.div>
            ))}
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
            initial={{ y: 200, scale: 0.95, opacity: 0 }}
            animate={{
              y: isRadiant ? -15 : 80,
              scale: isRadiant ? 1.25 : 0.95,
              opacity: 1
            }}
            transition={{
              duration: stage === 'firstlight' ? 5 : 6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* SUN DISC - clean radial gradient, no internal ray artifacts */}
            <motion.div
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: isRadiant
                  ? 'radial-gradient(circle at center, #ffffff 0%, #fffff0 10%, #fffde7 20%, #fff9c4 32%, #fef3c7 44%, #fde68a 58%, #fbbf24 74%, #f59e0b 88%, #f97316 100%)'
                  : 'radial-gradient(circle at center, #ffffff 0%, #fff9c4 22%, #fde68a 46%, #fbbf24 70%, #f59e0b 88%, #f97316 100%)',
                boxShadow: isRadiant
                  ? [
                      '0 0 0 18px rgba(251, 191, 36, 0.35)',
                      '0 0 0 40px rgba(251, 146, 60, 0.2)',
                      '0 0 0 80px rgba(249, 115, 22, 0.1)',
                      '0 0 100px 50px rgba(251, 191, 36, 0.75)',
                      '0 0 200px 80px rgba(251, 146, 60, 0.45)',
                      '0 0 380px 100px rgba(249, 115, 22, 0.22)'
                    ].join(', ')
                  : [
                      '0 0 0 12px rgba(251, 191, 36, 0.28)',
                      '0 0 0 28px rgba(251, 146, 60, 0.14)',
                      '0 0 70px 35px rgba(251, 191, 36, 0.6)',
                      '0 0 140px 50px rgba(251, 146, 60, 0.32)'
                    ].join(', '),
                willChange: 'transform'
              }}
              animate={{ scale: isRadiant ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 12 clean sun rays — left edge starts at sun centre, rotate from there */}
            {[...Array(12)].map((_, i) => {
              const angle = i * 30;
              return (
                <motion.div
                  key={`ray-${i}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    height: isRadiant ? '8px' : '5px',
                    marginTop: isRadiant ? '-4px' : '-2.5px',
                    background: 'linear-gradient(to right, rgba(255,255,255,0.75), rgba(251,191,36,0.5) 30%, rgba(249,115,22,0.25) 65%, transparent)',
                    transformOrigin: '0% 50%',
                    transform: `rotate(${angle}deg)`,
                    borderRadius: '0 4px 4px 0',
                    pointerEvents: 'none'
                  }}
                  animate={{
                    width: isRadiant ? ['160px', '210px', '160px'] : ['90px', '110px', '90px'],
                    opacity: isRadiant ? [0.85, 1, 0.85] : [0.55, 0.75, 0.55]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}

            {/* Soft corona halo ring */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: isRadiant ? '420px' : '340px',
                height: isRadiant ? '420px' : '340px',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: isRadiant
                  ? 'radial-gradient(circle at center, transparent 40%, rgba(251,191,36,0.18) 55%, rgba(251,146,60,0.1) 72%, transparent 88%)'
                  : 'radial-gradient(circle at center, transparent 44%, rgba(251,191,36,0.14) 58%, transparent 80%)',
                pointerEvents: 'none'
              }}
              animate={{ scale: isRadiant ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Radiant atmosphere bloom at peak */}
            {isRadiant && (
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '700px',
                  height: '700px',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at center, rgba(251,191,36,0.45) 0%, rgba(251,146,60,0.28) 35%, rgba(249,115,22,0.12) 62%, transparent 80%)',
                  filter: 'blur(55px)',
                  pointerEvents: 'none'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.7, 1.4], opacity: [0, 0.95, 0.8] }}
                transition={{ duration: 3.5, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENHANCED: VOLUMETRIC GOD RAYS - CHRISTOPHER NOLAN CINEMATOGRAPHY */}
      <AnimatePresence>
        {(stage === 'rays' || isPainting) && (
          <>
            {/* MASSIVE CINEMATIC GOD RAYS - Christopher Nolan level */}
            {[...Array(24)].map((_, i) => {
              const angle = -70 + (i * 6);
              const height = 1000 + Math.random() * 600;
              const intensity = 0.4 + (1 - Math.abs(i - 12) / 12) * 0.4; // Stronger in center

              return (
                <motion.div
                  key={`godray-${i}`}
                  className="absolute z-16"
                  style={{
                    left: '50%',
                    bottom: '58%',
                    width: '18px',
                    height: `${height}px`,
                    background: `linear-gradient(to top, rgba(251, 191, 36, ${intensity}), rgba(251, 191, 36, ${intensity * 0.65}) 40%, rgba(251, 191, 36, ${intensity * 0.3}) 70%, transparent)`,
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    filter: 'blur(20px)',
                    mixBlendMode: 'screen'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1.15, 1],
                    opacity: [0, 1, 0.85],
                    width: isPainting ? ['18px', '24px', '18px'] : '18px'
                  }}
                  transition={{
                    scaleY: { duration: 3, delay: i * 0.1, ease: 'easeOut' },
                    opacity: { duration: 3, delay: i * 0.1, ease: 'easeOut' },
                    width: { duration: 3.5, delay: 2.5, repeat: completed ? 0 : 2, ease: 'easeInOut' }
                  }}
                />
              );
            })}

            {/* Secondary atmospheric rays for depth */}
            {isPainting && [...Array(12)].map((_, i) => {
              const angle = -60 + (i * 10);
              const height = 700 + Math.random() * 400;

              return (
                <motion.div
                  key={`atmos-ray-${i}`}
                  className="absolute z-15"
                  style={{
                    left: '50%',
                    bottom: '58%',
                    width: '20px',
                    height: `${height}px`,
                    background: 'linear-gradient(to top, rgba(255, 243, 199, 0.2), rgba(255, 243, 199, 0.1) 40%, transparent)',
                    transformOrigin: 'bottom center',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    filter: 'blur(30px)',
                    mixBlendMode: 'overlay'
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: [0, 1.05, 1],
                    opacity: [0, 0.6, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    delay: 1.5 + i * 0.15,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Dust particles floating in god rays */}
            {isPainting && [...Array(30)].map((_, i) => {
              const xPos = 45 + Math.random() * 10;
              const yPos = 40 + Math.random() * 35;

              return (
                <motion.div
                  key={`dust-${i}`}
                  className="absolute z-17 rounded-full"
                  style={{
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    width: '3px',
                    height: '3px',
                    background: 'rgba(251, 243, 199, 0.8)',
                    boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
                    filter: 'blur(1px)'
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.6, 0.8],
                    y: [-30, 15, -20],
                    x: [0, Math.sin(i) * 15, Math.cos(i) * 10]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    delay: 2 + Math.random() * 2,
                    repeat: completed ? 0 : 1,
                    ease: 'easeInOut'
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
            {fgFlowers.map((f, i) => (
              <motion.div
                key={`fg-flower-${i}`}
                className="absolute z-38"
                style={{
                  left: `${f.x}%`,
                  bottom: `${f.y}%`,
                  fontSize: `${f.size}px`,
                  filter: f.blur ? 'blur(1px)' : 'none'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {f.emoji}
              </motion.div>
            ))}
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