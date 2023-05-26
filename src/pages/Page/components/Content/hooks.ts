import { ArticleI, ContentI, ProjectI } from "pages/interface";

import { CONTENT_TYPES } from "./types";

const getUrlForProject = (project: ProjectI) => project.linkToProjectOnUi;
const getUrlForArticle = (article: ArticleI) => `/article/${article._id}`;

// получение данных для контента
export const useGetConents = (
  data: ArticleI[] | ProjectI[],
  contentType: CONTENT_TYPES
): ContentI[] => {
  return data.map((item) => {
    const { publishedAt, title, thumbnail, description, _id } = item;

    const url =
      contentType === "article"
        ? getUrlForArticle(item as ArticleI)
        : getUrlForProject(item as ProjectI);

    return {
      publishedAt,
      title,
      thumbnail,
      description,
      _id,
      url,
    };
  });
};
