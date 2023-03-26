import { LanguageI } from "utils/interfaces";

// данные для главной страницы
export interface HomeFormI {
  firstBlockBackgroundImage: string;
  firstBlockTitle: LanguageI;
  firstBlockSubtitle: LanguageI;
  aboutMeTitle: LanguageI;
  aboutMeDescription: LanguageI;
  aboutMePhoto: string;
  keyWordsPage: LanguageI;
  descriptionPage: LanguageI;
  _id?: string;
}

// данные для статей на главной странице и на страницах списка статей, просмотра статей
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

export interface ApiErrorMessageI {
  message: string;
}
