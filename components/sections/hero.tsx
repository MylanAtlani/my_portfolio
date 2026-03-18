'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { charReveal, fadeInUp, staggerContainer, scaleIn } from '@/lib/motion';
import { CountUp } from '@/components/ui/count-up';

function AnimatedTitle({
  text,
  className,
  charClassName,
  delay = 0,
  lineHeight,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  lineHeight?: number;
}) {
  const chars = text.split('');
  return (
    <motion.span
      className={cn('nothing-title inline-block', className)}
      style={lineHeight ? { lineHeight } : undefined}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={charReveal}
          className={cn('inline-block', charClassName)}
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function HeroSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const handleScrollTo = (elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[calc(100svh-var(--nav-h)-var(--scroll-indicator-h))] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-[var(--nav-h)] pb-[var(--scroll-indicator-h)]"
    >
      <motion.div
        className="max-w-7xl mx-auto w-full py-8 sm:py-0"
        style={{ y: backgroundY }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Left column — Main content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 nothing-glass rounded-full mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            >
              <div className="nothing-status scale-75 sm:scale-100"></div>
              <span className="nothing-text text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">{t('home.status')}</span>
                <span className="sm:hidden">{t('home.available')}</span>
              </span>
            </motion.div>

            {/* Name — Split on two lines */}
            <h1>
              <AnimatedTitle
                text="ATLANI"
                className="block text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none tracking-tight"
              />
              <AnimatedTitle
                text="Mylan"
                className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mt-2 sm:mt-4 pb-4 sm:pb-6"
                charClassName="nothing-gradient-text"
                lineHeight={1.4}
                delay={6}
              />
            </h1>

            {/* Decorative line */}
            <motion.div
              className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 rounded-full mx-auto lg:mx-0 mt-6 sm:mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
            />

            {/* Title */}
            <motion.h2
              className="nothing-text text-base sm:text-xl md:text-2xl lg:text-3xl font-light opacity-80 mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
            >
              {t('home.title')}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="nothing-text text-sm sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 mt-4 sm:mt-6 mb-8 sm:mb-12 opacity-70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 }}
            >
              {t('home.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center lg:justify-start items-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 1.0 }}
            >
              <motion.button
                variants={fadeInUp}
                onClick={() => handleScrollTo('#projects')}
                className="w-full sm:w-auto nothing-btn-primary flex items-center justify-center space-x-2 sm:space-x-3 group text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="hidden sm:inline">{t('home.cta')}</span>
                <span className="sm:hidden">{t('projects.title')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                variants={fadeInUp}
                onClick={() => handleScrollTo('#contact')}
                className="w-full sm:w-auto nothing-btn-secondary flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{t('home.ctaContact')}</span>
                <span className="sm:hidden">{t('contact.title')}</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right column — Stats */}
          <motion.div
            className="mt-12 lg:mt-0 lg:border-l lg:border-white/10 lg:pl-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 1.2 }}
          >
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-8 lg:gap-12">
              {[
                { value: 8, suffix: '+', label: t('stats.years') },
                { value: 50, suffix: '+', label: t('stats.projects') },
                { value: 100, suffix: '%', label: t('stats.satisfaction') },
              ].map((stat) => (
                <motion.div key={stat.label} className="text-center lg:text-left" variants={scaleIn}>
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    className="nothing-title text-xl sm:text-3xl md:text-4xl lg:text-5xl nothing-gradient-text"
                  />
                  <div className="nothing-text text-xs sm:text-sm opacity-60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/40 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
