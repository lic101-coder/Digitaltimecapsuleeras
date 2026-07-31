/**
 * Gratitude - Lantern of Thanks Ceremony (ULTRA SMOOTH)
 * 
 * Breathtaking sky lantern release with 30 floating lanterns rising into starlit sky.
 * 
 * 
 * EXTREME PERFORMANCE OPTIMIZATIONS:
 * - Minimal DOM elements
 * - CSS-only animations wherever possible
 * - NO blur filters during heavy stages
 * - Drastically reduced particle counts
 * - GPU-accelerated transforms only
 * - Batched rendering
 */

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface GratitudeLanternCeremonyProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Lantern {
  id: number;
  message: string;
  delay: number;
  swayOffset: number;
  size: number;
  ascentSpeed: number;
  baseX: number;
  baseY: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function GratitudeLanternCeremony({
  isVisible,
  onComplete
}: GratitudeLanternCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'appear' | 'messages' | 'release' | 'ascend' | 'stars' | 'constellation' | 'radiance' | 'outro'>('intro');
  const [completed, setCompleted] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Animation timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1500, action: () => setStage('appear') },
      { time: 3500, action: () => setStage('messages') },
      { time: 5500, action: () => setStage('release') },
      { time: 9000, action: () => setStage('ascend') },
      { time: 11000, action: () => setStage('stars') },
      { time: 12000, action: () => setStage('constellation') },
      { time: 13000, action: () => setStage('radiance') },
      { time: 15000, action: () => setStage('outro') },
      { time: 16000, action: () => onComplete?.() }
    ];

    timeoutsRef.current = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    // Failsafe timeout - 1 second after last timeline action
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 17000);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Memoize lanterns
  const lanterns = useMemo((): Lantern[] => {
    const messages = [
      'Thank You', 'Grateful', 'Blessed', 'Appreciation', 'Thankful',
      'Grace', 'Gratitude', 'Cherished', 'Valued', 'Honored',
      'Joy', 'Love', 'Peace', 'Kindness', 'Hope',
      'Blessing', 'Fortune', 'Light', 'Warmth', 'Care',
      'Trust', 'Faith', 'Beauty', 'Wonder', 'Gift',
      'Abundance', 'Serenity', 'Harmony', 'Devotion', 'Spirit'
    ];

    return messages.map((message, i) => {
      const layer = Math.floor(i / 10);
      const indexInLayer = i % 10;
      const baseRadius = 180 + layer * 80;
      const spiralTurns = 1.5;
      const progress = indexInLayer / 10;
      
      const angle = progress * Math.PI * 2 * spiralTurns + (layer * Math.PI / 3);
      const radius = baseRadius + progress * 50;
      const baseX = Math.cos(angle) * radius;
      const baseY = Math.sin(angle) * radius + 120;

      return {
        id: i,
        message,
        delay: i * 0.08,
        swayOffset: Math.random() * Math.PI * 2,
        size: 1 + (layer * 0.15) + Math.random() * 0.2,
        ascentSpeed: 2.8 + Math.random() * 0.6,
        baseX,
        baseY
      };
    });
  }, []);

  // Memoize stars
  const stars = useMemo((): Star[] => {
    const newStars: Star[] = [];
    
    // REDUCED from 30 to 12 stars for performance
    for (let i = 0; i < 12; i++) {
      const t = (i / 12) * Math.PI * 2;
      const heartScale = 50; // Smaller heart, better positioned
      const x = heartScale * 16 * Math.pow(Math.sin(t), 3);
      const y = -heartScale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 - 100; // Adjusted Y position
      
      newStars.push({
        id: i,
        x,
        y,
        size: 1.5 + Math.random() * 0.5, // Smaller stars
        delay: i * 0.08 // Faster delay
      });
    }
    
    return newStars;
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const ltColors = useMemo(() => ['#fbbf24','#fb923c','#fde68a','#f59e0b','#ffffff','#fcd34d','#ffa040'], []);
  const ltFwPositions = useMemo(() => [
    {x:10,y:20},{x:25,y:12},{x:40,y:22},{x:56,y:10},{x:72,y:20},{x:87,y:14},{x:18,y:35},{x:82,y:30},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const ltFwSparks = useMemo(() => ltFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: ltColors[i % ltColors.length], delay: i*0.04 };
    })
  ), [ltFwPositions, ltColors, isMobile]);
  const ltFwRings = useMemo(() => ltFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#fbbf24','#fb923c','#fde68a'][i] }))
  ), [ltFwPositions]);
  const ltOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: ltColors[i % ltColors.length]
  })), [ltColors, isMobile]);

  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#fbbf24','#fb923c','#fde68a','#f59e0b','#ffffff','#fcd34d'];
    const base = { spread: 80, ticks: 200, gravity: 0.9, decay: 0.93, startVelocity: 38, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 120, angle: 120, origin: { x: 1, y: 0.7 } });
    if (!isMobile) {
      const t1 = setTimeout(() => confetti({ ...base, particleCount: 80, angle: 90, origin: { x: 0.5, y: 0.6 } }), 380);
      const t2 = setTimeout(() => {
        confetti({ ...base, particleCount: 100, angle: 60, origin: { x: 0, y: 0.65 } });
        confetti({ ...base, particleCount: 100, angle: 120, origin: { x: 1, y: 0.65 } });
      }, 950);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [stage]);

  // Memoize background stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#2d1a2e]">
      {/* Twilight sky - no animation during radiance */}
      <div
        className="absolute inset-0"
        style={{
          background: stage === 'release' || stage === 'ascend'
            ? 'linear-gradient(to bottom, #0a0e27 0%, #1a1f3a 40%, #3d2042 100%)'
            : 'linear-gradient(to bottom, #0a0e27 0%, #1a1f3a 60%, #2d1a2e 100%)',
          transition: 'background 3s ease'
        }}
      />

      {/* Background stars - CSS only */}
      <div className="absolute inset-0">
        {backgroundStars.map((star) => (
          <div
            key={`bg-star-${star.id}`}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Atmospheric glow - NO BLUR during radiance */}
      {stage !== 'radiance' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: stage === 'release' || stage === 'ascend' ? 0.8 : 0.4,
            transition: 'opacity 2.5s ease'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 70%, rgba(251, 191, 36, 0.25) 0%, rgba(245, 158, 11, 0.12) 40%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>
      )}

      {/* Ground silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 14, 39, 0.9) 100%)',
          opacity: stage === 'release' || stage === 'ascend' ? 0.3 : 0.5,
          transition: 'opacity 2s ease'
        }}
      />

      {/* Title */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 text-center z-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-200 drop-shadow-2xl px-6">
              Lantern of Thanks
            </h1>
            <p className="text-amber-300/80 mt-3 text-base">Release your gratitude to the heavens</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* 30 Sky Lanterns - SIMPLIFIED */}
        <AnimatePresence>
          {(stage === 'appear' || stage === 'messages' || stage === 'release' || stage === 'ascend') && lanterns.map((lantern) => {
            const ascentDistance = stage === 'ascend' ? -700 : stage === 'release' ? -350 : 0;
            const swayX = (stage === 'release' || stage === 'ascend') 
              ? Math.sin(lantern.swayOffset + lantern.baseY * 0.02) * 60 
              : 0;
            const swayY = (stage === 'release' || stage === 'ascend')
              ? Math.cos(lantern.swayOffset * 1.3) * 15
              : 0;

            return (
              <motion.div
                key={`lantern-${lantern.id}`}
                className="absolute z-30"
                initial={{ 
                  x: lantern.baseX, 
                  y: lantern.baseY + 150, 
                  scale: 0, 
                  opacity: 0 
                }}
                animate={{ 
                  x: lantern.baseX + swayX,
                  y: lantern.baseY + ascentDistance + swayY,
                  scale: stage === 'ascend' ? [lantern.size, lantern.size * 0.6, 0] : lantern.size,
                  opacity: stage === 'ascend' ? [1, 0.9, 0.6, 0] : 1
                }}
                transition={{
                  delay: lantern.delay,
                  duration: stage === 'ascend' ? lantern.ascentSpeed : stage === 'release' ? 3 : 1.8,
                  ease: stage === 'release' || stage === 'ascend' ? [0.22, 0.61, 0.36, 1] : 'easeOut'
                }}
              >
                {/* Simplified glow - CSS only, NO BLUR */}
                <div
                  className="absolute -inset-20 lantern-glow-simple"
                  style={{
                    animationDelay: `${lantern.delay}s`,
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)'
                  }}
                />

                {/* Lantern body */}
                <div className="relative" style={{ transform: `scale(${lantern.size})` }}>
                  <div className="w-28 h-36">
                    {/* Top handle */}
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-7"
                      style={{
                        borderTop: '2px solid rgba(139, 69, 19, 0.7)',
                        borderLeft: '2px solid rgba(139, 69, 19, 0.7)',
                        borderRight: '2px solid rgba(139, 69, 19, 0.7)',
                        borderRadius: '50% 50% 0 0'
                      }}
                    />

                    {/* Body - simplified */}
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'linear-gradient(180deg, rgba(254, 252, 232, 0.98) 0%, rgba(253, 230, 138, 0.92) 50%, rgba(245, 158, 11, 0.85) 100%)',
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.7)',
                        border: '1px solid rgba(245, 158, 11, 0.6)'
                      }}
                    >
                      {/* Wire frame - minimal */}
                      <div key={`wire-v-${lantern.id}`} className="absolute top-0 bottom-0 w-px bg-amber-900/15 left-1/2" />
                      <div key={`wire-h-${lantern.id}`} className="absolute left-0 right-0 h-px bg-amber-900/15 top-1/2" />
                    </div>

                    {/* Inner glow - CSS animation, minimal blur */}
                    <div
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-20 pointer-events-none flame-glow-simple"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 60%, rgba(255, 255, 255, 0.8) 0%, rgba(251, 191, 36, 0.5) 50%, transparent 80%)',
                        filter: 'blur(6px)'
                      }}
                    />

                    {/* Flame - CSS animation */}
                    <div
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-14 pointer-events-none flame-flicker-simple"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 70%, rgba(255, 255, 255, 1) 0%, rgba(251, 191, 36, 1) 40%, rgba(245, 158, 11, 0.6) 70%, transparent 90%)',
                        filter: 'blur(2px)',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                      }}
                    />

                    {/* Message */}
                    <AnimatePresence>
                      {(stage === 'messages' || stage === 'release' || stage === 'ascend') && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center px-3 z-10"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, delay: lantern.delay + 0.3 }}
                        >
                          <div 
                            className="text-center font-serif italic font-semibold"
                            style={{
                              fontSize: lantern.message.length > 8 ? '0.65rem' : '0.75rem',
                              lineHeight: '1.1',
                              color: 'rgba(120, 53, 15, 0.95)',
                              textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)'
                            }}
                          >
                            {lantern.message}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Minimal trail effects - only on select lanterns */}
                {stage === 'ascend' && lantern.id % 10 === 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 text-xl sparkle-trail-simple">
                    ✨
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Stars - ULTRA SIMPLIFIED */}
        <AnimatePresence>
          {(stage === 'stars' || stage === 'constellation' || stage === 'radiance') && stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute z-35"
              initial={{ 
                x: 0,
                y: -400,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: star.x,
                y: star.y,
                scale: star.size,
                opacity: 1
              }}
              transition={{
                delay: star.delay,
                duration: 0.8,
                ease: 'easeOut'
              }}
            >
              {/* Simple glow - NO BLUR, static */}
              <div
                className="absolute -inset-3"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 80%)'
                }}
              />
              <div className="text-2xl">⭐</div>
            </motion.div>
          ))}

          {/* Heart emoji - simplified */}
          {(stage === 'constellation' || stage === 'radiance') && (
            <motion.div
              className="absolute z-36 text-7xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                y: -100
              }}
              transition={{
                delay: 1.2,
                duration: 0.8,
                ease: 'easeOut'
              }}
              style={{
                filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))'
              }}
            >
              💛
            </motion.div>
          )}
        </AnimatePresence>

        {/* RADIANCE - ULTRA SIMPLIFIED */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* Main rays - DRASTICALLY REDUCED to 12 */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 360;
                
                return (
                  <div
                    key={`radiance-ray-${i}`}
                    className="absolute radiance-ray"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '120vw',
                      height: '3px',
                      marginLeft: '-60vw',
                      marginTop: '-1.5px',
                      background: `linear-gradient(to right, transparent, rgba(251, 191, 36, 0.7) 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                );
              })}

              {/* Central glow - NO BLUR */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 2.5,
                  opacity: 0.8
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <div 
                  className="w-80 h-80 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(251, 191, 36, 0.6) 40%, rgba(245, 158, 11, 0.3) 70%, transparent 90%)',
                    boxShadow: '0 0 100px rgba(251, 191, 36, 0.6)'
                  }}
                />
              </motion.div>

              {/* Sparkles - REDUCED to 6 */}
              {Array.from({ length: 6 }, (_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const distance = 160;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`radiance-sparkle-${i}`}
                    className="absolute text-2xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: 1.2,
                      opacity: 0.9
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.2 + i * 0.08,
                      ease: 'easeOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}

              {/* Lantern emojis - REDUCED to 4 */}
              {Array.from({ length: 4 }, (_, i) => {
                const angle = (i / 4) * Math.PI * 2;
                const distance = 200;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`radiance-lantern-emoji-${i}`}
                    className="absolute text-3xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: 1.1,
                      opacity: 0.85
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.4 + i * 0.1,
                      ease: 'easeOut'
                    }}
                  >
                    🏮
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Firework clusters for radiance */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {ltFwPositions.map((pos, pi) => (
              <React.Fragment key={`lt-fw-${pi}`}>
                {ltFwSparks[pi].map((s, si) => (
                  <motion.div key={`lt-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {ltFwRings[pi].map((r, ri) => (
                  <div key={`lt-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20, borderColor: r.color, animation: `lt-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`lt-flash-${pi}`} className="absolute rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${ltColors[pi % ltColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'lt-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {ltOrbs.map((orb, i) => (
              <div key={`lt-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left: `${orb.x}%`, bottom: '20%', width: 10, height: 10,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `lt-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

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
            <h2 className="text-3xl md:text-5xl font-black drop-shadow-[0_0_24px_rgba(251,191,36,0.9)] mb-3"
              style={{ background: 'linear-gradient(90deg,#fbbf24,#fb923c,#fde68a,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              🏮 Gratitude Illuminates the Sky 🏮
            </h2>
            <p className="text-xl text-yellow-200 drop-shadow-lg">
              Your thanks rises to the heavens ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIMPLIFIED CSS Animations */}
      <style>{`
        @keyframes lt-pop-ring {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes lt-flash {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes lt-orb-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes lantern-glow-simple {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
        
        @keyframes flame-glow-simple {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes flame-flicker-simple {
          0%, 100% { transform: translate(-50%, 0) scaleY(1); }
          50% { transform: translate(-50%, 0) scaleY(1.1); }
        }
        
        @keyframes sparkle-trail-simple {
          0% { opacity: 0; transform: translate(-50%, 0) scale(0); }
          50% { opacity: 1; transform: translate(-50%, 100px) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, 200px) scale(0.8); }
        }
        
        @keyframes radiance-ray-expand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .star-twinkle {
          animation: star-twinkle ease-in-out infinite;
        }
        
        .lantern-glow-simple {
          animation: lantern-glow-simple 3s ease-in-out infinite;
        }
        
        .flame-glow-simple {
          animation: flame-glow-simple 1.5s ease-in-out infinite;
        }
        
        .flame-flicker-simple {
          animation: flame-flicker-simple 0.3s ease-in-out infinite;
        }
        
        .sparkle-trail-simple {
          animation: sparkle-trail-simple 2.5s ease-out infinite;
        }

        .radiance-ray {
          animation: radiance-ray-expand 1.2s ease-out forwards;
          transform-origin: center center;
        }
      `}</style>
    </div>
  );
}