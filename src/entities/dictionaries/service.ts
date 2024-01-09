import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { URL } from "websockets/share/constants";

const service = createApi({
  reducerPath: "dictionaries",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (build) => ({
    getTypeTextEditor: build.query<unknown, void>({
      query: () => ({
        url: `/dictionaries/text-editor`,
      }),
    }),
  }),
});

export const { useGetTypeTextEditorQuery } = service;
export const { getTypeTextEditor } = service.endpoints;
export const dictionariesMiddleware = service.middleware;
export const dictionaries = service.reducerPath;
export const dictionariesReducer = service.reducer;
