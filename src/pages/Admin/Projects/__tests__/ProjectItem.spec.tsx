import React from "react";

import { render } from "@testing-library/react";

import { ProjectI } from "pages/interface";

import ProjectItem from "../ProjectItem";

jest.mock("../../widget", () => {
  const mockModule = jest.requireActual("../../widget");

  return {
    ...mockModule,
    ItemList: () => <span>ItemList</span>,
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest.fn().mockReturnValue({ language: "ru" }),
  };
});

jest.mock("commons/HookGetSizeImage/hook", () => {
  const mockModule = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...mockModule,
    useImageName: jest.fn().mockReturnValue({ imageUrl: "imageUrl" }),
  };
});

describe("ProjectItem", () => {
  it("check render component", () => {
    const data = {
      title: { ru: "title" },
      description: { ru: "title" },
    } as ProjectI;
    const { getByText } = render(<ProjectItem project={data} />);

    expect(getByText(/ItemList/i)).toBeInTheDocument();
  });
});
