import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { getTokens } from "store/services/tokens";
import { URL } from "websockets/share/constants";

import { PaginationI, UserI } from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const { accessToken } = getTokens();
      headers.set("authorization", accessToken);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getInterlocutors: build.query<UserI[], PaginationI>({
      query: ({ limit, offset }) => ({
        url: `/user/interlocutors`,
        params: {
          limit,
          offset,
        },
      }),
    }),
  }),
});

const { getInterlocutors } = usersApi.endpoints;
const usersMiddleware = usersApi.middleware;
const users = usersApi.reducerPath;
const usersReducer = usersApi.reducer;

export { getInterlocutors, usersMiddleware, users, usersReducer };
