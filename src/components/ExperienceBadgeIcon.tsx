import React from 'react';

interface ExperienceBadgeIconProps {
  className?: string;
}

/**
 * Animated 10+ Years of Experience Certified Technician Icon:
 * - Matching flat illustration style (navy #062B61 outline, cyan-blue #2EA3D0, gold #FFC72C, coral #EE6055)
 * - Animated golden award badge & crossed mechanic wrench with sparkle
 */
export const ExperienceBadgeIcon: React.FC<ExperienceBadgeIconProps> = ({
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
      <style>
        {`
          @keyframes badgeFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(3deg); }
          }
          @keyframes wrenchTurn {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-10deg); }
          }
          @keyframes expSparkle {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.25); opacity: 0.75; }
          }
        `}
      </style>

      {/* Animated Sparkle Dots */}
      <circle
        cx="46"
        cy="60"
        r="7"
        fill="#FFC72C"
        style={{
          transformOrigin: '46px 60px',
          animation: 'expSparkle 1.8s ease-in-out infinite',
        }}
      />
      <circle
        cx="196"
        cy="66"
        r="6"
        fill="#EE6055"
        style={{
          transformOrigin: '196px 66px',
          animation: 'expSparkle 1.8s ease-in-out infinite 0.4s',
        }}
      />

      {/* Animated Blue Ribbon Tails at Bottom */}
      <g
        style={{
          transformOrigin: '120px 145px',
          animation: 'badgeFloat 2.2s ease-in-out infinite',
        }}
      >
        {/* Left Ribbon */}
        <path
          d="M 88 148 L 66 212 L 92 198 L 108 216 L 118 156 Z"
          fill="#2EA3D0"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />
        {/* Right Ribbon */}
        <path
          d="M 152 148 L 174 212 L 148 198 L 132 216 L 122 156 Z"
          fill="#4CC3EB"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Outer Scalloped Rosette / Seal in Coral-Red */}
        <path
          d="M 120 26 L 136 35 L 154 31 L 164 47 L 181 53 L 182 71 L 195 85 L 187 102 L 192 120 L 178 132 L 174 150 L 156 154 L 144 168 L 126 163 L 110 170 L 96 157 L 78 156 L 72 138 L 56 128 L 60 110 L 50 94 L 62 80 L 62 61 L 78 53 L 86 36 L 104 38 Z"
          fill="#EE6055"
          stroke="#062B61"
          strokeWidth="9"
          strokeLinejoin="round"
        />

        {/* Inner Gold Medallion Circle */}
        <circle
          cx="120"
          cy="98"
          r="50"
          fill="#FF9F1C"
          stroke="#062B61"
          strokeWidth="9"
        />
        <circle cx="123" cy="95" r="40" fill="#FFC72C" />

        {/* Animated Mechanic Wrench Inside Medallion */}
        <g
          style={{
            transformOrigin: '120px 98px',
            animation: 'wrenchTurn 2s ease-in-out infinite',
          }}
        >
          <path
            d="M 102 116 L 128 90 C 126 80 132 70 142 70 C 145 70 148 71 150 73 L 141 82 L 146 87 L 155 78 C 157 80 158 83 158 86 C 158 96 148 102 138 100 L 112 126 C 107 131 100 131 96 127 C 92 123 92 116 97 111 Z"
            fill="#FFFFFF"
            stroke="#062B61"
            strokeWidth="7.5"
            strokeLinejoin="round"
          />
          {/* Certified Star Accent */}
          <circle cx="101" cy="81" r="6" fill="#062B61" />
        </g>
      </g>
    </svg>
  );
};
