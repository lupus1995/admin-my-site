/** @type {import('next-sitemap').IConfig} */

const excludeUrls = [
  '/server-sitemap-index.xml',
  '/admin',
  '/admin/*',
  '/signin',
  '/signup',
  '/404'
];

module.exports = {
    siteUrl: `https://${process.env.NEXT_PUBLIC_HOSTNAME}`,
    exclude: excludeUrls,
    generateRobotsTxt: true,
    robotsTxtOptions: {
      additionalSitemaps: [
        `https://${process.env.NEXT_PUBLIC_HOSTNAME}/server-sitemap-index.xml`, // <==== Add here
      ],
        policies: [
            {
              userAgent: '*',
              disallow: excludeUrls,
            },
          ],
    }
  }