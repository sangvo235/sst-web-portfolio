/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@sst-web-portfolio/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "media.licdn.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "linkedin.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "github.com",
        protocol: "https",
        port: "",
      },
      {
        hostname:
          "sang-vo-sst-web-portfolio-app.s3.ap-southeast-2.amazonaws.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
