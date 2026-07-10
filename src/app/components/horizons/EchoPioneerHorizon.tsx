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

export function EchoPioneerHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const ripples = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
  id: i,
  delay: i * 1.2
})), []);

const sonarPings = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: i * 45,
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
    {/* 📡 Echo Pioneer - Deep cyan cosmic pond with sonar ripple physics */}
    <div 
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, #164E63 0%, #0891B2 50%, #22D3EE 100%)`,
      }}
    />
    
    {/* Underwater texture effect */}
    <motion.div
      className="absolute inset-0 opacity-20"
      style={{
        background: `radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
                     radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
    
    {/* Concentric sonar ripples - expanding from center */}
    {ripples.map((ripple) => (
      <motion.div
        key={ripple.id}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300/60"
        animate={{
          width: ['40px', '300px', '300px'],
          height: ['40px', '300px', '300px'],
          opacity: [0.8, 0, 0],
          borderWidth: ['2px', '1px', '0px']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: ripple.delay,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Inner ripple set - faster frequency */}
    {ripples.slice(0, 3).map((ripple) => (
      <motion.div
        key={`inner-${ripple.id}`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/50"
        animate={{
          width: ['20px', '150px', '150px'],
          height: ['20px', '150px', '150px'],
          opacity: [0.6, 0, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: ripple.delay * 0.5,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Central sonar transmitter */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-300/40 border-2 border-cyan-100/70 shadow-lg"
      animate={{
        scale: [1, 1.15, 1],
        boxShadow: [
          '0 0 10px rgba(34, 211, 238, 0.5)',
          '0 0 30px rgba(34, 211, 238, 0.8)',
          '0 0 10px rgba(34, 211, 238, 0.5)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="absolute inset-2 rounded-full bg-cyan-200/50" />
    </motion.div>
    
    {/* Sonar ping radial lines */}
    {sonarPings.map((ping) => (
      <motion.div
        key={ping.id}
        className="absolute left-1/2 top-1/2 w-0.5 sm:w-1 h-16 sm:h-24 bg-gradient-to-b from-cyan-300/70 to-transparent origin-top"
        style={{
          transform: `translateX(-50%) rotate(${ping.angle}deg)`,
          transformOrigin: '50% 0'
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scaleY: [0.5, 1.2, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: ping.delay,
          ease: 'easeOut'
        }}
      />
    ))}
    
    {/* Echo delay trail particles */}
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.div
        key={`trail-${i}`}
        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-200/60"
        style={{
          left: `${50 + Math.cos(i * 22.5 * Math.PI / 180) * 15}%`,
          top: `${50 + Math.sin(i * 22.5 * Math.PI / 180) * 15}%`,
          boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)'
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.1,
          ease: 'easeInOut'
        }}
      />
    ))}
    
    {/* Water ripple distortion lines */}
    {[20, 40, 60, 80].map((percent) => (
      <motion.div
        key={`wave-${percent}`}
        className="absolute left-0 right-0 h-px bg-cyan-300/20"
        style={{ top: `${percent}%` }}
        animate={{
          scaleX: [1, 1.02, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: percent * 0.01,
          ease: 'easeInOut'
        }}
      />
    ))}
    
    {/* Sonar icon */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl opacity-15"
      animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      📡
    </motion.div>
    
    {/* Cosmic effects */}
    {Object.values(effects).map(effect => effect)}
    
    {/* 🌌 RANDOM COSMIC EVENTS */}
    {cosmicEvents}
    
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);

}
