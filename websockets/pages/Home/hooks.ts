import { useCallback, useEffect, useRef, useState } from "react";

import { usePrevious } from "utils/hooks";
import {
  useCleareMessages,
  useFetchMessages,
  useGetRoomId,
  useSetRoomId,
} from "websockets/entities/Messages";
import { InterlocutorI } from "websockets/entities/Users";
import { useSetActiveInterlocutor } from "websockets/entities/Users/hooks";

export const useClickByInterlocutor = () => {
  const offset = useRef(1);
  const { handleFetchMessages } = useFetchMessages();
  const { handleClearMessages } = useCleareMessages();
  const { handleSetActiveInterlocutor } = useSetActiveInterlocutor();
  const setRoomId = useSetRoomId();
  const activeRoomId = useGetRoomId();
  const prevRoomId = usePrevious(activeRoomId);

  useEffect(() => {
    if (prevRoomId !== activeRoomId) {
      offset.current = 1;
    }
  }, [activeRoomId, prevRoomId]);

  const handleClickByInterlocutor = useCallback(
    ({
        roomId,
        interlocutor,
      }: {
        roomId: string;
        interlocutor: InterlocutorI;
      }) =>
      async () => {
        handleClearMessages();
        await handleFetchMessages({ offset: 0, roomId });
        setRoomId(roomId);
        // setOffset(1);
        handleSetActiveInterlocutor({ interlocutor });
      },
    [
      handleClearMessages,
      handleFetchMessages,
      handleSetActiveInterlocutor,
      setRoomId,
    ]
  );

  const handleClickByDonwload = useCallback(async () => {
    await handleFetchMessages({ offset: offset.current, roomId: activeRoomId });
    offset.current = offset.current + 1;
  }, [activeRoomId, handleFetchMessages]);

  return { handleClickByInterlocutor, handleClickByDonwload };
};
