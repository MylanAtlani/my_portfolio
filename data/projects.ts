import { Project } from '@/types';
import { Server, Briefcase, Shield, GraduationCap, Code2, Cloud, Users } from 'lucide-react';

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    title: t('projects.ciffreo.title'),
    role: t('projects.ciffreo.role'),
    description: t('projects.ciffreo.description'),
    technologies: ['Go', 'NestJS', 'OpenSearch', 'Docker', 'PayXpert', 'GitHub Actions'],
    status: 'active',
    gradient: 'from-blue-400 to-purple-500',
    period: t('projects.ciffreo.period'),
    type: 'freelance',
    freelance: true,
    icon: Server,
    logo: '/logo/ciffreo.png'
  },
  {
    title: t('projects.petpalz.title'),
    role: t('projects.petpalz.role'),
    description: t('projects.petpalz.description'),
    technologies: ['NestJS', 'Go', 'Flutter', 'Next.js', 'PostgreSQL', 'CI/CD'],
    status: 'active',
    gradient: 'from-green-400 to-blue-500',
    period: t('projects.petpalz.period'),
    type: 'freelance',
    freelance: true,
    icon: Briefcase,
    logo: '/logo/petpalz.png'
  },
  {
    title: t('projects.thales.title'),
    role: t('projects.thales.role'),
    description: t('projects.thales.description'),
    technologies: ['Sécurité', 'SESAM-Vitale', 'Agile', 'Multi-timezone'],
    status: 'completed',
    gradient: 'from-red-400 to-orange-500',
    period: t('projects.thales.period'),
    type: 'freelance',
    freelance: true,
    icon: Shield,
    logo: '/logo/thales.webp'
  },
  {
    title: t('projects.plateforme.title'),
    role: t('projects.plateforme.role'),
    description: t('projects.plateforme.description'),
    technologies: ['Cybersécurité', 'Réseau IP', 'Pédagogie', 'Evaluation'],
    status: 'completed',
    gradient: 'from-purple-400 to-pink-500',
    period: t('projects.plateforme.period'),
    type: 'cdi',
    freelance: false,
    icon: GraduationCap,
    logo: '/logo/laplateforme.svg'
  },
  {
    title: t('projects.kbrw.title'),
    role: t('projects.kbrw.role'),
    description: t('projects.kbrw.description'),
    technologies: ['Elixir', 'NodeJS', 'React', 'SOLR', 'AWS', 'Jenkins'],
    status: 'completed',
    gradient: 'from-indigo-400 to-blue-500',
    period: t('projects.kbrw.period'),
    type: 'cdi',
    freelance: false,
    icon: Server,
    logo: '/logo/kbrw.webp'
  },
  {
    title: t('projects.woman.title'),
    role: t('projects.woman.role'),
    description: t('projects.woman.description'),
    technologies: ['NestJS', 'React', 'Next.js', 'Python', 'Go', 'Azure'],
    status: 'active',
    gradient: 'from-orange-400 to-red-500',
    period: t('projects.woman.period'),
    type: 'freelance',
    freelance: true,
    icon: Code2,
    logo: '/logo/happer.png'
  },
  {
    title: t('projects.nexen.title'),
    role: t('projects.nexen.role'),
    description: t('projects.nexen.description'),
    technologies: ['Python', 'AWS', 'ReactJS', 'VueJS', 'Architecture'],
    status: 'completed',
    gradient: 'from-teal-400 to-green-500',
    period: t('projects.nexen.period'),
    type: 'stage',
    freelance: false,
    icon: Cloud,
    logo: '/logo/nexen.png'
  },
  {
    title: t('projects.dizio.title'),
    role: t('projects.dizio.role'),
    description: t('projects.dizio.description'),
    technologies: ['Management', 'Android', 'Ruby', 'Product Owner'],
    status: 'completed',
    gradient: 'from-cyan-400 to-blue-500',
    period: t('projects.dizio.period'),
    type: 'stage',
    freelance: false,
    icon: Users,
    logo: '/logo/diziolab.png'
  }
]; 