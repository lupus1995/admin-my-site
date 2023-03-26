import { HomeFormI, ArticleI } from "pages/interface";
import { LanguageI, ResponseI } from "utils/interfaces";

export interface MainPagePropsI {
  dataResponse: ResponseI<void | HomeFormI>;
  imageNameResponse: ResponseI<void | ImageNameI>;
  newArticlesResponse: ResponseI<void | ArticleI[]>;
}

export interface MainPageI {
  firstBlockSubtitle: LanguageI;
  firstBlockTitle: LanguageI;
  aboutMeTitle: LanguageI;
  aboutMeDescription: LanguageI;
  firstBlockBackgroundImage: string;
  keyWordsPage: LanguageI;
  descriptionPage: LanguageI;
}

export interface ImageNameI {
  firstBlockBackgroundImage: string;
  aboutMePhoto: string;
}

export interface ImageI {
  size: number;
  file: string;
}
