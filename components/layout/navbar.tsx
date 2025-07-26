'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('navigation');

  const navigation = [
    { name: t('home'), href: '#home' },
    { name: t('expertise'), href: '#expertise' },
    { name: t('technologies'), href: '#technologies' },
    { name: t('projects'), href: '#projects' },
    { name: t('services'), href: '#services' },
    { name: t('contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nothing-glass shadow-lg backdrop-blur-2xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Nothing OS */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 nothing-status scale-75 sm:scale-100"></div>
            </div>
            <span className="nothing-title text-lg sm:text-2xl font-light tracking-widest">
              M·A
            </span>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative group py-2 nothing-text text-sm font-medium transition-all duration-300 hover:text-(--nothing-orange) cursor-pointer select-none"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'nothing-slide-up 0.6s ease-out'
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/40 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Status online - Hidden on small mobile, visible on sm+ */}
            <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-1 nothing-glass rounded-full">
              <div className="nothing-status scale-75 sm:scale-100"></div>
              <span className="text-xs font-medium hidden md:inline">online</span>
              <span className="text-xs font-medium md:hidden">•</span>
            </div>

            {/* Theme & Language - Compact on mobile */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 nothing-glass rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-110"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <X 
                  className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                    isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                  }`}
                />
                <Menu 
                  className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                    isOpen ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-screen opacity-100 pb-4 sm:pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <div className="grid gap-3 sm:gap-4">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block py-2 sm:py-3 px-3 sm:px-4 nothing-glass rounded-lg sm:rounded-xl nothing-text font-medium transition-all duration-300 hover:scale-105 hover:text-(--nothing-orange) text-sm sm:text-base cursor-pointer select-none"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'nothing-slide-up 0.6s ease-out' : 'none'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Status - Compact version */}
            <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-6 p-2 sm:p-3 nothing-glass rounded-lg sm:rounded-xl">
              <div className="nothing-status scale-75 sm:scale-100"></div>
              <span className="text-xs sm:text-sm font-medium">Disponible pour projets</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 