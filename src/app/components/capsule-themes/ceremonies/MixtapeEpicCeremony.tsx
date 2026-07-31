/**
 * Mixtape - Retro Arcade Ceremony (Epic) — Authentic CRT Rewrite
 *
 * CONCEPT: Authentic CRT arcade aesthetic — Pac-Man, Tetris, Space Invaders —
 * with CSS-only sprites, pixel art box-shadow invaders, CRT scanlines, and
 * Courier New monospace throughout.
 *
 * Stages:
 * 1. intro         (0-2s):    Attract screen — INSERT COIN, hi-score, blinking
 * 2. pacman        (2-6s):    CSS Pac-Man chomps dots, CSS ghost sprites
 * 3. tetris        (6-10s):   Tetris pieces fall into well, LINE CLEAR!
 * 4. spaceinvaders (10-14s):  Pixel-art invader grid marches, lasers, explosions
 * 5. radiance      (14-17s):  GAME OVER → HIGH SCORE! + confetti + capsule title
 * 6. outro         (17s+):    Fade to black
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// ── Pixel art helper: converts 0/1 row strings → CSS box-shadow string
function pixelShadow(rows: string[], color: string, px = 4): string {
  const s: string[] = [];
  rows.forEach((row, y) =>
    row.split('').forEach((c, x) => {
      if (c === '1') s.push(`${x * px}px ${y * px}px 0 ${color}`);
    })
  );
  return s.join(', ');
}

// ── Classic Space Invader pixel patterns (8 cols × 6 rows, 0=off 1=on)
const INV_SQUID: string[] = [
  '00100100',
  '01111110',
  '11011011',
  '01111110',
  '01000010',
  '10000001',
];
const INV_CRAB: string[] = [
  '10000001',
  '01111110',
  '11111111',
  '11011011',
  '11111111',
  '01010110',
];
const INV_USHIP: string[] = [
  '00111100',
  '01111110',
  '11111111',
  '10011001',
  '11111111',
  '01100110',
];

// ── Ghost pixel patterns — body (8×8) and eye overlay (8×8)
const GHOST_BODY: string[] = [
  '00111100',
  '01111110',
  '11111111',
  '11111111',
  '11111111',
  '11111111',
  '11011011',
  '10100101',
];
const GHOST_EYE_WHITE: string[] = [
  '00000000',
  '00000000',
  '00110110',
  '00110110',
  '00110110',
  '00000000',
  '00000000',
  '00000000',
];
const GHOST_EYE_PUPIL: string[] = [
  '00000000',
  '00000000',
  '00010010',
  '00010010',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
];

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
    'intro' | 'pacman' | 'tetris' | 'spaceinvaders' | 'radiance' | 'outro'
  >('intro');

  const completedRef = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const CELL = isMobile ? 11 : 15; // Tetris cell size px
  const GHOST_PX = isMobile ? 2 : 3; // ghost pixels size px

  // ── Score states
  const [pacScore, setPacScore] = useState(0);
  const [radianceScore, setRadianceScore] = useState(0);
  const scoreRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pacScoreRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Pac-Man dots: 8 fixed x positions
  const pacDots = useMemo(() =>
    [10, 21, 31, 41, 51, 61, 71, 82].map((xPct, i) => ({
      id: i, xPct, delay: 0.25 + i * 0.3,
    })), []);

  // ── Ghost definitions
  const ghosts = useMemo(() => [
    { id: 0, color: '#ff0000', name: 'BLINKY', startLeft: '-12%', endLeft: '82%', dur: 3.8, sd: 0.1 },
    { id: 1, color: '#ffb8ff', name: 'PINKY',  startLeft: '-22%', endLeft: '72%', dur: 3.8, sd: 0.45 },
    { id: 2, color: '#00ffff', name: 'INKY',   startLeft: '-32%', endLeft: '62%', dur: 3.8, sd: 0.8 },
    { id: 3, color: '#ffb852', name: 'CLYDE',  startLeft: '-42%', endLeft: '52%', dur: 3.8, sd: 1.15 },
  ], []);

  // ── Tetris pieces (7 tetrominos as [col,row] cell offsets)
  const tetrisPieces = useMemo(() => [
    { id: 0, color: '#00ffff', cells: [[0,0],[1,0],[2,0],[3,0]], col: 3, delay: 0.0 },  // I
    { id: 1, color: '#ffff00', cells: [[0,0],[1,0],[0,1],[1,1]], col: 4, delay: 0.55 }, // O
    { id: 2, color: '#a000f0', cells: [[1,0],[0,1],[1,1],[2,1]], col: 3, delay: 1.1 },  // T
    { id: 3, color: '#00f000', cells: [[1,0],[2,0],[0,1],[1,1]], col: 2, delay: 1.65 }, // S
    { id: 4, color: '#f00000', cells: [[0,0],[1,0],[1,1],[2,1]], col: 5, delay: 2.2 },  // Z
    { id: 5, color: '#f0a000', cells: [[0,0],[0,1],[0,2],[1,2]], col: 1, delay: 2.75 }, // L
  ], []);

  // ── Space Invader rows
  const invaderRows = useMemo(() => [
    { id: 0, pattern: INV_SQUID, color: '#ffffff', topPct: 20, count: 5, pointsLabel: '10 PTS' },
    { id: 1, pattern: INV_CRAB,  color: '#00ffff', topPct: 32, count: 5, pointsLabel: '20 PTS' },
    { id: 2, pattern: INV_USHIP, color: '#00ff41', topPct: 44, count: 5, pointsLabel: '30 PTS' },
  ], []);

  // ── me- fireworks (preserved from previous version)
  const meColors = useMemo(() => ['#00ff00','#ffff00','#00ffff','#ff00ff','#ff8800','#ffffff','#00ff88'], []);
  const meFwPositions = useMemo(() => [
    {x:10,y:18},{x:25,y:10},{x:42,y:20},{x:58,y:8},{x:72,y:18},{x:88,y:12},{x:18,y:32},{x:82,y:28},
  ].slice(0, isMobile ? 5 : 8), [isMobile]);
  const meFwSparks = useMemo(() => meFwPositions.map(() =>
    Array.from({length: isMobile ? 14 : 20}, (_, i) => {
      const a = (i / (isMobile ? 14 : 20)) * Math.PI * 2;
      const d = 50 + (i % 5) * 20;
      return { x: Math.cos(a)*d, y: Math.sin(a)*d, color: meColors[i % meColors.length], delay: i*0.04 };
    })
  ), [meFwPositions, meColors, isMobile]);
  const meFwRings = useMemo(() => meFwPositions.map(() =>
    Array.from({length: 3}, (_, i) => ({ delay: i*0.15, color: ['#00ff00','#ffff00','#00ffff'][i] }))
  ), [meFwPositions]);
  const meOrbs = useMemo(() => Array.from({length: isMobile ? 10 : 18}, (_, i) => ({
    x: 5 + (i * 5.5) % 90, dx: (i % 7 - 3) * 18, dur: 2.5 + (i % 4) * 0.5,
    delay: i * 0.18, color: meColors[i % meColors.length]
  })), [meColors, isMobile]);

  // ── Confetti + score counter on radiance
  useEffect(() => {
    if (stage !== 'radiance') return;
    const colors = ['#ffff00','#00ff41','#ff0000','#00ffff','#ff00ff'];
    const base = { spread: 90, ticks: 300, gravity: 0.9, decay: 0.93, startVelocity: 50, colors };
    confetti({ ...base, particleCount: isMobile ? 70 : 150, angle: 60, origin: { x: isMobile ? 0.12 : 0, y: 0.7 } });
    confetti({ ...base, particleCount: isMobile ? 70 : 150, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.7 } });
    const t1 = setTimeout(() => confetti({ ...base, particleCount: isMobile ? 60 : 100, angle: 90, origin: { x: 0.5, y: 0.6 } }), 400);
    const t2 = setTimeout(() => {
      confetti({ ...base, particleCount: 100, angle: 60, origin: { x: isMobile ? 0.12 : 0, y: 0.65 } });
      confetti({ ...base, particleCount: 100, angle: 120, origin: { x: isMobile ? 0.88 : 1, y: 0.65 } });
    }, 950);
    // Score counter
    let s = 0;
    const si = setInterval(() => {
      s += 33330;
      if (s >= 999990) { s = 999990; clearInterval(si); }
      setRadianceScore(s);
    }, 50);
    scoreRef.current = si;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(si);
    };
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Main timeline
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => {
        setStage('pacman');
        let ps = 0;
        const pi = setInterval(() => {
          ps += 10;
          if (ps >= 80) { ps = 80; clearInterval(pi); }
          setPacScore(ps);
        }, 280);
        pacScoreRef.current = pi;
      }, 2000),
      setTimeout(() => {
        if (pacScoreRef.current) clearInterval(pacScoreRef.current);
        setStage('tetris');
      }, 6000),
      setTimeout(() => setStage('spaceinvaders'), 10000),
      setTimeout(() => setStage('radiance'), 14000),
      setTimeout(() => {
        setStage('outro');
        if (!completedRef.current) { completedRef.current = true; onComplete?.(); }
      }, 17000),
    ];

    // Failsafe at 18s
    const failsafe = setTimeout(() => {
      if (scoreRef.current) clearInterval(scoreRef.current);
      if (pacScoreRef.current) clearInterval(pacScoreRef.current);
      if (!completedRef.current) { completedRef.current = true; onComplete?.(); }
    }, 18000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafe);
      if (scoreRef.current) clearInterval(scoreRef.current);
      if (pacScoreRef.current) clearInterval(pacScoreRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Precomputed invader box-shadows
  const invaderShadows = useMemo(() =>
    invaderRows.map((row) => ({
      body: pixelShadow(row.pattern, row.color, isMobile ? 3 : 4),
    }))
  , [invaderRows, isMobile]);

  // ── Precomputed ghost box-shadows for each ghost color
  const ghostShadows = useMemo(() =>
    ghosts.map((g) => ({
      body:  pixelShadow(GHOST_BODY, g.color, GHOST_PX),
      eyes:  pixelShadow(GHOST_EYE_WHITE, '#ffffff', GHOST_PX),
      pupil: pixelShadow(GHOST_EYE_PUPIL, '#00008b', GHOST_PX),
    }))
  , [ghosts, GHOST_PX]);

  const ghostBoxW = 8 * GHOST_PX;
  const ghostBoxH = 8 * GHOST_PX;
  const invBoxW = 8 * (isMobile ? 3 : 4);
  const invBoxH = 6 * (isMobile ? 3 : 4);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0a0a0a',
        fontFamily: "'Courier New', monospace",
        color: '#00ff41',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        // CRT tube glow
        boxShadow: 'inset 0 0 80px rgba(0,255,65,0.08), inset 0 0 200px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes me-pop-ring {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(4.4); opacity: 0; }
        }
        @keyframes me-flash {
          0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
        @keyframes me-orb-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-180px) translateX(var(--dx)); opacity: 0; }
        }
        @keyframes me-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes me-chomp {
          0%  { clip-path: polygon(50% 50%,100% 20%,100% 0,0 0,0 100%,100% 100%,100% 80%); }
          50% { clip-path: polygon(50% 50%,100% 50%,100% 0,0 0,0 100%,100% 100%,100% 50%); }
        }
        @keyframes me-fall {
          0%   { transform: translateY(-${CELL * 3}px); opacity: 0; }
          12%  { opacity: 1; }
          100% { transform: translateY(${CELL * 12}px); opacity: 1; }
        }
        @keyframes me-march {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(${isMobile ? 32 : 48}px); }
          100% { transform: translateX(0); }
        }
        @keyframes me-laser {
          0%   { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-${isMobile ? 320 : 520}px); opacity: 0; }
        }
        @keyframes me-neon-pulse {
          0%,100% { text-shadow: 0 0 10px #00ff41, 0 0 24px #00ff41; }
          50%      { text-shadow: 0 0 20px #00ff41, 0 0 50px #00ff41, 0 0 90px #00ff41; }
        }
        @keyframes me-gold-glow {
          0%,100% { text-shadow: 0 0 10px #ffd700, 0 0 22px #ffd700; }
          50%      { text-shadow: 0 0 24px #ffd700, 0 0 50px #ff8800, 0 0 80px #ffd700; }
        }
        @keyframes me-gameover-flash {
          0%,100% { opacity:1; color:#ff0000; text-shadow:0 0 20px #ff0000,0 0 40px #ff0000; }
          50%      { opacity:0.35; color:#ff8800; }
        }
        @keyframes me-explosion {
          0%   { transform: scale(0) rotate(0deg); opacity: 1; }
          60%  { transform: scale(1.6) rotate(45deg); opacity: 1; }
          100% { transform: scale(2.2) rotate(90deg); opacity: 0; }
        }
        @keyframes me-ufo-blink {
          0%,45%{opacity:1} 50%,95%{opacity:0.4} 100%{opacity:1}
        }
        @keyframes me-score-count {
          0%,100% { color: #ffff00; }
          50%      { color: #ffffff; }
        }
        @keyframes me-ready {
          0%,100% { opacity:1; } 33%,66%{ opacity:0; }
        }
        @keyframes me-border-glow {
          0%,100% { box-shadow: 0 0 8px #00ff41, 0 0 16px #00ff4144; }
          50%      { box-shadow: 0 0 14px #00ff41, 0 0 28px #00ff4166, 0 0 50px #00ff4122; }
        }
        @keyframes me-rainbow {
          0%{color:#ffff00} 20%{color:#00ff41} 40%{color:#00ffff} 60%{color:#ff00ff} 80%{color:#ff6600} 100%{color:#ffff00}
        }
        @keyframes me-ufo {
          0%{transform:translateX(-60px);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateX(110vw);opacity:0}
        }
      `}</style>

      {/* ── CRT scanlines (always present, z-index 100) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.10) 2px, rgba(0,0,0,0.10) 4px)',
      }} />

      {/* ── CRT vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 99, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)',
      }} />
      {/* ── Green phosphor tint vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 98, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,20,0,0.5) 100%)',
      }} />

      {/* ── Persistent score header (all stages except outro) ── */}
      {stage !== 'outro' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '3px 8px' : '5px 14px',
          borderBottom: '1px solid #00ff4133',
          background: 'rgba(0,0,0,0.75)',
          fontSize: isMobile ? '8px' : '10px',
        }}>
          <span style={{ color: '#00ff41', textShadow: '0 0 6px #00ff41, 0 0 12px rgba(0,255,65,0.4)' }}>
            1UP{'  '}
            <span style={{ color: '#00ff41', textShadow: '0 0 8px #00ff41, 0 0 16px rgba(0,255,65,0.5)' }}>{String(pacScore * 1000 + 12500).padStart(6,'0')}</span>
          </span>
          <span style={{ color: '#00ff41', animation: 'me-neon-pulse 2s ease-in-out infinite', textShadow: '0 0 6px #00ff41, 0 0 12px rgba(0,255,65,0.4)' }}>
            HI-SCORE{'  '}
            <span style={{ color: '#00ff41', textShadow: '0 0 8px #00ff41, 0 0 16px rgba(0,255,65,0.5)' }}>999999</span>
          </span>
          <span style={{ color: '#00ff41', textShadow: '0 0 6px #00ff41, 0 0 12px rgba(0,255,65,0.4)' }}>
            2UP{'  '}
            <span style={{ color: '#00ff41', textShadow: '0 0 8px #00ff41, 0 0 16px rgba(0,255,65,0.5)' }}>000000</span>
          </span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          STAGE 1 — INTRO (attract screen)
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 20,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: isMobile ? '10px' : '14px',
            }}
          >
            {/* Corner brackets */}
            {[
              { style: { top: '8%',    left:  '5%'  }, char: '┌' },
              { style: { top: '8%',    right: '5%'  }, char: '┐' },
              { style: { bottom: '8%', left:  '5%'  }, char: '└' },
              { style: { bottom: '8%', right: '5%'  }, char: '┘' },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.1 + i * 0.1 }}
                style={{
                  position: 'absolute', ...c.style,
                  fontSize: isMobile ? '18px' : '26px',
                  color: '#00ff41',
                  textShadow: '0 0 6px #00ff41',
                }}
              >
                {c.char}
              </motion.div>
            ))}

            {/* Horizontal border lines */}
            <div style={{
              position: 'absolute', top: '11%', left: '6%', right: '6%',
              height: '1px', background: 'rgba(0,255,65,0.4)',
            }} />
            <div style={{
              position: 'absolute', bottom: '11%', left: '6%', right: '6%',
              height: '1px', background: 'rgba(0,255,65,0.4)',
            }} />

            {/* Subtitle above main title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              style={{
                fontSize: isMobile ? '9px' : '11px',
                letterSpacing: '5px',
                color: '#00ff41',
                textShadow: '0 0 6px #00ff41',
              }}
            >
              ◆ ARCADE CLASSICS ◆
            </motion.div>

            {/* Main ARCADE title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontSize: isMobile ? '46px' : '72px',
                fontWeight: 900,
                letterSpacing: isMobile ? '8px' : '12px',
                color: '#00ff41',
                animation: 'me-neon-pulse 1.4s ease-in-out infinite',
              }}
            >
              ARCADE
            </motion.div>

            {/* INSERT COIN blink */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
              style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 'bold',
                color: '#ffff00',
                letterSpacing: '4px',
                textShadow: '0 0 10px #ffff00',
                animation: 'me-blink 1s step-start infinite',
              }}
            >
              INSERT COIN
            </motion.div>

            {/* PRESS START blink */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.2 }}
              style={{
                fontSize: isMobile ? '12px' : '16px',
                color: '#ffffff',
                letterSpacing: '3px',
                textShadow: '0 0 6px #ffffff',
                animation: 'me-blink 1s step-start infinite',
                animationDelay: '0.4s',
              }}
            >
              ▶ PRESS START ◀
            </motion.div>

            {/* Block cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.2 }}
              style={{
                width: isMobile ? '8px' : '12px',
                height: isMobile ? '14px' : '18px',
                background: '#00ff41',
                boxShadow: '0 0 8px #00ff41',
                animation: 'me-blink 0.6s step-start infinite',
              }}
            />

            {/* TOP SCORES attract list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: isMobile ? '3px' : '4px',
                fontSize: isMobile ? '9px' : '11px',
                color: '#00ff41',
                letterSpacing: '3px',
                textShadow: '0 0 4px #00ff41',
              }}
            >
              <div style={{ color: '#ffff00', textShadow: '0 0 6px #ffff00', marginBottom: '2px' }}>TOP SCORES</div>
              {[
                { name: 'AAA', score: '999999' },
                { name: 'BBB', score: '500000' },
                { name: 'CCC', score: '250000' },
              ].map((entry, i) => (
                <div key={i} style={{ fontFamily: "'Courier New', monospace" }}>
                  {entry.name}{'  '}{entry.score}
                </div>
              ))}
            </motion.div>

            {/* CREDITS 00 bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '10%' : '12%',
                left: 0, right: 0, textAlign: 'center',
                fontSize: isMobile ? '10px' : '13px',
                color: '#888',
                letterSpacing: '3px',
              }}
            >
              CREDITS 00
            </motion.div>

            {/* © NAMCO 1980 copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '6%' : '7%',
                left: 0, right: 0, textAlign: 'center',
                fontSize: isMobile ? '8px' : '9px',
                color: '#00ff41',
                letterSpacing: '2px',
                opacity: 0.4,
              }}
            >
              © NAMCO 1980
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
            style={{ position: 'absolute', inset: 0, zIndex: 20 }}
          >
            {/* Stage label */}
            <div style={{
              position: 'absolute', top: isMobile ? 26 : 34, left: 0, right: 0,
              textAlign: 'center',
              fontSize: isMobile ? '10px' : '13px',
              color: '#ffff00',
              letterSpacing: '4px',
              textShadow: '0 0 8px #ffff00',
            }}>
              PAC-MAN — LEVEL 1
            </div>

            {/* READY! */}
            <div style={{
              position: 'absolute',
              top: '36%', left: 0, right: 0, textAlign: 'center',
              fontSize: isMobile ? '18px' : '24px',
              color: '#ffff00',
              letterSpacing: '5px',
              textShadow: '0 0 10px #ffff00',
              animation: 'me-ready 1.2s ease-in-out 1 forwards',
              animationFillMode: 'forwards',
            }}>
              READY!
            </div>

            {/* Maze top/bottom walls */}
            {['39%', '61%'].map((top, i) => (
              <div key={i} style={{
                position: 'absolute', top, left: '3%', right: '3%',
                height: '2px',
                background: 'rgba(0,50,220,0.85)',
                boxShadow: '0 0 8px rgba(0,80,255,0.5)',
              }} />
            ))}

            {/* Track center line (subtle) */}
            <div style={{
              position: 'absolute', top: 'calc(50% - 1px)', left: 0, right: 0,
              height: '1px', background: 'rgba(0,255,65,0.06)',
            }} />

            {/* 8 pac dots */}
            {pacDots.map((dot) => (
              <motion.div
                key={dot.id}
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 4px)',
                  left: `${dot.xPct}%`,
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 0 4px #ffffff',
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.1, delay: dot.delay }}
              />
            ))}

            {/* Power pellets (4 large, corners) */}
            {[4, 94].map((xPct, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: 'calc(50% - 7px)',
                left: `${xPct}%`,
                width: '14px', height: '14px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 8px #ffffff, 0 0 16px #ffffff',
                animation: 'me-blink 0.5s step-start infinite',
              }} />
            ))}

            {/* CSS Pac-Man (clip-path chomp) */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? 'calc(50% - 15px)' : 'calc(50% - 20px)',
                width: isMobile ? '30px' : '40px',
                height: isMobile ? '30px' : '40px',
                background: '#ffff00',
                borderRadius: '50%',
                clipPath: 'polygon(50% 50%,100% 20%,100% 0,0 0,0 100%,100% 100%,100% 80%)',
                animation: 'me-chomp 0.28s step-start infinite',
                boxShadow: '0 0 10px rgba(255,255,0,0.4)',
                zIndex: 5,
              }}
              initial={{ left: '5%' }}
              animate={{ left: '90%' }}
              transition={{ duration: 3.6, ease: 'linear' }}
            />

            {/* +10 score pops */}
            {pacDots.slice(0, 5).map((dot) => (
              <motion.div
                key={`score-${dot.id}`}
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 28px)',
                  left: `${dot.xPct}%`,
                  fontSize: isMobile ? '8px' : '10px',
                  color: '#ffff00',
                  textShadow: '0 0 6px #ffff00',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  zIndex: 6,
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 1, 0], y: [0, -8, -14, -20] }}
                transition={{ duration: 0.65, delay: dot.delay + 0.08, times: [0, 0.1, 0.65, 1] }}
              >
                +10
              </motion.div>
            ))}

            {/* Ghost sprites (pixel art box-shadow) */}
            {ghosts.map((ghost, gi) => (
              <motion.div
                key={ghost.id}
                style={{
                  position: 'absolute',
                  top: `calc(50% - ${ghostBoxH / 2 + 2}px)`,
                  zIndex: 4,
                }}
                initial={{ left: ghost.startLeft }}
                animate={{ left: ghost.endLeft }}
                transition={{ duration: ghost.dur, delay: ghost.sd, ease: 'linear' }}
              >
                {/* Container sized to ghost pixel art */}
                <div style={{
                  position: 'relative',
                  width: ghostBoxW + 'px',
                  height: ghostBoxH + 'px',
                }}>
                  {/* Body pixels */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '1px', height: '1px',
                    boxShadow: ghostShadows[gi].body,
                    filter: `drop-shadow(0 0 3px ${ghost.color}88)`,
                  }} />
                  {/* Eye white pixels */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '1px', height: '1px',
                    boxShadow: ghostShadows[gi].eyes,
                  }} />
                  {/* Pupil pixels */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '1px', height: '1px',
                    boxShadow: ghostShadows[gi].pupil,
                  }} />
                  {/* Ghost name label */}
                  <div style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: isMobile ? '6px' : '8px',
                    color: ghost.color,
                    textShadow: `0 0 4px ${ghost.color}`,
                    whiteSpace: 'nowrap',
                    letterSpacing: '1px',
                  }}>
                    {ghost.name}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Maze score bottom */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '8%' : '10%',
              left: 0, right: 0, textAlign: 'center',
              fontSize: isMobile ? '9px' : '11px',
              color: '#00ff41',
              letterSpacing: '3px',
              textShadow: '0 0 5px #00ff41',
            }}>
              SCORE: {String(pacScore * 10 + 1250).padStart(5,'0')}
            </div>
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
            style={{ position: 'absolute', inset: 0, zIndex: 20 }}
          >
            {/* Stage label */}
            <div style={{
              position: 'absolute', top: isMobile ? 26 : 34, left: 0, right: 0,
              textAlign: 'center',
              fontSize: isMobile ? '10px' : '13px',
              color: '#ff8800',
              letterSpacing: '4px',
              textShadow: '0 0 8px #ff8800',
            }}>
              TETRIS — LEVEL 1
            </div>

            {/* Left info panel */}
            <div style={{
              position: 'absolute',
              left: isMobile ? '2%' : '4%',
              top: isMobile ? '14%' : '12%',
              display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px',
            }}>
              {[
                { label: 'SCORE', value: '001000', color: '#ffff00' },
                { label: 'LINES', value: '004',    color: '#00ffff' },
                { label: 'LEVEL', value: '01',     color: '#ff00ff' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{
                  border: '2px solid #00ff41',
                  padding: isMobile ? '4px 7px' : '6px 10px',
                  background: 'rgba(0,255,65,0.04)',
                  animation: 'me-border-glow 2s ease-in-out infinite',
                  minWidth: isMobile ? '52px' : '70px',
                }}>
                  <div style={{ fontSize: isMobile ? '7px' : '9px', color: '#00ff41', letterSpacing: '2px', marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontSize: isMobile ? '12px' : '16px', color, textShadow: `0 0 6px ${color}` }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Right info panel */}
            <div style={{
              position: 'absolute',
              right: isMobile ? '2%' : '4%',
              top: isMobile ? '14%' : '12%',
              display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '12px',
            }}>
              {/* NEXT */}
              <div style={{
                border: '2px solid #00ff41', padding: isMobile ? '4px 7px' : '6px 10px',
                background: 'rgba(0,255,65,0.04)',
              }}>
                <div style={{ fontSize: isMobile ? '7px' : '9px', color: '#00ff41', letterSpacing: '2px', marginBottom: '5px' }}>NEXT</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[[1,1],[1,1]].map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', gap: '2px' }}>
                      {row.map((_, ci) => (
                        <div key={ci} style={{
                          width: isMobile ? '7px' : '9px',
                          height: isMobile ? '7px' : '9px',
                          background: '#ffff00',
                          boxShadow: 'inset 1px 1px rgba(255,255,255,0.3)',
                        }} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* HOLD */}
              <div style={{
                border: '2px solid #00ff41', padding: isMobile ? '4px 7px' : '6px 10px',
                background: 'rgba(0,255,65,0.04)',
              }}>
                <div style={{ fontSize: isMobile ? '7px' : '9px', color: '#00ff41', letterSpacing: '2px', marginBottom: '5px' }}>HOLD</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {[[1,0],[1,0],[1,1]].map((row, ri) => (
                    <div key={ri} style={{ display: 'flex', gap: '2px' }}>
                      {row.map((c, ci) => (
                        <div key={ci} style={{
                          width: isMobile ? '7px' : '9px',
                          height: isMobile ? '7px' : '9px',
                          background: c ? '#f0a000' : 'transparent',
                          boxShadow: c ? 'inset 1px 1px rgba(255,255,255,0.3)' : 'none',
                        }} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tetris well */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: isMobile ? '10%' : '9%',
              transform: 'translateX(-50%)',
              width: CELL * 10 + 4,
              height: CELL * 16 + 4,
              border: '2px solid #00ff41',
              boxShadow: '0 0 14px rgba(0,255,65,0.25), inset 0 0 8px rgba(0,255,65,0.06)',
              overflow: 'hidden',
              background: 'rgba(0,5,15,0.95)',
            }}>
              {/* Static completed bottom rows */}
              {[
                { row: 14, cells: [
                  '#f0a000','#f0a000','#f0a000','transparent','#ff0000','#ff0000','#ff0000','transparent','#f0a000','#f0a000'
                ] },
                { row: 15, cells: [
                  '#00f000','#f00000','#00ffff','#00ffff','#a000f0','#a000f0','#f0a000','#ffff00','#ffff00','#00f000'
                ] },
              ].map((rowDef) => (
                <div key={rowDef.row} style={{ position: 'absolute', top: rowDef.row * CELL, left: 0, display: 'flex' }}>
                  {rowDef.cells.map((color, ci) => (
                    <div key={ci} style={{
                      width: CELL, height: CELL,
                      background: color === 'transparent' ? 'transparent' : color,
                      border: color !== 'transparent' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                      boxShadow: color !== 'transparent'
                        ? `inset 2px 2px rgba(255,255,255,0.28), inset -2px -2px rgba(0,0,0,0.35)`
                        : 'none',
                    }} />
                  ))}
                </div>
              ))}

              {/* Falling Tetris pieces */}
              {tetrisPieces.map((piece) => (
                <div
                  key={piece.id}
                  style={{
                    position: 'absolute',
                    left: piece.col * CELL,
                    top: 0,
                    animation: `me-fall 2.2s ease-in ${piece.delay}s both`,
                  }}
                >
                  {piece.cells.map((cell, ci) => (
                    <div
                      key={ci}
                      style={{
                        position: 'absolute',
                        left: cell[0] * CELL,
                        top: cell[1] * CELL,
                        width: CELL - 1,
                        height: CELL - 1,
                        background: piece.color,
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: `inset 2px 2px rgba(255,255,255,0.3), inset -2px -2px rgba(0,0,0,0.4), 0 0 4px ${piece.color}55`,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* LINE CLEAR! flash */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: isMobile ? '6%' : '5%',
                left: 0, right: 0, textAlign: 'center',
                fontSize: isMobile ? '20px' : '30px',
                fontWeight: 900,
                letterSpacing: '6px',
                color: '#00ffff',
                textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
                animation: 'me-blink 0.18s step-start 8',
                animationDelay: '3.2s',
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1.1, 1.05, 0.9] }}
              transition={{ delay: 3.2, duration: 1.4, times: [0, 0.15, 0.75, 1] }}
            >
              LINE CLEAR!
            </motion.div>

            {/* LEVEL UP badge */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: isMobile ? '18px' : '26px',
                fontWeight: 900,
                color: '#00ff41',
                letterSpacing: '4px',
                border: '2px solid #00ff41',
                padding: isMobile ? '5px 12px' : '7px 18px',
                textShadow: '0 0 12px #00ff41',
                boxShadow: '0 0 20px #00ff4166',
                background: 'rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1, 1, 0], opacity: [0, 1, 1, 1, 0] }}
              transition={{
                scale: { delay: 3.6, duration: 0.7, times: [0, 0.35, 0.6, 0.82, 1], ease: [0.34, 1.56, 0.64, 1] },
                opacity: { delay: 3.6, duration: 0.7, times: [0, 0.35, 0.6, 0.82, 1] },
              }}
            >
              LEVEL UP!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 4 — SPACE INVADERS
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === 'spaceinvaders' && (
          <motion.div
            key="spaceinvaders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0, zIndex: 20 }}
          >
            {/* Stage label */}
            <div style={{
              position: 'absolute', top: isMobile ? 26 : 34, left: 0, right: 0,
              textAlign: 'center',
              fontSize: isMobile ? '10px' : '13px',
              color: '#00ff41',
              letterSpacing: '4px',
              textShadow: '0 0 8px #00ff41',
            }}>
              SPACE INVADERS — WAVE 1
            </div>

            {/* UFO bonus ship across top — framer motion pass */}
            <motion.div
              style={{
                position: 'absolute',
                top: isMobile ? '13%' : '14%',
                fontSize: isMobile ? '14px' : '18px',
                color: '#ff0000',
                textShadow: '0 0 8px #ff0000',
                animation: 'me-ufo-blink 0.4s step-start infinite',
                whiteSpace: 'nowrap',
              }}
              initial={{ left: '108%' }}
              animate={{ left: '-10%' }}
              transition={{ duration: 3, delay: 0.8, ease: 'linear' }}
            >
              ──▶▶ UFO ◀◀──  <span style={{ color: '#ffff00' }}>+300</span>
            </motion.div>

            {/* CSS-driven UFO saucer (me-ufo keyframe, second pass at 2.5s) */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '10%' : '11%',
              left: 0,
              width: isMobile ? '32px' : '44px',
              height: isMobile ? '12px' : '16px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, #ff4444 0%, #880000 100%)',
              boxShadow: '0 0 8px #ff0000, 0 0 16px #ff000066',
              animation: 'me-ufo 4s linear 2.5s both',
            }} />

            {/* Invader formation — marching side-to-side */}
            <div style={{
              position: 'absolute',
              top: isMobile ? '18%' : '16%',
              left: 0, right: 0,
              animation: 'me-march 1.1s ease-in-out infinite',
            }}>
              {invaderRows.map((row, ri) => (
                <div
                  key={row.id}
                  style={{
                    position: 'absolute',
                    top: `${(ri * (invBoxH + (isMobile ? 14 : 20)))}px`,
                    left: 0, right: 0,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    gap: isMobile ? '18px' : '26px',
                  }}
                >
                  {Array.from({ length: row.count }).map((_, ci) => (
                    <div
                      key={ci}
                      style={{
                        width: invBoxW + 'px',
                        height: invBoxH + 'px',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      {/* Invader pixel art */}
                      <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '1px', height: '1px',
                        boxShadow: invaderShadows[ri].body,
                        filter: `drop-shadow(0 0 2px ${row.color}88)`,
                      }} />
                    </div>
                  ))}
                  {/* Points label at end of each row */}
                  <div style={{
                    fontSize: isMobile ? '7px' : '9px',
                    color: row.color,
                    textShadow: `0 0 4px ${row.color}`,
                    letterSpacing: '1px',
                    whiteSpace: 'nowrap',
                    marginLeft: isMobile ? '4px' : '8px',
                    flexShrink: 0,
                  }}>
                    = {row.pointsLabel}
                  </div>
                </div>
              ))}
            </div>

            {/* Shields */}
            {[22, 42, 62, 82].map((leftPct) => (
              <div
                key={leftPct}
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '22%' : '20%',
                  left: `${leftPct}%`,
                  transform: 'translateX(-50%)',
                  width: isMobile ? '26px' : '36px',
                  height: isMobile ? '16px' : '22px',
                  background: '#00ff41',
                  boxShadow: '0 0 4px #00ff4155',
                  clipPath: 'polygon(0 100%,0 25%,20% 0,80% 0,100% 25%,100% 100%,78% 100%,78% 55%,22% 55%,22% 100%)',
                }}
              />
            ))}

            {/* Laser beams from cannon */}
            {[30, 50, 70].map((leftPct, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  bottom: isMobile ? '19%' : '17%',
                  width: '3px',
                  height: isMobile ? '18px' : '24px',
                  background: 'linear-gradient(to top, #00ffff, #ffffff)',
                  boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff66',
                  animation: `me-laser 1.1s linear ${i * 0.38}s infinite`,
                }}
              />
            ))}

            {/* Player cannon (triangle + base) */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '13%' : '11%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <div style={{
                width: 0, height: 0,
                borderLeft: `${isMobile ? 10 : 14}px solid transparent`,
                borderRight: `${isMobile ? 10 : 14}px solid transparent`,
                borderBottom: `${isMobile ? 16 : 22}px solid #00ff41`,
                filter: 'drop-shadow(0 0 5px #00ff41)',
                margin: '0 auto',
              }} />
              <div style={{
                width: isMobile ? '30px' : '42px',
                height: isMobile ? '7px' : '9px',
                background: '#00ff41',
                boxShadow: '0 0 6px #00ff41',
                marginTop: '-1px',
              }} />
            </div>

            {/* Pixel explosion marks */}
            {[
              { left: '26%', top: '26%', delay: 1.1, color: '#ff8800' },
              { left: '54%', top: '21%', delay: 1.9, color: '#ffff00' },
              { left: '70%', top: '32%', delay: 2.7, color: '#ff0000' },
            ].map((ex, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: ex.left, top: ex.top,
                  fontSize: isMobile ? '16px' : '20px',
                  color: ex.color,
                  textShadow: `0 0 8px ${ex.color}`,
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 1,
                  animation: `me-explosion 0.55s ease-out forwards`,
                  animationDelay: `${ex.delay}s`,
                  opacity: 0,
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.4, 1.2, 0] }}
                transition={{ delay: ex.delay, duration: 0.55, times: [0, 0.28, 0.65, 1] }}
              >
                ✸✸
              </motion.div>
            ))}

            {/* Footer — lives / score / wave */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '6%' : '5%',
              left: 0, right: 0,
              display: 'flex', justifyContent: 'space-between',
              padding: isMobile ? '0 10px' : '0 18px',
              fontSize: isMobile ? '9px' : '11px',
              color: '#00ff41',
              letterSpacing: '2px',
              borderTop: '1px solid #00ff4133',
              paddingTop: '4px',
            }}>
              <span>LIVES: ▶▶▶</span>
              <span style={{ color: '#ff0000' }}>SCORE: 01440</span>
              <span>WAVE: 01</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          STAGE 5 — RADIANCE (GAME OVER → HIGH SCORE!)
      ══════════════════════════════════════════════ */}

      {/* me- Fireworks (preserved) */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <>
            {meFwPositions.map((pos, pi) => (
              <React.Fragment key={`me-fw-${pi}`}>
                {meFwSparks[pi].map((s, si) => (
                  <motion.div key={`me-spark-${pi}-${si}`} className="absolute z-51 rounded-full"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 6, height: 6, background: s.color }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x: s.x, y: s.y, scale: [0,1.4,0], opacity: [0,1,0] }}
                    transition={{ duration: 1.2, delay: s.delay, ease: 'easeOut' }}
                  />
                ))}
                {meFwRings[pi].map((r, ri) => (
                  <div key={`me-ring-${pi}-${ri}`} className="absolute rounded-full border-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 20, height: 20, borderColor: r.color, animation: `me-pop-ring 0.9s ease-out ${r.delay}s both` }}
                  />
                ))}
                <div key={`me-flash-${pi}`} className="absolute rounded-full"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: 40, height: 40,
                    background: `radial-gradient(circle, ${meColors[pi % meColors.length]}cc, transparent)`,
                    filter: 'blur(8px)', animation: 'me-flash 0.5s ease-out both' }}
                />
              </React.Fragment>
            ))}
            {meOrbs.map((orb, i) => (
              <div key={`me-orb-${i}`} className="absolute rounded-full z-49"
                style={{ left: `${orb.x}%`, bottom: '20%', width: 10, height: 10,
                  background: orb.color, boxShadow: `0 0 14px ${orb.color}`,
                  '--dx': `${orb.dx}px`,
                  animation: `me-orb-float ${orb.dur}s ease-out ${orb.delay}s both`
                } as React.CSSProperties}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 20,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: isMobile ? '10px' : '14px',
            }}
          >
            {/* Radial glow burst */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center, rgba(0,255,65,0.1) 0%, rgba(255,255,0,0.06) 35%, transparent 65%)',
            }} />

            {/* Corner score decorations */}
            {[
              { style: { top: isMobile ? '9%' : '8%',    left:  isMobile ? '4%' : '5%'  }, label: '1UP' },
              { style: { top: isMobile ? '9%' : '8%',    right: isMobile ? '4%' : '5%'  }, label: '★★★' },
              { style: { bottom: isMobile ? '10%' : '9%', left:  isMobile ? '4%' : '5%' }, label: '∞'   },
              { style: { bottom: isMobile ? '10%' : '9%', right: isMobile ? '4%' : '5%' }, label: '2UP' },
            ].map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.3 }}
                style={{
                  position: 'absolute', ...d.style,
                  fontSize: isMobile ? '10px' : '13px',
                  color: '#00ff41',
                  letterSpacing: '2px',
                  textShadow: '0 0 6px #00ff41',
                }}
              >
                {d.label}
              </motion.div>
            ))}

            {/* GAME OVER — flickers then fades */}
            <motion.div
              style={{
                fontSize: isMobile ? '34px' : '52px',
                fontWeight: 900,
                letterSpacing: isMobile ? '4px' : '7px',
                color: '#ff0000',
                animation: 'me-gameover-flash 0.5s step-start infinite',
              }}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: [1, 1, 1, 0], y: [0, 0, 0, -8] }}
              transition={{ delay: 1.2, duration: 0.4, times: [0, 0.5, 0.8, 1] }}
            >
              GAME OVER
            </motion.div>

            {/* HIGH SCORE! — springs in at 1.5s */}
            <motion.div
              style={{
                fontSize: isMobile ? '32px' : '50px',
                fontWeight: 900,
                letterSpacing: isMobile ? '4px' : '7px',
                color: '#ffff00',
                animation: 'me-rainbow 2s linear infinite',
              }}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.55, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              HIGH SCORE!
            </motion.div>

            {/* Score counter */}
            <motion.div
              style={{
                fontSize: isMobile ? '24px' : '36px',
                letterSpacing: '5px',
                color: '#ffff00',
                textShadow: '0 0 12px #ffff00',
                animation: 'me-score-count 0.15s step-start infinite',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.3 }}
            >
              {String(radianceScore).padStart(6, '0')}
            </motion.div>

            {/* Pixel border box with capsule title */}
            <motion.div
              style={{
                border: '2px solid #00ff41',
                padding: isMobile ? '8px 16px' : '12px 26px',
                textAlign: 'center',
                position: 'relative',
                background: 'rgba(0,255,65,0.04)',
                boxShadow: '0 0 18px rgba(0,255,65,0.28)',
                animation: 'me-border-glow 1.5s ease-in-out infinite',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 2.0 }}
            >
              {/* Corner bracket chars */}
              {[
                { style: { top: -5, left: 3 },  char: '◤' },
                { style: { top: -5, right: 3 }, char: '◥' },
                { style: { bottom: -5, left: 3 },  char: '◣' },
                { style: { bottom: -5, right: 3 }, char: '◢' },
              ].map((c, i) => (
                <span key={i} style={{
                  position: 'absolute', ...(c.style as React.CSSProperties),
                  color: '#00ff41', fontSize: isMobile ? '9px' : '11px', lineHeight: 1,
                }}>{c.char}</span>
              ))}
              <div style={{
                fontSize: isMobile ? '7px' : '9px',
                color: '#00ff41', letterSpacing: '4px',
                marginBottom: isMobile ? '4px' : '6px',
              }}>
                TIME CAPSULE UNLOCKED
              </div>
              <div style={{
                fontSize: isMobile ? '13px' : '18px',
                color: '#ffffff',
                letterSpacing: '2px',
                textShadow: '0 0 8px rgba(255,255,255,0.5)',
                maxWidth: isMobile ? '190px' : '280px',
                wordBreak: 'break-word',
              }}>
                {capsuleTitle}
              </div>
            </motion.div>

            {/* PRESS START blinking */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '7%' : '8%',
                left: 0, right: 0, textAlign: 'center',
                fontSize: isMobile ? '11px' : '15px',
                color: '#ffffff',
                letterSpacing: '4px',
                textShadow: '0 0 6px #ffffff',
                animation: 'me-blink 0.8s step-start infinite',
                animationDelay: '2.6s',
              }}
            >
              PRESS START
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OUTRO — fade to black ── */}
      <AnimatePresence>
        {stage === 'outro' && (
          <motion.div
            key="outro"
            style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
