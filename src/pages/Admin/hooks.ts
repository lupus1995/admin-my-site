import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { checkAccessTokens, updateTokens } from "utils/apiTokens";
import { usePrevious } from "utils/hooks";
import useUtilsStyles from "utils/styles";

// блокирует ввод данных и не дает возможности использовать события js/ts
export const useDisabled = () => {
  const utlisStyles = useUtilsStyles();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return { isDisabled, setIsDisabled, disabledClass: utlisStyles.disabled };
};

export const useSession = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // активация интервала для разлогинивания пользователя
  useEffect(() => {
    const interval = setInterval(() => {
      checkAccessTokens().then((result) => {
        if (!result.status) {
          toast(t(result.message), {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          navigate("/signin");
        }
      });
    }, 90000);

    return () => clearInterval(interval);
  }, [navigate, t]);

  useEffect(() => {
    updateTokens();

    window.addEventListener("click", updateTokens);
    window.addEventListener("keypress", updateTokens);
    window.addEventListener("scroll", updateTokens);
    window.addEventListener("mousemove", updateTokens);

    return () => {
      window.removeEventListener("click", updateTokens);
      window.removeEventListener("keypress", updateTokens);
      window.removeEventListener("scroll", updateTokens);
      window.removeEventListener("mousemove", updateTokens);
    };
  }, []);
};

// обновление текста ошибок после смены языка локали
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
