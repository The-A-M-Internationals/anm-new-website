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
    // WebP only: AVIF encodes ~5-10x slower, so each new image size stalled the server (and, on
    // localhost, the same laptop the browser runs on) right as the visitor started scrolling.
    formats: ["image/webp"],
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
  experimental: {
    // Dev server memory target (bytes). On a 15 GB laptop it grew past 2 GB and Windows killed
    // its worker ("Jest worker encountered child process exceptions"). Does not affect the live site.
    turbopackMemoryLimit: 1536 * 1024 * 1024,
  },
};

export default withIntlayer(nextConfig);
