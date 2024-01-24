import { renderHook } from "@testing-library/react";

import { useHandleSearchValue } from "../hooks";

jest.mock("store/hooks", () => {
  const mockModule = jest.requireActual("store/hooks");

  return {
    ...mockModule,
    useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

jest.mock("websockets/entities/Users", () => {
  const mockModule = jest.requireActual("websockets/entities/Users");

  return {
    ...mockModule,
    useSetSearch: jest.fn(),
  };
});

describe("hooks", () => {
  it("useHandleSearchValue", () => {
    const { result } = renderHook(() => useHandleSearchValue());

    expect(typeof result.current.handleClick === "function").toBeTruthy();
  });
});
