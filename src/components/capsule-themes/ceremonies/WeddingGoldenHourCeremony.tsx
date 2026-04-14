/**
 * Wedding - Golden Hour Sunset Ceremony (Epic)
 * 
 * REFINED: Fixed sun disappearing below horizon, smooth color transitions, clear progression
 * Duration: 15 seconds
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WeddingGoldenHourCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function WeddingGoldenHourCeremony({
  isVisible,
  onComplete
}: WeddingGoldenHourCeremonyProps) {
  const [stage, setStage] = useState(0);
  const [sunY, setSunY] = useState(35); // Sun vertical position (percentage)

  useEffect(() => {
    const timeline = [
      { time: 0, stage: 0 },       // Intro
      { time: 500, stage: 1 },     // Afternoon
      { time: 2000, stage: 2 },    // Descent begins
      { time: 5000, stage: 3 },    // Golden hour intensifies
      { time: 8000, stage: 4 },    // Sun touching horizon
      { time: 10000, stage: 5 },   // Silhouettes appear
      { time: 12000, stage: 6 },   // Radiance
      { time: 15000, stage: 7 }    // Complete
    ];

    const timeouts = timeline.map(({ time, stage: s }) => 
      setTimeout(() => setStage(s), time)
    );
    
    setTimeout(onComplete, 15000);
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Smoothly animate sun descent
  useEffect(() => {
    if (stage >= 2 && stage < 5) {
      const interval = setInterval(() => {
        setSunY(prev => Math.min(prev + 0.8, 72)); // Move down to 72% (horizon line)
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Get sky colors based on stage and sun position
  const getSkyColors = () => {
    if (stage <= 1) {
      // Afternoon - blue sky
      return {
        top: '#87CEEB',
        middle: '#B0E2FF',
        bottom: '#E0F6FF'
      };
    } else if (stage === 2) {
      // Early sunset - warming up
      return {
        top: '#7EC8E3',
        middle: '#FFB347',
        bottom: '#FFE5B4'
      };
    } else if (stage === 3) {
      // Golden hour magic
      return {
        top: '#FF8C42',
        middle: '#FFA07A',
        bottom: '#FFD700'
      };
    } else if (stage >= 4) {
      // Deep golden/orange at horizon
      return {
        top: '#FF6B35',
        middle: '#FF8C00',
        bottom: '#FFD700'
      };
    }
    return { top: '#87CEEB', middle: '#B0E2FF', bottom: '#E0F6FF' };
  };

  const colors = getSkyColors();
  const horizonLine = 72; // Horizon at 72% from top
  const sunIsVisible = sunY < horizonLine - 2; // Sun disappears when it reaches horizon

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky gradient - smooth transitions */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(to bottom, ${colors.top} 0%, ${colors.middle} 50%, ${colors.bottom} 100%)`
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Clouds - drift slowly */}
      {[...Array(8)].map((_, i) => {
        const initialX = (i * 20 + Math.random() * 15) % 100;
        const y = 15 + Math.random() * 30;
        
        return (
          <motion.div
            key={`cloud-${i}`}
            className="absolute"
            style={{
              left: `${initialX}%`,
              top: `${y}%`,
              width: '120px',
              height: '50px'
            }}
            animate={{
              x: [0, 50, 100],
              opacity: stage >= 3 ? 0.9 : 0.7
            }}
            transition={{
              x: {
                duration: 40 + i * 5,
                repeat: Infinity,
                ease: 'linear'
              },
              opacity: { duration: 2 }
            }}
          >
            {/* Cloud made of overlapping circles */}
            <div className="relative w-full h-full">
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: '20%',
                  top: '50%',
                  width: '35px',
                  height: '35px',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  background: stage >= 3
                    ? 'radial-gradient(circle, rgba(255, 140, 0, 0.8), rgba(255, 165, 0, 0.6))'
                    : 'rgba(255, 255, 255, 0.85)'
                }}
                transition={{ duration: 2 }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '30%',
                  width: '50px',
                  height: '50px',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  background: stage >= 3
                    ? 'radial-gradient(circle, rgba(255, 105, 180, 0.9), rgba(255, 140, 0, 0.7))'
                    : 'rgba(255, 255, 255, 0.9)'
                }}
                transition={{ duration: 2 }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: '75%',
                  top: '50%',
                  width: '40px',
                  height: '40px',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  background: stage >= 3
                    ? 'radial-gradient(circle, rgba(255, 165, 0, 0.85), rgba(255, 215, 0, 0.65))'
                    : 'rgba(255, 255, 255, 0.87)'
                }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Sun - disappears when it reaches horizon */}
      <AnimatePresence>
        {sunIsVisible && (
          <motion.div
            className="absolute left-1/2 rounded-full"
            style={{
              top: `${sunY}%`,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #FFFFFF 0%, #FFD700 40%, #FFA500 100%)',
              boxShadow: stage >= 3
                ? '0 0 60px rgba(255, 215, 0, 1), 0 0 120px rgba(255, 165, 0, 0.8)'
                : '0 0 40px rgba(255, 255, 200, 0.7)'
            }}
            exit={{ 
              opacity: 0,
              scale: 1.2,
              transition: { duration: 1 }
            }}
          />
        )}
      </AnimatePresence>

      {/* Atmospheric glow around sun */}
      <AnimatePresence>
        {sunIsVisible && (
          <motion.div
            className="absolute left-1/2 rounded-full"
            style={{
              top: `${sunY}%`,
              width: '300px',
              height: '300px',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(80px)',
              pointerEvents: 'none'
            }}
            animate={{
              background: stage >= 3
                ? 'radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 165, 0, 0.5), transparent)'
                : 'radial-gradient(circle, rgba(255, 255, 200, 0.4), transparent)'
            }}
            transition={{ duration: 2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* God rays (crepuscular rays) when sun is low */}
      <AnimatePresence>
        {stage >= 4 && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = -40 + (i / 11) * 80; // Spread 80 degrees
              const opacity = 0.25 + Math.random() * 0.2;
              
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute origin-bottom"
                  style={{
                    left: '50%',
                    bottom: `${100 - horizonLine}%`,
                    width: '40px',
                    height: '50%',
                    background: `linear-gradient(to top, rgba(255, 215, 0, ${opacity}), rgba(255, 165, 0, ${opacity * 0.6}), transparent 70%)`,
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    filter: 'blur(3px)'
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: stage === 6 ? [opacity, opacity * 1.5, opacity] : opacity,
                    scaleY: 1
                  }}
                  transition={{
                    scaleY: { duration: 1.5, ease: 'easeOut' },
                    opacity: { duration: 2, repeat: stage === 6 ? Infinity : 0 }
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Horizon ground line */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: `${horizonLine}%`,
          height: `${100 - horizonLine}%`
        }}
        animate={{
          background: stage >= 4
            ? 'linear-gradient(to bottom, transparent 0%, rgba(60, 40, 20, 0.4) 30%, rgba(40, 25, 15, 0.8) 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(34, 139, 34, 0.3) 30%, rgba(34, 100, 34, 0.6) 100%)'
        }}
        transition={{ duration: 2 }}
      />

      {/* Couple silhouettes - CLEARER with better figures */}
      <AnimatePresence>
        {stage >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-1/2"
            style={{
              bottom: '8%',
              transform: 'translateX(-50%)'
            }}
          >
            {/* SVG silhouettes - much clearer than emojis */}
            <svg width="200" height="120" viewBox="0 0 200 120" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}>
              {/* Woman silhouette - clear dress shape */}
              <g transform="translate(50, 20)">
                {/* Head */}
                <circle cx="20" cy="15" r="12" fill="#000000" />
                {/* Hair bun */}
                <circle cx="20" cy="8" r="6" fill="#000000" />
                {/* Body/torso */}
                <ellipse cx="20" cy="40" rx="10" ry="15" fill="#000000" />
                {/* Wedding dress - A-line shape */}
                <path
                  d="M 10 40 L 5 70 Q 5 75, 10 75 L 30 75 Q 35 75, 35 70 L 30 40 Z"
                  fill="#000000"
                />
                {/* Arms */}
                <ellipse cx="10" cy="38" rx="3" ry="12" fill="#000000" transform="rotate(-20 10 38)" />
                <ellipse cx="30" cy="38" rx="3" ry="12" fill="#000000" transform="rotate(20 30 38)" />
              </g>
              
              {/* Man silhouette - suit with clear shoulders */}
              <g transform="translate(120, 20)">
                {/* Head */}
                <circle cx="20" cy="15" r="12" fill="#000000" />
                {/* Shoulders/suit jacket - wide */}
                <rect x="8" y="27" width="24" height="20" fill="#000000" rx="2" />
                {/* Body/torso */}
                <rect x="12" y="40" width="16" height="35" fill="#000000" rx="1" />
                {/* Arms */}
                <rect x="6" y="30" width="5" height="30" fill="#000000" rx="2" />
                <rect x="29" y="30" width="5" height="30" fill="#000000" rx="2" />
                {/* Legs */}
                <rect x="13" y="70" width="6" height="20" fill="#000000" rx="1" />
                <rect x="21" y="70" width="6" height="20" fill="#000000" rx="1" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Epic radiance finale */}
      <AnimatePresence>
        {stage === 6 && (
          <>
            {/* 52 radiant rays from horizon */}
            {[...Array(52)].map((_, i) => {
              const angle = (i / 52) * 360;
              
              return (
                <motion.div
                  key={`radiance-ray-${i}`}
                  className="absolute origin-left"
                  style={{
                    left: '50%',
                    top: `${horizonLine}%`,
                    width: '60%',
                    height: i % 3 === 0 ? '5px' : '3px',
                    background: i % 2 === 0
                      ? 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.5), transparent)'
                      : 'linear-gradient(to right, rgba(255, 215, 0, 1), rgba(255, 140, 0, 0.7), transparent)',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(1.5px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 1.4, 1.2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Light particles floating up */}
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${horizonLine}%`,
                  width: `${3 + Math.random() * 5}px`,
                  height: `${3 + Math.random() * 5}px`,
                  background: i % 2 === 0
                    ? 'radial-gradient(circle, #ffffff, #ffd700)'
                    : 'radial-gradient(circle, #ffd700, #ff8c00)',
                  filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.9))'
                }}
                initial={{ y: 0, opacity: 1, scale: 0 }}
                animate={{
                  y: -400 - Math.random() * 200,
                  x: (Math.random() - 0.5) * 300,
                  opacity: 0,
                  scale: 1
                }}
                transition={{
                  duration: 2.5 + Math.random() * 0.5,
                  delay: i * 0.02,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Central radiance explosion */}
            <motion.div
              className="absolute left-1/2 rounded-full"
              style={{
                top: `${horizonLine}%`,
                width: '500px',
                height: '500px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 215, 0, 0.6), rgba(255, 140, 0, 0.3), transparent)',
                filter: 'blur(60px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2.5, 2],
                opacity: [0, 0.9, 0]
              }}
              transition={{ duration: 3 }}
            />

            {/* Lens flare */}
            <motion.div
              className="absolute left-1/2 rounded-full"
              style={{
                top: `${horizonLine}%`,
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1), transparent 50%)',
                filter: 'blur(15px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.8, 1.5],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 3 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}