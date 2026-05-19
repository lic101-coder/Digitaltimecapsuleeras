/**
 * 🎨 ACHIEVEMENT VISUAL SYSTEM - Server Version
 * Comprehensive icon and color mappings for all 57 achievements (v2.8.0)
 * Each achievement has unique colors that match its theme and purpose
 */

export interface AchievementVisual {
  icon: string;
  gradientStart: string;
  gradientEnd: string;
  particleColor: string;
  glowColor: string;
  animation?: string;
}

export const ACHIEVEMENT_VISUALS: Record<string, AchievementVisual> = {
  // STARTER ACHIEVEMENTS (A001-A010, skipping A007)
  A001: { icon: 'Rocket', gradientStart: '#60A5FA', gradientEnd: '#2563EB', particleColor: '#93C5FD', glowColor: '#3B82F6' },
  A002: { icon: 'Send', gradientStart: '#A78BFA', gradientEnd: '#7C3AED', particleColor: '#DDD6FE', glowColor: '#8B5CF6' },
  A003: { icon: 'Mailbox', gradientStart: '#FBBF24', gradientEnd: '#D97706', particleColor: '#FCD34D', glowColor: '#F59E0B' },
  A004: { icon: 'Camera', gradientStart: '#34D399', gradientEnd: '#059669', particleColor: '#6EE7B7', glowColor: '#10B981' },
  A005: { icon: 'Film', gradientStart: '#F59E0B', gradientEnd: '#DC2626', particleColor: '#FCD34D', glowColor: '#F97316' },
  A006: { icon: 'Mic', gradientStart: '#EC4899', gradientEnd: '#BE185D', particleColor: '#FBCFE8', glowColor: '#DB2777' },
  A008: { icon: 'Archive', gradientStart: '#14B8A6', gradientEnd: '#0F766E', particleColor: '#5EEAD4', glowColor: '#0D9488' },
  A009: { icon: 'Package', gradientStart: '#818CF8', gradientEnd: '#4F46E5', particleColor: '#A5B4FC', glowColor: '#6366F1' },
  A010: { icon: 'Users', gradientStart: '#22D3EE', gradientEnd: '#0891B2', particleColor: '#67E8F9', glowColor: '#06B6D4' },
  
  // ERA-THEMED & CONSISTENCY (A011-A018)
  A011: { icon: 'Sunrise', gradientStart: '#FB923C', gradientEnd: '#EA580C', particleColor: '#FDBA74', glowColor: '#F97316' },
  A012: { icon: 'Sunset', gradientStart: '#FBBF24', gradientEnd: '#F59E0B', particleColor: '#FDE047', glowColor: '#FBBF24' },
  A013: { icon: 'Moon', gradientStart: '#A78BFA', gradientEnd: '#6366F1', particleColor: '#C4B5FD', glowColor: '#818CF8' },
  A014: { icon: 'MoonStar', gradientStart: '#3B82F6', gradientEnd: '#1E3A8A', particleColor: '#60A5FA', glowColor: '#2563EB' },
  A015: { icon: 'Flame', gradientStart: '#F97316', gradientEnd: '#C2410C', particleColor: '#FB923C', glowColor: '#EA580C' },
  A016: { icon: 'CalendarDays', gradientStart: '#14B8A6', gradientEnd: '#0D9488', particleColor: '#2DD4BF', glowColor: '#14B8A6' },
  A017: { icon: 'Target', gradientStart: '#FBBF24', gradientEnd: '#D97706', particleColor: '#FDE047', glowColor: '#F59E0B' },
  A018: { icon: 'Sparkles', gradientStart: '#60A5FA', gradientEnd: '#1E40AF', particleColor: '#93C5FD', glowColor: '#3B82F6' },
  
  // TIME & VOLUME MASTERY (A019-A027)
  A019: { icon: 'Clock', gradientStart: '#22D3EE', gradientEnd: '#0E7490', particleColor: '#67E8F9', glowColor: '#06B6D4' },
  A020: { icon: 'Hourglass', gradientStart: '#C084FC', gradientEnd: '#7C3AED', particleColor: '#E9D5FF', glowColor: '#A855F7' },
  A021: { icon: 'CalendarRange', gradientStart: '#FCD34D', gradientEnd: '#CA8A04', particleColor: '#FEF08A', glowColor: '#EAB308' },
  A022: { icon: 'Cake', gradientStart: '#F472B6', gradientEnd: '#DB2777', particleColor: '#FBCFE8', glowColor: '#EC4899' },
  A023: { icon: 'Package', gradientStart: '#60A5FA', gradientEnd: '#1D4ED8', particleColor: '#93C5FD', glowColor: '#3B82F6' },
  A024: { icon: 'Archive', gradientStart: '#FBBF24', gradientEnd: '#B45309', particleColor: '#FDE047', glowColor: '#F59E0B' },
  A025: { icon: 'Landmark', gradientStart: '#A78BFA', gradientEnd: '#6366F1', particleColor: '#C4B5FD', glowColor: '#8B5CF6' },
  A026: { icon: 'Moon', gradientStart: '#4338CA', gradientEnd: '#1E1B4B', particleColor: '#818CF8', glowColor: '#6366F1' },       // Midnight Creator
  A027: { icon: 'Sparkles', gradientStart: '#7C3AED', gradientEnd: '#4338CA', particleColor: '#C4B5FD', glowColor: '#8B5CF6' }, // New Year's Spirit
  
  // SPECIAL & LEGENDARY (A028-A036)
  A028: { icon: 'Wand2', gradientStart: '#A78BFA', gradientEnd: '#7C3AED', particleColor: '#DDD6FE', glowColor: '#8B5CF6' },
  A029: { icon: 'Layers', gradientStart: '#FBBF24', gradientEnd: '#D97706', particleColor: '#FDE047', glowColor: '#F59E0B' },
  A030: { icon: 'CalendarClock', gradientStart: '#10B981', gradientEnd: '#047857', particleColor: '#6EE7B7', glowColor: '#059669' },
  A031: { icon: 'CalendarCheck2', gradientStart: '#EF4444', gradientEnd: '#B91C1C', particleColor: '#FCA5A5', glowColor: '#DC2626' },
  A032: { icon: 'RefreshCcw', gradientStart: '#22D3EE', gradientEnd: '#0E7490', particleColor: '#A5F3FC', glowColor: '#06B6D4' },
  A033: { icon: 'Users', gradientStart: '#EC4899', gradientEnd: '#A855F7', particleColor: '#F9A8D4', glowColor: '#D946EF' },
  A034: { icon: 'Trophy', gradientStart: '#FBBF24', gradientEnd: '#B45309', particleColor: '#FDE68A', glowColor: '#D97706' },
  A035: { icon: 'Crown', gradientStart: '#F59E0B', gradientEnd: '#8B5CF6', particleColor: '#FCD34D', glowColor: '#A855F7' },
  A036: { icon: 'Shield', gradientStart: '#6366F1', gradientEnd: '#3B82F6', particleColor: '#A5B4FC', glowColor: '#818CF8' },
  
  // NEW ACHIEVEMENTS V2.1.0 (A037-A045)
  A037: { icon: 'Gift', gradientStart: '#EF4444', gradientEnd: '#DC2626', particleColor: '#FCA5A5', glowColor: '#B91C1C' },
  A038: { icon: 'Sticker', gradientStart: '#FDE047', gradientEnd: '#EC4899', particleColor: '#FEF08A', glowColor: '#FBBF24' },
  A039: { icon: 'AudioWaveform', gradientStart: '#FB923C', gradientEnd: '#EA580C', particleColor: '#FDBA74', glowColor: '#F97316' },
  A040: { icon: 'Shapes', gradientStart: '#22D3EE', gradientEnd: '#0891B2', particleColor: '#67E8F9', glowColor: '#06B6D4' },
  A041: { icon: 'Compass', gradientStart: '#10B981', gradientEnd: '#047857', particleColor: '#6EE7B7', glowColor: '#059669' },
  A042: { icon: 'Flame', gradientStart: '#F97316', gradientEnd: '#DC2626', particleColor: '#FB923C', glowColor: '#EA580C' },
  A043: { icon: 'Sunrise', gradientStart: '#FDE047', gradientEnd: '#F59E0B', particleColor: '#FEF3C7', glowColor: '#FBBF24' },
  A044: { icon: 'Stars', gradientStart: '#8B5CF6', gradientEnd: '#3B82F6', particleColor: '#C4B5FD', glowColor: '#6366F1' },
  A045: { icon: 'Cloud', gradientStart: '#60A5FA', gradientEnd: '#3B82F6', particleColor: '#DBEAFE', glowColor: '#2563EB' },
  
  // VAULT FOLDER ACHIEVEMENTS v2.8.0 (A046-A047) — Folder Pioneer / Folder Architect
  A046: { icon: 'FolderOpen', gradientStart: '#475569', gradientEnd: '#1E293B', particleColor: '#94A3B8', glowColor: '#64748B' },
  A047: { icon: 'FolderOpen', gradientStart: '#1E40AF', gradientEnd: '#1E3A8A', particleColor: '#60A5FA', glowColor: '#2563EB' },
  
  // EPIC TIER ACHIEVEMENTS (A048-A053)
  A048: { icon: 'Heart', gradientStart: '#F472B6', gradientEnd: '#BE185D', particleColor: '#FBCFE8', glowColor: '#DB2777' },
  A049: { icon: 'PartyPopper', gradientStart: '#FBBF24', gradientEnd: '#EC4899', particleColor: '#FDE047', glowColor: '#F59E0B' },
  A050: { icon: 'Gem', gradientStart: '#06B6D4', gradientEnd: '#0891B2', particleColor: '#67E8F9', glowColor: '#22D3EE' },
  A051: { icon: 'ImagePlay', gradientStart: '#A855F7', gradientEnd: '#7C3AED', particleColor: '#D8B4FE', glowColor: '#9333EA' },
  A052: { icon: 'Mountain', gradientStart: '#78350F', gradientEnd: '#431407', particleColor: '#A16207', glowColor: '#92400E' },
  A053: { icon: 'Radio', gradientStart: '#3B82F6', gradientEnd: '#1E40AF', particleColor: '#93C5FD', glowColor: '#2563EB' },
  
  // ECHO ACHIEVEMENTS (ECH001-ECH002)
  ECH001: { icon: 'Waves', gradientStart: '#14B8A6', gradientEnd: '#0F766E', particleColor: '#5EEAD4', glowColor: '#14B8A6' },
  ECH002: { icon: 'Waves', gradientStart: '#A855F7', gradientEnd: '#FBBF24', particleColor: '#D8B4FE', glowColor: '#C084FC' },
  
  // MULTI-RECIPIENT ACHIEVEMENTS (MR001-MR002)
  MR001: { icon: 'Users', gradientStart: '#3B82F6', gradientEnd: '#8B5CF6', particleColor: '#93C5FD', glowColor: '#6366F1' },
  MR002: { icon: 'Send', gradientStart: '#FBBF24', gradientEnd: '#F97316', particleColor: '#FDE047', glowColor: '#F59E0B' },
  
  // SPECIAL EPIC ACHIEVEMENT (E008)
  E008: { icon: 'Palette', gradientStart: '#EC4899', gradientEnd: '#8B5CF6', particleColor: '#F9A8D4', glowColor: '#C084FC' }
};

/**
 * Get visual configuration for an achievement
 */
export function getAchievementVisual(achievementId: string): AchievementVisual {
  return ACHIEVEMENT_VISUALS[achievementId] || {
    icon: 'Trophy',
    gradientStart: '#6B7280',
    gradientEnd: '#374151',
    particleColor: '#9CA3AF',
    glowColor: '#6B7280'
  };
}
