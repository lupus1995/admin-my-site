import React from "react";

import { render } from "@testing-library/react";

import * as user from "websockets/entities/Users";
import * as helpers from "websockets/pages/Home/helpers";

import NameInterlocutor from "../NameInterlocutor";

jest.mock("websockets/entities/Users");
jest.mock("websockets/pages/Home/helpers");

describe("NameInterlocutor", () => {
  it("check render component", () => {
    jest.spyOn(user, "useGetActiveInterlocutor").mockReturnValue({
      activeInterlocutor: {} as user.InterlocutorI,
    });
    jest.spyOn(helpers, "generateFullName").mockReturnValue("fullName");
    const { getByText } = render(<NameInterlocutor />);

    expect(getByText(/fullName/i)).toBeInTheDocument();
  });
});
