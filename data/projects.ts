import { Project, Technology } from '@/types';
import { Server, Briefcase, Shield, GraduationCap, Code2, Cloud, Users, Database, Globe, Smartphone } from 'lucide-react';

// Technologies référencées
const technologies: Record<string, Technology> = {
  // Frontend
  react: { name: 'React', category: 'frontend', level: 'expert', icon: Globe, color: 'text-blue-500' },
  nextjs: { name: 'Next.js', category: 'frontend', level: 'expert', icon: Globe, color: 'text-pink-600' },
  vue: { name: 'Vue.js', category: 'frontend', level: 'advanced', icon: Globe, color: 'text-green-500' },
  flutter: { name: 'Flutter', category: 'mobile', level: 'advanced', icon: Smartphone, color: 'text-blue-400' },
  
  // Backend
  nestjs: { name: 'NestJS', category: 'backend', level: 'expert', icon: Server, color: 'text-red-500' },
  go: { name: 'Go', category: 'backend', level: 'expert', icon: Server, color: 'text-blue-600' },
  nodejs: { name: 'Node.js', category: 'backend', level: 'expert', icon: Server, color: 'text-green-600' },
  elixir: { name: 'Elixir', category: 'backend', level: 'advanced', icon: Server, color: 'text-purple-500' },
  python: { name: 'Python', category: 'backend', level: 'advanced', icon: Server, color: 'text-yellow-500' },
  ruby: { name: 'Ruby', category: 'backend', level: 'intermediate', icon: Server, color: 'text-red-600' },
  
  // Database
  postgresql: { name: 'PostgreSQL', category: 'database', level: 'advanced', icon: Database, color: 'text-blue-700' },
  opensearch: { name: 'OpenSearch', category: 'database', level: 'advanced', icon: Database, color: 'text-yellow-600' },
  solr: { name: 'SOLR', category: 'database', level: 'intermediate', icon: Database, color: 'text-orange-500' },
  riak: { name: 'Riak', category: 'database', level: 'intermediate', icon: Database, color: 'text-purple-600' },
  mongodb: { name: 'MongoDB', category: 'database', level: 'advanced', icon: Database, color: 'text-green-600' },
  
  // DevOps
  docker: { name: 'Docker', category: 'devops', level: 'expert', icon: Cloud, color: 'text-blue-600' },
  aws: { name: 'AWS', category: 'devops', level: 'advanced', icon: Cloud, color: 'text-orange-400' },
  azure: { name: 'Azure', category: 'devops', level: 'intermediate', icon: Cloud, color: 'text-blue-500' },
  github_actions: { name: 'GitHub Actions', category: 'devops', level: 'advanced', icon: Cloud, color: 'text-gray-700' },
  jenkins: { name: 'Jenkins', category: 'devops', level: 'intermediate', icon: Cloud, color: 'text-blue-600' },
  pm2: { name: 'PM2', category: 'devops', level: 'advanced', icon: Cloud, color: 'text-green-500' },
  
  // Other
  cybersecurity: { name: 'Cybersécurité', category: 'other', level: 'advanced', icon: Shield, color: 'text-red-500' },
  sesam: { name: 'SESAM-Vitale', category: 'other', level: 'expert', icon: Shield, color: 'text-green-600' },
  payxpert: { name: 'PayXpert', category: 'other', level: 'advanced', icon: Server, color: 'text-blue-500' },
  android: { name: 'Android', category: 'mobile', level: 'intermediate', icon: Smartphone, color: 'text-green-500' },
  ios: { name: 'iOS', category: 'mobile', level: 'intermediate', icon: Smartphone, color: 'text-gray-600' },
};

export const getDetailedProjects = (t: (key: string) => string): Project[] => [
  {
    id: 'ciffreo-secpay',
    title: t('projects.ciffreo.title'),
    company: 'Ciffreo Bona',
    companyLogo: '/logo/ciffreo.png',
    companyWebsite: 'https://www.ciffreo.com',
    role: t('projects.ciffreo.role'),
    description: t('projects.ciffreo.description'),
    fullDescription: t('projects.ciffreo.fullDescription'),
    technologies: [technologies.go, technologies.nestjs, technologies.nextjs, technologies.opensearch, technologies.docker, technologies.payxpert, technologies.github_actions, technologies.aws],
    mainTechnology: 'Go',
    status: 'active',
    type: 'freelance',
    period: t('projects.ciffreo.period'),
    duration: t('projects.ciffreo.duration'),
    teamSize: 6,
    mission: [
      t('projects.ciffreo.mission.0'),
      t('projects.ciffreo.mission.1'),
      t('projects.ciffreo.mission.2'),
      t('projects.ciffreo.mission.3'),
      t('projects.ciffreo.mission.4'),
      t('projects.ciffreo.mission.5'),
      t('projects.ciffreo.mission.6')
    ],
    challenges: [
      t('projects.ciffreo.challenges.0'),
      t('projects.ciffreo.challenges.1'),
      t('projects.ciffreo.challenges.2'),
      t('projects.ciffreo.challenges.3')
    ],
    achievements: [
      t('projects.ciffreo.achievements.0'),
      t('projects.ciffreo.achievements.1'),
      t('projects.ciffreo.achievements.2'),
      t('projects.ciffreo.achievements.3')
    ],
    learnings: [
      t('projects.ciffreo.learnings.0'),
      t('projects.ciffreo.learnings.1'),
      t('projects.ciffreo.learnings.2'),
      t('projects.ciffreo.learnings.3')
    ],
    gradient: 'from-blue-400 to-purple-500',
    icon: Server,
    featured: true,
    metaDescription: 'Architecture backend moderne avec Go & NestJS pour Ciffreo Bona',
    keywords: ['Go', 'NestJS', 'Next.js', 'OpenSearch', 'PayXpert', 'CI/CD']
  },
  {
    id: 'petpalz-platform',
    title: t('projects.petpalz.title'),
    company: 'PetPalz',
    companyLogo: '/logo/petpalz.png',
    role: t('projects.petpalz.role'),
    description: t('projects.petpalz.description'),
    fullDescription: t('projects.petpalz.fullDescription'),
    technologies: [technologies.nestjs, technologies.go, technologies.flutter, technologies.nextjs, technologies.postgresql, technologies.docker],
    mainTechnology: 'NestJS',
    status: 'active',
    type: 'freelance',
    period: t('projects.petpalz.period'),
    duration: t('projects.petpalz.duration'),
    teamSize: 4,
    mission: [
      t('projects.petpalz.mission.0'),
      t('projects.petpalz.mission.1'),
      t('projects.petpalz.mission.2'),
      t('projects.petpalz.mission.3'),
      t('projects.petpalz.mission.4'),
      t('projects.petpalz.mission.5')
    ],
    challenges: [
      t('projects.petpalz.challenges.0'),
      t('projects.petpalz.challenges.1'),
      t('projects.petpalz.challenges.2')
    ],
    achievements: [
      t('projects.petpalz.achievements.0'),
      t('projects.petpalz.achievements.1'),
      t('projects.petpalz.achievements.2'),
      t('projects.petpalz.achievements.3')
    ],
    learnings: [
      t('projects.petpalz.learnings.0'),
      t('projects.petpalz.learnings.1'),
      t('projects.petpalz.learnings.2'),
      t('projects.petpalz.learnings.3')
    ],
    gradient: 'from-green-400 to-blue-500',
    icon: Briefcase,
    featured: true,
    metaDescription: 'Plateforme mobile-first de santé animale avec NestJS, Go et Flutter',
    keywords: ['NestJS', 'Go', 'Flutter', 'Next.js', 'PostgreSQL', 'Docker Swarm']
  },
  {
    id: 'thales-sesam',
    title: t('projects.thales.title'),
    company: 'Thales DIS',
    companyLogo: '/logo/thales.webp',
    companyWebsite: 'https://www.thalesgroup.com',
    role: t('projects.thales.role'),
    description: t('projects.thales.description'),
    fullDescription: t('projects.thales.fullDescription'),
    technologies: [technologies.cybersecurity, technologies.sesam, technologies.android, technologies.ios],
    mainTechnology: 'SESAM-Vitale',
    status: 'completed',
    type: 'freelance',
    period: t('projects.thales.period'),
    duration: t('projects.thales.duration'),
    teamSize: 15,
    mission: [
      t('projects.thales.mission.0'),
      t('projects.thales.mission.1'),
      t('projects.thales.mission.2'),
      t('projects.thales.mission.3'),
      t('projects.thales.mission.4'),
      t('projects.thales.mission.5')
    ],
    challenges: [
      t('projects.thales.challenges.0'),
      t('projects.thales.challenges.1'),
      t('projects.thales.challenges.2'),
      t('projects.thales.challenges.3'),
      t('projects.thales.challenges.4')
    ],
    achievements: [
      t('projects.thales.achievements.0'),
      t('projects.thales.achievements.1'),
      t('projects.thales.achievements.2'),
      t('projects.thales.achievements.3')
    ],
    learnings: [
      t('projects.thales.learnings.0'),
      t('projects.thales.learnings.1'),
      t('projects.thales.learnings.2'),
      t('projects.thales.learnings.3')
    ],
    gradient: 'from-red-400 to-orange-500',
    icon: Shield,
    featured: true,
    metaDescription: 'Projet national stratégique carte Vitale numérique chez Thales DIS',
    keywords: ['Thales', 'SESAM-Vitale', 'Cybersécurité', 'Projet National', 'Sécurité']
  },
  {
    id: 'woman-luxury',
    title: t('projects.woman.title'),
    company: 'Woman & Luxury',
    companyLogo: '/logo/happer.png',
    role: t('projects.woman.role'),
    description: t('projects.woman.description'),
    fullDescription: t('projects.woman.fullDescription'),
    technologies: [technologies.nestjs, technologies.go, technologies.react, technologies.nextjs, technologies.python, technologies.azure, technologies.mongodb, technologies.docker, technologies.pm2],
    mainTechnology: 'NestJS',
    status: 'completed',
    type: 'freelance',
    period: t('projects.woman.period'),
    duration: t('projects.woman.duration'),
    teamSize: 3,
    mission: [
      t('projects.woman.mission.0'),
      t('projects.woman.mission.1'),
      t('projects.woman.mission.2'),
      t('projects.woman.mission.3'),
      t('projects.woman.mission.4'),
      t('projects.woman.mission.5'),
      t('projects.woman.mission.6'),
      t('projects.woman.mission.7'),
      t('projects.woman.mission.8')
    ],
    challenges: [
      t('projects.woman.challenges.0'),
      t('projects.woman.challenges.1'),
      t('projects.woman.challenges.2')
    ],
    achievements: [
      t('projects.woman.achievements.0'),
      t('projects.woman.achievements.1'),
      t('projects.woman.achievements.2')
    ],
    learnings: [
      t('projects.woman.learnings.0'),
      t('projects.woman.learnings.1'),
      t('projects.woman.learnings.2'),
      t('projects.woman.learnings.3')
    ],
    gradient: 'from-orange-400 to-red-500',
    icon: Code2,
    featured: true,
    metaDescription: 'Application mobile mode luxe féminin avec NestJS et Azure',
    keywords: ['NestJS', 'Go', 'React', 'Next.js', 'Azure', 'Mode', 'Luxe']
  },
  {
    id: 'laplateforme-teacher',
    title: t('projects.plateforme.title'),
    company: 'La Plateforme_',
    companyLogo: '/logo/laplateforme.svg',
    companyWebsite: 'https://laplateforme.io',
    role: t('projects.plateforme.role'),
    description: t('projects.plateforme.description'),
    fullDescription: t('projects.plateforme.fullDescription'),
    technologies: [technologies.cybersecurity, technologies.python, technologies.react],
    mainTechnology: 'Cybersécurité',
    status: 'completed',
    type: 'cdi',
    period: t('projects.plateforme.period'),
    duration: t('projects.plateforme.duration'),
    teamSize: 12,
    mission: [
      t('projects.plateforme.mission.0'),
      t('projects.plateforme.mission.1'),
      t('projects.plateforme.mission.2'),
      t('projects.plateforme.mission.3'),
      t('projects.plateforme.mission.4'),
      t('projects.plateforme.mission.5'),
      t('projects.plateforme.mission.6'),
      t('projects.plateforme.mission.7'),
      t('projects.plateforme.mission.8')
    ],
    challenges: [
      t('projects.plateforme.challenges.0'),
      t('projects.plateforme.challenges.1'),
      t('projects.plateforme.challenges.2'),
      t('projects.plateforme.challenges.3')
    ],
    achievements: [
      t('projects.plateforme.achievements.0'),
      t('projects.plateforme.achievements.1'),
      t('projects.plateforme.achievements.2'),
      t('projects.plateforme.achievements.3')
    ],
    learnings: [
      t('projects.plateforme.learnings.0'),
      t('projects.plateforme.learnings.1'),
      t('projects.plateforme.learnings.2'),
      t('projects.plateforme.learnings.3')
    ],
    gradient: 'from-purple-400 to-pink-500',
    icon: GraduationCap,
    metaDescription: 'Responsable pédagogique cybersécurité à La Plateforme_',
    keywords: ['Enseignement', 'Cybersécurité', 'Formation', 'Pédagogie']
  },
  {
    id: 'kbrw-backend',
    title: t('projects.kbrw.title'),
    company: 'KBRW',
    companyLogo: '/logo/kbrw.webp',
    role: t('projects.kbrw.role'),
    description: t('projects.kbrw.description'),
    fullDescription: t('projects.kbrw.fullDescription'),
    technologies: [technologies.elixir, technologies.nodejs, technologies.react, technologies.riak, technologies.solr, technologies.aws, technologies.jenkins, technologies.docker],
    mainTechnology: 'Elixir',
    status: 'completed',
    type: 'cdi',
    period: t('projects.kbrw.period'),
    duration: t('projects.kbrw.duration'),
    teamSize: 8,
    mission: [
      t('projects.kbrw.mission.0'),
      t('projects.kbrw.mission.1'),
      t('projects.kbrw.mission.2'),
      t('projects.kbrw.mission.3')
    ],
    challenges: [
      t('projects.kbrw.challenges.0'),
      t('projects.kbrw.challenges.1'),
      t('projects.kbrw.challenges.2')
    ],
    achievements: [
      t('projects.kbrw.achievements.0'),
      t('projects.kbrw.achievements.1'),
      t('projects.kbrw.achievements.2')
    ],
    learnings: [
      t('projects.kbrw.learnings.0'),
      t('projects.kbrw.learnings.1'),
      t('projects.kbrw.learnings.2'),
      t('projects.kbrw.learnings.3')
    ],
    gradient: 'from-indigo-400 to-blue-500',
    icon: Server,
    metaDescription: 'Solutions OMS/WMS pour grands groupes avec Elixir chez KBRW',
    keywords: ['Elixir', 'React', 'NodeJS', 'AWS', 'OMS', 'WMS']
  },
  {
    id: 'nexen-cloud',
    title: t('projects.nexen.title'),
    company: 'Nexen Partners',
    companyLogo: '/logo/nexen.png',
    role: t('projects.nexen.role'),
    description: t('projects.nexen.description'),
    fullDescription: t('projects.nexen.fullDescription'),
    technologies: [technologies.python, technologies.aws, technologies.react, technologies.vue],
    mainTechnology: 'Python',
    status: 'completed',
    type: 'stage',
    period: t('projects.nexen.period'),
    duration: t('projects.nexen.duration'),
    teamSize: 5,
    mission: [
      t('projects.nexen.mission.0'),
      t('projects.nexen.mission.1'),
      t('projects.nexen.mission.2')
    ],
    challenges: [
      t('projects.nexen.challenges.0'),
      t('projects.nexen.challenges.1'),
      t('projects.nexen.challenges.2')
    ],
    achievements: [
      t('projects.nexen.achievements.0'),
      t('projects.nexen.achievements.1'),
      t('projects.nexen.achievements.2')
    ],
    learnings: [
      t('projects.nexen.learnings.0'),
      t('projects.nexen.learnings.1'),
      t('projects.nexen.learnings.2'),
      t('projects.nexen.learnings.3')
    ],
    gradient: 'from-teal-400 to-green-500',
    icon: Cloud,
    metaDescription: 'Automatisation déploiements AWS et architecture réseau SAMU',
    keywords: ['Python', 'AWS', 'React', 'Vue.js', 'SAMU', 'Architecture']
  }
];

// Export des technologies pour réutilisation
export { technologies }; 