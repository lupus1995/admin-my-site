import { useCallback, useContext, useEffect } from "react";

import { Socket } from "socket.io-client";

import { useGetRoomId } from "websockets/entities/Messages";
import { useAddMessageBySockets } from "websockets/entities/Messages/hooks";
import {
  InterlocutorI,
  UserI,
  useUpdateInterlocutor,
} from "websockets/entities/Users";

import { SocketsContext } from "../SocketsWrapper";

export const useHandleOnline = ({
  socket,
  callback,
}: {
  socket: Socket;
  callback: (data: InterlocutorI[]) => void;
}) => {
  useEffect(() => {
    function handleOnline(data: InterlocutorI[]) {
      callback(data);
    }
    socket.on("online", handleOnline);

    return () => {
      socket.off("online", handleOnline);
    };
  }, [callback, socket]);
};

export const useHandleJoinRoom = ({ socket }: { socket: Socket }) => {
  const handleJoinRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socket.emit("joinRoom", roomIds);
    },
    [socket]
  );

  return { handleJoinRoomSocket };
};

export const useHandleLeftRoom = ({ socket }: { socket: Socket }) => {
  const handleLeftRoomSocket = useCallback(
    ({ roomIds }: { roomIds: string[] }) => {
      socket.emit("leaveRoom", roomIds);
    },
    [socket]
  );

  return { handleLeftRoomSocket };
};
