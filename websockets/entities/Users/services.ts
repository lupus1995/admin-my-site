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

    searchInterlocutors: build.query<UserI[], PaginationI & { search: string }>(
      {
        query: ({ limit, offset, search }) => ({
          url: `/user/seach-interlocutors`,
          params: {
            limit,
            offset,
            search,
          },
        }),
      }
    ),
  }),
});

const { getInterlocutors, searchInterlocutors } = usersApi.endpoints;
const usersMiddleware = usersApi.middleware;
const users = usersApi.reducerPath;
const usersReducer = usersApi.reducer;

export {
  getInterlocutors,
  searchInterlocutors,
  usersMiddleware,
  users,
  usersReducer,
};
