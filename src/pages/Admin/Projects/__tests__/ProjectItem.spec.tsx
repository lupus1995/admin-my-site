import React from "react";

import { render } from "@testing-library/react";

import { ProjectI } from "pages/interface";

import ProjectItem from "../ProjectItem";

jest.mock("../../widget", () => {
  const module = jest.requireActual("../../widget");

  return {
    ...module,
    ItemList: () => <span>ItemList</span>,
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest.fn().mockReturnValue({ language: "ru" }),
  };
});

jest.mock("commons/HookGetSizeImage/hook", () => {
  const module = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...module,
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
