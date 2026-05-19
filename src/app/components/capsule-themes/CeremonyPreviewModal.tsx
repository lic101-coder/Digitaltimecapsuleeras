/**
 * CeremonyPreviewModal Component
 * 
 * Full-screen modal for previewing ceremony animations.
 * Uses z-[100] to ensure it appears above all other UI.
 * Completely isolated from existing dialog system.
 * Renders via Portal to ensure proper positioning.
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { BirthdayClassicCeremony } from './ceremonies/BirthdayClassicCeremony';
import { BirthdayPartyCeremony } from './ceremonies/BirthdayPartyCeremony';
import { BirthdayAuroraCascadeCeremony } from './ceremonies/BirthdayAuroraCascadeCeremony';
import { EternalFlameClassicCeremony } from './ceremonies/EternalFlameClassicCeremony';
import { EternalFlamePassionateCeremony } from './ceremonies/EternalFlamePassionateCeremony';
import { EternalFlameForgeCeremony } from './ceremonies/EternalFlameForgeCeremony';
import { TimeTravelerPassageCeremony } from './ceremonies/TimeTravelerPassageCeremony';
import { TimeTravelerPortalCeremony } from './ceremonies/TimeTravelerPortalCeremony';
import { TimeTravelerSingularityCeremony } from './ceremonies/TimeTravelerSingularityCeremony';
import { NewLifeWorldTreeCeremony } from './ceremonies/NewLifeWorldTreeCeremony';
import { NewLifeLotusCeremony } from './ceremonies/NewLifeLotusCeremony';
import { NewLifeGenesisCeremony } from './ceremonies/NewLifeGenesisCeremony';
import { PetEternalPlayCeremony } from './ceremonies/PetEternalPlayCeremony';
import { PetHeartbeatBondCeremony } from './ceremonies/PetHeartbeatBondCeremony';
import { PetRainbowBridgeCeremony } from './ceremonies/PetRainbowBridgeCeremony';
import { PetFirstPawsCeremony } from './ceremonies/PetFirstPawsCeremony';
import { PetStarlitCeremony } from './ceremonies/PetStarlitCeremony';
import { GratitudeLanternCeremony } from './ceremonies/GratitudeLanternCeremony';
import { GratitudeGardenCeremony } from './ceremonies/GratitudeGardenCeremony';
import { GratitudeInfiniteCeremony } from './ceremonies/GratitudeInfiniteCeremony';
import { LaunchpadStandardCeremony } from './ceremonies/LaunchpadStandardCeremony';
import { LaunchpadPremiumCeremony } from './ceremonies/LaunchpadPremiumCeremony';
import { LaunchpadEpicCeremony } from './ceremonies/LaunchpadEpicCeremony';
import { MixtapeStandardCeremony } from './ceremonies/MixtapeStandardCeremony';
import { MixtapeDeluxeCeremony } from './ceremonies/MixtapeDeluxeCeremony';
import { MixtapeEpicCeremony } from './ceremonies/MixtapeEpicCeremony';
import { VoyageRareCeremony } from './ceremonies/VoyageRareCeremony';
import { VoyageLegendaryCeremony } from './ceremonies/VoyageLegendaryCeremony';
import { VoyageEpicCeremony } from './ceremonies/VoyageEpicCeremony';
import { CareerGavelCeremony } from './ceremonies/CareerGavelCeremony';
import { CareerSignatureCeremony } from './ceremonies/CareerSignatureCeremony';
import { CareerCurtainCallCeremony } from './ceremonies/CareerCurtainCallCeremony';
import { NewYearCountdownCeremony } from './ceremonies/NewYearCountdownCeremony';
import { NewYearChampagneCeremony } from './ceremonies/NewYearChampagneCeremony';
import { NewYearFireworksCeremony } from './ceremonies/NewYearFireworksCeremony';
import { NewNestLightSwitchCeremony } from './ceremonies/NewNestLightSwitchCeremony';
import { NewNestSnowglobeCeremony } from './ceremonies/NewNestSnowglobeCeremony';
import { NewNestTimeLapseCeremony } from './ceremonies/NewNestTimeLapseCeremony';
import { FreshStartKeyKingdomCeremony } from './ceremonies/FreshStartKeyKingdomCeremony';
import { FreshStartDigitalAvatarCeremony } from './ceremonies/FreshStartDigitalAvatarCeremony';
import { FreshStartOfficeTowerCeremony } from './ceremonies/FreshStartOfficeTowerCeremony';

// Replace with new Golden Moments ceremonies
import { GoldenVictoryCeremony } from './ceremonies/GoldenVictoryCeremony';
import { GoldenGraduationCeremony } from './ceremonies/GoldenGraduationCeremony';
import { GoldenWeddingDanceCeremony } from './ceremonies/GoldenWeddingDanceCeremony';

interface CeremonyPreviewModalProps {
  themeId: string;
  ceremonyId: string;
  capsuleTitle?: string;
  sampleMedia?: any[];
  onClose: () => void;
}

export function CeremonyPreviewModal({
  themeId,
  ceremonyId,
  capsuleTitle = "Your Special Moment",
  sampleMedia = [],
  onClose
}: CeremonyPreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0); // For forcing replay
  
  // Prevent body scroll when modal opens
  React.useEffect(() => {
    // Scroll to top immediately so modal is visible
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore original overflow
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  
  const handleReplay = () => {
    setIsPlaying(true);
    setKey(prev => prev + 1); // Force re-render to restart animation
  };
  
  // 🔥 CRITICAL FIX: Wrap in useCallback to prevent ceremony restarts
  // Without this, handleComplete changes on every render, triggering ceremony useEffect restart
  const handleComplete = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  // 🔥 CRITICAL FIX: Memoize ceremony props to prevent mid-ceremony restarts
  // Without this, props object recreates on every render, causing ceremonies to restart
  const ceremonyProps = React.useMemo(() => ({
    capsuleTitle: capsuleTitle,
    media: sampleMedia,
    isPreview: true,
    onComplete: handleComplete
  }), [capsuleTitle, sampleMedia, handleComplete]);
  
  // Render the appropriate ceremony component
  const renderCeremony = () => {
    if (themeId === 'birthday') {
      if (ceremonyId === 'classic') {
        return <BirthdayClassicCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'party') {
        return <BirthdayPartyCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'fireworks') {
        return <BirthdayAuroraCascadeCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'anniversary') {
      if (ceremonyId === 'classic') {
        return <EternalFlameClassicCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'passionate') {
        return <EternalFlamePassionateCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'forge') {
        return <EternalFlameForgeCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'future') {
      if (ceremonyId === 'passage') {
        return <TimeTravelerPassageCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'portal') {
        return <TimeTravelerPortalCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'singularity') {
        return <TimeTravelerSingularityCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'new_life') {
      if (ceremonyId === 'worldtree') {
        return <NewLifeWorldTreeCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'lotus') {
        return <NewLifeLotusCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'genesis') {
        return <NewLifeGenesisCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'pet') {
      if (ceremonyId === 'play') {
        return <PetEternalPlayCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'heartbeat') {
        return <PetHeartbeatBondCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'rainbow') {
        return <PetRainbowBridgeCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'first-paws') {
        return <PetFirstPawsCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'starlit') {
        return <PetStarlitCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'gratitude') {
      if (ceremonyId === 'lantern') {
        return <GratitudeLanternCeremony isVisible={true} onComplete={handleComplete} />;
      } else if (ceremonyId === 'garden') {
        return <GratitudeGardenCeremony isVisible={true} onComplete={handleComplete} />;
      } else if (ceremonyId === 'infinite') {
        return <GratitudeInfiniteCeremony isVisible={true} onComplete={handleComplete} />;
      }
    } else if (themeId === 'graduation') {
      if (ceremonyId === 'standard') {
        return <LaunchpadStandardCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'premium') {
        return <LaunchpadPremiumCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'epic') {
        return <LaunchpadEpicCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'mixtape') {
      if (ceremonyId === 'standard') {
        return <MixtapeStandardCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'premium') {
        return <MixtapeDeluxeCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'epic') {
        return <MixtapeEpicCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'friendship') {
      if (ceremonyId === 'standard') {
        return <MixtapeStandardCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'premium') {
        return <MixtapeDeluxeCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'epic') {
        return <MixtapeEpicCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'voyage') {
      if (ceremonyId === 'standard') {
        return <VoyageRareCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'premium') {
        return <VoyageLegendaryCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'epic') {
        return <VoyageEpicCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'travel') {
      if (ceremonyId === 'standard') {
        return <VoyageRareCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'premium') {
        return <VoyageLegendaryCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'epic') {
        return <VoyageEpicCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'career') {
      if (ceremonyId === 'gavel') {
        return <CareerGavelCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'signature') {
        return <CareerSignatureCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'curtaincall') {
        return <CareerCurtainCallCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'new_year') {
      if (ceremonyId === 'countdown') {
        return <NewYearCountdownCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'champagne') {
        return <NewYearChampagneCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'fireworks') {
        return <NewYearFireworksCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'new_home') {
      if (ceremonyId === 'lightswitch') {
        return <NewNestLightSwitchCeremony {...ceremonyProps} />; 
      } else if (ceremonyId === 'snowglobe') {
        return <NewNestSnowglobeCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'timelapse') {
        return <NewNestTimeLapseCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'wedding') {
      if (ceremonyId === 'victory') {
        return <GoldenVictoryCeremony {...ceremonyProps} />; 
      } else if (ceremonyId === 'graduation') {
        return <GoldenGraduationCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'firstdance') {
        return <GoldenWeddingDanceCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'first_day') {
      if (ceremonyId === 'key-kingdom') {
        return <FreshStartKeyKingdomCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'digital-avatar') {
        return <FreshStartDigitalAvatarCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'office-tower') {
        return <FreshStartOfficeTowerCeremony {...ceremonyProps} />;
      }
    } else if (themeId === 'golden_moments') {
      if (ceremonyId === 'victory') {
        return <GoldenVictoryCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'graduation') {
        return <GoldenGraduationCeremony {...ceremonyProps} />;
      } else if (ceremonyId === 'wedding_dance') {
        return <GoldenWeddingDanceCeremony {...ceremonyProps} />;
      }
    }
    
    // Fallback placeholder
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <div className="text-8xl animate-pulse">✨</div>
          <h2 className="text-3xl font-bold">Ceremony Preview</h2>
          <p className="text-white/70">Coming soon...</p>
        </div>
      </div>
    );
  };
  
  const modalContent = (
    <AnimatePresence>
      {/* Backdrop - z-[100] */}
      <motion.div
        key="ceremony-preview-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[100]"
        onClick={onClose}
      />
      
      {/* Modal content - z-[101] - Fixed positioning to center on screen */}
      <motion.div
        key="ceremony-preview-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] md:w-full md:max-w-4xl md:px-4 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative w-full h-full md:h-auto flex flex-col pointer-events-auto">
          {/* Close button - Top right corner - moved inside on mobile */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:-top-12 md:right-0 z-[102] text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* Preview notice - hidden on mobile to save space */}
          <div className="hidden md:block absolute -top-12 left-0 z-[102] text-white text-sm">
            <span className="bg-purple-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
              ✨ Preview - Real ceremony will use your actual media
            </span>
          </div>
          
          {/* Ceremony preview container */}
          <div className="bg-black rounded-lg overflow-hidden w-full h-full md:h-auto md:aspect-video relative shadow-2xl">
            {/* Close button inside ceremony - always visible with highest z-index */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[103] text-white/80 hover:text-white transition-colors bg-black/50 rounded-full p-2 hover:bg-black/70"
              aria-label="Close ceremony"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Render actual ceremony with key for forcing reset on replay - CENTERED */}
            <div key={key} className="w-full h-full flex items-center justify-center">
              {renderCeremony()}
            </div>
            
            {/* Replay overlay when finished - z-[102] */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 z-[102]"
              >
                <Button
                  size="lg"
                  onClick={handleReplay}
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-xl"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Replay Ceremony
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Info bar */}
          <div className="mt-4 text-center text-white text-sm">
            <p>This is how your capsule will celebrate when it opens!</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
  
  // Render via portal to ensure proper positioning at document root
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}