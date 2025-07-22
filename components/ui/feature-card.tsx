import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({ icon, title, description, delay = 0, className = '' }: FeatureCardProps) {
  return (
    <div 
      className={`nothing-glass rounded-3xl p-8 text-center space-y-6 nothing-animate-scale-in hover:scale-105 transition-all duration-500 nothing-animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '8s'
      }}
    >
      {/* Icon container */}
      <div className="w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center nothing-animate-glow">
        <div className="text-orange-600 dark:text-orange-400">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-nothing text-xl font-medium text-gray-900 dark:text-white nothing-dot">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
} 