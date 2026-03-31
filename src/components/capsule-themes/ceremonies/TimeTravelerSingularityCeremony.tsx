/**
 * Time Traveler - Stargate Portal Ceremony (ULTRA REALISTIC VFX VERSION)
 * 
 * Hollywood-quality Stargate portal with photorealistic effects and smooth performance.
 * Features: Ring materializes → chevrons lock with mechanical precision → MASSIVE kawoosh
 * → rippling event horizon → intense vortex tunnel → unstable collapse → cosmic supernova
 * 
 * VFX ENHANCEMENTS:
 * - Lens flares and light blooms
 * - Heat distortion effects during kawoosh
 * - Camera shake simulation
 * - Atmospheric depth with fog layers
 * - Realistic particle physics
 * - Optimized emoji count (16 instead of 196) for smooth 60fps
 * 
 * Duration: 21 seconds
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  isMobile,
  getOptimalParticleCount, 
  getOptimalBlur, 
  getPerformanceStyle,
  getOptimalRayCount 
} from './ceremonyOptimization';

interface TimeTravelerSingularityCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface Chevron {
  id: number;
  angle: number;
  locked: boolean;
}

interface VortexParticle {
  id: number;
  angle: number;
  radius: number;
  z: number;
  speed: number;
  color: string;
}

interface KawooshParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
}

export function TimeTravelerSingularityCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: TimeTravelerSingularityCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'materialize' | 'spin' | 'chevrons' | 'kawoosh' | 'stabilize' | 'vortex' | 'journey' | 'unstable' | 'radiance' | 'outro'>('intro');
  const [chevrons, setChevrons] = useState<Chevron[]>([]);
  const [lockedCount, setLockedCount] = useState(0);
  const [vortexParticles, setVortexParticles] = useState<VortexParticle[]>([]);
  const [kawooshParticles, setKawooshParticles] = useState<KawooshParticle[]>([]);
  const [gateRotation, setGateRotation] = useState(0);
  const [cameraShake, setCameraShake] = useState({ x: 0, y: 0 });

  // Animation timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('materialize') },
      { time: 3500, action: () => setStage('spin') },
      { time: 4500, action: () => setStage('chevrons') },
      { time: 8500, action: () => setStage('kawoosh') },
      { time: 10000, action: () => setStage('stabilize') },
      { time: 11500, action: () => setStage('vortex') },
      { time: 13500, action: () => setStage('journey') },
      { time: 15500, action: () => setStage('unstable') },
      { time: 17000, action: () => setStage('radiance') },
      { time: 20000, action: () => setStage('outro') },
      { time: 21000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Camera shake effect during kawoosh and unstable
  useEffect(() => {
    if (stage === 'kawoosh' || stage === 'unstable') {
      const intensity = stage === 'kawoosh' ? 8 : 5;
      const interval = setInterval(() => {
        setCameraShake({
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * intensity
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setCameraShake({ x: 0, y: 0 });
    }
  }, [stage]);

  // Initialize chevrons
  useEffect(() => {
    const newChevrons: Chevron[] = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * 360 - 90;
      newChevrons.push({
        id: i,
        angle: angle,
        locked: false
      });
    }
    setChevrons(newChevrons);
  }, []);

  // Lock chevrons sequentially
  useEffect(() => {
    if (stage === 'chevrons') {
      const lockSequence = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      lockSequence.forEach((chevronIndex, i) => {
        setTimeout(() => {
          setLockedCount(prev => prev + 1);
          setChevrons(prev => prev.map((ch, idx) => 
            idx === chevronIndex ? { ...ch, locked: true } : ch
          ));
        }, i * 440);
      });
    }
  }, [stage]);

  // Animate gate rotation
  useEffect(() => {
    if (stage === 'spin') {
      setGateRotation(720);
    } else if (stage === 'chevrons') {
      const rotations = [0, 40, 80, 120, 160, 200, 240, 280, 320];
      rotations.forEach((rotation, i) => {
        setTimeout(() => {
          setGateRotation(720 + rotation);
        }, i * 440);
      });
    }
  }, [stage]);

  // Generate vortex particles with realistic physics
  useEffect(() => {
    if (stage === 'vortex' || stage === 'journey' || stage === 'unstable') {
      const particles: VortexParticle[] = [];
      const colors = [
        'rgba(59, 130, 246, 1)',
        'rgba(96, 165, 250, 1)',
        'rgba(147, 197, 253, 1)',
        'rgba(219, 234, 254, 1)',
        'rgba(255, 255, 255, 0.95)'
      ];

      const particleCount = isMobile() ? 50 : 100;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          angle: Math.random() * 360,
          radius: Math.random() * 250,
          z: Math.random() * 400,
          speed: 0.6 + Math.random() * 1.6,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setVortexParticles(particles);
    }
  }, [stage]);

  // Generate REALISTIC kawoosh explosion
  useEffect(() => {
    if (stage === 'kawoosh') {
      const particles: KawooshParticle[] = [];
      
      // Dense explosive rings
      for (let ring = 0; ring < 12; ring++) {
        const particlesInRing = 45 + ring * 8;
        for (let i = 0; i < particlesInRing; i++) {
          const angle = (i / particlesInRing) * Math.PI * 2;
          const distance = 55 + ring * 38;
          particles.push({
            id: ring * 1000 + i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            scale: 1.4 - ring * 0.07,
            delay: ring * 0.05
          });
        }
      }
      setKawooshParticles(particles);
    }
  }, [stage]);

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#030712] via-[#0a0f1e] to-[#030712]"
      animate={{
        x: cameraShake.x,
        y: cameraShake.y
      }}
      transition={{
        duration: 0.05,
        ease: 'linear'
      }}
    >
      {/* Deep space background with atmospheric depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #1e3a8a 0%, #0f1629 40%, #030712 80%)'
            : stage === 'kawoosh'
            ? 'radial-gradient(ellipse at 50% 50%, #3b82f6 0%, #1e40af 30%, #0c1428 60%, #030712 90%)'
            : stage === 'stabilize' || stage === 'vortex' || stage === 'journey'
            ? 'radial-gradient(ellipse at 50% 50%, #1e40af 0%, #0c1428 50%, #030712 90%)'
            : 'radial-gradient(ellipse at 50% 50%, #0c1428 0%, #060a14 60%, #000000 100%)'
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Atmospheric fog layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'kawoosh' ? 0.7 : stage === 'vortex' || stage === 'journey' ? 0.5 : 0.3
        }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`fog-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${40 + i * 10}% ${50 + i * 5}%, rgba(59, 130, 246, 0.15), transparent 60%)`,
              filter: `blur(${80 + i * 20}px)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20 * (i - 1), 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.5
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced starfield with depth layers */}
      <div className="absolute inset-0">
        {[...Array(300)].map((_, i) => {
          const size = 0.5 + Math.random() * 2.5;
          const brightness = 0.2 + Math.random() * 0.8;
          const depth = Math.random();
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${200 + Math.floor(55 * brightness)}, ${220 + Math.floor(35 * brightness)}, 255, ${brightness})`,
                boxShadow: `0 0 ${size * 2}px rgba(147, 197, 253, ${brightness * 0.8})`
              }}
              animate={{
                opacity: [brightness * 0.3, brightness, brightness * 0.3],
                scale: [1, 1 + brightness * 0.4, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          );
        })}
      </div>

      {/* Dynamic ambient glow with lens flare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'kawoosh' ? 1 
                 : stage === 'stabilize' || stage === 'vortex' || stage === 'journey' ? 0.85
                 : stage === 'radiance' ? 0.95
                 : 0.35
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.6) 0%, rgba(37, 99, 235, 0.3) 35%, transparent 65%)',
            filter: 'blur(140px)'
          }}
          animate={{
            scale: stage === 'kawoosh' ? [1, 2.2, 1.6] : [1, 1.2, 1]
          }}
          transition={{
            duration: stage === 'kawoosh' ? 1.5 : 4,
            repeat: stage === 'vortex' || stage === 'journey' ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />

        {/* Lens flare streaks */}
        {(stage === 'kawoosh' || stage === 'radiance') && (
          <>
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * 180;
              return (
                <motion.div
                  key={`flare-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '150vw',
                    height: '4px',
                    marginLeft: '-75vw',
                    marginTop: '-2px',
                    background: `linear-gradient(to right, transparent, rgba(147, 197, 253, ${0.6 - i * 0.08}) 50%, transparent)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)',
                    mixBlendMode: 'screen'
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.4, 0.8],
                    scaleX: [0, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
          </>
        )}
      </motion.div>

      {/* Title */}
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-12 sm:top-16 left-0 right-0 text-center z-20 px-4"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-100 drop-shadow-2xl mb-2"
              animate={{
                textShadow: [
                  '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(96, 165, 250, 0.4)',
                  '0 0 50px rgba(96, 165, 250, 1), 0 0 80px rgba(59, 130, 246, 0.6)',
                  '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(96, 165, 250, 0.4)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Stargate Portal
            </motion.h1>
            <p className="text-base sm:text-lg text-blue-200/90 font-medium">Opening the gateway to your memories</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Stargate ring assembly */}
        <AnimatePresence mode="wait">
          {(stage === 'materialize' || stage === 'spin' || stage === 'chevrons' || stage === 'kawoosh' || stage === 'stabilize' || stage === 'vortex' || stage === 'journey' || stage === 'unstable') && (
            <motion.div
              className="absolute z-30"
              initial={{ scale: 0, opacity: 0, rotateY: -90 }}
              animate={{ 
                scale: stage === 'unstable' ? [1, 1.12, 0.92, 1.08, 0.85, 0] : 1,
                opacity: stage === 'unstable' ? [1, 0.95, 0.8, 0.6, 0.3, 0] : 1,
                rotateY: stage === 'materialize' ? 0 : 0
              }}
              exit={{ scale: 0, opacity: 0, rotateY: 90 }}
              transition={{ 
                scale: { duration: stage === 'materialize' ? 1.5 : 1.5, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { duration: stage === 'materialize' ? 1.5 : 1.5 },
                rotateY: { duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }
              }}
              style={{ perspective: '1500px' }}
            >
              {/* Massive gate energy glow */}
              <motion.div
                className="absolute inset-0 -m-80"
                animate={{
                  scale: stage === 'kawoosh' ? [1, 2.5, 2] 
                       : stage === 'stabilize' || stage === 'vortex' ? [2, 1.6, 2]
                       : [1, 1.4, 1],
                  opacity: stage === 'kawoosh' ? [0.5, 1, 0.95] 
                        : stage === 'stabilize' || stage === 'vortex' || stage === 'journey' ? [0.7, 0.85, 0.7]
                        : [0.4, 0.65, 0.4]
                }}
                transition={{
                  duration: stage === 'kawoosh' ? 1.5 : 4,
                  repeat: stage === 'vortex' || stage === 'journey' ? Infinity : 0,
                  ease: 'easeInOut'
                }}
              >
                <div
                  className="w-[900px] h-[900px]"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.7) 0%, rgba(59, 130, 246, 0.5) 30%, rgba(37, 99, 235, 0.25) 60%, transparent 80%)',
                    filter: 'blur(120px)',
                    mixBlendMode: 'screen'
                  }}
                />
              </motion.div>

              {/* Outer ring */}
              <motion.div
                className="relative w-[500px] h-[500px]"
                animate={{
                  rotate: gateRotation
                }}
                transition={{
                  rotate: { duration: stage === 'spin' ? 2 : 2.5, ease: [0.65, 0, 0.35, 1] }
                }}
              >
                {/* Main ring structure with metallic texture */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle,
                        transparent 0%,
                        transparent 42%,
                        rgba(71, 85, 105, 0.98) 42%,
                        rgba(100, 116, 139, 1) 43.5%,
                        rgba(148, 163, 184, 1) 45%,
                        rgba(120, 130, 155, 1) 47%,
                        rgba(100, 116, 139, 1) 49%,
                        rgba(71, 85, 105, 0.98) 51%,
                        transparent 51%,
                        transparent 100%
                      )
                    `,
                    boxShadow: stage === 'kawoosh' || stage === 'stabilize'
                      ? '0 0 140px rgba(96, 165, 250, 1), inset 0 0 70px rgba(96, 165, 250, 0.5), 0 0 200px rgba(147, 197, 253, 0.6)'
                      : '0 0 100px rgba(59, 130, 246, 0.75), inset 0 0 60px rgba(0, 0, 0, 0.9), 0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}
                  animate={{
                    boxShadow: stage === 'kawoosh' 
                      ? [
                          '0 0 100px rgba(96, 165, 250, 0.75), inset 0 0 60px rgba(96, 165, 250, 0.3)',
                          '0 0 200px rgba(96, 165, 250, 1), inset 0 0 100px rgba(96, 165, 250, 0.7), 0 0 300px rgba(147, 197, 253, 0.8)',
                          '0 0 140px rgba(96, 165, 250, 1), inset 0 0 70px rgba(96, 165, 250, 0.5)'
                        ]
                      : undefined
                  }}
                  transition={{
                    boxShadow: { duration: 1.5, ease: 'easeInOut' }
                  }}
                />

                {/* Inner ring detail with depth */}
                <div
                  className="absolute inset-4 rounded-full"
                  style={{
                    background: `
                      radial-gradient(circle,
                        transparent 0%,
                        transparent 44%,
                        rgba(51, 65, 85, 0.9) 44%,
                        rgba(71, 85, 105, 0.98) 46%,
                        rgba(81, 95, 115, 1) 48%,
                        rgba(71, 85, 105, 0.98) 50%,
                        rgba(51, 65, 85, 0.9) 52%,
                        transparent 52%,
                        transparent 100%
                      )
                    `,
                    boxShadow: 'inset 0 5px 20px rgba(0, 0, 0, 0.6)'
                  }}
                />

                {/* Ring glyphs with enhanced detail */}
                {[...Array(39)].map((_, i) => {
                  const angle = (i / 39) * 360;
                  const isMainGlyph = i % 3 === 0;
                  
                  return (
                    <motion.div
                      key={`glyph-${i}`}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${angle}deg) translateY(-220px) rotate(-${angle}deg)`,
                        marginLeft: '-7px',
                        marginTop: '-9px',
                        width: isMainGlyph ? '14px' : '12px',
                        height: isMainGlyph ? '18px' : '15px',
                        background: isMainGlyph
                          ? 'linear-gradient(to bottom, rgba(159, 173, 194, 1), rgba(120, 135, 156, 1))'
                          : 'linear-gradient(to bottom, rgba(100, 116, 139, 0.9), rgba(71, 85, 105, 0.8))',
                        borderRadius: '2px',
                        boxShadow: isMainGlyph 
                          ? '0 0 6px rgba(100, 116, 139, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.4)'
                          : '0 0 4px rgba(71, 85, 105, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                      animate={stage === 'chevrons' ? {
                        boxShadow: [
                          isMainGlyph ? '0 0 6px rgba(100, 116, 139, 0.6)' : '0 0 4px rgba(71, 85, 105, 0.4)',
                          isMainGlyph ? '0 0 14px rgba(147, 197, 253, 0.9)' : '0 0 10px rgba(96, 165, 250, 0.7)',
                          isMainGlyph ? '0 0 6px rgba(100, 116, 139, 0.6)' : '0 0 4px rgba(71, 85, 105, 0.4)'
                        ]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: stage === 'chevrons' ? Infinity : 0,
                        delay: i * 0.05
                      }}
                    />
                  );
                })}

                {/* Chevrons with MECHANICAL lock animations */}
                {chevrons.map((chevron, idx) => (
                  <motion.div
                    key={`chevron-${chevron.id}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${chevron.angle}deg)`,
                      transformOrigin: '0 0'
                    }}
                  >
                    {/* Chevron body with metallic look */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: '-24px',
                        top: '-245px',
                        width: '48px',
                        height: '55px'
                      }}
                      animate={chevron.locked ? {
                        scale: [1, 1.35, 1.05, 1],
                        y: [0, -10, 0]
                      } : {}}
                      transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      {/* Chevron V shape */}
                      <svg viewBox="0 0 48 55" className="w-full h-full">
                        <defs>
                          <linearGradient id={`chevron-gradient-${chevron.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={chevron.locked ? 'rgba(251, 191, 36, 1)' : 'rgba(100, 116, 139, 1)'} />
                            <stop offset="50%" stopColor={chevron.locked ? 'rgba(245, 158, 11, 1)' : 'rgba(85, 100, 125, 1)'} />
                            <stop offset="100%" stopColor={chevron.locked ? 'rgba(217, 119, 6, 1)' : 'rgba(71, 85, 105, 0.9)'} />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 6,6 L 24,40 L 42,6 L 36,6 L 24,30 L 12,6 Z"
                          fill={`url(#chevron-gradient-${chevron.id})`}
                          stroke={chevron.locked ? 'rgba(234, 179, 8, 1)' : 'rgba(51, 65, 85, 0.9)'}
                          strokeWidth="2.5"
                          style={{
                            filter: chevron.locked 
                              ? `drop-shadow(0 0 30px rgba(251, 191, 36, 1)) drop-shadow(0 0 18px rgba(251, 191, 36, 0.9)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.6))` 
                              : 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.6))',
                            transition: 'all 0.3s ease-out'
                          }}
                        />
                      </svg>

                      {/* EXPLOSIVE lock effects */}
                      <AnimatePresence>
                        {chevron.locked && (
                          <>
                            {/* Primary shockwave */}
                            <motion.div
                              className="absolute inset-0 -m-16"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: [0, 4, 4.5],
                                opacity: [0, 1, 0]
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                              <div
                                className="w-full h-full rounded-full border-4 border-amber-400"
                                style={{
                                  boxShadow: '0 0 50px rgba(251, 191, 36, 1), 0 0 80px rgba(245, 158, 11, 0.8)',
                                  filter: 'blur(2px)'
                                }}
                              />
                            </motion.div>

                            {/* Secondary energy ring */}
                            <motion.div
                              className="absolute inset-0 -m-12"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ 
                                scale: [0, 3, 3.2],
                                opacity: [0, 0.8, 0]
                              }}
                              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                            >
                              <div
                                className="w-full h-full rounded-full border-3 border-orange-300"
                                style={{
                                  boxShadow: '0 0 40px rgba(251, 146, 60, 1)',
                                  filter: 'blur(3px)'
                                }}
                              />
                            </motion.div>

                            {/* Radial burst particles - reduced count */}
                            {[...Array(12)].map((_, i) => {
                              const angle = (i / 12) * Math.PI * 2;
                              const distance = 55;
                              
                              return (
                                <motion.div
                                  key={`burst-${chevron.id}-${i}`}
                                  className="absolute"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-3px',
                                    marginTop: '-3px'
                                  }}
                                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                  animate={{
                                    x: Math.cos(angle) * distance,
                                    y: Math.sin(angle) * distance,
                                    scale: [0, 1.8, 0],
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{
                                    duration: 0.7,
                                    delay: 0.1,
                                    ease: [0.34, 1.56, 0.64, 1]
                                  }}
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                      background: 'radial-gradient(circle, rgba(251, 191, 36, 1), rgba(234, 179, 8, 0.9))',
                                      boxShadow: '0 0 15px rgba(251, 191, 36, 1)'
                                    }}
                                  />
                                </motion.div>
                              );
                            })}

                            {/* Intense glow halo */}
                            <motion.div
                              className="absolute inset-0 -m-14"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ 
                                scale: [0.5, 2.8, 2.2],
                                opacity: [0, 1, 0.8, 0]
                              }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                            >
                              <div
                                className="w-full h-full"
                                style={{
                                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.95), rgba(251, 191, 36, 0.5) 50%, transparent)',
                                  filter: 'blur(25px)',
                                  mixBlendMode: 'screen'
                                }}
                              />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Center energy core */}
                <AnimatePresence>
                  {lockedCount > 0 && (
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.4, 1],
                        opacity: [0, 1, 0.85, 1, 0.85]
                      }}
                      transition={{
                        scale: { duration: 0.9, ease: [0.34, 1.56, 0.64, 1] },
                        opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                      }}
                    >
                      <div
                        className="w-40 h-40 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(147, 197, 253, 1) 0%, rgba(96, 165, 250, 1) 40%, rgba(59, 130, 246, 0.8) 70%, transparent 100%)',
                          boxShadow: '0 0 90px rgba(96, 165, 250, 1), 0 0 130px rgba(59, 130, 246, 0.9)',
                          filter: 'blur(12px)',
                          mixBlendMode: 'screen'
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Energy rings during chevron sequence */}
                <AnimatePresence>
                  {stage === 'chevrons' && lockedCount > 0 && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`energy-ring-${i}`}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                          style={{
                            borderColor: `rgba(96, 165, 250, ${0.8 - i * 0.2})`,
                            width: `${170 + i * 45}px`,
                            height: `${170 + i * 45}px`,
                            boxShadow: `0 0 ${20 - i * 5}px rgba(96, 165, 250, ${0.6 - i * 0.15})`
                          }}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{
                            scale: [0.8, 1.5, 1.5],
                            opacity: [0, 0.9, 0]
                          }}
                          transition={{
                            duration: 2.2,
                            delay: i * 0.35,
                            repeat: Infinity,
                            ease: 'easeOut'
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Chevron counter with metallic frame */}
              <AnimatePresence mode="wait">
                {stage === 'chevrons' && lockedCount > 0 && (
                  <motion.div
                    className="absolute -top-20 sm:-top-28 left-1/2 -translate-x-1/2 text-center"
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <motion.div 
                      className="text-5xl sm:text-6xl md:text-7xl font-black text-amber-400 drop-shadow-2xl"
                      key={lockedCount}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        textShadow: '0 0 35px rgba(251, 191, 36, 1), 0 0 60px rgba(251, 191, 36, 0.7), 0 4px 10px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      {lockedCount}/9
                    </motion.div>
                    <div className="text-xs sm:text-sm text-blue-200 mt-1 font-semibold tracking-widest uppercase">Chevrons Locked</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* "ENGAGING" message */}
              <AnimatePresence>
                {stage === 'chevrons' && lockedCount === 9 && (
                  <motion.div
                    className="absolute top-28 sm:top-36 left-1/2 -translate-x-1/2 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1.3, 1, 1]
                    }}
                    transition={{ duration: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <div 
                      className="text-2xl sm:text-3xl font-black text-cyan-300 tracking-widest"
                      style={{
                        textShadow: '0 0 45px rgba(34, 211, 238, 1), 0 0 70px rgba(34, 211, 238, 0.8)'
                      }}
                    >
                      ENGAGING
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ULTRA REALISTIC Event horizon kawoosh */}
        <AnimatePresence>
          {stage === 'kawoosh' && (
            <>
              {/* Heat distortion effect */}
              <motion.div
                className="absolute inset-0 z-31 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                transition={{ duration: 1.5 }}
                style={{
                  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 60%)',
                  backdropFilter: 'blur(8px)',
                  mixBlendMode: 'overlay'
                }}
              />

              {/* Massive central explosion core */}
              <motion.div
                className="absolute z-29 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 10, 6],
                  opacity: [0, 1, 0.8]
                }}
                transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div
                  className="w-[500px] h-[500px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 1) 12%, rgba(219, 234, 254, 0.95) 25%, rgba(147, 197, 253, 0.85) 45%, rgba(96, 165, 250, 0.65) 65%, transparent 85%)',
                    boxShadow: '0 0 350px rgba(147, 197, 253, 1), 0 0 550px rgba(96, 165, 250, 0.9)',
                    filter: 'blur(40px)',
                    mixBlendMode: 'screen'
                  }}
                />
              </motion.div>

              {/* Dual shockwave rings */}
              {[0, 0.3].map((delay, idx) => (
                <motion.div
                  key={`shockwave-${idx}`}
                  className="absolute z-28 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 14, 16],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ duration: 2.2, delay, ease: 'easeOut' }}
                >
                  <div
                    className="w-96 h-96 rounded-full border-8 border-blue-200"
                    style={{
                      boxShadow: '0 0 70px rgba(147, 197, 253, 1), inset 0 0 30px rgba(147, 197, 253, 0.5)',
                      filter: 'blur(10px)'
                    }}
                  />
                </motion.div>
              ))}

              {/* EXPLOSIVE particles - optimized count */}
              {kawooshParticles.slice(0, 400).map((particle) => (
                <motion.div
                  key={`kawoosh-${particle.id}`}
                  className="absolute z-27"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    scale: [0, particle.scale * 2.8, particle.scale * 2],
                    opacity: [0, 1, 0.95, 0]
                  }}
                  transition={{
                    duration: 1.4,
                    delay: particle.delay,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(219, 234, 254, 1) 40%, rgba(96, 165, 250, 0.95) 80%)',
                      boxShadow: '0 0 18px rgba(147, 197, 253, 1), 0 0 10px rgba(255, 255, 255, 0.9)'
                    }}
                  />
                </motion.div>
              ))}

              {/* Radial light beams - photorealistic */}
              {[...Array(32)].map((_, i) => {
                const angle = (i / 32) * 360;
                return (
                  <motion.div
                    key={`kawoosh-beam-${i}`}
                    className="absolute z-28"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '700px',
                      height: '10px',
                      marginLeft: '-350px',
                      marginTop: '-5px',
                      background: 'linear-gradient(to right, transparent, rgba(219, 234, 254, 0.95) 50%, transparent)',
                      transformOrigin: 'center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(4px)',
                      mixBlendMode: 'screen'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 3, 3.5],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.3,
                      delay: i * 0.015,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Stable wormhole with photorealistic rippling */}
        <AnimatePresence>
          {(stage === 'stabilize' || stage === 'vortex' || stage === 'journey' || stage === 'unstable') && (
            <motion.div
              className="absolute z-26"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'unstable' ? [1, 1.18, 0.88, 1.15, 0.7, 0] : 1,
                opacity: stage === 'unstable' ? [1, 0.92, 0.7, 0.5, 0.2, 0] : 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                scale: { duration: stage === 'stabilize' ? 1.5 : 1.5, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { duration: 1.5 }
              }}
            >
              {/* Event horizon surface - realistic water effect */}
              <motion.div
                className="relative w-[460px] h-[460px] rounded-full overflow-hidden"
                animate={{
                  scale: stage === 'unstable' ? [1, 1.25, 0.88, 1.2] : [1, 1.1, 1]
                }}
                transition={{
                  duration: stage === 'unstable' ? 1.5 : 4,
                  repeat: stage === 'unstable' ? 0 : Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  boxShadow: '0 0 120px rgba(96, 165, 250, 0.9), inset 0 0 100px rgba(59, 130, 246, 0.6), 0 0 200px rgba(147, 197, 253, 0.5)'
                }}
              >
                {/* Multiple ripple layers with realistic physics */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`ripple-${i}`}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at ${43 + i * 4}% ${43 + i * 6}%, 
                        rgba(219, 234, 254, ${0.98 - i * 0.09}) 0%,
                        rgba(147, 197, 253, ${0.93 - i * 0.08}) 12%,
                        rgba(96, 165, 250, ${0.88 - i * 0.07}) 25%,
                        rgba(59, 130, 246, ${0.8 - i * 0.06}) 45%,
                        rgba(37, 99, 235, ${0.7 - i * 0.05}) 65%,
                        rgba(29, 78, 216, ${0.6 - i * 0.04}) 85%,
                        transparent 100%
                      )`,
                      mixBlendMode: 'screen'
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                      rotate: [0, 180 + i * 25, 360 + i * 50]
                    }}
                    transition={{
                      duration: 8 + i * 1.8,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3
                    }}
                  />
                ))}

                {/* Bright photorealistic core */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.95, 1, 0.95]
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <div
                    className="w-80 h-80 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.95) 18%, rgba(219, 234, 254, 0.8) 35%, transparent 65%)',
                      filter: 'blur(55px)',
                      mixBlendMode: 'screen'
                    }}
                  />
                </motion.div>

                {/* Swirling energy patterns - realistic motion */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`swirl-${i}`}
                    className="absolute inset-0"
                    style={{
                      background: `conic-gradient(from ${i * 45}deg, transparent 0%, rgba(147, 197, 253, ${0.45 - i * 0.04}) 25%, transparent 50%)`,
                      mixBlendMode: 'screen'
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 5 + i * 0.6,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vortex particles with realistic spiral physics */}
        <AnimatePresence>
          {(stage === 'vortex' || stage === 'journey') && vortexParticles.map((particle) => (
            <motion.div
              key={`vortex-${particle.id}`}
              className="absolute z-25 rounded-full"
              style={{
                width: '6px',
                height: '6px',
                background: particle.color,
                boxShadow: `0 0 14px ${particle.color}, 0 0 8px ${particle.color}`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                x: [
                  Math.cos(particle.angle * Math.PI / 180) * particle.radius,
                  Math.cos((particle.angle - 1080) * Math.PI / 180) * (particle.radius * 0.15)
                ],
                y: [
                  Math.sin(particle.angle * Math.PI / 180) * particle.radius,
                  Math.sin((particle.angle - 1080) * Math.PI / 180) * (particle.radius * 0.15)
                ],
                scale: [1, 0.35, 0.15],
                opacity: [0, 1, 0.95, 0.7, 0]
              }}
              transition={{
                duration: 4 / particle.speed,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
                delay: (particle.id * 0.004) % 4
              }}
            />
          ))}
        </AnimatePresence>

        {/* EPIC Journey through portal - cinema quality */}
        <AnimatePresence>
          {stage === 'journey' && (
            <>
              {/* Expanding tunnel rings */}
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={`tunnel-ring-${i}`}
                  className="absolute rounded-full border-4"
                  style={{
                    borderColor: `rgba(147, 197, 253, ${0.95 - i * 0.045})`,
                    boxShadow: `0 0 45px rgba(96, 165, 250, ${0.75 - i * 0.035}), inset 0 0 25px rgba(147, 197, 253, ${0.55 - i * 0.025})`
                  }}
                  initial={{
                    width: '120px',
                    height: '120px',
                    opacity: 0
                  }}
                  animate={{
                    width: '750px',
                    height: '750px',
                    opacity: [0, 0.95, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.13,
                    repeat: Infinity,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              ))}

              {/* Speed lines - photorealistic motion blur */}
              {[...Array(80)].map((_, i) => {
                const angle = (i / 80) * 360;
                const length = 200 + Math.random() * 120;
                
                return (
                  <motion.div
                    key={`speed-line-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${length}px`,
                      height: '4px',
                      marginLeft: `-${length / 2}px`,
                      marginTop: '-2px',
                      background: `linear-gradient(to right, transparent, rgba(219, 234, 254, ${0.85 + Math.random() * 0.15}), transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(1.5px)'
                    }}
                    animate={{
                      x: [0, Math.cos(angle * Math.PI / 180) * 600],
                      y: [0, Math.sin(angle * Math.PI / 180) * 600],
                      scaleX: [1, 3, 3.5],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.8,
                      delay: i * 0.01,
                      repeat: Infinity,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  />
                );
              })}

              {/* Radial energy burst - optimized */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                
                return (
                  <motion.div
                    key={`energy-burst-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(147, 197, 253, 0.95))',
                      boxShadow: '0 0 22px rgba(147, 197, 253, 1)'
                    }}
                    animate={{
                      x: [0, Math.cos(angle) * 450],
                      y: [0, Math.sin(angle) * 450],
                      scale: [0, 2.5, 2],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.2,
                      delay: i * 0.04,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* ULTIMATE SUPERNOVA - Optimized for 60fps */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* Primary radiance rays - smooth performance */}
              {[...Array(isMobile() ? 24 : 48)].map((_, i) => {
                const rayCount = isMobile() ? 24 : 48;
                const angle = (i / rayCount) * 360;
                const color = i % 5 === 0 
                  ? 'rgba(255, 255, 255, 1)'
                  : i % 5 === 1
                  ? 'rgba(240, 249, 255, 1)'
                  : i % 5 === 2
                  ? 'rgba(219, 234, 254, 1)'
                  : i % 5 === 3
                  ? 'rgba(147, 197, 253, 1)'
                  : 'rgba(96, 165, 250, 1)';

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: i % 2 === 0 ? '14px' : '10px',
                      marginLeft: '-100vw',
                      marginTop: i % 2 === 0 ? '-7px' : '-5px',
                      background: `linear-gradient(to right, transparent, ${color.replace('1)', '0.98)')} 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: isMobile() ? 'blur(2px)' : 'blur(3px)',
                      mixBlendMode: 'screen'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 2.8, 2.5],
                      opacity: [0, 1, 0.97, 1, 0.97]
                    }}
                    transition={{
                      scaleX: { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] },
                      opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Secondary cyan rays */}
              {[...Array(isMobile() ? 12 : 24)].map((_, i) => {
                const rayCount = isMobile() ? 12 : 24;
                const angle = (i / rayCount) * 360 + 7.5;

                return (
                  <motion.div
                    key={`cyan-ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: '12px',
                      marginLeft: '-100vw',
                      marginTop: '-6px',
                      background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.98) 50%, transparent)',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(4px)',
                      mixBlendMode: 'screen'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 2.5, 2.2],
                      opacity: [0, 0.95, 0.85, 0.95]
                    }}
                    transition={{
                      scaleX: { duration: 2.7, ease: [0.34, 1.56, 0.64, 1] },
                      opacity: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Massive central supernova core */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 7, 6.5],
                  opacity: [0, 1, 0.98]
                }}
                transition={{ duration: 2.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div
                  className="w-[40rem] h-[40rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(250, 252, 255, 1) 8%, rgba(240, 249, 255, 0.98) 15%, rgba(219, 234, 254, 0.96) 25%, rgba(147, 197, 253, 0.92) 40%, rgba(96, 165, 250, 0.8) 55%, rgba(59, 130, 246, 0.65) 70%, rgba(37, 99, 235, 0.45) 85%, transparent 95%)',
                    boxShadow: '0 0 400px rgba(147, 197, 253, 1), 0 0 700px rgba(255, 255, 255, 0.95)',
                    filter: 'blur(95px)',
                    mixBlendMode: 'screen'
                  }}
                />
              </motion.div>

              {/* Orbiting particles - 3 rings for smooth performance */}
              {(() => {
                const allParticles = [];
                const colors = [
                  'rgba(255, 255, 255, 1)',
                  'rgba(219, 234, 254, 1)',
                  'rgba(147, 197, 253, 1)',
                  'rgba(96, 165, 250, 1)'
                ];

                for (let ring = 0; ring < 3; ring++) {
                  const radius = 160 + ring * 90;
                  const particleCount = 35 + ring * 15;

                  for (let i = 0; i < particleCount; i++) {
                    const angle = (i / particleCount) * 360;
                    const uniqueKey = `orbit-${ring}-${i}`;

                    allParticles.push(
                      <motion.div
                        key={uniqueKey}
                        className="absolute rounded-full"
                        style={{
                          width: `${9 - ring}px`,
                          height: `${9 - ring}px`,
                          background: colors[ring % 4],
                          boxShadow: `0 0 26px ${colors[ring % 4]}, 0 0 14px ${colors[ring % 4]}`,
                          filter: 'blur(1px)'
                        }}
                        animate={{
                          x: [
                            Math.cos(angle * Math.PI / 180) * radius,
                            Math.cos((angle + 360) * Math.PI / 180) * radius
                          ],
                          y: [
                            Math.sin(angle * Math.PI / 180) * radius,
                            Math.sin((angle + 360) * Math.PI / 180) * radius
                          ],
                          opacity: [0, 1, 0.98, 1, 0.98],
                          scale: [0.8, 1.4, 1.1]
                        }}
                        transition={{
                          delay: 0.6 + (ring * 50 + i) * 0.01,
                          duration: 9 + ring * 3,
                          repeat: Infinity,
                          ease: 'linear',
                          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      />
                    );
                  }
                }
                return allParticles;
              })()}

              {/* Star burst particles - optimized count */}
              {[...Array(100)].map((_, i) => {
                const angle = (i / 100) * Math.PI * 2;
                const distance = 110 + Math.random() * 300;
                const x = Math.cos(angle) * distance;
                const startY = Math.sin(angle) * distance - 120;
                const colors = [
                  'rgba(255, 255, 255, 1)',
                  'rgba(219, 234, 254, 1)',
                  'rgba(147, 197, 253, 1)',
                  'rgba(96, 165, 250, 1)'
                ];

                return (
                  <motion.div
                    key={`star-burst-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: -120, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: [startY, startY + 380],
                      scale: [0, 2.8, 2.3],
                      opacity: [0, 1, 0.95, 1, 0],
                      rotate: [0, 180 + Math.random() * 180]
                    }}
                    transition={{
                      duration: 4.2,
                      delay: i * 0.012,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <div
                      className="w-2 h-2"
                      style={{
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        background: colors[i % 4],
                        boxShadow: `0 0 20px ${colors[i % 4]}`,
                        filter: 'blur(0.5px)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* OPTIMIZED emoji burst - Only 16 emojis for buttery smooth 60fps! */}
              {[
                { emoji: '🌀', count: 4, distance: 200, size: 'text-5xl' },
                { emoji: '⭐', count: 4, distance: 180, size: 'text-6xl' },
                { emoji: '✨', count: 4, distance: 220, size: 'text-4xl' },
                { emoji: '⚡', count: 4, distance: 190, size: 'text-5xl' }
              ].map((config, configIdx) => 
                [...Array(config.count)].map((_, i) => {
                  const totalIdx = configIdx * 4 + i;
                  const angle = (totalIdx / 16) * Math.PI * 2;
                  const distance = config.distance;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;

                  return (
                    <motion.div
                      key={`emoji-${config.emoji}-${i}`}
                      className={`absolute ${config.size}`}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                      animate={{
                        x: x,
                        y: y,
                        scale: [0, 2.5, 2],
                        opacity: [0, 1, 0.98],
                        rotate: [0, 360 + Math.random() * 180]
                      }}
                      transition={{
                        duration: 2.8,
                        delay: 0.7 + totalIdx * 0.08,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      {config.emoji}
                    </motion.div>
                  );
                })
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute bottom-12 sm:bottom-20 left-0 right-0 text-center z-40 px-4"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-100 drop-shadow-2xl mb-2 sm:mb-3"
              animate={{
                textShadow: [
                  '0 0 40px rgba(147, 197, 253, 1), 0 0 70px rgba(96, 165, 250, 0.6)',
                  '0 0 60px rgba(96, 165, 250, 1), 0 0 90px rgba(147, 197, 253, 0.8)',
                  '0 0 40px rgba(147, 197, 253, 1), 0 0 70px rgba(96, 165, 250, 0.6)'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Portal Established
            </motion.h2>
            <p className="text-base sm:text-lg md:text-2xl text-blue-200 drop-shadow-lg font-medium">
              Your memories transcend space and time
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
