import React from "react";

import { render } from "@testing-library/react";

import Header from "../Header";

jest.mock("websockets/entities/Users", () => {
  const mockModule = jest.requireActual("websockets/entities/Users");

  return {
    ...mockModule,
    useGetSearch: jest.fn().mockReturnValue("search"),
  };
});

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
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
