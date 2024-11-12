import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dash/:shop",
        destination: "/dash/:shop/miscellaneous",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
