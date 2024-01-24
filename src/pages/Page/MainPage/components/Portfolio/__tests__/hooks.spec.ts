import { act, renderHook } from "@testing-library/react";

import { useInitArticles } from "../hooks";

jest.mock("../api", () => {
  const mockModule = jest.requireActual("../api");

  return {
    ...mockModule,
    getNewArticles: jest.fn().mockResolvedValue(jest.fn()),
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("hooks", () => {
  it("useInitArticles", async () => {
    let render;
    await act(() => {
      render = renderHook(() => useInitArticles());
    });

    // @ts-ignore
    const { result } = render;

    expect(Array.isArray(result.current.articles)).toBeTruthy();
    expect(result.current.visibleSkeleton).toBeFalsy();
  });
});
