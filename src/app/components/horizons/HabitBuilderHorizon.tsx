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

export function HabitBuilderHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const embers = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 30 + i * 6,
  delay: i * 0.3,
  duration: 3 + i * 0.2
})), []);

const bricks = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
  id: i,
  col: i % 5,
  row: Math.floor(i / 5),
  delay: i * 0.15
})), []);

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* Deep emerald - building and growth */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(180deg, #059669 0%, #10B981 40%, #047857 100%)`,
      }}
    />
    
    {/* Monument being built brick-by-brick */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-32 sm:w-32 sm:h-40">
      {bricks.map((b) => (
        <motion.div
          key={`brick-${b.id}`}
          className="absolute border border-emerald-300/40 bg-emerald-600/20"
          style={{
            width: '18%',
            height: '13%',
            left: `${b.col * 20 + (b.row % 2) * 10}%`,
            bottom: `${b.row * 14}%`,
          }}
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ 
            opacity: [0, 0.6, 0.6],
            scale: [0.5, 1, 1],
            y: [-20, 0, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 4,
            delay: b.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
    
    {/* Construction crane silhouette */}
    <motion.div 
      className="absolute top-8 right-12 opacity-15"
      animate={{
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="relative w-12 h-16 sm:w-16 sm:h-20">
        {/* Crane arm */}
        <div className="absolute top-0 left-1/2 w-px h-8 sm:h-12 bg-emerald-300/50" />
        <div className="absolute top-0 left-1/2 w-10 sm:w-14 h-px bg-emerald-300/50 origin-left" 
          style={{ transform: 'rotate(-30deg)' }} />
      </div>
    </motion.div>
    
    {/* Flame icon representing dedication */}
    <motion.div
      className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-20"
      animate={{ 
        scale: [1, 1.15, 1.05, 1.2, 1],
        opacity: [0.15, 0.25, 0.2, 0.3, 0.15]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      🔥
    </motion.div>
    
    {/* Ember particles rising from dedication flame */}
    {embers.map((e) => (
      <motion.div
        key={e.id}
        className="absolute w-1 h-1 rounded-full bg-amber-400"
        style={{
          left: `${e.left}%`,
          bottom: '25%',
        }}
        animate={{ 
          y: [0, -70, -70],
          x: [0, (e.id - 5) * 4, (e.id - 5) * 4],
          opacity: [0.7, 0.3, 0],
          scale: [1, 0.4, 0]
        }}
        transition={{
          duration: e.duration,
          repeat: Infinity,
          delay: e.delay,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Progress bars as foundation */}
    <div className="absolute bottom-0 left-0 right-0 h-3 bg-emerald-950/40 flex gap-px">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={`progress-${i}`}
          className="flex-1 bg-emerald-400/30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.4,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          style={{
            transformOrigin: 'bottom'
          }}
        />
      ))}
    </div>
    
    {/* Building sparkles */}
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={`build-sparkle-${i}`}
        className="absolute w-0.5 h-0.5 bg-emerald-200 rounded-full"
        style={{
          left: `${30 + i * 5}%`,
          bottom: `${20 + (i % 3) * 15}%`
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
