'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Mail } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations();

  const handleScrollTo = (elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[calc(100svh-var(--nav-h)-var(--scroll-indicator-h))] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-[var(--nav-h)] pb-[var(--scroll-indicator-h)]">
      <div className="max-w-7xl mx-auto text-center nothing-animate-slide-up">
        {/* Status Badge - Responsive */}
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 nothing-glass rounded-full mb-6 sm:mb-8">
          <div className="nothing-status scale-75 sm:scale-100"></div>
          <span className="nothing-text text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">{t('home.status')}</span>
            <span className="sm:hidden">{t('home.available')}</span>
          </span>
        </div>

        {/* Main Title - Very responsive avec line-height corrigé */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <h1 className="nothing-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light nothing-gradient-text pb-4 sm:pb-6" style={{ lineHeight: '1.3' }}>
            ATLANI Mylan
          </h1>
          <h2 className="nothing-text text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light opacity-80">
            {t('home.title')}
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full"></div>
          <p className="nothing-text text-sm sm:text-base md:text-lg opacity-60 max-w-2xl mx-auto px-4 sm:px-0">
            <span className="hidden sm:inline">{t('home.subtitle')}</span>
            <span className="sm:hidden">{t('home.subtitle')}</span>
          </p>
        </div>

        {/* Description - Better mobile text */}
        <p className="nothing-text text-sm sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-12 opacity-70 leading-relaxed px-4 sm:px-0">
          <span className="hidden sm:inline">
            {t('home.description')}
          </span>
          <span className="sm:hidden">
            {t('home.description')}
          </span>
        </p>

        {/* CTA Buttons - Much better mobile layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
          <button 
            onClick={() => handleScrollTo('#projects')}
            className="w-full sm:w-auto nothing-btn-primary flex items-center justify-center space-x-2 sm:space-x-3 group text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
          >
            <span className="hidden sm:inline">{t('home.cta')}</span>
            <span className="sm:hidden">{t('projects.title')}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => handleScrollTo('#contact')}
            className="w-full sm:w-auto nothing-btn-secondary flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{t('home.ctaContact')}</span>
            <span className="sm:hidden">{t('contact.title')}</span>
          </button>
        </div>

        {/* Stats - Compact mobile version */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-2xl mx-auto px-4 sm:px-0">
          <div className="text-center">
            <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">8+</div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              <span className="hidden sm:inline">{t('stats.years')}</span>
              <span className="sm:hidden">{t('stats.years')}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">50+</div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              <span className="hidden sm:inline">{t('stats.projects')}</span>
              <span className="sm:hidden">{t('stats.projects')}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">100%</div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              <span className="hidden sm:inline">{t('stats.satisfaction')}</span>
              <span className="sm:hidden">{t('stats.satisfaction')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on small mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 nothing-animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 