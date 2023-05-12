import React from "react";

import { render } from "@testing-library/react";

import PortfolioSkeleton from "../PortfolioSkeleton";

jest.mock("../../../../components", () => {
  const module = jest.requireActual("../../../../components");

  return {
    ...module,
    ArticlesContainerSkeleton: () => <span>ArticlesContainerSkeleton</span>,
  };
});

describe("PortfolioSkeleton", () => {
  it("check render component", () => {
    const { getByText, getByTestId } = render(<PortfolioSkeleton />);

    expect(getByTestId(/portfolioTitle/i)).toBeInTheDocument();
    expect(getByText("ArticlesContainerSkeleton")).toBeInTheDocument();
  });
});
