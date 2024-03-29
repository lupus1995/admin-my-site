import React, { ReactNode } from "react";

import { fireEvent, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import SignIn from "../SignIn";

fetchMock.enableMocks();
jest.mock("store/services/auth/AuthService", () => {
  const mockModule = jest.requireActual("store/services/auth/AuthService");

  return {
    ...mockModule,
    useSigninMutation: jest.fn().mockReturnValue([jest.fn()]),
  };
});
jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
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
