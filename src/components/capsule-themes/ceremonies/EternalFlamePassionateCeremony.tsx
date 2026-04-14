/**
 * Eternal Flame - Binary Hearts Supernova Ceremony ❤️💚
 * 
 * ULTRA SMOOTH VERSION - Refined timing, overlapping animations, no skips
 * 
 * STORY:
 * 1. Two hearts appear and float gently (clear intro)
 * 2. Hearts drift closer, circling each other (slow build)
 * 3. Orbit gets faster and tighter (tension rising)
 * 4. Hearts STOP and charge up power (anticipation)
 * 5. Hearts RUSH together in slow-motion clarity
 * 6. MERGED - hearts together at center (NEW!)
 * 7. COLLISION - massive impact you can SEE and FEEL
 * 8. SUPERNOVA - huge explosion with particles
 * 9. Particles converge into wedding ring
 * 10. Ring sparkles and rotates
 * 
 * Duration: 19 seconds (longer for smoother pacing)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getOptimalParticleCount, 
  getOptimalBlur,
  getPerformanceStyle,
  shouldRenderComplexEffect
} from './ceremonyOptimization';

interface EternalFlamePassionateCeremonyProps {
  capsuleTitle?: string;
  media?: any[];
  isPreview?: boolean;
  isVisible?: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

export function EternalFlamePassionateCeremony({
  capsuleTitle = '',
  media = [],
  isPreview = false,
  isVisible = true,
  onComplete
}: EternalFlamePassionateCeremonyProps) {
  const [stage, setStage] = useState(0);
  const [supernovaParticles, setSupernovaParticles] = useState<Particle[]>([]);
  const [ringParticles, setRingParticles] = useState<Particle[]>([]);
  const [shake, setShake] = useState(false);

  // Refined timeline with smoother pacing and overlaps
  useEffect(() => {
    const timeline = [
      { time: 0, stage: 0 },       // Intro - hearts appear
      { time: 2500, stage: 1 },    // Approach - hearts drift closer (longer)
      { time: 5000, stage: 2 },    // Orbit slow - gentle circle
      { time: 8000, stage: 3 },    // Orbit fast - building tension
      { time: 10500, stage: 4 },   // CHARGE - hearts stop and power up (longer)
      { time: 12500, stage: 5 },   // RUSH - hearts accelerate (longer, clearer)
      { time: 13800, stage: 6 },   // MERGED - hearts together at center (NEW!)
      { time: 14200, stage: 7, callback: () => setShake(true) },  // COLLISION
      { time: 14600, callback: () => setShake(false) },
      { time: 15400, stage: 8 },   // SUPERNOVA - huge explosion (longer)
      { time: 17400, stage: 9 },   // Formation - particles to ring
      { time: 18900, stage: 10 },  // Ring - sparkle and rotate
      { time: 19400, stage: 11 },  // Outro - fade
      { time: 19900, stage: 12, callback: onComplete }
    ];

    const timeouts = timeline.map(({ time, stage, callback }) => 
      setTimeout(() => {
        if (stage !== undefined) setStage(stage);
        callback?.();
      }, time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate supernova particles
  useEffect(() => {
    if (stage === 8) {
      const count = getOptimalParticleCount(500);
      const colors = [
        '#FF6B6B', '#FFD93D', '#FFA07A', '#FFE66D', '#FF8787',
        '#FF5252', '#FFAA00', '#FF9999', '#FFDD77', '#FF6F6F',
        '#FFBB33', '#FF7777', '#FFCC55', '#FF8888', '#FFE088'
      ];
      
      const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i / count) * Math.PI * 2,
        speed: 0.7 + Math.random() * 0.6,
        size: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      
      setSupernovaParticles(particles);
    }
  }, [stage]);

  // Generate ring particles
  useEffect(() => {
    if (stage === 9) {
      const count = getOptimalParticleCount(60);
      const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB347'];
      
      const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (i / count) * Math.PI * 2,
        speed: 1,
        size: 3 + Math.random() * 3,
        color: colors[i % colors.length]
      }));
      
      setRingParticles(particles);
    }
  }, [stage]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      style={getPerformanceStyle()}
    >
      {/* Star field background */}
      <div className="absolute inset-0">
        {Array.from({ length: getOptimalParticleCount(80) }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Screen shake container */}
      <motion.div
        className="absolute inset-0"
        animate={shake ? {
          x: [0, -8, 8, -8, 8, -4, 4, 0],
          y: [0, 8, -8, 8, -8, 4, -4, 0]
        } : {}}
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}
      >
        <AnimatePresence mode="wait">
          {/* STAGES 0-3: Hearts orbiting */}
          {stage >= 0 && stage <= 3 && (
            <motion.div
              key="orbiting-hearts"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {/* Heart 1 - Red */}
              <motion.div
                className="absolute"
                initial={{
                  left: '20%',
                  top: '50%',
                }}
                animate={{
                  left: stage === 0 ? '20%' :
                        stage === 1 ? '32%' :
                        stage === 2 ? ['32%', '50%', '68%', '50%', '32%'] :
                        stage === 3 ? ['32%', '50%', '68%', '50%', '32%'] : '50%',
                  top: stage === 0 ? '50%' :
                        stage === 1 ? '42%' :
                        stage === 2 ? ['42%', '32%', '42%', '58%', '42%'] :
                        stage === 3 ? ['42%', '28%', '42%', '62%', '42%'] : '50%',
                }}
                transition={{
                  duration: stage === 0 ? 0 :
                           stage === 1 ? 2.5 :
                           stage === 2 ? 6 :
                           stage === 3 ? 2.5 : 0,
                  ease: stage === 2 || stage === 3 ? 'linear' : [0.42, 0, 0.58, 1],
                  repeat: (stage === 2 || stage === 3) ? Infinity : 0,
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Glow */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: stage === 3 ? '220px' : '160px',
                      height: stage === 3 ? '220px' : '160px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: stage === 3 
                        ? 'radial-gradient(circle, rgba(255, 107, 107, 0.9) 0%, rgba(255, 107, 107, 0.5) 40%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255, 107, 107, 0.7) 0%, rgba(255, 107, 107, 0.3) 40%, transparent 70%)',
                      filter: `blur(${getOptimalBlur(stage === 3 ? 45 : 30)}px)`,
                    }}
                    animate={{
                      scale: stage === 3 ? [1, 1.6, 1] : [1, 1.2, 1],
                      opacity: stage === 3 ? [0.8, 1, 0.8] : [0.6, 0.9, 0.6]
                    }}
                    transition={{
                      duration: stage === 3 ? 0.4 : 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}

                {/* Heart */}
                <motion.div
                  className="text-7xl md:text-8xl"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(stage === 3 ? 30 : 20)}px rgba(255, 107, 107, 1))`,
                  }}
                  animate={{
                    scale: stage === 3 ? [1, 1.25, 1] : [1, 1.1, 1],
                  }}
                  transition={{
                    duration: stage === 3 ? 0.3 : 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ❤️
                </motion.div>

                {/* Motion trail during fast orbit */}
                {stage === 3 && shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 107, 107, 0.6) 0%, transparent 60%)',
                      filter: `blur(${getOptimalBlur(35)}px)`,
                    }}
                    animate={{
                      scale: [0.8, 2.2],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}
              </motion.div>

              {/* Heart 2 - Gold */}
              <motion.div
                className="absolute"
                initial={{
                  left: '80%',
                  top: '50%',
                }}
                animate={{
                  left: stage === 0 ? '80%' :
                        stage === 1 ? '68%' :
                        stage === 2 ? ['68%', '50%', '32%', '50%', '68%'] :
                        stage === 3 ? ['68%', '50%', '32%', '50%', '68%'] : '50%',
                  top: stage === 0 ? '50%' :
                        stage === 1 ? '58%' :
                        stage === 2 ? ['58%', '68%', '58%', '42%', '58%'] :
                        stage === 3 ? ['58%', '72%', '58%', '38%', '58%'] : '50%',
                }}
                transition={{
                  duration: stage === 0 ? 0 :
                           stage === 1 ? 2.5 :
                           stage === 2 ? 6 :
                           stage === 3 ? 2.5 : 0,
                  ease: stage === 2 || stage === 3 ? 'linear' : [0.42, 0, 0.58, 1],
                  repeat: (stage === 2 || stage === 3) ? Infinity : 0,
                }}
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Glow */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: stage === 3 ? '220px' : '160px',
                      height: stage === 3 ? '220px' : '160px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: stage === 3
                        ? 'radial-gradient(circle, rgba(74, 222, 128, 0.9) 0%, rgba(74, 222, 128, 0.5) 40%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(74, 222, 128, 0.7) 0%, rgba(74, 222, 128, 0.3) 40%, transparent 70%)',
                      filter: `blur(${getOptimalBlur(stage === 3 ? 45 : 30)}px)`,
                    }}
                    animate={{
                      scale: stage === 3 ? [1, 1.6, 1] : [1, 1.2, 1],
                      opacity: stage === 3 ? [0.8, 1, 0.8] : [0.6, 0.9, 0.6]
                    }}
                    transition={{
                      duration: stage === 3 ? 0.4 : 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}

                {/* Heart */}
                <motion.div
                  className="text-7xl md:text-8xl"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(stage === 3 ? 30 : 20)}px rgba(74, 222, 128, 1))`,
                  }}
                  animate={{
                    scale: stage === 3 ? [1, 1.25, 1] : [1, 1.1, 1],
                  }}
                  transition={{
                    duration: stage === 3 ? 0.3 : 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  💚
                </motion.div>

                {/* Motion trail during fast orbit */}
                {stage === 3 && shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(74, 222, 128, 0.6) 0%, transparent 60%)',
                      filter: `blur(${getOptimalBlur(35)}px)`,
                    }}
                    animate={{
                      scale: [0.8, 2.2],
                      opacity: [0.7, 0]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeOut'
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* STAGE 4: CHARGE UP - Hearts stop and power up */}
          {stage === 4 && (
            <motion.div
              key="charging"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Heart 1 - Left side, charging */}
              <motion.div
                className="absolute left-[37%] top-1/2"
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ left: '32%' }}
                animate={{ left: '37%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Massive charging glow */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '280px',
                      height: '280px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(255, 107, 107, 1) 0%, rgba(255, 107, 107, 0.7) 25%, rgba(255, 107, 107, 0.3) 50%, transparent 70%)',
                      filter: `blur(${getOptimalBlur(55)}px)`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}

                {/* Energy rings charging - slower, clearer */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`charge-ring-1-${i}`}
                    className="absolute left-1/2 top-1/2 rounded-full border-4 border-red-400"
                    style={{
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      width: ['220px', '60px'],
                      height: ['220px', '60px'],
                      opacity: [0, 0.8, 0.6, 0],
                      borderWidth: ['2px', '5px', '2px']
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeIn'
                    }}
                  />
                ))}

                {/* Heart - pulsing with power */}
                <motion.div
                  className="text-8xl md:text-9xl relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(45)}px rgba(255, 107, 107, 1))`,
                  }}
                  animate={{
                    scale: [1.1, 1.5, 1.1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  ❤️
                </motion.div>
              </motion.div>

              {/* Heart 2 - Right side, charging */}
              <motion.div
                className="absolute left-[63%] top-1/2"
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ left: '68%' }}
                animate={{ left: '63%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Massive charging glow */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '280px',
                      height: '280px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'radial-gradient(circle, rgba(74, 222, 128, 1) 0%, rgba(74, 222, 128, 0.7) 25%, rgba(74, 222, 128, 0.3) 50%, transparent 70%)',
                      filter: `blur(${getOptimalBlur(55)}px)`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}

                {/* Energy rings charging - slower, clearer */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`charge-ring-2-${i}`}
                    className="absolute left-1/2 top-1/2 rounded-full border-4 border-green-400"
                    style={{
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      width: ['220px', '60px'],
                      height: ['220px', '60px'],
                      opacity: [0, 0.8, 0.6, 0],
                      borderWidth: ['2px', '5px', '2px']
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeIn'
                    }}
                  />
                ))}

                {/* Heart - pulsing with power */}
                <motion.div
                  className="text-8xl md:text-9xl relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(45)}px rgba(74, 222, 128, 1))`,
                  }}
                  animate={{
                    scale: [1.1, 1.5, 1.1],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  💚
                </motion.div>
              </motion.div>

              {/* Energy arc between hearts - thicker, clearer */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '26%',
                    height: '8px',
                    background: 'linear-gradient(to right, rgba(255, 107, 107, 0.9), rgba(100, 200, 100, 1), rgba(74, 222, 128, 0.9))',
                    filter: `blur(${getOptimalBlur(5)}px)`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 40px rgba(100, 200, 100, 0.9), 0 0 80px rgba(100, 200, 100, 0.5)'
                  }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scaleX: [0.9, 1.15, 0.9],
                    scaleY: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}

              {/* Electrical sparks along arc */}
              {shouldRenderComplexEffect() && [0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    filter: `blur(${getOptimalBlur(1)}px)`,
                    boxShadow: '0 0 10px #fff, 0 0 20px #4ade80'
                  }}
                  animate={{
                    x: ['-13%', '13%'],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* STAGE 5: RUSH - Hearts accelerate toward each other (LONGER, CLEARER) */}
          {stage === 5 && (
            <motion.div
              key="rushing"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
            >
              {/* Heart 1 - Racing to center (SLOWER for clarity) */}
              <motion.div
                className="absolute"
                initial={{ left: '37%', top: '50%' }}
                animate={{ left: '50%', top: '50%' }}
                transition={{
                  duration: 1.3,
                  ease: [0.5, 0.05, 0.1, 0.95] // Smooth acceleration
                }}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {/* Speed trail - longer, more visible */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      width: '400px',
                      height: '120px',
                      right: '50%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'linear-gradient(to right, transparent 0%, rgba(255, 107, 107, 0.3) 30%, rgba(255, 107, 107, 0.7) 70%, rgba(255, 107, 107, 0.9) 100%)',
                      filter: `blur(${getOptimalBlur(25)}px)`,
                    }}
                    animate={{
                      opacity: [0, 1, 1],
                      scaleX: [0.5, 1, 1.2]
                    }}
                    transition={{
                      duration: 1.3,
                      ease: 'easeOut'
                    }}
                  />
                )}

                {/* Heart growing */}
                <motion.div
                  className="text-8xl md:text-9xl relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(50)}px rgba(255, 107, 107, 1))`,
                  }}
                  animate={{ 
                    scale: [1.2, 1.8]
                  }}
                  transition={{ 
                    duration: 1.3, 
                    ease: 'easeIn' 
                  }}
                >
                  ❤️
                </motion.div>
              </motion.div>

              {/* Heart 2 - Racing to center (SLOWER for clarity) */}
              <motion.div
                className="absolute"
                initial={{ left: '63%', top: '50%' }}
                animate={{ left: '50%', top: '50%' }}
                transition={{
                  duration: 1.3,
                  ease: [0.5, 0.05, 0.1, 0.95] // Smooth acceleration
                }}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {/* Speed trail - longer, more visible */}
                {shouldRenderComplexEffect() && (
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      width: '400px',
                      height: '120px',
                      left: '50%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'linear-gradient(to left, transparent 0%, rgba(74, 222, 128, 0.3) 30%, rgba(74, 222, 128, 0.7) 70%, rgba(74, 222, 128, 0.9) 100%)',
                      filter: `blur(${getOptimalBlur(25)}px)`,
                    }}
                    animate={{
                      opacity: [0, 1, 1],
                      scaleX: [0.5, 1, 1.2]
                    }}
                    transition={{
                      duration: 1.3,
                      ease: 'easeOut'
                    }}
                  />
                )}

                {/* Heart growing */}
                <motion.div
                  className="text-8xl md:text-9xl relative z-10"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(50)}px rgba(74, 222, 128, 1))`,
                  }}
                  animate={{ 
                    scale: [1.2, 1.8]
                  }}
                  transition={{ 
                    duration: 1.3, 
                    ease: 'easeIn' 
                  }}
                >
                  💚
                </motion.div>
              </motion.div>

              {/* Convergence energy buildup at center */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: '200px',
                    height: '200px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 200, 100, 0.6) 30%, transparent 70%)',
                    filter: `blur(${getOptimalBlur(40)}px)`,
                  }}
                  animate={{
                    scale: [0, 1.5],
                    opacity: [0, 0.9]
                  }}
                  transition={{
                    duration: 1.3,
                    ease: 'easeIn'
                  }}
                />
              )}
            </motion.div>
          )}

          {/* STAGE 6: MERGED - Hearts together at center (NEW!) */}
          {stage === 6 && (
            <motion.div
              key="merged"
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* BOTH Hearts at CENTER - clearly visible */}
              <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                {/* Red heart */}
                <motion.div
                  className="absolute left-0 top-0 text-8xl md:text-9xl"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(50)}px rgba(255, 107, 107, 1))`,
                    transform: 'translate(-25%, -50%)'
                  }}
                  animate={{ 
                    scale: [1.8, 1.9, 1.8]
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: 1,
                    ease: 'easeInOut' 
                  }}
                >
                  ❤️
                </motion.div>

                {/* Green heart overlapping */}
                <motion.div
                  className="absolute left-0 top-0 text-8xl md:text-9xl"
                  style={{
                    filter: `drop-shadow(0 0 ${getOptimalBlur(50)}px rgba(74, 222, 128, 1))`,
                    transform: 'translate(25%, -50%)',
                    mixBlendMode: 'screen'
                  }}
                  animate={{ 
                    scale: [1.8, 1.9, 1.8]
                  }}
                  transition={{ 
                    duration: 0.4, 
                    repeat: 1,
                    ease: 'easeInOut' 
                  }}
                >
                  💚
                </motion.div>
              </div>

              {/* Intense energy buildup at center */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: '300px',
                    height: '300px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 200, 100, 0.7) 30%, transparent 70%)',
                    filter: `blur(${getOptimalBlur(50)}px)`,
                  }}
                  animate={{
                    scale: [1.2, 1.8, 1.2],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: 1,
                    ease: 'easeInOut'
                  }}
                />
              )}
            </motion.div>
          )}

          {/* STAGE 7: COLLISION - MASSIVE IMPACT (LONGER, MORE DRAMATIC) */}
          {stage === 7 && (
            <motion.div
              key="collision"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* BLINDING WHITE FLASH - longer duration */}
              <motion.div
                className="absolute inset-0 bg-white z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.9, 0.7, 0] }}
                transition={{ 
                  duration: 1.2, 
                  times: [0, 0.15, 0.35, 0.6, 1], 
                  ease: 'easeOut' 
                }}
              />

              {/* Impact point - center */}
              <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                {/* MASSIVE EXPLOSION CORE - triple layer with longer animation */}
                {shouldRenderComplexEffect() && (
                  <>
                    {/* Inner core - white hot */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: '350px',
                        height: '350px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 240, 200, 1) 15%, rgba(255, 220, 150, 0.9) 35%, transparent 70%)',
                        filter: `blur(${getOptimalBlur(45)}px)`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 3.5, 3], opacity: [1, 1, 0.7, 0] }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Middle layer - orange */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: '550px',
                        height: '550px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(255, 170, 100, 0.95) 0%, rgba(255, 130, 107, 0.7) 35%, transparent 70%)',
                        filter: `blur(${getOptimalBlur(65)}px)`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 3, 2.5], opacity: [1, 0.9, 0.6, 0] }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                    />

                    {/* Outer layer - red */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: '750px',
                        height: '750px',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, rgba(255, 90, 90, 0.5) 35%, transparent 70%)',
                        filter: `blur(${getOptimalBlur(85)}px)`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 2.5, 2], opacity: [1, 0.8, 0.4, 0] }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    />
                  </>
                )}

                {/* Hearts exploding at center - slower rotation */}
                <motion.div
                  className="relative z-10"
                  initial={{ scale: 1.8, rotate: 0 }}
                  animate={{ 
                    scale: [1.8, 2.8, 0],
                    rotate: [0, 60, 120, 180]
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                >
                  <div className="relative text-9xl">
                    <span className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>❤️</span>
                    <span 
                      className="absolute left-1/2 top-1/2" 
                      style={{ transform: 'translate(-50%, -50%)', opacity: 0.85, mixBlendMode: 'screen' }}
                    >
                      💚
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* IMPACT SHOCKWAVES - MORE EPIC: 8 rings, BIGGER */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={`shockwave-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full border-4"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    borderColor: i % 2 === 0 ? '#FF6B6B' : '#FFD93D',
                  }}
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{
                    width: ['0px', '1800px'],
                    height: ['0px', '1800px'],
                    opacity: [0, 1, 0.85, 0.6, 0],
                    borderWidth: ['10px', '5px', '2px', '0px']
                  }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.11,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              ))}

              {/* Energy burst particles - MASSIVE: 80 particles, BIGGER */}
              {shouldRenderComplexEffect() && Array.from({ length: getOptimalParticleCount(80) }).map((_, i) => {
                const angle = (i / 80) * Math.PI * 2;
                const distance = 48;
                const endX = 50 + Math.cos(angle) * distance;
                const endY = 50 + Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: i % 3 === 0 ? '#FF6B6B' : i % 3 === 1 ? '#FFD93D' : '#FFA07A',
                      left: '50%',
                      top: '50%',
                      boxShadow: `0 0 25px currentColor, 0 0 50px currentColor`,
                      filter: `blur(${getOptimalBlur(2)}px)`
                    }}
                    initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
                    animate={{
                      x: `calc(${endX - 50}vw - 50%)`,
                      y: `calc(${endY - 50}vh - 50%)`,
                      scale: [0, 3, 1.8, 0.8],
                      opacity: [0, 1, 0.95, 0]
                    }}
                    transition={{
                      duration: 1.1,
                      ease: 'easeOut',
                      delay: i * 0.008
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* STAGE 8: SUPERNOVA - Massive particle explosion (LONGER) */}
          {stage === 8 && (
            <motion.div
              key="supernova"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeIn' }}
            >
              {/* Central afterglow - longer fade */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: '550px',
                    height: '550px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 220, 120, 0.85) 0%, rgba(255, 130, 107, 0.5) 25%, rgba(255, 107, 107, 0.3) 50%, transparent 65%)',
                    filter: `blur(${getOptimalBlur(75)}px)`,
                  }}
                  animate={{
                    scale: [1.8, 3, 2.5],
                    opacity: [0.9, 0.6, 0.3, 0.1]
                  }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              )}

              {/* GRANDEOUS SUPERNOVA - 500 particles, BIGGER spread */}
              {supernovaParticles.map((particle) => {
                const distance = 60 * particle.speed;
                const endX = 50 + Math.cos(particle.angle) * distance;
                const endY = 50 + Math.sin(particle.angle) * distance;

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${particle.size * 1.3}px`,
                      height: `${particle.size * 1.3}px`,
                      backgroundColor: particle.color,
                      left: '50%',
                      top: '50%',
                      boxShadow: shouldRenderComplexEffect() ? `0 0 ${getOptimalBlur(18)}px ${particle.color}, 0 0 ${getOptimalBlur(35)}px ${particle.color}` : undefined,
                      filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(1.2)}px)` : undefined,
                    }}
                    initial={{
                      x: '-50%',
                      y: '-50%',
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      x: `calc(${endX - 50}vw - 50%)`,
                      y: `calc(${endY - 50}vh - 50%)`,
                      opacity: [0, 1, 0.98, 0.85, 0.65, 0.4],
                      scale: [0, 2.2, 1.8, 1.4, 1.1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      ease: [0.22, 1, 0.36, 1],
                      delay: particle.id * 0.0008
                    }}
                  />
                );
              })}

              {/* Expanding shockwave rings - EPIC: 9 rings, BIGGER */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div
                  key={`supernova-ring-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-full border-2 border-orange-400"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{
                    width: ['0px', '2000px'],
                    height: ['0px', '2000px'],
                    opacity: [0.9, 0.7, 0.45, 0],
                    borderWidth: ['6px', '3px', '1px', '0px']
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* STAGE 9: Ring formation - smoother convergence */}
          {stage === 9 && (
            <motion.div
              key="ring-formation"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {/* Ring glow - smooth fade in */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: '38%',
                    height: '38%',
                    maxWidth: '380px',
                    maxHeight: '380px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, transparent 32%, rgba(255, 215, 0, 0.5) 43%, rgba(255, 215, 0, 0.25) 55%, transparent 68%)',
                    filter: `blur(${getOptimalBlur(35)}px)`,
                  }}
                  animate={{
                    scale: [0.7, 1.15, 0.95, 1.05, 1],
                    opacity: [0, 0.7, 0.9, 0.85]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                />
              )}

              {/* Particles converging to ring - slower, smoother */}
              {ringParticles.map((particle) => {
                const ringRadius = 15;
                const ringX = 50 + Math.cos(particle.angle) * ringRadius;
                const ringY = 50 + Math.sin(particle.angle) * ringRadius;

                const startAngle = Math.random() * Math.PI * 2;
                const startDist = 38 + Math.random() * 18;
                const startX = 50 + Math.cos(startAngle) * startDist;
                const startY = 50 + Math.sin(startAngle) * startDist;

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      backgroundColor: particle.color,
                      boxShadow: shouldRenderComplexEffect() ? `0 0 ${getOptimalBlur(8)}px ${particle.color}` : undefined,
                      filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(0.6)}px)` : undefined,
                    }}
                    initial={{
                      left: `${startX}%`,
                      top: `${startY}%`,
                      x: '-50%',
                      y: '-50%',
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      left: `${ringX}%`,
                      top: `${ringY}%`,
                      opacity: [0, 0.5, 0.8, 1],
                      scale: [0, 1.5, 1.2, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: particle.id * 0.015,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* STAGE 10: Ring sparkles and rotates */}
          {stage === 10 && (
            <motion.div
              key="ring-sparkle"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {/* Ring glow - pulsing */}
              {shouldRenderComplexEffect() && (
                <motion.div
                  className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                  style={{
                    width: '38%',
                    height: '38%',
                    maxWidth: '380px',
                    maxHeight: '380px',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, transparent 32%, rgba(255, 215, 0, 0.6) 43%, rgba(255, 215, 0, 0.35) 55%, transparent 68%)',
                    filter: `blur(${getOptimalBlur(35)}px)`,
                  }}
                  animate={{
                    scale: [0.95, 1.15, 0.95],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}

              {/* Ring particles - rotating */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '30%',
                  height: '30%',
                  maxWidth: '300px',
                  maxHeight: '300px',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {ringParticles.map((particle) => {
                  const ringRadius = 15;
                  const ringX = 50 + Math.cos(particle.angle) * ringRadius;
                  const ringY = 50 + Math.sin(particle.angle) * ringRadius;

                  return (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        left: `${ringX}%`,
                        top: `${ringY}%`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: shouldRenderComplexEffect() ? `0 0 ${getOptimalBlur(10)}px ${particle.color}` : undefined,
                        filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(0.6)}px)` : undefined,
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{
                        duration: 2.5,
                        delay: particle.id * 0.06,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* Diamond sparkles */}
              {[0, 90, 180, 270].map((angle, i) => {
                const sparkleRadius = 15;
                const sparkleX = 50 + Math.cos((angle * Math.PI) / 180) * sparkleRadius;
                const sparkleY = 50 + Math.sin((angle * Math.PI) / 180) * sparkleRadius;

                return (
                  <motion.div
                    key={`diamond-${i}`}
                    className="absolute text-3xl md:text-4xl pointer-events-none"
                    style={{
                      left: `${sparkleX}%`,
                      top: `${sparkleY}%`,
                      transform: 'translate(-50%, -50%)',
                      filter: `drop-shadow(0 0 ${getOptimalBlur(10)}px rgba(255, 255, 255, 0.9))`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0.8, 0],
                      scale: [0, 1.8, 1.4, 1.2, 0.9],
                      rotate: [0, 120, 240, 360]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}

              {/* Light rays */}
              {shouldRenderComplexEffect() && Array.from({ length: 12 }).map((_, i) => {
                const rayAngle = (i / 12) * Math.PI * 2;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute left-1/2 top-1/2 pointer-events-none"
                    style={{
                      width: '4px',
                      height: '90px',
                      background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.7), transparent)',
                      transform: `rotate(${rayAngle}rad)`,
                      transformOrigin: 'top center',
                      filter: `blur(${getOptimalBlur(3)}px)`,
                    }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scaleY: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.18,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* STAGE 11: Outro */}
          {stage === 11 && (
            <motion.div
              key="outro"
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
                {ringParticles.map((particle) => {
                  const ringRadius = 15;
                  const ringX = Math.cos(particle.angle) * ringRadius;
                  const ringY = Math.sin(particle.angle) * ringRadius;

                  return (
                    <div
                      key={particle.id}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        left: `${ringX}vh`,
                        top: `${ringY}vh`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Title overlay */}
      <AnimatePresence>
        {(stage === 0 || stage === 1) && (
          <motion.div
            className="absolute top-24 left-0 right-0 text-center z-20 pointer-events-none"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl px-4">
              {capsuleTitle}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}