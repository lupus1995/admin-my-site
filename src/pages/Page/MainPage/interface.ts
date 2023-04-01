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

export interface ImageNameWidthI {
  imageName: string;
  is360: boolean;
  is481: boolean;
  is721: boolean;
  is1081: boolean;
  is1367: boolean;
  is1921: boolean;
  isMinDevicePixelRatio: boolean;
}
