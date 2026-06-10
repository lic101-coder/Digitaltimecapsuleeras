/**
 * Eternal Flame - Binary Hearts Supernova Ceremony
 *
 * "Digital Supernova" pattern — mobile-safe animation rewrite.
 * Stages: intro → hearts → supernova → radiance → outro
 *
 * RULES:
 * - All particle arrays via useMemo, no Math.random() in JSX
 * - repeat: Infinity only on slow ambient pulses (>3s, subtle)
 * - Max ~25 elements at peak
 * - Failsafe onComplete at ~18s
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EternalFlamePassionateCeremonyProps {
  capsuleTitle?: string;
  media?: any[];
  isPreview?: boolean;
  isVisible?: boolean;
  onComplete?: () => void;
}

export function EternalFlamePassionateCeremony({
  capsuleTitle = '',
  media = [],
  isPreview = false,
  isVisible = true,
  onComplete,
}: EternalFlamePassionateCeremonyProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const [stage, setStage] = useState<
    'intro' | 'hearts' | 'supernova' | 'radiance' | 'outro' | 'complete'
  >('intro');

  // "LOVE = INFINITE" decode text state: 0=random, 1=partial, 2=final
  const [decodeState, setDecodeState] = useState(0);

  // ─── Pre-computed particle data ───────────────────────────────────────────

  // Star field: 3 size tiers, 60/80 count
  const starField = useMemo(() => {
    const count = isMobile ? 60 : 80;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r = 30 + ((i * 137) % 100) * 0.55;
      const tier = i % 7 === 0 ? 5 : i % 3 === 0 ? 3 : 2; // medium / small / tiny
      return {
        size: tier,
        left: 50 + Math.cos(angle) * r,
        top: 50 + Math.sin(angle) * r * 0.7,
        twinkleDuration: 5 + (i % 5), // always >5s — ambient allowed
        twinkleDelay: i * 0.07,
      };
    });
  }, []);

  // 16 inner binary labels drifting inward from circle (radius ~38%)
  const binaryInner = useMemo(() => {
    const count = 16;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = isMobile ? 170 : 240;
      return {
        label: i % 3 === 0 ? '1' : i % 5 === 0 ? '0' : i % 2 === 0 ? '1' : '0',
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(angle) * (radius * 0.35),
        endY: Math.sin(angle) * (radius * 0.35),
        delay: i * 0.14,
        color: i % 2 === 0 ? '#00ff41' : '#00e5ff',
      };
    });
  }, []);

  // 8 outer ring binary labels — dim, slower, radius ~45%
  const binaryOuter = useMemo(() => {
    const count = 8;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = isMobile ? 210 : 290;
      return {
        label: i % 2 === 0 ? '0' : '1',
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(angle) * (radius * 0.55),
        endY: Math.sin(angle) * (radius * 0.55),
        delay: i * 0.22 + 0.4,
        color: i % 2 === 0 ? '#00ff41' : '#00e5ff',
      };
    });
  }, []);

  // Magnetic pull arcs — 3 SVG curved paths between hearts
  const magneticArcs = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      // arc curves between ~(-28,0) and (28,0) with varying control point Y
      d: `M -28 ${-8 + i * 8} Q 0 ${-30 + i * 20} 28 ${-8 + i * 8}`,
      color: i % 2 === 0 ? '#ff69b4' : '#00e5ff',
      delay: 0.4 + i * 0.15,
      strokeWidth: 1.5 - i * 0.3,
    }));
  }, []);

  // Love sparks: 8 dots at fixed 45° angles
  const loveSparks = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = isMobile ? 60 : 80;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        delay: i * 0.04,
        color: i % 2 === 0 ? '#ff69b4' : '#ffd700',
      };
    });
  }, []);

  // Pulse ring count for hearts stage
  const pulseRingCount = 3;

  // 6 shockwave rings × 8 binary labels — pre-computed
  const supernovaRings = useMemo(() => {
    return Array.from({ length: 6 }, (_, ringIdx) => ({
      delay: ringIdx * 0.3,
      color: ringIdx % 2 === 0 ? '#ff69b4' : '#e91e63',
      labels: Array.from({ length: 8 }, (_, labelIdx) => {
        const angle = (labelIdx / 8) * Math.PI * 2;
        const distance = isMobile ? 160 : 220;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          label: labelIdx % 2 === 0 ? '1' : '0',
          color: labelIdx % 3 === 0 ? '#00ff41' : labelIdx % 3 === 1 ? '#00e5ff' : '#ff69b4',
          delay: ringIdx * 0.3 + labelIdx * 0.04,
        };
      }),
    }));
  }, []);

  // Radiance orbit ring — 12 items (binary + heart emojis), useMemo positions
  const orbitRing = useMemo(() => {
    const items = ['1', '0', '❤️', '1', '0', '💛', '1', '0', '❤️', '1', '0', '💛'];
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const r = isMobile ? 90 : 120;
      return {
        label: items[i],
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        isEmoji: items[i].length > 1,
        color: items[i] === '1' ? '#00ff41' : items[i] === '0' ? '#00e5ff' : '#ffd700',
      };
    });
  }, []);

  // Golden settle particles — 8 dots, scatter → center
  const settleParticles = useMemo(() => {
    // deterministic scatter: use golden angle spread
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const scatterDist = 40 + ((i * 53) % 20); // 40–59
      return {
        startX: Math.cos(angle) * scatterDist,
        startY: -scatterDist - 10 - ((i * 37) % 30), // y: -40 to -70
        color: i % 2 === 0 ? '#ffd700' : '#ffb347',
        size: 4 + (i % 3) * 2,
        delay: i * 0.1 + 0.4,
      };
    });
  }, []);

  // ─── LOVE = INFINITE decode text cycling ──────────────────────────────────
  const decodeTexts = useMemo(
    () => [
      '10110 = 01101010', // random binary chars
      'L0VE = INF1N1TE',  // partial decode
      'LOVE = INFINITE',  // final
    ],
    []
  );

  // ─── Timeline ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const timeline = [
      { time: 0,     action: () => setStage('intro') },
      { time: 2800,  action: () => setStage('hearts') },
      { time: 5800,  action: () => setStage('supernova') },
      { time: 9500,  action: () => setStage('radiance') },
      { time: 13000, action: () => setStage('outro') },
      {
        time: 13800, action: () => {
          setStage('complete');
          onComplete?.();
        },
      },
    ];

    const ids = timeline.map(({ time, action }) => setTimeout(action, time));

    // Failsafe at 18s
    const failsafe = setTimeout(() => {
      setStage('complete');
      onComplete?.();
    }, 18000);

    return () => {
      ids.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Decode text cycling — triggered when supernova stage starts
  useEffect(() => {
    if (stage !== 'supernova') {
      setDecodeState(0);
      return;
    }
    // Start cycling after 1.8s delay
    const startDelay = setTimeout(() => {
      let cycle = 0;
      const interval = setInterval(() => {
        cycle++;
        if (cycle === 1) setDecodeState(0);
        else if (cycle === 2) setDecodeState(1);
        else if (cycle === 3) setDecodeState(0);
        else if (cycle === 4) {
          setDecodeState(2);
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }, 1800);

    return () => clearTimeout(startDelay);
  }, [stage]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0a001a 0%, #000 80%)' }}
    >
      {/* ── Star field — 3 size tiers, ambient repeat:Infinity (>5s) ─────── */}
      {useMemo(
        () =>
          starField.map((star, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white pointer-events-none"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: star.twinkleDuration,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: 'easeInOut',
              }}
            />
          )),
        []
      )}

      {/* ── Stage 1: Intro — title + subtitle + 16 inner + 8 outer binary ── */}
      <AnimatePresence>
        {(stage === 'intro' || stage === 'hearts') && (
          <motion.div
            key="title"
            className="absolute top-12 left-0 right-0 text-center z-30 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1
              style={{
                color: '#fff',
                fontSize: isMobile ? '1.5rem' : '2.2rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textShadow: '0 0 24px rgba(255,105,180,0.7)',
                padding: '0 1rem',
                margin: 0,
              }}
            >
              {capsuleTitle}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
              style={{
                color: '#ff69b4',
                fontSize: isMobile ? '0.65rem' : '0.78rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                textShadow: '0 0 12px rgba(255,105,180,0.6)',
                marginTop: '0.4rem',
              }}
            >
              LOVE ENCODED IN EVERY BIT
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 16 inner binary labels drifting inward — single play */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="binary-inner"
            className="absolute left-1/2 top-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {binaryInner.map((b, i) => (
              <motion.span
                key={`inner-${i}`}
                className="absolute font-mono font-bold pointer-events-none select-none"
                style={{
                  fontSize: isMobile ? '0.8rem' : '1rem',
                  color: b.color,
                  textShadow: `0 0 8px ${b.color}`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ x: b.startX, y: b.startY, opacity: 0 }}
                animate={{ x: b.endX, y: b.endY, opacity: [0, 0.9, 0.65] }}
                transition={{ duration: 2.8, delay: b.delay, ease: 'easeInOut' }}
              >
                {b.label}
              </motion.span>
            ))}

            {/* 8 outer ring labels — dim, slower */}
            {binaryOuter.map((b, i) => (
              <motion.span
                key={`outer-${i}`}
                className="absolute font-mono pointer-events-none select-none"
                style={{
                  fontSize: isMobile ? '0.65rem' : '0.8rem',
                  color: b.color,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ x: b.startX, y: b.startY, opacity: 0 }}
                animate={{ x: b.endX, y: b.endY, opacity: [0, 0.2, 0.15] }}
                transition={{ duration: 4.8, delay: b.delay, ease: 'easeInOut' }}
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 2: Two hearts meet + magnetic arcs + love sparks ───────── */}
      <AnimatePresence>
        {(stage === 'hearts' || stage === 'supernova') && (
          <motion.div
            key="hearts-meet"
            className="absolute left-1/2 top-1/2 z-25"
            style={{ translateX: '-50%', translateY: '-50%' }}
          >
            {/* Left heart (❤️) */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: isMobile ? '4rem' : '5.5rem',
                filter: 'drop-shadow(0 0 18px #ff1744)',
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ x: isMobile ? -140 : -200, opacity: 0, scale: 0.6 }}
              animate={
                stage === 'supernova'
                  ? { x: 0, opacity: 0, scale: 2.5 }
                  : { x: isMobile ? -24 : -30, opacity: 1, scale: 1 }
              }
              transition={
                stage === 'supernova'
                  ? { duration: 0.4, ease: 'easeIn' }
                  : { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }
              }
            >
              ❤️
            </motion.div>

            {/* Right heart (💙) */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: isMobile ? '4rem' : '5.5rem',
                filter: 'drop-shadow(0 0 18px #1e88e5)',
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ x: isMobile ? 140 : 200, opacity: 0, scale: 0.6 }}
              animate={
                stage === 'supernova'
                  ? { x: 0, opacity: 0, scale: 2.5 }
                  : { x: isMobile ? 24 : 30, opacity: 1, scale: 1 }
              }
              transition={
                stage === 'supernova'
                  ? { duration: 0.4, ease: 'easeIn' }
                  : { type: 'spring', stiffness: 260, damping: 20, delay: 0.35 }
              }
            >
              💙
            </motion.div>

            {/* Magnetic pull SVG arcs — 3 curved paths animate strokeDashoffset */}
            {stage === 'hearts' && (
              <svg
                className="absolute pointer-events-none"
                style={{
                  width: 80,
                  height: 60,
                  left: '-40px',
                  top: '-30px',
                  overflow: 'visible',
                }}
                viewBox="-40 -30 80 60"
              >
                {magneticArcs.map((arc, i) => (
                  <motion.path
                    key={`arc-${i}`}
                    d={arc.d}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={arc.strokeWidth}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.6, 0] }}
                    transition={{
                      duration: 2.6,
                      delay: arc.delay + 1.2,
                      ease: 'easeInOut',
                      times: [0, 0.4, 0.7, 1],
                    }}
                  />
                ))}
              </svg>
            )}

            {/* Pulse rings from meeting point — single play, staggered */}
            {Array.from({ length: pulseRingCount }, (_, i) => (
              <motion.div
                key={`pulse-ring-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 80,
                  height: 80,
                  border: `2px solid ${i % 2 === 0 ? '#ff69b4' : '#00e5ff'}`,
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 3], opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.8, delay: 0.6 + i * 0.45, ease: 'easeOut' }}
              />
            ))}

            {/* Love sparks — 8 dots burst at 45° angles on collision */}
            {stage === 'hearts' &&
              loveSparks.map((spark, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 8,
                    height: 8,
                    background: spark.color,
                    boxShadow: `0 0 8px ${spark.color}`,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: spark.x,
                    y: spark.y,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.0,
                    delay: spark.delay + 1.8,
                    ease: 'easeOut',
                  }}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 3: Supernova ───────────────────────────────────────────────
           6 shockwave rings + 48 binary labels + white flash + decode text  */}
      <AnimatePresence>
        {stage === 'supernova' && (
          <motion.div
            key="supernova"
            className="absolute left-1/2 top-1/2 z-30"
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Full-screen white flash — single play */}
            <motion.div
              className="fixed inset-0 pointer-events-none"
              style={{ background: '#fff', zIndex: 40 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Central flash glow */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,105,180,0.6) 40%, transparent 70%)',
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 3.5, 0], opacity: [1, 0.7, 0] }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
            />

            {/* 6 shockwave rings, staggered 0.3s */}
            {supernovaRings.map((ring, ri) => (
              <motion.div
                key={`shock-ring-${ri}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 100,
                  height: 100,
                  border: `3px solid ${ring.color}`,
                  translateX: '-50%',
                  translateY: '-50%',
                  boxShadow: `0 0 12px ${ring.color}`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, isMobile ? 5 : 7], opacity: [0, 0.9, 0.4, 0] }}
                transition={{ duration: 2.0, delay: ring.delay, ease: 'easeOut' }}
              />
            ))}

            {/* 48 binary labels riding outward (8 per ring × 6 rings) */}
            {supernovaRings.flatMap((ring, ri) =>
              ring.labels.map((lbl, li) => (
                <motion.span
                  key={`bin-${ri}-${li}`}
                  className="absolute font-mono font-bold pointer-events-none select-none"
                  style={{
                    fontSize: isMobile ? '0.75rem' : '0.95rem',
                    color: lbl.color,
                    textShadow: `0 0 10px ${lbl.color}`,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: lbl.x, y: lbl.y, opacity: [0, 1, 0.8, 0] }}
                  transition={{ duration: 2.2, delay: lbl.delay, ease: 'easeOut' }}
                >
                  {lbl.label}
                </motion.span>
              ))
            )}

            {/* "LOVE = INFINITE" decode text — appears at delay 1.8s */}
            <motion.div
              className="absolute pointer-events-none select-none text-center"
              style={{
                translateX: '-50%',
                top: isMobile ? 90 : 120,
                width: isMobile ? 200 : 260,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.4 }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  fontWeight: 700,
                  color: decodeState === 2 ? '#ffd700' : '#00ff41',
                  textShadow:
                    decodeState === 2
                      ? '0 0 20px rgba(255,215,0,0.9)'
                      : '0 0 12px rgba(0,255,65,0.7)',
                  letterSpacing: '0.1em',
                  transition: 'color 0.15s, text-shadow 0.15s',
                }}
              >
                {decodeTexts[decodeState]}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 4: Radiance ─────────────────────────────────────────────────
           Orbit ring + settle particles + glowing heart + titles           */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            className="absolute inset-0 flex flex-col items-center justify-center z-35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Slowly rotating orbit ring of 12 items — repeat:Infinity ambient (8s) */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ width: 0, height: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              {orbitRing.map((item, i) => (
                <span
                  key={`orbit-${i}`}
                  className="absolute select-none"
                  style={{
                    left: item.x,
                    top: item.y,
                    transform: 'translate(-50%, -50%)',
                    fontSize: item.isEmoji
                      ? isMobile ? '0.9rem' : '1.1rem'
                      : isMobile ? '0.7rem' : '0.85rem',
                    fontFamily: 'monospace',
                    fontWeight: item.isEmoji ? 400 : 700,
                    color: item.isEmoji ? undefined : item.color,
                    textShadow: item.isEmoji ? undefined : `0 0 8px ${item.color}`,
                    opacity: 0.85,
                  }}
                >
                  {item.label}
                </span>
              ))}
            </motion.div>

            {/* Ambient heart glow — slow pulse, safe repeat:Infinity */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: isMobile ? 200 : 280,
                height: isMobile ? 200 : 280,
                background:
                  'radial-gradient(circle, rgba(255,23,68,0.35) 0%, rgba(233,30,99,0.15) 50%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 8 golden particles settling into center */}
            {settleParticles.map((p, i) => (
              <motion.div
                key={`settle-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
                initial={{ x: p.startX, y: p.startY, opacity: 1 }}
                animate={{ x: 0, y: 0, opacity: 0 }}
                transition={{ duration: 1.4, delay: p.delay, ease: 'easeIn' }}
              />
            ))}

            {/* Large glowing heart */}
            <motion.div
              className="pointer-events-none select-none relative z-10"
              style={{
                fontSize: isMobile ? '7rem' : '10rem',
                filter:
                  'drop-shadow(0 0 40px #ff1744) drop-shadow(0 0 80px rgba(255,23,68,0.5))',
              }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
            >
              ❤️
            </motion.div>

            {/* Capsule title with glow */}
            <motion.div
              className="text-center mt-6 pointer-events-none px-4 relative z-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: 'easeOut' }}
            >
              <h2
                style={{
                  color: '#fff',
                  fontSize: isMobile ? '1.5rem' : '2.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textShadow:
                    '0 0 32px rgba(255,105,180,0.9), 0 0 16px rgba(255,23,68,0.7)',
                  marginBottom: '0.5rem',
                  margin: 0,
                }}
              >
                {capsuleTitle}
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.9, ease: 'easeOut' }}
                style={{
                  color: '#ffd700',
                  fontSize: isMobile ? '0.65rem' : '0.78rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  textShadow: '0 0 14px rgba(255,215,0,0.7)',
                  marginTop: '0.6rem',
                }}
              >
                YOUR LOVE, WRITTEN IN THE STARS
              </motion.p>
              <p
                style={{
                  color: '#00e5ff',
                  fontSize: isMobile ? '0.7rem' : '0.85rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textShadow: '0 0 14px rgba(0,229,255,0.7)',
                  fontFamily: 'monospace',
                  marginTop: '0.4rem',
                }}
              >
                01001100 01 01001111 01 01010110 01 01000101
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Stage 5: Outro fade ───────────────────────────────────────────── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro-overlay"
            className="absolute inset-0 bg-black z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
