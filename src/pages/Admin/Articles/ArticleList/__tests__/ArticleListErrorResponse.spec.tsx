import React, { ReactNode } from "react";

import { render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as redux from "react-redux";

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
    useRouter: () => jest.fn,
    Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("ArticleList", () => {
  it("check render component with error response", async () => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(
      jest.fn().mockResolvedValue({
        status: false,
        responseBody: [],
      })
    );
    const { findByText } = render(<ArticleList />);
    expect(await findByText(/emptyArticle/i)).toBeInTheDocument();
  });
});
