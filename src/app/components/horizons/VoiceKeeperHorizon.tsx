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

export function VoiceKeeperHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const notes = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: 15 + i * 12,
  delay: i * 0.5,
  duration: 4 + i * 0.3
})), []);

const waveformBars = useMemo(() => Array.from({ length: 32 }, (_, i) => ({
  id: i,
  height: 20 + Math.random() * 60,
  delay: i * 0.05
})), []);

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* 🎙️ Voice Keeper - Deep magenta to vibrant pink, audio waveform aesthetic */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, #86198F 0%, #DB2777 50%, #F472B6 100%)`,
      }}
    />
    
    {/* Animated waveform visualization */}
    <div className="absolute bottom-16 left-0 right-0 flex items-end justify-center gap-0.5 sm:gap-1 px-4 opacity-25">
      {waveformBars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-1 sm:w-1.5 bg-pink-200/70 rounded-t-full"
          animate={{
            height: [`${bar.height * 0.3}%`, `${bar.height}%`, `${bar.height * 0.3}%`]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
    
    {/* Vintage microphone silhouette */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
      animate={{ 
        scale: [1, 1.08, 1]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="relative">
        {/* Mic body */}
        <div className="w-8 h-16 sm:w-10 sm:h-20 bg-pink-100/60 rounded-full mx-auto" />
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100/50 rounded-full mx-auto mt-1" />
        {/* Mic stand */}
        <div className="w-1 h-12 sm:h-16 bg-pink-100/50 mx-auto" />
        <div className="w-8 sm:w-10 h-1 bg-pink-100/50 rounded-full mx-auto" />
        {/* Grill lines */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-6 sm:w-7 h-px bg-magenta-200/40"
            style={{ top: `${8 + i * 6}px` }}
          />
        ))}
      </div>
    </motion.div>
    
    {/* Sound wave circular pulses */}
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={`pulse-${i}`}
        className="absolute left-1/2 -translate-x-1/2 bottom-16 rounded-full border-2 border-pink-200/25"
        animate={{
          width: ['80px', '200px', '200px'],
          height: ['80px', '200px', '200px'],
          opacity: [0.5, 0, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 1,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Musical notes floating upward */}
    {notes.map((n) => (
      <motion.div
        key={n.id}
        className="absolute text-lg sm:text-2xl"
        style={{
          left: `${n.left}%`,
          bottom: '25%'
        }}
        animate={{ 
          y: [0, -90, -90],
          x: [0, (n.id - 3) * 12, (n.id - 3) * 12],
          opacity: [0, 0.8, 0],
          rotate: [0, n.id % 2 === 0 ? 25 : -25, n.id % 2 === 0 ? 25 : -25]
        }}
        transition={{
          duration: n.duration,
          repeat: Infinity,
          delay: n.delay,
          ease: 'easeOut'
        }}
      >
        {n.id % 3 === 0 ? '♪' : n.id % 3 === 1 ? '♫' : '♬'}
      </motion.div>
    ))}
    
    {/* Frequency circles */}
    <div className="absolute inset-0 opacity-10">
      {[30, 50, 70].map((size) => (
        <motion.div
          key={size}
          className="absolute left-1/2 bottom-16 -translate-x-1/2 rounded-full border border-pink-100/60"
          style={{ width: `${size}%`, paddingBottom: `${size}%` }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: size * 0.01
          }}
        />
      ))}
    </div>
    
    {/* Cosmic effects */}
    {Object.values(effects).map(effect => effect)}
    
    {/* 🌌 RANDOM COSMIC EVENTS */}
    {cosmicEvents}
    
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);

}
