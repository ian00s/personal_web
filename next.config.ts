import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal_web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal_web/' : '',
};

export default nextConfig;
