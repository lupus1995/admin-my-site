import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "store/store";

import { ModuleType } from "./types";

const initialState: ModuleType = null;

const moduleSlice = createSlice({
  initialState,
  name: "modules",
  reducers: {
    setModule: (_state, { payload }: PayloadAction<ModuleType>) => payload,
  },
});

export const { setModule } = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;
export const moduleSelector = (state: RootState) => state.module;
