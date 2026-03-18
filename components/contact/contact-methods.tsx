'use client';

import { useTranslations } from 'next-intl';
import {
  Mail,
  MessageCircle,
  ExternalLink,
  Linkedin,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface ContactMethod {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
  gradient: string;
  popular?: boolean;
}

export function ContactMethods() {
  const t = useTranslations('contact');

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      icon: Mail,
      title: t('email.title'),
      description: t('email.description'),
      action: t('email.action'),
      href: 'mailto:atlani.mylan@gmail.com',
      color: 'var(--nothing-blue)',
      gradient: 'from-blue-400 to-indigo-500',
      popular: true,
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      title: t('linkedin.title'),
      description: t('linkedin.description'),
      action: t('linkedin.action'),
      href: 'https://www.linkedin.com/in/mylan-atlani',
      color: 'var(--nothing-green)',
      gradient: 'from-green-400 to-blue-500',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: t('whatsapp.title'),
      description: t('whatsapp.description'),
      action: t('whatsapp.action'),
      href: 'https://wa.me/330658068199',
      color: 'var(--nothing-orange)',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      id: 'malt',
      icon: Globe,
      title: t('malt.title'),
      description: t('malt.description'),
      action: t('malt.action'),
      href: 'https://malt.fr/profile/mylanatlani',
      color: 'var(--nothing-yellow)',
      gradient: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {contactMethods.map((method) => {
        const IconComponent = method.icon;
        return (
          <motion.a
            key={method.id}
            href={method.href}
            target={method.id !== 'email' ? '_blank' : undefined}
            rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
            className="nothing-card group relative overflow-hidden text-center block"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            {method.popular && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--nothing-orange)] text-black text-xs font-bold rounded-full z-10">
                {t('popular_badge')}
              </div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className="relative p-6 sm:p-8">
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 nothing-glass rounded-2xl flex items-center justify-center mb-4 mx-auto"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
              <h3 className="nothing-title text-lg font-light mb-2">{method.title}</h3>
              <p className="nothing-text text-sm opacity-70 mb-4">{method.description}</p>
              <div className="flex items-center justify-center space-x-2 nothing-text text-sm font-medium group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                <span>{method.action}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
