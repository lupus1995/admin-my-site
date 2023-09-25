import { get } from "local-storage";

import { AppDispatch } from "store/store";

import { endpoints } from "../TokenService";

export const getTokens = (): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken: string | undefined = get("accessToken");
  const refreshToken: string | undefined = get("refreshToken");

  return {
    accessToken,
    refreshToken,
  };
};

export const handleAccessTokenResponse =
  () => async (dispatch: AppDispatch) => {
    const { accessToken } = getTokens();
    const { checkAccessToken } = endpoints;
    const result = await dispatch(checkAccessToken.initiate(accessToken));

    const data: boolean = "error" in result ? false : result.data;

    return data;
  };
