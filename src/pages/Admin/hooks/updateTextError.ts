import { useEffect } from "react";

import { useLanguage, usePrevious } from "utils/hooks";

export const useUpdateTextError = ({
  isSubmitted,
  trigger,
}: {
  isSubmitted: boolean;
  trigger: () => void;
}) => {
  const { language: i18nLanguage } = useLanguage();

  const prevLng = usePrevious(i18nLanguage);

  // обновление сообщений если поменяли язык
  useEffect(() => {
    if (prevLng !== i18nLanguage && isSubmitted) {
      trigger();
    }
  }, [isSubmitted, i18nLanguage, prevLng, trigger]);
};
