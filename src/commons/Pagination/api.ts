import { ApiErrorMessageI, ArticleI } from "pages/interface";
import { ResponseI } from "utils/interfaces";

export const getArticles = async ({
  message,
  offset,
}: ApiErrorMessageI & { offset: number }): Promise<
  ResponseI<ArticleI[] | void>
> => {
  const response = await fetch(
    `${URL}/articles?offset=${offset}&limit=8&hasFilter=true`,
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
