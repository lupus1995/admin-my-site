import React from "react";

import { render } from "@testing-library/react";

import ContentSkeleton from "../ContentSkeleton";

jest.mock("utils/mediaQuery", () => {
  const module = jest.requireActual("utils/mediaQuery");

  return {
    ...module,
    useIsMediaQuery: jest.fn().mockReturnValue({}),
  };
});

jest.mock("../style", () => () => ({
  contentsContainer: {},
}));

describe("ContentSkeleton", () => {
  it("check render component", () => {
    const { getByTestId, getAllByTestId } = render(<ContentSkeleton />);

    expect(getByTestId("contentContainer")).toBeInTheDocument();
    expect(getByTestId("contentLinkSkeleton")).toBeInTheDocument();
    expect(getAllByTestId("skeletonLine").length).toBe(3);
    expect(getByTestId("time")).toBeInTheDocument();
  });
});
