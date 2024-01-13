import React from "react";

import { render } from "@testing-library/react";

import { EditorProps } from "../../..";
import { Quill } from "../Quill";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "ru", t: (arg: string) => arg }),
  };
});

jest.mock("react-quill", () => () => <span>ReactQuill</span>);

describe("Quill", () => {
  it("check render component", async () => {
    const { findByText } = render(
      <Quill
        {...({ register: jest.fn, watch: jest.fn } as unknown as EditorProps)}
      />
    );

    expect(await findByText(/ReactQuill/i)).toBeInTheDocument();
  });
});
