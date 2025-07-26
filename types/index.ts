import { LucideIcon } from 'lucide-react';

export interface Project {
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

export interface Technology {
  name: string;
  years: number;
  icon: LucideIcon;
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