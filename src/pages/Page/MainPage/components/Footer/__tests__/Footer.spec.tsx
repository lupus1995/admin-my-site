import React from "react";

import { render } from "@testing-library/react";

import Footer from "../Footer";

describe("Footer", () => {
  it("check render component", () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/Все права защищены 2022/i)).toBeInTheDocument();
  });
});
