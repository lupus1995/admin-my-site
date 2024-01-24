import { useRef, useEffect, MutableRefObject, useMemo } from "react";

import { useTranslation } from "react-i18next";

// возвращает предыдущее значение переменной для которой задан текущий хук
export const usePrevious = <T>(value: T) => {
  const ref: MutableRefObject<T> = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const language = useMemo(() => {
    if (i18n.language === "ru-RU") {
      return "ru";
    }

    if (i18n.language === "en-EN") {
      return "en";
    }

    return "ru";
  }, [i18n.language]);

  return {
    t,
    language,
    changeLanguage: i18n.changeLanguage,
  };
};
