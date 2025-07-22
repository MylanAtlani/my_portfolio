'use client';

import * as React from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'fr' ? 'en' : 'fr';
    router.push(pathname, { locale: newLocale });
  };

  const languages = {
    fr: { 
      code: 'FR', 
      name: 'Français', 
      flag: '🇫🇷',
      color: 'text-blue-500'
    },
    en: { 
      code: 'EN', 
      name: 'English', 
      flag: '🇺🇸',
      color: 'text-red-500'
    }
  };

  const currentLang = languages[currentLocale as keyof typeof languages];
  const nextLang = languages[currentLocale === 'fr' ? 'en' : 'fr'];

  return (
    <button
      onClick={toggleLanguage}
      className="relative w-9 h-9 sm:w-12 sm:h-12 nothing-glass rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110 group overflow-hidden"
      title={`Switch to ${nextLang.name}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Current language display */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <span className="text-xs font-bold nothing-text transition-colors duration-300 group-hover:text-(--nothing-orange)">
          {currentLang.code}
        </span>
        <span className="text-xs opacity-70 transition-all duration-300 group-hover:opacity-100 hidden sm:block">
          {currentLang.flag}
        </span>
      </div>
      
      {/* Next language preview (appears on hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-60 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-xs font-bold text-(--nothing-orange)">
          {nextLang.code}
        </span>
        <span className="text-xs hidden sm:block">
          {nextLang.flag}
        </span>
      </div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-white/10 group-hover:border-(--nothing-orange)/40 transition-all duration-300"></div>
    </button>
  );
} 