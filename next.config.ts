import type { NextConfig } from "next";

import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "niligiri-tourism.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
  typedRoutes: false,
};

export default withIntlayer(nextConfig);
