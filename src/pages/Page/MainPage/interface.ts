import { HomeFormI } from "pages/interface";
import { LanguageI, ResponseI } from "utils/interfaces";

export interface MainPagePropsI {
  dataResponse: ResponseI<void | HomeFormI>;
}

export interface MainPageI {
  firstBlockSubtitle: LanguageI;
  firstBlockTitle: LanguageI;
  aboutMeTitle: LanguageI;
  aboutMeDescription: LanguageI;
  firstBlockBackgroundImage: string;
  aboutMePhoto: string;
  keyWordsPage: LanguageI;
  descriptionPage: LanguageI;
}
