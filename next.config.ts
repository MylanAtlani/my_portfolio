import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
  experimental: {
    // Optimisations 2025
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dropdown-menu'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Nécessaire pour l'export statique
  },
  // Configuration pour GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
};

export default withNextIntl(nextConfig);
