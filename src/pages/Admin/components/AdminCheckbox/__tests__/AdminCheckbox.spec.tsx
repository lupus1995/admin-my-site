import React from "react";

import { render } from "@testing-library/react";

import AdminCheckbox from "../AdminCheckbox";

describe("AdminCheckbox", () => {
  it("check render AdminCheckbox by label", () => {
    const { getByText } = render(
      <AdminCheckbox
        name="name"
        setValue={jest.fn}
        disabledClass="disabledClass"
        isDisabled={false}
        value={false}
        label="label"
      />
    );

    expect(getByText(/label/i)).toBeInTheDocument();
  });

  it("check has disabled class", () => {
    const { getByText } = render(
      <AdminCheckbox
        name="name"
        setValue={jest.fn}
        disabledClass="disabledClass"
        isDisabled
        value={false}
        label="label"
      />
    );

    expect(
      getByText(/label/i).parentElement.querySelector(".disabledClass")
    ).toHaveClass("disabledClass");
  });

  it("check render svg icon", () => {
    const { getByText } = render(
      <AdminCheckbox
        name="name"
        setValue={jest.fn}
        disabledClass="disabledClass"
        isDisabled={false}
        value
        label="label"
      />
    );

    expect(
      getByText(/label/i).parentElement.querySelector("svg")
    ).toBeInTheDocument();
  });
});
