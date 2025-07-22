'use client';

import { useInView } from '@/hooks/use-in-view';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  logo: string;
  metrics?: string;
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Thomas Berthier',
    role: 'CEO',
    company: 'Ciffréo Bona',
    content: 'Mylan a complètement transformé notre architecture backend. Latence divisée par 2, déploiements fiables, et une stack évolutive. Son expertise Go et NestJS nous a fait gagner des mois de développement.',
    rating: 5,
    avatar: '🚀',
    logo: 'CB',
    metrics: 'Latence -50%',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    name: 'Marie Dubois',
    role: 'Founder',
    company: 'Petpalz.io',
    content: 'En tant que CTO, Mylan a livré une plateforme complète from scratch. API robuste, app mobile Flutter, et infrastructure PostgreSQL prête pour le scale. Accompagnement technique exemplaire.',
    rating: 5,
    avatar: '🐾',
    logo: 'PP',
    metrics: 'MVP en 6 mois',
    gradient: 'from-green-400 to-blue-500'
  },
  {
    name: 'Sophie Martin',
    role: 'CTO',
    company: 'Woman & Luxury',
    content: '6 ans de collaboration ! Architecture scalable sur Azure, équipe structurée, et delivery continu. Mylan maîtrise autant la tech que le produit. Un partenaire de confiance.',
    rating: 5,
    avatar: '💎',
    logo: 'WL',
    metrics: '6 ans ensemble',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    name: 'Jean-Pierre Rousseau',
    role: 'Project Manager',
    company: 'Thales Digital Identity',
    content: 'Mission stratégique carte Vitale numérique. Management multi-sites impeccable, delivery sécurisé respecté, et coordination équipes internationales. Professionnel de très haut niveau.',
    rating: 5,
    avatar: '🛡️',
    logo: 'TD',
    metrics: 'Mission stratégique',
    gradient: 'from-red-400 to-orange-500'
  }
];

export function TestimonialsSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            Témoignages Clients
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            <span className="hidden sm:inline">
              Ce que mes clients apprécient : autonomie, efficacité, et résultats mesurables
            </span>
            <span className="sm:hidden">
              L'avis de mes clients
            </span>
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className={`nothing-card p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[currentIndex].gradient} opacity-5 rounded-3xl`}></div>
            
            <div className="relative">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[var(--nothing-orange)] mb-6 sm:mb-8" />
              
              {/* Content */}
              <blockquote className="nothing-text text-lg sm:text-xl lg:text-2xl font-light leading-relaxed mb-8 sm:mb-12">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6 sm:mb-8">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      i < testimonials[currentIndex].rating 
                        ? 'text-[var(--nothing-orange)] fill-current' 
                        : 'text-white/20'
                    }`} 
                  />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 nothing-glass rounded-full flex items-center justify-center text-xl sm:text-2xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  
                  {/* Info */}
                  <div>
                    <div className="nothing-text font-medium text-sm sm:text-base">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="nothing-text text-xs sm:text-sm opacity-60">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
                
                {/* Company Logo */}
                <div className="ml-auto flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold">
                    {testimonials[currentIndex].logo}
                  </div>
                  {testimonials[currentIndex].metrics && (
                    <div className="px-3 py-1 nothing-glass rounded-full text-xs font-medium">
                      {testimonials[currentIndex].metrics}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8 sm:mt-12">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[var(--nothing-orange)] scale-125' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mt-16 sm:mt-20 transform transition-all duration-1000 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '500ms' }}>
          <div className="text-center">
            <div className="nothing-title text-2xl sm:text-3xl lg:text-4xl font-light mb-2 nothing-gradient-text">
              8+
            </div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              Ans d'expérience
            </div>
          </div>
          <div className="text-center">
            <div className="nothing-title text-2xl sm:text-3xl lg:text-4xl font-light mb-2 nothing-gradient-text">
              15+
            </div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              Projets livrés
            </div>
          </div>
          <div className="text-center">
            <div className="nothing-title text-2xl sm:text-3xl lg:text-4xl font-light mb-2 nothing-gradient-text">
              100%
            </div>
            <div className="nothing-text text-xs sm:text-sm opacity-60">
              Satisfaction client
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 