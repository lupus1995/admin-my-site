import React from "react";

import { render } from "@testing-library/react";

import { testDataContent } from "../__fixtures__/constants";
import ContentsContainer from "../ContentsContainer";

jest.mock("../Content", () => () => <>Content</>);

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

describe("ContentsContainer", () => {
  it("check render component", () => {
    const { getByText, getByTestId } = render(
      <ContentsContainer contents={[testDataContent]} />
    );

    expect(getByText("Content")).toBeInTheDocument();
    expect(getByTestId("contentsContainer")).toBeInTheDocument();
  });
});
