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

export function GoldenHourKeeperHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* Animated time-of-day gradient transition */}
    <motion.div 
      className="absolute inset-0"
      animate={{
        background: [
          'linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)',
          'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)',
          'linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)'
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
    
    {/* PARALLAX LAYER 1 (Background) - Slow moving clouds */}
    <motion.div 
      className="absolute inset-0 opacity-30"
      animate={{ x: [0, -100, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`cloud-bg-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${i * 25}%`,
            top: `${20 + (i % 3) * 15}%`,
            width: `${80 + i * 20}px`,
            height: `${40 + i * 10}px`,
            background: 'rgba(255, 255, 255, 0.2)'
          }}
        />
      ))}
    </motion.div>
    
    {/* PARALLAX LAYER 2 (Mid) - God rays with depth */}
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1000px' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 left-1/2 origin-top"
          style={{
            width: '60px',
            height: '200%',
            background: `linear-gradient(to bottom, 
              rgba(251, 191, 36, ${0.15 + (i % 3) * 0.05}), 
              transparent 70%)`,
            transform: `rotate(${i * 15}deg) translateZ(${-50 + i * 10}px)`,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </div>
    
    {/* LENS FLARE EFFECT - Distinctive visual signature */}
    <motion.div
      className="absolute"
      style={{
        left: '70%',
        top: '20%',
      }}
      animate={{
        left: ['70%', '30%', '70%'],
        top: ['20%', '40%', '20%']
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Main flare */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-amber-400/40 blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/60 blur-md" />
      </div>
      {/* Flare artifacts */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${-40 - i * 30}px`,
            top: `${-10 + i * 15}px`,
            width: `${20 - i * 3}px`,
            height: `${20 - i * 3}px`,
            background: `rgba(251, 191, 36, ${0.4 - i * 0.08})`,
            filter: 'blur(4px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </motion.div>
    
    {/* PARALLAX LAYER 3 (Foreground) - Fast floating embers with depth */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={`ember-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${(i * 11) % 100}%`,
          top: `${(i * 17) % 80}%`,
          width: `${3 + (i % 4)}px`,
          height: `${3 + (i % 4)}px`,
          background: i % 3 === 0 ? '#FEF3C7' : '#FCD34D',
          boxShadow: `0 0 ${8 + (i % 3) * 4}px rgba(251, 191, 36, 0.8)`,
          filter: 'blur(0.5px)'
        }}
        animate={{
          y: [0, -80, -150],
          x: [(i % 2 ? -10 : 10), (i % 2 ? -20 : 20), (i % 2 ? -30 : 30)],
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.3]
        }}
        transition={{
          duration: 4 + (i % 3),
          repeat: Infinity,
          delay: i * 0.4,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Sunrise/Sunset split effect */}
    <motion.div className="absolute left-0 top-0 bottom-16 w-1/2 opacity-30" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.3), rgba(234, 88, 12, 0.2))' }} />
    </motion.div>
    <motion.div className="absolute right-0 top-0 bottom-16 w-1/2 opacity-30" animate={{ opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(249, 115, 22, 0.3), rgba(220, 38, 38, 0.2))' }} />
    </motion.div>
    
    {/* Photographer silhouette */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-25">
      <div className="relative w-12 h-20 sm:w-16 sm:h-24">
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-900/80" />
        {/* Body */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-10 sm:w-8 sm:h-12 bg-amber-900/80" />
        {/* Camera */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-4 sm:w-10 sm:h-5 bg-amber-800/80 rounded-sm">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-3 sm:w-5 sm:h-4 bg-amber-800/80 rounded-r" />
        </div>
      </div>
    </div>
    
    {Object.values(effects).map(effect => effect)}
    {cosmicEvents}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);

}
