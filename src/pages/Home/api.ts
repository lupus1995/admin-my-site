import { checkToken, getTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { HomeFormI } from "./interfaces";

export const save = async (data: HomeFormI): Promise<ResponseI> => {
  if (await checkToken()) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/main-page`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data),
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

  return {
    message: "Токены просрочены, авторизуйтесь пожалуйста",
    status: false,
    redirectTo: "/signin",
  };
};
