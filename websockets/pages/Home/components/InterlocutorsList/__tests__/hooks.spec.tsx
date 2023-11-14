import { renderHook } from "@testing-library/react";

import { useListInterlocutors } from "../hooks";

describe("hooks", () => {
  it("useListInterlocutors", () => {
    const { result } = renderHook(() => useListInterlocutors([]));

    expect(Array.isArray(result.current)).toBeTruthy();
  });
});
