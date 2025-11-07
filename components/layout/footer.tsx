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
    <footer className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">
          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute top-1 right-1 nothing-status scale-75 sm:scale-100"></div>
                </div>
                <div className="flex flex-col">
                  <span className="nothing-title text-xl sm:text-2xl font-light tracking-widest">M·A</span>
                  <span className="nothing-text text-xs sm:text-sm opacity-60">Mylan Atlani</span>
                </div>
              </div>
              
              <p className="nothing-text text-sm sm:text-base max-w-md opacity-70 leading-relaxed">
                {t('description')}
              </p>
            </div>
            
            {/* Contact info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm opacity-70">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all sm:break-normal">atlani.mylan@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm opacity-70">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{t('location')} • {t('remote')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="nothing-title text-lg sm:text-xl font-light">{t('services.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
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
          <div className="space-y-4 sm:space-y-6">
            <h3 className="nothing-title text-lg sm:text-xl font-light">{t('navigation.title')}</h3>
            <ul className="space-y-2 sm:space-y-3">
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
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 gap-6">
            {/* Social links */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group p-2.5 sm:p-3 nothing-glass rounded-xl hover:scale-110 transition-all duration-300"
                    title={link.name}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>

            {/* Status & Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-center sm:text-right">
              <div className="flex items-center space-x-2">
                <div className="nothing-status scale-75 sm:scale-100"></div>
                <span className="nothing-text text-xs sm:text-sm opacity-60">{t('status')}</span>
              </div>

              <div className="space-y-1">
                <p className="nothing-text text-xs sm:text-sm opacity-60">
                  {t('rights')}
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