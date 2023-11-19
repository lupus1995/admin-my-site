import React from "react";

import { render } from "@testing-library/react";

import Home from "../Home";

jest.mock("../components", () => {
  const module = jest.requireActual("../components");

  return {
    ...module,
    InterlocutorsList: () => <span>InterlocutorsList</span>,
  };
});

describe("Home", () => {
  it("check render component", () => {
    const { getByText } = render(<Home />);

    expect(getByText(/InterlocutorsList/i)).toBeInTheDocument();
  });
});
