import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ONBOARDING_MODULES, OnboardingModule, OnboardingModuleProps, getModule } from '../../utils/onboarding/registry';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { LoadingAnimation } from '../LoadingAnimation';
import { logger } from '../../utils/logger';

interface OnboardingOrchestratorProps {
  userId: string;
  forceModule?: string; // For Settings replay
  onComplete: () => void;
  onDismiss?: () => void;
}

// Achievement unlock sequence type
type AchievementSequence = {
  achievementId: string;
  titleId?: string;
}[];

export function OnboardingOrchestrator({ 
  userId, 
  forceModule, 
  onComplete,
  onDismiss 
}: OnboardingOrchestratorProps) {
  const [currentModule, setCurrentModule] = useState<OnboardingModule | null>(null);
  const [completionState, setCompletionState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [earlyExitModule, setEarlyExitModule] = useState<string | null>(null); // Track which module was exited early

  // Load completion state from KV store
  useEffect(() => {
    loadCompletionState();
    
    // Set onboarding flag to suppress achievement modals during tutorial
    localStorage.setItem('eras_onboarding_in_progress', 'true');
    logger.info('📚 [Onboarding] Setting onboarding flag - achievement modals will be suppressed');
    
    return () => {
      // Clear flag when orchestrator unmounts
      localStorage.removeItem('eras_onboarding_in_progress');
      logger.info('📚 [Onboarding] Clearing onboarding flag - achievement modals can show now');
    };
  }, [userId]);

  // React to forceModule changes (for menu-triggered tutorials)
  useEffect(() => {
    if (forceModule) {
      logger.info(`Onboarding: forceModule set to \"${forceModule}\", loading module...`);
      const module = getModule(forceModule);
      if (module) {
        logger.info(`Onboarding: Force-loading module ${forceModule}`, module);
        setCurrentModule(module);
      } else {
        logger.error(`Onboarding: Could not find module for forceModule: ${forceModule}`);
      }
    }
  }, [forceModule]); // Remove 'loading' dependency - should run immediately

  // Listen for "start-vault-mastery" event from First Capsule completion screen
  useEffect(() => {
    const handleStartVaultMastery = () => {
      logger.info('Onboarding: Transitioning to Vault Mastery module');
      const vaultModule = getModule('vault_mastery');
      if (vaultModule) {
        setCurrentModule(vaultModule);
      }
    };

    window.addEventListener('start-vault-mastery', handleStartVaultMastery);
    return () => window.removeEventListener('start-vault-mastery', handleStartVaultMastery);
  }, []);

  // Determine which module to show - moved logic into a helper or run inside loadCompletionState
  const determineModule = (state: Record<string, boolean>) => {
    logger.info(`Onboarding: determineModule called with forceModule="${forceModule}", state=`, state);
    
    if (forceModule) {
      const module = getModule(forceModule);
      if (module) {
        logger.info(`Onboarding: Loading forced module ${forceModule}`, module);
        return module;
      } else {
        logger.error(`Onboarding: Module not found for forceModule: ${forceModule}`);
      }
    } else {
      // Check if core onboarding is needed
      const needsCoreOnboarding = !state['first_capsule'];
      if (needsCoreOnboarding) {
        logger.info('Onboarding: New user detected, showing core onboarding');
        return ONBOARDING_MODULES.FIRST_CAPSULE;
      }
    }
    return null;
  };

  const loadCompletionState = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/onboarding/state`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ userId })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const state = data.completionState || {};
        setCompletionState(state);
        
        // Determine module immediately
        const module = determineModule(state);
        setCurrentModule(module);
      }
    } catch (error) {
      logger.error('Failed to load onboarding state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Safe-guard to close orchestrator if no module is found after loading
  useEffect(() => {
    if (!loading && !currentModule) {
      // Don't close if we have a forceModule - it will be loaded by the forceModule effect
      if (forceModule) {
        // Silently wait for the forceModule effect to handle it
        // No warning needed - this is expected behavior during initialization
        return;
      }
      
      logger.warn('Onboarding: No current module to display after loading, closing orchestrator');
      onComplete();
    }
  }, [loading, currentModule, onComplete, forceModule]);

  const handleModuleComplete = async (moduleId: string) => {
    logger.info(`Onboarding: Module ${moduleId} completed`);
    
    // Save completion to KV store
    await markModuleComplete(moduleId);
    
    // Update local state
    setCompletionState(prev => ({ ...prev, [moduleId]: true }));
    
    // Check if we need to trigger deferred achievements
    const hasDeferredAchievements = localStorage.getItem('eras_defer_first_capsule_achievements') === 'true';
    
    if (moduleId === 'vault_mastery') {
      // Vault Mastery completed
      logger.info('Onboarding: Vault Mastery completed');
      
      // Store completion for achievement awards
      localStorage.setItem('eras_onboarding_completion', JSON.stringify({
        firstCapsuleCompleted: true,
        vaultMasteryCompleted: true,
        completedAt: new Date().toISOString()
      }));
      
      if (hasDeferredAchievements) {
        // Clear the deferred flag
        localStorage.removeItem('eras_defer_first_capsule_achievements');
        logger.info('Onboarding: Triggering ALL deferred achievements (FC + VM)');
      }
      
      // Close orchestrator - achievements will trigger in App.tsx
      setCurrentModule(null);
      onComplete();
      
    } else if (moduleId === 'first_capsule') {
      // First Capsule completed
      logger.info('Onboarding: First Capsule completed');
      
      // Check if user chose to continue to Vault Mastery
      if (!hasDeferredAchievements) {
        // User clicked "Finish" - show First Capsule achievements only
        logger.info('Onboarding: User chose to finish - awarding First Capsule achievements');
        
        localStorage.setItem('eras_onboarding_completion', JSON.stringify({
          firstCapsuleCompleted: true,
          vaultMasteryCompleted: false,
          completedAt: new Date().toISOString()
        }));
        
        setCurrentModule(null);
        onComplete();
      } else {
        // User chose to continue - defer achievements until Vault Mastery completes
        logger.info('Onboarding: User chose to continue - deferring achievements');
        // Don't close yet - they're being transitioned to Vault Mastery
      }
    } else {
      // Any other module - just close
      setCurrentModule(null);
      onComplete();
    }
  };

  const markModuleComplete = async (moduleId: string) => {
    try {
      // Save to backend KV store
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f9be53a7/onboarding/complete`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ userId, moduleId })
        }
      );
      
      // CRITICAL: Also save to localStorage for OAuth re-login checks
      if (moduleId === 'first_capsule') {
        localStorage.setItem('eras_onboarding_first_capsule_completed', 'true');
        logger.info('Onboarding: Saved first_capsule completion to localStorage');
      }
    } catch (error) {
      logger.error('Failed to mark module complete:', error);
    }
  };

  const handleSkip = async () => {
    logger.info(`Onboarding: User skipped/closed module: ${currentModule?.id}`);
    
    // Track which module was exited early so we can award partial achievements
    const exitedModuleId = currentModule?.id;
    setEarlyExitModule(exitedModuleId || null);
    
    // 🔥 CRITICAL FIX: Mark module as complete even when skipped
    // This prevents the tutorial from re-showing and ensures backend + localStorage sync
    if (exitedModuleId) {
      logger.info(`Onboarding: Marking ${exitedModuleId} as complete (even though skipped)`);
      await markModuleComplete(exitedModuleId);
      
      // Store exit info for partial achievement awards
      localStorage.setItem('eras_onboarding_exit', JSON.stringify({
        moduleId: exitedModuleId,
        exitedAt: new Date().toISOString(),
        skipped: true // Flag to indicate early exit vs completion
      }));
    }
    
    setCurrentModule(null);
    if (onDismiss) {
      onDismiss();
    } else {
      onComplete();
    }
  };

  if (loading || !currentModule) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  const ModuleComponent = currentModule.component;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<LoadingAnimation />}>
          <ModuleComponent
            onComplete={() => handleModuleComplete(currentModule.id)}
            onSkip={handleSkip}
            isForced={!!forceModule}
          />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}