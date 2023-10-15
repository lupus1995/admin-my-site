import { AppDispatch } from "store/store";

import { getInterlocutors } from "./services";
import { addInterlocutors } from "./slice";
import { PaginationI } from "./types";

export const fetchInterlocutors =
  (pagination: PaginationI) => async (dispatch: AppDispatch) => {
    const interlocutors = await dispatch(getInterlocutors.initiate(pagination));

    dispatch(addInterlocutors(interlocutors.data));
  };
