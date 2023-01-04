import { LanguageI } from "utils/interfaces";

export interface MainPageI {
  firstBlockSubtitle: LanguageI;
  firstBlockTitle: LanguageI;
  aboutMeTitle: LanguageI;
  aboutMeDescription: LanguageI;
  firstBlockBackgroundImage: string;
}

export interface ImageNameI {
  firstBlockBackgroundImage: string;
  aboutMePhoto: string;
}

export interface ImageI {
  size: number;
  file: string;
}
