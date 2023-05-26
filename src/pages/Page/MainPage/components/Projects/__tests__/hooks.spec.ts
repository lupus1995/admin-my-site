import { renderHook } from "@testing-library/react";

import { useInitProjects } from "../hooks";

jest.mock("../api", () => {
  const module = jest.requireActual("../api");

  return {
    ...module,
    getProjects: jest.fn().mockResolvedValue(jest.fn()),
  };
});

describe("hooks", () => {
  it("useInitProjects", () => {
    const { result } = renderHook(() => useInitProjects());

    expect(Array.isArray(result.current.projects)).toBeTruthy();
    expect(result.current.visibleSkeleton).toBeTruthy();
  });
});
