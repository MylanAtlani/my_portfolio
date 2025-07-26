import { LegacyTechnology } from '@/types/legacy';
import { Terminal, Layers, Code, Database, Cpu, Cloud, Smartphone, Code2 } from 'lucide-react';

export const technologies: LegacyTechnology[] = [
  { name: 'Go', years: 4, icon: Terminal },
  { name: 'NestJS', years: 5, icon: Layers },
  { name: 'Next.js', years: 4, icon: Code },
  { name: 'PostgreSQL', years: 6, icon: Database },
  { name: 'Docker', years: 5, icon: Cpu },
  { name: 'AWS', years: 4, icon: Cloud },
  { name: 'Flutter', years: 3, icon: Smartphone },
  { name: 'TypeScript', years: 5, icon: Code2 }
]; 