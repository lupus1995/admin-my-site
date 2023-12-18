import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { roomIdSelector, setRoomId } from "../slice";

export const useGetRoomId = () => {
  const roomId = useAppSelector(roomIdSelector);

  return roomId;
};

export const useSetRoomId = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (roomId: string) => {
      dispatch(setRoomId(roomId));
    },
    [dispatch]
  );
};
