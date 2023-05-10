import React from "react";

import { render } from "@testing-library/react";

import AboutMeSkeleton from "../AboutMeSkeleton";

describe("AboutMeSkeleton", () => {
  it("check render component", () => {
    const { getByTestId } = render(<AboutMeSkeleton />);

    expect(getByTestId(/aboutMeWrapper/i)).toBeInTheDocument();
    expect(getByTestId(/aboutMeTitle/i)).toBeInTheDocument();
    expect(getByTestId(/aboutMeContainer/i)).toBeInTheDocument();
    expect(getByTestId(/aboutMePhoto/i)).toBeInTheDocument();
    expect(getByTestId(/aboutMeArticle/i)).toBeInTheDocument();
  });
});
