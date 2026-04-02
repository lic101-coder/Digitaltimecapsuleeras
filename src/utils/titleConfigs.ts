/**
 * Shared title configuration for PrestigeBar and TitleCarousel
 * Maps title names to their emoji icons, animations, and visual themes
 */

export interface TitleConfig {
  icon: string;
  flavorText: string;
  colors: string[];
  bgPattern: string;
  animation: string;
  particleCount: number;
  particleType: string;
  intensity: 'low' | 'medium' | 'high' | 'supreme';
}

export const titleConfigs: Record<string, TitleConfig> = {
  // ============ COMMON TIER ============
  'Time Novice': {
    icon: '⏰',
    flavorText: 'Just Beginning the Journey',
    colors: ['#3b82f6', '#64748b'],
    bgPattern: 'clockwork',
    animation: 'clock-tick',
    particleCount: 4,
    particleType: 'clock',
    intensity: 'low'
  },
  'Future Messenger': {
    icon: '📨',
    flavorText: 'Sending Hope to Tomorrow',
    colors: ['#A78BFA', '#7C3AED'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 6,
    particleType: 'sparkle',
    intensity: 'low'
  },
  'Past Receiver': {
    icon: '📬',
    flavorText: "Opening Yesterday's Treasures",
    colors: ['#FBBF24', '#D97706'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 6,
    particleType: 'sparkle',
    intensity: 'low'
  },
  'Snapshot Keeper': {
    icon: '📷',
    flavorText: 'Freezing Time in Frames',
    colors: ['#0D9488', '#14B8A6', '#06B6D4'], // Teal to cyan camera lens theme
    bgPattern: 'photo-frames',
    animation: 'camera-flash',
    particleCount: 5,
    particleType: 'camera',
    intensity: 'low'
  },
  'Cinema Pioneer': {
    icon: '🎥',
    flavorText: 'Capturing Motion and Memory',
    colors: ['#7C2D12', '#DC2626', '#F59E0B'], // Deep ruby to golden amber vintage cinema
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 6,
    particleType: 'sparkle',
    intensity: 'low'
  },
  'Voice Keeper': {
    icon: '🎙️',
    flavorText: 'Preserving Echoes of the Heart',
    colors: ['#86198F', '#DB2777', '#F472B6'], // Deep magenta to vibrant pink audio waveform
    bgPattern: 'sound-waves',
    animation: 'wave-pulse',
    particleCount: 5,
    particleType: 'note',
    intensity: 'low'
  },
  'Habit Builder': {
    icon: '🔥',
    flavorText: 'Kindling Daily Dedication',
    colors: ['#10B981', '#047857'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 6,
    particleType: 'sparkle',
    intensity: 'low'
  },
  'Moment Collector': {
    icon: '📸',
    flavorText: "Gathering Life's Snapshots",
    colors: ['#7C3AED', '#A855F7', '#EC4899'], // Vibrant purple to pink scrapbook aesthetic
    bgPattern: 'photo-frames',
    animation: 'camera-flash',
    particleCount: 5,
    particleType: 'camera',
    intensity: 'low'
  },
  'Echo Pioneer': {
    icon: '📡',
    flavorText: 'First Reverberations Through Time',
    colors: ['#164E63', '#0891B2', '#22D3EE'], // Deep cyan cosmic pond with sonar ripples
    bgPattern: 'ripple-waves',
    animation: 'sonar-pulse',
    particleCount: 6,
    particleType: 'wave',
    intensity: 'low'
  },
  'Vault Keeper': {
    icon: '🔐',
    flavorText: 'Guardian of Secure Memories',
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA'], // Deep steel blue vault door
    bgPattern: 'security-grid',
    animation: 'vault-lock',
    particleCount: 5,
    particleType: 'lock',
    intensity: 'low'
  },

  'Folder Keeper': {
    icon: '📁',
    flavorText: 'Organizing Memories with Care',
    colors: ['#475569', '#64748B', '#94A3B8'],
    bgPattern: 'grid',
    animation: 'float',
    particleCount: 6,
    particleType: 'sparkle',
    intensity: 'low'
  },

  'Folder Architect': {
    icon: '🗂️',
    flavorText: 'Master of Memory Organization',
    colors: ['#1E40AF', '#2563EB', '#3B82F6', '#60A5FA'],
    bgPattern: 'blueprint',
    animation: 'shimmer',
    particleCount: 12,
    particleType: 'sparkle',
    intensity: 'medium'
  },

  // ============ UNCOMMON TIER ============
  // 🎨 SPECTACULAR VISUAL ENHANCEMENTS - More impressive than Common
  
  'Golden Hour Guardian': {
    icon: '🌅',
    flavorText: 'Bathed in Amber Light',
    colors: ['#FBBF24', '#F59E0B', '#EA580C'], // Sunrise/sunset split with golden god rays and photographer silhouette
    bgPattern: 'sunset-rays',
    animation: 'golden-shimmer',
    particleCount: 12,
    particleType: 'sun-ray',
    intensity: 'medium'
  },
  'Neon Dreamer': {
    icon: '💡',
    flavorText: 'Illuminating Tomorrow',
    colors: ['#22D3EE', '#0284C7'], // Electric cyan
    bgPattern: 'neon-pulse',
    animation: 'electric-glow',
    particleCount: 14,
    particleType: 'electric-spark',
    intensity: 'medium'
  },
  'Surrealist': {
    icon: '🎨',
    flavorText: 'Painting Dreams into Reality',
    colors: ['#818CF8', '#4F46E5'], // Deep indigo
    bgPattern: 'paint-splash',
    animation: 'color-swirl',
    particleCount: 10,
    particleType: 'paint-drop',
    intensity: 'medium'
  },

  // ============ RARE TIER ============
  'Era Enthusiast': {
    icon: '🌟',
    flavorText: 'Embracing Every Chapter',
    colors: ['#06b6d4', '#0891b2'],
    bgPattern: 'constellation',
    animation: 'star-twinkle',
    particleCount: 10,
    particleType: 'star',
    intensity: 'medium'
  },
  'Silver Archivist': {
    icon: '🥈',
    flavorText: 'Silver Collection Excellence',
    colors: ['#475569', '#71717A', '#A1A1AA', '#D4D4D8'], // Art deco library with silver metallic shelves
    bgPattern: 'art-deco',
    animation: 'chrome-reflection',
    particleCount: 12,
    particleType: 'crystal',
    intensity: 'high'
  },
  'Golden Keeper': {
    icon: '🥇',
    flavorText: 'Guardian of Golden Treasures',
    colors: ['#78350F', '#92400E', '#B45309', '#D97706'], // Golden temple doors with King Midas touch
    bgPattern: 'temple-doors',
    animation: 'midas-touch',
    particleCount: 15,
    particleType: 'gold-leaf',
    intensity: 'high'
  },
  'Enlightened One': {
    icon: '☀️',
    flavorText: 'Achieving Digital Enlightenment',
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#DBEAFE'], // Meditation with lotus and chakra energy
    bgPattern: 'lotus-mandala',
    animation: 'chakra-spiral',
    particleCount: 14,
    particleType: 'lotus',
    intensity: 'high'
  },
  'Far Planner': {
    icon: '🔭',
    flavorText: 'Gazing Into the Future',
    colors: ['#0F172A', '#1E293B', '#334155'], // Telescope viewing distant planets
    bgPattern: 'cosmic-vista',
    animation: 'planet-orbit',
    particleCount: 12,
    particleType: 'planet',
    intensity: 'high'
  },
  'Annual Voyager': {
    icon: '🧭',
    flavorText: 'Completing the Full Orbit',
    colors: ['#020617', '#0F172A', '#1E293B'], // Earth completing orbit around sun
    bgPattern: 'orbital-path',
    animation: 'earth-rotation',
    particleCount: 16,
    particleType: 'travel-streak',
    intensity: 'high'
  },
  'Archive Mogul': {
    icon: '💼',
    flavorText: 'Commanding the Data Empire',
    colors: ['#1E1B4B', '#312E81', '#4C1D95', '#6B21A8'], // Data center with purple server racks
    bgPattern: 'server-grid',
    animation: 'data-flow',
    particleCount: 18,
    particleType: 'binary',
    intensity: 'high'
  },
  'Lucky Archivist': {
    icon: '🍀',
    flavorText: 'Finding Fortune in 177',
    colors: ['#14532D', '#166534', '#16A34A', '#22C55E'], // Four-leaf clover field with neon 177
    bgPattern: 'clover-field',
    animation: 'shamrock-rain',
    particleCount: 20,
    particleType: 'clover',
    intensity: 'high'
  },
  'Memory Novelist': {
    icon: '📕',
    flavorText: 'Writing Stories That Last',
    colors: ['#3E1F0B', '#5C2E0F', '#7C3810', '#A0522D'], // Leather-bound book with flying pages
    bgPattern: 'book-pages',
    animation: 'page-turn',
    particleCount: 14,
    particleType: 'ink-drop',
    intensity: 'high'
  },
  'Film Director': {
    icon: '🎬',
    flavorText: 'Crafting Cinematic Masterpieces',
    colors: ['#1C1917', '#292524', '#44403C'], // Director's viewfinder with film slate
    bgPattern: 'viewfinder-frame',
    animation: 'slate-clap',
    particleCount: 10,
    particleType: 'megaphone-wave',
    intensity: 'high'
  },
  'Memory Sharer': {
    icon: '🎁',
    flavorText: 'Connecting Memories Worldwide',
    colors: ['#0C4A6E', '#075985', '#0369A1', '#0284C7'], // Globe with connection lines
    bgPattern: 'network-globe',
    animation: 'node-pulse',
    particleCount: 16,
    particleType: 'data-packet',
    intensity: 'high'
  },
  'Golden Mathematician': {
    icon: '📐',
    flavorText: 'Master of Sacred Geometry',
    colors: ['#78350F', '#92400E', '#B45309', '#D97706'], // Golden ratio spiral with equations
    bgPattern: 'fibonacci-spiral',
    animation: 'phi-glow',
    particleCount: 15,
    particleType: 'equation',
    intensity: 'high'
  },
  'Format Master': {
    icon: '🎯',
    flavorText: 'Unifying All Elements',
    colors: ['#DC2626', '#0891B2', '#E0F2FE', '#78350F'], // Four elemental quadrants
    bgPattern: 'elemental-unity',
    animation: 'element-merge',
    particleCount: 18,
    particleType: 'elemental',
    intensity: 'high'
  },
  'Renaissance Keeper': {
    icon: '👑',
    flavorText: 'Curator of Cultural Masterpieces',
    colors: ['#4C1D95', '#5B21B6', '#7C3AED', '#A855F7'], // Renaissance art gallery
    bgPattern: 'marble-gallery',
    animation: 'art-float',
    particleCount: 16,
    particleType: 'art-particle',
    intensity: 'high'
  },
  'Digital Era Master': {
    icon: '💻',
    flavorText: 'Master of the Digital Matrix',
    colors: ['#1E3A8A', '#1E40AF', '#2563EB', '#3B82F6'], // Digital matrix grid
    bgPattern: 'circuit-board',
    animation: 'binary-rain',
    particleCount: 20,
    particleType: 'data-stream',
    intensity: 'high'
  },
  'Library Keeper': {
    icon: '📚',
    flavorText: 'Guardian of Ancient Knowledge',
    colors: ['#78350F', '#92400E', '#B45309', '#D97706'], // Grand library
    bgPattern: 'library-shelves',
    animation: 'book-float',
    particleCount: 18,
    particleType: 'dust-mote',
    intensity: 'high'
  },
  'Social Memory Keeper': {
    icon: '👥',
    flavorText: 'Connecting Hearts and Minds',
    colors: ['#DB2777', '#EC4899', '#F472B6', '#FBCFE8'], // Social network web
    bgPattern: 'social-network',
    animation: 'network-pulse',
    particleCount: 15,
    particleType: 'heart-reaction',
    intensity: 'high'
  },
  'Dedicated Keeper': {
    icon: '❤️',
    flavorText: 'Heartbeat of Devotion',
    colors: ['#991B1B', '#DC2626', '#EF4444', '#FCA5A5'], // Dedication calendar
    bgPattern: 'calendar-pages',
    animation: 'heartbeat',
    particleCount: 14,
    particleType: 'day-counter',
    intensity: 'high'
  },
  'Vault Guardian': {
    icon: '🔒',
    flavorText: 'Keeper of Secured Memories',
    colors: ['#1E3A8A', '#1E40AF', '#2563EB', '#60A5FA'], // Vault security
    bgPattern: 'vault-door',
    animation: 'security-scan',
    particleCount: 12,
    particleType: 'shield-particle',
    intensity: 'high'
  },
  'Echo Master': {
    icon: '📡',
    flavorText: 'Master of Resonance Waves',
    colors: ['#0E7490', '#0891B2', '#06B6D4', '#67E8F9'], // Echo waves
    bgPattern: 'sonar-waves',
    animation: 'ripple-expand',
    particleCount: 18,
    particleType: 'wave-ring',
    intensity: 'high'
  },
  'Grand Broadcaster': {
    icon: '📢',
    flavorText: 'Transmitter to the Masses',
    colors: ['#5B21B6', '#6D28D9', '#7C3AED', '#A78BFA'], // Broadcasting signals
    bgPattern: 'radio-tower',
    animation: 'signal-broadcast',
    particleCount: 20,
    particleType: 'radio-wave',
    intensity: 'high'
  },
  'Story Curator': {
    icon: '🎭',
    flavorText: 'Crafting Narratives with Care',
    colors: ['#991b1b', '#b45309'],
    bgPattern: 'theater-stage',
    animation: 'curtain-sway',
    particleCount: 8,
    particleType: 'theater-mask',
    intensity: 'medium'
  },
  'Chronicler': {
    icon: '📖',
    flavorText: 'Recording History Daily',
    colors: ['#34D399', '#059669'],
    bgPattern: 'book-pages',
    animation: 'page-turn',
    particleCount: 8,
    particleType: 'bookmark',
    intensity: 'medium'
  },

  // ============ EPIC TIER ============
  'Nostalgia Weaver': {
    icon: '🧵',
    flavorText: 'Stitching Memories Together',
    colors: ['#d97706', '#92400e'],
    bgPattern: 'tapestry',
    animation: 'thread-weave',
    particleCount: 15,
    particleType: 'thread',
    intensity: 'high'
  },
  'Legacy Forger': {
    icon: '⚡',
    flavorText: 'Hammering Out Eternal Marks',
    colors: ['#ea580c', '#dc2626'],
    bgPattern: 'forge-metal',
    animation: 'anvil-strike',
    particleCount: 18,
    particleType: 'spark',
    intensity: 'high'
  },
  'Audio Alchemist': {
    icon: '🎵',
    flavorText: 'Transforming Sound into Magic',
    colors: ['#F472B6', '#E11D48'],
    bgPattern: 'sound-waves',
    animation: 'wave-pulse',
    particleCount: 16,
    particleType: 'note',
    intensity: 'high'
  },
  'Echo Magnet': {
    icon: '💬',
    flavorText: 'Drawing Voices from the Void',
    colors: ['#8B5CF6', '#6366F1'],
    bgPattern: 'echo-rings',
    animation: 'ripple-out',
    particleCount: 14,
    particleType: 'comment',
    intensity: 'high'
  },
  
  // NEW EPIC HORIZONS (Phase 1)
  'Genesis Eternal': {
    icon: '🌌',
    flavorText: 'Witnessing the Birth of Universes',
    colors: ['#0f0f23', '#1a0a2e', '#4169e1', '#8b5cf6'],
    bgPattern: 'cosmic-void',
    animation: 'big-bang-cycle',
    particleCount: 200,
    particleType: 'star',
    intensity: 'supreme'
  },
  'Prismatic Dusk': {
    icon: '🌈',
    flavorText: 'Refracting All Colors of Memory',
    colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
    bgPattern: 'prism-refraction',
    animation: 'color-cycle',
    particleCount: 180,
    particleType: 'rainbow',
    intensity: 'supreme'
  },
  'Dawn Eternal': {
    icon: '🌄',
    flavorText: 'Guardian of the Golden Hour',
    colors: ['#fbbf24', '#f59e0b', '#fb923c', '#fcd34d'],
    bgPattern: 'sunrise-rays',
    animation: 'sun-rise',
    particleCount: 160,
    particleType: 'light-ray',
    intensity: 'supreme'
  },
  'Creative Nexus': {
    icon: '🎬',
    flavorText: 'Where All Media Converges',
    colors: ['#06b6d4', '#ec4899', '#fbbf24'],
    bgPattern: 'media-grid',
    animation: 'convergence',
    particleCount: 170,
    particleType: 'media-icon',
    intensity: 'supreme'
  },
  'Legacy Architect': {
    icon: '🏛️',
    flavorText: 'Building Eternal Monuments of Memory',
    colors: ['#FFD700', '#FF8C00'], // Gold to dark orange
    bgPattern: 'architectural-blueprint',
    animation: 'monument-materialize',
    particleCount: 190,
    particleType: 'construction',
    intensity: 'supreme'
  },

  // ============ LEGENDARY TIER ============
  'Memory Architect': {
    icon: '🏛️',
    flavorText: 'Building Legacies for Eternity',
    colors: ['#f59e0b', '#fef3c7'],
    bgPattern: 'blueprint-grid',
    animation: 'blueprint-scan',
    particleCount: 25,
    particleType: 'blueprint',
    intensity: 'supreme'
  },
  'Chronicle Keeper': {
    icon: '📜',
    flavorText: "Guardian of Time's Stories",
    colors: ['#92400e', '#451a03'],
    bgPattern: 'ancient-scroll',
    animation: 'scroll-unfurl',
    particleCount: 22,
    particleType: 'ink-drop',
    intensity: 'supreme'
  },
  'Temporal Sovereign': {
    icon: '👑',
    flavorText: 'Master of All Moments',
    colors: ['#7c3aed', '#fbbf24'],
    bgPattern: 'royal-velvet',
    animation: 'crown-sparkle',
    particleCount: 28,
    particleType: 'crown-jewel',
    intensity: 'supreme'
  },
  'Grand Historian': {
    icon: '📚',
    flavorText: 'Chronicling Centuries',
    colors: ['#FBBF24', '#D97706'],
    bgPattern: 'library-shelves',
    animation: 'book-glow',
    particleCount: 24,
    particleType: 'ancient-tome',
    intensity: 'supreme'
  },
  'Legend': {
    icon: '⭐',
    flavorText: 'Transcending Time Itself',
    colors: ['#F59E0B', '#DC2626'],
    bgPattern: 'cosmic-stars',
    animation: 'supernova',
    particleCount: 30,
    particleType: 'star-burst',
    intensity: 'supreme'
  },
  'Time Lord': {
    icon: '⌛',
    flavorText: 'Bending Eras to Your Will',
    colors: ['#8B5CF6', '#6D28D9'],
    bgPattern: 'time-vortex',
    animation: 'vortex-spin',
    particleCount: 26,
    particleType: 'time-fragment',
    intensity: 'supreme'
  },
  'Master Archivist': {
    icon: '🗃️',
    flavorText: 'Perfecting Preservation',
    colors: ['#818CF8', '#4F46E5'],
    bgPattern: 'archive-files',
    animation: 'file-organize',
    particleCount: 20,
    particleType: 'document',
    intensity: 'high'
  },
  'Keeper of Eras': {
    icon: '🗝️',
    flavorText: 'Guardian of the Vault',
    colors: ['#c026d3', '#e879f9'], // Fuchsia/Purple
    bgPattern: 'crystal-vault',
    animation: 'prism-refract',
    particleCount: 22,
    particleType: 'crystal',
    intensity: 'high'
  },
  
  // Additional Titles
  'Futurist': {
    icon: '🔮',
    flavorText: 'Glimpsing Tomorrow Today',
    colors: ['#22D3EE', '#0284C7'],
    bgPattern: 'time-vortex',
    animation: 'vortex-spin',
    particleCount: 12,
    particleType: 'time-fragment',
    intensity: 'medium'
  },
  'Dream Weaver': {
    icon: '💭',
    flavorText: 'Crafting Visions of the Night',
    colors: ['#C7D2FE', '#A5B4FC'],
    bgPattern: 'constellation',
    animation: 'gentle-pulse',
    particleCount: 10,
    particleType: 'star',
    intensity: 'medium'
  },
  'Sticker Master': {
    icon: '🎨',
    flavorText: 'Embellishing Every Moment',
    colors: ['#FB923C', '#DC2626'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 12,
    particleType: 'sparkle',
    intensity: 'medium'
  },
  'Chrononaut': {
    icon: '🚀',
    flavorText: 'Exploring the Temporal Expanse',
    colors: ['#C084FC', '#EC4899'],
    bgPattern: 'cosmic-stars',
    animation: 'vortex-spin',
    particleCount: 18,
    particleType: 'star-burst',
    intensity: 'high'
  },
  'Veteran': {
    icon: '🏅',
    flavorText: 'A Year of Dedication',
    colors: ['#FCD34D', '#F59E0B'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 15,
    particleType: 'sparkle',
    intensity: 'high'
  },
  'Midnight Chronicler': {
    icon: '🌙',
    flavorText: 'Writing Under Moonlight',
    colors: ['#6366F1', '#312E81'],
    bgPattern: 'constellation',
    animation: 'star-twinkle',
    particleCount: 14,
    particleType: 'star',
    intensity: 'high'
  },
  'Legacy Guardian': {
    icon: '🛡️',
    flavorText: 'Protecting What Matters',
    colors: ['#D8B4FE', '#A855F7'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 16,
    particleType: 'sparkle',
    intensity: 'high'
  },
  'Cinematographer': {
    icon: '🎬',
    flavorText: 'Capturing Motion and Emotion',
    colors: ['#4C1D95', '#6B21A8'],
    bgPattern: 'subtle-gradient',
    animation: 'camera-flash',
    particleCount: 14,
    particleType: 'camera',
    intensity: 'high'
  },
  'Social Connector': {
    icon: '🤝',
    flavorText: 'Building Bridges Between Hearts',
    colors: ['#10B981', '#047857'],
    bgPattern: 'echo-rings',
    animation: 'ripple-out',
    particleCount: 12,
    particleType: 'comment',
    intensity: 'medium'
  },
  'Archive Master': {
    icon: '📦',
    flavorText: 'Ruler of 750 Capsule Orbs',
    colors: ['#1E1B4B', '#312E81', '#3730A3', '#4338CA', '#6366F1', '#818CF8'], // Throne room
    bgPattern: 'throne-chamber',
    animation: 'orb-constellation',
    particleCount: 50,
    particleType: 'capsule-orb',
    intensity: 'supreme'
  },
  'Perfect Chronicler': {
    icon: '✍️',
    flavorText: 'Flawless Daily Documentation',
    colors: ['#F43F5E', '#BE123C'],
    bgPattern: 'book-pages',
    animation: 'page-turn',
    particleCount: 20,
    particleType: 'bookmark',
    intensity: 'high'
  },
  'Media Master': {
    icon: '🎞️',
    flavorText: 'Mastering All Forms',
    colors: ['#0EA5E9', '#06B6D4'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 10,
    particleType: 'camera',
    intensity: 'medium'
  },
  'Chronicle Weaver': {
    icon: '📝',
    flavorText: 'Writing Epic Tales',
    colors: ['#6366F1', '#4F46E5'],
    bgPattern: 'book-pages',
    animation: 'page-turn',
    particleCount: 12,
    particleType: 'bookmark',
    intensity: 'medium'
  },
  'Sonic Archivist': {
    icon: '🎧',
    flavorText: 'Preserving Every Sound',
    colors: ['#EC4899', '#DB2777'],
    bgPattern: 'sound-waves',
    animation: 'wave-pulse',
    particleCount: 14,
    particleType: 'note',
    intensity: 'medium'
  },
  'Parallel Keeper': {
    icon: '⏱️',
    flavorText: 'Synchronizing Timelines',
    colors: ['#A78BFA', '#7C3AED'],
    bgPattern: 'time-vortex',
    animation: 'vortex-spin',
    particleCount: 12,
    particleType: 'time-fragment',
    intensity: 'medium'
  },
  'Circle Builder': {
    icon: '💫',
    flavorText: 'Connecting Many Hearts',
    colors: ['#FB7185', '#E11D48'],
    bgPattern: 'echo-rings',
    animation: 'ripple-out',
    particleCount: 14,
    particleType: 'comment',
    intensity: 'medium'
  },
  'Moment Harvester': {
    icon: '🌾',
    flavorText: "Gathering the Day's Bounty",
    colors: ['#FBBF24', '#D97706'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 16,
    particleType: 'sparkle',
    intensity: 'high'
  },
  'Eternal Witness': {
    icon: '👁️',
    flavorText: 'Observing Every Hour',
    colors: ['#14B8A6', '#0D9488'],
    bgPattern: 'constellation',
    animation: 'star-twinkle',
    particleCount: 18,
    particleType: 'star',
    intensity: 'high'
  },
  'Sevenfold Sage': {
    icon: '🔯',
    flavorText: 'Mastering Sacred Wisdom',
    colors: ['#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6'], // Seven crystal spheres
    bgPattern: 'crystal-wisdom',
    animation: 'sphere-orbit',
    particleCount: 24,
    particleType: 'wisdom-ray',
    intensity: 'supreme'
  },
  'Century Streaker': {
    icon: '🏃',
    flavorText: 'Blazing Through 100 Days',
    colors: ['#7C2D12', '#9A3412', '#C2410C', '#EA580C', '#FB923C', '#FED7AA'], // Fire trail
    bgPattern: 'fire-streak',
    animation: 'comet-trail',
    particleCount: 30,
    particleType: 'flame-spark',
    intensity: 'supreme'
  },
  'Master Curator': {
    icon: '🖼️',
    flavorText: 'Guardian of 1000 Masterpieces',
    colors: ['#1C1917', '#292524', '#44403C', '#78716C', '#D97706', '#FBB03B'], // Museum gallery
    bgPattern: 'art-gallery',
    animation: 'spotlight-sweep',
    particleCount: 24,
    particleType: 'gallery-light',
    intensity: 'supreme'
  },
  'Epic Novelist': {
    icon: '📚',
    flavorText: 'Weaving 5000 Words',
    colors: ['#312E81', '#3730A3', '#4338CA', '#6366F1', '#A5B4FC'], // Book skyscraper
    bgPattern: 'word-waterfall',
    animation: 'text-cascade',
    particleCount: 40,
    particleType: 'word-particle',
    intensity: 'supreme'
  },
  'Network Builder': {
    icon: '🌐',
    flavorText: 'Connecting 25 Nodes',
    colors: ['#065F46', '#047857', '#059669', '#10B981', '#6EE7B7'], // Neural network
    bgPattern: 'neural-web',
    animation: 'data-pulse',
    particleCount: 25,
    particleType: 'network-node',
    intensity: 'supreme'
  },
  'Community Beacon': {
    icon: '💖',
    flavorText: 'Guiding 10 Hearts Home',
    colors: ['#BE123C', '#E11D48', '#F43F5E', '#FB7185', '#FECDD3'], // Lighthouse beam
    bgPattern: 'lighthouse-glow',
    animation: 'beacon-sweep',
    particleCount: 20,
    particleType: 'heart-beam',
    intensity: 'supreme'
  },
  'Harmony Architect': {
    icon: '🎼',
    flavorText: 'Composing Perfect Balance',
    colors: ['#A78BFA', '#8B5CF6'],
    bgPattern: 'sound-waves',
    animation: 'wave-pulse',
    particleCount: 20,
    particleType: 'note',
    intensity: 'supreme'
  },

  // New Titles
  'Time Sculptor': {
    icon: '🗿',
    flavorText: 'Carving Memories in Stone',
    colors: ['#14B8A6', '#0D9488'], // Teal/aqua
    bgPattern: 'stone-chisel',
    animation: 'marble-texture',
    particleCount: 9,
    particleType: 'stone-chip',
    intensity: 'medium'
  },
  'Memory Broadcaster': {
    icon: '📢',
    flavorText: 'Transmitting Across Time',
    colors: ['#1E3A8A', '#3B82F6', '#60A5FA'], // Radio tower with broadcast waves
    bgPattern: 'signal-waves',
    animation: 'broadcast-pulse',
    particleCount: 12,
    particleType: 'signal-wave',
    intensity: 'medium'
  },
  'Ritual Keeper': {
    icon: '🕯️',
    flavorText: 'Sacred Flames of Tradition',
    colors: ['#34D399', '#059669'], // Emerald green
    bgPattern: 'candle-flicker',
    animation: 'flame-dance',
    particleCount: 11,
    particleType: 'flame-ember',
    intensity: 'medium'
  },
  'Vault Starter': {
    icon: '📦',
    flavorText: 'Opening New Chapters',
    colors: ['#60A5FA', '#2563EB'], // Sky blue
    bgPattern: 'vault-doors',
    animation: 'door-unlock',
    particleCount: 9,
    particleType: 'key-sparkle',
    intensity: 'medium'
  },
  'Multimedia Virtuoso': {
    icon: '��',
    flavorText: 'Master of All Mediums',
    colors: ['#06B6D4', '#0891B2'], // Cyan-teal gradient
    bgPattern: 'media-mosaic',
    animation: 'stage-spotlight',
    particleCount: 14,
    particleType: 'media-icon',
    intensity: 'medium'
  },
  'Word Painter': {
    icon: '🖌️',
    flavorText: 'Brushing Stories to Life',
    colors: ['#818CF8', '#6366F1'], // Violet-indigo
    bgPattern: 'ink-calligraphy',
    animation: 'brush-stroke',
    particleCount: 10,
    particleType: 'ink-splatter',
    intensity: 'medium'
  },
  'Frequency Keeper': {
    icon: '📻',
    flavorText: 'Tuned to the Past',
    colors: ['#F472B6', '#EC4899'], // Pink-magenta
    bgPattern: 'radio-waves',
    animation: 'frequency-scan',
    particleCount: 12,
    particleType: 'sound-wave',
    intensity: 'medium'
  },
  'Quantum Scheduler': {
    icon: '⚛️',
    flavorText: 'Bending Time Itself',
    colors: ['#A78BFA', '#7C3AED'], // Purple-violet
    bgPattern: 'quantum-field',
    animation: 'particle-spin',
    particleCount: 15,
    particleType: 'quantum-particle',
    intensity: 'medium'
  },
  'Community Weaver': {
    icon: '🤝',
    flavorText: 'Connecting Hearts Together',
    colors: ['#FB7185', '#E11D48'], // Warm rose-pink
    bgPattern: 'web-network',
    animation: 'connection-pulse',
    particleCount: 13,
    particleType: 'connection-node',
    intensity: 'medium'
  },
  'Echo Artisan': {
    icon: '🌄',
    flavorText: 'Rippling Through Time',
    colors: ['#7C2D12', '#F59E0B', '#FCD34D', '#FEF3C7'], // Dawn sunrise with rooster on fence and morning dew
    bgPattern: 'water-ripple',
    animation: 'wave-echo',
    particleCount: 14,
    particleType: 'water-droplet',
    intensity: 'medium'
  },
  'Chrono Apprentice': {
    icon: '⏳',
    flavorText: 'Learning the Ways of Time',
    colors: ['#CD7F32', '#8B4513'], // Bronze/copper
    bgPattern: 'hourglass-flow',
    animation: 'sand-cascade',
    particleCount: 14,
    particleType: 'sand-grain',
    intensity: 'medium'
  },
  'Era Initiate': {
    icon: '🌱',
    flavorText: 'Beginning Your Journey',
    colors: ['#10B981', '#34D399', '#6EE7B7'], // Fresh start with new beginning energy
    bgPattern: 'growth-pattern',
    animation: 'sprout-grow',
    particleCount: 8,
    particleType: 'leaf',
    intensity: 'medium'
  },
  'Bronze Chronicler': {
    icon: '🥉',
    flavorText: 'Building Your Archive',
    colors: ['#92400E', '#B45309', '#D97706'], // Bronze medal achievement with metallic sheen
    bgPattern: 'metal-texture',
    animation: 'bronze-shine',
    particleCount: 10,
    particleType: 'metal-flake',
    intensity: 'medium'
  },
  'Silver Archivist': {
    icon: '🥈',
    flavorText: 'Mastering Preservation',
    colors: ['#C0C0C0', '#A8A8A8'],
    bgPattern: 'silver-luster',
    animation: 'metal-gleam',
    particleCount: 12,
    particleType: 'silver-spark',
    intensity: 'medium'
  },
  'Golden Keeper': {
    icon: '🥇',
    flavorText: 'Guardian of Golden Memories',
    colors: ['#FFD700', '#DAA520'],
    bgPattern: 'gold-radiance',
    animation: 'gold-shimmer',
    particleCount: 14,
    particleType: 'gold-fleck',
    intensity: 'medium'
  },
  'Enlightened One': {
    icon: '☀️',
    flavorText: 'Illuminated by Wisdom',
    colors: ['#FBBF24', '#F59E0B'],
    bgPattern: 'radiant-light',
    animation: 'enlightenment-glow',
    particleCount: 16,
    particleType: 'light-beam',
    intensity: 'high'
  },
  'Streak Master': {
    icon: '🔥',
    flavorText: 'Unstoppable Momentum',
    colors: ['#7C2D12', '#EA580C', '#F97316'], // Blazing meteor trail with 7-day fire calendar
    bgPattern: 'flame-pattern',
    animation: 'fire-burst',
    particleCount: 12,
    particleType: 'flame',
    intensity: 'medium'
  },
  'Detail Devotee': {
    icon: '🔍',
    flavorText: 'Perfection in Every Detail',
    colors: ['#6D28D9', '#8B5CF6', '#A78BFA'], // Magnifying glass over document with red pen edits
    bgPattern: 'magnify-grid',
    animation: 'zoom-focus',
    particleCount: 10,
    particleType: 'detail-dot',
    intensity: 'medium'
  },
  'Speed Archivist': {
    icon: '⚡',
    flavorText: 'Racing Against Time',
    colors: ['#CA8A04', '#FBBF24', '#FCD34D'], // Racing through digital tunnel with speedometer
    bgPattern: 'lightning-bolt',
    animation: 'speed-streak',
    particleCount: 14,
    particleType: 'lightning',
    intensity: 'medium'
  },
  'Time Patient': {
    icon: '⏳',
    flavorText: 'Mastering the Art of Waiting',
    colors: ['#4C1D95', '#7C3AED', '#A78BFA'], // Purple hourglass with upward-flowing sand (time reversal)
    bgPattern: 'clock-face',
    animation: 'slow-tick',
    particleCount: 8,
    particleType: 'clock-hand',
    intensity: 'medium'
  },
  'Far Planner': {
    icon: '🔭',
    flavorText: 'Seeing Into the Distant Future',
    colors: ['#6366F1', '#4F46E5'],
    bgPattern: 'telescope-view',
    animation: 'distant-vision',
    particleCount: 12,
    particleType: 'star-dot',
    intensity: 'medium'
  },
  'Annual Voyager': {
    icon: '🧭',
    flavorText: 'Navigating the Year Ahead',
    colors: ['#10B981', '#059669'],
    bgPattern: 'compass-rose',
    animation: 'compass-spin',
    particleCount: 10,
    particleType: 'direction-arrow',
    intensity: 'medium'
  },
  'Decade Dreamer': {
    icon: '🌠',
    flavorText: 'Dreaming Across Decades',
    colors: ['#A855F7', '#9333EA'],
    bgPattern: 'shooting-star',
    animation: 'comet-trail',
    particleCount: 18,
    particleType: 'comet',
    intensity: 'high'
  },
  'Media Maven': {
    icon: '🎨',
    flavorText: 'Crafting Rich Media Stories',
    colors: ['#7C2D12', '#DC2626', '#F59E0B'], // Hollywood studio with spotlights and red carpet
    bgPattern: 'artistic-palette',
    animation: 'color-splash',
    particleCount: 12,
    particleType: 'paint',
    intensity: 'medium'
  },
  'Archive Mogul': {
    icon: '💼',
    flavorText: 'Building Media Empires',
    colors: ['#475569', '#334155'],
    bgPattern: 'executive-grid',
    animation: 'portfolio-flip',
    particleCount: 14,
    particleType: 'document',
    intensity: 'high'
  },
  'Lucky Archivist': {
    icon: '🍀',
    flavorText: 'Fortune Favors the Persistent',
    colors: ['#22C55E', '#16A34A'],
    bgPattern: 'lucky-clover',
    animation: 'fortune-spin',
    particleCount: 17,
    particleType: 'clover-leaf',
    intensity: 'high'
  },
  'Night Owl': {
    icon: '🦉',
    flavorText: 'Guardian of the Night',
    colors: ['#0F172A', '#1E293B', '#334155'], // Moonlit midnight blue cityscape with wise owl
    bgPattern: 'night-sky',
    animation: 'owl-hoot',
    particleCount: 10,
    particleType: 'moon-glow',
    intensity: 'medium'
  },
  'Birthday Keeper': {
    icon: '🎂',
    flavorText: 'Celebrating Life\'s Milestones',
    colors: ['#DB2777', '#EC4899', '#F472B6'],
    bgPattern: 'birthday-confetti',
    animation: 'cake-sparkle',
    particleCount: 16,
    particleType: 'confetti',
    intensity: 'high'
  },

  "New Year's Keeper": {
    icon: '🎆',
    flavorText: 'First Light of a New Year',
    colors: ['#4338CA', '#7C3AED', '#8B5CF6', '#A78BFA'],
    bgPattern: 'fireworks',
    animation: 'sparkle-burst',
    particleCount: 20,
    particleType: 'confetti',
    intensity: 'high'
  },
  'Word Weaver': {
    icon: '📜',
    flavorText: 'Crafting Tales with Words',
    colors: ['#4338CA', '#6366F1', '#818CF8'], // Typewriter keys creating tapestry of glowing words
    bgPattern: 'parchment',
    animation: 'quill-write',
    particleCount: 10,
    particleType: 'ink',
    intensity: 'medium'
  },
  'Memory Novelist': {
    icon: '📕',
    flavorText: 'Authoring Epic Chronicles',
    colors: ['#B91C1C', '#991B1B'],
    bgPattern: 'leather-bound',
    animation: 'page-flutter',
    particleCount: 14,
    particleType: 'bookmark',
    intensity: 'high'
  },
  'Film Director': {
    icon: '🎬',
    flavorText: 'Directing Your Life Story',
    colors: ['#0284C7', '#0369A1'],
    bgPattern: 'film-strip',
    animation: 'director-cut',
    particleCount: 14,
    particleType: 'film-frame',
    intensity: 'high'
  },
  'Memory Sharer': {
    icon: '🎁',
    flavorText: 'Gift-Giver of Memories',
    colors: ['#E11D48', '#BE123C'],
    bgPattern: 'gift-wrap',
    animation: 'ribbon-bow',
    particleCount: 12,
    particleType: 'ribbon',
    intensity: 'medium'
  },
  'Golden Mathematician': {
    icon: '📐',
    flavorText: 'Perfect Ratio, Perfect Harmony',
    colors: ['#FBBF24', '#D97706'],
    bgPattern: 'fibonacci-spiral',
    animation: 'golden-ratio',
    particleCount: 13,
    particleType: 'geometric',
    intensity: 'high'
  },
  'Format Master': {
    icon: '🎯',
    flavorText: 'Mastering Every Medium',
    colors: ['#06B6D4', '#0891B2'],
    bgPattern: 'target-rings',
    animation: 'bullseye',
    particleCount: 12,
    particleType: 'target-ring',
    intensity: 'medium'
  },
  'Chronicle Master': {
    icon: '📓',
    flavorText: 'Daily Dedication Perfected',
    colors: ['#14B8A6', '#0D9488'],
    bgPattern: 'journal-lines',
    animation: 'daily-flip',
    particleCount: 14,
    particleType: 'page',
    intensity: 'high'
  },
  'Renaissance Keeper': {
    icon: '🎨',
    flavorText: 'Rebirth of Memory',
    colors: ['#F59E0B', '#D97706'],
    bgPattern: 'renaissance-art',
    animation: 'masterpiece-reveal',
    particleCount: 18,
    particleType: 'art-flourish',
    intensity: 'high'
  },
  'Digital Era Master': {
    icon: '💻',
    flavorText: 'Commanding the Information Age',
    colors: ['#3B82F6', '#2563EB'],
    bgPattern: 'digital-matrix',
    animation: 'data-stream',
    particleCount: 20,
    particleType: 'binary',
    intensity: 'high'
  },
  'Modern Archivist': {
    icon: '📱',
    flavorText: 'Guardian of 500 Holograms',
    colors: ['#0C4A6E', '#0369A1', '#0284C7', '#0EA5E9', '#38BDF8'], // Futuristic archive
    bgPattern: 'hologram-grid',
    animation: 'hologram-flicker',
    particleCount: 40,
    particleType: 'hologram-capsule',
    intensity: 'supreme'
  },
  'Annual Keeper': {
    icon: '🗓️',
    flavorText: 'Master of the Full Year',
    colors: ['#1E3A8A', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#FBBF24'], // Seasonal transitions
    bgPattern: 'celestial-calendar',
    animation: 'year-rotation',
    particleCount: 48,
    particleType: 'star-month',
    intensity: 'supreme'
  },
  'Decade Dreamer': {
    icon: '🌠',
    flavorText: 'Visionary of 10-Year Transformation',
    colors: ['#1E1B4B', '#312E81', '#4338CA', '#8B5CF6', '#C084FC', '#E9D5FF', '#F3E8FF'], // Past → Present → Future
    bgPattern: 'time-portal',
    animation: 'decade-morph',
    particleCount: 24,
    particleType: 'portal-swirl',
    intensity: 'supreme'
  },
  'Chronicle Master': {
    icon: '📓',
    flavorText: 'Keeper of 14 Illuminated Pages',
    colors: ['#431407', '#713F12', '#92400E', '#B45309', '#D97706'], // Medieval manuscript
    bgPattern: 'illuminated-manuscript',
    animation: 'gold-leaf-glow',
    particleCount: 34,
    particleType: 'gold-leaf',
    intensity: 'supreme'
  },
  'Time Lord': {
    icon: '⌛',
    flavorText: 'Master of 5 Year Portals',
    colors: ['#1E3A8A', '#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD'], // TARDIS blue
    bgPattern: 'time-vortex',
    animation: 'portal-rings',
    particleCount: 28,
    particleType: 'temporal-particle',
    intensity: 'supreme'
  },
  'Time Traveler': {
    icon: '🚗',
    flavorText: 'Racing Through 3 Decades',
    colors: ['#0F172A', '#1E293B', '#334155', '#475569'], // DeLorean silver
    bgPattern: 'lightning-flux',
    animation: 'time-circuit',
    particleCount: 30,
    particleType: 'lightning-bolt',
    intensity: 'supreme'
  },
  'Library Keeper': {
    icon: '📚',
    flavorText: 'Curator of Vast Collections',
    colors: ['#92400E', '#78350F'],
    bgPattern: 'library-shelf',
    animation: 'book-stack',
    particleCount: 16,
    particleType: 'book',
    intensity: 'high'
  },
  'Social Memory Keeper': {
    icon: '💝',
    flavorText: 'Connecting Through Time',
    colors: ['#EC4899', '#DB2777'],
    bgPattern: 'heart-network',
    animation: 'heart-pulse',
    particleCount: 14,
    particleType: 'heart',
    intensity: 'high'
  },

  // Fallback for unknown titles
  'default': {
    icon: '✨',
    flavorText: 'Preserving Your Story',
    colors: ['#6366f1', '#8b5cf6'],
    bgPattern: 'subtle-gradient',
    animation: 'gentle-pulse',
    particleCount: 8,
    particleType: 'sparkle',
    intensity: 'medium'
  }
};

// Helper function to get title config by name
export function getTitleConfig(titleName: string): TitleConfig {
  return titleConfigs[titleName] || titleConfigs['default'];
}

// Helper function to get title emoji icon
export function getTitleIcon(titleName: string): string {
  const config = getTitleConfig(titleName);
  return config.icon;
}
