export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  logo: string;
  metrics?: string;
  gradient: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Thomas Berthier',
    role: 'CEO',
    company: 'Ciffréo Bona',
    content: 'Mylan a complètement transformé notre architecture backend. Latence divisée par 2, déploiements fiables, et une stack évolutive. Son expertise Go et NestJS nous a fait gagner des mois de développement.',
    rating: 5,
    avatar: '🚀',
    logo: 'CB',
    metrics: 'Latence -50%',
    gradient: 'from-blue-400 to-purple-500',
  },
  {
    name: 'Marie Dubois',
    role: 'Founder',
    company: 'Petpalz.io',
    content: 'En tant que CTO, Mylan a livré une plateforme complète from scratch. API robuste, app mobile Flutter, et infrastructure PostgreSQL prête pour le scale. Accompagnement technique exemplaire.',
    rating: 5,
    avatar: '🐾',
    logo: 'PP',
    metrics: 'MVP en 6 mois',
    gradient: 'from-green-400 to-blue-500',
  },
  {
    name: 'Sophie Martin',
    role: 'CTO',
    company: 'Woman & Luxury',
    content: '6 ans de collaboration ! Architecture scalable sur Azure, équipe structurée, et delivery continu. Mylan maîtrise autant la tech que le produit. Un partenaire de confiance.',
    rating: 5,
    avatar: '💎',
    logo: 'WL',
    metrics: '6 ans ensemble',
    gradient: 'from-pink-400 to-red-500',
  },
  {
    name: 'Jean-Pierre Rousseau',
    role: 'Project Manager',
    company: 'Thales Digital Identity',
    content: 'Mission stratégique carte Vitale numérique. Management multi-sites impeccable, delivery sécurisé respecté, et coordination équipes internationales. Professionnel de très haut niveau.',
    rating: 5,
    avatar: '🛡️',
    logo: 'TD',
    metrics: 'Mission stratégique',
    gradient: 'from-red-400 to-orange-500',
  },
];
