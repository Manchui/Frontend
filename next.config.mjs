/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['manchui-bucket.s3.ap-northeast-2.amazonaws.com', 'ryungbucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
