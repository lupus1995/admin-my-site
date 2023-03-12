// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
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
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
