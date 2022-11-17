import { get, set } from "local-storage";

import { URL } from "utils/constants";

import { TokenI } from "./interfaces";

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

export const checkToken = async (): Promise<boolean> => {
  const accessToken: string | undefined = get("accessToken");
  const refreshToken: string | undefined = get("refreshToken");

  // нет access и refresh токенов
  if (!accessToken && !refreshToken) {
    return false;
  }
  // нет access, есть refresh токенов
  if (!accessToken && refreshToken) {
    const data = await checkRefteshToken();
    return data;
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

      return dataRefreshToken;
    }

    return data;
  }

  return false;
};
