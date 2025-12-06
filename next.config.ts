import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use standalone output for optimized Docker builds
  output: 'standalone',

  // Experimental: Use runtime environment variables instead of build-time
  // This allows changing env vars without rebuilding the Docker image


  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.alongweride.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
