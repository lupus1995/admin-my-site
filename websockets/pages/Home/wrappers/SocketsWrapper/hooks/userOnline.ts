import { useCallback, useContext, useEffect } from "react";

import {
  useGetRoomId,
  useAddMessageBySockets,
} from "websockets/entities/Messages";
import {
  UserI,
  useSetUsersOnline,
  useUpdateInterlocutor,
} from "websockets/entities/Users";

import {
  useHandleJoinRoom,
  useHandleLeftRoom,
  useHandleOnline,
} from "./commons";
import { SocketsContext } from "../SocketsWrapper";

export const useSocketUserOnline = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const { handleSetUsersOnline } = useSetUsersOnline();
  useHandleOnline({
    socket: socketUserOnline,
    callback: handleSetUsersOnline,
  });
};

export const useJoinRoomSocket = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const { handleJoinRoomSocket } = useHandleJoinRoom({
    socket: socketUserOnline,
  });

  return { handleJoinRoomSocket };
};

export const useLeftRoomSocket = () => {
  const { socketUserOnline } = useContext(SocketsContext);
  const { handleLeftRoomSocket } = useHandleLeftRoom({
    socket: socketUserOnline,
  });

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
