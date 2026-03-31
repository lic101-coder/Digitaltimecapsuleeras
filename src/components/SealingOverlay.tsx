import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Check, Send, ShieldCheck, Heart, Star, Baby, Zap, Map, Rocket, Music, Gift, Anchor, Disc, PawPrint, Sparkles, Briefcase, Home, GraduationCap } from 'lucide-react';
import { createPortal } from 'react-dom';
import { getThemeConfig } from './capsule-themes/ThemeRegistry';

interface SealingOverlayProps {
  isVisible: boolean;
  isSuccess: boolean;
  onAnimationComplete?: () => void;
  themeId?: string;
  mode?: 'seal' | 'draft'; // New prop to distinguish between sealing and draft saving
}

interface SealingThemeConfig {
  doorType: 'vertical-metal' | 'vertical-cloud' | 'vertical-parchment' | 'horizontal-glass' | 'horizontal-wood' | 'wrapping-paper' | 'cassette-case' | 'shutter' | 'warp-drive';
  colors: {
    doorBg: string;
    doorBorder: string; // Tailwind class
    text: string; // Tailwind class
    lockIcon: string; // Tailwind class
    lockRingOuter: string; // Tailwind class
    lockRingInner: string; // Tailwind class
    successIcon: string; // Tailwind class
    successText: string; // Tailwind class
    successGlow: string; // Tailwind class
  };
  text: {
    sealing: string;
    success: string;
    topLabel?: string;
    bottomLabel?: string;
  };
  icons: {
    lock: React.ElementType;
    success: React.ElementType;
  };
  rivets?: boolean;
}

const SEALING_THEMES: Record<string, SealingThemeConfig> = {
  standard: {
    doorType: 'vertical-metal',
    colors: {
      doorBg: 'bg-slate-900',
      doorBorder: 'border-amber-500/50',
      text: 'text-slate-700',
      lockIcon: 'text-cyan-400',
      lockRingOuter: 'border-cyan-500/30',
      lockRingInner: 'border-purple-500/20',
      successIcon: 'text-green-400',
      successText: 'text-green-400',
      successGlow: 'shadow-[0_0_50px_rgba(34,197,94,0.3)]'
    },
    text: {
      sealing: 'Encrypting Memories...',
      success: 'Capsule Sealed',
      topLabel: 'Temporal Sealing Mechanism',
      bottomLabel: 'Secure Vault Access'
    },
    icons: {
      lock: Lock,
      success: ShieldCheck
    },
    rivets: true
  },
  new_life: {
    doorType: 'vertical-cloud',
    colors: {
      doorBg: 'bg-gradient-to-b from-purple-100 to-pink-100',
      doorBorder: 'border-white/50',
      text: 'text-purple-400',
      lockIcon: 'text-purple-500',
      lockRingOuter: 'border-purple-300/50',
      lockRingInner: 'border-pink-300/50',
      successIcon: 'text-purple-600',
      successText: 'text-purple-600',
      successGlow: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]'
    },
    text: {
      sealing: 'Tucking memory away...',
      success: 'Safe & Sound',
      topLabel: 'Sweet Dreams',
      bottomLabel: 'Precious Moments'
    },
    icons: {
      lock: Baby,
      success: Heart
    },
    rivets: false
  },
  wedding: {
    doorType: 'vertical-parchment',
    colors: {
      doorBg: 'bg-[#fdfbf7]',
      doorBorder: 'border-amber-400/30',
      text: 'text-amber-800/40',
      lockIcon: 'text-amber-600',
      lockRingOuter: 'border-amber-500/30',
      lockRingInner: 'border-amber-300/30',
      successIcon: 'text-amber-600',
      successText: 'text-amber-700',
      successGlow: 'shadow-[0_0_50px_rgba(217,119,6,0.2)]'
    },
    text: {
      sealing: 'Sealing your promise...',
      success: 'Vow Sealed',
      topLabel: 'Eternal Promise',
      bottomLabel: 'Golden Hour'
    },
    icons: {
      lock: Heart, // Replaced with wax seal visual in render
      success: Heart
    },
    rivets: false
  },
  birthday: {
    doorType: 'wrapping-paper',
    colors: {
      doorBg: 'bg-red-500',
      doorBorder: 'border-yellow-400',
      text: 'text-white/80',
      lockIcon: 'text-yellow-300',
      lockRingOuter: 'border-white/30',
      lockRingInner: 'border-yellow-200/30',
      successIcon: 'text-white',
      successText: 'text-yellow-200',
      successGlow: 'shadow-[0_0_50px_rgba(253,224,71,0.4)]'
    },
    text: {
      sealing: 'Wrapping surprise...',
      success: 'Ready to Gift',
      topLabel: 'Special Delivery',
      bottomLabel: 'Do Not Open'
    },
    icons: {
      lock: Gift,
      success: Star
    },
    rivets: false
  },
  anniversary: {
    doorType: 'vertical-metal', // Will style as velvet
    colors: {
      doorBg: 'bg-rose-950',
      doorBorder: 'border-rose-500/50',
      text: 'text-rose-300/50',
      lockIcon: 'text-rose-400',
      lockRingOuter: 'border-rose-500/30',
      lockRingInner: 'border-pink-400/20',
      successIcon: 'text-rose-400',
      successText: 'text-rose-300',
      successGlow: 'shadow-[0_0_50px_rgba(244,114,182,0.3)]'
    },
    text: {
      sealing: 'Preserving the flame...',
      success: 'Love Locked',
      topLabel: 'Eternal Flame',
      bottomLabel: 'Forever & Always'
    },
    icons: {
      lock: Heart,
      success: Heart
    },
    rivets: false
  },
  future: {
    doorType: 'warp-drive',
    colors: {
      doorBg: 'bg-black', // Was bg-cyan-950/80 - now pure black for space
      doorBorder: 'border-cyan-500/50',
      text: 'text-cyan-400',
      lockIcon: 'text-cyan-400',
      lockRingOuter: 'border-cyan-500/30',
      lockRingInner: 'border-cyan-500/20',
      successIcon: 'text-cyan-400',
      successText: 'text-cyan-400',
      successGlow: 'shadow-[0_0_50px_rgba(34,211,238,0.5)]'
    },
    text: {
      sealing: 'ENGAGING WARP DRIVE...',
      success: 'TRANSMISSION SENT',
      topLabel: 'TEMPORAL RELAY',
      bottomLabel: 'LINK ESTABLISHED'
    },
    icons: {
      lock: Zap,
      success: Send
    },
    rivets: false // No rivets in space
  },
  graduation: {
    doorType: 'shutter',
    colors: {
      doorBg: 'bg-slate-800',
      doorBorder: 'border-yellow-500', // Hazard stripes
      text: 'text-yellow-500',
      lockIcon: 'text-white',
      lockRingOuter: 'border-yellow-500',
      lockRingInner: 'border-black',
      successIcon: 'text-yellow-400',
      successText: 'text-yellow-400',
      successGlow: 'shadow-[0_0_50px_rgba(234,179,8,0.5)]'
    },
    text: {
      sealing: 'Securing for trajectory...',
      success: 'Ready for Launch',
      topLabel: 'Blast Shield',
      bottomLabel: 'Safety Locks Engaged'
    },
    icons: {
      lock: Rocket,
      success: Star
    },
    rivets: true
  },
  friendship: {
    doorType: 'vinyl-press',
    colors: {
      doorBg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
      doorBorder: 'border-teal-500/30',
      text: 'text-teal-300',
      lockIcon: 'text-teal-600',
      lockRingOuter: 'border-teal-400',
      lockRingInner: 'border-pink-400',
      successIcon: 'text-teal-500',
      successText: 'text-teal-600',
      successGlow: 'shadow-[0_0_50px_rgba(45,212,191,0.3)]'
    },
    text: {
      sealing: 'Pressing vinyl...',
      success: 'Mixtape Ready',
      topLabel: 'Side A',
      bottomLabel: 'Limited Edition'
    },
    icons: {
      lock: Music,
      success: Check
    },
    rivets: false
  },
  pet: {
    doorType: 'treasure-chest',
    colors: {
      doorBg: 'bg-gradient-to-br from-amber-700 via-orange-800 to-amber-900',
      doorBorder: 'border-amber-400/50',
      text: 'text-amber-300',
      lockIcon: 'text-amber-500',
      lockRingOuter: 'border-amber-400/50',
      lockRingInner: 'border-rose-400/50',
      successIcon: 'text-amber-600',
      successText: 'text-amber-700',
      successGlow: 'shadow-[0_0_50px_rgba(251,191,36,0.4)]'
    },
    text: {
      sealing: 'Closing treasure chest...',
      success: 'Forever in Our Hearts',
      topLabel: '🐾 Treasured Memories',
      bottomLabel: '🌈 Rainbow Bridge'
    },
    icons: {
      lock: PawPrint,
      success: Heart
    },
    rivets: false
  },
  travel: {
    doorType: 'horizontal-wood',
    colors: {
      doorBg: 'bg-[#5D4037]', // Leather brown
      doorBorder: 'border-[#3E2723]',
      text: 'text-orange-200/60',
      lockIcon: 'text-amber-400',
      lockRingOuter: 'border-amber-500/50',
      lockRingInner: 'border-orange-900/50',
      successIcon: 'text-amber-400',
      successText: 'text-amber-200',
      successGlow: 'shadow-[0_0_50px_rgba(251,191,36,0.3)]'
    },
    text: {
      sealing: 'Stowing away...',
      success: 'Packed & Ready',
      topLabel: 'Cargo Hold',
      bottomLabel: 'Voyage Log'
    },
    icons: {
      lock: Map,
      success: Check
    },
    rivets: true
  },
  gratitude: {
    doorType: 'vertical-parchment',
    colors: {
      doorBg: 'bg-[#FFF5F5]',
      doorBorder: 'border-red-300/30',
      text: 'text-red-800/40',
      lockIcon: 'text-red-600',
      lockRingOuter: 'border-red-500/30',
      lockRingInner: 'border-pink-400/30',
      successIcon: 'text-red-600',
      successText: 'text-red-700',
      successGlow: 'shadow-[0_0_50px_rgba(220,38,38,0.2)]'
    },
    text: {
      sealing: 'Preserving gratitude...',
      success: 'Thanks Sealed',
      topLabel: 'Grateful Heart',
      bottomLabel: 'Count Your Blessings'
    },
    icons: {
      lock: Sparkles,
      success: Heart
    },
    rivets: false
  },
  career: {
    doorType: 'horizontal-glass',
    colors: {
      doorBg: 'bg-[#1E3A8A]/80',
      doorBorder: 'border-blue-500/50',
      text: 'text-blue-400/50',
      lockIcon: 'text-blue-400',
      lockRingOuter: 'border-blue-500/30',
      lockRingInner: 'border-cyan-500/20',
      successIcon: 'text-blue-400',
      successText: 'text-blue-400',
      successGlow: 'shadow-[0_0_50px_rgba(59,130,246,0.4)]'
    },
    text: {
      sealing: 'Archiving achievement...',
      success: 'Summit Reached',
      topLabel: 'Professional Vault',
      bottomLabel: 'Career Milestone Secured'
    },
    icons: {
      lock: Briefcase,
      success: Star
    },
    rivets: true
  },
  new_year: {
    doorType: 'wrapping-paper',
    colors: {
      doorBg: 'bg-purple-600',
      doorBorder: 'border-yellow-400',
      text: 'text-white/80',
      lockIcon: 'text-yellow-300',
      lockRingOuter: 'border-white/30',
      lockRingInner: 'border-purple-300/30',
      successIcon: 'text-yellow-300',
      successText: 'text-yellow-200',
      successGlow: 'shadow-[0_0_50px_rgba(253,224,71,0.5)]'
    },
    text: {
      sealing: 'Setting resolutions...',
      success: 'New Year Sealed',
      topLabel: 'Countdown Active',
      bottomLabel: 'Auld Lang Syne'
    },
    icons: {
      lock: Sparkles,
      success: Star
    },
    rivets: false
  },
  new_home: {
    doorType: 'vertical-metal',
    colors: {
      doorBg: 'bg-[#059669]',
      doorBorder: 'border-emerald-400/50',
      text: 'text-emerald-200/50',
      lockIcon: 'text-emerald-300',
      lockRingOuter: 'border-emerald-400/30',
      lockRingInner: 'border-green-300/20',
      successIcon: 'text-emerald-300',
      successText: 'text-emerald-200',
      successGlow: 'shadow-[0_0_50px_rgba(16,185,129,0.3)]'
    },
    text: {
      sealing: 'Locking the door...',
      success: 'Home Sweet Home',
      topLabel: 'New Nest',
      bottomLabel: 'Keys Secured'
    },
    icons: {
      lock: Home,
      success: Heart
    },
    rivets: true
  },
  first_day: {
    doorType: 'shutter',
    colors: {
      doorBg: 'bg-orange-700',
      doorBorder: 'border-orange-400',
      text: 'text-orange-200',
      lockIcon: 'text-white',
      lockRingOuter: 'border-orange-400',
      lockRingInner: 'border-yellow-300',
      successIcon: 'text-orange-300',
      successText: 'text-orange-200',
      successGlow: 'shadow-[0_0_50px_rgba(234,88,12,0.4)]'
    },
    text: {
      sealing: 'Bell is ringing...',
      success: 'Adventure Begins',
      topLabel: 'First Day',
      bottomLabel: 'Fresh Start Locked'
    },
    icons: {
      lock: GraduationCap,
      success: Star
    },
    rivets: true
  }
};

export function SealingOverlay({ isVisible, isSuccess, onAnimationComplete, themeId = 'standard', mode = 'seal' }: SealingOverlayProps) {
  const [stage, setStage] = useState<'idle' | 'closing' | 'locking' | 'launching'>('idle');
  let theme = SEALING_THEMES[themeId] || SEALING_THEMES.standard;
  const config = getThemeConfig(themeId); // Get full config for audio/haptics

  // Audio refs
  const audioRefs = useRef<{ sealing?: HTMLAudioElement; lock?: HTMLAudioElement }>({});

  // Override theme for draft mode with purple/blue colors
  if (mode === 'draft') {
    theme = {
      ...theme,
      colors: {
        ...theme.colors,
        lockIcon: 'text-purple-400',
        lockRingOuter: 'border-purple-500/30',
        lockRingInner: 'border-blue-500/20',
        successIcon: 'text-blue-400',
        successText: 'text-blue-400',
        successGlow: 'shadow-[0_0_50px_rgba(96,165,250,0.4)]'
      },
      text: {
        ...theme.text,
        sealing: 'Saving Draft...',
        success: 'Draft Saved!'
      }
    };
  }

  // Preload audio
  useEffect(() => {
    if (config.audio?.sealing) {
      const audio = new Audio(config.audio.sealing);
      audio.volume = 0.5;
      audioRefs.current.sealing = audio;
    }
    // Specific lock sound if available or use interaction sound
    if (config.audio?.interaction) {
        const audio = new Audio(config.audio.interaction);
        audio.volume = 0.3;
        audioRefs.current.lock = audio;
    }
  }, [config.audio]);

  useEffect(() => {
    if (isVisible && stage === 'idle') {
      setStage('closing');
      
      // Play sealing sound
      if (audioRefs.current.sealing) {
        audioRefs.current.sealing.currentTime = 0;
        audioRefs.current.sealing.play().catch(e => console.log('Audio play failed', e));
      }

      // Haptics start
      if (navigator.vibrate && config.haptics?.sealing) {
          navigator.vibrate(config.haptics.sealing[0] || 50);
      }
      
      // Lock scroll to keep animation in view
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    }
    
    // Reset stage when overlay closes
    if (!isVisible && stage !== 'idle') {
      setStage('idle');
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (!isVisible) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
      }
    };
  }, [isVisible, stage]);

  useEffect(() => {
    if (isSuccess && stage === 'locking') {
      const timer = setTimeout(() => {
        setStage('launching');
        // Play success sound/vibrate
        if (navigator.vibrate && config.haptics?.opening) { // Use opening pattern for success launch
             navigator.vibrate(config.haptics.opening);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, stage, config.haptics]);

  // Special handling for warp-drive: transition from closing to locking after animation starts
  useEffect(() => {
    if (themeId === 'future' && stage === 'closing') {
      const timer = setTimeout(() => {
        setStage('locking');
      }, 1000); // Wait 1 second for the "INITIATING JUMP" message to show
      return () => {
        clearTimeout(timer);
      };
    }
  }, [stage, themeId]);

  const handleDoorsClosed = () => {
    if (stage === 'closing') {
      setStage('locking');
    }
  };

  const handleLaunchComplete = () => {
    if (stage === 'launching' && onAnimationComplete) {
      setTimeout(onAnimationComplete, 1000);
    }
  };

  if (!isVisible) return null;

  const renderDoors = () => {
    // 1. Cloud Doors (New Life) - ENHANCED
    if (theme.doorType === 'vertical-cloud') {
      return (
        <>
          {/* Twinkling Stars - Background Layer */}
          {stage !== 'idle' && [...Array(30)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-300"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 8}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Baby Mobile - Rotating Above Center */}
          {stage !== 'idle' && (
            <motion.div
              className="absolute top-[30%] left-1/2 -translate-x-1/2 z-[15]"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Mobile arm */}
              <div className="relative w-32 h-32">
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={`mobile-${i}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-40px)`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    {i === 0 ? '🌙' : i === 1 ? '⭐' : i === 2 ? '☁️' : '💫'}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Music Box Visual - Center Bottom */}
          {stage === 'locking' && (
            <motion.div
              className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-[15]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              <motion.div
                className="relative w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg border-4 border-purple-400/50 shadow-xl"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Music notes */}
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
                  animate={{
                    y: [-20, -40],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  🎵
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Cradle Rocking Motion - Applied to Center Area */}
          {stage === 'locking' && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl z-[15]"
              animate={{
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🛏️
            </motion.div>
          )}

          {/* Top Cloud Door */}
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: stage === 'idle' ? '-100%' : '0%', opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 60 }}
            onAnimationComplete={handleDoorsClosed}
            className="absolute top-0 left-0 right-0 h-[55%] z-10 flex items-end justify-center pb-8"
            style={{ 
              background: 'linear-gradient(to bottom, #f3e8ff 0%, #fbc2eb 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          >
            <div className="absolute bottom-0 w-full h-16 bg-[url('https://api.iconify.design/bi:cloud-fill.svg?color=%23fbc2eb')] bg-repeat-x bg-[length:64px_64px] opacity-50 translate-y-1/2"></div>
            <div className={`font-serif text-sm tracking-widest uppercase ${theme.colors.text} mb-12`}>
              {theme.text.topLabel}
            </div>
          </motion.div>

          {/* Bottom Cloud Door */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: stage === 'idle' ? '100%' : '0%', opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 60 }}
            className="absolute bottom-0 left-0 right-0 h-[55%] z-10 flex items-start justify-center pt-8"
            style={{ 
              background: 'linear-gradient(to top, #f3e8ff 0%, #a18cd1 100%)',
              maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
            }}
          >
             <div className={`font-serif text-sm tracking-widest uppercase ${theme.colors.text} mt-12`}>
              {theme.text.bottomLabel}
            </div>
          </motion.div>
        </>
      );
    }

    // 2. Parchment Doors (Wedding / Gratitude)
    if (theme.doorType === 'vertical-parchment') {
      return (
        <>
          {/* Gratitude Special Effects */}
          {themeId === 'gratitude' && stage !== 'idle' && (
            <>
              {/* Thank You Card Folding Sequence */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
                initial={{ scaleX: 1, opacity: 1 }}
                animate={{
                  scaleX: [1, 0.1, 1],
                  rotateY: [0, 90, 0]
                }}
                transition={{ duration: 2, times: [0, 0.5, 1] }}
              >
                <div className="w-64 h-40 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-lg shadow-2xl border-4 border-orange-300 dark:border-orange-700 flex items-center justify-center">
                  <div className="text-4xl font-serif text-orange-700 dark:text-orange-300">Thank You</div>
                </div>
              </motion.div>

              {/* Envelope Sealing with Heart Sticker */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <div className="relative">
                  {/* Envelope */}
                  <div className="w-80 h-56 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-lg shadow-2xl" />
                  
                  {/* Envelope Flap */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-amber-300 to-orange-300 dark:from-amber-700 dark:to-orange-700"
                    style={{
                      clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
                      transformOrigin: 'top'
                    }}
                    initial={{ rotateX: -180 }}
                    animate={{ rotateX: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  />
                  
                  {/* Heart Wax Seal Sticker */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-5xl shadow-xl border-4 border-red-900"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 2.5, duration: 0.5, type: 'spring' }}
                  >
                    💛
                  </motion.div>
                </div>
              </motion.div>

              {/* Warm Golden Glow Radiating */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-25"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 2, 3],
                  opacity: [0.8, 0.4, 0]
                }}
                transition={{ duration: 3, delay: 1 }}
              >
                <div 
                  className="w-96 h-96 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(249, 115, 22, 0.3) 50%, transparent 70%)',
                    boxShadow: '0 0 100px rgba(251, 191, 36, 0.8)'
                  }}
                />
              </motion.div>

              {/* "With Gratitude" in Elegant Script */}
              <motion.div
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0, 1.2, 1],
                  y: [50, 0, 0]
                }}
                transition={{ delay: 2.5, duration: 1, ease: 'easeOut' }}
              >
                <div 
                  className="font-serif italic text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 1))',
                    textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.5)'
                  }}
                >
                  With Gratitude
                </div>
              </motion.div>

              {/* Grateful Hearts Floating Like Lanterns */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`lantern-${i}`}
                  className="absolute text-4xl pointer-events-none z-30"
                  style={{
                    left: `${10 + i * 8}%`,
                    bottom: '-10%',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.3],
                    opacity: [0, 0.8, 1, 0.8, 0],
                    scale: [0.8, 1, 1.2, 1, 0.8],
                  }}
                  transition={{
                    duration: 6 + i * 0.3,
                    delay: 1.5 + i * 0.2,
                    ease: 'easeOut'
                  }}
                >
                  💛
                </motion.div>
              ))}

              {/* Autumn Leaves Floating */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`leaf-${i}`}
                  className="absolute text-3xl pointer-events-none z-28"
                  style={{
                    left: `${5 + i * 12}%`,
                    top: '-5%',
                  }}
                  animate={{
                    y: ['0vh', '105vh'],
                    x: [0, Math.sin(i * 2) * 50, Math.cos(i * 2) * 50],
                    rotate: [0, 360 * (i % 2 ? 1 : -1)],
                  }}
                  transition={{
                    duration: 5 + i * 0.5,
                    delay: 0.5 + i * 0.2,
                    ease: 'linear'
                  }}
                >
                  {i % 2 === 0 ? '🍂' : '🍁'}
                </motion.div>
              ))}
            </>
          )}

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: stage === 'idle' ? '-100%' : '0%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
            onAnimationComplete={handleDoorsClosed}
            className={`absolute top-0 bottom-0 left-0 w-1/2 ${theme.colors.doorBg} border-r ${theme.colors.doorBorder} z-10 flex items-center justify-end pr-4 shadow-xl`}
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
          >
            <div className={`rotate-90 origin-right ${theme.colors.text} font-serif tracking-widest uppercase text-xs absolute right-8 top-1/2 -translate-y-1/2`}>
              {theme.text.topLabel}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: stage === 'idle' ? '100%' : '0%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
            className={`absolute top-0 bottom-0 right-0 w-1/2 ${theme.colors.doorBg} border-l ${theme.colors.doorBorder} z-10 flex items-center justify-start pl-4 shadow-xl`}
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
          >
          </motion.div>
        </>
      );
    }

    // 3. Wrapping Paper (Birthday)
    if (theme.doorType === 'wrapping-paper') {
       return (
        <>
          {/* Birthday Special Effects */}
          {themeId === 'birthday' && stage !== 'idle' && (
            <>
              {/* Confetti Cannon Explosion */}
              {Array.from({ length: 50 }).map((_, i) => {
                const angle = (Math.random() * Math.PI * 2);
                const velocity = 150 + Math.random() * 150;
                
                return (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute text-2xl pointer-events-none z-30"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ 
                      x: 0,
                      y: 0,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{
                      x: Math.cos(angle) * velocity,
                      y: Math.sin(angle) * velocity - 100,
                      opacity: [1, 1, 0],
                      rotate: [0, Math.random() * 720],
                      scale: [1, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.3 + i * 0.02,
                      ease: 'easeOut'
                    }}
                  >
                    {['🎊', '🎉', '🎈', '✨', '⭐'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                );
              })}

              {/* Birthday Candles Blow Out Animation */}
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-35 flex gap-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <div key={`candle-${i}`} className="relative">
                    {/* Candle */}
                    <div className="w-4 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-sm" />
                    {/* Flame */}
                    <motion.div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                        delay: i * 0.1
                      }}
                    >
                      🔥
                    </motion.div>
                    {/* Smoke after blow */}
                    <motion.div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 0.8, 0], y: [0, -30] }}
                      transition={{ duration: 2, delay: 1.5 + i * 0.1 }}
                    >
                      💨
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              {/* Gift Ribbon Untying then Re-tying */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 z-40 pointer-events-none"
                initial={{ scaleY: 1, rotate: 0 }}
                animate={{
                  scaleY: [1, 0.5, 1.2, 1],
                  rotate: [0, 180, 360, 720],
                  y: [0, -20, 20, 0]
                }}
                transition={{ duration: 3, times: [0, 0.3, 0.6, 1] }}
              >
                <div className="text-8xl">🎀</div>
              </motion.div>

              {/* "SURPRISE!" Text Reveal with Party Horn */}
              <motion.div
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  scale: [0, 1.5, 1],
                  rotate: [- 45, 10, -10, 0]
                }}
                transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 0.5, delay: 2, repeat: 2 }}
                  >
                    📯
                  </motion.div>
                  <div 
                    className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 1))',
                      textShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5)'
                    }}
                  >
                    SURPRISE!
                  </div>
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: [0, -20, 20, 0] }}
                    transition={{ duration: 0.5, delay: 2, repeat: 2 }}
                  >
                    📯
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Balloons */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`balloon-${i}`}
                  className="absolute text-5xl pointer-events-none z-25"
                  style={{
                    left: `${10 + i * 10}%`,
                    bottom: '-10%',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.2],
                    x: [0, Math.sin(i * 2) * 40],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.3,
                    delay: 1 + i * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  🎈
                </motion.div>
              ))}
            </>
          )}

          {/* New Year Special Effects */}
          {themeId === 'new_year' && stage !== 'idle' && (
            <>
              {/* 3-2-1 Countdown */}
              <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-40 text-9xl font-bold text-white" style={{ textShadow: '0 0 40px rgba(147, 51, 234, 1), 0 0 80px rgba(245, 158, 11, 0.8)' }}><motion.span animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 1, times: [0, 0.1, 0.9, 1] }}>3</motion.span><motion.span animate={{ opacity: [0, 0, 0, 1, 1, 0] }} transition={{ duration: 1, delay: 1, times: [0, 0.1, 0.2, 0.3, 0.9, 1] }} className="absolute left-0">2</motion.span><motion.span animate={{ opacity: [0, 0, 0, 0, 0, 1, 1, 0] }} transition={{ duration: 1, delay: 2, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.9, 1] }} className="absolute left-0">1</motion.span></motion.div>
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35 text-8xl" animate={{ opacity: [0, 0, 0, 1, 1, 0], scale: [1, 1, 1, 1.5, 2, 0], y: [0, 0, 0, -200, -300, -400], rotate: [0, 0, 0, 360, 720, 1080] }} transition={{ duration: 2.5, delay: 2.5, times: [0, 0.4, 0.5, 0.7, 0.9, 1] }}>🍾</motion.div>
              {Array.from({ length: 40 }).map((_, i) => { const colors = ['#9333EA', '#F59E0B', '#EC4899', '#3B82F6', '#10B981']; return <motion.div key={`firework-${i}`} className="absolute pointer-events-none z-30" style={{ left: `${30 + (i % 5) * 10}%`, top: `${20 + Math.floor(i / 8) * 15}%` }} animate={{ x: Math.cos((Math.random() * Math.PI * 2)) * (150 + Math.random() * 200), y: Math.sin((Math.random() * Math.PI * 2)) * (150 + Math.random() * 200), opacity: [0, 1, 1, 0], scale: [0, 1, 1.2, 0] }} transition={{ duration: 2, delay: 3 + (i % 8) * 0.15, ease: 'easeOut' }}><div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[i % colors.length], boxShadow: `0 0 20px ${colors[i % colors.length]}` }} /></motion.div>; })}
              {Array.from({ length: 20 }).map((_, i) => <motion.div key={`sparkler-${i}`} className="absolute text-3xl pointer-events-none z-32" style={{ left: `${5 + i * 5}%`, top: `${Math.random() * 100}%` }} animate={{ y: [0, -100 - Math.random() * 100], opacity: [0, 1, 1, 0], rotate: [0, 360 * (i % 2 ? 1 : -1)], scale: [0.5, 1.5, 1, 0] }} transition={{ duration: 2, delay: 3 + i * 0.1, ease: 'easeOut' }}>✨</motion.div>)}
              <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 0, 0, 1, 1], scale: [0, 0, 0, 0, 1.3, 1] }} transition={{ delay: 3.5, duration: 1.5, times: [0, 0.3, 0.5, 0.7, 0.85, 1], ease: 'easeOut' }}><div className="flex items-center gap-3"><motion.div className="text-5xl" animate={{ rotate: [0, -20, 20, -20, 0] }} transition={{ duration: 1, delay: 4.5, repeat: 2 }}>🥂</motion.div><div className="font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-amber-300" style={{ filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 1))', textShadow: '0 0 40px rgba(147, 51, 234, 0.9), 0 0 80px rgba(245, 158, 11, 0.6)' }}>Cheers to the Future!</div><motion.div className="text-5xl" animate={{ rotate: [0, 20, -20, 20, 0] }} transition={{ duration: 1, delay: 4.5, repeat: 2 }}>🍾</motion.div></div></motion.div>
            </>
          )}

          {/* Wedding Special Effects */}
          {themeId === 'wedding' && stage !== 'idle' && (
            <>
              {/* Wax Seal Stamping Animation */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40" animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360], opacity: [0, 1, 1] }} transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}><div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-4 border-amber-600 flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 0 40px rgba(185, 28, 28, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.5)' }}><div className="text-5xl">💍</div></div></motion.div>
              {/* Golden Light Rays */}
              {Array.from({ length: 12 }).map((_, i) => { const angle = (i / 12) * Math.PI * 2; return <motion.div key={`ray-${i}`} className="absolute top-1/2 left-1/2 pointer-events-none z-25" style={{ width: '2px', height: '300px', background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.8), transparent)', transformOrigin: 'top', transform: `rotate(${angle}rad)` }} animate={{ opacity: [0, 1, 0.5], scaleY: [0, 1, 1] }} transition={{ duration: 2, delay: 1.5 + i * 0.1, ease: 'easeOut' }} />; })}
              {/* Rose Petals Falling */}
              {Array.from({ length: 30 }).map((_, i) => <motion.div key={`petal-${i}`} className="absolute text-3xl pointer-events-none z-30" style={{ left: `${Math.random() * 100}%`, top: '-5%' }} animate={{ y: ['0vh', '105vh'], x: [0, Math.sin(i * 2) * 50], rotate: [0, 360 * (i % 2 ? 1 : -1)], opacity: [0, 0.8, 0.8, 0] }} transition={{ duration: 4 + Math.random() * 3, delay: 1 + i * 0.1, ease: 'linear' }}>🌹</motion.div>)}
              {/* Wedding Bells Chime Visual */}
              {[0, 1].map((i) => <motion.div key={`bell-${i}`} className="absolute pointer-events-none z-35 text-6xl" style={{ left: `${35 + i * 30}%`, top: '20%' }} animate={{ rotate: [0, -15, 15, -15, 15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, delay: 2 + i * 0.3, ease: 'easeInOut' }}>🔔</motion.div>)}
              {/* Sound Waves from Bells */}
              {[0, 1].map((i) => <React.Fragment key={`waves-${i}`}>{[0, 1, 2].map((w) => <motion.div key={`wave-${i}-${w}`} className="absolute pointer-events-none z-34 rounded-full border-2 border-amber-400" style={{ left: `${35 + i * 30}%`, top: '20%', width: '60px', height: '60px' }} animate={{ scale: [1, 3, 3], opacity: [0.8, 0.4, 0] }} transition={{ duration: 1.5, delay: 2 + i * 0.3 + w * 0.4, ease: 'easeOut' }} />)}</React.Fragment>)}
              {/* "Sealed with Love" Medallion */}
              <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.2, 1], rotate: [0, 0, 360, 360] }} transition={{ delay: 3, duration: 1.5, times: [0, 0.5, 0.8, 1], ease: 'easeOut' }}><div className="flex flex-col items-center gap-2"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-900 border-4 border-amber-500 flex items-center justify-center shadow-2xl" style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)' }}><div className="text-4xl">💕</div></div><div className="font-serif italic text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300" style={{ filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 1))', textShadow: '0 0 30px rgba(251, 191, 36, 0.9)' }}>Sealed with Love</div></div></motion.div>
            </>
          )}

          {/* New Home Special Effects */}
          {themeId === 'new_home' && stage !== 'idle' && (
            <>
              {/* Front Door Visual */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96 bg-gradient-to-br from-amber-800 to-amber-900 border-4 border-amber-600 rounded-lg pointer-events-none z-35 flex flex-col items-center justify-center" style={{ boxShadow: '0 0 60px rgba(217, 119, 6, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.3)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }} transition={{ duration: 1.5, ease: 'easeOut' }}><motion.div className="absolute top-1/2 right-8 w-16 h-4 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full shadow-lg" animate={{ rotate: [0, 0, 0, 90, 90] }} transition={{ duration: 2, delay: 1.5, times: [0, 0.5, 0.7, 0.9, 1] }} /><motion.div className="absolute top-32 text-5xl" animate={{ y: [0, 10, 0] }} transition={{ duration: 0.3, delay: 2, repeat: 3 }}>🚪</motion.div><motion.div className="absolute bottom-20 text-4xl" animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 360] }} transition={{ duration: 0.5, delay: 2.5 }}>🔒</motion.div></motion.div>
              {/* Keys Jingling */}
              {Array.from({ length: 8 }).map((_, i) => <motion.div key={`key-${i}`} className="absolute text-4xl pointer-events-none z-30" style={{ left: `${30 + i * 10}%`, top: '-5%' }} animate={{ y: ['0vh', '50vh'], rotate: [0, 720 * (i % 2 ? 1 : -1)], x: [0, (Math.random() - 0.5) * 50], opacity: [0, 1, 1, 0] }} transition={{ duration: 2, delay: 1 + i * 0.1, ease: 'easeOut' }}>🔑</motion.div>)}
              {/* Welcome Mat */}
              <motion.div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-35" initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1] }} transition={{ duration: 1, delay: 2.5, ease: 'easeOut' }}><div className="w-48 h-24 bg-gradient-to-br from-red-800 to-red-900 border-4 border-amber-600 rounded flex items-center justify-center shadow-2xl"><div className="text-lg font-bold text-amber-200">WELCOME</div></div></motion.div>
              {/* Home Sweet Home Sign */}
              <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.2, 1], rotate: [0, 0, -5, 0] }} transition={{ delay: 3, duration: 1.5, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}><div className="bg-gradient-to-br from-blue-100 to-slate-200 border-4 border-amber-500 rounded-lg px-8 py-4 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)' }}><div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-600 to-amber-600" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }}>🏠 Home Sweet Home 🏠</div></div></motion.div>
              {/* Moving Boxes */}
              {[0, 1, 2, 3].map((i) => <motion.div key={`box-${i}`} className="absolute text-5xl pointer-events-none z-28" style={{ left: `${15 + i * 25}%`, bottom: '10%' }} animate={{ y: [100, 0], rotate: [15 * (i % 2 ? 1 : -1), 0], opacity: [0, 1] }} transition={{ duration: 0.8, delay: 1.5 + i * 0.2, ease: 'easeOut' }}>📦</motion.div>)}
              {/* Houses Floating */}
              {[...Array(4)].map((_, i) => <motion.div key={`house-${i}`} className="absolute text-6xl pointer-events-none z-29" style={{ left: `${20 + i * 20}%`, bottom: '-10%' }} animate={{ y: [0, -window.innerHeight * 0.3], opacity: [0, 0.7, 0.7, 0], scale: [0.5, 1.2, 1.2, 0.8] }} transition={{ duration: 3, delay: 2 + i * 0.3, ease: 'easeOut' }}>🏡</motion.div>)}
            </>
          )}

          {/* Travel Special Effects */}
          {themeId === 'travel' && stage !== 'idle' && (
            <>
              {/* Suitcase Latches Clicking Shut */}
              {[0, 1].map((i) => <motion.div key={`latch-${i}`} className="absolute top-1/2 pointer-events-none z-35" style={{ left: i === 0 ? '25%' : '75%', transform: 'translateY(-50%)' }} animate={{ scale: [1, 0.8, 1.2, 1], rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, delay: 1.5 + i * 0.2 }}><div className="w-12 h-16 bg-gradient-to-br from-yellow-600 to-yellow-800 border-2 border-amber-900 rounded flex items-center justify-center shadow-lg" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }}><div className="text-2xl">🔒</div></div></motion.div>)}
              {/* Leather Straps Tightening */}
              {[0, 1, 2].map((i) => <motion.div key={`strap-${i}`} className="absolute left-0 right-0 h-8 bg-gradient-to-r from-amber-800 via-amber-900 to-amber-800 border-y-2 border-amber-950 pointer-events-none z-34 shadow-lg" style={{ top: `${30 + i * 20}%` }} initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1.1, 1] }} transition={{ duration: 0.8, delay: 1 + i * 0.2, ease: 'easeOut' }}><div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-700 border-2 border-amber-950 rounded" /></motion.div>)}
              {/* Destination Stamps */}
              {['🛂', '🛃', '🛄', '🛅'].map((stamp, i) => <motion.div key={`stamp-${i}`} className="absolute text-5xl pointer-events-none z-36 transform" style={{ left: `${20 + i * 20}%`, top: `${20 + (i % 2) * 15}%`, rotate: `${(i % 2 ? 1 : -1) * 15}deg` }} animate={{ opacity: [0, 1], scale: [0, 1.3, 1] }} transition={{ duration: 0.4, delay: 2 + i * 0.2 }}>{stamp}</motion.div>)}
              {/* Passport Stamps */}
              {Array.from({ length: 6 }).map((_, i) => <motion.div key={`passport-${i}`} className="absolute text-4xl pointer-events-none z-35 opacity-60" style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, transform: `rotate(${Math.random() * 60 - 30}deg)` }} animate={{ opacity: [0, 0.6], scale: [0, 1] }} transition={{ duration: 0.3, delay: 2.5 + i * 0.15 }}>🛂</motion.div>)}
              {/* Plane Trail */}
              <motion.div className="absolute top-1/4 pointer-events-none z-37" animate={{ left: ['-10%', '110%'] }} transition={{ duration: 3, delay: 3, ease: 'linear' }}><div className="text-6xl">✈️</div><svg className="absolute top-1/2 right-full -translate-y-1/2 w-64 h-2"><motion.line x1="0" y1="1" x2="256" y2="1" stroke="rgba(251, 191, 36, 0.6)" strokeWidth="2" strokeDasharray="8 4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 3 }} /></svg></motion.div>
              {/* Bon Voyage! */}
              <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.3, 1], rotate: [0, 0, -5, 0] }} transition={{ delay: 3.5, duration: 1.5, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}><div className="bg-gradient-to-br from-amber-100 to-orange-200 border-4 border-amber-600 rounded-lg px-8 py-4 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.8)' }}><div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 italic" style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))', fontFamily: 'cursive' }}>Bon Voyage!</div></div></motion.div>
              {/* Globes Spinning */}
              {[...Array(5)].map((_, i) => <motion.div key={`globe-${i}`} className="absolute text-5xl pointer-events-none z-30" style={{ left: `${15 + i * 18}%`, top: `${60 + (i % 2) * 20}%` }} animate={{ rotate: [0, 360], scale: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }} transition={{ duration: 2, delay: 2 + i * 0.3, ease: 'easeOut' }}>🌍</motion.div>)}
            </>
          )}

          {/* Career Special Effects */}
          {themeId === 'career' && stage !== 'idle' && (
            <>
              {/* Elevator Ascending Animation */}
              <motion.div className="absolute left-1/2 -translate-x-1/2 w-64 h-full pointer-events-none z-35" animate={{ y: ['100%', '0%', '-100%'] }} transition={{ duration: 4, delay: 0.5, ease: 'easeInOut' }}><div className="w-full h-64 bg-gradient-to-br from-blue-100 to-slate-200 dark:from-blue-900 dark:to-slate-800 border-4 border-blue-400 dark:border-blue-600 rounded-lg flex flex-col items-center justify-center shadow-2xl" style={{ backdropFilter: 'blur(10px)' }}><div className="text-6xl mb-2">💼</div><div className="text-2xl font-bold text-blue-900 dark:text-blue-100">GOING UP!</div><div className="flex gap-1 mt-4">{[...Array(10)].map((_, i) => <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-500" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }} />)}</div></div></motion.div>
              {/* Trophy Case Closing with Achievement Badges */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 pointer-events-none z-36" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1] }} transition={{ delay: 2, duration: 1 }}><div className="w-full h-full bg-gradient-to-br from-slate-200 to-gray-300 dark:from-slate-800 dark:to-gray-900 border-4 border-blue-500 rounded-lg shadow-2xl relative" style={{ backdropFilter: 'blur(10px)' }}><div className="absolute inset-4 grid grid-cols-3 gap-2">{['🏆', '⭐', '💎', '🎯', '📊', '💼'].map((badge, i) => <motion.div key={i} className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center text-4xl border-2 border-yellow-300 shadow-lg" animate={{ scale: [0, 1.2, 1], rotate: [0, 360, 360] }} transition={{ delay: 2.5 + i * 0.1, duration: 0.5 }}>{badge}</motion.div>)}</div><motion.div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-gray-900/90 rounded-lg" animate={{ scaleY: [0, 1] }} transition={{ delay: 3.5, duration: 0.8 }} style={{ transformOrigin: 'top' }} /></div></motion.div>
              {/* Champagne Toast Clink */}
              {[0, 1].map((i) => <motion.div key={`champagne-${i}`} className="absolute text-6xl pointer-events-none z-37" style={{ left: i === 0 ? '35%' : '60%', top: '30%' }} animate={{ rotate: [0, 0, i === 0 ? -15 : 15, 0], x: [0, 0, i === 0 ? 20 : -20, 0] }} transition={{ duration: 0.8, delay: 4, times: [0, 0.3, 0.5, 0.8] }}>🥂</motion.div>)}
              {/* Clink Effect */}
              <motion.div className="absolute left-1/2 top-1/4 -translate-x-1/2 pointer-events-none z-38" animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }} transition={{ delay: 4.3, duration: 0.5 }}><div className="text-4xl">✨</div></motion.div>
              {/* Success Confetti */}
              {Array.from({ length: 30 }).map((_, i) => <motion.div key={`confetti-${i}`} className="absolute text-2xl pointer-events-none z-33" style={{ left: `${Math.random() * 100}%`, top: '0%' }} animate={{ y: ['0vh', '105vh'], rotate: [0, Math.random() * 360], opacity: [0, 1, 1, 0] }} transition={{ duration: 3 + Math.random() * 2, delay: 3 + Math.random() * 0.5, ease: 'linear' }}>🎉</motion.div>)}
              {/* "Success Archived" Text */}
              <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.2, 1] }} transition={{ delay: 4.5, duration: 1.5, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}><div className="bg-gradient-to-br from-blue-100 to-slate-200 dark:from-blue-900 dark:to-slate-800 border-4 border-blue-500 rounded-lg px-10 py-6 shadow-2xl" style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)', backdropFilter: 'blur(10px)' }}><div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-600 to-gray-700" style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Success Archived</div></div></motion.div>
              {/* Rising Achievement Icons */}
              {['💼', '📊', '🎯', '📈', '⭐'].map((icon, i) => <motion.div key={`rise-${i}`} className="absolute text-5xl pointer-events-none z-32" style={{ left: `${20 + i * 15}%`, bottom: '0%' }} animate={{ y: [0, -window.innerHeight * 0.4], opacity: [0, 0.8, 0.8, 0], rotate: [0, 360] }} transition={{ duration: 3, delay: 3 + i * 0.2, ease: 'easeOut' }}>{icon}</motion.div>)}
            </>
          )}

          {/* First Day Special Effects */}
          {themeId === 'first_day' && stage !== 'idle' && (
            <>
              {/* School Locker Metal Frame */}
              <div className="absolute inset-0 pointer-events-none z-30"><div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-600 to-gray-800 shadow-lg" /><div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg" /></div>
              {/* Locker Vents */}
              {[...Array(8)].map((_, i) => <div key={`vent-${i}`} className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 pointer-events-none z-31" style={{ top: `${15 + i * 10}%` }} />)}
              {/* Combination Lock Spinning */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-37" initial={{ scale: 1 }} animate={{ rotate: [0, 360, 720, 1080], scale: [1, 1.2, 1, 0.8] }} transition={{ duration: 3, delay: 1, ease: 'easeOut' }}><div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-orange-400 flex items-center justify-center shadow-2xl relative"><div className="absolute inset-2 rounded-full border-2 border-orange-300" /><motion.div className="text-6xl" animate={{ rotate: [0, -360, -720, -1080] }} transition={{ duration: 3, delay: 1, ease: 'easeOut' }}>🔐</motion.div><div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 bg-orange-400" /></div></motion.div>
              {/* Lock Click Sound Wave */}
              {[...Array(3)].map((_, i) => <motion.div key={`wave-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-orange-400 rounded-full pointer-events-none z-36" style={{ width: '100px', height: '100px' }} animate={{ scale: [1, 3], opacity: [0.8, 0] }} transition={{ duration: 1, delay: 4 + i * 0.3, ease: 'easeOut' }} />)}
              {/* Gold Star Stickers Appearing */}
              {[...Array(12)].map((_, i) => <motion.div key={`sticker-${i}`} className="absolute text-5xl pointer-events-none z-38" style={{ left: `${10 + (i % 4) * 25}%`, top: `${15 + Math.floor(i / 4) * 25}%`, transform: `rotate(${Math.random() * 60 - 30}deg)` }} animate={{ opacity: [0, 1], scale: [0, 1.3, 1] }} transition={{ duration: 0.4, delay: 2 + i * 0.15 }}>⭐</motion.div>)}
              {/* School Items Floating */}
              {['📚', '✏️', '📐', '🎨', '📝', '🔔', '🎒'].map((icon, i) => <motion.div key={`float-${i}`} className="absolute text-4xl pointer-events-none z-33" style={{ left: `${15 + i * 12}%`, bottom: '0%' }} animate={{ y: [0, -window.innerHeight * 0.35], opacity: [0, 0.8, 0.8, 0], rotate: [0, 360] }} transition={{ duration: 2.5, delay: 2.5 + i * 0.2, ease: 'easeOut' }}>{icon}</motion.div>)}
              {/* Notebook Paper Flying */}
              {[...Array(10)].map((_, i) => <motion.div key={`paper-${i}`} className="absolute w-12 h-16 bg-white border-l-2 border-red-400 pointer-events-none z-34 shadow-lg" style={{ left: `${Math.random() * 100}%`, top: '0%', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(249, 115, 22, 0.3) 7px, rgba(249, 115, 22, 0.3) 8px)' }} animate={{ y: ['0vh', '110vh'], rotate: [Math.random() * 360, Math.random() * 360 + 360], opacity: [0, 1, 1, 0] }} transition={{ duration: 3 + Math.random(), delay: 2 + Math.random() * 0.5, ease: 'linear' }} />)}
              {/* "Chapter One Begins!" in Notebook Script */}
              <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40" animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1.2, 1], rotate: [0, 0, -3, 0] }} transition={{ delay: 4.5, duration: 1.5, times: [0, 0.4, 0.7, 1], ease: 'easeOut' }}><div className="bg-white border-4 border-orange-400 rounded-lg px-10 py-6 shadow-2xl relative" style={{ boxShadow: '0 0 40px rgba(249, 115, 22, 0.8)', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(249, 115, 22, 0.2) 31px, rgba(249, 115, 22, 0.2) 32px)' }}><div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-400 opacity-40" /><div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-700 relative z-10" style={{ filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))', fontFamily: 'cursive' }}>Chapter One Begins!</div></div></motion.div>
            </>
          )}

          <motion.div
            initial={{ y: '-100%', skewY: -5 }}
            animate={{ y: stage === 'idle' ? '-100%' : '0%', skewY: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onAnimationComplete={handleDoorsClosed}
            className="absolute top-0 left-0 right-0 h-1/2 bg-red-500 z-10 flex items-end justify-center pb-8 border-b-4 border-yellow-400"
            style={{ 
              backgroundImage: 'radial-gradient(#FDBA74 20%, transparent 20%), radial-gradient(#FDBA74 20%, transparent 20%)',
              backgroundPosition: '0 0, 20px 20px',
              backgroundSize: '40px 40px'
            }}
          >
            <div className="bg-yellow-400 w-16 h-full absolute left-1/2 -translate-x-1/2"></div>
          </motion.div>
          <motion.div
            initial={{ y: '100%', skewY: 5 }}
            animate={{ y: stage === 'idle' ? '100%' : '0%', skewY: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-red-500 z-10 flex items-start justify-center pt-8 border-t-4 border-yellow-400"
            style={{ 
              backgroundImage: 'radial-gradient(#FDBA74 20%, transparent 20%), radial-gradient(#FDBA74 20%, transparent 20%)',
              backgroundPosition: '0 0, 20px 20px',
              backgroundSize: '40px 40px'
            }}
          >
             <div className="bg-yellow-400 w-16 h-full absolute left-1/2 -translate-x-1/2"></div>
          </motion.div>
        </>
      );
    }

    // 5. Warp Drive (Time Traveler)
    if (theme.doorType === 'warp-drive') {
        return (
            <AnimatePresence>
                {/* Background Stars - Always visible but accelerate */}
                <motion.div 
                    key="warp-bg"
                    className="absolute inset-0 bg-black overflow-hidden z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* Central Vanishing Point */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_50px_white] z-10" />
                    
                    {/* Stars / Streaks */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={`warp-star-${i}`}
                            className="absolute top-1/2 left-1/2 w-[200px] h-[2px] bg-white rounded-full origin-left"
                            initial={{ 
                                rotate: i * 18, 
                                x: 0, 
                                scaleX: 0.1, 
                                opacity: 0.5 
                            }}
                            animate={stage === 'launching' ? {
                                scaleX: [0.1, 20],
                                x: [0, 1000],
                                opacity: [0.5, 1, 0]
                            } : {
                                scaleX: [0.1, 0.5, 0.1],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={stage === 'launching' ? {
                                duration: 0.5,
                                ease: "circIn"
                            } : {
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                    
                    {/* Tunnel Effect */}
                    <motion.div
                        className="absolute inset-0 border-[100px] border-cyan-900/20 rounded-full"
                        style={{
                            maskImage: 'radial-gradient(circle, transparent 30%, black 100%)'
                        }}
                        animate={stage === 'launching' ? {
                            scale: [1, 5],
                            opacity: [0.5, 0]
                        } : {
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        onAnimationComplete={() => {
                            // Trigger stage transition after initial animation completes
                            if (stage === 'closing') {
                                handleDoorsClosed();
                            }
                        }}
                    />
                </motion.div>

                {/* HUD Overlay */}
                <motion.div 
                    key="warp-hud"
                    className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex justify-between items-start font-mono text-cyan-500/80 text-xs">
                        <div>
                            <div>sys.opt.temporal_lock</div>
                            <div>status: {stage === 'launching' ? 'ENGAGED' : 'STANDBY'}</div>
                        </div>
                        <div className="text-right">
                            <div>coordinates: {new Date().getFullYear()} &rarr; {new Date().getFullYear() + 10}</div>
                            <div>vector: relative</div>
                        </div>
                    </div>
                    
                    {/* Bottom HUD */}
                    <div className="w-full h-1 bg-cyan-900/30 relative mt-auto">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_cyan]"
                            initial={{ width: "0%" }}
                            animate={stage === 'launching' ? { width: "100%" } : { width: "30%" }}
                            transition={stage === 'launching' ? { duration: 0.3 } : { duration: 10, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Main Content "Shrink" Effect - Simulating the content shrinking */}
                <motion.div
                    key="warp-content"
                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    animate={stage === 'launching' ? {
                        scale: [1, 0],
                        opacity: [1, 0],
                        filter: ["brightness(1)", "brightness(20)"]
                    } : {}}
                    transition={{ duration: 0.4, ease: "backIn" }}
                    onAnimationComplete={() => {
                        if (stage === 'launching') {
                            // This triggers the parent completion callback
                             if (onAnimationComplete) setTimeout(onAnimationComplete, 500);
                        }
                    }}
                >
                    {/* This would wrap the actual content if we could, but here we simulate the "flash" */}
                    {stage === 'closing' && (
                        <motion.div 
                            key="msg-init"
                            className="text-cyan-400 font-mono text-2xl tracking-[0.5em] font-bold bg-black/50 p-4 border border-cyan-500/30 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            INITIATING JUMP...
                        </motion.div>
                    )}
                     {stage === 'locking' && (
                        <motion.div 
                            key="msg-ready"
                            className="text-white font-mono text-3xl tracking-[0.5em] font-bold drop-shadow-[0_0_10px_cyan]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            READY
                        </motion.div>
                    )}
                </motion.div>

                {/* Whiteout Flash on Launch */}
                {stage === 'launching' && (
                    <motion.div
                        key="warp-flash"
                        className="absolute inset-0 bg-white z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, times: [0, 0.1, 1] }}
                    />
                )}
            </AnimatePresence>
        );
    }

    // 4. Horizontal Glass (Career + Future)
    if (theme.doorType === 'horizontal-glass') {
        return (
            <>
                {/* Career Special Effects - ENHANCED */}
                {themeId === 'career' && stage !== 'idle' && (
                  <>
                    {/* Achievement Badge Unlocking Sequence */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const positions = [
                        { x: '20%', y: '20%' },
                        { x: '80%', y: '20%' },
                        { x: '20%', y: '80%' },
                        { x: '80%', y: '80%' },
                        { x: '35%', y: '35%' },
                        { x: '65%', y: '35%' },
                        { x: '35%', y: '65%' },
                        { x: '65%', y: '65%' },
                      ];
                      
                      return (
                        <motion.div
                          key={`badge-${i}`}
                          className="absolute text-5xl pointer-events-none z-30"
                          style={{
                            left: positions[i].x,
                            top: positions[i].y,
                          }}
                          initial={{ 
                            scale: 0,
                            opacity: 0,
                            rotate: -180
                          }}
                          animate={{
                            scale: [0, 1.3, 1],
                            opacity: [0, 1, 1],
                            rotate: [-180, 0, 0]
                          }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3 + i * 0.15,
                            ease: 'easeOut'
                          }}
                        >
                          {['🏆', '⭐', '💼', '📊', '🎯', '💡', '🚀', '👔'][i]}
                        </motion.div>
                      );
                    })}

                    {/* Corporate Progress Bar - Center */}
                    <motion.div
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 max-w-[90vw] pointer-events-none z-35"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="bg-slate-800 rounded-full h-8 border-2 border-blue-400 overflow-hidden shadow-xl">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
                        />
                      </div>
                      <motion.div
                        className="text-center text-blue-300 font-mono text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        MILESTONE ARCHIVED
                      </motion.div>
                    </motion.div>

                    {/* Achievement Unlocked Notification */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1]
                      }}
                      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                    >
                      <div 
                        className="bg-gradient-to-br from-blue-900 to-slate-900 border-4 border-blue-400 rounded-xl p-6 shadow-2xl"
                        style={{
                          boxShadow: '0 0 50px rgba(59, 130, 246, 0.6), 0 0 100px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        <div className="text-6xl mb-3 text-center">💼</div>
                        <div 
                          className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 text-center"
                          style={{
                            filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))'
                          }}
                        >
                          Achievement
                        </div>
                        <div className="text-xl text-blue-200 text-center mt-1">
                          Unlocked!
                        </div>
                      </div>
                    </motion.div>

                    {/* Confetti Burst - Briefcases & Trophies */}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const angle = (i / 30) * Math.PI * 2;
                      const distance = 200;
                      const icons = ['💼', '🏆', '⭐', '📊', '🎯'];
                      
                      return (
                        <motion.div
                          key={`confetti-${i}`}
                          className="absolute text-3xl pointer-events-none z-32"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            opacity: 0,
                            rotate: 0
                          }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            scale: [0, 1.5, 1],
                            opacity: [0, 1, 0],
                            rotate: [0, 720]
                          }}
                          transition={{
                            duration: 2,
                            delay: 2 + i * 0.02,
                            ease: 'easeOut'
                          }}
                        >
                          {icons[i % icons.length]}
                        </motion.div>
                      );
                    })}

                    {/* Digital Signature Effect */}
                    <motion.div
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-35"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.5, duration: 0.8 }}
                    >
                      <svg width="300" height="100" viewBox="0 0 300 100" className="max-w-[90vw]">
                        <motion.path
                          d="M 20 50 Q 50 20, 80 50 T 140 50 Q 170 20, 200 50 T 260 50"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 2.5, ease: 'easeInOut' }}
                          style={{
                            filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.8))'
                          }}
                        />
                      </svg>
                      <motion.div
                        className="text-blue-300 font-handwriting text-2xl text-center mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                      >
                        Digitally Sealed
                      </motion.div>
                    </motion.div>
                  </>
                )}

                {/* Left Door */}
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: stage === 'idle' ? '-100%' : '0%' }}
                    transition={{ type: 'tween', ease: 'anticipate', duration: 0.8 }}
                    onAnimationComplete={handleDoorsClosed}
                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-slate-900/95 backdrop-blur-md border-r-2 border-emerald-500/50 z-10 flex flex-col items-end justify-center pr-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                    {/* Rotating Dial Half Left */}
                     <motion.div 
                        className="absolute right-[-64px] w-32 h-32 rounded-full border-4 border-emerald-500/30 border-dashed"
                        animate={{ rotate: stage === 'locking' ? 180 : 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                     />
                     <div className="font-mono text-xs text-emerald-500/50 mb-4 mr-8">{`> SYSTEM_LOCK`}</div>
                    <div className="w-full h-px bg-emerald-500/30" />
                </motion.div>
                 {/* Right Door */}
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: stage === 'idle' ? '100%' : '0%' }}
                    transition={{ type: 'tween', ease: 'anticipate', duration: 0.8 }}
                    className="absolute top-0 bottom-0 right-0 w-1/2 bg-slate-900/95 backdrop-blur-md border-l-2 border-emerald-500/50 z-10 flex flex-col items-start justify-center pl-8 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                    {/* Rotating Dial Half Right */}
                    <motion.div 
                        className="absolute left-[-64px] w-32 h-32 rounded-full border-4 border-emerald-500/30 border-dashed"
                        animate={{ rotate: stage === 'locking' ? -180 : 0 }}
                        transition={{ duration: 1, ease: "circOut" }}
                     />
                    <div className="font-mono text-xs text-emerald-500/50 mb-4 ml-8">{`> SECURE_MODE`}</div>
                    <div className="w-full h-px bg-emerald-500/30" />
                </motion.div>
                
                {/* Center Lock Animation */}
                <AnimatePresence>
                    {stage === 'locking' && (
                        <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-slate-900 border-4 border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                        >
                            <Zap className="w-12 h-12 text-emerald-400 animate-pulse" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        )
    }

    // 5. Horizontal Wood/Suitcase (Travel)
    if (theme.doorType === 'horizontal-wood') {
        return (
            <>
                {/* Travel Special Effects - ENHANCED */}
                {themeId === 'travel' && stage !== 'idle' && (
                  <>
                    {/* Vintage Suitcase Clasps Closing Sequence */}
                    {[0, 1, 2, 3].map((i) => {
                      const positions = [
                        { x: '25%', y: '48%' },
                        { x: '40%', y: '48%' },
                        { x: '60%', y: '48%' },
                        { x: '75%', y: '48%' },
                      ];
                      
                      return (
                        <motion.div
                          key={`clasp-${i}`}
                          className="absolute pointer-events-none z-30"
                          style={{
                            left: positions[i].x,
                            top: positions[i].y,
                          }}
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                        >
                          <div className="w-3 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded shadow-xl" />
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: [0, -90] }}
                            transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
                          >
                            🔒
                          </motion.div>
                        </motion.div>
                      );
                    })}

                    {/* Passport Stamps Appearing */}
                    {[...Array(12)].map((_, i) => {
                      const stamps = ['🛂', '✈️', '🌍', '🗺️'];
                      return (
                        <motion.div
                          key={`stamp-${i}`}
                          className="absolute text-5xl pointer-events-none z-28"
                          style={{
                            left: `${15 + (i % 4) * 20}%`,
                            top: `${20 + Math.floor(i / 4) * 25}%`,
                            rotate: `${Math.random() * 30 - 15}deg`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 0.8, 0.6],
                            scale: [0, 1.3, 1]
                          }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        >
                          {stamps[i % stamps.length]}
                        </motion.div>
                      );
                    })}

                    {/* World Map Revealing with Pins Dropping */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <div className="relative w-96 h-64 max-w-[90vw]">
                        <motion.div
                          className="text-9xl"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        >
                          🌍
                        </motion.div>
                        
                        {/* Location Pins Dropping */}
                        {[...Array(8)].map((_, i) => {
                          const angle = (i / 8) * Math.PI * 2;
                          const distance = 80;
                          
                          return (
                            <motion.div
                              key={`pin-${i}`}
                              className="absolute text-4xl"
                              style={{
                                left: '50%',
                                top: '50%',
                              }}
                              initial={{ 
                                x: Math.cos(angle) * distance,
                                y: -100,
                                opacity: 0
                              }}
                              animate={{
                                x: Math.cos(angle) * distance,
                                y: Math.sin(angle) * distance,
                                opacity: 1
                              }}
                              transition={{
                                duration: 0.6,
                                delay: 1.5 + i * 0.1,
                                ease: 'easeOut'
                              }}
                            >
                              📍
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Compass Spinning to "FUTURE" */}
                    <motion.div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-32"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1, 1],
                        rotate: [0, 720, 720]
                      }}
                      transition={{ duration: 2, delay: 0.5 }}
                    >
                      <div className="text-7xl">🧭</div>
                    </motion.div>

                    {/* Boarding Pass Printing Out */}
                    <motion.div
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-36"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 2.5 }}
                    >
                      <div 
                        className="bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-600 rounded-lg p-4 shadow-2xl max-w-[90vw]"
                        style={{
                          boxShadow: '0 0 30px rgba(217, 119, 6, 0.4)'
                        }}
                      >
                        <div className="text-3xl mb-2 text-center">✈️</div>
                        <div className="font-bold text-2xl text-amber-900 text-center">
                          BOARDING PASS
                        </div>
                        <div className="text-sm text-amber-700 text-center mt-1">
                          Destination: FUTURE
                        </div>
                      </div>
                    </motion.div>

                    {/* "Bon Voyage" in Multiple Languages */}
                    <motion.div
                      className="absolute bottom-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1],
                        scale: [0, 1.2, 1]
                      }}
                      transition={{ delay: 3, duration: 1 }}
                    >
                      <div 
                        className="font-handwriting text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 text-center"
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))',
                          textShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                        }}
                      >
                        Bon Voyage!
                      </div>
                      <motion.div
                        className="text-center text-orange-300 text-sm mt-2 space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                      >
                        <div>¡Buen Viaje! • Buon Viaggio!</div>
                        <div>良い旅を • 旅途愉快!</div>
                      </motion.div>
                    </motion.div>

                    {/* Floating Airplanes */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`plane-${i}`}
                        className="absolute text-4xl pointer-events-none z-29"
                        style={{
                          left: '-10%',
                          top: `${20 + i * 15}%`,
                        }}
                        animate={{
                          x: ['0vw', '110vw'],
                          y: [0, Math.sin(i * 2) * 30],
                        }}
                        transition={{
                          duration: 12 + i * 2,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: i * 1.5,
                        }}
                      >
                        ✈️
                      </motion.div>
                    ))}
                  </>
                )}

                 {/* Top Trunk Lid */}
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: stage === 'idle' ? '-100%' : '0%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    onAnimationComplete={handleDoorsClosed}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-[#5D4037] z-10 flex items-end justify-center pb-8 border-b-8 border-[#3E2723]"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}
                >
                    {/* Brass Corners */}
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-500 rounded-bl-xl opacity-80" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-500 rounded-br-xl opacity-80" />
                </motion.div>
                 {/* Bottom Trunk Base */}
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: stage === 'idle' ? '100%' : '0%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#5D4037] z-10 flex items-start justify-center pt-8 border-t-8 border-[#3E2723]"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}
                >
                     {/* Brass Corners */}
                     <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-500 rounded-tl-xl opacity-80" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-500 rounded-tr-xl opacity-80" />
                </motion.div>
            </>
        )
    }

    // 6. Vinyl Record Press (Friendship/Mixtape)
    if (theme.doorType === 'vinyl-press') {
        return (
            <>
                {/* Top Press Plate - Perfectly Centered */}
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ 
                        y: stage === 'idle' ? '-100%' : '0%'
                    }}
                    transition={{ 
                        type: 'spring', 
                        damping: 30, 
                        stiffness: 100,
                        duration: 0.8
                    }}
                    onAnimationComplete={handleDoorsClosed}
                    className={`absolute top-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-b-4 border-teal-400/70 shadow-[0_10px_50px_rgba(20,184,166,0.5)] z-10 flex items-end justify-center pb-12`}
                    style={{
                        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(20,184,166,0.2) 0%, transparent 70%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.2) 0%, transparent 70%)',
                    }}
                >
                    {/* Metallic shine effect */}
                    <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{ width: '30%' }}
                    />
                    
                    {/* Hydraulic pressure indicator - More prominent */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.2, scaleY: 0.3 }}
                                animate={{ 
                                    opacity: stage === 'idle' ? 0.2 : 1,
                                    scaleY: stage === 'idle' ? 0.3 : 1,
                                    boxShadow: stage === 'idle' ? 'none' : '0 0 10px rgba(20,184,166,0.8)'
                                }}
                                transition={{ delay: i * 0.15, duration: 0.4 }}
                                className="w-3 h-12 bg-gradient-to-t from-teal-500 to-teal-300 rounded-full"
                            />
                        ))}
                    </div>
                    
                    {/* "PRESSING" label with glow */}
                    <motion.div 
                        className={`${theme.colors.text} font-mono text-sm tracking-[0.5em] uppercase font-bold relative z-10`}
                        animate={{ 
                            textShadow: stage === 'idle' 
                                ? 'none' 
                                : ['0 0 10px rgba(20,184,166,0.5)', '0 0 20px rgba(20,184,166,0.8)', '0 0 10px rgba(20,184,166,0.5)']
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {theme.text.topLabel}
                    </motion.div>
                    
                    {/* Sparks effect when pressing */}
                    {stage !== 'idle' && [...Array(8)].map((_, i) => (
                        <motion.div
                            key={`spark-top-${i}`}
                            className="absolute w-1 h-1 bg-amber-400 rounded-full"
                            initial={{ 
                                x: '50%',
                                y: '100%',
                                opacity: 0
                            }}
                            animate={{ 
                                x: `${50 + (Math.random() - 0.5) * 100}%`,
                                y: `${100 + Math.random() * 30}%`,
                                opacity: [0, 1, 0]
                            }}
                            transition={{ 
                                duration: 0.8,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                        />
                    ))}
                </motion.div>

                {/* Bottom Press Plate with Enhanced Vinyl Grooves - Perfectly Centered */}
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ 
                        y: stage === 'idle' ? '100%' : '0%'
                    }}
                    transition={{ 
                        type: 'spring', 
                        damping: 30, 
                        stiffness: 100,
                        duration: 0.8
                    }}
                    className={`absolute bottom-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-t-4 border-amber-400/70 shadow-[0_-10px_50px_rgba(251,146,60,0.5)] z-10 flex items-start justify-center pt-12`}
                    style={{
                        backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(20,184,166,0.15) 0px, transparent 6px, transparent 12px), radial-gradient(circle at 50% 50%, rgba(30,30,30,0.8) 0%, transparent 80%)',
                    }}
                >
                    {/* Metallic shine effect */}
                    <motion.div
                        animate={{ x: ['200%', '-100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{ width: '30%' }}
                    />
                    
                    {/* Enhanced vinyl record grooves with rotation and glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        animate={{ 
                            opacity: stage === 'idle' ? 0 : [0, 1, 1],
                            scale: stage === 'idle' ? 0.5 : [0.5, 1.1, 1],
                            rotate: stage === 'idle' ? 0 : 720
                        }}
                        transition={{ duration: 2.5, ease: 'easeOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Outer glowing ring */}
                        <motion.div
                            className="absolute w-64 h-64 border-4 border-teal-500/30 rounded-full"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    '0 0 20px rgba(20,184,166,0.3)',
                                    '0 0 40px rgba(20,184,166,0.6)',
                                    '0 0 20px rgba(20,184,166,0.3)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Vinyl grooves - radial lines */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-0.5 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
                                style={{
                                    transform: `rotate(${i * 18}deg)`,
                                    width: `${90 - (i % 3) * 10}%`,
                                    left: '50%',
                                    top: '50%',
                                    transformOrigin: '0 0'
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: stage === 'idle' ? 0 : [0, 0.6, 0.6]
                                }}
                                transition={{ delay: 0.5 + i * 0.02, duration: 0.3 }}
                            />
                        ))}
                        
                        {/* Center label - vinyl hole */}
                        <motion.div
                            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black border-2 border-amber-500/50 shadow-[0_0_30px_rgba(251,146,60,0.4)]"
                            animate={{ 
                                rotate: stage === 'idle' ? 0 : -360
                            }}
                            transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className={`${theme.colors.text} font-mono text-sm tracking-[0.5em] uppercase font-bold relative z-10`}
                        animate={{ 
                            textShadow: stage === 'idle' 
                                ? 'none' 
                                : ['0 0 10px rgba(251,146,60,0.5)', '0 0 20px rgba(251,146,60,0.8)', '0 0 10px rgba(251,146,60,0.5)']
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {theme.text.bottomLabel}
                    </motion.div>
                    
                    {/* Enhanced steam/pressure release effect */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`steam-${i}`}
                            className="absolute w-4 h-4 rounded-full blur-lg"
                            style={{
                                left: `${25 + i * 15}%`,
                                background: i % 2 === 0 ? 'rgba(20,184,166,0.4)' : 'rgba(236,72,153,0.4)'
                            }}
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ 
                                opacity: stage === 'idle' ? 0 : [0, 0.8, 0],
                                y: stage === 'idle' ? 0 : [-10, -40, -70],
                                scale: [1, 1.5, 2]
                            }}
                            transition={{ 
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                        />
                    ))}
                    
                    {/* Sparks effect when pressing */}
                    {stage !== 'idle' && [...Array(8)].map((_, i) => (
                        <motion.div
                            key={`spark-bottom-${i}`}
                            className="absolute w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                            initial={{ 
                                x: '50%',
                                y: '0%',
                                opacity: 0
                            }}
                            animate={{ 
                                x: `${50 + (Math.random() - 0.5) * 100}%`,
                                y: `${Math.random() * -30}%`,
                                opacity: [0, 1, 0]
                            }}
                            transition={{ 
                                duration: 0.8,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 0.5
                            }}
                        />
                    ))}
                </motion.div>
            </>
        )
    }
    
    // 7. Pet Treasure Chest
    if (theme.doorType === 'treasure-chest') {
        return (
            <>
                {/* Furry Friends / Pet Special Effects - ENHANCED */}
                {themeId === 'pet' && stage !== 'idle' && (
                  <>
                    {/* Pet Toys Floating and Spinning */}
                    {[...Array(8)].map((_, i) => {
                      const toys = ['🎾', '🦴', '🧶', '🐭', '🪀', '🎈', '🪶', '🥏'];
                      const angle = (i / 8) * Math.PI * 2;
                      const distance = 150;
                      
                      return (
                        <motion.div
                          key={`toy-${i}`}
                          className="absolute text-5xl pointer-events-none z-30"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{ 
                            x: Math.cos(angle) * distance * 2,
                            y: Math.sin(angle) * distance * 2,
                            opacity: 0,
                            scale: 0,
                            rotate: 0
                          }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: [0, 1, 1],
                            scale: [0, 1.3, 1],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.3 + i * 0.1,
                            ease: 'easeOut'
                          }}
                        >
                          {toys[i]}
                        </motion.div>
                      );
                    })}

                    {/* Paw Prints Trail Leading to Center */}
                    {[...Array(16)].map((_, i) => {
                      const angle = (i / 16) * Math.PI * 2;
                      const spiralRadius = 250 - (i / 16) * 200;
                      
                      return (
                        <motion.div
                          key={`paw-trail-${i}`}
                          className="absolute text-3xl pointer-events-none z-29"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          initial={{
                            x: Math.cos(angle) * 300,
                            y: Math.sin(angle) * 300,
                            opacity: 0,
                            rotate: angle * (180 / Math.PI)
                          }}
                          animate={{
                            x: Math.cos(angle) * spiralRadius,
                            y: Math.sin(angle) * spiralRadius,
                            opacity: [0, 0.8, 0.8],
                            rotate: angle * (180 / Math.PI)
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.08,
                            ease: 'easeOut'
                          }}
                        >
                          🐾
                        </motion.div>
                      );
                    })}

                    {/* Photo Frame with Pet Picture Materializing */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1],
                        rotate: [-180, 0, 0]
                      }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    >
                      <div 
                        className="relative w-64 h-64 max-w-[90vw] bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl border-8 border-amber-400 shadow-2xl p-4"
                        style={{
                          boxShadow: '0 0 40px rgba(251, 191, 36, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        <div className="absolute inset-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <motion.div
                            className="text-9xl"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            🐕
                          </motion.div>
                        </div>
                        
                        <motion.div
                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 rounded-full border-2 border-amber-700 shadow-xl"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2, duration: 0.5 }}
                        >
                          <div className="text-amber-100 font-handwriting text-xl">Forever Loved</div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Hearts Rising from Photo */}
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={`heart-rise-${i}`}
                        className="absolute text-3xl pointer-events-none z-34"
                        style={{
                          left: `${45 + Math.random() * 10}%`,
                          top: '50%',
                        }}
                        animate={{
                          y: [0, -400],
                          x: [(Math.random() - 0.5) * 100],
                          opacity: [0, 1, 1, 0],
                          scale: [0.5, 1.2, 0.8],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 3,
                          delay: 2.5 + Math.random() * 1.5,
                          ease: 'easeOut'
                        }}
                      >
                        💕
                      </motion.div>
                    ))}

                    {/* Rainbow Bridge Arc Formation */}
                    <motion.div
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-32"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, delay: 2 }}
                    >
                      <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-[95vw]">
                        {[
                          { color: '#ef4444', offset: 0 },
                          { color: '#f97316', offset: 20 },
                          { color: '#eab308', offset: 40 },
                          { color: '#22c55e', offset: 60 },
                          { color: '#3b82f6', offset: 80 },
                          { color: '#8b5cf6', offset: 100 },
                        ].map((stripe, i) => (
                          <motion.path
                            key={`rainbow-${i}`}
                            d={`M 50 150 Q 200 ${50 + stripe.offset / 5} 350 150`}
                            stroke={stripe.color}
                            strokeWidth="12"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 2 + i * 0.1,
                              ease: 'easeOut'
                            }}
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
                            }}
                          />
                        ))}
                      </svg>
                    </motion.div>

                    {/* Floating Pet Silhouettes Crossing Bridge */}
                    {[...Array(5)].map((_, i) => {
                      const pets = ['🐕', '🐈', '🐰', '🦜', '🐹'];
                      return (
                        <motion.div
                          key={`crossing-${i}`}
                          className="absolute top-1/3 text-4xl pointer-events-none z-33"
                          initial={{ x: '-5vw', opacity: 0 }}
                          animate={{
                            x: ['0vw', '50vw', '105vw'],
                            y: [0, -50, 0],
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 4,
                            delay: 3 + i * 0.5,
                            ease: 'easeInOut'
                          }}
                        >
                          {pets[i]}
                        </motion.div>
                      );
                    })}

                    {/* Sparkles Bursting from Chest */}
                    {[...Array(30)].map((_, i) => {
                      const angle = (i / 30) * Math.PI * 2;
                      const distance = 200;
                      
                      return (
                        <motion.div
                          key={`sparkle-burst-${i}`}
                          className="absolute text-2xl pointer-events-none z-31"
                          style={{
                            left: '50%',
                            top: '48%',
                          }}
                          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 2,
                            delay: 1 + i * 0.03,
                            ease: 'easeOut'
                          }}
                        >
                          ✨
                        </motion.div>
                      );
                    })}

                    {/* "Forever in Our Hearts" Message */}
                    <motion.div
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1],
                        scale: [0, 1.2, 1]
                      }}
                      transition={{ delay: 4, duration: 1 }}
                    >
                      <div 
                        className="font-handwriting text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-amber-300 text-center px-4"
                        style={{
                          filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9))',
                          textShadow: '0 0 30px rgba(251, 191, 36, 0.7), 0 0 60px rgba(251, 113, 133, 0.5)'
                        }}
                      >
                        Forever in Our Hearts
                      </div>
                      <motion.div
                        className="text-center text-amber-200 text-xl mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5 }}
                      >
                        🌈 Until We Meet Again 🌈
                      </motion.div>
                    </motion.div>

                    {/* Collar Tags Jingling */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 pointer-events-none z-36"
                      animate={{
                        rotate: [-5, 5, -5, 5, 0],
                        x: [0, -3, 3, -3, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 6,
                        delay: 0.5
                      }}
                    >
                      <div className="text-5xl">🏷️</div>
                    </motion.div>
                  </>
                )}

                {/* Top Treasure Chest Lid */}
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: stage === 'idle' ? '-100%' : '0%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    onAnimationComplete={handleDoorsClosed}
                    className={`absolute top-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-b-4 border-amber-500 shadow-[0_10px_50px_rgba(251,191,36,0.4)] z-10 flex items-end justify-center pb-8`}
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                    }}
                >
                    {/* Decorative brass corners */}
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl opacity-80" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-400 rounded-br-2xl opacity-80" />
                    
                    {/* OLD Simple Paw prints - ONLY show for non-pet themes using treasure chest */}
                    {themeId !== 'pet' && stage !== 'idle' && [...Array(5)].map((_, i) => (
                        <motion.div
                            key={`paw-top-${i}`}
                            className="absolute text-4xl"
                            initial={{ x: -100, y: 50, opacity: 0 }}
                            animate={{ 
                                x: `${i * 150}%`,
                                y: 50 + (i % 2) * 20,
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{ 
                                duration: 2,
                                delay: i * 0.3,
                                ease: 'easeInOut'
                            }}
                        >
                            🐾
                        </motion.div>
                    ))}
                    
                    {/* OLD Simple Heart-shaped lock decoration - ONLY show for non-pet themes */}
                    {themeId !== 'pet' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: stage === 'idle' ? 0 : 1,
                                scale: stage === 'idle' ? 0 : [0, 1.2, 1]
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute top-1/2 -translate-y-1/2 text-6xl"
                        >
                            💕
                        </motion.div>
                    )}
                </motion.div>

                {/* Bottom Treasure Chest Base */}
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: stage === 'idle' ? '100%' : '0%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className={`absolute bottom-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-t-4 border-orange-500 shadow-[0_-10px_50px_rgba(251,146,60,0.4)] z-10 flex items-start justify-center pt-8`}
                    style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                    }}
                >
                    {/* Decorative brass corners */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl opacity-80" />
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl opacity-80" />
                    
                    {/* OLD Simple Rainbow bridge glow - ONLY show for non-pet themes */}
                    {themeId !== 'pet' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: stage === 'idle' ? 0 : [0, 0.8, 0.8],
                                scale: stage === 'idle' ? 0.5 : [0.5, 1.2, 1]
                            }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="text-8xl">🌈</div>
                        </motion.div>
                    )}
                    
                    {/* OLD Simple Collar bell jingle visual (sound waves) - ONLY show for non-pet themes */}
                    {themeId !== 'pet' && stage !== 'idle' && [...Array(4)].map((_, i) => (
                        <motion.div
                            key={`bell-ring-${i}`}
                            className="absolute w-16 h-16 border-2 border-amber-400 rounded-full"
                            style={{
                                left: '50%',
                                top: '30%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ opacity: 0.8, scale: 1 }}
                            animate={{ 
                                opacity: 0,
                                scale: 3
                            }}
                            transition={{ 
                                duration: 1.5,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    ))}
                    
                    {/* OLD Simple Bell icon - ONLY show for non-pet themes */}
                    {themeId !== 'pet' && (
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ 
                                rotate: stage === 'idle' ? 0 : [-10, 10, -10, 10, 0]
                            }}
                            transition={{ 
                                duration: 0.5,
                                repeat: stage === 'idle' ? 0 : 3,
                                delay: 0.5
                            }}
                            className="absolute text-4xl"
                            style={{ top: '30%' }}
                        >
                            🔔
                        </motion.div>
                    )}
                </motion.div>
            </>
        )
    }
    
    // 8. Shutter (Graduation)
    if (theme.doorType === 'shutter') {
         return (
            <>
                {/* Graduation Special Effects */}
                {themeId === 'graduation' && stage !== 'idle' && (
                  <>
                    {/* Rocket Launch Countdown */}
                    <motion.div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.5, 1.5, 2] }}
                      transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
                    >
                      <div className="text-8xl font-bold text-amber-400">
                        🚀
                      </div>
                    </motion.div>

                    {/* Cap Toss into Sky */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={`cap-${i}`}
                        className="absolute text-4xl pointer-events-none z-30"
                        style={{
                          left: `${20 + i * 5}%`,
                          bottom: '50%',
                        }}
                        initial={{ opacity: 0, y: 0, rotate: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          y: [0, -400],
                          x: [(Math.random() - 0.5) * 100],
                          rotate: [0, Math.random() * 720]
                        }}
                        transition={{
                          duration: 2.5,
                          delay: 0.5 + i * 0.1,
                          ease: 'easeOut'
                        }}
                      >
                        🎓
                      </motion.div>
                    ))}

                    {/* Diploma Ribbon with Wax Seal */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                      style={{ transformOrigin: 'top' }}
                    >
                      <div className="relative">
                        <div className="w-32 h-48 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg shadow-2xl border-4 border-amber-400" />
                        <motion.div
                          className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-40 bg-gradient-to-b from-blue-600 to-blue-800"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.8, delay: 1.2 }}
                          style={{ transformOrigin: 'top' }}
                        />
                        <motion.div
                          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-4 border-amber-900 flex items-center justify-center text-3xl shadow-xl"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 1.5, type: 'spring' }}
                        >
                          🏆
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* "The Future Awaits!" */}
                    <motion.div
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                      initial={{ opacity: 0, scale: 0, y: 50 }}
                      animate={{ 
                        opacity: [0, 1, 1],
                        scale: [0, 1.3, 1],
                        y: [50, 0, 0]
                      }}
                      transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
                    >
                      <div 
                        className="font-bold text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300"
                        style={{
                          filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 1))',
                          textShadow: '0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.5)'
                        }}
                      >
                        The Future Awaits!
                      </div>
                    </motion.div>

                    {/* Trophy Burst */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const distance = 150;
                      
                      return (
                        <motion.div
                          key={`trophy-${i}`}
                          className="absolute top-1/2 left-1/2 text-4xl pointer-events-none z-30"
                          initial={{ 
                            x: 0, 
                            y: 0, 
                            scale: 0,
                            opacity: 0 
                          }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 1 + i * 0.05,
                            ease: 'easeOut'
                          }}
                        >
                          {i % 2 === 0 ? '🏆' : '⭐'}
                        </motion.div>
                      );
                    })}
                  </>
                )}

                {/* First Day (Fresh Start) Special Effects - ENHANCED */}
                {themeId === 'first_day' && stage !== 'idle' && (
                  <>
                    {/* School Locker Door Slamming Sound Waves */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`sound-wave-${i}`}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-orange-400 rounded-lg pointer-events-none z-28"
                        style={{ width: '100px', height: '150px' }}
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.8, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          ease: 'easeOut'
                        }}
                      />
                    ))}

                    {/* School Bell Ringing - Center */}
                    <motion.div
                      className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-35"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ 
                        scale: [0, 1.3, 1],
                        rotate: [-20, 20, -15, 15, -10, 10, 0]
                      }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    >
                      <div className="text-9xl">🔔</div>
                    </motion.div>

                    {/* Bell Ring Sound Waves */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`bell-ring-${i}`}
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-orange-400 rounded-full pointer-events-none z-33"
                        style={{ width: '80px', height: '80px' }}
                        animate={{
                          scale: [1, 4],
                          opacity: [0.7, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + i * 0.25,
                          ease: 'easeOut'
                        }}
                      />
                    ))}

                    {/* Pencils Rolling and Drawing Line */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`pencil-${i}`}
                        className="absolute text-5xl pointer-events-none z-32"
                        style={{
                          left: '-10%',
                          top: `${40 + i * 5}%`,
                        }}
                        animate={{
                          x: ['0vw', '110vw'],
                          rotate: [0, 720],
                        }}
                        transition={{
                          duration: 3,
                          delay: 1 + i * 0.15,
                          ease: 'linear'
                        }}
                      >
                        ✏️
                      </motion.div>
                    ))}

                    {/* Notebook Pages Flipping */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-36"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <div className="relative w-64 h-80 max-w-[90vw]">
                        {/* Notebook Cover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg border-4 border-orange-600 shadow-2xl"
                          animate={{ rotateY: [0, -90] }}
                          transition={{ duration: 0.8, delay: 2 }}
                        />
                        
                        {/* Pages Flipping */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={`page-${i}`}
                            className="absolute inset-0 bg-white rounded-lg border-2 border-gray-300 shadow-lg"
                            style={{
                              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(249, 115, 22, 0.2) 31px, rgba(249, 115, 22, 0.2) 32px)',
                            }}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: [0, -180] }}
                            transition={{ 
                              duration: 0.5, 
                              delay: 2 + i * 0.3,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Stickers Appearing on "Locker Door" */}
                    {[...Array(12)].map((_, i) => {
                      const stickers = ['⭐', '✨', '🎨', '📐', '✏️', '📝', '🎯', '💡', '🚀', '🌟', '💫', '🏆'];
                      const positions = [
                        { x: '15%', y: '15%' },
                        { x: '30%', y: '20%' },
                        { x: '70%', y: '15%' },
                        { x: '85%', y: '25%' },
                        { x: '20%', y: '40%' },
                        { x: '80%', y: '45%' },
                        { x: '15%', y: '60%' },
                        { x: '35%', y: '65%' },
                        { x: '65%', y: '60%' },
                        { x: '85%', y: '70%' },
                        { x: '25%', y: '80%' },
                        { x: '75%', y: '85%' },
                      ];
                      
                      return (
                        <motion.div
                          key={`sticker-${i}`}
                          className="absolute text-4xl pointer-events-none z-34"
                          style={{
                            left: positions[i].x,
                            top: positions[i].y,
                            rotate: `${Math.random() * 40 - 20}deg`,
                          }}
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          animate={{ 
                            scale: [0, 1.3, 1],
                            opacity: [0, 1, 1],
                            rotate: [180, 0, 0]
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 2.5 + i * 0.1,
                            ease: 'easeOut'
                          }}
                        >
                          {stickers[i]}
                        </motion.div>
                      );
                    })}

                    {/* Apple Rolling Into Frame */}
                    <motion.div
                      className="absolute bottom-1/4 text-6xl pointer-events-none z-35"
                      initial={{ x: '-10vw', rotate: 0 }}
                      animate={{ 
                        x: '45vw',
                        rotate: 720
                      }}
                      transition={{ duration: 2, delay: 3, ease: 'easeOut' }}
                    >
                      🍎
                    </motion.div>

                    {/* Backpack Zipping Up */}
                    <motion.div
                      className="absolute bottom-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-37"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 3.5 }}
                    >
                      <div className="text-8xl">🎒</div>
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: '80px' }}
                        transition={{ duration: 0.8, delay: 4 }}
                        style={{
                          boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                        }}
                      />
                    </motion.div>

                    {/* "Adventure Begins!" Message */}
                    <motion.div
                      className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1],
                        scale: [0, 1.2, 1]
                      }}
                      transition={{ delay: 4.5, duration: 1 }}
                    >
                      <div 
                        className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 text-center"
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(251, 146, 60, 0.8))',
                          textShadow: '0 0 20px rgba(251, 146, 60, 0.6)'
                        }}
                      >
                        Adventure Begins!
                      </div>
                    </motion.div>

                    {/* Doodle Sparkles */}
                    {[...Array(20)].map((_, i) => {
                      const doodles = ['✏️', '📝', '⭐', '🎨'];
                      return (
                        <motion.div
                          key={`doodle-${i}`}
                          className="absolute text-2xl pointer-events-none z-31"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 1 + Math.random() * 3,
                            ease: 'easeOut'
                          }}
                        >
                          {doodles[i % doodles.length]}
                        </motion.div>
                      );
                    })}
                  </>
                )}

                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: stage === 'idle' ? '-100%' : '0%' }}
                    transition={{ type: 'tween', ease: 'circOut', duration: 0.6 }}
                    onAnimationComplete={handleDoorsClosed}
                    className="absolute top-0 left-0 right-0 h-1/2 bg-slate-800 z-10 flex items-end justify-center border-b-8 border-yellow-500"
                >
                    {/* Hazard Stripes */}
                    <div className="absolute bottom-0 w-full h-8 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-50" />
                    <div className="mb-8 text-yellow-500 font-black tracking-widest text-2xl uppercase">DANGER</div>
                </motion.div>
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: stage === 'idle' ? '100%' : '0%' }}
                    transition={{ type: 'tween', ease: 'circOut', duration: 0.6 }}
                    className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-800 z-10 flex items-start justify-center border-t-8 border-yellow-500"
                >
                    <div className="absolute top-0 w-full h-8 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,#000_10px,#000_20px)] opacity-50" />
                    <div className="mt-8 text-yellow-500 font-black tracking-widest text-2xl uppercase">HIGH VOLTAGE</div>
                </motion.div>
            </>
        )
    }

    // Default Vertical Doors (Standard, Anniversary)
    return (
      <>
        {/* Anniversary Special Effects */}
        {themeId === 'anniversary' && stage !== 'idle' && (
          <>
            {/* Rose Petals Spiraling into Lock */}
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (i / 40) * Math.PI * 2 * 2;
              const spiralRadius = (i / 40) * 250;
              
              return (
                <motion.div
                  key={`rose-${i}`}
                  className="absolute text-2xl pointer-events-none z-30"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    x: Math.cos(angle) * spiralRadius,
                    y: Math.sin(angle) * spiralRadius,
                    opacity: 1,
                    rotate: 0
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [1, 1, 0],
                    rotate: [0, 720],
                    scale: [1, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.02,
                    ease: 'easeInOut'
                  }}
                >
                  🌹
                </motion.div>
              );
            })}

            {/* Diamond Sparkle Burst */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 180;
              
              return (
                <motion.div
                  key={`diamond-${i}`}
                  className="absolute text-3xl pointer-events-none z-30"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0 
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.03,
                    ease: 'easeOut'
                  }}
                >
                  💎
                </motion.div>
              );
            })}

            {/* Champagne Bubbles Rising */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute text-lg pointer-events-none z-25"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-5%',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  y: [0, -1000],
                  x: [0, Math.sin(i) * 30],
                  opacity: [0, 0.9, 0.7, 0],
                  scale: [0.5, 1, 0.8]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.05,
                  ease: 'easeOut'
                }}
              >
                🫧
              </motion.div>
            ))}

            {/* "Forever Yours" in Golden Script */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-40"
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0, 1.2, 1],
                y: [50, 0, 0]
              }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            >
              <div 
                className="font-handwriting text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))',
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.4)'
                }}
              >
                Forever Yours
              </div>
            </motion.div>

            {/* Lock Icon Formation */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl pointer-events-none z-35"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.3, 1],
                opacity: [0, 1, 1]
              }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              🔒
            </motion.div>
          </>
        )}

        {/* New Home (New Nest) Special Effects - ENHANCED */}
        {themeId === 'new_home' && stage !== 'idle' && (
          <>
            {/* Keys Jingling and Inserting Into Lock */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`key-jingle-${i}`}
                className="absolute text-5xl pointer-events-none z-30"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 15, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🗝️
              </motion.div>
            ))}

            {/* Front Door Opening with Golden Light */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="relative w-64 h-96 max-w-[90vw]"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -60 }}
                transition={{ duration: 1.5, delay: 1 }}
                style={{ transformOrigin: 'left' }}
              >
                {/* Door */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-green-900 rounded-lg border-4 border-emerald-600 shadow-2xl">
                  {/* Door Panels */}
                  <div className="absolute top-1/4 left-1/4 right-1/4 h-1/3 border-2 border-emerald-700 rounded" />
                  <div className="absolute bottom-1/4 left-1/4 right-1/4 h-1/3 border-2 border-emerald-700 rounded" />
                  
                  {/* Door Knob */}
                  <motion.div
                    className="absolute top-1/2 right-4 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg"
                    animate={{ rotate: [0, 90] }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                </div>
                
                {/* Golden Light Streaming Through */}
                <motion.div
                  className="absolute -right-32 top-0 bottom-0 w-48"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.8] }}
                  transition={{ duration: 1, delay: 1.8 }}
                  style={{
                    background: 'linear-gradient(to right, rgba(251, 191, 36, 0.8), transparent)',
                    filter: 'blur(20px)'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Welcome Mat Rolling Out */}
            <motion.div
              className="absolute bottom-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-36"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            >
              <div className="w-48 h-24 bg-gradient-to-br from-red-800 to-red-900 border-4 border-amber-600 rounded-lg flex items-center justify-center shadow-2xl">
                <div className="text-2xl text-amber-200 font-bold">WELCOME</div>
              </div>
            </motion.div>

            {/* Moving Boxes Stacking and Disappearing */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`box-${i}`}
                className="absolute text-6xl pointer-events-none z-29"
                style={{
                  left: `${20 + i * 12}%`,
                  bottom: '-10%',
                }}
                animate={{
                  y: [0, -200 - i * 50, -200 - i * 50, -500],
                  rotate: [0, 5, -5, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 0.5 + i * 0.2,
                  ease: 'easeInOut'
                }}
              >
                📦
              </motion.div>
            ))}

            {/* House Plants Growing From Bottom */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`plant-${i}`}
                className="absolute bottom-0 text-7xl pointer-events-none z-32"
                style={{
                  left: `${25 + i * 25}%`,
                }}
                initial={{ y: 100, opacity: 0, scale: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  scale: [0, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  delay: 2.5 + i * 0.3,
                  ease: 'easeOut'
                }}
              >
                {['🪴', '🌱', '🌿'][i]}
              </motion.div>
            ))}

            {/* Key Inserting Into Lock - Center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
              initial={{ x: -200, rotate: 0, opacity: 0 }}
              animate={{
                x: [200, 0, 0],
                rotate: [0, 0, 90],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 2,
                delay: 3,
                times: [0, 0.5, 1],
                ease: 'easeInOut'
              }}
            >
              <div className="text-8xl">🔑</div>
            </motion.div>

            {/* Doorbell Chiming Visual */}
            <motion.div
              className="absolute top-1/4 right-1/4 pointer-events-none z-33"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 1] }}
              transition={{ duration: 0.5, delay: 3.5 }}
            >
              <div className="text-5xl">🔔</div>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`doorbell-ring-${i}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-blue-400 rounded-full"
                  style={{ width: '40px', height: '40px' }}
                  animate={{
                    scale: [1, 3],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 3.5 + i * 0.3,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>

            {/* "Home Sweet Home" Message */}
            <motion.div
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none z-40"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1],
                scale: [0, 1.2, 1],
              }}
              transition={{ delay: 4, duration: 1 }}
            >
              <div
                className="font-handwriting text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-400 text-center"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))',
                  textShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
                }}
              >
                Home Sweet Home
              </div>
            </motion.div>

            {/* Floating Hearts */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-3xl pointer-events-none z-31"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-10%',
                }}
                animate={{
                  y: [0, -800],
                  x: [0, (Math.random() - 0.5) * 100],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  delay: 2 + Math.random() * 2,
                  ease: 'easeOut'
                }}
              >
                💚
              </motion.div>
            ))}
          </>
        )}

        {/* Standard (Eras Default) Special Effects */}
        {themeId === 'standard' && stage !== 'idle' && (
          <>
            {/* Glowing Lock Sequence with Temporal Energy Rings */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-35"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 1]
              }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {/* Central Lock Glow */}
              <motion.div
                className="text-8xl"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6)',
                    '0 0 40px rgba(34, 197, 94, 1), 0 0 80px rgba(34, 197, 94, 0.8)',
                    '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🔒
              </motion.div>
            </motion.div>

            {/* Temporal Energy Rings */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`energy-ring-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400 rounded-full pointer-events-none z-32"
                style={{ width: '100px', height: '100px' }}
                animate={{
                  scale: [1, 4],
                  opacity: [0.8, 0],
                  borderColor: ['rgba(34, 211, 238, 0.8)', 'rgba(168, 85, 247, 0.2)']
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}

            {/* Vault Bolts Sliding Animation */}
            {/* Top bolts */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bolt-top-${i}`}
                className="absolute top-[25%] pointer-events-none z-34"
                style={{ left: `${30 + i * 20}%` }}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: [0, 0],
                  opacity: [0, 1],
                }}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    className="w-2 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded shadow-lg"
                    animate={{ scaleY: [1, 0.8, 1] }}
                    transition={{
                      delay: 1 + i * 0.15,
                      duration: 0.3,
                      ease: 'easeOut'
                    }}
                  />
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-amber-700" />
                </div>
              </motion.div>
            ))}

            {/* Bottom bolts */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bolt-bottom-${i}`}
                className="absolute bottom-[25%] pointer-events-none z-34"
                style={{ left: `${30 + i * 20}%` }}
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: [0, 0],
                  opacity: [0, 1],
                }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-amber-700" />
                  <motion.div
                    className="w-2 h-12 bg-gradient-to-b from-amber-600 to-amber-400 rounded shadow-lg"
                    animate={{ scaleY: [1, 0.8, 1] }}
                    transition={{
                      delay: 1.2 + i * 0.15,
                      duration: 0.3,
                      ease: 'easeOut'
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Subtle Particle Sparkles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-sm pointer-events-none z-31"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -30],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 1,
                  ease: 'easeOut'
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Enhanced Success Message */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none z-40"
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: [0, 1, 1],
                scale: [0, 1.2, 1],
                y: [50, 0, 0]
              }}
              transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
            >
              <motion.div 
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 px-8 py-4 rounded-lg border-2 border-green-400/30"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 1))',
                  textShadow: '0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.7)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.2)',
                    '0 0 50px rgba(34, 197, 94, 0.8), inset 0 0 30px rgba(34, 197, 94, 0.4)',
                    '0 0 30px rgba(34, 197, 94, 0.6), inset 0 0 20px rgba(34, 197, 94, 0.2)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Capsule Sealed
              </motion.div>
            </motion.div>

            {/* Hexagonal Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-20">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}
              />
            </div>
          </>
        )}

        {/* Top Door - Velvet Texture for Anniversary */}
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: stage === 'idle' ? '-100%' : '0%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 1.5 }}
          onAnimationComplete={handleDoorsClosed}
          className={`absolute top-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-b-4 ${theme.colors.doorBorder} shadow-2xl z-10 flex items-end justify-center pb-8`}
          style={themeId === 'anniversary' ? {
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 8px, rgba(0,0,0,0.1) 10px)'
          } : undefined}
        >
          <div className={`${theme.colors.text} font-mono text-xs tracking-[0.5em] uppercase opacity-50 mb-4`}>
            {theme.text.topLabel}
          </div>
        </motion.div>

        {/* Bottom Door - Velvet Texture for Anniversary */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: stage === 'idle' ? '100%' : '0%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 1.5 }}
          className={`absolute bottom-0 left-0 right-0 h-1/2 ${theme.colors.doorBg} border-t-4 ${theme.colors.doorBorder} shadow-2xl z-10 flex items-start justify-center pt-8`}
          style={themeId === 'anniversary' ? {
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 8px, rgba(0,0,0,0.1) 10px)'
          } : undefined}
        >
          <div className={`${theme.colors.text} font-mono text-xs tracking-[0.5em] uppercase opacity-50 mt-4`}>
            {theme.text.bottomLabel}
          </div>
        </motion.div>
      </>
    );
  };

  const overlayContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
      />

      {/* Container for doors - uses fixed positioning to ensure centering in viewport */}
      <div className="fixed inset-0 flex items-center justify-center">
        {renderDoors()}
      </div>

      {/* Standard Lock/Success UI - Hide for Warp Drive which handles its own UI */}
      {theme.doorType !== 'warp-drive' && (
        <AnimatePresence mode="wait">
          {stage === 'locking' && (
            <motion.div 
              key="locking-ui"
              className="fixed inset-0 z-20 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  {/* Spinning Rings - Only for high tech themes or standard */}
                  {(themeId === 'standard' || themeId === 'future' || themeId === 'graduation') && (
                    <>
                      <motion.div 
                        key="ring-outer"
                        className={`absolute inset-0 border-4 border-dashed ${theme.colors.lockRingOuter} rounded-full`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        key="ring-inner"
                        className={`absolute inset-[-20px] border-2 border-dotted ${theme.colors.lockRingInner} rounded-full`}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  )}

                  {/* Special Glow for Magic themes */}
                  {(themeId === 'new_life' || themeId === 'wedding' || themeId === 'anniversary') && (
                    <motion.div 
                      key="magic-glow"
                      className={`absolute inset-[-10px] rounded-full bg-white/20 blur-xl`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* Lock Container */}
                  <div className={`w-32 h-32 rounded-full border-4 ${theme.colors.doorBorder} ${theme.colors.doorBg} flex items-center justify-center shadow-lg`}>
                     <theme.icons.lock className={`w-12 h-12 ${theme.colors.lockIcon}`} />
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${theme.colors.lockIcon} font-mono text-sm tracking-widest uppercase animate-pulse font-bold`}
                >
                  {theme.text.sealing}
                </motion.div>
              </div>
            </motion.div>
          )}

          {stage === 'launching' && (
            <motion.div 
              key="launching-ui"
              className="fixed inset-0 z-20 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onAnimationComplete={handleLaunchComplete}
            >
              <div className="flex flex-col items-center justify-center gap-6">
               <div className="relative">
                 <motion.div 
                   key="success-glow"
                   className={`absolute inset-0 rounded-full blur-2xl opacity-20 bg-white`}
                   animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                   transition={{ duration: 1 }}
                 />
                 <div className={`w-32 h-32 ${theme.colors.doorBg} rounded-full border-4 ${theme.colors.successText} flex items-center justify-center ${theme.colors.successGlow}`}>
                   <theme.icons.success className={`w-14 h-14 ${theme.colors.successIcon}`} />
                 </div>
               </div>

               <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${theme.colors.successText} font-mono text-lg tracking-widest uppercase font-bold`}
              >
                {theme.text.success}
              </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  // Render overlay at document body level using portal
  return typeof document !== 'undefined'
    ? createPortal(overlayContent, document.body)
    : null;
}