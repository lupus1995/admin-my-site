import React, { ReactNode } from "react";

import { fireEvent, render } from "@testing-library/react";

import SignUp from "../SignUp";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
    useNavigate: () => jest.fn,
  };
});

describe("SignUp", () => {
  it("check render component", () => {
    const { getByText, getByRole } = render(<SignUp />);

    expect(getByText(/signupTitle/i)).toBeInTheDocument();

    expect(getByText(/usernameLabel/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByText("passwordLabel")).toBeInTheDocument();
    expect(getByText(/repeatPasswordLabel/i)).toBeInTheDocument();

    expect(getByText(/submit/i)).toBeInTheDocument();
    expect(getByText(/hasAccount/i)).toBeInTheDocument();
    expect(getByText(/login/i)).toBeInTheDocument();
  });

  it("has error", async () => {
    const { getByText, findAllByText } = render(<SignUp />);

    fireEvent.click(getByText(/submit/i));

    const errors = await findAllByText(/requiredText/i);

    expect(errors.length).toBe(3);
  });
});
