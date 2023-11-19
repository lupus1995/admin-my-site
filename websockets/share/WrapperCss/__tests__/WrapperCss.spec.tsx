import React from "react";

import { render } from "@testing-library/react";

import WrapperCss from "../WrapperCss";

describe("WrapperCss", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperCss>11111</WrapperCss>);

    expect(getByText(/11111/i)).toBeInTheDocument();
  });
});
