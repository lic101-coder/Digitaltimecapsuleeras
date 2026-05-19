/**
 * Launchpad - Storm's Fury Ceremony (Premium)
 * 
 * CONCEPT: Storm builds → REALISTIC diagonal lightning → energy converges into sphere → SPHERE EXPLODES!
 * 
 * Stages:
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LaunchpadPremiumCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function LaunchpadPremiumCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: LaunchpadPremiumCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'gathering' | 'lightning' | 'sphere' | 'explosion' | 'radiance' | 'outro'>('intro');
  const [lightningFlashes, setLightningFlashes] = useState<number[]>([]);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1000, action: () => setStage('gathering') },
      { time: 4000, action: () => setStage('lightning') },
      { time: 7000, action: () => setStage('sphere') },
      { time: 9000, action: () => setStage('explosion') },
      { time: 11000, action: () => setStage('radiance') },
      { time: 13500, action: () => setStage('outro') },
      { time: 14000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Random lightning flashes during lightning stage
  useEffect(() => {
    if (stage === 'lightning' || stage === 'sphere') {
      const flashIntervals = [0, 180, 420, 680, 950, 1180, 1420, 1680, 1940, 2180, 2420];
      const timeouts = flashIntervals.map((delay, index) => 
        setTimeout(() => {
          setLightningFlashes(prev => [...prev, index]);
          setTimeout(() => {
            setLightningFlashes(prev => prev.filter(i => i !== index));
          }, 120);
        }, delay)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#141428] to-[#1a1a35]">
      {/* Background - stormy sky */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? [
                'radial-gradient(ellipse at 50% 50%, #2a2a50 0%, #1a1a35 50%, #0a0a1a 90%)',
                'radial-gradient(ellipse at 50% 50%, #3a3a70 0%, #1a1a35 50%, #0a0a1a 90%)'
              ]
            : stage === 'explosion'
            ? 'radial-gradient(ellipse at 50% 50%, #6a6ab0 0%, #3a3a70 30%, #1a1a35 60%, #0a0a1a 95%)'
            : stage === 'sphere' || stage === 'lightning'
            ? 'radial-gradient(ellipse at 50% 45%, #1a1a35 0%, #0f0f20 70%, #0a0a1a 95%)'
            : stage === 'gathering'
            ? 'radial-gradient(ellipse at 50% 40%, #141428 0%, #0f0f20 70%, #0a0a1a 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #141428 0%, #0a0a1a 80%)'
        }}
        transition={{ 
          duration: stage === 'radiance' ? 0.7 : stage === 'explosion' ? 0.3 : 2,
          repeat: stage === 'radiance' ? Infinity : 0
        }}
      />

      {/* Lightning flash effect on whole screen */}
      <AnimatePresence>
        {lightningFlashes.length > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(200, 220, 255, 0.4) 0%, transparent 60%)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-blue-100 drop-shadow-2xl">
              Storm's Fury
            </h1>
            <p className="text-blue-200/80 mt-3 text-base">Unleash your power</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        
        {/* STORM CLOUDS - MUCH MORE VISIBLE */}
        <AnimatePresence>
          {(stage === 'gathering' || stage === 'lightning' || stage === 'sphere') && (
            <>
              {/* Top layer - CLEARLY VISIBLE dark clouds */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`cloud-dark-${i}`}
                  className="absolute"
                  style={{
                    left: `${-25 + i * 11}%`,
                    top: `${8 + (i % 4) * 9}%`,
                    width: `${280 + Math.random() * 200}px`,
                    height: `${110 + Math.random() * 80}px`,
                    background: `radial-gradient(ellipse, rgba(35, 35, 60, 1) 0%, rgba(28, 28, 50, 0.96) 35%, rgba(22, 22, 42, 0.85) 60%, rgba(18, 18, 35, 0.65) 80%, transparent 95%)`,
                    borderRadius: '50%',
                    border: '2px solid rgba(50, 50, 80, 0.5)',
                    filter: 'blur(12px)',
                    boxShadow: 'inset 0 -25px 50px rgba(8, 8, 15, 0.8), 0 10px 30px rgba(0, 0, 0, 0.6)'
                  }}
                  initial={{ opacity: 0, x: -100, scale: 0.1 }}
                  animate={{
                    opacity: stage === 'sphere' ? [1, 0.85] : [0, 1],
                    x: [Math.random() * 60 - 30, Math.random() * 60 - 30],
                    scale: [0.1, 1.4, 1.2],
                    y: [0, 15, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: stage === 'sphere' ? 0.8 : 4, ease: 'easeInOut' },
                    x: { duration: 14 + i * 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    scale: { duration: 4 },
                    y: { duration: 10 + i, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  }}
                />
              ))}
              
              {/* Bottom layer - LIGHTER, HIGHLY VISIBLE clouds */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`cloud-light-${i}`}
                  className="absolute"
                  style={{
                    left: `${2 + i * 12}%`,
                    top: `${28 + (i % 3) * 14}%`,
                    width: `${240 + Math.random() * 160}px`,
                    height: `${95 + Math.random() * 70}px`,
                    background: `radial-gradient(ellipse, rgba(65, 65, 105, 1) 0%, rgba(55, 55, 95, 0.95) 40%, rgba(45, 45, 80, 0.85) 65%, rgba(35, 35, 65, 0.6) 85%, transparent 98%)`,
                    borderRadius: '50%',
                    border: '2px solid rgba(75, 75, 115, 0.4)',
                    filter: 'blur(10px)',
                    boxShadow: 'inset 0 -20px 40px rgba(25, 25, 45, 0.7), 0 8px 25px rgba(0, 0, 0, 0.5)',
                    zIndex: 5
                  }}
                  initial={{ opacity: 0, x: 80, scale: 0.2 }}
                  animate={{
                    opacity: stage === 'sphere' ? [1, 0.8] : [0, 1],
                    x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                    scale: [0.2, 1.3, 1.15],
                    y: [0, 12, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: stage === 'sphere' ? 0.8 : 4, ease: 'easeInOut' },
                    x: { duration: 12 + i * 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    scale: { duration: 4 },
                    y: { duration: 9 + i, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  }}
                />
              ))}

              {/* Foreground mist/haze for depth */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`mist-${i}`}
                  className="absolute"
                  style={{
                    left: `${-10 + i * 22}%`,
                    top: `${55 + (i % 2) * 15}%`,
                    width: `${320 + Math.random() * 200}px`,
                    height: `${130 + Math.random() * 90}px`,
                    background: `radial-gradient(ellipse, rgba(75, 75, 115, 0.85) 0%, rgba(60, 60, 100, 0.7) 50%, rgba(45, 45, 80, 0.45) 75%, transparent 95%)`,
                    borderRadius: '50%',
                    filter: 'blur(14px)',
                    boxShadow: 'inset 0 -15px 35px rgba(30, 30, 50, 0.6)',
                    zIndex: 8
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: stage === 'sphere' ? [0.9, 0.7] : [0, 0.9],
                    x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
                    scale: [0.3, 1.25, 1.1],
                    y: [0, 8, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: stage === 'sphere' ? 0.8 : 4, ease: 'easeInOut' },
                    x: { duration: 15 + i * 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                    scale: { duration: 4 },
                    y: { duration: 11 + i, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* REALISTIC DIAGONAL LIGHTNING STRIKES - THICK, OMINOUS, STRIKING THE NUCLEUS */}
        <AnimatePresence>
          {(stage === 'lightning' || stage === 'sphere') && (
            <>
              {[
                { startX: 12, startY: 8, endX: 50, endY: 50, delay: 0 },
                { startX: 88, startY: 12, endX: 50, endY: 50, delay: 0.18 },
                { startX: 28, startY: 3, endX: 48, endY: 52, delay: 0.42 },
                { startX: 72, startY: 6, endX: 52, endY: 48, delay: 0.68 },
                { startX: 18, startY: 18, endX: 49, endY: 51, delay: 0.95 },
                { startX: 82, startY: 15, endX: 51, endY: 49, delay: 1.18 },
                { startX: 50, startY: 0, endX: 50, endY: 50, delay: 1.42 },
                { startX: 8, startY: 22, endX: 50, endY: 50, delay: 1.68 },
                { startX: 92, startY: 20, endX: 50, endY: 50, delay: 1.94 },
                { startX: 38, startY: 10, endX: 50, endY: 50, delay: 2.18 },
                { startX: 62, startY: 9, endX: 50, endY: 50, delay: 2.42 }
              ].map((bolt, i) => {
                const deltaX = bolt.endX - bolt.startX;
                const deltaY = bolt.endY - bolt.startY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                
                // Generate jagged realistic lightning path
                const segments = 8;
                const pathPoints = [];
                for (let j = 0; j <= segments; j++) {
                  const progress = j / segments;
                  const baseX = progress * distance * 12;
                  const baseY = 0;
                  const jitter = j === 0 || j === segments ? 0 : (Math.random() - 0.5) * 35;
                  pathPoints.push({ x: baseX, y: baseY + jitter });
                }
                
                const pathD = pathPoints.map((p, idx) => 
                  `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                ).join(' ');
                
                return (
                  <motion.div
                    key={`lightning-bolt-${i}`}
                    className="absolute z-30"
                    style={{
                      left: `${bolt.startX}%`,
                      top: `${bolt.startY}%`,
                      pointerEvents: 'none'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: lightningFlashes.includes(i) 
                        ? [0, 1, 0.9, 1, 0.7, 0] 
                        : 0
                    }}
                    transition={{
                      duration: 0.18,
                      ease: 'easeInOut'
                    }}
                  >
                    <svg
                      width={distance * 12 + 100}
                      height={distance * 12 + 100}
                      style={{
                        position: 'absolute',
                        left: '-50px',
                        top: '-50px',
                        overflow: 'visible',
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '50px 50px'
                      }}
                    >
                      {/* Massive outer glow - THICK AND OMINOUS */}
                      <path
                        d={pathD}
                        stroke="rgba(100, 150, 255, 0.5)"
                        strokeWidth="32"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="blur(16px)"
                        transform="translate(50, 50)"
                      />
                      
                      {/* Mid glow */}
                      <path
                        d={pathD}
                        stroke="rgba(136, 180, 255, 0.8)"
                        strokeWidth="18"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="blur(8px)"
                        transform="translate(50, 50)"
                      />
                      
                      {/* Electric blue layer */}
                      <path
                        d={pathD}
                        stroke="rgba(170, 210, 255, 0.95)"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="blur(3px)"
                        transform="translate(50, 50)"
                      />
                      
                      {/* Bright white core - INTENSE */}
                      <path
                        d={pathD}
                        stroke="#ffffff"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(50, 50)"
                      />

                      {/* Branch bolts - MORE REALISTIC */}
                      {[
                        { atSegment: 2, angle: -55, length: distance * 2.8 },
                        { atSegment: 4, angle: 42, length: distance * 3.2 },
                        { atSegment: 6, angle: -38, length: distance * 2.4 }
                      ].map((branch, bi) => {
                        const branchStart = pathPoints[branch.atSegment];
                        const branchSegs = 4;
                        const branchPoints = [];
                        for (let k = 0; k <= branchSegs; k++) {
                          const prog = k / branchSegs;
                          const bx = branchStart.x + prog * branch.length * Math.cos(branch.angle * Math.PI / 180);
                          const by = branchStart.y + prog * branch.length * Math.sin(branch.angle * Math.PI / 180);
                          const bjitter = k === 0 || k === branchSegs ? 0 : (Math.random() - 0.5) * 20;
                          branchPoints.push({ x: bx, y: by + bjitter });
                        }
                        
                        const branchPathD = branchPoints.map((p, idx) => 
                          `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                        ).join(' ');
                        
                        return (
                          <g key={`branch-${bi}`}>
                            <path
                              d={branchPathD}
                              stroke="rgba(136, 180, 255, 0.7)"
                              strokeWidth="12"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="blur(6px)"
                              transform="translate(50, 50)"
                            />
                            <path
                              d={branchPathD}
                              stroke="rgba(200, 220, 255, 0.9)"
                              strokeWidth="6"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="blur(2px)"
                              transform="translate(50, 50)"
                            />
                            <path
                              d={branchPathD}
                              stroke="#ffffff"
                              strokeWidth="2.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              transform="translate(50, 50)"
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Impact flash where bolt STRIKES the nucleus */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: `${deltaX * 10}px`,
                        top: `${deltaY * 10}px`,
                        width: '60px',
                        height: '60px',
                        marginLeft: '-30px',
                        marginTop: '-30px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(170, 210, 255, 0.9) 30%, rgba(100, 150, 255, 0.6) 60%, transparent 100%)',
                        boxShadow: '0 0 80px rgba(255, 255, 255, 1), 0 0 140px rgba(136, 204, 255, 1)',
                        filter: 'blur(4px)'
                      }}
                      animate={{
                        scale: [0.3, 2.2, 1.5, 0],
                        opacity: [1, 1, 0.8, 0]
                      }}
                      transition={{
                        duration: 0.18,
                        ease: 'easeOut'
                      }}
                    />

                    {/* Expanding shockwave from strike point */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: `${deltaX * 10}px`,
                        top: `${deltaY * 10}px`,
                        width: '40px',
                        height: '40px',
                        marginLeft: '-20px',
                        marginTop: '-20px',
                        borderRadius: '50%',
                        border: '3px solid rgba(170, 210, 255, 1)',
                        boxShadow: '0 0 30px rgba(136, 204, 255, 1)'
                      }}
                      animate={{
                        scale: [0, 4.5],
                        opacity: [1, 0.7, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* CLEAN ENERGY SPHERE - Glowing orb where lightning converges */}
        <AnimatePresence>
          {(stage === 'sphere' || stage === 'explosion') && (
            <motion.div
              className="absolute left-1/2 top-1/2 z-35"
              style={{
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: stage === 'explosion' 
                  ? [1, 0.6, 0.4, 8]  // COLLAPSE then EXPLODE
                  : [0, 0.4, 0.7, 1, 1.15, 1],
                opacity: stage === 'explosion' ? [1, 1, 1, 0] : [0, 0.6, 0.85, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{
                scale: {
                  duration: stage === 'explosion' ? 0.9 : 2,
                  ease: stage === 'explosion' ? [0.6, 0.0, 0.2, 1] : [0.4, 0.0, 0.2, 1],
                  times: stage === 'explosion' ? [0, 0.15, 0.3, 1] : undefined
                },
                opacity: {
                  duration: stage === 'explosion' ? 0.9 : 2
                }
              }}
            >
              {/* LIGHTNING STRIKING THE SPHERE - Visible connections */}
              {stage === 'sphere' && (
                <>
                  {[...Array(10)].map((_, i) => {
                    const angle = (i / 10) * 360;
                    const impactDistance = 95; // Distance from center to sphere edge
                    
                    return (
                      <motion.div
                        key={`strike-connection-${i}`}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          width: '300px',
                          height: '300px',
                          marginLeft: '-150px',
                          marginTop: '-150px',
                          pointerEvents: 'none'
                        }}
                        animate={{
                          opacity: lightningFlashes.includes(i) ? [0, 1, 0.7, 0] : 0
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeOut'
                        }}
                      >
                        {/* Energy beam from edge toward center */}
                        <svg width="300" height="300" style={{ overflow: 'visible' }}>
                          {/* Outer glow beam */}
                          <line
                            x1={150 + Math.cos(angle * Math.PI / 180) * 150}
                            y1={150 + Math.sin(angle * Math.PI / 180) * 150}
                            x2={150 + Math.cos(angle * Math.PI / 180) * impactDistance}
                            y2={150 + Math.sin(angle * Math.PI / 180) * impactDistance}
                            stroke="rgba(136, 204, 255, 0.8)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            filter="blur(6px)"
                          />
                          {/* Mid beam */}
                          <line
                            x1={150 + Math.cos(angle * Math.PI / 180) * 150}
                            y1={150 + Math.sin(angle * Math.PI / 180) * 150}
                            x2={150 + Math.cos(angle * Math.PI / 180) * impactDistance}
                            y2={150 + Math.sin(angle * Math.PI / 180) * impactDistance}
                            stroke="rgba(200, 230, 255, 0.95)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            filter="blur(2px)"
                          />
                          {/* Bright core beam */}
                          <line
                            x1={150 + Math.cos(angle * Math.PI / 180) * 150}
                            y1={150 + Math.sin(angle * Math.PI / 180) * 150}
                            x2={150 + Math.cos(angle * Math.PI / 180) * impactDistance}
                            y2={150 + Math.sin(angle * Math.PI / 180) * impactDistance}
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Impact flash at sphere surface */}
                        <motion.div
                          style={{
                            position: 'absolute',
                            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * impactDistance}px)`,
                            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * impactDistance}px)`,
                            width: '28px',
                            height: '28px',
                            marginLeft: '-14px',
                            marginTop: '-14px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(200, 230, 255, 0.9) 50%, transparent 100%)',
                            boxShadow: '0 0 35px rgba(255, 255, 255, 1), 0 0 60px rgba(136, 204, 255, 1)'
                          }}
                          animate={{
                            scale: [0.5, 1.8, 1.2, 0.8],
                            opacity: [1, 1, 0.8, 0]
                          }}
                          transition={{
                            duration: 0.25,
                            ease: 'easeOut'
                          }}
                        />
                        
                        {/* Energy ripple at impact point */}
                        <motion.div
                          style={{
                            position: 'absolute',
                            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * impactDistance}px)`,
                            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * impactDistance}px)`,
                            width: '20px',
                            height: '20px',
                            marginLeft: '-10px',
                            marginTop: '-10px',
                            borderRadius: '50%',
                            border: '2px solid rgba(136, 204, 255, 1)',
                            boxShadow: '0 0 20px rgba(136, 204, 255, 1)'
                          }}
                          animate={{
                            scale: [0, 3],
                            opacity: [1, 0]
                          }}
                          transition={{
                            duration: 0.4,
                            ease: 'easeOut'
                          }}
                        />
                      </motion.div>
                    );
                  })}

                  {/* Energy particles being absorbed into sphere */}
                  {[...Array(40)].map((_, i) => {
                    const startAngle = Math.random() * 360;
                    const startDistance = 180 + Math.random() * 80;
                    const startX = Math.cos(startAngle * Math.PI / 180) * startDistance;
                    const startY = Math.sin(startAngle * Math.PI / 180) * startDistance;
                    
                    return (
                      <motion.div
                        key={`absorb-particle-${i}`}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          width: '6px',
                          height: '6px',
                          marginLeft: '-3px',
                          marginTop: '-3px',
                          borderRadius: '50%',
                          background: i % 2 === 0 ? '#ffffff' : '#aaddff',
                          boxShadow: `0 0 12px ${i % 2 === 0 ? '#ffffff' : '#aaddff'}`,
                          filter: 'blur(0.5px)'
                        }}
                        animate={{
                          x: [startX, startX * 0.6, 0],
                          y: [startY, startY * 0.6, 0],
                          scale: [0, 1.2, 1.5, 0.8],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 1.2 + Math.random() * 0.6,
                          delay: i * 0.04,
                          repeat: Infinity,
                          ease: [0.4, 0.0, 0.2, 1]
                        }}
                      />
                    );
                  })}
                </>
              )}

              {/* Outer glow ring */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '240px',
                  height: '240px',
                  marginLeft: '-120px',
                  marginTop: '-120px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, transparent 35%, rgba(136, 204, 255, 0.3) 45%, rgba(136, 204, 255, 0.6) 48%, rgba(136, 204, 255, 0.3) 52%, transparent 60%)',
                  boxShadow: '0 0 80px rgba(136, 204, 255, 0.8)'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: stage === 'sphere' ? [1, 1.05, 1] : 1
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: stage === 'sphere' ? Infinity : 0, ease: 'easeInOut' }
                }}
              />

              {/* Main sphere body */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '180px',
                  height: '180px',
                  marginLeft: '-90px',
                  marginTop: '-90px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(200, 230, 255, 0.95) 0%, rgba(170, 221, 255, 0.85) 30%, rgba(136, 204, 255, 0.7) 60%, rgba(100, 180, 240, 0.4) 85%, transparent 100%)',
                  boxShadow: '0 0 100px rgba(136, 204, 255, 1), inset 0 0 80px rgba(200, 230, 255, 0.6)',
                  filter: 'blur(8px)'
                }}
                animate={{
                  scale: stage === 'sphere' ? [1, 1.12, 1] : 1,
                  opacity: stage === 'sphere' ? [0.9, 1, 0.9] : 0.95
                }}
                transition={{
                  duration: 0.9,
                  repeat: stage === 'sphere' ? Infinity : 0,
                  ease: 'easeInOut'
                }}
              />

              {/* Bright white core */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '100px',
                  height: '100px',
                  marginLeft: '-50px',
                  marginTop: '-50px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 250, 255, 1) 40%, rgba(200, 230, 255, 0.9) 70%, transparent 100%)',
                  boxShadow: '0 0 120px rgba(255, 255, 255, 1), 0 0 180px rgba(136, 204, 255, 1)'
                }}
                animate={{
                  scale: stage === 'sphere' ? [1, 1.25, 1] : 1
                }}
                transition={{
                  duration: 0.7,
                  repeat: stage === 'sphere' ? Infinity : 0,
                  ease: 'easeInOut'
                }}
              />

              {/* Electric sparkles around sphere */}
              {stage === 'sphere' && (
                <>
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * 360;
                    
                    return (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          width: '8px',
                          height: '8px',
                          marginLeft: '-4px',
                          marginTop: '-4px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          boxShadow: '0 0 20px rgba(136, 204, 255, 1)',
                          filter: 'blur(1px)'
                        }}
                        animate={{
                          x: [
                            Math.cos(angle * Math.PI / 180) * 95,
                            Math.cos(angle * Math.PI / 180) * 105,
                            Math.cos(angle * Math.PI / 180) * 95
                          ],
                          y: [
                            Math.sin(angle * Math.PI / 180) * 95,
                            Math.sin(angle * Math.PI / 180) * 105,
                            Math.sin(angle * Math.PI / 180) * 95
                          ],
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: 'easeInOut'
                        }}
                      />
                    );
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* REALISTIC EXPLOSION */}
        <AnimatePresence>
          {stage === 'explosion' && (
            <>
              {/* Initial white flash */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-34"
                style={{
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0.4, opacity: 1 }}
                animate={{
                  scale: [0.4, 2, 15],
                  opacity: [1, 1, 0.7, 0]
                }}
                transition={{ duration: 0.8, ease: 'easeOut', times: [0, 0.12, 0.5, 1] }}
              >
                <div
                  style={{
                    width: '300px',
                    height: '300px',
                    marginLeft: '-150px',
                    marginTop: '-150px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(240, 250, 255, 1) 25%, rgba(200, 230, 255, 0.95) 50%, rgba(136, 204, 255, 0.85) 75%, transparent 100%)',
                    boxShadow: '0 0 250px rgba(255, 255, 255, 1), 0 0 400px rgba(136, 204, 255, 0.95)',
                    filter: 'blur(35px)'
                  }}
                />
              </motion.div>

              {/* Expanding shockwave rings */}
              {[0, 0.1, 0.2, 0.3, 0.4].map((delayMult, i) => (
                <motion.div
                  key={`shockwave-${i}`}
                  className="absolute left-1/2 top-1/2 z-33"
                  style={{
                    width: '150px',
                    height: '150px',
                    marginLeft: '-75px',
                    marginTop: '-75px',
                    borderRadius: '50%',
                    border: `${10 - i * 1.8}px solid rgba(136, 204, 255, ${0.95 - i * 0.15})`,
                    boxShadow: `0 0 ${80 - i * 12}px rgba(136, 204, 255, ${0.95 - i * 0.15})`
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 20],
                    opacity: [1, 0.75, 0.5, 0]
                  }}
                  transition={{
                    duration: 1.4,
                    delay: delayMult,
                    ease: [0.2, 0.0, 0.2, 1]
                  }}
                />
              ))}

              {/* Energy blast particles - radial burst */}
              {[...Array(70)].map((_, i) => {
                const angle = (i / 70) * Math.PI * 2;
                const distance = 110 + Math.random() * 180;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                return (
                  <motion.div
                    key={`blast-particle-${i}`}
                    className="absolute left-1/2 top-1/2 z-32"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      opacity: [0, 1, 0.9, 0.6, 0],
                      scale: [0, 2.8, 2.2, 1.5, 0],
                      rotate: [0, Math.random() * 360]
                    }}
                    transition={{
                      duration: 1.3,
                      delay: i * 0.008,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      style={{
                        width: '14px',
                        height: '14px',
                        marginLeft: '-7px',
                        marginTop: '-7px',
                        borderRadius: '50%',
                        background: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#c8e6ff' : '#88ccff',
                        boxShadow: `0 0 ${i % 3 === 0 ? 25 : 18}px ${i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#c8e6ff' : '#88ccff'}`,
                        filter: 'blur(1px)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Lightning bolt fragments exploding outward */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * 360;
                const length = 140 + Math.random() * 80;
                
                return (
                  <motion.div
                    key={`lightning-fragment-${i}`}
                    className="absolute left-1/2 top-1/2 z-31"
                    style={{
                      transformOrigin: 'center center'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.85, 0] }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.02,
                      ease: 'easeOut'
                    }}
                  >
                    <svg width="500" height="500" style={{ position: 'absolute', left: '-250px', top: '-250px' }}>
                      {/* Glowing fragment */}
                      <motion.path
                        d={`M 250 250 
                            L ${250 + Math.cos(angle * Math.PI / 180) * (length * 0.5)} ${250 + Math.sin(angle * Math.PI / 180) * (length * 0.5)}
                            L ${250 + Math.cos((angle + 8) * Math.PI / 180) * (length * 0.8)} ${250 + Math.sin((angle + 8) * Math.PI / 180) * (length * 0.8)}
                            L ${250 + Math.cos((angle - 5) * Math.PI / 180) * length} ${250 + Math.sin((angle - 5) * Math.PI / 180) * length}`}
                        stroke="rgba(136, 204, 255, 0.9)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        filter="blur(4px)"
                        animate={{ pathLength: [0, 1] }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.path
                        d={`M 250 250 
                            L ${250 + Math.cos(angle * Math.PI / 180) * (length * 0.5)} ${250 + Math.sin(angle * Math.PI / 180) * (length * 0.5)}
                            L ${250 + Math.cos((angle + 8) * Math.PI / 180) * (length * 0.8)} ${250 + Math.sin((angle + 8) * Math.PI / 180) * (length * 0.8)}
                            L ${250 + Math.cos((angle - 5) * Math.PI / 180) * length} ${250 + Math.sin((angle - 5) * Math.PI / 180) * length}`}
                        stroke="#ffffff"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        animate={{ pathLength: [0, 1] }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                );
              })}

              {/* Expanding electric haze */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-30"
                style={{
                  width: '200px',
                  height: '200px',
                  marginLeft: '-100px',
                  marginTop: '-100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(136, 204, 255, 0.6) 0%, rgba(136, 204, 255, 0.3) 50%, transparent 80%)',
                  filter: 'blur(50px)'
                }}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{
                  scale: [0, 12],
                  opacity: [0.8, 0.5, 0]
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* RADIANCE */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {/* Rays */}
            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const colors = ['rgba(136, 204, 255, 1)', 'rgba(170, 221, 255, 1)', 'rgba(200, 230, 255, 1)', 'rgba(255, 255, 255, 1)'];

              return (
                <motion.div
                  key={`ray-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '200vw',
                    height: i % 3 === 0 ? '11px' : i % 3 === 1 ? '8px' : '9px',
                    marginLeft: '-100vw',
                    marginTop: i % 3 === 0 ? '-5.5px' : i % 3 === 1 ? '-4px' : '-4.5px',
                    background: `linear-gradient(to right, transparent, ${colors[i % 4].replace('1)', '0.94)')} 50%, transparent)`,
                    transformOrigin: 'center center',
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(2px)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: [0, 2.7, 2.5],
                    opacity: [0, 1, 0.96]
                  }}
                  transition={{
                    duration: 1.4,
                    ease: 'easeOut'
                  }}
                />
              );
            })}

            {/* Central glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 7.2, 7],
                opacity: [0, 1, 0.97],
                rotate: [0, 180]
              }}
              transition={{ duration: 1.7, ease: 'easeOut' }}
            >
              <div
                className="w-[46rem] h-[46rem] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(235, 245, 255, 0.98) 6%, rgba(200, 230, 255, 0.96) 14%, rgba(170, 221, 255, 0.92) 24%, rgba(136, 204, 255, 0.88) 36%, rgba(100, 180, 240, 0.82) 50%, rgba(70, 150, 220, 0.72) 66%, rgba(50, 120, 200, 0.58) 82%, transparent 98%)',
                  boxShadow: '0 0 480px rgba(136, 204, 255, 1), 0 0 680px rgba(170, 221, 255, 0.85)',
                  filter: 'blur(115px)'
                }}
              />
            </motion.div>

            {/* Orbiting particles */}
            {(() => {
              const particles = [];
              for (let ring = 0; ring < 3; ring++) {
                const radius = 190 + ring * 115;
                const count = 42 + ring * 20;
                
                for (let i = 0; i < count; i++) {
                  const angle = (i / count) * 360;
                  const colors = ['#88ccff', '#aaddff', '#c8e6ff', '#ffffff'];
                  
                  particles.push(
                    <motion.div
                      key={`orbit-${ring}-${i}`}
                      className="absolute"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: colors[i % 4],
                        boxShadow: `0 0 15px ${colors[i % 4]}`,
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
                        rotate: [0, 360]
                      }}
                      transition={{
                        delay: 0.45 + (ring * 62 + i) * 0.003,
                        duration: 6.8 + ring * 1.9,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  );
                }
              }
              return particles;
            })()}

            {/* Burst particles */}
            {[...Array(85)].map((_, i) => {
              const angle = (i / 85) * Math.PI * 2;
              const distance = 145 + Math.random() * 310;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const colors = ['#88ccff', '#aaddff', '#c8e6ff'];

              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: x,
                    y: [y, y + 145],
                    scale: [0, 2.1, 1.8],
                    opacity: [0, 1, 0.9, 0],
                    rotate: [0, Math.random() * 720]
                  }}
                  transition={{
                    duration: 2.7,
                    delay: i * 0.005,
                    ease: 'easeOut'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '8px',
                      borderRadius: '50%',
                      background: colors[i % 3],
                      boxShadow: `0 0 12px ${colors[i % 3]}`,
                      filter: 'brightness(1.3)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Success message */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 left-0 right-0 text-center z-40"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-100 drop-shadow-2xl mb-3">
              Unstoppable Force
            </h2>
            <p className="text-2xl text-blue-200 drop-shadow-lg">{capsuleTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}