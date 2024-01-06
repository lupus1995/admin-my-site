import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { InterlocutorI } from "../types";

const initialState: InterlocutorI = null;

const activeIntelocutorSlice = createSlice({
  name: "activeInterlocutor",
  initialState,
  reducers: {
    setActiveInterlocutor: (state, action: PayloadAction<InterlocutorI>) => {
      state = action.payload;
      return state;
    },
  },
});

export const activeInterlocutorSelector = (state: RootState) =>
  state.websockets.activeInterlocutor;
export const { setActiveInterlocutor } = activeIntelocutorSlice.actions;
export const activeInterlocutorReducer = activeIntelocutorSlice.reducer;
