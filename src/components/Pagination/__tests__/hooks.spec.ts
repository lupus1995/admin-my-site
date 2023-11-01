import { renderHook } from "@testing-library/react";

import { usePagination } from "../hooks";

describe("usePagination", () => {
  it("check render hook", () => {
    const { result } = renderHook(() =>
      usePagination({
        request: jest.fn().mockResolvedValue(null),
        params: {},
        limit: 10,
        afterSaveResult: jest.fn(),
      })
    );

    expect(typeof result.current.notVisibleButton === "boolean").toBeTruthy();
    expect(typeof result.current.handleLoad === "function").toBeTruthy();
  });
});
