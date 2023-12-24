import { useEffect } from "react";

import { Socket } from "socket.io-client";

import { InterlocutorI, useSetUsersOnline } from "websockets/entities/Users";

export const useSocketUserOnline = ({ socket }: { socket: Socket }) => {
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
