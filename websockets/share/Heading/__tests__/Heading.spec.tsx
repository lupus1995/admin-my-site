import React from "react";

import { render } from "@testing-library/react";

import Heading from "../Heading";

describe("Heading", () => {
  it("check render component", () => {
    const { getByText } = render(<Heading type="h1">heading</Heading>);

    expect(getByText(/heading/i)).toBeInTheDocument();
  });
});
