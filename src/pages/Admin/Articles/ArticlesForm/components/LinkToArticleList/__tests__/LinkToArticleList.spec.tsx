import React from "react";

import { render } from "@testing-library/react";

import LinkToArticleList from "../LinkToArticleList";

jest.mock("next/router", () => {
  const module = jest.requireActual("next/router");

  return {
    ...module,
    useRouter: jest.fn().mockReturnValue(jest.fn),
  };
});

describe("LinkToArticleList", () => {
  it("check render component", () => {
    const { getByText } = render(
      <LinkToArticleList isDisabled={false} disabledClass="disabledClass" />
    );

    expect(getByText(/return/i)).toBeInTheDocument();
    expect(getByText(/return/i)).not.toHaveClass("disabledClass");
  });

  it("check render component", () => {
    const { getByText } = render(
      <LinkToArticleList isDisabled disabledClass="disabledClass" />
    );

    expect(getByText(/return/i)).toBeInTheDocument();
    expect(getByText(/return/i)).toHaveClass("disabledClass");
  });
});
