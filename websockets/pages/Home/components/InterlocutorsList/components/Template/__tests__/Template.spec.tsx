import React from "react";

import { render } from "@testing-library/react";
import { Classes } from "jss";

import { InterlocutorI, MessageI } from "websockets/entities/Users";

import Template from "../Template";

jest.mock("primereact/avatar", () => {
  const module = jest.requireActual("primereact/avatar");

  return {
    ...module,
    Avatar: () => <span>Avatar</span>,
  };
});

jest.mock("react-lines-ellipsis", () => () => <span>LinesEllipsis</span>);

describe("Template", () => {
  it("check render component", () => {
    const { getByText, getAllByText, getByRole } = render(
      <Template
        interlocutor={{} as InterlocutorI}
        message={{ value: "value", createdAt: "Tue Nov 14 2023" } as MessageI}
        styles={{} as Classes}
        id={0}
      />
    );

    expect(getByText(/Avatar/i)).toBeInTheDocument();
    expect(getAllByText(/LinesEllipsis/i).length === 2).toBeTruthy();
    expect(getByText(/00:00:00 14.11.2023/i)).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
  });
});
