import React from "react";

import { render } from "@testing-library/react";

import FormForMessages from "../FormForMessages";
import * as hooks from "../hooks";

jest.mock("../hooks");

describe("FormForMessages", () => {
  it("FormForMessages", () => {
    jest.spyOn(hooks, "useHandleSubmit").mockReturnValue({
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      register: jest.fn(),
    });
    const { getByText, getByRole } = render(<FormForMessages />);

    expect(getByText(/Отправить/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
