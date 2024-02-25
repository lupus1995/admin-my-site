import { renderHook } from "@testing-library/react";

import { useCreatePeer } from "../hooks/createPeer";

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
    useHandleIceCandidate: jest.fn().mockReturnValue({
      handleEmitIceCandidate: jest.fn(),
    }),
  };
});

describe("createPeer", () => {
  it("check render peer", () => {
    const { result } = renderHook(() =>
      useCreatePeer({
        interlocutorVideo: { current: null },
        peerRef: { current: null },
        callback: jest.fn(),
      })
    );

    expect(typeof result.current.createPeer === "function").toBeTruthy();
    expect(typeof result.current.onVolume === "boolean").toBeTruthy();
  });
});
