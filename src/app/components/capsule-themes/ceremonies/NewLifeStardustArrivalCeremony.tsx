/**
 * New Life - Planetary Alignment Ceremony 🪐✨
 * 
 * Epic cosmic event where planets align to create a portal,
 * from which a light being emerges
 * 
 * SEQUENCE:
 * 1. Intro - Solar system view, planets scattered
 * 2. Drift - Planets begin moving toward alignment
 * 3. Align - Planets lock into perfect alignment
 * 4. Beams - Light beams connect aligned planets
 * 5. Portal - Gateway opens in center from alignment
 * 6. Emerge - Light being emerges from portal
 * 7. Orbit - Planets orbit around new center (baby as sun)
 * 8. Outro - Gentle fade with cosmic glow
 * 
 * QUALITY LEVEL: Matches Time Traveler Stargate Portal
 * 
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getOptimalParticleCount, 
  getOptimalBlur,
  getPerformanceStyle,
  shouldRenderComplexEffect
} from './ceremonyOptimization';

interface NewLifeStardustArrivalCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface Planet {
  id: number;
  name: string;
  size: number;
  color: string;
  glowColor: string;
  orbitRadius: number;
  initialAngle: number;
  alignmentPosition: number; // Position in alignment (0-7)
}

interface StarField {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
}

const PLANETS: Planet[] = [
  { id: 0, name: 'Mercury', size: 8, color: '#A0A0A0', glowColor: 'rgba(160, 160, 160, 0.6)', orbitRadius: 120, initialAngle: 0, alignmentPosition: 0 },
  { id: 1, name: 'Venus', size: 12, color: '#FFA500', glowColor: 'rgba(255, 165, 0, 0.6)', orbitRadius: 150, initialAngle: 45, alignmentPosition: 1 },
  { id: 2, name: 'Earth', size: 13, color: '#4169E1', glowColor: 'rgba(65, 105, 225, 0.6)', orbitRadius: 180, initialAngle: 90, alignmentPosition: 2 },
  { id: 3, name: 'Mars', size: 10, color: '#CD5C5C', glowColor: 'rgba(205, 92, 92, 0.6)', orbitRadius: 210, initialAngle: 135, alignmentPosition: 3 },
  { id: 4, name: 'Jupiter', size: 24, color: '#DAA520', glowColor: 'rgba(218, 165, 32, 0.6)', orbitRadius: 260, initialAngle: 180, alignmentPosition: 4 },
  { id: 5, name: 'Saturn', size: 20, color: '#F4A460', glowColor: 'rgba(244, 164, 96, 0.6)', orbitRadius: 310, initialAngle: 225, alignmentPosition: 5 },
  { id: 6, name: 'Uranus', size: 16, color: '#40E0D0', glowColor: 'rgba(64, 224, 208, 0.6)', orbitRadius: 360, initialAngle: 270, alignmentPosition: 6 },
  { id: 7, name: 'Neptune', size: 15, color: '#4169E1', glowColor: 'rgba(65, 105, 225, 0.6)', orbitRadius: 400, initialAngle: 315, alignmentPosition: 7 }
];

export function NewLifeStardustArrivalCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeStardustArrivalCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'drift' | 'align' | 'beams' | 'portal' | 'emerge' | 'orbit' | 'outro' | 'complete'>('intro');
  const [starField, setStarField] = useState<StarField[]>([]);
  const [completed, setCompleted] = useState(false);

  // Timeline - EXTENDED for smoother pacing
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 2000, action: () => setStage('drift') },      // +500ms - longer intro
      { time: 5000, action: () => setStage('align') },      // +1000ms - smoother drift
      { time: 7500, action: () => setStage('beams') },      // +1000ms - appreciate alignment
      { time: 9500, action: () => setStage('portal') },     // +1000ms - longer beam connection
      { time: 12000, action: () => setStage('emerge') },    // +1000ms - bigger portal opening
      { time: 14500, action: () => setStage('orbit') },     // +1000ms - longer emergence
      { time: 16500, action: () => setStage('outro') },     // +1000ms - enjoy orbit
      { time: 18000, action: () => {
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }}
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // CRITICAL FAILSAFE: Force completion after 22 seconds if ceremony hasn't finished
    const failsafeTimeout = setTimeout(() => {
      if (!completed) {
        console.warn('⚠️ Planetary Alignment failsafe triggered - forcing completion');
        setStage('complete');
        setCompleted(true);
        onComplete?.();
      }
    }, 22000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate star field
  useEffect(() => {
    const starCount = getOptimalParticleCount(150);
    const newStars: StarField[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      twinkleDelay: Math.random() * 3
    }));
    setStarField(newStars);
  }, []);

  // Get planet position based on stage
  const getPlanetPosition = (planet: Planet, stage: string) => {
    const centerX = 50;
    const centerY = 50;

    // Initial scattered positions
    if (stage === 'intro') {
      const angle = (planet.initialAngle * Math.PI) / 180;
      return {
        x: centerX + Math.cos(angle) * (planet.orbitRadius / 10),
        y: centerY + Math.sin(angle) * (planet.orbitRadius / 10)
      };
    }

    // Moving toward alignment
    if (stage === 'drift') {
      const targetY = centerY;
      const spacing = 8;
      const targetX = centerX - (3.5 * spacing) + (planet.alignmentPosition * spacing);
      
      return {
        x: targetX,
        y: targetY
      };
    }

    // Aligned in horizontal line
    if (stage === 'align' || stage === 'beams' || stage === 'portal' || stage === 'emerge') {
      const spacing = 8;
      return {
        x: centerX - (3.5 * spacing) + (planet.alignmentPosition * spacing),
        y: centerY
      };
    }

    // Orbiting around baby/sun
    if (stage === 'orbit' || stage === 'outro') {
      const currentTime = Date.now() / 1000;
      const orbitSpeed = 0.3 + (planet.id * 0.05);
      const angle = currentTime * orbitSpeed;
      const orbitRadius = (planet.orbitRadius / 12);
      
      return {
        x: centerX + Math.cos(angle) * orbitRadius,
        y: centerY + Math.sin(angle) * orbitRadius
      };
    }

    return { x: centerX, y: centerY };
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      style={getPerformanceStyle()}
    >
      {/* Star field background */}
      <div className="absolute inset-0">
        {starField.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={!completed ? {
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            } : { opacity: 0 }}
            transition={{
              duration: 2 + Math.random(),
              repeat: completed ? 0 : 10, // Limit repeats
              delay: star.twinkleDelay
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Main solar system container */}
        <div className="relative w-full h-full">
          {/* Planets */}
          {PLANETS.map((planet) => {
            const position = getPlanetPosition(planet, stage);
            const isAligned = stage === 'align' || stage === 'beams' || stage === 'portal' || stage === 'emerge';

            return (
              <motion.div
                key={planet.id}
                className="absolute"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                }}
                animate={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  scale: isAligned ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: stage === 'drift' ? 2.5 : stage === 'orbit' ? 0 : 0.8,
                  ease: stage === 'drift' ? 'easeInOut' : 'easeOut',
                  scale: {
                    duration: 0.5,
                    repeat: isAligned && !completed ? 3 : 0, // Limit repeats
                    repeatType: 'reverse'
                  }
                }}
              >
                {/* Planet glow */}
                {shouldRenderComplexEffect() && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${planet.glowColor} 0%, transparent 70%)`,
                      filter: `blur(${getOptimalBlur(10)}px)`,
                      width: `${planet.size * 2}px`,
                      height: `${planet.size * 2}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}

                {/* Planet body */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: planet.color,
                    boxShadow: shouldRenderComplexEffect()
                      ? `0 0 ${getOptimalBlur(15)}px ${planet.glowColor}, inset -2px -2px 8px rgba(0,0,0,0.5)`
                      : `0 0 10px ${planet.glowColor}`,
                  }}
                />

                {/* Saturn's ring */}
                {planet.name === 'Saturn' && (
                  <div
                    className="absolute rounded-full border-2"
                    style={{
                      width: `${planet.size * 1.8}px`,
                      height: `${planet.size * 0.5}px`,
                      borderColor: 'rgba(244, 164, 96, 0.6)',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%) rotateX(75deg)',
                    }}
                  />
                )}

                {/* Alignment glow pulse */}
                {isAligned && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: planet.color,
                      opacity: 0.5,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: completed ? 0 : 3 // Limit repeats
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Connection beams between planets */}
          {(stage === 'beams' || stage === 'portal' || stage === 'emerge') && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              {PLANETS.slice(0, -1).map((planet, i) => {
                const startPos = getPlanetPosition(planet, stage);
                const endPos = getPlanetPosition(PLANETS[i + 1], stage);

                return (
                  <motion.line
                    key={`beam-${i}`}
                    x1={`${startPos.x}%`}
                    y1={`${startPos.y}%`}
                    x2={`${endPos.x}%`}
                    y2={`${endPos.y}%`}
                    stroke="rgba(255, 215, 0, 0.8)"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: [0, 1, 0.7],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1
                    }}
                    filter={shouldRenderComplexEffect() ? `drop-shadow(0 0 ${getOptimalBlur(5)}px rgba(255, 215, 0, 0.8))` : undefined}
                  />
                );
              })}
            </svg>
          )}

          {/* Portal opening in center */}
          {(stage === 'portal' || stage === 'emerge') && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              {/* Portal outer ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '200px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '4px solid rgba(255, 215, 0, 0.8)',
                  boxShadow: shouldRenderComplexEffect()
                    ? `0 0 ${getOptimalBlur(40)}px rgba(255, 215, 0, 0.8), inset 0 0 ${getOptimalBlur(40)}px rgba(255, 215, 0, 0.4)`
                    : '0 0 20px rgba(255, 215, 0, 0.8)',
                }}
                animate={{
                  rotate: completed ? 0 : 360,
                  scale: completed ? 1 : [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 4, repeat: completed ? 0 : 2, ease: 'linear' }, // Limit repeats
                  scale: { duration: 2, repeat: completed ? 0 : 2, ease: 'easeInOut' } // Limit repeats
                }}
              />

              {/* Portal inner rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`portal-ring-${i}`}
                  className="absolute rounded-full border-2"
                  style={{
                    width: `${160 - i * 40}px`,
                    height: `${160 - i * 40}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: `rgba(139, 92, 246, ${0.6 - i * 0.15})`,
                  }}
                  animate={{
                    rotate: completed ? 0 : (i % 2 === 0 ? 360 : -360),
                    scale: completed ? 1 : [1, 1.2, 1]
                  }}
                  transition={{
                    rotate: { duration: 3 + i, repeat: completed ? 0 : 2, ease: 'linear' }, // Limit repeats
                    scale: { duration: 1.5, repeat: completed ? 0 : 2, delay: i * 0.2 } // Limit repeats
                  }}
                />
              ))}

              {/* Portal center glow */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '80px',
                  height: '80px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)',
                  filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(15)}px)` : undefined,
                }}
                animate={{
                  scale: completed ? 1 : [1, 1.5, 1],
                  opacity: completed ? 0 : [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: completed ? 0 : 2 // Limit repeats
                }}
              />

              {/* Swirling particles in portal */}
              {Array.from({ length: getOptimalParticleCount(20) }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 40;

                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-yellow-300"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: Math.cos(angle + Date.now() / 1000) * radius,
                      y: Math.sin(angle + Date.now() / 1000) * radius,
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'linear'
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* Light being emerging from portal */}
          {(stage === 'emerge' || stage === 'orbit') && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0,
                opacity: 1 
              }}
              transition={{ 
                duration: 2,
                ease: 'easeOut'
              }}
            >
              {/* Radiant glow */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: '300px',
                  height: '300px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
                  filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(60)}px)` : `blur(${getOptimalBlur(30)}px)`,
                }}
                animate={{
                  scale: completed ? 1 : [1, 1.3, 1],
                  opacity: completed ? 0 : [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: completed ? 0 : 2 // Limit repeats
                }}
              />

              {/* Baby as light being */}
              <motion.div
                className="relative z-10 text-8xl md:text-9xl"
                style={{
                  filter: shouldRenderComplexEffect()
                    ? `drop-shadow(0 0 ${getOptimalBlur(30)}px rgba(255, 215, 0, 1))`
                    : `drop-shadow(0 0 ${getOptimalBlur(15)}px rgba(255, 215, 0, 1))`,
                }}
                animate={{
                  scale: completed ? 1 : [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: completed ? 0 : 3, // Limit repeats
                  ease: 'easeInOut'
                }}
              >
                👶
              </motion.div>

              {/* Radiating light rays */}
              {Array.from({ length: getOptimalParticleCount(24) }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      width: '4px',
                      height: '100px',
                      background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.8), transparent)',
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${angle}rad)`,
                      transformOrigin: 'top center',
                      filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(2)}px)` : undefined,
                    }}
                    animate={{
                      opacity: completed ? 0 : [0.3, 0.8, 0.3],
                      scaleY: completed ? 1 : [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.05,
                      repeat: completed ? 0 : 2, // Limit repeats
                      ease: 'easeInOut'
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* Expanding light rings during orbit */}
          {stage === 'orbit' && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`orbit-ring-${i}`}
                  className="absolute rounded-full border-2 border-yellow-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    width: ['100px', '600px'],
                    height: ['100px', '600px'],
                    opacity: [0.8, 0],
                    borderWidth: ['4px', '1px']
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: completed ? 0 : 1, // Limit repeats
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Outro fade */}
        {stage === 'outro' && (
          <motion.div
            key="outro"
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}