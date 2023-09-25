import { AppDispatch } from "store/store";
import { ResponseI } from "utils/interfaces";

import { getTokens, handleAccessTokenResponse } from "./share";

/**
 * - проверяем актуальность accessToken
 * - если актуален, то ничего не делаем
 * - если просроченный и пользователь ничего не делал, то выводим из системы
 */
export const checkAccessTokens =
  () =>
  async (dispatch: AppDispatch): Promise<ResponseI> => {
    const errorMessage = "errorToken";
    const { accessToken } = getTokens();
    if (!accessToken) {
      return {
        status: false,
        message: errorMessage,
        redirectTo: "/signin",
      };
    }

    const data = await dispatch(handleAccessTokenResponse());

    return {
      status: data,
      message: data ? "" : errorMessage,
      redirectTo: "/signin",
    };
  };
