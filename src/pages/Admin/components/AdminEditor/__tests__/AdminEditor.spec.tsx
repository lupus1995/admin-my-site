import React from "react";

import { render } from "@testing-library/react";

import AdminEditor from "../AdminEditor";

jest.mock("html-to-draftjs");
jest.mock("pages/Admin/commons", () => {
  const moduleMock = jest.requireActual("pages/Admin/commons");

  return {
    ...moduleMock,
    Editor: () => <span>Editor</span>,
  };
});

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("AdminEditor", () => {
  let props: {
    setValue: () => void;
    errors: { [key: string]: { message: string } };
    isSubmitted: boolean;
    trigger: () => void;
    watch: () => void;
    register: () => void;
    isDisabled: boolean;
    disabledClass: string;
    name: string;
    label: string;
  };
  beforeEach(() => {
    props = {
      setValue: jest.fn,
      errors: { name: { message: "error message" } },
      isSubmitted: false,
      trigger: jest.fn,
      register: jest.fn,
      watch: jest.fn,
      isDisabled: false,
      disabledClass: "disabledClass",
      name: "name",
      label: "label",
    };
  });
  it("check render component", async () => {
    // @ts-ignore
    const { getByText, findByText } = render(<AdminEditor {...props} />);

    expect(getByText(/label/i)).toBeInTheDocument();
    expect(await findByText(/Editor/)).toBeInTheDocument();
    expect(getByText(/error message/i)).toBeInTheDocument();
  });
});
