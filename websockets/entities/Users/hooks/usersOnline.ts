import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { setUsersOnline, usersOnlineSelector } from "../slice";
import { InterlocutorI } from "../types";

export const useGetUsersOnline = () => {
  const usersOnline = useAppSelector(usersOnlineSelector, shallowEqual);

  return usersOnline;
};

export const useSetUsersOnline = () => {
  const dispatch = useAppDispatch();

  const handleSetUsersOnline = useCallback(
    (data: InterlocutorI[]) => {
      dispatch(setUsersOnline(data));
    },
    [dispatch]
  );

  return { handleSetUsersOnline };
};
