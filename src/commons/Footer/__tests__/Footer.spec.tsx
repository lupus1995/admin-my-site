import React from "react";

import { render } from "@testing-library/react";

import Footer from "../Footer";

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Footer", () => {
  it("check render component", () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/copyright 2024/i)).toBeInTheDocument();
  });
});
