import { useCallback, useState } from "react";

import {
  useCleareMessages,
  useFetchMessages,
  useGetRoomId,
  useSetRoomId,
} from "websockets/entities/Messages";
import { InterlocutorI } from "websockets/entities/Users";
import { useSetActiveInterlocutor } from "websockets/entities/Users/hooks";

export const useClickByInterlocutor = () => {
  const [offset, setOffset] = useState(0);
  const { handleFetchMessages } = useFetchMessages();
  const { handleClearMessages } = useCleareMessages();
  const { handleSetActiveInterlocutor } = useSetActiveInterlocutor();
  const setRoomId = useSetRoomId();
  const activeRoomId = useGetRoomId();

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
        setOffset(1);
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
    await handleFetchMessages({ offset, roomId: activeRoomId });
    setOffset(offset + 1);
  }, [activeRoomId, handleFetchMessages, offset]);

  return { handleClickByInterlocutor, handleClickByDonwload };
};
