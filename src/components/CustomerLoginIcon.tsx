import React from 'react';

interface CustomerLoginIconProps {
  className?: string;
}

/**
 * Exact recreation of the uploaded log-in.png (desktop monitor with user avatar inside circle)
 */
export const CustomerLoginIcon: React.FC<CustomerLoginIconProps> = ({
  className = 'w-5 h-5',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Monitor Outer Frame */}
      <rect
        x="16"
        y="36"
        width="480"
        height="344"
        rx="32"
        stroke="#000000"
        strokeWidth="32"
        fill="#FFFFFF"
      />
      {/* Monitor Bottom Chin Bar */}
      <line
        x1="16"
        y1="308"
        x2="496"
        y2="308"
        stroke="#000000"
        strokeWidth="30"
      />
      {/* Monitor Neck */}
      <rect
        x="212"
        y="380"
        width="88"
        height="50"
        stroke="#000000"
        strokeWidth="30"
        fill="#FFFFFF"
      />
      {/* Monitor Base */}
      <path
        d="M150 476C150 450 170 430 196 430H316C342 430 362 450 362 476H150Z"
        stroke="#000000"
        strokeWidth="30"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />

      {/* User Circle Inside Monitor */}
      <circle
        cx="256"
        cy="172"
        r="96"
        stroke="#000000"
        strokeWidth="28"
        fill="#FFFFFF"
      />
      {/* User Head */}
      <circle
        cx="256"
        cy="144"
        r="34"
        stroke="#000000"
        strokeWidth="26"
        fill="#FFFFFF"
      />
      {/* User Shoulders */}
      <path
        d="M188 238C196 204 222 188 256 188C290 188 316 204 324 238"
        stroke="#000000"
        strokeWidth="26"
        strokeLinecap="round"
      />
    </svg>
  );
};
