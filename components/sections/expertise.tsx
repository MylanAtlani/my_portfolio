'use client';

import { useTranslations } from 'next-intl';
import { features } from '@/data/features';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, sectionHeader, viewportOnce } from '@/lib/motion';

export function ExpertiseSection() {
  const t = useTranslations();

  return (
    <section id="expertise" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('expertise.title')}
          </h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            {t('expertise.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="nothing-card text-center group"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-colors duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                    border: `1px solid ${feature.color}30`,
                  }}
                  whileHover={{ rotate: 5, scale: 1.15, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <IconComponent
                    className="w-8 sm:w-10 h-8 sm:h-10"
                    style={{ color: feature.color }}
                  />
                </motion.div>
                <h3 className="nothing-title text-lg sm:text-xl lg:text-2xl font-light mb-3 sm:mb-4">{feature.title}</h3>
                <p className="nothing-text opacity-70 leading-relaxed text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
