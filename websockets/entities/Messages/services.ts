import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { getTokens } from "store/services/tokens";
import { URL } from "websockets/share/constants";

import { CreateMessageI, RoomIdI, TYPE_MESSAGE } from "./types";
import { MessageI, PaginationI } from "../share/types";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const { accessToken } = getTokens();
      headers.set("authorization", accessToken);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessages: build.query<MessageI[], PaginationI & RoomIdI>({
      query: ({ limit, offset, roomId }) => ({
        url: `/message/room/${roomId}`,
        params: {
          limit,
          offset,
        },
      }),
    }),
    getTypesMessage: build.query<TYPE_MESSAGE, void>({
      query: () => ({
        url: `/message/types`,
      }),
    }),
    createMessage: build.mutation<MessageI, CreateMessageI>({
      query: (data) => ({
        url: `/message`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { getMessages, getTypesMessage, createMessage } =
  messagesApi.endpoints;
export const messagesMidlware = messagesApi.middleware;
export const messages = messagesApi.reducerPath;
export const messagesApiReducer = messagesApi.reducer;
