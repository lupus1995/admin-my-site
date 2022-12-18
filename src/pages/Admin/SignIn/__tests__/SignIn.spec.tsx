import React, { ReactNode } from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import SignIn from "../SignIn";

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useNavigate: () => jest.fn,
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

describe("SignIn", () => {
  it("check render component", () => {
    const { getByText, getByRole } = render(<SignIn />);

    expect(getByText(/Авторизация/i)).toBeInTheDocument();

    expect(getByText(/Имя пользователя/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();

    expect(getByText(/Пароль/i)).toBeInTheDocument();

    expect(getByText(/Отправить/i)).toBeInTheDocument();

    expect(getByText(/Вы не имеете аккаунт?/i)).toBeInTheDocument();
    expect(getByText(/Зарегистрируйтесь/i)).toBeInTheDocument();
  });

  it("check has erros", async () => {
    const { getByText, findAllByText } = render(<SignIn />);

    fireEvent.click(getByText(/Отправить/i));

    const errors = await findAllByText(/Поле обязательно/i);

    expect(errors.length).toBe(2);
  });
});
