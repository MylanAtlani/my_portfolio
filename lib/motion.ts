import { Variants } from 'framer-motion';

// Shared easing curves
const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

// ─── Fade & Slide Variants ──────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

// ─── Scale Variants ─────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Container / Stagger Variants ───────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ─── Nothing OS Specific ────────────────────────────────────

/** Dot grid reveal — each dot scales from 0 with staggered delay */
export const dotGridReveal: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

/** Character-by-character text reveal with blur */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  }),
};

// ─── Section Header Variant ─────────────────────────────────

export const sectionHeader: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_SMOOTH,
    },
  },
};

// ─── Viewport config presets ────────────────────────────────

export const viewportOnce = { once: true, amount: 0.15 } as const;
export const viewportOnceMobile = { once: true, amount: 0.08 } as const;
