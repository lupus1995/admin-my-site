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

describe("AboutMe", () => {
  it("check render component", () => {
    const props: AboutMeI = {
      aboutMeDescription: "aboutMeDescription",
      aboutMeTitle: "aboutMeTitle",
      imageName: "useImages",
    };
    const { getByText, getByAltText } = render(<AboutMe {...props} />);

    expect(getByText(/aboutMeTitle/i)).toBeInTheDocument();
    expect(getByText(/aboutMeDescription/i)).toBeInTheDocument();
    expect(getByAltText(/Панфилов Александр/i)).toBeInTheDocument();
  });
});
