import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co", // Allow all Supabase projects
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org", // For the future API we will use
      },
    ],
  },
};

export default withNextIntl(nextConfig);
