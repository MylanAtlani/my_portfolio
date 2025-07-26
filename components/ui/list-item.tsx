import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
  dotColor?: string;
  dotSize?: 'sm' | 'md' | 'lg';
  className?: string;
  cardStyle?: boolean;
  hoverEffect?: 'scale' | 'translate' | 'none';
}

export function ListItem({ 
  children, 
  dotColor = 'var(--nothing-blue)', 
  dotSize = 'md',
  className = '',
  cardStyle = false,
  hoverEffect = 'scale'
}: ListItemProps) {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const hoverEffects = {
    scale: 'hover:scale-[1.02]',
    translate: 'hover:translate-x-2',
    none: ''
  };

  const baseClasses = cardStyle 
    ? `nothing-card p-4 ${hoverEffects[hoverEffect]} transition-all duration-300 group`
    : `flex items-start gap-3 p-4 nothing-card ${hoverEffects[hoverEffect]} transition-all duration-300 group`;

  return (
    <div className={`${baseClasses} ${className}`}>
      {cardStyle ? (
        <div className="flex items-start gap-4">
          <div 
            className={`${dotSizes[dotSize]} rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300`}
            style={{ backgroundColor: dotColor, marginTop: '0.5rem' }}
          />
          <div className="min-w-0 flex-1">
            {children}
          </div>
        </div>
      ) : (
        <>
          <div 
            className={`${dotSizes[dotSize]} rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300`}
            style={{ backgroundColor: dotColor, marginTop: '0.50rem' }}
          />
          <div className="min-w-0 flex-1">
            {children}
          </div>
        </>
      )}
    </div>
  );
} 