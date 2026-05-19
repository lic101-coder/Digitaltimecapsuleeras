/**
 * New Life - STORM & CALM: Stork Delivery (EPIC/LEGENDARY)
 * 
 * 🦩⛈️ Custom SVG flying stork battles storm with swaddled baby,
 * breaks through to rainbow sky, lands at cottage, drops baby on doorstep,
 * and flies away off-screen. Epic dedication and emotional triumph.
 * 
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewLifeCosmicEyesCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function NewLifeCosmicEyesCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeCosmicEyesCeremonyProps) {
  const [stage, setStage] = useState<'storm' | 'struggle' | 'breakthrough' | 'rainbow' | 'landing' | 'dropoff' | 'flyaway'>('storm');
  const [lightningFlash, setLightningFlash] = useState(false);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('storm') },
      { time: 2500, action: () => setStage('struggle') },
      { time: 5000, action: () => setStage('breakthrough') },
      { time: 6500, action: () => setStage('rainbow') },
      { time: 12000, action: () => setStage('landing') },
      { time: 17000, action: () => setStage('dropoff') },
      { time: 19500, action: () => setStage('flyaway') },
      { time: 22500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Lightning strikes
  useEffect(() => {
    if (stage === 'storm' || stage === 'struggle') {
      const strikes = [400, 1400, 2600, 3900];
      const timeouts = strikes.map(time => 
        setTimeout(() => {
          setLightningFlash(true);
          setTimeout(() => setLightningFlash(false), 85);
        }, time)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [stage]);

  const isStorm = ['storm', 'struggle'].includes(stage);
  const isCalm = ['breakthrough', 'rainbow', 'landing', 'dropoff', 'flyaway'].includes(stage);
  const isHome = ['landing', 'dropoff', 'flyaway'].includes(stage);
  const showRainbow = ['rainbow', 'landing', 'dropoff', 'flyaway'].includes(stage);
  const hasBaby = !['dropoff', 'flyaway'].includes(stage);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* DYNAMIC SKY - Faster, richer color transition */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: stage === 'dropoff' || stage === 'flyaway'
            ? 'linear-gradient(to bottom, #fbbf24 0%, #fb923c 15%, #f472b6 35%, #e879f9 55%, #c084fc 75%, #a78bfa 90%, #6366f1 100%)'
            : stage === 'landing'
            ? 'linear-gradient(to bottom, #fcd34d 0%, #fbbf24 18%, #fb923c 38%, #f472b6 58%, #c084fc 78%, #8b5cf6 100%)'
            : stage === 'rainbow'
            ? 'linear-gradient(to bottom, #fef3c7 0%, #fcd34d 15%, #fbbf24 30%, #fb923c 48%, #f472b6 68%, #c084fc 85%, #8b5cf6 100%)'
            : stage === 'breakthrough'
            ? 'linear-gradient(to bottom, #94a3b8 0%, #64748b 22%, #f59e0b 55%, #fb923c 78%, #f472b6 100%)'
            : 'linear-gradient(to bottom, #1f2937 0%, #374151 30%, #4b5563 70%, #6b7280 100%)'
        }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* LIGHTNING FLASH */}
      <AnimatePresence>
        {lightningFlash && (
          <motion.div
            className="absolute inset-0 z-5"
            style={{
              background: 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.65) 40%, transparent 75%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.88, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.085 }}
          />
        )}
      </AnimatePresence>

      {/* DARK STORM CLOUDS */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(12)].map((_, i) => {
              const size = 300 + Math.random() * 400;
              const layer = i % 3;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-10"
                  style={{
                    left: `${(i * 12) % 130 - 15}%`,
                    top: `${6 + layer * 16 + (i % 5) * 5}%`,
                    width: `${size}px`,
                    height: `${size * 0.6}px`,
                    borderRadius: '60% 60% 55% 55%',
                    background: `radial-gradient(ellipse at ${30 + Math.random() * 35}% ${30 + Math.random() * 35}%, #4b5563, #1f2937, #0f172a)`,
                    filter: 'blur(30px)',
                    opacity: 0.95,
                    willChange: 'transform'
                  }}
                  animate={{
                    x: [0, 50 + Math.random() * 30, 0],
                    opacity: [0.9, 0.98, 0.9],
                    scale: [1, 1.12, 1]
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.4,
                    transition: { duration: 1 }
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2.5,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* TORRENTIAL RAIN */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(180)].map((_, i) => {
              const x = Math.random() * 100;
              const speed = 0.22 + Math.random() * 0.12;
              const length = 18 + Math.random() * 20;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-15"
                  style={{
                    left: `${x}%`,
                    top: '-10%',
                    width: '3px',
                    height: `${length}px`,
                    background: 'linear-gradient(to bottom, rgba(147, 197, 253, 1), rgba(59, 130, 246, 0.7))',
                    borderRadius: '4px',
                    transform: 'rotate(25deg)',
                    willChange: 'transform'
                  }}
                  animate={{
                    y: ['0vh', '130vh']
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.7 }
                  }}
                  transition={{
                    duration: speed,
                    delay: i * 0.001,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* WIND GUSTS */}
      <AnimatePresence>
        {isStorm && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-12"
                style={{
                  left: '-40%',
                  top: `${10 + i * 8}%`,
                  width: '180%',
                  height: '6px',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.26) 70%, transparent)',
                  filter: 'blur(8px)',
                  willChange: 'transform'
                }}
                animate={{
                  x: [0, '65%', 0]
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.8 }
                }}
                transition={{
                  duration: 1.1 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* CUSTOM SVG FLYING STORK WITH BABY */}
      <motion.div
        className="absolute z-30"
        style={{
          left: stage === 'flyaway' ? '150%' : isHome ? '50%' : '50%',
          top: stage === 'dropoff' ? '58%' : isHome ? '50%' : '40%'
        }}
        animate={{
          y: isStorm 
            ? [0, -34, 12, -30, 0]
            : stage === 'dropoff'
            ? [0, -8, 0]
            : isHome 
            ? [0, -10, 0]
            : [0, -22, 0],
          x: isStorm 
            ? [-52, 48, -48, 38, -52]
            : stage === 'flyaway'
            ? [0, 650]
            : [0],
          rotate: isStorm 
            ? [-22, 18, -20, 14, -22]
            : stage === 'flyaway'
            ? [0, -15]
            : isHome 
            ? [0, -5, 0]
            : [0],
          scale: isHome ? (stage === 'dropoff' ? 1.08 : [1, 1.12, 1]) : [1]
        }}
        transition={{
          y: { duration: isStorm ? 2.4 : isHome ? 3 : 5.8, repeat: stage === 'flyaway' ? 0 : Infinity },
          x: { 
            duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 5.8), 
            repeat: stage === 'flyaway' ? 0 : Infinity,
            ease: stage === 'flyaway' ? [0.4, 0, 0.8, 1] : 'easeInOut'
          },
          rotate: { duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 3), repeat: stage === 'flyaway' ? 0 : Infinity },
          scale: { duration: 3, repeat: isHome && stage !== 'dropoff' ? 0 : Infinity },
          ease: 'easeInOut'
        }}
      >
        {/* SVG STORK */}
        <svg width="110" height="90" viewBox="0 0 110 90" style={{ 
          transform: 'translateX(-50%)',
          filter: isStorm
            ? 'drop-shadow(0 14px 45px rgba(0, 0, 0, 1))'
            : 'drop-shadow(0 12px 38px rgba(251, 191, 36, 0.85))'
        }}>
          {/* Body */}
          <ellipse cx="45" cy="50" rx="24" ry="18" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          
          {/* Neck */}
          <motion.path
            d="M 60,42 Q 75,30 78,18"
            stroke="#ffffff"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: isStorm 
                ? [
                    "M 60,42 Q 75,30 78,18",
                    "M 60,42 Q 73,32 76,20",
                    "M 60,42 Q 75,30 78,18"
                  ]
                : "M 60,42 Q 75,30 78,18"
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          
          {/* Head */}
          <circle cx="80" cy="15" r="9" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1.5" />
          
          {/* Beak - long stork beak */}
          <path d="M 88,14 L 105,12 L 104,16 Z" fill="#f97316" stroke="#ea580c" strokeWidth="0.8" />
          
          {/* Eye */}
          <circle cx="83" cy="13" r="1.8" fill="#1f2937" />
          
          {/* Wings - flapping */}
          <motion.g
            animate={{
              rotate: isStorm ? [-25, 25, -25] : [-18, 18, -18]
            }}
            transition={{
              duration: isStorm ? 0.35 : 0.45,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '45px 45px' }}
          >
            {/* Left wing */}
            <ellipse cx="30" cy="45" rx="28" ry="12" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.2" opacity="0.95" />
          </motion.g>
          
          <motion.g
            animate={{
              rotate: isStorm ? [25, -25, 25] : [18, -18, 18]
            }}
            transition={{
              duration: isStorm ? 0.35 : 0.45,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: '45px 45px' }}
          >
            {/* Right wing */}
            <ellipse cx="60" cy="45" rx="28" ry="12" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.2" opacity="0.95" />
          </motion.g>
          
          {/* Legs - tucked in flight */}
          <path d="M 42,65 L 40,78" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 48,65 L 50,78" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* SWADDLED BABY in beak */}
        {hasBaby && (
          <div
            style={{
              position: 'absolute',
              left: '75%',
              top: '8%',
              fontSize: '48px',
              filter: 'drop-shadow(0 0 45px rgba(251, 191, 36, 1)) drop-shadow(0 7px 24px rgba(0, 0, 0, 1))',
              transform: 'translate(-50%, -50%)'
            }}
          >
            👶
          </div>
        )}

        {/* Swaddling cloth wrapper - creates bundled appearance */}
        {hasBaby && (
          <>
            {/* White cloth wrap */}
            <div
              style={{
                position: 'absolute',
                left: '75%',
                top: '8%',
                width: '62px',
                height: '58px',
                background: 'linear-gradient(135deg, rgba(254, 249, 195, 0.85), rgba(251, 191, 36, 0.65))',
                borderRadius: '45% 45% 48% 48%',
                border: '4px solid rgba(254, 249, 195, 0.7)',
                transform: 'translate(-50%, -50%)',
                zIndex: -1
              }}
            />
            {/* Inner glow */}
            <div
              style={{
                position: 'absolute',
                left: '75%',
                top: '8%',
                width: '52px',
                height: '52px',
                background: 'radial-gradient(circle, rgba(254, 249, 195, 0.5), rgba(251, 191, 36, 0.3))',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(8px)',
                zIndex: -2
              }}
            />
          </>
        )}
      </motion.div>

      {/* GLOWING AURA */}
      <motion.div
        className="absolute z-29"
        style={{
          left: stage === 'flyaway' ? '150%' : isHome ? '50%' : '50%',
          top: stage === 'dropoff' ? '58%' : isHome ? '50%' : '40%',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.82), rgba(251, 191, 36, 0.48) 50%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.92, 1, 0.92],
          y: isStorm 
            ? [0, -34, 12, -30, 0]
            : stage === 'dropoff'
            ? [0, -8, 0]
            : isHome 
            ? [0, -10, 0]
            : [0, -22, 0],
          x: isStorm 
            ? [-52, 48, -48, 38, -52]
            : stage === 'flyaway'
            ? [0, 650]
            : [0]
        }}
        transition={{
          scale: { duration: 2.8, repeat: Infinity },
          opacity: { duration: 2.8, repeat: Infinity },
          y: { duration: isStorm ? 2.4 : isHome ? 3 : 5.8, repeat: stage === 'flyaway' ? 0 : Infinity },
          x: { 
            duration: stage === 'flyaway' ? 3.5 : (isStorm ? 2.4 : 5.8), 
            repeat: stage === 'flyaway' ? 0 : Infinity 
          }
        }}
      />

      {/* PROTECTIVE GLOW */}
      <AnimatePresence>
        {isStorm && (
          <motion.div
            className="absolute z-28"
            style={{
              left: '50%',
              top: '40%',
              width: '195px',
              height: '145px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.24), transparent 82%)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(24px)',
              pointerEvents: 'none'
            }}
            animate={{
              y: [0, -34, 12, -30, 0],
              x: [-52, 48, -48, 38, -52],
              scale: [1, 1.28, 1],
              opacity: [0.58, 0.78, 0.58]
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1 }
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}
      </AnimatePresence>

      {/* BREAKTHROUGH */}
      <AnimatePresence>
        {stage === 'breakthrough' && (
          <>
            {[...Array(34)].map((_, i) => {
              const angle = (i / 34) * Math.PI * 2;
              const distance = 220 + Math.random() * 250;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-20"
                  style={{
                    left: '50%',
                    top: '36%',
                    width: '135px',
                    height: '78px',
                    borderRadius: '70%',
                    background: 'radial-gradient(ellipse, #9ca3af, #6b7280)',
                    filter: 'blur(30px)'
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 0.88, 0],
                    scale: [1, 3.5, 4.8]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            <motion.div
              className="absolute z-19"
              style={{
                left: '50%',
                top: '36%',
                width: '580px',
                height: '580px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.98), rgba(251, 191, 36, 0.6) 40%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(60px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 5, 6],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* RAINBOW - LARGE PROMINENT FULL WIDTH */}
      <AnimatePresence>
        {showRainbow && (
          <motion.div
            className="absolute z-8"
            style={{
              left: '-5%',
              right: '-5%',
              top: '-8%',
              height: '85%'
            }}
            initial={{ opacity: 0, scaleX: 0.4, scaleY: 0.5, y: 100 }}
            animate={{ 
              opacity: stage === 'dropoff' || stage === 'flyaway' ? 1 : 0.92, 
              scaleX: 1.1,
              scaleY: 1,
              y: 0
            }}
            transition={{ duration: 5, ease: [0.34, 1.3, 0.64, 1] }}
          >
            <svg
              viewBox="0 0 1000 850"
              className="w-full h-full"
              style={{ overflow: 'visible' }}
            >
              {[
                { color: '#ef4444', size: 820, strokeWidth: 45, delay: 0 },
                { color: '#f97316', size: 770, strokeWidth: 45, delay: 0.2 },
                { color: '#fbbf24', size: 720, strokeWidth: 45, delay: 0.4 },
                { color: '#22c55e', size: 670, strokeWidth: 45, delay: 0.6 },
                { color: '#3b82f6', size: 620, strokeWidth: 45, delay: 0.8 },
                { color: '#6366f1', size: 570, strokeWidth: 45, delay: 1 },
                { color: '#a855f7', size: 520, strokeWidth: 45, delay: 1.2 }
              ].map((arc, i) => (
                <motion.path
                  key={i}
                  d={`M -50,850 Q 500,${850 - arc.size} 1050,850`}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={arc.strokeWidth}
                  strokeLinecap="round"
                  opacity="0"
                  style={{
                    filter: 'blur(5px)'
                  }}
                  animate={{
                    opacity: stage === 'dropoff' || stage === 'flyaway' ? 0.95 : 0.85,
                    strokeDashoffset: [2400, 0]
                  }}
                  transition={{
                    opacity: {
                      delay: arc.delay,
                      duration: 3.2,
                      ease: 'easeOut'
                    },
                    strokeDashoffset: {
                      delay: arc.delay,
                      duration: 3.8,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                  strokeDasharray="2400"
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STARDUST TRAIL */}
      <AnimatePresence>
        {isCalm && !isHome && (
          <>
            {[...Array(52)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-27"
                style={{
                  left: '50%',
                  top: '40%',
                  width: '9.5px',
                  height: '9.5px',
                  borderRadius: '50%',
                  background: '#fbbf24',
                  boxShadow: '0 0 20px rgba(251, 191, 36, 1)'
                }}
                animate={{
                  x: (Math.random() - 0.5) * 115,
                  y: 78 + Math.random() * 68,
                  opacity: [1, 0.88, 0],
                  scale: [1, 1.7, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.068,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* COTTAGE HOME */}
      <AnimatePresence>
        {isHome && (
          <motion.div
            className="absolute bottom-0 z-25"
            style={{
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            initial={{ y: 190, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              style={{
                width: '280px',
                height: '190px',
                background: 'linear-gradient(135deg, #92400e, #78350f, #451a03)',
                borderRadius: '20px',
                position: 'relative',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)'
              }}
            >
              {/* Roof */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '-92px',
                  transform: 'translateX(-50%)',
                  width: '300px',
                  height: '115px',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #7f1d1d)',
                  boxShadow: 'inset 0 -24px 35px rgba(0, 0, 0, 0.55)'
                }}
              />

              {/* Chimney */}
              <div
                style={{
                  position: 'absolute',
                  right: '50px',
                  top: '-120px',
                  width: '40px',
                  height: '78px',
                  background: '#7f1d1d',
                  borderRadius: '10px 10px 0 0'
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '100%',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(156, 163, 175, 0.85)',
                      filter: 'blur(10px)',
                      transform: 'translateX(-50%)'
                    }}
                    animate={{
                      y: [-24, -140],
                      x: [(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 58],
                      opacity: [0.85, 0],
                      scale: [1, 2.5]
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              {/* Door */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '0',
                  transform: 'translateX(-50%)',
                  width: '78px',
                  height: '115px',
                  background: 'linear-gradient(to bottom, #451a03, #292524)',
                  borderRadius: '20px 20px 0 0',
                  boxShadow: stage === 'dropoff' || stage === 'flyaway'
                    ? 'inset -8px 0 50px rgba(251, 191, 36, 1), inset 8px 0 50px rgba(251, 146, 60, 1)'
                    : 'inset -7px 0 24px rgba(251, 191, 36, 0.78)'
                }}
                animate={{
                  boxShadow: stage === 'dropoff' || stage === 'flyaway'
                    ? [
                        'inset -8px 0 50px rgba(251, 191, 36, 1), inset 8px 0 50px rgba(251, 146, 60, 1)',
                        'inset -9px 0 60px rgba(251, 191, 36, 1), inset 9px 0 60px rgba(251, 146, 60, 1)',
                        'inset -8px 0 50px rgba(251, 191, 36, 1), inset 8px 0 50px rgba(251, 146, 60, 1)'
                      ]
                    : undefined
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '56%',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#fbbf24',
                    boxShadow: '0 0 16px rgba(251, 191, 36, 1)'
                  }}
                />

                {(stage === 'dropoff' || stage === 'flyaway') && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '0',
                      bottom: '0',
                      width: '7px',
                      background: 'linear-gradient(to bottom, #fbbf24, #fb923c)',
                      filter: 'blur(16px)',
                      boxShadow: '-35px 0 60px rgba(251, 191, 36, 1)'
                    }}
                    animate={{
                      opacity: [0.95, 1, 0.95]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  />
                )}
              </motion.div>

              {/* Windows */}
              {[
                { left: '40px', top: '55px' },
                { right: '40px', top: '55px' }
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    ...pos,
                    width: '60px',
                    height: '60px',
                    background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                    borderRadius: '10px',
                    boxShadow: '0 0 45px rgba(251, 191, 36, 1), inset 0 0 24px rgba(0, 0, 0, 0.45)'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                      gap: '6px',
                      padding: '6px'
                    }}
                  >
                    {[0, 1, 2, 3].map(pane => (
                      <div
                        key={pane}
                        style={{
                          background: 'rgba(120, 53, 15, 0.55)',
                          borderRadius: '5px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Garden flowers */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: '48px' }}>
              {[...Array(26)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${(i / 26) * 100}%`,
                    bottom: '0',
                    fontSize: '26px'
                  }}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 1.32, 1],
                    rotate: [0, 24, -15, 0]
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 1.4 + i * 0.05
                  }}
                >
                  {['🌸', '🌺', '🌼', '🌻'][i % 4]}
                </motion.div>
              ))}
            </div>

            {/* Welcome mat */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: '0',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '22px',
                background: 'linear-gradient(to bottom, #7f1d1d, #991b1b)',
                borderRadius: '7px',
                boxShadow: '0 7px 14px rgba(0, 0, 0, 0.58)'
              }}
            />

            {/* BABY ON DOORSTEP - appears during dropoff */}
            <AnimatePresence>
              {(stage === 'dropoff' || stage === 'flyaway') && (
                <motion.div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '22px',
                    fontSize: '50px',
                    transform: 'translateX(-50%)'
                  }}
                  initial={{ scale: 0, y: -120, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 1],
                    y: [-120, 5, 0],
                    opacity: [0, 1, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.34, 1.2, 0.64, 1]
                  }}
                >
                  👶
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TITLE */}
      <AnimatePresence>
        {(stage === 'dropoff' || stage === 'flyaway') && (
          <motion.div
            className="absolute text-center z-50"
            style={{
              left: '50%',
              top: '8%',
              transform: 'translateX(-50%)'
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: [0, 1],
              y: [-50, 0]
            }}
            transition={{
              duration: 2.5,
              delay: 1.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-3"
              style={{
                color: '#fef9c3',
                textShadow: '0 0 55px rgba(251, 191, 36, 1), 0 0 110px rgba(251, 191, 36, 0.9), 0 8px 26px rgba(0, 0, 0, 1)',
                WebkitTextStroke: '1.4px rgba(251, 191, 36, 0.45)'
              }}
            >
              {capsuleTitle}
            </h1>
            <motion.p
              className="text-xl md:text-2xl font-medium"
              style={{
                color: '#fbbf24',
                textShadow: '0 0 35px rgba(251, 191, 36, 1), 0 7px 22px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 2.4 }}
            >
              Worth every storm, every mile
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}