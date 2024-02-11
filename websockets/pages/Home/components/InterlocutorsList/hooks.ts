import { useEffect, useMemo } from "react";

import { usePrevious } from "utils/hooks";
import {
  InterlocutorI,
  useGetInterlocutors,
  useGetUsersOnline,
} from "websockets/entities/Users";

import { isUserOnline } from "./helpers";
import useStyles from "./styles";
import { useJoinRoomSocket } from "../../wrappers/SocketsWrapper/hooks";

export const useListInterlocutors = ({
  handleClickByInterlocutor,
}: {
  handleClickByInterlocutor: ({
    roomId,
    interlocutor,
  }: {
    roomId: string;
    interlocutor: InterlocutorI;
  }) => () => Promise<void>;
}) => {
  const interlocutors = useGetInterlocutors();
  const { handleJoinRoomSocket } = useJoinRoomSocket();
  const prevInterlocutorsLength = usePrevious(interlocutors.length);
  const usersOnline = useGetUsersOnline();
  const usersOnlineIds = usersOnline.map((item) => item._id);
  const styles = useStyles();

  const list = useMemo(() => {
    return interlocutors.map((item) => ({
      ...item,
      styles,
      handleClickByInterlocutor,
      isOnline: isUserOnline({
        usersOnlineIds,
        interlocutor: item.interlocutor,
      }),
    }));
  }, [handleClickByInterlocutor, interlocutors, styles, usersOnlineIds]);

  useEffect(() => {
    const roomIds = interlocutors.map((item) => item.id);
    if (prevInterlocutorsLength !== interlocutors.length) {
      handleJoinRoomSocket({ roomIds });
    }
  }, [handleJoinRoomSocket, interlocutors, prevInterlocutorsLength]);

  return list;
};
