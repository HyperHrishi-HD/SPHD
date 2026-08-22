import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/webp"],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [160, 240, 320, 480],
    qualities: [58, 68, 75, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
