interface StatusDotProps {
  status: 'active' | 'warning' | 'error' | 'offline';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusDot({ status, label, size = 'md', className = '' }: StatusDotProps) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2", 
    lg: "w-3 h-3"
  };

  const statusClasses = {
    active: "bg-green-500 shadow-lg shadow-green-500/50",
    warning: "bg-yellow-500 shadow-lg shadow-yellow-500/50",
    error: "bg-red-500 shadow-lg shadow-red-500/50",
    offline: "bg-gray-400 dark:bg-gray-600"
  };

  const labelSizes = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm"
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${statusClasses[status]} rounded-full animate-pulse`}
      />
      {label && (
        <span className={`${labelSizes[size]} text-gray-600 dark:text-gray-400 font-light`}>
          {label}
        </span>
      )}
    </div>
  );
} 