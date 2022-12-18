import { renderHook } from "@testing-library/react";

import { useImages } from "../hook";

jest.mock("pages/Page/MainPage/api", () => {
  const module = jest.requireActual("pages/Page/MainPage/api");

  return {
    ...module,
    getImages: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
          status: true,
          responseBody: [
            {
              size: 1,
              file: "file1",
            },
            {
              size: 2,
              file: "file2",
            },
          ],
        })
      )
    ),
  };
});

describe("hook", () => {
  it("check render useImages", () => {
    const { result } = renderHook(() => useImages({ imageName: "imageName" }));

    expect(typeof result.current === "string").toBeTruthy();
  });
});
