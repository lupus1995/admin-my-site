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

export const checkToken = async (): Promise<ResponseI> => {
  const { accessToken, refreshToken } = getTokens();
  const successMessage = "Токены обновлены.";
  const errorMessage = "Токены просрочены, авторизуйтесь пожалуйста.";

  // нет access и refresh токенов
  if (!accessToken && !refreshToken) {
    return {
      status: false,
      message: errorMessage,
    };
  }
  // нет access, есть refresh токенов
  if (!accessToken && refreshToken) {
    const data = await checkRefteshToken();
    return {
      status: data,
      message: data ? successMessage : errorMessage,
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
  };
};
