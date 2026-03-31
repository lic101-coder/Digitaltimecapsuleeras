/**
 * Pet Living Stained Glass Ceremony (PET EMOJIS EDITION)
 * 
 * Your journey immortalized as a magnificent cathedral stained glass window.
 * Each panel features meaningful pet symbols and moments.
 * 
 * Duration: 18 seconds
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PetHeartbeatBondCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function PetHeartbeatBondCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: PetHeartbeatBondCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'frame' | 'first' | 'panels' | 'assembly' | 'light' | 'illuminate' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 800, action: () => setStage('frame') },
      { time: 2000, action: () => setStage('first') },
      { time: 3800, action: () => setStage('panels') },
      { time: 6500, action: () => setStage('assembly') },
      { time: 10500, action: () => setStage('light') },
      { time: 13500, action: () => setStage('illuminate') },
      { time: 15500, action: () => setStage('radiance') },
      { time: 17500, action: () => setStage('outro') },
      { time: 18000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Panel configurations with PET EMOJIS
  const panels = [
    { id: 'center', color: '#fbbf24', emoji: '💛', label: 'Love', angle: 0, distance: 0 },
    { id: 'ruby', color: '#dc2626', emoji: '🎾', label: 'Play', angle: 0, distance: 150 },
    { id: 'sapphire', color: '#2563eb', emoji: '🐾', label: 'Paws', angle: 72, distance: 150 },
    { id: 'emerald', color: '#059669', emoji: '🦴', label: 'Treats', angle: 144, distance: 150 },
    { id: 'amethyst', color: '#7c3aed', emoji: '🐕', label: 'Companion', angle: 216, distance: 150 },
    { id: 'gold', color: '#f59e0b', emoji: '🐈', label: 'Friend', angle: 288, distance: 150 }
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]">
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

      {/* Gothic window frame */}
      <AnimatePresence>
        {(stage === 'frame' || stage === 'first' || stage === 'panels' || stage === 'assembly' || stage === 'light' || stage === 'illuminate') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <svg width="450" height="450" viewBox="0 0 450 450" className="absolute -left-[225px] -top-[225px]">
              <defs>
                <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#78716c" />
                  <stop offset="50%" stopColor="#d6d3d1" />
                  <stop offset="100%" stopColor="#78716c" />
                </linearGradient>
              </defs>
              
              {/* Outer circle frame */}
              <circle cx="225" cy="225" r="210" fill="none" stroke="url(#frameGrad)" strokeWidth="14" />
              
              {/* Inner decorative circle */}
              <circle cx="225" cy="225" r="185" fill="none" stroke="url(#frameGrad)" strokeWidth="5" />
              
              {/* Lead lines radiating from center */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <line
                  key={angle}
                  x1="225"
                  y1="225"
                  x2={225 + Math.cos((angle - 90) * Math.PI / 180) * 185}
                  y2={225 + Math.sin((angle - 90) * Math.PI / 180) * 185}
                  stroke="#57534e"
                  strokeWidth="4"
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center panel - Heart of Love */}
      <AnimatePresence>
        {(stage === 'first' || stage === 'panels' || stage === 'assembly' || stage === 'light' || stage === 'illuminate') && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
              style={{
                backgroundColor: panels[0].color,
                boxShadow: stage === 'light' || stage === 'illuminate' 
                  ? `0 0 70px ${panels[0].color}, 0 0 120px ${panels[0].color}`
                  : `0 0 35px ${panels[0].color}`,
                border: '3px solid #57534e'
              }}
            >
              {panels[0].emoji}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story panels - pet memories */}
      <AnimatePresence>
        {(stage === 'panels' || stage === 'assembly' || stage === 'light' || stage === 'illuminate') && (
          <>
            {panels.slice(1).map((panel, idx) => {
              const isAssembled = stage === 'assembly' || stage === 'light' || stage === 'illuminate';
              
              // Calculate positions
              const finalAngle = panel.angle;
              const initialAngle = finalAngle + 180;
              const distance = panel.distance;
              
              const finalX = Math.cos((finalAngle - 90) * Math.PI / 180) * distance;
              const finalY = Math.sin((finalAngle - 90) * Math.PI / 180) * distance;
              const initialX = Math.cos((initialAngle - 90) * Math.PI / 180) * 350;
              const initialY = Math.sin((initialAngle - 90) * Math.PI / 180) * 350;
              
              return (
                <motion.div
                  key={panel.id}
                  className="absolute left-1/2 top-1/2 z-20"
                  initial={{ 
                    x: initialX - 44,
                    y: initialY - 44,
                    opacity: 0,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    x: isAssembled ? finalX - 44 : initialX - 44,
                    y: isAssembled ? finalY - 44 : initialY - 44,
                    opacity: 1,
                    scale: 1,
                    rotate: isAssembled ? 0 : 720
                  }}
                  transition={{
                    duration: isAssembled ? 2.5 : 1.2,
                    delay: isAssembled ? 0 : idx * 0.25,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <div
                    className="w-22 h-22 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      width: '88px',
                      height: '88px',
                      backgroundColor: panel.color,
                      boxShadow: stage === 'light' || stage === 'illuminate'
                        ? `0 0 60px ${panel.color}, 0 0 100px ${panel.color}`
                        : `0 0 30px ${panel.color}`,
                      border: '3px solid #57534e'
                    }}
                  >
                    {panel.emoji}
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Pet-themed decorative elements */}
      <AnimatePresence>
        {(stage === 'assembly' || stage === 'light' || stage === 'illuminate') && (
          <>
            {[...Array(16)].map((_, i) => {
              const angle = (i / 16) * 360;
              const radius = 165; // REDUCED from 200 to keep icons visible
              const x = 50 + (Math.cos((angle - 90) * Math.PI / 180) * radius * 0.01) * 100;
              const y = 50 + (Math.sin((angle - 90) * Math.PI / 180) * radius * 0.01) * 100;
              const emojis = ['🐾', '💕', '🦴', '⭐', '🎾', '🐕', '🐈', '🐦'];
              const emoji = emojis[i % emojis.length];
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-xl z-15" // REDUCED from text-2xl to text-xl
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 + i * 0.04 }}
                >
                  {emoji}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Sunrise light emerging */}
      <AnimatePresence>
        {(stage === 'light' || stage === 'illuminate') && (
          <>
            {/* Golden sunrise glow */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'illuminate' ? 1 : 0.5 }}
              transition={{ duration: 2.5 }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.5), rgba(245, 158, 11, 0.3), transparent 55%)',
                  filter: 'blur(80px)'
                }}
              />
            </motion.div>

            {/* Colored light rays through each panel */}
            {panels.map((panel, i) => {
              const angle = panel.angle;
              return (
                <motion.div
                  key={`ray-${panel.id}`}
                  className="absolute left-1/2 top-1/2 z-5"
                  style={{
                    width: '250px',
                    height: '250px',
                    transformOrigin: 'center',
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: stage === 'illuminate' ? 0.9 : 0.5, 
                    scale: stage === 'illuminate' ? 2.5 : 1.2 
                  }}
                  transition={{ duration: 2, delay: i * 0.12 }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle, ${panel.color}50, transparent)`,
                      filter: 'blur(50px)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Epic radiance explosion */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 80-ray colored light burst */}
            {[...Array(80)].map((_, i) => {
              const angle = (i / 80) * 360;
              const colorIndex = Math.floor((i / 80) * 6);
              const colors = ['#dc2626', '#f59e0b', '#fbbf24', '#059669', '#2563eb', '#7c3aed'];
              const color = colors[colorIndex];
              
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 origin-left z-40"
                  style={{
                    width: '120%',
                    height: '14px',
                    background: `linear-gradient(to right, ${color}, transparent)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.007,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central radiant sun */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-35"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div
                className="w-[550px] h-[550px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 1), rgba(245, 158, 11, 0.8), rgba(220, 38, 38, 0.5), transparent)',
                  filter: 'blur(120px)'
                }}
              />
            </motion.div>

            {/* Glass shards drifting outward */}
            {[...Array(55)].map((_, i) => {
              const colors = ['#dc2626', '#f59e0b', '#fbbf24', '#059669', '#2563eb', '#7c3aed'];
              const color = colors[i % colors.length];
              const angle = (i / 55) * Math.PI * 2;
              
              return (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute left-1/2 top-1/2 z-45"
                  style={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: color,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'blur(1px)'
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    scale: [0, 1.2, 0.8],
                    x: Math.cos(angle) * (350 + i * 10),
                    y: Math.sin(angle) * (350 + i * 10),
                    opacity: [1, 1, 0],
                    rotate: [0, 360, 900]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.018,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Prismatic sparkles */}
            {[...Array(35)].map((_, i) => {
              const colors = ['#dc2626', '#f59e0b', '#fbbf24', '#059669', '#2563eb', '#7c3aed'];
              const color = colors[i % colors.length];
              
              return (
                <motion.div
                  key={`prism-${i}`}
                  className="absolute left-1/2 top-1/2 z-45"
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    filter: 'blur(2px)'
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.8, 0],
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.8 + i * 0.035,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Outro fade */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}