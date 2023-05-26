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

interface CommonContentArticleProjectI {
  publishedAt: string;
  title: LanguageI;
  thumbnail: string;
  description: LanguageI;
  _id?: string;
}

// интерфейсы ContentI и CommonContentData содержат в себе данные для проекта и портфолио

// интерфейс ContentI сделать, чтобы привести к общему виду, чтобы вывести отрисовать данные
export interface ContentI extends CommonContentArticleProjectI {
  url: string;
}

// общие поля для проектов и статей вынесены в отдельный интерфейс, чтобы избежать дублирования
interface CommonArticleAndProjectDataI {
  createdAt: string;
  updatedAt: string;
  keyWords: LanguageI;
  hidePublished: boolean;
}

// данные для статей на главной странице и на страницах списка статей, просмотра статей
export interface ArticleI
  extends CommonContentArticleProjectI,
    CommonArticleAndProjectDataI {
  text: LanguageI;
}

export interface ApiErrorMessageI {
  message: string;
}

export interface ProjectI
  extends CommonContentArticleProjectI,
    CommonArticleAndProjectDataI {
  linkToProjectOnUi: string;
}

// общий интерфейс для проектов и статей для вывода на главной странице
export interface ContentMainPageI extends CommonContentArticleProjectI {
  link: string;
}
