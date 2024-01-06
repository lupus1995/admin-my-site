import React from "react";

import { render } from "@testing-library/react";

import Contacts from "../Contacts";

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Contacts", () => {
  it("check render component", () => {
    const { getByText, getByTestId, getAllByRole } = render(<Contacts />);

    const inputs = getAllByRole("textbox");

    const username = inputs.find(
      (input: HTMLInputElement) => input.name === "username"
    );
    const text = inputs.find(
      (input: HTMLInputElement) => input.name === "text"
    );

    expect(getByText(/contactsTitlePage/i)).toBeInTheDocument();
    expect(getByTestId(/falseField/i)).toBeInTheDocument();

    expect(getByText(/userNameLastName/i)).toBeInTheDocument();
    expect(username).toBeInTheDocument();

    expect(getByText(/feedbackPage/i)).toBeInTheDocument();
    expect(text).toBeInTheDocument();

    expect(getByTestId(/submit/i)).toBeInTheDocument();
  });
});
