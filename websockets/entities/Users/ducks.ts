import { AppDispatch, RootState } from "store/store";

import {
  getInterlocutors,
  searchInterlocutors as searchInterlocutorsAction,
} from "./services";
import { addInterlocutors, searchSelector } from "./slice";
import { PaginationI } from "./types";

export const fetchInterlocutors =
  (pagination: PaginationI) => async (dispatch: AppDispatch) => {
    const interlocutors = await dispatch(getInterlocutors.initiate(pagination));

    dispatch(addInterlocutors(interlocutors.data));
  };

export const fetchSearchInterlocutor =
  (pagination: PaginationI) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const searchInterlocutors = searchSelector(getState());
    const interlocutors = await dispatch(
      searchInterlocutorsAction.initiate({
        ...pagination,
        search: searchInterlocutors,
      })
    );

    dispatch(addInterlocutors(interlocutors.data));
  };
