/**
 * New Year's Eve - Champagne Supernova Ceremony (LEGENDARY)
 * 
 * CONCEPT: Ultra-realistic champagne bottle emerges, foil tears away elegantly,
 * cork LAUNCHES with explosive animation and smoke trail, golden champagne
 * erupts in majestic fountain, liquid transforms into swirling cosmic nebula,
 * bubbles ascend and become twinkling stars across the universe
 * 
 * Duration: 14 seconds
 * REFINED with smooth animations, better bottle design, enhanced cork pop
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewYearChampagneCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewYearChampagneCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewYearChampagneCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'bottle' | 'unwrap' | 'cork' | 'fountain' | 'nebula' | 'stars' | 'radiance' | 'outro'>('intro');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('bottle') },
      { time: 2500, action: () => setStage('unwrap') },
      { time: 4000, action: () => setStage('cork') },
      { time: 6000, action: () => setStage('fountain') },
      { time: 8500, action: () => setStage('nebula') },
      { time: 10500, action: () => setStage('stars') },
      { time: 12500, action: () => setStage('radiance') },
      { time: 14000, action: () => setStage('outro') },
      { time: 14500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-950 via-amber-950/40 to-slate-950">
      {/* Luxurious ambient lighting */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${5 + i * 18}%`,
            top: `${10 + (i % 3) * 25}%`,
            width: '200px',
            height: '200px',
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)'
              : 'radial-gradient(circle, rgba(254, 243, 199, 0.1), transparent)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 left-0 right-0 text-center z-20"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-black drop-shadow-2xl mb-4"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #fef3c7 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 30px rgba(251, 191, 36, 0.6)'
              }}
              animate={{
                filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Champagne Dreams
            </motion.h1>
            <motion.p 
              className="text-amber-200 text-2xl font-medium"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}
            >
              ✨ Pop Into the New Year ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREMIUM CHAMPAGNE BOTTLE - PROPERLY LOWERED TO SEE FULL BOTTLE */}
      <AnimatePresence>
        {(stage === 'bottle' || stage === 'unwrap' || stage === 'cork' || stage === 'fountain' || stage === 'nebula' || stage === 'stars') && (
          <motion.div
            className="absolute left-1/2 bottom-[5%] -translate-x-1/2 z-20"
            initial={{ y: 350, opacity: 0, scale: 0.6, rotateY: -30 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: 1,
              rotateY: 0
            }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            exit={{ opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.6 } }}
          >
            <motion.svg 
              width="240" 
              height="480" 
              viewBox="0 0 240 480" 
              style={{ 
                filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.7))'
              }}
              animate={stage === 'cork' ? {
                rotate: [0, -2, 2, -1, 0],
                y: [0, 5, 0]
              } : {}}
              transition={{ duration: 0.3, repeat: stage === 'cork' ? 3 : 0 }}
            >
              <defs>
                {/* Premium glass gradient */}
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%%" y2="0%">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="30%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="70%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                
                {/* Glass shine highlight */}
                <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                
                {/* Foil gradient */}
                <radialGradient id="foilGold">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
              </defs>
              
              {/* Bottle body - elegant punt and shoulders */}
              <path 
                d="M 80 180 
                   Q 75 220, 75 280 
                   L 75 430 
                   Q 75 440, 85 445 
                   L 120 450 
                   L 155 445 
                   Q 165 440, 165 430 
                   L 165 280 
                   Q 165 220, 160 180 
                   Z"
                fill="url(#glassGradient)"
                opacity="0.92"
              />
              
              {/* Punt (bottom indentation) */}
              <ellipse 
                cx="120" 
                cy="450" 
                rx="35" 
                ry="8" 
                fill="#064e3b" 
                opacity="0.6" 
              />
              
              {/* Shoulder curve */}
              <path 
                d="M 80 180 Q 70 150, 95 105 L 145 105 Q 170 150, 160 180"
                fill="url(#glassGradient)"
                opacity="0.92"
              />
              
              {/* Neck */}
              <rect 
                x="100" 
                y="60" 
                width="40" 
                height="45" 
                rx="4" 
                fill="url(#glassGradient)" 
                opacity="0.92" 
              />
              
              {/* Lip/mouth */}
              <ellipse 
                cx="120" 
                cy="60" 
                rx="22" 
                ry="7" 
                fill="url(#glassGradient)" 
                opacity="0.95" 
              />
              <ellipse 
                cx="120" 
                cy="58" 
                rx="20" 
                ry="6" 
                fill="#065f46" 
                opacity="0.8" 
              />
              
              {/* Glass reflections - multiple highlights */}
              <ellipse 
                cx="95" 
                cy="250" 
                rx="18" 
                ry="120" 
                fill="url(#glassShine)" 
                opacity="0.6" 
              />
              <ellipse 
                cx="85" 
                cy="220" 
                rx="10" 
                ry="60" 
                fill="#ffffff" 
                opacity="0.4" 
              />
              <ellipse 
                cx="145" 
                cy="280" 
                rx="8" 
                ry="50" 
                fill="#ffffff" 
                opacity="0.25" 
              />
              
              {/* Premium label */}
              <rect 
                x="85" 
                y="300" 
                width="70" 
                height="90" 
                rx="6" 
                fill="#fef3c7" 
                opacity="0.95" 
              />
              <rect 
                x="88" 
                y="303" 
                width="64" 
                height="84" 
                rx="4" 
                fill="#fffbeb" 
                opacity="0.9" 
              />
              
              {/* Label text */}
              <text 
                x="120" 
                y="330" 
                fontSize="20" 
                fontWeight="900" 
                fill="#d97706" 
                textAnchor="middle"
              >
                GRAND
              </text>
              <text 
                x="120" 
                y="350" 
                fontSize="20" 
                fontWeight="900" 
                fill="#d97706" 
                textAnchor="middle"
              >
                ANNÉE
              </text>
              <line 
                x1="95" 
                y1="358" 
                x2="145" 
                y2="358" 
                stroke="#fbbf24" 
                strokeWidth="2" 
              />
              <text 
                x="120" 
                y="375" 
                fontSize="14" 
                fontWeight="bold" 
                fill="#92400e" 
                textAnchor="middle"
              >
                2026
              </text>
              <text 
                x="120" 
                y="387" 
                fontSize="8" 
                fill="#78350f" 
                textAnchor="middle"
              >
                VINTAGE CELEBRATION
              </text>
              
              {/* Foil cap - unwraps with tearing effect */}
              <AnimatePresence>
                {(stage === 'bottle' || stage === 'unwrap') && (
                  <motion.g
                    initial={{ opacity: 1 }}
                    animate={stage === 'unwrap' ? { 
                      scaleY: [1, 0.8, 0.4, 0.1, 0],
                      y: [0, 10, 25, 45, 65],
                      opacity: [1, 0.9, 0.6, 0.3, 0],
                      rotate: [0, 2, -2, 4, 0]
                    } : {}}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Foil wrapper */}
                    <path 
                      d="M 98 60 
                         L 98 35 
                         Q 98 28, 105 28 
                         L 135 28 
                         Q 142 28, 142 35 
                         L 142 60 
                         Z"
                      fill="url(#foilGold)"
                      stroke="#d97706"
                      strokeWidth="1"
                    />
                    
                    {/* Foil top */}
                    <ellipse 
                      cx="120" 
                      cy="28" 
                      rx="22" 
                      ry="6" 
                      fill="#fbbf24" 
                      stroke="#d97706"
                      strokeWidth="1"
                    />
                    
                    {/* Foil wire cage texture */}
                    {[...Array(5)].map((_, i) => (
                      <line
                        key={`wire-${i}`}
                        x1="98"
                        y1={35 + i * 6}
                        x2="142"
                        y2={35 + i * 6}
                        stroke="#d97706"
                        strokeWidth="0.5"
                        opacity="0.6"
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORK EXPLOSION - ULTIMATE REFINEMENT! */}
      <AnimatePresence>
        {stage === 'cork' && (
          <>
            {/* MASSIVE FLASH BURST at bottle opening - REFINED! */}
            <motion.div
              className="absolute z-35"
              style={{
                left: '50%',
                bottom: '54%',
                transform: 'translate(-50%, 0)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 0.5, 5.2, 4.5, 3.8], 
                opacity: [0, 0.3, 1, 0.85, 0] 
              }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.1, 0.25, 0.6, 1]
              }}
            >
              <div
                className="w-48 h-48 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 10%, rgba(254, 243, 199, 1) 25%, rgba(251, 191, 36, 0.95) 55%, rgba(251, 191, 36, 0.7) 75%, transparent 100%)',
                  boxShadow: '0 0 140px rgba(251, 191, 36, 1), 0 0 220px rgba(251, 191, 36, 0.9), 0 0 340px rgba(251, 191, 36, 0.7)',
                  filter: 'blur(14px)'
                }}
              />
            </motion.div>

            {/* Expanding shockwave rings - ULTRA REFINED! */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shockwave-${i}`}
                className="absolute z-34"
                style={{
                  left: '50%',
                  bottom: '54%',
                  transform: 'translate(-50%, 0)'
                }}
                initial={{ scale: 0, opacity: 0.95 }}
                animate={{ 
                  scale: [0, 0.8, 6.5 + i * 0.4],
                  opacity: [0.95, 0.85, 0.6, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div
                  className="w-36 h-36 rounded-full border-[7px]"
                  style={{
                    borderColor: i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f59e0b',
                    boxShadow: `0 0 45px ${i % 3 === 0 ? '#fef3c7' : i % 3 === 1 ? '#fbbf24' : '#f59e0b'}, inset 0 0 30px ${i % 3 === 0 ? 'rgba(254, 243, 199, 0.3)' : i % 3 === 1 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                />
              </motion.div>
            ))}

            {/* Cork projectile with ULTIMATE trail */}
            <motion.div
              className="absolute z-40"
              style={{
                left: '50%',
                bottom: '54%'
              }}
              initial={{ 
                x: '-50%', 
                y: 0, 
                rotate: 0,
                scale: 1
              }}
              animate={{
                x: ['-50%', '-47%', '-40%', '-28%', '-5%', '30%', '75%'],
                y: [0, -80, -280, -450, -580, -650, -680],
                rotate: [0, 60, 180, 420, 720, 1080, 1440],
                scale: [1, 1.25, 1.3, 1.15, 0.95, 0.7, 0.4]
              }}
              transition={{
                duration: 2.5,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.12, 0.28, 0.48, 0.68, 0.88, 1]
              }}
            >
              {/* Cork with ULTRA enhanced texture */}
              <div className="relative">
                <div
                  className="w-11 h-16 rounded-t-full"
                  style={{
                    background: 'linear-gradient(145deg, #d97706 0%, #b45309 25%, #92400e 55%, #78350f 85%, #5f2c0a 100%)',
                    boxShadow: '0 18px 50px rgba(0, 0, 0, 0.7), inset -5px 0 15px rgba(0, 0, 0, 0.5), inset 4px 0 10px rgba(217, 119, 6, 0.4), inset 0 -3px 8px rgba(0, 0, 0, 0.6)',
                    border: '2.5px solid #78350f'
                  }}
                >
                  {/* Cork texture lines */}
                  <div className="absolute inset-x-0 top-1/4 h-px bg-black opacity-20" />
                  <div className="absolute inset-x-0 top-1/2 h-px bg-black opacity-15" />
                  <div className="absolute inset-x-0 top-3/4 h-px bg-black opacity-20" />
                </div>
                {/* Cork top gold cap with shine */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 40%, #f59e0b 75%, #d97706 100%)',
                    boxShadow: '0 0 25px rgba(251, 191, 36, 1), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 -2px 8px rgba(217, 119, 6, 0.5), inset -2px 1px 6px rgba(254, 243, 199, 0.7)'
                  }}
                >
                  {/* Shine reflection */}
                  <div
                    className="absolute top-0 left-1/4 w-1/3 h-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)',
                      filter: 'blur(2px)'
                    }}
                  />
                </div>
              </div>

              {/* Cork trail particles - ULTRA DRAMATIC! */}
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={`cork-trail-${i}`}
                  className="absolute top-8 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    y: [0, 18 + i * 20],
                    scale: [0, 0.8, 2.5, 1.8, 1, 0],
                    opacity: [0, 0.4, 1, 0.9, 0.6, 0]
                  }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: i % 4 === 0 
                        ? 'radial-gradient(circle, #ffffff, #fef3c7)' 
                        : i % 4 === 1 
                        ? 'radial-gradient(circle, #fef3c7, #fbbf24)'
                        : i % 4 === 2
                        ? '#fbbf24' 
                        : '#f59e0b',
                      boxShadow: `0 0 18px ${i % 4 === 0 ? '#fef3c7' : i % 4 === 1 ? '#fbbf24' : '#f59e0b'}`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* MASSIVE "POP!" text with ULTIMATE animation */}
            <motion.div
              className="absolute z-50 text-9xl font-black"
              style={{
                left: '50%',
                bottom: '64%',
                color: '#fbbf24',
                textShadow: '0 0 50px rgba(251, 191, 36, 1), 0 0 100px rgba(251, 191, 36, 0.9), 0 8px 25px rgba(0, 0, 0, 0.95)',
                WebkitTextStroke: '5px rgba(255, 255, 255, 0.6)'
              }}
              initial={{ scale: 0, opacity: 0, rotate: -60, y: 0, x: '-50%' }}
              animate={{ 
                scale: [0, 0.5, 2.6, 2.1, 2.3, 1.9, 1.5],
                opacity: [0, 0.3, 1, 1, 1, 0.9, 0],
                rotate: [-60, -30, 20, -12, 8, -3, 0],
                y: [0, -15, -35, -25, -32, -28, -50],
                x: ['-50%', '-50%', '-50%', '-50%', '-50%', '-50%', '-50%']
              }}
              transition={{ 
                duration: 1.8, 
                ease: [0.34, 1.56, 0.64, 1],
                times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1]
              }}
            >
              <motion.div
                animate={{
                  textShadow: [
                    '0 0 50px rgba(251, 191, 36, 1), 0 0 100px rgba(251, 191, 36, 0.9)',
                    '0 0 80px rgba(251, 191, 36, 1), 0 0 150px rgba(251, 191, 36, 1)',
                    '0 0 50px rgba(251, 191, 36, 1), 0 0 100px rgba(251, 191, 36, 0.9)'
                  ]
                }}
                transition={{
                  duration: 0.35,
                  repeat: 4,
                  ease: 'easeInOut'
                }}
              >
                POP! 🎊
              </motion.div>
            </motion.div>

            {/* Champagne spray burst - ULTIMATE ENHANCED! */}
            {[...Array(100)].map((_, i) => {
              const angle = -90 + (Math.random() - 0.5) * 95; // Upward cone
              const distance = 50 + Math.random() * 360;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <motion.div
                  key={`spray-${i}`}
                  className="absolute z-30"
                  style={{
                    left: '50%',
                    bottom: '54%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: [0, x * 0.2, x * 0.5, x * 0.8, x],
                    y: [0, y * 0.4, y * 0.7, y * 0.9, y + 280],
                    scale: [0, 1.2, 2.5, 2, 1.5, 1.2],
                    opacity: [0, 0.5, 1, 0.95, 0.75, 0],
                    rotate: [0, Math.random() * 180, Math.random() * 360]
                  }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.01,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.2, 0.4, 0.65, 0.85, 1]
                  }}
                >
                  <div
                    className={i % 5 === 0 ? 'w-6 h-6 rounded-full' : 'w-3 h-9'}
                    style={{
                      background: i % 6 === 0 
                        ? 'linear-gradient(135deg, #ffffff, #fef3c7)'
                        : i % 6 === 1
                        ? 'linear-gradient(135deg, #fef3c7, #fbbf24)'
                        : i % 6 === 2
                        ? 'linear-gradient(135deg, #fde68a, #fbbf24)'
                        : i % 6 === 3
                        ? '#fbbf24'
                        : i % 6 === 4
                        ? '#f59e0b'
                        : '#d97706',
                      boxShadow: '0 0 22px rgba(251, 191, 36, 0.95)',
                      borderRadius: i % 5 === 0 ? '50%' : '3px'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Confetti explosion - ULTRA COLORFUL! */}
            {[...Array(120)].map((_, i) => {
              const angle = -90 + (Math.random() - 0.5) * 130;
              const distance = 70 + Math.random() * 420;
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;
              const colors = ['#fbbf24', '#f59e0b', '#fef3c7', '#ec4899', '#8b5cf6', '#22d3ee', '#10b981', '#f43f5e', '#fb923c', '#a78bfa'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <motion.div
                  key={`confetti-cork-${i}`}
                  className="absolute z-32"
                  style={{
                    left: '50%',
                    bottom: '54%'
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, x * 0.4, x * 0.75, x],
                    y: [0, y * 0.5, y * 0.8, y, y + 450],
                    opacity: [0, 0.6, 1, 1, 0.85, 0],
                    scale: [0, 1.5, 2.3, 2.3, 2, 1.7],
                    rotate: [0, Math.random() * 720, Math.random() * 1620]
                  }}
                  transition={{
                    duration: 3.2,
                    delay: i * 0.013,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.25, 0.45, 0.65, 0.85, 1]
                  }}
                >
                  <div
                    className={Math.random() > 0.5 ? 'w-5 h-10' : Math.random() > 0.5 ? 'w-5 h-5 rounded-full' : 'w-4 h-8'}
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 18px ${color}`,
                      borderRadius: Math.random() > 0.7 ? '50%' : '2px'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Star sparkles around explosion - ENHANCED! */}
            {[...Array(40)].map((_, i) => {
              const angle = (i / 40) * Math.PI * 2;
              const distance = 90 + Math.random() * 110;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`star-sparkle-${i}`}
                  className="absolute z-36 text-3xl"
                  style={{
                    left: '50%',
                    bottom: '54%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    x: [0, x * 0.6, x],
                    y: [0, y * 0.6, y],
                    scale: [0, 1.2, 2.2, 1.5, 0],
                    opacity: [0, 0.7, 1, 0.9, 0],
                    rotate: [0, 120, 240]
                  }}
                  transition={{
                    duration: 1.7,
                    delay: i * 0.018,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.3, 0.5, 0.8, 1]
                  }}
                >
                  ✨
                </motion.div>
              );
            })}

            {/* Secondary explosion sparkles */}
            {[...Array(60)].map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const distance = 40 + Math.random() * 180;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`secondary-spark-${i}`}
                  className="absolute z-33"
                  style={{
                    left: '50%',
                    bottom: '54%'
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: y,
                    scale: [0, 2, 1.5, 0],
                    opacity: [0, 1, 0.8, 0]
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + i * 0.008,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#fbbf24' : '#fef3c7',
                      boxShadow: `0 0 12px ${i % 2 === 0 ? '#fbbf24' : '#fef3c7'}`
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* MAJESTIC CHAMPAGNE FOUNTAIN */}
      <AnimatePresence>
        {(stage === 'fountain' || stage === 'nebula' || stage === 'stars') && (
          <>
            {/* Main fountain streams - elegant arcs */}
            {[...Array(12)].map((_, i) => {
              const offset = i - 6;
              const spreadAngle = offset * 8;
              return (
                <motion.div
                  key={`fountain-main-${i}`}
                  className="absolute z-25"
                  style={{
                    left: `${50 + offset * 1.5}%`,
                    bottom: '54%'
                  }}
                  initial={{ y: 0, scaleY: 0, opacity: 0 }}
                  animate={{
                    y: stage === 'fountain' 
                      ? [-40, -180, -320]
                      : [-320, -380, -420],
                    scaleY: [0, 1.8, 1.2],
                    opacity: stage === 'fountain' 
                      ? [0, 1, 0.9] 
                      : [0.9, 0.5, 0],
                    x: [
                      offset * 5,
                      offset * 35,
                      offset * 60
                    ]
                  }}
                  transition={{
                    duration: stage === 'fountain' ? 2.5 : 2,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '120px',
                      background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.95), rgba(254, 243, 199, 0.8), rgba(251, 191, 36, 0.4))',
                      borderRadius: '50%',
                      filter: 'blur(2px)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)'
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Splashing droplets */}
            {[...Array(40)].map((_, i) => {
              const angle = (Math.random() * 120 - 60) * (Math.PI / 180);
              const distance = 50 + Math.random() * 150;
              const yTravel = -100 - Math.random() * 300;
              return (
                <motion.div
                  key={`droplet-${i}`}
                  className="absolute z-24"
                  style={{
                    left: '50%',
                    bottom: '54%'
                  }}
                  initial={{
                    x: '-50%',
                    y: 0,
                    scale: 1,
                    opacity: 0
                  }}
                  animate={{
                    x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                    y: [0, yTravel * 0.7, yTravel],
                    scale: [0, 1, 0],
                    opacity: [0, 0.9, 0]
                  }}
                  transition={{
                    duration: 2.2 + Math.random() * 0.8,
                    delay: i * 0.03,
                    ease: [0.34, 1, 0.68, 1]
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #fef3c7, #fbbf24)',
                      boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* COSMIC NEBULA TRANSFORMATION */}
      <AnimatePresence>
        {(stage === 'nebula' || stage === 'stars') && (
          <>
            {/* Swirling golden clouds */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`nebula-${i}`}
                className="absolute z-28"
                style={{
                  left: `${30 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  width: '180px',
                  height: '180px'
                }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.5, 2],
                  opacity: [0, 0.7, 0.3],
                  rotate: i % 2 === 0 ? [0, 180, 360] : [0, -180, -360]
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.1,
                  ease: 'easeOut'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle, 
                      rgba(251, 191, 36, 0.6), 
                      rgba(254, 243, 199, 0.4), 
                      transparent)`,
                    filter: 'blur(30px)',
                    borderRadius: '50%'
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ASCENDING CHAMPAGNE BUBBLES → STARS */}
      <AnimatePresence>
        {(stage === 'stars' || stage === 'radiance') && (
          <>
            {[...Array(60)].map((_, i) => {
              const xPos = Math.random() * 100;
              const delay = i * 0.05;
              const duration = 2 + Math.random();
              return (
                <motion.div
                  key={`bubble-star-${i}`}
                  className="absolute z-30"
                  style={{
                    left: `${xPos}%`,
                    bottom: '10%'
                  }}
                  initial={{
                    y: 0,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    y: [-50, -window.innerHeight * 0.5, -window.innerHeight * 0.9],
                    scale: [0, 1, 1.2],
                    opacity: [0, 1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut'
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: delay
                    }}
                  >
                    <div
                      className="relative"
                      style={{
                        width: '12px',
                        height: '12px'
                      }}
                    >
                      {/* Star core */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, #fef3c7, #fbbf24)',
                          boxShadow: '0 0 15px rgba(251, 191, 36, 0.9)'
                        }}
                      />
                      {/* Star sparkle */}
                      <div
                        className="absolute inset-[-3px]"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent, #fef3c7, transparent, #fef3c7, transparent)',
                          opacity: 0.6,
                          filter: 'blur(1px)'
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* EPIC RADIANCE FINALE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Full 360° starburst rays */}
            {[...Array(44)].map((_, i) => {
              const rotation = (i * 360) / 44;
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
                    opacity: [0, 0.6, 0.4],
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

            {/* Pulsing center light */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 2, 1.5],
                opacity: [0, 1, 0.8]
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

            {/* Floating celebration emojis */}
            {['🍾', '🥂', '✨', '🫧', '🎊', '🌟'].map((emoji, i) => (
              <motion.div
                key={`emoji-${i}`}
                className="absolute text-6xl z-40"
                style={{
                  left: `${15 + i * 15}%`,
                  top: '50%'
                }}
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{
                  scale: [0, 1.3, 1],
                  opacity: [0, 1, 1],
                  y: [0, -30, -20],
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
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5]
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
            ))}

            {/* "CHEERS" text */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1]
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              <motion.h1
                className="text-7xl md:text-8xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #fef3c7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
                  filter: 'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.6))'
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.6))',
                    'drop-shadow(0 4px 30px rgba(251, 191, 36, 1))',
                    'drop-shadow(0 4px 20px rgba(251, 191, 36, 0.6))'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                CHEERS! 🥂
              </motion.h1>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}