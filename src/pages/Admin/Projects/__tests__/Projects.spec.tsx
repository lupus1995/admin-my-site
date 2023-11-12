import React, { ReactNode } from "react";

import { render, screen } from "@testing-library/react";
import * as redux from "react-redux";

import reactI18next from "utils/mocks/react-i18next";

import Projects from "../Projects";

jest.mock("react-redux");
jest.mock("react-i18next", () => reactI18next({ language: "ru" }));
jest.mock("../../hooks", () => {
  const module = jest.requireActual("../../hooks");

  return {
    ...module,
    useSession: jest.fn(),
  };
});

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("../hooks", () => {
  const module = jest.requireActual("../hooks");

  return {
    ...module,
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
  const module = jest.requireActual("../../components");

  return {
    ...module,
    AdminModal: () => <span>AdminModal</span>,
    Dashboard: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

jest.mock("../../widget", () => {
  const module = jest.requireActual("../../widget");

  return {
    ...module,
    ItemWrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

jest.mock("../ProjectItem", () => () => <span>ProjectItem</span>);
jest.mock("../../commons", () => {
  const module = jest.requireActual("../../commons");

  return {
    ...module,
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
