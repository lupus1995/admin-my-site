import { supportLanguages, defaultLanguage } from "utils/constants";

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

// проверяет наличие объекта window
// сделано для того, чтобы на стороне ssr исключить рендеринг для компонента для которого
// требуется наличие объекта window
export const hasWindow = () => {
  return typeof window !== "undefined";
};

// получение текущего языка из локальной истории браузера
// если из локальной истории браузера не получилось достать версию языка
// тогда устанавливается дефолтная версия языка для сайта
export const getCurrentLanguager = ({ language }: { language: string }) => {
  const currentLanguage = supportLanguages.includes(language)
    ? language
    : defaultLanguage;

  return currentLanguage;
};
