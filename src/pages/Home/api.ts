import { checkToken, getTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

import { HomeFormI } from "./interfaces";

export const save = async ({
  data,
  isEditForm,
  id,
}: {
  data: HomeFormI;
  isEditForm: boolean;
  id: string;
}): Promise<ResponseI> => {
  const hasCorrectokens = await checkToken();
  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const requestUrl = isEditForm
      ? `${URL}/main-page/${id}`
      : `${URL}/main-page`;
    const response = await fetch(requestUrl, {
      method: isEditForm ? "put" : "post",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data, getCircularReplacer()),
    });

    if (response.status >= 400) {
      return {
        message: "Ошибка сохранения формы, попробуйте позже",
        status: false,
      };
    }

    return {
      message: "Форма успешно сохранена",
      status: true,
    };
  }

  return hasCorrectokens;
};

export const get = async (): Promise<ResponseI<HomeFormI | void>> => {
  const hasCorrectokens = await checkToken();
  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/main-page`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "Ошибка получени данных для формы, попробуйте позже",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }

  return hasCorrectokens;
};
