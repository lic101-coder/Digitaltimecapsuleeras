import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface HorizonProps {
  height: string;
  positioning: string;
  variants: { initial: any; animate: any; exit: any };
  performanceStyle: React.CSSProperties;
  effects: Record<string, React.ReactNode>;
  cosmicEvents: React.ReactNode;
}

export function FutureMessengerHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const envelopes = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: -10 + i * 5,
  top: 20 + i * 12,
  delay: i * 0.9,
  duration: 5 + i * 0.3
})), []);

const dataPackets = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 10 + i * 8,
  top: 15 + (i % 4) * 20,
  delay: i * 0.2,
  duration: 2 + (i % 3) * 0.5
})), []);

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* Deep purple space tunnel - warp speed aesthetic */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(90deg, #1a0a2e 0%, #6D28D9 50%, #A78BFA 100%)`,
      }}
    />
    
    {/* Warp speed light streaks */}
    <div className="absolute inset-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute h-px bg-purple-300/60"
          style={{
            top: `${15 + i * 10}%`,
            left: '0%',
            width: '100%',
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 1.5 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'linear'
          }}
        />
      ))}
    </div>
    
    {/* Central glowing envelope traveling */}
    <motion.div
      className="absolute top-1/2 text-5xl sm:text-6xl"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.8))'
      }}
      animate={{ 
        x: ['-10%', '110%'],
        y: [0, -10, 0],
        rotate: [0, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      📨
    </motion.div>
    
    {/* Shooting star messages */}
    {envelopes.map((e) => (
      <motion.div
        key={e.id}
        className="absolute text-base sm:text-lg"
        style={{
          left: `${e.left}%`,
          top: `${e.top}%`
        }}
        animate={{ 
          x: ['0%', '120%'],
          opacity: [0, 0.7, 0]
        }}
        transition={{
          duration: e.duration,
          repeat: Infinity,
          delay: e.delay,
          ease: 'easeOut'
        }}
      >
        ✉️
      </motion.div>
    ))}
    
    {/* Data packets flowing */}
    {dataPackets.map((d) => (
      <motion.div
        key={`packet-${d.id}`}
        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-300 rounded-sm"
        style={{
          left: `${d.left}%`,
          top: `${d.top}%`
        }}
        animate={{ 
          x: ['0%', '100%'],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5]
        }}
        transition={{
          duration: d.duration,
          repeat: Infinity,
          delay: d.delay,
          ease: 'linear'
        }}
      />
    ))}
    
    {/* Holographic mail icons orbiting */}
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.div
        key={`hologram-${i}`}
        className="absolute text-sm opacity-30"
        style={{
          left: '50%',
          top: '50%',
        }}
        animate={{ 
          x: [Math.cos(i * Math.PI / 2) * 60, Math.cos((i * Math.PI / 2) + Math.PI * 2) * 60],
          y: [Math.sin(i * Math.PI / 2) * 40, Math.sin((i * Math.PI / 2) + Math.PI * 2) * 40],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: i * 1.5,
          ease: 'linear'
        }}
      >
        📧
      </motion.div>
    ))}
    
    {/* Purple neon trail particles */}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`trail-${i}`}
        className="absolute w-0.5 h-0.5 bg-purple-400/80 rounded-full"
        style={{
          left: `${10 + i * 9}%`,
          top: `${40 + (i % 3) * 10}%`
        }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
    
    {/* Cosmic effects */}
    {Object.values(effects).map(effect => effect)}
    
    {/* 🌌 RANDOM COSMIC EVENTS */}
    {cosmicEvents}
    
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);

}
