'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

/** Animated wrapper for the project hero content */
export function AnimatedHero({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children appearing one after another */
export function AnimatedStagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

/** Individual stagger item */
export function AnimatedStaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}

/** Scroll-triggered section with fade-in-up */
export function AnimatedSection({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
}) {
  const variants = {
    fadeUp: fadeInUp,
    slideLeft: slideInLeft,
    slideRight: slideInRight,
    scaleIn: scaleIn,
  };

  return (
    <motion.section
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

/** Grid container with stagger for scroll-triggered children */
export function AnimatedGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** Animated card with hover effect */
export function AnimatedCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
}

/** Stats grid with scale-in animation */
export function AnimatedStatCard({ children, className = '', index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
}

/** Tags/badges with stagger animation */
export function AnimatedTags({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

/** Project navigation at bottom */
export function AnimatedNavigation({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
