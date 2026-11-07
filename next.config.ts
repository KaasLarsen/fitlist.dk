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
      { protocol: "https", hostname: "m2.apuls.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.billig-fitness.dk",
        pathname: "/**",
      },
      { protocol: "https", hostname: "billig-fitness.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "billigsport24.b-cdn.net",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.workwalk.dk", pathname: "/**" },
      { protocol: "https", hostname: "workwalk.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.homex.dk", pathname: "/**" },
      { protocol: "https", hostname: "homex.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.cbl-fitness.dk", pathname: "/**" },
      { protocol: "https", hostname: "cbl-fitness.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.denintelligentekrop.dk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "denintelligentekrop.dk",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.fitnessengros.dk", pathname: "/**" },
      { protocol: "https", hostname: "fitnessengros.dk", pathname: "/**" },
      { protocol: "https", hostname: "www.fitnessfree.dk", pathname: "/**" },
      { protocol: "https", hostname: "fitnessfree.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "shop93647.sfstatic.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shop12835.sfstatic.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sw73240.sfstatic.io",
        pathname: "/**",
      },
      { protocol: "https", hostname: "www.jtsport.dk", pathname: "/**" },
      { protocol: "https", hostname: "jtsport.dk", pathname: "/**" },
      {
        protocol: "https",
        hostname: "www.traeningspartner.dk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "traeningspartner.dk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.partner-ads.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sportgymbutikken.dk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sportgymbutikken.dk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
