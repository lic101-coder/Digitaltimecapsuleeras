import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock, Sparkles } from 'lucide-react';
import { THEMES, ThemeId, ThemeConfig } from './ThemeRegistry';
import { useIsMobile } from '../ui/use-mobile';

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (themeId: string) => void;
  purchasedThemes?: string[];
  purchasedThemesLoading?: boolean;
  onNavigateToStore?: () => void;
}

const FREE_THEME_IDS = ['standard', 'birthday', 'anniversary', 'first_day'];

// ── Individual theme card ─────────────────────────────────────────────────────
function ThemeCard({
  theme,
  isSelected,
  isLocked,
  isFeatured,
  justSelected,
  onClick,
  isMobile,
}: {
  theme: ThemeConfig;
  isSelected: boolean;
  isLocked: boolean;
  isFeatured: boolean;
  justSelected: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  const Icon = theme.icon;
  const accentColor = isFeatured ? '#3b82f6' : theme.primaryColor;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: isMobile ? 1.01 : 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      animate={justSelected ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="cursor-pointer h-full"
    >
      <div
        className={`
          relative h-full rounded-2xl overflow-hidden
          transition-all duration-300
          ${isLocked
            ? 'border border-white/8 bg-white/[0.03] opacity-70 hover:opacity-90'
            : isSelected
              ? 'border-2 border-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)] bg-white/[0.08]'
              : 'border border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]'
          }
        `}
      >
        {/* Colored top strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{ background: isLocked ? 'rgba(255,255,255,0.1)' : accentColor }}
        />

        {/* Soft color wash beneath top strip when selected */}
        {isSelected && !isLocked && (
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${accentColor}22 0%, transparent 100%)`,
            }}
          />
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/55 backdrop-blur-[2px] rounded-2xl">
            <div className="text-center px-3">
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2.5 }}
              >
                <Lock className="w-7 h-7 text-amber-400 mx-auto mb-1.5 drop-shadow-lg" />
              </motion.div>
              <p className="text-white font-semibold text-xs">Premium</p>
              <p className="text-white/55 text-[10px] mt-0.5">Tap to unlock</p>
            </div>
          </div>
        )}

        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-3 right-3 z-10 bg-white text-black rounded-full shadow-lg p-1"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Owned premium sparkle badge */}
        {!isLocked && !FREE_THEME_IDS.includes(theme.id) && (
          <motion.div
            className="absolute top-3 right-3 z-10"
            animate={{ rotate: [-12, 12] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4 text-amber-400 drop-shadow" />
          </motion.div>
        )}

        {/* ── FEATURED layout (Standard Eras hero) ── */}
        {isFeatured ? (
          <div className={`flex flex-col items-center text-center h-full ${isMobile ? 'p-4 pt-5 gap-2.5' : 'p-5 pt-6 gap-3'}`}>
            <Icon
              className="flex-shrink-0"
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
              }}
            />
            <div>
              <div className="flex items-center justify-center gap-2 mb-1 flex-wrap">
                <h3 className={`font-bold text-white leading-tight ${isMobile ? 'text-[15px]' : 'text-base'}`}>
                  {theme.name}
                </h3>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase whitespace-nowrap">
                  Free · Included
                </span>
              </div>
              <p className={`text-white/60 leading-snug mt-1.5 line-clamp-3 ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>{theme.description}</p>
            </div>
          </div>
        ) : (
          /* ── STANDARD card layout ── */
          <div className={`flex flex-col items-center text-center h-full ${isMobile ? 'p-4 pt-5 gap-2.5' : 'p-5 pt-6 gap-3'}`}>
            <Icon
              className="flex-shrink-0"
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
              }}
            />
            <div>
              <h3 className={`font-bold text-white leading-tight ${isMobile ? 'text-[15px]' : 'text-base'}`}>
                {theme.name}
              </h3>
              {FREE_THEME_IDS.includes(theme.id) && theme.id !== 'standard' && (
                <span className="inline-block mt-1.5 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                  Free · Included
                </span>
              )}
              <p className={`text-white/60 leading-snug mt-1.5 line-clamp-3 ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>
                {theme.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Slim section divider label ────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      <div className="h-px flex-1 bg-white/8" />
      <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/30 select-none">
        {children}
      </span>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  );
}

// ── Main ThemeSelector ────────────────────────────────────────────────────────
export function ThemeSelector({
  selectedThemeId,
  onSelectTheme,
  purchasedThemes = [],
  purchasedThemesLoading = false,
  onNavigateToStore,
}: ThemeSelectorProps) {
  const isMobile = useIsMobile();
  const [justSelected, setJustSelected] = React.useState<string | null>(null);

  const handleSelect = (themeId: string) => {
    const isLocked =
      !FREE_THEME_IDS.includes(themeId) && !purchasedThemes.includes(themeId);
    if (isLocked) {
      onNavigateToStore?.();
      return;
    }
    setJustSelected(themeId);
    onSelectTheme(themeId);
    setTimeout(() => setJustSelected(null), 600);
  };

  const allThemes = Object.values(THEMES);
  const standard = allThemes.find(t => t.id === 'standard')!;
  const otherFree = allThemes.filter(
    t => FREE_THEME_IDS.includes(t.id) && t.id !== 'standard'
  );
  const premium = allThemes
    .filter(t => !FREE_THEME_IDS.includes(t.id))
    .sort((a, b) => {
      const aLocked = purchasedThemesLoading ? false : !purchasedThemes.includes(a.id);
      const bLocked = purchasedThemesLoading ? false : !purchasedThemes.includes(b.id);
      return aLocked === bLocked ? 0 : aLocked ? 1 : -1;
    });

  const isLockedFn = (id: string) =>
    purchasedThemesLoading
      ? false
      : !FREE_THEME_IDS.includes(id) && !purchasedThemes.includes(id);

  return (
    <div className="flex flex-col gap-3">

      {/* Row 1 — Standard Eras hero (full width) */}
      <ThemeCard
        theme={standard}
        isSelected={selectedThemeId === 'standard'}
        isLocked={false}
        isFeatured={true}
        justSelected={justSelected === 'standard'}
        onClick={() => handleSelect('standard')}
        isMobile={isMobile}
      />

      {/* Row 2 — Other free themes */}
      <SectionLabel>Free Themes</SectionLabel>
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {otherFree.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            isLocked={false}
            isFeatured={false}
            justSelected={justSelected === theme.id}
            onClick={() => handleSelect(theme.id)}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Row 3+ — Premium themes */}
      <SectionLabel>Premium Themes</SectionLabel>
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {premium.map(theme => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            isLocked={isLockedFn(theme.id)}
            isFeatured={false}
            justSelected={justSelected === theme.id}
            onClick={() => handleSelect(theme.id)}
            isMobile={isMobile}
          />
        ))}

        {/* "More coming" placeholder — fills the last row and teases future themes */}
        <div className="relative h-full rounded-2xl overflow-hidden border border-dashed border-white/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-violet-500/10 select-none">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 opacity-60" />
          <div className={`flex flex-col items-center text-center h-full ${isMobile ? 'p-4 pt-5 gap-2.5' : 'p-5 pt-6 gap-3'}`}>
            <motion.span
              style={{ fontSize: isMobile ? '2.5rem' : '3rem', lineHeight: 1 }}
              animate={{ rotate: [0, 15, -10, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            >
              ✨
            </motion.span>
            <div>
              <h3 className={`font-bold text-white/50 leading-tight ${isMobile ? 'text-[15px]' : 'text-base'}`}>
                More Coming Soon
              </h3>
              <p className={`text-white/35 leading-snug mt-1.5 ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>
                New themes are added regularly — stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
