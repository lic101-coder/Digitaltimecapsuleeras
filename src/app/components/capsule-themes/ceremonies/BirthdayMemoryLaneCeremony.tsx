/**
 * Birthday Memory Lane Ceremony
 * 
 * "Year in Review" - Emotional photo montage with reflective journey
 * Slower-paced, sentimental experience with vintage aesthetics
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BirthdayMemoryLaneCeremonyProps {
  capsuleTitle: string;
  media: any[];
  isPreview?: boolean;
  onComplete?: () => void;
}

export function BirthdayMemoryLaneCeremony({
  capsuleTitle,
  media,
  isPreview = false,
  onComplete
}: BirthdayMemoryLaneCeremonyProps) {
  const [stage, setStage] = useState<'intro' | 'montage' | 'wish'>('intro');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  useEffect(() => {
    const timeline = [
      { time: 2000, action: () => setStage('montage') },
      { time: 2000 + Math.min(media.length, 6) * 2000, action: () => setStage('wish') },
      { time: 2000 + Math.min(media.length, 6) * 2000 + 4000, action: () => onComplete?.() }
    ];
    
    const timeouts = timeline.map(({ time, action }) => setTimeout(action, time));
    return () => timeouts.forEach(clearTimeout);
  }, []); // Only run once on mount - don't restart ceremony midway through

  // Cycle through photos during montage
  useEffect(() => {
    if (stage !== 'montage') return;
    
    const photoCount = Math.min(media.length, 6);
    if (currentPhotoIndex >= photoCount - 1) return;
    
    const interval = setInterval(() => {
      setCurrentPhotoIndex(prev => prev + 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [stage, currentPhotoIndex, media.length]);
  
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 overflow-hidden">
      {/* Sepia overlay for vintage effect */}
      <div 
        className="absolute inset-0 mix-blend-multiply opacity-30"
        style={{
          background: 'linear-gradient(135deg, #f5deb3 0%, #daa520 100%)'
        }}
      />
      
      <AnimatePresence mode="wait">
        {/* Stage 1: Intro */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                className="text-8xl"
              >
                📸
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-serif text-amber-900 italic"
              >
                Another year of memories...
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {/* Stage 2: Photo Montage */}
        {stage === 'montage' && (
          <motion.div
            key="montage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            {/* Film strip frame border */}
            <div className="absolute inset-0 border-8 border-amber-800/30 pointer-events-none" />
            <div className="absolute top-4 bottom-4 left-4 right-4 border border-amber-900/20 pointer-events-none" />
            
            {/* Photos displayed one at a time */}
            <AnimatePresence mode="wait">
              {media.length > 0 && media.slice(0, 6).map((item, i) => {
                if (i !== currentPhotoIndex) return null;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotateY: 90 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center p-16"
                  >
                    {/* Polaroid-style frame */}
                    <div 
                      className="relative bg-white p-4 pb-16 shadow-2xl transform"
                      style={{
                        maxWidth: '600px',
                        maxHeight: '700px',
                        rotate: `${(Math.random() - 0.5) * 4}deg`
                      }}
                    >
                      <div 
                        className="w-full h-96 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.url || item.thumbnail})`
                        }}
                      />
                      
                      {/* Handwritten caption effect */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-4 left-4 right-4 text-center"
                      >
                        <p className="font-handwriting text-xl text-gray-700">
                          Memory {i + 1}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {media.slice(0, 6).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentPhotoIndex 
                      ? 'bg-amber-800 w-6' 
                      : i < currentPhotoIndex 
                      ? 'bg-amber-600' 
                      : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Stage 3: The Wish */}
        {stage === 'wish' && (
          <motion.div
            key="wish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* All photos form a heart shape (only if media exists) */}
            <div className="relative w-full h-full">
              {media.length > 0 && media.slice(0, 8).map((item, i) => {
                // Heart shape positioning
                const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const t = angle;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: `calc(50% + ${x * 20}px)`,
                      y: `calc(50% + ${y * 15}px)`
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 15,
                      delay: i * 0.1
                    }}
                  >
                    <div className="w-24 h-24 bg-white p-2 shadow-xl -translate-x-1/2 -translate-y-1/2">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${item.url || item.thumbnail})`
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Center candle and message */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 150, damping: 15 }}
              >
                <motion.div
                  className="text-7xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  🕯️
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-3xl font-serif text-amber-900 text-center px-8 italic"
                >
                  Here's to another beautiful year
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-2xl font-serif text-amber-800 text-center px-8 mt-4"
                >
                  {capsuleTitle}
                </motion.p>
              </motion.div>
              
              {/* Sparkles around the heart */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * 300}px)`,
                      top: `calc(50% + ${Math.sin(angle) * 300}px)`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: 'easeInOut'
                    }}
                  >
                    ✨
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}