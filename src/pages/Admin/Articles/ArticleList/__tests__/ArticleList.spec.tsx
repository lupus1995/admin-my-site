import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import reactI18next from "utils/mocks/react-i18next";

import ArticleList from "../ArticleList";

jest.mock("pages/Admin/components/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("react-router-dom", () => {
  const module = jest.requireActual("react-router-dom");

  return {
    ...module,
    useNavigate: () => jest.fn,
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

jest.mock("pages/Admin/Articles/ArticleList/api", () => {
  const module = jest.requireActual("pages/Admin/Articles/ArticleList/api");

  return {
    ...module,
    getArticles: jest.fn().mockResolvedValue(
      new Promise((res) =>
        res({
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
        })
      )
    ),
  };
});

describe("ArticleList", () => {
  it("check render component", async () => {
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
    const { findByText, findAllByText } = render(<ArticleList />);

    userEvent.click(await findByText(/delete/i));

    expect(await findByText(/deteleArticle/i)).toBeInTheDocument();
    expect(await findByText(/deleteArticleText/i)).toBeInTheDocument();
    const buttons = await findAllByText(/delete/i);

    expect(buttons[2]).toBeInTheDocument();
    expect(await findByText(/cancel/i)).toBeInTheDocument();
  });
});
