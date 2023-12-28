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
  const { socket } = useContext(SocketsContext);
  const { handleSetUsersOnline } = useSetUsersOnline();

  useEffect(() => {
    function handleOnline(data: InterlocutorI[]) {
      handleSetUsersOnline(data);
    }
    socket.on("online", handleOnline);

    return () => {
      socket.off("online", handleOnline);
    };
  }, [handleSetUsersOnline, socket]);
};

export const useJoinRoomSocket = () => {
  const { socket } = useContext(SocketsContext);
  const handleJoinRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socket.emit("joinRoom", roomIds);
    },
    [socket]
  );

  return { handleJoinRoomSocket };
};

export const useLeftRoomSocket = () => {
  const { socket } = useContext(SocketsContext);
  const handleLeftRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socket.emit("leaveRoom", roomIds);
    },
    [socket]
  );

  return { handleLeftRoomSocket };
};

export const useUpdateInterlocutorBySocket = () => {
  const { socket } = useContext(SocketsContext);
  const activeRoomId = useGetRoomId();
  const { handleUpdateInterlocutor } = useUpdateInterlocutor();
  const { handleAddMessage } = useAddMessageBySockets();

  const handleEmitUpdateInterlocutor = useCallback(
    () => socket.emit("updateInterlocutor", activeRoomId),
    [activeRoomId, socket]
  );

  useEffect(() => {
    function handleTest(data: UserI) {
      handleUpdateInterlocutor(data);
      handleAddMessage({ message: data.message });
    }
    socket.on("updateInterlocutor", handleTest);

    return () => {
      socket.off("updateInterlocutor", handleTest);
    };
  }, [handleAddMessage, handleUpdateInterlocutor, socket]);

  return { handleEmitUpdateInterlocutor };
};
