import React from "react";

import { render } from "@testing-library/react";

import Footer from "../Footer";

describe("Footer", () => {
  it("check render component", () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/copyright 2023/i)).toBeInTheDocument();
  });
});
