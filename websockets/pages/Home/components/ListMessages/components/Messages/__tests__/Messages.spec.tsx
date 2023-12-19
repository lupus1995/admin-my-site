import React from "react";

import { render, screen } from "@testing-library/react";

import * as messages from "websockets/entities/Messages";
import { MessageI } from "websockets/entities/share/types";
import * as activeUser from "websockets/entities/Users";

import * as author from "../hooks";
import Messages from "../Messages";

jest.mock("websockets/entities/Messages");
jest.mock("websockets/entities/Users");
jest.mock("../hooks");

describe("Messages", () => {
  it("check renderr component", () => {
    jest.spyOn(messages, "useGetMessages").mockReturnValue([
      {
        _id: "_id",
        value: "value",
        createdAt: "2023-10-30T19:47:44.500+00:00",
      } as MessageI,
    ]);
    jest
      .spyOn(activeUser, "useActiveUser")
      .mockReturnValue({} as activeUser.InterlocutorI);
    jest
      .spyOn(author, "useGetAuthor")
      .mockReturnValue(jest.fn().mockReturnValue("author"));

    const { getByText } = render(<Messages />);

    screen.debug();

    expect(getByText(/author/i)).toBeInTheDocument();
    expect(getByText(/value/i)).toBeInTheDocument();
    expect(getByText(/22:47:44 30.10.2023/i)).toBeInTheDocument();
  });
});
