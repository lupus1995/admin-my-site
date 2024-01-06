import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import * as redux from "react-redux";

import reactI18next from "utils/mocks/react-i18next";

import ArticleList from "../ArticleList";

fetchMock.enableMocks();
jest.mock("react-redux");

jest.mock("pages/Admin/components/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

const data = {
  status: true,
  responseBody: [
    {
      title: {
        ru: "titleRU",
        en: "titleEN",
      },
      description: {
        ru: "descriptionRU",
        en: "descriptionEN",
      },
      thumbnail: "thumbnail",
      text: {
        ru: "textRU",
        en: "textEN",
      },
      keyWords: {
        ru: "keyWordsRU",
        en: "keyWordsEN",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      hidePublishedArticle: false,
      _id: "dfgdfg",
    },
  ],
};

describe("ArticleList", () => {
  it("check render component", async () => {
    jest
      .spyOn(redux, "useDispatch")
      .mockReturnValue(jest.fn().mockResolvedValue(data));
    const { getByText, findByAltText, findByText } = render(<ArticleList />);

    expect(getByText(/articlesOnSite/i)).toBeInTheDocument();
    expect(getByText(/createArticle/)).toBeInTheDocument();
    expect(await findByAltText(/titleRU/i)).toBeInTheDocument();
    expect(await findByText(/titleRU/i)).toBeInTheDocument();
    expect(await findByText(/descriptionRU/i)).toBeInTheDocument();
    expect(await findByText(/edit/i)).toBeInTheDocument();
    expect(await findByText(/delete/i)).toBeInTheDocument();
  });

  it("check render modal", async () => {
    jest
      .spyOn(redux, "useDispatch")
      .mockReturnValue(jest.fn().mockResolvedValue(data));
    const { findByText, findAllByText } = render(<ArticleList />);

    userEvent.click(await findByText(/delete/i));

    expect(await findByText(/deteleArticle/i)).toBeInTheDocument();
    expect(await findByText(/deleteArticleText/i)).toBeInTheDocument();
    const buttons = await findAllByText(/delete/i);

    expect(buttons[2]).toBeInTheDocument();
    expect(await findByText(/cancel/i)).toBeInTheDocument();
  });
});
