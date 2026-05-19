/**
 * New Life - Vintage Music Box Ceremony 🎵🦋
 * 
 * Ornate antique music box opens to reveal dancing ballerina, 
 * then explodes into thousands of glowing butterflies
 * 
 * SEQUENCE:
 * 1. Intro - Ornate music box sits on velvet
 * 2. Open - Box lid opens slowly (hinge creak)
 * 3. Rise - Ballerina rises and begins to spin
 * 4. Dance - Lullaby plays, ballerina dances
 * 5. Glow - Box glows with magical light
 * 6. Explode - Box bursts into butterflies
 * 7. Formation - Butterflies form baby silhouette
 * 8. Scatter - Butterflies scatter beautifully
 * 
 * QUALITY LEVEL: Matches Mixtape's cassette transformation
 * 
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getOptimalParticleCount, 
  getOptimalBlur,
  getPerformanceStyle,
  shouldRenderComplexEffect
} from './ceremonyOptimization';

interface NewLifeGentleBloomCeremonyProps {
  capsuleTitle: string;
  media?: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

interface Butterfly {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  color: string;
  delay: number;
  pathCurve: number;
}

interface MusicNote {
  id: number;
  x: number;
  y: number;
  symbol: string;
  delay: number;
}

export function NewLifeGentleBloomCeremony({
  capsuleTitle,
  media = [],
  isPreview = false,
  onComplete
}: NewLifeGentleBloomCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'open' | 'rise' | 'dance' | 'glow' | 'explode' | 'formation' | 'scatter'>('intro');
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [musicNotes, setMusicNotes] = useState<MusicNote[]>([]);

  // Timeline
  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage('intro') },
      { time: 1200, action: () => setStage('open') },
      { time: 2500, action: () => setStage('rise') },
      { time: 4000, action: () => setStage('dance') },
      { time: 6500, action: () => setStage('glow') },
      { time: 8000, action: () => setStage('explode') },
      { time: 9500, action: () => setStage('formation') },
      { time: 12000, action: () => setStage('scatter') },
      { time: 14000, action: () => onComplete?.() }
    ];

    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Generate music notes during dance
  useEffect(() => {
    if (stage === 'dance' || stage === 'glow') {
      const noteSymbols = ['♪', '♫', '♬', '♩'];
      const noteCount = getOptimalParticleCount(12);
      
      const newNotes: MusicNote[] = Array.from({ length: noteCount }, (_, i) => ({
        id: i,
        x: 45 + Math.random() * 10,
        y: 30,
        symbol: noteSymbols[i % noteSymbols.length],
        delay: i * 0.15
      }));

      setMusicNotes(newNotes);
    }
  }, [stage]);

  // Generate butterflies for explosion and formation
  useEffect(() => {
    if (stage === 'explode' || stage === 'formation') {
      const butterflyCount = getOptimalParticleCount(80);
      const colors = [
        'rgba(236, 72, 153, 0.9)',  // Pink
        'rgba(192, 132, 252, 0.9)', // Purple
        'rgba(147, 51, 234, 0.9)',  // Violet
        'rgba(251, 207, 232, 0.9)', // Light pink
        'rgba(221, 214, 254, 0.9)', // Light purple
      ];

      const newButterflies: Butterfly[] = Array.from({ length: butterflyCount }, (_, i) => {
        const angle = (i / butterflyCount) * Math.PI * 2;
        const distance = stage === 'explode' ? 400 : 300;
        
        // Formation positions (baby silhouette approximation)
        const formationPoints = [
          // Head
          ...Array.from({ length: 15 }, (_, j) => ({
            x: 50 + Math.cos((j / 15) * Math.PI * 2) * 8,
            y: 35 + Math.sin((j / 15) * Math.PI * 2) * 8
          })),
          // Body
          ...Array.from({ length: 10 }, (_, j) => ({
            x: 50,
            y: 45 + j * 2
          })),
          // Arms
          ...Array.from({ length: 8 }, (_, j) => ({
            x: 50 + (j < 4 ? -1 : 1) * (j % 4) * 3,
            y: 48 + (j % 4) * 2
          })),
          // Legs
          ...Array.from({ length: 8 }, (_, j) => ({
            x: 50 + (j < 4 ? -1 : 1) * (j % 4) * 2,
            y: 60 + (j % 4) * 3
          }))
        ];

        const formationPoint = formationPoints[i % formationPoints.length] || { x: 50, y: 50 };

        return {
          id: i,
          startX: 50,
          startY: 50,
          endX: stage === 'explode' 
            ? 50 + Math.cos(angle) * distance
            : formationPoint.x,
          endY: stage === 'explode'
            ? 50 + Math.sin(angle) * distance
            : formationPoint.y,
          size: 12 + Math.random() * 8,
          color: colors[i % colors.length],
          delay: i * 0.01,
          pathCurve: (Math.random() - 0.5) * 100
        };
      });

      setButterflies(newButterflies);
    }
  }, [stage]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        ...getPerformanceStyle(),
        background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.2) 0%, rgba(88, 28, 135, 0.4) 50%, rgba(59, 7, 100, 0.6) 100%)',
      }}
    >
      {/* Soft background glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Velvet stage - visible during intro through glow */}
      {['intro', 'open', 'rise', 'dance', 'glow'].includes(stage) && (
        <motion.div
          className="absolute bottom-0 w-full h-1/3"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(139, 0, 0, 0.6) 50%, rgba(100, 0, 0, 0.8) 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <AnimatePresence mode="wait">
        {/* INTRO - Music box appears */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            className="relative"
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Music Box */}
            <div className="relative w-48 h-32 md:w-64 md:h-40">
              {/* Box body */}
              <div 
                className="w-full h-full rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(101, 67, 33, 0.9) 0%, rgba(139, 90, 43, 0.9) 50%, rgba(101, 67, 33, 0.9) 100%)',
                  boxShadow: shouldRenderComplexEffect()
                    ? '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 2px 10px rgba(255, 215, 0, 0.2)'
                    : '0 10px 20px rgba(0, 0, 0, 0.5)',
                  border: '3px solid rgba(139, 90, 43, 0.8)',
                }}
              >
                {/* Wood grain texture */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)',
                  }}
                />
                
                {/* Gold trim */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-yellow-600/50 rounded" />
                
                {/* Decorative corner embellishments */}
                {[
                  { top: '8px', left: '8px' },
                  { top: '8px', right: '8px' },
                  { bottom: '8px', left: '8px' },
                  { bottom: '8px', right: '8px' }
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700"
                    style={{ ...pos, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                  />
                ))}

                {/* Keyhole */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 rounded-full bg-gradient-to-b from-gray-700 to-black"
                  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 60% 70%, 60% 100%, 40% 100%, 40% 70%, 0% 70%)' }}
                />
              </div>

              {/* Lid - closed */}
              <div 
                className="absolute top-0 left-0 w-full h-8 rounded-t-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.95) 0%, rgba(101, 67, 33, 0.95) 100%)',
                  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
                  border: '3px solid rgba(139, 90, 43, 0.8)',
                  borderBottom: 'none',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* OPEN - Box lid opens */}
        {(stage === 'open' || stage === 'rise' || stage === 'dance' || stage === 'glow') && (
          <motion.div
            key="open"
            className="relative"
          >
            {/* Music Box body */}
            <div className="relative w-48 h-32 md:w-64 md:h-40">
              <div 
                className="w-full h-full rounded-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(101, 67, 33, 0.9) 0%, rgba(139, 90, 43, 0.9) 50%, rgba(101, 67, 33, 0.9) 100%)',
                  boxShadow: shouldRenderComplexEffect()
                    ? '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 2px 10px rgba(255, 215, 0, 0.2)'
                    : '0 10px 20px rgba(0, 0, 0, 0.5)',
                  border: '3px solid rgba(139, 90, 43, 0.8)',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)',
                  }}
                />
                
                {/* Interior velvet lining */}
                <motion.div
                  className="absolute inset-2 rounded"
                  style={{
                    background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stage === 'open' || stage === 'rise' || stage === 'dance' || stage === 'glow' ? 1 : 0 }}
                />

                {/* Magical glow from inside */}
                {(stage === 'glow') && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  />
                )}
              </div>

              {/* Lid - opening */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-8 rounded-t-lg origin-bottom"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 90, 43, 0.95) 0%, rgba(101, 67, 33, 0.95) 100%)',
                  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
                  border: '3px solid rgba(139, 90, 43, 0.8)',
                  borderBottom: 'none',
                  transformOrigin: 'bottom center',
                }}
                initial={{ rotateX: 0 }}
                animate={{ 
                  rotateX: stage === 'open' || stage === 'rise' || stage === 'dance' || stage === 'glow' ? -110 : 0,
                  y: stage === 'open' || stage === 'rise' || stage === 'dance' || stage === 'glow' ? -5 : 0
                }}
                transition={{ 
                  duration: 1.3,
                  ease: 'easeInOut'
                }}
              >
                {/* Lid interior (purple velvet) */}
                <div 
                  className="absolute inset-0 rounded-t-lg"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.4) 0%, rgba(236, 72, 153, 0.4) 100%)',
                  }}
                />
              </motion.div>

              {/* Ballerina */}
              {(stage === 'rise' || stage === 'dance' || stage === 'glow') && (
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 text-6xl md:text-7xl"
                  style={{
                    filter: shouldRenderComplexEffect() 
                      ? `drop-shadow(0 0 ${getOptimalBlur(20)}px rgba(236, 72, 153, 0.8))`
                      : undefined,
                  }}
                  initial={{ 
                    bottom: '50%',
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{ 
                    bottom: stage === 'rise' ? '60%' : '70%',
                    opacity: 1,
                    scale: 1,
                    rotate: stage === 'dance' || stage === 'glow' ? 360 : 0
                  }}
                  transition={{ 
                    bottom: { duration: 1.5, ease: 'easeOut' },
                    rotate: { 
                      duration: 3, 
                      repeat: stage === 'dance' || stage === 'glow' ? Infinity : 0,
                      ease: 'linear' 
                    }
                  }}
                >
                  💃
                </motion.div>
              )}

              {/* Music notes floating up */}
              {(stage === 'dance' || stage === 'glow') && musicNotes.map((note) => (
                <motion.div
                  key={note.id}
                  className="absolute text-2xl md:text-3xl text-purple-300"
                  style={{
                    left: `${note.x}%`,
                    bottom: '70%',
                  }}
                  initial={{ 
                    y: 0,
                    opacity: 0,
                    scale: 0.5
                  }}
                  animate={{ 
                    y: -150,
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1, 0.8],
                    x: [(Math.random() - 0.5) * 30]
                  }}
                  transition={{ 
                    duration: 2.5,
                    delay: note.delay,
                    ease: 'easeOut'
                  }}
                >
                  {note.symbol}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* EXPLODE - Butterfly explosion */}
        {stage === 'explode' && (
          <motion.div
            key="explode"
            className="relative w-full h-full"
          >
            {/* Flash of light */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.5 }}
            />

            {/* Butterflies exploding outward */}
            {butterflies.map((butterfly) => (
              <motion.div
                key={butterfly.id}
                className="absolute text-xl md:text-2xl"
                style={{
                  left: `${butterfly.startX}%`,
                  top: `${butterfly.startY}%`,
                  color: butterfly.color,
                  filter: shouldRenderComplexEffect() 
                    ? `drop-shadow(0 0 ${getOptimalBlur(4)}px ${butterfly.color})`
                    : undefined,
                }}
                initial={{ 
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: butterfly.endX - butterfly.startX + '%',
                  y: butterfly.endY - butterfly.startY + '%',
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.8],
                  rotate: [0, 360 + Math.random() * 360]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: butterfly.delay,
                  ease: 'easeOut'
                }}
              >
                🦋
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FORMATION - Butterflies form baby silhouette */}
        {stage === 'formation' && (
          <motion.div
            key="formation"
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Butterflies forming shape */}
            {butterflies.map((butterfly) => (
              <motion.div
                key={butterfly.id}
                className="absolute text-lg md:text-xl"
                style={{
                  color: butterfly.color,
                  filter: shouldRenderComplexEffect() 
                    ? `drop-shadow(0 0 ${getOptimalBlur(4)}px ${butterfly.color})`
                    : undefined,
                }}
                initial={{ 
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0
                }}
                animate={{ 
                  left: `${butterfly.endX}%`,
                  top: `${butterfly.endY}%`,
                  opacity: 1,
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2,
                  delay: butterfly.delay,
                  ease: 'easeInOut'
                }}
              >
                🦋
              </motion.div>
            ))}

            {/* Baby silhouette glow */}
            <motion.div
              className="absolute"
              style={{
                width: '200px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                filter: shouldRenderComplexEffect() ? `blur(${getOptimalBlur(40)}px)` : undefined,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.div>
        )}

        {/* SCATTER - Butterflies scatter beautifully */}
        {stage === 'scatter' && (
          <motion.div
            key="scatter"
            className="relative w-full h-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {Array.from({ length: getOptimalParticleCount(60) }).map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 500;
              const colors = [
                'rgba(236, 72, 153, 0.9)',
                'rgba(192, 132, 252, 0.9)',
                'rgba(147, 51, 234, 0.9)',
              ];

              return (
                <motion.div
                  key={i}
                  className="absolute text-xl"
                  style={{
                    left: '50%',
                    top: '50%',
                    color: colors[i % colors.length],
                  }}
                  animate={{ 
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    rotate: [0, 720],
                    opacity: [1, 0],
                    scale: [1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.01,
                    ease: 'easeOut'
                  }}
                >
                  🦋
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
