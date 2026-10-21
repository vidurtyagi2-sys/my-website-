import React from 'react';

interface HappyCustomerGearIconProps {
  className?: string;
}

/**
 * Animated Happy Customer Gear Icon matching the uploaded video:
 * - Rotating blue gear cog with navy outline
 * - Yellow/orange smiling face in the center
 * - Animated yellow motion arc lines at bottom-left
 */
export const HappyCustomerGearIcon: React.FC<HappyCustomerGearIconProps> = ({
  className = 'w-14 h-14',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Animated Yellow Motion Arcs (Bottom-Left) */}
      <g className="animate-pulse">
        <path
          d="M 28 182 A 104 104 0 0 0 66 218"
          stroke="#FFC629"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 46 172 A 86 86 0 0 0 76 200"
          stroke="#FFC629"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>

      {/* Rotating Outer Blue Gear */}
      <g
        className="origin-[124px_116px] animate-[spin_9s_linear_infinite]"
        style={{ transformOrigin: '124px 116px' }}
      >
        <path
          d="M 111 26 L 137 26 L 142 44 C 149 46 155 49 161 53 L 178 43 L 196 61 L 186 78 C 190 84 193 90 195 97 L 214 103 L 214 129 L 195 135 C 193 142 190 148 186 154 L 196 171 L 178 189 L 161 179 C 155 183 149 186 142 188 L 137 206 L 111 206 L 106 188 C 99 186 93 183 87 179 L 70 189 L 52 171 L 62 154 C 58 148 55 142 53 135 L 34 129 L 34 103 L 53 97 C 55 90 58 84 62 78 L 52 61 L 70 43 L 87 53 C 93 49 99 46 106 44 Z"
          fill="#2EA3D0"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Lighter Cyan Highlight on Outer Gear */}
        <path
          d="M 124 44 A 72 72 0 1 1 62 152 A 66 66 0 1 0 124 44 Z"
          fill="#4CC3EB"
          opacity="0.65"
        />
      </g>

      {/* Center Smiling Face Circle */}
      <g>
        {/* Orange/Gold Base Circle */}
        <circle
          cx="124"
          cy="116"
          r="46"
          fill="#FF9F1C"
          stroke="#062B61"
          strokeWidth="9"
        />
        {/* Bright Yellow Inner Highlight */}
        <circle cx="128" cy="113" r="37" fill="#FFCA28" />

        {/* Left Happy Eye Arc */}
        <path
          d="M 101 106 C 104 99, 113 99, 116 106"
          stroke="#062B61"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Happy Eye Arc */}
        <path
          d="M 132 106 C 135 99, 144 99, 147 106"
          stroke="#062B61"
          strokeWidth="7.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Big Happy Smile */}
        <path
          d="M 100 122 C 107 140, 141 140, 148 122"
          stroke="#062B61"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
