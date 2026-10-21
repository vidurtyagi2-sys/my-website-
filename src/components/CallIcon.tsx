import React from 'react';

interface CallIconProps {
  className?: string;
}

/**
 * Exact solid black handset silhouette matching the uploaded call.png
 */
export const CallIcon: React.FC<CallIconProps> = ({
  className = 'w-4 h-4',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        fill="#000000"
        d="M11 45C11 19.5 31.5 0 57 0H129C159.5 0 183 25 180 55.5L193 139C196 158.5 189.5 178 175.5 192L138 229.5C176.5 301.5 235.5 360.5 307.5 399L345 361.5C359 347.5 378.5 341 398 344L481.5 357C512 354 537 377.5 537 408V469C537 494.5 516.5 512 491 512C225.9 512 11 297.1 11 32V45Z"
      />
    </svg>
  );
};
