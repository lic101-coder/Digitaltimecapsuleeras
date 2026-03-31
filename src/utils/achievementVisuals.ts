/**
 * 🎨 ACHIEVEMENT VISUAL SYSTEM
 * Comprehensive icon and color mappings for all 55 achievements
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
  // ============================================
  // STARTER ACHIEVEMENTS (A001-A010, skipping A007)
  // ============================================
  
  // A001: First Step - Bright blue rocket launch
  A001: {
    icon: 'Rocket',
    gradientStart: '#60A5FA', // Sky blue
    gradientEnd: '#2563EB',   // Deep blue
    particleColor: '#93C5FD',
    glowColor: '#3B82F6'
  },
  
  // A002: Into the Future - Purple send/message
  A002: {
    icon: 'Send',
    gradientStart: '#A78BFA', // Light purple
    gradientEnd: '#7C3AED',   // Deep purple
    particleColor: '#DDD6FE',
    glowColor: '#8B5CF6'
  },
  
  // A003: From the Past - Golden mailbox
  A003: {
    icon: 'Mailbox',
    gradientStart: '#FBBF24', // Yellow gold
    gradientEnd: '#D97706',   // Orange gold
    particleColor: '#FCD34D',
    glowColor: '#F59E0B'
  },
  
  // A004: Captured Moment - Green camera
  A004: {
    icon: 'Camera',
    gradientStart: '#34D399', // Mint green
    gradientEnd: '#059669',   // Forest green
    particleColor: '#6EE7B7',
    glowColor: '#10B981'
  },
  
  // A005: Motion Picture - Orange/red film reel
  A005: {
    icon: 'Film',
    gradientStart: '#F59E0B', // Bright orange
    gradientEnd: '#DC2626',   // Red
    particleColor: '#FCD34D',
    glowColor: '#F97316'
  },
  
  // A006: Voice of Time - Pink microphone
  A006: {
    icon: 'Mic',
    gradientStart: '#EC4899', // Hot pink
    gradientEnd: '#BE185D',   // Deep pink
    particleColor: '#FBCFE8',
    glowColor: '#DB2777'
  },
  
  // A008: Collection Started - Teal archive
  A008: {
    icon: 'Archive',
    gradientStart: '#14B8A6', // Teal
    gradientEnd: '#0F766E',   // Dark teal
    particleColor: '#5EEAD4',
    glowColor: '#0D9488'
  },
  
  // A009: Vault Opened - Indigo vault/safe
  A009: {
    icon: 'Package',
    gradientStart: '#818CF8', // Light indigo
    gradientEnd: '#4F46E5',   // Deep indigo
    particleColor: '#A5B4FC',
    glowColor: '#6366F1'
  },
  
  // A010: Memory Shared - Cyan share/users
  A010: {
    icon: 'Users',
    gradientStart: '#22D3EE', // Cyan
    gradientEnd: '#0891B2',   // Dark cyan
    particleColor: '#67E8F9',
    glowColor: '#06B6D4'
  },

  // ============================================
  // ERA-THEMED & CONSISTENCY (A011-A018)
  // ============================================
  
  // A011: Sunrise Sentinel - Sunrise orange
  A011: {
    icon: 'Sunrise',
    gradientStart: '#FB923C', // Light orange
    gradientEnd: '#EA580C',   // Deep orange
    particleColor: '#FDBA74',
    glowColor: '#F97316'
  },
  
  // A012: Golden Hour Guardian - Gold sunset
  A012: {
    icon: 'Sunset',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#F59E0B',   // Amber
    particleColor: '#FDE047',
    glowColor: '#FBBF24'
  },
  
  // A013: Twilight Keeper - Purple/blue twilight
  A013: {
    icon: 'Moon',
    gradientStart: '#A78BFA', // Light purple
    gradientEnd: '#6366F1',   // Indigo
    particleColor: '#C4B5FD',
    glowColor: '#818CF8'
  },
  
  // A014: Midnight Archivist - Dark blue moon
  A014: {
    icon: 'MoonStar',
    gradientStart: '#3B82F6', // Blue
    gradientEnd: '#1E3A8A',   // Navy
    particleColor: '#60A5FA',
    glowColor: '#2563EB'
  },
  
  // A015: Seven-Day Streak - Orange flame
  A015: {
    icon: 'Flame',
    gradientStart: '#F97316', // Bright orange
    gradientEnd: '#C2410C',   // Deep orange
    particleColor: '#FB923C',
    glowColor: '#EA580C'
  },
  
  // A016: Monthly Habit - Teal calendar
  A016: {
    icon: 'CalendarDays',
    gradientStart: '#14B8A6', // Teal
    gradientEnd: '#0D9488',   // Deep teal
    particleColor: '#2DD4BF',
    glowColor: '#14B8A6'
  },
  
  // A017: Memory Perfectionist - Gold target
  A017: {
    icon: 'Target',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#D97706',   // Dark gold
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },
  
  // A018: Detail Obsessive - Silver/blue sparkles
  A018: {
    icon: 'Sparkles',
    gradientStart: '#60A5FA', // Light blue
    gradientEnd: '#1E40AF',   // Deep blue
    particleColor: '#93C5FD',
    glowColor: '#3B82F6'
  },

  // ============================================
  // TIME & VOLUME MASTERY (A019-A027)
  // ============================================
  
  // A019: Patient Planner - Cyan clock
  A019: {
    icon: 'Clock',
    gradientStart: '#22D3EE', // Cyan
    gradientEnd: '#0E7490',   // Dark cyan
    particleColor: '#67E8F9',
    glowColor: '#06B6D4'
  },
  
  // A020: Time Traveler - Purple hourglass
  A020: {
    icon: 'Hourglass',
    gradientStart: '#C084FC', // Light purple
    gradientEnd: '#7C3AED',   // Deep purple
    particleColor: '#E9D5FF',
    glowColor: '#A855F7'
  },
  
  // A021: Decade Vision - Gold calendar range
  A021: {
    icon: 'CalendarRange',
    gradientStart: '#FCD34D', // Light gold
    gradientEnd: '#CA8A04',   // Dark gold
    particleColor: '#FEF08A',
    glowColor: '#EAB308'
  },
  
  // A022: Birthday Tradition - Pink cake
  A022: {
    icon: 'Cake',
    gradientStart: '#F472B6', // Pink
    gradientEnd: '#DB2777',   // Deep pink
    particleColor: '#FBCFE8',
    glowColor: '#EC4899'
  },
  
  // A023: Capsule Collector - Blue package
  A023: {
    icon: 'Package',
    gradientStart: '#60A5FA', // Sky blue
    gradientEnd: '#1D4ED8',   // Royal blue
    particleColor: '#93C5FD',
    glowColor: '#3B82F6'
  },
  
  // A024: Vault Master - Amber vault
  A024: {
    icon: 'Archive',
    gradientStart: '#FBBF24', // Amber
    gradientEnd: '#B45309',   // Brown
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },
  
  // A025: Legacy Builder - Purple landmark
  A025: {
    icon: 'Landmark',
    gradientStart: '#A78BFA', // Light purple
    gradientEnd: '#6366F1',   // Indigo
    particleColor: '#C4B5FD',
    glowColor: '#8B5CF6'
  },
  
  // A026: Epic Chronicler - Red film clapperboard
  A026: {
    icon: 'Clapperboard',
    gradientStart: '#EF4444', // Red
    gradientEnd: '#991B1B',   // Dark red
    particleColor: '#FCA5A5',
    glowColor: '#DC2626'
  },
  
  // A027: Limitless Archivist - Rainbow/multi globe
  A027: {
    icon: 'Globe',
    gradientStart: '#06B6D4', // Cyan
    gradientEnd: '#8B5CF6',   // Purple (gradient spectrum)
    particleColor: '#67E8F9',
    glowColor: '#A855F7'
  },

  // ============================================
  // SPECIAL & LEGENDARY (A028-A036)
  // ============================================
  
  // A028: Multimedia Master - Violet wand
  A028: {
    icon: 'Wand2',
    gradientStart: '#A78BFA', // Light purple
    gradientEnd: '#7C3AED',   // Deep purple
    particleColor: '#DDD6FE',
    glowColor: '#8B5CF6'
  },
  
  // A029: Complete Experience - Gold layers
  A029: {
    icon: 'Layers',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#D97706',   // Amber
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },
  
  // A030: Year in Review - Green calendar clock
  A030: {
    icon: 'CalendarClock',
    gradientStart: '#10B981', // Green
    gradientEnd: '#047857',   // Forest green
    particleColor: '#6EE7B7',
    glowColor: '#059669'
  },
  
  // A031: Anniversary Keeper - Red calendar check
  A031: {
    icon: 'CalendarCheck2',
    gradientStart: '#EF4444', // Red
    gradientEnd: '#B91C1C',   // Dark red
    particleColor: '#FCA5A5',
    glowColor: '#DC2626'
  },
  
  // A032: Resurrection - Cyan refresh/phoenix
  A032: {
    icon: 'RefreshCcw',
    gradientStart: '#22D3EE', // Cyan
    gradientEnd: '#0E7490',   // Dark cyan
    particleColor: '#A5F3FC',
    glowColor: '#06B6D4'
  },
  
  // A033: Social Butterfly - Pink/purple users/hearts
  A033: {
    icon: 'Users',
    gradientStart: '#EC4899', // Pink
    gradientEnd: '#A855F7',   // Purple
    particleColor: '#F9A8D4',
    glowColor: '#D946EF'
  },
  
  // A034: Time Capsule Pioneer - Gold trophy
  A034: {
    icon: 'Trophy',
    gradientStart: '#FBBF24', // Bright gold
    gradientEnd: '#B45309',   // Bronze
    particleColor: '#FDE68A',
    glowColor: '#D97706'
  },
  
  // A035: Vault Legend - Rainbow crown
  A035: {
    icon: 'Crown',
    gradientStart: '#F59E0B', // Gold
    gradientEnd: '#8B5CF6',   // Purple (royal)
    particleColor: '#FCD34D',
    glowColor: '#A855F7'
  },
  
  // A036: Master of Time - Purple/blue shield
  A036: {
    icon: 'Shield',
    gradientStart: '#6366F1', // Indigo
    gradientEnd: '#3B82F6',   // Blue
    particleColor: '#A5B4FC',
    glowColor: '#818CF8'
  },

  // ============================================
  // NEW ACHIEVEMENTS V2.1.0 (A037-A045)
  // ============================================
  
  // A037: Gift Giver - Red gift box
  A037: {
    icon: 'Gift',
    gradientStart: '#EF4444', // Red
    gradientEnd: '#DC2626',   // Dark red
    particleColor: '#FCA5A5',
    glowColor: '#B91C1C'
  },
  
  // A038: Sticker Collector - Yellow/pink sticker
  A038: {
    icon: 'Sticker',
    gradientStart: '#FDE047', // Yellow
    gradientEnd: '#EC4899',   // Pink
    particleColor: '#FEF08A',
    glowColor: '#FBBF24'
  },
  
  // A039: Audio Aficionado - Orange audio waveform
  A039: {
    icon: 'AudioWaveform',
    gradientStart: '#FB923C', // Orange
    gradientEnd: '#EA580C',   // Deep orange
    particleColor: '#FDBA74',
    glowColor: '#F97316'
  },
  
  // A040: Shape Shifter - Cyan shapes
  A040: {
    icon: 'Shapes',
    gradientStart: '#22D3EE', // Cyan
    gradientEnd: '#0891B2',   // Dark cyan
    particleColor: '#67E8F9',
    glowColor: '#06B6D4'
  },
  
  // A041: Explorer - Green compass
  A041: {
    icon: 'Compass',
    gradientStart: '#10B981', // Green
    gradientEnd: '#047857',   // Forest green
    particleColor: '#6EE7B7',
    glowColor: '#059669'
  },
  
  // A042: Eternal Flame - Orange/red flame
  A042: {
    icon: 'Flame',
    gradientStart: '#F97316', // Bright orange
    gradientEnd: '#DC2626',   // Red
    particleColor: '#FB923C',
    glowColor: '#EA580C'
  },
  
  // A043: Dawn Chaser - Sunrise golden
  A043: {
    icon: 'Sunrise',
    gradientStart: '#FDE047', // Light yellow
    gradientEnd: '#F59E0B',   // Orange
    particleColor: '#FEF3C7',
    glowColor: '#FBBF24'
  },
  
  // A044: Star Gazer - Purple/blue stars
  A044: {
    icon: 'Stars',
    gradientStart: '#8B5CF6', // Purple
    gradientEnd: '#3B82F6',   // Blue
    particleColor: '#C4B5FD',
    glowColor: '#6366F1'
  },
  
  // A045: Cloud Walker - Light blue cloud
  A045: {
    icon: 'Cloud',
    gradientStart: '#60A5FA', // Sky blue
    gradientEnd: '#3B82F6',   // Blue
    particleColor: '#DBEAFE',
    glowColor: '#2563EB'
  },

  // ============================================
  // VAULT ACHIEVEMENTS (A046-A047)
  // ============================================
  
  // A046: Vault Organizer - Teal folder open
  A046: {
    icon: 'FolderOpen',
    gradientStart: '#14B8A6', // Teal
    gradientEnd: '#0D9488',   // Dark teal
    particleColor: '#5EEAD4',
    glowColor: '#14B8A6'
  },
  
  // A047: Master Organizer - Gold hard drive
  A047: {
    icon: 'HardDrive',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#D97706',   // Amber
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },

  // ============================================
  // EPIC TIER ACHIEVEMENTS (A048-A053)
  // ============================================
  
  // A048: Heartfelt Memories - Pink heart
  A048: {
    icon: 'Heart',
    gradientStart: '#F472B6', // Pink
    gradientEnd: '#BE185D',   // Deep pink
    particleColor: '#FBCFE8',
    glowColor: '#DB2777'
  },
  
  // A049: Celebration Expert - Rainbow party popper
  A049: {
    icon: 'PartyPopper',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#EC4899',   // Pink
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },
  
  // A050: Precious Moments - Diamond/cyan gem
  A050: {
    icon: 'Gem',
    gradientStart: '#06B6D4', // Cyan
    gradientEnd: '#0891B2',   // Dark cyan
    particleColor: '#67E8F9',
    glowColor: '#22D3EE'
  },
  
  // A051: Visual Storyteller - Purple image play
  A051: {
    icon: 'ImagePlay',
    gradientStart: '#A855F7', // Purple
    gradientEnd: '#7C3AED',   // Deep purple
    particleColor: '#D8B4FE',
    glowColor: '#9333EA'
  },
  
  // A052: Memory Mountain - Brown mountain
  A052: {
    icon: 'Mountain',
    gradientStart: '#78350F', // Brown
    gradientEnd: '#431407',   // Dark brown
    particleColor: '#A16207',
    glowColor: '#92400E'
  },
  
  // A053: Echo Chamber - Blue radio/waves
  A053: {
    icon: 'Radio',
    gradientStart: '#3B82F6', // Blue
    gradientEnd: '#1E40AF',   // Dark blue
    particleColor: '#93C5FD',
    glowColor: '#2563EB'
  },

  // ============================================
  // ECHO ACHIEVEMENTS (ECH001-ECH002)
  // ============================================
  
  // ECH001: First Echo - Teal waves
  ECH001: {
    icon: 'Waves',
    gradientStart: '#14B8A6', // Teal
    gradientEnd: '#0F766E',   // Dark teal
    particleColor: '#5EEAD4',
    glowColor: '#14B8A6'
  },
  
  // ECH002: Echo Master - Purple/gold waves
  ECH002: {
    icon: 'Waves',
    gradientStart: '#A855F7', // Purple
    gradientEnd: '#FBBF24',   // Gold
    particleColor: '#D8B4FE',
    glowColor: '#C084FC'
  },

  // ============================================
  // MULTI-RECIPIENT ACHIEVEMENTS (MR001-MR002)
  // ============================================
  
  // MR001: Multi-Messenger - Blue/purple users
  MR001: {
    icon: 'Users',
    gradientStart: '#3B82F6', // Blue
    gradientEnd: '#8B5CF6',   // Purple
    particleColor: '#93C5FD',
    glowColor: '#6366F1'
  },
  
  // MR002: Broadcast Legend - Gold/orange send
  MR002: {
    icon: 'Send',
    gradientStart: '#FBBF24', // Gold
    gradientEnd: '#F97316',   // Orange
    particleColor: '#FDE047',
    glowColor: '#F59E0B'
  },

  // ============================================
  // SPECIAL EPIC ACHIEVEMENT (E008)
  // ============================================
  
  // E008: Theme Master - Rainbow palette
  E008: {
    icon: 'Palette',
    gradientStart: '#EC4899', // Pink
    gradientEnd: '#8B5CF6',   // Purple (through spectrum)
    particleColor: '#F9A8D4',
    glowColor: '#C084FC'
  }
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

/**
 * Get all unique achievement icons used (for import optimization)
 */
export function getAllAchievementIcons(): string[] {
  const icons = new Set<string>();
  Object.values(ACHIEVEMENT_VISUALS).forEach(visual => {
    icons.add(visual.icon);
  });
  return Array.from(icons);
}
