import CompressionPlugin from 'compression-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlaiceholder from '@plaiceholder/next';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!config.mode.includes('development')) {
      config.plugins.push(new CompressionPlugin());
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'manchui-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ryungbucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default bundleAnalyzer(withPlaiceholder(nextConfig));
