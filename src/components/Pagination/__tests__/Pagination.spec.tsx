import React from "react";

import { render } from "@testing-library/react";

import reactI18next from "utils/mocks/react-i18next";

import Pagination from "../Pagination";

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

describe("Pagination", () => {
  let handleLoad: () => Promise<void>;

  beforeEach(() => {
    handleLoad = jest.fn().mockResolvedValue("");
  });
  it("check hidden pagination", () => {
    const { queryByText } = render(
      <Pagination handleLoad={handleLoad} notVisibleButton />
    );

    expect(queryByText("loadMoreArticle")).not.toBeInTheDocument();
  });
  it("check render pagination", () => {
    const { getByText } = render(<Pagination handleLoad={handleLoad} />);

    expect(getByText("loadMoreArticle")).toBeInTheDocument();
  });
});
