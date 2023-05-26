import React from "react";

import { render } from "@testing-library/react";

import LinkToUrl from "../LinkToUrl";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
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
