import React from "react";

import { render } from "@testing-library/react";

import Header from "../Header";

describe("Header", () => {
  it("check render component", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/WFC/i)).toBeInTheDocument();
    expect(getByText(/Обо мне/i)).toBeInTheDocument();
    expect(getByText(/Потрфолио/i)).toBeInTheDocument();
    expect(getByText(/Контакты/i)).toBeInTheDocument();
  });
});
