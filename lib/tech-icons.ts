import { Server, Globe, Database, Cloud, Shield, Smartphone, LucideIcon } from 'lucide-react';

/** Resolve a technology category to its Lucide icon */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  frontend: Globe,
  backend: Server,
  database: Database,
  devops: Cloud,
  mobile: Smartphone,
  other: Shield,
  design: Globe,
};

export function getTechIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || Server;
}
