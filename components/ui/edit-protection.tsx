'use client';

import { useEffect } from 'react';

export function EditProtection() {
  useEffect(() => {
    // Fonction pour désactiver l'édition sur tous les éléments
    const disableEditing = () => {
      // Supprimer contenteditable de tous les éléments sauf ceux autorisés
      const allElements = document.querySelectorAll('*');
      allElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Ne pas toucher aux vrais inputs/textarea
        if (htmlElement && htmlElement.matches && !htmlElement.matches('input, textarea, [data-editable="true"]')) {
          htmlElement.removeAttribute('contenteditable');
          htmlElement.setAttribute('contenteditable', 'false');
        }
      });
    };

    // Désactiver la sélection de texte accidentelle
    const preventAccidentalSelection = (e: Event) => {
      const target = e.target;
      
      // Triple vérification pour être sûr que c'est un HTMLElement avec matches
      if (!target || 
          typeof target !== 'object' || 
          !('matches' in target) || 
          typeof (target as any).matches !== 'function') {
        return;
      }
      
      const htmlTarget = target as HTMLElement;
      
      // Permettre la sélection seulement sur les éléments appropriés
      try {
        if (!htmlTarget.matches('input, textarea, [data-selectable="true"], p, span, h1, h2, h3, h4, h5, h6')) {
          e.preventDefault();
        }
      } catch (error) {
        // Si matches échoue, on ne fait rien
        return;
      }
    };

    // Empêcher les raccourcis clavier d'édition
    const preventEditingShortcuts = (e: KeyboardEvent) => {
      // Empêcher F2 (renommer), Ctrl+E (éditer), etc.
      if (
        e.key === 'F2' ||
        (e.ctrlKey && e.key === 'e') ||
        (e.ctrlKey && e.key === 'E')
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Observer pour les nouveaux éléments
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            
            // Désactiver l'édition sur les nouveaux éléments
            try {
              if (element && element.matches && !element.matches('input, textarea, [data-editable="true"]')) {
                element.removeAttribute('contenteditable');
                element.setAttribute('contenteditable', 'false');
              }
            } catch (error) {
              // Si matches échoue, on continue
            }

            // Appliquer récursivement aux enfants
            try {
              const children = element.querySelectorAll('*');
              children.forEach((child) => {
                const childElement = child as HTMLElement;
                if (childElement && childElement.matches && !childElement.matches('input, textarea, [data-editable="true"]')) {
                  childElement.removeAttribute('contenteditable');
                  childElement.setAttribute('contenteditable', 'false');
                }
              });
            } catch (error) {
              // Si querySelectorAll ou matches échoue, on continue
            }
          }
        });
      });
    });

    // Initialiser
    disableEditing();

    // Ajouter les événements
    document.addEventListener('selectstart', preventAccidentalSelection, { passive: false });
    document.addEventListener('keydown', preventEditingShortcuts);

    // Observer les changements du DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['contenteditable']
    });

    // Vérifier périodiquement (au cas où)
    const interval = setInterval(disableEditing, 5000);

    // Empêcher la sélection de texte sur tous les éléments cliquables
    const style = document.createElement('style');
    style.textContent = `
      a, button, [role="button"], .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Autorise la sélection de texte sur les éléments de contenu */
      p, span, div:not([role]), .selectable {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      /* Curseur pointer pour tous les éléments cliquables */
      a, button, [role="button"], .clickable {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('selectstart', preventAccidentalSelection);
      document.removeEventListener('keydown', preventEditingShortcuts);
      observer.disconnect();
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
} 