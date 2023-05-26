import React from "react";

import { render } from "@testing-library/react";

import { testDataContent } from "../__fixtures__/constants";
import ContentsContainer from "../ContentsContainer";

jest.mock("../Content", () => () => <>Content</>);

describe("ContentsContainer", () => {
  it("check render component", () => {
    const { getByText, getByTestId } = render(
      <ContentsContainer contents={[testDataContent]} />
    );

    expect(getByText("Content")).toBeInTheDocument();
    expect(getByTestId("contentsContainer")).toBeInTheDocument();
  });
});
