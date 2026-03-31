import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface GoldenBrushstrokeProps {
  colors: string[];
  isPreview?: boolean;
}

/**
 * 🎨 GOLDEN BRUSHSTROKE - Master Curator Achievement
 * Living canvas with animated golden brushstrokes painting continuously
 * Features: Artistic canvas texture, flowing brushstrokes, ink drops, enhancement bursts
 */
export function GoldenBrushstroke({ colors, isPreview = false }: GoldenBrushstrokeProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [activeStrokes, setActiveStrokes] = useState<number[]>([]);

  // Cycle through brushstrokes
  useEffect(() => {
    if (isPreview) return;
    
    const interval = setInterval(() => {
      setActiveStrokes(prev => {
        const newStrokes = [...prev, Date.now()];
        // Keep only last 8 strokes
        return newStrokes.slice(-8);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPreview]);

  // Brushstroke paths (artistic SVG paths)
  const brushstrokePaths = [
    'M 10,50 Q 30,20 50,50 T 90,50',
    'M 20,80 Q 40,40 60,80 T 100,80',
    'M 15,30 Q 50,10 85,30',
    'M 30,60 Q 50,90 70,60',
    'M 10,40 C 30,10 70,90 90,40',
    'M 25,70 Q 50,50 75,70',
    'M 40,20 Q 60,50 80,20',
    'M 5,60 C 25,30 75,80 95,50'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Canvas texture background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}10 0%, ${colors[1]}05 100%)`,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors[0]}03 2px, ${colors[0]}03 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, ${colors[1]}03 2px, ${colors[1]}03 4px)
          `
        }}
      />

      {/* Artistic weave pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0,10 L 10,0 L 20,10 L 10,20 Z" fill={colors[0]} opacity="0.3" />
            <circle cx="10" cy="10" r="3" fill={colors[1]} opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)" />
      </svg>

      {/* Animated golden brushstrokes */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          {/* Brush texture filter */}
          <filter id="brushTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>

          {/* Golden gradient for strokes */}
          <linearGradient id="golden-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors[1]} stopOpacity="1" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="0.6" />
          </linearGradient>

          {/* Glow effect */}
          <filter id="stroke-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Active brushstrokes */}
        {activeStrokes.slice(-8).map((timestamp, index) => {
          const pathIndex = index % brushstrokePaths.length;
          const yOffset = (index * 12) % 100;
          
          return (
            <motion.g key={timestamp}>
              <motion.path
                d={brushstrokePaths[pathIndex]}
                stroke="url(#golden-stroke)"
                strokeWidth={isMobile ? "4" : "6"}
                strokeLinecap="round"
                fill="none"
                style={{ filter: 'url(#stroke-glow)' }}
                initial={{ 
                  pathLength: 0, 
                  opacity: 0,
                  y: yOffset 
                }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 1, 0.7, 0],
                  y: yOffset
                }}
                transition={{ 
                  pathLength: { duration: 2, ease: "easeInOut" },
                  opacity: { duration: 3, ease: "easeOut" }
                }}
              />
              
              {/* Brush trail sparkles */}
              {!isMobile && Array.from({ length: 3 }).map((_, i) => (
                <motion.circle
                  key={`sparkle-${timestamp}-${i}`}
                  r="2"
                  fill={colors[i % 2]}
                  initial={{ 
                    opacity: 0,
                    cx: `${10 + i * 30}%`,
                    cy: `${yOffset + 10}%`
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    cy: `${yOffset + 10 - i * 5}%`
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.g>
          );
        })}
      </svg>

      {/* Falling ink drops */}
      {!isPreview && Array.from({ length: isMobile ? 5 : 12 }).map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: `radial-gradient(circle, ${colors[i % 2]}, transparent)`,
            left: `${(i * 11 + 5) % 100}%`,
            boxShadow: `0 0 10px ${colors[i % 2]}`
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Enhancement burst stars (periodically appear) */}
      {Array.from({ length: isMobile ? 3 : 6 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${(i * 18 + 10) % 90}%`,
            top: `${(i * 23 + 15) % 80}%`
          }}
          animate={{
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              fill={colors[i % 2]}
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating paint palette orbs */}
      {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${20 + (i % 3) * 10}px`,
            height: `${20 + (i % 3) * 10}px`,
            background: `radial-gradient(circle at 30% 30%, ${colors[0]}40, ${colors[1]}20)`,
            border: `2px solid ${colors[i % 2]}30`,
            boxShadow: `inset 0 0 15px ${colors[i % 2]}40, 0 0 20px ${colors[i % 2]}20`,
            left: `${(i * 13 + 5) % 85}%`,
            top: `${(i * 17 + 10) % 75}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Artistic signature shimmer */}
      <motion.div
        className="absolute bottom-8 right-8 font-serif italic text-lg"
        style={{
          color: colors[0],
          textShadow: `0 0 10px ${colors[0]}, 0 0 20px ${colors[1]}`,
          opacity: 0.6
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✧ Master Curator ✧
      </motion.div>

      {/* Canvas edge vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${colors[1]}15 100%)`
        }}
      />
    </div>
  );
}
