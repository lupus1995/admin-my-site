import { get, set } from "local-storage";

import { URL } from "utils/constants";

import { TokenI } from "./interfaces";

export const checkToken = async (): Promise<boolean> => {
  const accessToken: string | undefined = get("accessToken");
  const refreshToken: string | undefined = get("refreshToken");

  if (!accessToken && !refreshToken) {
    return false;
  }
  if (!accessToken && refreshToken) {
    const response = await fetch(`${URL}/auth/refresh`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: refreshToken,
      },
    });

    const data: TokenI = await response.json();

    if (data.accessToken && data.refreshToken) {
      set("accessToken", data.accessToken);
      set("refreshToken", data.refreshToken);
    }

    return true;
  }
  if (accessToken) {
    const response = await fetch(`${URL}/auth/access`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    const data: boolean = await response.json();

    return data;
  }

  return false;
};
