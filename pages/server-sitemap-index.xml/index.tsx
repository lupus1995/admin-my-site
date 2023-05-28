import { GetServerSideProps } from "next";
import { getServerSideSitemapIndexLegacy } from "next-sitemap";

import { URL } from "utils/constants";

const hostNameEnv = process.env.NEXT_PUBLIC_HOSTNAME;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const response = await fetch(`${URL}/sitemap`);

  const data = (await response.json()) as {
    articles: string[];
    projects: string[];
  };

  const articleUrls = data.articles.map(
    (articleId) => `https://${hostNameEnv}/article/${articleId}`
  );

  const projects = data.projects.map(
    (project) => `https://${hostNameEnv}${project}`
  );

  return getServerSideSitemapIndexLegacy(ctx, [...articleUrls, ...projects]);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
