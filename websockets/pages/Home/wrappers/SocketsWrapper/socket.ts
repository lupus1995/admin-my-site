import { useMemo } from "react";

import { io } from "socket.io-client";

import { getTokens } from "store/services/tokens";

export const useInitSocketUserOnline = () => {
  const socket = useMemo(() => {
    const { accessToken } = getTokens();
    return io(process.env.NEXT_PUBLIC_SOCKET_USER_ONLINE, {
      auth: {
        authorization: accessToken,
      },
    });
  }, []);

  return socket;
};
