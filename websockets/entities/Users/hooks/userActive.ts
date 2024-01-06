import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchUserData } from "../ducks";
import { userSelector } from "../slice";

export const useActiveUser = () => {
  const activeUser = useAppSelector(userSelector, shallowEqual);

  return activeUser;
};

export const useFetchActiveUser = () => {
  const dispatch = useAppDispatch();

  dispatch(fetchUserData());
};
