import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info, Lock, Sparkles } from 'lucide-react';
import { THEMES, ThemeId, ThemeConfig } from './ThemeRegistry';
import { Card } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useIsMobile } from '../ui/use-mobile';

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  purchasedThemes?: string[]; // Array of purchased theme IDs
  purchasedThemesLoading?: boolean; // Loading state to prevent flicker
  onNavigateToStore?: () => void; // Callback to navigate to Store
}

// Free themes that are always unlocked
const FREE_THEME_IDS = ['standard', 'birthday', 'anniversary', 'first_day'];

export function ThemeSelector({ selectedThemeId, onSelectTheme, purchasedThemes = [], purchasedThemesLoading = false, onNavigateToStore }: ThemeSelectorProps) {
  const isMobile = useIsMobile();
  const [justSelected, setJustSelected] = React.useState<string | null>(null);

  const handleSelect = (themeId: string) => {
    // Check if theme is locked
    const isLocked = !FREE_THEME_IDS.includes(themeId) && !purchasedThemes.includes(themeId);
    
    if (isLocked) {
      // Navigate to Store if handler provided
      if (onNavigateToStore) {
        onNavigateToStore();
      }
      return;
    }
    
    setJustSelected(themeId);
    onSelectTheme(themeId);
    
    // Clear animation state after animation completes
    setTimeout(() => {
      setJustSelected(null);
    }, 600);
  };

  return (
    <div className={`grid gap-4 md:gap-5 ${ 
      isMobile 
        ? 'grid-cols-2' // Mobile: 2 columns, Standard spans both
        : 'grid-cols-2 lg:grid-cols-3' // Desktop: 2-3 columns
    }`}>
      {Object.values(THEMES)
        // Sort: Unlocked themes first, then locked themes
        .sort((a, b) => {
          const aLocked = !FREE_THEME_IDS.includes(a.id) && !purchasedThemes.includes(a.id);
          const bLocked = !FREE_THEME_IDS.includes(b.id) && !purchasedThemes.includes(b.id);
          
          // Unlocked comes first (false < true)
          if (aLocked !== bLocked) {
            return aLocked ? 1 : -1;
          }
          
          // Within same lock status, maintain original order
          return 0;
        })
        .map((theme, index) => {
        const isSelected = selectedThemeId === theme.id;
        const Icon = theme.icon;
        const isStandard = theme.id === 'standard';

        // Determine if the theme is locked (while loading, assume unlocked to prevent flicker)
        const isLocked = purchasedThemesLoading 
          ? false 
          : !FREE_THEME_IDS.includes(theme.id) && !purchasedThemes.includes(theme.id);

        return (
          <motion.div
            key={theme.id}
            whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(theme.id)}
            className={`cursor-pointer h-full ${ 
              isMobile && isStandard ? 'col-span-2' : '' // Standard Eras spans both columns on mobile
            }`}
            // Pulse animation when just selected
            animate={justSelected === theme.id ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 0.4,
              ease: 'easeOut'
            }}
          >
            <Card 
              className={`h-full relative overflow-hidden transition-all duration-300 border-2 ${ 
                isLocked 
                  ? 'border-gray-600/50 bg-gray-900/40 opacity-75 hover:opacity-90' // Locked state
                  : isSelected 
                    ? 'border-white ring-4 ring-white/20 shadow-2xl shadow-white/10' 
                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
              } ${ 
                isMobile 
                  ? 'min-h-[150px]' // Mobile: slightly taller for better spacing
                  : 'min-h-[180px]' // Desktop: taller cards
              }`}
              style={{
                background: isLocked 
                  ? 'rgba(30, 30, 30, 0.5)' // Dark locked background
                  : isSelected 
                    ? (isMobile ? theme.primaryColor : theme.bgGradient)
                    : 'rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Lock Overlay for Locked Themes */}
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
                  <div className="text-center px-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <Lock className="w-12 h-12 text-amber-400 mx-auto mb-3 drop-shadow-lg" />
                    </motion.div>
                    <p className="text-white font-bold text-sm mb-1">Premium Theme</p>
                    <p className="text-white/70 text-xs">Tap to unlock in Store</p>
                  </div>
                </div>
              )}
              
              {/* Animated Glow Effect on Selection */}
              {justSelected === theme.id && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}40, ${theme.secondaryColor || theme.primaryColor}40)`,
                    filter: 'blur(12px)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              )}
              
              {/* Selected Indicator with Animation */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    className={`absolute bg-white text-black rounded-full shadow-lg z-10 ${ 
                      isMobile 
                        ? 'top-2.5 right-2.5 p-1' // Mobile: better visibility
                        : 'top-3 right-3 p-1.5'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 400,
                      damping: 20 
                    }}
                  >
                    <Check className={isMobile ? 'w-3.5 h-3.5' : 'w-5 h-5'} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`flex flex-col h-full justify-between ${ 
                isMobile 
                  ? 'p-4 gap-3' // Mobile: better padding and spacing
                  : 'p-6 gap-4' // Desktop: generous padding
              }`}>
                {/* Header */}
                <div className={`flex ${ 
                  isMobile 
                    ? 'gap-3 flex-col items-start' // Mobile: vertical layout
                    : 'gap-4 items-center' // Desktop: horizontal layout
                }`}>
                  {/* Emoji Icon */}
                  <Icon 
                    className="flex-shrink-0 transition-all duration-300" 
                    style={{ 
                      fontSize: isMobile ? '2.75rem' : '4rem', // Mobile: larger emoji, Desktop: even bigger
                      filter: isSelected 
                        ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' 
                        : 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                    }}
                  />
                  <div className={`flex-1 ${isMobile ? 'w-full' : 'min-w-0'}`}>
                    <h3 className={`font-bold leading-tight tracking-tight transition-all duration-300 ${ 
                      isMobile 
                        ? 'text-base' // Mobile: larger text
                        : 'text-lg truncate' // Desktop: bigger text
                    } ${ 
                      isSelected ? 'text-white drop-shadow-lg' : 'text-white/95'
                    }`}>
                      {theme.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className={`leading-relaxed transition-all duration-300 ${ 
                  isMobile 
                    ? 'text-xs line-clamp-2' // Mobile: compact
                    : 'text-sm line-clamp-2' // Desktop: larger text, 2 lines
                } ${ 
                  isSelected ? 'text-white/95 font-medium' : 'text-white/70'
                }`}>
                  {theme.description}
                </p>

                {/* Premium Badge for Owned Premium Themes */}
                {!isLocked && !FREE_THEME_IDS.includes(theme.id) && (
                  <div className="absolute top-2 right-2">
                    <motion.div
                      initial={{ rotate: -15 }}
                      animate={{ rotate: 15 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-amber-400 drop-shadow-lg" />
                    </motion.div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}