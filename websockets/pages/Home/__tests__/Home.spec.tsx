import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Home from "../Home";

jest.mock("websockets/entities/Users", () => {
  const module = jest.requireActual("websockets/entities/Users");

  return {
    ...module,
    useFetchActiveUser: jest.fn(),
  };
});

jest.mock("../hooks", () => {
  const module = jest.requireActual("../hooks");

  return {
    ...module,
    useClickByInterlocutor: jest.fn().mockReturnValue({
      handleClickByDonwload: jest.fn(),
      handleClickByInterlocutor: jest.fn(),
    }),
  };
});

jest.mock("../components", () => {
  const module = jest.requireActual("../components");

  return {
    ...module,
    InterlocutorsList: () => <span>InterlocutorsList</span>,
    ListMessages: () => <span>ListMessages</span>,
  };
});

jest.mock("../wrappers", () => {
  const module = jest.requireActual("../wrappers");

  return {
    ...module,
    SocketsWrapper: ({ children }: { children: ReactNode }) => children,
  };
});

describe("Home", () => {
  it("check render component", () => {
    const { getByText } = render(<Home />);

    expect(getByText(/InterlocutorsList/i)).toBeInTheDocument();
    expect(getByText(/ListMessages/i)).toBeInTheDocument();
  });
});
