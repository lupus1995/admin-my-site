import React from "react";

import { render } from "@testing-library/react";

import Time from "../Time";

describe("Time", () => {
  it("check render component", () => {
    const { getByText } = render(<Time date="2023-10-30T19:47:44.500+00:00" />);

    expect(getByText(/22:47:44 30.10.2023/i)).toBeInTheDocument();
  });
});
