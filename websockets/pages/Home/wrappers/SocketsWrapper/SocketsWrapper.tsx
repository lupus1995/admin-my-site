import React, { createContext, memo, ReactNode } from "react";

import { Socket } from "socket.io-client";

import { useInitSocketPeerToPeer, useInitSocketUserOnline } from "./socket";

export const SocketsContext = createContext<{
  socketUserOnline: Socket | null;
  socketPeerToPeer: Socket | null;
}>({ socketUserOnline: null, socketPeerToPeer: null });

export const SocketsWrapper = memo(({ children }: { children: ReactNode }) => {
  const socketUserOnline = useInitSocketUserOnline();
  const socketPeerToPeer = useInitSocketPeerToPeer();

  return (
    <SocketsContext.Provider value={{ socketUserOnline, socketPeerToPeer }}>
      {children}
    </SocketsContext.Provider>
  );
});
