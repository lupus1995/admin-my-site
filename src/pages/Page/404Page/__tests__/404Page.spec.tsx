import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import PageNotFound from "../404Page";

jest.mock("next/link", () => ({ children }: { children: ReactNode }) => (
  <span>{children}</span>
));

jest.mock("../../widgets", () => {
  const mockModule = jest.requireActual("../../widgets");

  return {
    ...mockModule,
    WrapperPage: ({ children }: { children: ReactNode }) => (
      <span>{children}</span>
    ),
  };
});

describe("PageNotFound", () => {
  it("render component", () => {
    const { getByText } = render(<PageNotFound />);

    expect(
      getByText(/Страница не найдена. Обратитесь к владельцу сайта/i)
    ).toBeInTheDocument();
    expect(getByText(/Главная страница/i)).toBeInTheDocument();
  });
});
