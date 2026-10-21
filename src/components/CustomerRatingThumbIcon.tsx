import React from 'react';

interface CustomerRatingThumbIconProps {
  className?: string;
}

/**
 * Animated Customer Rating Thumbs-Up & Star Icon matching the uploaded video:
 * - Animated gold star above the thumb with navy outline
 * - Animated coral-red sparkle dot
 * - Thumbs-up hand in terracotta/coral with blue sleeve cuff & white button
 */
export const CustomerRatingThumbIcon: React.FC<
  CustomerRatingThumbIconProps
> = ({ className = 'w-14 h-14' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes thumbRock {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-10deg) translateY(-2px); }
          }
          @keyframes starFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-6px) rotate(-12deg) scale(1.06); }
          }
          @keyframes dotPulse {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
            50% { transform: translateY(-5px) scale(1.25); opacity: 0.85; }
          }
        `}
      </style>

      {/* Animated Gold Star at Top */}
      <g
        style={{
          transformOrigin: '108px 54px',
          animation: 'starFloat 1.8s ease-in-out infinite',
        }}
      >
        <path
          d="M 108 16 L 119 36 L 141 40 C 145 41 147 46 144 49 L 128 65 L 132 87 C 133 91 128 95 124 93 L 104 82 L 84 93 C 80 95 75 91 76 87 L 80 65 L 64 49 C 61 46 63 41 67 40 L 89 36 L 100 16 C 102 12 106 12 108 16 Z"
          fill="#FFC72C"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />
        {/* Left Orange Shading on Star */}
        <path
          d="M 104 20 L 91 39 L 71 43 L 85 58 L 81 82 L 104 71 Z"
          fill="#FF9F1C"
        />
      </g>

      {/* Animated Coral Sparkle Dot */}
      <circle
        cx="148"
        cy="88"
        r="6.5"
        fill="#EE6055"
        style={{
          transformOrigin: '148px 88px',
          animation: 'dotPulse 1.8s ease-in-out infinite',
        }}
      />

      {/* Animated Thumbs-Up Hand & Blue Cuff */}
      <g
        style={{
          transformOrigin: '115px 168px',
          animation: 'thumbRock 1.8s ease-in-out infinite',
        }}
      >
        {/* Thumbs-Up Hand Body */}
        <path
          d="M 96 146 L 114 106 C 118 96 130 95 136 102 C 141 108 141 118 138 128 L 135 138 H 170 C 182 138 190 147 188 159 L 182 198 C 180 210 170 218 156 218 H 96 Z"
          fill="#D96B59"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Darker Terracotta Shading on Left of Hand */}
        <path
          d="M 98 148 L 115 110 C 118 103 125 102 129 106 C 122 122 120 145 122 213 H 98 Z"
          fill="#BF5747"
        />

        {/* Blue Sleeve Cuff */}
        <rect
          x="52"
          y="138"
          width="46"
          height="82"
          rx="6"
          fill="#2EA3D0"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Lighter Cyan Highlight on Right of Cuff */}
        <rect x="74" y="143" width="19" height="72" fill="#4CC3EB" />

        {/* White Cuff Button */}
        <circle cx="75" cy="160" r="5" fill="#FFFFFF" />
      </g>
    </svg>
  );
};
