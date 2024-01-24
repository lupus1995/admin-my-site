import React from "react";

import { render } from "@testing-library/react";

import LinkToUrl from "../LinkToUrl";

jest.mock("next/router", () => {
  const mockModule = jest.requireActual("next/router");

  return {
    ...mockModule,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("LinkToUrl", () => {
  it("check render component", () => {
    const { getByText } = render(
      <LinkToUrl isDisabled={false} disabledClass="disabledClass" url="url" />
    );

    expect(getByText("return")).toBeInTheDocument();
  });
});
