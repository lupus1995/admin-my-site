import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { InterlocutorI } from "../types";

const initialState: InterlocutorI[] = [];

const usersOnlineSlice = createSlice({
  name: "usersOnline",
  initialState,
  reducers: {
    setUsersOnline: (_state, action: PayloadAction<InterlocutorI[]>) => {
      return action.payload;
    },
  },
});

export const usersOnlineSelector = (state: RootState) =>
  state.websockets.usersOnline;
export const { setUsersOnline } = usersOnlineSlice.actions;
export const usersOnlineSliceReducer = usersOnlineSlice.reducer;
