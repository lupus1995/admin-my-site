import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { InterlocutorI } from "../types";

const initialState: InterlocutorI = null;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InterlocutorI>) => {
      state = action.payload;

      return state;
    },
  },
});

export const userSelector = (state: RootState) => state.websockets.user;
export const { setUser } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
