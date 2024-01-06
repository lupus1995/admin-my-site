import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { ArticleI } from "pages/interface";
import { ResponseI } from "utils/interfaces";

import Articles from "../Articles";

jest.mock("utils/mediaQuery", () => {
  const mockModule = jest.requireActual("utils/mediaQuery");

  return {
    ...mockModule,
    useIsMediaQuery: jest.fn().mockReturnValue({ is360: true, is481: true }),
  };
});

jest.mock("components/Pagination/hooks", () => {
  const mockModule = jest.requireActual("components/Pagination/hooks");

  return {
    ...mockModule,
    usePagination: jest
      .fn()
      .mockReturnValue({ notVisibleButton: true, handleLoad: jest.fn() }),
  };
});

jest.mock("../../components/Content/hooks", () => {
  const mockModule = jest.requireActual("../../components/Content/hooks");

  return {
    ...mockModule,
    useGetConents: jest.fn(),
  };
});

jest.mock("../../widgets", () => {
  const mockModule = jest.requireActual("../../widgets");

  return {
    ...mockModule,
    WrapperPage: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock("../../components", () => {
  const mockModule = jest.requireActual("../../components");

  return {
    ...mockModule,
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
