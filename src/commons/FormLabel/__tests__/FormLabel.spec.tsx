import React from "react";

import { render } from "@testing-library/react";

import FormLabel from "../FormLabel";

describe("FormLabel", () => {
  it("check rende component", () => {
    const { getByText } = render(<FormLabel>label</FormLabel>);

    expect(getByText(/label/i)).toBeInTheDocument();
  });
});
