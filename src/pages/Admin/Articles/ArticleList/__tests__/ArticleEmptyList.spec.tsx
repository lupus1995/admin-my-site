import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

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
          responseBody: [],
        })
      )
    ),
  };
});

describe("ArticleList", () => {
  it("check render empty list", async () => {
    const { findByText } = render(<ArticleList />);
    expect(await findByText(/emptyArticle/i)).toBeInTheDocument();
  });
});
