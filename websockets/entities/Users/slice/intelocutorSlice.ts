import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { UserI } from "../types";

const initialState: UserI[] = [];

const interlocutorSlice = createSlice({
  name: "interlocutor",
  initialState,
  reducers: {
    addInterlocutors: (state, action: PayloadAction<UserI[]>) => {
      state.push(...action.payload);
    },
    clearInterlocutors: (state) => {
      state = [];
      return state;
    },
  },
});

export const interlocutorSelector = (state: RootState) =>
  state.websockets.interlocutor;
export const { addInterlocutors, clearInterlocutors } =
  interlocutorSlice.actions;
export default interlocutorSlice.reducer;
