/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/blog/:slug',
          destination: '/blog/:slug',
        },
      ];
    },
  };
  
  export default nextConfig;