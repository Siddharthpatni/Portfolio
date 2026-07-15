import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Since it might be deployed to Vercel/static or need low overhead
  },
};

export default nextConfig;
