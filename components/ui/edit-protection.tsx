'use client';

import { useEffect } from 'react';

export function EditProtection() {
  useEffect(() => {
    // Empêcher les raccourcis clavier d'édition
    const preventEditingShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === 'F2' ||
        (e.ctrlKey && e.key === 'e') ||
        (e.ctrlKey && e.key === 'E')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', preventEditingShortcuts);

    return () => {
      document.removeEventListener('keydown', preventEditingShortcuts);
    };
  }, []);

  return null;
}
