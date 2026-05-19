/**
 * Ceremony Registry
 * 
 * Defines available closing ceremony variations for each theme.
 * Each ceremony has unique animations, pacing, and mood.
 */

import React from 'react';

export interface CeremonyConfig {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  mood: string;
  previewUrl: string; // Path to preview animation
}

export const CEREMONY_REGISTRY: Record<string, CeremonyConfig[]> = {
  birthday: [
    {
      id: 'classic',
      name: 'Make a Wish',
      description: 'Blow out the birthday candles',
      duration: 14,
      mood: 'Classic & Joyful',
      previewUrl: '/ceremony-previews/birthday-classic.mp4'
    },
    {
      id: 'party',
      name: 'Balloon Celebration',
      description: 'Colorful balloons popping with joy',
      duration: 13,
      mood: 'Fun & Festive',
      previewUrl: '/ceremony-previews/birthday-party.mp4'
    },
    {
      id: 'fireworks',
      name: 'Aurora Cascade',
      description: 'Rainbow light waves',
      duration: 18,
      mood: 'Dynamic & Vibrant',
      previewUrl: '/ceremony-previews/birthday-fireworks.mp4'
    }
  ],
  anniversary: [
    {
      id: 'classic',
      name: 'Unity Candle',
      description: 'Two flames become one',
      duration: 14,
      mood: 'Intimate & Meaningful',
      previewUrl: '/ceremony-previews/eternal-flame-classic.mp4'
    },
    {
      id: 'passionate',
      name: 'Binary Hearts Supernova',
      description: 'Two hearts collide like stars',
      duration: 20,
      mood: 'Cosmic Passion & Explosive Love',
      previewUrl: '/ceremony-previews/eternal-flame-passionate.mp4'
    },
    {
      id: 'forge',
      name: 'The Forge',
      description: 'Hammered together, unbreakable',
      duration: 18,
      mood: 'Primal & Epic',
      previewUrl: '/ceremony-previews/eternal-flame-forge.mp4'
    }
  ],
  future: [
    {
      id: 'passage',
      name: "Time's Passage",
      description: 'Elegant clock & time streams',
      duration: 18,
      mood: 'Contemplative & Beautiful',
      previewUrl: '/ceremony-previews/timetraveler-passage.mp4'
    },
    {
      id: 'portal',
      name: 'Digital Archive',
      description: 'Cyberpunk memory upload',
      duration: 18,
      mood: 'Futuristic & Tech',
      previewUrl: '/ceremony-previews/timetraveler-portal.mp4'
    },
    {
      id: 'singularity',
      name: 'Stargate Portal',
      description: 'Epic chevron activation',
      duration: 21,
      mood: 'Epic & Cosmic',
      previewUrl: '/ceremony-previews/timetraveler-singularity.mp4'
    }
  ],
  new_life: [
    {
      id: 'worldtree',
      name: 'Sunrise Symphony',
      description: 'Together, watching your world begin',
      duration: 22,
      mood: 'Cinematic & Radiant',
      visualStyle: '300+ stars fade as cosmic sunrise erupts over realistic mountain peaks, silhouetted couple watches together, 15 volumetric god rays, birds materialize in V-formation, trees and wildflowers bloom where light touches, 800+ golden particles',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#fb923c',
        icon: '🌅'
      }
    },
    {
      id: 'lotus',
      name: 'Special Delivery',
      description: 'Worth every storm, every mile',
      duration: 22,
      mood: 'Epic & Devoted',
      visualStyle: 'Custom SVG flying stork battles storm with swaddled baby, breaks through clouds, vibrant full-width rainbow forms gradually, lands at cottage, drops baby on doorstep, flies away off-screen',
      preview: {
        primaryColor: '#fb923c',
        secondaryColor: '#a78bfa',
        icon: '👶'
      }
    },
    {
      id: 'genesis',
      name: 'Genesis - Birth of a World',
      description: 'Your world begins today',
      duration: 20,
      mood: 'Epic & Primordial',
      visualStyle: 'Big Bang ignition, molten planet forms, meteor bombardment, oceans fill with torrential rain, first life sparks, Earth-like continents green with biodiversity explosion, view from space',
      preview: {
        primaryColor: '#3b82f6',
        secondaryColor: '#10b981',
        icon: '🌍'
      }
    }
  ],
  pet: [
    {
      id: 'first-paws',
      name: 'First Paws Home',
      themeId: 'pet',
      duration: 15,
      description: 'Celebrating the day they became family',
      mood: 'Joyful & Heartwarming',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#10b981',
        icon: '🏡'
      }
    },
    {
      id: 'starlit',
      name: 'Starlit Companions',
      themeId: 'pet',
      duration: 16,
      description: 'Forever watching from the stars above',
      mood: 'Peaceful & Celestial',
      preview: {
        primaryColor: '#60a5fa',
        secondaryColor: '#fbbf24',
        icon: '⭐'
      }
    },
    {
      id: 'rainbow',
      name: 'Rainbow Bridge',
      themeId: 'pet',
      duration: 14,
      description: 'Journey across the legendary Rainbow Bridge',
      mood: 'Legendary & Beautiful',
      preview: {
        primaryColor: '#ef4444',
        secondaryColor: '#a855f7',
        icon: '🌈'
      }
    }
  ],
  gratitude: [
    {
      id: 'lantern',
      name: 'Lantern of Thanks',
      icon: '🏮',
      themeId: 'gratitude',
      duration: 15,
      description: 'Intimate personal gratitude with floating lanterns',
      mood: 'Heartfelt & Tender'
    },
    {
      id: 'garden',
      name: 'Garden of Gratitude',
      icon: '🌸',
      themeId: 'gratitude',
      duration: 15,
      description: 'Abundant celebration for community and groups',
      mood: 'Vibrant & Joyful'
    },
    {
      id: 'infinite',
      name: 'Infinite Gratitude',
      icon: '✨',
      themeId: 'gratitude',
      duration: 16,
      description: 'Cosmic appreciation for life and existence',
      mood: 'Epic & Transcendent'
    }
  ],
  // Graduation/Launchpad Theme Ceremonies
  graduation: [
    {
      id: 'standard',
      name: 'Metamorphosis',
      description: 'Transformation complete',
      duration: 16,
      mood: 'Inspiring & Graceful',
      visualStyle: 'Organic butterfly emergence with detailed wings and sparkle trails',
      preview: {
        primaryColor: '#ff6b35',
        secondaryColor: '#8bc34a',
        icon: '🦋'
      }
    },
    {
      id: 'premium',
      name: "Storm's Fury",
      description: 'Unleash your power',
      duration: 14,
      mood: 'Powerful & Electric',
      visualStyle: 'Lightning convergence with energy sphere and explosive release',
      preview: {
        primaryColor: '#88ccff',
        secondaryColor: '#aaddff',
        icon: '⚡'
      }
    },
    {
      id: 'epic',
      name: 'To the Stars',
      description: 'Your journey begins',
      duration: 17,
      mood: 'Epic & Aspirational',
      visualStyle: 'Full rocket launch from pad to nebula with realistic physics',
      preview: {
        primaryColor: '#8a2be2',
        secondaryColor: '#6495ed',
        icon: '🚀'
      }
    }
  ],
  // Mixtape Theme Ceremonies
  friendship: [
    {
      id: 'standard',
      name: 'Vinyl Spin',
      description: 'Spinning Forever',
      duration: 15,
      mood: 'Nostalgic & Epic',
      visualStyle: 'Spinning vinyl record with holographic grooves, turntable needle drops, and rainbow vinyl explosion',
      preview: {
        primaryColor: '#ff00ff',
        secondaryColor: '#00ffff',
        icon: '💿'
      }
    },
    {
      id: 'premium',
      name: 'Neon Nights',
      description: 'Forever Electric',
      duration: 15,
      mood: '80s Synthwave',
      visualStyle: '80s neon aesthetic with glowing signs, geometric shapes, and perspective grid',
      preview: {
        primaryColor: '#ff00ff',
        secondaryColor: '#00ffff',
        icon: '🌃'
      }
    },
    {
      id: 'epic',
      name: 'Arcade Insert Coin',
      description: 'Level Complete!',
      duration: 17,
      mood: 'Fun & Epic',
      visualStyle: '8-bit pixel adventure with classic game sprites, golden trophy, and arcade colors',
      preview: {
        primaryColor: '#00ff00',
        secondaryColor: '#ffff00',
        icon: '🕹️'
      }
    }
  ],
  // Voyage Theme Ceremonies
  travel: [
    {
      id: 'standard',
      name: 'Compass Rose Bloom',
      description: 'Your Path is Set',
      duration: 12,
      mood: 'Classic & Elegant',
      visualStyle: 'Ornate compass emerges with cardinal directions illuminating, needle spins and locks north',
      preview: {
        primaryColor: '#d4af37',
        secondaryColor: '#8b7355',
        icon: '🧭'
      }
    },
    {
      id: 'premium',
      name: 'Around the World',
      description: 'Journey Complete',
      duration: 15,
      mood: 'Whimsical & Adventurous',
      visualStyle: 'Airplane flies over Eiffel Tower, pyramids, and mountains before landing home',
      preview: {
        primaryColor: '#0ea5e9',
        secondaryColor: '#10b981',
        icon: '✈️'
      }
    },
    {
      id: 'epic',
      name: 'Aurora Navigation Pathways',
      description: 'Stars Aligned',
      duration: 17,
      mood: 'Epic & Cosmic',
      visualStyle: 'Northern lights flow as ribbons, form navigation grid, constellations connect, cosmic compass aligns',
      preview: {
        primaryColor: '#22d3ee',
        secondaryColor: '#a855f7',
        icon: '🌌'
      }
    }
  ],
  // Career Summit Theme Ceremonies
  career: [
    {
      id: 'gavel',
      name: 'Victory Podium',
      description: 'Champion Crowned',
      duration: 14,
      mood: 'Triumphant & Energetic',
      visualStyle: 'Winner\'s podium rises, crowd erupts, spotlights converge, confetti explosion, golden trophy materializes',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#6366f1',
        icon: '🏆'
      }
    },
    {
      id: 'signature',
      name: 'Hall of Excellence',
      description: 'Among the Legends',
      duration: 16,
      mood: 'Prestigious & Inspiring',
      visualStyle: 'Prestigious hall with portraits of legends, red carpet rolls out, flash photography, YOUR portrait unveiled',
      preview: {
        primaryColor: '#c084fc',
        secondaryColor: '#fbbf24',
        icon: '🖼️'
      }
    },
    {
      id: 'curtaincall',
      name: 'The Curtain Call',
      description: 'Standing Ovation',
      duration: 17,
      mood: 'Theatrical & Epic',
      visualStyle: 'Theater curtain rises, spotlight locks on YOU, roses thrown, audience standing ovation wave, confetti cannons',
      preview: {
        primaryColor: '#dc2626',
        secondaryColor: '#fbbf24',
        icon: '🎭'
      }
    }
  ],
  // New Year's Eve Theme Ceremonies
  new_year: [
    {
      id: 'countdown',
      name: 'Neon Countdown Pulse',
      description: 'Explosive Electronic Energy',
      duration: 14,
      mood: 'Electric & High-Energy',
      visualStyle: 'Massive 3D countdown 10→1 with neon pulses, each number explodes into shockwave, confetti explosion finale',
      preview: {
        primaryColor: '#ec4899',
        secondaryColor: '#8b5cf6',
        icon: '🎉'
      }
    },
    {
      id: 'champagne',
      name: 'Champagne Supernova',
      description: 'Liquid Cosmic Celebration',
      duration: 14,
      mood: 'Elegant & Epic',
      visualStyle: 'Premium champagne bottle, cork EXPLODES with smoke trail, golden fountain erupts, transforms into swirling nebula, bubbles become stars',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#fef3c7',
        icon: '🍾'
      }
    },
    {
      id: 'fireworks',
      name: 'Firework Symphony',
      description: 'Epic Pyrotechnic Finale',
      duration: 23,
      mood: 'Grand & Spectacular',
      visualStyle: 'Choreographed fireworks display with rockets, chrysanthemums, willows, palms, strobes. Grand finale spells "2026" in golden fireworks',
      preview: {
        primaryColor: '#f43f5e',
        secondaryColor: '#8b5cf6',
        icon: '🎆'
      }
    }
  ],
  // New Nest Theme Ceremonies (theme ID: new_home)
  new_home: [
    {
      id: 'lightswitch',
      name: 'First Light Switch',
      description: 'That First Click',
      duration: 13,
      mood: 'Simple & Magical',
      visualStyle: 'Dark empty rooms. Hand reaches for switch. CLICK. Each room explodes with light revealing furniture. Final flip lights entire house exterior glowing',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#fef3c7',
        icon: '💡'
      }
    },
    {
      id: 'snowglobe',
      name: 'Snowglobe Escape',
      description: 'Break Into Freedom',
      duration: 14,
      mood: 'Transformative & Epic',
      visualStyle: 'Trapped in tiny snowglobe. Crack appears. Glass SHATTERS in slow-motion. You and house EXPAND to full size. Snow becomes stars. Free.',
      preview: {
        primaryColor: '#60a5fa',
        secondaryColor: '#fef3c7',
        icon: '🔮'
      }
    },
    {
      id: 'timelapse',
      name: 'Time Lapse Legacy',
      description: 'Where Life Happens',
      duration: 16,
      mood: 'Emotional & Cinematic',
      visualStyle: 'Blueprint → Construction time-lapse → Moving day → First dinner → Holidays → Kids growing → Seasons blur → Years pass → Present day with memories glowing',
      preview: {
        primaryColor: '#ea580c',
        secondaryColor: '#fbbf24',
        icon: '⏰'
      }
    }
  ],
  // Golden Moments Theme Ceremonies (theme ID: wedding)
  wedding: [
    {
      id: 'victory',
      name: 'Photo Finish Victory',
      description: 'The moment you became champion',
      duration: 14,
      mood: 'Triumphant & Explosive',
      visualStyle: 'Athlete crosses finish line, time FREEZES at moment of victory, golden light erupts, trophy materializes, universe EXPLODES in confetti celebration',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#3b82f6',
        icon: '🏆'
      }
    },
    {
      id: 'graduation',
      name: 'Graduation Cap Toss',
      description: 'Your future takes flight',
      duration: 15,
      mood: 'Inspiring & Celestial',
      visualStyle: 'Cap soars skyward in slow-motion, transforms into golden star, multiplies into constellation of knowledge, diploma unfurls, mortarboard confetti rains down',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#8b5cf6',
        icon: '🎓'
      }
    },
    {
      id: 'firstdance',
      name: 'Wedding First Dance',
      description: 'Love transforms everything',
      duration: 16,
      mood: 'Romantic & Magical',
      visualStyle: 'Couple alone in darkness, begin to dance, ballroom materializes around them, chandeliers descend, rose petals fall, ceiling opens to stars, forever begins',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#ec4899',
        icon: '🤵👰'
      }
    }
  ],
  // Fresh Start Theme Ceremonies (theme ID: first_day)
  first_day: [
    {
      id: 'key-kingdom',
      name: 'Blueprint to Reality',
      description: 'Your Vision Comes to Life',
      duration: 15,
      mood: 'Creative & Inspiring',
      visualStyle: 'Hand-drawn sketch on paper, pencil lines animate building, watercolor explosion floods color, paper peels away revealing 3D reality, people enter, aerial city view with glowing building',
      preview: {
        primaryColor: '#fbbf24',
        secondaryColor: '#f59e0b',
        icon: '✏️'
      }
    },
    {
      id: 'digital-avatar',
      name: 'Digital Avatar Boot-Up',
      description: 'First Day Remote Work',
      duration: 15,
      mood: 'Futuristic & Tech',
      visualStyle: 'Home office with coffee, Matrix code rain, avatar pixelation to smooth render, video call grid welcome, dual reality split screen harmony',
      preview: {
        primaryColor: '#00ffff',
        secondaryColor: '#ff00ff',
        icon: '💻'
      }
    },
    {
      id: 'office-tower',
      name: 'Office Tower Ascension',
      description: 'Epic First Day at Work',
      duration: 15,
      mood: 'Cinematic & Triumphant',
      visualStyle: 'Massive office tower, epic elevator ascension with confidence building, golden confetti arrival, team welcome, nameplate materialization, aerial city with glowing window',
      preview: {
        primaryColor: '#3b82f6',
        secondaryColor: '#fbbf24',
        icon: '🏢'
      }
    }
  ]
  // Future themes will be added here:
};

/**
 * Get available ceremonies for a specific theme
 */
export function getCeremoniesForTheme(themeId: string): CeremonyConfig[] {
  return CEREMONY_REGISTRY[themeId] || [];
}

/**
 * Get default ceremony for a theme (first in list)
 */
export function getDefaultCeremony(themeId: string): string | null {
  const ceremonies = getCeremoniesForTheme(themeId);
  return ceremonies.length > 0 ? ceremonies[0].id : null;
}

/**
 * Check if a theme supports ceremony selection
 */
export function supportsCeremonies(themeId: string): boolean {
  return getCeremoniesForTheme(themeId).length > 0;
}

/**
 * Get ceremony config by theme and ceremony ID
 */
export function getCeremonyConfig(themeId: string, ceremonyId: string): CeremonyConfig | null {
  const ceremonies = getCeremoniesForTheme(themeId);
  return ceremonies.find(c => c.id === ceremonyId) || null;
}