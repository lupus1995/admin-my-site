import React from "react";

import { render } from "@testing-library/react";

import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  it("check render component", () => {
    const { getByText } = render(
      <Checkbox
        name={"name"}
        setValue={jest.fn}
        disabledClass={"disabledClass"}
        isDisabled={false}
        value={false}
        label={"label"}
      />
    );

    expect(getByText(/label/)).toBeInTheDocument();
    expect(getByText(/label/)).not.toHaveClass("disabledClass");
  });
  it("check render disabled component", () => {
    const { getByText } = render(
      <Checkbox
        name={"name"}
        setValue={jest.fn}
        disabledClass={"disabledClass"}
        isDisabled={true}
        value={false}
        label={"label"}
      />
    );

    expect(getByText(/label/)).toBeInTheDocument();
    expect(
      getByText(/label/).parentElement.querySelector(".disabledClass")
    ).toHaveClass("disabledClass");
  });
});
