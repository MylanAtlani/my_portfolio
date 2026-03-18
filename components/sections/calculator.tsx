'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Users, Server, Zap, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { CALCULATOR_CONFIG, ServiceId, EngagementId } from '@/lib/calculator-config';
import { sectionHeader, viewportOnce } from '@/lib/motion';

// ─── Animated Budget Counter ─────────────────────────────────
function AnimatedBudget({ value, locale }: { value: number; locale: string }) {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const ref = useRef<HTMLSpanElement>(null);
  const formatter = useRef(new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US'));

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter.current.format(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [springVal]);

  return <span ref={ref}>{formatter.current.format(value)}</span>;
}

// ─── Step transition variants ────────────────────────────────
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const SERVICE_ICONS: Record<ServiceId, React.ComponentType<{ className?: string }>> = {
  'cto-fractionne': Users,
  'lead-dev': Server,
  'audit-express': Zap,
};

const SERVICE_KEYS: Record<ServiceId, string> = {
  'cto-fractionne': 'cto',
  'lead-dev': 'lead',
  'audit-express': 'audit',
};

export function CalculatorSection() {
  const t = useTranslations('services');
  const tc = useTranslations('services.calculator');
  const locale = useLocale();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [engagement, setEngagement] = useState<EngagementId>('3j');
  const [duration, setDuration] = useState(3);
  const [auditDays, setAuditDays] = useState(4);

  const goTo = useCallback((target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }, [step]);

  const handleServiceSelect = useCallback((id: ServiceId) => {
    setSelectedService(id);
    setTimeout(() => {
      setDirection(1);
      setStep(1);
    }, 300);
  }, []);

  const isAudit = selectedService === 'audit-express';
  const config = CALCULATOR_CONFIG;

  const calculateBudget = () => {
    if (!selectedService) return { total: 0, monthly: 0, daysPerMonth: 0 };
    const service = config.SERVICES[selectedService];

    if ('isOneTime' in service) {
      return { total: config.TJM_AVERAGE * auditDays, monthly: 0, daysPerMonth: auditDays };
    }

    const daysPerMonth = service.daysPerMonth[engagement];
    const monthly = config.TJM_AVERAGE * daysPerMonth;
    return { total: monthly * duration, monthly, daysPerMonth };
  };

  const budget = calculateBudget();

  const durationLabels = [1, 3, 6, 9, 12];

  return (
    <section id="calculator" className="py-10 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 nothing-gradient-blue rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6">
            {tc('title')}
          </h2>
          <motion.div
            className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-white/20 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          />
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl mx-auto opacity-70">
            {tc('subtitle')}
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          className="nothing-card p-6 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full ${
                  i === step
                    ? 'bg-[var(--nothing-orange)]'
                    : i < step
                      ? 'bg-[var(--nothing-orange)]/40'
                      : 'bg-white/20'
                }`}
                animate={{ width: i === step ? 32 : 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                layout
              />
            ))}
          </div>

          {/* Steps Container */}
          <div className="min-h-[340px] sm:min-h-[380px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ── Step 1: Service Selection ── */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="text-center mb-6">
                    <h3 className="nothing-title text-lg sm:text-xl font-light mb-1">
                      {tc('step1_title')}
                    </h3>
                    <p className="nothing-text text-sm opacity-60">{tc('step1_subtitle')}</p>
                  </div>

                  <div className="grid gap-4">
                    {(Object.keys(config.SERVICES) as ServiceId[]).map((id) => {
                      const service = config.SERVICES[id];
                      const Icon = SERVICE_ICONS[id];
                      const isSelected = selectedService === id;

                      return (
                        <motion.button
                          key={id}
                          onClick={() => handleServiceSelect(id)}
                          className={`nothing-glass w-full text-left p-4 sm:p-5 rounded-2xl flex items-center gap-4 transition-all duration-200 ${
                            isSelected
                              ? 'ring-2 ring-[var(--nothing-orange)] bg-[var(--nothing-orange)]/10'
                              : 'hover:bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${service.gradient} opacity-90`}
                          >
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="nothing-title text-sm sm:text-base font-medium">
                              {t(`${SERVICE_KEYS[id]}.title`)}
                            </div>
                            <div className="nothing-text text-xs sm:text-sm opacity-60 line-clamp-1">
                              {t(`${SERVICE_KEYS[id]}.description`)}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-40 flex-shrink-0 ml-auto" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Configuration ── */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="text-center mb-6">
                    <h3 className="nothing-title text-lg sm:text-xl font-light mb-1">
                      {tc('step2_title')}
                    </h3>
                    <p className="nothing-text text-sm opacity-60">{tc('step2_subtitle')}</p>
                  </div>

                  {isAudit ? (
                    /* Audit: simple days slider */
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="nothing-text text-sm">{tc('audit_days')}</span>
                          <span className="nothing-title text-2xl font-light">
                            {auditDays} {tc('days')}
                          </span>
                        </div>
                        <SliderInput
                          min={config.AUDIT_DAYS_RANGE.min}
                          max={config.AUDIT_DAYS_RANGE.max}
                          value={auditDays}
                          onChange={setAuditDays}
                          labels={[3, 4, 5]}
                        />
                      </div>
                    </div>
                  ) : (
                    /* CTO / Lead Dev: engagement + duration */
                    <div className="space-y-8">
                      {/* Engagement Selector */}
                      <div>
                        <div className="nothing-text text-sm mb-3 opacity-80">
                          {tc('engagement')}
                        </div>
                        <div className="grid gap-3">
                          {config.ENGAGEMENT_OPTIONS.map((opt) => (
                            <motion.button
                              key={opt.id}
                              onClick={() => setEngagement(opt.id)}
                              className={`nothing-glass w-full text-left px-4 py-3 sm:py-4 rounded-xl flex items-center justify-between transition-all duration-200 ${
                                engagement === opt.id
                                  ? 'ring-2 ring-[var(--nothing-orange)] bg-[var(--nothing-orange)]/10'
                                  : 'hover:bg-white/5'
                              }`}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div>
                                <div className="nothing-title text-sm font-medium">{opt.label}</div>
                                <div className="nothing-text text-xs opacity-50">
                                  {opt.description}
                                </div>
                              </div>
                              {engagement === opt.id && (
                                <motion.div
                                  className="w-3 h-3 rounded-full bg-[var(--nothing-orange)]"
                                  layoutId="engagement-indicator"
                                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Duration Slider */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="nothing-text text-sm">{tc('duration')}</span>
                          <span className="nothing-title text-2xl font-light">
                            {duration} {tc('months')}
                          </span>
                        </div>
                        <SliderInput
                          min={config.DURATION_RANGE.min}
                          max={config.DURATION_RANGE.max}
                          value={duration}
                          onChange={setDuration}
                          labels={durationLabels}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-3 mt-8">
                    <motion.button
                      onClick={() => goTo(0)}
                      className="nothing-btn-secondary flex-1 flex items-center justify-center gap-2 !px-4 !py-3 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{tc('back')}</span>
                    </motion.button>
                    <motion.button
                      onClick={() => goTo(2)}
                      className="nothing-btn-primary flex-1 flex items-center justify-center gap-2 !px-4 !py-3 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>{tc('next')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Budget Summary ── */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="text-center mb-6">
                    <h3 className="nothing-title text-lg sm:text-xl font-light mb-1">
                      {tc('step3_title')}
                    </h3>
                    <p className="nothing-text text-sm opacity-60">{tc('step3_subtitle')}</p>
                  </div>

                  {/* Total Budget */}
                  <div className="text-center mb-6">
                    <div className="nothing-text text-sm opacity-60 mb-2">{tc('total_cost')}</div>
                    <div className="nothing-title text-4xl sm:text-5xl lg:text-6xl font-light nothing-gradient-text">
                      <AnimatedBudget value={budget.total} locale={locale} />
                      <span className="text-2xl sm:text-3xl ml-1">€</span>
                    </div>
                  </div>

                  {/* Monthly Cost (non-audit only) */}
                  {!isAudit && budget.monthly > 0 && (
                    <div className="text-center mb-6">
                      <span className="nothing-text text-sm opacity-50">{tc('monthly_cost')} : </span>
                      <span className="nothing-title text-lg font-light">
                        <AnimatedBudget value={budget.monthly} locale={locale} />€
                        <span className="nothing-text text-sm opacity-50">/{tc('months').slice(0, -1) || tc('months')}</span>
                      </span>
                    </div>
                  )}

                  {/* Breakdown Card */}
                  <div className="nothing-glass rounded-2xl p-5 mb-6">
                    <div className="nothing-text text-xs font-medium opacity-60 mb-3 uppercase tracking-wider">
                      {tc('breakdown')}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="nothing-text opacity-70">{tc('tjm_label')}</span>
                        <span className="nothing-title font-medium">{config.TJM_AVERAGE}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="nothing-text opacity-70">{tc('days_per_month')}</span>
                        <span className="nothing-title font-medium">{budget.daysPerMonth} {tc('days')}</span>
                      </div>
                      {!isAudit && (
                        <div className="flex justify-between">
                          <span className="nothing-text opacity-70">{tc('duration')}</span>
                          <span className="nothing-title font-medium">{duration} {tc('months')}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-2 mt-2 flex justify-between">
                        <span className="nothing-text font-medium">{tc('total_cost')}</span>
                        <span className="nothing-title font-medium nothing-gradient-text">
                          {new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(budget.total)}€
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <p className="nothing-text text-xs text-center opacity-40 mb-6">
                    {tc('disclaimer')}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <motion.a
                      href="#contact"
                      className="nothing-btn-primary flex items-center justify-center gap-2 !px-4 !py-3 text-sm w-full"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>{tc('cta')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => goTo(1)}
                        className="nothing-btn-secondary flex-1 flex items-center justify-center gap-2 !px-3 !py-3 text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{tc('back')}</span>
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setStep(0);
                          setDirection(-1);
                          setSelectedService(null);
                          setEngagement('3j');
                          setDuration(3);
                          setAuditDays(4);
                        }}
                        className="nothing-btn-secondary flex-1 flex items-center justify-center gap-2 !px-3 !py-3 text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>{tc('restart')}</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Reusable Slider Component ───────────────────────────────
function SliderInput({
  min,
  max,
  value,
  onChange,
  labels,
}: {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  labels: number[];
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-12 flex items-center">
        <div className="absolute inset-x-0 h-2 bg-white/10 rounded-full" />
        <motion.div
          className="absolute left-0 h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full h-12 opacity-0 cursor-pointer"
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-lg border-2 border-white/20 pointer-events-none"
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>
      <div className="relative h-4 text-xs opacity-50">
        {labels.map((l) => {
          const labelPct = ((l - min) / (max - min)) * 100;
          return (
            <span
              key={l}
              className="absolute -translate-x-1/2"
              style={{ left: `${labelPct}%` }}
            >
              {l}
            </span>
          );
        })}
      </div>
    </div>
  );
}
