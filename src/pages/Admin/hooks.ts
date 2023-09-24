import { useEffect, useState } from "react";

// eslint-disable-next-line import/named
import { throttle } from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { checkAccessTokens, updateTokens } from "utils/apiTokens";
import { useLanguage, usePrevious } from "utils/hooks";
import useUtilsStyles from "utils/styles";

// блокирует ввод данных и не дает возможности использовать события js/ts
export const useDisabled = () => {
  const utlisStyles = useUtilsStyles();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return { isDisabled, setIsDisabled, disabledClass: utlisStyles.disabled };
};

export const useSession = () => {
  const { push } = useRouter();
  const { t } = useLanguage();
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

          push("/signin");
        }
      });
    }, 90000);

    return () => clearInterval(interval);
  }, [push, t]);

  useEffect(() => {
    const callbackEventListener = () =>
      updateTokens().then((result) => {
        if (!result.status) {
          toast(t(result.message), {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          push(result.redirectTo);
        }
      });

    const redirect = throttle(callbackEventListener, 3000);

    window.addEventListener("click", redirect);
    window.addEventListener("keypress", redirect);
    window.addEventListener("scroll", redirect);
    window.addEventListener("mousemove", redirect);

    return () => {
      window.removeEventListener("click", redirect);
      window.removeEventListener("keypress", redirect);
      window.removeEventListener("scroll", redirect);
      window.removeEventListener("mousemove", redirect);
    };
  }, [push, t]);
};

// обновление текста ошибок после смены языка локали
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
