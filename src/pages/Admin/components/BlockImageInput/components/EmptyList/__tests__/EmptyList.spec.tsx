import React from "react";

import { render } from "@testing-library/react";

import EmptyList from "../EmptyList";
import { EmptyListI } from "../interface";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("EmptyList", () => {
  let baseProps: EmptyListI;
  beforeEach(() => {
    baseProps = {
      disabledClass: "disabledClass",
      isDisabled: false,
      onImageUpload: jest.fn,
      classesForButton: "classesForButton",
    };
  });
  it("check render button", () => {
    const { getByText } = render(<EmptyList {...baseProps} />);

    expect(getByText(/loadImage/i)).toBeInTheDocument();
    expect(getByText(/loadImage/i)).not.toHaveClass("disabledClass");
  });

  it("check render disabled button", () => {
    const props: EmptyListI = {
      ...baseProps,
      isDisabled: true,
    };
    const { getByText } = render(<EmptyList {...props} />);

    expect(getByText(/loadImage/i)).toHaveClass("disabledClass");
  });
});
