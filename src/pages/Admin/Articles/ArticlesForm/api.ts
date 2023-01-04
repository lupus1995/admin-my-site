import { checkToken, getTokens } from "utils/apiTokens";
import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

import { ArticleI } from "../interface";

export const getArticle = async ({
  id,
}: {
  id: string;
}): Promise<ResponseI<ArticleI | void>> => {
  const hasCorrectokens = await checkToken();

  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const response = await fetch(`${URL}/articles/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });

    if (response.status >= 400) {
      return {
        message: "errorGetArticle",
        status: false,
      };
    }

    const result = await response.json();

    return {
      status: true,
      responseBody: result,
    };
  }
};

export const saveArticle = async (data: ArticleI): Promise<ResponseI> => {
  const hasCorrectokens = await checkToken();
  if (hasCorrectokens.status) {
    const { accessToken } = getTokens();
    const requestUrl = data?._id
      ? `${URL}/articles/${data._id}`
      : `${URL}/articles`;
    const response = await fetch(requestUrl, {
      method: data?._id ? "put" : "post",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data, getCircularReplacer()),
    });

    if (response.status >= 400) {
      return {
        message: "errorSaveArticle",
        status: false,
      };
    }

    return {
      message: "successSaveForm",
      status: true,
    };
  }

  return hasCorrectokens;
};
