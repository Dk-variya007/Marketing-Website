/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // The Tracking Flow page was merged into the Tracking Map, which now lives under Product.
      { source: '/tracking-flow', destination: '/product/tracking-map', permanent: true },
      { source: '/tracking-map', destination: '/product/tracking-map', permanent: true },
    ];
  },
};

export default nextConfig;
