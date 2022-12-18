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

describe("BackgroundImage", () => {
  it("check render component", () => {
    const props: BackgroundImageI = {
      imageName: "imageName",
      firstBlockTitle: "firstBlockTitle",
      firstBlockSubtitle: "firstBlockSubtitle",
    };
    const { getByText } = render(<BackgroundImage {...props} />);

    expect(getByText(/firstBlockTitle/i)).toBeInTheDocument();
    expect(getByText(/firstBlockSubtitle/i)).toBeInTheDocument();
  });
});
