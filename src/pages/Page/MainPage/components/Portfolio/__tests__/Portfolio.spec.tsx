import React from "react";

import { render } from "@testing-library/react";

import Portfolio from "../Portfolio";

jest.mock("next/link", () => () => <span>Link</span>);

jest.mock("../../../../components", () => {
  const module = jest.requireActual("../../../../components");

  return {
    ...module,
    ArticlesContainer: () => <span>ArticlesContainer</span>,
    ArticlesContainerSkeleton: () => <span>ArticlesContainerSkeleton</span>,
  };
});

jest.mock("../api", () => {
  const module = jest.requireActual("../api");

  return {
    ...module,
    getNewArticles: jest.fn().mockResolvedValue(jest.fn()),
  };
});

describe("Portfolio", () => {
  it("check render component with visible default part", () => {
    const { getByText } = render(<Portfolio />);

    expect(getByText(/Link/i)).toBeInTheDocument();
    expect(getByText("portfolioTitlePage")).toBeInTheDocument();
  });

  it("check visible skeleton", async () => {
    const { findByText } = render(<Portfolio />);

    expect(await findByText("ArticlesContainerSkeleton")).toBeInTheDocument();
  });

  it("check hidden  skeleton", async () => {
    const { findByText } = render(<Portfolio />);

    expect(await findByText("ArticlesContainer")).toBeInTheDocument();
  });
});
