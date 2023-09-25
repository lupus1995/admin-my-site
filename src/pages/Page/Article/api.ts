import { ApiErrorMessageI, ArticleI } from "pages/interface";
import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

// получение данных для статей на главной странице
export const getArticle = async ({
  id,
  message,
}: ApiErrorMessageI & { id: string }): Promise<ResponseI<ArticleI | void>> => {
  const response = await fetch(`${URL}/articles/${id}`, {
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

  const result: ArticleI = await response.json();

  return {
    responseBody: result,
    status: true,
  };
};
