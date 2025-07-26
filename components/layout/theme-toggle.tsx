'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-12 sm:h-12 nothing-glass rounded-lg sm:rounded-xl animate-pulse"></div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 sm:w-12 sm:h-12 nothing-glass rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-500 ${
        isDark 
          ? 'bg-blue-500/10 group-hover:bg-blue-500/20' 
          : 'bg-yellow-500/10 group-hover:bg-yellow-500/20'
      }`}></div>
      
      {/* Icons container */}
      <div className="relative flex items-center justify-center w-full h-full">
        <Sun 
          className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon 
          className={`absolute w-4 h-4 sm:w-5 sm:h-5 text-blue-400 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-lg sm:rounded-xl border transition-all duration-300 ${
        isDark 
          ? 'border-blue-500/20 group-hover:border-blue-500/40' 
          : 'border-yellow-500/20 group-hover:border-yellow-500/40'
      }`}></div>
    </button>
  );
} 