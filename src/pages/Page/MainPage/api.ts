import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ImageI, ImageNameI } from "./interface";
import { ApiErrorMessageI, HomeFormI } from "../../interface";

// получение данных с бекенда для главной страницы
export const get = async ({
  message,
}: ApiErrorMessageI): Promise<ResponseI<HomeFormI | void>> => {
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

// получение данных об имени картинок на главной странице
export const getImageName = async ({
  message,
}: ApiErrorMessageI): Promise<ResponseI<ImageNameI | void>> => {
  const response = await fetch(`${URL}/main-page/imageName`, {
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

// получение кода картинок для их отрисовки
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
