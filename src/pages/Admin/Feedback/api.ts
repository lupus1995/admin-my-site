import { updateTokens, getTokens } from "store/services/tokens";
import { AppDispatch } from "store/store";
import { URL } from "utils/constants";
import { getCircularReplacer } from "utils/helpers";
import { ResponseI } from "utils/interfaces";

import { FeedbackI } from "./interface";

// получение списка статей
export const getFeedback =
  () =>
  async (dispatch: AppDispatch): Promise<ResponseI<FeedbackI[] | void>> => {
    const hasCorrectokens = await dispatch(updateTokens());

    if (hasCorrectokens.status) {
      const { accessToken } = getTokens();
      const response = await fetch(`${URL}/feedback?offset=0&limit=10`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
      });

      if (response.status >= 400) {
        return {
          message: "errorGetFeedbacks",
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

// удалить записи с обратной связью
export const deleteFeedback =
  ({ ids }: { ids: string[] }) =>
  async (dispatch: AppDispatch): Promise<ResponseI<FeedbackI[] | void>> => {
    const hasCorrectokens = await dispatch(updateTokens());

    if (hasCorrectokens.status) {
      const { accessToken } = getTokens();
      const response = await fetch(`${URL}/feedback`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
        body: JSON.stringify({ ids }, getCircularReplacer()),
      });

      if (response.status >= 400) {
        return {
          message: "errorByDeleteFeedback",
          status: false,
        };
      }

      const result = await response.json();

      return {
        status: true,
        message: "successByDeleteFeedback",
        responseBody: result,
      };
    }

    return hasCorrectokens;
  };
