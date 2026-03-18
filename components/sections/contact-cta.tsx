'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, Linkedin, MessageCircle, Globe, ExternalLink, ArrowRight } from 'lucide-react';

function ContactMethodsCompact() {
  const t = useTranslations('contact');

  const methods = [
    {
      id: 'email',
      icon: Mail,
      title: t('email.title'),
      href: 'mailto:atlani.mylan@gmail.com',
      color: 'var(--nothing-blue)',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      title: t('linkedin.title'),
      href: 'https://www.linkedin.com/in/mylan-atlani',
      color: 'var(--nothing-green)',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: t('whatsapp.title'),
      href: 'https://wa.me/330658068199',
      color: 'var(--nothing-orange)',
    },
    {
      id: 'malt',
      icon: Globe,
      title: t('malt.title'),
      href: 'https://malt.fr/profile/mylanatlani',
      color: 'var(--nothing-yellow)',
    },
  ];

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {methods.map((method) => {
        const IconComponent = method.icon;
        return (
          <motion.a
            key={method.id}
            href={method.href}
            target={method.id !== 'email' ? '_blank' : undefined}
            rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2.5 px-4 py-3 nothing-glass rounded-xl border hover:border-white/20 transition-all duration-300 group"
            variants={fadeInUp}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <IconComponent className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: method.color }} />
            <span className="nothing-text text-sm font-medium">{method.title}</span>
            <ExternalLink className="w-3 h-3 nothing-text opacity-0 group-hover:opacity-60 transition-opacity" />
          </motion.a>
        );
      })}
    </motion.div>
  );
}

export function ContactCTASection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Split layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Heading + Contact methods */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <h2 className="nothing-title text-3xl sm:text-4xl lg:text-5xl font-light mb-4 leading-tight">
              {t('title')}
            </h2>

            <motion.div
              className="w-12 h-0.5 bg-[var(--nothing-orange)] rounded-full mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />

            <p className="nothing-text text-sm sm:text-base opacity-70 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Compact contact methods */}
            <ContactMethodsCompact />

            {/* Response time indicator */}
            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.5 }}
            >
              <div className="nothing-status scale-75"></div>
              <span className="nothing-text text-xs opacity-50">
                {t('description')}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
