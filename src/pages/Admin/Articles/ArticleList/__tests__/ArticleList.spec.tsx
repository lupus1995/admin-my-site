import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticleList from "../ArticleList";

jest.mock("commons/Dashboard", () =>
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
              title: "title",
              description: "description",
              thumbnail: "thumbnail",
              text: "text",
              keyWords: "keyWords",
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

    expect(getByText(/Статьи на сайте/i)).toBeInTheDocument();
    expect(getByText(/Создать статью/)).toBeInTheDocument();
    expect(await findByAltText(/title/i)).toBeInTheDocument();
    expect(await findByText(/title/i)).toBeInTheDocument();
    expect(await findByText(/description/i)).toBeInTheDocument();
    expect(await findByText(/description/i)).toBeInTheDocument();
    expect(await findByText(/Редактировать/i)).toBeInTheDocument();
    expect(await findByText(/Удалить/i)).toBeInTheDocument();
  });

  it("check render modal", async () => {
    const { findByText, findAllByText } = render(<ArticleList />);

    userEvent.click(await findByText(/Удалить/i));

    expect(await findByText(/Удаление статьи/i)).toBeInTheDocument();
    expect(
      await findByText(/Вы действительно намерены удалить статью/i)
    ).toBeInTheDocument();
    const buttons = await findAllByText(/Удалить/i);

    expect(buttons[2]).toBeInTheDocument();
    expect(await findByText(/Отмена/i)).toBeInTheDocument();
  });
});
