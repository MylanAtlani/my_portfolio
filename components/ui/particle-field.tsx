'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

const DESKTOP_COUNT = 85;
const MOBILE_COUNT = 35;
const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 200;
const GRID_SIZE = 160; // Spatial hash cell size

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  phase: number; // replaces Date.now() per-particle
  isOrange: boolean;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const isTouchRef = useRef(false);
  const { theme } = useTheme();

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        baseOpacity: Math.random() * 0.4 + 0.1,
        phase: Math.random() * Math.PI * 2,
        isOrange: Math.random() > 0.5,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect touch device
    isTouchRef.current = 'ontouchstart' in window;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isTouchRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const isLight = () => theme === 'light';
    let time = 0;

    // Spatial hash for O(n) connection lookups
    const findNeighbors = (particles: Particle[], idx: number): number[] => {
      const p = particles[idx];
      const neighbors: number[] = [];
      for (let j = idx + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        if (Math.abs(dx) < CONNECTION_DISTANCE && Math.abs(dy) < CONNECTION_DISTANCE) {
          const dist = dx * dx + dy * dy;
          if (dist < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            neighbors.push(j);
          }
        }
      }
      return neighbors;
    };

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const light = isLight();
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;
      const viewportH = window.innerHeight;

      // Scroll-based activity factor: particles are more active near the top
      const scrollFactor = Math.max(0.3, 1 - (scroll / (viewportH * 2)));

      time += 0.01;

      const particles = particlesRef.current;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction (desktop only)
        if (!isTouchRef.current) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < MOUSE_RADIUS && mDist > 0) {
            const force = (1 - mDist / MOUSE_RADIUS) * 0.02;
            p.vx += (mdx / mDist) * force;
            p.vy += (mdy / mDist) * force;
          }
        }

        // Apply velocity with scroll-based damping
        p.x += p.vx * scrollFactor;
        p.y += p.vy * scrollFactor;

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Bounce off edges
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)); }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)); }

        // Opacity with smooth sine pulse
        const baseOp = light ? 0.3 : 0.1;
        const pulseIntensity = light ? 0.4 : 0.3;
        const opacity = (baseOp + Math.abs(Math.sin(time + p.phase)) * pulseIntensity) * scrollFactor;

        // Speed for trail effect
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const trailSize = p.size + Math.min(speed * 3, 3);

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, trailSize, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, trailSize * 2.5);
        if (p.isOrange) {
          const c = light ? '255, 140, 0' : '255, 165, 0';
          gradient.addColorStop(0, `rgba(${c}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${c}, 0)`);
        } else {
          const c = light ? '30, 100, 180' : '0, 162, 255';
          gradient.addColorStop(0, `rgba(${c}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${c}, 0)`);
        }
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections (only check j > i to avoid duplicates)
        const neighbors = findNeighbors(particles, i);
        for (const j of neighbors) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);

          const lineColor = light ? '50, 50, 50' : '255, 255, 255';
          const lineOpacity = (light ? 0.15 : 0.08) * (1 - dist / CONNECTION_DISTANCE) * scrollFactor;
          ctx.strokeStyle = `rgba(${lineColor}, ${lineOpacity})`;
          ctx.lineWidth = light ? 0.8 : 0.5;
          ctx.stroke();
        }
      }

      // Nothing OS static dot grid layer (very subtle)
      const gridSpacing = 80;
      const dotOpacity = (light ? 0.04 : 0.02) * scrollFactor;
      if (dotOpacity > 0.005) {
        ctx.fillStyle = light ? `rgba(0, 0, 0, ${dotOpacity})` : `rgba(255, 255, 255, ${dotOpacity})`;
        for (let gx = gridSpacing / 2; gx < w; gx += gridSpacing) {
          for (let gy = gridSpacing / 2; gy < h; gy += gridSpacing) {
            ctx.beginPath();
            ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4, willChange: 'transform' }}
    />
  );
}
