import React from "react";

import { render } from "@testing-library/react";

import TextError from "../TextError";

describe("TextError", () => {
  it("check render component with message", () => {
    const { getByText } = render(<TextError message="error message" />);

    expect(getByText(/error message/i)).toBeInTheDocument();
  });

  it("check render component without message", () => {
    const { queryByText } = render(<TextError message="" />);

    expect(queryByText(/error message/i)).not.toBeInTheDocument();
  });
});
