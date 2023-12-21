import { useEffect } from "react";

import { Socket } from "socket.io-client";

import { UserI, useSetUsersOnline } from "websockets/entities/Users";

export const useSocketUserOnline = ({ socket }: { socket: Socket }) => {
  const { handleSetUsersOnline } = useSetUsersOnline();

  useEffect(() => {
    function handleOnline(data: UserI[]) {
      handleSetUsersOnline(data);
    }
    socket.on("online", handleOnline);

    return () => {
      socket.off("online", handleOnline);
    };
  }, [handleSetUsersOnline, socket]);
};
