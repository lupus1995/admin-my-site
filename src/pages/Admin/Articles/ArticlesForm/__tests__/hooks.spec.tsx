import { renderHook } from "@testing-library/react";
import * as routerHooks from "next/router";
import { NextRouter } from "next/router";

import { useInitFormArticle, useSaveArticle } from "../hooks";

jest.mock("store/hooks", () => {
  const module = jest.requireActual("store/hooks");

  return {
    ...module,
    useAppDispatch: jest.fn().mockResolvedValue({ status: true }),
  };
});

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
    useLanguage: jest.fn().mockReturnValue({ t: jest.fn() }),
  };
});

describe("hooks", () => {
  it("check useInitFormArticle without id in query", () => {
    jest.spyOn(routerHooks, "useRouter").mockImplementation(
      () =>
        ({
          push: jest.fn(),
          query: null,
        } as unknown as NextRouter)
    );

    const { result } = renderHook(() =>
      useInitFormArticle({
        register: jest.fn(),
        setValue: jest.fn(),
      })
    );

    expect(typeof result.current === "boolean").toBeTruthy();
  });

  it("check useInitFormArticle with id in query", () => {
    jest.spyOn(routerHooks, "useRouter").mockReturnValue({
      push: jest.fn(),
      query: "1",
    } as unknown as NextRouter);

    const { result } = renderHook(() =>
      useInitFormArticle({
        register: jest.fn(),
        setValue: jest.fn(),
      })
    );

    expect(typeof result.current === "boolean").toBeTruthy();
  });

  it("check useSaveArticle", () => {
    jest.spyOn(routerHooks, "useRouter").mockReturnValue({
      push: jest.fn(),
      query: null,
    } as unknown as NextRouter);
    const { result } = renderHook(() =>
      useSaveArticle({ setIsDisabled: jest.fn() })
    );

    expect(typeof result.current === "function").toBeTruthy();
  });
});
