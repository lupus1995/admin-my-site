import React from "react";

import { render } from "@testing-library/react";

import AboutMe from "../AboutMe";
import { AboutMeI } from "../interface";

jest.mock("html-react-parser", () => (data: string) => data);

jest.mock("utils/hooks", () => {
  const mockModule = jest.requireActual("utils/hooks");

  return {
    ...mockModule,
    useLanguage: jest
      .fn()
      .mockReturnValue({ language: "en", t: (arg: string) => arg }),
  };
});

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

    expect(getByText(/aboutMeTitleEN/i)).toBeInTheDocument();
    expect(getByText(/aboutMeDescriptionEN/i)).toBeInTheDocument();
    expect(getByText(/CustomImage/i)).toBeInTheDocument();
  });
});
