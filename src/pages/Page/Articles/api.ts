import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ApiErrorMessageI, ArticleI } from "../../interface";

// получение данных для статей на главной странице
export const getArticles = async ({
  message,
  offset,
  limit,
}: ApiErrorMessageI & { offset: number; limit: number }): Promise<
  ResponseI<ArticleI[] | void>
> => {
  const response = await fetch(
    `${URL}/articles?offset=${offset * limit}&limit=${limit}&hasFilter=true`,
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
