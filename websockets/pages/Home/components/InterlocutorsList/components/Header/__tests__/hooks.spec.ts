import { renderHook } from "@testing-library/react";

import { useHandleSearchValue } from "../hooks";

jest.mock("store/hooks", () => {
  const module = jest.requireActual("store/hooks");

  return {
    ...module,
    useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
  };
});

jest.mock("websockets/entities/Users", () => {
  const module = jest.requireActual("websockets/entities/Users");

  return {
    ...module,
    useSetSearch: jest.fn(),
  };
});

describe("hooks", () => {
  it("useHandleSearchValue", () => {
    const { result } = renderHook(() => useHandleSearchValue());

    expect(typeof result.current.handleClick === "function").toBeTruthy();
  });
});
