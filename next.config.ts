import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@config': path.resolve(__dirname, 'config'),
        '@models': path.resolve(__dirname, 'models'),
      },
    };
    return config;
  },
};

export default nextConfig;