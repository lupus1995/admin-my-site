import React from "react";

import { render } from "@testing-library/react";

import ButtonSubmit from "../ButtonSubmit";

describe("ButtonSubmit", () => {
  it("check render component", () => {
    const { getByText } = render(
      <ButtonSubmit isDisabled={false} disabledClass="disabledClass" />
    );

    expect(getByText(/submit/i)).toBeInTheDocument();
    expect(getByText(/submit/i)).not.toHaveClass("disabledClass");
  });

  it("check render component with disabledClass", () => {
    const { getByText } = render(
      <ButtonSubmit isDisabled disabledClass="disabledClass" />
    );

    expect(getByText(/submit/i)).toHaveClass("disabledClass");
  });
});
