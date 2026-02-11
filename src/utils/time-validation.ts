/**
 * Time Validation Utility for Eras Time Capsule App
 * 
 * Enforces business rules:
 * - Minimum: Capsules must be scheduled at least 59 minutes (1 hour) into the future
 * - Maximum: Capsules and Legacy Access cannot exceed 5 years into the future
 */

export interface TimeValidationResult {
  valid: boolean;
  error: 'minimum' | 'maximum' | null;
  message: string | null;
  earliestAllowed?: Date;
  latestAllowed?: Date;
}

/**
 * Validates that a scheduled time is within acceptable bounds
 * @param selectedDate - The date/time the user wants to schedule
 * @returns Validation result with error details if invalid
 */
export function validateScheduleTime(selectedDate: Date): TimeValidationResult {
  const now = new Date();
  
  // 59 minutes from now (minimum scheduling window)
  const minimumTime = new Date(now.getTime() + 59 * 60 * 1000);
  
  // 5 years from now (maximum scheduling window)
  // Using 365.25 to account for leap years
  const maximumTime = new Date(now.getTime() + 5 * 365.25 * 24 * 60 * 60 * 1000);
  
  // Check minimum (59 minutes / ~1 hour)
  if (selectedDate < minimumTime) {
    return {
      valid: false,
      error: 'minimum',
      message: `Capsules must be scheduled at least 1 hour in the future to allow time for media processing.\n\nEarliest allowed: ${minimumTime.toLocaleString()}`,
      earliestAllowed: minimumTime,
      latestAllowed: maximumTime
    };
  }
  
  // Check maximum (5 years)
  if (selectedDate > maximumTime) {
    return {
      valid: false,
      error: 'maximum',
      message: `Capsules cannot be scheduled more than 5 years in the future.\n\nLatest allowed: ${maximumTime.toLocaleDateString()}`,
      earliestAllowed: minimumTime,
      latestAllowed: maximumTime
    };
  }
  
  return { 
    valid: true, 
    error: null, 
    message: null,
    earliestAllowed: minimumTime,
    latestAllowed: maximumTime
  };
}

/**
 * Gets the minimum allowed date for date pickers (59 minutes from now)
 */
export function getMinimumScheduleDate(): Date {
  const now = new Date();
  return new Date(now.getTime() + 59 * 60 * 1000);
}

/**
 * Gets the maximum allowed date for date pickers (5 years from now)
 */
export function getMaximumScheduleDate(): Date {
  const now = new Date();
  return new Date(now.getTime() + 5 * 365.25 * 24 * 60 * 60 * 1000);
}

/**
 * Validates legacy access / beneficiary unlock date
 * Uses the same rules as capsule scheduling
 */
export function validateLegacyAccessDate(selectedDate: Date): TimeValidationResult {
  // Use the same validation logic
  const result = validateScheduleTime(selectedDate);
  
  // Customize the message for legacy access context
  if (!result.valid && result.error === 'minimum') {
    return {
      ...result,
      message: `Legacy Access unlock date must be at least 1 hour in the future.\n\nEarliest allowed: ${result.earliestAllowed?.toLocaleString()}`
    };
  }
  
  if (!result.valid && result.error === 'maximum') {
    return {
      ...result,
      message: `Legacy Access unlock date cannot be more than 5 years in the future.\n\nLatest allowed: ${result.latestAllowed?.toLocaleDateString()}`
    };
  }
  
  return result;
}
