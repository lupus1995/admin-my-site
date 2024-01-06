import React, { createContext, memo, ReactNode, useEffect } from "react";

import { Socket } from "socket.io-client";

import { useInitSocketUserOnline } from "./socket";

export const SocketsContext = createContext<{
  socket: Socket | null;
}>({ socket: null });

export const SocketsWrapper = memo(({ children }: { children: ReactNode }) => {
  const socket = useInitSocketUserOnline();

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

  return (
    <SocketsContext.Provider value={{ socket }}>
      {children}
    </SocketsContext.Provider>
  );
});
