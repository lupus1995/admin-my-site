import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { StatusI, StatusActionI } from "./types";

const initialState: StatusI = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  requestId: null,
};

const statusRequestSlice = createSlice({
  name: "statusRequest",
  initialState,
  reducers: {
    setIsLoading: (_state, action: PayloadAction<StatusActionI>) => ({
      ...initialState,
      isLoading: action.payload.status,
      requestId: action.payload.requestId,
    }),
    setIsError: (_state, action: PayloadAction<StatusActionI>) => ({
      ...initialState,
      isError: action.payload.status,
      requestId: action.payload.requestId,
    }),
    setIsSuccess: (_state, action: PayloadAction<StatusActionI>) => ({
      ...initialState,
      isSuccess: action.payload.status,
      requestId: action.payload.requestId,
    }),
    clearStatus: () => initialState,
  },
});

export const requestSelector = (state: RootState) => state.websockets.request;
export const { setIsError, setIsSuccess, setIsLoading, clearStatus } =
  statusRequestSlice.actions;
export const RequestReducer = statusRequestSlice.reducer;
