import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { ArticleI } from "pages/interface";
import { ResponseI } from "utils/interfaces";
import reactI18next from "utils/mocks/react-i18next";

import Article from "../Article";

jest.mock("next/head", () => () => <span>Head</span>);
jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

jest.mock("../../widgets", () => {
  const module = jest.requireActual("../../widgets");

  return {
    ...module,
    WrapperPage: ({ children }: { children: ReactNode }) => (
      <span>{children}</span>
    ),
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

jest.mock("commons/HookGetSizeImage/hook", () => {
  const module = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...module,
    useImageName: jest.fn().mockReturnValue({
      imageUrl: "imageUrl",
    }),
  };
});

describe("Article", () => {
  it("render empty article", () => {
    const { container } = render(
      <Article response={{} as ResponseI<void | ArticleI>} />
    );

    expect(container).toBeEmptyDOMElement();
  });
  it("render article", async () => {
    const { findByText } = render(
      <Article
        response={
          {
            status: true,
            responseBody: {
              _id: "id",
              title: {
                ru: "titleRu",
              },
              text: {
                ru: "textRu",
              },
              description: {
                ru: "descriptionRu",
              },
              keyWords: {
                ru: "keyWordsRu",
              },
              publishedAt: new Date().toDateString(),
            },
          } as ResponseI<void | ArticleI>
        }
      />
    );

    expect(await findByText(/titleRu/i)).toBeInTheDocument();
    expect(await findByText(/textRu/i)).toBeInTheDocument();
    expect(await findByText(/Head/i)).toBeInTheDocument();
  });
});
