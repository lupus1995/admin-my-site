import React from "react";

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import FormForMessages from "../FormForMessages";
import * as hooks from "../hooks";

jest.mock("../hooks");

jest.mock("../components", () => {
  const mockModule = jest.requireActual("../components");

  return {
    ...mockModule,
    ModalRTC: ({ handleClose }: { handleClose: VoidFunction }) => (
      <>
        <span>ModalRTC</span>
        <button type="button" onClick={handleClose}>
          закрыть
        </button>
      </>
    ),
  };
});

describe("FormForMessages", () => {
  it("FormForMessages", () => {
    jest.spyOn(hooks, "useHandleSubmit").mockReturnValue({
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      register: jest.fn(),
    });
    const { getByText, getByRole, queryByText } = render(<FormForMessages />);

    expect(getByText(/Отправить/i)).toBeInTheDocument();
    expect(getByText(/Звонок/i)).toBeInTheDocument();
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(queryByText("ModalRTC")).not.toBeInTheDocument();
  });

  it("render ModalRTC", async () => {
    jest.spyOn(hooks, "useHandleSubmit").mockReturnValue({
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      register: jest.fn(),
    });
    const { getByText, findByText } = render(<FormForMessages />);

    userEvent.click(getByText(/Звонок/i));

    expect(await findByText("ModalRTC")).toBeInTheDocument();
  });

  it("hidden ModalRTC after visible", async () => {
    jest.spyOn(hooks, "useHandleSubmit").mockReturnValue({
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      register: jest.fn(),
    });
    const { getByText, findByText, queryByText } = render(<FormForMessages />);

    userEvent.click(getByText(/Звонок/i));

    expect(await findByText("ModalRTC")).toBeInTheDocument();

    await userEvent.click(getByText(/закрыть/i));
    expect(queryByText(/ModalRTC/i)).not.toBeInTheDocument();
  });
});
