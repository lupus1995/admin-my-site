import { act, renderHook } from "@testing-library/react";

import { useInitProjects } from "../hooks";

jest.mock("../api", () => {
  const mockModule = jest.requireActual("../api");

  return {
    ...mockModule,
    getProjects: jest.fn().mockResolvedValue(jest.fn()),
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
  it("useInitProjects", async () => {
    let render;
    await act(() => {
      render = renderHook(() => useInitProjects());
    });

    // @ts-ignore
    const { result } = render;

    expect(Array.isArray(result.current.projects)).toBeTruthy();
    expect(result.current.visibleSkeleton).toBeFalsy();
  });
});
