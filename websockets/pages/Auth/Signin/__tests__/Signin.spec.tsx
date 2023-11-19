import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Signin from "../Signin";

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
    useSigninMutation: jest
      .fn()
      .mockReturnValue([jest.fn().mockResolvedValue({})]),
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

jest.mock("react-hook-form", () => {
  const module = jest.requireActual("react-hook-form");

  return {
    ...module,
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
