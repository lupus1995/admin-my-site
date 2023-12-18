import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchCreateMessage, fetchGetMessages } from "../ducks";
import { clearMessages, messageSelector } from "../slice";
import { CreateMessageI } from "../types";

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

export const useCreateMessage = () => {
  const dispatch = useAppDispatch();

  const handleCreateMessage = useCallback(
    async (message: CreateMessageI) => {
      dispatch(fetchCreateMessage({ message }));
    },
    [dispatch]
  );

  return { handleCreateMessage };
};
