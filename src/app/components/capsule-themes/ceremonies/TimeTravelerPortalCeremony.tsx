/**
 * Time Traveler - Digital Archive Ceremony (ENHANCED & OPTIMIZED)
 * 
 * Futuristic memory digitization with cascading data streams and holographic displays.
 * Features: Digital grid materializes → data streams begin flowing → holographic upload terminal appears
 * → memory fragments upload as glowing data packets → archive visualization with hexagonal grid
 * → neural network connections form → EPIC 44-ray cyan-electric radiance with digital burst
 * 
 * Stages:
 * 4. 7-9.5s: Memory fragments visualized as glowing data packets uploading
 * 5. 9.5-11.5s: Archive visualization with hexagonal grid pattern
 * 6. 11.5-13s: Neural network connections form web
 * 7. 13-15.5s: TRANSCENDENT 44-ray cyan-electric radiance with digital particles (2.5 SECONDS!)
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimeTravelerPortalCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface DataStream {
  id: number;
  x: number;
  speed: number;
  characters: string;
  delay: number;
}

interface DataPacket {
  id: number;
  x: number;
  y: number;
  targetY: number;
  size: number;
  delay: number;
}

interface HexNode {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function TimeTravelerPortalCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: TimeTravelerPortalCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'grid' | 'streams' | 'terminal' | 'upload' | 'archive' | 'network' | 'radiance' | 'outro'>('intro');
  const [dataStreams, setDataStreams] = useState<DataStream[]>([]);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [hexNodes, setHexNodes] = useState<HexNode[]>([]);
  const [completed, setCompleted] = useState(false);

  // Animation timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1500, action: () => setStage('grid') },
      { time: 3500, action: () => setStage('streams') },
      { time: 5500, action: () => setStage('terminal') },
      { time: 8000, action: () => setStage('upload') },
      { time: 10000, action: () => setStage('archive') },
      { time: 11500, action: () => setStage('network') },
      { time: 13000, action: () => setStage('radiance') },
      { time: 15500, action: () => setStage('outro') },
      { time: 18000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) =>
      setTimeout(action, time)
    );

    // Completion failsafe - ensure ceremony always completes
    const failsafeTimeout = setTimeout(() => {
      setCompleted(true);
      onComplete?.();
    }, 19000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(failsafeTimeout);
    };
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate Matrix-style data streams
  useEffect(() => {
    if (stage === 'streams' || stage === 'terminal') {
      const newStreams: DataStream[] = [];
      const chars = '01アイウエオカキクケコサシスセソタチツテト';
      
      for (let i = 0; i < 30; i++) {
        newStreams.push({
          id: i,
          x: (i / 30) * 100,
          speed: 2 + Math.random() * 2,
          characters: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''),
          delay: i * 0.05
        });
      }
      setDataStreams(newStreams);
    }
  }, [stage]);

  // Generate data packets uploading
  useEffect(() => {
    if (stage === 'upload') {
      const newPackets: DataPacket[] = [];
      for (let i = 0; i < 60; i++) {
        newPackets.push({
          id: i,
          x: -250 + (i % 12) * 42,
          y: 200,
          targetY: -150,
          size: 0.8 + Math.random() * 0.4,
          delay: i * 0.04
        });
      }
      setPackets(newPackets);
    }
  }, [stage]);

  // Generate hexagonal archive nodes
  useEffect(() => {
    if (stage === 'archive' || stage === 'network' || stage === 'radiance') {
      const newNodes: HexNode[] = [];
      const rings = 4;
      
      for (let ring = 0; ring < rings; ring++) {
        const nodesInRing = ring === 0 ? 1 : ring * 6;
        for (let i = 0; i < nodesInRing; i++) {
          if (ring === 0) {
            newNodes.push({ id: 0, x: 0, y: 0, size: 1.2, delay: 0 });
          } else {
            const angle = (i / nodesInRing) * Math.PI * 2;
            const distance = ring * 60;
            newNodes.push({
              id: ring * 100 + i,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              size: 0.9,
              delay: ring * 0.1 + i * 0.02
            });
          }
        }
      }
      setHexNodes(newNodes);
    }
  }, [stage]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a]">
      {/* Deep digital space gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: stage === 'radiance'
            ? 'radial-gradient(ellipse at 50% 50%, #1a2030 0%, #0f1420 50%, #0a0e1a 100%)'
            : 'radial-gradient(ellipse at 50% 50%, #0f1420 0%, #0a0e1a 70%, #050810 100%)'
        }}
        transition={{ duration: 2 }}
      />

      {/* Ambient cyan glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: stage === 'radiance' ? 0.9 : 0.4
        }}
        transition={{ duration: 2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.3) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </motion.div>

      {/* Title */}
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-12 sm:top-16 left-0 right-0 text-center z-20 px-4"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-cyan-200 drop-shadow-2xl mb-2 font-mono"
              animate={{
                textShadow: [
                  '0 0 30px rgba(34, 211, 238, 0.8)',
                  '0 0 50px rgba(34, 211, 238, 1)',
                  '0 0 30px rgba(34, 211, 238, 0.8)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              Digital Archive
            </motion.h1>
            <p className="text-cyan-300/90 mt-2 text-sm sm:text-base font-mono">Uploading consciousness to the cloud</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main scene container */}
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Digital grid background */}
        <AnimatePresence>
          {(stage === 'grid' || stage === 'streams' || stage === 'terminal') && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              {/* Horizontal lines */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`h-line-${i}`}
                  className="absolute w-full h-px"
                  style={{
                    top: `${(i / 20) * 100}%`,
                    background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.3) 50%, transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: i * 0.03 }}
                />
              ))}
              
              {/* Vertical lines */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`v-line-${i}`}
                  className="absolute w-px h-full"
                  style={{
                    left: `${(i / 20) * 100}%`,
                    background: 'linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.3) 50%, transparent)',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.03 }}
                />
              ))}

              {/* Scanning lines */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`scan-${i}`}
                  className="absolute w-full h-1"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.8) 50%, transparent)',
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
                    filter: 'blur(2px)'
                  }}
                  animate={{
                    top: ['0%', '100%']
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: 'linear'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Matrix-style data streams */}
        <AnimatePresence>
          {(stage === 'streams' || stage === 'terminal') && dataStreams.map((stream) => (
            <motion.div
              key={`stream-${stream.id}`}
              className="absolute top-0 font-mono text-xs z-15"
              style={{
                left: `${stream.x}%`,
                color: 'rgba(34, 211, 238, 0.9)',
                textShadow: '0 0 10px rgba(34, 211, 238, 1)',
                fontWeight: 'bold',
                letterSpacing: '2px',
                writingMode: 'vertical-rl'
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: stream.speed,
                delay: stream.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {stream.characters}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Holographic upload terminal */}
        <AnimatePresence>
          {(stage === 'terminal' || stage === 'upload') && (
            <motion.div
              className="absolute z-30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: stage === 'upload' ? [1, 1.2, 0] : 1,
                opacity: stage === 'upload' ? [1, 0.8, 0] : 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                scale: { duration: stage === 'upload' ? 2 : 1.5 },
                opacity: { duration: stage === 'upload' ? 2 : 1.2 }
              }}
            >
              {/* Terminal glow */}
              <motion.div
                className="absolute inset-0 -m-32"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <div
                  className="w-96 h-96"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 80%)',
                    filter: 'blur(60px)'
                  }}
                />
              </motion.div>

              {/* Main terminal frame */}
              <div
                className="relative w-[400px] h-[500px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 30, 45, 0.9) 0%, rgba(10, 20, 35, 0.95) 100%)',
                  border: '2px solid rgba(34, 211, 238, 0.6)',
                  boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), inset 0 0 60px rgba(34, 211, 238, 0.2)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '8px'
                }}
              >
                {/* Terminal header */}
                <div
                  className="h-12 border-b border-cyan-500/40 flex items-center px-4 font-mono text-cyan-300"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(34, 211, 238, 0.2), transparent)'
                  }}
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-4 text-sm">MEMORY_UPLOAD.exe</span>
                </div>

                {/* Terminal content */}
                <div className="p-6 font-mono text-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-cyan-300"
                  >
                    <p className="mb-2">&gt; Initializing memory upload...</p>
                    <p className="mb-2 text-green-400">&gt; Connection established ✓</p>
                    <p className="mb-4 text-green-400">&gt; Archive ready ✓</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="text-cyan-300"
                  >
                    <p className="mb-2">&gt; Scanning memories...</p>
                    
                    {/* Progress bar */}
                    <div className="my-4 h-6 border border-cyan-500/40 rounded overflow-hidden bg-black/40">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, delay: 1.5 }}
                        style={{
                          boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
                        }}
                      />
                    </div>

                    <motion.p
                      className="text-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.5 }}
                    >
                      &gt; Upload complete ✓
                    </motion.p>
                  </motion.div>

                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>

                {/* Corner decorations */}
                {[
                  { top: -2, left: -2, rotate: 0 },
                  { top: -2, right: -2, rotate: 90 },
                  { bottom: -2, right: -2, rotate: 180 },
                  { bottom: -2, left: -2, rotate: 270 }
                ].map((pos, idx) => (
                  <div
                    key={`corner-${idx}`}
                    className="absolute w-8 h-8"
                    style={{
                      ...pos,
                      transform: `rotate(${pos.rotate}deg)`
                    }}
                  >
                    <svg viewBox="0 0 20 20" className="w-full h-full">
                      <path
                        d="M 0 0 L 20 0 L 20 5 L 5 5 L 5 20 L 0 20 Z"
                        fill="rgba(34, 211, 238, 0.6)"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data packets uploading */}
        <AnimatePresence>
          {stage === 'upload' && packets.map((packet) => (
            <motion.div
              key={`packet-${packet.id}`}
              className="absolute z-25"
              style={{
                width: `${20 * packet.size}px`,
                height: `${20 * packet.size}px`
              }}
              initial={{ x: packet.x, y: packet.y, opacity: 0, scale: 0 }}
              animate={{
                x: packet.x,
                y: packet.targetY,
                opacity: [0, 1, 0.9, 0],
                scale: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: packet.delay,
                ease: 'easeOut'
              }}
            >
              {/* Hexagon shape */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon
                  points="50,5 90,30 90,70 50,95 10,70 10,30"
                  fill="rgba(34, 211, 238, 0.3)"
                  stroke="rgba(34, 211, 238, 1)"
                  strokeWidth="3"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 1))'
                  }}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="rgba(34, 211, 238, 0.8)"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 1))'
                  }}
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hexagonal archive grid */}
        <AnimatePresence>
          {(stage === 'archive' || stage === 'network' || stage === 'radiance') && hexNodes.map((node) => (
            <motion.div
              key={`hex-${node.id}`}
              className="absolute z-35"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: node.x,
                y: node.y,
                scale: node.size,
                opacity: [0, 1, 0.9, 1]
              }}
              transition={{
                delay: node.delay,
                duration: 1.2,
                opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              {/* Node glow */}
              <motion.div
                className="absolute inset-0 -m-6"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: node.delay
                }}
              >
                <div
                  className="w-16 h-16"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.3) 50%, transparent 80%)',
                    filter: 'blur(12px)'
                  }}
                />
              </motion.div>

              {/* Hexagon node */}
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,5 90,30 90,70 50,95 10,70 10,30"
                    fill="rgba(34, 211, 238, 0.4)"
                    stroke="rgba(34, 211, 238, 1)"
                    strokeWidth="4"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 1))'
                    }}
                  />
                  {node.id === 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="rgba(34, 211, 238, 0.9)"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 1))'
                      }}
                    />
                  )}
                </svg>
              </div>
            </motion.div>
          ))}

          {/* Neural network connections */}
          {stage === 'network' && hexNodes.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 34 }}>
              <defs>
                <linearGradient id="network-line-gradient">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.3)" />
                  <stop offset="50%" stopColor="rgba(34, 211, 238, 0.8)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
                </linearGradient>
              </defs>

              {hexNodes.slice(1).map((node, i) => {
                const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
                const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
                const centerNode = hexNodes[0];

                return (
                  <motion.line
                    key={`connection-${i}`}
                    x1={centerX + centerNode.x}
                    y1={centerY + centerNode.y}
                    x2={centerX + node.x}
                    y2={centerY + node.y}
                    stroke="url(#network-line-gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.02 }}
                  />
                );
              })}
            </svg>
          )}
        </AnimatePresence>

        {/* TRANSCENDENT radiance burst */}
        <AnimatePresence>
          {stage === 'radiance' && (
            <>
              {/* 44 cyan-electric radial rays */}
              {[...Array(44)].map((_, i) => {
                const angle = (i / 44) * 360;

                return (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: '8px',
                      marginLeft: '-100vw',
                      marginTop: '-4px',
                      background: `linear-gradient(to right, transparent, rgba(34, 211, 238, ${i % 2 === 0 ? 1 : 0.85}) 50%, transparent)`,
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(2px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1.8, 1.6],
                      opacity: [0, 1, 0.85, 1, 0.85]
                    }}
                    transition={{
                      scaleX: { duration: 2, ease: 'easeOut' },
                      opacity: { duration: 2.5, repeat: completed ? 0 : 2, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Secondary electric blue rays */}
              {[...Array(22)].map((_, i) => {
                const angle = (i / 22) * 360 + 8;

                return (
                  <motion.div
                    key={`electric-ray-${i}`}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '200vw',
                      height: '5px',
                      marginLeft: '-100vw',
                      marginTop: '-2.5px',
                      background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.9) 50%, transparent)',
                      transformOrigin: 'center center',
                      transform: `rotate(${angle}deg)`,
                      filter: 'blur(3px)'
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1.6, 1.4],
                      opacity: [0, 0.8, 0.6, 0.8]
                    }}
                    transition={{
                      scaleX: { duration: 2.2, ease: 'easeOut' },
                      opacity: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                );
              })}

              {/* Central digital supernova */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 4.5, 4],
                  opacity: [0, 1, 0.9]
                }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
              >
                <div
                  className="w-[32rem] h-[32rem] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(224, 242, 254, 0.95) 8%, rgba(34, 211, 238, 0.9) 20%, rgba(6, 182, 212, 0.7) 40%, rgba(59, 130, 246, 0.5) 60%, rgba(29, 78, 216, 0.3) 75%, transparent 88%)',
                    boxShadow: '0 0 250px rgba(34, 211, 238, 1), 0 0 400px rgba(255, 255, 255, 0.6)',
                    filter: 'blur(70px)'
                  }}
                />
              </motion.div>

              {/* Orbiting data particles */}
              {(() => {
                const allParticles = [];
                
                for (let ring = 0; ring < 3; ring++) {
                  const radius = 120 + ring * 65;
                  const particleCount = 32 + ring * 12;

                  for (let i = 0; i < particleCount; i++) {
                    const angle = (i / particleCount) * 360;
                    const uniqueKey = `orbit-${ring}-${i}`;

                    allParticles.push(
                      <motion.div
                        key={uniqueKey}
                        className="absolute rounded-full"
                        style={{
                          width: `${6 - ring}px`,
                          height: `${6 - ring}px`,
                          background: 'radial-gradient(circle, rgba(34, 211, 238, 1) 0%, rgba(6, 182, 212, 0.8) 100%)',
                          boxShadow: '0 0 15px rgba(34, 211, 238, 1)',
                          filter: 'blur(0.5px)'
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
                          opacity: [0, 1, 0.9, 1, 0.9]
                        }}
                        transition={{
                          delay: 0.5 + (ring * 50 + i) * 0.012,
                          duration: 6 + ring * 2,
                          repeat: Infinity,
                          ease: 'linear',
                          opacity: { duration: 2.5, repeat: completed ? 0 : 2, ease: 'easeInOut' }
                        }}
                      />
                    );
                  }
                }
                return allParticles;
              })()}

              {/* Expanding digital burst */}
              {[...Array(120)].map((_, i) => {
                const angle = (i / 120) * Math.PI * 2;
                const distance = 80 + Math.random() * 230;
                const x = Math.cos(angle) * distance;
                const startY = Math.sin(angle) * distance - 100;

                return (
                  <motion.div
                    key={`burst-particle-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: -100, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: [startY, startY + 260],
                      scale: [0, 1.6, 1],
                      opacity: [0, 1, 0.8, 1, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      delay: i * 0.015,
                      ease: 'easeOut'
                    }}
                  >
                    <div
                      className="w-4 h-4"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(34, 211, 238, 1) 100%)',
                        boxShadow: '0 0 12px rgba(34, 211, 238, 1)',
                        filter: 'blur(1px)',
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Hexagon burst */}
              {[...Array(50)].map((_, i) => {
                const angle = (i / 50) * Math.PI * 2;
                const distance = 150 + Math.random() * 140;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`hex-burst-${i}`}
                    className="absolute"
                    style={{ width: '30px', height: '30px' }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.6, 1.2],
                      opacity: [0, 1, 0.85, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2.8,
                      delay: 0.4 + i * 0.022,
                      opacity: { duration: 2.5, repeat: completed ? 0 : 2, ease: 'easeInOut' }
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polygon
                        points="50,5 90,30 90,70 50,95 10,70 10,30"
                        fill="rgba(34, 211, 238, 0.6)"
                        stroke="rgba(34, 211, 238, 1)"
                        strokeWidth="4"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 1))'
                        }}
                      />
                    </svg>
                  </motion.div>
                );
              })}

              {/* Emoji burst */}
              {[...Array(24)].map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const distance = 180 + Math.random() * 90;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`emoji-burst-${i}`}
                    className="absolute text-5xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: x,
                      y: y,
                      scale: [0, 1.5, 1.2],
                      opacity: [0, 1, 0.9],
                      rotate: [0, 180]
                    }}
                    transition={{
                      duration: 2.5,
                      delay: 0.6 + i * 0.045,
                      ease: 'easeOut'
                    }}
                  >
                    💾
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

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
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-200 drop-shadow-2xl mb-3 font-mono">
              Memory Uploaded to the Cloud 💾✨🔷
            </h2>
            <p className="text-2xl text-blue-200 drop-shadow-lg font-mono">
              Your data lives forever in the digital archive
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}