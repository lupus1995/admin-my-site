import React from "react";

import { render } from "@testing-library/react";

import BlockImageInput from "../BlockImageInput";
import { BlockImageInputI } from "../interface";

// eslint-disable-next-line react/display-name
jest.mock("react-images-uploading", () => () => (
  <span>react-images-uploading</span>
));

describe("BlockImageInput", () => {
  let baseProps: BlockImageInputI;
  beforeEach(() => {
    baseProps = {
      setValue: jest.fn,
      // @ts-ignore
      errors: {
        ["name" as string]: { message: "error message" },
      },
      trigger: jest.fn(),
      isSubmitted: false,
      name: "name",
      label: "label",
      watch: jest.fn(),
      isDisabled: false,
      disabledClass: "disabledClass",
      register: jest.fn(),
    };
  });

  it("check render component", () => {
    const { getByText } = render(<BlockImageInput {...baseProps} />);

    expect(getByText(/label/i)).toBeInTheDocument();
    expect(getByText(/react-images-uploading/i)).toBeInTheDocument();
    expect(getByText(/error message/i)).toBeInTheDocument();
  });
});
