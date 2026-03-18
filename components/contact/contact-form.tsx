'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, ArrowRight } from 'lucide-react';
import { sendContactEmail } from '@/lib/email';
import { validateContactForm } from '@/lib/validation';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Honeypot } from '@/components/ui/honeypot';
import { useGTM } from '@/hooks/use-gtm';
import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

export function ContactForm() {
  const t = useTranslations('contact');
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const { trackContactForm } = useGTM();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      showError(validation.errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        trackContactForm(formData);
        showSuccess('Message envoyé avec succès ! Je vous répondrai dans les 24h.');
        setFormData({ name: '', email: '', company: '', project: '', budget: '', message: '' });
      } else {
        showError(result.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Erreur:', error);
      showError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3 bg-transparent border-b ${
      focusedField === name ? 'border-[var(--nothing-orange)]' : 'border-white/10'
    } focus:border-[var(--nothing-orange)] outline-none transition-colors duration-300 nothing-text text-sm placeholder:opacity-40`;

  const selectClass = (name: string) =>
    `w-full px-4 py-3 bg-transparent border-b ${
      focusedField === name ? 'border-[var(--nothing-orange)]' : 'border-white/10'
    } focus:border-[var(--nothing-orange)] outline-none transition-colors duration-300 nothing-text text-sm [&>option]:bg-black [&>option]:text-white`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="nothing-card p-6 sm:p-8 lg:p-10">
          {/* Form header */}
          <div className="mb-8">
            <h3 className="nothing-title text-lg sm:text-xl font-light mb-2">{t('form_title')}</h3>
            <p className="nothing-text text-xs opacity-50">{t('form_description')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Honeypot name="website" />

            {/* Row 1: Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_name_label')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  maxLength={100}
                  className={inputClass('name')}
                  placeholder={t('form_name_placeholder')}
                />
              </div>
              <div>
                <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_email_label')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  maxLength={254}
                  className={inputClass('email')}
                  placeholder={t('form_email_placeholder')}
                />
              </div>
            </div>

            {/* Row 2: Company + Project */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_company_label')}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={100}
                  className={inputClass('company')}
                  placeholder={t('form_company_placeholder')}
                />
              </div>
              <div>
                <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_project_label')}</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('project')}
                  onBlur={() => setFocusedField(null)}
                  className={selectClass('project')}
                >
                  <option value="">{t('form_project_select_option')}</option>
                  <option value="cto-fractionne">{t('form_project_cto_option')}</option>
                  <option value="lead-dev">{t('form_project_lead_option')}</option>
                  <option value="audit-express">{t('form_project_audit_option')}</option>
                  <option value="refonte">{t('form_project_refonte_option')}</option>
                  <option value="autre">{t('form_project_autre_option')}</option>
                </select>
              </div>
            </div>

            {/* Row 3: Budget full width */}
            <div>
              <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_budget_label')}</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('budget')}
                onBlur={() => setFocusedField(null)}
                className={selectClass('budget')}
              >
                <option value="">{t('form_budget_select_option')}</option>
                <option value="3k-10k">{t('form_budget_3k_10k_option')}</option>
                <option value="10k-25k">{t('form_budget_10k_25k_option')}</option>
                <option value="25k-50k">{t('form_budget_25k_50k_option')}</option>
                <option value="50k+">{t('form_budget_50k_option')}</option>
                <option value="à-discuter">{t('form_budget_a_discuter_option')}</option>
              </select>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block nothing-text text-[10px] uppercase tracking-wider opacity-40 mb-2">{t('form_message_label')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={3}
                maxLength={2000}
                className={`${inputClass('message')} resize-none`}
                placeholder={t('form_message_placeholder')}
              />
              <div className="flex justify-end mt-1">
                <span className="text-[10px] nothing-text opacity-30">{formData.message.length}/2000</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto nothing-btn-primary flex items-center justify-center gap-2.5 px-8 py-3.5 group disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('form_submit_sending')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('form_submit_button')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>

      <Toaster toasts={toasts} onRemove={removeToast} />
    </>
  );
}
