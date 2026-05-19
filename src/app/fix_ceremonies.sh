#!/bin/bash
# Script to fix all ceremony files by replacing }, [onComplete]); with }, []);

# List of all ceremony files to fix
ceremonies=(
  "EternalFlameClassicCeremony"
  "EternalFlamePassionateCeremony"
  "EternalFlameEpicCeremony"
  "EternalFlameForgeCeremony"
  "TimeTravelerPortalCeremony"
  "TimeTravelerSingularityCeremony"
  "NewLifeGentleBloomCeremony"
  "NewLifeStardustArrivalCeremony"
  "NewLifeTreeOfLifeCeremony"
  "NewLifeWorldTreeCeremony"
  "NewLifeGenesisCeremony"
  "NewLifeCosmicEyesCeremony"
  "NewLifeLotusBloomCeremony"
  "PetEternalPlayCeremony"
  "PetHeartbeatBondCeremony"
  "PetRainbowBridgeCeremony"
  "PetFirstPawsCeremony"
  "PetStarlitCeremony"
  "GratitudeLanternCeremony"
  "GratitudeGardenCeremony"
  "GratitudeInfiniteCeremony"
  "LaunchpadStandardCeremony"
  "LaunchpadPremiumCeremony"
  "LaunchpadEpicCeremony"
  "MixtapeStandardCeremony"
  "MixtapeDeluxeCeremony"
  "MixtapeEpicCeremony"
  "VoyageRareCeremony"
  "VoyageLegendaryCeremony"
  "VoyageEpicCeremony"
  "CareerGavelCeremony"
  "CareerSignatureCeremony"
  "CareerSkyscraperCeremony"
  "CareerCurtainCallCeremony"
  "NewYearCountdownCeremony"
  "NewYearChampagneCeremony"
  "NewYearFireworksCeremony"
  "NewNestLightSwitchCeremony"
  "NewNestSnowglobeCeremony"
  "NewNestTimeLapseCeremony"
  "WeddingVowThreadCeremony"
  "WeddingSparklerCeremony"
  "WeddingGoldenHourCeremony"
  "BirthdayAuroraCascadeCeremony"
  "FreshStartKeyKingdomCeremony"
  "FreshStartDigitalAvatarCeremony"
  "FreshStartOfficeTowerCeremony"
)

# Fix: Replace all instances of }, [onComplete]); with }, []);
for ceremony in "${ceremonies[@]}"; do
  file="/components/capsule-themes/ceremonies/${ceremony}.tsx"
  if [ -f "$file" ]; then
    echo "Fixing $file"
    # This would use sed or similar to replace the pattern
    # sed -i 's/}, \[onComplete\]);/}, []); \/\/ Only run once on mount - don'\''t restart ceremony midway through/g' "$file"
  fi
done
