import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

const initialState = "";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setTypedSearch: (state, action: PayloadAction<string>) => {
      state = action.payload;

      return state;
    },
  },
});

export const searchSelector = (state: RootState) =>
  state.websockets.searchSlice;
export const { setTypedSearch } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;
