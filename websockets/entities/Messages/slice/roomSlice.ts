import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "store/store";

const initialState: string = null;

export const roomSlice = createSlice({
  initialState,
  name: "roomSlice",
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state = action.payload;

      return state;
    },
  },
});

export const roomIdSelector = (state: RootState) => state.websockets.roomId;
export const { setRoomId } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
