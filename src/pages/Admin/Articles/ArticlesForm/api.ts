import { updateTokens, getTokens } from "store/services/tokens";
import { AppDispatch } from "store/store";
import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

import { ArticleI } from "../../../interface";

export const getArticle =
  ({ id }: { id: string | undefined }) =>
  async (dispatch: AppDispatch): Promise<ResponseI<ArticleI | void>> => {
    const hasCorrectokens = await dispatch(updateTokens());

    if (hasCorrectokens.status && typeof id === "string") {
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

export const saveArticle =
  (data: ArticleI) =>
  async (dispatch: AppDispatch): Promise<ResponseI> => {
    const hasCorrectokens = await dispatch(updateTokens());
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

      const { _id }: { _id: string } = await response.json();

      return {
        message: "successSaveForm",
        status: true,
        redirectTo: `/admin/articles/edit/${data?._id || _id}`,
      };
    }

    return hasCorrectokens;
  };
