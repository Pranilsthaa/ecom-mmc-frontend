import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "example.com",
      },
      {
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
