import React, { forwardRef } from "react";

import { render } from "@testing-library/react";
import { Classes } from "jss";

import { MessageI } from "websockets/entities/share/types";
import * as userEntities from "websockets/entities/Users";
import { InterlocutorI } from "websockets/entities/Users";

import * as hooks from "../hooks";
import InterlocutorsList from "../InterlocutorsList";

jest.mock("pages/Admin/hooks", () => {
  const mockModule = jest.requireActual("pages/Admin/hooks");

  return {
    ...mockModule,
    useSession: jest.fn(),
  };
});
jest.mock("websockets/entities/Users");
jest.mock("../hooks");
jest.mock("primereact/dataview", () => {
  const mockModule = jest.requireActual("primereact/dataview");

  return {
    ...mockModule,
    DataView: forwardRef(() => <span>DataView</span>),
  };
});
jest.mock("../../../wrappers/SocketsWrapper", () => {
  const mockModule = jest.requireActual("../../../wrappers/SocketsWrapper");

  return {
    ...mockModule,
    useSocketUserOnline: jest.fn(),
  };
});

jest.mock("../../../wrappers/SocketsWrapper/hooks", () => {
  const mockModule = jest.requireActual(
    "../../../wrappers/SocketsWrapper/hooks"
  );

  return {
    ...mockModule,
    useSocketUserPeerToPeer: jest.fn(),
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

    const { getByText } = render(
      <InterlocutorsList handleClickByInterlocutor={jest.fn} />
    );

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
          | "interlocutorItemActive"
          | "interlocutorAvatar"
          | "interlocutorBadge"
          | "interlocutorsDate"
          | "interlocutorInfo"
          | "interlocutorButton"
        >;
        interlocutor: InterlocutorI;
        message: MessageI;
        handleClickByInterlocutor: ({
          roomId,
          interlocutor,
        }: {
          roomId: string;
          interlocutor: InterlocutorI;
        }) => () => Promise<void>;
        isOnline: boolean;
        id: string;
      },
    ]);

    const { getByText } = render(
      <InterlocutorsList handleClickByInterlocutor={jest.fn} />
    );

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

    const { queryByText } = render(
      <InterlocutorsList handleClickByInterlocutor={jest.fn} />
    );

    expect(queryByText(/DataView/i)).not.toBeInTheDocument();
  });
});
