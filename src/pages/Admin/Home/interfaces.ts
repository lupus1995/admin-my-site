import { LanguageI } from "utils/interfaces";

export interface HomeFormI {
  firstBlockBackgroundImage: string;
  firstBlockTitle: LanguageI;
  firstBlockSubtitle: LanguageI;
  aboutMeTitle: LanguageI;
  aboutMeDescription: LanguageI;
  aboutMePhoto: string;
  _id?: string;
}
