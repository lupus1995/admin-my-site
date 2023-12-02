import { useCallback, useState } from "react";

import {
  useCleareMessages,
  useGetMessages,
} from "websockets/entities/Messages";
import { InterlocutorI } from "websockets/entities/Users";
import { useSetActiveInterlocutor } from "websockets/entities/Users/hooks";

export const useClickByInterlocutor = () => {
  const [offset, setOffset] = useState(0);
  const { handleGetMessages } = useGetMessages();
  const { handleClearMessages } = useCleareMessages();
  const { handleSetActiveInterlocutor } = useSetActiveInterlocutor();

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
        await handleGetMessages({ offset, roomId });
        setOffset(offset + 1);

        handleSetActiveInterlocutor({ interlocutor });
      },
    [
      handleClearMessages,
      handleGetMessages,
      handleSetActiveInterlocutor,
      offset,
    ]
  );

  const handleClickByDonwload = useCallback(
    async ({ roomId }: { roomId: string }) => {
      await handleGetMessages({ offset, roomId });
      setOffset(offset + 1);
    },
    [handleGetMessages, offset]
  );

  return { handleClickByInterlocutor, handleClickByDonwload };
};
