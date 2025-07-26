'use client';

import { useTheme } from 'next-themes';
import { OptimizedImage } from './optimized-image';
import { useEffect, useState } from 'react';

interface LogoSwitchProps {
  src: string;
  alt: string;
  className?: string;
}

export function LogoSwitch({ src, alt, className = '' }: LogoSwitchProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Éviter l'hydration mismatch
  if (!mounted) {
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        preset="logo"
        className={`object-contain opacity-90 hover:opacity-100 transition-all duration-300 ${className}`}
      />
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      preset="logo"
      className={`object-contain opacity-90 hover:opacity-100 transition-all duration-300 ${
        isDark 
          ? 'filter brightness-0 invert' 
          : 'filter grayscale(1) brightness-50 contrast-150'
      } ${className}`}
    />
  );
} 