import React, { ReactNode } from "react";

import { fireEvent, render } from "@testing-library/react";

import SignIn from "../SignIn";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

describe("SignIn", () => {
  it("check render component", () => {
    const { getByText, getByRole } = render(<SignIn />);

    expect(getByText(/signinTitle/i)).toBeInTheDocument();

    expect(getByText(/username/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();

    expect(getByText(/password/i)).toBeInTheDocument();

    expect(getByText(/submit/i)).toBeInTheDocument();

    expect(getByText(/hasNoAccount/i)).toBeInTheDocument();
    expect(getByText(/register/i)).toBeInTheDocument();
  });

  it("check has erros", async () => {
    const { getByText, findAllByText } = render(<SignIn />);

    fireEvent.click(getByText(/submit/i));

    const errors = await findAllByText(/requiredText/i);

    expect(errors.length).toBe(2);
  });
});
