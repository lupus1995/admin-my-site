import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/named
import { orderBy } from "lodash";

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

    updateInterlocutors: (state, action: PayloadAction<UserI>) => {
      const newState = state.map((item) => ({
        ...item,
        message:
          item.id === action.payload.id ? action.payload.message : item.message,
      }));

      return orderBy(
        newState,
        [(user: UserI) => new Date(user.message.createdAt)],
        ["desc"]
      );
    },
  },
});

export const interlocutorSelector = (state: RootState) =>
  state.websockets.interlocutor;
export const { addInterlocutors, clearInterlocutors, updateInterlocutors } =
  interlocutorSlice.actions;
export const interlocutorReducer = interlocutorSlice.reducer;
