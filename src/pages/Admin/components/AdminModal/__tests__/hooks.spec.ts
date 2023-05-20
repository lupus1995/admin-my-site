import { renderHook } from "@testing-library/react";

import { useToggleModal } from "../hooks";

describe("hooks", () => {
  it("useToggleModal", () => {
    const { result } = renderHook(() => useToggleModal());

    expect(result.current.toggleModal).toBeFalsy();
    expect(typeof result.current.closeModal === "function").toBeTruthy();
    expect(typeof result.current.closeModal === "function").toBeTruthy();
  });
});
