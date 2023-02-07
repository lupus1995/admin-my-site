import React from "react";

import { render } from "@testing-library/react";

import AdminEditor from "../AdminEditor";

jest.mock("html-to-draftjs");
jest.mock("react-draft-wysiwyg", () => {
  const module = jest.requireActual("react-draft-wysiwyg");

  return {
    ...module,
    Editor: ({
      editorClassName,
      name,
    }: {
      editorClassName: string;
      name: string;
    }) => (
      <>
        <span>{editorClassName}</span>
        <span>{name}</span>
        <span>Editor</span>
      </>
    ),
  };
});

describe("AdminEditor", () => {
  let props: {
    setValue: () => void;
    errors: { [key: string]: { message: string } };
    isSubmitted: boolean;
    trigger: () => void;
    watch: () => void;
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
      watch: jest.fn,
      isDisabled: false,
      disabledClass: "disabledClass",
      name: "name",
      label: "label",
    };
  });
  it("check render component", () => {
    // @ts-ignore
    const { getByText } = render(<AdminEditor {...props} />);

    expect(getByText(/label/i)).toBeInTheDocument();
    expect(getByText(/input-0-2-3 editor-0-2-6/i)).toBeInTheDocument();
    expect(getByText(/Editor/)).toBeInTheDocument();
    expect(getByText(/error message/i)).toBeInTheDocument();
  });
});
