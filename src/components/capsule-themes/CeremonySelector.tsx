/**
 * CeremonySelector Component
 * 
 * UI for selecting ceremony style with preview option.
 * Conditionally rendered only for themes that support ceremonies.
 * Integrates into Step 2 of capsule creation WITHOUT affecting existing flow.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sparkles } from 'lucide-react';
import { CeremonyCard } from './CeremonyCard';
import { CeremonyPreviewModal } from './CeremonyPreviewModal';
import { getCeremoniesForTheme, getDefaultCeremony } from './CeremonyRegistry';

// Generate sample media for preview if user hasn't added media yet
const generateSampleMedia = (count: number = 4) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `sample-${i}`,
    url: '', // Will use thumbnail instead
    thumbnail: `data:image/svg+xml,${encodeURIComponent(`
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#30cfd0'][i % 6]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7', '#fee140', '#330867'][i % 6]};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#grad${i})"/>
        <text x="50%" y="50%" font-family="Arial" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle">🎉</text>
      </svg>
    `)}`,
    type: 'image'
  }));
};

interface CeremonySelectorProps {
  themeId: string;
  selectedCeremony: string | null;
  onCeremonyChange: (ceremonyId: string) => void;
  capsuleTitle?: string;
  sampleMedia?: any[];
}

export function CeremonySelector({ 
  themeId, 
  selectedCeremony, 
  onCeremonyChange,
  capsuleTitle,
  sampleMedia = []
}: CeremonySelectorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewCeremonyId, setPreviewCeremonyId] = useState<string | null>(null);
  const scrollPositionRef = React.useRef(0);
  
  // Get available ceremonies for this theme
  const ceremonies = getCeremoniesForTheme(themeId);
  
  // Auto-select default if nothing selected and ceremonies are available
  useEffect(() => {
    if (!selectedCeremony && ceremonies.length > 0) {
      const defaultCeremony = getDefaultCeremony(themeId);
      if (defaultCeremony) {
        console.log('🎬 [CeremonySelector] Auto-selecting default ceremony:', defaultCeremony, 'for theme:', themeId);
        onCeremonyChange(defaultCeremony);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCeremony, ceremonies.length, themeId]); // ✅ CRITICAL FIX: Removed onCeremonyChange from dependencies to prevent infinite loop
  
  // Handle modal opening - save scroll position
  const handleOpenPreview = (ceremonyId: string) => {
    scrollPositionRef.current = window.scrollY;
    setPreviewCeremonyId(ceremonyId);
    setShowPreview(true);
  };
  
  // Handle modal closing - restore scroll position
  const handleClosePreview = () => {
    setShowPreview(false);
    // Restore scroll position after a brief delay to ensure modal is closed
    setTimeout(() => {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }, 0);
  };
  
  // Don't render if no ceremonies available for this theme
  if (ceremonies.length === 0) {
    return null;
  }
  
  // Get theme-appropriate fallback title
  const getDefaultTitle = () => {
    if (themeId === 'birthday') return "Your Special Birthday";
    if (themeId === 'anniversary') return "Your Love Story";
    return "Your Special Moment";
  };
  
  return (
    <>
      {/* Single layout for both mobile and desktop */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Choose Ceremony Style</h3>
        </div>
        {/* Ceremony cards grid - 3 columns for all devices */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {ceremonies.map((ceremony) => (
            <CeremonyCard
              key={ceremony.id}
              ceremony={ceremony}
              isSelected={selectedCeremony === ceremony.id}
              onSelect={() => onCeremonyChange(ceremony.id)}
              onPreview={() => handleOpenPreview(ceremony.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Preview Modal (z-[100+]) */}
      {showPreview && previewCeremonyId && (
        <CeremonyPreviewModal
          themeId={themeId}
          ceremonyId={previewCeremonyId}
          capsuleTitle={capsuleTitle || getDefaultTitle()}
          sampleMedia={sampleMedia.length > 0 ? sampleMedia : generateSampleMedia(6)}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
}