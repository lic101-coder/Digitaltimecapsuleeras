/**
 * Universal Ceremony Performance Optimization Utilities
 * 
 * Provides mobile detection and optimization helpers for all ceremonies.
 * Mobile devices get 70% particle reduction and optimized blur values.
 */

// Mobile detection - cached for performance
let _isMobile: boolean | null = null;

export const isMobile = (): boolean => {
  if (_isMobile === null) {
    _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  }
  return _isMobile;
};

/**
 * Get optimal particle count based on device type
 * Mobile gets 30% of desktop count (70% reduction)
 * 
 * @param desktopCount - Number of particles for desktop
 * @returns Optimized particle count
 */
export const getOptimalParticleCount = (desktopCount: number): number => {
  return isMobile() ? Math.max(1, Math.ceil(desktopCount * 0.3)) : desktopCount;
};

/**
 * Get optimal blur amount based on device type and blur intensity
 * - Heavy blurs (>50px): 33% on mobile
 * - Medium blurs (10-50px): 50% on mobile
 * - Light blurs (<10px): Remove entirely on mobile
 * 
 * @param desktopBlur - Blur value in pixels for desktop
 * @returns Optimized blur value
 */
export const getOptimalBlur = (desktopBlur: number): number => {
  if (!isMobile()) return desktopBlur;
  
  if (desktopBlur > 50) {
    return Math.ceil(desktopBlur * 0.33); // Heavy blur: 67% reduction
  } else if (desktopBlur > 10) {
    return Math.ceil(desktopBlur * 0.5); // Medium blur: 50% reduction
  } else {
    return 0; // Light blur: remove entirely
  }
};

/**
 * Get performance-optimized style properties
 * Adds GPU acceleration hints for smooth animations
 * 
 * @returns Style object with performance hints
 */
export const getPerformanceStyle = () => ({
  willChange: 'transform, opacity' as const,
  transform: 'translateZ(0)',
  contain: 'layout style paint' as const
});

/**
 * Get optimal ray count for radiance finales
 * Mobile gets 24 rays, desktop gets 48
 * 
 * @param desktopRays - Number of rays for desktop (typically 44-48)
 * @returns Optimized ray count
 */
export const getOptimalRayCount = (desktopRays: number = 48): number => {
  return isMobile() ? 24 : desktopRays;
};

/**
 * Get optimal animation duration
 * Mobile animations run slightly faster for better perceived performance
 * 
 * @param desktopDuration - Duration in seconds for desktop
 * @returns Optimized duration
 */
export const getOptimalDuration = (desktopDuration: number): number => {
  return isMobile() ? desktopDuration * 0.85 : desktopDuration;
};

/**
 * Should render complex effect based on device?
 * Some effects (nested glows, box-shadows, etc.) should be disabled on mobile
 *
 * @returns true if device can handle complex effects
 */
export const shouldRenderComplexEffect = (): boolean => {
  return !isMobile();
};

/**
 * Performance Tier Detection
 * Tier 1 (Minimal): Old devices, low memory, <4 cores
 * Tier 2 (Standard): Average mobile devices
 * Tier 3 (Full): High-end devices and desktops
 */
export type PerformanceTier = 1 | 2 | 3;

let _performanceTier: PerformanceTier | null = null;

export const getPerformanceTier = (): PerformanceTier => {
  if (_performanceTier !== null) return _performanceTier;

  if (typeof window === 'undefined') {
    _performanceTier = 3;
    return _performanceTier;
  }

  const isMobileDevice = isMobile();
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4; // In GB

  // Tier 1: Old/budget devices
  if (isMobileDevice && (cores <= 4 || memory <= 2)) {
    _performanceTier = 1;
  }
  // Tier 2: Average devices
  else if (isMobileDevice) {
    _performanceTier = 2;
  }
  // Tier 3: Desktop and high-end
  else {
    _performanceTier = 3;
  }

  return _performanceTier;
};

/**
 * Get particle count based on performance tier
 * Tier 1: 15% of base, Tier 2: 30% of base, Tier 3: 100% of base
 */
export const getParticleCountByTier = (baseCount: number): number => {
  const tier = getPerformanceTier();

  switch (tier) {
    case 1:
      return Math.max(1, Math.ceil(baseCount * 0.15));
    case 2:
      return Math.max(1, Math.ceil(baseCount * 0.3));
    case 3:
    default:
      return baseCount;
  }
};

/**
 * Get blur amount based on performance tier
 * Tier 1: minimal blur, Tier 2: 50% blur, Tier 3: full blur
 */
export const getBlurByTier = (baseBlur: number): number => {
  const tier = getPerformanceTier();

  switch (tier) {
    case 1:
      return baseBlur > 20 ? Math.ceil(baseBlur * 0.2) : 0;
    case 2:
      return Math.ceil(baseBlur * 0.5);
    case 3:
    default:
      return baseBlur;
  }
};

/**
 * Should render effect based on tier?
 * Tier 1: Only essential effects, Tier 2: Most effects, Tier 3: All effects
 */
export const shouldRenderEffectByTier = (effectComplexity: 'essential' | 'standard' | 'complex'): boolean => {
  const tier = getPerformanceTier();

  if (tier === 1) {
    return effectComplexity === 'essential';
  } else if (tier === 2) {
    return effectComplexity !== 'complex';
  } else {
    return true;
  }
};
