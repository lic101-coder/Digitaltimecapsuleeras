// Achievement Service - Backend logic for Legacy Achievements System
// Total: 57 achievements — All fully triggered & wired v2.8.0
// Distribution: 13 Common, 13 Uncommon/Rare Era-Themed, 5 Time-Based, 5 Volume, 13 Special/Legendary, 6 Epic
// v2.8.0: FULL TRIGGER AUDIT
//   - A017: Fixed (count-based capsules_edited ≥ 5, was broken specific_action)
//   - A018: Fixed (capsules_created_today_max stat tracks daily max)
//   - A026: Fixed (midnight_capsules stat — triggered in trackCapsuleCreation)
//   - A027: Replaced "Birthday Capsule" → "New Year's Spirit" (new_year_capsules, Jan 1)
//   - A031: Fixed (golden_hour_capsules stat — fixed validator always-false bug)
//   - A042: Fixed (early_bird_capsules stat — triggered in trackCapsuleCreation)
//   - A046: Replaced "Vault Pioneer" → "Folder Pioneer" (folders_created ≥ 1)
//   - A047: Replaced "Vault Guardian" → "Folder Architect" (folders_created ≥ 5)
import * as kv from './kv_store.tsx';
import { getAchievementVisual } from './achievement-visuals.tsx';

// Initialize achievement service
console.log('🏆 Achievement Service initialized - v2.8.0 (57 Achievements - All Triggers Wired)');

// ============================================
// ACHIEVEMENT DEFINITIONS (57 Total — all triggers wired v2.8.0)
// ============================================
// 
// Grid Layout (43 achievements in 9×5 grid):
// Row 1 (1-9):   Starter Basics (A001-A006, A008-A010)
// Row 2 (10-18): Era-Themed & Consistency  
// Row 3 (19-27): Time & Volume Mastery
// Row 4 (28-36): Special & Legendary
// Row 5 (37-45): New Achievements (v2.1.0)
// 
// Additional Achievements:
// A046-A047: Folder Achievements (v2.8.0 — Folder Pioneer, Folder Architect)
// A048-A053: Epic Tier Achievements Phase 2 (v2.5.0)
// ECH001-ECH002: Echo Achievements (v2.3.0)
// MR001-MR002: Multi-Recipient Achievements (v2.4.0 - Phase 1 Feature A1)
// 
// Note: A007 (Enhanced Memory) removed in v2.7.0
// Note: E007 (Master Curator) removed in v2.7.0
// ============================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'starter' | 'era_themed' | 'time_based' | 'volume' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlockCriteria: {
    type: 'count' | 'streak' | 'time_wait' | 'specific_action' | 'combo' | 'custom';
    stat?: string;
    threshold?: number;
    operator?: string;
    action?: string;
    requirements?: Array<{ stat: string; threshold: number; operator?: string }>;
    validator?: string; // For custom validators
  };
  rewards: {
    points: number;
    title?: string;
  };
  visual: {
    gradientStart: string;
    gradientEnd: string;
    particleColor: string;
    glowColor: string;
    animation?: string;
  };
  shareText: string;
  hidden: boolean;
  order: number;
}

export const ACHIEVEMENT_DEFINITIONS: Record<string, Achievement> = {
  // ============================================
  // STARTER ACHIEVEMENTS (Common) - IDs A001-A010 (skipping A007)
  // ============================================
  A001: {
    id: 'A001',
    title: 'First Step',
    description: 'Creating your Eras account!',
    detailedDescription: 'Every journey begins with a single step. You\'ve taken yours by creating your Eras account - welcome to a world where memories transcend time!',
    category: 'starter',
    rarity: 'common',
    icon: 'Rocket',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Time Novice'
    },
    visual: {
      gradientStart: '#60A5FA',
      gradientEnd: '#2563EB',
      particleColor: '#93C5FD',
      glowColor: '#3B82F6'
    },
    shareText: 'Just created my first time capsule in Eras! 🎬 #ErasApp #TimeCapsule',
    hidden: false,
    order: 1
  },

  A002: {
    id: 'A002',
    title: 'Into the Future',
    description: 'Send your first capsule',
    detailedDescription: 'The die is cast. Your first capsule is scheduled and will arrive exactly when you intended.',
    category: 'starter',
    rarity: 'common',
    icon: 'Send',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_sent',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 15,
      title: 'Future Messenger'
    },
    visual: {
      gradientStart: '#A78BFA',
      gradientEnd: '#7C3AED',
      particleColor: '#DDD6FE',
      glowColor: '#8B5CF6'
    },
    shareText: 'Sent my first time capsule into the future! 📤 #ErasApp',
    hidden: false,
    order: 2
  },

  A003: {
    id: 'A003',
    title: 'From the Past',
    description: 'Receive your first capsule',
    detailedDescription: 'A message from your past self has arrived. The first of many conversations across time.',
    category: 'starter',
    rarity: 'common',
    icon: 'Mailbox',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_received',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 20,
      title: 'Past Receiver'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#D97706',
      particleColor: '#FCD34D',
      glowColor: '#F59E0B'
    },
    shareText: 'Received my first time capsule from the past! 📥 #ErasApp',
    hidden: false,
    order: 3
  },

  A004: {
    id: 'A004',
    title: 'Captured Moment',
    description: 'Add your first photo',
    detailedDescription: 'A picture is worth a thousand words. You\'ve added your first photo to preserve.',
    category: 'starter',
    rarity: 'common',
    icon: 'Camera',
    unlockCriteria: {
      type: 'count',
      stat: 'media_by_type.photo',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Snapshot Keeper'
    },
    visual: {
      gradientStart: '#34D399',
      gradientEnd: '#059669',
      particleColor: '#6EE7B7',
      glowColor: '#10B981'
    },
    shareText: 'Captured my first moment in Eras! 📸 #ErasApp',
    hidden: false,
    order: 4
  },

  A005: {
    id: 'A005',
    title: 'Motion Picture',
    description: 'Add your first video',
    detailedDescription: 'Moving images capture life in a way still photos cannot. You\'ve added your first video memory.',
    category: 'starter',
    rarity: 'common',
    icon: 'Film',
    unlockCriteria: {
      type: 'count',
      stat: 'media_by_type.video',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Cinema Pioneer'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316'
    },
    shareText: 'Added my first video to Eras! 🎥 #ErasApp',
    hidden: false,
    order: 5
  },

  A006: {
    id: 'A006',
    title: 'Voice of Time',
    description: 'Record your first audio message',
    detailedDescription: 'Your voice carries emotion that text cannot. You\'ve recorded your first audio message for the future.',
    category: 'starter',
    rarity: 'common',
    icon: 'AudioWaveform',
    unlockCriteria: {
      type: 'count',
      stat: 'media_by_type.audio',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Voice Keeper'
    },
    visual: {
      gradientStart: '#F472B6',
      gradientEnd: '#DB2777',
      particleColor: '#FBCFE8',
      glowColor: '#EC4899'
    },
    shareText: 'Recorded my first voice message for the future! 🎤 #ErasApp',
    hidden: false,
    order: 6
  },

  A008: {
    id: 'A008',
    title: 'Multimedia Creator',
    description: 'Create a capsule with 3+ different content types',
    detailedDescription: 'Text, photo, video, audio - you\'ve mastered combining multiple formats into a rich memory capsule.',
    category: 'special',
    rarity: 'common',
    icon: 'Shapes',
    unlockCriteria: {
      type: 'specific_action',
      action: 'multimedia_capsule_created'
    },
    rewards: { 
      points: 15,
      title: 'Moment Collector'
    },
    visual: {
      gradientStart: '#A78BFA',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#8B5CF6'
    },
    shareText: 'Created a multimedia masterpiece! 🎨 #ErasApp',
    hidden: false,
    order: 8
  },

  A009: {
    id: 'A009',
    title: 'Future Planner',
    description: 'Schedule a capsule 30+ days in advance',
    detailedDescription: 'You\'re thinking ahead. This capsule will arrive over a month from now, carrying your message into a distant tomorrow.',
    category: 'time_based',
    rarity: 'common',
    icon: 'Compass',
    unlockCriteria: {
      type: 'count',
      stat: 'max_schedule_days',
      threshold: 30,
      operator: '>='
    },
    rewards: { points: 10 },
    visual: {
      gradientStart: '#FB923C',
      gradientEnd: '#EA580C',
      particleColor: '#FDBA74',
      glowColor: '#F97316'
    },
    shareText: 'Scheduled a capsule 30+ days in advance! 📅 #ErasApp',
    hidden: false,
    order: 9
  },

  A010: {
    id: 'A010',
    title: 'Consistent Creator',
    description: 'Create capsules on 3 different days',
    detailedDescription: 'You\'re building a habit. Three separate days of memory-making shows you\'re getting the rhythm of Eras.',
    category: 'time_based',
    rarity: 'common',
    icon: 'Flame',
    unlockCriteria: {
      type: 'count',
      stat: 'unique_creation_days',
      threshold: 3,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Habit Builder'
    },
    visual: {
      gradientStart: '#10B981',
      gradientEnd: '#047857',
      particleColor: '#6EE7B7',
      glowColor: '#059669'
    },
    shareText: 'Created capsules on 3 different days! 📆 #ErasApp',
    hidden: false,
    order: 10
  },

  // ============================================
  // ROW 2: ERA-THEMED & CONSISTENCY (Order 11-18)
  // ============================================
  A011: {
    id: 'A011',
    title: 'Genesis Era',
    description: 'Create 5 capsules',
    detailedDescription: 'Five capsules mark the beginning of your archive. The Genesis Era - where your journey truly begins.',
    category: 'era_themed',
    rarity: 'uncommon',
    icon: 'Sparkles',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 5,
      operator: '>='
    },
    rewards: { 
      points: 20,
      title: 'Era Initiate'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#C4B5FD',
      glowColor: '#7C3AED'
    },
    shareText: 'Reached the Genesis Era! 5 capsules created. ✨ #ErasApp',
    hidden: false,
    order: 11
  },

  A012: {
    id: 'A012',
    title: 'Bronze Age',
    description: 'Create 10 capsules',
    detailedDescription: 'Ten capsules strong. You\'ve entered the Bronze Age of your memory archive.',
    category: 'era_themed',
    rarity: 'uncommon',
    icon: 'Award',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 10,
      operator: '>='
    },
    rewards: { 
      points: 30,
      title: 'Bronze Chronicler'
    },
    visual: {
      gradientStart: '#D97706',
      gradientEnd: '#92400E',
      particleColor: '#FCD34D',
      glowColor: '#B45309'
    },
    shareText: 'Entered the Bronze Age! 10 capsules created. 🥉 #ErasApp',
    hidden: false,
    order: 12
  },

  A013: {
    id: 'A013',
    title: 'Silver Age',
    description: 'Create 25 capsules',
    detailedDescription: 'Twenty-five memories preserved. The Silver Age shines with your growing collection.',
    category: 'era_themed',
    rarity: 'rare',
    icon: 'Medal',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 25,
      operator: '>='
    },
    rewards: { 
      points: 50,
      title: 'Silver Archivist'
    },
    visual: {
      gradientStart: '#94A3B8',
      gradientEnd: '#475569',
      particleColor: '#CBD5E1',
      glowColor: '#64748B'
    },
    shareText: 'Reached the Silver Age! 25 capsules created. 🥈 #ErasApp',
    hidden: false,
    order: 13
  },

  A014: {
    id: 'A014',
    title: 'Golden Age',
    description: 'Create 50 capsules',
    detailedDescription: 'Fifty capsules! You\'ve reached the Golden Age - a milestone of dedication.',
    category: 'era_themed',
    rarity: 'rare',
    icon: 'Crown',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 50,
      operator: '>='
    },
    rewards: { 
      points: 75,
      title: 'Golden Keeper'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#D97706',
      particleColor: '#FDE68A',
      glowColor: '#F59E0B'
    },
    shareText: 'Achieved the Golden Age! 50 capsules created. 👑 #ErasApp',
    hidden: false,
    order: 14
  },

  A015: {
    id: 'A015',
    title: 'Digital Enlightenment',
    description: 'Create 100 capsules',
    detailedDescription: 'One hundred memories. You\'ve reached Digital Enlightenment - a testament to your commitment.',
    category: 'era_themed',
    rarity: 'rare',
    icon: 'Sparkle',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 100,
      operator: '>='
    },
    rewards: { 
      points: 100,
      title: 'Enlightened One'
    },
    visual: {
      gradientStart: '#60A5FA',
      gradientEnd: '#2563EB',
      particleColor: '#DBEAFE',
      glowColor: '#3B82F6'
    },
    shareText: 'Reached Digital Enlightenment! 100 capsules created. ⚡ #ErasApp',
    hidden: false,
    order: 15
  },

  A016: {
    id: 'A016',
    title: 'Week Warrior',
    description: 'Create capsules 7 days in a row',
    detailedDescription: 'Seven consecutive days of memory-making. You\'ve built a powerful streak!',
    category: 'time_based',
    rarity: 'uncommon',
    icon: 'CalendarCheck2',
    unlockCriteria: {
      type: 'streak',
      stat: 'max_streak_days',
      threshold: 7,
      operator: '>='
    },
    rewards: { 
      points: 30,
      title: 'Streak Master'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316'
    },
    shareText: 'Built a 7-day streak in Eras! 🔥 #ErasApp',
    hidden: false,
    order: 16
  },

  A017: {
    id: 'A017',
    title: 'Memory Perfectionist',
    description: 'Edit your capsules 5 times',
    detailedDescription: 'You keep coming back to get it just right. Editing your capsules five times total shows your dedication to perfecting every memory.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'FileEdit',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_edited',
      threshold: 5,
      operator: '>='
    },
    rewards: { 
      points: 20,
      title: 'Detail Devotee'
    },
    visual: {
      gradientStart: '#EC4899',
      gradientEnd: '#BE185D',
      particleColor: '#FBCFE8',
      glowColor: '#DB2777'
    },
    shareText: 'Edited a capsule 5 times! Perfection takes time. ✨ #ErasApp',
    hidden: false,
    order: 17
  },

  A018: {
    id: 'A018',
    title: 'Marathon Creator',
    description: 'Create 10 capsules in a single day',
    detailedDescription: 'Ten capsules in one day! You\'re on a creative marathon, capturing memories at lightning speed.',
    category: 'volume',
    rarity: 'uncommon',
    icon: 'Bolt',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created_today_max',
      threshold: 10,
      operator: '>='
    },
    rewards: { 
      points: 25,
      title: 'Speed Archivist'
    },
    visual: {
      gradientStart: '#10B981',
      gradientEnd: '#047857',
      particleColor: '#6EE7B7',
      glowColor: '#059669'
    },
    shareText: 'Created 10 capsules in 24 hours! 🏃 #ErasApp',
    hidden: false,
    order: 18
  },

  // ============================================
  // ROW 3: TIME & VOLUME MASTERY (Order 19-27)
  // ============================================
  A019: {
    id: 'A019',
    title: 'Patient Soul',
    description: 'Wait 30+ days for a capsule to arrive',
    detailedDescription: 'Patience is a virtue. You\'ve waited over a month for a capsule to arrive - true delayed gratification.',
    category: 'time_based',
    rarity: 'uncommon',
    icon: 'Clock',
    unlockCriteria: {
      type: 'time_wait',
      stat: 'max_wait_days',
      threshold: 30,
      operator: '>='
    },
    rewards: { 
      points: 25,
      title: 'Time Patient'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#C4B5FD',
      glowColor: '#7C3AED'
    },
    shareText: 'Waited 30+ days for a time capsule! Patience pays off. ⏰ #ErasApp',
    hidden: false,
    order: 19
  },

  A020: {
    id: 'A020',
    title: 'Distant Future',
    description: 'Schedule a capsule 90+ days ahead',
    detailedDescription: 'Three months into the future. You\'re planning far ahead with your memory preservation.',
    category: 'time_based',
    rarity: 'rare',
    icon: 'CalendarClock',
    unlockCriteria: {
      type: 'count',
      stat: 'max_schedule_days',
      threshold: 90,
      operator: '>='
    },
    rewards: { 
      points: 35,
      title: 'Far Planner'
    },
    visual: {
      gradientStart: '#3B82F6',
      gradientEnd: '#1E40AF',
      particleColor: '#93C5FD',
      glowColor: '#2563EB'
    },
    shareText: 'Scheduled a capsule 90+ days ahead! Planning for the distant future. 📅 #ErasApp',
    hidden: false,
    order: 20
  },

  A021: {
    id: 'A021',
    title: 'Year Traveler',
    description: 'Schedule a capsule 365+ days ahead',
    detailedDescription: 'A full year into the future! Your message will travel through an entire orbit around the sun.',
    category: 'time_based',
    rarity: 'rare',
    icon: 'Globe',
    unlockCriteria: {
      type: 'count',
      stat: 'max_schedule_days',
      threshold: 365,
      operator: '>='
    },
    rewards: { 
      points: 50,
      title: 'Annual Voyager'
    },
    visual: {
      gradientStart: '#06B6D4',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#0EA5E9'
    },
    shareText: 'Scheduled a capsule a full year ahead! 🌍 #ErasApp',
    hidden: false,
    order: 21
  },

  A022: {
    id: 'A022',
    title: 'Decade Dreamer',
    description: 'Schedule a capsule 3650+ days (10 years) ahead',
    detailedDescription: 'Ten years into the future! Your message will cross an entire decade, a true time capsule for your future self.',
    category: 'time_based',
    rarity: 'legendary',
    icon: 'Rocket',
    unlockCriteria: {
      type: 'count',
      stat: 'max_schedule_days',
      threshold: 3650,
      operator: '>='
    },
    rewards: { 
      points: 100,
      title: 'Decade Dreamer'
    },
    visual: {
      gradientStart: '#A855F7',
      gradientEnd: '#7E22CE',
      particleColor: '#E9D5FF',
      glowColor: '#9333EA',
      animation: 'pulse'
    },
    shareText: 'Sent a capsule 10 years into the future! 🚀 #ErasApp',
    hidden: false,
    order: 22
  },

  A023: {
    id: 'A023',
    title: 'Content Creator',
    description: 'Upload 50 total media files',
    detailedDescription: 'Fifty photos, videos, and audio files. You\'re building a rich multimedia archive.',
    category: 'volume',
    rarity: 'uncommon',
    icon: 'FolderOpen',
    unlockCriteria: {
      type: 'count',
      stat: 'total_media_files',
      threshold: 50,
      operator: '>='
    },
    rewards: { 
      points: 30,
      title: 'Media Maven'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#D97706',
      particleColor: '#FCD34D',
      glowColor: '#F97316'
    },
    shareText: 'Uploaded 50 media files to Eras! 📁 #ErasApp',
    hidden: false,
    order: 23
  },

  A024: {
    id: 'A024',
    title: 'Media Mogul',
    description: 'Upload 200 total media files',
    detailedDescription: 'Two hundred files! Your archive is becoming a comprehensive multimedia library.',
    category: 'volume',
    rarity: 'rare',
    icon: 'Database',
    unlockCriteria: {
      type: 'count',
      stat: 'total_media_files',
      threshold: 200,
      operator: '>='
    },
    rewards: { 
      points: 75,
      title: 'Archive Mogul'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#7C3AED'
    },
    shareText: 'Hit 200 media files in my Eras archive! 🎬 #ErasApp',
    hidden: false,
    order: 24
  },

  A025: {
    id: 'A025',
    title: 'Prolific Archivist',
    description: 'Create 177 capsules',
    detailedDescription: 'One hundred seventy-seven! A lucky number for a prolific memory keeper. Your archive is truly impressive.',
    category: 'volume',
    rarity: 'rare',
    icon: 'Library',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 177,
      operator: '>='
    },
    rewards: { 
      points: 100,
      title: 'Lucky Archivist'
    },
    visual: {
      gradientStart: '#10B981',
      gradientEnd: '#047857',
      particleColor: '#6EE7B7',
      glowColor: '#059669'
    },
    shareText: 'Created 177 capsules! Lucky number reached. 🍀 #ErasApp',
    hidden: false,
    order: 25
  },

  A026: {
    id: 'A026',
    title: 'Midnight Creator',
    description: 'Create a capsule between midnight and 3 AM',
    detailedDescription: 'The quiet hours. You\'ve captured a memory in the stillness of the night.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'Moon',
    unlockCriteria: {
      type: 'count',
      stat: 'midnight_capsules',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 15,
      title: 'Night Owl'
    },
    visual: {
      gradientStart: '#6366F1',
      gradientEnd: '#4338CA',
      particleColor: '#C7D2FE',
      glowColor: '#818CF8'
    },
    shareText: 'Created a capsule at midnight! 🌙 #ErasApp',
    hidden: false,
    order: 26
  },

  A027: {
    id: 'A027',
    title: "New Year's Spirit",
    description: 'Create a capsule on January 1st',
    detailedDescription: 'Starting the new year by preserving a memory is a beautiful tradition. You\'ve created a time capsule on the very first day of a brand new year.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'Sparkles',
    unlockCriteria: {
      type: 'count',
      stat: 'new_year_capsules',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 25,
      title: "New Year's Keeper"
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#4338CA',
      particleColor: '#DDD6FE',
      glowColor: '#7C3AED'
    },
    shareText: "Started the new year with a time capsule! 🎆 #ErasApp",
    hidden: false,
    order: 27
  },

  // ============================================
  // ROW 4: SPECIAL & LEGENDARY (Order 28-36)
  // ============================================
  A028: {
    id: 'A028',
    title: 'Wordsmith',
    description: 'Write a capsule with 500+ words',
    detailedDescription: 'Five hundred words of thoughts, feelings, and memories. You\'ve poured your heart into this message.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'PenTool',
    unlockCriteria: {
      type: 'count',
      stat: 'max_capsule_word_count',
      threshold: 500,
      operator: '>='
    },
    rewards: { 
      points: 30,
      title: 'Word Weaver'
    },
    visual: {
      gradientStart: '#14B8A6',
      gradientEnd: '#0F766E',
      particleColor: '#5EEAD4',
      glowColor: '#14B8A6'
    },
    shareText: 'Wrote a 500+ word capsule! 📝 #ErasApp',
    hidden: false,
    order: 28
  },

  A029: {
    id: 'A029',
    title: 'Novelist',
    description: 'Write a capsule with 2000+ words',
    detailedDescription: 'Two thousand words! You\'ve written a short story for your future self.',
    category: 'special',
    rarity: 'rare',
    icon: 'BookOpen',
    unlockCriteria: {
      type: 'count',
      stat: 'max_capsule_word_count',
      threshold: 2000,
      operator: '>='
    },
    rewards: { 
      points: 75,
      title: 'Memory Novelist'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#7C3AED'
    },
    shareText: 'Wrote a 2000+ word time capsule! 📖 #ErasApp',
    hidden: false,
    order: 29
  },

  A030: {
    id: 'A030',
    title: 'Cinematic',
    description: 'Create a capsule with 10+ media files',
    detailedDescription: 'Ten or more photos and videos in one capsule. You\'re creating a cinematic experience!',
    category: 'special',
    rarity: 'rare',
    icon: 'Film',
    unlockCriteria: {
      type: 'custom',
      validator: 'validateCinematic'
    },
    rewards: { 
      points: 50,
      title: 'Film Director'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316'
    },
    shareText: 'Created a cinematic capsule with 10+ media files! 🎬 #ErasApp',
    hidden: false,
    order: 30
  },

  A031: {
    id: 'A031',
    title: 'Golden Hour Guardian',
    description: 'Create a capsule during sunrise or sunset hours',
    detailedDescription: 'You\'ve captured a message during the golden hour — 6–8 AM at dawn or 5–7 PM at dusk, when the light is most magical.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'Sunrise',
    unlockCriteria: {
      type: 'count',
      stat: 'golden_hour_capsules',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 20,
      title: 'Golden Hour Keeper'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#F59E0B',
      particleColor: '#FDE68A',
      glowColor: '#F59E0B'
    },
    shareText: 'Sent a capsule during the golden hour! 🌅 #ErasApp',
    hidden: false,
    order: 31
  },

  A032: {
    id: 'A032',
    title: 'Globe Trotter',
    description: 'Send capsules to 5+ different recipients',
    detailedDescription: 'You\'re sharing memories far and wide! Five different people will receive your time capsules.',
    category: 'special',
    rarity: 'rare',
    icon: 'Users',
    unlockCriteria: {
      type: 'count',
      stat: 'unique_recipients',
      threshold: 5,
      operator: '>='
    },
    rewards: { 
      points: 50,
      title: 'Memory Sharer'
    },
    visual: {
      gradientStart: '#06B6D4',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#0EA5E9'
    },
    shareText: 'Shared capsules with 5+ people! 🌍 #ErasApp',
    hidden: false,
    order: 32
  },

  A033: {
    id: 'A033',
    title: 'Golden Ratio',
    description: 'Have exactly 89 capsules',
    detailedDescription: 'Eighty-nine capsules - a Fibonacci number and part of the golden ratio. Mathematical perfection in your archive.',
    category: 'special',
    rarity: 'rare',
    icon: 'Sparkles',
    unlockCriteria: {
      type: 'custom',
      validator: 'validateGoldenRatio'
    },
    rewards: { 
      points: 89,
      title: 'Golden Mathematician'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#D97706',
      particleColor: '#FDE68A',
      glowColor: '#F59E0B'
    },
    shareText: 'Reached the Golden Ratio! 89 capsules (Fibonacci number). ✨ #ErasApp',
    hidden: false,
    order: 33
  },

  A034: {
    id: 'A034',
    title: 'Memory Weaver',
    description: 'Create capsules with all 4 media types',
    detailedDescription: 'Photo, video, audio, and text - you\'ve woven together every format. A true multimedia master.',
    category: 'special',
    rarity: 'rare',
    icon: 'Grid3x3',
    unlockCriteria: {
      type: 'custom',
      validator: 'validateMemoryWeaver'
    },
    rewards: { 
      points: 50,
      title: 'Format Master'
    },
    visual: {
      gradientStart: '#A78BFA',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#8B5CF6'
    },
    shareText: 'Used all 4 media types in Eras! 🎭 #ErasApp',
    hidden: false,
    order: 34
  },

  A035: {
    id: 'A035',
    title: 'Perfect Chronicle',
    description: 'Create a capsule on 14 consecutive days',
    detailedDescription: 'Two weeks of daily capsules! You\'ve achieved the perfect chronicle - sustained dedication to memory preservation.',
    category: 'time_based',
    rarity: 'legendary',
    icon: 'Trophy',
    unlockCriteria: {
      type: 'streak',
      stat: 'max_streak_days',
      threshold: 14,
      operator: '>='
    },
    rewards: { 
      points: 100,
      title: 'Chronicle Master'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316',
      animation: 'shimmer'
    },
    shareText: 'Completed a 14-day streak! Perfect Chronicle achieved. 🏆 #ErasApp',
    hidden: false,
    order: 35
  },

  A036: {
    id: 'A036',
    title: 'Time Lord',
    description: 'Have capsules scheduled across 5+ different years',
    detailedDescription: 'Your capsules span across five or more years. You\'re truly mastering the flow of time.',
    category: 'time_based',
    rarity: 'legendary',
    icon: 'Hourglass',
    unlockCriteria: {
      type: 'custom',
      validator: 'validateTimeLord'
    },
    rewards: { 
      points: 100,
      title: 'Time Lord'
    },
    visual: {
      gradientStart: '#06B6D4',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#0EA5E9',
      animation: 'rainbow'
    },
    shareText: 'Became a Time Lord! ⏳ Capsules across 5+ years. #ErasApp',
    hidden: false,
    order: 36
  },

  // ============================================
  // ROW 5: NEW ACHIEVEMENTS v2.1.0 (Order 37-45)
  // ============================================
  A037: {
    id: 'A037',
    title: 'Renaissance',
    description: 'Create 200 capsules',
    detailedDescription: 'Two hundred capsules! You\'ve entered the Renaissance - a golden age of memory creation and preservation.',
    category: 'era_themed',
    rarity: 'rare',
    icon: 'Crown',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 200,
      operator: '>='
    },
    rewards: { 
      points: 150,
      title: 'Renaissance Keeper'
    },
    visual: {
      gradientStart: '#A855F7',
      gradientEnd: '#7E22CE',
      particleColor: '#E9D5FF',
      glowColor: '#9333EA'
    },
    shareText: 'Reached the Renaissance! 200 capsules created. 👑 #ErasApp',
    hidden: false,
    order: 37
  },

  A038: {
    id: 'A038',
    title: 'Information Age',
    description: 'Create 350 capsules',
    detailedDescription: 'Three hundred fifty memories preserved. Welcome to the Information Age of your personal archive.',
    category: 'era_themed',
    rarity: 'rare',
    icon: 'Cpu',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 350,
      operator: '>='
    },
    rewards: { 
      points: 200,
      title: 'Digital Era Master'
    },
    visual: {
      gradientStart: '#3B82F6',
      gradientEnd: '#1E40AF',
      particleColor: '#93C5FD',
      glowColor: '#2563EB'
    },
    shareText: 'Entered the Information Age! 350 capsules created. 💻 #ErasApp',
    hidden: false,
    order: 38
  },

  A039: {
    id: 'A039',
    title: 'Modern Era',
    description: 'Create 500 capsules',
    detailedDescription: 'Five hundred capsules strong! You\'ve built a Modern Era archive that rivals any museum.',
    category: 'era_themed',
    rarity: 'legendary',
    icon: 'Sparkles',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 500,
      operator: '>='
    },
    rewards: { 
      points: 250,
      title: 'Modern Archivist'
    },
    visual: {
      gradientStart: '#10B981',
      gradientEnd: '#047857',
      particleColor: '#6EE7B7',
      glowColor: '#059669',
      animation: 'pulse'
    },
    shareText: 'Reached the Modern Era! 500 capsules created. ✨ #ErasApp',
    hidden: false,
    order: 39
  },

  A040: {
    id: 'A040',
    title: 'Media Library',
    description: 'Upload 500 total media files',
    detailedDescription: 'Five hundred media files! Your archive has become a comprehensive library of memories.',
    category: 'volume',
    rarity: 'rare',
    icon: 'HardDrive',
    unlockCriteria: {
      type: 'count',
      stat: 'total_media_files',
      threshold: 500,
      operator: '>='
    },
    rewards: { 
      points: 150,
      title: 'Library Keeper'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#D97706',
      particleColor: '#FCD34D',
      glowColor: '#F97316'
    },
    shareText: 'Built a media library with 500+ files! 🎬 #ErasApp',
    hidden: false,
    order: 40
  },

  A041: {
    id: 'A041',
    title: 'Social Butterfly',
    description: 'Send capsules to 10+ different recipients',
    detailedDescription: 'Ten different people receiving your memories! You\'re spreading joy across your network.',
    category: 'special',
    rarity: 'rare',
    icon: 'Send',
    unlockCriteria: {
      type: 'count',
      stat: 'unique_recipients',
      threshold: 10,
      operator: '>='
    },
    rewards: { 
      points: 75,
      title: 'Social Memory Keeper'
    },
    visual: {
      gradientStart: '#EC4899',
      gradientEnd: '#BE185D',
      particleColor: '#FBCFE8',
      glowColor: '#DB2777'
    },
    shareText: 'Shared capsules with 10+ people! 🦋 #ErasApp',
    hidden: false,
    order: 41
  },

  A042: {
    id: 'A042',
    title: 'Early Bird',
    description: 'Create a capsule between 5 AM and 7 AM',
    detailedDescription: 'The early hours when the world is waking up. You\'ve captured a memory at dawn.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'Sunrise',
    unlockCriteria: {
      type: 'count',
      stat: 'early_bird_capsules',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 15,
      title: 'Dawn Keeper'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#F59E0B',
      particleColor: '#FDE68A',
      glowColor: '#F59E0B'
    },
    shareText: 'Created an early morning capsule! 🌅 #ErasApp',
    hidden: false,
    order: 42
  },

  A043: {
    id: 'A043',
    title: 'Time Traveler',
    description: 'Schedule capsules spanning 3+ decades',
    detailedDescription: 'Your capsules reach across thirty years or more. You\'re truly traveling through time!',
    category: 'time_based',
    rarity: 'legendary',
    icon: 'Zap',
    unlockCriteria: {
      type: 'count',
      stat: 'max_schedule_days',
      threshold: 1825,
      operator: '>='
    },
    rewards: { 
      points: 150,
      title: 'Time Traveler'
    },
    visual: {
      gradientStart: '#A855F7',
      gradientEnd: '#7E22CE',
      particleColor: '#E9D5FF',
      glowColor: '#9333EA',
      animation: 'rainbow'
    },
    shareText: 'Scheduled a capsule 5+ years ahead! Time Traveler unlocked. ⚡ #ErasApp',
    hidden: false,
    order: 43
  },

  A044: {
    id: 'A044',
    title: 'Dedication',
    description: 'Use Eras for 100+ days',
    detailedDescription: 'One hundred days with Eras. Your dedication to preserving memories is truly remarkable.',
    category: 'time_based',
    rarity: 'rare',
    icon: 'Heart',
    unlockCriteria: {
      type: 'count',
      stat: 'days_since_signup',
      threshold: 100,
      operator: '>='
    },
    rewards: { 
      points: 100,
      title: 'Dedicated Keeper'
    },
    visual: {
      gradientStart: '#EF4444',
      gradientEnd: '#DC2626',
      particleColor: '#FCA5A5',
      glowColor: '#F87171'
    },
    shareText: 'Been using Eras for 100+ days! ❤️ #ErasApp',
    hidden: false,
    order: 44
  },

  A045: {
    id: 'A045',
    title: 'Year of Memories',
    description: 'Use Eras for 365+ days',
    detailedDescription: 'A full year with Eras! You\'ve made memory preservation a lasting part of your life.',
    category: 'time_based',
    rarity: 'legendary',
    icon: 'Calendar',
    unlockCriteria: {
      type: 'count',
      stat: 'days_since_signup',
      threshold: 365,
      operator: '>='
    },
    rewards: { 
      points: 150,
      title: 'Annual Keeper'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#7C3AED',
      animation: 'shimmer'
    },
    shareText: 'Celebrated a full year with Eras! 🎉 #ErasApp',
    hidden: false,
    order: 45
  },

  // ============================================
  // VAULT FOLDER ACHIEVEMENTS v2.8.0 (Order 46-47)
  // Replaced "Vault Pioneer/Guardian" (no import feature) with folder-based achievements
  // ============================================
  A046: {
    id: 'A046',
    title: 'Folder Pioneer',
    description: 'Create your first custom folder',
    detailedDescription: 'Organization is the key to a great archive. You\'ve created your first custom folder to keep your capsules neatly arranged.',
    category: 'special',
    rarity: 'common',
    icon: 'FolderOpen',
    unlockCriteria: {
      type: 'count',
      stat: 'folders_created',
      threshold: 5, // 5th folder = first custom folder (after Photos, Videos, Audio, Documents)
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Folder Keeper'
    },
    visual: {
      gradientStart: '#64748B',
      gradientEnd: '#475569',
      particleColor: '#94A3B8',
      glowColor: '#64748B'
    },
    shareText: 'Created my first memory folder in Eras! 📁 #ErasApp',
    hidden: false,
    order: 46
  },

  A047: {
    id: 'A047',
    title: 'Folder Architect',
    description: 'Create 5 custom folders',
    detailedDescription: 'Five custom folders, each holding a chapter of your life. You\'re building a beautifully structured memory archive.',
    category: 'special',
    rarity: 'rare',
    icon: 'FolderOpen',
    unlockCriteria: {
      type: 'count',
      stat: 'folders_created',
      threshold: 9, // 9th folder = 5 custom folders (after 4 default)
      operator: '>='
    },
    rewards: { 
      points: 50,
      title: 'Folder Architect'
    },
    visual: {
      gradientStart: '#3B82F6',
      gradientEnd: '#1E40AF',
      particleColor: '#93C5FD',
      glowColor: '#2563EB'
    },
    shareText: 'Built 5 memory folders in Eras! 🗂️ #ErasApp',
    hidden: false,
    order: 47
  },

  // ============================================
  // EPIC TIER ACHIEVEMENTS v2.5.0 Phase 2 (Order 48-53)
  // ============================================
  A048: {
    id: 'A048',
    title: 'Memory Titan',
    description: 'Create 1000 capsules',
    detailedDescription: 'One thousand time capsules. A monumental achievement that cements your status as a Sevenfold Sage.',
    category: 'volume',
    rarity: 'epic',
    icon: 'Mountain',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 1000,
      operator: '>='
    },
    rewards: { 
      points: 500,
      title: 'Sevenfold Sage'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316',
      animation: 'rainbow'
    },
    shareText: 'Became a Sevenfold Sage! 1000 capsules created. 🔮 #ErasApp',
    hidden: false,
    order: 48
  },

  A049: {
    id: 'A049',
    title: 'Century Streaker',
    description: 'Create capsules 100 days in a row',
    detailedDescription: 'One hundred consecutive days! Your dedication is legendary. A streak for the history books.',
    category: 'time_based',
    rarity: 'epic',
    icon: 'Flame',
    unlockCriteria: {
      type: 'streak',
      stat: 'max_streak_days',
      threshold: 100,
      operator: '>='
    },
    rewards: { 
      points: 500,
      title: 'Century Streaker'
    },
    visual: {
      gradientStart: '#F59E0B',
      gradientEnd: '#DC2626',
      particleColor: '#FCD34D',
      glowColor: '#F97316',
      animation: 'pulse'
    },
    shareText: 'Achieved a 100-day streak! Century Streaker! 🔥 #ErasApp',
    hidden: false,
    order: 49
  },

  A050: {
    id: 'A050',
    title: 'Media Emperor',
    description: 'Upload 1000 total media files',
    detailedDescription: 'One thousand media files! Your archive rivals the greatest libraries. You are the Master Curator.',
    category: 'volume',
    rarity: 'epic',
    icon: 'Database',
    unlockCriteria: {
      type: 'count',
      stat: 'total_media_files',
      threshold: 1000,
      operator: '>='
    },
    rewards: { 
      points: 500,
      title: 'Master Curator'
    },
    visual: {
      gradientStart: '#FDE047',
      gradientEnd: '#FACC15',
      particleColor: '#FEF08A',
      glowColor: '#FBBF24',
      animation: 'shimmer'
    },
    shareText: 'Became a Master Curator! 1000+ files in my archive. 🎨 #ErasApp',
    hidden: false,
    order: 50
  },

  A051: {
    id: 'A051',
    title: 'Epic Novelist',
    description: 'Write a capsule with 5000+ words',
    detailedDescription: 'Five thousand words! You\'ve written an epic novel for your future self. A true masterpiece.',
    category: 'special',
    rarity: 'epic',
    icon: 'BookOpen',
    unlockCriteria: {
      type: 'count',
      stat: 'max_capsule_word_count',
      threshold: 5000,
      operator: '>='
    },
    rewards: { 
      points: 300,
      title: 'Epic Novelist'
    },
    visual: {
      gradientStart: '#A855F7',
      gradientEnd: '#7E22CE',
      particleColor: '#E9D5FF',
      glowColor: '#9333EA',
      animation: 'shimmer'
    },
    shareText: 'Wrote a 5000+ word epic capsule! 📚 #ErasApp',
    hidden: false,
    order: 51
  },

  A052: {
    id: 'A052',
    title: 'Social Network',
    description: 'Send capsules to 25+ different recipients',
    detailedDescription: 'Twenty-five unique recipients! You\'ve built a social network of shared memories.',
    category: 'special',
    rarity: 'epic',
    icon: 'Users',
    unlockCriteria: {
      type: 'count',
      stat: 'unique_recipients',
      threshold: 25,
      operator: '>='
    },
    rewards: { 
      points: 300,
      title: 'Network Builder'
    },
    visual: {
      gradientStart: '#06B6D4',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#0EA5E9',
      animation: 'pulse'
    },
    shareText: 'Built a network of 25+ recipients! 🌐 #ErasApp',
    hidden: false,
    order: 52
  },

  A053: {
    id: 'A053',
    title: 'Community Beacon',
    description: 'Receive echoes from 10+ unique senders',
    detailedDescription: 'Ten different people have echoed your capsules! You\'re a beacon of inspiration in the Eras community.',
    category: 'special',
    rarity: 'epic',
    icon: 'Heart',
    unlockCriteria: {
      type: 'count',
      stat: 'unique_echo_senders',
      threshold: 10,
      operator: '>='
    },
    rewards: { 
      points: 300,
      title: 'Community Beacon'
    },
    visual: {
      gradientStart: '#EC4899',
      gradientEnd: '#BE185D',
      particleColor: '#FBCFE8',
      glowColor: '#DB2777',
      animation: 'rainbow'
    },
    shareText: 'Became a Community Beacon! 10+ unique echo senders. 💖 #ErasApp',
    hidden: false,
    order: 53
  },

  // ============================================
  // ADDITIONAL: ECHO ACHIEVEMENTS v2.3.0
  // ============================================
  ECH001: {
    id: 'ECH001',
    title: 'First Echo',
    description: 'Send your first echo',
    detailedDescription: 'You\'ve sent your first echo - a ripple through time connecting two memories.',
    category: 'special',
    rarity: 'common',
    icon: 'Radio',
    unlockCriteria: {
      type: 'count',
      stat: 'echoes_sent',
      threshold: 1,
      operator: '>='
    },
    rewards: { 
      points: 10,
      title: 'Echo Pioneer'
    },
    visual: {
      gradientStart: '#22D3EE',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#06B6D4'
    },
    shareText: 'Sent my first echo in Eras! 📡 #ErasApp',
    hidden: false,
    order: 54
  },

  ECH002: {
    id: 'ECH002',
    title: 'Echo Chamber',
    description: 'Send 50 echoes',
    detailedDescription: 'Fifty echoes sent! You\'re creating waves of connections across the Eras community.',
    category: 'special',
    rarity: 'rare',
    icon: 'Waves',
    unlockCriteria: {
      type: 'count',
      stat: 'echoes_sent',
      threshold: 50,
      operator: '>='
    },
    rewards: { 
      points: 75,
      title: 'Echo Master'
    },
    visual: {
      gradientStart: '#06B6D4',
      gradientEnd: '#0891B2',
      particleColor: '#67E8F9',
      glowColor: '#0EA5E9'
    },
    shareText: 'Created an Echo Chamber! 50 echoes sent. 🌊 #ErasApp',
    hidden: false,
    order: 55
  },

  // ============================================
  // ADDITIONAL: MULTI-RECIPIENT ACHIEVEMENTS v2.4.0
  // ============================================
  MR001: {
    id: 'MR001',
    title: 'Broadcast Beginner',
    description: 'Send a capsule to 3+ recipients at once',
    detailedDescription: 'You\'ve sent your first multi-recipient capsule! Sharing the same memory with multiple people.',
    category: 'special',
    rarity: 'uncommon',
    icon: 'Share2',
    unlockCriteria: {
      type: 'specific_action',
      action: 'multi_recipient_capsule_sent_3'
    },
    rewards: { 
      points: 20,
      title: 'Broadcaster'
    },
    visual: {
      gradientStart: '#10B981',
      gradientEnd: '#047857',
      particleColor: '#6EE7B7',
      glowColor: '#059669'
    },
    shareText: 'Sent my first broadcast capsule to multiple people! 📢 #ErasApp',
    hidden: false,
    order: 56
  },

  MR002: {
    id: 'MR002',
    title: 'Grand Broadcast',
    description: 'Send a capsule to 10+ recipients at once',
    detailedDescription: 'Ten recipients receiving the same capsule! You\'re creating shared experiences across your network.',
    category: 'special',
    rarity: 'rare',
    icon: 'Radio',
    unlockCriteria: {
      type: 'specific_action',
      action: 'multi_recipient_capsule_sent_10'
    },
    rewards: { 
      points: 50,
      title: 'Grand Broadcaster'
    },
    visual: {
      gradientStart: '#8B5CF6',
      gradientEnd: '#6D28D9',
      particleColor: '#DDD6FE',
      glowColor: '#7C3AED'
    },
    shareText: 'Sent a Grand Broadcast to 10+ people! 📻 #ErasApp',
    hidden: false,
    order: 57
  },

  // ============================================
  // LEGENDARY: ARCHIVE MASTER (Replaces removed E007)
  // ============================================
  E008: {
    id: 'E008',
    title: 'Archive Master',
    description: 'Create 750 capsules',
    detailedDescription: 'An extraordinary milestone. Seven hundred and fifty time capsules - you\'ve built a legendary archive that spans countless moments of your life.',
    category: 'volume',
    rarity: 'legendary',
    icon: 'Trophy',
    unlockCriteria: {
      type: 'count',
      stat: 'capsules_created',
      threshold: 750,
      operator: '>='
    },
    rewards: { 
      points: 150,
      title: 'Archive Master'
    },
    visual: {
      gradientStart: '#FBBF24',
      gradientEnd: '#F59E0B',
      particleColor: '#FCD34D',
      glowColor: '#FBBF24',
      animation: 'shimmer'
    },
    shareText: 'Became an Archive Master! 750 capsules created. 🏆 #ErasApp',
    hidden: false,
    order: 58
  }
};

// ============================================
// USER STATS INTERFACE
// ============================================

export interface UserStats {
  userId: string;
  capsules_created: number;
  capsules_sent: number;
  capsules_received: number;
  media_by_type: {
    photo: number;
    video: number;
    audio: number;
  };
  total_media_files: number;
  max_schedule_days: number;
  max_wait_days: number;
  max_capsule_word_count: number;
  max_streak_days: number;
  unique_creation_days: number;
  creation_day_set: string[]; // Track set of unique creation days (YYYY-MM-DD)
  multimedia_capsules: number; // Capsules with 3+ content types
  capsule_years: number[]; // Track years with scheduled capsules for Time Lord
  unique_recipients: number; // Track number of unique recipient emails
  unique_recipient_emails: string[]; // Track unique recipient emails
  account_created_at: string; // ISO date string
  days_since_signup: number;
  vaulted_capsules: number; // Track capsules stored in vault (legacy)
  echoes_sent: number; // Track echoes sent
  unique_echo_senders: number; // Track unique users who have echoed your capsules
  unique_echo_sender_ids: string[]; // Track unique user IDs who have echoed
  cinematic_capsules: number; // Capsules with 10+ media files
  capsules_edited: number; // Track total capsule edits (A017 Memory Perfectionist)
  
  // v2.8.0: New time-aware and folder stats — all fully triggered
  midnight_capsules: number;       // Capsules created 0:00–2:59 (A026)
  golden_hour_capsules: number;    // Capsules created 6:00–7:59 or 17:00–18:59 (A031)
  early_bird_capsules: number;     // Capsules created 5:00–6:59 (A042)
  new_year_capsules: number;       // Capsules created on January 1 (A027)
  folders_created: number;         // Vault folders created (A046 Folder Pioneer, A047 Folder Architect)
  capsules_created_today: number;  // Rolling daily capsule count (resets each day)
  capsules_created_today_date: string; // Date string for the above (YYYY-MM-DD)
  capsules_created_today_max: number;  // All-time max capsules created in a single day (A018)

  // Last update timestamp
  last_updated: string; // ISO date string
}

// ============================================
// ACHIEVEMENT PROGRESS TRACKING
// ============================================

export interface AchievementProgress {
  userId: string;
  unlockedAchievements: string[]; // Array of achievement IDs
  progress: Record<string, {
    current: number;
    target: number;
    percentage: number;
  }>;
  lastChecked: string; // ISO date string
  shownNotifications?: string[]; // Array of achievement IDs that have been shown to user
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Initialize user stats
export async function initializeUserStats(userId: string): Promise<UserStats> {
  const stats: UserStats = {
    userId,
    capsules_created: 0,
    capsules_sent: 0,
    capsules_received: 0,
    media_by_type: {
      photo: 0,
      video: 0,
      audio: 0
    },
    total_media_files: 0,
    max_schedule_days: 0,
    max_wait_days: 0,
    max_capsule_word_count: 0,
    max_streak_days: 0,
    unique_creation_days: 0,
    creation_day_set: [],
    multimedia_capsules: 0,
    capsule_years: [],
    unique_recipients: 0,
    unique_recipient_emails: [],
    account_created_at: new Date().toISOString(),
    days_since_signup: 0,
    vaulted_capsules: 0,
    echoes_sent: 0,
    unique_echo_senders: 0,
    unique_echo_sender_ids: [],
    cinematic_capsules: 0,
    capsules_edited: 0,
    // v2.8.0 new stats
    midnight_capsules: 0,
    golden_hour_capsules: 0,
    early_bird_capsules: 0,
    new_year_capsules: 0,
    folders_created: 0,
    capsules_created_today: 0,
    capsules_created_today_date: '',
    capsules_created_today_max: 0,
    last_updated: new Date().toISOString()
  };
  
  await kv.set(`user_stats:${userId}`, stats);
  return stats;
}

// Get user stats — v2.8.0: backfills new fields for older records
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const stats = await kv.get<UserStats>(`user_stats:${userId}`);
  if (!stats) return null;
  // Backfill v2.8.0 fields so older records don't return undefined
  return {
    midnight_capsules: 0,
    golden_hour_capsules: 0,
    early_bird_capsules: 0,
    new_year_capsules: 0,
    folders_created: 0,
    capsules_created_today: 0,
    capsules_created_today_date: '',
    capsules_created_today_max: 0,
    ...stats
  };
}

// Update user stats
export async function updateUserStats(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
  let stats = await getUserStats(userId);
  if (!stats) {
    stats = await initializeUserStats(userId);
  }
  
  const updated = {
    ...stats,
    ...updates,
    last_updated: new Date().toISOString()
  };
  
  // Calculate days since signup if account_created_at exists
  if (updated.account_created_at) {
    const daysBetween = (date1: string, date2: string) => {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };
    updated.days_since_signup = daysBetween(stats.account_created_at, new Date().toISOString());
  }
  
  // Track unique creation days for Consistent Creator (A010)
  if (!Array.isArray(updated.creation_day_set)) {
    updated.creation_day_set = [];
  }
  
  await kv.set(`user_stats:${userId}`, updated);
  return updated;
}

// Get achievement progress
export async function getAchievementProgress(userId: string): Promise<AchievementProgress | null> {
  const progress = await kv.get<AchievementProgress>(`achievement_progress:${userId}`);
  return progress;
}

// Initialize achievement progress
export async function initializeAchievementProgress(userId: string): Promise<AchievementProgress> {
  const progress: AchievementProgress = {
    userId,
    unlockedAchievements: [],
    progress: {},
    lastChecked: new Date().toISOString(),
    shownNotifications: []
  };
  
  await kv.set(`achievement_progress:${userId}`, progress);
  return progress;
}

// Update achievement progress
export async function updateAchievementProgress(
  userId: string,
  achievementId: string
): Promise<AchievementProgress> {
  let progress = await getAchievementProgress(userId);
  if (!progress) {
    progress = await initializeAchievementProgress(userId);
  }
  
  if (!progress.unlockedAchievements.includes(achievementId)) {
    progress.unlockedAchievements.push(achievementId);
    progress.lastChecked = new Date().toISOString();
    await kv.set(`achievement_progress:${userId}`, progress);
  }
  
  return progress;
}

// ============================================
// ACHIEVEMENT CHECKING
// ============================================

// Check all achievements for a user
export async function checkAchievements(userId: string): Promise<Achievement[]> {
  const stats = await getUserStats(userId);
  if (!stats) {
    return [];
  }
  
  const progress = await getAchievementProgress(userId) || await initializeAchievementProgress(userId);
  const newlyUnlocked: Achievement[] = [];
  
  for (const [id, achievement] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
    // Skip if already unlocked
    if (progress.unlockedAchievements.includes(id)) {
      continue;
    }
    
    // Check if achievement criteria is met
    const isUnlocked = await checkAchievementCriteria(achievement, stats);
    
    if (isUnlocked) {
      await updateAchievementProgress(userId, id);
      newlyUnlocked.push(achievement);
    }
  }
  
  return newlyUnlocked;
}

// Check if a specific achievement criteria is met
async function checkAchievementCriteria(achievement: Achievement, stats: UserStats): Promise<boolean> {
  const { unlockCriteria } = achievement;
  
  switch (unlockCriteria.type) {
    case 'count': {
      const statValue = getNestedStat(stats, unlockCriteria.stat!);
      const threshold = unlockCriteria.threshold!;
      const operator = unlockCriteria.operator || '>=';
      
      switch (operator) {
        case '>=': return statValue >= threshold;
        case '>': return statValue > threshold;
        case '==': return statValue === threshold;
        case '<=': return statValue <= threshold;
        case '<': return statValue < threshold;
        default: return false;
      }
    }
    
    case 'streak': {
      return stats.max_streak_days >= unlockCriteria.threshold!;
    }
    
    case 'time_wait': {
      return stats.max_wait_days >= unlockCriteria.threshold!;
    }
    
    case 'specific_action': {
      // These are triggered by specific events in the app
      // They'll be checked when the action occurs
      return false;
    }
    
    case 'combo': {
      // Check if all requirements are met
      if (!unlockCriteria.requirements) return false;
      return unlockCriteria.requirements.every(req => {
        const statValue = getNestedStat(stats, req.stat);
        const operator = req.operator || '>=';
        switch (operator) {
          case '>=': return statValue >= req.threshold;
          case '>': return statValue > req.threshold;
          case '==': return statValue === req.threshold;
          default: return false;
        }
      });
    }
    
    case 'custom': {
      // Use custom validator function
      if (!unlockCriteria.validator) return false;
      return await runCustomValidator(unlockCriteria.validator, stats);
    }
    
    default:
      return false;
  }
}

// Get nested stat value (e.g., 'media_by_type.photo')
function getNestedStat(stats: UserStats, statPath: string): number {
  const parts = statPath.split('.');
  let value: any = stats;
  
  for (const part of parts) {
    value = value[part];
    if (value === undefined) return 0;
  }
  
  return typeof value === 'number' ? value : 0;
}

// ============================================
// CUSTOM VALIDATORS
// ============================================

async function runCustomValidator(validatorName: string, stats: UserStats): Promise<boolean> {
  switch (validatorName) {
    case 'validateCinematic':
      return stats.cinematic_capsules >= 1;
    
    case 'validateGoldenHour':
      // Now tracked via golden_hour_capsules stat (v2.8.0 fix)
      return (stats.golden_hour_capsules || 0) >= 1;
    
    case 'validateGoldenRatio':
      return stats.capsules_created === 89;
    
    case 'validateMemoryWeaver':
      // Check if user has created capsules with all 4 media types
      return stats.media_by_type.photo >= 1 &&
             stats.media_by_type.video >= 1 &&
             stats.media_by_type.audio >= 1 &&
             stats.capsules_created >= 1; // At least one capsule with text
    
    case 'validateTimeLord':
      // Check if capsules span 5+ different years
      return stats.capsule_years.length >= 5;
    
    default:
      return false;
  }
}

// ============================================
// ACHIEVEMENT TRIGGERS
// ============================================

// Trigger achievement check for specific action
export async function triggerAchievement(
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<Achievement[]> {
  const stats = await getUserStats(userId);
  if (!stats) return [];
  
  const progress = await getAchievementProgress(userId) || await initializeAchievementProgress(userId);
  const newlyUnlocked: Achievement[] = [];
  
  // Find achievements that match this action
  for (const [id, achievement] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
    if (progress.unlockedAchievements.includes(id)) continue;
    
    if (achievement.unlockCriteria.type === 'specific_action' &&
        achievement.unlockCriteria.action === action) {
      
      // Additional validation based on metadata if needed
      let isValid = true;
      
      // For multi-recipient achievements, check count
      if (action.startsWith('multi_recipient_capsule_sent_')) {
        const requiredCount = parseInt(action.split('_').pop() || '0');
        isValid = (metadata?.recipientCount || 0) >= requiredCount;
      }
      
      if (isValid) {
        await updateAchievementProgress(userId, id);
        newlyUnlocked.push(achievement);
      }
    }
  }
  
  return newlyUnlocked;
}

// Main achievement checking function - comprehensive handler for all achievement tracking
export async function checkAndUnlockAchievements(
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<{ newlyUnlocked: Achievement[]; allUnlocked: Achievement[] }> {
  try {
    console.log(`🏆 [Achievement Service] checkAndUnlockAchievements called:`, { userId, action, metadata });
    
    // Initialize user data if needed
    let stats = await getUserStats(userId);
    if (!stats) {
      stats = await initializeUserStats(userId);
    }
    
    let progress = await getAchievementProgress(userId);
    if (!progress) {
      progress = await initializeAchievementProgress(userId);
    }
    
    const newlyUnlocked: Achievement[] = [];
    
    // Handle different action types
    switch (action) {
      case 'capsule_created': {
        // Track capsule creation with full metadata
        const capsuleData = {
          mediaFiles: metadata?.mediaFiles || 0,
          wordCount: metadata?.wordCount || 0,
          scheduledDate: metadata?.scheduledDate || new Date().toISOString(),
          contentTypes: metadata?.contentTypes || [],
          userLocalHour: typeof metadata?.userLocalHour === 'number' ? metadata.userLocalHour : undefined
        };
        const unlocked = await trackCapsuleCreation(userId, capsuleData);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'capsule_sent': {
        const unlocked = await trackCapsuleSent(userId, metadata?.recipientEmails || []);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'capsule_received': {
        const unlocked = await trackCapsuleReceived(userId, metadata?.sentDate || new Date().toISOString());
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'media_uploaded': {
        if (metadata?.mediaType) {
          const unlocked = await trackMediaUpload(userId, metadata.mediaType);
          newlyUnlocked.push(...unlocked);
        }
        break;
      }
      
      case 'vault_storage': {
        const unlocked = await trackVaultStorage(userId);
        newlyUnlocked.push(...unlocked);
        break;
      }

      case 'folder_created': {
        // Tracks vault folder creation for A046/A047
        const unlocked = await trackFolderCreated(userId);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'echo_sent': {
        const unlocked = await trackEchoSent(userId);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'echo_received': {
        const unlocked = await trackEchoReceived(userId, metadata?.senderUserId || '');
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      case 'capsule_edited': {
        const unlocked = await trackCapsuleEdit(userId, metadata?.editCount || 1);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      // Multi-recipient actions (MR001: 3+ recipients, MR002: 10+ recipients)
      case 'multi_recipient_capsule': {
        if (metadata?.recipientCount) {
          const recipientCount = metadata.recipientCount;
          
          // Update stats for unique recipients
          stats.unique_recipients = Math.max(stats.unique_recipients || 0, recipientCount);
          await updateUserStats(userId, { unique_recipients: stats.unique_recipients });
          
          // MR001: Broadcast Beginner (3+ recipients at once)
          if (recipientCount >= 3) {
            const unlocked = await triggerAchievement(userId, 'multi_recipient_capsule_sent_3', { recipientCount });
            newlyUnlocked.push(...unlocked);
          }
          // MR002: Grand Broadcast (10+ recipients at once)
          if (recipientCount >= 10) {
            const unlocked = await triggerAchievement(userId, 'multi_recipient_capsule_sent_10', { recipientCount });
            newlyUnlocked.push(...unlocked);
          }
        }
        break;
      }
      
      // All media types in one capsule
      case 'capsule_with_all_media_types': {
        const unlocked = await triggerAchievement(userId, 'capsule_with_all_media_types', metadata);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      // Onboarding achievements
      case 'onboarding_first_capsule_complete':
      case 'onboarding_vault_mastery_complete': {
        const unlocked = await triggerAchievement(userId, action, metadata);
        newlyUnlocked.push(...unlocked);
        break;
      }
      
      // Generic specific actions
      default: {
        // Try to trigger as a specific action achievement
        const unlocked = await triggerAchievement(userId, action, metadata);
        newlyUnlocked.push(...unlocked);
        
        // Also check all achievements to see if any thresholds were met
        const allUnlocked = await checkAchievements(userId);
        for (const achievement of allUnlocked) {
          if (!progress.unlockedAchievements.includes(achievement.id) &&
              !newlyUnlocked.find(a => a.id === achievement.id)) {
            newlyUnlocked.push(achievement);
          }
        }
        break;
      }
    }
    
    // Get all unlocked achievements for this user
    const updatedProgress = await getAchievementProgress(userId);
    const allUnlocked = updatedProgress?.unlockedAchievements
      .map(id => ACHIEVEMENT_DEFINITIONS[id])
      .filter(Boolean) || [];
    
    // 🔥 CRITICAL FIX: Add newly unlocked achievements to user_achievements array
    // This ensures the achievements dashboard can display them correctly
    if (newlyUnlocked.length > 0) {
      const userAchievements = await kv.get(`user_achievements:${userId}`) || [];
      const currentTimestamp = new Date().toISOString();
      
      for (const achievement of newlyUnlocked) {
        // Check if not already in the array (prevent duplicates)
        const alreadyExists = userAchievements.some((a: any) => a.achievementId === achievement.id);
        
        if (!alreadyExists) {
          userAchievements.push({
            achievementId: achievement.id,
            unlockedAt: currentTimestamp,
            notificationShown: false,
            shared: false,
            sourceAction: action,
            metadata: metadata || {}
          });
          
          console.log(`📝 [Achievement Service] Added ${achievement.id} to user_achievements array`);
        }
      }
      
      // Save updated user_achievements array
      await kv.set(`user_achievements:${userId}`, userAchievements);
      console.log(`✅ [Achievement Service] Saved ${userAchievements.length} total achievements to KV`);
    }
    
    console.log(`🏆 [Achievement Service] Result:`, {
      newlyUnlocked: newlyUnlocked.map(a => ({ id: a.id, title: a.title })),
      totalUnlocked: allUnlocked.length
    });
    
    return {
      newlyUnlocked,
      allUnlocked
    };
    
  } catch (error) {
    console.error(`🏆 [Achievement Service] Error in checkAndUnlockAchievements:`, error);
    return {
      newlyUnlocked: [],
      allUnlocked: []
    };
  }
}

// ============================================
// STAT UPDATE HELPERS
// ============================================

// Track capsule creation — v2.8.0: includes all time-based achievement tracking
export async function trackCapsuleCreation(
  userId: string,
  capsuleData: {
    mediaFiles: number;
    wordCount: number;
    scheduledDate: string;
    contentTypes: string[];
    userLocalHour?: number; // Hour 0-23 in user's local timezone (passed from frontend)
  }
): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  const updates: Partial<UserStats> = {
    capsules_created: stats.capsules_created + 1,
    total_media_files: stats.total_media_files + capsuleData.mediaFiles,
    max_capsule_word_count: Math.max(stats.max_capsule_word_count, capsuleData.wordCount)
  };
  
  // Calculate days until scheduled date
  const now = new Date();
  const scheduledDate = new Date(capsuleData.scheduledDate);
  const daysDiff = Math.floor((scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  updates.max_schedule_days = Math.max(stats.max_schedule_days, daysDiff);
  
  // Track year for Time Lord achievement
  const scheduledYear = scheduledDate.getFullYear();
  if (!stats.capsule_years.includes(scheduledYear)) {
    updates.capsule_years = [...stats.capsule_years, scheduledYear];
  }
  
  // Track multimedia capsules (3+ content types)
  if (capsuleData.contentTypes.length >= 3) {
    updates.multimedia_capsules = (stats.multimedia_capsules || 0) + 1;
  }
  
  // Track cinematic capsules (10+ media files)
  if (capsuleData.mediaFiles >= 10) {
    updates.cinematic_capsules = (stats.cinematic_capsules || 0) + 1;
  }
  
  // Track unique creation day
  const today = now.toISOString().split('T')[0];
  if (!stats.creation_day_set.includes(today)) {
    updates.creation_day_set = [...stats.creation_day_set, today];
    updates.unique_creation_days = updates.creation_day_set.length;
  }

  // ── v2.8.0: Time-of-day and calendar achievement tracking ─────────────────
  // Use userLocalHour from frontend if available, else fall back to server UTC hour
  const hour = typeof capsuleData.userLocalHour === 'number'
    ? capsuleData.userLocalHour
    : now.getUTCHours();

  // A026 – Midnight Creator (0:00–2:59)
  if (hour >= 0 && hour <= 2) {
    updates.midnight_capsules = (stats.midnight_capsules || 0) + 1;
  }

  // A031 – Golden Hour Guardian (6:00–7:59 sunrise or 17:00–18:59 sunset)
  if ((hour >= 6 && hour <= 7) || (hour >= 17 && hour <= 18)) {
    updates.golden_hour_capsules = (stats.golden_hour_capsules || 0) + 1;
  }

  // A042 – Early Bird (5:00–6:59)
  if (hour >= 5 && hour <= 6) {
    updates.early_bird_capsules = (stats.early_bird_capsules || 0) + 1;
  }

  // A027 – New Year's Spirit (January 1st in user's locale or UTC)
  const month = now.getUTCMonth() + 1; // 1-based
  const day = now.getUTCDate();
  if (month === 1 && day === 1) {
    updates.new_year_capsules = (stats.new_year_capsules || 0) + 1;
  }

  // A018 – Marathon Creator (10+ capsules in a single day)
  const todayDate = today; // YYYY-MM-DD
  const prevDate = stats.capsules_created_today_date || '';
  let todayCount = prevDate === todayDate ? (stats.capsules_created_today || 0) + 1 : 1;
  updates.capsules_created_today = todayCount;
  updates.capsules_created_today_date = todayDate;
  updates.capsules_created_today_max = Math.max(stats.capsules_created_today_max || 0, todayCount);
  // ──────────────────────────────────────────────────────────────────────────
  
  await updateUserStats(userId, updates);
  
  // Check for newly unlocked achievements
  const newAchievements = await checkAchievements(userId);
  
  // Also check for multimedia capsule achievement (A008)
  if (capsuleData.contentTypes.length >= 3) {
    const multimediaAchievements = await triggerAchievement(userId, 'multimedia_capsule_created');
    newAchievements.push(...multimediaAchievements);
  }
  
  return newAchievements;
}

// Track media upload
export async function trackMediaUpload(
  userId: string,
  mediaType: 'photo' | 'video' | 'audio'
): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  const updates: Partial<UserStats> = {
    media_by_type: {
      ...stats.media_by_type,
      [mediaType]: stats.media_by_type[mediaType] + 1
    },
    total_media_files: stats.total_media_files + 1
  };
  
  await updateUserStats(userId, updates);
  return checkAchievements(userId);
}

// Track capsule sent
export async function trackCapsuleSent(
  userId: string,
  recipientEmails: string[]
): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  // Track unique recipients
  const newRecipients = recipientEmails.filter(
    email => !stats.unique_recipient_emails.includes(email)
  );
  
  const updates: Partial<UserStats> = {
    capsules_sent: stats.capsules_sent + 1,
    unique_recipient_emails: [...stats.unique_recipient_emails, ...newRecipients],
    unique_recipients: stats.unique_recipient_emails.length + newRecipients.length
  };
  
  await updateUserStats(userId, updates);
  
  // Check achievements
  const achievements = await checkAchievements(userId);
  
  // Check multi-recipient achievements
  if (recipientEmails.length >= 3) {
    const multiAchievements = await triggerAchievement(userId, 'multi_recipient_capsule_sent_3', {
      recipientCount: recipientEmails.length
    });
    achievements.push(...multiAchievements);
  }
  
  if (recipientEmails.length >= 10) {
    const multiAchievements = await triggerAchievement(userId, 'multi_recipient_capsule_sent_10', {
      recipientCount: recipientEmails.length
    });
    achievements.push(...multiAchievements);
  }
  
  return achievements;
}

// Track capsule received
export async function trackCapsuleReceived(
  userId: string,
  sentDate: string
): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  // Calculate wait days
  const sent = new Date(sentDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - sent.getTime()) / (1000 * 60 * 60 * 24));
  
  const updates: Partial<UserStats> = {
    capsules_received: stats.capsules_received + 1,
    max_wait_days: Math.max(stats.max_wait_days, daysDiff)
  };
  
  await updateUserStats(userId, updates);
  return checkAchievements(userId);
}

// Track vault storage
export async function trackVaultStorage(userId: string): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  const updates: Partial<UserStats> = {
    vaulted_capsules: (stats.vaulted_capsules || 0) + 1
  };
  
  await updateUserStats(userId, updates);
  return checkAchievements(userId);
}

// Track echo sent
export async function trackEchoSent(userId: string): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  const updates: Partial<UserStats> = {
    echoes_sent: (stats.echoes_sent || 0) + 1
  };
  
  await updateUserStats(userId, updates);
  return checkAchievements(userId);
}

// Track echo received (for Community Beacon achievement)
export async function trackEchoReceived(userId: string, senderUserId: string): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  // Track unique echo senders
  if (!stats.unique_echo_sender_ids.includes(senderUserId)) {
    const updates: Partial<UserStats> = {
      unique_echo_sender_ids: [...stats.unique_echo_sender_ids, senderUserId],
      unique_echo_senders: stats.unique_echo_sender_ids.length + 1
    };
    
    await updateUserStats(userId, updates);
    return checkAchievements(userId);
  }
  
  return [];
}

// Track vault folder creation (A046 Folder Pioneer, A047 Folder Architect)
export async function trackFolderCreated(userId: string): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  const updates: Partial<UserStats> = {
    folders_created: (stats.folders_created || 0) + 1
  };
  await updateUserStats(userId, updates);
  return checkAchievements(userId);
}

// Track capsule edit — A017 now uses count on capsules_edited ≥ 5
export async function trackCapsuleEdit(userId: string, _editCount?: number): Promise<Achievement[]> {
  const stats = await getUserStats(userId) || await initializeUserStats(userId);
  
  const updates: Partial<UserStats> = {
    capsules_edited: (stats.capsules_edited || 0) + 1
  };
  
  await updateUserStats(userId, updates);
  // checkAchievements will pick up A017 once capsules_edited >= 5
  return checkAchievements(userId);
}

// ============================================
// LEADERBOARD FUNCTIONS
// ============================================

export async function getLeaderboard(category: 'total' | 'streak' | 'media'): Promise<Array<{
  userId: string;
  value: number;
  rank: number;
}>> {
  // Get all user stats
  const allStats = await kv.getByPrefix<UserStats>('user_stats:');
  
  // Sort based on category
  let sorted: Array<{ userId: string; value: number }> = [];
  
  switch (category) {
    case 'total':
      sorted = allStats
        .map(s => ({ userId: s.userId, value: s.capsules_created }))
        .sort((a, b) => b.value - a.value);
      break;
    
    case 'streak':
      sorted = allStats
        .map(s => ({ userId: s.userId, value: s.max_streak_days }))
        .sort((a, b) => b.value - a.value);
      break;
    
    case 'media':
      sorted = allStats
        .map(s => ({ userId: s.userId, value: s.total_media_files }))
        .sort((a, b) => b.value - a.value);
      break;
  }
  
  // Add ranks
  return sorted.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}

// ============================================
// EXPORT SERVICE
// ============================================

// Get all achievement definitions (for frontend)
export async function getAchievementDefinitions(): Promise<Record<string, Achievement>> {
  // Apply custom visual configs to each achievement
  const achievementsWithVisuals: Record<string, Achievement> = {};
  
  for (const [id, achievement] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
    const customVisual = getAchievementVisual(id);
    achievementsWithVisuals[id] = {
      ...achievement,
      icon: customVisual.icon,
      visual: {
        gradientStart: customVisual.gradientStart,
        gradientEnd: customVisual.gradientEnd,
        particleColor: customVisual.particleColor,
        glowColor: customVisual.glowColor,
        animation: customVisual.animation
      }
    };
  }
  
  return achievementsWithVisuals;
}

// Get user's title profile
export async function getUserTitleProfile(userId: string): Promise<any> {
  // ✅ FIX: Use correct key user_title_profile (not user_profile)
  const profile = await kv.get(`user_title_profile:${userId}`);
  
  // If no profile exists, return empty profile
  if (!profile) {
    return {
      userId,
      equipped_title: null,
      equipped_achievement_id: null,
      unlocked_titles: []
    };
  }
  
  return {
    userId,
    equipped_title: profile.equipped_title || null,
    equipped_achievement_id: profile.equipped_achievement_id || null,
    unlocked_titles: profile.unlocked_titles || []
  };
}

// Get available titles for a user
export async function getAvailableTitles(userId: string): Promise<{
  titles: Array<{
    achievementId: string;
    title: string;
    rarity: string;
    category: string;
    description: string;
    icon: string;
    isUnlocked: boolean;
    unlockedAt?: string;
    isEquipped: boolean;
    visual: {
      gradientStart: string;
      gradientEnd: string;
      particleColor: string;
      glowColor: string;
      animation: string;
    };
  }>;
  equipped: string | null;
  equippedAchievementId: string | null;
  unlockedCount: number;
  totalCount: number;
}> {
  // ✅ FIX: Use achievement_progress (source of truth) not user_profile
  const progress = await getAchievementProgress(userId);
  const unlockedAchievements = progress?.unlockedAchievements || [];
  
  // Get title profile to find equipped title
  const titleProfile = await getUserTitleProfile(userId);
  const equippedAchievementId = titleProfile?.equipped_achievement_id || null;
  const equippedTitle = titleProfile?.equipped_title || null;
  
  const allTitles: Array<any> = [];
  
  // Map achievements to their titles with full data
  for (const [achievementId, achievement] of Object.entries(ACHIEVEMENT_DEFINITIONS)) {
    if (achievement.rewards.title) {
      // Check if achievement is unlocked from achievement progress (source of truth)
      const isUnlocked = unlockedAchievements.includes(achievementId);
      const isEquipped = achievementId === equippedAchievementId;
      
      allTitles.push({
        achievementId,
        title: achievement.rewards.title,
        rarity: achievement.rarity,
        category: achievement.category,
        description: achievement.description,
        icon: achievement.icon,
        isUnlocked,
        isEquipped,
        visual: {
          gradientStart: getGradientForRarity(achievement.rarity).start,
          gradientEnd: getGradientForRarity(achievement.rarity).end,
          particleColor: getParticleColorForRarity(achievement.rarity),
          glowColor: getGlowColorForRarity(achievement.rarity),
          animation: 'float'
        }
      });
    }
  }
  
  const unlockedCount = allTitles.filter(t => t.isUnlocked).length;
  
  return {
    titles: allTitles,
    equipped: equippedTitle,
    equippedAchievementId,
    unlockedCount,
    totalCount: allTitles.length
  };
}

// Helper functions for visual effects based on rarity
function getGradientForRarity(rarity: string): { start: string; end: string } {
  const gradients: Record<string, { start: string; end: string }> = {
    common: { start: '#64748b', end: '#475569' },
    uncommon: { start: '#10b981', end: '#059669' },
    rare: { start: '#3b82f6', end: '#2563eb' },
    epic: { start: '#a855f7', end: '#9333ea' },
    legendary: { start: '#f59e0b', end: '#d97706' }
  };
  return gradients[rarity] || gradients.common;
}

function getParticleColorForRarity(rarity: string): string {
  const colors: Record<string, string> = {
    common: '#94a3b8',
    uncommon: '#34d399',
    rare: '#60a5fa',
    epic: '#c084fc',
    legendary: '#fbbf24'
  };
  return colors[rarity] || colors.common;
}

function getGlowColorForRarity(rarity: string): string {
  const colors: Record<string, string> = {
    common: 'rgba(148, 163, 184, 0.5)',
    uncommon: 'rgba(52, 211, 153, 0.5)',
    rare: 'rgba(96, 165, 250, 0.5)',
    epic: 'rgba(192, 132, 252, 0.5)',
    legendary: 'rgba(251, 191, 36, 0.5)'
  };
  return colors[rarity] || colors.common;
}

// Get pending achievement notifications (not yet shown to user)
export async function getPendingNotifications(userId: string): Promise<Array<{
  achievementId: string;
  achievement: Achievement;
  unlockedAt: string;
}>> {
  try {
    const progress = await getAchievementProgress(userId);
    if (!progress) {
      return [];
    }
    
    const shownNotifications = progress.shownNotifications || [];
    const unlockedAchievements = progress.unlockedAchievements || [];
    
    // Find achievements that are unlocked but not yet shown
    const pending = unlockedAchievements
      .filter(id => !shownNotifications.includes(id))
      .map(id => ({
        achievementId: id,
        achievement: ACHIEVEMENT_DEFINITIONS[id],
        unlockedAt: new Date().toISOString() // We don't track exact unlock time yet
      }))
      .filter(item => item.achievement); // Filter out any undefined achievements
    
    return pending;
  } catch (error) {
    console.error('❌ [Achievement] Error getting pending notifications:', error);
    // Return empty array instead of throwing to prevent breaking the app
    return [];
  }
}

// Get all unlocked achievements for a user (used by frontend)
export async function getUserAchievements(userId: string): Promise<string[]> {
  // Try user_profile first (from recalculation)
  const profile = await kv.get(`user_profile:${userId}`);
  if (profile?.achievements) {
    console.log(`📊 [getUserAchievements] Retrieved from user_profile: ${profile.achievements.length} achievements`);
    return profile.achievements;
  }
  
  // Fallback to achievement_progress
  const progress = await getAchievementProgress(userId);
  if (progress?.unlockedAchievements) {
    console.log(`📊 [getUserAchievements] Retrieved from achievement_progress: ${progress.unlockedAchievements.length} achievements`);
    return progress.unlockedAchievements;
  }
  
  console.log(`📊 [getUserAchievements] No achievements found for user ${userId}`);
  return [];
}

// Mark achievement notifications as shown
export async function markNotificationsShown(userId: string, achievementIds: string[]): Promise<void> {
  const progress = await getAchievementProgress(userId);
  if (!progress) {
    return;
  }
  
  const shownNotifications = progress.shownNotifications || [];
  const updatedShown = [...new Set([...shownNotifications, ...achievementIds])];
  
  const updatedProgress = {
    ...progress,
    shownNotifications: updatedShown
  };
  
  await kv.set(`achievement_progress:${userId}`, updatedProgress);
}

// Initialize user titles with Time Novice freebie
export async function initializeUserTitles(userId: string): Promise<void> {
  console.log(`🎁 [initializeUserTitles] Starting for user: ${userId}`);
  
  // Initialize achievement progress if not exists
  let progress = await getAchievementProgress(userId);
  if (!progress) {
    console.log(`🎁 [initializeUserTitles] No progress found, initializing...`);
    progress = await initializeAchievementProgress(userId);
  } else {
    console.log(`🎁 [initializeUserTitles] Existing progress found:`, {
      unlocked: progress.unlockedAchievements.length,
      hasA001: progress.unlockedAchievements.includes('A001')
    });
  }
  
  // Check if Time Novice (A001) is already unlocked
  const firstStepAchievement = 'A001';
  const isNewUnlock = !progress.unlockedAchievements.includes(firstStepAchievement);
  
  if (isNewUnlock) {
    console.log(`🎁 [initializeUserTitles] ✅ A001 is new - unlocking now`);
    
    // Unlock Time Novice achievement in progress tracker
    progress.unlockedAchievements.push(firstStepAchievement);
    await kv.set(`achievement_progress:${userId}`, progress);
    console.log(`🎁 [initializeUserTitles] ✓ Saved to achievement_progress`);
    
    // 🔥 CRITICAL: Add to user_achievements array so modal can show
    const userAchievements = await kv.get(`user_achievements:${userId}`) || [];
    const alreadyInArray = userAchievements.some((a: any) => a.achievementId === firstStepAchievement);
    
    if (!alreadyInArray) {
      userAchievements.push({
        achievementId: firstStepAchievement,
        unlockedAt: new Date().toISOString(),
        notificationShown: false, // Will trigger modal on next check
        shared: false,
        sourceAction: 'signup',
        metadata: {}
      });
      await kv.set(`user_achievements:${userId}`, userAchievements);
      console.log(`🎁 [initializeUserTitles] ✓ Added A001 to user_achievements array (${userAchievements.length} total)`);
    } else {
      console.log(`🎁 [initializeUserTitles] ⏭️ A001 already in user_achievements array`);
    }
  } else {
    console.log(`🎁 [initializeUserTitles] ⏭️ A001 already unlocked, skipping`);
  }
  
  // Initialize title profile
  const titleProfile = await getUserTitleProfile(userId);
  if (!titleProfile.equipped_title) {
    console.log(`🎁 [initializeUserTitles] Setting up title profile with Time Novice`);
    await kv.set(`user_title_profile:${userId}`, {
      userId,
      equipped_title: 'Time Novice',
      equipped_achievement_id: firstStepAchievement,
      unlocked_titles: [{
        title: 'Time Novice',
        achievementId: firstStepAchievement,
        rarity: 'common',
        unlockedAt: new Date().toISOString()
      }]
    });
    console.log(`🎁 [initializeUserTitles] ✓ Title profile created`);
  } else {
    console.log(`🎁 [initializeUserTitles] ⏭️ Title profile already exists:`, titleProfile.equipped_title);
  }
  
  console.log(`🎁 [initializeUserTitles] ✅ Complete for user: ${userId}`);
}

// Equip a title for a user
export async function equipTitle(userId: string, achievementId: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[AchievementService] equipTitle called:', { userId, achievementId });
    
    // Get current title profile
    const titleProfile = await getUserTitleProfile(userId);
    
    // If achievementId is null, user is unequipping their title
    if (achievementId === null) {
      await kv.set(`user_title_profile:${userId}`, {
        ...titleProfile,
        equipped_title: null,
        equipped_achievement_id: null
      });
      console.log('[AchievementService] Title unequipped successfully');
      return { success: true };
    }
    
    // Get achievement progress to verify the title is unlocked
    const progress = await getAchievementProgress(userId);
    if (!progress) {
      return { success: false, error: 'User progress not found' };
    }
    
    // Check if the achievement is unlocked
    if (!progress.unlockedAchievements.includes(achievementId)) {
      return { success: false, error: 'Achievement not unlocked' };
    }
    
    // Get the achievement to find its title
    const achievement = ACHIEVEMENT_DEFINITIONS[achievementId];
    if (!achievement) {
      return { success: false, error: 'Achievement not found' };
    }
    
    if (!achievement.rewards.title) {
      return { success: false, error: 'Achievement does not have a title reward' };
    }
    
    // Equip the title
    await kv.set(`user_title_profile:${userId}`, {
      ...titleProfile,
      equipped_title: achievement.rewards.title,
      equipped_achievement_id: achievementId
    });
    
    console.log('[AchievementService] Title equipped successfully:', achievement.rewards.title);
    return { success: true };
  } catch (error) {
    console.error('[AchievementService] equipTitle error:', error);
    return { success: false, error: 'Failed to equip title' };
  }
}

console.log('🏆 Achievement Service loaded successfully');
console.log(`📊 Total achievements: ${Object.keys(ACHIEVEMENT_DEFINITIONS).length}`);
console.log('✅ A007 (Enhanced Memory) removed');
console.log('✅ E007 (Master Curator) removed');
