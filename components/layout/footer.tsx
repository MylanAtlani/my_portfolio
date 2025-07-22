'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail, Heart, ExternalLink, Globe } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mylan-atlani',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:atlani.mylan@gmail.com',
      icon: Mail,
    },
    {
      name: 'Portfolio',
      href: 'https://moonimize.collective.work/',
      icon: Globe,
    },
  ];

  const quickLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Architecture Backend',
    'Refonte & Structuration',
    'CI/CD & Infrastructure',
    'Conseil Stratégique',
    'Audit Technique',
    'CTO Fractionné'
  ];

  return (
    <footer className="relative py-20 px-6 lg:px-8 border-t border-white/10">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 nothing-gradient-orange rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full nothing-gradient-orange"></div>
                  <div className="absolute top-1 right-1 nothing-status"></div>
                </div>
                <span className="nothing-title text-2xl font-light">ATLANI Mylan</span>
              </div>
              
              <p className="nothing-text max-w-md opacity-70 leading-relaxed">
                Lead Dev Freelance & CTO - Spécialisé dans la refonte d'architectures backend robustes 
                avec Go, NestJS et Next.js. 8 ans d'expérience au service des startups et scale-ups.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm opacity-70">
                <Mail className="w-4 h-4" />
                <span>atlani.mylan@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm opacity-70">
                <Globe className="w-4 h-4" />
                <span>📍 Marseille, France • 🌍 Remote friendly</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="nothing-title text-xl font-light">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service}>
                  <a 
                    href="#contact" 
                    className="nothing-text text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 group"
                  >
                    <div 
                      className="w-1 h-1 rounded-full nothing-gradient-orange opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="nothing-title text-xl font-light">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="nothing-text text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 group"
                  >
                    <div 
                      className="w-1 h-1 rounded-full nothing-gradient-orange opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group p-3 nothing-glass rounded-xl hover:scale-110 transition-all duration-300"
                    title={link.name}
                  >
                    <IconComponent className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>

            {/* Status & Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-center md:text-right">
              <div className="flex items-center space-x-2">
                <div className="nothing-status scale-75"></div>
                <span className="nothing-text text-xs opacity-60">Disponible pour missions</span>
              </div>
              
              <div className="space-y-1">
                <p className="nothing-text text-xs opacity-60">
                  © 2025 ATLANI Mylan. {t('rights')}
                </p>
                <p className="nothing-text text-xs opacity-50">
                  {t('builtWith')} • Design Nothing OS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 