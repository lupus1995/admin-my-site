import React from "react";

import { render } from "@testing-library/react";

import ButtonWrapper from "../ButtonWrapper";

describe("ButtonWrapper", () => {
  it("check render component", () => {
    const { getByText } = render(<ButtonWrapper>22222</ButtonWrapper>);

    expect(getByText(/22222/i)).toBeInTheDocument();
  });
});
