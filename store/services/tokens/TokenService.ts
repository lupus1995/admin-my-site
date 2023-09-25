import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IToken } from "store/models/tokens";

import { URL } from "../../../src/utils/constants";

const tokensApi = createApi({
  reducerPath: "tokens",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    updateRefreshToken: build.mutation<IToken, string | undefined>({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        headers: {
          authorization: data,
        },
      }),
    }),
    checkAccessToken: build.mutation<boolean, string | undefined>({
      query: (data) => ({
        url: "/auth/access",
        method: "POST",
        headers: {
          authorization: data,
        },
      }),
    }),
  }),
});

const { useUpdateRefreshTokenMutation, useCheckAccessTokenMutation } =
  tokensApi;
const { endpoints } = tokensApi;
const tokens = tokensApi.reducerPath;
const tokensReducer = tokensApi.reducer;
const tokensMiddleware = tokensApi.middleware;

export {
  useUpdateRefreshTokenMutation,
  useCheckAccessTokenMutation,
  tokensMiddleware,
  tokensReducer,
  tokens,
  endpoints,
};
