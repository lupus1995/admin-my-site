import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { usePrevious } from "utils/hooks";
import useUtilsStyles from "utils/styles";

// блокирует ввод данных и не дает возможности использовать события js/ts
export const useDisabled = () => {
  const utlisStyles = useUtilsStyles();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return { isDisabled, setIsDisabled, disabledClass: utlisStyles.disabled };
};

export const useUpdateTextError = ({
  isSubmitted,
  trigger,
}: {
  isSubmitted: boolean;
  trigger: () => void;
}) => {
  const { i18n } = useTranslation();

  const prevLng = usePrevious(i18n.language);

  // обновление сообщений если поменяли язык
  useEffect(() => {
    if (prevLng !== i18n.language && isSubmitted) {
      trigger();
    }
  }, [i18n.language, isSubmitted, prevLng, trigger]);
};
