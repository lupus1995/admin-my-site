import { renderHook } from "@testing-library/react";

import { useIsMediaQuery } from "utils/mediaQuery";

describe("useIsMediaQuery", () => {
  it("check hook", () => {
    const { result } = renderHook(() => useIsMediaQuery());

    const {
      is360,
      is481,
      is721,
      is1081,
      is1367,
      is1921,

      isMin1367AndMax1920,
      isMin1081AndMax1366,
      isMin721AndMax1080,

      isMinDevicePixelRatio,
    } = result.current;

    expect(typeof is360 === "boolean").toBeTruthy();
    expect(typeof is481 === "boolean").toBeTruthy();
    expect(typeof is721 === "boolean").toBeTruthy();
    expect(typeof is1081 === "boolean").toBeTruthy();
    expect(typeof is1367 === "boolean").toBeTruthy();
    expect(typeof is1921 === "boolean").toBeTruthy();
    expect(typeof isMin1367AndMax1920 === "boolean").toBeTruthy();
    expect(typeof isMin1081AndMax1366 === "boolean").toBeTruthy();

    expect(typeof isMin721AndMax1080 === "boolean").toBeTruthy();
    expect(typeof isMinDevicePixelRatio === "boolean").toBeTruthy();
  });
});
