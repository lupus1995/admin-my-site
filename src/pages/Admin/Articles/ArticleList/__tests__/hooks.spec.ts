import { renderHook } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

import { useArticleModal } from "../hooks";

fetchMock.enableMocks();
jest.mock("react-redux");
jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  };
});

describe("hooks", () => {
  it("useArticleModal", () => {
    const { result } = renderHook(() =>
      useArticleModal({
        articles: [],
        setArticles: jest.fn(),
      })
    );

    expect(typeof result.current.toggleModal === "boolean").toBeTruthy();
    expect(typeof result.current.handleCloseModal === "function").toBeTruthy();
    expect(typeof result.current.handleOpenModal === "function").toBeTruthy();
    expect(
      typeof result.current.handleDeletedArticle === "function"
    ).toBeTruthy();
  });
});
