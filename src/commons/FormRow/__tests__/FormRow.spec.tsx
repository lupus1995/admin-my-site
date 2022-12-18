import React from "react";

import { render } from "@testing-library/react";

import FormRow from "../FormRow";

describe("FormRow", () => {
  it("check render component", () => {
    const { getByText } = render(<FormRow>child</FormRow>);

    expect(getByText(/child/i)).toBeInTheDocument();
  });
});
