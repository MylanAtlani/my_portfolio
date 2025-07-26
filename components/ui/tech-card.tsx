import { LucideIcon } from 'lucide-react';

interface TechCardProps {
  name: string;
  category: string;
  icon: LucideIcon;
  color: string;
}

export function TechCard({ name, category, icon: Icon, color }: TechCardProps) {
  return (
    <div className="nothing-card p-4 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl nothing-glass flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="font-medium nothing-text">{name}</div>
          <div className="text-sm nothing-text opacity-70 capitalize">{category}</div>
        </div>
      </div>
    </div>
  );
} 