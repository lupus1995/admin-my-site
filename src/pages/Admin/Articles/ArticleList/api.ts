import { updateTokens, getTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { ResponseI } from "utils/interfaces";

import { ArticleI } from "../../../interface";

// получение списка статей
export const getArticles = async (): Promise<ResponseI<ArticleI[] | void>> => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/articles?offset=0&limit=10`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorGetArticles",
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

// удаление статей
export const deletedArticle = async (
  articleId: string
): Promise<ResponseI<void>> => {
  const hasCorrectokens = await updateTokens();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/articles/${articleId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorDeleteArticle",
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
