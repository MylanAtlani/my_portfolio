'use client';

import { useTranslations } from 'next-intl';
import { useInView } from '@/hooks/use-in-view';
import { technologies } from '@/data/technologies';

export function TechnologiesSection() {
  const t = useTranslations();
  const [techRef, techInView] = useInView({ threshold: 0.3 });

  return (
    <section id="technologies" ref={techRef} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--nothing-orange)]/3 via-transparent to-[var(--nothing-blue)]/3"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('technologies.title')}
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            {t('technologies.subtitle')}
          </p>
        </div>

        {/* Technologies Grid avec design Nothing OS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {technologies.map((tech, index) => {
            const TechIcon = tech.icon;
            return (
              <div 
                key={tech.name} 
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  techInView 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms` 
                }}
              >
                {/* Card avec effet glass Nothing OS */}
                <div className="nothing-glass rounded-2xl p-4 sm:p-6 h-full flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[var(--nothing-orange)]/10">
                  
                  {/* Icône avec conteneur Nothing OS */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center nothing-glass border border-[var(--nothing-orange)]/20 group-hover:scale-110 transition-transform duration-300">
                    <TechIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--nothing-orange)]" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="space-y-2">
                    <span className="nothing-text font-semibold text-sm sm:text-base group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                      {tech.name}
                    </span>
                    
                    <span className="nothing-title text-lg sm:text-xl text-[var(--nothing-orange)] font-light tracking-wider block">
                      {tech.years} {t('technologies.years')}
                    </span>
                  </div>
                  
                  {/* Indicateur d'expertise Nothing OS */}
                  <div className="flex space-x-1">
                    {[...Array(Math.min(tech.years, 5))].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--nothing-orange)] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 