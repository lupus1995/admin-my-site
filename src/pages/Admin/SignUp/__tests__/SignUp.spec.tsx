import React, { ReactNode } from "react";

import { fireEvent, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import SignUp from "../SignUp";

fetchMock.enableMocks();
jest.mock("store/services/auth/AuthService", () => {
  const mockModule = jest.requireActual("store/services/auth/AuthService");

  return {
    ...mockModule,
    useSignupMutation: jest.fn().mockReturnValue([jest.fn()]),
  };
});

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    Link: ({ children }: { children: ReactNode }) => <>{children}</>,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
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
