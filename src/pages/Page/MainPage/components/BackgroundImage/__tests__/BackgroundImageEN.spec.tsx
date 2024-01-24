import React from "react";

import { render } from "@testing-library/react";

import BackgroundImage from "../BackgroundImage";
import { BackgroundImageI } from "../itnterface";

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "en", t: (arg: string) => arg }),
  };
});

describe("BackgroundImage", () => {
  let props: BackgroundImageI;
  beforeEach(() => {
    props = {
      imageName: "imageName",
      firstBlockTitle: {
        ru: "firstBlockTitleRU",
        en: "firstBlockTitleEN",
      },
      firstBlockSubtitle: {
        ru: "firstBlockSubtitleRU",
        en: "firstBlockSubtitleEN",
      },
    };
  });
  it("check render component", () => {
    const { getByText } = render(<BackgroundImage {...props} />);

    expect(getByText(/firstBlockTitleEN/i)).toBeInTheDocument();
    expect(getByText(/firstBlockSubtitleEN/i)).toBeInTheDocument();
  });
});
