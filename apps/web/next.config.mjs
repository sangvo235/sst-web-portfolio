/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@sst-web-portfolio/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "linkedin.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname:
          "sang-vo-sst-web-portfolio-app.s3.ap-southeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "sst-web-portfolio-sang-vo.vercel.app",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "expo-secure-store": false,
    };

    return config;
  },
};

export default nextConfig;
