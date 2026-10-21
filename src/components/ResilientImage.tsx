import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'SAHAJ CAPITAL AUTOMOBILE',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-red-500 via-[#DC2626] to-red-700 flex flex-col items-center justify-center p-6 text-black text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Wrench className="w-10 h-10 text-black mb-2" />
        <span className="text-xs font-bold tracking-wide text-black">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
