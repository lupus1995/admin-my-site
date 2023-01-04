import React from "react";

import { render } from "@testing-library/react";

import AboutMe from "../AboutMe";
import { AboutMeI } from "../interface";

jest.mock("html-react-parser", () => (data: string) => data);
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

describe("AboutMe", () => {
  it("check render component", () => {
    const props: AboutMeI = {
      aboutMeDescription: {
        ru: "aboutMeDescriptionRU",
        en: "aboutMeDescriptionEN",
      },
      aboutMeTitle: {
        ru: "aboutMeTitleRU",
        en: "aboutMeTitleEN",
      },
      imageName: "useImages",
    };
    const { getByText, getByAltText } = render(<AboutMe {...props} />);

    expect(getByText(/aboutMeTitleRU/i)).toBeInTheDocument();
    expect(getByText(/aboutMeDescriptionRU/i)).toBeInTheDocument();
    expect(getByAltText(/Панфилов Александр/i)).toBeInTheDocument();
  });
});
