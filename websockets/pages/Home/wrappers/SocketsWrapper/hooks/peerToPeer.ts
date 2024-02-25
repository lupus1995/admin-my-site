import { useCallback, useContext, useEffect } from "react";

import { useSetUsersPeerToPeer } from "websockets/entities/Users";

import { useHandleJoinRoom, useHandleOnline } from "./commons";
import { SocketsContext } from "../SocketsWrapper";
import { RTCPayload } from "../types";

export const useSocketUserPeerToPeer = () => {
  const { socketPeerToPeer } = useContext(SocketsContext);
  const { handleSetPeerToPeer } = useSetUsersPeerToPeer();

  useHandleOnline({
    socket: socketPeerToPeer,
    callback: handleSetPeerToPeer,
  });
};

export const useJoinRoomSocketPeerToPeer = () => {
  const { socketPeerToPeer } = useContext(SocketsContext);
  const { handleJoinRoomSocket } = useHandleJoinRoom({
    socket: socketPeerToPeer,
  });

  return { handleJoinRoomSocket };
};

// обработку offer разделили на два хука, чтобы избежать зависимости
export const useHandleOfferEmit = () => {
  const { socketPeerToPeer } = useContext(SocketsContext);
  const handleOffer = useCallback(
    (payload: RTCPayload) => {
      socketPeerToPeer.emit("offer", payload);
    },
    [socketPeerToPeer]
  );

  return { handleOffer };
};

export const useHandleOfferOn = (callback: (payload: RTCPayload) => void) => {
  const { socketPeerToPeer } = useContext(SocketsContext);
  useEffect(() => {
    function handleRecieveCall(incoming: RTCPayload) {
      callback(incoming);
    }

    socketPeerToPeer.on("offer", handleRecieveCall);

    return () => {
      socketPeerToPeer.off("offer", handleRecieveCall);
    };
  }, [callback, socketPeerToPeer]);
};

export const useHandleIceCandidate = (
  callback: (incoming: RTCIceCandidateInit) => void
) => {
  const { socketPeerToPeer } = useContext(SocketsContext);
  const handleEmitIceCandidate = useCallback(
    (payload: { target: string; candidate: RTCIceCandidate }) => {
      socketPeerToPeer.emit("ice-candidate", payload);
    },
    [socketPeerToPeer]
  );

  useEffect(() => {
    function handleNewICECandidateMsg(incoming: RTCIceCandidateInit) {
      callback(incoming);
    }

    socketPeerToPeer.on("ice-candidate", handleNewICECandidateMsg);

    return () => {
      socketPeerToPeer.off("ice-candidate", handleNewICECandidateMsg);
    };
  }, [callback, socketPeerToPeer]);

  return { handleEmitIceCandidate };
};

export const useHandleAnswer = (callback: (payload: RTCPayload) => void) => {
  const { socketPeerToPeer } = useContext(SocketsContext);

  const handleEmitAnswer = useCallback(
    (payload: RTCPayload) => {
      socketPeerToPeer.emit("answer", payload);
    },
    [socketPeerToPeer]
  );

  useEffect(() => {
    function handleAnswer(message: RTCPayload) {
      callback(message);
    }

    socketPeerToPeer.on("answer", handleAnswer);

    return () => {
      socketPeerToPeer.off("answer", handleAnswer);
    };
  }, [callback, socketPeerToPeer]);

  return {
    handleEmitAnswer,
  };
};
