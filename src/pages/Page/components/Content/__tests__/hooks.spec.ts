import { renderHook } from "@testing-library/react";

import { project, testDataContent } from "../__fixtures__/constants";
import { useGetConents } from "../hooks";

describe("hooks", () => {
  it("check render useGetConents", () => {
    const { result } = renderHook(() => useGetConents([project], "projects"));

    expect(JSON.stringify(result.current)).toBe(
      JSON.stringify([testDataContent])
    );
  });
});
