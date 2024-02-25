import { useCallback, useRef } from "react";

import { useGetRoomId } from "websockets/entities/Messages";
import { useGetActiveInterlocutor } from "websockets/entities/Users";
import {
  RTCPayload,
  useHandleAnswer,
  useHandleOfferEmit,
  useHandleOfferOn,
} from "websockets/pages/Home/wrappers/SocketsWrapper";

import { useCreatePeer } from "./createPeer";

export const useWebRTC = () => {
  const userVideo = useRef<HTMLVideoElement>(null);
  const interlocutorVideo = useRef<HTMLVideoElement>(null);
  const userStream = useRef<MediaStream>(null);
  const peerRef = useRef<RTCPeerConnection>(null);

  const roomId = useGetRoomId();
  const { activeInterlocutor } = useGetActiveInterlocutor();

  const { handleOffer } = useHandleOfferEmit();

  const { createPeer, onVolume } = useCreatePeer({
    interlocutorVideo,
    peerRef,
    callback: handleOffer,
  });

  const callUser = useCallback(() => {
    peerRef.current = createPeer();

    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }, [createPeer]);

  const handleAnswerOn = useCallback((message: RTCPayload) => {
    const desc = new RTCSessionDescription(message.sdp);
    // eslint-disable-next-line no-console
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }, []);

  const { handleEmitAnswer } = useHandleAnswer(handleAnswerOn);

  const handleRecieveCall = useCallback(
    (incoming: RTCPayload) => {
      peerRef.current = createPeer();

      const desc = new RTCSessionDescription(incoming.sdp);
      peerRef.current
        .setRemoteDescription(desc)
        .then(() => {
          userStream.current
            .getTracks()
            .forEach((track) =>
              peerRef.current.addTrack(track, userStream.current)
            );
        })
        .then(() => {
          return peerRef.current.createAnswer();
        })
        .then((answer) => {
          return peerRef.current.setLocalDescription(answer);
        })
        .then(() => {
          const payload = {
            target: roomId,
            caller: activeInterlocutor._id,
            sdp: peerRef.current.localDescription,
          };

          handleEmitAnswer(payload);
        });
    },
    [activeInterlocutor._id, createPeer, handleEmitAnswer, roomId]
  );

  useHandleOfferOn(handleRecieveCall);

  return { userVideo, interlocutorVideo, userStream, callUser, onVolume };
};
