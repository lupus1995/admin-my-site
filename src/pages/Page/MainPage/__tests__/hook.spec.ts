import { renderHook } from "@testing-library/react";

import { useImages } from "../hook";

describe("hook", () => {
  it("check render useImages", () => {
    const { result } = renderHook(() => useImages({ imageName: "imageName" }));

    expect(typeof result.current.imageUrl === "string").toBeTruthy();
  });
});
