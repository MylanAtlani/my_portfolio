'use client';

import { useInView } from '@/hooks/use-in-view';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Clock,
  ArrowRight,
  Send,
  CheckCircle,
  ExternalLink,
  Linkedin,
  Globe
} from 'lucide-react';
import { sendContactEmail } from '@/lib/email';
import { validateContactForm } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Honeypot } from '@/components/ui/honeypot';

interface ContactMethod {
  id: string;
  icon: any;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
  gradient: string;
  popular?: boolean;
}

export function ContactCTASection() {
  const t = useTranslations('contact');
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { toasts, removeToast, showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      popular: true
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      title: t('linkedin.title'),
      description: t('linkedin.description'),
      action: t('linkedin.action'),
      href: 'https://www.linkedin.com/in/mylan-atlani',
      color: 'var(--nothing-green)',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: t('whatsapp.title'),
      description: t('whatsapp.description'),
      action: t('whatsapp.action'),
      href: 'https://wa.me/33123456789',
      color: 'var(--nothing-orange)',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'portfolio',
      icon: Globe,
      title: t('portfolio.title'),
      description: t('portfolio.description'),
      action: t('portfolio.action'),
      href: 'https://moonimize.collective.work/',
      color: 'var(--nothing-yellow)',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation côté client
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      showError(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        showSuccess('Message envoyé avec succès ! Je vous répondrai dans les 24h.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          project: '',
          budget: '',
          message: ''
        });
      } else {
        showError(result.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <section id="contact" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
            <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
              {t('title')}
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              
              return (
                <a
                  key={method.id}
                  href={method.href}
                  target={method.id !== 'email' ? '_blank' : undefined}
                  rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                  className={`nothing-card group relative overflow-hidden text-center transform transition-all duration-700 hover:scale-105 ${
                    inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {/* Popular Badge */}
                  {method.popular && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--nothing-orange)] text-black text-xs font-bold rounded-full">
                      {t('popular_badge')}
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  <div className="relative p-6 sm:p-8">
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 nothing-glass rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="nothing-title text-lg font-light mb-2">
                      {method.title}
                    </h3>
                    <p className="nothing-text text-sm opacity-70 mb-4">
                      {method.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-center space-x-2 nothing-text text-sm font-medium group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                      <span>{method.action}</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className={`max-w-4xl mx-auto transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="nothing-card p-8 sm:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="nothing-title text-2xl sm:text-3xl font-light mb-4">
                  {t('form_title')}
                </h3>
                <p className="nothing-text opacity-70">
                  {t('form_description')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot - invisible pour les utilisateurs */}
                <Honeypot name="website" />
                
                {/* Form Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block nothing-text text-sm font-medium mb-2">
                      {t('form_name_label')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                      placeholder={t('form_name_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block nothing-text text-sm font-medium mb-2">
                      {t('form_email_label')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      maxLength={254}
                      className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                      placeholder={t('form_email_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block nothing-text text-sm font-medium mb-2">
                      {t('form_company_label')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                      placeholder={t('form_company_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block nothing-text text-sm font-medium mb-2">
                      {t('form_project_label')}
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                    >
                      <option value="">{t('form_project_select_option')}</option>
                      <option value="cto-fractionne">{t('form_project_cto_option')}</option>
                      <option value="lead-dev">{t('form_project_lead_option')}</option>
                      <option value="audit-express">{t('form_project_audit_option')}</option>
                      <option value="refonte">{t('form_project_refonte_option')}</option>
                      <option value="autre">{t('form_project_autre_option')}</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block nothing-text text-sm font-medium mb-2">
                      {t('form_budget_label')}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                    >
                      <option value="">{t('form_budget_select_option')}</option>
                      <option value="3k-10k">{t('form_budget_3k_10k_option')}</option>
                      <option value="10k-25k">{t('form_budget_10k_25k_option')}</option>
                      <option value="25k-50k">{t('form_budget_25k_50k_option')}</option>
                      <option value="50k+">{t('form_budget_50k_option')}</option>
                      <option value="à-discuter">{t('form_budget_a_discuter_option')}</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block nothing-text text-sm font-medium mb-2">
                    {t('form_message_label')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={2000}
                    className="w-full px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300 resize-none"
                    placeholder={t('form_message_placeholder')}
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {formData.message.length}/2000 caractères
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="nothing-btn-primary flex items-center space-x-3 px-8 py-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('form_submit_sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('form_submit_button')}</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toaster */}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </>
  );
}