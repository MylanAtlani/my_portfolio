'use client';

interface ProgressDotsProps {
  percentage: number;
  maxDots?: number;
  delay?: number;
}

export function ProgressDots({ percentage, maxDots = 20, delay = 0 }: ProgressDotsProps) {
  const filledDots = Math.round((percentage / 100) * maxDots);

  return (
    <div className="flex items-center space-x-2 h-3">
      {Array.from({ length: maxDots }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index < filledDots
              ? 'bg-[var(--nothing-orange)] shadow-[0_0_8px_var(--nothing-orange)]'
              : 'bg-white/10'
          }`}
          style={{
            transitionDelay: `${delay + index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
} 