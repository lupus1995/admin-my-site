import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import * as redux from "react-redux";

import reactI18next from "utils/mocks/react-i18next";

import Projects from "../Projects";

jest.mock("react-redux");
jest.mock("react-i18next", () => reactI18next({ language: "ru" }));
jest.mock("../../hooks", () => {
  const mockModule = jest.requireActual("../../hooks");

  return {
    ...mockModule,
    useSession: jest.fn(),
  };
});

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("../hooks", () => {
  const mockModule = jest.requireActual("../hooks");

  return {
    ...mockModule,
    useProjectModal: jest.fn().mockReturnValue({
      toggleModal: false,
      handleOpenModal: jest.fn(),
      handleCloseModal: jest.fn(),
      handleDeletedProject: jest.fn(),
      deletedProject: {
        title: {
          ru: "Проект для удаления",
        },
      },
    }),
  };
});

jest.mock("../../components", () => {
  const mockModule = jest.requireActual("../../components");

  return {
    ...mockModule,
    AdminModal: () => <span>AdminModal</span>,
    Dashboard: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

jest.mock("../../widget", () => {
  const mockModule = jest.requireActual("../../widget");

  return {
    ...mockModule,
    ItemWrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

jest.mock("../ProjectItem", () => () => <span>ProjectItem</span>);
jest.mock("../../commons", () => {
  const mockModule = jest.requireActual("../../commons");

  return {
    ...mockModule,
    Title: () => <span>Title</span>,
  };
});

describe("Projects", () => {
  it("default render component", async () => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(
      jest.fn().mockResolvedValue({
        status: true,
        responseBody: [{ _id: "1" }, { _id: "2" }, { _id: "3" }],
      })
    );
    const { findByText, findAllByText } = render(<Projects />);

    const projectItem = await findAllByText("ProjectItem");

    expect(await findByText("Title")).toBeInTheDocument();
    expect(await findByText("createProject")).toBeInTheDocument();
    expect(await findByText("AdminModal")).toBeInTheDocument();
    expect(projectItem.length === 3).toBeTruthy();
  });

  it("default render empty component", async () => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(
      jest.fn().mockResolvedValue({
        status: true,
        responseBody: [],
      })
    );
    const { findByText, queryByText } = render(<Projects />);

    expect(await findByText("Title")).toBeInTheDocument();
    expect(await findByText("createProject")).toBeInTheDocument();
    expect(await findByText("AdminModal")).toBeInTheDocument();
    expect(await findByText("emptyProjects")).toBeInTheDocument();
    expect(queryByText("ProjectItem")).not.toBeInTheDocument();
  });
});
