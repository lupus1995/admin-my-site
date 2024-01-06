import React from "react";

import { render } from "@testing-library/react";

import WrapperStyles from "../WrapperStyles";

jest.mock("react-jss", () => ({
  __esModule: true,
  createUseStyles: jest.fn(),
  default: () => (Component: React.FC) => (props: any) =>
    <Component {...props}>{props.children}</Component>,
}));
jest.mock("utils/stylesPage");

describe("WrapperStyles", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperStyles>11111</WrapperStyles>);

    expect(getByText(/11111/i));
  });
});
