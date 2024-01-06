import React from "react";

import { render } from "@testing-library/react";
import { SheetsRegistry, createGenerateId } from "jss";
import { JssProvider } from "react-jss";

import ContentsContainerSkeleton from "../ContentsContainerSkeleton";

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

jest.mock("../ContentSkeleton", () => () => <>ContentSkeleton</>);

describe("ContentsContainerSkeleton", () => {
  it("check render component", async () => {
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();
    const { getByText, getByTestId } = render(
      <JssProvider registry={sheets} generateId={generateId}>
        <ContentsContainerSkeleton />
      </JssProvider>
    );

    expect(getByText(/ContentSkeleton/)).toBeInTheDocument();
    expect(getByTestId("contentsContainer")).toBeInTheDocument();
  });
});
