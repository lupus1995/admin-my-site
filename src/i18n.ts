import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { get } from "local-storage";
import { initReactI18next } from "react-i18next";

import { supportLanguages, defaultLanguage } from "utils/constants";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

// получение текущего языка из локальной истории браузера
// если из локальной истории браузера не получилось достать версию языка
// тогда устанавливается дефолтная версия языка для сайта
const getCurrentLanguager = () => {
  const languageFromLocalStorage: string = get("i18nextLng") || "";
  const currentLanguage = supportLanguages.includes(languageFromLocalStorage)
    ? languageFromLocalStorage
    : defaultLanguage;

  return currentLanguage;
};

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en,
  ru,
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getCurrentLanguager(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
