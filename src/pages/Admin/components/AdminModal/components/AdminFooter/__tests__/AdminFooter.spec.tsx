import React from "react";

import { render } from "@testing-library/react";

import AdminFooter from "../AdminFooter";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("AdminFooter", () => {
  it("check render component", () => {
    const { getByText } = render(
      <AdminFooter handleCallback={jest.fn()} handleClose={jest.fn()} />
    );

    expect(getByText(/delete/i)).toBeInTheDocument();
    expect(getByText(/cancel/i)).toBeInTheDocument();
  });
});
