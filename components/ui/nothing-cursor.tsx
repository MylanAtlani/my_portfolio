'use client';

import { useEffect, useState } from 'react';

export function NothingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    // Suivre la position de la souris
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Gérer les clics
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Gérer les hovers sur les éléments interactifs
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, [role="button"], [tabindex]:not([tabindex="-1"])')) {
        setIsHovering(true);
        setIsText(false);
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setIsText(true);
        setIsHovering(false);
      } else {
        setIsHovering(false);
        setIsText(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsText(false);
    };

    // Ajouter les événements
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Événements pour tous les éléments interactifs
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, [contenteditable], [role="button"], [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Observer pour les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const newInteractiveElements = element.querySelectorAll?.(
              'button, a, input, textarea, [contenteditable], [role="button"], [tabindex]:not([tabindex="-1"])'
            );
            
            newInteractiveElements?.forEach(newElement => {
              newElement.addEventListener('mouseenter', handleMouseEnter);
              newElement.addEventListener('mouseleave', handleMouseLeave);
            });

            // Vérifier si l'élément lui-même est interactif
            if (element.matches?.('button, a, input, textarea, [contenteditable], [role="button"], [tabindex]:not([tabindex="-1"])')) {
              element.addEventListener('mouseenter', handleMouseEnter);
              element.addEventListener('mouseleave', handleMouseLeave);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });

      observer.disconnect();
    };
  }, []);

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