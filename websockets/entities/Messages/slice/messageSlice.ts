import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";
import { MessageI } from "websockets/entities/share/types";

const initialState: MessageI[] = [];

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action: PayloadAction<MessageI[]>) => {
      state.push(...action.payload);
    },
    clearMessages: (state) => {
      state = [];

      return state;
    },
  },
});

export const messageSelector = (state: RootState) => state.websockets.messages;
export const { addMessages, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
