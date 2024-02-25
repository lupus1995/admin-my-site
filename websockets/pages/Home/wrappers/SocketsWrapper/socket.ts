import { useEffect, useMemo } from "react";

import { io, Socket } from "socket.io-client";

import { getTokens } from "store/services/tokens";

const useInitSocket = ({ socket }: { socket: Socket }) => {
  useEffect(() => {
    function onConnect() {}
    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [socket]);
};

export const useInitSocketUserOnline = () => {
  const socket = useMemo(() => {
    const { accessToken } = getTokens();
    return io(process.env.NEXT_PUBLIC_SOCKET_USER_ONLINE, {
      auth: {
        authorization: accessToken,
      },
    });
  }, []);

  useInitSocket({ socket });

  return socket;
};

export const useInitSocketPeerToPeer = () => {
  const socket = useMemo(() => {
    const { accessToken } = getTokens();
    return io(process.env.NEXT_PUBLIC_SOCKET_PEER_TO_PEER, {
      auth: {
        authorization: accessToken,
      },
    });
  }, []);
  useInitSocket({ socket });

  return socket;
};
