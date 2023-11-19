import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { IResponse } from "store/models/response";
import { IToken } from "store/models/tokens";

import { SignInI, SignUpI } from "./models";
import { URL } from "../../../src/utils/constants";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    signup: build.mutation<IResponse<IToken>, SignUpI>({
      query: (data) => ({
        url: "/auth/blog/signup",
        method: "POST",
        body: data,
      }),
    }),
    signin: build.mutation<IResponse<IToken>, SignInI>({
      query: (data) => ({
        url: "/auth/blog/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const { useSignupMutation, useSigninMutation } = authApi;
const auth = authApi.reducerPath;
const authReducer = authApi.reducer;
const authMiddleware = authApi.middleware;

export {
  auth,
  authReducer,
  authMiddleware,
  useSignupMutation,
  useSigninMutation,
};
