export const CALCULATOR_CONFIG = {
  TJM_AVERAGE: 650,
  SERVICES: {
    'cto-fractionne': {
      label: 'CTO Fractionné',
      daysPerMonth: { '2j': 8, '3j': 12, '5j': 20 },
      icon: 'Users',
      gradient: 'from-blue-400 to-indigo-500',
    },
    'lead-dev': {
      label: 'Lead Dev Mission',
      daysPerMonth: { '2j': 8, '3j': 12, '5j': 20 },
      icon: 'Server',
      gradient: 'from-green-400 to-emerald-500',
    },
    'audit-express': {
      label: 'Audit Express',
      fixedDays: { min: 3, max: 5 },
      isOneTime: true,
      icon: 'Zap',
      gradient: 'from-orange-400 to-red-500',
    },
  },
  ENGAGEMENT_OPTIONS: [
    { id: '2j', label: '2j/semaine', daysPerWeek: 2, description: 'Accompagnement léger' },
    { id: '3j', label: '3j/semaine', daysPerWeek: 3, description: 'Engagement standard' },
    { id: '5j', label: '5j/semaine', daysPerWeek: 5, description: 'Temps plein' },
  ],
  DURATION_RANGE: { min: 1, max: 12 },
  AUDIT_DAYS_RANGE: { min: 3, max: 5 },
} as const;

export type ServiceId = keyof typeof CALCULATOR_CONFIG.SERVICES;
export type EngagementId = (typeof CALCULATOR_CONFIG.ENGAGEMENT_OPTIONS)[number]['id'];
