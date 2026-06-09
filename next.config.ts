import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
      },
    ],
  },
  // Ensure the gallery folder is traced into the serverless bundle so the
  // /api/gallery route can read it at runtime (e.g. on Vercel).
  outputFileTracingIncludes: {
    "/api/gallery": ["./public/assets/images/gallery/**"],
  },
};

export default nextConfig;
