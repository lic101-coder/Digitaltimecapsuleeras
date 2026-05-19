import React from 'react';
import { motion } from 'motion/react';

// ============================================================================
// COSMIC EVENTS SYSTEM - Random rare celestial phenomena across all horizons
// Enhanced with natural flight patterns and complete trajectories
// ============================================================================

export type CosmicEventType = 
  | 'shooting-comet'
  | 'meteor-shower'
  | 'satellite-pass'
  | 'star-birth'
  | 'asteroid-tumble'
  | 'supernova-burst'
  | 'nebula-bloom'
  | 'planet-transit'
  | 'black-hole'
  | 'cosmic-vortex'
  | 'space-lightning'
  | 'ufo-streak'
  | 'cosmic-ray-burst'
  | 'wormhole'
  | 'crystal-formation'
  | 'stardust-explosion'
  | 'spacex-starship'
  | 'space-station';

export type CosmicEventRarity = 'common' | 'uncommon' | 'rare' | 'very-rare';

interface CosmicEventDefinition {
  type: CosmicEventType;
  rarity: CosmicEventRarity;
  duration: number; // in seconds
  probability: number; // weight for random selection
  name: string;
}

// ============================================================================
// EVENT DEFINITIONS with Rarity System
// ============================================================================

export const COSMIC_EVENTS: CosmicEventDefinition[] = [
  // COMMON (40% total probability)
  { type: 'shooting-comet', rarity: 'common', duration: 2.5, probability: 25, name: 'Shooting Comet' },
  { type: 'meteor-shower', rarity: 'common', duration: 4, probability: 15, name: 'Meteor Shower' },
  
  // UNCOMMON (30% total probability)
  { type: 'satellite-pass', rarity: 'uncommon', duration: 8, probability: 12, name: 'Satellite Pass' },
  { type: 'star-birth', rarity: 'uncommon', duration: 5, probability: 10, name: 'Star Birth' },
  { type: 'asteroid-tumble', rarity: 'uncommon', duration: 7, probability: 8, name: 'Asteroid Tumble' },
  
  // RARE (20% total probability)
  { type: 'supernova-burst', rarity: 'rare', duration: 4, probability: 8, name: 'Supernova Burst' },
  { type: 'nebula-bloom', rarity: 'rare', duration: 7, probability: 7, name: 'Nebula Bloom' },
  { type: 'planet-transit', rarity: 'rare', duration: 12, probability: 5, name: 'Planet Transit' },
  
  // VERY RARE (10% total probability)
  { type: 'black-hole', rarity: 'very-rare', duration: 10, probability: 4, name: 'Black Hole Formation' },
  { type: 'cosmic-vortex', rarity: 'very-rare', duration: 7, probability: 3, name: 'Cosmic Vortex' },
  { type: 'space-lightning', rarity: 'very-rare', duration: 2.5, probability: 2, name: 'Space Lightning' },
  { type: 'ufo-streak', rarity: 'very-rare', duration: 4, probability: 1, name: 'UFO Streak' },
  { type: 'cosmic-ray-burst', rarity: 'very-rare', duration: 5, probability: 1, name: 'Cosmic Ray Burst' },
  { type: 'wormhole', rarity: 'very-rare', duration: 6, probability: 1, name: 'Wormhole' },
  { type: 'crystal-formation', rarity: 'very-rare', duration: 4, probability: 1, name: 'Crystal Formation' },
  { type: 'stardust-explosion', rarity: 'very-rare', duration: 3, probability: 1, name: 'Stardust Explosion' },
  { type: 'spacex-starship', rarity: 'very-rare', duration: 4.5, probability: 1, name: 'SpaceX Starship' },
  { type: 'space-station', rarity: 'very-rare', duration: 8, probability: 1, name: 'Space Station' },
];

// ============================================================================
// RANDOM EVENT SELECTOR with Weighted Probability
// ============================================================================

export function getRandomCosmicEvent(): CosmicEventDefinition {
  const totalProbability = COSMIC_EVENTS.reduce((sum, event) => sum + event.probability, 0);
  let random = Math.random() * totalProbability;
  
  for (const event of COSMIC_EVENTS) {
    random -= event.probability;
    if (random <= 0) {
      return event;
    }
  }
  
  // Fallback (should never happen)
  return COSMIC_EVENTS[0];
}

// ============================================================================
// EVENT RENDERERS - Each cosmic event's visual implementation
// ============================================================================

interface EventProps {
  themeColors: string[]; // Adapt to current horizon's theme
}

// 💫 SHOOTING COMET - ENHANCED with varied trajectories
export function ShootingComet({ themeColors }: EventProps) {
  // Multiple diagonal paths for natural variety
  const trajectories = [
    { startX: -8, startY: 15, endX: 108, endY: 80, angle: 35 },  // Top-left to bottom-right
    { startX: 108, startY: 20, endX: -8, endY: 85, angle: -35 }, // Top-right to bottom-left
    { startX: 20, startY: -5, endX: 80, endY: 95, angle: 50 },   // Top-center steep
    { startX: -5, startY: 30, endX: 105, endY: 70, angle: 25 },  // Shallow diagonal
    { startX: 105, startY: 10, endX: -5, endY: 60, angle: -30 }, // Shallow opposite
  ];
  
  const path = trajectories[Math.floor(Math.random() * trajectories.length)];
  const color = themeColors[0] || '#60a5fa';
  const coreColor = '#ffffff';
  
  return (
    <motion.div
      className="absolute"
      initial={{
        left: `${path.startX}%`,
        top: `${path.startY}%`,
        opacity: 0
      }}
      animate={{ 
        left: `${path.endX}%`,
        top: `${path.endY}%`,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ 
        duration: 2.5, 
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.1, 0.5, 0.85, 1]
      }}
    >
      {/* Bright white core */}
      <div
        className="absolute w-4 h-4 rounded-full"
        style={{
          background: `radial-gradient(circle, ${coreColor} 0%, ${color} 60%, transparent 100%)`,
          boxShadow: `0 0 25px ${coreColor}, 0 0 50px ${color}`,
        }}
      />
      
      {/* Multi-layered tail with gradient fade */}
      <motion.div
        className="absolute w-80 h-3 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${coreColor} 0%, ${color} 15%, ${color}cc 40%, ${color}66 70%, transparent 100%)`,
          boxShadow: `0 0 20px ${color}`,
          left: -320,
          top: 0,
          filter: 'blur(1.5px)',
          transform: `rotate(${path.angle}deg)`,
          transformOrigin: 'right center',
        }}
        initial={{ scaleX: 0.2 }}
        animate={{ scaleX: [0.2, 1.2, 1, 0.6] }}
        transition={{ duration: 2.5, times: [0, 0.15, 0.7, 1] }}
      />
      
      {/* Wider glow layer */}
      <motion.div
        className="absolute w-64 h-6 rounded-full blur-lg"
        style={{
          background: `linear-gradient(90deg, ${color}88 0%, ${color}44 50%, transparent 100%)`,
          left: -256,
          top: -2,
          transform: `rotate(${path.angle}deg)`,
          transformOrigin: 'right center',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.6, repeat: 3 }}
      />
      
      {/* Particle debris trail */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 3 === 0 ? coreColor : color,
            boxShadow: `0 0 10px ${color}`,
            left: -i * 20 - 10,
            top: (Math.random() - 0.5) * 8,
            transform: `rotate(${path.angle}deg)`,
            transformOrigin: 'right center',
          }}
          initial={{ opacity: 1, scale: 1.2 }}
          animate={{ 
            opacity: 0, 
            scale: 0.2,
            y: (Math.random() - 0.5) * 25,
          }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.06,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Atmospheric ionization glow */}
      <motion.div
        className="absolute w-16 h-16 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, ${color}99 0%, transparent 70%)`,
          left: 0,
          top: 0,
        }}
        animate={{ 
          scale: [1, 1.8, 1.2],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 0.7, repeat: 2 }}
      />
    </motion.div>
  );
}

// ☄️ METEOR SHOWER - ENHANCED with natural arcing paths
export function MeteorShower({ themeColors }: EventProps) {
  const meteorCount = 9 + Math.floor(Math.random() * 5); // 9-13 meteors
  const color = themeColors[1] || '#fb923c';
  
  return (
    <>
      {[...Array(meteorCount)].map((_, i) => {
        const startX = 15 + Math.random() * 70;
        const startY = -5 + Math.random() * 25;
        const angle = 40 + Math.random() * 20; // Natural meteor angle
        const distance = 120 + Math.random() * 60;
        const delay = Math.random() * 2.5;
        const speed = 1.2 + Math.random() * 0.6;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              left: `${startX}%`,
              top: `${startY}%`,
              opacity: 0 
            }}
            animate={{ 
              x: distance, 
              y: distance * 0.8, // Natural downward arc
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: speed, 
              delay, 
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.15, 0.7, 1]
            }}
          >
            {/* Meteor core */}
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 12px ${color}, 0 0 6px #ffffff`,
              }}
            />
            
            {/* Tail */}
            <motion.div
              className="absolute w-24 h-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color} 0%, ${color}99 30%, transparent 100%)`,
                left: -96,
                top: 0,
                filter: 'blur(0.5px)',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'right center',
              }}
              animate={{ scaleX: [0.3, 1, 0.8] }}
              transition={{ duration: speed }}
            />
          </motion.div>
        );
      })}
    </>
  );
}

// ✨ STAR BIRTH - ENHANCED with better particle convergence
export function StarBirth({ themeColors }: EventProps) {
  const centerX = 25 + Math.random() * 50;
  const centerY = 25 + Math.random() * 40;
  const color = themeColors[0] || '#fbbf24';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Converging particles from all directions */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const distance = 120 + Math.random() * 30;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
            initial={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{ 
              x: 0,
              y: 0,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0],
            }}
            transition={{ 
              duration: 5, 
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.3, 0.7, 1]
            }}
          />
        );
      })}
      
      {/* New star formation - pulsing core */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color}cc 40%, transparent 70%)`,
          boxShadow: `0 0 40px ${color}`,
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: [0, 40, 50, 45],
          height: [0, 40, 50, 45],
          opacity: [0, 0.8, 1, 0.85, 0],
        }}
        transition={{ duration: 5, delay: 2, times: [0, 0.4, 0.6, 0.85, 1] }}
      />
      
      {/* Birth flash */}
      <motion.div
        className="absolute w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${color} 50%, transparent 70%)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [0, 0.9, 0],
        }}
        transition={{ duration: 1.5, delay: 3 }}
      />
    </motion.div>
  );
}

// 🪨 ASTEROID TUMBLE - ENHANCED with varied paths and natural tumbling
export function AsteroidTumble({ themeColors }: EventProps) {
  const asteroidCount = 4 + Math.floor(Math.random() * 3); // 4-6 asteroids
  
  // Natural asteroid paths - some diagonal, some horizontal
  const paths = [
    { startX: -12, startY: 25, endX: 112, endY: 35, curve: 5 },
    { startX: 112, startY: 40, endX: -12, endY: 50, curve: -5 },
    { startX: -10, startY: 20, endX: 110, endY: 60, curve: 10 },
    { startX: 110, startY: 30, endX: -10, endY: 70, curve: -8 },
  ];
  
  return (
    <>
      {[...Array(asteroidCount)].map((_, i) => {
        const path = paths[i % paths.length];
        const size = 14 + Math.random() * 20; // 14-34px varied sizes
        const speed = 6 + Math.random() * 3;
        const rotationSpeed = 360 + Math.random() * 900;
        
        // Realistic asteroid colors
        const asteroidColors = [
          { surface: '#78716c', crater: '#57534e', shadow: '#44403c' },
          { surface: '#a8a29e', crater: '#78716c', shadow: '#57534e' },
          { surface: '#92827a', crater: '#6b5e54', shadow: '#57534e' },
          { surface: '#6b7280', crater: '#4b5563', shadow: '#374151' },
        ];
        const colorSet = asteroidColors[i % asteroidColors.length];
        
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              left: `${path.startX}%`,
              top: `${path.startY}%`,
              rotate: 0,
            }}
            animate={{ 
              left: `${path.endX}%`,
              top: `${path.endY}%`,
              rotate: rotationSpeed,
            }}
            transition={{ 
              duration: speed, 
              delay: i * 0.6,
              ease: "linear",
              top: {
                duration: speed,
                ease: [0.45, 0, 0.55, 1], // Natural arc
              }
            }}
            style={{
              filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.5))',
            }}
          >
            {/* Asteroid body with realistic shading */}
            <div
              className="relative rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle at 35% 35%, ${colorSet.surface} 0%, ${colorSet.shadow} 100%)`,
                boxShadow: `inset -4px -4px 8px ${colorSet.shadow}, inset 2px 2px 4px rgba(255,255,255,0.1)`,
              }}
            >
              {/* Surface craters */}
              <div 
                className="absolute rounded-full"
                style={{
                  width: `${size * 0.4}px`,
                  height: `${size * 0.4}px`,
                  background: `radial-gradient(circle, ${colorSet.crater} 0%, transparent 80%)`,
                  top: '12%',
                  left: '58%',
                  opacity: 0.7,
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: `${size * 0.3}px`,
                  height: `${size * 0.3}px`,
                  background: `radial-gradient(circle, ${colorSet.crater} 0%, transparent 80%)`,
                  top: '60%',
                  left: '18%',
                  opacity: 0.6,
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  width: `${size * 0.25}px`,
                  height: `${size * 0.25}px`,
                  background: `radial-gradient(circle, ${colorSet.crater} 0%, transparent 80%)`,
                  top: '75%',
                  left: '70%',
                  opacity: 0.5,
                }}
              />
              
              {/* Highlight for 3D effect */}
              <div
                className="absolute rounded-full"
                style={{
                  width: `${size * 0.45}px`,
                  height: `${size * 0.45}px`,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  top: '18%',
                  left: '22%',
                }}
              />
            </div>
            
            {/* Subtle dust trail */}
            <motion.div
              className="absolute blur-sm"
              style={{
                width: `${size * 2.5}px`,
                height: `${size * 0.6}px`,
                background: `linear-gradient(90deg, ${colorSet.shadow}50 0%, transparent 100%)`,
                right: size,
                top: size * 0.2,
              }}
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        );
      })}
    </>
  );
}

// 🪐 PLANET TRANSIT - ENHANCED with slower, more majestic movement
export function PlanetTransit({ themeColors }: EventProps) {
  const startY = 25 + Math.random() * 45;
  const planetSize = 35 + Math.random() * 25; // 35-60px
  const direction = Math.random() > 0.5 ? 1 : -1;
  const hasRings = planetSize > 42; // Larger planets get rings
  
  // Planet color variations
  const planetTypes = [
    { surface: '#f97316', shadow: '#7c2d12', atmosphere: '#fb923c' }, // Orange (Jupiter-like)
    { surface: '#3b82f6', shadow: '#1e3a8a', atmosphere: '#60a5fa' }, // Blue (Neptune-like)
    { surface: '#eab308', shadow: '#713f12', atmosphere: '#fde047' }, // Yellow (Saturn-like)
    { surface: '#ef4444', shadow: '#7f1d1d', atmosphere: '#f87171' }, // Red (Mars-like)
  ];
  const planet = planetTypes[Math.floor(Math.random() * planetTypes.length)];
  
  return (
    <motion.div
      className="absolute"
      style={{ top: `${startY}%` }}
      initial={{ left: direction > 0 ? '-15%' : '115%' }}
      animate={{ left: direction > 0 ? '115%' : '-15%' }}
      transition={{ duration: 12, ease: "linear" }}
    >
      <div className="relative" style={{ transform: direction > 0 ? 'none' : 'scaleX(-1)' }}>
        {/* Planet body */}
        <div
          className="relative rounded-full"
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            background: `radial-gradient(circle at 35% 35%, ${planet.surface} 0%, ${planet.shadow} 100%)`,
            boxShadow: `inset -6px -6px 16px rgba(0,0,0,0.7), 0 0 30px ${planet.atmosphere}60`,
          }}
        >
          {/* Surface band features (for gas giants) */}
          {planetSize > 45 && (
            <>
              <div 
                className="absolute w-full h-1/4 opacity-40"
                style={{ 
                  background: planet.shadow,
                  top: '25%',
                  borderRadius: '50%',
                }}
              />
              <div 
                className="absolute w-full h-1/5 opacity-30"
                style={{ 
                  background: planet.surface,
                  top: '55%',
                  borderRadius: '50%',
                }}
              />
            </>
          )}
          
          {/* Rings (Saturn-style) */}
          {hasRings && (
            <>
              <div
                className="absolute border-4 rounded-full opacity-70"
                style={{
                  width: `${planetSize * 2}px`,
                  height: `${planetSize * 0.6}px`,
                  borderColor: `${planet.atmosphere}aa`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%) rotateX(75deg)',
                  boxShadow: `0 0 15px ${planet.atmosphere}66, inset 0 0 10px ${planet.shadow}44`,
                }}
              />
              {/* Ring gap (Cassini Division) */}
              <div
                className="absolute border-2 rounded-full opacity-50"
                style={{
                  width: `${planetSize * 1.6}px`,
                  height: `${planetSize * 0.48}px`,
                  borderColor: `${planet.shadow}`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%) rotateX(75deg)',
                }}
              />
            </>
          )}
        </div>
        
        {/* Atmospheric glow - pulsing */}
        <motion.div
          className="absolute rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${planetSize * 1.6}px`,
            height: `${planetSize * 1.6}px`,
            background: `radial-gradient(circle, ${planet.atmosphere}50 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Subtle moving shadow (rotation effect) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: `${planetSize}px`,
            height: `${planetSize}px`,
            background: `linear-gradient(90deg, transparent 0%, ${planet.shadow}40 100%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

// 💥 SUPERNOVA BURST - ENHANCED with more dramatic explosion
export function SupernovaBurst({ themeColors }: EventProps) {
  const centerX = 30 + Math.random() * 40;
  const centerY = 25 + Math.random() * 35;
  const color = themeColors[0] || '#f59e0b';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Initial star (pre-explosion) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: color,
          boxShadow: `0 0 20px ${color}`,
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: [1, 0.5, 2],
          opacity: [1, 1, 0],
        }}
        transition={{ duration: 1, times: [0, 0.6, 1] }}
      />
      
      {/* MASSIVE core explosion */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${color} 30%, ${color}cc 60%, transparent 80%)`,
          boxShadow: `0 0 80px ${color}`,
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: [0, 250, 350],
          height: [0, 250, 350],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 4, delay: 0.8, ease: "easeOut" }}
      />
      
      {/* Multiple shockwave rings */}
      {[0, 0.3, 0.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute border-4 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i === 0 ? '#ffffff' : color,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 500,
            height: 500,
            opacity: 0,
            borderWidth: [4, 2, 0],
          }}
          transition={{ duration: 3, delay: 1 + delay, ease: "easeOut" }}
        />
      ))}
      
      {/* Ejected star material particles */}
      {[...Array(32)].map((_, i) => {
        const angle = (i / 32) * Math.PI * 2;
        const distance = 180 + Math.random() * 40;
        
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 3 === 0 ? '#ffffff' : color,
              boxShadow: `0 0 15px ${color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.5, 1, 0.3],
            }}
            transition={{ 
              duration: 4, 
              delay: 1 + (i / 32) * 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        );
      })}
      
      {/* Brightness flash */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${color}88 50%, transparent 70%)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 3, 0],
        }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </motion.div>
  );
}

// 🌫️ NEBULA BLOOM - ENHANCED with richer colors and star formation
export function NebulaBloom({ themeColors }: EventProps) {
  const centerX = 25 + Math.random() * 50;
  const centerY = 30 + Math.random() * 35;
  const color1 = themeColors[0] || '#ec4899';
  const color2 = themeColors[1] || '#8b5cf6';
  const color3 = themeColors[2] || '#3b82f6';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Multi-layered nebula clouds with depth */}
      {[
        { color: color1, delay: 0, scale: 1.3, opacity: 0.7 },
        { color: color2, delay: 0.8, scale: 1.1, opacity: 0.6 },
        { color: color3, delay: 1.5, scale: 0.9, opacity: 0.5 },
      ].map((layer, i) => (
        <motion.div
          key={i}
          className="absolute w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `radial-gradient(ellipse, ${layer.color} 0%, ${layer.color}88 30%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            scale: [0, layer.scale * 1.2, layer.scale * 2.2],
            opacity: [0, layer.opacity, 0],
            rotate: [0, 45, 90],
          }}
          transition={{ 
            duration: 7, 
            delay: layer.delay,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Forming stars within nebula */}
      {[...Array(16)].map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 80;
        
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white"
            style={{
              left: Math.cos(angle) * distance,
              top: Math.sin(angle) * distance,
              boxShadow: '0 0 8px #ffffff',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8, 1, 0.8],
              scale: [0, 1.5, 1, 1.5, 0.8],
            }}
            transition={{ 
              duration: 3,
              delay: 2.5 + Math.random() * 2,
              repeat: 1,
            }}
          />
        );
      })}
      
      {/* Nebula filaments */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const color = [color1, color2, color3][i % 3];
        
        return (
          <motion.div
            key={`fil-${i}`}
            className="absolute w-1 h-32 blur-md"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, transparent 100%)`,
              transformOrigin: 'bottom center',
            }}
            initial={{
              rotate: (angle * 180 / Math.PI),
              scaleY: 0,
              opacity: 0,
            }}
            animate={{ 
              scaleY: [0, 1, 1.2],
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: 7,
              delay: 1 + i * 0.3,
              ease: "easeOut"
            }}
          />
        );
      })}
    </motion.div>
  );
}

// 🌑 BLACK HOLE - ENHANCED with gravitational effects
export function BlackHole({ themeColors }: EventProps) {
  const centerX = 35 + Math.random() * 30;
  const centerY = 30 + Math.random() * 35;
  const accentColor = themeColors[0] || '#8b5cf6';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Event horizon - pure black center */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, #000000 0%, #000000 50%, #1a0033 70%, transparent 80%)`,
          border: `3px solid ${accentColor}`,
          boxShadow: `0 0 30px ${accentColor}, inset 0 0 20px #000000`,
        }}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: [0, 90, 90, 0],
          height: [0, 90, 90, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 10, times: [0, 0.2, 0.8, 1] }}
      />
      
      {/* Accretion disk - multiple rotating rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i % 2 === 0 ? accentColor : `${accentColor}aa`,
            borderWidth: '3px',
          }}
          initial={{ 
            width: 120 + i * 50, 
            height: 25 + i * 12, 
            opacity: 0,
            rotate: 0,
          }}
          animate={{ 
            width: 120 + i * 50,
            height: 25 + i * 12,
            opacity: [0, 0.9, 0.9, 0],
            rotate: [0, i % 2 === 0 ? 720 : -720],
          }}
          transition={{ 
            duration: 10,
            times: [0, 0.2, 0.8, 1],
            rotate: { duration: 6 + i, ease: "linear" }
          }}
        />
      ))}
      
      {/* Matter being pulled in - spiraling particles */}
      {[...Array(32)].map((_, i) => {
        const angle = (i / 32) * Math.PI * 2;
        const startDistance = 150;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
            initial={{ 
              x: Math.cos(angle) * startDistance,
              y: Math.sin(angle) * startDistance,
              opacity: 0,
              scale: 1,
            }}
            animate={{ 
              x: [
                Math.cos(angle) * startDistance,
                Math.cos(angle + Math.PI * 3) * 30,
                0
              ],
              y: [
                Math.sin(angle) * startDistance,
                Math.sin(angle + Math.PI * 3) * 30,
                0
              ],
              opacity: [0, 1, 1, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{ 
              duration: 8,
              delay: 1 + (i / 32) * 3,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}
      
      {/* Gravitational lensing effect - warped light */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-4 border-white/20 -translate-x-1/2 -translate-y-1/2 blur-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.3, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 10 }}
      />
      
      {/* Hawking radiation */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        
        return (
          <motion.div
            key={`radiation-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              boxShadow: '0 0 6px #ffffff',
            }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{ 
              x: Math.cos(angle) * 120,
              y: Math.sin(angle) * 120,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{ 
              duration: 3,
              delay: 6 + Math.random() * 2,
              ease: "easeOut"
            }}
          />
        );
      })}
    </motion.div>
  );
}

// 🌪️ COSMIC VORTEX - ENHANCED portal effect
export function CosmicVortex({ themeColors }: EventProps) {
  const centerX = 30 + Math.random() * 40;
  const centerY = 30 + Math.random() * 35;
  const color1 = themeColors[0] || '#a855f7';
  const color2 = themeColors[1] || '#3b82f6';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Vortex spirals - counter-rotating */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-4 -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i % 2 === 0 ? color1 : color2,
            borderStyle: i % 3 === 0 ? 'dashed' : 'solid',
            width: 50 + i * 25,
            height: 50 + i * 25,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.9, 0.9, 0],
            scale: [0, 1, 1, 0],
            rotate: i % 2 === 0 ? [0, 1080] : [0, -1080],
          }}
          transition={{ 
            duration: 7,
            delay: i * 0.15,
            ease: "easeInOut",
            rotate: { duration: 7, ease: "linear" }
          }}
        />
      ))}
      
      {/* Portal energy core */}
      <motion.div
        className="absolute w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.8, 1.5, 0],
        }}
        transition={{ duration: 7 }}
      />
      
      {/* Swirling particles being pulled in */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 80;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: i % 2 === 0 ? color1 : color2,
              boxShadow: `0 0 10px ${i % 2 === 0 ? color1 : color2}`,
            }}
            initial={{ 
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 0,
              scale: 1,
            }}
            animate={{ 
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI * 5) * 15,
                0
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI * 5) * 15,
                0
              ],
              opacity: [0, 1, 1, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{ 
              duration: 7,
              delay: 0.5 + (i / 24) * 2,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}
      
      {/* Energy pulses */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i % 2 === 0 ? color1 : color2,
            width: 60,
            height: 60,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 4,
          }}
          transition={{ 
            duration: 2,
            delay: i * 1.5,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );
}

// ⚡ SPACE LIGHTNING - ENHANCED dramatic bolts
export function SpaceLightning({ themeColors }: EventProps) {
  const paths = [
    { startX: 10, startY: 0, midX: 42, midY: 50, endX: 75, endY: 100 },
    { startX: 88, startY: 8, midX: 58, midY: 55, endX: 22, endY: 95 },
    { startX: 50, startY: 3, midX: 28, midY: 60, endX: 8, endY: 100 },
  ];
  
  const path = paths[Math.floor(Math.random() * paths.length)];
  const color = themeColors[0] || '#8b5cf6';
  
  // Create MORE DRAMATIC jagged lightning path
  const generateLightningPath = () => {
    const segments: string[] = [];
    segments.push(`M ${path.startX},${path.startY}`);
    
    // Main zigzag from start to mid - more aggressive
    const midSteps = 6;
    for (let i = 1; i <= midSteps; i++) {
      const progress = i / midSteps;
      const x = path.startX + (path.midX - path.startX) * progress + (Math.random() - 0.5) * 18;
      const y = path.startY + (path.midY - path.startY) * progress;
      const deviation = i % 2 === 0 ? 12 : -12;
      segments.push(`L ${x + deviation},${y}`);
    }
    
    // Mid to end with even more aggressive zigzag
    const endSteps = 7;
    for (let i = 1; i <= endSteps; i++) {
      const progress = i / endSteps;
      const x = path.midX + (path.endX - path.midX) * progress + (Math.random() - 0.5) * 22;
      const y = path.midY + (path.endY - path.midY) * progress;
      const deviation = i % 2 === 0 ? 15 : -15;
      segments.push(`L ${x + deviation},${y}`);
    }
    
    return segments.join(' ');
  };
  
  const mainBoltPath = generateLightningPath();
  
  return (
    <motion.div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
      {/* Main lightning bolt */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Outer glow bolt */}
        <motion.path
          d={mainBoltPath}
          stroke={color}
          strokeWidth="2"
          fill="none"
          filter="url(#lightning-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.5, times: [0, 0.12, 0.6, 1], ease: "easeInOut" }}
        />
        
        {/* Core BRIGHT bolt */}
        <motion.path
          d={mainBoltPath}
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          filter="url(#lightning-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.5, times: [0, 0.12, 0.6, 1], ease: "easeInOut" }}
        />
        
        {/* Branch bolts - more of them! */}
        {[...Array(5)].map((_, i) => {
          const branchStart = 25 + i * 15;
          const branchPath = `M ${branchStart + (Math.random() - 0.5) * 12},${15 + i * 18} L ${branchStart + 18},${30 + i * 18} L ${branchStart + 12},${42 + i * 18}`;
          
          return (
            <motion.path
              key={i}
              d={branchPath}
              stroke={color}
              strokeWidth="0.8"
              fill="none"
              filter="url(#lightning-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.9, 0],
              }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.04, times: [0, 0.5, 1] }}
            />
          );
        })}
        
        <defs>
          <filter id="lightning-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* INTENSE screen flashes */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at ${path.midX}% ${path.midY}%, rgba(139, 92, 246, 0.5) 0%, transparent 60%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 0.6, 0, 0.4, 0] }}
        transition={{ duration: 0.6, times: [0, 0.08, 0.12, 0.2, 0.25, 0.35, 0.5] }}
      />
      
      {/* Electric discharge particles */}
      {[...Array(18)].map((_, i) => {
        const progress = i / 18;
        const x = path.startX + (path.endX - path.startX) * progress + (Math.random() - 0.5) * 12;
        const y = path.startY + (path.endY - path.startY) * progress;
        
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full blur-sm"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: i % 2 === 0 ? '#ffffff' : color,
              boxShadow: `0 0 16px ${color}`,
            }}
            animate={{ 
              scale: [0, 3, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.4,
              delay: 0.04 + i * 0.02,
            }}
          />
        );
      })}
      
      {/* Thunder energy ripples */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute rounded-full border-4"
          style={{
            left: `${path.midX - 12}%`,
            top: `${path.midY - 12}%`,
            width: '24%',
            height: '24%',
            borderColor: `${color}99`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 3.5],
            opacity: [1, 0],
          }}
          transition={{ duration: 0.8, delay: 0.08 + i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

// 🛸 UFO STREAK - ENHANCED with erratic movement
export function UFOStreak({ themeColors }: EventProps) {
  const paths = [
    { startX: -12, startY: 28, endX: 112, endY: 42, wobbleIntensity: 12 },
    { startX: 112, startY: 38, endX: -12, endY: 24, wobbleIntensity: 10 },
    { startX: -10, startY: 52, endX: 110, endY: 58, wobbleIntensity: 15 },
  ];
  
  const path = paths[Math.floor(Math.random() * paths.length)];
  const color = themeColors[0] || '#22d3ee';
  const direction = path.startX < path.endX ? 1 : -1;
  
  return (
    <motion.div
      className="absolute"
      initial={{ 
        left: `${path.startX}%`, 
        top: `${path.startY}%`,
        opacity: 0,
      }}
      animate={{ 
        left: `${path.endX}%`,
        top: `${path.endY}%`,
        y: [0, -path.wobbleIntensity, path.wobbleIntensity * 0.6, -path.wobbleIntensity * 0.4, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ 
        duration: 4, 
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.1, 0.5, 0.85, 1],
        y: { duration: 4, ease: "easeInOut" }
      }}
    >
      <div className="relative" style={{ transform: direction > 0 ? 'none' : 'scaleX(-1)' }}>
        {/* UFO body */}
        <div className="relative">
          {/* Dome */}
          <div
            className="w-10 h-5 rounded-t-full mx-auto"
            style={{
              background: `linear-gradient(180deg, ${color} 0%, #0e7490 100%)`,
              boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 15px ${color}66`,
            }}
          />
          {/* Base saucer */}
          <div
            className="w-20 h-4 rounded-full"
            style={{
              background: `radial-gradient(ellipse, ${color} 0%, #155e75 70%, #0e7490 100%)`,
              boxShadow: `0 0 25px ${color}, inset 0 2px 6px rgba(255,255,255,0.2)`,
            }}
          />
          
          {/* Blinking lights around rim */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bottom-1"
              style={{
                left: `${10 + i * 12}%`,
                background: i % 2 === 0 ? '#fbbf24' : color,
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#fbbf24' : color}`,
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.08,
              }}
            />
          ))}
        </div>
        
        {/* Energy trail */}
        <motion.div
          className="absolute w-40 h-8 blur-lg"
          style={{
            right: 80,
            top: -2,
            background: `linear-gradient(90deg, transparent 0%, ${color}70 100%)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        
        {/* Pulsing tractor beam */}
        <motion.div
          className="absolute w-4 h-16 blur-md"
          style={{
            left: '50%',
            top: 12,
            background: `linear-gradient(180deg, ${color}90 0%, transparent 100%)`,
            transform: 'translateX(-50%)',
            clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
          }}
          animate={{ 
            opacity: [0, 0.9, 0],
            scaleY: [0.8, 1, 0.8],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        
        {/* Energy particles from beam */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: '50%',
              top: 20 + i * 8,
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              x: [(Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10],
            }}
            transition={{ 
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// 🌈 COSMIC RAY BURST - ENHANCED rainbow prism
export function CosmicRayBurst({ themeColors }: EventProps) {
  const startSide = Math.random() > 0.5 ? 'left' : 'top';
  const angle = Math.random() * 50 - 25;
  
  const rainbowColors = [
    '#ef4444', // red
    '#f97316', // orange
    '#fbbf24', // yellow
    '#34d399', // green
    '#3b82f6', // blue
    '#8b5cf6', // indigo
    '#a855f7', // violet
  ];
  
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: startSide === 'left' ? 'left center' : 'top center',
      }}
    >
      {/* Rainbow beam layers - thicker and more vibrant */}
      {rainbowColors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute blur-sm"
          style={{
            left: startSide === 'left' ? 0 : `${8 + i * 6}%`,
            top: startSide === 'top' ? 0 : `${8 + i * 4}%`,
            width: startSide === 'left' ? '100%' : '10px',
            height: startSide === 'top' ? '100%' : '10px',
            background: `linear-gradient(${startSide === 'left' ? '90deg' : '180deg'}, ${color} 0%, ${color}ee 30%, transparent 100%)`,
            transform: `translateY(${i * 3}px)`,
            boxShadow: `0 0 20px ${color}`,
          }}
          initial={{ opacity: 0, scaleX: startSide === 'left' ? 0 : 1, scaleY: startSide === 'top' ? 0 : 1 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scaleX: startSide === 'left' ? [0, 1] : 1,
            scaleY: startSide === 'top' ? [0, 1] : 1,
          }}
          transition={{ duration: 5, delay: i * 0.12, times: [0, 0.2, 0.8, 1] }}
        />
      ))}
      
      {/* Prismatic sparkles */}
      {[...Array(30)].map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const sparkleColor = rainbowColors[i % rainbowColors.length];
        
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: sparkleColor,
              boxShadow: `0 0 15px ${sparkleColor}`,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 2.5,
              delay: 1.5 + i * 0.08,
            }}
          />
        );
      })}
      
      {/* Refraction rays */}
      {rainbowColors.map((color, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-px h-full blur-sm"
          style={{
            left: `${15 + i * 12}%`,
            background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
          }}
          transition={{ 
            duration: 3,
            delay: 0.5 + i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}

// 🔮 WORMHOLE - ENHANCED portal animation
export function Wormhole({ themeColors }: EventProps) {
  const centerX = 30 + Math.random() * 40;
  const centerY = 30 + Math.random() * 35;
  const color1 = themeColors[0] || '#a855f7';
  const color2 = themeColors[1] || '#3b82f6';
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Wormhole opening - MORE concentric rings */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-4 -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i % 2 === 0 ? color1 : color2,
            borderStyle: i % 3 === 0 ? 'dashed' : 'solid',
          }}
          initial={{ width: 0, height: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            width: 45 + i * 35,
            height: 45 + i * 35,
            opacity: [0, 0.9, 0.9, 0],
            rotate: i % 2 === 0 ? [0, 540] : [0, -540],
          }}
          transition={{ 
            duration: 6,
            delay: i * 0.2,
            ease: "easeInOut",
            rotate: { duration: 6, ease: "linear" }
          }}
        />
      ))}
      
      {/* Central vortex - pulsing energy */}
      <motion.div
        className="absolute w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${color2} 0%, ${color1} 40%, transparent 70%)`,
        }}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0, 1.6, 1.4, 0],
          rotate: [0, 1080],
        }}
        transition={{ 
          duration: 6,
          rotate: { duration: 6, ease: "linear" }
        }}
      />
      
      {/* Space distortion particles - pulled through wormhole */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 90;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'white',
              boxShadow: '0 0 8px white',
            }}
            initial={{ 
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              opacity: 1,
              scale: 1,
            }}
            animate={{ 
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI * 4) * 25,
                0
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI * 4) * 25,
                0
              ],
              opacity: [1, 0.5, 1, 0],
              scale: [1, 1.5, 0.5, 0],
            }}
            transition={{ 
              duration: 6,
              delay: 0.5 + (i / 20) * 2,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        );
      })}
      
      {/* Spacetime ripples */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
          style={{
            borderColor: i % 2 === 0 ? `${color1}66` : `${color2}66`,
          }}
          initial={{ width: 60, height: 60, opacity: 0.8 }}
          animate={{ 
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>
  );
}

// 💎 CRYSTAL FORMATION - ENHANCED geometric growth
export function CrystalFormation({ themeColors }: EventProps) {
  const centerX = 30 + Math.random() * 40;
  const centerY = 30 + Math.random() * 35;
  const color = themeColors[0] || '#ec4899';
  const crystalColor1 = `${color}ff`;
  const crystalColor2 = `${color}99`;
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Central crystal core - diamond shape */}
      <motion.div
        className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `linear-gradient(135deg, ${crystalColor1} 0%, ${crystalColor2} 100%)`,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          boxShadow: `0 0 30px ${color}, inset 0 0 10px rgba(255,255,255,0.5)`,
        }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2, 2, 0.8],
          rotate: [0, 0, 270, 270],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, times: [0, 0.25, 0.65, 1] }}
      />
      
      {/* Growing crystal spikes - 8 directions */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 70;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: '6px',
              height: '40px',
              background: `linear-gradient(180deg, ${crystalColor1} 0%, ${crystalColor2} 50%, transparent 100%)`,
              boxShadow: `0 0 12px ${color}`,
              transformOrigin: 'bottom center',
            }}
            initial={{ 
              x: Math.cos(angle) * 5,
              y: Math.sin(angle) * 5,
              scaleY: 0,
              rotate: (angle * 180 / Math.PI),
              opacity: 0,
            }}
            animate={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scaleY: [0, 1.2, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 4,
              delay: 0.3 + i * 0.08,
              times: [0, 0.35, 0.75, 1]
            }}
          />
        );
      })}
      
      {/* Shatter particles - dramatic explosion */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const distance = 100 + Math.random() * 30;
        
        return (
          <motion.div
            key={`shatter-${i}`}
            className="absolute w-2 h-2"
            style={{
              background: crystalColor1,
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              boxShadow: `0 0 8px ${color}`,
            }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: [0, 1, 1, 0],
              rotate: Math.random() * 720,
              scale: [0, 1.5, 0.5],
            }}
            transition={{ 
              duration: 2,
              delay: 2.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        );
      })}
      
      {/* Crystal flash */}
      <motion.div
        className="absolute w-48 h-48 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"
        style={{
          background: `radial-gradient(circle, #ffffff 0%, ${color} 50%, transparent 70%)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 0],
          opacity: [0, 0.9, 0],
        }}
        transition={{ duration: 1, delay: 2.5 }}
      />
    </motion.div>
  );
}

// 🎆 STARDUST EXPLOSION - ENHANCED firework burst
export function StardustExplosion({ themeColors }: EventProps) {
  const centerX = 30 + Math.random() * 40;
  const centerY = 25 + Math.random() * 35;
  const colors = themeColors.length >= 3 ? themeColors : ['#fbbf24', '#ec4899', '#8b5cf6'];
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${centerX}%`, top: `${centerY}%` }}
    >
      {/* Initial BRIGHT flash */}
      <motion.div
        className="absolute w-6 h-6 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'white',
          boxShadow: '0 0 60px white',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 4, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Firework explosion particles - MORE OF THEM */}
      {[...Array(48)].map((_, i) => {
        const angle = (i / 48) * Math.PI * 2;
        const distance = 90 + Math.random() * 50;
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 12px ${color}`,
            }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + (Math.random() * 30 + 15), // Gravity effect
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0],
            }}
            transition={{ 
              duration: 3,
              delay: 0.2 + (i / 48) * 0.4,
              ease: [0.22, 0.61, 0.36, 1]
            }}
          />
        );
      })}
      
      {/* Trailing sparkles - smaller secondary particles */}
      {[...Array(60)].map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 70;
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={`trail-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{ 
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + (Math.random() * 20 + 8),
              opacity: [0, 0.9, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ 
              duration: 2,
              delay: 0.6 + Math.random() * 1,
              ease: "easeOut"
            }}
          />
        );
      })}
    </motion.div>
  );
}

// 🛰️ SATELLITE PASS - ENHANCED realistic satellite
export function SatellitePass({ themeColors }: EventProps) {
  const startY = 20 + Math.random() * 45;
  const direction = Math.random() > 0.5 ? 1 : -1;
  const color = themeColors[0] || '#94a3b8';
  
  return (
    <motion.div
      className="absolute"
      style={{ top: `${startY}%` }}
      initial={{ 
        left: direction > 0 ? '-8%' : '108%',
        opacity: 0,
      }}
      animate={{ 
        left: direction > 0 ? '108%' : '-8%',
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ 
        duration: 8, 
        ease: "linear",
        times: [0, 0.1, 0.5, 0.9, 1]
      }}
    >
      <div className="relative" style={{ transform: direction > 0 ? 'none' : 'scaleX(-1)' }}>
        {/* Satellite body */}
        <div
          className="w-8 h-5 rounded"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #64748b 100%)`,
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.2)',
          }}
        >
          {/* Panel details */}
          <div className="absolute inset-1 border border-slate-600/30" />
        </div>
        
        {/* Solar panels - larger and more detailed */}
        <div
          className="absolute w-12 h-3 -left-12 top-1"
          style={{
            background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, #1e40af 100%)',
            boxShadow: '0 0 12px rgba(59, 130, 246, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          {/* Panel grid lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div
          className="absolute w-12 h-3 -right-12 top-1"
          style={{
            background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%, #1e40af 100%)',
            boxShadow: '0 0 12px rgba(59, 130, 246, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        
        {/* Antenna */}
        <div className="absolute w-px h-4 bg-slate-400 left-1/2 -top-4 shadow-sm" />
        <div className="absolute w-2 h-px bg-slate-400 left-1/2 -top-4 -translate-x-1/2" />
        
        {/* Blinking signal lights - multiple */}
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full left-2 top-1/2 -translate-y-1/2"
          style={{
            background: '#ef4444',
            boxShadow: '0 0 6px #ef4444',
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-1 h-1 rounded-full right-2 top-1/2 -translate-y-1/2"
          style={{
            background: '#22c55e',
            boxShadow: '0 0 4px #22c55e',
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

// 🚀 SPACEX STARSHIP - ENHANCED rocket with powerful thrust
export function SpaceXStarship({ themeColors }: EventProps) {
  const trajectories = [
    { startX: -10, startY: 65, endX: 110, endY: 8, direction: 1, angle: -30 },
    { startX: 110, startY: 60, endX: -10, endY: 12, direction: -1, angle: 30 },
    { startX: 25, startY: 75, endX: 75, endY: 3, direction: 1, angle: -40 },
  ];
  
  const path = trajectories[Math.floor(Math.random() * trajectories.length)];
  const color = themeColors[0] || '#3b82f6';
  
  return (
    <motion.div
      className="absolute"
      initial={{ 
        left: `${path.startX}%`, 
        top: `${path.startY}%`, 
        rotate: path.angle,
        opacity: 0,
      }}
      animate={{ 
        left: `${path.endX}%`, 
        top: `${path.endY}%`,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ 
        duration: 4.5, 
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.1, 0.5, 0.9, 1]
      }}
    >
      <div className="relative" style={{ transform: path.direction > 0 ? 'none' : 'scaleX(-1)' }}>
        {/* Starship body */}
        <div className="relative">
          {/* Main body */}
          <div
            className="w-10 h-20 rounded-t-2xl"
            style={{
              background: 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 40%, #94a3b8 100%)',
              boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.3), 0 0 16px rgba(59, 130, 246, 0.4)',
            }}
          >
            {/* Heat shield tiles */}
            <div className="absolute inset-2 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="w-full h-2 border-b border-slate-400/40"
                  style={{ top: `${i * 12}%` }}
                />
              ))}
            </div>
          </div>
          
          {/* Nose cone */}
          <div
            className="absolute -top-6 left-0 w-10 h-8"
            style={{
              background: 'linear-gradient(180deg, #e2e8f0 0%, #f1f5f9 100%)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
          
          {/* Grid fins */}
          <div className="absolute top-3 -left-2 w-3 h-3 bg-slate-500/70 rounded-sm" />
          <div className="absolute top-3 -right-2 w-3 h-3 bg-slate-500/70 rounded-sm" />
          
          {/* Windows */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-3 rounded-full bg-slate-800/50" />
          
          {/* Engine bells at bottom */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`engine-${i}`}
              className="absolute bottom-0 w-2 h-1 bg-slate-600"
              style={{
                left: `${20 + i * 30}%`,
                transform: 'translateX(-50%)',
              }}
            />
          ))}
        </div>
        
        {/* MASSIVE engine glow */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 blur-xl"
          style={{
            background: `radial-gradient(circle, #fbbf24 0%, ${color} 40%, transparent 70%)`,
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 0.25, repeat: Infinity }}
        />
        
        {/* Exhaust plume */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-12 h-20 blur-md"
          style={{
            background: `linear-gradient(180deg, #fbbf24 0%, ${color} 50%, transparent 100%)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          }}
          animate={{ 
            scaleY: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        
        {/* Engine particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: '50%',
              bottom: -18 - i * 5,
              background: i % 2 === 0 ? '#fbbf24' : color,
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#fbbf24' : color}`,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              x: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15],
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.06,
            }}
          />
        ))}
        
        {/* Vapor trail */}
        <motion.div
          className="absolute w-6 h-32 blur-lg"
          style={{
            left: '50%',
            bottom: -148,
            background: `linear-gradient(180deg, ${color}40 0%, transparent 100%)`,
            transform: 'translateX(-50%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

// 🛰️ SPACE STATION - ENHANCED ISS-style structure
export function SpaceStation({ themeColors }: EventProps) {
  const startY = 22 + Math.random() * 35;
  const direction = Math.random() > 0.5 ? 1 : -1;
  
  return (
    <motion.div
      className="absolute"
      style={{ top: `${startY}%` }}
      initial={{ 
        left: direction > 0 ? '-12%' : '112%',
        opacity: 0,
      }}
      animate={{ 
        left: direction > 0 ? '112%' : '-12%',
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{ 
        duration: 8, 
        ease: "linear",
        times: [0, 0.12, 0.5, 0.88, 1]
      }}
    >
      <div className="relative" style={{ transform: direction > 0 ? 'none' : 'scaleX(-1)' }}>
        {/* Main structure */}
        <div className="relative">
          {/* Central beam/truss */}
          <div
            className="w-32 h-2 bg-slate-400 rounded"
            style={{ boxShadow: '0 0 6px rgba(148, 163, 184, 0.6), inset 0 -1px 2px rgba(0,0,0,0.3)' }}
          >
            {/* Truss details */}
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-px h-2 bg-slate-500"
                style={{ left: `${i * 10}%`, top: 0 }}
              />
            ))}
          </div>
          
          {/* Habitat modules */}
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-5 bg-slate-300 rounded-lg"
            style={{ boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4), 0 0 8px rgba(203, 213, 225, 0.3)' }}
          >
            {/* Windows */}
            <div className="absolute left-2 top-1 w-1 h-1 rounded-full bg-cyan-300/60" />
            <div className="absolute left-4 top-1 w-1 h-1 rounded-full bg-cyan-300/60" />
            <div className="absolute right-2 top-1 w-1 h-1 rounded-full bg-cyan-300/60" />
          </div>
          <div
            className="absolute left-18 top-1/2 -translate-y-1/2 w-8 h-4 bg-slate-300 rounded-lg"
            style={{ boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.4)' }}
          >
            <div className="absolute left-2 top-1 w-1 h-1 rounded-full bg-cyan-300/60" />
            <div className="absolute right-2 top-1 w-1 h-1 rounded-full bg-cyan-300/60" />
          </div>
          
          {/* Solar panel arrays - LARGER */}
          <div
            className="absolute left-0 -top-8 w-16 h-16"
            style={{
              background: 'linear-gradient(45deg, #1e40af 25%, #3b82f6 25%, #3b82f6 50%, #1e40af 50%, #1e40af 75%, #3b82f6 75%)',
              backgroundSize: '6px 6px',
              boxShadow: '0 0 16px rgba(59, 130, 246, 0.7)',
              opacity: 0.95,
            }}
          >
            {/* Panel frame */}
            <div className="absolute inset-0 border-2 border-blue-900/40" />
          </div>
          <div
            className="absolute right-0 -bottom-8 w-16 h-16"
            style={{
              background: 'linear-gradient(45deg, #1e40af 25%, #3b82f6 25%, #3b82f6 50%, #1e40af 50%, #1e40af 75%, #3b82f6 75%)',
              backgroundSize: '6px 6px',
              boxShadow: '0 0 16px rgba(59, 130, 246, 0.7)',
              opacity: 0.95,
            }}
          >
            <div className="absolute inset-0 border-2 border-blue-900/40" />
          </div>
          
          {/* Communication dishes */}
          <div className="absolute left-1/2 -top-3 w-3 h-3 border-2 border-slate-400 rounded-full" />
          
          {/* Blinking navigation lights */}
          {[0, 12, 24, 36].map((offset, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${offset + 8}px`,
                top: '50%',
                background: i % 2 === 0 ? '#ef4444' : '#22c55e',
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#ef4444' : '#22c55e'}`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.45,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// EVENT COMPONENT MAPPER
// ============================================================================

export function renderCosmicEvent(eventType: CosmicEventType, themeColors: string[]): JSX.Element {
  const EventComponent = eventComponents[eventType];
  return <EventComponent key={`cosmic-${Date.now()}`} themeColors={themeColors} />;
}

const eventComponents: Record<CosmicEventType, React.ComponentType<EventProps>> = {
  'shooting-comet': ShootingComet,
  'meteor-shower': MeteorShower,
  'satellite-pass': SatellitePass,
  'star-birth': StarBirth,
  'asteroid-tumble': AsteroidTumble,
  'supernova-burst': SupernovaBurst,
  'nebula-bloom': NebulaBloom,
  'planet-transit': PlanetTransit,
  'black-hole': BlackHole,
  'cosmic-vortex': CosmicVortex,
  'space-lightning': SpaceLightning,
  'ufo-streak': UFOStreak,
  'cosmic-ray-burst': CosmicRayBurst,
  'wormhole': Wormhole,
  'crystal-formation': CrystalFormation,
  'stardust-explosion': StardustExplosion,
  'spacex-starship': SpaceXStarship,
  'space-station': SpaceStation,
};
