'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { Menu, X, Home } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface NavbarProps {
  simplified?: boolean;
}

export function Navbar({ simplified = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('navigation');
  const params = useParams();
  const locale = params?.locale as string || 'fr';

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

  if (simplified) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 nothing-glass shadow-lg backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Nothing OS */}
            <Link href={`/${locale}`} className="flex items-center space-x-2 sm:space-x-3 group hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 nothing-status scale-75 sm:scale-100"></div>
              </div>
              <span className="nothing-title text-lg sm:text-2xl font-light tracking-widest">
                M·A
              </span>
            </Link>

            {/* Home Link + Controls */}
            <div className="flex items-center space-x-4">
              {/* Retour Home */}
              <Link 
                href={`/${locale}`}
                className="hidden sm:flex items-center gap-2 nothing-glass rounded-xl px-4 py-2 hover:scale-105 transition-all duration-300 group"
              >
                <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" style={{ color: 'var(--nothing-orange)' }} />
                <span className="nothing-text text-sm font-medium">{t('home')}</span>
              </Link>

              {/* Theme & Language Toggles */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              {/* Menu mobile */}
              <div className="sm:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="nothing-glass rounded-lg p-2 transition-colors duration-200"
                  aria-label={t('toggleTheme')}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Menu mobile */}
          {isOpen && (
            <div 
              id="mobile-menu"
              className="sm:hidden border-t border-white/10 backdrop-blur-2xl"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href={`/${locale}`}
                  className="flex items-center gap-3 nothing-glass rounded-xl px-4 py-3 text-sm font-medium hover:scale-105 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-4 h-4" style={{ color: 'var(--nothing-orange)' }} />
                  {t('home')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

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
                className="nothing-text text-sm font-medium hover:opacity-80 transition-opacity duration-300 relative group"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-60"></span>
              </a>
            ))}
          </div>

          {/* Controls Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Menu mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="nothing-glass rounded-lg p-2 transition-colors duration-200"
              aria-label={t('toggleTheme')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-white/10 backdrop-blur-2xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block nothing-glass rounded-xl px-4 py-3 text-sm font-medium hover:scale-105 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Controls mobile */}
              <div className="flex items-center justify-center space-x-4 pt-4 pb-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Composant wrapper qui détecte automatiquement le type de page
export function NavbarWrapper() {
  const pathname = usePathname();
  const isProjectPage = pathname?.includes('/projects/') && pathname?.split('/').length >= 4;

  // Si on est sur une page de projet, ne pas afficher la navbar (elle sera gérée par la page elle-même)
  if (isProjectPage) {
    return null;
  }

  // Sinon, afficher la navbar normale
  return <Navbar />;
} 