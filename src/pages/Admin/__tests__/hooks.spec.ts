import { renderHook } from "@testing-library/react";

import { useDisabled } from "../hooks";

describe("hooks", () => {
  it("check useDisabled", () => {
    const { result } = renderHook(() => useDisabled());

    expect(typeof result.current.disabledClass === "string").toBeTruthy();
    expect(typeof result.current.isDisabled === "boolean").toBeTruthy();
    expect(typeof result.current.setIsDisabled === "function").toBeTruthy();
  });
});
