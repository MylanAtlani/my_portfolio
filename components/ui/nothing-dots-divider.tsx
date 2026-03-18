'use client';

import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

interface SectionDividerProps {
  className?: string;
}

export function NothingDotsDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center py-4 sm:py-12 ${className}`}>
      <motion.div
        className="w-full max-w-xs sm:max-w-md h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.3) 30%, rgba(255,71,87,0.4) 50%, rgba(255,107,53,0.3) 70%, transparent 100%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}
