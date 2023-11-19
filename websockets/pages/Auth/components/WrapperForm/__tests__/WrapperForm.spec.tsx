import React from "react";

import { render } from "@testing-library/react";

import WrapperForm from "../WrapperForm";

describe("WrapperForm", () => {
  it("check render component", () => {
    const { getByText } = render(
      <WrapperForm onSubmit={jest.fn()}>form</WrapperForm>
    );

    expect(getByText(/form/i)).toBeInTheDocument();
  });
});
