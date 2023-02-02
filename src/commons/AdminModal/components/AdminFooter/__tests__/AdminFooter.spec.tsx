import React from "react";

import { render } from "@testing-library/react";

import AdminFooter from "../AdminFooter";

describe("AdminFooter", () => {
  it("check render component", () => {
    const { getByText } = render(
      <AdminFooter handleCallback={jest.fn()} handleClose={jest.fn()} />
    );

    expect(getByText(/delete/i)).toBeInTheDocument();
    expect(getByText(/cancel/i)).toBeInTheDocument();
  });
});
