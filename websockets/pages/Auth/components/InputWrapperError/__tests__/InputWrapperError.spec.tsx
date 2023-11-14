import React from "react";

import { render } from "@testing-library/react";

import InputWrapperError from "../InputWrapperError";

describe("InputWrapperError", () => {
  it("check render visible error", () => {
    const { getByText } = render(
      <InputWrapperError visibleError>error</InputWrapperError>
    );

    expect(getByText(/error/i)).toBeInTheDocument();
  });
  it("check render hidden error", () => {
    const { container } = render(
      <InputWrapperError visibleError={false}>error</InputWrapperError>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
