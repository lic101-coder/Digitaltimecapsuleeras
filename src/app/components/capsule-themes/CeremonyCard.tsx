/**
 * CeremonyCard Component
 * 
 * Individual ceremony option card with animated preview thumbnail.
 * Shows ceremony details and allows user to select or preview.
 * Completely redesigned for stunning mobile appearance.
 */

import React from 'react';
import { CheckCircle, Play } from 'lucide-react';
import { CeremonyConfig } from './CeremonyRegistry';

interface CeremonyCardProps {
  ceremony: CeremonyConfig;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

export function CeremonyCard({ ceremony, isSelected, onSelect, onPreview }: CeremonyCardProps) {
  // Determine emoji for ceremony
  const getEmoji = () => {
    // Use icon from ceremony config if available (for Gratitude ceremonies)
    if (ceremony.icon) {
      return ceremony.icon;
    }
    
    // Use preview.icon if available (for new format like Launchpad)
    if (ceremony.preview?.icon) {
      return ceremony.preview.icon;
    }
    
    // Birthday ceremonies
    if (ceremony.id === 'classic' && ceremony.name === 'Make a Wish') return '🕯️';
    if (ceremony.id === 'party') return '🎊';
    if (ceremony.id === 'fireworks') return '🎆';
    
    // Eternal Flame (love) ceremonies
    if (ceremony.id === 'classic' && ceremony.name === 'Unity Candle') return '🕯️';
    if (ceremony.id === 'passionate') return '❤️💚'; // Binary hearts supernova - red + green hearts
    if (ceremony.id === 'epic') return '✨';
    
    // Time Traveler ceremonies
    if (ceremony.id === 'passage') return '⏳';
    if (ceremony.id === 'portal') return '💾';
    if (ceremony.id === 'singularity') return '⭐';
    
    // New Life ceremonies
    if (ceremony.id === 'bloom') return '🎵'; // Music box
    if (ceremony.id === 'stardust') return '🪐'; // Planetary alignment
    if (ceremony.id === 'tree') return '🥚'; // Cosmic egg
    
    // New Life (UPDATED 2025) - Using preview.icon from registry
    if (ceremony.id === 'worldtree') return '🌅'; // Sunrise Symphony
    if (ceremony.id === 'lotus') return '👶'; // Special Delivery (renamed from Storm & Calm)
    if (ceremony.id === 'genesis') return '🌍'; // Genesis - Birth of a World
    
    // Pet ceremonies
    if (ceremony.id === 'play') return '🌸';
    if (ceremony.id === 'heartbeat') return '🪟';
    if (ceremony.id === 'rainbow') return '🌈';
    
    return '✨';
  };

  // Get gradient colors based on ceremony type - RICH COLORS FOR ALL STATES
  const getGradient = () => {
    // Birthday - Classic (Make a Wish)
    if (ceremony.id === 'classic' && ceremony.name === 'Make a Wish') {
      return 'from-amber-400 via-orange-500 to-red-500';
    }
    // Birthday - Party
    if (ceremony.id === 'party') {
      return 'from-pink-400 via-purple-500 to-indigo-600';
    }
    // Birthday - Fireworks
    if (ceremony.id === 'fireworks') {
      return 'from-indigo-500 via-purple-600 to-pink-500';
    }
    
    // Eternal Flame - Classic (Unity Candle)
    if (ceremony.id === 'classic' && ceremony.name === 'Unity Candle') {
      return 'from-rose-500 via-amber-500 to-rose-500';
    }
    // Eternal Flame - Passionate (Binary Hearts Supernova)
    if (ceremony.id === 'passionate') {
      return 'from-orange-600 via-red-600 to-amber-500';
    }
    // Eternal Flame - Epic (Firefly Symphony)
    if (ceremony.id === 'epic') {
      return 'from-amber-400 via-yellow-400 to-amber-500';
    }
    
    // Time Traveler - Passage
    if (ceremony.id === 'passage') {
      return 'from-cyan-500 via-blue-500 to-indigo-600';
    }
    // Time Traveler - Portal (Digital Archive - Cyberpunk theme)
    if (ceremony.id === 'portal') {
      return 'from-cyan-400 via-blue-500 to-indigo-600';
    }
    // Time Traveler - Singularity (Stargate Portal - Blue/White cosmic theme)
    if (ceremony.id === 'singularity') {
      return 'from-blue-400 via-cyan-400 to-blue-500';
    }
    
    // New Life - Bloom
    if (ceremony.id === 'bloom') {
      return 'from-pink-300 via-rose-400 to-pink-500';
    }
    // New Life - Stardust
    if (ceremony.id === 'stardust') {
      return 'from-indigo-400 via-purple-500 to-pink-400';
    }
    // New Life - Tree
    if (ceremony.id === 'tree') {
      return 'from-emerald-500 via-teal-400 to-cyan-500';
    }
    
    // New Life (UPDATED 2025) - Using preview.icon from registry
    if (ceremony.id === 'worldtree') {
      return 'from-amber-400 via-orange-500 to-pink-500';
    }
    if (ceremony.id === 'lotus') {
      return 'from-orange-500 via-pink-500 to-purple-500';
    }
    if (ceremony.id === 'genesis') {
      return 'from-blue-500 via-indigo-500 to-green-500';
    }
    
    // Pet - Play (Eternal Garden)
    if (ceremony.id === 'play') {
      return 'from-green-400 via-emerald-500 to-teal-400';
    }
    // Pet - Heartbeat (Living Stained Glass)
    if (ceremony.id === 'heartbeat') {
      return 'from-purple-500 via-blue-600 to-indigo-700';
    }
    // Pet - Rainbow (Rainbow Bridge)
    if (ceremony.id === 'rainbow') {
      return 'from-red-500 via-yellow-400 to-blue-500';
    }
    
    // Gratitude - Lantern
    if (ceremony.id === 'lantern') {
      return 'from-amber-500 via-rose-500 to-pink-500';
    }
    // Gratitude - Garden
    if (ceremony.id === 'garden') {
      return 'from-green-500 via-yellow-400 to-pink-500';
    }
    // Gratitude - Infinite
    if (ceremony.id === 'infinite') {
      return 'from-yellow-400 via-purple-500 to-blue-500';
    }
    
    // Launchpad
    if (ceremony.id === 'standard' && ceremony.name === 'Metamorphosis') {
      return 'from-amber-400 via-orange-500 to-red-500';
    }
    if (ceremony.id === 'premium' && ceremony.name === "Storm's Fury") {
      return 'from-cyan-400 via-blue-500 to-indigo-600';
    }
    if (ceremony.id === 'epic' && ceremony.name === 'To the Stars') {
      return 'from-amber-400 via-yellow-400 to-amber-500';
    }
    
    // Mixtape
    if (ceremony.id === 'standard' && ceremony.name === 'Vinyl Spin') {
      return 'from-purple-500 via-pink-500 to-orange-500';
    }
    if (ceremony.id === 'premium' && ceremony.name === 'Equalizer Pulse') {
      return 'from-cyan-400 via-purple-500 to-pink-500';
    }
    if (ceremony.id === 'epic' && ceremony.name === 'Cosmic Frequency') {
      return 'from-indigo-500 via-purple-600 to-pink-500';
    }
    
    // Voyage
    if (ceremony.id === 'standard' && ceremony.name === 'Compass Rose') {
      return 'from-blue-400 via-cyan-400 to-teal-500';
    }
    if (ceremony.id === 'premium' && ceremony.name === 'Northern Lights') {
      return 'from-green-400 via-cyan-400 to-blue-500';
    }
    if (ceremony.id === 'epic' && ceremony.name === 'Celestial Navigation') {
      return 'from-indigo-400 via-blue-500 to-cyan-400';
    }
    
    // Career Summit
    if (ceremony.id === 'standard' && ceremony.name === 'Rising Graph') {
      return 'from-blue-500 via-indigo-500 to-purple-500';
    }
    if (ceremony.id === 'premium' && ceremony.name === 'Golden Achievement') {
      return 'from-amber-400 via-yellow-400 to-orange-500';
    }
    if (ceremony.id === 'epic' && ceremony.name === 'Summit Ascent') {
      return 'from-slate-300 via-blue-200 to-cyan-300';
    }
    
    // Fresh Start
    if (ceremony.id === 'standard' && ceremony.name === 'Wildfire Rebirth') {
      return 'from-orange-500 via-red-500 to-pink-500';
    }
    if (ceremony.id === 'premium' && ceremony.name === 'Supernova Rebirth') {
      return 'from-purple-500 via-pink-500 to-orange-500';
    }
    if (ceremony.id === 'epic' && ceremony.name === 'Ocean Depths Ascent') {
      return 'from-blue-600 via-cyan-400 to-teal-300';
    }
    
    return 'from-purple-400 via-pink-500 to-rose-500';
  };

  const getRingColor = () => {
    // Birthday
    if (ceremony.id === 'classic' && ceremony.name === 'Make a Wish') return 'ring-orange-400';
    if (ceremony.id === 'party') return 'ring-purple-400';
    if (ceremony.id === 'fireworks') return 'ring-indigo-400';
    
    // Eternal Flame
    if (ceremony.id === 'classic' && ceremony.name === 'Unity Candle') return 'ring-rose-400';
    if (ceremony.id === 'passionate') return 'ring-orange-500';
    if (ceremony.id === 'epic') return 'ring-purple-400';
    
    // Time Traveler
    if (ceremony.id === 'passage') return 'ring-cyan-400';
    if (ceremony.id === 'portal') return 'ring-cyan-400';
    if (ceremony.id === 'singularity') return 'ring-blue-400';
    
    // New Life
    if (ceremony.id === 'bloom') return 'ring-pink-400';
    if (ceremony.id === 'stardust') return 'ring-purple-400';
    if (ceremony.id === 'tree') return 'ring-teal-400';
    
    // New Life (UPDATED 2025) - Using preview.icon from registry
    if (ceremony.id === 'worldtree') return 'ring-orange-400';
    if (ceremony.id === 'lotus') return 'ring-pink-400';
    if (ceremony.id === 'genesis') return 'ring-blue-400';
    
    // Pet
    if (ceremony.id === 'play') return 'ring-amber-400';
    if (ceremony.id === 'heartbeat') return 'ring-rose-400';
    if (ceremony.id === 'rainbow') return 'ring-yellow-400';
    
    // Gratitude
    if (ceremony.id === 'lantern') return 'ring-amber-400';
    if (ceremony.id === 'garden') return 'ring-green-400';
    if (ceremony.id === 'infinite') return 'ring-purple-400';
    
    // Launchpad
    if (ceremony.id === 'standard' && ceremony.name === 'Metamorphosis') return 'ring-orange-400';
    if (ceremony.id === 'premium' && ceremony.name === "Storm's Fury") return 'ring-cyan-400';
    if (ceremony.id === 'epic' && ceremony.name === 'To the Stars') return 'ring-purple-500';
    
    return 'ring-purple-400';
  };

  return (
    <button
      onClick={() => {
        console.log('🎬 [CeremonyCard] User clicked ceremony:', ceremony.id, ceremony.name);
        // ✅ Select the ceremony (move checkmark)
        onSelect();
        // ✅ Show the preview (so user can see what it looks like)
        onPreview();
      }}
      data-ceremony-card
      className={`relative flex flex-col w-full rounded-xl transition-all transform hover:scale-105 ${ 
        isSelected
          ? `ring-2 ${getRingColor()} shadow-xl`
          : 'ring-1 ring-white/20 hover:ring-white/40'
      }`}
      style={{ 
        background: 'transparent',
        overflow: 'visible',
        padding: 0,
        minHeight: '120px',
        height: 'auto'
      }}
    >
      {/* Gradient background - force visible */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getGradient()} rounded-xl`}
        style={{ zIndex: 0, opacity: 1 }}
      />
      
      {/* Content overlay - force all elements visible */}
      <div 
        className="relative flex flex-col items-center justify-center py-4 px-2 md:py-8 md:px-4"
        style={{ 
          zIndex: 10, 
          opacity: 1, 
          visibility: 'visible',
          overflow: 'visible',
          minHeight: '120px',
          gap: '0.75rem'
        }}
      >
        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-1 right-1 md:top-2 md:right-2" style={{ zIndex: 30 }}>
            <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-white drop-shadow-lg" />
          </div>
        )}
        
        {/* Icon - FORCE VISIBLE with text-shadow */}
        <div 
          style={{ 
            position: 'relative',
            zIndex: 20,
            opacity: 1, 
            visibility: 'visible',
            display: 'block',
            overflow: 'visible',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            lineHeight: 1,
            width: 'auto',
            height: 'auto',
            flexShrink: 0
          }}
          className="text-[2rem] md:text-[5rem]"  // Mobile: 32px, DESKTOP: 80px (150% increase)
        >
          {ceremony.id === 'passionate' ? (
            // Unified heart with red-to-green gradient split
            <svg 
              viewBox="0 0 100 100" 
              style={{ 
                width: '1em', 
                height: '1em',
                display: 'inline-block',
                fontSize: 'inherit'
              }}
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <path
                d="M50,90 C50,90 10,60 10,40 C10,25 20,15 30,15 C40,15 50,25 50,25 C50,25 60,15 70,15 C80,15 90,25 90,40 C90,60 50,90 50,90 Z"
                fill="url(#heartGradient)"
                stroke="none"
              />
            </svg>
          ) : (
            getEmoji()
          )}
        </div>
        
        {/* Name - FORCE VISIBLE WITH WRAPPING SUPPORT */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            opacity: 1,
            visibility: 'visible',
            display: 'block',
            overflow: 'visible',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            width: '100%',
            flexShrink: 0,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%'
          }}
          className={`text-[9.5px] leading-[1.4] md:text-2xl md:leading-tight ${isSelected ? 'scale-105' : ''}`}  // Mobile: 9.5px, DESKTOP: 24px (150% increase)
        >
          {ceremony.name}
        </div>
      </div>
      
      {/* Shimmer effect overlay on selected */}
      {isSelected && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" 
          style={{ zIndex: 5 }}
        />
      )}
    </button>
  );
}