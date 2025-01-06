import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'source-map'; // Povolení zdrojových map
    }
    return config;
  },

  
};

export default nextConfig;
