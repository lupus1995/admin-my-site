import React from "react";

import { render } from "@testing-library/react";

import { ListWithItemI } from "../interface";
import ListWithItem from "../ListWithItem";

describe("ListWithItem", () => {
  let baseProps: ListWithItemI;
  beforeEach(() => {
    baseProps = {
      disabledClass: "disabledClass",
      isDisabled: false,
      image: { data_url: "data_url" },
      label: "label",
      onImageUpdate: jest.fn,
      onImageRemove: jest.fn,
      index: 0,
    };
  });
  it("render component", () => {
    const { getByAltText, getByText } = render(<ListWithItem {...baseProps} />);

    expect(getByText(/Обновить/i)).toBeInTheDocument();
    expect(getByText(/Удалить/i)).toBeInTheDocument();
    expect(getByAltText(/label/i)).toBeInTheDocument();
  });

  it("render disabled button", () => {
    const props = {
      ...baseProps,
      isDisabled: true,
    };

    const { getByText } = render(<ListWithItem {...props} />);

    expect(getByText(/Удалить/i)).toHaveClass("disabledClass");
  });
});
