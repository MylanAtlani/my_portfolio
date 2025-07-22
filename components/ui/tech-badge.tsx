interface TechBadgeProps {
  tech: string;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export function TechBadge({ tech, variant = 'default', className = '' }: TechBadgeProps) {
  const baseClasses = "text-xs px-3 py-1 rounded-full font-light transition-all duration-300 hover:scale-105";
  
  const variantClasses = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
    primary: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/50",
    secondary: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {tech}
    </span>
  );
} 