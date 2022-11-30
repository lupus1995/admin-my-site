import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { HomeFormI } from "./Admin/Home/interfaces";

// получение данных с бекенда для главной страницы
export const get = async ({
  message = "Ошибка получени данных для формы, попробуйте позже",
}: {
  message?: string;
}): Promise<ResponseI<HomeFormI | void>> => {
  const response = await fetch(`${URL}/main-page`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status >= 400) {
    return {
      message,
      status: false,
    };
  }

  const result = await response.json();

  return {
    status: true,
    responseBody: result,
  };
};
