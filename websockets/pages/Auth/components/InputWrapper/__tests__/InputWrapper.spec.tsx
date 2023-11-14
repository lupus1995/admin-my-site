import React from "react";

import { render } from "@testing-library/react";

import InputWrapper from "../InputWrapper";

describe("InputWrapper", () => {
  it("check render component", () => {
    const { getByText } = render(<InputWrapper>22222</InputWrapper>);

    expect(getByText(/22222/i)).toBeInTheDocument();
  });
});
