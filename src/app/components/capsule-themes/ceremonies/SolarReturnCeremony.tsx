/**
 * Solar Return - SUNRISE SYMPHONY 🌄
 *
 * HIGH-PRIORITY COMPLETE REBUILD
 *
 * CONCEPT: Cinematic sunrise representing a new chapter of life.
 * Realistic mountain ranges with natural contours, recognizable couple silhouettes,
 * physically accurate sunrise lighting with atmospheric effects.
 *
 * VISUAL QUALITY: National Geographic / Cinematic
 *
 * SEQUENCE:
 * 1. Dark Horizon - Pre-dawn darkness
 * 2. Dawn Light - Subtle light appears on horizon
 * 3. Mountains Revealed - Realistic mountain range emerges from darkness
 * 4. Couple Visible - Two silhouettes become clear
 * 5. Sun Rises - Physically accurate sunrise, stays properly sized
 * 6. Landscape Illuminated - Natural atmospheric lighting spreads
 * 7. Birds Cross - Brief birds flying across horizon
 * 8. Warm Expansion - Warm light fills the scene
 * 9. New Life Emblem - Sunlight forms into emblem
 * 10. Completion Screen
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getOptimalParticleCount,
  getOptimalBlur,
  getPerformanceStyle,
  shouldRenderComplexEffect
} from './ceremonyOptimization';

interface SolarReturnCeremonyProps {
  onComplete: () => void;
  isVisible: boolean;
  themeConfig?: any;
}

export function SolarReturnCeremony({ onComplete, isVisible, themeConfig }: SolarReturnCeremonyProps) {
  const [stage, setStage] = useState<'dark' | 'dawn' | 'mountains' | 'couple' | 'sunrise' | 'illuminated' | 'birds' | 'warmth' | 'emblem' | 'complete'>('dark');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('dark') },
      { time: 2000, action: () => setStage('dawn') },
      { time: 4000, action: () => setStage('mountains') },
      { time: 6000, action: () => setStage('couple') },
      { time: 8000, action: () => setStage('sunrise') },
      { time: 11000, action: () => setStage('illuminated') },
      { time: 13500, action: () => setStage('birds') },
      { time: 15000, action: () => setStage('warmth') },
      { time: 17000, action: () => setStage('emblem') },
      { time: 19500, action: () => {
        setStage('complete');
        setCompleted(true);
        onComplete();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // FAILSAFE: Force completion after 22 seconds
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Sunrise Symphony failsafe triggered - forcing completion');
        setStage('complete');
        setCompleted(true);
        onComplete();
      }
    }, 22000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []);

  if (!isVisible) return null;

  const isDarkStage = stage === 'dark';
  const isDawnPlus = stage !== 'dark';
  const isMountainsPlus = ['mountains', 'couple', 'sunrise', 'illuminated', 'birds', 'warmth', 'emblem', 'complete'].includes(stage);
  const isCouplePlus = ['couple', 'sunrise', 'illuminated', 'birds', 'warmth', 'emblem', 'complete'].includes(stage);
  const isSunrisePlus = ['sunrise', 'illuminated', 'birds', 'warmth', 'emblem', 'complete'].includes(stage);
  const isIlluminatedPlus = ['illuminated', 'birds', 'warmth', 'emblem', 'complete'].includes(stage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        ...getPerformanceStyle(),
        background: isDarkStage
          ? '#0a0a12'
          : isDawnPlus && !isSunrisePlus
          ? 'linear-gradient(to top, #1a1a2e 0%, #2d2d44 30%, #4a4a5e 60%, #6b6b78 100%)'
          : 'linear-gradient(to top, #1e3a5f 0%, #3d5a7c 20%, #5c7a9d 40%, #87a8c5 60%, #b4cfe0 80%, #e8f4f8 100%)'
      }}
    >
      {/* DAWN LIGHT - Subtle glow on horizon */}
      <AnimatePresence>
        {isDawnPlus && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{
              background: isSunrisePlus
                ? 'linear-gradient(to top, rgba(255, 193, 7, 0.6), rgba(255, 152, 0, 0.4), rgba(255, 87, 34, 0.2), transparent)'
                : 'linear-gradient(to top, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.1), transparent)',
              filter: `blur(${getOptimalBlur(40)}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>

      {/* REALISTIC MOUNTAIN RANGE - Natural contours, layered depth */}
      <AnimatePresence>
        {isMountainsPlus && (
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            {/* Layer 1: Distant background mountains (lightest) */}
            <motion.svg
              viewBox="0 0 1200 400"
              className="absolute bottom-0 left-0 w-full"
              style={{ height: '35%', opacity: 0.4 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isIlluminatedPlus ? 0.6 : 0.4, y: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <path
                d="M 0,300 L 150,200 Q 250,140 350,180 Q 450,220 550,160 Q 650,100 750,140 Q 850,180 950,120 Q 1050,60 1150,100 L 1200,100 L 1200,400 L 0,400 Z"
                fill={isIlluminatedPlus ? '#5a7a9a' : '#3a4a5a'}
                stroke="none"
              />
            </motion.svg>

            {/* Layer 2: Middle mountains (medium tone) */}
            <motion.svg
              viewBox="0 0 1200 450"
              className="absolute bottom-0 left-0 w-full"
              style={{ height: '45%', opacity: 0.7 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isIlluminatedPlus ? 0.85 : 0.7, y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            >
              <path
                d="M 0,350 L 100,250 Q 200,180 300,220 Q 400,260 500,200 Q 600,140 700,180 Q 800,220 900,160 Q 1000,100 1100,140 L 1200,170 L 1200,450 L 0,450 Z"
                fill={isIlluminatedPlus ? '#4a6078' : '#2a3a48'}
                stroke="none"
              />
            </motion.svg>

            {/* Layer 3: Foreground mountains (darkest silhouette) */}
            <motion.svg
              viewBox="0 0 1200 500"
              className="absolute bottom-0 left-0 w-full"
              style={{ height: '55%' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }}
            >
              <path
                d="M 0,400 L 80,320 Q 150,260 220,300 Q 290,340 360,280 Q 430,220 500,260 Q 570,300 640,240 Q 710,180 780,220 Q 850,260 920,200 Q 990,140 1060,180 Q 1130,220 1200,240 L 1200,500 L 0,500 Z"
                fill={isIlluminatedPlus ? '#2a3a48' : '#1a1a2e'}
                stroke="none"
              />
            </motion.svg>
          </div>
        )}
      </AnimatePresence>

      {/* COUPLE SILHOUETTES - Realistic human proportions, natural stance */}
      <AnimatePresence>
        {isCouplePlus && (
          <motion.div
            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ zIndex: 10 }}
          >
            {/* Woman on left */}
            <svg width="80" height="200" viewBox="0 0 80 200" className="absolute left-0" style={{ transform: 'translateX(-50px)' }}>
              {/* Head */}
              <ellipse cx="40" cy="22" rx="14" ry="16" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Hair */}
              <path d="M 26,20 Q 26,12 40,10 Q 54,12 54,20 L 54,28 Q 48,30 40,30 Q 32,30 26,28 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Neck */}
              <rect x="36" y="38" width="8" height="12" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Torso */}
              <path d="M 28,50 Q 26,70 24,90 L 24,130 Q 28,135 40,135 Q 52,135 56,130 L 56,90 Q 54,70 52,50 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Left arm */}
              <path d="M 28,55 Q 20,60 16,75 L 16,105 Q 18,108 20,105 L 24,80 Q 26,65 28,60 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Right arm (holding partner's hand) */}
              <path d="M 52,55 Q 58,58 62,65 L 64,75" fill="none" stroke={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} strokeWidth="7" strokeLinecap="round" />
              {/* Skirt/dress */}
              <path d="M 24,130 Q 22,150 20,170 Q 20,180 26,190 Q 32,185 40,185 Q 48,185 54,190 Q 60,180 60,170 Q 58,150 56,130 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
            </svg>

            {/* Man on right */}
            <svg width="85" height="200" viewBox="0 0 85 200" className="absolute right-0" style={{ transform: 'translateX(30px)' }}>
              {/* Head */}
              <ellipse cx="42" cy="20" rx="15" ry="17" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Short hair */}
              <path d="M 27,18 Q 27,8 42,6 Q 57,8 57,18" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Neck */}
              <rect x="38" y="37" width="8" height="13" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Shoulders/Torso */}
              <path d="M 25,50 Q 23,52 22,60 L 20,100 Q 20,140 22,145 L 30,145 L 30,100 Q 32,75 34,60 Q 36,52 42,50 Q 48,52 50,60 Q 52,75 54,100 L 54,145 L 62,145 Q 64,140 64,100 L 62,60 Q 61,52 59,50 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Left arm (holding partner's hand) */}
              <path d="M 25,55 Q 20,58 16,65 L 14,75" fill="none" stroke={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} strokeWidth="7" strokeLinecap="round" />
              {/* Right arm */}
              <path d="M 59,55 Q 66,60 70,75 L 70,105 Q 68,108 66,105 L 62,80 Q 60,65 59,60 Z" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              {/* Legs */}
              <rect x="28" y="145" width="9" height="52" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
              <rect x="47" y="145" width="9" height="52" fill={isIlluminatedPlus ? '#1a1a2e' : '#0a0a12'} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUN - Realistic scale, stays properly sized */}
      <AnimatePresence>
        {isSunrisePlus && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            initial={{ bottom: '-5%', opacity: 0 }}
            animate={{
              bottom: isIlluminatedPlus ? '35%' : '15%',
              opacity: 1
            }}
            transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ zIndex: 5 }}
          >
            {/* Sun core - STAYS 120px, never grows larger */}
            <div
              className="relative rounded-full"
              style={{
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, #fffaf0 0%, #fff4e6 25%, #ffd700 50%, #ffa500 75%, #ff8c00 100%)',
                boxShadow: shouldRenderComplexEffect()
                  ? `0 0 ${getOptimalBlur(60)}px rgba(255, 215, 0, 0.9), 0 0 ${getOptimalBlur(120)}px rgba(255, 152, 0, 0.6)`
                  : `0 0 40px rgba(255, 215, 0, 0.8)`,
              }}
            />

            {/* Atmospheric glow around sun */}
            {shouldRenderComplexEffect() && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  width: '200px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3), rgba(255, 152, 0, 0.2), transparent)',
                  filter: `blur(${getOptimalBlur(50)}px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: completed ? 0 : Infinity,
                  ease: 'easeInOut'
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIRDS FLYING ACROSS - Brief natural movement */}
      <AnimatePresence>
        {stage === 'birds' && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`bird-${i}`}
                className="absolute text-2xl pointer-events-none"
                initial={{ x: '-10%', y: `${30 + i * 5}%`, opacity: 0 }}
                animate={{
                  x: '110%',
                  y: `${28 + i * 5}%`,
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  ease: 'linear'
                }}
                style={{ zIndex: 15 }}
              >
                🕊️
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* WARM LIGHT RAYS from sun */}
      <AnimatePresence>
        {isIlluminatedPlus && shouldRenderComplexEffect() && (
          <>
            {Array.from({ length: getOptimalParticleCount(24) }).map((_, i) => {
              const angle = (i / 24) * 360;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute left-1/2 pointer-events-none"
                  style={{
                    bottom: '35%',
                    width: '2px',
                    height: '35vh',
                    background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.4), transparent)',
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'top center',
                    filter: `blur(${getOptimalBlur(2)}px)`,
                    zIndex: 4
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0.4],
                    scaleY: 1
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.03,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* NEW LIFE EMBLEM - Forms from sunlight */}
      <AnimatePresence>
        {stage === 'emblem' && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl pointer-events-none"
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0
            }}
            transition={{
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            style={{
              filter: `drop-shadow(0 0 ${getOptimalBlur(40)}px rgba(255, 215, 0, 1))`,
              zIndex: 20
            }}
          >
            👶
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
