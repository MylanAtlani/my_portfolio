'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { staticBlurDataURL, imagePresets, type ImagePreset } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  preset?: ImagePreset;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className,
  quality,
  priority = false,
  placeholder,
  blurDataURL,
  preset,
  onLoad,
  onError,
}: OptimizedImageProps) {
  // Appliquer les presets si fournis
  const presetConfig = preset ? imagePresets[preset] : null;
  const finalQuality = quality ?? presetConfig?.quality ?? 85;
  const finalSizes = sizes ?? presetConfig?.sizes;
  const finalPlaceholder = placeholder ?? presetConfig?.placeholder ?? 'empty';
  const finalBlurDataURL = blurDataURL ?? (finalPlaceholder === 'blur' ? staticBlurDataURL : undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400",
          className
        )}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <span className="text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className={cn("relative", fill && "w-full h-full")}>
      {isLoading && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded",
            className
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={finalSizes}
        quality={finalQuality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        placeholder={finalPlaceholder}
        blurDataURL={finalBlurDataURL}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
} 