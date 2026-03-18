'use client';

import { useEffect, useState } from 'react';

export function NothingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détecter si on est sur mobile/tablette
    const checkMobile = () => {
      // Détecter seulement les vrais mobiles/tablettes
      const hasTouch = 'ontouchstart' in window;
      const hasMaxTouchPoints = navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024; // Mobile et tablette < 1024px

      // Vérifier aussi si le dispositif supporte le hover précis (desktop)
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

      // Only hide cursor if small screen OR device lacks both hover and fine pointer
      const isMobileDevice = isSmallScreen || (!hasHover && !hasFinePointer);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Si mobile/tablette, ne pas afficher le curseur custom
    if (isMobile) return;

    // Signal to CSS that JS cursor is active — hides the SVG fallback cursor
    document.documentElement.setAttribute('data-custom-cursor', '');

    const INTERACTIVE_SELECTOR = 'button, a, [role="button"], [tabindex]:not([tabindex="-1"])';
    const TEXT_SELECTOR = 'input, textarea, [contenteditable]';

    // Suivre la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Gérer les clics
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Event delegation — one listener handles all interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(TEXT_SELECTOR)) {
        setIsText(true);
        setIsHovering(false);
      } else if (target.closest?.(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
        setIsText(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(INTERACTIVE_SELECTOR) || target.closest?.(TEXT_SELECTOR)) {
        setIsHovering(false);
        setIsText(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.documentElement.removeAttribute('data-custom-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  // Ne pas afficher le curseur sur mobile/tablette
  if (isMobile) return null;

  // Classes conditionnelles
  const cursorClasses = [
    'nothing-cursor',
    isHovering && 'hover',
    isClicking && 'click',
    isText && 'text'
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cursorClasses}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
} 