import type { NextConfig } from "next";

import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
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
};

export default withIntlayer(nextConfig);
