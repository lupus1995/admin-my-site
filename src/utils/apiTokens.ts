import { get, set } from "local-storage";

import { URL } from "utils/constants";

import { ResponseI, TokenI } from "./interfaces";

const checkRefteshToken = async () => {
  const refreshToken: string | undefined = get("refreshToken");
  const response = await fetch(`${URL}/auth/refresh`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",


      
      authorization: refreshToken,
    },
  });

  if (response.status >= 400) {
    return false;
  }

  const data: TokenI = await response.json();

  if (data.accessToken && data.refreshToken) {
    set("accessToken", data.accessToken);
    set("refreshToken", data.refreshToken);
  }

  return true;
};

export const getTokens = (): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken: string | undefined = get("accessToken");
  const refreshToken: string | undefined = get("refreshToken");

  return {
    accessToken,
    refreshToken,
  };
};

export const checkAccessTokens = async (): Promise<ResponseI> => {
  /**
   * - проверяем актуальность accessToken
   * - если актуален, то ничего не делаем
   * - если просроченный и пользователь ничего не делал, то выводим из системы
   */
  const errorMessage = "errorToken";
  const { accessToken } = getTokens();
  if (!accessToken) {
    return {
      status: false,
      message: errorMessage,
      redirectTo: "/signin",
    };
  }

  const response = await fetch(`${URL}/auth/access`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  });

  const data: boolean = await response.json();

  return {
    status: data,
    message: data ? "" : errorMessage,
    redirectTo: "/signin",
  };
};

export const updateTokens = async (): Promise<ResponseI> => {
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
    const data = await checkRefteshToken();
    return {
      status: data,
      message: data ? successMessage : errorMessage,
      redirectTo: "/signin",
    };
  }
  // есть access токен
  if (accessToken) {
    const response = await fetch(`${URL}/auth/access`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    const data: boolean = await response.json();
    // access токен просрочен, сразу обновляем
    if (!data) {
      const dataRefreshToken = await checkRefteshToken();

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
