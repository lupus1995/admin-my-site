import { renderHook } from "@testing-library/react";

import { URL } from "utils/constants";

import { SIZES_FOR_FILES } from "../constants";
import { IMAGE_SIZE_ENUM } from "../enums";
import { useImageName } from "../hook";

jest.mock("utils/mediaQuery", () => {
  const mockModule = jest.requireActual("utils/mediaQuery");

  return {
    ...mockModule,
    useIsMediaQuery: () => ({
      is360: false,
      is481: false,
      is721: false,
      is1081: false,
      is1367: false,
      is1921: true,
      isMinDevicePixelRatio: false,
    }),
  };
});

describe("useImageName", () => {
  it("useImageName is undefined", () => {
    const { result } = renderHook(() => useImageName({ imageName: null }));

    expect(JSON.stringify(result.current)).toBe(
      JSON.stringify({ imageUrl: undefined })
    );
  });

  it("useImageName is not undefined", () => {
    const { result } = renderHook(() =>
      useImageName({ imageName: "imageName.png" })
    );

    expect(JSON.stringify(result.current)).toBe(
      JSON.stringify({
        imageUrl: `${URL}/main-page/${
          SIZES_FOR_FILES[IMAGE_SIZE_ENUM.IS_1921]
        }/imageName.png`,
      })
    );
  });
});
