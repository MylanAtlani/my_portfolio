'use client';

import { useTranslations } from 'next-intl';
import { technologies } from '@/data/technologies';
import { LegacyTechnology } from '@/types/legacy';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { dotGridReveal, sectionHeader, viewportOnce } from '@/lib/motion';

function AnimatedYears({ value, inView }: { value: number; inView: boolean }) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return unsubscribe;
  }, [springVal]);

  return <span ref={ref}>0</span>;
}

export function TechnologiesSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="technologies" ref={sectionRef} className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient from-[var(--nothing-orange)]/3 via-transparent to-[var(--nothing-blue)]/3"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            {t('technologies.title')}
          </h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            {t('technologies.subtitle')}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {technologies.map((tech: LegacyTechnology, index: number) => {
            const TechIcon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                className="group relative"
                custom={index}
                variants={dotGridReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(255,107,53,0.15)', transition: { duration: 0.3 } }}
              >
                <div className="nothing-glass rounded-2xl p-4 sm:p-6 h-full flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-[var(--nothing-orange)]/10">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center nothing-glass border border-[var(--nothing-orange)]/20"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  >
                    <TechIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--nothing-orange)]" />
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-2">
                    <span className="nothing-text font-semibold text-sm sm:text-base group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                      {tech.name}
                    </span>
                    <span className="nothing-title text-lg sm:text-xl text-[var(--nothing-orange)] font-light tracking-wider block">
                      <AnimatedYears value={tech.years} inView={isInView} /> {t('technologies.years')}
                    </span>
                  </div>

                  {/* Expertise dots */}
                  <div className="flex space-x-1">
                    {[...Array(Math.min(tech.years || 0, 5))].map((_, i: number) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--nothing-orange)]"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.6, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ delay: index * 0.03 + i * 0.08, duration: 0.3 }}
                        whileHover={{ opacity: 1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
