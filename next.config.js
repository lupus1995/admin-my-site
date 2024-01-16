// @ts-check
const path = require('path')
/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  images: {
    // domains: [`${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}//${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`],
    remotePatterns: [
      {
        // @ts-ignore
        protocol: process.env.NEXT_PUBLIC_BACKEND_PROTOCOL || "",
        // @ts-ignore
        hostname: process.env.NEXT_PUBLIC_BACKEND_HOST || "",
        port: process.env.NEXT_PUBLIC_BACKEND_PORT || "",
      },
    ],
  },
  // Uncomment the line below to enable basePath, pages and
  // redirects will then have a path prefix (`/app` in this case)
  //
  // basePath: '/app',

  async redirects() {
    return [
      // Regex Path Matching - The regex below will match `/post/123` but not `/post/abc`
      {
        source: "/signup",
        destination: "/signin",
        permanent: false,
      },
    ];
  },

  webpack: (config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'store': path.resolve(__dirname, 'store'),
      'websokets': path.resolve(__dirname, 'websokets')
    }
    
    return config
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig
