import React from "react";

import { render } from "@testing-library/react";

import SwitchLanguage from "../SwitchLanguage";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    changeLanguage: jest.fn(),
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("SwitchLanguage", () => {
  it("check render component", () => {
    const { getByText } = render(<SwitchLanguage />);

    expect(getByText(/ru/i)).toBeInTheDocument();
    expect(getByText(/en/i)).toBeInTheDocument();
  });
});
