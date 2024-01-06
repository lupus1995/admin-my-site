import React from "react";

import { render } from "@testing-library/react";

import WrapperContentMainPageBlock from "../WrapperContentMainPageBlock";

jest.mock("../../../components/Content/ContentsContainerSkeleton", () => () => (
  <span>ContentsContainerSkeleton</span>
));

jest.mock("utils/mediaQuery", () => ({
  useIsMediaQuery: jest.fn().mockReturnValue({
    is360: false,
    is481: false,
    is721: false,
    is1367: false,
    is1921: false,
    is1081: false,
  }),
}));

describe("WrapperContentMainPageBlock", () => {
  it("check render component", () => {
    const { getByText, getByTestId } = render(<WrapperContentMainPageBlock />);

    expect(getByTestId("wrapper")).toBeInTheDocument();
    expect(getByTestId("title")).toBeInTheDocument();
    expect(getByText(/ContentsContainerSkeleton/i)).toBeInTheDocument();
  });
});
