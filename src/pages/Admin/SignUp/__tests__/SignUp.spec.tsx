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

    expect(getByText(/Регистрация/i)).toBeInTheDocument();

    expect(getByText(/Имя пользователя/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getByText("Пароль")).toBeInTheDocument();
    expect(getByText(/Повторите пароль/i)).toBeInTheDocument();

    expect(getByText(/Отправить/i)).toBeInTheDocument();
    expect(getByText(/Вы имеете аккаунт?/i)).toBeInTheDocument();
    expect(getByText(/Авторизуйтесь/i)).toBeInTheDocument();
  });

  it("has error", async () => {
    const { getByText, findAllByText } = render(<SignUp />);

    fireEvent.click(getByText(/Отправить/i));

    const errors = await findAllByText(/Поле обязательно/i);

    expect(errors.length).toBe(3);
  });
});
