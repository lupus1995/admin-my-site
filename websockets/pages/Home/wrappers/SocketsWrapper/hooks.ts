import { useCallback, useContext, useEffect } from "react";

import { useGetRoomId } from "websockets/entities/Messages";
import { useAddMessageBySockets } from "websockets/entities/Messages/hooks";
import {
  InterlocutorI,
  UserI,
  useSetUsersOnline,
  useUpdateInterlocutor,
} from "websockets/entities/Users";

import { SocketsContext } from "./SocketsWrapper";

export const useSocketUserOnline = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const { handleSetUsersOnline } = useSetUsersOnline();

  useEffect(() => {
    function handleOnline(data: InterlocutorI[]) {
      handleSetUsersOnline(data);
    }
    socketUserOnline.on("online", handleOnline);

    return () => {
      socketUserOnline.off("online", handleOnline);
    };
  }, [handleSetUsersOnline, socketUserOnline]);
};

export const useJoinRoomSocket = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const handleJoinRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socketUserOnline.emit("joinRoom", roomIds);
    },
    [socketUserOnline]
  );

  return { handleJoinRoomSocket };
};

export const useLeftRoomSocket = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const handleLeftRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socketUserOnline.emit("leaveRoom", roomIds);
    },
    [socketUserOnline]
  );

  return { handleLeftRoomSocket };
};

export const useUpdateInterlocutorBySocket = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const activeRoomId = useGetRoomId();
  const { handleUpdateInterlocutor } = useUpdateInterlocutor();
  const { handleAddMessage } = useAddMessageBySockets();

  const handleEmitUpdateInterlocutor = useCallback(
    () => socketUserOnline.emit("updateInterlocutor", activeRoomId),
    [activeRoomId, socketUserOnline]
  );

  useEffect(() => {
    function handleTest(data: UserI) {
      handleUpdateInterlocutor(data);
      handleAddMessage({ message: data.message });
    }
    socketUserOnline.on("updateInterlocutor", handleTest);

    return () => {
      socketUserOnline.off("updateInterlocutor", handleTest);
    };
  }, [handleAddMessage, handleUpdateInterlocutor, socketUserOnline]);

  return { handleEmitUpdateInterlocutor };
};
