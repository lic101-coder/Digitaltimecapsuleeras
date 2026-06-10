/**
 * Time Traveler - Clock Hands Reveal Ceremony
 *
 * CONCEPT: Time itself is being commanded. A grand clockface awakens from darkness,
 * its hands sweep across eternity, golden radiance erupts, and the capsule title
 * emerges as a monument to preserved time.
 *
 * Stages:
 * 1. awakening  (0–3s):   Clock materializes, hands at 12, dust motes drift, glow pulses ring
 * 2. hands      (3–8s):   Hour/minute/second hands sweep dramatically, pendulum swings, epoch labels,
 *                          golden rays shoot at minute hand's halfway point
 * 3. radiance   (8–13s):  Conic sweep, tick-emit dots, time-stream lines, concentric rings, text
 * 4. reveal     (13–18s): Hourglass, capsule title, decorative ring border, floating hour markers
 * 5. outro      (18–19s): Fade to black
 *
 * Rules observed:
 * - All arrays via useMemo, Math.random() only inside useMemo
 * - repeat: Infinity only on ambient elements with duration >3s
 * - spring only supports 2 keyframes; 3+ keyframe arrays use ease: 'easeInOut' with times
 * - Max ~22 simultaneous animated elements
 * - Failsafe at 20s
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimeTravelerPassageCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function TimeTravelerPassageCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: TimeTravelerPassageCeremonyProps) {
  const [stage, setStage] = useState<
    'awakening' | 'hands' | 'radiance' | 'reveal' | 'outro'
  >('awakening');
  const [completed, setCompleted] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const clockDiameter = isMobile ? 220 : 290;
  const clockRadius = clockDiameter / 2;
  // SVG canvas is clockDiameter + 20 for breathing room
  const svgSize = clockDiameter + 20;
  const cx = svgSize / 2; // center x
  const cy = svgSize / 2; // center y

  // ── useMemo data ────────────────────────────────────────────────────────────

  // 12 ambient dust motes — fixed positions, repeat: Infinity (duration 5-8s)
  const dustMotes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        size: 2 + Math.random() * 3,
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    []
  );

  // 8 outer glow pulses at cardinal + diagonal positions around clock
  const glowPulses = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = clockRadius + 28;
        return {
          id: i,
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          delay: i * 0.2,
        };
      }),
    [clockRadius]
  );

  // 12 tick marks (4 main amber at 0/3/6/9, 8 minor silver)
  const tickMarks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outerR = clockRadius - 4;
        const innerR = clockRadius - (isMain ? 20 : 10);
        return {
          x1: cx + Math.cos(angle) * innerR,
          y1: cy + Math.sin(angle) * innerR,
          x2: cx + Math.cos(angle) * outerR,
          y2: cy + Math.sin(angle) * outerR,
          isMain,
        };
      }),
    [clockRadius, cx, cy]
  );

  // Roman numerals at XII / III / VI / IX
  const romanNumerals = useMemo(() => {
    const items = [
      { label: 'XII', idx: 0 },
      { label: 'III', idx: 3 },
      { label: 'VI', idx: 6 },
      { label: 'IX', idx: 9 },
    ];
    const r = clockRadius - 30;
    return items.map(({ label, idx }) => {
      const angle = (idx / 12) * Math.PI * 2 - Math.PI / 2;
      return { label, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
  }, [clockRadius, cx, cy]);

  // 4 epoch labels (PAST top, PRESENT right, FUTURE bottom, ALWAYS left)
  const epochLabels = useMemo(
    () => [
      { text: 'PAST',    dx: 0,                   dy: -(clockRadius + 48), delay: 0 },
      { text: 'PRESENT', dx: clockRadius + 52,     dy: 0,                  delay: 0.4 },
      { text: 'FUTURE',  dx: 0,                    dy: clockRadius + 48,   delay: 0.8 },
      { text: 'ALWAYS',  dx: -(clockRadius + 52),  dy: 0,                  delay: 1.2 },
    ],
    [clockRadius]
  );

  // 6 golden rays that shoot out when minute hand hits 360° (halfway through hands stage)
  const goldenRays = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = ((i * 60) * Math.PI) / 180;
        const len = isMobile ? 100 : 140;
        return {
          x2: Math.cos(angle) * len,
          y2: Math.sin(angle) * len,
          delay: i * 0.08,
        };
      }),
    [isMobile]
  );

  // 12 tick-emit dots that travel outward during radiance
  const tickEmitDots = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const dist = clockRadius * 0.95;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          delay: i * 0.1,
        };
      }),
    [clockRadius]
  );

  // 6 golden time-stream lines at 0°/60°/120°/180°/240°/300°
  const timeStreamLines = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = ((i * 60) * Math.PI) / 180;
        const len = isMobile ? 130 : 190;
        return {
          x2: Math.cos(angle) * len,
          y2: Math.sin(angle) * len,
          delay: i * 0.12,
        };
      }),
    [isMobile]
  );

  // 8 golden hour-marker dots for reveal stage (circular arrangement)
  const hourMarkers = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const r = isMobile ? 130 : 160;
        return {
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          delay: i * 0.12,
        };
      }),
    [isMobile]
  );

  // ── Stage timeline ──────────────────────────────────────────────────────────

  useEffect(() => {
    const schedule = [
      { time: 3000,  fn: () => setStage('hands') },
      { time: 8000,  fn: () => setStage('radiance') },
      { time: 13000, fn: () => setStage('reveal') },
      { time: 18000, fn: () => setStage('outro') },
      { time: 19000, fn: () => { setCompleted(true); onComplete?.(); } },
    ];
    const ids = schedule.map(({ time, fn }) => setTimeout(fn, time));

    // Failsafe at 20s
    const failsafe = setTimeout(() => {
      setStage('outro');
      setCompleted(true);
      onComplete?.();
    }, 20000);

    return () => {
      ids.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const ClockFaceSVG = ({ opacity = 1 }: { opacity?: number }) => (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity,
        filter: 'drop-shadow(0 0 18px rgba(147,197,253,0.5))',
      }}
    >
      {/* Deep dark fill */}
      <circle cx={cx} cy={cy} r={clockRadius} fill="rgba(10,12,25,0.85)" />
      {/* Outer amber ring */}
      <circle
        cx={cx} cy={cy} r={clockRadius}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="3"
        style={{ filter: 'drop-shadow(0 0 8px #f59e0b)' }}
      />
      {/* Inner decorative ring */}
      <circle
        cx={cx} cy={cy} r={clockRadius - 10}
        fill="none"
        stroke="rgba(245,158,11,0.25)"
        strokeWidth="1"
      />
      {/* Second inner ring */}
      <circle
        cx={cx} cy={cy} r={clockRadius - 16}
        fill="none"
        stroke="rgba(147,197,253,0.12)"
        strokeWidth="0.75"
        strokeDasharray="4 8"
      />
      {/* Tick marks */}
      {tickMarks.map((t, i) => (
        <line
          key={i}
          x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={t.isMain ? '#f59e0b' : '#7ca8d4'}
          strokeWidth={t.isMain ? 3.5 : 1.5}
          strokeLinecap="round"
          style={t.isMain ? { filter: 'drop-shadow(0 0 5px #f59e0b)' } : undefined}
        />
      ))}
      {/* Roman numerals */}
      {romanNumerals.map((rn, i) => (
        <text
          key={i}
          x={rn.x} y={rn.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f59e0b"
          fontSize={isMobile ? 12 : 15}
          fontFamily="Georgia, serif"
          style={{ filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.7))' }}
        >
          {rn.label}
        </text>
      ))}
    </svg>
  );

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a1208 0%, #0d0b04 50%, #050403 100%)',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* ── AMBIENT DUST MOTES (all stages, repeat: Infinity, duration >3s) ── */}
      {dustMotes.map((mote) => (
        <motion.div
          key={`mote-${mote.id}`}
          style={{
            position: 'absolute',
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            borderRadius: '50%',
            background: '#f59e0b',
            pointerEvents: 'none',
            zIndex: 1,
          }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ══════════════════════════════════════════════════════════════
          STAGE 1: AWAKENING (0–3s)
          Clock face materializes, "TIME AWAKENS", 8 outer glow pulses
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'awakening' && (
          <motion.div
            key="awakening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            {/* "TIME AWAKENS" title */}
            <motion.div
              style={{
                color: '#f59e0b',
                fontSize: isMobile ? 18 : 22,
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                textShadow: '0 0 20px #f59e0b, 0 0 50px rgba(245,158,11,0.5)',
                marginBottom: isMobile ? 28 : 36,
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              TIME AWAKENS
            </motion.div>

            {/* Clock face + outer glow pulses container */}
            <div style={{ position: 'relative', width: svgSize, height: svgSize }}>
              {/* Clock face — scale entrance: 0.4→1.05→1.0 (3 keyframes → ease, not spring) */}
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0 }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.05, 1.0], opacity: 1 }}
                transition={{
                  scale: { duration: 1.4, ease: 'easeInOut', times: [0, 0.7, 1] },
                  opacity: { duration: 0.8 },
                }}
              >
                <ClockFaceSVG />
                {/* Center hub */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#f59e0b',
                    marginTop: -5,
                    marginLeft: -5,
                    boxShadow: '0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.6)',
                    zIndex: 10,
                  }}
                />
                {/* Both hands at 12 o'clock (rotate: 0 = pointing up) */}
                {/* Hour hand at 12 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 5,
                    height: clockRadius * 0.55,
                    marginLeft: -2.5,
                    marginTop: -(clockRadius * 0.55),
                    background: 'linear-gradient(to top, #d97706, #fbbf24)',
                    borderRadius: '3px 3px 1px 1px',
                    transformOrigin: 'bottom center',
                    transform: 'rotate(0deg)',
                    boxShadow: '0 0 8px rgba(245,158,11,0.6)',
                    zIndex: 6,
                  }}
                />
                {/* Minute hand at 12 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 3.5,
                    height: clockRadius * 0.8,
                    marginLeft: -1.75,
                    marginTop: -(clockRadius * 0.8),
                    background: 'linear-gradient(to top, #60a5fa, #bfdbfe)',
                    borderRadius: '2px 2px 1px 1px',
                    transformOrigin: 'bottom center',
                    transform: 'rotate(0deg)',
                    boxShadow: '0 0 6px rgba(147,197,253,0.6)',
                    zIndex: 5,
                  }}
                />
              </motion.div>

              {/* 8 outer glow pulses — blink in staggered */}
              {glowPulses.map((gp) => (
                <motion.div
                  key={`gp-${gp.id}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#fbbf24',
                    marginTop: gp.y - 4,
                    marginLeft: gp.x - 4,
                    boxShadow: '0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.5)',
                    pointerEvents: 'none',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.7] }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + gp.delay,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STAGE 2: HANDS (3–8s)
          Hands sweep dramatically, pendulum swings, epoch labels fade in,
          golden rays shoot at halfway point
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'hands' && (
          <motion.div
            key="hands"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            {/* Epoch labels — appear with stagger */}
            {epochLabels.map((ep, i) => (
              <motion.div
                key={`epoch-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${ep.dx}px), calc(-50% + ${ep.dy}px))`,
                  fontFamily: 'Georgia, serif',
                  fontSize: isMobile ? 10 : 12,
                  fontStyle: 'italic',
                  color: '#f59e0b',
                  letterSpacing: '0.2em',
                  textShadow: '0 0 10px rgba(245,158,11,0.6)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                transition={{ duration: 0.7, delay: ep.delay }}
              >
                {ep.text}
              </motion.div>
            ))}

            {/* Clock face */}
            <div style={{ position: 'relative', width: svgSize, height: svgSize }}>
              <ClockFaceSVG />

              {/* Hour hand: rotate 0→330 over 3s */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 5,
                  height: clockRadius * 0.55,
                  marginLeft: -2.5,
                  marginTop: -(clockRadius * 0.55),
                  background: 'linear-gradient(to top, #d97706, #fbbf24)',
                  borderRadius: '3px 3px 1px 1px',
                  transformOrigin: 'bottom center',
                  boxShadow: '0 0 10px rgba(245,158,11,0.7)',
                  zIndex: 6,
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 330 }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              />

              {/* Minute hand: rotate 0→720 (2 full rotations) over 3.5s */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 3.5,
                  height: clockRadius * 0.8,
                  marginLeft: -1.75,
                  marginTop: -(clockRadius * 0.8),
                  background: 'linear-gradient(to top, #60a5fa, #bfdbfe)',
                  borderRadius: '2px 2px 1px 1px',
                  transformOrigin: 'bottom center',
                  boxShadow: '0 0 8px rgba(147,197,253,0.7)',
                  zIndex: 5,
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 720 }}
                transition={{ duration: 3.5, ease: 'easeInOut' }}
              />

              {/* Second hand: 2px red, rotate 0→1080 (3 rotations) over 2.5s */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 2,
                  height: clockRadius * 0.9,
                  marginLeft: -1,
                  marginTop: -(clockRadius * 0.9),
                  background: '#ef4444',
                  borderRadius: '1px 1px 0 0',
                  transformOrigin: 'bottom center',
                  boxShadow: '0 0 6px rgba(239,68,68,0.8)',
                  zIndex: 7,
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 1080 }}
                transition={{ duration: 2.5, ease: 'linear' }}
              />

              {/* Center hub */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#f59e0b',
                  marginTop: -5,
                  marginLeft: -5,
                  boxShadow: '0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.6)',
                  zIndex: 10,
                }}
              />

              {/* 6 golden rays shoot from center when minute hand is at 360° (~1.75s delay) */}
              {goldenRays.map((ray, i) => (
                <svg
                  key={`ray-${i}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    overflow: 'visible',
                    width: 1,
                    height: 1,
                    pointerEvents: 'none',
                    zIndex: 8,
                  }}
                >
                  <motion.line
                    x1="0" y1="0"
                    x2={ray.x2} y2={ray.y2}
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 8px #f59e0b)' }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.2,
                      delay: 1.75 + ray.delay,
                      ease: 'easeOut',
                    }}
                  />
                </svg>
              ))}
            </div>

            {/* Pendulum below clock: swings [-18, 18, -18], repeat: 3 (bounded) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: svgSize / 2 - 4,
                marginLeft: -2,
                transformOrigin: 'top center',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              <motion.div
                style={{ transformOrigin: 'top center' }}
                animate={{ rotate: [-18, 18, -18] }}
                transition={{ duration: 1.4, repeat: 3, ease: 'easeInOut' }}
              >
                <div
                  style={{
                    width: 3,
                    height: isMobile ? 44 : 60,
                    background: 'linear-gradient(to bottom, rgba(245,158,11,0.4), #f59e0b)',
                    borderRadius: 2,
                    margin: '0 auto',
                  }}
                />
                <div
                  style={{
                    width: isMobile ? 16 : 20,
                    height: isMobile ? 16 : 20,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #fbbf24, #d97706)',
                    boxShadow: '0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.5)',
                    marginLeft: isMobile ? -6.5 : -8.5,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STAGE 3: RADIANCE (8–13s)
          Conic sweep, tick-emit dots, time-stream lines, 3 expanding rings,
          "TIME FLOWS THROUGH ALL THINGS", clock fades to 50%
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            {/* Clock face fading to 50% */}
            <motion.div
              style={{ position: 'absolute' }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            >
              <div style={{ position: 'relative', width: svgSize, height: svgSize }}>
                <ClockFaceSVG />
                {/* Center hub */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#f59e0b',
                    marginTop: -5,
                    marginLeft: -5,
                    boxShadow: '0 0 12px #f59e0b',
                    zIndex: 10,
                  }}
                />
              </div>
            </motion.div>

            {/* Conic gradient sweep — 0→720deg over 4s, single-play */}
            <motion.div
              style={{
                position: 'absolute',
                width: clockDiameter,
                height: clockDiameter,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, transparent 0%, rgba(245,158,11,0.55) 12%, rgba(251,191,36,0.3) 28%, transparent 44%)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 15,
              }}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 720, opacity: [0, 1, 0.85, 0] }}
              transition={{ duration: 4, ease: 'linear' }}
            />

            {/* 12 tick-emit dots — travel outward, staggered */}
            {tickEmitDots.map((dot, i) => (
              <motion.div
                key={`tdot-${i}`}
                style={{
                  position: 'absolute',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#fbbf24',
                  boxShadow: '0 0 10px #f59e0b, 0 0 20px rgba(245,158,11,0.5)',
                  pointerEvents: 'none',
                  zIndex: 16,
                  marginTop: -3.5,
                  marginLeft: -3.5,
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{
                  x: dot.x,
                  y: dot.y,
                  scale: [0, 1.2, 0.8],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2.5, delay: dot.delay, ease: 'easeOut' }}
              />
            ))}

            {/* 6 golden time-stream lines — shoot outward */}
            {timeStreamLines.map((line, i) => (
              <svg
                key={`ts-${i}`}
                style={{
                  position: 'absolute',
                  overflow: 'visible',
                  width: 1,
                  height: 1,
                  pointerEvents: 'none',
                  zIndex: 17,
                }}
              >
                <motion.line
                  x1="0" y1="0"
                  x2={line.x2} y2={line.y2}
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px #f59e0b)' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.0, delay: 0.5 + line.delay, ease: 'easeOut' }}
                />
              </svg>
            ))}

            {/* 3 concentric expanding rings — single-play */}
            {[0, 0.5, 1.0].map((ringDelay, i) => (
              <motion.div
                key={`ring-${i}`}
                style={{
                  position: 'absolute',
                  width: clockDiameter * 0.4,
                  height: clockDiameter * 0.4,
                  borderRadius: '50%',
                  border: '1px solid #f59e0b',
                  pointerEvents: 'none',
                  zIndex: 14,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
                transition={{ duration: 2.5, delay: ringDelay, ease: 'easeOut' }}
              />
            ))}

            {/* "TIME FLOWS THROUGH ALL THINGS" */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: isMobile ? '12%' : '10%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: isMobile ? 11 : 13,
                color: '#f59e0b',
                letterSpacing: '0.15em',
                textShadow: '0 0 12px rgba(245,158,11,0.6)',
                pointerEvents: 'none',
                zIndex: 20,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            >
              TIME FLOWS THROUGH ALL THINGS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STAGE 4: REVEAL (13–18s)
          Hourglass, capsule title, golden ring border, hour markers,
          "PRESERVED THROUGH TIME", "Time stands still for this moment"
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
          >
            {/* Background amber radial pulse (100px→800px single-play) */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(180,83,9,0.1) 50%, transparent 75%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
              initial={{ width: 100, height: 100, opacity: 0.8 }}
              animate={{ width: 800, height: 800, opacity: 0 }}
              transition={{ duration: 3, ease: 'easeOut' }}
            />

            {/* 8 golden hour-marker dots (2-keyframe spring = scale 0→1) */}
            {hourMarkers.map((marker, i) => (
              <motion.div
                key={`hm-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#fbbf24',
                  boxShadow: '0 0 12px #f59e0b, 0 0 24px rgba(245,158,11,0.4)',
                  marginTop: marker.y - 5,
                  marginLeft: marker.x - 5,
                  pointerEvents: 'none',
                  zIndex: 25,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: marker.delay }}
              />
            ))}

            {/* Hourglass — scale 0→1.3→1.0 (3 keyframes → ease with times) */}
            <motion.div
              style={{
                fontSize: isMobile ? 56 : 72,
                lineHeight: 1,
                filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.8)) drop-shadow(0 0 40px rgba(245,158,11,0.4))',
                zIndex: 26,
                marginBottom: isMobile ? 16 : 22,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1.0], opacity: 1 }}
              transition={{
                scale: { duration: 0.8, ease: 'easeInOut', times: [0, 0.65, 1] },
                opacity: { duration: 0.5 },
              }}
            >
              ⌛
            </motion.div>

            {/* Title wrapper with animated golden border ring */}
            <div style={{ position: 'relative', zIndex: 26 }}>
              {/* Animated ring border — scaleX 0→1 then scaleY 0→1 */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: isMobile ? '-14px -20px' : '-18px -28px',
                  border: '1.5px solid rgba(245,158,11,0.6)',
                  borderRadius: 12,
                  boxShadow: '0 0 16px rgba(245,158,11,0.3), inset 0 0 16px rgba(245,158,11,0.08)',
                  pointerEvents: 'none',
                  scaleX: 0,
                  scaleY: 0,
                }}
                animate={{ scaleX: [0, 1, 1], scaleY: [0, 0, 1] }}
                transition={{
                  duration: 1.0,
                  delay: 0.4,
                  ease: 'easeInOut',
                  times: [0, 0.5, 1],
                }}
              />

              {/* Capsule title — time-warp entrance (3 keyframes → ease with times) */}
              <motion.h2
                style={{
                  color: '#f59e0b',
                  fontFamily: 'Georgia, serif',
                  fontSize: isMobile ? 28 : 42,
                  fontWeight: 700,
                  textAlign: 'center',
                  textShadow:
                    '0 0 20px #f59e0b, 0 0 50px rgba(245,158,11,0.6), 0 0 90px rgba(245,158,11,0.3)',
                  lineHeight: 1.2,
                  maxWidth: isMobile ? 300 : 520,
                }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.1, 1.0], opacity: 1 }}
                transition={{
                  scale: { duration: 0.9, ease: 'easeInOut', times: [0, 0.65, 1] },
                  opacity: { duration: 0.6 },
                }}
              >
                {capsuleTitle}
              </motion.h2>
            </div>

            {/* "PRESERVED THROUGH TIME" */}
            <motion.p
              style={{
                color: '#93c5fd',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: isMobile ? 14 : 18,
                letterSpacing: '0.12em',
                marginTop: isMobile ? 18 : 24,
                textShadow: '0 0 14px rgba(147,197,253,0.5)',
                zIndex: 26,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              PRESERVED THROUGH TIME
            </motion.p>

            {/* "Time stands still for this moment" */}
            <motion.p
              style={{
                color: 'rgba(245,158,11,0.7)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: isMobile ? 12 : 14,
                marginTop: isMobile ? 10 : 12,
                letterSpacing: '0.06em',
                zIndex: 26,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Time stands still for this moment
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          STAGE 5: OUTRO (18–19s)
          Fade to black
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro"
            className="absolute inset-0 z-50"
            style={{ background: '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
