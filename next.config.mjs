/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['manchui-bucket.s3.ap-northeast-2.amazonaws.com', 'ryungbucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
