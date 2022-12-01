import { HomeFormI } from "pages/Admin/Home/interfaces";
import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ImageI } from "./interface";

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

// получение данных об имени картинок на главной странице
export const getImageName = async (): Promise<ResponseI<HomeFormI | void>> => {
  const response = await fetch(`${URL}/main-page/imageName`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status >= 400) {
    return {
      message: "Ошибка получения данных о названии картинок",
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
