'use client';

import * as React from 'react';
import { useStyle } from '@/providers/style-provider';
import { cn } from '@/lib/utils';

export function StyleToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { style, toggleStyle } = useStyle();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-12 sm:h-12 nothing-glass rounded-lg sm:rounded-xl animate-pulse"></div>
    );
  }

  const isLiquidGlass = style === 'liquid-glass';

  return (
    <button
      onClick={toggleStyle}
      className={cn(
        'relative w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl',
        'transition-all duration-300 hover:scale-110 group overflow-hidden',
        isLiquidGlass ? 'liquid-glass liquid-glass-depth-1' : 'nothing-glass'
      )}
      aria-label={isLiquidGlass ? 'Switch to Nothing OS style' : 'Switch to Liquid Glass style'}
      aria-pressed={isLiquidGlass}
      title={isLiquidGlass ? 'Switch to Nothing OS style' : 'Switch to Liquid Glass style'}
    >
      {/* Background glow */}
      <div className={cn(
        'absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-500',
        isLiquidGlass
          ? 'bg-blue-500/10 group-hover:bg-blue-500/20'
          : 'bg-orange-500/10 group-hover:bg-orange-500/20'
      )}></div>

      {/* Nothing OS Icon (Dots Grid) */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center',
        'transition-all duration-300',
        isLiquidGlass ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
      )}>
        <div className="grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-current"
              style={{ color: 'var(--nothing-orange)' }}
            />
          ))}
        </div>
      </div>

      {/* Liquid Glass Icon (Glass Panel) */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center',
        'transition-all duration-300',
        isLiquidGlass ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
      )}>
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: 'var(--nothing-blue)' }}
        >
          {/* Glass panel with window decoration */}
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M3 8h18" strokeOpacity="0.5" />
          <circle cx="7" cy="5.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="5.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="13" cy="5.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Animated border */}
      <div className={cn(
        'absolute inset-0 rounded-lg sm:rounded-xl border transition-all duration-300',
        isLiquidGlass
          ? 'border-blue-500/20 group-hover:border-blue-500/40'
          : 'border-orange-500/20 group-hover:border-orange-500/40'
      )}></div>
    </button>
  );
}
