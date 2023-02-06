import React from "react";

import { render } from "@testing-library/react";

import AdminHeader from "../AdminHeader";

describe("AdminHeader", () => {
  it("check render component", () => {
    const { getByText } = render(<AdminHeader handleClose={jest.fn()} />);

    expect(getByText(/deteleArticle/i)).toBeInTheDocument();
  });
});
