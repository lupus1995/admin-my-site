import { checkToken, getTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { HomeFormI } from "../Home/interfaces";

export const getArticles = async (): Promise<ResponseI<HomeFormI | void>> => {
  const hasCorrectokens = await checkToken();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/articles?offset=0&limit=10`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "Ошибка при получении списка статей",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }
};
