import { Project as DetailedProject } from '@/types';

// Interface pour la compatibilité avec l'ancienne section projects
export interface LegacyProject {
  title: string;
  role: string;
  description: string;
  technologies: string[];
  status: 'active' | 'completed';
  gradient: string;
  period: string;
  type: 'freelance' | 'cdi' | 'stage';
  freelance: boolean;
  icon: any;
  logo: string;
  // Nouvelles propriétés pour les liens
  id: string;
  company: string;
}

// Adaptateur pour convertir les nouvelles données au format legacy
export function adaptProjectForLegacy(project: DetailedProject): LegacyProject {
  return {
    id: project.id,
    title: project.title,
    role: project.role,
    description: project.description,
    technologies: project.technologies.map(tech => tech.name),
    status: project.status === 'paused' ? 'active' : project.status, // Map paused to active for legacy
    gradient: project.gradient,
    period: project.period,
    type: project.type === 'personnel' ? 'freelance' : project.type, // Map personnel to freelance for legacy
    freelance: project.type === 'freelance' || project.type === 'personnel',
    icon: project.icon,
    logo: project.companyLogo,
    company: project.company,
  };
}

// Fonction pour adapter une liste de projets
export function adaptProjectsForLegacy(projects: DetailedProject[]): LegacyProject[] {
  return projects.map(adaptProjectForLegacy);
} 