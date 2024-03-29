import { useCallback } from "react";

import { shallowEqual } from "react-redux";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { MessageI } from "websockets/entities/share/types";

import { fetchCreateMessage, fetchGetMessages } from "../ducks";
import { addMessage, clearMessages, messageSelector } from "../slice";
import { CreateMessageI } from "../types";

export const useFetchMessages = () => {
  const dispatch = useAppDispatch();

  const handleFetchMessages = useCallback(
    async ({ offset, roomId }: { offset: number; roomId: string }) => {
      await dispatch(fetchGetMessages({ limit: 20, offset, roomId }));
    },
    [dispatch]
  );

  return { handleFetchMessages };
};

export const useGetMessages = () => {
  const { messages, count } = useAppSelector(messageSelector, shallowEqual);

  return { messages, count };
};

export const useCleareMessages = () => {
  const dispatch = useAppDispatch();

  const handleClearMessages = useCallback(
    () => dispatch(clearMessages()),
    [dispatch]
  );

  return { handleClearMessages };
};

export const useCreateMessage = () => {
  const dispatch = useAppDispatch();

  const handleCreateMessage = useCallback(
    async (message: CreateMessageI) => {
      await dispatch(fetchCreateMessage({ message }));
    },
    [dispatch]
  );

  return { handleCreateMessage };
};

export const useAddMessageBySockets = () => {
  const { count } = useGetMessages();
  const dispatch = useAppDispatch();

  const handleAddMessage = useCallback(
    ({ message }: { message: MessageI }) => {
      dispatch(
        addMessage({
          message,
          count: count + 1,
        })
      );
    },
    [count, dispatch]
  );

  return { handleAddMessage };
};
