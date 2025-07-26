import { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  iconColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SectionHeader({ 
  icon, 
  title, 
  iconColor = 'var(--nothing-blue)', 
  size = 'md',
  className = '' 
}: SectionHeaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-4 mb-6 ${className}`}>
      <div className={`${sizeClasses[size]} nothing-glass border flex items-center justify-center`}>
        <div 
          className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} rounded-full`}
          style={{ backgroundColor: iconColor }}
        />
      </div>
      <h2 className={`nothing-title ${titleSizes[size]} font-light`}>{title}</h2>
    </div>
  );
} 