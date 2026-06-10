/**
 * Mixtape - Arcade INSERT COIN Ceremony (Epic) — Enhanced Round 2
 *
 * CONCEPT: Retro 8-bit arcade with INSERT COIN energy, neon pixel aesthetic.
 * Stages:
 * 1. insert-coin  (0-2s):    Attract mode scanline, HIGH SCORE board, coin bounce squish, star blinks
 * 2. pacman       (2-5s):    Pac-Man eats 8 dots, 1UP score ticker, ghost label, energizer dots, LEVEL 1
 * 3. tetris       (5-9s):    Blocks + HOLD box + LINES counter + +100 float + LEVEL UP badge
 * 4. invaders     (9-12s):   Shields, LIVES, UFO fly-by, wobble x repeat:2, explosions
 * 5. gameover     (12-15s):  CONTINUE countdown, flicker, INSERT COIN blink, 16 pixel bursts
 * 6. radiance     (15-17s):  Orbiting stars, PRESS START, pixel-border title box
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MixtapeEpicCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function MixtapeEpicCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: MixtapeEpicCeremonyProps) {
  const [stage, setStage] = useState<
    'insert-coin' | 'pacman' | 'tetris' | 'invaders' | 'gameover' | 'radiance' | 'outro'
  >('insert-coin');
  const [completed, setCompleted] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ── Ghost scared state for power pellet effect
  const [ghostScared, setGhostScared] = useState(false);

  // ── Cherry bonus: show "200 PTS" after pac-man passes
  const [cherryEaten, setCherryEaten] = useState(false);

  // ── Pac-Man score: ticks up +10 per dot eaten
  const [pacScore, setPacScore] = useState(0);

  // ── Tetris score: ticks up by 100 every 420ms during tetris stage
  const [tetrisScore, setTetrisScore] = useState(0);

  // ── Tetris LINES counter: ticks up by 1 every 1.5s during tetris stage (max 4)
  const [tetrisLines, setTetrisLines] = useState(0);

  // ── Shield health for space invaders (starts at 2, decrements as lasers pass)
  const [shieldHealth, setShieldHealth] = useState(2);

  // ── Score display for GAME OVER stage
  const [score, setScore] = useState(0);

  // ── CONTINUE countdown (9 → 0)
  const [countdown, setCountdown] = useState(9);

  // ── UFO bonus shown
  const [ufoBonusShown, setUfoBonusShown] = useState(false);

  // ── Pac-Man dots: 8 pre-computed fixed x positions
  const pacDots = useMemo(() => {
    return [10, 22, 33, 44, 55, 66, 77, 88].map((xPct, i) => ({
      id: i,
      xPct,
      disappearDelay: 0.3 + i * 0.28,
    }));
  }, []);

  // ── Energizer dots for pac-man stage (4 positions, static blink)
  const energizerDots = useMemo(() => {
    return [
      { id: 0, xPct: 5  },
      { id: 1, xPct: 48 },
      { id: 2, xPct: 52 },
      { id: 3, xPct: 94 },
    ];
  }, []);

  // ── Tetris blocks: 5 rows
  const tetrisBlocks = useMemo(() => {
    const palette = ['#ff0000', '#00ffff', '#ff8800', '#0000ff', '#00ff00'];
    const widths = ['80%', '70%', '90%', '65%', '85%'];
    return palette.map((color, i) => ({
      id: i,
      color,
      width: widths[i],
      delay: i * 0.42,
    }));
  }, []);

  // ── Pixel burst stars: 16 fixed positions for GAME OVER stage
  const pixelBursts = useMemo(() => {
    const colors = [
      '#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#ff8800', '#ffffff',
      '#00ff00', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ffffff',
      '#ff0000', '#00ff88', '#ff66ff', '#ffcc00',
    ];
    const positions = [
      { x: 12, y: 18 }, { x: 82, y: 14 }, { x: 6,  y: 72 }, { x: 90, y: 68 },
      { x: 48, y: 8  }, { x: 50, y: 88 }, { x: 22, y: 46 }, { x: 76, y: 52 },
      { x: 35, y: 30 }, { x: 65, y: 25 }, { x: 20, y: 60 }, { x: 78, y: 78 },
      { x: 8,  y: 40 }, { x: 92, y: 38 }, { x: 40, y: 92 }, { x: 60, y: 5  },
    ];
    return positions.map((pos, i) => ({ ...pos, color: colors[i], id: i }));
  }, []);

  // ── Corner brackets for INSERT COIN stage
  const cornerBrackets = useMemo(() => [
    { char: '⌐', style: { top: '12%', left: '8%' }  },
    { char: '¬', style: { top: '12%', right: '8%' } },
    { char: 'L', style: { bottom: '12%', left: '8%' }  },
    { char: 'J', style: { bottom: '12%', right: '8%' } },
  ], []);

  // ── Radiance corner decorations
  const radianceCorners = useMemo(() => [
    { label: '1UP',  style: { top: '10%',    left: '6%'   } },
    { label: '2UP',  style: { top: '10%',    right: '6%'  } },
    { label: '★★★', style: { bottom: '15%', left: '6%'   } },
    { label: '∞',    style: { bottom: '15%', right: '6%'  } },
  ], []);

  // ── Orbiting achievement stars for radiance (6 stars at fixed cos/sin angles)
  const orbitStars = useMemo(() => {
    const chars = ['✦', '★', '⭐', '✦', '★', '⭐'];
    const colors = ['#ffd700', '#ffffff', '#ffd700', '#ffffff', '#ffd700', '#ffffff'];
    return chars.map((char, i) => {
      const angleDeg = i * 60;
      const angleRad = (angleDeg * Math.PI) / 180;
      const radius = 80; // px from center
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      return { id: i, char, color: colors[i], x, y };
    });
  }, []);

  const scoreIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const linesIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pacScoreIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shieldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeline = [
      {
        time: 0,
        action: () => {
          setStage('insert-coin');
          setGhostScared(false);
          setCherryEaten(false);
          setTetrisScore(0);
          setTetrisLines(0);
          setPacScore(0);
          setShieldHealth(2);
          setCountdown(9);
          setUfoBonusShown(false);
        },
      },
      {
        time: 2000,
        action: () => {
          setStage('pacman');
          // Pac score ticks +10 per dot (8 dots over ~2.5s → every ~280ms)
          let ps = 0;
          const pi = setInterval(() => {
            ps += 10;
            if (ps >= 80) {
              ps = 80;
              clearInterval(pi);
            }
            setPacScore(ps);
          }, 280);
          pacScoreIntervalRef.current = pi;
        },
      },
      {
        time: 5000,
        action: () => {
          if (pacScoreIntervalRef.current) clearInterval(pacScoreIntervalRef.current);
          setStage('tetris');
          setTetrisScore(0);
          setTetrisLines(0);
          let ts = 0;
          const ti = setInterval(() => {
            ts += 100;
            if (ts >= 1000) {
              ts = 1000;
              clearInterval(ti);
            }
            setTetrisScore(ts);
          }, 420);
          scoreIntervalRef.current = ti;
          // Lines counter: +1 every 1.5s, max 4
          let lines = 0;
          const li = setInterval(() => {
            lines += 1;
            setTetrisLines(lines);
            if (lines >= 4) clearInterval(li);
          }, 1500);
          linesIntervalRef.current = li;
        },
      },
      {
        time: 9000,
        action: () => {
          if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
          if (linesIntervalRef.current) clearInterval(linesIntervalRef.current);
          setStage('invaders');
          setShieldHealth(2);
          // Decrement shield health as lasers fire
          shieldTimerRef.current = setTimeout(() => setShieldHealth(1), 500);
          setTimeout(() => setShieldHealth(0), 900);
          // UFO exits at ~3s (delay 0.5s + 2.5s duration), show bonus text
          setTimeout(() => setUfoBonusShown(true), 3100);
        },
      },
      {
        time: 12000,
        action: () => {
          setStage('gameover');
          setCountdown(9);
          setScore(0);
          let s = 0;
          const si = setInterval(() => {
            s += 33330;
            if (s >= 999990) {
              s = 999990;
              clearInterval(si);
            }
            setScore(s);
          }, 83);
          scoreIntervalRef.current = si;
          // Countdown starts at 1s delay
          setTimeout(() => {
            let cd = 9;
            const ci = setInterval(() => {
              cd -= 1;
              setCountdown(cd);
              if (cd <= 0) clearInterval(ci);
            }, 1000);
            countdownIntervalRef.current = ci;
          }, 1000);
        },
      },
      {
        time: 15000,
        action: () => {
          if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setStage('radiance');
        },
      },
      {
        time: 17000,
        action: () => {
          setStage('outro');
          setCompleted(true);
          onComplete?.();
        },
      },
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Ghost scared at 2000 + 2200ms = 4200ms
    const ghostTimer = setTimeout(() => setGhostScared(true), 4200);
    // Cherry eaten at 2000 + 1800ms = 3800ms
    const cherryTimer = setTimeout(() => setCherryEaten(true), 3800);

    // Failsafe at ~17.5s
    const failsafe = setTimeout(() => {
      [scoreIntervalRef, linesIntervalRef, pacScoreIntervalRef, countdownIntervalRef].forEach(
        (ref) => { if (ref.current) clearInterval(ref.current); }
      );
      setStage('outro');
      setCompleted(true);
      onComplete?.();
    }, 17500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(ghostTimer);
      clearTimeout(cherryTimer);
      clearTimeout(failsafe);
      if (shieldTimerRef.current) clearTimeout(shieldTimerRef.current);
      [scoreIntervalRef, linesIntervalRef, pacScoreIntervalRef, countdownIntervalRef].forEach(
        (ref) => { if (ref.current) clearInterval(ref.current); }
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const screenH = typeof window !== 'undefined' ? window.innerHeight : 600;
  const lastBlock = tetrisBlocks[tetrisBlocks.length - 1];
  const lineClearDelay = lastBlock.delay + 0.8;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: '#050508',
        backgroundImage: `
          linear-gradient(rgba(0,255,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
        fontFamily: 'monospace',
      }}
    >
      {/* CSS keyframes */}
      <style>{`
        @keyframes arc-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes arc-neon-pulse {
          0%, 100% { text-shadow: 0 0 10px #00ff00, 0 0 24px #00ff00; }
          50%       { text-shadow: 0 0 20px #00ff00, 0 0 50px #00ff00, 0 0 80px #00ff00; }
        }
        @keyframes arc-gameover-flash {
          0%, 100% { opacity: 1; color: #ff0000; text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000; }
          50%       { opacity: 0.3; color: #ff8800; text-shadow: none; }
        }
        @keyframes gof-flicker {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes arc-highscore-glow {
          0%, 100% { text-shadow: 0 0 15px #ffff00, 0 0 30px #ffff00; }
          50%       { text-shadow: 0 0 30px #ffff00, 0 0 60px #ffff00, 0 0 90px #ff8800; }
        }
        @keyframes arc-lineclear {
          0%   { opacity: 0; transform: scale(0.7); }
          20%  { opacity: 1; transform: scale(1.15); }
          80%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; }
        }
        @keyframes arc-scanline {
          0%   { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes arc-white-flash {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes arc-marquee {
          0%   { transform: translateX(110%); }
          100% { transform: translateX(-110%); }
        }
        @keyframes arc-gold-glow {
          0%, 100% { text-shadow: 0 0 10px #ffd700, 0 0 22px #ffd700; }
          50%       { text-shadow: 0 0 22px #ffd700, 0 0 48px #ff8800, 0 0 70px #ffd700; }
        }
        @keyframes arc-orbit {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes arc-star-blink {
          0%, 40%  { opacity: 1; }
          50%, 90% { opacity: 0.15; }
          100%     { opacity: 1; }
        }
      `}</style>

      {/* CRT scanline overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)',
        }}
      />

      {/* ══════════════════════════════════════════════
          STAGE 1 — INSERT COIN
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'insert-coin' && (
          <motion.div
            key="insert-coin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4"
          >
            {/* Attract mode scanline — single horizontal bar sweeping top → bottom */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: -4,
                height: '3px',
                background: 'rgba(255,255,255,0.5)',
                pointerEvents: 'none',
                zIndex: 30,
                animationName: 'arc-scanline',
                animationDuration: '1s',
                animationDelay: '0.1s',
                animationTimingFunction: 'linear',
                animationIterationCount: 1,
                animationFillMode: 'forwards',
              }}
            />

            {/* HIGH SCORE board */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{
                position: 'absolute',
                top: isMobile ? '8%' : '10%',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontSize: isMobile ? '12px' : '15px',
                color: '#00ff00',
                letterSpacing: '3px',
                fontFamily: 'monospace',
                textShadow: '0 0 8px #00ff00',
              }}
            >
              HIGH SCORE &nbsp;&nbsp; AAA &nbsp; 999990
            </motion.div>

            {/* Corner brackets */}
            {cornerBrackets.map((bracket, i) => (
              <motion.div
                key={`bracket-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.15 + i * 0.12 }}
                style={{
                  position: 'absolute',
                  ...bracket.style,
                  fontSize: isMobile ? '22px' : '30px',
                  color: '#00ff00',
                  textShadow: '0 0 8px #00ff00',
                  fontWeight: 900,
                }}
              >
                {bracket.char}
              </motion.div>
            ))}

            {/* Falling coin with squish bounce */}
            <motion.div
              initial={{ y: '-200px', opacity: 1 }}
              animate={{ y: '0px', scaleY: [1, 0.6, 1.2, 0.9, 1] }}
              transition={{
                y: { duration: 0.7, delay: 0.4, ease: 'easeOut' },
                scaleY: { duration: 0.45, delay: 0.9, ease: 'easeOut', times: [0, 0.25, 0.6, 0.8, 1] },
              }}
              style={{
                position: 'absolute',
                top: 'calc(50% - 90px)',
                fontSize: isMobile ? '28px' : '36px',
                lineHeight: 1,
                transformOrigin: 'bottom center',
              }}
            >
              🪙
            </motion.div>

            {/* PLAYER 1 label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{
                fontSize: isMobile ? '11px' : '14px',
                color: '#00ff00',
                letterSpacing: '4px',
                textShadow: '0 0 8px #00ff00',
              }}
            >
              PLAYER 1
            </motion.div>

            {/* Arcade title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: isMobile ? '44px' : '72px',
                fontWeight: 900,
                letterSpacing: '8px',
                color: '#00ff00',
                animation: 'arc-neon-pulse 1.4s ease-in-out infinite',
              }}
            >
              ARCADE
            </motion.div>

            {/* Capsule title */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: isMobile ? '13px' : '16px',
                color: '#00ffff',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textShadow: '0 0 10px #00ffff',
              }}
            >
              {capsuleTitle}
            </motion.div>

            {/* INSERT COIN blink */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.6 }}
              style={{
                fontSize: isMobile ? '18px' : '26px',
                fontWeight: 'bold',
                color: '#ffff00',
                letterSpacing: '5px',
                animation: 'arc-blink 0.65s step-start infinite',
                textShadow: '0 0 12px #ffff00',
              }}
            >
              INSERT COIN ▶
            </motion.div>

            {/* 3 decorative blink stars around INSERT COIN text */}
            {(['✦', '✦', '✦'] as const).map((star, i) => (
              <motion.div
                key={`star-deco-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.65 }}
                style={{
                  position: 'absolute',
                  // left, center, right of the INSERT COIN band
                  left: i === 0 ? '12%' : i === 1 ? '50%' : 'auto',
                  right: i === 2 ? '12%' : 'auto',
                  top: isMobile ? 'calc(50% + 34px)' : 'calc(50% + 42px)',
                  transform: i === 1 ? 'translateX(-50%)' : undefined,
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#ffff00',
                  textShadow: '0 0 8px #ffff00',
                  animationName: 'arc-star-blink',
                  animationDuration: `${0.7 + i * 0.18}s`,
                  animationDelay: `${0.2 * i}s`,
                  animationTimingFunction: 'step-start',
                  animationIterationCount: 'infinite',
                }}
              >
                {star}
              </motion.div>
            ))}

            {/* CREDITS: 01 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              style={{
                fontSize: isMobile ? '11px' : '14px',
                color: '#ffff00',
                letterSpacing: '3px',
                textShadow: '0 0 6px #ffff00',
              }}
            >
              CREDITS: 01
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 2 — PAC-MAN
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'pacman' && (
          <motion.div
            key="pacman"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20"
          >
            {/* 1UP score top-left */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? 12 : 18,
                left: isMobile ? 12 : 20,
                fontSize: isMobile ? '10px' : '13px',
                color: '#ffffff',
                letterSpacing: '2px',
                textShadow: '0 0 6px #ffffff',
                lineHeight: 1.4,
              }}
            >
              <div style={{ color: '#00ffff' }}>1UP</div>
              <div style={{ color: '#ffff00' }}>{String(pacScore * 100 + 12500).padStart(6, '0')}</div>
            </div>

            {/* LEVEL 1 — top right */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? 12 : 18,
                right: isMobile ? 12 : 20,
                fontSize: isMobile ? '10px' : '13px',
                color: '#ffff00',
                letterSpacing: '2px',
                textShadow: '0 0 6px #ffff00',
              }}
            >
              LEVEL 1
            </div>

            {/* Stage label */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 20 : 32, left: 0, right: 0,
                textAlign: 'center', fontSize: isMobile ? '12px' : '15px',
                color: '#00ffff', letterSpacing: '4px', textShadow: '0 0 8px #00ffff',
              }}
            >
              PAC-MAN
            </div>

            {/* Maze wall — top */}
            <div
              style={{
                position: 'absolute', top: '40%', left: '4%', right: '4%',
                height: '2px',
                background: 'rgba(0,255,0,0.5)',
                boxShadow: '0 0 6px #00ff00',
              }}
            />

            {/* Maze wall — bottom */}
            <div
              style={{
                position: 'absolute', top: '60%', left: '4%', right: '4%',
                height: '2px',
                background: 'rgba(0,255,0,0.5)',
                boxShadow: '0 0 6px #00ff00',
              }}
            />

            {/* Horizontal track */}
            <div
              style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                height: '2px', background: 'rgba(0,255,0,0.15)',
              }}
            />

            {/* 4 energizer blink dots (CSS only, no JS animation) */}
            {energizerDots.map((ed) => (
              <div
                key={`energizer-${ed.id}`}
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 5px)',
                  left: `${ed.xPct}%`,
                  width: isMobile ? '8px' : '10px',
                  height: isMobile ? '8px' : '10px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 0 6px #ffffff',
                  animationName: 'arc-blink',
                  animationDuration: '0.45s',
                  animationTimingFunction: 'step-start',
                  animationIterationCount: 'infinite',
                  animationDelay: `${ed.id * 0.11}s`,
                }}
              />
            ))}

            {/* 8 pac dots */}
            {pacDots.map((dot) => (
              <motion.div
                key={`dot-${dot.id}`}
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 6px)',
                  left: `${dot.xPct}%`,
                  fontSize: isMobile ? '10px' : '14px',
                  lineHeight: 1,
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.15, delay: dot.disappearDelay }}
              >
                ⚪
              </motion.div>
            ))}

            {/* Power pellet at 90% */}
            <motion.div
              style={{
                position: 'absolute',
                top: 'calc(50% - 10px)',
                left: '90%',
                fontSize: isMobile ? '14px' : '18px',
                lineHeight: 1,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 2.3 }}
            >
              ⭕
            </motion.div>

            {/* Cherry bonus */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translateX(-50%)',
                fontSize: isMobile ? '20px' : '26px',
                lineHeight: 1,
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: cherryEaten ? 0 : 1 }}
              transition={{ duration: 0.2, delay: 0 }}
            >
              🍒
            </motion.div>

            {/* 200 PTS pop-up */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                top: '32%',
                transform: 'translateX(-50%)',
                fontSize: isMobile ? '11px' : '14px',
                color: '#ffff00',
                letterSpacing: '2px',
                textShadow: '0 0 8px #ffff00',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -10, -10, -18] }}
              transition={{ duration: 0.7, delay: 1.8, times: [0, 0.15, 0.75, 1] }}
            >
              200 PTS
            </motion.div>

            {/* Ghost name label — above ghost */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? 'calc(50% - 36px)' : 'calc(50% - 44px)',
                fontSize: isMobile ? '9px' : '11px',
                letterSpacing: '1px',
                fontWeight: 900,
                color: ghostScared ? '#6666ff' : '#ff3333',
                textShadow: ghostScared ? '0 0 6px #6666ff' : '0 0 6px #ff3333',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
              initial={{ left: '-10%' }}
              animate={{ left: '68%' }}
              transition={{ duration: 2.6, ease: 'linear' }}
            >
              {ghostScared ? 'SCARED!' : 'BLINKY'}
            </motion.div>

            {/* Pac-Man */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? 'calc(50% - 14px)' : 'calc(50% - 18px)',
                fontSize: isMobile ? '28px' : '36px',
                lineHeight: 1,
              }}
              initial={{ left: '5%' }}
              animate={{ left: '85%' }}
              transition={{ duration: 2.6, ease: 'linear' }}
            >
              🟡
            </motion.div>

            {/* Ghost */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? 'calc(50% - 14px)' : 'calc(50% - 18px)',
                fontSize: isMobile ? '24px' : '32px',
                lineHeight: 1,
              }}
              initial={{ left: '-10%' }}
              animate={{ left: '68%' }}
              transition={{ duration: 2.6, ease: 'linear' }}
            >
              {ghostScared ? '💙' : '👻'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 3 — TETRIS
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'tetris' && (
          <motion.div
            key="tetris"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20"
          >
            {/* SCORE label top-left */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 16 : 24, left: isMobile ? 16 : 28,
                fontSize: isMobile ? '11px' : '14px',
                color: '#00ff00', letterSpacing: '3px',
                textShadow: '0 0 6px #00ff00',
              }}
            >
              SCORE
            </div>
            <div
              style={{
                position: 'absolute', top: isMobile ? 30 : 42, left: isMobile ? 16 : 28,
                fontSize: isMobile ? '14px' : '18px',
                color: '#ffff00', letterSpacing: '2px',
                textShadow: '0 0 8px #ffff00',
              }}
            >
              {String(tetrisScore).padStart(5, '0')}
            </div>

            {/* LINES counter below SCORE */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 52 : 70, left: isMobile ? 16 : 28,
                fontSize: isMobile ? '10px' : '12px',
                color: '#00ffff', letterSpacing: '2px',
                textShadow: '0 0 5px #00ffff',
              }}
            >
              LINES: {tetrisLines}
            </div>

            {/* HOLD box — top left below lines */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 76 : 100, left: isMobile ? 16 : 28,
                border: '1px solid #ff00ff',
                padding: '4px 8px',
                minWidth: isMobile ? '40px' : '52px',
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? '8px' : '10px',
                  color: '#ff00ff', letterSpacing: '2px',
                  marginBottom: '4px',
                }}
              >
                HOLD
              </div>
              <div
                style={{
                  width: isMobile ? '12px' : '16px',
                  height: isMobile ? '12px' : '16px',
                  background: '#ff00ff',
                  margin: '0 auto',
                  boxShadow: '0 0 6px #ff00ff',
                }}
              />
            </div>

            {/* Next piece preview — top right */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 28,
                border: '1px solid #00ffff',
                padding: '6px 10px',
                minWidth: isMobile ? '48px' : '64px',
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? '9px' : '11px',
                  color: '#00ffff', letterSpacing: '2px',
                  marginBottom: '5px',
                }}
              >
                NEXT
              </div>
              <div
                style={{
                  width: isMobile ? '14px' : '18px',
                  height: isMobile ? '14px' : '18px',
                  background: '#ff8800',
                  margin: '0 auto',
                  boxShadow: '0 0 6px #ff8800',
                }}
              />
            </div>

            {/* TETRIS label */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 20 : 32, left: 0, right: 0,
                textAlign: 'center',
                fontSize: isMobile ? '12px' : '15px',
                color: '#ff8800',
                letterSpacing: '4px',
                textShadow: '0 0 8px #ff8800',
              }}
            >
              TETRIS
            </div>

            {/* Well border left */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(50% - 175px)',
                top: '25%', bottom: '25%',
                width: '2px',
                background: '#00ffff',
                boxShadow: '0 0 6px #00ffff',
              }}
            />
            {/* Well border right */}
            <div
              style={{
                position: 'absolute',
                right: 'calc(50% - 175px)',
                top: '25%', bottom: '25%',
                width: '2px',
                background: '#00ffff',
                boxShadow: '0 0 6px #00ffff',
              }}
            />

            {/* Block rows */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8">
              <div style={{ height: isMobile ? '24px' : '32px' }} />
              {tetrisBlocks.map((block) => (
                <motion.div
                  key={`block-${block.id}`}
                  style={{
                    width: block.width,
                    maxWidth: '340px',
                    height: isMobile ? '22px' : '28px',
                    background: block.color,
                    boxShadow: `0 0 10px ${block.color}, 0 0 20px ${block.color}55`,
                    borderRadius: '2px',
                  }}
                  initial={{ y: -120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: block.delay,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* +100 floating text on line clear */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: isMobile ? '28%' : '30%',
                transform: 'translateX(-50%)',
                fontSize: isMobile ? '16px' : '22px',
                fontWeight: 900,
                color: '#ffff00',
                textShadow: '0 0 10px #ffff00',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 1, 0], y: [0, -20, -30, -40] }}
              transition={{ duration: 0.6, delay: lineClearDelay, times: [0, 0.1, 0.7, 1] }}
            >
              +100
            </motion.div>

            {/* LEVEL UP! badge — appears at 3.5s delay, scale spring, fades at 4s */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: isMobile ? '20px' : '28px',
                fontWeight: 900,
                color: '#00ff00',
                letterSpacing: '4px',
                border: '2px solid #00ff00',
                padding: isMobile ? '6px 14px' : '8px 20px',
                textShadow: '0 0 14px #00ff00',
                boxShadow: '0 0 20px #00ff00',
                background: 'rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
              transition={{
                scale: { delay: 3.5, duration: 0.6, times: [0, 0.4, 0.7, 0.85, 1], ease: [0.34, 1.56, 0.64, 1] },
                opacity: { delay: 3.5, duration: 0.6, times: [0, 0.4, 0.7, 0.85, 1] },
              }}
            >
              LEVEL UP!
            </motion.div>

            {/* White flash overlay on LINE CLEAR */}
            <div
              style={{
                position: 'absolute', inset: 0,
                background: '#ffffff',
                animationName: 'arc-white-flash',
                animationDuration: '0.3s',
                animationDelay: `${lineClearDelay}s`,
                animationFillMode: 'both',
                animationTimingFunction: 'ease-out',
                animationIterationCount: 1,
                opacity: 0,
                pointerEvents: 'none',
              }}
            />

            {/* LINE CLEAR! text */}
            <div
              style={{
                position: 'absolute', bottom: isMobile ? '18%' : '20%',
                left: 0, right: 0, textAlign: 'center',
                fontSize: isMobile ? '22px' : '30px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '6px',
                animation: `arc-lineclear 1.2s ease-in-out 1 forwards`,
                animationDelay: `${lineClearDelay}s`,
                opacity: 0,
                textShadow: '0 0 20px #ffffff, 0 0 40px #00ffff',
              }}
            >
              LINE CLEAR!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 4 — SPACE INVADERS
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'invaders' && (
          <motion.div
            key="invaders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          >
            {/* WAVE 1 header */}
            <div
              style={{
                position: 'absolute', top: isMobile ? 20 : 32, left: 0, right: 0,
                textAlign: 'center',
                fontSize: isMobile ? '12px' : '15px',
                color: '#00ff00',
                letterSpacing: '4px',
                textShadow: '0 0 8px #00ff00',
              }}
            >
              WAVE 1 — SPACE INVADERS
            </div>

            {/* LIVES top-left */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? 14 : 20,
                left: isMobile ? 12 : 20,
                fontSize: isMobile ? '10px' : '13px',
                color: '#ff3333',
                letterSpacing: '1px',
                textShadow: '0 0 6px #ff3333',
              }}
            >
              LIVES: ❤️❤️❤️
            </div>

            {/* UFO flying across top right → left */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? '14%' : '16%',
                fontSize: isMobile ? '20px' : '26px',
                lineHeight: 1,
              }}
              initial={{ left: '110%' }}
              animate={{ left: '-10%' }}
              transition={{ duration: 2.5, delay: 0.5, ease: 'linear' }}
            >
              🛸
            </motion.div>

            {/* BONUS +300 text after UFO exits */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? '13%' : '15%',
                left: isMobile ? '8%' : '5%',
                fontSize: isMobile ? '11px' : '14px',
                color: '#ffff00',
                letterSpacing: '2px',
                textShadow: '0 0 8px #ffff00',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: ufoBonusShown ? [0, 1, 1, 0] : 0 }}
              transition={{ duration: 0.8, times: [0, 0.1, 0.7, 1] }}
            >
              BONUS +300
            </motion.div>

            {/* Invader grid with wobble x repeat:2 */}
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{ duration: 0.9, ease: 'easeInOut', repeat: 2, repeatType: 'loop' }}
              style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '10px', alignItems: 'center' }}
            >
              {[0, 1, 2].map((row) => (
                <div key={`row-${row}`} style={{ display: 'flex', gap: isMobile ? '10px' : '16px' }}>
                  {[0, 1, 2, 3, 4].map((col) => (
                    <span
                      key={`inv-${row}-${col}`}
                      style={{ fontSize: isMobile ? '18px' : '24px', lineHeight: 1 }}
                    >
                      👾
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* 2 defensive shields */}
            {[35, 65].map((leftPct, si) => (
              <div
                key={`shield-${si}`}
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '26%' : '28%',
                  left: `${leftPct}%`,
                  transform: 'translateX(-50%)',
                  fontSize: isMobile ? '20px' : '26px',
                  lineHeight: 1,
                  opacity: shieldHealth === 0 ? 0.08 : shieldHealth === 1 ? 0.4 : 0.9,
                  transition: 'opacity 0.2s',
                  filter: shieldHealth > 0 ? `hue-rotate(${shieldHealth * 30}deg)` : 'none',
                }}
              >
                🛡️
              </div>
            ))}

            {/* Player cannon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '18px' : '28px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: isMobile ? '22px' : '28px',
                lineHeight: 1,
              }}
            >
              🔫
            </motion.div>

            {/* 3 laser shots */}
            {[30, 60, 48].map((leftPct, i) => (
              <motion.div
                key={`laser-${i}`}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  bottom: isMobile ? '20px' : '32px',
                  width: '3px',
                  height: isMobile ? '28px' : '36px',
                  background: '#00ffff',
                  boxShadow: '0 0 6px #00ffff, 0 0 12px #00ffff',
                  borderRadius: '2px',
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -screenH, opacity: [1, 1, 0] }}
                transition={{
                  duration: 1.1,
                  delay: 0.4 + i * 0.32,
                  ease: 'linear',
                  opacity: { times: [0, 0.85, 1] },
                }}
              />
            ))}

            {/* Explosion 1 */}
            <motion.div
              style={{ position: 'absolute', left: '28%', top: '42%', fontSize: isMobile ? '20px' : '26px', lineHeight: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.45, delay: 1.2, times: [0, 0.4, 1] }}
            >
              💥
            </motion.div>

            {/* Explosion 2 */}
            <motion.div
              style={{ position: 'absolute', left: '56%', top: '35%', fontSize: isMobile ? '20px' : '26px', lineHeight: 1 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.45, delay: 1.6, times: [0, 0.4, 1] }}
            >
              💥
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 5 — GAME OVER / HIGH SCORE
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'gameover' && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3"
          >
            {/* 16 pixel burst stars */}
            {pixelBursts.map((burst) => (
              <motion.div
                key={`burst-${burst.id}`}
                style={{
                  position: 'absolute',
                  left: `${burst.x}%`,
                  top: `${burst.y}%`,
                  width: isMobile ? '10px' : '14px',
                  height: isMobile ? '10px' : '14px',
                  background: burst.color,
                  boxShadow: `0 0 8px ${burst.color}, 0 0 16px ${burst.color}`,
                  borderRadius: '2px',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + burst.id * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              />
            ))}

            {/* GAME OVER with CSS flicker */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontSize: isMobile ? '38px' : '60px',
                fontWeight: 900,
                letterSpacing: '6px',
                color: '#ff0000',
                textShadow: '0 0 20px #ff0000, 0 0 40px #ff0000',
                animationName: 'gof-flicker',
                animationDuration: '0.55s',
                animationTimingFunction: 'step-start',
                animationIterationCount: 'infinite',
              }}
            >
              GAME OVER
            </motion.div>

            {/* Capsule title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              style={{
                fontSize: isMobile ? '12px' : '15px',
                color: '#00ffff',
                letterSpacing: '3px',
                textShadow: '0 0 8px #00ffff',
                textTransform: 'uppercase',
              }}
            >
              {capsuleTitle}
            </motion.div>

            {/* Score counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{
                fontSize: isMobile ? '20px' : '28px',
                color: '#ffff00',
                letterSpacing: '3px',
                textShadow: '0 0 10px #ffff00',
              }}
            >
              {String(score).padStart(6, '0')}
            </motion.div>

            {/* CONTINUE? countdown — appears at delay 1s */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              style={{
                fontSize: isMobile ? '15px' : '20px',
                color: '#ff8800',
                letterSpacing: '3px',
                textShadow: '0 0 8px #ff8800',
                fontWeight: 900,
              }}
            >
              CONTINUE? {countdown}
            </motion.div>

            {/* INSERT COIN TO CONTINUE — blink, delay 1.5s */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              style={{
                fontSize: isMobile ? '11px' : '14px',
                color: '#ffff00',
                letterSpacing: '3px',
                textShadow: '0 0 6px #ffff00',
                animationName: 'arc-blink',
                animationDuration: '0.7s',
                animationTimingFunction: 'step-start',
                animationIterationCount: 'infinite',
                animationDelay: '1.5s',
              }}
            >
              INSERT COIN TO CONTINUE
            </motion.div>

            {/* HIGH SCORE! */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              style={{
                fontSize: isMobile ? '24px' : '36px',
                fontWeight: 900,
                color: '#ffff00',
                letterSpacing: '5px',
                animation: 'arc-highscore-glow 0.9s ease-in-out infinite',
                animationDelay: '1.2s',
              }}
            >
              HIGH SCORE!
            </motion.div>

            {/* NEW RECORD badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontSize: isMobile ? '13px' : '17px',
                color: '#ffff00',
                letterSpacing: '4px',
                border: '1px solid #ffff00',
                padding: isMobile ? '3px 10px' : '4px 14px',
                animation: 'arc-highscore-glow 0.9s ease-in-out infinite',
                animationDelay: '2s',
              }}
            >
              ★ NEW RECORD ★
            </motion.div>

            {/* THANK YOU FOR PLAYING */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.5 }}
              style={{
                fontSize: isMobile ? '11px' : '13px',
                color: '#00ff00',
                letterSpacing: '3px',
                textShadow: '0 0 6px #00ff00',
              }}
            >
              THANK YOU FOR PLAYING
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 6 — RADIANCE
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-20"
          >
            {/* Neon radial burst */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div
                style={{
                  width: isMobile ? '400px' : '700px',
                  height: isMobile ? '400px' : '700px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,255,0,0.55) 0%, rgba(255,255,0,0.35) 25%, rgba(0,255,255,0.2) 50%, transparent 70%)',
                  filter: 'blur(48px)',
                }}
              />
            </motion.div>

            {/* Score corner decorations */}
            {radianceCorners.map((corner, i) => (
              <motion.div
                key={`rcorner-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.12 }}
                style={{
                  position: 'absolute',
                  ...corner.style,
                  fontSize: isMobile ? '11px' : '14px',
                  color: '#00ff00',
                  letterSpacing: '2px',
                  textShadow: '0 0 8px #00ff00',
                  fontWeight: 900,
                }}
              >
                {corner.label}
              </motion.div>
            ))}

            {/* Center block */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* CHAMPION badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                style={{
                  fontSize: isMobile ? '12px' : '15px',
                  color: '#ffd700',
                  letterSpacing: '5px',
                  fontWeight: 900,
                  animation: 'arc-gold-glow 1.2s ease-in-out infinite',
                  border: '1px solid #ffd700',
                  padding: isMobile ? '2px 10px' : '3px 14px',
                }}
              >
                ◆ CHAMPION ◆
              </motion.div>

              {/* ARCADE title with orbiting achievement stars */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Orbit ring — slow ambient rotation, repeat: Infinity, 6s */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animationName: 'arc-orbit',
                    animationDuration: '6s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    pointerEvents: 'none',
                  }}
                >
                  {orbitStars.map((star) => (
                    <div
                      key={`orbit-${star.id}`}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${star.x}px)`,
                        top: `calc(50% + ${star.y}px)`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: isMobile ? '12px' : '16px',
                        color: star.color,
                        textShadow: `0 0 8px ${star.color}`,
                      }}
                    >
                      {star.char}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: isMobile ? '48px' : '76px',
                    fontWeight: 900,
                    letterSpacing: '8px',
                    color: '#00ff00',
                    textShadow: '0 0 20px #00ff00, 0 0 50px #00ff00, 0 0 90px #00ff00',
                    animation: 'arc-neon-pulse 1.6s ease-in-out infinite',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  ARCADE
                </div>
              </div>

              {/* LEVEL COMPLETE */}
              <div
                style={{
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#00ffff',
                  letterSpacing: '5px',
                  textShadow: '0 0 10px #00ffff',
                  marginTop: '4px',
                }}
              >
                LEVEL COMPLETE
              </div>

              {/* Pixel border box with capsule title — scale-in with spring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.6 }}
                style={{
                  marginTop: '8px',
                  padding: isMobile ? '6px 14px' : '8px 20px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid #00ffff',
                  background: 'rgba(0,255,255,0.05)',
                  boxShadow: '0 0 12px rgba(0,255,255,0.3)',
                }}
              >
                {/* Corner bracket chars */}
                <span style={{ position: 'absolute', top: -2, left: 2, color: '#00ffff', fontSize: isMobile ? '10px' : '13px', lineHeight: 1 }}>⌐</span>
                <span style={{ position: 'absolute', top: -2, right: 2, color: '#00ffff', fontSize: isMobile ? '10px' : '13px', lineHeight: 1 }}>¬</span>
                <span style={{ position: 'absolute', bottom: -2, left: 2, color: '#00ffff', fontSize: isMobile ? '10px' : '13px', lineHeight: 1 }}>L</span>
                <span style={{ position: 'absolute', bottom: -2, right: 2, color: '#00ffff', fontSize: isMobile ? '10px' : '13px', lineHeight: 1 }}>J</span>
                <span
                  style={{
                    fontSize: isMobile ? '13px' : '17px',
                    color: '#00ffff',
                    letterSpacing: '3px',
                    textShadow: '0 0 8px #00ffff',
                    textTransform: 'uppercase',
                  }}
                >
                  {capsuleTitle}
                </span>
              </motion.div>

              {/* PRESS START blinking line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '6%' : '5%',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: isMobile ? '13px' : '17px',
                  color: '#ffffff',
                  letterSpacing: '4px',
                  textShadow: '0 0 8px #ffffff',
                  animationName: 'arc-blink',
                  animationDuration: '0.7s',
                  animationTimingFunction: 'step-start',
                  animationIterationCount: 'infinite',
                }}
              >
                PRESS START
              </div>
            </motion.div>

            {/* Marquee capsule title scrolling across bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: isMobile ? '10%' : '8%',
                left: 0, right: 0,
                overflow: 'hidden',
                height: isMobile ? '22px' : '28px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  fontSize: isMobile ? '13px' : '17px',
                  color: '#ffff00',
                  letterSpacing: '4px',
                  textShadow: '0 0 12px #ffff00, 0 0 24px #ffff00',
                  textTransform: 'uppercase',
                  animation: 'arc-marquee 3s linear 1 forwards',
                }}
              >
                {capsuleTitle}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OUTRO fade-to-black */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro"
            className="absolute inset-0 bg-black z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
