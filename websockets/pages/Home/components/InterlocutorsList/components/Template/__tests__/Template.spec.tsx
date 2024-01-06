import React from "react";

import { render } from "@testing-library/react";
import { Classes } from "jss";

import { MessageI } from "websockets/entities/share/types";
import { InterlocutorI } from "websockets/entities/Users";

import Template from "../Template";

jest.mock("primereact/avatar", () => {
  const module = jest.requireActual("primereact/avatar");

  return {
    ...module,
    Avatar: () => <span>Avatar</span>,
  };
});

jest.mock("react-lines-ellipsis", () => () => <span>LinesEllipsis</span>);
jest.mock("primereact/badge", () => {
  const module = jest.requireActual("primereact/badge");

  return {
    ...module,
    Badge: () => <span>Badge</span>,
  };
});

jest.mock("../hooks", () => {
  const module = jest.requireActual("../hooks");

  return {
    ...module,
    useIsActiveInterlocutor: jest.fn().mockReturnValue(false),
  };
});

describe("Template", () => {
  it("check render component, isOnline false", () => {
    const { getByText, getAllByText, getByRole, queryByText } = render(
      <Template
        interlocutor={{} as InterlocutorI}
        message={{ value: "value", createdAt: "Tue Nov 14 2023" } as MessageI}
        styles={{} as Classes}
        isOnline={false}
        handleClickByInterlocutor={jest.fn}
      />
    );

    expect(getByText(/Avatar/i)).toBeInTheDocument();
    expect(getAllByText(/LinesEllipsis/i).length === 2).toBeTruthy();
    expect(getByText(/00:00:00 14.11.2023/i)).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
    expect(queryByText(/Badge/i)).not.toBeInTheDocument();
  });

  it("check render component, isOnline true", () => {
    const { getByText } = render(
      <Template
        interlocutor={{} as InterlocutorI}
        message={{ value: "value", createdAt: "Tue Nov 14 2023" } as MessageI}
        styles={{} as Classes}
        isOnline
        handleClickByInterlocutor={jest.fn}
      />
    );

    expect(getByText(/Badge/i)).toBeInTheDocument();
  });
});
