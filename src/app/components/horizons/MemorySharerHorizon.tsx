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

export function MemorySharerHorizon({ height, positioning, variants, performanceStyle, effects, cosmicEvents }: HorizonProps) {

const continents = useMemo(() => [
  { id: 0, angle: 0, name: 'NA' }, { id: 1, angle: 60, name: 'EU' }, { id: 2, angle: 120, name: 'AS' },
  { id: 3, angle: 180, name: 'SA' }, { id: 4, angle: 240, name: 'AF' }, { id: 5, angle: 300, name: 'OC' }
], []);

const connections = useMemo(() => Array.from({ length: 15 }, (_, i) => ({ id: i, from: i % 6, to: (i + 2) % 6, delay: i * 0.4 })), []);

return (
  <motion.div
    className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
    initial={variants.initial}
    animate={variants.animate}
    exit={variants.exit}
    style={performanceStyle}
  >
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0C4A6E 0%, #075985 40%, #0369A1 80%, #0284C7 100%)' }} />
    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0px, transparent 20px), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0px, transparent 20px)' }} />
    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-50" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(14, 165, 233, 0.8) 0%, rgba(3, 105, 161, 0.6) 50%, rgba(12, 74, 110, 0.4) 100%)', borderRadius: '50%', border: '3px solid rgba(14, 165, 233, 0.5)', boxShadow: '0 0 40px rgba(14, 165, 233, 0.6), inset -10px -10px 30px rgba(0, 0, 0, 0.3)' }} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}><div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(255, 255, 255, 0.1) 10px, transparent 20px)' }} /><div className="absolute inset-0 rounded-full opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(255, 255, 255, 0.1) 10px, transparent 20px)' }} /></motion.div>
    {continents.map((continent) => (<motion.div key={continent.id} className="absolute top-1/2 left-1/2" style={{ transformOrigin: 'center' }}><div className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full" style={{ background: 'rgba(34, 211, 238, 0.8)', border: '2px solid rgba(14, 165, 233, 1)', boxShadow: '0 0 15px rgba(34, 211, 238, 0.9)', transform: `translateX(${18}vw) translateY(-50%)` }} /><motion.div className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-cyan-400/40" style={{ transform: `translateX(${18}vw) translateY(-50%) translate(-25%, -25%)` }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: continent.id * 0.3 }} /><div className="absolute text-xs sm:text-sm font-mono text-cyan-300/70" style={{ transform: `translateX(${18}vw) translateY(-50%) translateY(20px)` }}>{continent.name}</div></motion.div>))}
    {connections.map((conn) => { const fromAngle = continents[conn.from].angle; return (<motion.div key={conn.id} className="absolute top-1/2 left-1/2 origin-left h-px" style={{ width: '18vw', background: 'linear-gradient(to right, rgba(34, 211, 238, 0.6), rgba(14, 165, 233, 0.3))', transform: `rotate(${fromAngle}deg)`, transformOrigin: 'left center' }} animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: conn.delay, ease: 'easeInOut' }} />); })}
    {[0, 1, 2, 3, 4].map((i) => (<motion.div key={`pulse-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-400/30" animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }} />))}
    {[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`packet-${i}`} className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-300 rounded-full" style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.9)' }} animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'linear' }} />))}
    {['🌍', '🌎', '🌏'].map((globe, i) => (<motion.div key={`globe-${i}`} className="absolute text-3xl sm:text-4xl opacity-20" style={{ left: `${25 + i * 25}%`, top: `${20 + (i % 2) * 40}%` }} animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }}>{globe}</motion.div>))}
    <motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-30" animate={{ scale: [1, 1.1, 1], rotateY: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🎁</motion.div>
    <motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-30" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>↗️</motion.div>
    {Object.values(effects).map(effect => effect)}
    {cosmicEvents}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
  </motion.div>
);
}
