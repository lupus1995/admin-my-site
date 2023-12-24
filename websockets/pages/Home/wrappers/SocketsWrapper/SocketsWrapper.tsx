import React, { memo, ReactNode, useEffect } from "react";

import { useSocketUserOnline } from "./hooks";
import { useInitSocketUserOnline } from "./socket";

export const SocketsWrapper = memo(({ children }: { children: ReactNode }) => {
  const socket = useInitSocketUserOnline();
  useSocketUserOnline({ socket });

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

  return <>{children}</>;
});
