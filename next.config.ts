import type { NextConfig } from "next";

import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Served resized + AVIF/WebP per device; full-size PNGs were stalling GPU raster mid-scroll.
    // Firestore-driven images (unknown hosts) opt out per-image with `unoptimized`.
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "niligiri-tourism.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
      { protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "**" },
      { protocol: "https", hostname: "**.amazonaws.com", pathname: "**" },
    ],
  },
  typedRoutes: false,
};

export default withIntlayer(nextConfig);
