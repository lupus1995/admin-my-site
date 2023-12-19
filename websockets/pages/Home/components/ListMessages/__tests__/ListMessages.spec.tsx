import React from "react";

import { render } from "@testing-library/react";

import * as active from "websockets/entities/Users";

import ListMessages from "../ListMessages";

jest.mock("websockets/entities/Messages");
jest.mock("websockets/entities/Users");
jest.mock("../components", () => {
  const module = jest.requireActual("../components");

  return {
    ...module,
    FormForMessage: () => <span>FormForMessage</span>,
    Messages: () => <span>Messages</span>,
    NameInterlocutor: () => <span>NameInterlocutor</span>,
  };
});

describe("ListMessages", () => {
  it("check render visible component", () => {
    jest
      .spyOn(active, "useGetActiveInterlocutor")
      .mockReturnValue({ activeInterlocutor: {} as active.InterlocutorI });

    const { getByText } = render(<ListMessages />);

    expect(getByText(/FormForMessage/i)).toBeInTheDocument();
    expect(getByText(/Messages/i)).toBeInTheDocument();
    expect(getByText(/NameInterlocutor/i)).toBeInTheDocument();
  });
  it("check render hidden component", () => {
    jest
      .spyOn(active, "useGetActiveInterlocutor")
      .mockReturnValue({ activeInterlocutor: null });

    const { queryByText } = render(<ListMessages />);

    expect(queryByText(/FormForMessage/i)).not.toBeInTheDocument();
    expect(queryByText(/Messages/i)).not.toBeInTheDocument();
    expect(queryByText(/NameInterlocutor/i)).not.toBeInTheDocument();
  });
});
