import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { getTokens } from "store/services/tokens";
import { URL } from "utils/constants";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}/articles`,
    prepareHeaders: (headers) => {
      const { accessToken } = getTokens();
      headers.set("authorization", accessToken);

      return headers;
    },
  }),
  endpoints: (build) => ({
    uploadImageForArticle: build.mutation<
      { path: string },
      { body: FormData; id: string }
    >({
      query: ({ body, id }) => ({
        url: `/${id}/upload-image`,
        method: "post",
        formData: true,
        body: body,
      }),
    }),
  }),
});

export const { useUploadImageForArticleMutation } = imageApi;
export const { reducer, reducerPath, middleware } = imageApi;
