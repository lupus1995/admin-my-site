import { useCallback, useState } from "react";

import {
  useCleareMessages,
  useFetchMessages,
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
        await handleFetchMessages({ offset, roomId });
        setOffset(offset + 1);

        setRoomId(roomId);
        handleSetActiveInterlocutor({ interlocutor });
      },
    [
      handleClearMessages,
      handleFetchMessages,
      handleSetActiveInterlocutor,
      offset,
      setRoomId,
    ]
  );

  const handleClickByDonwload = useCallback(
    async ({ roomId }: { roomId: string }) => {
      await handleFetchMessages({ offset, roomId });
      setOffset(offset + 1);
    },
    [handleFetchMessages, offset]
  );

  return { handleClickByInterlocutor, handleClickByDonwload };
};
