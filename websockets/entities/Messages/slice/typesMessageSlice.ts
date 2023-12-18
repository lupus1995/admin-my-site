import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { TYPE_MESSAGE } from "../types";

const initialState: TYPE_MESSAGE = null;

const typesMessageSlice = createSlice({
  name: "typesMessageSlice",
  initialState,
  reducers: {
    setTypesMessage: (state, action: PayloadAction<TYPE_MESSAGE>) => {
      state = action.payload;

      return state;
    },
  },
});

export const typesMessageSelector = (state: RootState) =>
  state.websockets.typesMessage;
export const { setTypesMessage } = typesMessageSlice.actions;
export const typesMessageReducer = typesMessageSlice.reducer;
