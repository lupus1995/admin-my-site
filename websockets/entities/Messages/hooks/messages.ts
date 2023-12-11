import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchGetMessages } from "../ducks";
import { clearMessages, messageSelector } from "../slice";

export const useFetchMessages = () => {
  const dispatch = useAppDispatch();

  const handleFetchMessages = useCallback(
    async ({ offset, roomId }: { offset: number; roomId: string }) => {
      await dispatch(fetchGetMessages({ limit: 10, offset, roomId }));
    },
    [dispatch]
  );

  return { handleFetchMessages };
};

export const useGetMessages = () => {
  const messages = useAppSelector(messageSelector, shallowEqual);

  return messages;
};

export const useCleareMessages = () => {
  const dispatch = useAppDispatch();

  const handleClearMessages = () => dispatch(clearMessages());

  return { handleClearMessages };
};
