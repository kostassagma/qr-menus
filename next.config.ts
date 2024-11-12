import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dash/:shop(\(?!new-shop$|new-shop/$|$)[^/]+)",
        destination: "/dash/:shop/miscellaneous",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
