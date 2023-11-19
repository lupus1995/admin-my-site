import React from "react";

import { render } from "@testing-library/react";

import Multiline from "../Multiline";

describe("Multiline", () => {
  it("check render component", () => {
    const { getByText } = render(
      <Multiline>
        <span>11111111</span>
      </Multiline>
    );

    expect(getByText(/11111111/i)).toBeInTheDocument();
  });
});
