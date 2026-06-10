/**
 * Time Traveler - Digital Archive Ceremony
 *
 * CONCEPT: Cyberpunk Memory Upload — memories digitized and archived into the future.
 * Dark teal/cyan matrix aesthetic. Monospace font throughout.
 *
 * Stages:
 * 1. boot (0-2s): Matrix grid bg, scan line sweep, "INITIALIZING ARCHIVE SYSTEM..."
 * 2. dataStream (2-6s): 12 scrolling data columns + 6 memory fragment cards fly in
 * 3. upload (6-10s): Progress bar fills, % counter, 8 upload nodes light up
 * 4. archiveComplete (10-14s): Glitch text, 5 file cards stamp in, 10 hex label burst
 * 5. radiance (14-17s): Cyan glow expands, title with neon glow, eternal subtext
 * 6. outro (17s): Fade
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimeTravelerPortalCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function TimeTravelerPortalCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete,
}: TimeTravelerPortalCeremonyProps) {
  const [stage, setStage] = useState<
    'boot' | 'dataStream' | 'upload' | 'archiveComplete' | 'radiance' | 'outro'
  >('boot');
  const [completed, setCompleted] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // 12 data stream columns — fixed x positions
  const dataColumns = useMemo(() => {
    const count = 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i / count) * 100 + (Math.random() * 4 - 2)}%`,
      duration: 1.5 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 0.8,
    }));
  }, []);

  // 6 memory fragment cards — pre-computed y positions
  const memoryCards = useMemo(() => {
    const icons = ['📸', '🎵', '📝', '🎥', '💭', '⭐'];
    const labels = ['PHOTO', 'AUDIO', 'TEXT', 'VIDEO', 'THOUGHT', 'STAR'];
    return icons.map((icon, i) => ({
      id: i,
      icon,
      label: labels[i],
      y: -120 + i * 50,
      delay: i * 0.2,
    }));
  }, []);

  // 8 upload nodes along progress bar
  const uploadNodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      pct: (i / 7) * 100,
      delay: i * 0.3,
    }));
  }, []);

  // 10 hex labels for burst — fixed positions
  const hexLabels = useMemo(() => {
    const labels = ['0x3A', '0xFF', '0x7C', '0x1D', '0xB2', '0xE9', '0x44', '0xAF', '0x05', '0xD3'];
    return labels.map((label, i) => {
      const angle = (i / labels.length) * Math.PI * 2;
      const dist = 80 + Math.random() * 60;
      return {
        id: i,
        label,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        delay: i * 0.07,
      };
    });
  }, []);

  // 5 file cards for archiveComplete stamp
  const fileCards = useMemo(() => {
    const names = ['MEM_001', 'MEM_002', 'MEM_003', 'MEM_004', 'MEM_005'];
    return names.map((name, i) => ({
      id: i,
      name,
      startX: -300 - i * 40,
      finalX: -180 + i * 90,
      y: -30 + (i % 2) * 20,
      delay: i * 0.12,
    }));
  }, []);

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('boot') },
      { time: 2000, action: () => setStage('dataStream') },
      { time: 6000, action: () => { setStage('upload'); setUploadPct(0); } },
      { time: 10000, action: () => setStage('archiveComplete') },
      { time: 14000, action: () => setStage('radiance') },
      { time: 17000, action: () => setStage('outro') },
      {
        time: 17300,
        action: () => {
          setCompleted(true);
          onComplete?.();
        },
      },
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));

    // Failsafe at ~18s
    const failsafe = setTimeout(() => {
      if (!completed) {
        setStage('outro');
        setCompleted(true);
        onComplete?.();
      }
    }, 18000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafe);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Upload percentage counter — ticks from 0→100 during upload stage
  useEffect(() => {
    if (stage !== 'upload') return;
    setUploadPct(0);
    let val = 0;
    const interval = setInterval(() => {
      val += 1;
      setUploadPct(val);
      if (val >= 100) clearInterval(interval);
    }, 28); // ~2.8s to reach 100
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#050f0f' }}
    >
      <style>{`
        @keyframes matrix-scan {
          0% { transform: translateY(-100%); opacity: 0.9; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes data-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes node-blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes glitch-r {
          0%, 100% { transform: translateX(0); opacity: 0; }
          10%, 90% { opacity: 0.7; }
          50% { transform: translateX(3px); }
        }
        @keyframes glitch-c {
          0%, 100% { transform: translateX(0); opacity: 0; }
          10%, 90% { opacity: 0.7; }
          50% { transform: translateX(-3px); }
        }
      `}</style>

      {/* Matrix grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(0,229,255,0.04) 39px,
            rgba(0,229,255,0.04) 40px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(0,255,136,0.03) 39px,
            rgba(0,255,136,0.03) 40px
          )`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── STAGE 1: BOOT ── */}
      <AnimatePresence>
        {stage === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 gap-4"
          >
            {/* Scan line — single pass */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                background: 'linear-gradient(to right, transparent, #00e5ff, #00ff88, #00e5ff, transparent)',
                boxShadow: '0 0 12px #00e5ff',
                animation: 'matrix-scan 1.4s 0.2s ease-in forwards',
                pointerEvents: 'none',
                zIndex: 30,
              }}
            />

            <motion.p
              className="font-mono text-sm md:text-base"
              style={{ color: '#00ff88', textShadow: '0 0 8px #00ff88', letterSpacing: '0.12em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1] }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              INITIALIZING ARCHIVE SYSTEM...
            </motion.p>

            <motion.h2
              className="font-mono text-xl md:text-3xl font-bold text-center"
              style={{ color: '#00e5ff', textShadow: '0 0 16px #00e5ff', letterSpacing: '0.08em' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              MEMORY FILE: {capsuleTitle}
            </motion.h2>

            <motion.p
              className="font-mono text-xs"
              style={{ color: '#7c3aed', textShadow: '0 0 8px #7c3aed' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              SYS v4.2.1 // TEMPORAL ARCHIVE PROTOCOL ACTIVE
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 2: DATA STREAM ── 12 columns + 6 memory cards */}
      <AnimatePresence>
        {stage === 'dataStream' && (
          <motion.div
            key="dataStream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20"
          >
            {/* 12 scrolling data columns */}
            {dataColumns.map((col) => (
              <div
                key={`col-${col.id}`}
                style={{
                  position: 'absolute',
                  left: col.left,
                  top: 0,
                  width: isMobile ? 18 : 24,
                  height: '200%',
                  overflow: 'hidden',
                  opacity: col.opacity,
                  pointerEvents: 'none',
                  animation: `data-scroll ${col.duration}s ${col.delay}s linear infinite`,
                  fontFamily: 'monospace',
                  fontSize: isMobile ? '9px' : '11px',
                  color: '#00ff88',
                  lineHeight: '1.4',
                  textShadow: '0 0 4px #00ff88',
                  wordBreak: 'break-all',
                }}
              >
                {Array.from({ length: 80 }, (_, r) =>
                  r % 3 === 0
                    ? Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase() + ' '
                    : (Math.random() > 0.5 ? '1' : '0')
                ).join('')}
              </div>
            ))}

            {/* 6 memory fragment cards fly in from left */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? 6 : 10,
                zIndex: 10,
              }}
            >
              {memoryCards.map((card) => (
                <motion.div
                  key={`card-${card.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid #00e5ff',
                    borderRadius: 4,
                    padding: isMobile ? '4px 10px' : '6px 14px',
                    boxShadow: '0 0 10px rgba(0,229,255,0.3), inset 0 0 8px rgba(0,229,255,0.05)',
                    fontFamily: 'monospace',
                    color: '#00e5ff',
                    fontSize: isMobile ? 11 : 13,
                    letterSpacing: '0.1em',
                  }}
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{ fontSize: isMobile ? 14 : 18 }}>{card.icon}</span>
                  <span>{card.label}</span>
                  <span style={{ color: '#00ff8880', fontSize: isMobile ? 9 : 11 }}>
                    [{Math.floor(Math.random() * 900 + 100)}KB]
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 3: UPLOAD SEQUENCE ── progress bar + nodes + counter */}
      <AnimatePresence>
        {stage === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8 gap-6"
          >
            <motion.p
              className="font-mono text-sm md:text-base"
              style={{ color: '#00ff88', letterSpacing: '0.15em', textShadow: '0 0 8px #00ff88' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              UPLOADING MEMORIES...
            </motion.p>

            {/* Percentage counter */}
            <motion.p
              className="font-mono text-4xl md:text-6xl font-bold"
              style={{ color: '#00e5ff', textShadow: '0 0 20px #00e5ff' }}
            >
              {uploadPct}%
            </motion.p>

            {/* Progress bar container */}
            <div
              style={{
                width: isMobile ? '85%' : '60%',
                maxWidth: 480,
                position: 'relative',
              }}
            >
              {/* Track */}
              <div
                style={{
                  width: '100%',
                  height: 6,
                  background: 'rgba(0,229,255,0.15)',
                  border: '1px solid rgba(0,229,255,0.3)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                {/* Fill */}
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #00e5ff, #00ff88)',
                    boxShadow: '0 0 10px #00e5ff',
                    transformOrigin: 'left center',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3, delay: 0.2, ease: 'linear' }}
                />
              </div>

              {/* 8 upload nodes */}
              {uploadNodes.map((node) => (
                <motion.div
                  key={`node-${node.id}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${node.pct}%`,
                    width: isMobile ? 10 : 12,
                    height: isMobile ? 10 : 12,
                    borderRadius: '50%',
                    background: '#050f0f',
                    border: '2px solid #00e5ff',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 6px #00e5ff',
                  }}
                  animate={{
                    background: ['#050f0f', '#00e5ff', '#00ff88'],
                    boxShadow: [
                      '0 0 6px #00e5ff',
                      '0 0 16px #00e5ff, 0 0 30px #00ff88',
                      '0 0 8px #00ff88',
                    ],
                  }}
                  transition={{ duration: 0.4, delay: 0.4 + node.delay, ease: 'easeOut' }}
                />
              ))}
            </div>

            <motion.p
              className="font-mono text-xs"
              style={{ color: '#7c3aed80', letterSpacing: '0.1em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              TEMPORAL ENCRYPTION ACTIVE // AES-256-QUANTUM
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 4: ARCHIVE COMPLETE ── glitch text + file cards + hex burst */}
      <AnimatePresence>
        {stage === 'archiveComplete' && (
          <motion.div
            key="archiveComplete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 gap-5"
          >
            {/* Glitch text group */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Red glitch copy */}
              <div
                className="font-mono font-bold text-center"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: '#ff003c',
                  fontSize: isMobile ? 28 : 44,
                  letterSpacing: '0.1em',
                  pointerEvents: 'none',
                  animation: 'glitch-r 0.3s 0.2s ease-in-out 2',
                  opacity: 0,
                }}
              >
                ARCHIVE COMPLETE
              </div>
              {/* Cyan glitch copy */}
              <div
                className="font-mono font-bold text-center"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: '#00e5ff',
                  fontSize: isMobile ? 28 : 44,
                  letterSpacing: '0.1em',
                  pointerEvents: 'none',
                  animation: 'glitch-c 0.3s 0.35s ease-in-out 2',
                  opacity: 0,
                }}
              >
                ARCHIVE COMPLETE
              </div>
              {/* Main text */}
              <motion.h2
                className="font-mono font-bold text-center relative"
                style={{
                  color: '#ffffff',
                  fontSize: isMobile ? 28 : 44,
                  letterSpacing: '0.1em',
                  textShadow: '0 0 20px #00e5ff, 0 0 40px #00e5ff60',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                ARCHIVE COMPLETE
              </motion.h2>
            </div>

            <motion.p
              className="font-mono text-sm md:text-base"
              style={{ color: '#00ff88', textShadow: '0 0 8px #00ff88', letterSpacing: '0.12em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              UPLOAD SUCCESSFUL
            </motion.p>

            {/* 5 file cards stamp in */}
            <div style={{ position: 'relative', height: isMobile ? 60 : 80, width: '100%', maxWidth: 460 }}>
              {fileCards.map((fc) => (
                <motion.div
                  key={`fc-${fc.id}`}
                  style={{
                    position: 'absolute',
                    top: fc.y,
                    left: '50%',
                    background: 'rgba(0,229,255,0.08)',
                    border: '1px solid #00e5ff60',
                    borderRadius: 3,
                    padding: isMobile ? '3px 8px' : '4px 12px',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? 10 : 12,
                    color: '#00e5ff',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ x: fc.startX, opacity: 0, scale: 0.7 }}
                  animate={{ x: fc.finalX - 230, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + fc.delay, type: 'spring', stiffness: 200, damping: 18 }}
                >
                  {fc.name}.mem
                </motion.div>
              ))}
            </div>

            {/* 10 hex labels scatter burst */}
            <div style={{ position: 'relative', width: 1, height: 1 }}>
              {hexLabels.map((h) => (
                <motion.div
                  key={`hex-${h.id}`}
                  style={{
                    position: 'absolute',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? 10 : 12,
                    color: '#7c3aed',
                    textShadow: '0 0 8px #7c3aed',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x: h.x, y: h.y, opacity: [0, 1, 0.8, 0], scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 1.5, delay: h.delay, ease: 'easeOut' }}
                >
                  {h.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── STAGE 5: RADIANCE ── cyan glow + title + subtext */}
      <AnimatePresence>
        {stage === 'radiance' && (
          <motion.div
            key="radiance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4 gap-4"
          >
            {/* Expanding cyan radial glow — single-play */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,229,255,0.35) 0%, rgba(0,255,136,0.15) 40%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: ['0px', '150vmax'],
                height: ['0px', '150vmax'],
                opacity: [0, 0.4, 0.3, 0],
              }}
              transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Title with neon cyan glow */}
            <motion.h2
              className="font-mono font-bold text-center relative z-10"
              style={{
                color: '#00e5ff',
                fontSize: isMobile ? 22 : 36,
                letterSpacing: '0.12em',
                textShadow: '0 0 20px #00e5ff, 0 0 50px #00e5ff80, 0 0 100px #00e5ff40',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              MEMORY FILE: {capsuleTitle}
            </motion.h2>

            <motion.p
              className="font-mono text-base md:text-xl font-bold text-center relative z-10"
              style={{
                color: '#00ff88',
                textShadow: '0 0 12px #00ff88',
                letterSpacing: '0.18em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              MEMORY PRESERVED FOR ETERNITY
            </motion.p>

            <motion.p
              className="font-mono text-xs text-center relative z-10"
              style={{ color: '#7c3aed80', letterSpacing: '0.1em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              ARCHIVE ID: {Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OUTRO fade ── */}
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
