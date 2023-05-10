import React from "react";

import { render } from "@testing-library/react";

import reactI18next from "utils/mocks/react-i18next";

import BackgroundImage from "../BackgroundImage";
import { BackgroundImageI } from "../itnterface";

jest.mock("react-i18next", () => reactI18next({ language: "en" }));

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
