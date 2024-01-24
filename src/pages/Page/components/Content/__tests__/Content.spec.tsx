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
  const mockModule = jest.requireActual("commons/HookGetSizeImage/hook");

  return {
    ...mockModule,
    useImageName: ({ imageName }: { imageName: string }) => ({
      imageUrl: imageName,
    }),
  };
});

jest.mock("utils/mediaQuery", () => {
  const mockModule = jest.requireActual("utils/mediaQuery");

  return {
    ...mockModule,
    useIsMediaQuery: jest.fn().mockReturnValue({}),
  };
});

jest.mock("../style", () => () => ({
  contentsContainer: {},
}));

jest.mock("pages/Page/commons", () => {
  const moduleMock = jest.requireActual("pages/Page/commons");

  return {
    ...moduleMock,
    CustomImage: () => <span>CustomImage</span>,
  };
});

describe("Content", () => {
  let initProps: ContentI;

  beforeEach(() => {
    initProps = testDataContent;
  });

  it("check render component by ru", () => {
    jest.mocked(useLanguage).mockImplementation(() => ({
      language: "ru",
      // @ts-ignore
      t: (arg: string) => arg,
      changeLanguage: jest.fn(),
    }));

    const { getByText } = render(<Content contentItem={{ ...initProps }} />);

    expect(getByText("title ru")).toBeInTheDocument();
    expect(getByText("description ru")).toBeInTheDocument();
    expect(getByText("12.05.2023")).toBeInTheDocument();
    expect(getByText(/CustomImage/i)).toBeInTheDocument();
  });

  it("check render component by en", () => {
    jest.mocked(useLanguage).mockImplementation(() => ({
      language: "en",
      // @ts-ignore
      t: (arg: string) => arg,
      changeLanguage: jest.fn(),
    }));

    const { getByText } = render(<Content contentItem={{ ...initProps }} />);

    expect(getByText("title en")).toBeInTheDocument();
    expect(getByText("description en")).toBeInTheDocument();
    expect(getByText("12.05.2023")).toBeInTheDocument();
    expect(getByText(/CustomImage/i)).toBeInTheDocument();
  });
});
