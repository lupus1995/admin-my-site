import React from "react";

import { render } from "@testing-library/react";

import WrapperStyles from "../WrapperStyles";

describe("WrapperStyles", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperStyles>11111</WrapperStyles>);

    expect(getByText(/11111/i));
  });
});
