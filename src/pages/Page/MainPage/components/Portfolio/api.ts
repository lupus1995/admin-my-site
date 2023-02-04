import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ApiErrorMessageI, ArticleI } from "../../../../interface";

// получение данных для статей на главной странице
export const getNewArticles = async ({
  message,
}: ApiErrorMessageI): Promise<ResponseI<ArticleI[] | void>> => {
  const response = await fetch(
    `${URL}/articles?offset=0&limit=5&hasFilter=true`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status >= 400) {
    return {
      message,
      status: false,
    };
  }

  const result: ArticleI[] = await response.json();

  return {
    responseBody: result,
    status: true,
  };
};
