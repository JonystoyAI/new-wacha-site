import React, { useState, useEffect, useRef } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatioClassName?: string;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  children?: React.ReactNode;
  showLoaderBadge?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  badgeLabel?: string;
}

/**
 * ImageWithSkeleton
 * Production-ready image component with:
 * - Shimmer skeleton state matching brutalist design system
 * - Blur-up transition on image load to eliminate perceived latency and CLS
 * - Carousel and dynamic source change handling
 * - Fallback error handling
 */
export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatioClassName = '',
  loading = 'lazy',
  fallbackSrc,
  onError,
  children,
  showLoaderBadge = true,
  referrerPolicy,
  badgeLabel = 'CARGANDO ASSET'
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Sync state when src changes (e.g., carousel navigation)
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);

    // If image is already cached in memory by browser, mark as loaded instantly
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setHasError(true);
    setIsLoaded(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-zinc-950 ${aspectRatioClassName} ${containerClassName}`}
    >
      {/* Skeleton Shimmer Overlay */}
      <div
        className={`absolute inset-0 skeleton-shimmer z-0 transition-opacity duration-500 pointer-events-none select-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden={isLoaded}
      >
        {/* Subtle Brutalist Corner Guides */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-zinc-600/70" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-zinc-600/70" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-zinc-600/70" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-zinc-600/70" />

        {/* Discreet Tech Badge */}
        {showLoaderBadge && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-zinc-700/80 font-jetbrains text-[9px] text-zinc-300 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 bg-[#D4FF00] animate-pulse"></span>
              <span className="tracking-widest uppercase">{badgeLabel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Actual Image with Blur-Up and Smooth Fade */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={loading}
        referrerPolicy={referrerPolicy}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-all duration-700 ease-out ${
          isLoaded
            ? 'opacity-100 filter-none blur-0 scale-100'
            : 'opacity-0 filter blur-md scale-[1.03]'
        } ${className}`}
      />

      {/* Fallback Error View if broken */}
      {hasError && (
        <div className="absolute inset-0 bg-zinc-900 border border-red-900/60 flex flex-col items-center justify-center p-3 text-center z-10">
          <div className="w-2 h-2 bg-[#FF4400] mb-1"></div>
          <p className="font-jetbrains text-[10px] text-zinc-400">IMAGEN NO DISPONIBLE</p>
          <span className="font-jetbrains text-[9px] text-zinc-600 truncate max-w-full px-2">{alt}</span>
        </div>
      )}

      {/* Overlay badges / controls / children */}
      {children}
    </div>
  );
};
