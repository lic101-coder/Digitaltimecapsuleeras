import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ThemedCapsuleShowcaseProps {
  onContinue: () => void;
  onBack: () => void;
}

// Real themed capsules from Eras (ACTUAL paid themes from Store)
const themedCapsules = [
  {
    id: 1,
    themeId: 'wedding',
    ceremonyId: 'firstdance', // 'Wedding First Dance' ceremony
    emoji: '💍',
    name: 'Golden Moments',
    price: '$2.99',
    tier: 'Premium',
    tagline: 'Cinema-quality VFX for your wedding memories',
    gradient: 'from-yellow-600 via-amber-500 to-yellow-400',
    ringColor: 'border-yellow-400/30'
  },
  {
    id: 2,
    themeId: 'new_life',
    ceremonyId: 'worldtree', // 'Sunrise Symphony' ceremony  
    emoji: '👶',
    name: 'New Life',
    price: '$1.99',
    tier: 'Standard',
    tagline: 'Welcoming a new arrival with gentle beauty',
    gradient: 'from-pink-500 via-purple-400 to-pink-300',
    ringColor: 'border-pink-400/30'
  },
  {
    id: 3,
    themeId: 'career',
    ceremonyId: 'gavel', // 'Victory Podium' ceremony
    emoji: '💼',
    name: 'Career Summit',
    price: '$1.99',
    tier: 'Standard',
    tagline: 'Mark professional achievements with epic celebrations',
    gradient: 'from-blue-800 via-blue-600 to-blue-400',
    ringColor: 'border-blue-400/30'
  }
];

export function ThemedCapsuleShowcase({ onContinue }: ThemedCapsuleShowcaseProps) {
  const [selectedCapsule, setSelectedCapsule] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col items-center min-h-full px-4 md:px-12 py-6 md:py-8 overflow-y-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-12 flex-shrink-0"
      >
        <h2 className="text-2xl md:text-4xl text-white mb-2 md:mb-3">
          Themed Capsule Ceremonies
        </h2>
        <p className="text-white/60 text-xs md:text-base max-w-md px-2">
          Choose a celebration style for your capsule's opening
        </p>
      </motion.div>

      {/* Themed capsules - COMPACT 3x1 GRID FOR MOBILE */}
      <div className="w-full max-w-4xl mb-4 md:mb-8 flex-shrink-0">
        {/* Mobile: 3 horizontal cards in compact row */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          {themedCapsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onClick={() => setSelectedCapsule(selectedCapsule === capsule.id ? null : capsule.id)}
            >
              {/* Compact Mobile Card */}
              <div className={`
                relative bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10
                hover:border-white/20 transition-all duration-300 cursor-pointer
                ${selectedCapsule === capsule.id ? 'ring-2 ring-purple-400/50 border-purple-400/30' : ''}
              `}>
                {/* Icon with gradient */}
                <div className="relative mb-1.5 flex justify-center">
                  <div className={`
                    relative w-12 h-12 rounded-lg bg-gradient-to-br ${capsule.gradient}
                    flex items-center justify-center shadow-md
                  `}>
                    <span className="text-2xl">{capsule.emoji}</span>
                    
                    {/* Tier badge - smaller */}
                    <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-purple-600 rounded-full text-[8px] font-medium text-white shadow-md">
                      {capsule.tier}
                    </div>
                  </div>
                </div>

                {/* Title - smaller */}
                <h3 className="text-white font-medium text-[10px] leading-tight text-center mb-1">
                  {capsule.name}
                </h3>

                {/* Price - smaller */}
                <div className="text-emerald-400 font-bold text-xs text-center">
                  {capsule.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Original 1x3 grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {themedCapsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Card */}
              <div className={`
                relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10
                hover:border-white/20 transition-all duration-300 cursor-pointer
                ${selectedCapsule === capsule.id ? 'ring-2 ring-purple-400/50 border-purple-400/30' : ''}
              `}
                onClick={() => setSelectedCapsule(selectedCapsule === capsule.id ? null : capsule.id)}
              >
                {/* Icon with gradient background */}
                <div className="relative mb-4 flex justify-center">
                  <div className={`
                    relative w-20 h-20 rounded-2xl bg-gradient-to-br ${capsule.gradient}
                    flex items-center justify-center shadow-lg
                  `}>
                    <span className="text-5xl">{capsule.emoji}</span>
                    
                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${capsule.ringColor}`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </div>

                  {/* Tier badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-purple-600 rounded-full text-xs font-medium text-white shadow-lg">
                    {capsule.tier}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-medium mb-2 text-lg text-center">
                  {capsule.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xl mb-3">
                  {capsule.price}
                </div>

                {/* Tagline */}
                <p className="text-white/60 text-sm text-center">
                  {capsule.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explainer text - more compact on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center max-w-2xl mb-20 md:mb-8 flex-shrink-0"
      >
        <p className="text-white/50 text-xs md:text-sm mb-2 md:mb-4">
          14 unique themed capsules available • 11 in the store • Unlock magical celebrations
        </p>
        <div className="flex items-center justify-center gap-2 md:gap-4 text-[10px] md:text-xs text-white/40">
          <span>Free - $2.99</span>
          <span>•</span>
          <span>VFX ceremonies</span>
          <span>•</span>
          <span>Mix & match</span>
        </div>
      </motion.div>

      {/* Continue button - Fixed at bottom with safe area */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onContinue}
        className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 text-sm md:text-base font-semibold shadow-xl"
        style={{ 
          bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px) + 1.5rem)',
        }}
      >
        Continue →
      </motion.button>
    </div>
  );
}