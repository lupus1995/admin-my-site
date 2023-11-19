import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "store/models/response";
import { IToken } from "store/models/tokens";
import { URL } from "websockets/share/constants";

import { LoginI, SignupI } from "./types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    signup: build.mutation<IResponse<IToken>, SignupI>({
      query: (data) => ({
        url: "/auth/websockets/signup",
        method: "POST",
        body: data,
      }),
    }),
    signin: build.mutation<IResponse<IToken>, LoginI>({
      query: (data) => ({
        url: "/auth/websockets/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const { useSignupMutation, useSigninMutation } = authApi;
const authMiddleware = authApi.middleware;
const auth = authApi.reducerPath;
const authReducer = authApi.reducer;

export {
  useSignupMutation,
  authMiddleware,
  auth,
  authReducer,
  useSigninMutation,
};
