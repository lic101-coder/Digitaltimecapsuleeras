/**
 * Refined icon components for the Eras app
 * These icons provide a consistent, polished visual language
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * RefinedSparkles - Icon for enhancement/AI features
 */
export const RefinedSparkles: React.FC<IconProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L13.09 7.26L18 8.27L13.09 9.28L12 14.54L10.91 9.28L6 8.27L10.91 7.26L12 2Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M19 9L19.63 11.37L22 12L19.63 12.63L19 15L18.37 12.63L16 12L18.37 11.37L19 9Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M19 19L19.63 21.37L22 22L19.63 22.63L19 25L18.37 22.63L16 22L18.37 21.37L19 19Z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M5 9L5.63 11.37L8 12L5.63 12.63L5 15L4.37 12.63L2 12L4.37 11.37L5 9Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
};

/**
 * RefinedVideoCamera - Icon for video/media features
 */
export const RefinedVideoCamera: React.FC<IconProps> = ({ className = '', size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="2"
        y="6"
        width="15"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M17 9L22 6V18L17 15V9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="12"
        r="2"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
};
