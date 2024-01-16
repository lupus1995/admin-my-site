import React from "react";

import { render } from "@testing-library/react";

import reactI18next from "utils/mocks/react-i18next";

import AboutMe from "../AboutMe";
import { AboutMeI } from "../interface";

jest.mock("html-react-parser", () => (data: string) => data);

jest.mock("react-i18next", () => reactI18next({ language: "ru" }));

jest.mock("pages/Page/commons", () => {
  const mockModule = jest.requireActual("pages/Page/commons");

  return {
    ...mockModule,
    CustomImage: () => <span>CustomImage</span>,
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
      imageName: "",
    };
    const { getByText } = render(<AboutMe {...props} />);

    expect(getByText(/aboutMeTitleRU/i)).toBeInTheDocument();
    expect(getByText(/aboutMeDescriptionRU/i)).toBeInTheDocument();
    expect(getByText(/CustomImage/i)).toBeInTheDocument();
  });
});
