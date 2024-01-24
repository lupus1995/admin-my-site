import React from "react";

import { render } from "@testing-library/react";

import { Editor } from "../Editor";
import { EditorEnum, EditorProps } from "../types";

jest.mock("../components", () => {
  const moduleMock = jest.requireActual("../components");

  return {
    ...moduleMock,
    Quill: () => <span>Quill</span>,
    Wysiwyg: () => <span>Wysiwyg</span>,
  };
});

describe("Editor", () => {
  it("check render component Quill", () => {
    const { getByText } = render(
      <Editor {...({ editorType: EditorEnum.quill } as EditorProps)} />
    );

    expect(getByText(/Quill/i)).toBeInTheDocument();
  });

  it("check render component Wysiwyg", () => {
    const { getByText } = render(
      <Editor {...({ editorType: EditorEnum.wysiwyg } as EditorProps)} />
    );

    expect(getByText(/Wysiwyg/i)).toBeInTheDocument();
  });
});
