import { LucideIcon } from 'lucide-react';

// Types legacy pour la compatibilité
export interface LegacyTechnology {
  name: string;
  years: number;
  icon: LucideIcon;
}

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
  icon: LucideIcon;
  logo: string;
} 