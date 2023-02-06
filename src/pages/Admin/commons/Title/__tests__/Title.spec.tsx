import React from "react";

import { render } from "@testing-library/react";

import Title from "../Title";

describe("Title", () => {
  it("check render title", () => {
    const { getByText } = render(<Title title="title" />);

    expect(getByText(/title/i)).toBeInTheDocument();
  });
});
