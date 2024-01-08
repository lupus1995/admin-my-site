import { useEffect, useMemo } from "react";

// eslint-disable-next-line import/named
import { throttle } from "lodash";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useAppDispatch } from "store/hooks";
import { useGetModuleName, Modules } from "store/services/manageModules";
import { checkAccessTokens, updateTokens } from "store/services/tokens";
import { useLanguage } from "utils/hooks";

const useGetRedirect = () => {
  const moduleName = useGetModuleName();

  const redirect = useMemo(() => {
    switch (moduleName) {
      case Modules.ADMIN_BLOG: {
        return "/signin";
      }

      case Modules.WEBSOCKETS: {
        return "/websockets/signin";
      }

      default: {
        return "/";
      }
    }
  }, [moduleName]);

  return redirect;
};

export const useSession = () => {
  const redirectUrl = useGetRedirect();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { t } = useLanguage();
  // активация интервала для разлогинивания пользователя
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkAccessTokens()).then((result) => {
        if (!result.status) {
          toast(t(result.message), {
            type: "error",
            hideProgressBar: true,
            theme: "colored",
          });

          push(redirectUrl);
        }
      });
    }, 90000);

    return () => clearInterval(interval);
  }, [dispatch, push, redirectUrl, t]);

  useEffect(() => {
    const callbackEventListener = () =>
      dispatch(updateTokens({ redirectTo: redirectUrl })).then((result) => {
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
  }, [dispatch, push, redirectUrl, t]);
};
