/**
 * New Nest - First Light Switch Ceremony (RARE)
 * 
 * CONCEPT: Dark empty space. Hand reaches for light switch. CLICK. Room explodes 
 * with light revealing fully furnished room. Each switch reveals another room. 
 * Final flip lights entire house exterior glowing in night.
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewNestLightSwitchCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewNestLightSwitchCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewNestLightSwitchCeremonyProps) {
  const [stage, setStage] = useState<'darkness' | 'room1' | 'room2' | 'room3' | 'exterior' | 'allglow' | 'radiance' | 'outro'>('darkness');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('darkness') },
      { time: 1000, action: () => setStage('room1') },
      { time: 3000, action: () => setStage('room2') },
      { time: 5000, action: () => setStage('room3') },
      { time: 7000, action: () => setStage('exterior') },
      { time: 9000, action: () => setStage('allglow') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 13000, action: () => setStage('outro') },
      { time: 13500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {/* Title overlay */}
      <AnimatePresence>
        {stage === 'darkness' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/3 left-0 right-0 text-center z-50"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{
                color: '#fbbf24',
                textShadow: '0 4px 20px rgba(251, 191, 36, 0.4)'
              }}
            >
              Welcome Home
            </motion.h1>
            <p className="text-amber-200 text-xl">Your New Beginning</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROOM 1: LIVING ROOM */}
      <AnimatePresence>
        {(stage === 'room1' || stage === 'room2' || stage === 'room3' || stage === 'exterior' || stage === 'allglow') && (
          <>
            {/* Hand reaching for switch */}
            {stage === 'room1' && (
              <>
                {/* Light switch - REMOVED HAND, switch flips magically */}
                <motion.div
                  className="absolute right-[8%] top-1/2 -translate-y-1/2 z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Switch plate with realistic depth */}
                  <div
                    className="relative"
                    style={{
                      width: '55px',
                      height: '90px',
                      background: 'linear-gradient(145deg, #fafafa, #d4d4d4)',
                      borderRadius: '6px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {/* Screw holes for realism */}
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #e5e5e5, #737373)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #e5e5e5, #737373)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
                    }} />
                    
                    {/* Switch cutout */}
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '26px',
                      height: '50px',
                      background: 'linear-gradient(180deg, #a3a3a3, #525252)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)'
                    }} />
                    
                    {/* Switch toggle - flips magically on its own */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: '22px',
                        height: '42px',
                        background: stage === 'room1' ? 
                          'linear-gradient(180deg, #fde047, #fbbf24, #f59e0b)' : 
                          'linear-gradient(180deg, #f5f5f5, #d4d4d4)',
                        borderRadius: '4px',
                        boxShadow: stage === 'room1' ?
                          '0 3px 8px rgba(251, 191, 36, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)' :
                          '0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        transformOrigin: 'center center',
                        zIndex: 10
                      }}
                      initial={{ rotateX: 15 }}
                      animate={{ 
                        rotateX: stage === 'room1' ? -15 : 15,
                        y: stage === 'room1' ? -8 : 8
                      }}
                      transition={{ duration: 0.15, delay: 1.0, type: 'spring', stiffness: 400 }}
                    >
                      {/* Shine effect on toggle */}
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        right: '4px',
                        height: '12px',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
                        borderRadius: '2px',
                        pointerEvents: 'none'
                      }} />
                    </motion.div>
                    
                    {/* ON/OFF text */}
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '7px',
                      fontWeight: 'bold',
                      color: '#525252',
                      opacity: 0.6
                    }}>ON</div>
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '7px',
                      fontWeight: 'bold',
                      color: '#525252',
                      opacity: 0.6
                    }}>OFF</div>
                  </div>
                  
                  {/* Click sparkles */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * (Math.PI / 180);
                      return (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            width: '4px',
                            height: '4px',
                            background: '#fbbf24',
                            borderRadius: '50%',
                            boxShadow: '0 0 6px #fbbf24'
                          }}
                          initial={{ x: 0, y: 0, opacity: 1 }}
                          animate={{
                            x: Math.cos(angle) * 30,
                            y: Math.sin(angle) * 30,
                            opacity: 0
                          }}
                          transition={{ duration: 0.4, delay: 1.0 }}
                        />
                      );
                    })}
                  </motion.div>
                  
                  {/* Magic energy swirl before flip */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0, rotate: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.6, 0],
                      rotate: [0, 180]
                    }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: '3px dashed rgba(251, 191, 36, 0.8)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                    }} />
                  </motion.div>
                </motion.div>
              </>
            )}

            {/* Enhanced light burst effect */}
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(ellipse at 90% 50%, rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0.3) 40%, transparent 70%)',
                  filter: 'blur(50px)'
                }}
              />
            </motion.div>
            
            {/* Secondary flash */}
            <motion.div
              className="absolute inset-0 z-19"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.2, delay: 1.2 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#fef3c7'
                }}
              />
            </motion.div>

            {/* Living Room reveal */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {/* Floor */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                  background: 'linear-gradient(to bottom, #8b7355, #6b5644)',
                  borderTop: '3px solid #d4a574'
                }}
              />

              {/* Walls */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, #fef3c7, #fde68a)'
                }}
              />

              {/* Couch */}
              <motion.div
                className="absolute bottom-[35%] left-1/4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <svg width="200" height="100" viewBox="0 0 200 100">
                  <rect x="10" y="30" width="180" height="60" rx="8" fill="#4a5568" />
                  <rect x="0" y="40" width="15" height="40" rx="4" fill="#2d3748" />
                  <rect x="185" y="40" width="15" height="40" rx="4" fill="#2d3748" />
                  <rect x="20" y="20" width="50" height="25" rx="4" fill="#718096" />
                  <rect x="130" y="20" width="50" height="25" rx="4" fill="#718096" />
                </svg>
              </motion.div>

              {/* Coffee table */}
              <motion.div
                className="absolute bottom-[25%] left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <svg width="120" height="40" viewBox="0 0 120 40">
                  <rect x="10" y="0" width="100" height="8" rx="4" fill="#92400e" />
                  <rect x="15" y="8" width="8" height="32" rx="2" fill="#78350f" />
                  <rect x="97" y="8" width="8" height="32" rx="2" fill="#78350f" />
                </svg>
              </motion.div>

              {/* Lamp */}
              <motion.div
                className="absolute bottom-[35%] right-[20%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <svg width="60" height="120" viewBox="0 0 60 120">
                  <line x1="30" y1="30" x2="30" y2="100" stroke="#4a5568" strokeWidth="3" />
                  <circle cx="30" cy="105" r="15" fill="#2d3748" />
                  <path d="M 15 30 L 10 10 L 50 10 L 45 30 Z" fill="#fbbf24" opacity="0.8" />
                  <ellipse cx="30" cy="10" rx="20" ry="5" fill="#fde68a" />
                </svg>
              </motion.div>

              {/* Window */}
              <motion.div
                className="absolute top-[15%] right-[15%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <svg width="100" height="120" viewBox="0 0 100 120">
                  <rect x="0" y="0" width="100" height="120" rx="4" fill="#60a5fa" opacity="0.6" />
                  <line x1="50" y1="0" x2="50" y2="120" stroke="#1e40af" strokeWidth="4" />
                  <line x1="0" y1="60" x2="100" y2="60" stroke="#1e40af" strokeWidth="4" />
                  <rect x="0" y="0" width="100" height="120" rx="4" fill="none" stroke="#92400e" strokeWidth="6" />
                </svg>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ROOM 2: KITCHEN */}
      <AnimatePresence>
        {(stage === 'room2' || stage === 'room3' || stage === 'exterior' || stage === 'allglow') && (
          <motion.div
            className="absolute left-0 top-0 w-1/3 h-full z-15"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Flash effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent)',
                  filter: 'blur(30px)'
                }}
              />
            </motion.div>

            {/* Kitchen background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, #fed7aa, #fdba74)'
              }}
            />

            {/* Counter */}
            <motion.div
              className="absolute bottom-[25%] left-[10%] right-[10%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <svg width="100%" height="80" viewBox="0 0 200 80" preserveAspectRatio="none">
                <rect x="0" y="0" width="200" height="60" fill="#92400e" />
                <rect x="0" y="60" width="200" height="20" fill="#78350f" />
                <rect x="20" y="20" width="40" height="35" rx="2" fill="#cbd5e1" />
                <rect x="140" y="20" width="40" height="35" rx="2" fill="#cbd5e1" />
              </svg>
            </motion.div>

            {/* Cabinets */}
            <motion.div
              className="absolute top-[15%] left-[10%] right-[10%]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
                <rect x="0" y="0" width="95" height="60" rx="3" fill="#92400e" />
                <rect x="105" y="0" width="95" height="60" rx="3" fill="#92400e" />
                <circle cx="47" cy="30" r="4" fill="#fbbf24" />
                <circle cx="152" cy="30" r="4" fill="#fbbf24" />
              </svg>
            </motion.div>

            {/* Pendant light */}
            <motion.div
              className="absolute top-[10%] left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <svg width="40" height="50" viewBox="0 0 40 50">
                <line x1="20" y1="0" x2="20" y2="20" stroke="#4a5568" strokeWidth="2" />
                <path d="M 10 20 L 5 40 L 35 40 L 30 20 Z" fill="#fbbf24" opacity="0.9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROOM 3: BEDROOM */}
      <AnimatePresence>
        {(stage === 'room3' || stage === 'exterior' || stage === 'allglow') && (
          <motion.div
            className="absolute right-0 top-0 w-1/3 h-full z-15"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Flash effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent)',
                  filter: 'blur(30px)'
                }}
              />
            </motion.div>

            {/* Bedroom background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, #ddd6fe, #c4b5fd)'
              }}
            />

            {/* Bed */}
            <motion.div
              className="absolute bottom-[30%] left-[15%] right-[15%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <svg width="100%" height="70" viewBox="0 0 150 70" preserveAspectRatio="none">
                <rect x="0" y="20" width="150" height="40" rx="4" fill="#8b5cf6" />
                <rect x="0" y="60" width="150" height="10" fill="#6d28d9" />
                <rect x="5" y="5" width="40" height="35" rx="4" fill="#a78bfa" />
                <rect x="105" y="5" width="40" height="35" rx="4" fill="#a78bfa" />
              </svg>
            </motion.div>

            {/* Nightstand with lamp */}
            <motion.div
              className="absolute bottom-[35%] right-[20%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <svg width="50" height="80" viewBox="0 0 50 80">
                <rect x="5" y="40" width="40" height="40" rx="2" fill="#92400e" />
                <line x1="25" y1="10" x2="25" y2="40" stroke="#4a5568" strokeWidth="2" />
                <circle cx="25" cy="8" r="8" fill="#fde68a" opacity="0.9" />
              </svg>
            </motion.div>

            {/* Picture frame */}
            <motion.div
              className="absolute top-[20%] left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <rect x="0" y="0" width="60" height="60" rx="3" fill="#fbbf24" />
                <rect x="5" y="5" width="50" height="50" fill="#fde68a" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EXTERIOR HOUSE VIEW */}
      <AnimatePresence>
        {(stage === 'exterior' || stage === 'allglow' || stage === 'radiance') && (
          <motion.div
            className="absolute inset-0 z-25"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Night sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950" />

            {/* Stars */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* House structure */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <svg width="400" height="350" viewBox="0 0 400 350">
                <defs>
                  <linearGradient id="houseWall" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                  </linearGradient>
                </defs>

                {/* Main house body */}
                <rect x="50" y="150" width="300" height="200" fill="url(#houseWall)" />

                {/* Roof */}
                <path d="M 30 150 L 200 50 L 370 150 Z" fill="#92400e" />
                <path d="M 35 150 L 200 55 L 365 150 Z" fill="#b45309" />

                {/* Chimney */}
                <rect x="280" y="80" width="30" height="70" fill="#78350f" />
                <rect x="275" y="75" width="40" height="10" fill="#92400e" />

                {/* Door - centered at x=185 (house is 50-350, center is 200, door width 30 on each side) */}
                <rect x="185" y="250" width="30" height="100" rx="3" fill="#92400e" />
                <circle cx="207" cy="300" r="3.5" fill="#fbbf24" />

                {/* Windows - PERFECTLY ALIGNED AND SYMMETRICAL */}
                {/* Upper floor: 4 windows, Lower floor: 2 windows flanking door */}
                {[
                  { x: 80, y: 175, floor: 'upper' },
                  { x: 140, y: 175, floor: 'upper' },
                  { x: 230, y: 175, floor: 'upper' },
                  { x: 290, y: 175, floor: 'upper' },
                  { x: 80, y: 270, floor: 'lower' },
                  { x: 290, y: 270, floor: 'lower' }
                ].map((pos, i) => (
                  <g key={`window-${i}`}>
                    <rect
                      x={pos.x}
                      y={pos.y}
                      width="45"
                      height="55"
                      rx="3"
                      fill={(stage === 'allglow' || stage === 'radiance') ? '#fbbf24' : '#60a5fa'}
                      opacity={(stage === 'allglow' || stage === 'radiance') ? 0.95 : 0.6}
                    />
                    <line
                      x1={pos.x + 22.5}
                      y1={pos.y}
                      x2={pos.x + 22.5}
                      y2={pos.y + 55}
                      stroke="#1e40af"
                      strokeWidth="2"
                    />
                    <line
                      x1={pos.x}
                      y1={pos.y + 27.5}
                      x2={pos.x + 45}
                      y2={pos.y + 27.5}
                      stroke="#1e40af"
                      strokeWidth="2"
                    />
                    {(stage === 'allglow' || stage === 'radiance') && (
                      <motion.rect
                        x={pos.x}
                        y={pos.y}
                        width="45"
                        height="55"
                        rx="3"
                        fill="#fbbf24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0.6] }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        style={{
                          filter: 'blur(8px)'
                        }}
                      />
                    )}
                  </g>
                ))}

                {/* Ground */}
                <rect x="0" y="350" width="400" height="50" fill="#166534" />
              </svg>

              {/* Warm glow from windows */}
              {(stage === 'allglow' || stage === 'radiance') && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`glow-${i}`}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${40 + (i % 2) * 15}%`,
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent)',
                        filter: 'blur(20px)',
                        pointerEvents: 'none'
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0.8],
                        scale: [0, 1.5, 1.2]
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* Moon */}
            <motion.div
              className="absolute top-[15%] right-[15%]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #fef3c7, #fde68a)',
                  boxShadow: '0 0 40px rgba(254, 243, 199, 0.6)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* 360° golden rays */}
            {[...Array(40)].map((_, i) => {
              const rotation = (i * 360) / 40;
              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200vw',
                    height: '4px',
                    marginLeft: '-100vw',
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0.5],
                    scaleX: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.01,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.8) 50%, transparent)',
                      filter: 'blur(2px)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center radiance */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 1.8],
                opacity: [0, 1, 0.9]
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(254, 243, 199, 1), rgba(251, 191, 36, 0.8), transparent)',
                  filter: 'blur(40px)'
                }}
              />
            </motion.div>

            {/* Floating house emoji and keys */}
            {['🏠', '🔑', '✨', '🏡', '💛'].map((emoji, i) => {
              const angle = (i * 72) * (Math.PI / 180);
              const radius = 150;
              return (
                <motion.div
                  key={`emoji-${i}`}
                  className="absolute text-6xl z-45"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -15, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    {emoji}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* "HOME SWEET HOME" text */}
            <motion.div
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-50"
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1],
                y: [20, 0, 0]
              }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <h1
                className="text-6xl md:text-7xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b, #fbbf24, #fef3c7)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
                  filter: 'drop-shadow(0 4px 30px rgba(251, 191, 36, 0.6))'
                }}
              >
                Home Sweet Home
              </h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}