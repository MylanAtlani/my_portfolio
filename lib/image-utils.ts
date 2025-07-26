/**
 * Génère un placeholder blur data URL pour les images
 * @param width - Largeur du placeholder
 * @param height - Hauteur du placeholder
 * @param color - Couleur de base (hex sans #)
 * @returns Data URL pour le placeholder
 */
export function generateBlurDataURL(
  width: number = 8,
  height: number = 8,
  color: string = 'f3f4f6'
): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    // Fallback: data URL simple
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#${color}"/>
      </svg>`
    )}`;
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Remplir avec la couleur de base
  ctx.fillStyle = `#${color}`;
  ctx.fillRect(0, 0, width, height);
  
  // Ajouter un léger gradient pour l'effet blur
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `#${color}80`);
  gradient.addColorStop(1, `#${color}40`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Génère un placeholder blur statique (côté serveur)
 */
export const staticBlurDataURL = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

/**
 * Optimise les tailles d'image selon les breakpoints
 */
export function getOptimizedSizes(
  sizes: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  }
): string {
  const { mobile = 100, tablet = 50, desktop = 33 } = sizes;
  
  return [
    `(max-width: 640px) ${mobile}vw`,
    `(max-width: 1024px) ${tablet}vw`,
    `${desktop}vw`
  ].join(', ');
}

/**
 * Types pour les presets d'optimisation d'images
 */
export type ImagePreset = 'logo' | 'hero' | 'card' | 'avatar' | 'thumbnail';

/**
 * Configurations prédéfinies pour différents types d'images
 */
export const imagePresets: Record<ImagePreset, {
  quality: number;
  sizes: string;
  placeholder: 'blur' | 'empty';
}> = {
  logo: {
    quality: 90,
    sizes: '(max-width: 640px) 80px, (max-width: 768px) 112px, 128px',
    placeholder: 'blur'
  },
  hero: {
    quality: 85,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw',
    placeholder: 'blur'
  },
  card: {
    quality: 80,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    placeholder: 'blur'
  },
  avatar: {
    quality: 85,
    sizes: '(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px',
    placeholder: 'blur'
  },
  thumbnail: {
    quality: 75,
    sizes: '(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px',
    placeholder: 'blur'
  }
}; 