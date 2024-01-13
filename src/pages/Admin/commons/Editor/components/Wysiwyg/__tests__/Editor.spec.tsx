import React from "react";

import { render } from "@testing-library/react";

import AdminEditor from "../Editor";

jest.mock("html-to-draftjs");
jest.mock("react-draft-wysiwyg", () => {
  const mockModule = jest.requireActual("react-draft-wysiwyg");

  return {
    ...mockModule,
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
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

describe("Editor", () => {
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
      watch: jest.fn,
      register: jest.fn,
      isDisabled: false,
      disabledClass: "disabledClass",
      name: "name",
      label: "label",
    };
  });
  it("check render component", async () => {
    // @ts-ignore
    const { findByText } = render(<AdminEditor {...props} />);

    expect(await findByText(/input-0-2-1 editor-0-2-4/i)).toBeInTheDocument();
    expect(await findByText(/Editor/)).toBeInTheDocument();
  });
});
