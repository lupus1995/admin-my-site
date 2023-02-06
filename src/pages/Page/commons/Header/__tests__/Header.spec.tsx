import React from "react";

import { render } from "@testing-library/react";

import Header from "../Header";

describe("Header", () => {
  it("check render component", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/WFC/i)).toBeInTheDocument();
    expect(getByText(/aboutMeTitlePage/i)).toBeInTheDocument();
    expect(getByText(/portfolioTitlePage/i)).toBeInTheDocument();
    expect(getByText(/contactsTitlePage/i)).toBeInTheDocument();
  });
});
