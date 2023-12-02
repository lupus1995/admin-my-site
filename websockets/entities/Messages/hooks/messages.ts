import { useCallback } from "react";

import { useAppDispatch } from "store/hooks";

import { fetchGetMessages } from "../ducks";
import { clearMessages } from "../slice";

export const useGetMessages = () => {
  const dispatch = useAppDispatch();

  const handleGetMessages = useCallback(
    async ({ offset, roomId }: { offset: number; roomId: string }) => {
      await dispatch(fetchGetMessages({ limit: 10, offset, roomId }));
    },
    [dispatch]
  );

  return { handleGetMessages };
};

export const useCleareMessages = () => {
  const dispatch = useAppDispatch();

  const handleClearMessages = () => dispatch(clearMessages());

  return { handleClearMessages };
};
