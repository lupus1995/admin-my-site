import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import ArticleList from "../ArticleList";

jest.mock("pages/Admin/components/Dashboard", () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: ReactNode }) => <>{children}</>
);

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: () => jest.fn,
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
          status: false,
          responseBody: [],
        })
      )
    ),
  };
});

describe("ArticleList", () => {
  it("check render component with error response", async () => {
    const { findByText } = render(<ArticleList />);
    expect(await findByText(/emptyArticle/i)).toBeInTheDocument();
  });
});
