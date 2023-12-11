import { AppDispatch, RootState } from "store/store";

import {
  getDataUser,
  getInterlocutors,
  searchInterlocutors as searchInterlocutorsAction,
} from "./services";
import { addInterlocutors, searchSelector, setUser } from "./slice";
import { PaginationI } from "../share/types";

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

export const fetchUserData = () => async (dispatch: AppDispatch) => {
  const user = await dispatch(getDataUser.initiate());

  dispatch(setUser(user.data));
};
