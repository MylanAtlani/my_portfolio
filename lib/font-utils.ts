/**
 * Utilitaires pour la gestion des fonts optimisées
 * Toutes les fonts utilisent font-display: swap pour éviter FOIT
 */

export type FontType = 'nothing' | 'inter' | 'system' | 'mono';

/**
 * Classes CSS pour les différents types de fonts
 */
export const fontClasses = {
  nothing: 'font-nothing', // Pour les titres et éléments de marque
  inter: 'font-inter',     // Pour le texte principal
  system: 'font-system',   // Pour les éléments système
  mono: 'font-mono',       // Pour le code
} as const;

/**
 * Variables CSS des fonts disponibles
 */
export const fontVariables = {
  nothing: 'var(--font-nothing)',
  inter: 'var(--font-inter)', 
  system: 'var(--font-system)',
  mono: 'var(--font-mono)',
} as const;

/**
 * Obtient la classe CSS pour un type de font donné
 */
export function getFontClass(type: FontType): string {
  return fontClasses[type];
}

/**
 * Combine plusieurs classes de fonts avec d'autres classes CSS
 */
export function combineWithFont(type: FontType, additionalClasses: string = ''): string {
  const fontClass = getFontClass(type);
  return additionalClasses ? `${fontClass} ${additionalClasses}` : fontClass;
}

/**
 * Vérifie si une font est chargée (utile pour le lazy loading)
 */
export async function isFontLoaded(fontFamily: string): Promise<boolean> {
  if (typeof document === 'undefined') {
    return false;
  }
  
  try {
    await document.fonts.load(`16px "${fontFamily}"`);
    return document.fonts.check(`16px "${fontFamily}"`);
  } catch (error) {
    console.warn(`Erreur lors de la vérification de la font ${fontFamily}:`, error);
    return false;
  }
}

/**
 * Preload une font programmatiquement
 */
export function preloadFont(fontUrl: string, fontType: string = 'font/otf'): void {
  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = fontUrl;
  link.as = 'font';
  link.type = fontType;
  link.crossOrigin = 'anonymous';
  
  // Éviter les doublons
  const existing = document.querySelector(`link[href="${fontUrl}"]`);
  if (!existing) {
    document.head.appendChild(link);
  }
}

/**
 * Hook pour gérer l'état de chargement des fonts
 */
export function useFontLoadingState(fontFamily: string) {
  if (typeof window === 'undefined') {
    return { isLoaded: false, isLoading: false };
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkFont = async () => {
      try {
        const loaded = await isFontLoaded(fontFamily);
        if (isMounted) {
          setIsLoaded(loaded);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsLoaded(false);
          setIsLoading(false);
        }
      }
    };

    checkFont();

    return () => {
      isMounted = false;
    };
  }, [fontFamily]);

  return { isLoaded, isLoading };
}

// Exports pour React (uniquement côté client)
let useState: any, useEffect: any;

if (typeof window !== 'undefined') {
  ({ useState, useEffect } = require('react'));
} 