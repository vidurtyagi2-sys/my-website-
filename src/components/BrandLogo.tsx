import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'card';
  showTagline?: boolean;
  className?: string;
}

/**
 * Exact recreation of the attached official SAHAJ CAPITAL AUTOMOBILE logo:
 * - Solid #0D8BDC brand blue rectangle (unchanged as requested: "LOGO KO RED NHI KARNA JESE H VESE H RAKHNA H")
 * - White rounded bold "SAHAJ CAPITAL" / "AUTOMOBILE" stacked inside
 * - #0D8BDC rounded regular "Always committed to service" tagline underneath
 * Preserves proportions without stretching or distortion.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  showTagline = true,
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex flex-col items-center select-none shrink-0 ${className}`}
        aria-label="SAHAJ CAPITAL AUTOMOBILE"
      >
        <div
          className="bg-[#0D8BDC] text-white px-3.5 py-1.5 flex flex-col items-center justify-center leading-none shadow-xs"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="text-[12px] sm:text-[13.5px] font-semibold tracking-[0.04em] text-white whitespace-nowrap">
            SAHAJ CAPITAL
          </span>
          <span className="text-[12px] sm:text-[13.5px] font-semibold tracking-[0.04em] text-white whitespace-nowrap mt-0.5">
            AUTOMOBILE
          </span>
        </div>
        {showTagline && (
          <span
            className="text-[#0D8BDC] text-[8.5px] sm:text-[9.5px] font-normal tracking-tight whitespace-nowrap mt-0.5 leading-none"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Always committed to service
          </span>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`inline-flex flex-col items-center select-none shrink-0 ${className}`}
        aria-label="SAHAJ CAPITAL AUTOMOBILE - Always committed to service"
      >
        <div
          className="bg-[#0D8BDC] text-white px-6 py-3 flex flex-col items-center justify-center leading-tight shadow-xs"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="text-lg sm:text-xl font-semibold tracking-[0.04em] text-white whitespace-nowrap">
            SAHAJ CAPITAL
          </span>
          <span className="text-lg sm:text-xl font-semibold tracking-[0.04em] text-white whitespace-nowrap">
            AUTOMOBILE
          </span>
        </div>
        <span
          className="text-[#0D8BDC] text-xs sm:text-sm font-normal tracking-normal whitespace-nowrap mt-1.5"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          Always committed to service
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center select-none shrink-0 ${className}`}
      aria-label="SAHAJ CAPITAL AUTOMOBILE - Always committed to service"
    >
      <div
        className="bg-[#0D8BDC] text-white px-8 py-4 sm:px-10 sm:py-5 flex flex-col items-center justify-center leading-tight shadow-sm"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        <span className="text-2xl sm:text-3xl font-semibold tracking-[0.04em] text-white whitespace-nowrap">
          SAHAJ CAPITAL
        </span>
        <span className="text-2xl sm:text-3xl font-semibold tracking-[0.04em] text-white whitespace-nowrap mt-0.5">
          AUTOMOBILE
        </span>
      </div>
      <span
        className="text-[#0D8BDC] text-sm sm:text-base font-normal tracking-normal whitespace-nowrap mt-2"
        style={{ fontFamily: "'Fredoka', sans-serif" }}
      >
        Always committed to service
      </span>
    </div>
  );
};
