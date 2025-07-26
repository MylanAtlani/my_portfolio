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
      name: 'Malt',
      href: 'https://malt.fr/profile/mylanatlani',
      icon: Globe,
    },
  ];

  const quickLinks = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.expertise'), href: '#expertise' },
    { name: t('navigation.technologies'), href: '#technologies' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.services'), href: '#services' },
    { name: t('navigation.contact'), href: '#contact' },
  ];

  const services = [
    t('services.architecture'),
    t('services.refactoring'),
    t('services.cicd'),
    t('services.consulting'),
    t('services.audit'),
    t('services.cto')
  ];

  return (
    <footer className="relative py-20 px-6 lg:px-8 border-t border-white/10">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute top-1 right-1 nothing-status"></div>
                </div>
                <div className="flex flex-col">
                  <span className="nothing-title text-2xl font-light tracking-widest">M·A</span>
                  <span className="nothing-text text-sm opacity-60">Mylan Atlani</span>
                </div>
              </div>
              
              <p className="nothing-text max-w-md opacity-70 leading-relaxed">
                {t('description')}
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
                <span>{t('location')} • {t('remote')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="nothing-title text-xl font-light">{t('services.title')}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service}>
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="nothing-text text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 group cursor-pointer select-none"
                  >
                    <div 
                      className="w-1 h-1 rounded-full bg-white/40 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    <span className="select-none">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h3 className="nothing-title text-xl font-light">{t('navigation.title')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="nothing-text text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 group cursor-pointer select-none"
                  >
                    <div 
                      className="w-1 h-1 rounded-full bg-white/40 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    <span className="select-none">{link.name}</span>
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
                <span className="nothing-text text-xs opacity-60">{t('status')}</span>
              </div>
              
              <div className="space-y-1">
                <p className="nothing-text text-xs opacity-60">
                  © 2025 ATLANI Mylan. {t('rights')}
                </p>
                <p className="nothing-text text-xs opacity-50">
                  {t('builtWith')} • {t('design')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 