import { set } from "local-storage";

import { IToken } from "store/models/tokens";
import { AppDispatch } from "store/store";

import { getTokens } from "./share";
import { endpoints } from "../TokenService";

const checkRefteshToken = () => async (dispatch: AppDispatch) => {
  const { updateRefreshToken } = endpoints;
  const { refreshToken } = getTokens();
  const result = await dispatch(updateRefreshToken.initiate(refreshToken));

  if ("error" in result) {
    return false;
  }

  const data: IToken = result.data;

  if (data.accessToken && data.refreshToken) {
    set("accessToken", data.accessToken);
    set("refreshToken", data.refreshToken);
  }

  return true;
};

export const updateTokens = () => async (dispatch: AppDispatch) => {
  const { checkAccessToken } = endpoints;
  const { accessToken, refreshToken } = getTokens();
  const successMessage = "successToken";
  const errorMessage = "errorToken";

  // нет access и refresh токенов
  if (!accessToken && !refreshToken) {
    return {
      status: false,
      message: errorMessage,
      redirectTo: "/signin",
    };
  }

  // нет access, есть refresh токенов
  if (!accessToken && refreshToken) {
    const data = await dispatch(checkRefteshToken());
    return {
      status: data,
      message: data ? successMessage : errorMessage,
      redirectTo: "/signin",
    };
  }

  // есть access токен
  if (accessToken) {
    const result = await dispatch(checkAccessToken.initiate(accessToken));

    const data: boolean = "error" in result ? false : result.data;
    // access токен просрочен, сразу обновляем
    if (!data) {
      const dataRefreshToken = await dispatch(checkRefteshToken());

      return {
        status: dataRefreshToken,
        message: dataRefreshToken ? successMessage : errorMessage,
        redirectTo: "/signin",
      };
    }

    return {
      status: data,
      message: successMessage,
    };
  }

  return {
    status: false,
    message: errorMessage,
    redirectTo: "/signin",
  };
};
