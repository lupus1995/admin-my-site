import { AppDispatch } from "store/store";

import { getMessages } from "./services";
import { addMessages } from "./slice";
import { RoomIdI } from "./types";
import { PaginationI } from "../share/types";

export const fetchGetMessages =
  ({ limit, offset, roomId }: PaginationI & RoomIdI) =>
  async (dispatch: AppDispatch) => {
    const { data } = await dispatch(
      getMessages.initiate({ limit, offset, roomId })
    );

    dispatch(addMessages(data));
  };
