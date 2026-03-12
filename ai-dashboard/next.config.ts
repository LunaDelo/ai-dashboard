
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/ai-dashboard',
  assetPrefix: '/ai-dashboard/',
};

export default nextConfig;
