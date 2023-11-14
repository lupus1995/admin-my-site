import React, { forwardRef } from "react";

import { render } from "@testing-library/react";
import { Classes } from "jss";

import * as userEntities from "websockets/entities/Users";
import { InterlocutorI, MessageI } from "websockets/entities/Users";

import * as hooks from "../hooks";
import InterlocutorsList from "../InterlocutorsList";

jest.mock("pages/Admin/hooks", () => {
  const module = jest.requireActual("pages/Admin/hooks");

  return {
    ...module,
    useSession: jest.fn(),
  };
});
jest.mock("websockets/entities/Users");
jest.mock("../hooks");
jest.mock("primereact/dataview", () => {
  const module = jest.requireActual("primereact/dataview");

  return {
    ...module,
    DataView: forwardRef(() => <span>DataView</span>),
  };
});

describe("InterlocutorsList", () => {
  it("check render component by loading is false", () => {
    jest.spyOn(userEntities, "useGetInterlocutors").mockReturnValue([]);
    jest.spyOn(userEntities, "usePaginationInterlocutor").mockReturnValue({
      handlePagination: jest.fn(),
      isLoading: false,
      handleInitPagination: jest.fn(),
    });
    jest.spyOn(React, "useRef").mockReturnValue({
      current: {},
    });
    jest.spyOn(hooks, "useListInterlocutors").mockReturnValue([]);

    const { getByText } = render(<InterlocutorsList />);

    expect(getByText(/DataView/i)).toBeInTheDocument();
  });
  it("check render component by list more 0", () => {
    jest.spyOn(userEntities, "useGetInterlocutors").mockReturnValue([]);
    jest.spyOn(userEntities, "usePaginationInterlocutor").mockReturnValue({
      handlePagination: jest.fn(),
      isLoading: true,
      handleInitPagination: jest.fn(),
    });
    jest.spyOn(React, "useRef").mockReturnValue({
      current: {},
    });
    jest.spyOn(hooks, "useListInterlocutors").mockReturnValue([
      {} as {
        styles: Classes<
          | "interlocutorsList"
          | "interlocutorItem"
          | "interlocutorAvatar"
          | "interlocutorsDate"
          | "interlocutorInfo"
          | "interlocutorButton"
        >;
        interlocutor: InterlocutorI;
        message: MessageI;
        id: number;
      },
    ]);

    const { getByText } = render(<InterlocutorsList />);

    expect(getByText(/DataView/i)).toBeInTheDocument();
  });
  it("check render empty component", () => {
    jest.spyOn(userEntities, "useGetInterlocutors").mockReturnValue([]);
    jest.spyOn(userEntities, "usePaginationInterlocutor").mockReturnValue({
      handlePagination: jest.fn(),
      isLoading: true,
      handleInitPagination: jest.fn(),
    });
    jest.spyOn(React, "useRef").mockReturnValue({
      current: {},
    });
    jest.spyOn(hooks, "useListInterlocutors").mockReturnValue([]);

    const { queryByText } = render(<InterlocutorsList />);

    expect(queryByText(/DataView/i)).not.toBeInTheDocument();
  });
});
