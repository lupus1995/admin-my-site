import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { SignUpI, TokenI } from "./models";
import { URL } from "../../src/utils/constants";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    signup: build.mutation<TokenI, SignUpI>({
      query: (data) => ({
        url: "/auth/blog/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

const { useSignupMutation } = authApi;
const auth = authApi.reducerPath;
const authReducer = authApi.reducer;
const authMiddleware = authApi.middleware;

export { auth, authReducer, authMiddleware, useSignupMutation };
