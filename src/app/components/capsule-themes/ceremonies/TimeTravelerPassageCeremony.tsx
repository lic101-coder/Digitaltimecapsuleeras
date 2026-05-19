/**
 * Time Traveler - Time's Passage Ceremony (EPIC SPECTACULAR VERSION)
 * 
 * Breathtaking clock face dissolving into spiraling time streams with golden chrono-particles.
 * Features: Majestic ornate clock materializes → intricate gears spin → clock hands accelerate
 * → dissolution into swirling temporal ribbons → thousands of time particles spiral outward
 * → crystalline time shards burst → EPIC 48-ray cyan radiance with particle explosion
 * 
 * Stages:
 * 4. 6-8.5s: Clock dissolves into swirling temporal ribbons with trailing particles
 * 5. 8.5-11s: Ribbons explode into crystalline time shards spreading across space
 * 7. 13-14.5s: Constellation with hourglass symbol
 * 8. 14.5-17s: TRANSCENDENT 48-ray cyan supernova with 300+ particles (2.5 SECONDS!)
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimeTravelerPassageCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface TimeParticle {
  id: number;
  angle: number;
  radius: number;
  size: number;
  speed: number;
  delay: number;
}

interface TimeShard {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  delay: number;
}

export function TimeTravelerPassageCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: TimeTravelerPassageCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'clock' | 'gears' | 'accelerate' | 'dissolve' | 'shards' | 'constellation' | 'radiance' | 'outro'>('intro');
  const [particles, setParticles] = useState<TimeParticle[]>([]);
  const [shards, setShards] = useState<TimeShard[]>([]);

  // Animation timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('clock') },
      { time: 4000, action: () => setStage('gears') },
      { time: 6000, action: () => setStage('accelerate') },
      { time: 8500, action: () => setStage('dissolve') },
      { time: 11000, action: () => setStage('shards') },
      { time: 13000, action: () => setStage('constellation') },
      { time: 14500, action: () => setStage('radiance') },  // Radiance shows for 2.5 seconds!
      { time: 17000, action: () => setStage('outro') },
      { time: 17500, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate spiraling time particles
  useEffect(() => {
    if (stage === 'dissolve' || stage === 'shards') {
      const newParticles: TimeParticle[] = [];
      // Use stage-specific ID offset to prevent duplicate keys during AnimatePresence transitions
      const idOffset = stage === 'dissolve' ? 0 : 1000;
      for (let i = 0; i < 200; i++) {
        newParticles.push({
          id: idOffset + i,
          angle: (i / 200) * Math.PI * 2,
          radius: 50 + Math.random() * 150,
          size: 2 + Math.random() * 3,
          speed: 1.5 + Math.random() * 1.5,
          delay: i * 0.01
        });
      }
      setParticles(newParticles);
    }
  }, [stage]);

  // Generate crystalline time shards
  useEffect(() => {
    if (stage === 'shards' || stage === 'constellation' || stage === 'radiance') {
      const newShards: TimeShard[] = [];
      // Use stage-specific ID offset to prevent duplicate keys during AnimatePresence transitions
      const idOffset = stage === 'shards' ? 0 : stage === 'constellation' ? 100 : 200;
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const distance = 100 + Math.random() * 180;
        newShards.push({
          id: idOffset + i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotation: Math.random() * 360,
          size: 0.8 + Math.random() * 0.6,
          delay: i * 0.03
        });
      }
      setShards(newShards);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#0f1535] to-[#1a1f3a]">
      {/* Deep space gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #0f2540 0%, #0a1628 60%, #050a14 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #0f1535 0%, #0a0e27 70%, #050812 100%)'
        }}
        transition={{ duration: 2 }}
      />

      {/* Cosmic star field */}
      <div className="absolute inset-0">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(96, 165, 250, 0.5))',
              boxShadow: '0 0 6px rgba(147, 197, 253, 0.9)'
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Ethereal cyan glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'radiance' ? 0.9 : 0.4
        }}
        transition={{ duration: 2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 70%)',
            filter: 'blur(120px)'
          }}
        />
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
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-200 drop-shadow-2xl mb-2"
              animate={{
                textShadow: [
                  '0 0 30px rgba(56, 189, 248, 0.8)',
                  '0 0 50px rgba(56, 189, 248, 1)',
                  '0 0 30px rgba(56, 189, 248, 0.8)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Time's Passage
            </motion.h1>
            <p className="text-cyan-300/90 mt-2 text-sm sm:text-base font-mono">The river of moments flows eternal</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Magnificent ornate clock face */}
        <AnimatePresence>
          {(stage === 'clock' || stage === 'gears' || stage === 'accelerate' || stage === 'dissolve') && (
            <motion.div
              className="absolute z-30"
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{
                scale: stage === 'dissolve' ? [1, 1.4, 0] : 1,
                opacity: stage === 'dissolve' ? [1, 0.8, 0] : 1,
                rotate: stage === 'accelerate' ? [0, 360] : stage === 'dissolve' ? [360, 540] : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: stage === 'dissolve' ? 2.5 : 1.8, ease: 'easeOut' },
                opacity: { duration: stage === 'dissolve' ? 2.5 : 1.5 },
                rotate: { duration: stage === 'accelerate' ? 2 : 2.5, ease: stage === 'dissolve' ? 'easeIn' : 'linear' }
              }}
            >
              {/* Ornate clock mega-glow */}
              <motion.div
                className="absolute inset-0 -m-40"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div
                  className="w-96 h-96"
                  style={{
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(14, 165, 233, 0.5) 30%, rgba(56, 189, 248, 0.2) 60%, transparent 80%)',
                    filter: 'blur(60px)'
                  }}
                />
              </motion.div>

              {/* Main clock structure */}
              <div className="relative w-[400px] h-[400px]">
                {/* Outer ornate ring with engravings */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(15, 37, 64, 0.95) 0%, rgba(10, 22, 40, 0.9) 100%)',
                    border: '4px solid rgba(56, 189, 248, 0.8)',
                    boxShadow: '0 0 80px rgba(56, 189, 248, 0.6), inset 0 0 80px rgba(56, 189, 248, 0.3), 0 0 0 8px rgba(14, 165, 233, 0.3)',
                    backdropFilter: 'blur(30px)'
                  }}
                >
                  {/* Decorative corner pieces */}
                  {[0, 90, 180, 270].map((angle, idx) => (
                    <div
                      key={`corner-${idx}`}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: '60px',
                        height: '60px',
                        marginLeft: '-30px',
                        marginTop: '-30px',
                        transform: `rotate(${angle}deg) translateY(-180px)`
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.6), rgba(14, 165, 233, 0.3))',
                          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                          boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)',
                          filter: 'blur(1px)'
                        }}
                      />
                    </div>
                  ))}

                  {/* Roman numerals */}
                  {['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map((numeral, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const x = Math.cos(angle - Math.PI / 2) * 155;
                    const y = Math.sin(angle - Math.PI / 2) * 155;
                    return (
                      <motion.div
                        key={`numeral-${i}`}
                        className="absolute font-serif"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                          fontSize: numeral === 'XII' || numeral === 'III' || numeral === 'VI' || numeral === 'IX' ? '24px' : '20px',
                          fontWeight: 'bold',
                          color: 'rgba(147, 197, 253, 1)',
                          textShadow: '0 0 15px rgba(147, 197, 253, 1), 0 0 30px rgba(56, 189, 248, 0.8)',
                          letterSpacing: '1px'
                        }}
                        animate={{
                          textShadow: [
                            '0 0 15px rgba(147, 197, 253, 1), 0 0 30px rgba(56, 189, 248, 0.8)',
                            '0 0 25px rgba(147, 197, 253, 1), 0 0 50px rgba(56, 189, 248, 1)',
                            '0 0 15px rgba(147, 197, 253, 1), 0 0 30px rgba(56, 189, 248, 0.8)'
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: 'easeInOut'
                        }}
                      >
                        {numeral}
                      </motion.div>
                    );
                  })}

                  {/* Hour marks between numerals */}
                  {[...Array(60)].map((_, i) => {
                    if (i % 5 === 0) return null; // Skip where numerals are
                    const angle = (i * 6) * (Math.PI / 180);
                    const x = Math.cos(angle - Math.PI / 2) * 165;
                    const y = Math.sin(angle - Math.PI / 2) * 165;
                    return (
                      <div
                        key={`mark-${i}`}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          width: '2px',
                          height: '8px',
                          background: 'rgba(56, 189, 248, 0.6)',
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${i * 6}deg)`,
                          boxShadow: '0 0 4px rgba(56, 189, 248, 0.8)'
                        }}
                      />
                    );
                  })}

                  {/* Visible gears - only in gears and accelerate stages */}
                  <AnimatePresence>
                    {(stage === 'gears' || stage === 'accelerate') && (
                      <>
                        {/* Large central gear */}
                        <motion.div
                          className="absolute left-1/2 top-1/2"
                          style={{
                            width: '120px',
                            height: '120px',
                            marginLeft: '-60px',
                            marginTop: '-60px'
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0.7, 0.7],
                            scale: 1,
                            rotate: stage === 'accelerate' ? [0, 360, 720] : [0, 360]
                          }}
                          transition={{
                            opacity: { duration: 0.8 },
                            rotate: { duration: stage === 'accelerate' ? 2 : 4, ease: stage === 'accelerate' ? 'easeIn' : 'linear', repeat: Infinity }
                          }}
                        >
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="35" fill="rgba(14, 165, 233, 0.3)" stroke="rgba(56, 189, 248, 0.8)" strokeWidth="2" />
                            {[...Array(12)].map((_, i) => {
                              const angle = (i * 30) * (Math.PI / 180);
                              const x1 = 50 + Math.cos(angle) * 30;
                              const y1 = 50 + Math.sin(angle) * 30;
                              const x2 = 50 + Math.cos(angle) * 40;
                              const y2 = 50 + Math.sin(angle) * 40;
                              return (
                                <line
                                  key={`gear-tooth-${i}`}
                                  x1={x1}
                                  y1={y1}
                                  x2={x2}
                                  y2={y2}
                                  stroke="rgba(56, 189, 248, 0.9)"
                                  strokeWidth="4"
                                />
                              );
                            })}
                            <circle cx="50" cy="50" r="10" fill="rgba(56, 189, 248, 1)" />
                          </svg>
                        </motion.div>

                        {/* Side gears */}
                        {[{ x: -80, y: -60, size: 70, speed: 3 }, { x: 80, y: -60, size: 70, speed: 3 }].map((gear, idx) => (
                          <motion.div
                            key={`side-gear-${idx}`}
                            className="absolute left-1/2 top-1/2"
                            style={{
                              width: `${gear.size}px`,
                              height: `${gear.size}px`,
                              marginLeft: `${gear.x - gear.size / 2}px`,
                              marginTop: `${gear.y - gear.size / 2}px`
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 0.6, 0.6],
                              scale: 1,
                              rotate: stage === 'accelerate' ? [0, -720] : [0, -360]
                            }}
                            transition={{
                              opacity: { duration: 0.8, delay: 0.3 },
                              rotate: { duration: stage === 'accelerate' ? 2 : gear.speed, ease: stage === 'accelerate' ? 'easeIn' : 'linear', repeat: Infinity }
                            }}
                          >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              <circle cx="50" cy="50" r="30" fill="rgba(14, 165, 233, 0.2)" stroke="rgba(56, 189, 248, 0.7)" strokeWidth="2" />
                              {[...Array(8)].map((_, i) => {
                                const angle = (i * 45) * (Math.PI / 180);
                                const x1 = 50 + Math.cos(angle) * 25;
                                const y1 = 50 + Math.sin(angle) * 25;
                                const x2 = 50 + Math.cos(angle) * 35;
                                const y2 = 50 + Math.sin(angle) * 35;
                                return (
                                  <line
                                    key={`side-gear-tooth-${idx}-${i}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="rgba(56, 189, 248, 0.8)"
                                    strokeWidth="3"
                                  />
                                );
                              })}
                            </svg>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Clock center hub */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(147, 197, 253, 1), rgba(56, 189, 248, 0.8))',
                      boxShadow: '0 0 40px rgba(147, 197, 253, 1)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(147, 197, 253, 1)',
                        '0 0 70px rgba(147, 197, 253, 1)',
                        '0 0 40px rgba(147, 197, 253, 1)'
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Hour hand */}
                  <motion.div
                    className="absolute z-5"
                    style={{
                      width: '8px',
                      height: '100px',
                      background: 'linear-gradient(to top, rgba(147, 197, 253, 1), rgba(56, 189, 248, 0.9))',
                      borderRadius: '4px',
                      transformOrigin: '4px 100px',
                      left: 'calc(50% - 4px)',
                      top: 'calc(50% - 100px)',
                      boxShadow: '0 0 20px rgba(147, 197, 253, 1)'
                    }}
                    animate={{
                      rotate: stage === 'accelerate' 
                        ? [0, 360, 1080]
                        : stage === 'dissolve'
                        ? [1080, 1800]
                        : [0, 360]
                    }}
                    transition={{
                      duration: stage === 'accelerate' ? 2 : stage === 'dissolve' ? 2.5 : 3,
                      ease: stage === 'accelerate' ? 'easeIn' : stage === 'dissolve' ? 'easeOut' : 'linear',
                      repeat: stage !== 'accelerate' && stage !== 'dissolve' ? Infinity : 0
                    }}
                  />

                  {/* Minute hand */}
                  <motion.div
                    className="absolute z-5"
                    style={{
                      width: '6px',
                      height: '140px',
                      background: 'linear-gradient(to top, rgba(56, 189, 248, 1), rgba(14, 165, 233, 0.8))',
                      borderRadius: '3px',
                      transformOrigin: '3px 140px',
                      left: 'calc(50% - 3px)',
                      top: 'calc(50% - 140px)',
                      boxShadow: '0 0 15px rgba(56, 189, 248, 1)'
                    }}
                    animate={{
                      rotate: stage === 'accelerate'
                        ? [0, 720, 2160]
                        : stage === 'dissolve'
                        ? [2160, 3600]
                        : [0, 720]
                    }}
                    transition={{
                      duration: stage === 'accelerate' ? 2 : stage === 'dissolve' ? 2.5 : 3,
                      ease: stage === 'accelerate' ? 'easeIn' : stage === 'dissolve' ? 'easeOut' : 'linear',
                      repeat: stage !== 'accelerate' && stage !== 'dissolve' ? Infinity : 0
                    }}
                  />

                  {/* Second hand - ultra fast */}
                  <motion.div
                    className="absolute z-5"
                    style={{
                      width: '2px',
                      height: '160px',
                      background: 'linear-gradient(to top, rgba(239, 68, 68, 1), rgba(220, 38, 38, 0.8))',
                      borderRadius: '1px',
                      transformOrigin: '1px 160px',
                      left: 'calc(50% - 1px)',
                      top: 'calc(50% - 160px)',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)'
                    }}
                    animate={{
                      rotate: stage === 'accelerate'
                        ? [0, 3600, 10800]
                        : stage === 'dissolve'
                        ? [10800, 21600]
                        : [0, 3600]
                    }}
                    transition={{
                      duration: stage === 'accelerate' ? 2 : stage === 'dissolve' ? 2.5 : 3,
                      ease: stage === 'accelerate' ? 'easeIn' : stage === 'dissolve' ? 'easeOut' : 'linear',
                      repeat: stage !== 'accelerate' && stage !== 'dissolve' ? Infinity : 0
                    }}
                  />
                </div>
              </div>

              {/* Temporal ribbons during dissolve */}
              {stage === 'dissolve' && (
                <>
                  {[0, 120, 240].map((angleOffset, idx) => (
                    <motion.div
                      key={`ribbon-${idx}`}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        width: '400px',
                        height: '8px',
                        marginLeft: '-200px',
                        marginTop: '-4px',
                        background: `linear-gradient(to right, transparent, rgba(56, 189, 248, ${0.9 - idx * 0.2}) 50%, transparent)`,
                        transformOrigin: 'center center',
                        filter: 'blur(2px)'
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: [0, 2, 3],
                        opacity: [0, 1, 0],
                        rotate: [angleOffset, angleOffset + 360]
                      }}
                      transition={{
                        duration: 2.5,
                        ease: 'easeOut',
                        delay: idx * 0.15
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spiraling time particles */}
        <AnimatePresence>
          {(stage === 'dissolve' || stage === 'shards') && particles.map((particle) => (
            <motion.div
              key={`particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: 'radial-gradient(circle, rgba(56, 189, 248, 1) 0%, rgba(14, 165, 233, 0.8) 100%)',
                boxShadow: '0 0 10px rgba(56, 189, 248, 1)'
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos(particle.angle) * particle.radius * particle.speed,
                y: Math.sin(particle.angle) * particle.radius * particle.speed,
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 3,
                delay: particle.delay,
                ease: 'easeOut'
              }}
            />
          ))}
        </AnimatePresence>

        {/* Crystalline time shards */}
        <AnimatePresence>
          {(stage === 'shards' || stage === 'constellation' || stage === 'radiance') && shards.map((shard) => (
            <motion.div
              key={`shard-${shard.id}`}
              className="absolute z-35"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{
                x: shard.x,
                y: shard.y,
                scale: shard.size,
                opacity: [0, 1, 0.9, 1],
                rotate: [shard.rotation, shard.rotation + 180]
              }}
              transition={{
                delay: shard.delay,
                duration: stage === 'constellation' ? 1.5 : 1.2,
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              {/* Shard glow */}
              <motion.div
                className="absolute inset-0 -m-8"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: shard.delay
                }}
              >
                <div
                  className="w-20 h-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.9) 0%, rgba(56, 189, 248, 0.4) 50%, transparent 80%)',
                    filter: 'blur(15px)'
                  }}
                />
              </motion.div>

              {/* Crystalline shape */}
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <polygon
                    points="20,2 35,15 30,35 10,35 5,15"
                    fill="rgba(56, 189, 248, 0.6)"
                    stroke="rgba(147, 197, 253, 1)"
                    strokeWidth="2"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 1))'
                    }}
                  />
                  <polygon
                    points="20,2 20,35"
                    fill="none"
                    stroke="rgba(147, 197, 253, 0.8)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="5,15 35,15"
                    fill="none"
                    stroke="rgba(147, 197, 253, 0.8)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </motion.div>
          ))}

          {/* Constellation connecting lines */}
          {stage === 'constellation' && shards.length > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 34 }}>
              <defs>
                <linearGradient id="time-line-gradient">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.7)" />
                  <stop offset="100%" stopColor="rgba(56, 189, 248, 0.3)" />
                </linearGradient>
              </defs>

              {shards.slice(0, -1).map((shard, i) => {
                const nextShard = shards[i + 1];
                const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
                const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;

                return (
                  <motion.line
                    key={`shard-line-${i}`}
                    x1={centerX + shard.x}
                    y1={centerY + shard.y}
                    x2={centerX + nextShard.x}
                    y2={centerY + nextShard.y}
                    stroke="url(#time-line-gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.04 }}
                  />
                );
              })}
            </svg>
          )}

          {/* Central hourglass symbol */}
          {stage === 'constellation' && (
            <motion.div
              className="absolute z-36 text-8xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1.1,
                opacity: 0.95,
                y: -120
              }}
              transition={{
                delay: 1.2,
                duration: 1.5,
                type: 'spring',
                stiffness: 150,
                damping: 10
              }}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(56, 189, 248, 1))'
              }}
            >
              ⏳
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRANSCENDENT radiance burst */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 48 cyan radial rays */}
              {[...Array(48)].map((_, i) => {
                const angle = (i / 48) * 360;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: '8px',
                      marginLeft: '-100vw',
                      marginTop: '-4px',
                      background: `linear-gradient(to right, transparent, rgba(56, 189, 248, ${i % 2 === 0 ? 1 : 0.85}) 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(2px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1.8, 1.6],
                      opacity: [0, 1, 0.85, 1, 0.85]
                    }}
                    transition={{
                      scaleX: { duration: 2, ease: 'easeOut' },
                      opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Secondary white rays */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * 360 + 7.5;

                return (
                  <motion.div
                    key={`white-ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: '5px',
                      marginLeft: '-100vw',
                      marginTop: '-2.5px',
                      background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9) 50%, transparent)',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(3px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1.6, 1.4],
                      opacity: [0, 0.8, 0.6, 0.8]
                    }}
                    transition={{
                      scaleX: { duration: 2.2, ease: 'easeOut' },
                      opacity: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Central cyan supernova */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 4.5, 4],
                  opacity: [0, 1, 0.9]
                }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
              >
                <div
                  className="w-[32rem] h-[32rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(224, 242, 254, 0.95) 8%, rgba(56, 189, 248, 0.9) 20%, rgba(14, 165, 233, 0.7) 40%, rgba(56, 189, 248, 0.5) 60%, rgba(8, 145, 178, 0.3) 75%, transparent 88%)',
                    boxShadow: '0 0 250px rgba(56, 189, 248, 1), 0 0 400px rgba(255, 255, 255, 0.6)',
                    filter: 'blur(70px)'
                  }}
                />
              </motion.div>

              {/* Orbiting time particles */}
              {(() => {
                const allParticles = [];
                for (let ring = 0; ring < 3; ring++) {
                  const radius = 120 + ring * 65;
                  const particleCount = 32 + ring * 12;

                  for (let i = 0; i < particleCount; i++) {
                    const angle = (i / particleCount) * 360;
                    const uniqueKey = `orbit-${ring}-${i}`;

                    allParticles.push(
                      <motion.div
                        key={uniqueKey}
                        className="absolute rounded-full"
                        style={{
                          width: `${6 - ring}px`,
                          height: `${6 - ring}px`,
                          background: 'radial-gradient(circle, rgba(56, 189, 248, 1) 0%, rgba(14, 165, 233, 0.8) 100%)',
                          boxShadow: '0 0 15px rgba(56, 189, 248, 1)',
                          filter: 'blur(0.5px)'
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
                          opacity: [0, 1, 0.9, 1, 0.9]
                        }}
                        transition={{
                          delay: 0.5 + (ring * 50 + i) * 0.012,
                          duration: 6 + ring * 2,
                          repeat: Infinity,
                          ease: 'linear',
                          opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      />
                    );
                  }
                }
                return allParticles;
              })()}

              {/* Expanding particle burst */}
              {[...Array(120)].map((_, i) => {
                const angle = (i / 120) * Math.PI * 2;
                const distance = 80 + Math.random() * 230;
                const x = Math.cos(angle) * distance;
                const startY = Math.sin(angle) * distance - 100;

                return (
                  <motion.div
                    key={`burst-particle-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: -100, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: [startY, startY + 260],
                      scale: [0, 1.6, 1],
                      opacity: [0, 1, 0.8, 1, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      delay: i * 0.015,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(56, 189, 248, 1) 100%)',
                        boxShadow: '0 0 12px rgba(56, 189, 248, 1)',
                        filter: 'blur(1px)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Crystalline shard burst */}
              {[...Array(60)].map((_, i) => {
                const angle = (i / 60) * Math.PI * 2;
                const distance = 150 + Math.random() * 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`radiance-shard-${i}`}
                    className="absolute text-4xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.8, 1.4],
                      opacity: [0, 1, 0.85, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2.8,
                      delay: 0.4 + i * 0.022,
                      opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    💎
                  </motion.div>
                );
              })}

              {/* Hourglass emoji burst */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const distance = 190 + Math.random() * 90;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`hourglass-${i}`}
                    className="absolute text-5xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.5, 1.2],
                      opacity: [0, 1, 0.9],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.6 + i * 0.045,
                      ease: 'easeOut'
                    }}
                  >
                    ⏳
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-200 drop-shadow-2xl mb-3">
              Time Flows Through Your Memory ⏳💎✨
            </h2>
            <p className="text-2xl text-blue-200 drop-shadow-lg font-mono">
              Every moment crystallized in eternity
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}