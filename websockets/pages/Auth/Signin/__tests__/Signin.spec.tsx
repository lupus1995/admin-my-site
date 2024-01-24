import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Signin from "../Signin";

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("websockets/entities/Auth", () => {
  const mockModule = jest.requireActual("websockets/entities/Auth");

  return {
    ...mockModule,
    useSigninMutation: jest
      .fn()
      .mockReturnValue([jest.fn().mockResolvedValue({})]),
  };
});

jest.mock("../../components", () => {
  const mockModule = jest.requireActual("../../components");

  return {
    ...mockModule,
    WrapperMain: ({ children }: { children: ReactNode }) => children,
    InputWrapperError: () => <span>InputWrapperError</span>,
  };
});

jest.mock("react-hook-form", () => {
  const mockModule = jest.requireActual("react-hook-form");

  return {
    ...mockModule,
    useForm: jest.fn().mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: {
          usernameOrEmail: null,
        },
      },
      control: {},
    }),
    Controller: ({ name }: { name: string }) => <span>{name}</span>,
  };
});

describe("Signin", () => {
  it("check render component", async () => {
    const { findByText, findByRole } = render(<Signin />);

    expect(await findByText(/Авторизация в чате/i)).toBeInTheDocument();
    expect(await findByRole("textbox")).toBeInTheDocument();
    expect(await findByText(/Username\/email/i)).toBeInTheDocument();
    // второй InputWrapperError находится в пропсах, поэтому не отрисовывается в тестах
    expect(await findByText(/InputWrapperError/i)).toBeInTheDocument();
    expect(await findByText("password")).toBeInTheDocument();
    expect(await findByText("Отправить")).toBeInTheDocument();
    expect(await findByText("Регистрация")).toBeInTheDocument();
  });
});
