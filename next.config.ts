import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Use standalone output for optimized Docker builds
  output: 'standalone',

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.weridealong.com',
        pathname: '/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable React strict mode for better performance
  reactStrictMode: true,

  // Compress output
  compress: true,

  async redirects() {
    return [
      {
        source: '/models/product-nest',
        destination: '/models/the-nest',
        permanent: true,
      },
      {
        source: '/models/nest',
        destination: '/models/the-nest',
        permanent: true,
      },
      {
        source: '/models/click-e',
        destination: '/models/the-click-e',
        permanent: true,
      },
      {
        source: '/models/long',
        destination: '/models/the-long',
        permanent: true,
      },
      {
        source: '/product/click-e',
        destination: '/models/the-click-e',
        permanent: true,
      },
      {
        source: '/product/long',
        destination: '/models/the-long',
        permanent: true,
      },
      {
        source: '/product/long-e',
        destination: '/models/the-long-e',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/support',
        permanent: true,
      },
      {
        source: '/shipping-returns-policy',
        destination: '/shipping-returns',
        permanent: true,
      },
      {
        source:
          '/guides-stories/riding-along-with-kids-front-loader-or-back-seat-electric-or-non-electric-3-wheels-or-2',
        destination: '/blog/the-ultimate-guide-to-choosing-your-perfect-bike',
        permanent: true,
      },
      {
        source: '/guides-stories/riding-in-dubai-along-with-kids-a-simple-guide',
        destination: '/blog/dubai-cycling-routes-families',
        permanent: true,
      },
      {
        source: '/guides-stories',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides-stories/:slug',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/locations/:city',
        destination: '/',
        permanent: true,
      },
      {
        source: '/along-partner-details/:slug',
        destination: '/',
        permanent: true,
      },
      {
        source: '/checkout',
        destination: '/order',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
