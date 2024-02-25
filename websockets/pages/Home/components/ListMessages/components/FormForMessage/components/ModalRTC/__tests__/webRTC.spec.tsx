import { renderHook } from "@testing-library/react";

import { useWebRTC } from "../hooks/webRTC";

jest.mock("../hooks/createPeer", () => {
  const mockModule = jest.requireActual("../hooks/createPeer");

  return {
    ...mockModule,
    useCreatePeer: jest.fn().mockReturnValue({
      createPeer: jest.fn(),
      onVolume: false,
    }),
  };
});

jest.mock("websockets/entities/Messages", () => {
  const mockModule = jest.requireActual("websockets/entities/Messages");

  return {
    ...mockModule,
    useGetRoomId: jest.fn().mockReturnValue("roomId"),
  };
});

jest.mock("websockets/entities/Users", () => {
  const mockModule = jest.requireActual("websockets/entities/Users");

  return {
    ...mockModule,
    useGetActiveInterlocutor: jest.fn().mockReturnValue({
      activeInterlocutor: {
        _id: "id",
      },
    }),
  };
});

jest.mock("websockets/pages/Home/wrappers/SocketsWrapper", () => {
  const mockModule = jest.requireActual(
    "websockets/pages/Home/wrappers/SocketsWrapper"
  );

  return {
    ...mockModule,
    useHandleOfferEmit: jest.fn().mockReturnValue({
      handleOffer: jest.fn(),
    }),
    useHandleAnswer: jest.fn().mockReturnValue({
      handleEmitAnswer: jest.fn(),
    }),
    useHandleOfferOn: jest.fn(),
  };
});

describe("useWebRTC", () => {
  it("check render hook", () => {
    const { result } = renderHook(() => useWebRTC());

    expect(typeof result.current.userVideo.current === "object").toBeTruthy();
    expect(
      typeof result.current.interlocutorVideo.current === "object"
    ).toBeTruthy();
    expect(typeof result.current.userStream.current === "object").toBeTruthy();
    expect(typeof result.current.onVolume === "boolean").toBeTruthy();
    expect(typeof result.current.callUser === "function").toBeTruthy();
  });
});
