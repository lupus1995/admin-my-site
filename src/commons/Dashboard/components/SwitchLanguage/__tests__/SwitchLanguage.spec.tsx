import React from "react";

import { render } from "@testing-library/react";

import SwitchLanguage from "../SwitchLanguage";

describe("SwitchLanguage", () => {
  it("check render component", () => {
    const { getByText } = render(<SwitchLanguage />);

    expect(getByText(/ru/i)).toBeInTheDocument();
    expect(getByText(/en/i)).toBeInTheDocument();
  });
});
