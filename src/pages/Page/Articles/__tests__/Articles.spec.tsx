import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { ArticleI } from "pages/interface";
import { ResponseI } from "utils/interfaces";

import Articles from "../Articles";

jest.mock("utils/mediaQuery", () => {
  const module = jest.requireActual("utils/mediaQuery");

  return {
    ...module,
    useIsMediaQuery: jest.fn().mockReturnValue({ is360: true, is481: true }),
  };
});

jest.mock("components/Pagination/hooks", () => {
  const module = jest.requireActual("components/Pagination/hooks");

  return {
    ...module,
    usePagination: jest
      .fn()
      .mockReturnValue({ notVisibleButton: true, handleLoad: jest.fn() }),
  };
});

jest.mock("../../components/Content/hooks", () => {
  const module = jest.requireActual("../../components/Content/hooks");

  return {
    ...module,
    useGetConents: jest.fn(),
  };
});

jest.mock("../../widgets", () => {
  const module = jest.requireActual("../../widgets");

  return {
    ...module,
    WrapperPage: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock("../../components", () => {
  const module = jest.requireActual("../../components");

  return {
    ...module,
    ContentsContainer: () => <span>ContentsContainer</span>,
  };
});

jest.mock("components/Pagination", () => () => <span>Pagination</span>);

describe("Articles", () => {
  it("check render component", () => {
    const { getByText } = render(
      <Articles response={{} as ResponseI<void | ArticleI[]>} />
    );

    expect(getByText(/ContentsContainer/i)).toBeInTheDocument();
    expect(getByText(/Pagination/i)).toBeInTheDocument();
  });
});
