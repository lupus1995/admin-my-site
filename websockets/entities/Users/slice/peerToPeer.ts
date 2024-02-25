import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { InterlocutorI } from "../types";

const initialState: InterlocutorI[] = [];

const peerToPeerSlice = createSlice({
  name: "peerToPeer",
  initialState,
  reducers: {
    setUsersOnline: (_state, action: PayloadAction<InterlocutorI[]>) => {
      return action.payload;
    },
  },
});

export const peerToPeerSelector = (state: RootState) =>
  state.websockets.peerToPeer;
export const { setUsersOnline } = peerToPeerSlice.actions;
export const peerToPeerName = peerToPeerSlice.name;
export const peerToPeerReducer = peerToPeerSlice.reducer;
