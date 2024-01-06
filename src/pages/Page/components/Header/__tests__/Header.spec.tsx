import React from "react";

import { render } from "@testing-library/react";

import Header from "../Header";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    Link: ({ children }: { children: JSX.Element }) => <>{children}</>,
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Header", () => {
  it("check render component", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/WFC/i)).toBeInTheDocument();
    expect(getByText(/aboutMeTitlePage/i)).toBeInTheDocument();
    expect(getByText(/portfolioTitlePage/i)).toBeInTheDocument();
    expect(getByText(/contactsTitlePage/i)).toBeInTheDocument();
  });
});
