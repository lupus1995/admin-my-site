import React from "react";

import { render } from "@testing-library/react";

import ContentsContainerSkeleton from "../ContentsContainerSkeleton";

jest.mock("../ContentSkeleton", () => () => <>ContentSkeleton</>);

describe("ContentsContainerSkeleton", () => {
  it("check render component", async () => {
    const { getByText, getByTestId } = render(<ContentsContainerSkeleton />);

    expect(getByText(/ContentSkeleton/)).toBeInTheDocument();
    expect(getByTestId("contentsContainer")).toBeInTheDocument();
  });
});
