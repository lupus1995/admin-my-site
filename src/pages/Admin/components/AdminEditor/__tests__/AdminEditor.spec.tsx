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

jest.mock("utils/hooks", () => {
  const module = jest.requireActual("utils/hooks");

  return {
    ...module,
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
    expect(await findByText(/input-0-2-4 editor-0-2-7/i)).toBeInTheDocument();
    expect(await findByText(/Editor/)).toBeInTheDocument();
    expect(getByText(/error message/i)).toBeInTheDocument();
  });
});
