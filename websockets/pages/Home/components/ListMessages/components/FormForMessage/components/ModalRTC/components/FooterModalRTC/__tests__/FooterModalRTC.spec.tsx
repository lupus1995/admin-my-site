import React from "react";

import { render } from "@testing-library/react";

import { FooterModalRTC } from "../FooterModalRTC";

describe("FooterModalRTC", () => {
  it("check render component", () => {
    const { getByText } = render(<FooterModalRTC handleClose={jest.fn()} />);

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(getByText(/No/i)).toBeInTheDocument();
  });
});
