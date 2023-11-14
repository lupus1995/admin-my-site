import React from "react";

import { render } from "@testing-library/react";

import WrapperMain from "../WrapperMain";

describe("WrapperMain", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperMain>main</WrapperMain>);

    expect(getByText(/main/i)).toBeInTheDocument();
  });
});
