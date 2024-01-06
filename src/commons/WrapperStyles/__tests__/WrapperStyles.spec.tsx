import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import WrapperStyles from "../WrapperStyles";

export declare type ComponentType<P = object> = (props: P) => JSX.Element;

jest.mock("react-jss", () => ({
  __esModule: true,
  createUseStyles: jest.fn(),
  default:
    () => (Component: ComponentType) => (props: { children: ReactNode }) =>
      <Component {...props}>{props.children}</Component>,
}));
jest.mock("utils/stylesPage");

describe("WrapperStyles", () => {
  it("check render component", () => {
    const { getByText } = render(<WrapperStyles>11111</WrapperStyles>);

    expect(getByText(/11111/i));
  });
});
