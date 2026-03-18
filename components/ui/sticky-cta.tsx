'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function StickyCTA() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const contactSection = document.getElementById('contact');
      const contactVisible = contactSection
        ? contactSection.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(scrollPercent > 0.3 && !contactVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 nothing-glass rounded-full px-5 py-3 sm:px-6 sm:py-3.5 flex items-center space-x-2 group shadow-lg shadow-[var(--nothing-orange)]/20 border border-[var(--nothing-orange)]/20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,53,0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nothing-orange)]" />
          <span className="nothing-text text-sm font-medium hidden sm:inline">{t('home.ctaContact')}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
