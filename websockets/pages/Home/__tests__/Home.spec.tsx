import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import Home from "../Home";

jest.mock("websockets/entities/Users", () => {
  const mockModule = jest.requireActual("websockets/entities/Users");

  return {
    ...mockModule,
    useFetchActiveUser: jest.fn(),
  };
});

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
    useClickByInterlocutor: jest.fn().mockReturnValue({
      handleClickByDonwload: jest.fn(),
      handleClickByInterlocutor: jest.fn(),
    }),
  };
});

jest.mock("../components", () => {
  const mockModule = jest.requireActual("../components");

  return {
    ...mockModule,
    InterlocutorsList: () => <span>InterlocutorsList</span>,
    ListMessages: () => <span>ListMessages</span>,
  };
});

jest.mock("../wrappers", () => {
  const mockModule = jest.requireActual("../wrappers");

  return {
    ...mockModule,
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
