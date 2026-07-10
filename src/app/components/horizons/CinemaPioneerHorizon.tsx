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

export function CinemaPioneerHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const filmFrames = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
  id: i,
  delay: i * 0.12
})), []);

const sparkles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 20 + i * 10,
  top: 25 + (i % 3) * 18,
  delay: i * 0.4
})), []);

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* 🎥 Cinema Pioneer - Deep ruby red to golden amber, vintage movie theater */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, #7C2D12 0%, #DC2626 40%, #F59E0B 100%)`,
      }}
    />
    
    {/* Ornate curtain texture - top */}
    <div className="absolute top-0 left-0 right-0 h-20 opacity-25">
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 to-transparent" />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full w-8 sm:w-10 bg-red-800/40"
          style={{ left: `${i * 12.5}%` }}
          animate={{
            scaleY: [1, 0.95, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
    
    {/* Film reel - larger and more detailed */}
    <motion.div
      className="absolute top-1/4 right-1/5 w-20 h-20 sm:w-28 sm:h-28 rounded-full opacity-30"
      animate={{ rotate: 360 }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      <div className="absolute inset-0 rounded-full border-4 border-amber-300/50" />
      <div className="absolute inset-2 rounded-full border-2 border-orange-200/40" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <div
          key={angle}
          className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-200/50 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-24px)`
          }}
        />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-orange-300/40" />
    </motion.div>
    
    {/* Dual film strips scrolling */}
    <motion.div
      className="absolute left-3 top-0 w-10 sm:w-12 h-[250%] opacity-20"
      animate={{ y: ['0%', '-33.33%'] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {filmFrames.map((f) => (
        <div
          key={f.id}
          className="w-full mb-1.5 border-2 border-amber-200/70 bg-orange-900/20"
          style={{ height: '24px' }}
        >
          <div className="flex justify-between px-0.5 h-full">
            <div className="w-1 bg-amber-300/50" />
            <div className="w-1 bg-amber-300/50" />
          </div>
        </div>
      ))}
    </motion.div>
    
    <motion.div
      className="absolute right-3 top-0 w-10 sm:w-12 h-[250%] opacity-20"
      animate={{ y: ['-33.33%', '0%'] }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {filmFrames.map((f) => (
        <div
          key={f.id}
          className="w-full mb-1.5 border-2 border-amber-200/70 bg-orange-900/20"
          style={{ height: '24px' }}
        >
          <div className="flex justify-between px-0.5 h-full">
            <div className="w-1 bg-amber-300/50" />
            <div className="w-1 bg-amber-300/50" />
          </div>
        </div>
      ))}
    </motion.div>
    
    {/* Projector beam cone */}
    <motion.div
      className="absolute top-1/3 left-6 opacity-20"
      style={{
        width: 0,
        height: 0,
        borderLeft: '50px solid transparent',
        borderRight: '50px solid transparent',
        borderTop: '80px solid rgba(251, 191, 36, 0.4)',
        transform: 'rotate(90deg)',
        filter: 'blur(4px)'
      }}
      animate={{
        opacity: [0.15, 0.3, 0.15]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
    
    {/* Golden sparkles - movie magic */}
    {sparkles.map((s) => (
      <motion.div
        key={s.id}
        className="absolute text-base sm:text-lg"
        style={{
          left: `${s.left}%`,
          top: `${s.top}%`
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.8, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: s.delay
        }}
      >
        ✨
      </motion.div>
    ))}
    
    {/* Cosmic effects */}
    {Object.values(effects).map(effect => effect)}
    
    {/* 🌌 RANDOM COSMIC EVENTS */}
    {cosmicEvents}
    
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);

}
