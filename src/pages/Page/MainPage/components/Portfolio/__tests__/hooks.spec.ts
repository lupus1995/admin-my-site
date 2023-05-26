import { renderHook } from "@testing-library/react";

import { useInitArticles } from "../hooks";

jest.mock("../api", () => {
  const module = jest.requireActual("../api");

  return {
    ...module,
    getNewArticles: jest.fn().mockResolvedValue(jest.fn()),
  };
});

describe("hooks", () => {
  it("useInitArticles", () => {
    const { result } = renderHook(() => useInitArticles());

    expect(Array.isArray(result.current.articles)).toBeTruthy();
    expect(result.current.visibleSkeleton).toBeTruthy();
  });
});
