import React from "react";

import { render } from "@testing-library/react";

import Header from "../Header";

jest.mock("websockets/entities/Users", () => {
  const module = jest.requireActual("websockets/entities/Users");

  return {
    ...module,
    useGetSearch: jest.fn().mockReturnValue("search"),
  };
});

jest.mock("../hooks", () => {
  const module = jest.requireActual("../hooks");

  return {
    ...module,
    useHandleSearchValue: jest.fn().mockReturnValue({
      handleClick: jest.fn(),
    }),
  };
});

describe("Header", () => {
  it("check render component", () => {
    const { getByText, getByRole } = render(
      <Header handleInitPagination={jest.fn()} />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByText(/Username/i)).toBeInTheDocument();
  });
});
