import { MutableRefObject, useCallback, useState } from "react";

import { useGetRoomId } from "websockets/entities/Messages";
import { useGetActiveInterlocutor } from "websockets/entities/Users";
import { useHandleIceCandidate } from "websockets/pages/Home/wrappers/SocketsWrapper";

export const useCreatePeer = ({
  interlocutorVideo,
  peerRef,
  callback,
}: {
  interlocutorVideo: MutableRefObject<HTMLVideoElement>;
  peerRef: MutableRefObject<RTCPeerConnection>;
  callback: (payload: {
    target: string;
    caller: string;
    sdp: RTCSessionDescription;
  }) => void;
}) => {
  const [onVolume, setOnVolume] = useState<boolean>(false);
  const roomId = useGetRoomId();
  const { activeInterlocutor } = useGetActiveInterlocutor();

  const handleNewICECandidateMsg = useCallback(
    (incoming: RTCIceCandidateInit) => {
      const candidate = new RTCIceCandidate(incoming);

      peerRef.current
        .addIceCandidate(candidate)
        .then(() => setOnVolume(true))
        .catch((e) => {
          setOnVolume(false);
          // interlocutorVideo.current = null;
          // eslint-disable-next-line no-console
          console.log(e);
        });
    },
    [peerRef]
  );

  const { handleEmitIceCandidate } = useHandleIceCandidate(
    handleNewICECandidateMsg
  );

  const handleICECandidateEvent = useCallback(
    (e: RTCPeerConnectionIceEvent) => {
      if (e.candidate) {
        const payload = {
          target: roomId,
          candidate: e.candidate,
        };

        handleEmitIceCandidate(payload);
      }
    },
    [handleEmitIceCandidate, roomId]
  );

  const handleTrackEvent = useCallback(
    (e: RTCTrackEvent) => {
      interlocutorVideo.current.srcObject = e.streams[0];
    },
    [interlocutorVideo]
  );

  const handleNegotationNeededEvent = useCallback(() => {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: roomId,
          caller: activeInterlocutor._id,
          sdp: peerRef.current.localDescription,
        };

        // handleOffer(payload);
        callback(payload);
      });
  }, [activeInterlocutor._id, callback, peerRef, roomId]);

  const createPeer = useCallback(() => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = handleNegotationNeededEvent;

    return peer;
  }, [handleICECandidateEvent, handleNegotationNeededEvent, handleTrackEvent]);

  return { createPeer, onVolume };
};
