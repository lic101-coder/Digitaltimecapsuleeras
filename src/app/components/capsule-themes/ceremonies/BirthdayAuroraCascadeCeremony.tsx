/**
 * Birthday - Aurora Cascade Ceremony (V3.0 EPIC ENHANCEMENT)
 * 
 * 🌌 ULTRA CINEMA-QUALITY STORY: A soul's cosmic birthday celebration
 * 
 * REFINED NARRATIVE ARC:
 * - Absolute stillness → First heartbeat of celebration
 * - Single spark blooms into dancing light
 * - Aurora ribbons emerge with graceful power
 * - Ribbons cascade in waves, building energy
 * - Full cosmic aurora symphony explosion
 * - Climactic supernova with title reveal
 * 
 * ENHANCEMENTS V3:
 * - Smoother easing functions (cubic bezier curves)
 * - Layered depth with foreground/background auroras
 * - More dramatic color transitions
 * - Better particle choreography
 * - Epic crescendo pacing
 * - Atmospheric glow effects
 * 
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getOptimalParticleCount, isMobile } from './ceremonyOptimization';

interface BirthdayAuroraCascadeCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  isVisible?: boolean;
  onComplete?: () => void;
}

export function BirthdayAuroraCascadeCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  isVisible = true,
  onComplete
}: BirthdayAuroraCascadeCeremonyProps) {
  const [stage, setStage] = useState<'void' | 'pulse' | 'spark' | 'aurora_birth' | 'cascade' | 'symphony' | 'supernova' | 'outro'>('void');
  const mobile = isMobile();

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('void') },
      { time: 1500, action: () => setStage('pulse') },
      { time: 3000, action: () => setStage('spark') },
      { time: 5000, action: () => setStage('aurora_birth') },
      { time: 8000, action: () => setStage('cascade') },
      { time: 11500, action: () => setStage('symphony') },
      { time: 15000, action: () => setStage('supernova') },
      { time: 17500, action: () => setStage('outro') },
      { time: 18000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Enhanced aurora color palette - more vibrant and cinematic
  const auroraColors = [
    { main: '#ff1744', glow: 'rgba(255, 23, 68, 0.9)', name: 'crimson' },      // Crimson
    { main: '#ff6b9d', glow: 'rgba(255, 107, 157, 0.9)', name: 'rose' },       // Rose
    { main: '#d946ef', glow: 'rgba(217, 70, 239, 0.9)', name: 'fuchsia' },     // Fuchsia
    { main: '#a855f7', glow: 'rgba(168, 85, 247, 0.9)', name: 'purple' },      // Purple
    { main: '#6366f1', glow: 'rgba(99, 102, 241, 0.9)', name: 'indigo' },      // Indigo
    { main: '#06b6d4', glow: 'rgba(6, 182, 212, 0.9)', name: 'cyan' },         // Cyan
    { main: '#10b981', glow: 'rgba(16, 185, 129, 0.9)', name: 'emerald' },     // Emerald
    { main: '#84cc16', glow: 'rgba(132, 204, 22, 0.9)', name: 'lime' },        // Lime
    { main: '#fbbf24', glow: 'rgba(251, 191, 36, 0.9)', name: 'amber' },       // Amber
    { main: '#f97316', glow: 'rgba(249, 115, 22, 0.9)', name: 'orange' },      // Orange
  ];

  // Smooth easing function for cinematic feel
  const cinematicEase = [0.43, 0.13, 0.23, 0.96];

  const bgStars = useMemo(() => Array.from({ length: getOptimalParticleCount(60) }, (_, i) => ({
    id: i,
    size: Math.random() * 1.5 + 0.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 3 + Math.random() * 4,
    delay: Math.random() * 2
  })), []);

  const fgStars = useMemo(() => Array.from({ length: getOptimalParticleCount(40) }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 2 + Math.random() * 2,
    delay: Math.random() * 2
  })), []);

  const vortexParticles = useMemo(() => {
    const count = getOptimalParticleCount(24);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const layer = i % 4;
      const radius = 120 + layer * 50;
      return { id: i, angle, layer, radius };
    });
  }, []);

  const curtainData = useMemo(() => Array.from({ length: getOptimalParticleCount(10) }, (_, i) => ({
    id: i,
    dur: 3 + Math.random() * 1.5,
    xShift: (Math.random() - 0.5) * 60
  })), []);

  const explosionParticles = useMemo(() => {
    const count = getOptimalParticleCount(48);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return { id: i, angle, distance: 200 + Math.random() * 350 };
    });
  }, []);

  const starCss = `
    @keyframes bac-twinkle-slow{0%,100%{opacity:0.2;transform:scale(1)}50%{opacity:0.5;transform:scale(1.2)}}
    @keyframes bac-twinkle-fast{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
    @keyframes bac-beam-pulse{0%,100%{transform:scaleX(0.6);opacity:0.3}50%{transform:scaleX(1);opacity:0.8}}
    @keyframes bac-title-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    @keyframes bac-ray-in{0%{transform:scaleX(0);opacity:0}20%{opacity:1}100%{transform:scaleX(1);opacity:0.75}}
    @keyframes bac-ray-fade{0%,100%{opacity:0.75}50%{opacity:0.45}}
  `;

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#000000] via-[#0a0118] to-[#000308]">
      <style>{starCss}</style>

      {/* Deep space starfield with depth layers — CSS-animated, no repeat:Infinity on motion */}
      <div className="absolute inset-0">
        {bgStars.map(s => (
          <div
            key={`bg-star-${s.id}`}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: s.size + 'px', height: s.size + 'px',
              left: s.left + '%', top: s.top + '%',
              boxShadow: '0 0 2px rgba(255,255,255,0.4)',
              animation: `bac-twinkle-slow ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`
            }}
          />
        ))}
        {fgStars.map(s => (
          <div
            key={`fg-star-${s.id}`}
            className="absolute bg-white rounded-full"
            style={{
              width: s.size + 'px', height: s.size + 'px',
              left: s.left + '%', top: s.top + '%',
              boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              animation: `bac-twinkle-fast ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`
            }}
          />
        ))}
      </div>

      {/* STAGE 1: PULSE - Celebration heartbeat awakens */}
      <AnimatePresence>
        {stage === 'pulse' && (
          <>
            {/* Gentle pulse waves */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '2px solid rgba(168, 85, 247, 0.6)',
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 5],
                  opacity: [0.8, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: cinematicEase,
                  repeat: 1
                }}
              />
            ))}
            
            {/* Central glow pulse */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.5, 1, 0.5, 1],
                opacity: [0, 0.6, 0, 0.6]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: 1,
                ease: 'easeInOut'
              }}
            >
              <div
                className="w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(217,70,239,0.4) 50%, transparent 80%)',
                  filter: mobile ? 'none' : 'blur(25px)'
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* STAGE 2: SPARK - Life ignites */}
      <AnimatePresence>
        {(stage === 'spark' || stage === 'aurora_birth') && (
          <>
            {/* Central brilliant spark */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'spark' ? 1 : 1.2,
                opacity: stage === 'spark' ? 1 : 0.8
              }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.5, ease: cinematicEase }}
            >
              <div
                className="w-48 h-48 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(251,191,36,0.95) 20%, rgba(217,70,239,0.7) 50%, rgba(168,85,247,0.4) 80%, transparent 100%)',
                  filter: mobile ? 'none' : 'blur(20px)',
                  boxShadow: '0 0 120px rgba(251, 191, 36, 1), 0 0 240px rgba(168, 85, 247, 0.8)'
                }}
              />
            </motion.div>

            {/* Spark particles radiating with choreography */}
            {stage === 'spark' && [...Array(getOptimalParticleCount(40))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(40)) * Math.PI * 2;
              const distance = 150 + (i % 3) * 50;
              return (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 0.8],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.015,
                    ease: cinematicEase
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: auroraColors[i % auroraColors.length].main,
                      boxShadow: `0 0 15px ${auroraColors[i % auroraColors.length].glow}`,
                      filter: 'blur(2px)'
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 3: AURORA BIRTH - First ribbons emerge with grace */}
      <AnimatePresence>
        {(stage === 'aurora_birth' || stage === 'cascade' || stage === 'symphony') && (
          <>
            {/* Background aurora layer (slower, deeper) */}
            {auroraColors.slice(0, 5).map((color, i) => (
              <motion.div
                key={`aurora-bg-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '260px',
                  top: `${-5 + i * 20}%`,
                  background: `linear-gradient(to bottom, transparent 0%, ${color.main}99 25%, ${color.main}e6 50%, ${color.main}99 75%, transparent 100%)`,
                  filter: mobile ? 'blur(12px)' : 'blur(60px)',
                  transformOrigin: 'center',
                  zIndex: 1
                }}
                initial={{ opacity: 0, scaleY: 0, y: -200 }}
                animate={{
                  opacity: stage === 'aurora_birth' ? 0.5 : stage === 'cascade' ? 0.7 : 0.85,
                  scaleY: [0, 1.3, 1.1],
                  y: 0,
                  scaleX: [0.7, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  ease: cinematicEase
                }}
              />
            ))}

            {/* Foreground aurora layer (faster, brighter) */}
            {auroraColors.slice(5).map((color, i) => (
              <motion.div
                key={`aurora-fg-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '200px',
                  top: `${5 + i * 18}%`,
                  background: `linear-gradient(to bottom, transparent 0%, ${color.main}b3 30%, ${color.main}e6 55%, ${color.main}b3 75%, transparent 100%)`,
                  filter: mobile ? 'blur(8px)' : 'blur(40px)',
                  transformOrigin: 'center',
                  zIndex: 2
                }}
                initial={{ opacity: 0, scaleY: 0, y: -150 }}
                animate={{
                  opacity: stage === 'aurora_birth' ? [0, 0.8] : stage === 'cascade' ? [0.8, 0.95] : [0.95, 1],
                  scaleY: [0, 1.4, 1.2],
                  y: 0,
                  scaleX: [0.6, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.15,
                  ease: cinematicEase
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 4: CASCADE - Aurora ribbons flow like waterfalls */}
      <AnimatePresence>
        {(stage === 'cascade' || stage === 'symphony') && (
          <>
            {/* Flowing diagonal ribbons */}
            {auroraColors.map((color, i) => (
              <motion.div
                key={`cascade-${i}`}
                className="absolute left-0 right-0"
                style={{
                  height: '180px',
                  top: `${-15 + i * 13}%`,
                  background: `linear-gradient(135deg, transparent 0%, ${color.main}cc 20%, ${color.main}f0 50%, ${color.main}99 75%, transparent 100%)`,
                  filter: mobile ? 'blur(8px)' : 'blur(35px)',
                  transformOrigin: 'left top',
                  zIndex: 3
                }}
                initial={{ opacity: 0, scaleX: 0, x: '-100%', rotate: -10 }}
                animate={{
                  opacity: stage === 'cascade' ? [0, 0.85, 0.7] : [0.7, 0.9, 0.75],
                  scaleX: [0, 1.6, 1.3],
                  x: ['0%', '15%', '0%'],
                  rotate: stage === 'symphony' ? [-10, 5, -5] : -10
                }}
                transition={{
                  opacity: { duration: 2, delay: i * 0.12 },
                  scaleX: { duration: 2.5, delay: i * 0.12, ease: cinematicEase },
                  x: {
                    duration: stage === 'symphony' ? 4 : 5,
                    delay: i * 0.15,
                    repeat: stage === 'symphony' ? 4 : 0,
                    ease: 'easeInOut'
                  },
                  rotate: {
                    duration: 5,
                    repeat: stage === 'symphony' ? 4 : 0,
                    ease: 'easeInOut'
                  }
                }}
              />
            ))}

            {/* Vertical flowing curtains — precomputed, no repeat:Infinity */}
            {curtainData.map((c, i) => (
              <motion.div
                key={`curtain-${c.id}`}
                className="absolute top-0 bottom-0"
                style={{
                  width: '120px',
                  left: `${5 + i * 10}%`,
                  background: `linear-gradient(to bottom, transparent 0%, ${auroraColors[i % auroraColors.length].main}cc 25%, ${auroraColors[i % auroraColors.length].main}f0 55%, ${auroraColors[i % auroraColors.length].main}80 80%, transparent 100%)`,
                  filter: mobile ? 'blur(8px)' : 'blur(35px)',
                  transformOrigin: 'top center',
                  zIndex: 4
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: stage === 'symphony' ? [0.4, 0.95, 0.6] : [0, 0.75],
                  scaleY: [0, 1.3, 1.1],
                  x: stage === 'symphony' ? [0, c.xShift, 0] : 0
                }}
                transition={{
                  duration: c.dur,
                  delay: 0.3 + i * 0.15,
                  repeat: stage === 'symphony' ? 3 : 0,
                  ease: cinematicEase
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 5: SYMPHONY - Full cosmic aurora explosion */}
      <AnimatePresence>
        {stage === 'symphony' && (
          <>
            {/* Swirling energy vortex — skip on mobile */}
            {!mobile && vortexParticles.map(({ id, angle, layer, radius }) => (
              <motion.div
                key={`vortex-${id}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: auroraColors[id % auroraColors.length].main,
                  boxShadow: `0 0 18px ${auroraColors[id % auroraColors.length].glow}`,
                  filter: 'blur(3px)',
                  zIndex: 10
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI) * radius,
                    Math.cos(angle) * radius
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI) * radius,
                    Math.sin(angle) * radius
                  ],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.7, 1.6, 0.7]
                }}
                transition={{
                  duration: 4 + layer * 0.5,
                  repeat: 4,
                  ease: 'linear',
                  delay: id * 0.04
                }}
              />
            ))}

            {/* Dancing light beams — skip on mobile */}
            {!mobile && [...Array(getOptimalParticleCount(16))].map((_, i) => {
              const angle = (i / getOptimalParticleCount(16)) * 360;
              return (
                <div
                  key={`beam-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: '100%',
                    height: '8px',
                    background: `linear-gradient(to right, ${auroraColors[i % auroraColors.length].glow}, transparent 50%)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(5px)',
                    zIndex: 5,
                    animation: `bac-beam-pulse ${2.5 + (i % 4) * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* STAGE 6: SUPERNOVA - Epic finale climax */}
      <AnimatePresence>
        {stage === 'supernova' && (
          <>
            {/* Intense rainbow rays — skip on mobile */}
            {!mobile && Array.from({ length: 36 }, (_, i) => {
              const angle = (i / 36) * 360;
              const colorIndex = i % auroraColors.length;
              const rayLength = 110 + (i % 3) * 20;
              const delay = i * 0.022;
              return (
                <div
                  key={`ray-${i}`}
                  className="absolute left-1/2 top-1/2 origin-left"
                  style={{
                    width: `${rayLength}%`,
                    height: '12px',
                    background: `linear-gradient(to right, ${auroraColors[colorIndex].glow}, transparent 65%)`,
                    transform: `rotate(${angle}deg)`,
                    filter: 'blur(4px)',
                    zIndex: 20,
                    animation: `bac-ray-in 0.7s ${delay}s ease-out forwards, bac-ray-fade 1.8s ${delay + 0.7}s ease-in-out 3`
                  }}
                />
              );
            })}

            {/* Massive central supernova core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: 1
              }}
              transition={{ duration: 1.5, ease: cinematicEase }}
              style={{ zIndex: 25 }}
            >
              <div
                className="w-[400px] h-[400px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(251,191,36,0.95) 12%, rgba(217,70,239,0.8) 25%, rgba(168,85,247,0.6) 40%, rgba(6,182,212,0.4) 60%, rgba(16,185,129,0.2) 80%, transparent 95%)',
                  filter: mobile ? 'none' : 'blur(50px)'
                }}
              />
            </motion.div>

            {/* Explosive rainbow particles — skip on mobile */}
            {!mobile && explosionParticles.map(({ id, angle, distance }) => {
              const colorIndex = id % auroraColors.length;
              return (
                <motion.div
                  key={`explosion-${id}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: auroraColors[colorIndex].main,
                    boxShadow: `0 0 25px ${auroraColors[colorIndex].glow}`,
                    filter: 'blur(3px)',
                    zIndex: 30
                  }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.8, 1],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2.2,
                    delay: id * 0.008,
                    ease: cinematicEase
                  }}
                />
              );
            })}

            {/* Title reveal with epic entrance */}
            <motion.div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-40 text-center px-8"
              initial={{ opacity: 0, scale: 0.3, y: 100, rotateX: mobile ? 0 : 45 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.6, 
                ease: cinematicEase 
              }}
            >
              <motion.p
                className="text-xl md:text-3xl text-white font-light tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: cinematicEase }}
                style={{
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.8), 0 0 100px rgba(251, 191, 36, 0.5)'
                }}
              >
                Another trip around the sun ✨
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Outro fade - smooth to black */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}