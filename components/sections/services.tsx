'use client';

import { useInView } from '@/hooks/use-in-view';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Server, 
  Cloud, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Calculator,
  Mail,
  Calendar,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  color: string;
  gradient: string;
  popular?: boolean;
}

export function ServicesSection() {
  const t = useTranslations('services');
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [selectedService, setSelectedService] = useState<string>('cto-fractionne');
  const [duration, setDuration] = useState<number>(3);
  const [showCalculator, setShowCalculator] = useState(false);

  const services: Service[] = [
    {
      id: 'cto-fractionne',
      icon: Users,
      title: t('cto.title'),
      description: t('cto.description'),
      duration: t('cto.duration'),
      price: t('cto.price'),
      features: [
        t('cto.features.0'),
        t('cto.features.1'),
        t('cto.features.2'),
        t('cto.features.3'),
        t('cto.features.4'),
        t('cto.features.5')
      ],
      color: 'var(--nothing-blue)',
      gradient: 'from-blue-400 to-indigo-500',
      popular: true
    },
    {
      id: 'lead-dev',
      icon: Server,
      title: t('lead.title'),
      description: t('lead.description'),
      duration: t('lead.duration'),
      price: t('lead.price'),
      features: [
        t('lead.features.0'),
        t('lead.features.1'),
        t('lead.features.2'),
        t('lead.features.3'),
        t('lead.features.4'),
        t('lead.features.5')
      ],
      color: 'var(--nothing-green)',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'audit-express',
      icon: Zap,
      title: t('audit.title'),
      description: t('audit.description'),
      duration: t('audit.duration'),
      price: t('audit.price'),
      features: [
        t('audit.features.0'),
        t('audit.features.1'),
        t('audit.features.2'),
        t('audit.features.3'),
        t('audit.features.4'),
        t('audit.features.5')
      ],
      color: 'var(--nothing-orange)',
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const currentService = services.find(s => s.id === selectedService);

  const calculateBudget = () => {
    if (!currentService) return 0;
    
    const TJM = 600; // TJM de base
    
    const basePrices = {
      'cto-fractionne': TJM * 12, // 2-3j/semaine = ~12j/mois
      'lead-dev': TJM * 20, // 3-5j/semaine = ~20j/mois
      'audit-express': TJM * 5 // 3-5 jours au total
    };
    
    return basePrices[selectedService as keyof typeof basePrices] * duration;
  };

  return (
    <section id="services" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 nothing-gradient-green rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('title')}
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            <span className="hidden sm:inline">
              {t('subtitle')}
            </span>
            <span className="sm:hidden">
              {t('subtitle')}
            </span>
          </p>
        </div>

        {/* Availability Status */}
        <div className={`flex justify-center mb-12 sm:mb-16 transform transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-3 px-6 py-3 nothing-glass rounded-full">
            <div className="nothing-status"></div>
            <Clock className="w-4 h-4 text-[var(--nothing-green)]" />
            <span className="nothing-text text-sm font-medium">
              {t('available')}
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`nothing-card group cursor-pointer relative overflow-hidden transform transition-all duration-700 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                } ${
                  isSelected ? 'ring-2 ring-[var(--nothing-orange)] scale-105' : 'hover:scale-105'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--nothing-orange)] text-black text-xs font-bold rounded-full">
                    {t('popular')}
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isSelected 
                      ? 'bg-[var(--nothing-orange)] text-black scale-110' 
                      : 'nothing-glass group-hover:scale-110'
                  }`}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="nothing-title text-lg sm:text-xl font-light mb-3">
                    {service.title}
                  </h3>
                  <p className="nothing-text text-sm opacity-70 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 opacity-60" />
                      <span className="nothing-text text-xs sm:text-sm opacity-60">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 opacity-60" />
                      <span className="nothing-text text-xs sm:text-sm font-medium">
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="space-y-1">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-[var(--nothing-green)]" />
                        <span className="nothing-text text-xs opacity-60">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="nothing-text text-xs opacity-40 mt-2">
                        +{service.features.length - 3} autres...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Details & Calculator */}
        {currentService && (
          <div className={`nothing-card p-8 sm:p-12 transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${currentService.gradient} opacity-5 rounded-3xl`}></div>
            
            <div className="relative grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Service Details */}
              <div>
                <h3 className="nothing-title text-2xl sm:text-3xl font-light mb-6">
                  {currentService.title}
                </h3>
                
                <div className="space-y-3 mb-8">
                  {currentService.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[var(--nothing-green)] flex-shrink-0" />
                      <span className="nothing-text text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="nothing-btn-primary flex items-center justify-center space-x-2 group">
                    <Mail className="w-4 h-4" />
                    <span>{t('budget.discuss')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button 
                    onClick={() => setShowCalculator(!showCalculator)}
                    className="nothing-btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>{t('budget.calculator')}</span>
                  </button>
                </div>
              </div>

              {/* Calculator */}
              <div className={`space-y-6 transition-all duration-500 ${
                showCalculator ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4'
              }`}>
                <h4 className="nothing-title text-lg sm:text-xl font-light">
                  {t('budget.title')}
                </h4>

                {/* Duration Selector avec curseur et points */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="nothing-text text-sm">{t('budget.duration')}</span>
                    <span className="nothing-text text-sm font-medium">{duration} {t('budget.months')}</span>
                  </div>
                  
                  {/* Slider avec curseur gros */}
                  <div className="space-y-3">
                    <div className="relative">
                      {/* Track de base */}
                      <div className="h-2 bg-white/10 rounded-full"></div>
                      
                      {/* Track orange rempli */}
                      <div 
                        className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300"
                        style={{ width: `${(duration / 12) * 100}%` }}
                      />
                      
                      {/* Points cliquables */}
                      <div className="absolute top-0 left-0 right-0 grid grid-cols-12 gap-1 h-2">
                        {Array.from({ length: 12 }, (_, index) => {
                          const monthValue = index + 1;
                          const isActive = monthValue <= duration;
                          return (
                            <button
                              key={monthValue}
                              onClick={() => setDuration(monthValue)}
                              className={`relative w-full h-full flex items-center justify-center group`}
                              title={`${monthValue} ${t('budget.months')}`}
                            >
                              {/* Zone cliquable élargie */}
                              <div className="absolute -top-2 -bottom-2 w-full"></div>
                              {/* Point visuel */}
                              <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                isActive 
                                  ? 'bg-orange-300 scale-150' 
                                  : 'bg-white/30 group-hover:bg-white/50'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Curseur gros */}
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-lg border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{ left: `${(duration / 12) * 100}%` }}
                      />
                      
                      {/* Input range invisible pour le drag */}
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    
                    {/* Labels alignés */}
                    <div className="grid grid-cols-12 gap-1 text-xs opacity-50 mt-2">
                      <span className="text-center">1</span>
                      <span></span>
                      <span className="text-center">3</span>
                      <span></span>
                      <span></span>
                      <span className="text-center">6</span>
                      <span></span>
                      <span></span>
                      <span className="text-center">9</span>
                      <span></span>
                      <span></span>
                      <span className="text-center">12</span>
                    </div>
                  </div>
                </div>

                {/* Budget Result */}
                <div className="nothing-glass p-6 rounded-2xl">
                  <div className="text-center">
                    <div className="nothing-text text-sm opacity-60 mb-2">
                      {t('budget.estimated')}
                    </div>
                    <div className="nothing-title text-3xl sm:text-4xl font-light nothing-gradient-text">
                      {calculateBudget().toLocaleString()}€
                    </div>
                    <div className="nothing-text text-xs opacity-50 mt-2">
                      {t('budget.indicative')}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center p-4 nothing-glass rounded-xl">
                  <div className="nothing-text text-xs opacity-60 mb-2">
                    {t('budget.discuss')}
                  </div>
                  <div className="nothing-text text-sm font-medium">
                    atlani.mylan@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 