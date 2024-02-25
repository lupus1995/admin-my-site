import React, { FC, useEffect } from "react";

import { Dialog } from "primereact/dialog";

import { FooterModalRTC } from "./components";
import { useWebRTC } from "./hooks";

export const ModalRTC: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const { userVideo, interlocutorVideo, userStream, callUser, onVolume } =
    useWebRTC();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: onVolume,
        video: true,
      })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        callUser();
      });
  }, [callUser, onVolume, userStream, userVideo]);

  const handleClick = () => {
    userStream.current.getTracks().forEach((track) => track.stop());
    handleClose();
  };

  return (
    <Dialog
      header="Header"
      visible
      style={{ width: "50vw" }}
      onHide={handleClick}
      footer={<FooterModalRTC handleClose={handleClick} />}
    >
      <video data-testid="userVideo" autoPlay ref={userVideo} />
      <video data-testid="interlocutorVideo" autoPlay ref={interlocutorVideo} />
    </Dialog>
  );
};
