import { get } from "local-storage";

import { defaultLanguage, supportLanguages } from "./constants";

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const getCurrentLanguager = () => {
  const languageFromLocalStorage: string = get("i18nextLng") || "";
  const currentLanguage = supportLanguages.includes(languageFromLocalStorage)
    ? languageFromLocalStorage
    : defaultLanguage;

  return currentLanguage;
};

export const hasWindow = () => {
  return Boolean(window);
};
