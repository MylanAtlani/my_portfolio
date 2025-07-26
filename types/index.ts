import { LucideIcon } from 'lucide-react';

export interface Project {
  // Identifiants
  id: string; // slug pour les URLs
  title: string;
  
  // Informations entreprise
  company: string;
  companyLogo: string;
  companyWebsite?: string;
  
  // Rôle et mission
  role: string;
  description: string; // Description courte pour la liste
  fullDescription?: string; // Description complète pour la page détail
  
  // Détails techniques
  technologies: Technology[];
  mainTechnology?: string; // Tech principale
  
  // Contexte projet
  status: 'active' | 'completed' | 'paused';
  type: 'freelance' | 'cdi' | 'stage' | 'personnel';
  period: string;
  duration?: string; // ex: "6 mois"
  teamSize?: number;
  
  // Contenu détaillé
  mission?: string[];
  challenges?: string[];
  achievements?: string[];
  learnings?: string[];
  
  // Ressources
  images?: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  // Affichage
  gradient: string;
  icon: LucideIcon;
  featured?: boolean; // Projets mis en avant
  
  // SEO & Meta
  metaDescription?: string;
  keywords?: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  type: 'screenshot' | 'architecture' | 'mockup' | 'logo';
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'design' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
  icon?: LucideIcon;
  color?: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Stats {
  value: string;
  label: string;
} 