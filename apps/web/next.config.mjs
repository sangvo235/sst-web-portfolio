/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@sst-web-portfolio/ui"],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'media.myswitzerland.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'cloud.anylogic.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'news.mit.edu',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'media.licdn.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'linkedin.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'github.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'svgrepo.com',
        protocol: 'https',
        port: '',
      }
    ],
  },
};

export default nextConfig
