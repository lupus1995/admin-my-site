import { renderHook } from "@testing-library/react";

import { useListInterlocutors } from "../hooks";

jest.mock("websockets/entities/Users", () => {
  const module = jest.requireActual("websockets/entities/Users");

  return {
    ...module,
    useGetUsersOnline: jest.fn().mockReturnValue([]),
    useGetInterlocutors: jest.fn().mockReturnValue([]),
  };
});

jest.mock("../../../wrappers/SocketsWrapper/hooks", () => {
  const module = jest.requireActual("../../../wrappers/SocketsWrapper/hooks");

  return {
    ...module,
    useJoinRoomSocket: jest.fn().mockReturnValue({
      handleJoinRoomSocket: jest.fn(),
    }),
    useLeftRoomSocket: jest.fn().mockReturnValue({
      handleLeftRoomSocket: jest.fn(),
    }),
  };
});

describe("hooks", () => {
  it("useListInterlocutors", () => {
    const { result } = renderHook(() =>
      useListInterlocutors({
        handleClickByInterlocutor: jest.fn(),
      })
    );

    expect(Array.isArray(result.current)).toBeTruthy();
  });
});
