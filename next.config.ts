import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/common',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
