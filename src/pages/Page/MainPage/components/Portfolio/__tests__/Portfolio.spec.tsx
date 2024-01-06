import React from "react";

import { render } from "@testing-library/react";

import * as hooks from "../hooks";
import Portfolio from "../Portfolio";

jest.mock("next/link", () => () => <span>Link</span>);

jest.mock("../../../../components", () => {
  const module = jest.requireActual("../../../../components");

  return {
    ...module,
    ContentsContainer: () => <span>ContentsContainer</span>,
    ContentsContainerSkeleton: () => <span>ContentsContainerSkeleton</span>,
  };
});

jest.mock("../hooks", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../hooks"),
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Portfolio", () => {
  it("check render component with visible default part", () => {
    jest.spyOn(hooks, "useInitArticles").mockImplementation(
      jest.fn().mockReturnValue({
        articles: [],
        visibleSkeleton: false,
      })
    );
    const { getByText } = render(<Portfolio />);

    expect(getByText(/Link/i)).toBeInTheDocument();
    expect(getByText("portfolioTitlePage")).toBeInTheDocument();
  });

  it("check visible skeleton", () => {
    jest.spyOn(hooks, "useInitArticles").mockImplementation(
      jest.fn().mockReturnValue({
        articles: [],
        visibleSkeleton: true,
      })
    );
    const { getByText } = render(<Portfolio />);

    expect(getByText("ContentsContainerSkeleton")).toBeInTheDocument();
  });

  it("check hidden skeleton", () => {
    jest.spyOn(hooks, "useInitArticles").mockImplementation(
      jest.fn().mockReturnValue({
        articles: [],
        visibleSkeleton: false,
      })
    );
    const { getByText } = render(<Portfolio />);

    expect(getByText("ContentsContainer")).toBeInTheDocument();
  });
});
