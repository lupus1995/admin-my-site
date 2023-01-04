import { LanguageI } from "utils/interfaces";

export interface ArticleI {
  title: LanguageI;
  description: LanguageI;
  thumbnail: string;
  text: LanguageI;
  keyWords: LanguageI;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hidePublishedArticle: boolean;
  _id?: string;
}
