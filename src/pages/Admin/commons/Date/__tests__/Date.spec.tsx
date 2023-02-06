import React from "react";

import { render } from "@testing-library/react";

import AdminDatePicker from "../Date";

describe("AdminDatePicker", () => {
  let props: {
    disabledClass: string;
    isDisabled: boolean;
    name: string;
    setValue: () => void;
    defaultValue: string | null;
    trigger: () => void;
    isSubmitted: boolean;
  };
  beforeEach(() => {
    props = {
      disabledClass: "disabledClass",
      isDisabled: false,
      name: "name",
      setValue: jest.fn,
      defaultValue: null,
      trigger: jest.fn,
      isSubmitted: false,
    };
  });
  it("check render component", () => {
    // @ts-ignore
    const { getByRole } = render(<AdminDatePicker {...props} />);

    expect(getByRole("textbox")).toBeInTheDocument();
    expect((getByRole("textbox") as HTMLInputElement).value).toBe("");
  });
  it("check has class disabled", () => {
    const newProps = {
      ...props,
      isDisabled: true,
    };
    // @ts-ignore
    const { getByRole } = render(<AdminDatePicker {...newProps} />);

    expect(getByRole("textbox")).toHaveClass("disabledClass");
  });
  it("check selected has default value", () => {
    const date = "2022-12-20T00:00:00.000+00:00";
    const newProps = {
      ...props,
      defaultValue: date,
    };

    // @ts-ignore
    const { getByRole } = render(<AdminDatePicker {...newProps} />);

    expect((getByRole("textbox") as HTMLInputElement).value).toBe("20.12.2022");
  });
});
