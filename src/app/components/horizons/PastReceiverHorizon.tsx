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

export function PastReceiverHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const letters = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: 20 + i * 15,
  delay: i * 0.8,
  duration: 4 + i * 0.4
})), []);

const polaroids = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: 15 + i * 14,
  top: 20 + (i % 3) * 15,
  delay: i * 0.5,
  rotation: -15 + i * 6
})), []);

return (
  <motion.div 
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    {/* Warm amber glow - nostalgic past aesthetic */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, #FCD34D 0%, #FBBF24 40%, #F59E0B 70%, #D97706 100%)`,
      }}
    />
    
    {/* Golden light rays bursting from center */}
    <div className="absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-px h-full bg-amber-200/20 origin-bottom"
          style={{
            left: '50%',
            bottom: '40%',
            transform: `rotate(${i * 30}deg)`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            height: ['40%', '100%', '40%']
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
    
    {/* Vintage mailbox with opening animation */}
    <motion.div
      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl"
      style={{
        filter: 'drop-shadow(0 10px 30px rgba(217, 119, 6, 0.5))'
      }}
      animate={{ 
        scale: [1, 1.08, 1],
        y: [0, -5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      📬
    </motion.div>
    
    {/* Scattered polaroid photos floating */}
    {polaroids.map((p) => (
      <motion.div
        key={`polaroid-${p.id}`}
        className="absolute w-6 h-7 sm:w-8 sm:h-9 bg-white/20 border border-amber-100/30 opacity-30"
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`,
          rotate: p.rotation
        }}
        animate={{ 
          y: [0, -15, 0],
          rotate: [p.rotation, p.rotation + 5, p.rotation],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4 + p.id * 0.3,
          repeat: Infinity,
          delay: p.delay,
          ease: 'easeInOut'
        }}
      >
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-amber-300/40" />
      </motion.div>
    ))}
    
    {/* Letters bursting out */}
    {letters.map((l) => (
      <motion.div
        key={l.id}
        className="absolute text-lg sm:text-xl"
        style={{
          left: `${l.left}%`,
          bottom: '25%'
        }}
        animate={{ 
          y: [0, -70, -70],
          x: [0, (l.id - 2) * 20, (l.id - 2) * 20],
          opacity: [0, 0.7, 0],
          rotate: [0, (l.id - 2) * 20, (l.id - 2) * 20]
        }}
        transition={{
          duration: l.duration,
          repeat: Infinity,
          delay: l.delay
        }}
      >
        📧
      </motion.div>
    ))}
    
    {/* Sepia-toned memory fragments */}
    <div className="absolute inset-0 opacity-15">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`fragment-${i}`}
          className="absolute w-2 h-2 bg-amber-100 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + (i % 4) * 18}%`,
            filter: 'sepia(0.8)'
          }}
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
    
    {/* Old film grain texture overlay */}
    <div 
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.05) 3px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.05) 3px)
        `,
      }}
    />
    
    {/* Golden nostalgic sparkles */}
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div
        key={`gold-${i}`}
        className="absolute w-1 h-1 bg-yellow-200 rounded-full"
        style={{
          left: `${15 + i * 10}%`,
          top: `${30 + (i % 4) * 12}%`
        }}
        animate={{ 
          scale: [0, 1.8, 0],
          opacity: [0, 0.9, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3
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
