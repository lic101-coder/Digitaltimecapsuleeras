import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { getThemeConfig } from './ThemeRegistry';
import { Gift, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { getOptimalParticleCount, getOptimalDuration } from '@/utils/performance';
import { SolarReturnCeremony } from './ceremonies/SolarReturnCeremony';
import { LuxeBirthdayCeremony } from './ceremonies/LuxeBirthdayCeremony';
import { ChampagneCeremony } from './ceremonies/ChampagneCeremony';
import { GratitudeLanternCeremony } from './ceremonies/GratitudeLanternCeremony';
import { GratitudeGardenCeremony } from './ceremonies/GratitudeGardenCeremony';
import { GratitudeInfiniteCeremony } from './ceremonies/GratitudeInfiniteCeremony';
import { StandardCeremony } from './ceremonies/StandardCeremony';
import { PetEternalPlayCeremony } from './ceremonies/PetEternalPlayCeremony';
import { PetHeartbeatBondCeremony } from './ceremonies/PetHeartbeatBondCeremony';
import { PetRainbowBridgeCeremony } from './ceremonies/PetRainbowBridgeCeremony';
import { PetFirstPawsCeremony } from './ceremonies/PetFirstPawsCeremony';
import { PetStarlitCeremony } from './ceremonies/PetStarlitCeremony';
import { CareerGavelCeremony } from './ceremonies/CareerGavelCeremony';
import { CareerSignatureCeremony } from './ceremonies/CareerSignatureCeremony';
import { CareerCurtainCallCeremony } from './ceremonies/CareerCurtainCallCeremony';
import { NewYearCountdownCeremony } from './ceremonies/NewYearCountdownCeremony';
import { NewYearChampagneCeremony } from './ceremonies/NewYearChampagneCeremony';
import { NewYearFireworksCeremony } from './ceremonies/NewYearFireworksCeremony';
import { NewNestLightSwitchCeremony } from './ceremonies/NewNestLightSwitchCeremony';
import { NewNestSnowglobeCeremony } from './ceremonies/NewNestSnowglobeCeremony';
import { NewNestTimeLapseCeremony } from './ceremonies/NewNestTimeLapseCeremony';
import { NewLifeWorldTreeCeremony } from './ceremonies/NewLifeWorldTreeCeremony';
import { NewLifeLotusCeremony } from './ceremonies/NewLifeLotusCeremony';
import { NewLifeGenesisCeremony } from './ceremonies/NewLifeGenesisCeremony';
import { WeddingVowThreadCeremony } from './ceremonies/WeddingVowThreadCeremony';
import { WeddingSparklerCeremony } from './ceremonies/WeddingSparklerCeremony';
import { WeddingGoldenHourCeremony } from './ceremonies/WeddingGoldenHourCeremony';
// 🎬 User-selectable ceremonies for Birthday
import { BirthdayClassicCeremony } from './ceremonies/BirthdayClassicCeremony';
import { BirthdayPartyCeremony } from './ceremonies/BirthdayPartyCeremony';
import { BirthdayAuroraCascadeCeremony } from './ceremonies/BirthdayAuroraCascadeCeremony';
// 🎬 User-selectable ceremonies for Anniversary (Eternal Flame)
import { EternalFlameClassicCeremony } from './ceremonies/EternalFlameClassicCeremony';
import { EternalFlamePassionateCeremony } from './ceremonies/EternalFlamePassionateCeremony';
import { EternalFlameForgeCeremony } from './ceremonies/EternalFlameForgeCeremony';
// 🎬 User-selectable ceremonies for Time Traveler (Future)
import { TimeTravelerPassageCeremony } from './ceremonies/TimeTravelerPassageCeremony';
import { TimeTravelerPortalCeremony } from './ceremonies/TimeTravelerPortalCeremony';
import { TimeTravelerSingularityCeremony } from './ceremonies/TimeTravelerSingularityCeremony';
// 🎬 User-selectable ceremonies for New Life
import { NewLifeGentleBloomCeremony } from './ceremonies/NewLifeGentleBloomCeremony';
import { NewLifeStardustArrivalCeremony } from './ceremonies/NewLifeStardustArrivalCeremony';
import { NewLifeTreeOfLifeCeremony } from './ceremonies/NewLifeTreeOfLifeCeremony';
// 🎬 User-selectable ceremonies for Voyage (Travel)
import { VoyageRareCeremony } from './ceremonies/VoyageRareCeremony';
import { VoyageLegendaryCeremony } from './ceremonies/VoyageLegendaryCeremony';
import { VoyageEpicCeremony } from './ceremonies/VoyageEpicCeremony';
// 🎬 User-selectable ceremonies for Launchpad (Graduation)
import { LaunchpadStandardCeremony } from './ceremonies/LaunchpadStandardCeremony';
import { LaunchpadPremiumCeremony } from './ceremonies/LaunchpadPremiumCeremony';
import { LaunchpadEpicCeremony } from './ceremonies/LaunchpadEpicCeremony';
// 🎬 User-selectable ceremonies for Mixtape (Friendship)
import { MixtapeStandardCeremony } from './ceremonies/MixtapeStandardCeremony';
import { MixtapeDeluxeCeremony } from './ceremonies/MixtapeDeluxeCeremony';
import { MixtapeEpicCeremony } from './ceremonies/MixtapeEpicCeremony';
// 🎬 User-selectable ceremonies for Fresh Start (First Day)
import { FreshStartKeyKingdomCeremony } from './ceremonies/FreshStartKeyKingdomCeremony';
import { FreshStartDigitalAvatarCeremony } from './ceremonies/FreshStartDigitalAvatarCeremony';
import { FreshStartOfficeTowerCeremony } from './ceremonies/FreshStartOfficeTowerCeremony';

// Replace with new Golden Moments ceremonies
import { GoldenVictoryCeremony } from './ceremonies/GoldenVictoryCeremony';
import { GoldenGraduationCeremony } from './ceremonies/GoldenGraduationCeremony';
import { GoldenWeddingDanceCeremony } from './ceremonies/GoldenWeddingDanceCeremony';

interface CeremonyOverlayProps {
  themeId: string;
  onComplete: () => void;
  isVisible: boolean;
  isNewReceived?: boolean; // CRITICAL: New received capsules should show opening animation
  ceremonyId?: string | null; // Selected ceremony variant
  capsuleTitle?: string; // Pass capsule title to ceremonies
  media?: any[]; // Pass media to ceremonies
}

export function CeremonyOverlay({ themeId, onComplete, isVisible, isNewReceived = false, ceremonyId = null, capsuleTitle, media = [] }: CeremonyOverlayProps) {
  const [phase, setPhase] = useState<'locked' | 'interacting' | 'revealing' | 'complete'>('locked');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = getThemeConfig(themeId);
  const [progress, setProgress] = useState(0);
  
  // ⚡ MOBILE DETECTION for performance optimizations
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect mobile on mount
    setIsMobile(window.innerWidth < 768);
  }, []);

  // 🎬 CRITICAL: Log which ceremony is being displayed to recipient
  useEffect(() => {
    if (isVisible && ceremonyId) {
      console.log('🎬 [CeremonyOverlay] Displaying ceremony to recipient:', {
        themeId,
        ceremonyId,
        isNewReceived
      });
    } else if (isVisible && !ceremonyId) {
      console.log('🎬 [CeremonyOverlay] Displaying default ceremony for theme:', themeId, '(no ceremonyId saved)');
    }
  }, [isVisible, ceremonyId, themeId, isNewReceived]);

  // Handle successful interaction (e.g. tear complete)
  const handleInteractionComplete = () => {
    setPhase('revealing');
    
    // ⚡ CONFETTI REMOVED: Animation/challenge is sufficient without extra effects
    // Keeping performance optimized and avoiding slowdowns on mobile
    
    // 🔥 FIX: Increase fade out duration so animation is visible (was 1500ms/750ms, now 2000ms/1000ms)
    setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, getOptimalDuration(2000)); // 2s on desktop, 1s on mobile
  };

  // Return null only when complete or not visible
  if (!isVisible || phase === 'complete') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        // ⚡ FIX: Use solid color on mobile to prevent rendering issues with complex gradients
        background: isMobile ? theme.primaryColor : theme.bgGradient,
        touchAction: 'none' // Prevent scrolling while interacting
      }}
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: 60 }}
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full p-6 text-center">
        


        {/* Theme-Specific Ceremony Component */}
        {themeId === 'anniversary' ? (
          ceremonyId === 'classic' ? (
            <EternalFlameClassicCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'passionate' ? (
            <EternalFlamePassionateCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'forge' ? (
            <EternalFlameForgeCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            <SolarReturnCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
              themeConfig={theme}
            />
          )
        ) : themeId === 'future' ? (
          ceremonyId === 'passage' ? (
            <TimeTravelerPassageCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'portal' ? (
            <TimeTravelerPortalCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'singularity' ? (
            <TimeTravelerSingularityCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Passage) for old capsules
            <TimeTravelerPassageCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'travel' ? (
          ceremonyId === 'rare' ? (
            <VoyageRareCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'legendary' ? (
            <VoyageLegendaryCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'epic' ? (
            <VoyageEpicCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Compass Rose / Rare) for old capsules
            <VoyageRareCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'graduation' ? (
          ceremonyId === 'standard' ? (
            <LaunchpadStandardCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'premium' ? (
            <LaunchpadPremiumCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'epic' ? (
            <LaunchpadEpicCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Metamorphosis / Standard) for old capsules
            <LaunchpadStandardCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'new_life' ? (
          ceremonyId === 'worldtree' ? (
            <NewLifeWorldTreeCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'lotus' ? (
            <NewLifeLotusCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'genesis' ? (
            <NewLifeGenesisCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to worldtree ceremony if no ceremonyId specified
            <NewLifeWorldTreeCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'wedding' ? (
          ceremonyId === 'victory' ? (
            <GoldenVictoryCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'graduation' ? (
            <GoldenGraduationCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'firstdance' ? (
            <GoldenWeddingDanceCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to victory ceremony if no ceremonyId specified
            <GoldenVictoryCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'friendship' ? (
          ceremonyId === 'standard' ? (
            <MixtapeStandardCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'deluxe' ? (
            <MixtapeDeluxeCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'epic' ? (
            <MixtapeEpicCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Vinyl Spin / Standard) for old capsules
            <MixtapeStandardCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'birthday' ? (
          ceremonyId === 'classic' ? (
            <BirthdayClassicCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'party' ? (
            <BirthdayPartyCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'fireworks' ? (
            <BirthdayAuroraCascadeCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Make a Wish) for old capsules
            <LuxeBirthdayCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'luxe_birthday' ? (
          <LuxeBirthdayCeremony
            isVisible={isVisible && phase !== 'revealing'}
            onComplete={handleInteractionComplete}
          />
        ) : themeId === 'pet' ? (
          ceremonyId === 'first-paws' ? (
            <PetFirstPawsCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'starlit' ? (
            <PetStarlitCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'rainbow' ? (
            <PetRainbowBridgeCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'play' ? (
            <PetEternalPlayCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'heartbeat' ? (
            <PetHeartbeatBondCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (First Paws Home) for new capsules
            <PetFirstPawsCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'gratitude' ? (
          ceremonyId === 'lantern' ? (
            <GratitudeLanternCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'garden' ? (
            <GratitudeGardenCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'infinite' ? (
            <GratitudeInfiniteCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to lantern if no ceremonyId specified
            <GratitudeLanternCeremony
              isVisible={isVisible && phase !== 'revealing'}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'career' ? (
          ceremonyId === 'gavel' ? (
            <CareerGavelCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'signature' ? (
            <CareerSignatureCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'curtaincall' ? (
            <CareerCurtainCallCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Rising Graph / Gavel) for old capsules - using Gavel as it's more ceremonial
            <CareerGavelCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'new_year' ? (
          ceremonyId === 'countdown' ? (
            <NewYearCountdownCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'champagne' ? (
            <NewYearChampagneCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'fireworks' ? (
            <NewYearFireworksCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Countdown) for old capsules
            <NewYearCountdownCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'new_home' ? (
          ceremonyId === 'lightswitch' ? (
            <NewNestLightSwitchCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'snowglobe' ? (
            <NewNestSnowglobeCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'timelapse' ? (
            <NewNestTimeLapseCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Light Switch) for old capsules
            <NewNestLightSwitchCeremony
              capsuleTitle={capsuleTitle}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'first_day' ? (
          ceremonyId === 'key-kingdom' ? (
            <FreshStartKeyKingdomCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'digital-avatar' ? (
            <FreshStartDigitalAvatarCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : ceremonyId === 'office-tower' ? (
            <FreshStartOfficeTowerCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          ) : (
            // Default to first ceremony (Key to the Kingdom) for old capsules
            <FreshStartKeyKingdomCeremony
              capsuleTitle={capsuleTitle || ''}
              media={media}
              isPreview={false}
              onComplete={handleInteractionComplete}
            />
          )
        ) : themeId === 'standard' ? (
          <StandardCeremony
            isVisible={isVisible && phase !== 'revealing'}
            onComplete={handleInteractionComplete}
          />
        ) : (
          <SolarReturnCeremony 
            isVisible={isVisible && phase !== 'revealing'} 
            onComplete={handleInteractionComplete}
            themeConfig={theme}
          />
        )}

      </div>
    </motion.div>
  );
}