/**
 * Performance optimization utilities for mobile vs desktop
 */

const isMobile = () => window.innerWidth < 768;

/**
 * Get optimal particle count based on device type
 * @param desktopCount - Particle count for desktop
 * @returns Adjusted particle count (50% on mobile)
 */
export function getOptimalParticleCount(desktopCount: number): number {
  return isMobile() ? Math.floor(desktopCount * 0.5) : desktopCount;
}

/**
 * Get optimal duration based on device type
 * @param desktopDuration - Duration in ms for desktop
 * @returns Adjusted duration (50% on mobile for faster performance)
 */
export function getOptimalDuration(desktopDuration: number): number {
  return isMobile() ? Math.floor(desktopDuration * 0.5) : desktopDuration;
}
