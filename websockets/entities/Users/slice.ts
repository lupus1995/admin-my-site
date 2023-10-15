import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { UserI } from "./types";

const initialState: UserI[] = [];

const interlocutorSlice = createSlice({
  name: "interlocutor",
  initialState,
  reducers: {
    addInterlocutors: (state, action: PayloadAction<UserI[]>) => {
      state.push(...action.payload);
    },
  },
});

export const interlocutorSelector = (state: RootState) => state.interlocutor;
export const { addInterlocutors } = interlocutorSlice.actions;
export default interlocutorSlice.reducer;
