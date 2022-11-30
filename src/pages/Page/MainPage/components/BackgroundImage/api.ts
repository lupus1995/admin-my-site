import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ImageI } from "./interface";

export const getImages = async ({
  message = "Ошибка получени данных для формы, попробуйте позже",
  imageName,
}: {
  message?: string;
  imageName: string;
}): Promise<ResponseI<ImageI[]>> => {
  const response = await fetch(`${URL}/main-page/${imageName}`, {
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
