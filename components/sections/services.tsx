'use client';

import { useTranslations } from 'next-intl';
import {
  Server,
  Zap,
  Clock,
  Users,
  Calculator,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, sectionHeader, viewportOnce } from '@/lib/motion';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
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
  const services: Service[] = [
    {
      id: 'cto-fractionne',
      icon: Users,
      title: t('cto.title'),
      description: t('cto.description'),
      duration: t('cto.duration'),
      price: t('cto.price'),
      features: Array.from({ length: 6 }, (_, i) => t(`cto.features.${i}`)),
      color: 'var(--nothing-blue)',
      gradient: 'from-blue-400 to-indigo-500',
      popular: true,
    },
    {
      id: 'lead-dev',
      icon: Server,
      title: t('lead.title'),
      description: t('lead.description'),
      duration: t('lead.duration'),
      price: t('lead.price'),
      features: Array.from({ length: 6 }, (_, i) => t(`lead.features.${i}`)),
      color: 'var(--nothing-green)',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      id: 'audit-express',
      icon: Zap,
      title: t('audit.title'),
      description: t('audit.description'),
      duration: t('audit.duration'),
      price: t('audit.price'),
      features: Array.from({ length: 6 }, (_, i) => t(`audit.features.${i}`)),
      color: 'var(--nothing-orange)',
      gradient: 'from-orange-400 to-red-500',
    },
  ];

  return (
    <section id="services" className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 nothing-gradient-green rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16 lg:mb-20"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('title')}
          </h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 nothing-glass rounded-full">
            <div className="nothing-status"></div>
            <Clock className="w-4 h-4 text-[var(--nothing-green)]" />
            <span className="nothing-text text-sm font-medium">{t('available')}</span>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                className="nothing-card group relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.3 } }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--nothing-orange)] text-black text-xs font-bold rounded-full z-10">
                    {t('popular')}
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 nothing-glass">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>

                  <h3 className="nothing-title text-lg sm:text-xl font-light mb-3">{service.title}</h3>
                  <p className="nothing-text text-sm opacity-70 mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 opacity-60" />
                      <span className="nothing-text text-xs sm:text-sm opacity-60">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 opacity-60" />
                      <span className="nothing-text text-xs sm:text-sm font-medium">{service.price}</span>
                    </div>
                  </div>

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
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
