import { Feature } from '@/types';
import { Server, Cloud, Zap } from 'lucide-react';

export const features: Feature[] = [
  {
    icon: Server,
    title: 'Architecture Backend',
    description: 'Refonte et mise en place d\'architectures robustes avec Go, NestJS et Next.js pour des backends scalables',
    color: 'var(--nothing-blue)'
  },
  {
    icon: Cloud,
    title: 'Infrastructure & CI/CD',
    description: 'Structuration CI/CD complète avec Docker, Traefik, PostgreSQL et AWS pour une infrastructure scalable',
    color: 'var(--nothing-green)'
  },
  {
    icon: Zap,
    title: 'Conseil Stratégique',
    description: 'Audit technique, conseil sur la dette technique et accompagnement du delivery pour optimiser la productivité',
    color: 'var(--nothing-yellow)'
  }
]; 