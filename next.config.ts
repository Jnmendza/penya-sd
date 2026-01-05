import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // For Wikipedia logos
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org", // For the future API we will use
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For the future API we will use
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
