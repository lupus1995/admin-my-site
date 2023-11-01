import React from "react";

import { render } from "@testing-library/react";

import { ArticleI } from "pages/interface";
import reactI18next from "utils/mocks/react-i18next";

import Article from "../ArticleItem";

jest.mock("pages/Admin/widget", () => {
  const module = jest.requireActual("pages/Admin/widget");

  return {
    ...module,
    ItemList: () => <span>ItemList</span>,
  };
});
jest.mock("commons/HookGetSizeImage/hook", () => {
  const module = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...module,
    useImageName: jest.fn().mockReturnValue({ imageUrl: "imageUrl" }),
  };
});
jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

describe("ArticleItem", () => {
  it("check render component", () => {
    const { getByText } = render(
      <Article
        article={
          {
            title: {
              ru: "Заголовок",
            },
            description: {
              ru: "Описание",
            },
          } as ArticleI
        }
      />
    );

    expect(getByText("ItemList")).toBeInTheDocument();
  });
});
