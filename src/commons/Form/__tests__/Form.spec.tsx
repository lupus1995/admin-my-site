import React from "react";

import { render } from "@testing-library/react";

import Form from "../Form";
import { FormI } from "../interface";

describe("Form", () => {
  let baseProps: FormI;

  beforeEach(() => {
    baseProps = {
      handleSubmit: jest.fn,
      onSubmit: jest.fn,
      className: "className",
      formPosition: "baceline",
      isCenter: false,
    };
  });

  it("check render component", () => {
    const { getByText } = render(<Form {...baseProps}>child</Form>);

    expect(getByText(/child/i)).toBeInTheDocument();
  });
});
