import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { titleConfigs } from '../utils/titleConfigs';
import { getHeaderTransition, transitionVariants } from '../utils/headerTransitions';
import { getHorizonEffects } from '../utils/horizonEffects';
import { getRandomCosmicEvent, renderCosmicEvent } from '../utils/cosmicEvents';
import { PrismaticDuskHorizon } from './horizons/PrismaticDuskHorizon';
import { DawnEternalHorizon } from './horizons/DawnEternalHorizon';
import { CreativeNexusHorizon } from './horizons/CreativeNexusHorizon';
import { DecadeDreamer, ChronicleMaster, TimeLord as TimeLordHorizon, TimeTraveler } from './horizons/TimeLordsHorizons';
import { NostalgiaWeaverHorizon } from './horizons/NostalgiaWeaverHorizon';
import { LegacyArchitectHorizon } from './horizons/LegacyArchitectHorizon';
// 🌟 LEGENDARY HORIZONS - Ultimate Achievement Rewards
import { DimensionalRiftPortal } from './horizons/DimensionalRiftPortal';
import { HourglassUniverse } from './horizons/HourglassUniverse';
import { PrecisionTargetReticle } from './horizons/PrecisionTargetReticle';

interface HeaderBackgroundProps {
  titleName: string;
  titleRarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  preview?: boolean; // Preview mode for contained rendering (e.g., in modals)
}

// ============================================================================
// COSMIC EVENTS HOOK - Manages random event spawning
// ============================================================================

function useCosmicEvents(themeColors: string[], isActive: boolean) {
  const [currentEvent, setCurrentEvent] = React.useState<{
    type: string;
    key: number;
  } | null>(null);

  React.useEffect(() => {
    if (!isActive) return;

    // Schedule next random event
    const scheduleNextEvent = () => {
      // Random interval: 15-45 seconds
      const minInterval = 15000;
      const maxInterval = 45000;
      const interval = minInterval + Math.random() * (maxInterval - minInterval);

      return setTimeout(() => {
        const event = getRandomCosmicEvent();
        
        // Spawn event
        setCurrentEvent({
          type: event.type,
          key: Date.now(),
        });

        // Clear event after its duration
        setTimeout(() => {
          setCurrentEvent(null);
        }, event.duration * 1000);

        // Schedule next event
        scheduleNextEvent();
      }, interval);
    };

    const timeoutId = scheduleNextEvent();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive]);

  // Render the current event
  if (!currentEvent) return null;

  return (
    <div key={currentEvent.key} className="absolute inset-0 pointer-events-none z-30">
      {renderCosmicEvent(currentEvent.type as any, themeColors)}
    </div>
  );
}

export function HeaderBackground({ titleName, titleRarity, preview = false }: HeaderBackgroundProps) {
  const config = titleConfigs[titleName] || titleConfigs['default'];
  const transitionConfig = getHeaderTransition(titleName);
  const variants = transitionVariants[transitionConfig.type];
  
  // Get cosmic effects for this horizon
  const effects = getHorizonEffects(titleName, titleRarity, config.colors, 'active');
  
  // 🌌 COSMIC EVENTS - Random celestial phenomena (active only when not in preview mode)
  const cosmicEvents = useCosmicEvents(config.colors, !preview);
  
  // HEIGHT CONFIGURATION
  // Desktop: extends from top to ~200px (below logo)
  // Mobile: ~150px
  // Preview mode: fills container with absolute positioning
  const height = preview ? 'h-full' : 'h-[150px] sm:h-[200px]';
  const positioning = preview ? 'absolute' : 'fixed';
  
  // 🎯 PERFORMANCE FIX: Force GPU acceleration and isolate animations from scroll events
  const performanceStyle = {
    willChange: 'auto',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
  };
  
  // RARITY-BASED APPROACH (Option 7: Thematic Hybrid)
  // Each tier uses distinct techniques, individual titles have unique customizations
  
  // ============================================================================
  // EPIC TIER HORIZONS
  // ============================================================================
  
  if (titleName === 'Prismatic Dusk') {
    const isMobile = window.innerWidth < 640;
    return (
      <PrismaticDuskHorizon
        height={height}
        positioning={positioning}
        performanceStyle={performanceStyle}
        isMobile={isMobile}
      />
    );
  }
  
  if (titleName === 'Dawn Eternal') {
    const isMobile = window.innerWidth < 640;
    return (
      <DawnEternalHorizon
        height={height}
        positioning={positioning}
        performanceStyle={performanceStyle}
        isMobile={isMobile}
      />
    );
  }
  
  if (titleName === 'Creative Nexus') {
    const isMobile = window.innerWidth < 640;
    return (
      <CreativeNexusHorizon
        height={height}
        positioning={positioning}
        performanceStyle={performanceStyle}
        isMobile={isMobile}
      />
    );
  }
  
  if (titleName === 'Nostalgia Weaver') {
    const isMobile = window.innerWidth < 640;
    return (
      <NostalgiaWeaverHorizon
        height={height}
        positioning={positioning}
        performanceStyle={performanceStyle}
        isMobile={isMobile}
      />
    );
  }
  
  if (titleName === 'Legacy Architect') {
    const isMobile = window.innerWidth < 640;
    return (
      <LegacyArchitectHorizon
        height={height}
        positioning={positioning}
        performanceStyle={performanceStyle}
        isMobile={isMobile}
      />
    );
  }
  
  // ============================================================================
  // COMMON TIER (5 titles): Textured Gradients + Subtle Patterns
  // ============================================================================
  
  if (titleName === 'Time Novice') {
    const particles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 15 + i * 15,
      top: 25 + (i % 3) * 20,
      delay: i * 0.6,
      duration: 3 + i * 0.5
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Soft dawn blue - pixel art clock tower aesthetic */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #60A5FA 0%, #3b82f6 50%, #2563EB 100%)`,
          }}
        />
        
        {/* Clock tower silhouette */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 sm:w-20 sm:h-32 opacity-10">
          <div className="absolute bottom-0 w-full h-3/4 bg-slate-900/60" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 border-2 border-slate-900/40 rounded-full" />
        </div>
        
        {/* Clock gears rotating */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 border-2 border-blue-300/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Hour hand */}
            <div className="absolute top-1/2 left-1/2 w-px h-6 sm:h-10 bg-blue-300/60 origin-bottom -translate-x-1/2" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-16 sm:h-16 border-2 border-slate-300/40 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Minute hand */}
            <div className="absolute top-1/2 left-1/2 w-px h-4 sm:h-6 bg-slate-300/60 origin-bottom -translate-x-1/2" />
          </motion.div>
        </div>
        
        {/* Time particles floating upward like morning mist */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-xs sm:text-sm opacity-0"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`
            }}
            animate={{ 
              y: [0, -50, -50],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay
            }}
          >
            ⏰
          </motion.div>
        ))}
        
        {/* Gentle sparkle trails */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-blue-200/60 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 4) * 15}%`
            }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0]
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
  
  if (titleName === 'Moment Collector') {
    const flashes = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 15 + i * 18,
      top: 25 + (i % 2) * 22,
      delay: i * 0.7
    })), []);
    
    const photoGrid = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 12 + (i % 3) * 30,
      top: 20 + Math.floor(i / 3) * 35,
      rotation: -12 + (i % 3) * 12,
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
        {/* 📸 Moment Collector - Vibrant purple to pink, memory scrapbook aesthetic */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #7C3AED 0%, #A855F7 40%, #EC4899 100%)`,
          }}
        />
        
        {/* Scrapbook page texture */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(255,255,255,0.03) 15px, rgba(255,255,255,0.03) 16px)`,
            }}
          />
        </div>
        
        {/* Photo collage grid */}
        {photoGrid.map((photo) => (
          <motion.div
            key={photo.id}
            className="absolute w-12 h-14 sm:w-16 sm:h-20 bg-white/35 rounded-sm shadow-2xl backdrop-blur-sm border border-purple-200/30"
            style={{
              left: `${photo.left}%`,
              top: `${photo.top}%`,
              rotate: photo.rotation
            }}
            animate={{ 
              y: [0, -12, 0],
              rotate: [photo.rotation, photo.rotation + 4, photo.rotation],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: photo.delay,
              ease: 'easeInOut'
            }}
          >
            {/* Photo content area */}
            <div className="w-full h-3/4 bg-gradient-to-br from-purple-300/25 via-pink-300/20 to-fuchsia-300/25" />
            {/* Decorative tape corners */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-200/40 rotate-45" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-200/40 -rotate-45" />
          </motion.div>
        ))}
        
        {/* Decorative photo corners (vintage style) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-6 left-10 w-5 h-5 sm:w-6 sm:h-6">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-100" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-purple-100" />
          </div>
          <div className="absolute top-6 right-14 w-5 h-5 sm:w-6 sm:h-6">
            <div className="absolute top-0 right-0 w-full h-0.5 bg-pink-100" />
            <div className="absolute top-0 right-0 w-0.5 h-full bg-pink-100" />
          </div>
          <div className="absolute bottom-10 left-16 w-5 h-5 sm:w-6 sm:h-6">
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-100" />
            <div className="absolute bottom-0 left-0 w-0.5 h-full bg-purple-100" />
          </div>
          <div className="absolute bottom-10 right-10 w-5 h-5 sm:w-6 sm:h-6">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-pink-100" />
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-pink-100" />
          </div>
        </div>
        
        {/* Camera flash sparkles */}
        {flashes.map((f) => (
          <motion.div
            key={f.id}
            className="absolute text-xl sm:text-3xl opacity-0"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`
            }}
            animate={{ 
              scale: [0.3, 1.3, 0.3],
              opacity: [0, 0.9, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: f.delay,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
        ))}
        
        {/* Memory burst effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-fuchsia-200/20"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Future Messenger') {
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
  
  if (titleName === 'Past Receiver') {
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
  
  if (titleName === 'Snapshot Keeper') {
    const polaroids = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 15 + i * 35,
      top: 25 + (i % 2) * 20,
      rotation: -15 + i * 15,
      delay: i * 0.9
    })), []);
    
    const lightRays = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      angle: i * 60,
      delay: i * 0.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 📷 Snapshot Keeper - Teal/cyan camera capture theme with lens flare */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #06B6D4 100%)`,
          }}
        />
        
        {/* Camera lens aperture effect - center */}
        <motion.div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 opacity-25"
          animate={{
            scale: [1, 0.92, 1],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Aperture blades */}
          <div className="absolute inset-0 rounded-full border-3 border-cyan-100/60" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-0.5 h-12 sm:h-16 bg-teal-100/50"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-200/30" />
        </motion.div>
        
        {/* Lens flare light rays */}
        {lightRays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute top-1/3 left-1/2 w-1 h-20 sm:h-28 bg-gradient-to-b from-white/0 via-cyan-200/40 to-white/0"
            style={{
              transformOrigin: 'top center',
              transform: `translateX(-50%) rotate(${ray.angle}deg)`
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ray.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Floating polaroid snapshots */}
        {polaroids.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-9 h-11 sm:w-11 sm:h-13 bg-white/40 rounded-sm shadow-xl backdrop-blur-sm"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              rotate: p.rotation
            }}
            animate={{ 
              y: [0, -18, 0],
              rotate: [p.rotation, p.rotation + 6, p.rotation]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
          >
            <div className="w-full h-3/4 bg-gradient-to-br from-teal-300/30 to-cyan-400/20" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-300/50 rounded-full" />
          </motion.div>
        ))}
        
        {/* Camera shutter flash - occasional */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{
            opacity: [0, 0, 0, 0.5, 0, 0, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.35, 0.42, 0.46, 0.5, 0.55, 1]
          }}
        />
        
        {/* Photo corner mounts */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-8 left-12 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-100" />
          <div className="absolute top-8 right-16 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-100" />
          <div className="absolute bottom-12 left-20 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-teal-100" />
          <div className="absolute bottom-12 right-12 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-teal-100" />
        </div>
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Cinema Pioneer') {
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
  
  if (titleName === 'Voice Keeper') {
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
  
  if (titleName === 'Habit Builder') {
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
  
  if (titleName === 'Echo Pioneer') {
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
  
  // ============================================================================
  // UNCOMMON TIER (13 titles): 🌟 NEXT-LEVEL COSMIC PHENOMENA
  // UNIQUE FEATURES: 3D Depth, Weather Effects, Lens Flares, Fluid Dynamics, Auroras
  // ============================================================================
  
  if (titleName === 'Golden Hour Keeper') {
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
  
  if (titleName === 'Neon Dreamer') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Electric cyan gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #22D3EE 0%, #0284C7 100%)`,
          }}
        />
        
        {/* Neon grid lines */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Electric sparks */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-3 bg-cyan-300 rounded-full"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 19) % 80}%`,
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)'
            }}
            animate={{
              scaleY: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              repeatDelay: 2
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-4 h-4 rounded-full bg-cyan-400"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + (i % 2),
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Surrealist') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Deep indigo gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)`,
          }}
        />
        
        {/* Paint splatter effect */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 31) % 80}%`,
              width: `${20 + (i % 3) * 15}px`,
              height: `${20 + (i % 3) * 15}px`,
              background: `rgba(129, 140, 248, ${0.2 + (i % 3) * 0.1})`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Swirling color ribbons */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <motion.path
            d="M 0,50 Q 50,20 100,50 T 200,50"
            stroke="rgba(129, 140, 248, 0.5)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M 0,50 Q 50,20 100,50 T 200,50",
                "M 0,50 Q 50,80 100,50 T 200,50",
                "M 0,50 Q 50,20 100,50 T 200,50"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </svg>
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Time Sculptor') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Teal marble gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)`,
          }}
        />
        
        {/* Marble veins */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 20px, rgba(255, 255, 255, 0.1) 22px),
              repeating-linear-gradient(-45deg, transparent, transparent 25px, rgba(255, 255, 255, 0.05) 25px, rgba(255, 255, 255, 0.05) 27px)
            `
          }}
        />
        
        {/* Chiseling sparks */}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-200 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${40 + (i % 3) * 15}%`,
              boxShadow: '0 0 6px rgba(20, 184, 166, 0.8)'
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.4,
              repeatDelay: 1.5
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Memory Broadcaster') {
    const antennas = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
      id: i,
      height: 40 + i * 15,
      left: 35 + i * 15
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 📢 Broadcaster - Radio tower with concentric broadcast waves */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)` }} />
        
        {/* Radio tower structure */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-30">
          <div className="relative w-2 h-32 sm:h-40 bg-gradient-to-t from-blue-400/60 to-blue-200/80 mx-auto" />
          {antennas.map((ant) => (
            <div key={ant.id} style={{ height: `${ant.height}%`, left: `${ant.left}%` }}>
              <div className="absolute w-px bg-blue-300/60 origin-bottom" style={{ height: '20px', transform: 'rotate(-45deg) translateX(-50%)' }} />
              <div className="absolute w-px bg-blue-300/60 origin-bottom" style={{ height: '20px', transform: 'rotate(45deg) translateX(50%)' }} />
              <motion.div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: ant.id * 0.3 }} />
            </div>
          ))}
        </div>
        
        {/* Concentric broadcast waves expanding */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-300/60" style={{ width: `${60 + i * 50}px`, height: `${60 + i * 50}px` }} animate={{ scale: [1, 3], opacity: [0.7, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} />
        ))}
        
        {/* Multiple antenna signals radiating */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div key={`signal-${i}`} className="absolute w-1 h-12 sm:h-16 origin-bottom" style={{ left: '50%', top: '50%', background: 'linear-gradient(to top, rgba(96, 165, 250, 0.6), transparent)', transform: `rotate(${i * 22.5}deg) translateY(-20px)` }} animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} />
        ))}
        
        {/* Radio wave expansion (vertical bars) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={`bar-${i}`} className="absolute bottom-16 w-2 sm:w-3 bg-blue-400/40 rounded-t" style={{ left: `${30 + i * 6}%`, height: `${20 + (i % 4) * 15}%` }} animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }} />
        ))}
        
        {/* Antenna sparks */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`spark-${i}`} className="absolute w-1 h-1 bg-yellow-300 rounded-full" style={{ left: `${45 + i * 4}%`, top: `${35 + i * 5}%`, boxShadow: '0 0 8px rgba(253, 224, 71, 0.9)' }} animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.4 }} />
        ))}
        
        {/* Broadcast frequency visualization */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-20" animate={{ scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>📡</motion.div>
        
        {/* Signal strength indicators */}
        {[0, 1, 2].map((i) => (
          <motion.div key={`indicator-${i}`} className="absolute w-4 h-1 sm:w-6 sm:h-1.5 bg-blue-300/50 rounded" style={{ right: '15%', top: `${30 + i * 8}%` }} animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Ritual Keeper') {
    const candles = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 15 + i * 15,
      height: 30 + (i % 3) * 10
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Emerald green gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #34D399 0%, #059669 100%)`,
          }}
        />
        
        {/* Candle flames */}
        {candles.map((candle) => (
          <div key={candle.id} className="absolute bottom-20" style={{ left: `${candle.left}%` }}>
            {/* Flame */}
            <motion.div
              className="w-3 h-6 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full"
              animate={{
                scaleY: [1, 1.2, 0.9, 1],
                scaleX: [1, 0.9, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: candle.id * 0.1
              }}
            />
            {/* Glow */}
            <motion.div
              className="absolute -top-2 -left-2 w-7 h-10 bg-emerald-400 rounded-full blur-md"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: candle.id * 0.1
              }}
            />
          </div>
        ))}
        
        {/* Floating embers */}
        {Array.from({ length: 11 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300 rounded-full"
            style={{
              left: `${(i * 13) % 100}%`,
              bottom: '20%',
              boxShadow: '0 0 4px rgba(52, 211, 153, 0.8)'
            }}
            animate={{
              y: [0, -60],
              opacity: [0.8, 0],
              x: [0, (Math.random() - 0.5) * 20]
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Vault Starter') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Sky blue gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)`,
          }}
        />
        
        {/* Vault door mechanism */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-300"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-1/2 left-1/2 w-20 h-1 bg-blue-300 origin-left -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-blue-300 origin-top -translate-x-1/2" />
          </motion.div>
        </div>
        
        {/* Key sparkles */}
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 80}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              repeatDelay: 1
            }}
          >
            🔑
          </motion.div>
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Multimedia Virtuoso') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Cyan-teal gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)`,
          }}
        />
        
        {/* Stage spotlights */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-20 sm:w-32 h-full"
            style={{
              left: `${15 + i * 25}%`,
              background: `linear-gradient(to bottom, rgba(6, 182, 212, 0.4), transparent)`,
              clipPath: 'polygon(40% 0%, 60% 0%, 70% 100%, 30% 100%)'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Media icons floating */}
        {['📸', '🎬', '🎵', '📝', '🎨', '🎭'].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-70"
            style={{
              left: `${10 + i * 15}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {icon}
          </motion.div>
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Word Painter') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Violet-indigo gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #818CF8 0%, #6366F1 100%)`,
          }}
        />
        
        {/* Brush strokes */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${20 + i * 20},${30 + i * 10} Q ${50 + i * 15},${20 + i * 15} ${80 + i * 10},${40 + i * 10}`}
              stroke="rgba(129, 140, 248, 0.6)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.6
              }}
            />
          ))}
        </svg>
        
        {/* Ink splatters */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 19) % 100}%`,
              top: `${(i * 27) % 80}%`,
              width: `${8 + (i % 3) * 6}px`,
              height: `${8 + (i % 3) * 6}px`,
              background: `rgba(99, 102, 241, ${0.3 + (i % 3) * 0.1})`
            }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 0.7, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              repeatDelay: 2
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Frequency Keeper') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Pink-magenta gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #F472B6 0%, #EC4899 100%)`,
          }}
        />
        
        {/* Radio frequency bars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-20 w-3 bg-pink-300 rounded-t"
            style={{
              left: `${5 + i * 4.5}%`,
            }}
            animate={{
              height: [`${10 + Math.random() * 20}px`, `${30 + Math.random() * 40}px`, `${10 + Math.random() * 20}px`]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
        
        {/* Sound wave particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-pink-200"
            style={{
              left: `${(i * 11) % 100}%`,
              top: '50%',
              boxShadow: '0 0 8px rgba(244, 114, 182, 0.6)'
            }}
            animate={{
              x: [0, 100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Quantum Scheduler') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Purple-violet gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)`,
          }}
        />
        
        {/* Quantum field grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(167, 139, 250, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '30px 30px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Spinning particles (like atoms) */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-300"
            style={{
              left: '50%',
              top: '50%',
              boxShadow: '0 0 10px rgba(167, 139, 250, 0.8)'
            }}
            animate={{
              x: [0, Math.cos((i * 2 * Math.PI) / 15) * 80, 0],
              y: [0, Math.sin((i * 2 * Math.PI) / 15) * 60, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Community Weaver') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Warm rose-pink gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #FB7185 0%, #E11D48 100%)`,
          }}
        />
        
        {/* Connection network */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          {Array.from({ length: 8 }).map((_, i) => (
            <React.Fragment key={i}>
              {/* Node */}
              <motion.circle
                cx={`${20 + (i % 4) * 25}%`}
                cy={`${30 + Math.floor(i / 4) * 40}%`}
                r="4"
                fill="rgba(251, 113, 133, 0.8)"
                animate={{
                  r: [4, 6, 4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
              {/* Connection lines */}
              {i < 7 && (
                <motion.line
                  x1={`${20 + (i % 4) * 25}%`}
                  y1={`${30 + Math.floor(i / 4) * 40}%`}
                  x2={`${20 + ((i + 1) % 4) * 25}%`}
                  y2={`${30 + Math.floor((i + 1) / 4) * 40}%`}
                  stroke="rgba(251, 113, 133, 0.5)"
                  strokeWidth="2"
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </svg>
        
        {/* Pulse particles along connections */}
        {Array.from({ length: 13 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-rose-300"
            style={{
              left: `${(i * 11) % 100}%`,
              top: `${30 + (i % 3) * 20}%`,
              boxShadow: '0 0 8px rgba(251, 113, 133, 0.8)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Echo Artisan') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Bright emerald gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #34D399 0%, #10B981 100%)`,
          }}
        />
        
        {/* Water ripple rings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/3 left-1/3 rounded-full border-2 border-emerald-300"
            style={{
              width: `${40 + i * 30}px`,
              height: `${40 + i * 30}px`,
              marginLeft: `-${20 + i * 15}px`,
              marginTop: `-${20 + i * 15}px`
            }}
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut'
            }}
          />
        ))}
        
        {/* Water droplets */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-200"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${20 + (i % 5) * 12}%`,
              boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)'
            }}
            animate={{
              y: [0, 40],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.8]
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.4
            }}
          />
        ))}
        
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Era Initiate') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🌱 Era Initiate - Fresh start with new beginning energy */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)', 'linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)', 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* New beginning sunrise glow */}
        <motion.div className="absolute top-0 left-0 right-0 h-32 opacity-30" style={{ background: 'radial-gradient(ellipse at top, rgba(252, 211, 77, 0.4), transparent)' }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Growing sprout */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl" animate={{ scale: [0.8, 1.05, 0.8], y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🌱</motion.div>
        
        {/* Growing leaves */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={`leaf-${i}`} className="absolute text-lg sm:text-2xl" style={{ left: `${25 + i * 7}%`, bottom: '20%' }} animate={{ y: [0, -70, -70], opacity: [0, 0.8, 0], scale: [0.3, 1.2, 0.5], rotate: [0, (i % 2 ? 180 : -180)] }} transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.4 }}>🍃</motion.div>
        ))}
        
        {/* Growth rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`ring-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-300/40" style={{ width: 70 + i * 35, height: 70 + i * 35 }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }} />
        ))}
        
        {/* Energy particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={`energy-${i}`} className="absolute w-1 h-1 rounded-full bg-emerald-200" style={{ left: `${15 + i * 7}%`, top: `${30 + (i % 4) * 15}%`, boxShadow: '0 0 6px rgba(167, 243, 208, 0.8)' }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Bronze Chronicler') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🥉 Bronze Chronicler - Bronze medal achievement with metallic sheen */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)', 'linear-gradient(135deg, #78350F 0%, #92400E 50%, #B45309 100%)', 'linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Bronze medal rotating */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-6xl sm:text-8xl opacity-25" animate={{ rotateY: [0, 360], scale: [1, 1.05, 1] }} transition={{ rotateY: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}>🥉</motion.div>
        
        {/* Metallic shine sweep */}
        <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)', width: '40%' }} animate={{ x: ['-40%', '140%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }} />
        
        {/* Bronze flakes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`flake-${i}`} className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" style={{ left: `${8 + i * 6}%`, top: '0%', background: 'rgba(217, 119, 6, 0.7)', boxShadow: '0 0 6px rgba(217, 119, 6, 0.9)' }} animate={{ y: [0, 250], opacity: [0, 0.9, 0], rotate: [0, 360] }} transition={{ duration: 3.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.3 }} />
        ))}
        
        {/* Achievement ribbons */}
        {[0, 1].map((i) => (
          <motion.div key={`ribbon-${i}`} className="absolute w-6 h-24 sm:w-8 sm:h-32 opacity-20" style={{ left: `${40 + i * 20}%`, top: '25%', background: `linear-gradient(to bottom, rgba(185, 28, 28, 0.5), rgba(220, 38, 38, 0.3))` }} animate={{ y: [0, 10, 0], rotate: [i ? -5 : 5, i ? 5 : -5, i ? -5 : 5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }} />
        ))}
        
        {/* Bronze sparkles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={`sparkle-${i}`} className="absolute text-yellow-600/50 text-sm sm:text-base" style={{ left: `${15 + i * 8}%`, top: `${30 + (i % 4) * 15}%` }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}>✨</motion.div>
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Streak Master') {
    const calendarDays = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
      id: i,
      delay: i * 0.3
    })), []);
    
    const meteorTrails = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
      id: i,
      startX: 80 + i * 10,
      startY: -10 + i * 15,
      delay: i * 2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🔥 Streak Master - Blazing meteor trail with 7-day fire calendar */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #7C2D12 0%, #EA580C 50%, #F97316 100%)` }} />
        
        {/* Heat wave distortion */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(249, 115, 22, 0.1) 20px, rgba(249, 115, 22, 0.1) 40px)` }}
          animate={{ y: [0, -40], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Meteor trails */}
        {meteorTrails.map((meteor) => (
          <motion.div
            key={meteor.id}
            className="absolute w-1 h-24 sm:h-32 opacity-0"
            style={{ left: `${meteor.startX}%`, top: `${meteor.startY}%`, background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.9), rgba(249, 115, 22, 0.6), transparent)', filter: 'blur(2px)', rotate: '45deg' }}
            animate={{ x: [0, -200], y: [0, 200], opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: meteor.delay, ease: 'easeIn', times: [0, 0.2, 0.8, 1] }}
          />
        ))}
        
        {/* 7-day calendar */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
          {calendarDays.map((day) => (
            <motion.div
              key={day.id}
              className="relative w-6 h-8 sm:w-8 sm:h-10 bg-orange-900/40 border-2 border-orange-400/60 rounded-sm"
              animate={{ borderColor: ['rgba(251, 146, 60, 0.6)', 'rgba(251, 191, 36, 0.9)', 'rgba(251, 146, 60, 0.6)'], boxShadow: ['0 0 10px rgba(249, 115, 22, 0.3)', '0 0 20px rgba(251, 191, 36, 0.6)', '0 0 10px rgba(249, 115, 22, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity, delay: day.delay }}
            >
              <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm" animate={{ scale: [0.8, 1.2, 0.8], y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: day.delay }}>🔥</motion.div>
              <div className="absolute inset-0 flex items-center justify-center text-orange-200 text-xs font-bold">{day.id + 1}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Central flame */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-8xl" animate={{ scale: [1, 1.15, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>🔥</motion.div>
        
        {/* Ember particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={`ember-${i}`} className="absolute rounded-full" style={{ left: `${30 + (i % 8) * 6}%`, bottom: '15%', width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, background: i % 3 === 0 ? '#FCD34D' : i % 3 === 1 ? '#FB923C' : '#F97316', boxShadow: `0 0 ${8 + (i % 4) * 2}px rgba(251, 146, 60, 0.8)` }} animate={{ y: [0, -120 - (i % 40)], x: [(i % 2 ? -10 : 10), (i % 2 ? 10 : -10)], opacity: [1, 0.8, 0], scale: [1, 0.8, 0.3] }} transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }} />
        ))}
        
        {/* Flame waves */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`wave-${i}`} className="absolute bottom-0 left-0 right-0 h-24 opacity-20" style={{ background: `linear-gradient(to top, rgba(249, 115, 22, 0.5), transparent)` }} animate={{ scaleY: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Night Owl') {
    const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 70,
      size: 1 + Math.random() * 2,
      delay: i * 0.1
    })), []);
    
    const constellations = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 15 + i * 18,
      top: 15 + (i % 2) * 25
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🦉 Night Owl - Moonlit midnight cityscape with wise owl */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #334155 100%)' }} />
        
        {/* Crescent moon with glow */}
        <motion.div className="absolute top-1/4 right-1/4 w-20 h-20 sm:w-28 sm:h-28" animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="absolute inset-0 rounded-full bg-slate-300/30 blur-xl" />
          <div className="absolute inset-2 rounded-full bg-slate-200/40" style={{ clipPath: 'ellipse(60% 80% at 30% 50%)' }} />
          <div className="absolute inset-0 text-4xl sm:text-5xl flex items-center justify-center opacity-80">🌙</div>
        </motion.div>
        
        {/* Wise owl perched on moon */}
        <motion.div className="absolute top-1/4 right-1/4 translate-x-8 translate-y-6 text-3xl sm:text-4xl" animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          🦉
          {/* Blinking eyes effect */}
          <motion.div className="absolute inset-0" animate={{ opacity: [0, 0, 0, 1, 0, 0, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.42, 0.44, 0.46, 0.5, 1] }}>
            <div className="absolute top-2 left-2 w-1 h-1 bg-slate-900 rounded-full" />
            <div className="absolute top-2 right-2 w-1 h-1 bg-slate-900 rounded-full" />
          </motion.div>
        </motion.div>
        
        {/* Twinkling stars */}
        {stars.map((star) => (
          <motion.div key={star.id} className="absolute rounded-full bg-slate-300" style={{ width: `${star.size}px`, height: `${star.size}px`, left: `${star.left}%`, top: `${star.top}%`, boxShadow: `0 0 ${star.size * 2}px rgba(203, 213, 225, 0.6)` }} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: star.delay }} />
        ))}
        
        {/* Constellation connections */}
        {constellations.map((constellation) => (
          <div key={constellation.id} className="absolute opacity-20" style={{ left: `${constellation.left}%`, top: `${constellation.top}%` }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="absolute w-1 h-1 bg-slate-200 rounded-full" style={{ left: `${i * 8}px`, top: `${(i % 2) * 12}px` }} />
                {i < 3 && <div className="absolute w-px bg-slate-400/40" style={{ left: `${i * 8 + 2}px`, top: `${(i % 2) * 12 + 2}px`, width: '8px', height: '1px', transform: `rotate(${i % 2 ? 45 : -45}deg)`, transformOrigin: 'left center' }} />}
              </div>
            ))}
          </div>
        ))}
        
        {/* City silhouette at bottom */}
        <div className="absolute bottom-16 left-0 right-0 h-24 sm:h-32 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute bg-slate-800/60" style={{ left: `${i * 8.33}%`, bottom: 0, width: `${6 + (i % 3) * 2}%`, height: `${50 + (i % 4) * 20}%` }}>
              {/* Building windows */}
              {Array.from({ length: 3 }).map((_, j) => (
                <motion.div key={j} className="absolute w-1 h-1 bg-yellow-400/40" style={{ left: '30%', top: `${20 + j * 25}%` }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: (i + j) * 0.3 }} />
              ))}
            </div>
          ))}
        </div>
        
        {/* Silver moonlight shimmer */}
        <motion.div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(203, 213, 225, 0.3) 0%, transparent 50%)' }} animate={{ opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Detail Devotee') {
    const redPenMarks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 20 + i * 10,
      top: 30 + (i % 3) * 15,
      delay: i * 0.4,
      type: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'underline' : 'check'
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🔍 Detail Devotee - Magnifying glass over document with perfectionist edits */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)` }} />
        
        {/* Document paper */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 sm:w-80 sm:h-60 bg-purple-50/10 border-2 border-purple-200/20 rounded-lg shadow-2xl opacity-30" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`line-${i}`} className="absolute left-1/2 -translate-x-1/2 w-48 sm:w-64 h-px bg-purple-200/15" style={{ top: `${30 + i * 5}%` }} />
        ))}
        
        {/* Zoom spotlight */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(196, 181, 253, 0.4) 0%, transparent 70%)' }} animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Magnifying glass */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl" animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🔍</motion.div>
        
        {/* Red pen marks */}
        {redPenMarks.map((mark) => (
          <motion.div key={mark.id} className="absolute opacity-0" style={{ left: `${mark.left}%`, top: `${mark.top}%` }} animate={{ opacity: [0, 0, 0.7, 0.7] }} transition={{ duration: 3, repeat: Infinity, delay: mark.delay, times: [0, 0.3, 0.6, 1] }}>
            {mark.type === 'circle' && <div className="w-8 h-6 sm:w-10 sm:h-8 border-2 border-red-400/80 rounded-full" />}
            {mark.type === 'underline' && <div className="w-12 sm:w-16 h-px bg-red-400/80 relative"><div className="absolute -bottom-1 left-0 right-0 h-px bg-red-400/80" /></div>}
            {mark.type === 'check' && <div className="text-red-400/80 text-lg sm:text-xl font-bold">✓</div>}
          </motion.div>
        ))}
        
        {/* Typewriter corrections */}
        {[0, 1, 2].map((i) => (
          <motion.div key={`correction-${i}`} className="absolute text-purple-300/40 text-xs sm:text-sm font-mono" style={{ left: `${30 + i * 20}%`, top: `${40 + i * 10}%` }} animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}>{'^'}</motion.div>
        ))}
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(90deg, rgba(196, 181, 253, 0.3) 1px, transparent 1px), linear-gradient(180deg, rgba(196, 181, 253, 0.3) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        
        {/* Detail particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`detail-${i}`} className="absolute w-1 h-1 bg-purple-200 rounded-full" style={{ left: `${15 + i * 6}%`, top: `${25 + (i % 4) * 15}%`, boxShadow: '0 0 4px rgba(196, 181, 253, 0.8)' }} animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
        
        {/* Scanning line */}
        <motion.div className="absolute left-0 right-0 h-1 bg-purple-300/50" style={{ top: '30%', boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)' }} animate={{ y: [0, 120, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Speed Archivist') {
    const capsules = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.15,
      lane: i % 3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* ⚡ Speed Archivist - Racing through digital tunnel at high speed */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #CA8A04 0%, #FBBF24 50%, #FCD34D 100%)', 'linear-gradient(135deg, #A16207 0%, #CA8A04 50%, #FBBF24 100%)', 'linear-gradient(135deg, #CA8A04 0%, #FBBF24 50%, #FCD34D 100%)'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Digital tunnel perspective lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div key={`tunnel-${i}`} className="absolute h-px bg-yellow-300/40 origin-center" style={{ top: `${40 + i * 5}%`, left: '50%', width: `${60 + i * 20}%`, transform: 'translateX(-50%)' }} animate={{ scaleX: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'linear' }} />
        ))}
        
        {/* Capsules whizzing past like highway signs */}
        {capsules.map((capsule) => (
          <motion.div key={capsule.id} className="absolute text-xl sm:text-2xl" style={{ right: '-10%', top: `${30 + capsule.lane * 20}%` }} animate={{ x: [0, -window.innerWidth - 100], scale: [0.5, 1, 1.5], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: capsule.delay, ease: 'easeIn' }}>📦</motion.div>
        ))}
        
        {/* Motion blur trails */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`blur-${i}`} className="absolute h-1 sm:h-1.5 bg-yellow-200/50 rounded-full" style={{ left: '-20%', top: `${20 + i * 5}%`, width: `${30 + (i % 4) * 15}%`, filter: 'blur(2px)' }} animate={{ x: ['0%', '150%'], opacity: [0, 0.7, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: 'linear' }} />
        ))}
        
        {/* Speedometer gauge */}
        <div className="absolute bottom-20 right-8 sm:right-12 w-20 h-20 sm:w-24 sm:h-24 opacity-30">
          <div className="absolute inset-0 rounded-full border-4 border-yellow-300/60" />
          <div className="absolute inset-2 rounded-full border-2 border-yellow-200/40" />
          <motion.div className="absolute top-1/2 left-1/2 w-1 h-8 sm:h-10 bg-yellow-200/70 origin-bottom" style={{ transform: 'translateX(-50%) translateY(-100%)' }} animate={{ rotate: [-45, 45, -45] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-300/80 rounded-full" />
        </div>
        
        {/* Rapid-fire capsule icons at edges */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`edge-${i}`} className="absolute text-sm sm:text-base opacity-40" style={{ left: `${10 + i * 25}%`, top: i % 2 ? '15%' : '75%' }} animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}>📦</motion.div>
        ))}
        
        {/* Tachometer redline effect */}
        <motion.div className="absolute top-0 left-0 right-0 h-1 bg-red-500/50" animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }} />
        
        {/* Lightning bolt */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-6xl sm:text-8xl" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>⚡</motion.div>
        
        {/* Electric sparks */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={`spark-${i}`} className="absolute w-1 h-1 bg-yellow-100 rounded-full" style={{ left: `${5 + i * 5}%`, top: `${15 + (i % 5) * 15}%`, boxShadow: '0 0 6px rgba(253, 211, 77, 0.9)' }} animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // ============================================================================
  // RARE TIER (7+ titles): Environmental Scenes + Energy Effects
  // ============================================================================
  
  if (titleName === 'Era Enthusiast') {
    const stars = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Deep space nebula gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at bottom, #06b6d4 0%, #1e3a5f 40%, #0a0e27 100%)`,
          }}
        />
        
        {/* Animated grid floor */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
          style={{
            backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, .3) 25%, rgba(6, 182, 212, .3) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, .3) 75%, rgba(6, 182, 212, .3) 76%, transparent 77%, transparent)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) translateY(100px)'
          }}
          animate={{ backgroundPosition: ['0px 0px', '0px 50px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Constellation stars */}
        <div className="absolute inset-0">
          {stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute w-1 h-1 bg-cyan-200 rounded-full"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
              }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay
              }}
            />
          ))}
          
          {/* Connecting constellation lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <motion.path
              d="M 20,30 L 40,25 L 60,35 L 80,20"
              stroke="rgba(6, 182, 212, 0.5)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </svg>
        </div>
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Golden Keeper') {
    const goldLeaves = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 11) % 100,
      delay: i * 0.3,
      size: 8 + (i % 4) * 4
    })), []);
    
    const coins = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: 15 + (i * 6) % 70,
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
        {/* 🥇 Golden Keeper - Golden temple doors */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #78350F 0%, #92400E 30%, #B45309 60%, #D97706 100%)', 'linear-gradient(135deg, #92400E 0%, #B45309 30%, #D97706 60%, #F59E0B 100%)', 'linear-gradient(135deg, #78350F 0%, #92400E 30%, #B45309 60%, #D97706 100%)'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Temple doors opening */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-48 sm:w-40 sm:h-56 opacity-30" animate={{ scaleX: [1, 0.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-0 bg-gradient-to-r from-yellow-800/60 via-yellow-600/80 to-yellow-800/60 border-4 border-yellow-600/60" style={{ borderRadius: '8px 8px 0 0' }}><div className="absolute top-1/2 left-4 w-2 h-2 bg-yellow-400 rounded-full" /><div className="absolute inset-2 border-2 border-yellow-500/40" /></div></motion.div>
        
        {/* Treasure chest glow */}
        <motion.div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 w-20 h-12 sm:w-24 sm:h-14 opacity-40" style={{ background: 'linear-gradient(to top, rgba(217, 119, 6, 0.6), rgba(245, 158, 11, 0.4))', borderRadius: '4px', boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)', border: '2px solid rgba(251, 191, 36, 0.5)' }} animate={{ boxShadow: ['0 0 30px rgba(251, 191, 36, 0.6)', '0 0 50px rgba(251, 191, 36, 1)', '0 0 30px rgba(251, 191, 36, 0.6)'], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-px bg-yellow-300/60" /></motion.div>
        
        {/* King Midas touch transformation effect */}
        <motion.div className="absolute top-1/3 left-1/3 w-16 h-16 sm:w-20 sm:h-20 opacity-20" animate={{ scale: [0, 1.5, 0], opacity: [0, 0.3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}><div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl" /></motion.div>
        
        {/* Gold leaf particles floating */}
        {goldLeaves.map((leaf) => (<motion.div key={leaf.id} className="absolute" style={{ left: `${leaf.left}%`, top: '0%', width: `${leaf.size}px`, height: `${leaf.size}px`, background: 'linear-gradient(135deg, #FBBF24, #F59E0B)', borderRadius: '50% 0%', boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)' }} animate={{ y: [0, 300], rotate: [0, 720], opacity: [0, 1, 0.5, 0] }} transition={{ duration: 4 + (leaf.id % 3), repeat: Infinity, delay: leaf.delay, ease: 'linear' }} />))}
        
        {/* Coin rain effect - CSS gold coins that look perfect on mobile */}
        {coins.map((coin) => (
          <motion.div 
            key={coin.id} 
            className="absolute" 
            style={{ left: `${coin.left}%`, top: '-10%' }} 
            animate={{ y: [0, 350], rotateY: [0, 360, 720] }} 
            transition={{ duration: 3 + (coin.id % 2), repeat: Infinity, delay: coin.delay, ease: 'easeIn' }}
          >
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FEF3C7 0%, #FBBF24 40%, #D97706 70%, #92400E 100%)',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.8), inset 0 1px 0 rgba(254, 243, 199, 0.6), inset 0 -2px 4px rgba(120, 53, 15, 0.5)',
                border: '2px solid #B45309',
                color: '#78350F',
                textShadow: '0 1px 0 rgba(254, 243, 199, 0.5)'
              }}
            >
              $
            </div>
          </motion.div>
        ))}
        
        {/* Midas transformation sparkles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`spark-${i}`} className="absolute text-yellow-300/50 text-lg sm:text-xl" style={{ left: `${20 + i * 12}%`, top: `${40 + (i % 3) * 15}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>✨</motion.div>))}
        
        {/* Golden aura radiating */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 opacity-15" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)' }} animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Gold medal icon */}
        <motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-30" animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }} transition={{ rotateY: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}>🥇</motion.div>
        
        {/* Treasure vault glow rays */}
        {[0, 1, 2, 3, 4].map((i) => (<motion.div key={`ray-${i}`} className="absolute bottom-24 sm:bottom-28 left-1/2 w-px h-24 sm:h-32 origin-bottom opacity-25" style={{ background: 'linear-gradient(to top, rgba(251, 191, 36, 0.6), transparent)', transform: `rotate(${-40 + i * 20}deg)` }} animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }} />))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Enlightened One') {
    const lotusFlowers = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: i * 45,
      radius: 60 + (i % 3) * 20,
      delay: i * 0.5
    })), []);
    
    const chakras = useMemo(() => [
      { color: '#DC2626', y: 60 }, // Root
      { color: '#EA580C', y: 50 }, // Sacral
      { color: '#FBBF24', y: 40 }, // Solar
      { color: '#10B981', y: 30 }, // Heart
      { color: '#3B82F6', y: 20 }, // Throat
      { color: '#6366F1', y: 12 }, // Third Eye
      { color: '#8B5CF6', y: 5 }   // Crown
    ], []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* ☀️ Enlightened One - Meditation with lotus */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #1E3A8A 0%, #3B82F6 40%, #60A5FA 80%, #DBEAFE 100%)', 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #3B82F6 80%, #93C5FD 100%)', 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 40%, #60A5FA 80%, #DBEAFE 100%)'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Meditation figure */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-30" animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🧘</motion.div>
        
        {/* Floating lotus flowers orbiting */}
        {lotusFlowers.map((lotus) => (<motion.div key={lotus.id} className="absolute top-1/3 left-1/2 text-2xl sm:text-3xl" style={{ transformOrigin: 'center' }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: lotus.delay }}><div style={{ transform: `translateX(${lotus.radius}px) translateY(-50%) rotate(-${lotus.angle}deg)` }}>🪷</div></motion.div>))}
        
        {/* Chakra energy spirals */}
        {chakras.map((chakra, i) => (<motion.div key={`chakra-${i}`} className="absolute left-1/2 -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 rounded-full" style={{ top: `${chakra.y}%`, background: chakra.color, boxShadow: `0 0 20px ${chakra.color}`, border: '2px solid rgba(255, 255, 255, 0.3)' }} animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }} />))}
        
        {/* Lotus bloom animation */}
        <motion.div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl" animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>🪷</motion.div>
        
        {/* Zen garden ripples */}
        {[0, 1, 2, 3].map((i) => (<motion.div key={`ripple-${i}`} className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 rounded-full border-2 border-blue-300/30" style={{ width: `${60 + i * 30}px`, height: `${20 + i * 10}px` }} animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }} />))}
        
        {/* Digital enlightenment symbols */}
        {['☯️', '🕉️', '☸️'].map((symbol, i) => (<motion.div key={`symbol-${i}`} className="absolute text-3xl sm:text-4xl opacity-20" style={{ left: `${25 + i * 25}%`, top: `${20 + (i % 2) * 30}%` }} animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9], rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: 'easeInOut' }}>{symbol}</motion.div>))}
        
        {/* Energy spirals emanating */}
        {[0, 1, 2].map((i) => (<motion.div key={`spiral-${i}`} className="absolute top-1/3 left-1/2 w-1 h-32 sm:h-40 origin-bottom opacity-20" style={{ background: `linear-gradient(to top, ${['#3B82F6', '#8B5CF6', '#EC4899'][i]}, transparent)`, transform: `rotate(${i * 120}deg)` }} animate={{ rotate: [i * 120, i * 120 + 360], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: i * 1.5 }} />))}
        
        {/* Enlightenment aura */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 opacity-15" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)' }} animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Sun icon */}
        <motion.div className="absolute top-10 right-1/4 text-5xl sm:text-6xl opacity-25" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>☀️</motion.div>
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Annual Voyager') {
    const orbitDots = useMemo(() => Array.from({ length: 36 }, (_, i) => ({
      id: i,
      angle: i * 10
    })), []);
    
    const travelStreaks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: i * 45,
      delay: i * 0.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🧭 Annual Voyager - Earth orbiting sun */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #020617 0%, #0F172A 40%, #1E293B 100%)' }} />
        {Array.from({ length: 60 }).map((_, i) => (<div key={`star-${i}`} className="absolute w-px h-px bg-white rounded-full opacity-50" style={{ left: `${(i * 19) % 100}%`, top: `${(i * 29) % 80}%` }} />))}
        
        {/* Sun at center */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-60" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(245, 158, 11, 0.8) 40%, rgba(234, 88, 12, 0.4) 70%, transparent 100%)', borderRadius: '50%', boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)' }} animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 40px rgba(251, 191, 36, 0.6)', '0 0 60px rgba(251, 191, 36, 1)', '0 0 40px rgba(251, 191, 36, 0.6)'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Sun rays */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`ray-${i}`} className="absolute top-1/2 left-1/2 w-1 h-20 sm:h-28 origin-bottom opacity-30" style={{ background: 'linear-gradient(to top, rgba(251, 191, 36, 0.6), transparent)', transform: `rotate(${i * 45}deg)` }} animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }} />))}
        
        {/* Orbital trajectory line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-blue-400/30 opacity-40" />
        
        {/* 365-day journey path dots */}
        {orbitDots.map((dot) => (<div key={dot.id} className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300/40 rounded-full" style={{ transform: `rotate(${dot.angle}deg) translateX(${24}vw) translateX(-2px)` }} />))}
        
        {/* Earth completing orbit */}
        <motion.div className="absolute top-1/2 left-1/2" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}><div className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, #3B82F6 0%, #1E40AF 50%, #1E3A8A 100%)', boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)', transform: `translateX(${24}vw) translateX(-12px) translateY(-50%)` }}><motion.div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent)' }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} /></div></motion.div>
        
        {/* Space travel streaks */}
        {travelStreaks.map((streak) => (<motion.div key={streak.id} className="absolute top-1/2 left-1/2 w-px h-12 sm:h-16 origin-bottom opacity-25" style={{ background: 'linear-gradient(to top, rgba(96, 165, 250, 0.6), transparent)', transform: `rotate(${streak.angle}deg)` }} animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: streak.delay, ease: 'easeOut' }} />))}
        
        {/* Moon orbiting Earth */}
        <motion.div className="absolute top-1/2 left-1/2" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}><motion.div className="absolute" style={{ transform: `translateX(${24}vw) translateX(-12px) translateY(-50%)` }} animate={{ rotate: -360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}><div className="w-2 h-2 bg-gray-300 rounded-full" style={{ boxShadow: '0 0 4px rgba(229, 231, 235, 0.6)', transform: 'translateX(20px)' }} /></motion.div></motion.div>
        
        {/* 365 indicator */}
        <motion.div className="absolute top-1/4 right-1/4 text-xs sm:text-sm font-mono text-cyan-300/50" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>365 days</motion.div>
        
        {/* Compass emoji */}
        <motion.div className="absolute bottom-1/4 left-1/4 text-5xl sm:text-6xl opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>🧭</motion.div>
        
        {/* Zodiac constellation dots */}
        {[0, 1, 2, 3].map((i) => (<motion.div key={`zodiac-${i}`} className="absolute text-xl sm:text-2xl opacity-20" style={{ left: `${20 + i * 20}%`, top: `${15 + (i % 2) * 60}%` }} animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}>✨</motion.div>))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Archive Mogul') {
    const servers = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 15 + (i % 4) * 20,
      top: 25 + Math.floor(i / 4) * 20,
      delay: i * 0.2
    })), []);
    
    const dataStreams = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 7) % 100,
      delay: i * 0.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 💼 Archive Mogul - Data center */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 40%, #4C1D95 80%, #6B21A8 100%)' }} />
        
        {/* Server racks */}
        {servers.map((server) => (<motion.div key={server.id} className="absolute w-12 h-16 sm:w-14 sm:h-20 opacity-50" style={{ left: `${server.left}%`, top: `${server.top}%`, background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(109, 40, 217, 0.6))', border: '2px solid rgba(168, 85, 247, 0.5)', borderRadius: '4px', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)' }} animate={{ boxShadow: ['0 4px 12px rgba(139, 92, 246, 0.3)', '0 4px 20px rgba(139, 92, 246, 0.7)', '0 4px 12px rgba(139, 92, 246, 0.3)'] }} transition={{ duration: 2, repeat: Infinity, delay: server.delay, ease: 'easeInOut' }}><div className="absolute top-2 left-2 right-2 h-px bg-purple-300/30" /><div className="absolute top-4 left-2 right-2 h-px bg-purple-300/30" /><div className="absolute top-6 left-2 right-2 h-px bg-purple-300/30" /><motion.div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: server.delay }} /></motion.div>))}
        
        {/* Digital cables connecting */}
        {[0, 1, 2, 3].map((i) => (<motion.div key={`cable-${i}`} className="absolute left-0 right-0 h-px opacity-30" style={{ top: `${30 + i * 15}%`, background: 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.6), transparent)' }} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }} />))}
        
        {/* Data stream particles */}
        {dataStreams.map((stream) => (<motion.div key={stream.id} className="absolute w-1 h-3 rounded-full" style={{ left: `${stream.left}%`, top: '10%', background: 'linear-gradient(to bottom, rgba(167, 139, 250, 0.8), rgba(139, 92, 246, 0.4))', boxShadow: '0 0 8px rgba(167, 139, 250, 0.8)' }} animate={{ y: [0, 280], opacity: [0, 1, 0.5, 0] }} transition={{ duration: 3 + (stream.id % 2), repeat: Infinity, delay: stream.delay, ease: 'linear' }} />))}
        
        {/* Binary code rain */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`binary-${i}`} className="absolute text-xs sm:text-sm font-mono text-purple-300/40" style={{ left: `${12 + i * 12}%`, top: '0%' }} animate={{ y: [0, 300], opacity: [0, 0.6, 0] }} transition={{ duration: 4 + (i % 2), repeat: Infinity, delay: i * 0.6, ease: 'linear' }}>{i % 2 ? '1010' : '0101'}</motion.div>))}
        
        {/* Cooling fans */}
        {[0, 1].map((i) => (<motion.div key={`fan-${i}`} className="absolute w-8 h-8 sm:w-10 sm:h-10 opacity-25" style={{ left: `${30 + i * 40}%`, bottom: '25%', border: '2px solid rgba(168, 85, 247, 0.4)', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><div className="absolute top-1/2 left-0 right-0 h-px bg-purple-400/40" /><div className="absolute left-1/2 top-0 bottom-0 w-px bg-purple-400/40" /></motion.div>))}
        
        {/* Briefcase emoji */}
        <motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-30" animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💼</motion.div>
        
        {/* Archive flow indicator */}
        <motion.div className="absolute bottom-1/4 left-1/4 text-sm sm:text-base font-mono text-purple-300/50" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>DATA FLOW ▶</motion.div>
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Lucky Archivist') {
    const clovers = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 11) % 100,
      top: 40 + (i % 5) * 10,
      delay: i * 0.3,
      size: 20 + (i % 4) * 10
    })), []);
    
    const shamrocks = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: (i * 13) % 100,
      delay: i * 0.5
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🍀 Lucky Archivist - Clover field */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #14532D 0%, #166534 40%, #16A34A 80%, #22C55E 100%)' }} />
        
        {/* Grass texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 3px, rgba(0,0,0,0.1) 4px)' }} />
        
        {/* Four-leaf clover field */}
        {clovers.map((clover) => (<motion.div key={clover.id} className="absolute opacity-60" style={{ left: `${clover.left}%`, top: `${clover.top}%`, fontSize: `${clover.size}px` }} animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: clover.delay, ease: 'easeInOut' }}>🍀</motion.div>))}
        
        {/* Glowing 177 in neon green */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl font-bold opacity-70" style={{ color: '#22C55E', textShadow: '0 0 20px rgba(34, 197, 94, 0.9), 0 0 40px rgba(34, 197, 94, 0.6)' }} animate={{ textShadow: ['0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)', '0 0 30px rgba(34, 197, 94, 1), 0 0 60px rgba(34, 197, 94, 0.8)', '0 0 20px rgba(34, 197, 94, 0.7), 0 0 40px rgba(34, 197, 94, 0.4)'], scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>177</motion.div>
        
        {/* Shamrock rain */}
        {shamrocks.map((shamrock) => (<motion.div key={shamrock.id} className="absolute text-3xl sm:text-4xl opacity-70" style={{ left: `${shamrock.left}%`, top: '-10%' }} animate={{ y: [0, 350], rotate: [0, 360, 720] }} transition={{ duration: 4 + (shamrock.id % 2), repeat: Infinity, delay: shamrock.delay, ease: 'easeIn' }}>☘️</motion.div>))}
        
        {/* Clover spin animation (large center) */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl sm:text-9xl opacity-20" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 10, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}>🍀</motion.div>
        
        {/* Lucky sparkles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`sparkle-${i}`} className="absolute text-yellow-300 text-2xl sm:text-3xl" style={{ left: `${20 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>✨</motion.div>))}
        
        {/* Rainbow pot at corner */}
        <motion.div className="absolute bottom-20 sm:bottom-24 right-1/4 opacity-50" animate={{ scale: [0.95, 1.05, 0.95], y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><div className="text-4xl sm:text-5xl">🌈</div><div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl">💰</div></motion.div>
        
        {/* 777 slot machine indicators */}
        <motion.div className="absolute top-1/4 right-1/4 text-2xl sm:text-3xl font-bold text-yellow-400 opacity-60" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>7️⃣7️⃣7️⃣</motion.div>
        
        {/* Lucky horseshoe */}
        <motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-30" animate={{ rotate: [0, 20, 0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🧲</motion.div>
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Golden Mathematician') {
    const equations = useMemo(() => ['∫', '∑', '∞', '√', 'π', 'φ', '∂', '∆'], []);
    const geometricShapes = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 20 + i * 8,
      angle: i * 60,
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
        {/* 📐 Golden Mathematician - Fibonacci spiral */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #78350F 0%, #92400E 30%, #B45309 60%, #D97706 100%)' }} />
        
        {/* Golden ratio spiral (Fibonacci) */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 opacity-40" viewBox="0 0 200 200"><motion.path d="M 100,100 Q 100,60 140,60 Q 180,60 180,100 Q 180,140 140,140 Q 100,140 100,100 M 100,100 Q 100,80 120,80 Q 140,80 140,100 Q 140,120 120,120 Q 100,120 100,100" stroke="rgba(251, 191, 36, 0.8)" strokeWidth="3" fill="none" strokeLinecap="round" initial={{ pathLength: 0, rotate: 0 }} animate={{ pathLength: 1, rotate: 360 }} transition={{ pathLength: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }} /></svg>
        
        {/* Mathematical equations floating */}
        {equations.map((eq, i) => (<motion.div key={`eq-${i}`} className="absolute text-2xl sm:text-3xl font-serif text-yellow-200/50" style={{ left: `${15 + (i * 12) % 70}%`, top: `${20 + (i % 4) * 20}%` }} animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}>{eq}</motion.div>))}
        
        {/* Sacred geometry shapes */}
        {geometricShapes.map((shape) => (<motion.div key={shape.id} className="absolute top-1/2 left-1/2" style={{ transformOrigin: 'center' }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: shape.delay }}><div className="absolute rounded-full border-2 border-yellow-400/30" style={{ width: `${shape.size}px`, height: `${shape.size}px`, transform: `translateX(${12}vw) translateY(-50%) translate(-50%, 0)` }} /></motion.div>))}
        
        {/* Phi symbol glowing */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl font-serif text-yellow-400/60" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }} animate={{ textShadow: ['0 0 20px rgba(251, 191, 36, 0.6)', '0 0 40px rgba(251, 191, 36, 1)', '0 0 20px rgba(251, 191, 36, 0.6)'], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>φ</motion.div>
        
        {/* Golden ratio value */}
        <motion.div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-sm sm:text-base font-mono text-yellow-300/50" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>1.618...</motion.div>
        
        {/* Geometric shapes (hexagons, pentagons) */}
        {[0, 1, 2].map((i) => (<motion.div key={`geo-${i}`} className="absolute w-12 h-12 sm:w-16 sm:h-16 opacity-25" style={{ left: `${25 + i * 25}%`, top: `${60 + (i % 2) * 15}%`, border: '2px solid rgba(251, 191, 36, 0.5)' }} animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 15, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 } }}><div className="absolute inset-2 border border-yellow-400/30" style={{ clipPath: i === 0 ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' : 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} /></motion.div>))}
        
        {/* Calculator emoji */}
        <motion.div className="absolute bottom-1/4 right-1/4 text-5xl sm:text-6xl opacity-30" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🧮</motion.div>
        
        {/* Ruler emoji */}
        <motion.div className="absolute top-1/4 right-1/4 text-5xl sm:text-6xl opacity-30" animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>📐</motion.div>
        
        {/* Compass tool */}
        <motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-30" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>📏</motion.div>
        
        {/* Golden particles */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`particle-${i}`} className="absolute w-1 h-1 rounded-full bg-yellow-300" style={{ left: `${20 + i * 10}%`, top: `${30 + (i % 3) * 20}%`, boxShadow: '0 0 6px rgba(251, 191, 36, 0.8)' }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Story Curator') {
    const masks = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 25 + i * 25,
      top: 40 + i * 5,
      delay: i * 1.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Grand museum hall gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 100%, #b45309 0%, #7f1d1d 50%, #1a0505 100%)`,
          }}
        />
        
        {/* Velvet texture overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '4px 4px'
          }}
        />
        
        {/* Theater curtains at top - Enhanced */}
        <motion.div
          className="absolute top-0 left-0 w-full h-12"
          style={{
            background: 'linear-gradient(to bottom, #7f1d1d 0%, transparent 100%)',
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)'
          }}
        />
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/40 to-transparent" />
        
        {/* Spotlight beams - Volumetric */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-[150%] opacity-20 pointer-events-none"
          style={{
            background: 'conic-gradient(from 180deg at 50% 0%, transparent 160deg, rgba(251, 191, 36, 0.4) 180deg, transparent 200deg)',
            filter: 'blur(20px)'
          }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Theater masks floating */}
        {masks.map((m) => (
          <motion.div
            key={m.id}
            className="absolute text-2xl sm:text-3xl opacity-0"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
            }}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0, 0.6, 0],
              rotate: [-10, 10, -10]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: m.delay
            }}
          >
            🎭
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
  
  if (titleName === 'Chronicler') {
    const ribbons = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 30 + i * 20,
      background: i === 1 ? '#10b981' : '#059669',
      delay: i * 0.7
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Ink-stained parchment gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #064e3b 0%, #065f46 50%, #34d399 100%)`,
          }}
        />
        
        {/* Floating text fragments */}
        <div className="absolute inset-0 overflow-hidden opacity-10 font-serif">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
              animate={{ y: -50, opacity: 0 }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            >
              {['Memories', 'Stories', 'Time', 'Legacy', 'Echoes'][i % 5]}
            </motion.div>
          ))}
        </div>
        
        {/* Book spine lines (vertical rules) */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-px h-full bg-green-800" />
          <div className="absolute top-0 left-1/2 w-2 h-full bg-black/20 blur-sm" /> {/* Spine shadow */}
          <div className="absolute top-0 left-3/4 w-px h-full bg-green-800" />
        </div>
        
        {/* Aged paper texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Bookmark ribbons */}
        {ribbons.map((r) => (
          <motion.div
            key={r.id}
            className="absolute w-1 sm:w-1.5 h-20 sm:h-32 opacity-30"
            style={{
              left: `${r.left}%`,
              top: 0,
              background: r.background
            }}
            animate={{ 
              y: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: r.delay
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
  
  if (titleName === 'Moment Harvester') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Golden harvest gradient - Richer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #78350f 0%, #b45309 40%, #f59e0b 100%)`, 
          }}
        />
        
        {/* Swaying Field of Dreams at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-30 pointer-events-none">
           {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
               key={i}
               className="absolute bottom-0 w-1 bg-yellow-500/50 rounded-t-full origin-bottom"
               style={{
                 left: `${i * 5}%`,
                 height: `${30 + Math.random() * 50}%`
               }}
               animate={{ rotate: [-5, 5, -5] }}
               transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
             />
           ))}
        </div>
        
        {/* Agricultural/Field texture */}
         <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.1) 10px, rgba(251, 191, 36, 0.1) 12px)
                `,
            }}
        />
        
        {/* Sun rays from top - Enhanced */}
        <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] h-[150%] opacity-40 pointer-events-none"
            style={{
                background: 'conic-gradient(from 180deg at 50% 0%, transparent 150deg, rgba(255, 251, 235, 0.5) 180deg, transparent 210deg)'
            }}
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Eternal Witness') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Deep time vortex gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, #1e1b4b 0%, #312e81 60%, #000000 100%)`,
          }}
        />
        
        {/* Rotating clockwork texture */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-conic-gradient(rgba(255,255,255,0.1) 0deg 10deg, transparent 10deg 20deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* The Eye of Time - Central glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ background: '#6366f1' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Master Archivist') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Deep digital void */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)`,
          }}
        />
        
        {/* Binary Overlay */}
        <div 
          className="absolute inset-0 opacity-10 font-mono text-[10px] leading-3 break-all overflow-hidden"
          style={{ color: '#818cf8' }}
        >
          {Array.from({ length: 400 }).map(() => Math.random() > 0.5 ? '1 ' : '0 ').join('')}
        </div>

        {/* Scanning line */}
        <motion.div
            className="absolute left-0 right-0 h-1 bg-indigo-400/50 shadow-[0_0_10px_#818cf8]"
            animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  if (titleName === 'Keeper of Eras') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Crystalline Vault Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 120%, #701a75 0%, #4a044e 50%, #1a0505 100%)`,
          }}
        />
        
        {/* Faceted Crystal Overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
                 backgroundImage: `linear-gradient(60deg, transparent 40%, rgba(255,255,255,0.1) 41%, transparent 42%), 
                                   linear-gradient(-60deg, transparent 40%, rgba(255,255,255,0.1) 41%, transparent 42%)`
             }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  if (titleName === 'Circle Builder') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Network Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #064e3b 0%, #065f46 100%)`,
          }}
        />
        
        {/* Grid Texture */}
        <div 
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `radial-gradient(circle, #34d399 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  if (titleName === 'Futurist') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Cyberpunk Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0891b2 100%)`,
          }}
        />
        
        {/* Digital rain/lines */}
        <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-1/4 w-px h-full bg-cyan-400 blur-sm" />
             <div className="absolute top-0 right-1/4 w-px h-full bg-cyan-400 blur-sm" />
        </div>
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  if (titleName === 'Dream Weaver') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Dreamy Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, #4f46e5 0%, #a5b4fc 50%, #e0e7ff 100%)`,
          }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  if (titleName === 'Frequency Keeper') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Synthwave Gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #be185d 0%, #831843 100%)`,
          }}
        />
        
        {/* Equalizer lines background */}
         <div 
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, #fbcfe8 10px, #fbcfe8 11px)`
            }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }

  // ============================================================================
  // EPIC TIER (3+ titles): Cinematic Lighting + Premium Materials
  // ============================================================================
  
  if (titleName === 'Golden Hour Keeper') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Warm tapestry gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #d97706 0%, #92400e 100%)`,
          }}
        />
        
        {/* Woven fabric texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(146, 64, 14, 0.2) 10px, rgba(146, 64, 14, 0.2) 11px),
              repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(217, 119, 6, 0.2) 10px, rgba(217, 119, 6, 0.2) 11px)
            `,
          }}
        />
        
        {/* Flowing thread animations */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <motion.path
            d="M 0,30 Q 25,20 50,30 T 100,30"
            stroke="rgba(251, 191, 36, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d="M 0,50 Q 25,60 50,50 T 100,50"
            stroke="rgba(217, 119, 6, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity }}
          />
          <motion.path
            d="M 0,70 Q 25,80 50,70 T 100,70"
            stroke="rgba(146, 64, 14, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity }}
          />
        </svg>
        
        {/* Golden hour cinematic lighting */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.5) 0%, transparent 60%)',
          }}
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Legacy Forger') {
    const sparks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      x: (Math.random() - 0.5) * 40,
      delay: i * 0.3,
      duration: 1 + Math.random()
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Molten metal gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #450a0a 0%, #ea580c 50%, #dc2626 100%)`,
          }}
        />
        
        {/* Forge glow from bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-40"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(234, 88, 12, 0.8) 100%)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Sparks flying */}
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              left: `${s.left}%`,
              bottom: '20%'
            }}
            animate={{ 
              y: [-20, -60],
              x: [0, s.x],
              opacity: [1, 0],
              scale: [1, 0.3]
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay
            }}
          />
        ))}
        
        {/* Metallic shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Audio Alchemist') {
    const waves = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
      id: i,
      top: 15 + i * 12,
      duration: 1.5 + i * 0.2,
      delay: i * 0.15
    })), []);

    const notes = useMemo(() => ['🎵', '🎶', '🎵'].map((note, i) => ({
      id: i,
      note,
      left: 20 + i * 30,
      top: 30 + i * 10,
      delay: i * 1
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Sound wave gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #F472B6 0%, #E11D48 100%)`,
          }}
        />
        
        {/* Animated sound waves */}
        <div className="absolute inset-0 opacity-25">
          {waves.map((w) => (
            <motion.div
              key={w.id}
              className="absolute left-0 right-0 h-px bg-pink-200"
              style={{ top: `${w.top}%` }}
              animate={{ 
                scaleX: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: w.duration, 
                repeat: Infinity,
                delay: w.delay 
              }}
            />
          ))}
        </div>
        
        {/* Music notes floating */}
        {notes.map((n) => (
          <motion.div
            key={n.id}
            className="absolute text-xl sm:text-3xl opacity-0"
            style={{
              left: `${n.left}%`,
              top: `${n.top}%`
            }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: n.delay
            }}
          >
            {n.note}
          </motion.div>
        ))}
        
        {/* Cinematic rim lighting */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(251, 113, 133, 0.4) 0%, transparent 50%)',
          }}
        />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Echo Magnet') {
    const rings = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
      id: i,
      scale: 2 + i * 0.5,
      delay: i * 0.7
    })), []);

    const bubbles = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 15 + i * 18,
      top: 25 + (i % 2) * 30,
      delay: i * 0.5
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* Purple cosmic gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)`,
          }}
        />
        
        {/* Rippling echo rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {rings.map((r) => (
            <motion.div
              key={r.id}
              className="absolute border-2 border-purple-300 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: r.scale, opacity: 0 }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: r.delay
              }}
              style={{
                width: '100px',
                height: '100px'
              }}
            />
          ))}
        </div>
        
        {/* Comment bubbles */}
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute text-lg sm:text-2xl opacity-0"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`
            }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: b.delay
            }}
          >
            💬
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
  
  // ============================================================================
  // LEGENDARY TIER: UNIQUE IMPLEMENTATIONS - Each title is completely distinct
  // ============================================================================
  
  // Memory Architect 🏛️ - Architectural blueprints with golden light
  if (titleName === 'Memory Architect') {
    const gridH = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);
    const gridV = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
    const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      duration: 2 + Math.random(),
      delay: Math.random() * 2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fef3c7 100%)' }} />
        
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full">
            {gridH.map((i) => (
              <line key={`h-${i}`} x1="0" y1={`${i * 12.5}%`} x2="100%" y2={`${i * 12.5}%`} stroke="#d97706" strokeWidth="0.5" />
            ))}
            {gridV.map((i) => (
              <line key={`v-${i}`} x1={`${i * 8.33}%`} y1="0" x2={`${i * 8.33}%`} y2="100%" stroke="#d97706" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
        
        {/* Golden particles */}
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute w-1 h-1 bg-amber-300 rounded-full"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Chronicle Keeper 📜 - Ancient scroll with sepia tones
  if (titleName === 'Chronicle Keeper') {
    const drops = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: 20 + i * 15,
      left: 15 + i * 12,
      duration: 3 + i * 0.5
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #92400e 0%, #451a03 100%)' }} />
        
        {/* Aged paper texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(120, 53, 15, 0.2) 19px)`
        }} />
        
        {/* Ink drops */}
        {drops.map((d) => (
          <motion.div key={d.id} className="absolute w-2 h-2 bg-amber-900/40 rounded-full blur-sm"
            style={{ top: `${d.top}%`, left: `${d.left}%` }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: d.duration, repeat: Infinity }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Temporal Sovereign 👑 - Royal purple with gold crown motifs
  if (titleName === 'Temporal Sovereign') {
    const sparkles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: 10 + i * 6,
      top: 30 + (i % 3) * 15,
      delay: i * 0.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #fbbf24 100%)' }} />
        
        {/* Crown sparkles */}
        {sparkles.map((s) => (
          <motion.div key={s.id} className="absolute text-2xl opacity-0"
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
          >
            ✨
          </motion.div>
        ))}
        
        {/* Royal vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(124, 58, 237, 0.3) 100%)'
        }} />
        
        {/* Cosmic effects */}
        {Object.values(effects).map(effect => effect)}
        
        {/* 🌌 RANDOM COSMIC EVENTS */}
        {cosmicEvents}
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Grand Historian 📚 - Library with warm amber lighting
  if (titleName === 'Grand Historian') {
    const spines = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: i * 8,
      bg: i % 2 === 0 ? '#b45309' : '#92400e'
    })), []);

    const pages = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: 25 + i * 8,
      left: 20 + (i % 2) * 40,
      duration: 2 + i * 0.3
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)' }} />
        
        {/* Book spines */}
        <div className="absolute inset-0 opacity-20">
          {spines.map((s) => (
            <div key={s.id} className="absolute h-full" style={{
              left: `${s.left}%`,
              width: '6px',
              background: s.bg
            }} />
          ))}
        </div>
        
        {/* Glowing pages */}
        {pages.map((p) => (
          <motion.div key={p.id} className="absolute w-16 h-1 bg-amber-200/40"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Legend ⭐ - Cosmic supernova with fiery explosion
  if (titleName === 'Legend') {
    const rays = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      rotate: i * 15,
      delay: i * 0.05
    })), []);

    const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      duration: 1.5 + Math.random(),
      delay: Math.random() * 2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)' }} />
        
        {/* Supernova explosion */}
        {rays.map((r) => (
          <motion.div key={r.id} className="absolute w-1 h-8 bg-gradient-to-b from-yellow-200 to-transparent origin-bottom"
            style={{ 
              left: '50%', 
              top: '40%',
              transform: `rotate(${r.rotate}deg)`,
            }}
            animate={{ 
              scaleY: [0.5, 1.2, 0.5],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: r.delay }}
          />
        ))}
        
        {/* Star particles */}
        {stars.map((s) => (
          <motion.div key={s.id} className="absolute w-1 h-1 bg-amber-200 rounded-full"
            style={{ top: `${s.top}%`, left: `${s.left}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 2, 1] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Time Lord ⌛ - Temporal vortex with purple/violet swirls
  if (titleName === 'Time Lord') {
    const vortex = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      width: (i + 1) * 40,
      height: (i + 1) * 40
    })), []);

    const fragments = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 15 + i * 7,
      top: 25 + (i % 3) * 20,
      delay: i * 0.25
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)' }} />
        
        {/* Time vortex spiral */}
        <motion.div className="absolute inset-0 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {vortex.map((v) => (
            <div key={v.id} className="absolute rounded-full border-2 border-purple-300/50"
              style={{
                left: '50%',
                top: '50%',
                width: `${v.width}px`,
                height: `${v.height}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </motion.div>
        
        {/* Time fragments */}
        {fragments.map((f) => (
          <motion.div key={f.id} className="absolute text-lg opacity-0"
            style={{ left: `${f.left}%`, top: `${f.top}%` }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: f.delay }}
          >
            ⏳
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
  
  // Archive Master 📦
  if (titleName === 'Archive Master') {
    const drawers = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: 15 + i * 12,
      delay: i * 0.3
    })), []);

    const docs = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 20 + i * 10,
      top: 30 + (i % 2) * 25,
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)' }} />
        
        {/* Filing cabinet drawers */}
        <div className="absolute inset-0 opacity-15">
          {drawers.map((d) => (
            <motion.div key={d.id} className="absolute left-0 right-0 h-px bg-indigo-300"
              style={{ top: `${d.top}%` }}
              animate={{ scaleX: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: d.delay }}
            />
          ))}
        </div>
        
        {/* Document icons */}
        {docs.map((d) => (
          <motion.div key={d.id} className="absolute text-xl opacity-0"
            style={{ left: `${d.left}%`, top: `${d.top}%` }}
            animate={{ opacity: [0, 0.5, 0], y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: d.delay }}
          >
            📄
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
  
  // ============================================================================
  // LEGENDARY TIER - ULTIMATE HORIZONS 🌟
  // ============================================================================
  
  // Legend (500 capsules) - Dimensional Rift Portal
  if (titleName === 'Legend') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <DimensionalRiftPortal colors={config.colors} isPreview={preview} />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Time Lord (capsules across 5+ years) - Hourglass Universe
  if (titleName === 'Time Lord') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <HourglassUniverse colors={config.colors} isPreview={preview} />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Archive Master') {
    const capsuleOrbs = useMemo(() => Array.from({ length: 50 }, (_, i) => { const angle = (i * 360) / 50; const radius = 25 + (i % 5) * 8; return { id: i, x: 50 + radius * Math.cos((angle * Math.PI) / 180), y: 40 + radius * Math.sin((angle * Math.PI) / 180), delay: i * 0.08, size: 0.8 + (i % 3) * 0.3 }; }), []);
    const throneColumns = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, x: 20 + i * 10, delay: i * 0.3 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 20%, #3730A3 40%, #4338CA 60%, #6366F1 80%, #818CF8 100%)' }} /><div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(129, 140, 248, 0.4) 2px, transparent 2px)', backgroundSize: '40px 40px' }} />{throneColumns.map((col) => (<motion.div key={col.id} className="absolute bottom-0 w-8 sm:w-10 opacity-50" style={{ left: `${col.x}%`, height: '60%', background: 'linear-gradient(to top, rgba(49, 46, 129, 0.9), rgba(67, 56, 202, 0.6))', border: '2px solid rgba(99, 102, 241, 0.5)', borderBottom: 'none', boxShadow: '0 -4px 20px rgba(99, 102, 241, 0.5)' }} animate={{ opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 4, repeat: Infinity, delay: col.delay, ease: 'easeInOut' }}><div className="absolute inset-2 border border-indigo-400/30" /></motion.div>))}<motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-24 sm:w-40 sm:h-32 opacity-70" style={{ background: 'linear-gradient(to top, rgba(67, 56, 202, 0.8), rgba(99, 102, 241, 0.6))', border: '4px solid rgba(129, 140, 248, 0.7)', borderBottom: 'none', boxShadow: '0 -8px 50px rgba(99, 102, 241, 0.9), inset 0 0 40px rgba(129, 140, 248, 0.3)', clipPath: 'polygon(20% 100%, 15% 0%, 85% 0%, 80% 100%)' }} animate={{ boxShadow: ['0 -8px 50px rgba(99, 102, 241, 0.8)', '0 -12px 70px rgba(99, 102, 241, 1)', '0 -8px 50px rgba(99, 102, 241, 0.8)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-4 border-2 border-indigo-300/40" /><motion.div className="absolute top-4 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>👑</motion.div></motion.div>{capsuleOrbs.map((orb) => (<motion.div key={orb.id} className="absolute" style={{ left: `${orb.x}%`, top: `${orb.y}%` }}><motion.div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: `${orb.size * 1.5}rem`, height: `${orb.size * 1.5}rem`, background: 'radial-gradient(circle at 35% 35%, rgba(199, 210, 254, 0.9), rgba(129, 140, 248, 0.7), rgba(99, 102, 241, 0.5))', border: '2px solid rgba(165, 180, 252, 0.6)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), inset 0 0 15px rgba(199, 210, 254, 0.4)' }} animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 20px rgba(99, 102, 241, 0.7)', '0 0 35px rgba(99, 102, 241, 1)', '0 0 20px rgba(99, 102, 241, 0.7)'], y: [0, -10, 0] }} transition={{ duration: 3 + (orb.id % 3), repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg sm:text-xl" animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>📦</motion.div></motion.div><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-300/30" style={{ width: `${orb.size * 2}rem`, height: `${orb.size * 2}rem` }} animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: orb.delay, ease: 'easeOut' }} /></motion.div>))}{[0, 1, 2, 3, 4].map((i) => (<motion.div key={`constellation-${i}`} className="absolute rounded-full opacity-40" style={{ left: `${30 + i * 10}%`, top: `${20 + (i % 2) * 15}%`, width: `${4 + i * 0.5}rem`, height: `${4 + i * 0.5}rem`, border: '2px solid rgba(129, 140, 248, 0.5)' }} animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }} />))}{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<motion.div key={`sparkle-${i}`} className="absolute w-2 h-2 rounded-full bg-indigo-200" style={{ left: `${20 + i * 8}%`, top: `${25 + (i % 4) * 15}%`, boxShadow: '0 0 12px rgba(165, 180, 252, 1)' }} animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />))}{['🏛️', '✨', '💎', '⚡'].map((emoji, i) => (<motion.div key={`grand-${i}`} className="absolute text-5xl sm:text-6xl opacity-40" style={{ left: `${25 + i * 18}%`, bottom: `${25 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-6xl sm:text-7xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>🌟</motion.div><motion.div className="absolute top-1/3 left-1/5 text-6xl sm:text-7xl opacity-50" animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🔮</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  // Perfect Chronicler (30 consecutive days with media) - Precision Target Reticle
  if (titleName === 'Perfect Chronicler') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <PrecisionTargetReticle colors={config.colors} isPreview={preview} />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Time Patient (A019) - Neon Dreamer Cyberpunk
  if (titleName === 'Time Patient') {
    const sandParticles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 48 + (Math.random() - 0.5) * 4,
      delay: i * 0.08
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* ⏳ Time Patient - Purple hourglass with upward-flowing sand (time reversal) */}
        <motion.div 
          className="absolute inset-0"
          animate={{ background: ['linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #A78BFA 100%)', 'linear-gradient(135deg, #5B21B6 0%, #8B5CF6 50%, #C4B5FD 100%)', 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #A78BFA 100%)'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Time reversal shimmer overlay */}
        <motion.div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.4) 0%, transparent 60%)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Hourglass frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-40 sm:w-32 sm:h-52 opacity-40">
          <div className="absolute inset-x-0 top-0 h-2 bg-purple-200/60 rounded-t-lg" />
          <div className="absolute left-0 top-2 w-full h-16 sm:h-20" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 50% 100%)' }}>
            <div className="absolute inset-0 border-2 border-purple-200/60" style={{ clipPath: 'inherit' }} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-300/50 rounded-full" style={{ top: 'calc(50% - 4px)' }} />
          <div className="absolute left-0 bottom-2 w-full h-16 sm:h-20" style={{ clipPath: 'polygon(50% 0%, 80% 100%, 20% 100%)' }}>
            <div className="absolute inset-0 border-2 border-purple-200/60" style={{ clipPath: 'inherit' }} />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2 bg-purple-200/60 rounded-b-lg" />
        </div>
        
        {/* Purple sand flowing UPWARD (defying time) */}
        {sandParticles.map((particle) => (
          <motion.div key={particle.id} className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-purple-300" style={{ left: `${particle.x}%`, bottom: '20%', boxShadow: '0 0 4px rgba(167, 139, 250, 0.8)' }} animate={{ y: [0, -80, -160], x: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3 + Math.random(), repeat: Infinity, delay: particle.delay, ease: 'easeOut' }} />
        ))}
        
        {/* Patient clock hands moving slowly */}
        <motion.div className="absolute top-1/4 right-1/4 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-purple-300/30 opacity-25" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-6 sm:h-7 bg-purple-200/50 origin-bottom" style={{ transform: 'translateX(-50%) translateY(-100%)' }} />
        </motion.div>
        
        {/* Hourglass icon */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-30" animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>⏳</motion.div>
        
        {/* Time particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={`time-${i}`} className="absolute w-1 h-1 rounded-full bg-purple-200/60" style={{ left: `${20 + i * 6}%`, top: `${30 + (i % 3) * 20}%` }} animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Word Weaver (A028) - Surrealist Dreamscape
  if (titleName === 'Word Weaver') {
    const words = useMemo(() => ['Story', 'Dream', 'Memory', 'Time', 'Hope', 'Love', 'Life', 'Wonder'], []);
    const wordParticles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      word: words[i],
      left: 15 + i * 12,
      top: 25 + (i % 3) * 20,
      delay: i * 0.5
    })), [words]);
    
    const inkFlows = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: 20 + i * 18,
      startY: 15 + i * 12
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 📜 Word Weaver - Typewriter keys creating tapestry of glowing words */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #818CF8 100%)', 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #A78BFA 100%)', 'linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #818CF8 100%)'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Typewriter paper background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 sm:w-96 sm:h-72 bg-indigo-50/5 border-2 border-indigo-200/10 rounded-sm opacity-20" />
        
        {/* Glowing words weaving into patterns */}
        {wordParticles.map((wp) => (
          <motion.div key={wp.id} className="absolute text-sm sm:text-lg font-serif text-indigo-200/70" style={{ left: `${wp.left}%`, top: `${wp.top}%`, textShadow: '0 0 10px rgba(129, 140, 248, 0.8)' }} animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10], scale: [0.8, 1, 1, 1.1] }} transition={{ duration: 4, repeat: Infinity, delay: wp.delay, times: [0, 0.2, 0.7, 1] }}>{wp.word}</motion.div>
        ))}
        
        {/* Typewriter key strikes appearing */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`key-${i}`} className="absolute w-6 h-6 sm:w-8 sm:h-8 border-2 border-indigo-300/40 rounded bg-indigo-200/10" style={{ left: `${25 + i * 15}%`, bottom: '25%' }} animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.4, repeatDelay: 1.2 }}>
            <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-indigo-200/60 font-mono">{['A', 'B', 'C', 'D'][i]}</div>
          </motion.div>
        ))}
        
        {/* Ink flowing into cursive letters */}
        {inkFlows.map((ink) => (
          <motion.div key={ink.id} className="absolute w-px h-12 sm:h-16 bg-gradient-to-b from-indigo-300/60 to-transparent origin-top" style={{ left: `${ink.startX}%`, top: `${ink.startY}%` }} animate={{ scaleY: [0, 1, 0], opacity: [0, 0.8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: ink.id * 0.6, ease: 'easeOut' }} />
        ))}
        
        {/* Textile weaving pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(129, 140, 248, 0.1) 10px, rgba(129, 140, 248, 0.1) 11px), repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(129, 140, 248, 0.1) 10px, rgba(129, 140, 248, 0.1) 11px)' }} />
        
        {/* Cursive letter trails */}
        {['S', 'W', 'T'].map((letter, i) => (
          <motion.div key={`letter-${i}`} className="absolute text-4xl sm:text-5xl font-serif text-indigo-200/20 italic" style={{ left: `${20 + i * 30}%`, top: `${35 + i * 15}%` }} animate={{ opacity: [0, 0.3, 0], scale: [0.9, 1.1, 0.9], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}>{letter}</motion.div>
        ))}
        
        {/* Scroll icon */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-15" animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>📜</motion.div>
        
        {/* Sparkling word particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={`sparkle-${i}`} className="absolute w-1 h-1 bg-indigo-200 rounded-full" style={{ left: `${10 + i * 8}%`, top: `${20 + (i % 4) * 18}%`, boxShadow: '0 0 4px rgba(129, 140, 248, 0.8)' }} animate={{ scale: [0, 1.5, 0], opacity: [0, 0.9, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Far Planner (A020) - Time Sculptor Prismatic
  if (titleName === 'Far Planner') {
    const planets = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 8 + i * 4,
      orbitRadius: 60 + i * 30,
      color: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'][i],
      delay: i * 2
    })), []);
    
    const calendarDates = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      orbitRadius: 80 + (i % 3) * 25,
      delay: i * 0.5
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🔭 Far Planner - Telescope viewing planets */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #334155 100%)' }} />
        {Array.from({ length: 50 }).map((_, i) => (<div key={`star-${i}`} className="absolute w-px h-px bg-white rounded-full opacity-60" style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 80}%` }} />))}
        <div className="absolute bottom-16 left-1/4 opacity-30"><div className="relative"><div className="w-2 h-20 sm:w-3 sm:h-28 bg-gradient-to-t from-slate-400/60 to-slate-200/80 rotate-45 origin-bottom-left" /><div className="absolute top-0 left-0 w-12 h-4 sm:w-16 sm:h-5 bg-gradient-to-r from-slate-300/70 to-slate-500/60 rounded-full transform -rotate-45" style={{ transformOrigin: 'left center' }} /><motion.div className="absolute -top-1 left-12 sm:left-16 w-1 h-1 bg-cyan-400 rounded-full" style={{ boxShadow: '0 0 12px rgba(34, 211, 238, 0.9)' }} animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8] }} transition={{ duration: 2, repeat: Infinity }} /></div></div>
        <motion.div className="absolute top-1/3 right-1/3 w-32 h-32 sm:w-40 sm:h-40 opacity-20" style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '50%' }} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-4 border border-blue-400/20 rounded-full" /><div className="absolute inset-8 border border-blue-300/15 rounded-full" /></motion.div>
        {planets.map((planet) => (<motion.div key={planet.id} className="absolute top-1/2 left-1/2" style={{ width: `${planet.size}px`, height: `${planet.size}px` }} animate={{ rotate: 360 }} transition={{ duration: 15 + planet.id * 5, repeat: Infinity, ease: 'linear', delay: planet.delay }}><div className="absolute rounded-full" style={{ width: `${planet.size}px`, height: `${planet.size}px`, background: planet.color, boxShadow: `0 0 ${planet.size * 2}px ${planet.color}`, transform: `translateX(${planet.orbitRadius}px) translateY(-50%)` }} /></motion.div>))}
        {calendarDates.map((date) => (<motion.div key={date.id} className="absolute top-1/2 left-1/2 text-xs sm:text-sm opacity-40 font-mono text-blue-200" animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: date.delay }}><div style={{ transform: `translateX(${date.orbitRadius}px) translateY(-50%) rotate(${date.id * 30}deg)` }}>{(date.id + 1).toString().padStart(2, '0')}</div></motion.div>))}
        {[0, 1, 2].map((i) => (<motion.div key={`orbit-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-600/30" style={{ width: `${(80 + i * 25) * 2}px`, height: `${(80 + i * 25) * 2}px` }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />))}
        <motion.div className="absolute top-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 opacity-20" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)' }} animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        {[0, 1, 2].map((i) => (<motion.div key={`trail-${i}`} className="absolute top-1/2 left-1/2 w-1 h-20 origin-bottom opacity-20" style={{ background: `linear-gradient(to top, ${['#3B82F6', '#8B5CF6', '#EC4899'][i]}, transparent)`, transform: `rotate(${i * 45}deg)` }} animate={{ rotate: [i * 45, i * 45 + 360] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: i * 1.5 }} />))}
        <motion.div className="absolute top-1/3 left-1/4 text-5xl sm:text-6xl opacity-25" animate={{ rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🔭</motion.div>
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Memory Sharer (A032) - Memory Broadcaster Tower
  if (titleName === 'Memory Sharer') {
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
  
  // Birthday Keeper (A027) - also handles New Year's Keeper (renamed A027 v2.8.0)
  if (titleName === 'Birthday Keeper' || titleName === "New Year's Keeper") {
    const confetti = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: 10 + (i * 2.5) % 80,
      delay: i * 0.1,
      color: ['#FCD34D', '#FB923C', '#F472B6', '#A78BFA', '#60A5FA'][i % 5],
      rotation: Math.random() * 360
    })), []);
    
    const candles = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 35 + i * 7,
      delay: i * 0.2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🎂 Birthday Keeper - Party celebration with exploding cake candles */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 40%, #F472B6 100%)' }} />
        
        {/* Party popper bursts */}
        {[0, 1].map((i) => (
          <motion.div key={`burst-${i}`} className="absolute w-16 h-16 sm:w-20 sm:h-20 opacity-40" style={{ left: `${20 + i * 60}%`, top: '15%' }} animate={{ rotate: [0, 180, 360], scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}>
            {Array.from({ length: 12 }).map((_, j) => (
              <div key={j} className="absolute w-0.5 h-6 sm:h-8 bg-yellow-300" style={{ left: '50%', top: '50%', transform: `rotate(${j * 30}deg) translateY(-100%)`, transformOrigin: '50% 100%' }} />
            ))}
          </motion.div>
        ))}
        
        {/* Birthday cake with candles */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-24 sm:w-40 sm:h-28">
          {/* Cake layers */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-8 sm:w-36 sm:h-10 bg-pink-300/40 border-2 border-pink-200/60 rounded-md" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-8 sm:w-30 sm:h-10 bg-pink-400/40 border-2 border-pink-200/60 rounded-md" />
          
          {/* Candles */}
          {candles.map((candle) => (
            <div key={candle.id} className="absolute bottom-14 sm:bottom-16" style={{ left: `${candle.left}%` }}>
              <div className="w-1 h-4 sm:h-5 bg-pink-100/60 mx-auto" />
              <motion.div className="text-xs sm:text-sm" animate={{ scale: [0.8, 1.2, 0.8], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: candle.delay }}>🔥</motion.div>
            </div>
          ))}
        </div>
        
        {/* Confetti raining down */}
        {confetti.map((piece) => (
          <motion.div key={piece.id} className="absolute w-2 h-3 sm:w-3 sm:h-4 opacity-0" style={{ left: `${piece.left}%`, top: '-5%', background: piece.color, rotate: piece.rotation }} animate={{ y: [0, 300], opacity: [0, 1, 1, 0.8, 0], rotate: [piece.rotation, piece.rotation + 720] }} transition={{ duration: 3 + (piece.id % 3) * 0.5, repeat: Infinity, delay: piece.delay, ease: 'easeIn' }} />
        ))}
        
        {/* Firework explosions */}
        {[0, 1, 2].map((i) => (
          <motion.div key={`firework-${i}`} className="absolute" style={{ left: `${25 + i * 25}%`, top: `${20 + i * 10}%` }} animate={{ scale: [0, 2, 2.5], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}>
            {Array.from({ length: 8 }).map((_, j) => (
              <motion.div key={j} className="absolute w-0.5 h-8 sm:h-12 bg-yellow-300" style={{ left: '50%', top: '50%', transform: `rotate(${j * 45}deg)`, transformOrigin: '50% 0' }} animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 0.8, delay: i * 0.8 + 0.5 }} />
            ))}
          </motion.div>
        ))}
        
        {/* Balloon strings floating */}
        {[0, 1, 2].map((i) => (
          <motion.div key={`balloon-${i}`} className="absolute" style={{ left: `${15 + i * 35}%`, bottom: '30%' }} animate={{ y: [0, -20, 0], x: [(i % 2 ? -5 : 5), (i % 2 ? 5 : -5)] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}>
            <div className="text-2xl sm:text-3xl">🎈</div>
            <div className="w-px h-12 sm:h-16 bg-pink-300/50 mx-auto" />
          </motion.div>
        ))}
        
        {/* Cake emoji */}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-5xl sm:text-6xl opacity-20" animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>🎂</motion.div>
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Vault Keeper (A046) - Vault Starter Door — also handles Folder Keeper (renamed A046 v2.8.0)
  if (titleName === 'Vault Keeper' || titleName === 'Folder Keeper') {
    const dataParticles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: (i * 13) % 100,
      top: (i * 19) % 80,
      symbol: i % 4 === 0 ? '🔒' : i % 4 === 1 ? '🔐' : i % 4 === 2 ? '01' : '10'
    })), []);
    
    const vaultBolts = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: i * 30
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🔐 Vault Keeper - Deep steel blue vault door with security mechanisms */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)' }} />
        
        {/* Vault door circular seal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 rounded-full opacity-30"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-blue-200/60" />
          <div className="absolute inset-2 rounded-full border-2 border-blue-300/50" />
          <div className="absolute inset-4 rounded-full border-3 border-blue-200/60" />
          {vaultBolts.map((bolt) => (
            <div
              key={bolt.id}
              className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-blue-100/70 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${bolt.angle}deg) translateY(-60px)`,
                boxShadow: '0 0 8px rgba(191, 219, 254, 0.5)'
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-200/50 border-2 border-blue-100/70" />
        </motion.div>
        
        {/* Counter-rotating inner mechanism */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-blue-300/40 opacity-25"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 90, 180, 270].map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-0.5 h-8 sm:h-10 bg-blue-200/60"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center'
              }}
            />
          ))}
        </motion.div>
        
        {/* Security scan beam */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent)', width: '25%', filter: 'blur(8px)' }}
          animate={{ x: ['-25%', '125%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        />
        
        {/* Binary data stream */}
        {dataParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-xs opacity-70"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              color: '#BFDBFE',
              fontFamily: 'monospace',
              textShadow: '0 0 6px rgba(191, 219, 254, 0.7)',
              fontSize: typeof p.symbol === 'string' && p.symbol.length > 1 ? '10px' : '16px'
            }}
            animate={{ y: [0, -60], opacity: [0, 0.8, 0], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 4 + (p.id % 3), repeat: Infinity, delay: p.id * 0.2, ease: 'easeOut' }}
          >
            {p.symbol}
          </motion.div>
        ))}
        
        {/* Lock sparkles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`lock-${i}`}
            className="absolute text-base sm:text-lg"
            style={{ left: `${30 + i * 20}%`, top: `${35 + i * 15}%` }}
            animate={{ scale: [0, 1.2, 0], opacity: [0, 0.9, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1.2 }}
          >
            🔒
          </motion.div>
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Format Master (A034) - Multimedia Virtuoso Mosaic
  if (titleName === 'Format Master') {
    const fireParticles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, left: 10 + (i * 10) % 40, delay: i * 0.3 })), []);
    const waterDrops = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, left: 60 + (i * 8) % 30, delay: i * 0.4 })), []);
    const airClouds = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ id: i, left: 10 + (i * 12) % 40, delay: i * 0.5 })), []);
    const earthRocks = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ id: i, left: 60 + (i * 10) % 30, delay: i * 0.6 })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute top-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #7F1D1D 100%)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #164E63 100%)' }} />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)' }} />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ background: 'linear-gradient(135deg, #78350F 0%, #92400E 50%, #451A03 100%)' }} />
        
        {/* Fire quadrant */}
        {fireParticles.map((p) => (<motion.div key={`fire-${p.id}`} className="absolute w-2 h-3 rounded-full" style={{ left: `${p.left}%`, top: '40%', background: 'linear-gradient(to top, rgba(239, 68, 68, 0.8), rgba(251, 191, 36, 0.6))', boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)' }} animate={{ y: [0, -80], opacity: [0.8, 0], scaleY: [1, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: p.delay, ease: 'easeOut' }} />))}
        
        {/* Water quadrant */}
        {waterDrops.map((d) => (<motion.div key={`water-${d.id}`} className="absolute w-2 h-3 rounded-full" style={{ left: `${d.left}%`, top: '10%', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.9), rgba(14, 116, 144, 0.7))', boxShadow: '0 0 6px rgba(56, 189, 248, 0.8)' }} animate={{ y: [0, 80], scaleY: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: d.delay, ease: 'easeIn' }} />))}
        
        {/* Air quadrant */}
        {airClouds.map((c) => (<motion.div key={`air-${c.id}`} className="absolute w-8 h-4 sm:w-10 sm:h-5 rounded-full opacity-60" style={{ left: `${c.left}%`, bottom: '30%', background: 'radial-gradient(ellipse, rgba(186, 230, 253, 0.8), rgba(125, 211, 252, 0.4))' }} animate={{ x: [0, 40, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 5, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }} />))}
        
        {/* Earth quadrant */}
        {earthRocks.map((r) => (<motion.div key={`earth-${r.id}`} className="absolute w-3 h-3 opacity-60" style={{ left: `${r.left}%`, bottom: '20%', background: 'linear-gradient(135deg, rgba(146, 64, 14, 0.8), rgba(69, 26, 3, 0.9))', borderRadius: '30%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }} animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, delay: r.delay, ease: 'easeInOut' }} />))}
        
        {/* Quadrant dividers */}
        <motion.div className="absolute top-0 bottom-0 left-1/2 w-1 -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))' }} animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2" style={{ background: 'linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))' }} animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        
        {/* Unity symbol forming at center */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)', border: '3px solid rgba(255, 255, 255, 0.6)', boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)' }} animate={{ scale: [0.9, 1.1, 0.9], rotate: 360 }} transition={{ scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}><div className="absolute inset-2 border-2 border-white/40 rounded-full" /><div className="absolute inset-4 border border-white/30 rounded-full" /></motion.div>
        
        {/* Elemental symbols */}
        <motion.div className="absolute top-1/4 left-1/4 text-4xl sm:text-5xl opacity-40" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🔥</motion.div>
        <motion.div className="absolute top-1/4 right-1/4 text-4xl sm:text-5xl opacity-40" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>💧</motion.div>
        <motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-40" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>💨</motion.div>
        <motion.div className="absolute bottom-1/4 right-1/4 text-4xl sm:text-5xl opacity-40" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>🪨</motion.div>
        
        {/* Target emoji */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl opacity-70" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>🎯</motion.div>
        
        {/* Merging particles */}
        {[0, 1, 2, 3].map((i) => (<motion.div key={`merge-${i}`} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full" style={{ background: ['#EF4444', '#0EA5E9', '#7DD3FC', '#92400E'][i], boxShadow: `0 0 8px ${['#EF4444', '#0EA5E9', '#7DD3FC', '#92400E'][i]}` }} animate={{ x: [0, 30 * Math.cos(i * Math.PI / 2), 0], y: [0, 30 * Math.sin(i * Math.PI / 2), 0], opacity: [0.7, 0, 0.7] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }} />))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Memory Novelist (A029) - Word Painter Ink
  if (titleName === 'Memory Novelist') {
    const pages = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 20 + (i * 10) % 60,
      top: 20 + (i % 4) * 15,
      delay: i * 0.6,
      rotation: -15 + i * 5
    })), []);
    
    const inkDrops = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: (i * 13) % 100,
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
        {/* 📕 Memory Novelist - Leather book */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3E1F0B 0%, #5C2E0F 30%, #7C3810 60%, #A0522D 100%)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 4px, rgba(0,0,0,0.1) 6px)' }} />
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-40 sm:w-40 sm:h-48 opacity-40" style={{ background: 'linear-gradient(to right, rgba(139, 69, 19, 0.8) 0%, rgba(160, 82, 45, 0.6) 48%, rgba(51, 25, 0, 0.9) 50%, rgba(160, 82, 45, 0.6) 52%, rgba(139, 69, 19, 0.8) 100%)', border: '3px solid rgba(101, 67, 33, 0.6)', borderRadius: '4px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)' }} animate={{ scaleX: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/40" /><div className="absolute top-2 left-2 right-1/2 h-px bg-amber-100/20" /><div className="absolute top-4 left-2 right-1/2 h-px bg-amber-100/20" /></motion.div>
        {pages.map((page) => (<motion.div key={page.id} className="absolute w-12 h-16 sm:w-14 sm:h-18 bg-gradient-to-br from-amber-50/80 to-amber-100/60" style={{ left: `${page.left}%`, top: `${page.top}%`, border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: '2px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }} animate={{ y: [0, -40, 0], rotate: [page.rotation, page.rotation + 20, page.rotation], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 5, repeat: Infinity, delay: page.delay, ease: 'easeInOut' }}><div className="absolute top-2 left-1 right-1 h-px bg-slate-800/20" /><div className="absolute top-4 left-1 right-1 h-px bg-slate-800/20" /><div className="absolute top-6 left-1 right-1 h-px bg-slate-800/20" /></motion.div>))}
        <svg className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-12 sm:w-32 sm:h-16 opacity-60"><motion.path d="M 5,20 Q 30,10 60,20 T 120,20" stroke="rgba(0, 0, 0, 0.6)" strokeWidth="2" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} /></svg>
        {inkDrops.map((drop) => (<motion.div key={drop.id} className="absolute w-1 h-2 rounded-full" style={{ left: `${drop.left}%`, top: '15%', background: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }} animate={{ y: [0, 100], opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: drop.delay, ease: 'easeIn' }} />))}
        {[0, 1, 2, 3, 4].map((i) => (<motion.div key={`chapter-${i}`} className="absolute text-xs sm:text-sm font-serif text-amber-200/40" style={{ left: `${15 + i * 18}%`, top: `${70 + (i % 2) * 5}%` }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>Ch.{i + 1}</motion.div>))}
        <motion.div className="absolute top-1/4 left-1/2 w-2 h-24 sm:h-32 opacity-50" style={{ background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.6))', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)', transform: 'translateX(8px)' }} animate={{ scaleY: [0.95, 1.05, 0.95] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute bottom-0 left-0 right-0 h-3" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} /></motion.div>
        {['📸', '🌄', '🎭', '💭'].map((icon, i) => (<motion.div key={`scene-${i}`} className="absolute text-2xl sm:text-3xl opacity-25" style={{ left: `${25 + i * 20}%`, top: `${30 + (i % 2) * 20}%` }} animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}>{icon}</motion.div>))}
        <motion.div className="absolute top-1/3 right-1/4 text-6xl sm:text-7xl opacity-25" animate={{ rotateY: [0, 20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>📕</motion.div>
        <motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-30" animate={{ rotate: [0, -10, 0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>🪶</motion.div>
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Media Maven (A023) - Frequency Keeper Waves
  if (titleName === 'Media Maven') {
    const spotlights = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
      id: i,
      startAngle: i * 90,
      delay: i * 0.5
    })), []);
    
    const mediaIcons = useMemo(() => ['🎬', '🎥', '🎞️', '📸', '🎨', '🖼️'], []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🎨 Media Maven - Hollywood studio */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7C2D12 0%, #DC2626 40%, #F59E0B 100%)' }} />
        <div className="absolute bottom-16 left-0 right-0 h-20 sm:h-24 bg-gradient-to-r from-red-900/40 via-red-700/60 to-red-900/40 border-t-2 border-red-600/40" />
        <div className="absolute bottom-16 left-1/4 right-1/4 h-px bg-yellow-500/60" />
        {spotlights.map((spot) => (
          <motion.div key={spot.id} className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-full origin-top opacity-30" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.3) 0%, transparent 60%)', filter: 'blur(8px)' }} animate={{ rotate: [spot.startAngle, spot.startAngle + 60, spot.startAngle] }} transition={{ duration: 8, repeat: Infinity, delay: spot.delay, ease: 'easeInOut' }} />
        ))}
        <div className="absolute bottom-32 sm:bottom-36 left-1/2 -translate-x-1/2 opacity-20"><div className="relative w-12 h-16 sm:w-16 sm:h-20"><div className="absolute top-0 left-0 right-0 h-8 sm:h-10 border-2 border-yellow-600/60 bg-yellow-900/40" /><div className="absolute bottom-4 left-0 right-0 h-6 sm:h-8 border-2 border-yellow-600/60 bg-yellow-900/40" /><div className="absolute bottom-0 left-2 w-px h-4 bg-yellow-700/60" /><div className="absolute bottom-0 right-2 w-px h-4 bg-yellow-700/60" /></div></div>
        {mediaIcons.map((icon, i) => (
          <motion.div key={`icon-${i}`} className="absolute text-2xl sm:text-3xl opacity-40" style={{ left: `${15 + i * 14}%`, top: `${25 + (i % 3) * 20}%` }} animate={{ y: [0, -15, 0], rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}>{icon}</motion.div>
        ))}
        <motion.div className="absolute top-1/4 left-1/4" animate={{ rotate: [0, -15, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}><div className="relative w-16 h-12 sm:w-20 sm:h-16 opacity-30"><motion.div className="absolute top-0 left-0 right-0 h-4 sm:h-5 bg-yellow-600/60 border-2 border-yellow-400/50" style={{ transformOrigin: 'bottom left' }} animate={{ rotate: [0, -15, 0] }} transition={{ duration: 0.3, times: [0, 0.3, 0.6], repeat: Infinity, repeatDelay: 2.1 }}><div className="absolute inset-0 bg-gradient-to-r from-yellow-900/40 via-yellow-100/20 to-yellow-900/40" style={{ backgroundSize: '20% 100%' }} /></motion.div><div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gray-800/60 border-2 border-gray-600/50" /></div></motion.div>
        {[0, 1, 2].map((i) => (
          <motion.div key={`beam-${i}`} className="absolute w-20 h-20 sm:w-24 sm:h-24 opacity-20" style={{ left: `${20 + i * 30}%`, top: '10%' }} animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}><div className="absolute inset-0 rounded-full bg-yellow-300 blur-xl" /></motion.div>
        ))}
        <motion.div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-20 sm:h-20 opacity-15" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}><div className="absolute inset-0 rounded-full border-4 border-gray-400/60" />{Array.from({ length: 8 }).map((_, i) => (<div key={i} className="absolute w-2 h-2 bg-gray-300/60 rounded-full" style={{ left: '50%', top: '50%', transform: `rotate(${i * 45}deg) translateY(-24px) translateX(-4px)` }} />))}</motion.div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={`star-${i}`} className="absolute text-yellow-400/30 text-xl sm:text-2xl" style={{ left: `${25 + i * 20}%`, top: `${60 + (i % 2) * 10}%` }} animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>⭐</motion.div>
        ))}
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Decade Dreamer (A018) - Quantum Scheduler Purple
  if (titleName === 'Decade Dreamer') {
    const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      startX: 5 + (i * 8) % 90,
      startY: 30 + (i % 4) * 15
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)' }} />
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 1px, transparent 1px)', backgroundSize: '25px 25px' }}
          animate={{ backgroundPosition: ['0px 0px', '25px 25px'], opacity: [0.3, 0.6, 0.3] }}
          transition={{ backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' }, opacity: { duration: 2, repeat: Infinity } }}
        />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(196, 181, 253, 0.9), rgba(167, 139, 250, 0.6))',
              boxShadow: '0 0 12px rgba(167, 139, 250, 0.8)',
              left: `${p.startX}%`,
              top: `${p.startY}%`,
            }}
            animate={{ x: [0, 50, 100], opacity: [0, 1, 0.3, 1, 0], scale: [0.5, 1, 0.8, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: p.id * 0.4, ease: 'easeInOut' }}
          />
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Social Memory Keeper (A033) - Community Weaver Network
  if (titleName === 'Social Memory Keeper') {
    const profiles = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, angle: i * 45, size: 12 + (i % 3) * 4, delay: i * 0.4 })), []);
    const connections = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, from: i % 8, to: (i + 2) % 8, delay: i * 0.3 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #DB2777 0%, #EC4899 40%, #F472B6 80%, #FBCFE8 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(251, 207, 232, 0.3) 2px, transparent 2px)', backgroundSize: '30px 30px' }} />{profiles.map((profile) => (<motion.div key={profile.id} className="absolute top-1/2 left-1/2" style={{ transformOrigin: 'center' }}><div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8), rgba(219, 39, 119, 0.6))', border: '2px solid rgba(251, 207, 232, 0.8)', boxShadow: '0 0 15px rgba(236, 72, 153, 0.8)', transform: `translateX(${16}vw) translateY(-50%)` }} /><motion.div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-pink-300/40" style={{ transform: `translateX(${16}vw) translateY(-50%) translate(-25%, -25%)` }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: profile.delay }} /></motion.div>))}{connections.map((conn) => {const fromAngle = profiles[conn.from].angle; return (<motion.div key={conn.id} className="absolute top-1/2 left-1/2 origin-left h-px" style={{ width: '16vw', background: 'linear-gradient(to right, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.3))', transform: `rotate(${fromAngle}deg)`, transformOrigin: 'left center' }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: conn.delay, ease: 'easeInOut' }} />);})}{[0, 1, 2, 3, 4].map((i) => (<motion.div key={`network-pulse-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-pink-400/30" animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }} />))}{['💬', '❤️', '🤝', '👥', '💝'].map((emoji, i) => (<motion.div key={`emoji-${i}`} className="absolute text-3xl sm:text-4xl opacity-30" style={{ left: `${20 + i * 15}%`, top: `${25 + (i % 2) * 30}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`heart-reaction-${i}`} className="absolute text-xl sm:text-2xl" style={{ left: `${25 + i * 12}%`, bottom: '20%' }} animate={{ y: [0, -80], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}>❤️</motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-30 rounded-full" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)', border: '3px solid rgba(236, 72, 153, 0.4)', boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl">👥</div></motion.div><motion.div className="absolute top-1/4 right-1/4 text-5xl sm:text-6xl opacity-40" animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>📱</motion.div><motion.div className="absolute bottom-1/4 left-1/4 text-5xl sm:text-6xl opacity-40" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>💌</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Dedicated Keeper') {
    const heartbeats = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, delay: i * 0.5, size: 1 + (i % 3) * 0.3 })), []);
    const calendarPages = useMemo(() => Array.from({ length: 6 }, (_, i) => ({ id: i, left: 15 + i * 14, top: 20 + (i % 2) * 25, rotation: -10 + i * 5 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #991B1B 0%, #DC2626 40%, #EF4444 80%, #FCA5A5 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(252, 165, 165, 0.2) 0px, transparent 10px, transparent 20px, rgba(252, 165, 165, 0.2) 30px)' }} />{calendarPages.map((page) => (<motion.div key={page.id} className="absolute w-16 h-20 sm:w-20 sm:h-24 opacity-50 rounded-sm" style={{ left: `${page.left}%`, top: `${page.top}%`, background: 'linear-gradient(to bottom, rgba(254, 202, 202, 0.9), rgba(252, 165, 165, 0.7))', border: '2px solid rgba(220, 38, 38, 0.4)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }} animate={{ rotate: [page.rotation, page.rotation + 10, page.rotation], y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, delay: page.id * 0.6, ease: 'easeInOut' }}><div className="absolute top-0 left-0 right-0 h-4 sm:h-5 bg-red-600/30" /><div className="absolute top-6 sm:top-7 left-2 right-2 h-px bg-red-400/40" /><div className="absolute top-9 sm:top-11 left-2 right-2 h-px bg-red-400/40" /><div className="absolute top-12 sm:top-15 left-2 right-2 h-px bg-red-400/40" /></motion.div>))}{[0, 1, 2, 3].map((i) => (<motion.div key={`streak-${i}`} className="absolute w-20 h-2 sm:w-24 sm:h-3 rounded-full opacity-40" style={{ left: `${25 + i * 16}%`, top: `${60 + (i % 2) * 10}%`, background: 'linear-gradient(to right, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.5))' }} animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }} />))}{heartbeats.map((hb) => (<motion.div key={hb.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-300/30" style={{ width: `${8 + hb.size * 4}rem`, height: `${8 + hb.size * 4}rem` }} animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: hb.delay, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 opacity-50 rounded-full" style={{ background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6), transparent)', boxShadow: '0 0 50px rgba(239, 68, 68, 0.7)' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>❤️</motion.div></motion.div>{['📅', '✅', '⭐', '🔥'].map((emoji, i) => (<motion.div key={`icon-${i}`} className="absolute text-4xl sm:text-5xl opacity-30" style={{ left: `${20 + i * 20}%`, bottom: `${25 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}>{emoji}</motion.div>))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`day-${i}`} className="absolute text-sm sm:text-base font-bold text-red-200/50" style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 15}%` }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}>100</motion.div>))}<motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-40" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>⏰</motion.div><motion.div className="absolute bottom-1/4 left-1/4 text-5xl sm:text-6xl opacity-40" animate={{ y: [0, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>🎯</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Vault Guardian' || titleName === 'Folder Architect') {
    const vaultDoors = useMemo(() => Array.from({ length: 3 }, (_, i) => ({ id: i, top: 20 + i * 25, delay: i * 0.8 })), []);
    const securityBeams = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ id: i, top: 15 + i * 15 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 30%, #2563EB 60%, #60A5FA 100%)' }} /><div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(96, 165, 250, 0.3) 0px, transparent 2px, transparent 8px), repeating-linear-gradient(90deg, rgba(96, 165, 250, 0.3) 0px, transparent 2px, transparent 8px)' }} /><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 sm:w-40 sm:h-48 opacity-60 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(30, 58, 138, 0.7))', border: '4px solid rgba(96, 165, 250, 0.6)', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(37, 99, 235, 0.4)' }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full" style={{ background: 'radial-gradient(circle, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.6))', border: '3px solid rgba(96, 165, 250, 0.8)' }}><motion.div className="absolute inset-2 rounded-full border-2 border-blue-300/60" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}><div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-200/70 origin-center" /><div className="absolute top-0 left-1/2 h-full w-0.5 bg-blue-200/70 origin-center" /></motion.div></div><div className="absolute inset-4 border-2 border-blue-400/30 rounded-md" /><div className="absolute top-4 left-4 right-4 h-px bg-blue-300/40" /><div className="absolute bottom-4 left-4 right-4 h-px bg-blue-300/40" /></motion.div>{securityBeams.map((beam) => (<motion.div key={beam.id} className="absolute left-0 right-0 h-px" style={{ top: `${beam.top}%`, background: 'linear-gradient(to right, transparent, rgba(96, 165, 250, 0.8), transparent)' }} animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: beam.id * 0.4, ease: 'easeInOut' }} />))}{vaultDoors.map((door) => (<motion.div key={door.id} className="absolute w-10 h-14 sm:w-12 sm:h-16 opacity-40 rounded-sm" style={{ left: `${20 + door.id * 30}%`, top: `${door.top}%`, background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7), rgba(30, 58, 138, 0.5))', border: '2px solid rgba(96, 165, 250, 0.5)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }} animate={{ opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: door.delay, ease: 'easeInOut' }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-300/60" /></motion.div>))}{[0, 1, 2, 3, 4, 5, 6].map((i) => (<motion.div key={`shield-particle-${i}`} className="absolute w-2 h-2 rounded-full bg-blue-300" style={{ left: `${25 + i * 10}%`, top: `${25 + (i % 3) * 20}%`, boxShadow: '0 0 8px rgba(96, 165, 250, 0.9)' }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }} />))}{['🔒', '🛡️', '🔐', '⚡'].map((emoji, i) => (<motion.div key={`security-${i}`} className="absolute text-3xl sm:text-4xl opacity-30" style={{ left: `${20 + i * 20}%`, bottom: `${20 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-40" animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🔑</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-40" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>💎</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`lock-ring-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400/20" style={{ width: `${12 + i * 6}rem`, height: `${12 + i * 6}rem` }} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Echo Master') {
    const waveRings = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, delay: i * 0.3, maxRadius: 20 + (i % 3) * 8 })), []);
    const echoIcons = useMemo(() => ['📡', '🌊', '💫', '✨', '📢'], []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0E7490 0%, #0891B2 30%, #06B6D4 70%, #67E8F9 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(103, 232, 249, 0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />{waveRings.map((ring) => (<motion.div key={ring.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: 'rgba(103, 232, 249, 0.6)' }} animate={{ width: [0, `${ring.maxRadius}rem`], height: [0, `${ring.maxRadius}rem`], opacity: [0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: ring.delay, ease: 'easeOut' }} />))}{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {const angle = (i * 45); return (<motion.div key={`echo-wave-${i}`} className="absolute top-1/2 left-1/2 w-12 h-1 sm:w-16 sm:h-1 opacity-50 origin-left rounded-full" style={{ background: 'linear-gradient(to right, rgba(6, 182, 212, 0.8), transparent)', transform: `rotate(${angle}deg)` }} animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }} />);})}{[0, 1, 2, 3, 4].map((i) => (<motion.div key={`ripple-${i}`} className="absolute w-1 h-20 sm:h-24 opacity-30 rounded-full" style={{ left: `${20 + i * 15}%`, top: '20%', background: 'linear-gradient(to bottom, rgba(103, 232, 249, 0.6), transparent)' }} animate={{ scaleY: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }} />))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 opacity-50 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6), transparent)', border: '3px solid rgba(103, 232, 249, 0.5)', boxShadow: '0 0 50px rgba(6, 182, 212, 0.8)' }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>📡</motion.div></motion.div>{echoIcons.map((icon, i) => (<motion.div key={`icon-${i}`} className="absolute text-4xl sm:text-5xl opacity-30" style={{ left: `${20 + i * 16}%`, top: `${30 + (i % 2) * 30}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}>{icon}</motion.div>))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`sonar-${i}`} className="absolute w-2 h-2 rounded-full bg-cyan-300" style={{ left: `${25 + i * 10}%`, top: `${35 + (i % 3) * 15}%`, boxShadow: '0 0 10px rgba(103, 232, 249, 0.9)' }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-40" animate={{ rotate: [0, 20, 0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>🌊</motion.div><motion.div className="absolute bottom-1/4 left-1/4 text-5xl sm:text-6xl opacity-40" animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💧</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Grand Broadcaster') {
    const antennas = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ id: i, left: 20 + i * 15, height: 60 + (i % 2) * 20, delay: i * 0.5 })), []);
    const signals = useMemo(() => Array.from({ length: 16 }, (_, i) => ({ id: i, angle: i * 22.5, delay: i * 0.2 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #5B21B6 0%, #6D28D9 30%, #7C3AED 60%, #A78BFA 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(167, 139, 250, 0.2) 0px, transparent 2px, transparent 15px), repeating-linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0px, transparent 2px, transparent 15px)' }} />{antennas.map((antenna) => (<motion.div key={antenna.id} className="absolute bottom-0 w-2 sm:w-3 opacity-50" style={{ left: `${antenna.left}%`, height: `${antenna.height}%`, background: 'linear-gradient(to top, rgba(124, 58, 237, 0.8), rgba(167, 139, 250, 0.5))', borderRadius: '2px 2px 0 0' }} animate={{ height: [`${antenna.height - 10}%`, `${antenna.height}%`, `${antenna.height - 10}%`] }} transition={{ duration: 3, repeat: Infinity, delay: antenna.delay, ease: 'easeInOut' }}><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-80" style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.9), rgba(124, 58, 237, 0.7))', borderRadius: '50%', boxShadow: '0 0 15px rgba(124, 58, 237, 0.9)' }} /></motion.div>))}{signals.map((signal) => (<motion.div key={signal.id} className="absolute top-1/2 left-1/2 origin-left w-16 h-0.5 sm:w-20 sm:h-1 rounded-full opacity-40" style={{ background: 'linear-gradient(to right, rgba(124, 58, 237, 0.8), transparent)', transform: `rotate(${signal.angle}deg)` }} animate={{ scaleX: [0, 1, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: signal.delay, ease: 'easeOut' }} />))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`broadcast-ring-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400/30" style={{ width: `${8 + i * 4}rem`, height: `${8 + i * 4}rem` }} animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 opacity-50 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.6), transparent)', border: '4px solid rgba(167, 139, 250, 0.5)', boxShadow: '0 0 60px rgba(124, 58, 237, 0.8)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>📢</motion.div></motion.div>{['📻', '📡', '🔊', '📱', '💜'].map((emoji, i) => (<motion.div key={`broadcast-icon-${i}`} className="absolute text-4xl sm:text-5xl opacity-30" style={{ left: `${15 + i * 18}%`, top: `${25 + (i % 2) * 30}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`signal-particle-${i}`} className="absolute w-2 h-2 rounded-full bg-purple-300" style={{ left: `${20 + i * 10}%`, top: `${30 + (i % 3) * 15}%`, boxShadow: '0 0 8px rgba(167, 139, 250, 0.9)' }} animate={{ opacity: [0, 0.8, 0], y: [0, -60, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/4 right-1/5 text-6xl sm:text-7xl opacity-40" animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>📻</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-40" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>🎙️</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  // Dawn Keeper (A044) - Echo Artisan Water Ripples
  if (titleName === 'Dawn Keeper') {
    const dewdrops = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: 10 + (i * 4.5) % 80,
      top: 30 + (i % 5) * 12,
      delay: i * 0.2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        {/* 🌄 Dawn Keeper - Rooster on fence at sunrise with morning dew */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #7C2D12 0%, #F59E0B 40%, #FCD34D 80%, #FEF3C7 100%)', 'linear-gradient(135deg, #92400E 0%, #D97706 40%, #FBBF24 80%, #FDE68A 100%)', 'linear-gradient(135deg, #7C2D12 0%, #F59E0B 40%, #FCD34D 80%, #FEF3C7 100%)'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Sunrise bloom effect */}
        <motion.div className="absolute top-0 right-1/4 w-40 h-40 sm:w-56 sm:h-56 opacity-40" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, transparent 70%)' }} animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Early morning fog */}
        <motion.div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 255, 255, 0.15) 40px, rgba(255, 255, 255, 0.15) 80px)' }} animate={{ y: [0, 20, 0], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        
        {/* Fence post */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-30">
          {[0, 1, 2].map((i) => (
            <div key={i} className="absolute w-1.5 h-24 sm:w-2 sm:h-32 bg-amber-900/60" style={{ left: `${i * 20 - 20}px`, bottom: 0 }} />
          ))}
          <div className="absolute left-1/2 -translate-x-1/2 w-16 h-1.5 sm:w-20 sm:h-2 bg-amber-900/60" style={{ bottom: '50%' }} />
        </div>
        
        {/* Rooster on fence */}
        <motion.div className="absolute bottom-32 sm:bottom-40 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl" animate={{ rotate: [-3, 3, -3], y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🐓</motion.div>
        
        {/* Morning dew sparkling */}
        {dewdrops.map((drop) => (
          <motion.div key={drop.id} className="absolute w-1 h-1 rounded-full bg-cyan-200" style={{ left: `${drop.left}%`, top: `${drop.top}%`, boxShadow: '0 0 6px rgba(165, 243, 252, 0.9)' }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: drop.delay }} />
        ))}
        
        {/* Morning mist particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={`mist-${i}`} className="absolute w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/10 blur-md" style={{ left: `${(i * 7) % 100}%`, top: `${40 + (i % 4) * 15}%` }} animate={{ x: [0, 30, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 8 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }} />
        ))}
        
        {/* Dewdrop sparkles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div key={`sparkle-${i}`} className="absolute text-cyan-300/60 text-xs sm:text-sm" style={{ left: `${20 + i * 15}%`, top: `${50 + (i % 3) * 10}%` }} animate={{ opacity: [0, 0.8, 0], rotate: [0, 180, 360] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}>✨</motion.div>
        ))}
        
        {/* Sun rising */}
        <motion.div className="absolute text-5xl sm:text-6xl opacity-25" style={{ right: '20%', top: '15%' }} animate={{ y: [5, -5, 5], scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🌅</motion.div>
        
        {/* Grass blades silhouette */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`grass-${i}`} className="absolute bottom-16 w-px h-8 sm:h-12 bg-green-900/20" style={{ left: `${5 + i * 4.5}%` }} />
        ))}
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Silver Archivist (A013) - Era Enthusiast Space Observatory
  if (titleName === 'Silver Archivist') {
    const capsules = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
      id: i,
      shelfRow: i % 3,
      position: i % 4,
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
        {/* 🥈 Silver Archivist - Art deco library with enhanced brightness */}
        <motion.div className="absolute inset-0" animate={{ background: ['linear-gradient(135deg, #64748B 0%, #94A3B8 40%, #CBD5E1 80%, #E2E8F0 100%)', 'linear-gradient(135deg, #475569 0%, #71717A 40%, #D4D4D8 80%, #F1F5F9 100%)', 'linear-gradient(135deg, #64748B 0%, #94A3B8 40%, #CBD5E1 80%, #E2E8F0 100%)'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.2) 20px, rgba(255, 255, 255, 0.2) 40px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.2) 20px, rgba(255, 255, 255, 0.2) 40px)' }} />
        {[0, 1, 2].map((row) => (<div key={`shelf-${row}`} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-zinc-200/80 to-transparent" style={{ top: `${30 + row * 20}%`, boxShadow: '0 2px 12px rgba(203, 213, 225, 0.6)' }} />))}
        {[0, 1, 2, 3].map((i) => (<div key={`pillar-${i}`} className="absolute top-0 bottom-16 w-1 opacity-35" style={{ left: `${20 + i * 20}%`, background: 'linear-gradient(to bottom, rgba(226, 232, 240, 0.5), rgba(148, 163, 184, 0.7), rgba(226, 232, 240, 0.5))' }} />))}
        {capsules.map((cap) => (<motion.div key={cap.id} className="absolute w-3 h-8 sm:w-4 sm:h-10" style={{ left: `${20 + cap.position * 18}%`, top: `${28 + cap.shelfRow * 20}%`, background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.95), rgba(59, 130, 246, 0.75))', borderRadius: '4px', boxShadow: '0 0 16px rgba(59, 130, 246, 1), inset 0 2px 10px rgba(255, 255, 255, 0.5)', border: '1px solid rgba(191, 219, 254, 0.6)' }} animate={{ opacity: [0.7, 1, 0.7], boxShadow: ['0 0 16px rgba(59, 130, 246, 0.8)', '0 0 24px rgba(59, 130, 246, 1)', '0 0 16px rgba(59, 130, 246, 0.8)'] }} transition={{ duration: 3, repeat: Infinity, delay: cap.delay, ease: 'easeInOut' }} />))}
        <motion.div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%, transparent 100%)', width: '60%' }} animate={{ x: ['-60%', '160%'] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} />
        {[0, 1, 2].map((i) => (<motion.div key={`shine-${i}`} className="absolute w-1 h-full opacity-45" style={{ left: `${30 + i * 20}%`, background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7), transparent)' }} animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />))}
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-32 sm:h-32 opacity-30" style={{ background: 'radial-gradient(circle, rgba(241, 245, 249, 0.5), transparent 70%)', border: '2px solid rgba(226, 232, 240, 0.4)', borderRadius: '50%' }} animate={{ rotate: 360, scale: [1, 1.05, 1] }} transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}><div className="absolute inset-2 border-2 border-slate-300/30 rounded-full" /><div className="absolute inset-4 border border-slate-200/25 rounded-full" /></motion.div>
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl opacity-35" animate={{ rotateY: [0, 360], scale: [1, 1.05, 1] }} transition={{ rotateY: { duration: 10, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}>🥈</motion.div>
        {[0, 1, 2, 3, 4].map((i) => (<motion.div key={`geo-${i}`} className="absolute border border-slate-200/45" style={{ left: `${15 + i * 18}%`, top: `${60 + (i % 3) * 10}%`, width: `${10 + (i % 3) * 5}px`, height: `${10 + (i % 3) * 5}px`, borderRadius: i % 2 ? '50%' : '0%' }} animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3], rotate: [0, 180, 360] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }} />))}
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Film Director (A030) - Story Curator Theater Stage
  if (titleName === 'Film Director') {
    const scenes = useMemo(() => ['🎬', '📸', '🎭', '🎪', '🎞️', '🎥'], []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1C1917 0%, #292524 40%, #44403C 100%)' }} />
        
        {/* Viewfinder frame */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 sm:w-64 sm:h-40 opacity-50" style={{ border: '4px solid rgba(250, 204, 21, 0.6)', borderRadius: '4px', boxShadow: '0 0 20px rgba(250, 204, 21, 0.4), inset 0 0 30px rgba(0, 0, 0, 0.6)' }} animate={{ borderColor: ['rgba(250, 204, 21, 0.5)', 'rgba(250, 204, 21, 0.8)', 'rgba(250, 204, 21, 0.5)'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-yellow-500/30" /><div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-400/40" /><div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-400/40" /><div className="absolute top-2 left-2 text-xs text-yellow-400/60 font-mono">REC</div><motion.div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} /></motion.div>
        
        {/* Cinematic scenes inside viewfinder */}
        {scenes.map((scene, i) => (<motion.div key={`scene-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl opacity-30" animate={{ opacity: i === 0 ? [0.3, 0.6, 0.3] : 0.15, scale: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}>{scene}</motion.div>))}
        
        {/* Film slate */}
        <motion.div className="absolute top-1/4 left-1/4 w-16 h-20 sm:w-20 sm:h-24 opacity-50" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(41, 37, 36, 0.8))', border: '2px solid rgba(250, 204, 21, 0.5)', borderRadius: '4px 4px 0 0', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute top-0 left-0 right-0 h-6 sm:h-8" style={{ background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.8), rgba(234, 179, 8, 0.6))', clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} /><div className="absolute top-8 sm:top-10 left-2 right-2"><div className="h-px bg-white/40 mb-2" /><div className="h-px bg-white/30 mb-2" /><div className="h-px bg-white/20" /></div></motion.div>
        
        {/* Film slate clap animation */}
        <motion.div className="absolute top-1/4 left-1/4 w-16 h-2 sm:w-20 sm:h-3 origin-bottom-left" style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(41, 37, 36, 0.8))', border: '1px solid rgba(250, 204, 21, 0.5)', transform: 'translateY(-20px) translateX(0px)' }} animate={{ rotate: [0, -25, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }} />
        
        {/* Megaphone */}
        <motion.div className="absolute bottom-1/4 right-1/4 text-5xl sm:text-6xl opacity-40" animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>📣</motion.div>
        
        {/* Megaphone waves */}
        {[0, 1, 2].map((i) => (<motion.div key={`wave-${i}`} className="absolute bottom-1/4 right-1/4 w-8 h-8 sm:w-10 sm:h-10 border-2 border-yellow-400/30 rounded-full" style={{ transform: 'translateX(30px)' }} animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} />))}
        
        {/* Oscar statue */}
        <motion.div className="absolute top-1/3 right-1/3 text-5xl sm:text-6xl opacity-30" animate={{ rotateY: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>🏆</motion.div>
        
        {/* Director's chair */}
        <motion.div className="absolute bottom-1/3 left-1/3 text-4xl sm:text-5xl opacity-30" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🪑</motion.div>
        
        {/* Film reel emoji */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl opacity-20" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>🎬</motion.div>
        
        {/* Viewfinder UI overlay indicators */}
        <motion.div className="absolute top-4 left-4 text-xs sm:text-sm font-mono text-yellow-400/50" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>24FPS</motion.div>
        <motion.div className="absolute top-4 right-4 text-xs sm:text-sm font-mono text-yellow-400/50" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>4K</motion.div>
        
        {Object.values(effects).map(effect => effect)}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Chronicle Master (A035) - Chronicler Ancient Manuscript
  if (titleName === 'Chronicle Master') {
    const ribbons = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
      id: i,
      color: ['#dc2626', '#16a34a', '#2563eb', '#ca8a04'][i],
      left: 20 + i * 20
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)' }} />
        {ribbons.map((r) => (
          <motion.div
            key={r.id}
            className="absolute top-0 w-8 h-full origin-top"
            style={{ left: `${r.left}%`, background: `linear-gradient(180deg, ${r.color}, transparent)`, opacity: 0.6 }}
            animate={{ rotateY: [0, 20, -20, 0], scaleY: [1, 1.05, 0.95, 1] }}
            transition={{ duration: 6 + r.id, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Moment Harvester (A022) - Golden Wheat Fields
  if (titleName === 'Moment Harvester') {
    const pollen = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: (i * 7) % 100,
      top: (i * 13) % 60
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(180deg, #fbbf24 0%, #f59e0b 40%, #78350f 100%)',
              'linear-gradient(180deg, #fcd34d 0%, #fbbf24 40%, #92400e 100%)',
              'linear-gradient(180deg, #fbbf24 0%, #f59e0b 40%, #78350f 100%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {pollen.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-yellow-200"
            style={{ left: `${p.left}%`, top: `${p.top}%`, boxShadow: '0 0 4px rgba(251, 191, 36, 0.6)', opacity: 0.7 }}
            animate={{ x: [0, (p.id % 2 ? 30 : -30), (p.id % 2 ? -20 : 20), 0], y: [0, -40, -80, -120], opacity: [0, 0.7, 0.5, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 6 + (p.id % 4), repeat: Infinity, delay: p.id * 0.2, ease: 'easeOut' }}
          />
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Eternal Witness (A037) - Time Gears Bronze
  if (titleName === 'Eternal Witness') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #a16207 0%, #78350f 50%, #292524 100%)' }} />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-amber-700 opacity-40"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Keeper of Eras (A038) - Crystal Vault Purple
  if (titleName === 'Keeper of Eras') {
    const crystals = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 15 + i * 15,
      top: 30 + (i % 3) * 15
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #1e1b4b 100%)' }} />
        {crystals.map((c) => (
          <motion.div
            key={c.id}
            className="absolute w-8 h-12"
            style={{ left: `${c.left}%`, top: `${c.top}%`, background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.6), rgba(124, 58, 237, 0.4))', clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }}
            animate={{ rotateY: [0, 360], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, delay: c.id * 0.5 }}
          />
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Renaissance Keeper') {
    const artFrames = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ id: i, left: 15 + i * 18, top: 25 + (i % 2) * 25, delay: i * 0.8 })), []);
    const sculptures = useMemo(() => ['🗿', '🏛️', '🎨', '🖼️'], []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 30%, #7C3AED 70%, #A855F7 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0px, transparent 10px, transparent 20px, rgba(255, 255, 255, 0.05) 30px)' }} />{[0, 1, 2, 3].map((i) => (<div key={`pillar-${i}`} className="absolute bottom-0 w-12 sm:w-16 opacity-30" style={{ left: `${20 + i * 20}%`, height: '80%', background: 'linear-gradient(to bottom, rgba(233, 213, 255, 0.6), rgba(167, 139, 250, 0.4))', borderLeft: '2px solid rgba(233, 213, 255, 0.4)', borderRight: '2px solid rgba(167, 139, 250, 0.4)' }}><div className="absolute top-0 left-0 right-0 h-8 sm:h-12" style={{ background: 'linear-gradient(to bottom, rgba(233, 213, 255, 0.8), rgba(167, 139, 250, 0.6))' }} /></div>))}{artFrames.map((frame) => (<motion.div key={frame.id} className="absolute w-20 h-24 sm:w-24 sm:h-28 opacity-50" style={{ left: `${frame.left}%`, top: `${frame.top}%`, border: '4px solid rgba(217, 170, 121, 0.6)', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(124, 58, 237, 0.2))', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)' }} animate={{ y: [0, -15, 0], rotateY: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: frame.delay, ease: 'easeInOut' }}><div className="absolute inset-2 border-2 border-purple-300/30" /><div className="absolute inset-4 bg-gradient-to-br from-purple-400/20 to-violet-500/20" /></motion.div>))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`sketch-${i}`} className="absolute w-8 h-8 sm:w-10 sm:h-10 opacity-20" style={{ left: `${25 + (i * 15) % 60}%`, top: `${15 + (i % 3) * 25}%`, border: '1px solid rgba(233, 213, 255, 0.5)', borderRadius: '2px', background: 'rgba(167, 139, 250, 0.1)' }} animate={{ opacity: [0.15, 0.3, 0.15], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}><div className="absolute inset-1" style={{ borderTop: '1px solid rgba(233, 213, 255, 0.3)', borderLeft: '1px solid rgba(233, 213, 255, 0.3)' }} /></motion.div>))}{sculptures.map((sculpture, i) => (<motion.div key={`sculpture-${i}`} className="absolute text-4xl sm:text-5xl opacity-30" style={{ left: `${25 + i * 18}%`, bottom: '20%' }} animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}>{sculpture}</motion.div>))}<motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-40" animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>👑</motion.div>{[0, 1].map((i) => (<motion.div key={`arch-${i}`} className="absolute w-24 h-32 sm:w-32 sm:h-40 opacity-20" style={{ left: `${30 + i * 40}%`, top: '10%', border: '3px solid rgba(233, 213, 255, 0.4)', borderRadius: '50% 50% 0 0', borderBottom: 'none' }} animate={{ opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }} />))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-10 rounded-full border-2 border-purple-300" animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }} />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`art-particle-${i}`} className="absolute w-2 h-2 rounded-full bg-purple-300" style={{ left: `${15 + i * 12}%`, top: `${20 + (i % 4) * 20}%`, boxShadow: '0 0 8px rgba(168, 85, 247, 0.8)' }} animate={{ opacity: [0, 1, 0], y: [0, -60, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Digital Era Master') {
    const binaryStrings = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, left: (i * 9) % 100, binary: Math.random().toString(2).substring(2, 10), delay: i * 0.3 })), []);
    const circuitNodes = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, x: 20 + (i * 60) / 7, y: 30 + (i % 3) * 20 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 30%, #2563EB 70%, #3B82F6 100%)' }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.2) 0px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0px, transparent 2px, transparent 20px)' }} />{binaryStrings.map((binary) => (<motion.div key={binary.id} className="absolute text-xs sm:text-sm font-mono text-blue-300/60" style={{ left: `${binary.left}%`, top: '-5%' }} animate={{ y: [0, 450] }} transition={{ duration: 6, repeat: Infinity, delay: binary.delay, ease: 'linear' }}>{binary.binary}</motion.div>))}{circuitNodes.map((node, i) => i < circuitNodes.length - 1 && (<motion.div key={`trace-${i}`} className="absolute h-px origin-left" style={{ left: `${node.x}%`, top: `${node.y}%`, width: `${circuitNodes[i + 1].x - node.x}%`, background: 'linear-gradient(to right, rgba(96, 165, 250, 0.6), rgba(59, 130, 246, 0.8))' }} animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.95, 1, 0.95] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }} />))}{circuitNodes.map((node) => (<motion.div key={`node-${node.id}`} className="absolute w-3 h-3 rounded-full" style={{ left: `${node.x}%`, top: `${node.y}%`, background: 'radial-gradient(circle, rgba(147, 197, 253, 0.9), rgba(59, 130, 246, 0.7))', border: '2px solid rgba(96, 165, 250, 0.8)', boxShadow: '0 0 12px rgba(59, 130, 246, 0.9)' }} animate={{ scale: [1, 1.3, 1], boxShadow: ['0 0 12px rgba(59, 130, 246, 0.7)', '0 0 20px rgba(59, 130, 246, 1)', '0 0 12px rgba(59, 130, 246, 0.7)'] }} transition={{ duration: 2, repeat: Infinity, delay: node.id * 0.25, ease: 'easeInOut' }} />))}{[0, 1, 2].map((i) => (<motion.div key={`panel-${i}`} className="absolute w-24 h-16 sm:w-32 sm:h-20 opacity-30" style={{ left: `${25 + i * 25}%`, top: `${20 + (i % 2) * 30}%`, border: '2px solid rgba(147, 197, 253, 0.5)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }} animate={{ opacity: [0.25, 0.4, 0.25], borderColor: ['rgba(147, 197, 253, 0.4)', 'rgba(147, 197, 253, 0.7)', 'rgba(147, 197, 253, 0.4)'] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}><div className="absolute inset-2 border border-blue-400/30" /><div className="absolute top-2 left-2 right-2 h-px bg-blue-300/40" /><div className="absolute top-4 left-2 right-2 h-px bg-blue-300/30" /></motion.div>))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`stream-${i}`} className="absolute w-1 h-8 sm:h-10 rounded-full" style={{ left: `${20 + i * 15}%`, top: '10%', background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.8), transparent)' }} animate={{ y: [0, 300], opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'linear' }} />))}<motion.div className="absolute top-1/3 right-1/4 text-5xl sm:text-6xl opacity-40" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>💻</motion.div><motion.div className="absolute bottom-1/3 left-1/4 text-5xl sm:text-6xl opacity-40" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🔌</motion.div>{['0', '1', '0', '1', '1', '0'].map((char, i) => (<motion.div key={`matrix-${i}`} className="absolute text-2xl sm:text-3xl font-mono text-blue-400/40" style={{ left: `${30 + i * 10}%`, top: '5%' }} animate={{ y: [0, 400], opacity: [0, 0.6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}>{char}</motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-20 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)', boxShadow: '0 0 60px rgba(59, 130, 246, 0.6)' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Library Keeper') {
    const floatingBooks = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ id: i, left: 15 + (i * 8) % 70, top: 20 + (i % 4) * 20, delay: i * 0.5, rotation: -15 + (i % 3) * 10 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #78350F 0%, #92400E 30%, #B45309 60%, #D97706 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(120, 53, 15, 0.2) 0px, transparent 2px, transparent 4px, rgba(120, 53, 15, 0.2) 6px)' }} />{[0, 1, 2, 3, 4].map((i) => (<div key={`shelf-${i}`} className="absolute left-0 right-0 h-px opacity-30" style={{ top: `${20 + i * 15}%`, background: 'linear-gradient(to right, transparent, rgba(217, 119, 6, 0.6), transparent)' }} />))}{floatingBooks.map((book) => (<motion.div key={book.id} className="absolute w-10 h-14 sm:w-12 sm:h-16 opacity-60" style={{ left: `${book.left}%`, top: `${book.top}%`, background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.8), rgba(180, 83, 9, 0.6))', border: '2px solid rgba(251, 191, 36, 0.4)', borderRadius: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }} animate={{ y: [0, -25, 0], rotate: [book.rotation, book.rotation + 15, book.rotation] }} transition={{ duration: 5, repeat: Infinity, delay: book.delay, ease: 'easeInOut' }}><div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-900/40" /><div className="absolute inset-2" style={{ borderTop: '1px solid rgba(251, 191, 36, 0.3)', borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }} /></motion.div>))}{[0, 1, 2].map((i) => (<motion.div key={`tome-${i}`} className="absolute w-16 h-4 sm:w-20 sm:h-5 opacity-40" style={{ left: `${25 + i * 20}%`, bottom: `${15 + i * 3}%`, background: 'linear-gradient(to right, rgba(146, 64, 14, 0.8), rgba(120, 53, 15, 0.7))', border: '1px solid rgba(217, 119, 6, 0.5)', borderRadius: '1px' }} animate={{ x: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />))}{[0, 1].map((i) => (<motion.div key={`lamp-${i}`} className="absolute opacity-50" style={{ left: `${30 + i * 40}%`, top: '15%' }}><div className="w-8 h-12 sm:w-10 sm:h-14" style={{ background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), rgba(217, 119, 6, 0.4))', clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} /><motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent)' }} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 1, ease: 'easeInOut' }} /></motion.div>))}{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<motion.div key={`dust-${i}`} className="absolute w-1 h-1 rounded-full bg-amber-200/50" style={{ left: `${20 + i * 8}%`, top: `${30 + (i % 3) * 15}%` }} animate={{ y: [0, -40, 0], opacity: [0.3, 0.7, 0.3], x: [0, (i % 2 ? 10 : -10), 0] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }} />))}<motion.div className="absolute top-1/4 right-1/4 text-6xl sm:text-7xl opacity-40" animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>📚</motion.div><motion.div className="absolute bottom-1/4 left-1/4 text-4xl sm:text-5xl opacity-40" animate={{ y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🔖</motion.div><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl opacity-20" animate={{ rotateY: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>📖</motion.div><motion.div className="absolute bottom-1/3 right-1/3 text-3xl sm:text-4xl opacity-30" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🗄️</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  // Social Connector (A031) - Community Network Rose
  if (titleName === 'Social Connector') {
    const hearts = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: (i * 11) % 100,
      top: (i * 17) % 70
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #881337 100%)' }} />
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-2xl"
            style={{ left: `${h.left}%`, top: `${h.top}%` }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: h.id * 0.4 }}
          >
            💕
          </motion.div>
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Futurist (A009) - Neon City Holographic
  if (titleName === 'Futurist') {
    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #0f172a 100%)' }} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30"
          style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .4) 25%, rgba(59, 130, 246, .4) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .4) 75%, rgba(59, 130, 246, .4) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .4) 25%, rgba(59, 130, 246, .4) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .4) 75%, rgba(59, 130, 246, .4) 76%, transparent 77%, transparent)', backgroundSize: '40px 40px', transform: 'perspective(300px) rotateX(60deg)', filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' }}
          animate={{ backgroundPosition: ['0px 0px', '0px 40px'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // Dream Weaver (A010) - Ethereal Clouds Violet
  if (titleName === 'Dream Weaver') {
    const clouds = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
      id: i,
      left: (i * 20) % 90,
      top: 20 + (i % 3) * 15,
      size: 80 + i * 20
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4c1d95 100%)' }} />
        {clouds.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-full"
            style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.size}px`, height: `${c.size * 0.6}px`, background: 'radial-gradient(ellipse, rgba(196, 181, 253, 0.4), transparent 70%)', filter: 'blur(20px)' }}
            animate={{ x: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 15 + c.id * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {cosmicEvents}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  if (titleName === 'Sevenfold Sage') {
    const crystalSpheres = useMemo(() => Array.from({ length: 7 }, (_, i) => { const angle = (i * 360) / 7; const radius = 35; return { id: i, angle, x: 50 + radius * Math.cos((angle * Math.PI) / 180), y: 50 + radius * Math.sin((angle * Math.PI) / 180), delay: i * 0.7, symbol: ['☯️', '🔮', '✨', '🌟', '💫', '⚡', '🔯'][i] }; }), []);
    const wisdomRays = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ id: i, angle: i * 25.7, delay: i * 0.2 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 25%, #6D28D9 50%, #7C3AED 75%, #8B5CF6 100%)' }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)' }} />{wisdomRays.map((ray) => (<motion.div key={ray.id} className="absolute top-1/2 left-1/2 origin-left h-1 opacity-40 rounded-full" style={{ width: '40%', background: 'linear-gradient(to right, rgba(167, 139, 250, 0.8), transparent)', transform: `rotate(${ray.angle}deg)` }} animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: ray.delay, ease: 'easeInOut' }} />))}{[0, 1, 2, 3, 4, 5, 6].map((i) => (<motion.div key={`wisdom-ring-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-400/20" style={{ width: `${8 + i * 5}rem`, height: `${8 + i * 5}rem` }} animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.2, 0.4, 0.2] }} transition={{ rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }, opacity: { duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' } }} />))}{crystalSpheres.map((sphere) => (<motion.div key={sphere.id} className="absolute" style={{ left: `${sphere.x}%`, top: `${sphere.y}%` }}><motion.div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(233, 213, 255, 0.9), rgba(167, 139, 250, 0.7), rgba(124, 58, 237, 0.5))', border: '3px solid rgba(233, 213, 255, 0.6)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), inset 0 0 20px rgba(233, 213, 255, 0.4)' }} animate={{ scale: [1, 1.15, 1], boxShadow: ['0 0 30px rgba(139, 92, 246, 0.7)', '0 0 50px rgba(139, 92, 246, 1)', '0 0 30px rgba(139, 92, 246, 0.7)'] }} transition={{ duration: 3, repeat: Infinity, delay: sphere.delay, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl" animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>{sphere.symbol}</motion.div><motion.div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)', clipPath: 'circle(30% at 30% 30%)' }} animate={{ opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: sphere.delay, ease: 'easeInOut' }} /></motion.div><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-300/30" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: sphere.delay, ease: 'easeOut' }} /></motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(124, 58, 237, 0.4), transparent)', border: '4px solid rgba(167, 139, 250, 0.5)', boxShadow: '0 0 80px rgba(139, 92, 246, 0.9)' }} animate={{ scale: [1, 1.1, 1], rotate: 360 }} transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🔯</motion.div></motion.div>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<motion.div key={`wisdom-particle-${i}`} className="absolute w-2 h-2 rounded-full bg-purple-200" style={{ left: `${20 + i * 8}%`, top: `${25 + (i % 4) * 18}%`, boxShadow: '0 0 10px rgba(233, 213, 255, 0.9)' }} animate={{ opacity: [0, 0.9, 0], y: [0, -80, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>🔮</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>✨</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Century Streaker') {
    const dayMarkers = useMemo(() => Array.from({ length: 20 }, (_, i) => ({ id: i, x: 5 + i * 4.5, y: 40 + Math.sin(i * 0.5) * 15, delay: i * 0.15, day: (i + 1) * 5 })), []);
    const fireTrail = useMemo(() => Array.from({ length: 30 }, (_, i) => ({ id: i, x: 3 + i * 3, y: 45 + Math.sin(i * 0.4) * 12, size: 1 + (i % 5) * 0.3, delay: i * 0.1 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #7C2D12 0%, #9A3412 20%, #C2410C 40%, #EA580C 60%, #FB923C 80%, #FED7AA 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 40%), radial-gradient(circle at 80% 50%, rgba(234, 88, 12, 0.3) 0%, transparent 40%)' }} />{fireTrail.map((trail) => (<motion.div key={trail.id} className="absolute rounded-full opacity-60" style={{ left: `${trail.x}%`, top: `${trail.y}%`, width: `${2 + trail.size * 2}rem`, height: `${1 + trail.size}rem`, background: 'radial-gradient(ellipse, rgba(251, 146, 60, 0.9), rgba(234, 88, 12, 0.7), transparent)', filter: 'blur(4px)' }} animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [0.9, 1.1, 0.9] }} transition={{ duration: 2, repeat: Infinity, delay: trail.delay, ease: 'easeInOut' }} />))}{dayMarkers.map((marker) => (<motion.div key={marker.id} className="absolute" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}><motion.div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9), rgba(234, 88, 12, 0.8), rgba(194, 65, 12, 0.6))', border: '2px solid rgba(254, 215, 170, 0.7)', boxShadow: '0 0 25px rgba(251, 146, 60, 0.9)' }} animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 25px rgba(251, 146, 60, 0.7)', '0 0 40px rgba(251, 146, 60, 1)', '0 0 25px rgba(251, 146, 60, 0.7)'] }} transition={{ duration: 2, repeat: Infinity, delay: marker.delay, ease: 'easeInOut' }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-orange-950">{marker.day}</div></motion.div><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-orange-300/30" animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: marker.delay, ease: 'easeOut' }} /></motion.div>))}<motion.div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 opacity-50" style={{ background: 'linear-gradient(to right, rgba(124, 45, 18, 0.6), rgba(251, 146, 60, 0.8), rgba(234, 88, 12, 0.7), rgba(194, 65, 12, 0.5))', filter: 'blur(2px)' }} animate={{ scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} /><motion.div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-70 rounded-full" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.9), rgba(251, 146, 60, 0.7), rgba(234, 88, 12, 0.5), transparent)', border: '4px solid rgba(251, 191, 36, 0.6)', boxShadow: '0 0 100px rgba(251, 146, 60, 1), inset 0 0 40px rgba(251, 191, 36, 0.6)' }} animate={{ scale: [1, 1.15, 1], boxShadow: ['0 0 100px rgba(251, 146, 60, 0.9)', '0 0 140px rgba(251, 146, 60, 1)', '0 0 100px rgba(251, 146, 60, 0.9)'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl" animate={{ rotate: [0, 15, 0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🏃</motion.div></motion.div>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (<motion.div key={`flame-${i}`} className="absolute w-3 h-6 sm:w-4 sm:h-8 opacity-70 rounded-full" style={{ left: `${10 + i * 7}%`, top: `${48 + Math.sin(i * 0.6) * 8}%`, background: 'linear-gradient(to top, rgba(234, 88, 12, 0.9), rgba(251, 146, 60, 0.7), rgba(251, 191, 36, 0.5))', filter: 'blur(2px)' }} animate={{ scaleY: [1, 1.5, 1], opacity: [0.6, 0.9, 0.6], y: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }} />))}{[0, 1, 2, 3, 4, 5].map((i) => (<motion.div key={`spark-${i}`} className="absolute w-2 h-2 rounded-full bg-yellow-300" style={{ left: `${15 + i * 14}%`, top: `${40 + (i % 3) * 15}%`, boxShadow: '0 0 12px rgba(251, 191, 36, 1)' }} animate={{ opacity: [0, 1, 0], y: [0, -100, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }} />))}<motion.div className="absolute top-1/4 left-1/4 text-6xl sm:text-7xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>🔥</motion.div><motion.div className="absolute bottom-1/4 right-1/4 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💨</motion.div><motion.div className="absolute top-1/3 right-1/5 text-4xl sm:text-5xl opacity-40" animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>⚡</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`monument-${i}`} className="absolute w-16 h-20 sm:w-20 sm:h-24 opacity-30 rounded-sm" style={{ left: `${75 + i * 8}%`, bottom: '15%', background: 'linear-gradient(to top, rgba(124, 45, 18, 0.7), rgba(194, 65, 12, 0.5))', border: '2px solid rgba(234, 88, 12, 0.5)' }} animate={{ opacity: [0.25, 0.35, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}><div className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl">💯</div></motion.div>))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Master Curator') {
    const artworks = useMemo(() => Array.from({ length: 24 }, (_, i) => ({ id: i, left: 5 + (i % 6) * 16, top: 15 + Math.floor(i / 6) * 20, delay: i * 0.15, rotation: -5 + (i % 3) * 5 })), []);
    const spotlights = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, x: 10 + i * 12, delay: i * 0.3 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1C1917 0%, #292524 30%, #44403C 60%, #78716C 100%)' }} /><div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(120, 113, 108, 0.3) 0px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, rgba(120, 113, 108, 0.3) 0px, transparent 2px, transparent 20px)' }} />{spotlights.map((light) => (<motion.div key={light.id} className="absolute top-0 w-1 opacity-30" style={{ left: `${light.x}%`, height: '60%', background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.6), transparent)', filter: 'blur(8px)' }} animate={{ opacity: [0.2, 0.4, 0.2], scaleX: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity, delay: light.delay, ease: 'easeInOut' }} />))}{artworks.map((art) => (<motion.div key={art.id} className="absolute w-14 h-16 sm:w-16 sm:h-20 opacity-60" style={{ left: `${art.left}%`, top: `${art.top}%`, border: '3px solid rgba(217, 119, 6, 0.7)', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(217, 119, 6, 0.2))', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(251, 191, 36, 0.2)' }} animate={{ rotate: [art.rotation, art.rotation + 3, art.rotation], boxShadow: ['0 4px 15px rgba(0, 0, 0, 0.4)', '0 6px 25px rgba(217, 119, 6, 0.6)', '0 4px 15px rgba(0, 0, 0, 0.4)'] }} transition={{ duration: 4, repeat: Infinity, delay: art.delay, ease: 'easeInOut' }}><div className="absolute inset-2 border-2 border-amber-700/40" /><motion.div className="absolute inset-3 bg-gradient-to-br from-amber-500/20 to-orange-600/10" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: art.delay, ease: 'easeInOut' }} /></motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 sm:w-48 sm:h-56 opacity-80 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.4), rgba(180, 83, 9, 0.3))', border: '5px solid rgba(251, 191, 36, 0.8)', boxShadow: '0 8px 35px rgba(217, 119, 6, 0.8), inset 0 0 30px rgba(251, 191, 36, 0.3)' }} animate={{ scale: [1, 1.05, 1], boxShadow: ['0 8px 35px rgba(217, 119, 6, 0.7)', '0 12px 50px rgba(217, 119, 6, 1)', '0 8px 35px rgba(217, 119, 6, 0.7)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-4 border-4 border-amber-600/50 rounded" /><motion.div className="absolute inset-6 bg-gradient-to-br from-amber-400/30 to-orange-500/20" animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} /><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🖼️</motion.div></motion.div>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<motion.div key={`gallery-light-${i}`} className="absolute w-2 h-2 rounded-full bg-amber-300" style={{ left: `${15 + i * 8}%`, top: `${20 + (i % 3) * 20}%`, boxShadow: '0 0 15px rgba(251, 191, 36, 0.9)' }} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />))}{['🎨', '✨', '🖌️', '👔'].map((emoji, i) => (<motion.div key={`curator-${i}`} className="absolute text-4xl sm:text-5xl opacity-40" style={{ left: `${20 + i * 20}%`, bottom: `${20 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-50" animate={{ rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🏛️</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💡</motion.div>{[0, 1].map((i) => (<motion.div key={`pedestal-${i}`} className="absolute w-12 h-16 sm:w-14 sm:h-20 opacity-30 rounded-sm" style={{ left: `${25 + i * 50}%`, bottom: '12%', background: 'linear-gradient(to top, rgba(68, 64, 60, 0.7), rgba(41, 37, 36, 0.5))', border: '2px solid rgba(120, 113, 108, 0.5)' }} animate={{ opacity: [0.25, 0.35, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'easeInOut' }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Epic Novelist') {
    const words = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ id: i, left: 45 + (i % 3) * 8, delay: i * 0.1, word: ['STORY', 'WORD', 'TALE', 'EPIC', 'SAGA', 'VERSE'][i % 6] })), []);
    const pages = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, delay: i * 0.2 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #312E81 0%, #3730A3 30%, #4338CA 60%, #6366F1 80%, #A5B4FC 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(165, 180, 252, 0.2) 0px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(165, 180, 252, 0.2) 0px, transparent 1px, transparent 8px)' }} /><motion.div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-28 sm:w-36 opacity-70" style={{ height: '85%', background: 'linear-gradient(to top, rgba(55, 48, 163, 0.8), rgba(67, 56, 202, 0.6))', border: '4px solid rgba(165, 180, 252, 0.6)', borderBottom: 'none', boxShadow: '0 -8px 40px rgba(99, 102, 241, 0.8), inset 0 0 30px rgba(165, 180, 252, 0.3)' }} animate={{ boxShadow: ['0 -8px 40px rgba(99, 102, 241, 0.7)', '0 -12px 60px rgba(99, 102, 241, 1)', '0 -8px 40px rgba(99, 102, 241, 0.7)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-3 border-2 border-indigo-400/40" /><div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-6xl sm:text-7xl opacity-60">📚</div>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (<div key={`book-line-${i}`} className="absolute left-2 right-2 h-px bg-indigo-300/20" style={{ top: `${10 + i * 6}%` }} />))}</motion.div>{words.map((word) => (<motion.div key={word.id} className="absolute text-xs sm:text-sm font-bold text-indigo-200/70" style={{ left: `${word.left}%`, top: '20%' }} animate={{ y: [0, 300], opacity: [0, 0.8, 0.8, 0], scale: [0.8, 1, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: word.delay, ease: 'linear' }}>{word.word}</motion.div>))}{pages.map((page) => (<motion.div key={page.id} className="absolute w-16 h-20 sm:w-20 sm:h-24 opacity-40 rounded-sm" style={{ left: `${20 + (page.id % 4) * 15}%`, top: `${25 + Math.floor(page.id / 4) * 25}%`, background: 'linear-gradient(to bottom, rgba(224, 231, 255, 0.8), rgba(199, 210, 254, 0.6))', border: '2px solid rgba(129, 140, 248, 0.5)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }} animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: page.delay, ease: 'easeInOut' }}><div className="absolute top-3 left-2 right-2 h-px bg-indigo-400/30" /><div className="absolute top-6 left-2 right-2 h-px bg-indigo-400/30" /><div className="absolute top-9 left-2 right-2 h-px bg-indigo-400/30" /></motion.div>))}{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`word-particle-${i}`} className="absolute w-2 h-2 rounded-full bg-indigo-200" style={{ left: `${48 + (i % 2) * 4}%`, top: `${25 + (i % 4) * 15}%`, boxShadow: '0 0 10px rgba(165, 180, 252, 0.9)' }} animate={{ opacity: [0, 0.8, 0], y: [0, 200], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'linear' }} />))}{['✍️', '📖', '📜', '🖋️'].map((emoji, i) => (<motion.div key={`write-${i}`} className="absolute text-4xl sm:text-5xl opacity-40" style={{ left: `${15 + i * 20}%`, bottom: `${20 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>📄</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💭</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`monument-${i}`} className="absolute w-12 h-16 sm:w-14 sm:h-20 opacity-30 rounded-sm" style={{ left: `${70 + i * 10}%`, bottom: '12%', background: 'linear-gradient(to top, rgba(55, 48, 163, 0.7), rgba(67, 56, 202, 0.5))', border: '2px solid rgba(99, 102, 241, 0.5)' }} animate={{ opacity: [0.25, 0.35, 0.25] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}><div className="absolute top-4 left-1/2 -translate-x-1/2 text-xl">📚</div></motion.div>))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Network Builder') {
    const nodes = useMemo(() => Array.from({ length: 25 }, (_, i) => { const angle = (i * 360) / 25; const radius = 30 + (i % 3) * 8; return { id: i, x: 50 + radius * Math.cos((angle * Math.PI) / 180), y: 50 + radius * Math.sin((angle * Math.PI) / 180), delay: i * 0.15 }; }), []);
    const connections = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ id: i, from: i % 25, to: (i + 7) % 25, delay: i * 0.1 })), []);
    const dataPackets = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, delay: i * 0.5 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #065F46 0%, #047857 30%, #059669 60%, #10B981 80%, #6EE7B7 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle, rgba(110, 231, 183, 0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />{connections.map((conn) => { const fromNode = nodes[conn.from]; const toNode = nodes[conn.to]; return (<motion.div key={conn.id} className="absolute h-px origin-left" style={{ left: `${fromNode.x}%`, top: `${fromNode.y}%`, width: Math.sqrt(Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2)) + '%', transform: `rotate(${Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) * 180 / Math.PI}deg)`, background: 'linear-gradient(to right, rgba(16, 185, 129, 0.6), rgba(110, 231, 183, 0.4))' }} animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: conn.delay, ease: 'easeInOut' }} />); })}{nodes.map((node) => (<motion.div key={node.id} className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%` }}><motion.div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(110, 231, 183, 0.9), rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.5))', border: '2px solid rgba(110, 231, 183, 0.7)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)' }} animate={{ scale: [1, 1.2, 1], boxShadow: ['0 0 20px rgba(16, 185, 129, 0.7)', '0 0 35px rgba(16, 185, 129, 1)', '0 0 20px rgba(16, 185, 129, 0.7)'] }} transition={{ duration: 2, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }} /><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-300/30" animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: node.delay, ease: 'easeOut' }} /></motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 opacity-70 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.5), transparent)', border: '4px solid rgba(110, 231, 183, 0.6)', boxShadow: '0 0 80px rgba(16, 185, 129, 0.9)' }} animate={{ scale: [1, 1.1, 1], rotate: 360 }} transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🌐</motion.div></motion.div>{dataPackets.map((packet) => (<motion.div key={packet.id} className="absolute w-3 h-3 rounded-full bg-emerald-200" style={{ left: '50%', top: '50%', boxShadow: '0 0 12px rgba(110, 231, 183, 1)' }} animate={{ x: [0, 200, -200, 0], y: [0, -150, 150, 0], opacity: [0, 0.9, 0.9, 0], scale: [0.5, 1, 1, 0.5] }} transition={{ duration: 6, repeat: Infinity, delay: packet.delay, ease: 'linear' }} />))}{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`pulse-${i}`} className="absolute w-2 h-2 rounded-full bg-emerald-300" style={{ left: `${25 + i * 10}%`, top: `${30 + (i % 3) * 15}%`, boxShadow: '0 0 10px rgba(110, 231, 183, 0.9)' }} animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }} />))}{['💻', '📡', '⚡', '🔗'].map((emoji, i) => (<motion.div key={`net-${i}`} className="absolute text-4xl sm:text-5xl opacity-40" style={{ left: `${20 + i * 20}%`, bottom: `${20 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}>🔌</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>💾</motion.div>{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Community Beacon') {
    const ships = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ id: i, startX: 10 + i * 8, startY: 60 + (i % 3) * 15, delay: i * 0.5 })), []);
    const beamSegments = useMemo(() => Array.from({ length: 20 }, (_, i) => ({ id: i, rotation: i * 18, delay: i * 0.1 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 30%, #F43F5E 60%, #FB7185 80%, #FECDD3 100%)' }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(251, 113, 133, 0.4) 0%, transparent 40%), radial-gradient(circle at 30% 50%, rgba(225, 29, 72, 0.3) 0%, transparent 40%)' }} /><motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-32 sm:w-20 sm:h-40 opacity-70" style={{ background: 'linear-gradient(to top, rgba(190, 18, 60, 0.8), rgba(225, 29, 72, 0.6))', border: '3px solid rgba(251, 113, 133, 0.6)', borderRadius: '8px 8px 0 0', boxShadow: '0 -8px 40px rgba(244, 63, 94, 0.8)' }} animate={{ boxShadow: ['0 -8px 40px rgba(244, 63, 94, 0.7)', '0 -12px 60px rgba(244, 63, 94, 1)', '0 -8px 40px rgba(244, 63, 94, 0.7)'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ background: 'radial-gradient(circle, rgba(254, 205, 211, 0.9), rgba(251, 113, 133, 0.7))', border: '2px solid rgba(254, 205, 211, 0.8)', boxShadow: '0 0 30px rgba(251, 113, 133, 1)' }} /><div className="absolute inset-3 border-2 border-rose-400/40 rounded" />{[0, 1, 2, 3, 4, 5].map((i) => (<div key={`lighthouse-stripe-${i}`} className="absolute left-0 right-0 h-4 sm:h-5 bg-rose-600/30" style={{ top: `${15 + i * 12}%` }} />))}</motion.div>{beamSegments.map((segment) => (<motion.div key={segment.id} className="absolute bottom-10 left-1/2 origin-bottom w-2 sm:w-3 opacity-40" style={{ height: '70%', background: 'linear-gradient(to top, rgba(251, 113, 133, 0.8), transparent)', transform: `rotate(${segment.rotation}deg)`, filter: 'blur(8px)' }} animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: segment.delay, ease: 'easeInOut' }} />))}<motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 origin-bottom w-32 sm:w-40 opacity-50" style={{ height: '75%', background: 'linear-gradient(to top, rgba(251, 113, 133, 0.6), transparent)', clipPath: 'polygon(40% 100%, 45% 0%, 55% 0%, 60% 100%)', filter: 'blur(12px)' }} animate={{ rotate: [0, 360], opacity: [0.4, 0.6, 0.4] }} transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }} />{ships.map((ship) => (<motion.div key={ship.id} className="absolute text-3xl sm:text-4xl opacity-60" style={{ left: `${ship.startX}%`, top: `${ship.startY}%` }} animate={{ x: [0, 200], y: [0, -150], opacity: [0.5, 0.7, 0.5], scale: [0.8, 1, 0.8] }} transition={{ duration: 8, repeat: Infinity, delay: ship.delay, ease: 'easeInOut' }}>⛵</motion.div>))}{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (<motion.div key={`heart-${i}`} className="absolute w-2 h-2 rounded-full bg-rose-300" style={{ left: `${45 + (i % 3) * 5}%`, bottom: `${45 + (i % 4) * 10}%`, boxShadow: '0 0 12px rgba(251, 113, 133, 1)' }} animate={{ opacity: [0, 0.9, 0], y: [0, -120, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}>❤️</motion.div>))}{['💕', '💖', '💗', '💝'].map((emoji, i) => (<motion.div key={`love-${i}`} className="absolute text-4xl sm:text-5xl opacity-40" style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 20}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-5xl sm:text-6xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>🌊</motion.div><motion.div className="absolute top-1/3 left-1/5 text-5xl sm:text-6xl opacity-50" animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🏖️</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`wave-${i}`} className="absolute left-0 right-0 h-12 sm:h-16 opacity-20 rounded-full" style={{ bottom: `${5 + i * 8}%`, background: 'linear-gradient(to top, rgba(190, 18, 60, 0.5), transparent)' }} animate={{ scaleX: [0.9, 1.1, 0.9], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 4, repeat: Infinity, delay: i * 1, ease: 'easeInOut' }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Modern Archivist') {
    const holograms = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ id: i, x: 15 + (i % 8) * 10, y: 20 + Math.floor(i / 8) * 15, delay: i * 0.12, rotation: -10 + (i % 5) * 5 })), []);
    const dataStreams = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ id: i, x: 20 + i * 7, delay: i * 0.4 })), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 25%, #0284C7 50%, #0EA5E9 75%, #38BDF8 100%)' }} /><div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(56, 189, 248, 0.2) 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.2) 0px, transparent 1px, transparent 4px)' }} />{dataStreams.map((stream) => (<motion.div key={stream.id} className="absolute top-0 w-px opacity-40" style={{ left: `${stream.x}%`, height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.8), transparent)' }} animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, delay: stream.delay, ease: 'easeInOut' }} />))}{holograms.map((holo) => (<motion.div key={holo.id} className="absolute w-12 h-14 sm:w-14 sm:h-16 opacity-50" style={{ left: `${holo.x}%`, top: `${holo.y}%`, border: '2px solid rgba(56, 189, 248, 0.7)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(56, 189, 248, 0.2))', boxShadow: '0 4px 20px rgba(14, 165, 233, 0.6), inset 0 0 15px rgba(56, 189, 248, 0.3)', transform: `rotate(${holo.rotation}deg)` }} animate={{ y: [0, -15, 0], opacity: [0.4, 0.6, 0.4], boxShadow: ['0 4px 20px rgba(14, 165, 233, 0.5)', '0 6px 30px rgba(14, 165, 233, 0.8)', '0 4px 20px rgba(14, 165, 233, 0.5)'] }} transition={{ duration: 4, repeat: Infinity, delay: holo.delay, ease: 'easeInOut' }}><div className="absolute inset-1 border border-cyan-300/40" /><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl opacity-70" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, delay: holo.delay, ease: 'easeInOut' }}>📱</motion.div></motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-48 sm:w-48 sm:h-56 opacity-60" style={{ border: '4px solid rgba(56, 189, 248, 0.8)', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4), rgba(2, 132, 199, 0.3))', boxShadow: '0 8px 50px rgba(14, 165, 233, 0.9), inset 0 0 40px rgba(56, 189, 248, 0.4)' }} animate={{ scale: [1, 1.05, 1], boxShadow: ['0 8px 50px rgba(14, 165, 233, 0.8)', '0 12px 70px rgba(14, 165, 233, 1)', '0 8px 50px rgba(14, 165, 233, 0.8)'] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-4 border-2 border-cyan-300/50" /><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl opacity-80" animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}>📦</motion.div>{[0, 1, 2, 3].map((i) => (<motion.div key={`scan-line-${i}`} className="absolute left-0 right-0 h-px bg-cyan-300/50" style={{ top: `${20 + i * 20}%` }} animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }} />))}</motion.div>{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (<motion.div key={`particle-${i}`} className="absolute w-2 h-2 rounded-full bg-cyan-200" style={{ left: `${25 + i * 8}%`, top: `${30 + (i % 4) * 15}%`, boxShadow: '0 0 12px rgba(56, 189, 248, 1)' }} animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }} />))}{['💾', '🔵', '⚡', '🌐'].map((emoji, i) => (<motion.div key={`tech-${i}`} className="absolute text-4xl sm:text-5xl opacity-40" style={{ left: `${20 + i * 22}%`, bottom: `${20 + (i % 2) * 15}%` }} animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.5, 0.35] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-6xl sm:text-7xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>🖥️</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-6xl sm:text-7xl opacity-50" animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>✨</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`grid-${i}`} className="absolute left-0 right-0 h-px bg-cyan-400/20" style={{ top: `${25 + i * 25}%` }} animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Annual Keeper') {
    const monthPillars = useMemo(() => Array.from({ length: 12 }, (_, i) => { const angle = (i * 360) / 12; const radius = 38; return { id: i, x: 50 + radius * Math.cos((angle * Math.PI) / 180), y: 50 + radius * Math.sin((angle * Math.PI) / 180), delay: i * 0.25, month: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i] }; }), []);
    const yearStars = useMemo(() => Array.from({ length: 36 }, (_, i) => { const angle = (i * 360) / 36; const radius = 42; return { id: i, x: 50 + radius * Math.cos((angle * Math.PI) / 180), y: 50 + radius * Math.sin((angle * Math.PI) / 180), delay: i * 0.05 }; }), []);
    return (<motion.div className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`} initial={variants.initial} animate={variants.animate} exit={variants.exit} style={performanceStyle}><div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 20%, #8B5CF6 40%, #EC4899 60%, #F59E0B 80%, #FBBF24 100%)' }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)' }} />{yearStars.map((star) => (<motion.div key={star.id} className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200" style={{ left: `${star.x}%`, top: `${star.y}%`, boxShadow: '0 0 8px rgba(251, 191, 36, 0.9)' }} animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8], rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }} />))}{monthPillars.map((pillar) => (<motion.div key={pillar.id} className="absolute" style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}><motion.div className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-16 sm:w-14 sm:h-20 opacity-60 rounded-sm" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.8), rgba(59, 130, 246, 0.6))', border: '3px solid rgba(147, 197, 253, 0.7)', boxShadow: '0 4px 25px rgba(59, 130, 246, 0.8)' }} animate={{ scale: [1, 1.1, 1], boxShadow: ['0 4px 25px rgba(59, 130, 246, 0.7)', '0 6px 35px rgba(59, 130, 246, 1)', '0 4px 25px rgba(59, 130, 246, 0.7)'] }} transition={{ duration: 3, repeat: Infinity, delay: pillar.delay, ease: 'easeInOut' }}><div className="absolute inset-2 border border-blue-300/40" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-blue-100">{pillar.month}</div></motion.div><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 sm:w-18 sm:h-24 rounded-sm border-2 border-blue-300/30" animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: pillar.delay, ease: 'easeOut' }} /></motion.div>))}<motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 opacity-70 rounded-full" style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.8), rgba(139, 92, 246, 0.5), transparent)', border: '4px solid rgba(251, 191, 36, 0.7)', boxShadow: '0 0 90px rgba(251, 191, 36, 1)' }} animate={{ scale: [1, 1.1, 1], rotate: 360 }} transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 36, repeat: Infinity, ease: 'linear' } }}><motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-7xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🗓️</motion.div></motion.div>{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (<motion.div key={`season-${i}`} className="absolute w-3 h-3 rounded-full" style={{ left: `${35 + i * 5}%`, top: `${30 + (i % 3) * 15}%`, background: `linear-gradient(135deg, ${['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'][i % 4]}, ${['#60A5FA', '#A78BFA', '#F472B6', '#FBBF24'][i % 4]})`, boxShadow: `0 0 15px ${['rgba(59, 130, 246, 0.9)', 'rgba(139, 92, 246, 0.9)', 'rgba(236, 72, 153, 0.9)', 'rgba(245, 158, 11, 0.9)'][i % 4]}` }} animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.5, 0.5], y: [0, -80, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }} />))}{['🌸', '☀️', '🍂', '❄️'].map((emoji, i) => (<motion.div key={`season-icon-${i}`} className="absolute text-5xl sm:text-6xl opacity-50" style={{ left: `${20 + i * 20}%`, top: `${20 + (i % 2) * 40}%` }} animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.6, 0.4], rotate: [0, 10, 0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}>{emoji}</motion.div>))}<motion.div className="absolute top-1/4 right-1/5 text-6xl sm:text-7xl opacity-50" animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>⏰</motion.div><motion.div className="absolute bottom-1/4 left-1/5 text-6xl sm:text-7xl opacity-50" animate={{ y: [0, -25, 0], scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🌅</motion.div>{[0, 1, 2].map((i) => (<motion.div key={`year-ring-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ width: `${20 + i * 12}rem`, height: `${20 + i * 12}rem`, borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(251, 191, 36, 0.3)'][i] }} animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.2, 0.4, 0.2] }} transition={{ rotate: { duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }, opacity: { duration: 4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' } }} />))}{Object.values(effects).map(effect => effect)}{cosmicEvents}<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" /></motion.div>);
  }
  
  if (titleName === 'Decade Dreamer') {
    return (<DecadeDreamer height={height} positioning={positioning} variants={variants} performanceStyle={performanceStyle} effects={effects} cosmicEvents={cosmicEvents} />);
  }
  
  if (titleName === 'Chronicle Master') {
    return (<ChronicleMaster height={height} positioning={positioning} variants={variants} performanceStyle={performanceStyle} effects={effects} cosmicEvents={cosmicEvents} />);
  }
  
  if (titleName === 'Time Lord') {
    return (<TimeLordHorizon height={height} positioning={positioning} variants={variants} performanceStyle={performanceStyle} effects={effects} cosmicEvents={cosmicEvents} />);
  }
  
  if (titleName === 'Time Traveler') {
    return (<TimeTraveler height={height} positioning={positioning} variants={variants} performanceStyle={performanceStyle} effects={effects} cosmicEvents={cosmicEvents} />);
  }
  
  // Fallback for any other legendary titles
  if (titleRarity === 'legendary') {
    const legendaryGradient = config.colors.length >= 2 
      ? `linear-gradient(135deg, ${config.colors[0]} 0%, ${config.colors[1]} 100%)`
      : 'linear-gradient(135deg, #f59e0b 0%, #fef3c7 100%)';
    
    const stars = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      duration: 2 + Math.random(),
      delay: Math.random() * 2
    })), []);

    return (
      <motion.div 
        className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        style={performanceStyle}
      >
        <div className="absolute inset-0" style={{ background: legendaryGradient }} />
        
        {/* Simple cosmic stars */}
        {stars.map((s) => (
          <motion.div key={s.id} className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{ top: `${s.top}%`, left: `${s.left}%` }}
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          />
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </motion.div>
    );
  }
  
  // ============================================================================
  // FALLBACK: Default elegant gradient with FULL EFFECTS for any unmapped titles
  // ============================================================================
  
  return (
    <motion.div 
      className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      style={performanceStyle}
    >
      {/* Base gradient using config colors */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${config.colors[0]} 0%, ${config.colors[1]} 100%)`,
        }}
      />
      
      {/* 🌌 RENDER ALL COSMIC EFFECTS */}
      {Object.values(effects).map(effect => effect)}
      
      {/* 🌌 RANDOM COSMIC EVENTS */}
      {cosmicEvents}
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
    </motion.div>
  );
  
  // 🚨 DEFAULT FALLBACK - If no titleName matches, render a default gradient
  console.warn(`⚠️ [HeaderBackground] No horizon found for title: "${titleName}". Using default gradient.`);
  
  return (
    <motion.div 
      className={`top-0 left-0 right-0 ${height} overflow-hidden z-0 ${positioning}`}
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      style={performanceStyle}
    >
      {/* Default gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[1]})`,
        }}
      />
      
      {/* Cosmic effects */}
      {Object.values(effects).map(effect => effect)}
      
      {/* 🌌 RANDOM COSMIC EVENTS */}
      {cosmicEvents}
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
    </motion.div>
  );
}
