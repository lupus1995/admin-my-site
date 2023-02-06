import React from "react";

import { render } from "@testing-library/react";

import AdminEditor from "../Editor";

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

describe("Editor", () => {
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

    expect(getByText(/input-0-2-1 editor-0-2-4/i)).toBeInTheDocument();
    expect(getByText(/Editor/)).toBeInTheDocument();
  });
});
