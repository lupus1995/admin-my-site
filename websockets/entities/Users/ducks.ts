import { AppDispatch, RootState } from "store/store";

import {
  getDataUser,
  getInterlocutor,
  getInterlocutors,
  searchInterlocutors as searchInterlocutorsAction,
} from "./services";
import {
  addInterlocutors,
  searchSelector,
  setUser,
  updateInterlocutors,
} from "./slice";
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

export const fetchInterlocutor =
  (roomId: string) => async (dispatch: AppDispatch) => {
    const { data } = await dispatch(getInterlocutor.initiate(roomId));

    dispatch(updateInterlocutors(data));
  };
