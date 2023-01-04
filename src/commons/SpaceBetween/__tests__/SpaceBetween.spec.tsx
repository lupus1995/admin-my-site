import React from "react";

import { render } from "@testing-library/react";

import SpaceBetween from "../SpaceBetween";

describe("SpaceBetween", () => {
  it("check render component", () => {
    const { getByText } = render(<SpaceBetween>child</SpaceBetween>);

    expect(getByText(/child/i)).toBeInTheDocument();
  });
});
