import React from "react";

import { render } from "@testing-library/react";

import AdminHeader from "../AdminHeader";

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("AdminHeader", () => {
  it("check render component", () => {
    const { getByText } = render(<AdminHeader handleClose={jest.fn()} />);

    expect(getByText(/deteleArticle/i)).toBeInTheDocument();
  });
});
