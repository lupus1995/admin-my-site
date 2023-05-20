import { renderHook } from "@testing-library/react";

import { useArticleModal } from "../hooks";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
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
