import React from "react";

import { render } from "@testing-library/react";

import { ContentI } from "pages/interface";
import { useLanguage } from "utils/hooks";

import { testDataContent } from "../__fixtures__/constants";
import Content from "../Content";

jest.mock("utils/hooks");

jest.mock("next/link", () => ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
));

jest.mock("commons/HookGetSizeImage/hook", () => {
  const module = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...module,
    useImageName: ({ imageName }: { imageName: string }) => ({
      imageUrl: imageName,
    }),
  };
});

jest.mock("utils/mediaQuery", () => {
  const module = jest.requireActual("utils/mediaQuery");

  return {
    ...module,
    useIsMediaQuery: jest.fn().mockReturnValue({}),
  };
});

jest.mock("../style", () => () => ({
  contentsContainer: {},
}));

describe("Content", () => {
  let initProps: ContentI;

  beforeEach(() => {
    initProps = testDataContent;
  });

  it("check render component by ru", () => {
    jest.mocked(useLanguage).mockImplementation(() => ({
      language: "ru",
      t: jest.fn(),
      changeLanguage: jest.fn(),
    }));

    const { getByTestId, getByText } = render(
      <Content contentItem={{ ...initProps }} />
    );

    expect(getByTestId("thumbnail")).toBeInTheDocument();
    expect(getByText("title ru")).toBeInTheDocument();
    expect(getByText("description ru")).toBeInTheDocument();
    expect(getByText("12.05.2023")).toBeInTheDocument();
  });

  it("check render component by en", () => {
    jest.mocked(useLanguage).mockImplementation(() => ({
      language: "en",
      t: jest.fn(),
      changeLanguage: jest.fn(),
    }));

    const { getByTestId, getByText } = render(
      <Content contentItem={{ ...initProps }} />
    );

    expect(getByTestId("thumbnail")).toBeInTheDocument();
    expect(getByText("title en")).toBeInTheDocument();
    expect(getByText("description en")).toBeInTheDocument();
    expect(getByText("12.05.2023")).toBeInTheDocument();
  });
});
