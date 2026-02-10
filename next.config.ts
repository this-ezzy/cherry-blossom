import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/love',
        permanent: false,
      },
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
