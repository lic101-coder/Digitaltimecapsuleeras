import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Lock } from 'lucide-react';
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

// ─── Icon badge — emoji inside a glowing coloured disc ───────────────────────
// Uses the emoji already defined on each ThemeConfig, displayed at full
// OS-native colour inside a radial glow ring keyed to the theme's accent.
function ThemeIconBadge({
  theme,
  size = 40,
  locked = false,
}: {
  theme: ThemeConfig;
  size?: number;
  locked?: boolean;
}) {
  const Icon = theme.icon;
  const discSize = Math.round(size * 1.72);
  const color = theme.primaryColor;

  return (
    <div
      style={{
        width: discSize,
        height: discSize,
        borderRadius: '50%',
        background: locked
          ? 'rgba(255,255,255,0.06)'
          : `radial-gradient(circle at 38% 36%, ${color}55 0%, ${color}22 55%, transparent 100%)`,
        boxShadow: locked ? 'none' : `0 0 18px 2px ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon style={{ fontSize: size, filter: locked ? 'grayscale(1) opacity(0.35)' : undefined }} />
    </div>
  );
}

// ─── Hero card — Standard Eras ────────────────────────────────────────────────
function HeroCard({
  theme,
  isSelected,
  justSelected,
  onClick,
  isMobile,
}: {
  theme: ThemeConfig;
  isSelected: boolean;
  justSelected: boolean;
  onClick: () => void;
  isMobile: boolean;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: isMobile ? 1.005 : 1.01 }}
      whileTap={{ scale: 0.985 }}
      animate={justSelected ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      initial={{ opacity: 0, y: 16 }}
      className="cursor-pointer"
      style={{ animationFillMode: 'both' }}
    >
      <div
        className={`
          relative rounded-2xl overflow-hidden transition-all duration-300
          ${isSelected
            ? 'border-2 border-white/80 shadow-[0_0_0_4px_rgba(255,255,255,0.1)]'
            : 'border border-white/12 hover:border-white/30'
          }
        `}
        style={{ minHeight: isMobile ? 100 : 116 }}
      >
        {/* Animated deep gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #1c1c3a 100%)',
              'linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #0c1a2e 100%)',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />

        {/* Subtle star shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 75% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Selected tint */}
        {isSelected && (
          <div className="absolute inset-0 bg-white/[0.04] pointer-events-none" />
        )}

        {/* Checkmark — absolute top-right */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-3 right-3 z-10 bg-white text-black rounded-full shadow-lg p-1.5"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            >
              <Check className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content — centered like all other cards */}
        <div className={`relative flex flex-col items-center text-center ${isMobile ? 'px-5 pt-5 pb-4 gap-2' : 'px-6 pt-6 pb-5 gap-2.5'}`}>
          <motion.div
            animate={{ filter: isSelected ? 'drop-shadow(0 0 14px rgba(165,180,252,0.7))' : 'drop-shadow(0 0 8px rgba(165,180,252,0.35))' }}
            transition={{ duration: 0.4 }}
          >
            <ThemeIconBadge theme={theme} size={isMobile ? 44 : 52} />
          </motion.div>
          <div>
            <div className="flex items-baseline justify-center gap-2.5 flex-wrap">
              <h2 className={`font-bold text-white tracking-tight leading-none ${isMobile ? 'text-lg' : 'text-xl'}`}>
                {theme.name}
              </h2>
              <span className="text-[11px] font-semibold text-indigo-300/70 tracking-wide uppercase">
                Free
              </span>
            </div>
            <p className={`text-white/55 mt-1.5 leading-snug ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>
              {theme.description}
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          animate={{ opacity: isSelected ? 0.9 : 0.35 }}
          style={{ background: 'linear-gradient(to right, #6366f1, #a5b4fc, #6366f1)' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Theme card ───────────────────────────────────────────────────────────────
function ThemeCard({
  theme,
  isSelected,
  isLocked,
  justSelected,
  onClick,
  isMobile,
  animDelay = 0,
}: {
  theme: ThemeConfig;
  isSelected: boolean;
  isLocked: boolean;
  justSelected: boolean;
  onClick: () => void;
  isMobile: boolean;
  animDelay?: number;
}) {
  const color = theme.primaryColor;

  return (
    <motion.div
      onClick={onClick}
      whileHover={isLocked ? {} : { scale: isMobile ? 1.01 : 1.025, y: -2 }}
      whileTap={{ scale: 0.96 }}
      animate={justSelected ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ animationDelay: `${animDelay}s` } as React.CSSProperties}
      className="cursor-pointer h-full"
    >
      <div
        className={`
          relative h-full rounded-2xl overflow-hidden transition-all duration-300
          ${isLocked
            ? 'border border-white/8 bg-white/[0.02] opacity-65 hover:opacity-85'
            : isSelected
              ? 'border-2 shadow-lg bg-white/[0.07]'
              : 'border border-white/10 bg-white/[0.03] hover:border-white/22 hover:bg-white/[0.06]'
          }
        `}
        style={isSelected ? { borderColor: `${color}cc`, boxShadow: `0 0 0 3px ${color}22` } : {}}
      >
        {/* Top color bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
          style={{ background: isLocked ? 'rgba(255,255,255,0.08)' : color }}
        />

        {/* Radial color wash from top */}
        {!isLocked && (
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% -10%, ${color}28 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-[2px] rounded-2xl">
            <div className="text-center px-3">
              <motion.div
                animate={{ rotate: [0, -6, 6, -6, 6, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              >
                <Lock className="w-6 h-6 text-amber-400 mx-auto mb-1 drop-shadow-lg" />
              </motion.div>
              <p className="text-white font-semibold text-[11px]">Premium</p>
              <p className="text-white/50 text-[10px] mt-0.5">Tap to unlock</p>
            </div>
          </div>
        )}

        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-2.5 right-2.5 z-10 text-white rounded-full shadow-lg p-0.5"
              style={{ background: color }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
            >
              <Check className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card content */}
        <div className={`flex flex-col items-center text-center ${isMobile ? 'pt-5 pb-4 px-2.5 gap-2' : 'pt-6 pb-4 px-3 gap-2.5'}`}>
          <motion.div
            animate={{
              filter: isSelected
                ? `drop-shadow(0 0 10px ${color}90)`
                : `drop-shadow(0 0 5px ${color}50)`,
            }}
            transition={{ duration: 0.35 }}
          >
            <ThemeIconBadge
              theme={theme}
              size={isMobile ? 34 : 38}
              locked={isLocked}
            />
          </motion.div>

          <div>
            <h3
              className={`font-semibold text-white leading-snug ${isMobile ? 'text-[13px]' : 'text-[14px]'}`}
            >
              {theme.name}
            </h3>
            <p
              className={`text-white/45 leading-snug mt-1 line-clamp-2 ${isMobile ? 'text-[11px]' : 'text-[11.5px]'}`}
            >
              {theme.description}
            </p>
            {!isLocked && (
              <span className="inline-block mt-1.5 text-[10px] font-medium text-white/28 tracking-wide">
                {FREE_THEME_IDS.includes(theme.id) ? 'Free' : 'Premium'}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-white/8" />
      <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/28 select-none">
        {children}
      </span>
      <div className="h-px flex-1 bg-white/8" />
    </div>
  );
}

// ─── Main ThemeSelector ────────────────────────────────────────────────────────
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
  const standard = allThemes.find((t) => t.id === 'standard')!;
  const otherFree = allThemes.filter(
    (t) => FREE_THEME_IDS.includes(t.id) && t.id !== 'standard',
  );
  const premium = allThemes
    .filter((t) => !FREE_THEME_IDS.includes(t.id))
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
    <div className="flex flex-col gap-4">

      {/* ── Hero: Standard Eras ── */}
      <HeroCard
        theme={standard}
        isSelected={selectedThemeId === 'standard'}
        justSelected={justSelected === 'standard'}
        onClick={() => handleSelect('standard')}
        isMobile={isMobile}
      />

      {/* ── Free themes ── */}
      <SectionLabel>Free Themes</SectionLabel>
      <div className={`grid gap-3 ${isMobile ? 'grid-cols-3' : 'grid-cols-3'}`}>
        {otherFree.map((theme, i) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            isLocked={false}
            justSelected={justSelected === theme.id}
            onClick={() => handleSelect(theme.id)}
            isMobile={isMobile}
            animDelay={0.05 + i * 0.06}
          />
        ))}
      </div>

      {/* ── Premium themes ── */}
      <SectionLabel>Premium Themes</SectionLabel>

      <div className="grid grid-cols-3 gap-3">
        {premium.map((theme, i) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={selectedThemeId === theme.id}
            isLocked={isLockedFn(theme.id)}
            justSelected={justSelected === theme.id}
            onClick={() => handleSelect(theme.id)}
            isMobile={isMobile}
            animDelay={0.08 + i * 0.04}
          />
        ))}
        <MoreComingCard isMobile={isMobile} />
      </div>

    </div>
  );
}

// ─── More Coming Soon card ────────────────────────────────────────────────────
function MoreComingCard({ isMobile }: { isMobile: boolean }) {
  // Ghost icon colors — three blurred silhouettes teasing future themes
  const ghostColors = ['#818cf8', '#f472b6', '#34d399'];
  const ghostEmojis = ['🎉', '✈️', '💼'];

  return (
    <motion.div
      className="relative h-full rounded-2xl overflow-hidden border border-dashed border-white/15 select-none"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.06) 50%, rgba(236,72,153,0.06) 100%)',
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {/* Gradient top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-50"
        style={{ background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)' }}
      />

      <div className={`flex flex-col items-center text-center ${isMobile ? 'pt-5 pb-4 px-2.5 gap-2' : 'pt-6 pb-4 px-3 gap-2.5'}`}>

        {/* Three ghosted/blurred icon silhouettes */}
        <div className="flex items-center justify-center gap-1.5">
          {ghostEmojis.map((emoji, i) => (
            <motion.div
              key={emoji}
              animate={{ opacity: [0.18, 0.38, 0.18] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
              style={{
                fontSize: isMobile ? 20 : 22,
                filter: `blur(1px) drop-shadow(0 0 4px ${ghostColors[i]}40)`,
                lineHeight: 1,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className={`font-semibold text-white/45 leading-snug ${isMobile ? 'text-[12px]' : 'text-[13px]'}`}>
            More Coming
          </h3>
          <p className={`text-white/28 leading-snug mt-1 ${isMobile ? 'text-[10px]' : 'text-[11px]'}`}>
            New themes added monthly
          </p>
        </div>
      </div>
    </motion.div>
  );
}
