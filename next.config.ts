import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "www.apuls.dk", pathname: "/**" },
      { protocol: "https", hostname: "apuls.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.billig-fitness.dk",
        pathname: "/**",
      },
      { protocol: "https", hostname: "billig-fitness.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.workwalk.dk", pathname: "/**" },
      { protocol: "https", hostname: "workwalk.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.homex.dk", pathname: "/**" },
      { protocol: "https", hostname: "homex.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.cbl-fitness.dk", pathname: "/**" },
      { protocol: "https", hostname: "cbl-fitness.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.fitnessengros.dk", pathname: "/**" },
      { protocol: "https", hostname: "fitnessengros.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.fitnessfree.dk", pathname: "/**" },
      { protocol: "https", hostname: "fitnessfree.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.jtsport.dk", pathname: "/**" },
      { protocol: "https", hostname: "jtsport.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.partner-ads.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
