import React from "react";

import { render } from "@testing-library/react";

import BackgroundImage from "../BackgroundImage";
import { BackgroundImageI } from "../itnterface";

jest.mock("pages/Page/MainPage/hook", () => {
  const module = jest.requireActual("pages/Page/MainPage/hook");

  return {
    ...module,
    useImages: () => "image.name",
  };
});

jest.mock("react-i18next", () => {
  const module = jest.requireActual("react-i18next");

  return {
    ...module,
    useTranslation: () => ({
      i18n: {
        language: "ru",
      },
    }),
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

    expect(getByText(/firstBlockTitleRU/i)).toBeInTheDocument();
    expect(getByText(/firstBlockSubtitleRU/i)).toBeInTheDocument();
  });
});
