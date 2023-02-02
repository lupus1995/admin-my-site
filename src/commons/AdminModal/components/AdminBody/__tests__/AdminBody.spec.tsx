import React from "react";

import { render } from "@testing-library/react";

import AdminBody from "../AdminBody";

describe("AdminBody", () => {
  it("check render component", () => {
    const { getByText } = render(<AdminBody>children</AdminBody>);

    expect(getByText(/children/i)).toBeInTheDocument();
  });
});
