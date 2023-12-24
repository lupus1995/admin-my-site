import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { ResponseMessageI, ResponseMessagesI } from "../types";

const initialState: ResponseMessagesI = {
  messages: [],
  count: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<ResponseMessagesI>) => {
      state.messages = [...action.payload.messages, ...state.messages];
      state.count = action.payload.count;
      return state;
    },
    addMessage: (state, action: PayloadAction<ResponseMessageI>) => {
      return {
        messages: [...state.messages, action.payload.message],
        count: action.payload.count,
      };
    },
    clearMessages: () => initialState,
  },
});

export const messageSelector = (state: RootState) => state.websockets.messages;
export const { addMessages, clearMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
