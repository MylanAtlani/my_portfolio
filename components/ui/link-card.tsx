import { LucideIcon } from 'lucide-react';

interface LinkCardProps {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function LinkCard({ href, title, subtitle, icon: Icon, iconColor = 'var(--nothing-orange)' }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 nothing-card hover:scale-105 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl nothing-glass flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 nothing-text" style={{ color: iconColor }} />
      </div>
      <div>
        <div className="font-medium nothing-text">{title}</div>
        <div className="text-sm nothing-text opacity-70">{subtitle}</div>
      </div>
    </a>
  );
} 