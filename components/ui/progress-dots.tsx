'use client';

import { useEffect, useState } from 'react';

interface ProgressDotsProps {
  percentage: number;
  maxDots?: number;
  delay?: number;
  animate?: boolean;
}

export function ProgressDots({ percentage, maxDots = 20, delay = 0, animate = false }: ProgressDotsProps) {
  const [animatedDots, setAnimatedDots] = useState<number>(animate ? 0 : Math.round((percentage / 100) * maxDots));
  const targetDots = Math.round((percentage / 100) * maxDots);

  useEffect(() => {
    if (animate) {
      // Démarrer l'animation après le délai initial
      const startTimer = setTimeout(() => {
        let currentDot = 0;
        
        const animateNextDot = () => {
          if (currentDot < targetDots) {
            setAnimatedDots(currentDot + 1);
            currentDot++;
            // Délai entre chaque point (80ms)
            setTimeout(animateNextDot, 80);
          }
        };
        
        animateNextDot();
      }, delay);

      return () => clearTimeout(startTimer);
    } else {
      setAnimatedDots(targetDots);
    }
  }, [animate, targetDots, delay]);

  return (
    <div className="flex items-center space-x-2 h-3">
      {Array.from({ length: maxDots }, (_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
            index < animatedDots
              ? 'bg-[var(--nothing-orange)] shadow-[0_0_8px_var(--nothing-orange)] scale-110'
              : 'bg-white/10 scale-100'
          }`}
        />
      ))}
    </div>
  );
} 