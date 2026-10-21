import React from 'react';

interface SocialIconProps {
  className?: string;
}

export const FacebookIcon: React.FC<SocialIconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" fill="#1877F2" />
    <path
      d="M29.6 31.2L30.7 24.3H24.1V19.8C24.1 17.9 25 16 28.1 16H31.2V10.1C31.2 10.1 28.4 9.6 25.7 9.6C20.1 9.6 16.4 13 16.4 19.2V24.3H10.2V31.2H16.4V45.8C18.9 46.2 21.5 46.2 24.1 45.8V31.2H29.6Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const InstagramIcon: React.FC<SocialIconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="instaGrad"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(14 44) rotate(-55) scale(46)"
      >
        <stop offset="0%" stopColor="#FED576" />
        <stop offset="26%" stopColor="#F47133" />
        <stop offset="61%" stopColor="#BC3081" />
        <stop offset="100%" stopColor="#4C63D2" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#instaGrad)" />
    <rect
      x="11"
      y="11"
      width="26"
      height="26"
      rx="7"
      stroke="#FFFFFF"
      strokeWidth="3.2"
    />
    <circle cx="24" cy="24" r="6.2" stroke="#FFFFFF" strokeWidth="3.2" />
    <circle cx="31.5" cy="16.5" r="2" fill="#FFFFFF" />
  </svg>
);

export const YouTubeIcon: React.FC<SocialIconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect x="2" y="8" width="44" height="32" rx="9" fill="#FF0000" />
    <path d="M20 17.5L31.5 24L20 30.5V17.5Z" fill="#FFFFFF" />
  </svg>
);

export const LinkedInIcon: React.FC<SocialIconProps> = ({
  className = 'w-5 h-5',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="none"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="42" height="42" rx="9" fill="#0A66C2" />
    <circle cx="14.8" cy="14.5" r="3.4" fill="#FFFFFF" />
    <rect x="11.8" y="20.5" width="6" height="16.5" rx="1" fill="#FFFFFF" />
    <path
      d="M21.5 20.5H27.1V22.9C28 21.3 30 20 32.9 20C37.6 20 39.2 23 39.2 27.6V37H33.2V28.6C33.2 26.3 32.5 24.9 30.3 24.9C28.1 24.9 27.5 26.5 27.5 28.6V37H21.5V20.5Z"
      fill="#FFFFFF"
    />
  </svg>
);
