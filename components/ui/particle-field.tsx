'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? 'var(--nothing-orange)' : 'var(--nothing-blue)'
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Couleurs adaptées au thème
      const isLight = theme === 'light';

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Pulse opacity - Plus visible en mode clair
        const baseOpacity = isLight ? 0.3 : 0.1;
        const pulseIntensity = isLight ? 0.4 : 0.3;
        particle.opacity = baseOpacity + Math.abs(Math.sin(Date.now() * 0.001 + particle.x * 0.001)) * pulseIntensity;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create gradient for glow effect with theme-aware colors
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        
        if (particle.color === 'var(--nothing-orange)') {
          const orangeColor = isLight ? '255, 140, 0' : '255, 165, 0'; // Plus foncé en mode clair
          gradient.addColorStop(0, `rgba(${orangeColor}, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(${orangeColor}, 0)`);
        } else {
          const blueColor = isLight ? '30, 100, 180' : '0, 162, 255'; // Plus foncé en mode clair
          gradient.addColorStop(0, `rgba(${blueColor}, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(${blueColor}, 0)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle) => {
          if (particle !== otherParticle) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              
              // Couleur des lignes adaptée au thème
              const lineColor = isLight ? '50, 50, 50' : '255, 255, 255';
              const lineOpacity = isLight ? 0.2 : 0.1;
              ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity * (1 - distance / 100)})`;
              ctx.lineWidth = isLight ? 0.8 : 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]); // Ajouter theme comme dépendance pour relancer l'animation quand le thème change

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
} 