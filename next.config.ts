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
  },
};

export default withNextIntl(nextConfig);
