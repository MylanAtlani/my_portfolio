'use client';

import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn, sectionHeader, viewportOnce } from '@/lib/motion';
import { testimonials } from '@/data/testimonials';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[, direction], setPage] = useState([0, 0]);
  const isPaused = useRef(false);

  const paginate = useCallback(
    (newDirection: number) => {
      const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length;
      setCurrentIndex(newIndex);
      setPage([newIndex, newDirection]);
    },
    [currentIndex]
  );

  const goTo = useCallback(
    (index: number) => {
      const dir = index > currentIndex ? 1 : -1;
      setCurrentIndex(index);
      setPage([index, dir]);
    },
    [currentIndex]
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        paginate(1);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
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

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {/* Main Testimonial */}
          <div className="nothing-card p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto relative overflow-hidden min-h-[360px] sm:min-h-[320px]">
            <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-5 rounded-3xl transition-colors duration-500`}></div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[var(--nothing-orange)] mb-6 sm:mb-8" />
                </motion.div>

                {/* Content */}
                <blockquote className="nothing-text text-lg sm:text-xl lg:text-2xl font-light leading-relaxed mb-8 sm:mb-12">
                  &ldquo;{current.content}&rdquo;
                </blockquote>

                {/* Rating - Stars with stagger */}
                <div className="flex items-center space-x-1 mb-6 sm:mb-8">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 400 }}
                    >
                      <Star
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          i < current.rating ? 'text-[var(--nothing-orange)] fill-current' : 'text-white/20'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 nothing-glass rounded-full flex items-center justify-center text-xl sm:text-2xl">
                      {current.avatar}
                    </div>
                    <div>
                      <div className="nothing-text font-medium text-sm sm:text-base">{current.name}</div>
                      <div className="nothing-text text-xs sm:text-sm opacity-60">
                        {current.role} &bull; {current.company}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold">
                      {current.logo}
                    </div>
                    {current.metrics && (
                      <div className="px-3 py-1 nothing-glass rounded-full text-xs font-medium">{current.metrics}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8 sm:mt-12">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 sm:w-8 h-2 sm:h-3 bg-[var(--nothing-orange)]'
                      : 'w-2 h-2 sm:w-3 sm:h-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-10 h-10 sm:w-12 sm:h-12 nothing-glass rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mt-16 sm:mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {[
            { value: '8+', label: t('metrics.experience') },
            { value: '15+', label: t('metrics.delivered') },
            { value: '100%', label: t('metrics.satisfaction') },
          ].map((stat) => (
            <motion.div key={stat.value} className="text-center" variants={scaleIn}>
              <div className="nothing-title text-2xl sm:text-3xl lg:text-4xl font-light mb-2 nothing-gradient-text">{stat.value}</div>
              <div className="nothing-text text-xs sm:text-sm opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
