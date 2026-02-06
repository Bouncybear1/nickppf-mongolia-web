import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.nickppf.mn',
        pathname: '/assets/**',
      },
      {
        // Allow localhost for dev
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      }
    ],
  },
};

export default nextConfig;
