import React from "react";

import { render } from "@testing-library/react";

import HidePublished from "../HidePublished";
import * as hooks from "../hooks";
import { HidePublishedPropsI } from "../interfaces";

jest.mock("../hooks", () => ({
  useDisableHidePublished: jest.fn(),
}));

jest.mock("pages/Admin/components", () => {
  const module = jest.requireActual("pages/Admin/components");

  return {
    ...module,
    AdminCheckbox: () => <span>AdminCheckbox</span>,
  };
});

describe("HidePublished", () => {
  let initProps: HidePublishedPropsI;
  beforeEach(() => {
    initProps = {
      watch: jest.fn(),
      isInitForm: true,
      disabledClass: "disabledClass",
      setValue: jest.fn(),
      isDisabled: false,
      name: "name",
      label: "label",
      publishedAtValue: "publishedAtValue",
    };
  });
  it("check render component", () => {
    (hooks.useDisableHidePublished as jest.Mock<boolean>).mockImplementation(
      () => true
    );
    const { getByText } = render(<HidePublished {...initProps} />);

    expect(getByText("AdminCheckbox")).toBeInTheDocument();
  });
});
