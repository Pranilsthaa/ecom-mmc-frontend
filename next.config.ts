import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
