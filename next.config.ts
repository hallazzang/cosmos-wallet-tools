import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cosmos-wallet-tools',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
