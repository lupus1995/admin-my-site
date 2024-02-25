import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { peerToPeerSelector, setUsersOnlinePeerToPeer } from "../slice";
import { InterlocutorI } from "../types";

export const useGetUsersPeerToPeer = () => {
  const usersPeerToPeer = useAppSelector(peerToPeerSelector, shallowEqual);

  return usersPeerToPeer;
};

export const useSetUsersPeerToPeer = () => {
  const dispatch = useAppDispatch();

  const handleSetPeerToPeer = useCallback(
    (data: InterlocutorI[]) => {
      dispatch(setUsersOnlinePeerToPeer(data));
    },
    [dispatch]
  );

  return { handleSetPeerToPeer };
};
