import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Signup from "../Signup";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("websockets/entities/Auth", () => {
  const module = jest.requireActual("websockets/entities/Auth");

  return {
    ...module,
    useSignupMutation: jest.fn().mockReturnValue([jest.fn()]),
  };
});

jest.mock("react-hook-form", () => {
  const module = jest.requireActual("react-hook-form");

  return {
    ...module,
    useForm: jest.fn().mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
      control: {},
    }),
    Controller: ({ name }: { name: string }) => <span>{name}</span>,
  };
});

jest.mock("../../components", () => {
  const module = jest.requireActual("../../components");

  return {
    ...module,
    WrapperMain: ({ children }: { children: ReactNode }) => children,
    InputWrapperError: () => <span>InputWrapperError</span>,
  };
});

describe("Signup", () => {
  it("check render component", () => {
    const { getByText, getAllByText } = render(<Signup />);

    expect(getByText(/Регистрция в чате/i)).toBeInTheDocument();
    expect(getByText(/Имя/i)).toBeInTheDocument();
    expect(getByText(/Фамилия/i)).toBeInTheDocument();
    expect(getByText(/Username/i)).toBeInTheDocument();
    expect(getByText(/E-mail/i)).toBeInTheDocument();
    expect(getByText(/password/i)).toBeInTheDocument();
    expect(getByText(/Отправить/i)).toBeInTheDocument();
    expect(getByText(/Авторизация/i)).toBeInTheDocument();
    expect(getAllByText(/InputWrapperError/i).length === 4).toBeTruthy();
  });
});
